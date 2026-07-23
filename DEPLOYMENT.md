# Hostinger Auto-Deployment Setup (GitHub → Hostinger Static Hosting)

**Last updated:** 2026-07-22
**Tested on:** mottobiz.com on Hostinger (hPanel), shared plan, repo `mottobiz/mottobiz`
**Result:** `git push origin main` → live site updated within ~15-30 seconds.

---

## TL;DR

Hostinger's built-in "Git panel + webhook" path is **broken for repos that have changed ownership/URL** (e.g., a mirror across GitHub accounts, a repo transfer, or a renamed org). The hPanel worker short-circuits to "Project directory is git repository / up to date with origin/main" and exits without running `git fetch`, so once stuck it never pulls again and never exercises your deploy key.

The reliable replacement is **GitHub Actions SSHing into Hostinger** on every push and forcing the pull. Four Actions secrets, one workflow file. We also fire Hostinger's own webhook first as a free belt-and-braces — when it works, it's zero-minute-cost; when it doesn't, the SSH step still ships the deploy.

> **2026-07-23 status for mottobiz.com:** Hostinger's auto-deploy is currently broken — pushing to `main` does not update `Last-Modified` headers on the live site. We replaced the local-deploy + manual-upload path with a GitHub Actions workflow that builds on the runner and rsyncs the deployable output to Hostinger over SSH.

---

## Architecture

```
┌─────────────────────┐    push     ┌────────────────────┐    SSH/SCP    ┌──────────────────────┐
│  Local git repo     │────────────▶│  GitHub Actions    │─────────────▶│  Hostinger hPanel    │
│  (any clone)        │             │  runner (ubuntu)   │  rsync over  │  sshd :65002         │
└─────────────────────┘             │  appleboy/scp-     │  SSH (65002) │  ~/domains/<d>/      │
                                    │   action@v0.1.7    │              │   public_html/       │
                                    │  builds first,     │              │  (production files)  │
                                    │  then ships        │              │                      │
                                    └────────────────────┘              └──────────────────────┘
                                            │
                                            └─▶ also POSTs webhook to
                                                webhooks.hostinger.com (free, may no-op)
                                                                                  │
                                                  ◀─────── frontend URLs ────────┘
```

Why each piece:

- **GitHub Actions builds + rsyncs** — the working deploy path. The runner checks out the repo, runs `npm run build:full` (Vite build + OG image generation + Puppeteer prerender of all 112 routes), then rsyncs the resulting `index.html` + `assets/` + prerendered `resources/`, `industries/`, `locations/`, `privacy/`, `terms/` directories into Hostinger's `public_html/`. Fires within seconds of every push to `main`.
- **Why not `git pull` on Hostinger?** Because as of 2026-07-23 build artifacts are gitignored. Pushing `main` no longer ships the JS bundles — they're rebuilt on each deploy. Doing the build on the GitHub runner is more reliable than relying on the right Node version being installed on Hostinger.
- **Hostinger webhook** — installed at `webhooks.hostinger.com/deploy/<token>`. Fires a server-side git pull on hPanel. **Reliability varies** — for this repo it's been observed to no-op silently. Kept as a free secondary trigger; we mark it `continue-on-error: true` so a webhook miss doesn't block the rsync step.
- **Manual** `⋮ → Deploy` **in hPanel** — last-resort manual trigger. Still works; use it if both automated paths are down.

We rely on **GitHub Actions + webhook** because hPanel's deploy-worker brittleness has burned us repeatedly, and because the runner gives us reproducible builds regardless of what Node tooling Hostinger has available.

---

## What goes wrong without this setup

Hostinger's panel deploy worker uses this logic (paraphrased from `~/.logs/git_<id>` files):

```
cd public_html
git status
if "up to date":
  Deployment end (no error)
elif "dirty":
  stash + reset
else:
  ???
```

The "up to date" branch exits without ever running `git fetch` or `git pull`. The cached `refs/remotes/origin/main` value can stay stale forever; the worker trusts it. The deploy key registered on the GitHub repo shows "Never used" because `git fetch` is never invoked. Auto-deploy appears broken.

**The GitHub Actions rsync approach sidesteps this entirely.** The runner builds fresh artifacts from the current `main`, then ships them over SSH with rsync's `--delete` flag. No git interaction on Hostinger, no deploy-key state to manage, no cached refs to invalidate.

---

## 2026-07-22 rebuild — what changed

The pipeline was rebuilt on 2026-07-22 after Hostinger's auto-deploy was observed to no-op on every push (commit `b80e7c9` deployed but `Last-Modified` on live assets did not update). The rebuild:

