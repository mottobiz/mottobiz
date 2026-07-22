# Hostinger Auto-Deployment Setup (GitHub → Hostinger Static Hosting)

**Last updated:** 2026-07-22
**Tested on:** mottobiz.com on Hostinger (hPanel), shared plan, repo `mottobiz/mottobiz`
**Result:** `git push origin main` → live site updated within ~15-30 seconds.

---

## TL;DR

Hostinger's built-in "Git panel + webhook" path is **broken for repos that have changed ownership/URL** (e.g., a mirror across GitHub accounts, a repo transfer, or a renamed org). The hPanel worker short-circuits to "Project directory is git repository / up to date with origin/main" and exits without running `git fetch`, so once stuck it never pulls again and never exercises your deploy key.

The reliable replacement is **GitHub Actions SSHing into Hostinger** on every push and forcing the pull. Four Actions secrets, one workflow file. We also fire Hostinger's own webhook first as a free belt-and-braces — when it works, it's zero-minute-cost; when it doesn't, the SSH step still ships the deploy.

> **2026-07-22 status for mottobiz.com:** Hostinger's auto-deploy is currently broken — pushing to `main` does not update `Last-Modified` headers on the live site. We are moving to the GitHub Actions SSH-pull workflow documented below.

---

## Architecture

```
┌─────────────────────┐    push     ┌────────────────────┐    SSH      ┌──────────────────────┐
│  Local git repo     │────────────▶│  GitHub Actions    │────────────▶│  Hostinger hPanel    │
│  (any clone)        │             │  runner (ubuntu)   │             │  sshd :65002         │
└─────────────────────┘             │  appleboy/ssh-     │             │  ~/domains/<d>/      │
                                    │   action@v1 runs   │             │   public_html/       │
                                    │   script           │             │  (production files)  │
                                    └────────────────────┘             └──────────────────────┘
                                            │
                                            └─▶ also POSTs webhook to
                                                webhooks.hostinger.com (free, may no-op)
                                                                              │
                                              ◀─────── frontend URLs ────────┘
```

Why each piece:

- **GitHub Actions SSH pull** — the working deploy path. Fires within seconds of every push to `main`. Costs GitHub-hosted runner minutes (free tier is 2,000 min/month — plenty for a static site).
- **Hostinger webhook** — installed at `webhooks.hostinger.com/deploy/<token>`. Fires a server-side git pull on hPanel. **Reliability varies** — for this repo (transferred/renamed origin) it's been observed to no-op silently. Kept as a free secondary trigger; we mark it `continue-on-error: true` so a webhook miss doesn't block the SSH path.
- **Manual** `⋮ → Deploy` **in hPanel** — last-resort manual trigger. Still works; use it if both automated paths are down.

We rely on **SSH + webhook** because hPanel's deploy-worker brittleness has burned us repeatedly.

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

**Fix in the script:** delete `.git/refs/remotes/origin/main` *before* fetching. Forces worker (and any subsequent pull) to hit GitHub for the real SHA.

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
name: Deploy to Hostinger (SSH pull)

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Trigger Hostinger deploy webhook
        continue-on-error: true
        run: |
          HTTP_CODE=$(curl -sS -o /dev/null -w "%{http_code}" \
            -X POST "https://webhooks.hostinger.com/deploy/${{ secrets.HOSTINGER_DEPLOY_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"event":"push","branch":"main"}')
          echo "Hostinger webhook: HTTP=$HTTP_CODE (non-200 is fine; SSH step is the real deploy)"

      - name: SSH pull to Hostinger public_html
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.HOSTINGER_SSH_HOST }}
          port: ${{ secrets.HOSTINGER_SSH_PORT }}
          username: ${{ secrets.HOSTINGER_SSH_USER }}
          key: ${{ secrets.HOSTINGER_SSH_KEY }}
          command_timeout: 5m
          script: |
            set -e
            DOCROOT=/home/${{ secrets.HOSTINGER_SSH_USER }}/domains/mottobiz.com/public_html
            cd "$DOCROOT"
            git remote set-url origin git@github.com:mottobiz/mottobiz.git || true
            rm -f .git/refs/remotes/origin/main
            git stash push -u -m "deploy-pre-pull $(date +%s)" || true
            git fetch origin main
            LOCAL=$(git rev-parse HEAD)
            REMOTE=$(git rev-parse origin/main)
            echo "local=$LOCAL remote=$REMOTE"
            if [ "$LOCAL" != "$REMOTE" ]; then
              git reset --hard origin/main
              git log -1 --oneline
            else
              echo "already at origin/main; nothing to do"
            fi
            find "$DOCROOT" -type d -not -path '*/.git*' -exec chmod 755 {} \; 2>/dev/null
            find "$DOCROOT" -type f -not -path '*/.git*' -exec chmod 644 {} \; 2>/dev/null
