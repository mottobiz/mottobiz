import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

function copyBuildArtifacts() {
  let generated = false
  return {
    name: 'copy-build-artifacts',
    buildStart() {
      generated = false
      const root = path.resolve(__dirname)
      const rootHtml = path.join(root, 'index.html')
      if (fs.existsSync(rootHtml)) {
        fs.unlinkSync(rootHtml)
        console.log('Removed root index.html before build')
      }
      const assetsDir = path.join(root, 'public/assets')
      if (fs.existsSync(assetsDir)) {
        fs.rmSync(assetsDir, { recursive: true, force: true })
        console.log('Cleared public/assets/ before build')
      }
    },
    writeBundle(_options: any, bundle: Record<string, any>) {
      if (generated) return
      generated = true
      const root = path.resolve(__dirname)
      const copy = (src: string, dest: string) => {
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(root, dest))
          console.log(`Copied ${src} → ${dest}`)
        }
      }
      const mainChunk = Object.values(bundle).find(
        (f: any) => f.type === 'chunk' && f.isEntry && f.name === 'main',
      ) as any
      const cssFile = Object.values(bundle).find(
        (f: any) => f.type === 'asset' && f.fileName.endsWith('.css'),
      ) as any
      if (!mainChunk) return
      const mainJs = mainChunk.fileName.replace(/^assets\//, '')
      const mainCss = cssFile?.fileName.replace(/^assets\//, '') || ''
      const staticFiles = ['favicon.svg', 'logo-static.svg', 'logo-wordmark.svg']
      staticFiles.forEach((f) => copy(path.join(root, 'public', f), f))
      // Copy critical files that must be served from the repo root on Hostinger
      const rootStaticFiles = [
        'sitemap.xml',
        'robots.txt',
        'llms.txt',
        'pricing.md',
        'og-image.png',
        'og-image-new.png',
        'icons.svg',
      ]
      rootStaticFiles.forEach((f) => copy(path.join(root, 'public', f), f))
      // Copy .htaccess to root (no leading dot issue with copyFileSync)
      copy(path.join(root, 'public', '.htaccess'), '.htaccess')
      const html = `<!doctype html>
<html lang="en">
  <head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BRP7Y43MN6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BRP7Y43MN6');
    </script>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0A0A0B" />
    <title>AI Business Automation in Surat | MottoBiz — Free Audit</title>
    <!-- Static fallback meta tags for crawlers & social bots -->
    <meta name="description" content="MottoBiz helps solopreneurs and small businesses in Surat automate WhatsApp follow-ups, lead pipelines, and social media — without hiring a team. Book a free 30-min audit." />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="MottoBiz" />
    <link rel="canonical" href="https://mottobiz.com" />
    <meta property="og:type" content="business.business" />
    <meta property="og:url" content="https://mottobiz.com" />
    <meta property="og:title" content="AI Business Automation in Surat | MottoBiz" />
    <meta property="og:description" content="Surat's first AI business automation studio. WhatsApp automation, lead pipelines, smart websites — all done-for-you. Book a free audit today." />
    <meta property="og:image" content="https://mottobiz.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:site_name" content="MottoBiz" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@mottobiz" />
    <meta name="twitter:title" content="AI Business Automation in Surat | MottoBiz" />
    <meta name="twitter:description" content="Surat's first AI business automation studio. WhatsApp automation, lead pipelines, smart websites — done-for-you." />
    <meta name="twitter:image" content="https://mottobiz.com/og-image.png" />
    <meta name="geo.region" content="IN-GJ" />
    <meta name="geo.placename" content="Surat" />
    <meta name="geo.position" content="21.1702;72.8311" />
    <meta name="ICBM" content="21.1702, 72.8311" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet" />
${mainCss ? `    <link rel="stylesheet" crossorigin href="./assets/${mainCss}">\n` : ''}    <script type="module" crossorigin src="./assets/${mainJs}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
      fs.writeFileSync(path.join(root, 'index.html'), html)
      console.log(`Generated index.html with ${mainJs}`)
    },
  }
}

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      command === 'build' ? copyBuildArtifacts() : null
    ].filter(Boolean),
    base: './',
    build: {
      outDir: 'public',
      emptyOutDir: false,
      rollupOptions: {
        input: path.resolve(__dirname, 'src/main.tsx'),
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