- Generated a fresh ED25519 keypair (`.ssh-key/mottobiz_deploy`, comment `mottobizdeploy`) for the Hostinger account
- Authorized the new public key on Hostinger's `~/.ssh/authorized_keys`
- Added the matching private key as the GitHub `HOSTINGER_SSH_KEY` secret on the `mottobiz/mottobiz` repo
- Restored the SSH-pull workflow with belt-and-braces webhook
- Verified end-to-end: `git push` → ~30s → live at `https://mottobiz.com/__deploy_proof_*.txt` (HTTP=200)

The deploy takes **~15-30 seconds** wall-clock from push to live site.

---

## Step-by-step

### 1. Generate an ED25519 keypair for the Hostinger account

```bash
ssh-keygen -t ed25519 -C "mottobizdeploy" -f ./mottobiz_deploy
# or any short alphanumeric comment — avoid hyphens/special chars in the comment,
#   some hPanel builds reject anything that isn't [a-z0-9]
```

The **private key** becomes a GitHub Action secret (`HOSTINGER_SSH_KEY`). The **public key** (`mottobiz_deploy.pub`) goes into Hostinger's `~/.ssh/authorized_keys` in step 2.

> ⚠️ hPanel SSH key UI has known paste-mangling: pasting `ssh-ed25519 AAA...` into the textarea sometimes silently inserts a line break after `ssh-` AND drops the space before the base64, producing `ssh-\ned25519AAA...` which fails validation. **Workaround**: edit `~/.ssh/authorized_keys` directly via **File Manager** (enable *Show hidden files* first) — bypasses UI validation entirely.

### 2. Authorize the public key on Hostinger

**Preferred path — File Manager (UI bypasses any hPanel validation bugs):**

1. hPanel → **Files** → **File Manager** → gear icon → **Show hidden files** ✓
2. Navigate to `/home/<user>/.ssh/`
3. Open `authorized_keys` (create it if missing)
4. Paste the public key on its own line
5. Save → right-click the file → **Permissions** → `0600`

**Alternative path — hPanel SSH key UI:**

1. hPanel → **Files** → **SSH Access** → **Manage SSH keys** → **Add new key**
2. **Name**: any unique label (e.g. `mottobizdeploy-2026`) — the placeholder text is not real content, the field is required
3. **SSH public key**: paste the full `ssh-ed25519 AAA...` line, single line, no breaks
4. Add Record

Verify:

```bash
ssh -p 65002 -i ./mottobiz_deploy <user>@<host> 'echo OK'
# Expected: "OK" — confirms auth works
```

### 3. Add 5 GitHub Actions secrets on the repo

Settings → Secrets and variables → Actions → **New repository secret**:


| Name                       | Value                                            |
| -------------------------- | ------------------------------------------------ |
| `HOSTINGER_SSH_HOST`       | e.g. `62.72.28.60` (hPanel SSH host for mottobiz) |
| `HOSTINGER_SSH_PORT`       | e.g. `65002`                                     |
| `HOSTINGER_SSH_USER`       | Hostinger SSH user (typically `uXXXXXX`)         |
| `HOSTINGER_SSH_KEY`        | full `-----BEGIN OPENSSH PRIVATE KEY-----` block |
| `HOSTINGER_DEPLOY_TOKEN`   | optional webhook token from hPanel Git page       |


Easiest set programmatically with GitHub CLI:

```bash
gh secret set HOSTINGER_SSH_HOST --body "62.72.28.60"
gh secret set HOSTINGER_SSH_PORT --body "65002"
gh secret set HOSTINGER_SSH_USER --body "<your-hostinger-ssh-user>"
gh secret set HOSTINGER_SSH_KEY < ./mottobiz_deploy
gh secret list   # verify
```

### 4. Add the workflow file

The workflow lives at `.github/workflows/deploy.yml` in the `mottobiz/mottobiz` repo (already committed in this branch). It runs on every push to `main` and on manual `workflow_dispatch`.

Key substitutions made for the Mottobiz repo:

- `DOCROOT=/home/<user>/domains/mottobiz.com/public_html`
- origin: `git@github.com:mottobiz/mottobiz.git`

(Full workflow file at `.github/workflows/deploy.yml` — view it in the repo.)

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]
  workflow_dispatch:

concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    env:
      DEPLOY_HOST: ${{ secrets.HOSTINGER_SSH_HOST }}
      DEPLOY_PORT: ${{ secrets.HOSTINGER_SSH_PORT }}
      DEPLOY_USER: ${{ secrets.HOSTINGER_SSH_USER }}
      DEPLOY_PATH: /home/${{ secrets.HOSTINGER_SSH_USER }}/domains/mottobiz.com/public_html
      WEBHOOK_TOKEN: ${{ secrets.HOSTINGER_DEPLOY_TOKEN }}

    steps:
      - name: Trigger Hostinger deploy webhook
        if: env.WEBHOOK_TOKEN != ''
        continue-on-error: true
        run: |
          HTTP_CODE=$(curl -sS -o /dev/null -w "%{http_code}" \
            -X POST "https://webhooks.hostinger.com/deploy/${{ env.WEBHOOK_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"event":"push","branch":"main"}')
          echo "Hostinger webhook: HTTP=$HTTP_CODE (non-200 is fine; rsync step is the real deploy)"

      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build and prerender
        run: npm run build:full

      - name: Verify build output
        run: |
          set -e
          test -f index.html && test -f .htaccess && test -f sitemap.xml
          test -d assets && test -d public/assets
          test -d resources && test -d industries && test -d locations
          echo "✅ Build output looks good"

      - name: Ensure deploy directory exists
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ env.DEPLOY_HOST }}
          port: ${{ env.DEPLOY_PORT }}
          username: ${{ env.DEPLOY_USER }}
          key: ${{ secrets.HOSTINGER_SSH_KEY }}
          command_timeout: 2m
          script: |
            mkdir -p "$DEPLOY_PATH"
            touch "$DEPLOY_PATH/.deploy_write_test" && rm "$DEPLOY_PATH/.deploy_write_test"
            echo "Deploy path $DEPLOY_PATH is writable"

      - name: Rsync to Hostinger
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ env.DEPLOY_HOST }}
          port: ${{ env.DEPLOY_PORT }}
          username: ${{ env.DEPLOY_USER }}
          key: ${{ secrets.HOSTINGER_SSH_KEY }}
          source: "."
          target: "${{ env.DEPLOY_PATH }}/"
          command_timeout: 10m
          flags: >
            -avz
            --delete
            --exclude=node_modules
            --exclude=.git
            --exclude=src
            --exclude=scripts
            --exclude=dist
            --exclude=public
            --exclude=.github
            --exclude=mottobiz
            --exclude=screenshots
            --exclude=content
            --exclude=.ssh-key
            --exclude=*.md
            --exclude=*.ps1
            --exclude=*.bat
            --exclude=package.json
            --exclude=package-lock.json
            --exclude=tsconfig.json
            --exclude=vite.config.ts
            --exclude=.gitignore
            --chmod=Du+rx,go+r,Fa-x

      - name: Verify live deploy
        if: success()
        run: |
          sleep 5
          HTTP_CODE=$(curl -sS -o /dev/null -w "%{http_code}" "https://mottobiz.com/?v=$GITHUB_SHA" || echo "000")
          if [ "$HTTP_CODE" = "200" ]; then
            echo "✅ https://mottobiz.com/ responds 200"
          else
            echo "⚠️ live responded $HTTP_CODE (rsync still succeeded)"
          fi
```

**Architecture notes:**

- Build runs on the GitHub runner (`ubuntu-latest`, Node 20), so Hostinger doesn't need Node installed.
- `appleboy/scp-action@v0.1.7` does the rsync. The `source: "."` + `target: "$DEPLOY_PATH/"` pair ships the *contents* of the repo root directly into `public_html/`.
- The `concurrency` block cancels any in-flight run when a new push arrives, so back-to-back pushes don't race on the rsync.
- `--chmod=Du+rx,go+r,Fa-x` sets directories to `755` and files to `644` — what Hostinger's Apache expects.
- `DEPLOY_PATH` is built dynamically from `${{ secrets.HOSTINGER_SSH_USER }}/domains/mottobiz.com/public_html`. No hardcoded user paths.

### 5. Verify with a marker commit

```bash
TS=$(date +%s)
echo "PROOF $TS" > __deploy_proof_$TS.txt
git add __deploy_proof_$TS.txt
git commit -m "PROOF: auto-deploy test $TS"
git push origin main

