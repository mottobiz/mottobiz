/**
 * prerender.mjs
 * Pre-renders all React SPA routes to static HTML using Puppeteer.
 * Run after `npm run build`: node scripts/prerender.mjs
 *
 * This solves the blank-page problem for search engine crawlers.
 */

import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import handler from 'serve-handler'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')
const ROOT_DIR = join(PUBLIC_DIR, '..')
const CATALOG_PATH = join(ROOT_DIR, 'src', 'data', 'articles', 'catalog.ts')

// Parse the article catalog at startup so we know each article's title and
// excerpt without booting TypeScript. Catalog entries look like:
//   {
//     id: '...',
//     title: '...',
//     excerpt: "Vesu's premium...",
//     slug: '...',
//     ...
//   }
// Apostrophes inside strings are common. We match each field across the whole
// file and group entries by verifying id === slug.
function loadArticleIndex() {
  try {
    const src = readFileSync(CATALOG_PATH, 'utf8')
    // Match the first object literal that contains id/title/excerpt/slug in
    // order. We tolerate any quote character as the string delimiter and stop
    // the title/excerpt capture at the next field name to avoid mismatches.
    const articleRe = /id:\s*['"`]([^'"`\n]+)['"`][\s\S]*?title:\s*['"`]([\s\S]*?)['"`]\s*,\s*\n\s*excerpt:\s*['"`]([\s\S]*?)['"`]\s*,\s*\n\s*slug:\s*['"`]([^'"`\n]+)['"`]/g
    const out = new Map()
    let m
    while ((m = articleRe.exec(src)) !== null) {
      const id = m[1]
      const title = m[2]
      const excerpt = m[3]
      const slug = m[4]
      if (slug && slug === id && !out.has(slug)) {
        out.set(slug, { title, excerpt })
      }
    }
    return out
  } catch (e) {
    console.warn(`Could not parse catalog at ${CATALOG_PATH}: ${e.message}`)
    return new Map()
  }
}

// Static per-route metadata for hub pages (not articles).
// Falls back to sensible defaults if not listed here.
const HUB_META = {
  '/': {
    title: 'AI Business Automation in Surat | MottoBiz — Free Audit',
    description: "MottoBiz helps solopreneurs and small businesses in Surat automate WhatsApp follow-ups, lead pipelines, and social media — without hiring a team. Book a free 30-min audit.",
    ogType: 'business.business',
  },
  '/resources': {
    title: 'Resources — Business Automation Guides | MottoBiz',
    description: 'Free guides on WhatsApp automation, lead pipelines, and AI agents for Surat businesses. Practical tutorials written for non-technical owners.',
    ogType: 'website',
  },
  '/privacy': {
    title: 'Privacy Policy | MottoBiz',
    description: 'MottoBiz privacy policy — how we collect, use, and protect your data.',
    ogType: 'website',
  },
  '/terms': {
    title: 'Terms of Service | MottoBiz',
    description: 'MottoBiz terms of service — the rules that govern your use of our website and services.',
    ogType: 'website',
  },
  '/industries/textile-diamond': {
    title: 'Textile & Diamond Automation in Surat | MottoBiz',
    description: 'Varachha and Mahidharpura textile and diamond businesses: automate WhatsApp orders, bulk inquiries, and stock updates. Free audit.',
    ogType: 'website',
  },
  '/industries/coaching-education': {
    title: 'Coaching & Tuition Automation in Surat | MottoBiz',
    description: 'Adajan, Vesu and Athwa coaching centers: automate admission inquiries, fee reminders, and class schedules on WhatsApp.',
    ogType: 'website',
  },
  '/industries/real-estate': {
    title: 'Real Estate Automation in Surat | MottoBiz',
    description: 'Vesu, Piplod and City Light agents: automate property inquiries, virtual tours, and document collection on WhatsApp.',
    ogType: 'website',
  },
  '/industries/restaurant-food': {
    title: 'Restaurant & Food Automation in Surat | MottoBiz',
    description: 'Adajan, Vesu and Ghod Dod Road restaurants: automate table reservations, order confirmations, and review requests on WhatsApp.',
    ogType: 'website',
  },
  '/industries/retail': {
    title: 'Retail & Consumer Automation in Surat | MottoBiz',
    description: 'Surat retailers: automate inventory alerts, supplier orders, and loyalty campaigns on WhatsApp.',
    ogType: 'website',
  },
  '/locations/varachha': {
    title: 'Business Automation in Varachha, Surat | MottoBiz',
    description: "Varachha's textile and diamond businesses run on WhatsApp. We automate your bulk orders, lead capture, and follow-ups. Free 30-min audit.",
    ogType: 'website',
  },
  '/locations/katargam': {
    title: 'Business Automation in Katargam, Surat | MottoBiz',
    description: 'Katargam coaching centers, retailers, and wholesalers: automate WhatsApp inquiries, reminders, and orders. Free 30-min audit.',
    ogType: 'website',
  },
  '/locations/vesu': {
    title: 'Business Automation in Vesu, Surat | MottoBiz',
    description: "Vesu's premium real estate, coaching, and retail businesses: automate high-ticket lead handling and customer follow-ups. Free audit.",
    ogType: 'website',
  },
  '/locations/adajan': {
    title: 'Business Automation in Adajan, Surat | MottoBiz',
    description: 'Adajan restaurants, coaching centers, and retail: automate orders, reservations, and parent communications. Free 30-min audit.',
    ogType: 'website',
  },
  '/locations/other': {
    title: 'Business Automation Across Surat | MottoBiz',
    description: 'Athwa, Piplod, Nanpura, Rander, Udhna, and all other Surat areas: WhatsApp automation, lead pipelines, and smart websites.',
    ogType: 'website',
  },
  '/industries/ai-agents': {
    title: 'AI Agents & Agentic Automation in Surat | MottoBiz',
    description: 'Surat businesses are deploying AI agents that reason, plan, and execute 24/7. Learn how agentic automation replaces routine work — without hiring.',
    ogType: 'website',
  },
}

function getRouteMeta(route, articleIndex) {
  if (HUB_META[route]) return HUB_META[route]
  const articleMatch = route.match(/^\/resources\/([^\/]+)$/)
  if (articleMatch) {
    const slug = articleMatch[1]
    const article = articleIndex.get(slug)
    if (article) {
      return {
        title: article.title,
        description: article.excerpt,
        ogType: 'article',
      }
    }
  }
  // Fallback for unknown routes
  return {
    title: 'AI Business Automation in Surat | MottoBiz',
    description: 'MottoBiz — Surat business automation studio.',
    ogType: 'website',
  }
}

// All routes to pre-render — update this list when adding new pages
const STATIC_ROUTES = [
  '/',
  '/resources',
  '/privacy',
  '/terms',
  '/industries/textile-diamond',
  '/industries/coaching-education',
  '/industries/real-estate',
  '/industries/restaurant-food',
  '/industries/retail',
  '/industries/ai-agents',
  '/locations/varachha',
  '/locations/katargam',
  '/locations/vesu',
  '/locations/adajan',
  '/locations/other',
]

// Article routes — read slugs from the sitemap
function getArticleRoutes() {
  const sitemap = readFileSync(join(PUBLIC_DIR, 'sitemap.xml'), 'utf8')
  const matches = sitemap.matchAll(/<loc>https:\/\/mottobiz\.com\/resources\/([^<]+)<\/loc>/g)
  return [...matches].map(m => `/resources/${m[1]}`)
}

async function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      handler(req, res, {
        public: PUBLIC_DIR,
        rewrites: [{ source: '**', destination: '/index.html' }],
        headers: [{ source: '**', headers: [{ key: 'Cache-Control', value: 'no-cache' }] }],
      })
    })
    server.listen(port, () => {
      console.log(`📡 Serving from ${PUBLIC_DIR} on port ${port}`)
      resolve(server)
    })
  })
}

