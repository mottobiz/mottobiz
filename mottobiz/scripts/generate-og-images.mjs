import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.resolve(__dirname, '..')
// Read from the catalog module (contains the article objects).
const ARTICLES_TS_PATH = path.join(ROOT, 'src', 'data', 'articles', 'catalog.ts')
const OUT_DIR = path.join(ROOT, 'public', 'og')

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const CATEGORY_COLORS = {
  locations: { primary: '#6366F1', secondary: '#A855F7' },
  industries: { primary: '#F59E0B', secondary: '#F97316' },
  guides: { primary: '#10B981', secondary: '#14B8A6' },
  'case-studies': { primary: '#F43F5E', secondary: '#EC4899' },
  comparisons: { primary: '#8B5CF6', secondary: '#6366F1' },
}

function parseArgs(argv) {
  const args = {
    force: false,
    dryRun: false,
    slugs: new Set(),
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--force') args.force = true
    else if (a === '--dry-run') args.dryRun = true
    else if (a === '--slug' && argv[i + 1]) args.slugs.add(argv[++i])
    else if (a.startsWith('--slug=')) args.slugs.add(a.slice('--slug='.length))
  }

  return args
}

function escapeXml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function titleToLines(title, maxCharsPerLine = 32, maxLines = 3) {
  const words = String(title).trim().split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxCharsPerLine) {
      if (current) lines.push(current)
      current = word
    } else {
      current = next
    }
    if (lines.length >= maxLines) break
  }
  if (lines.length < maxLines && current) lines.push(current)
  return lines.slice(0, maxLines)
}

function parseArticleIndex(tsSource) {
  // Best-effort extraction of metadata from the TS data file without requiring TS execution.
  // Articles are flat objects and consistently contain title/slug/category.
  const re = /{\s*id:\s*['"][^'"]+['"][\s\S]*?title:\s*(['"])(.*?)\1[\s\S]*?slug:\s*['"]([^'"]+)['"][\s\S]*?category:\s*['"]([^'"]+)['"][\s\S]*?readingTime:\s*\d+/g
  const out = []
  let m
  while ((m = re.exec(tsSource)) !== null) {
    const title = m[2]
    const slug = m[3]
    const category = m[4]
    out.push({ title, slug, category })
  }

  // De-dupe by slug (in case of accidental duplicates in the file).
  const seen = new Set()
  return out.filter(a => {
    if (seen.has(a.slug)) return false
    seen.add(a.slug)
    return true
  })
}

function buildOgSvg({ title, slug, category }) {
  const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.industries
  const titleLines = titleToLines(title, 34, 3).map(escapeXml)

  const categoryLabel =
    category === 'case-studies' ? 'Case Study' :
    category === 'industries' ? 'Industry' :
    category === 'locations' ? 'Location' :
    category === 'comparisons' ? 'Comparison' :
    'Guide'

  const safeSlug = escapeXml(slug)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="${colors.secondary}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0A0A0B" stop-opacity="1"/>
    </linearGradient>
    <radialGradient id="glow1" cx="30%" cy="35%" r="55%">
      <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${colors.primary}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="78%" cy="72%" r="50%">
      <stop offset="0%" stop-color="${colors.secondary}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${colors.secondary}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>

  <rect x="0" y="0" width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="#0A0A0B"/>
  <rect x="0" y="0" width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg)"/>

  <circle cx="360" cy="220" r="260" fill="url(#glow1)" filter="url(#soft)"/>
  <circle cx="980" cy="470" r="220" fill="url(#glow2)" filter="url(#soft)"/>

  <g opacity="0.07" stroke="#FFFFFF" stroke-width="1">
    <path d="M0 420 L1200 240" />
    <path d="M0 520 L1200 340" />
    <path d="M0 620 L1200 440" />
  </g>

  <g font-family="Space Grotesk, Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif">
    <text x="72" y="96" font-size="28" font-weight="700" fill="#FAFAFA" opacity="0.92">MottoBiz</text>
    <text x="72" y="132" font-size="18" font-weight="600" fill="#FAFAFA" opacity="0.55">Surat • Business Automation</text>

    <rect x="72" y="162" rx="18" ry="18" width="176" height="44" fill="${colors.primary}" fill-opacity="0.14" stroke="${colors.primary}" stroke-opacity="0.35"/>
    <text x="92" y="191" font-size="18" font-weight="700" fill="${colors.primary}" opacity="0.95">${escapeXml(categoryLabel)}</text>

    <g font-size="64" font-weight="800" fill="#FAFAFA">
      <text x="72" y="310">${titleLines[0] ?? ''}</text>
      ${titleLines[1] ? `<text x="72" y="386" opacity="0.92">${titleLines[1]}</text>` : ''}
      ${titleLines[2] ? `<text x="72" y="462" opacity="0.84">${titleLines[2]}</text>` : ''}
    </g>

    <text x="72" y="560" font-size="20" font-weight="600" fill="#FAFAFA" opacity="0.48">${safeSlug}</text>
  </g>
</svg>`
}

async function fileExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const tsSource = await fs.readFile(ARTICLES_TS_PATH, 'utf8')
  let articles = parseArticleIndex(tsSource)

  if (args.slugs.size > 0) {
    articles = articles.filter(a => args.slugs.has(a.slug))
  }

  if (articles.length === 0) {
    const hasSlugFilter = args.slugs.size > 0
    const msg = hasSlugFilter
      ? 'No articles matched the provided --slug filter.'
      : 'No articles found to generate OG images for.'
    ;(hasSlugFilter ? console.error : console.log)(msg)
    process.exit(hasSlugFilter ? 1 : 0)
  }

  await fs.mkdir(OUT_DIR, { recursive: true })

  let generated = 0
  let skipped = 0

  for (const article of articles) {
    const outPath = path.join(OUT_DIR, `${article.slug}.png`)
    const exists = await fileExists(outPath)
    if (exists && !args.force) {
      skipped++
      continue
    }

    const svg = buildOgSvg(article)
    if (args.dryRun) {
      generated++
      continue
    }

    await sharp(Buffer.from(svg))
      .png({ quality: 90 })
      .toFile(outPath)

    generated++
  }

  const msg = args.dryRun
    ? `Dry run: would generate ${generated}, would skip ${skipped}`
    : `Generated ${generated}, skipped ${skipped} (use --force to overwrite)`
  console.log(msg)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