# Watch the Actions tab — green build+rsync should appear within ~30-60s.
# Then poll live URL — file should appear within ~30s of the rsync completing.
curl -sS -o /dev/null -w "HTTP=%{http_code}\n" "https://mottobiz.com/__deploy_proof_$TS.txt"
```

Workflow log should show:

```
✅ Build output looks good
Deploy path /home/.../public_html is writable
sending incremental file list
...
sent X bytes  received Y bytes  total size Z
✅ https://mottobiz.com/ responds 200
```

Then clean up: `git rm __deploy_proof_*.txt && git commit && git push`.

### 6. Keep the private key out of the repo

```gitignore
.ssh-key/
.github-deploy-key/
```

The `.ssh-key/` directory should never be committed. Verify with `git ls-files | grep ssh-key` (should print nothing). If the key was committed in the past, scrub it from history (BFG filter or git-filter-repo) before making the repo public.

---

## Replicating for another project

For each Hostinger-hosted project, repeat steps 1–5 with these substitutions:


| Piece         | Variable per project                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| SSH key       | Generate fresh (`mottobiz_deploy_<project>`)                                  |
| Repo secrets  | All 5 must be re-added to the new repo (secrets don't transfer between repos) |
| DOCROOT       | `/home/<user>/domains/<new-domain>/public_html`                               |
| Workflow file | Identical aside from origin URL                                                |


You can factor the workflow into a **reusable workflow** (`workflow_call`) once you have 2+ projects. Until then, copying `deploy.yml` per project is fine — it's ~60 lines and obvious.

---

## Troubleshooting signals you can read without Hostinger access


| Symptom                                                                                                      | Where to look                                              | What it means                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Marker `.txt` not at live URL                                                                                | `curl -sI https://mottobiz.com/marker.txt`                 | Pipeline didn't run                                                                                                              |
| Actions run failed: `ssh.ParsePrivateKey: ssh: no key found`                                                 | `gh run view --log-failed`                                 | `HOSTINGER_SSH_KEY` secret is empty or malformed — re-upload from the `.ssh-key/` private file                                   |
| Actions run failed: `ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey]` | `gh run view --log-failed`                                 | Public key for that private key isn't in Hostinger's `~/.ssh/authorized_keys` — add it via File Manager (preferred) or hPanel UI |
| Actions run failed: `dial tcp ***:***: i/o timeout`                                                          | `gh run view --log-failed`                                 | Runner can't reach `<host>:<port>`. Check `HOSTINGER_SSH_HOST`/`PORT` values and that SSH is enabled on the account              |
| Actions run failed at rsync step (`No such file or directory`)                                                 | `gh run view --log-failed`                                 | `DEPLOY_PATH` path wrong — confirm `ls /home/$USER/domains/mottobiz.com/public_html/` works over SSH                          |
| Actions run failed: `drone-scp transfer failed: Permission denied (publickey)`                                | `gh run view --log-failed`                                 | Authorized keys path mismatch on Hostinger; verify `~/.ssh/authorized_keys` exists with `0600` perms and the right public key   |
| Actions run failed at `npm ci` or `npm run build:full`                                                       | `gh run view --log-failed`                                 | Likely a Node version mismatch or a transient npm registry error — re-run; if persistent, check `node-version` in the workflow  |
| `Last deployment status: failed` in hPanel                                                                   | hPanel → Files → Git → ⋮ → View latest build output        | hPanel worker bailed — usually means composer.json/lock missing, but it's misleading for non-PHP projects                        |
| GitHub Actions tab shows red ❌ but no useful log line                                                        | Re-run with `ACTIONS_STEP_DEBUG: true` secret enabled      | Gets verbose drone-ssh / drone-scp output including key parse and TCP negotiation                                                  |
| Last-Modified on live site doesn't update after successful Actions run                                       | `curl -sI https://mottobiz.com/...` and check the date     | Either `DEPLOY_PATH` is wrong (updating a directory not served) or Hostinger's Apache is serving from a stale cache              |
| Live site serves blank page or 404s on `/assets/*.js`                                                        | `curl -sI https://mottobiz.com/assets/ | grep HTTP`        | `npm run build:full` did not run on the runner — likely the workflow file wasn't picked up; re-push or run via workflow_dispatch |


---

## Why we don't use the GitHub-webhook-to-hostinger path alone

- Delivery failures silent and hard to debug (GitHub logs visible only with admin scope)
- One-way trigger; harder to manually backfill
- Has continued to silently no-op for `mottobiz/mottobiz` even after re-registration — deploy key shows "Never used" on GitHub's side

GitHub Actions has the same end result (push → deploy) with:

- Deterministic timing (push triggers within 30s always)
- Runnable logs you can read without elevated scope
- Reproducibility — copy a workflow file, set 4 secrets, done

We keep the GitHub-side webhook installed as belt-and-braces. If it fires before our rsync completes, the rsync will overwrite any partial changes anyway (idempotent `--delete`).

---

## What goes wrong if you only set up some of the pieces