```

**Required substitutions:**

- `DOCROOT` is built dynamically from `${{ secrets.HOSTINGER_SSH_USER }}/domains/mottobiz.com/public_html` so it always resolves to the right user even if Hostinger changes the username prefix.
- The webhook token in the `curl POST` URL (`${{ secrets.HOSTINGER_DEPLOY_TOKEN }}`) is optional — if you don't have one, just leave the secret empty and the curl will 404 silently (the SSH step is the real deploy anyway).

### 5. Verify with a marker commit

```bash
TS=$(date +%s)
echo "PROOF $TS" > __deploy_proof_$TS.txt
git add __deploy_proof_$TS.txt
git commit -m "PROOF: auto-deploy test $TS"
git push origin main

# Poll live URL — file should appear within ~30s
curl -sS -o /dev/null -w "HTTP=%{http_code}\n" "https://mottobiz.com/__deploy_proof_$TS.txt"
```

Watch the Actions tab — green `Deploy to Hostinger (SSH pull)` run within seconds. SSH step log should show:

```
Hostinger webhook: HTTP=<code>
local=<old-sha> remote=<new-sha>
HEAD is now at <new-sha> PROOF: ...
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
| Actions run failed at `git fetch` step                                                                       | `gh run view --log-failed`                                 | `DOCROOT` path wrong, or origin URL not reachable from server                                                                    |
| `Last deployment status: failed` in hPanel                                                                   | hPanel → Files → Git → ⋮ → View latest build output        | hPanel worker bailed — usually means composer.json/lock missing, but it's misleading for non-PHP projects                        |
| Multiple `~/.logs/git_*` files with "Project directory is git repository / up to date with origin/main"      | SSH `ls -la ~/.logs/git_*`                                 | Worker is short-circuiting; the workflow's `rm .git/refs/remotes/origin/main` cures this                                         |
| GitHub Actions tab shows red ❌ but no useful log line                                                        | Re-run with `ACTIONS_STEP_DEBUG: true` secret enabled      | Gets verbose drone-ssh output including key parse and TCP negotiation                                                            |
| Last-Modified on live site doesn't update after successful Actions run                                       | `curl -sI https://mottobiz.com/...` and check the date     | Either DOCROOT is wrong (updating a directory not served) or Hostinger's Apache is serving from a stale cache                     |


---

## Why we don't use the GitHub-webhook-to-hostinger path alone

- Delivery failures silent and hard to debug (GitHub logs visible only with admin scope)
- One-way trigger; harder to manually backfill
- Has continued to silently no-op for `mottobiz/mottobiz` even after re-registration — deploy key shows "Never used" on GitHub's side

GitHub Actions has the same end result (push → deploy) with:

- Deterministic timing (push triggers within 30s always)
- Runnable logs you can read without elevated scope
- Reproducibility — copy a workflow file, set 4 secrets, done

We keep the GitHub-side webhook installed as belt-and-braces. If both fire, the second one exits cleanly with "nothing new to do" (idempotent `git reset --hard`).

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
- **Server-side state loss:** `git reset --hard` wipes server-side modifications. If you also edit files via FTP or File Manager, those changes get stashed as `deploy-pre-pull-<timestamp>` — auto-recoverable with `git stash pop` on the server.
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
- [ ] Actions run shows green ✅ within ~30s of push
- [ ] SSH step log shows `local=<old> remote=<new>` and `HEAD is now at <new-sha>`
- [ ] `curl -sI https://mottobiz.com/__deploy_proof_<TS>.txt` returns HTTP=200

If any item fails, work backward through the checklist and cross-reference the Troubleshooting table above.

---

## File manifest for this deployment on mottobiz.com

- `.github/workflows/deploy.yml` — Actions workflow (combined webhook + SSH pull)
- `DEPLOYMENT.md` — this document
- (private only) `.ssh-key/mottobiz_deploy` and `.ssh-key/mottobiz_deploy.pub` — active keypair, **git-ignored**, never committed
- (legacy, can be deleted) `deploy.bat`, `deploy.ps1` — pre-GitHub-Actions local deploy scripts; superseded 2026-07-22 by `.github/workflows/deploy.yml`
- Repo secrets: `HOSTINGER_SSH_HOST`, `HOSTINGER_SSH_PORT`, `HOSTINGER_SSH_USER`, `HOSTINGER_SSH_KEY`, `HOSTINGER_DEPLOY_TOKEN` (optional)

Do not commit any key file to the repo. If they were present in a previous push, scrub them from git history (BFG filter or git-filter-repo) before making the repo public.

---

*Process documented from real failures on 2026-07-20/21, rebuilt and verified end-to-end on 2026-07-22. Working pipeline: push → ~15-30s → live at* `mottobiz.com`*.*
