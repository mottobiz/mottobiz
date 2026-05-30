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

async function prerenderRoute(page, baseUrl, route) {
  const url = `${baseUrl}${route}`
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

  // Wait for React to render
  await page.waitForSelector('#root > *', { timeout: 10000 }).catch(() => {})

  const html = await page.content()

  // Determine output path
  const routePath = route === '/' ? '/index.html' : `${route}/index.html`
  const outputPath = join(PUBLIC_DIR, routePath)
  const outputDir = dirname(outputPath)
  mkdirSync(outputDir, { recursive: true })
  writeFileSync(outputPath, html, 'utf8')

  console.log(`  ✓ ${route}`)
  return outputPath
}

async function main() {
  const PORT = 4175
  const BASE_URL = `http://localhost:${PORT}`

  console.log('\n🚀 MottoBiz Pre-renderer Starting...\n')

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
        await prerenderRoute(page, BASE_URL, route)
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