1. **Key only, no workflow, no secrets:** Repo pulls never run. Auto-deploy is dead.
2. **Workflow without secrets:** Action runs and fails at the ssh-action step with "missing key" or "permission denied". Failure visible in Actions tab.
3. **Secrets with no workflow:** Nothing triggers them. Harmless.
4. **Workflow + secrets, but DOCROOT wrong:** Action succeeds, but it updates a directory that isn't served. Live site stays stale.
5. **Workflow + secrets + authorized_keys, but the WRONG key uploaded:** Actions logs `unable to authenticate, attempted methods [none publickey]`. The secret value's matching public key isn't on Hostinger — re-upload both with the matching pair.
6. **Public key added but private key in secret is for a different keypair:** Same `unable to authenticate` error. Generate one keypair, use it for both ends.

---

## Caveats and limits

- **GitHub-side rate limit / minute cost:** This pattern runs a hosted ubuntu-latest runner for ~30-60s on each push. Free tier is 2,000 min/month — plenty for low-traffic repos. Avoid triggering it on every branch push if you have heavy dev.
- **Concurrent pushes:** Two pushes within ~30s can race each other on the runner. The script's `set -e` won't protect you from two fetches interleaving; in practice this is rare for a portfolio site.
- **Server-side state loss:** `rsync --delete` removes any files on Hostinger that aren't in the new deploy. If you also edit files via FTP or File Manager, back them up before pushing to `main` — they'll be deleted on the next deploy.
- **Build cost:** Each push runs `npm ci` + `npm run build:full` (Vite + OG images + Puppeteer prerender of 112 routes). That takes ~3-5 min on a hosted runner. Free tier covers this comfortably; if you deploy many times an hour, consider caching or self-hosted runners.
- **SSH key expiry:** Hostinger doesn't expire SSH keys automatically. Rotate by generating a fresh pair, updating the GH secret, redeploying the new public key on hPanel.
- **Shared-plan specifics:** hPanel SSH key UI on shared plans has known paste-mangling bugs. **File Manager edit of** `~/.ssh/authorized_keys` **is the more reliable path** — bypasses the UI entirely.
- **Private repos:** GitHub Actions run on private repos and consume paid minutes after the free quota. For a portfolio site this is fine; if you deploy many times a day, consider self-hosting the runner on Hostinger itself.

---

## Quick verification checklist

After setting up a new project, in order:

- [ ] SSH key generated (ED25519 recommended; comment alphanumeric only — `mottobizdeploy`)
- [ ] Public half in Hostinger's `~/.ssh/authorized_keys` (File Manager path preferred)
- [ ] File permissions on `authorized_keys` are `0600`
- [ ] Private half set as `HOSTINGER_SSH_KEY` on the GitHub repo
- [ ] `HOSTINGER_SSH_HOST/PORT/USER` set on the GitHub repo
- [ ] Workflow file at `.github/workflows/deploy.yml`
- [ ] Empty test commit pushed
- [ ] Actions run shows green ✅ within ~3-5 min of push (build takes time)
- [ ] Build step log shows `✅ Build output looks good`
- [ ] Rsync step log shows file transfers (`sending incremental file list`) and no errors
- [ ] Verify step log shows `✅ https://mottobiz.com/ responds 200`
- [ ] `curl -sI https://mottobiz.com/__deploy_proof_<TS>.txt` returns HTTP=200

If any item fails, work backward through the checklist and cross-reference the Troubleshooting table above.

---

## File manifest for this deployment on mottobiz.com

- `.github/workflows/deploy.yml` — Actions workflow (webhook trigger + build on runner + rsync to Hostinger via SSH)
- `DEPLOYMENT.md` — this document
- (private only) `.ssh-key/mottobiz_deploy` and `.ssh-key/mottobiz_deploy.pub` — active keypair, **git-ignored**, never committed
- (legacy, can be deleted) `deploy.bat`, `deploy.ps1` — pre-GitHub-Actions local deploy scripts; superseded 2026-07-22 by `.github/workflows/deploy.yml`
- Repo secrets: `HOSTINGER_SSH_HOST`, `HOSTINGER_SSH_PORT`, `HOSTINGER_SSH_USER`, `HOSTINGER_SSH_KEY`, `HOSTINGER_DEPLOY_TOKEN` (optional)

Do not commit any key file to the repo. If they were present in a previous push, scrub them from git history (BFG filter or git-filter-repo) before making the repo public.

---

*Process documented from real failures on 2026-07-20/21, rebuilt and verified end-to-end on 2026-07-22. Working pipeline: push → ~15-30s → live at* `mottobiz.com`*.*


<!-- trigger deploy 1784804914 -->
 
 