async function prerenderRoute(page, baseUrl, route, articleIndex) {
  const url = `${baseUrl}${route}`
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

  // Wait for React to render
  await page.waitForSelector('#root > *', { timeout: 10000 }).catch(() => {})

  let html = await page.content()

  // De-duplicate tags that confuse crawlers when they appear multiple times.
  // React-Helmet inserts each route's tags, but if the SEOHead component was
  // also rendered at the App level (or hydration races), the static one ends
  // up appended after the route one. Keep only the FIRST occurrence so
  // crawlers see the page-specific value, not the homepage default.
  const keepFirstOnly = (tagPattern) => {
    let firstSeen = false
    return html.replace(tagPattern, (match) => {
      if (firstSeen) return ''
      firstSeen = true
      return match
    })
  }
  html = keepFirstOnly(/<link[^>]*rel=["']canonical["'][^>]*>/g)
  html = keepFirstOnly(/<title>[^<]*<\/title>/g)
  html = keepFirstOnly(/<meta[^>]*name=["']description["'][^>]*>/g)
  html = keepFirstOnly(/<meta[^>]*property=["']og:type["'][^>]*>/g)
  html = keepFirstOnly(/<meta[^>]*property=["']og:title["'][^>]*>/g)
  html = keepFirstOnly(/<meta[^>]*property=["']og:description["'][^>]*>/g)
  html = keepFirstOnly(/<meta[^>]*property=["']og:url["'][^>]*>/g)
  html = keepFirstOnly(/<meta[^>]*property=["']og:image["'][^>]*>/g)
  html = keepFirstOnly(/<meta[^>]*name=["']twitter:title["'][^>]*>/g)
  html = keepFirstOnly(/<meta[^>]*name=["']twitter:description["'][^>]*>/g)

  // Stamp in the canonical, og:url, og:type, title, description, og:title,
  // og:description, twitter:title, twitter:description using authoritative
  // route metadata we computed locally. This guarantees the prerendered
  // HTML has the right values regardless of React-Helmet hydration timing.
  const meta = getRouteMeta(route, articleIndex)
  const expectedCanonical =
    route === '/'
      ? 'https://mottobiz.com/'
      : `https://mottobiz.com${route}`
  const expectedOgUrl = expectedCanonical
  const expectedOgImage =
    route.startsWith('/resources/')
      ? `https://mottobiz.com/og/${encodeURIComponent(route.replace('/resources/', ''))}.png`
      : 'https://mottobiz.com/og-image.png'
  const escTitle = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const escDesc = escTitle

  html = html.replace(
    /<link[^>]*rel=["']canonical["'][^>]*>/,
    `<link rel="canonical" href="${expectedCanonical}">`,
  )
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escTitle(meta.title)}</title>`,
  )
  html = html.replace(
    /<meta[^>]*name=["']description["'][^>]*>/,
    `<meta name="description" content="${escDesc(meta.description)}">`,
  )
  html = html.replace(
    /<meta[^>]*property=["']og:type["'][^>]*>/,
    `<meta property="og:type" content="${meta.ogType}">`,
  )
  html = html.replace(
    /<meta[^>]*property=["']og:title["'][^>]*>/,
    `<meta property="og:title" content="${escTitle(meta.title)}">`,
  )
  html = html.replace(
    /<meta[^>]*property=["']og:description["'][^>]*>/,
    `<meta property="og:description" content="${escDesc(meta.description)}">`,
  )
  html = html.replace(
    /<meta[^>]*property=["']og:url["'][^>]*>/,
    `<meta property="og:url" content="${expectedOgUrl}">`,
  )
  html = html.replace(
    /<meta[^>]*property=["']og:image["'][^>]*>/,
    `<meta property="og:image" content="${expectedOgImage}">`,
  )
  html = html.replace(
    /<meta[^>]*name=["']twitter:title["'][^>]*>/,
    `<meta name="twitter:title" content="${escTitle(meta.title)}">`,
  )
  html = html.replace(
    /<meta[^>]*name=["']twitter:description["'][^>]*>/,
    `<meta name="twitter:description" content="${escDesc(meta.description)}">`,
  )

  // Determine output path
  const routePath = route === '/' ? '/index.html' : `${route}/index.html`
  
  // 1. Write to public/ for local preview compatibility
  const outputPathPublic = join(PUBLIC_DIR, routePath)
  const outputDirPublic = dirname(outputPathPublic)
  mkdirSync(outputDirPublic, { recursive: true })
  writeFileSync(outputPathPublic, html, 'utf8')

  // 2. Write to repository root for Hostinger static deployment
  const outputPathRoot = join(ROOT_DIR, routePath)
  const outputDirRoot = dirname(outputPathRoot)
  mkdirSync(outputDirRoot, { recursive: true })
  writeFileSync(outputPathRoot, html, 'utf8')

  console.log(`  ✓ ${route}`)
  return outputPathRoot
}

async function main() {
  const PORT = 4175
  const BASE_URL = `http://localhost:${PORT}`

  console.log('\n🚀 MottoBiz Pre-renderer Starting...\n')

  const articleIndex = loadArticleIndex()
  console.log(`📚 Loaded metadata for ${articleIndex.size} articles from catalog\n`)

  const articleRoutes = getArticleRoutes()
  const allRoutes = [...STATIC_ROUTES, ...articleRoutes]
  console.log(`📄 Pre-rendering ${allRoutes.length} routes (${articleRoutes.length} articles + ${STATIC_ROUTES.length} pages)\n`)

  const server = await startServer(PORT)
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })

    // Suppress console noise from the page
    page.on('console', () => {})
    page.on('pageerror', () => {})

    let success = 0
    let failed = 0

    for (const route of allRoutes) {
      try {
        await prerenderRoute(page, BASE_URL, route, articleIndex)
        success++
      } catch (err) {
        console.error(`  ✗ ${route} — ${err.message}`)
        failed++
      }
    }

    console.log(`\n✅ Done! ${success} succeeded, ${failed} failed.\n`)
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
