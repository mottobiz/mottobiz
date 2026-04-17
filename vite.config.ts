import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

function copyBuildArtifacts() {
  return {
    name: 'copy-build-artifacts',
    closeBundle() {
      const root = path.resolve(__dirname)
      const copy = (src: string, dest: string) => {
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(root, dest))
          console.log(`Copied ${src} → ${dest}`)
        }
      }
      const remove = (file: string) => {
        const p = path.join(root, file)
        if (fs.existsSync(p)) {
          fs.unlinkSync(p)
          console.log(`Removed ${file}`)
        }
      }
      copy('public/index.html', 'index.html')
      const html = fs.readFileSync(path.join(root, 'index.html'), 'utf-8')
      const updated = html.replace(/\.\/assets\//g, './public/assets/')
      fs.writeFileSync(path.join(root, 'index.html'), updated)
      remove('public/index.html')
      copy('public/favicon.svg', 'favicon.svg')
      copy('public/logo-static.svg', 'logo-static.svg')
      copy('public/logo-wordmark.svg', 'logo-wordmark.svg')
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyBuildArtifacts()],
  base: './',
  build: {
    outDir: 'public',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
