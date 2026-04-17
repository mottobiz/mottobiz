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
      const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0A0A0B" />
    <title>Business Automation & Web Design in Surat | MottoBiz</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet" />
${mainCss ? `    <link rel="stylesheet" crossorigin href="./public/assets/${mainCss}">\n` : ''}    <script type="module" crossorigin src="./public/assets/${mainJs}"></script>
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

export default defineConfig({
  plugins: [react(), tailwindcss(), copyBuildArtifacts()],
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
})
