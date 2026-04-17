import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'path'
import fsLib from 'fs'

function copyIndexToRoot() {
  return {
    name: 'copy-index-to-root',
    closeBundle() {
      const src = path.resolve(__dirname, 'public/index.html')
      const dest = path.resolve(__dirname, 'index.html')
      const html = fsLib.readFileSync(src, 'utf-8')
      const updated = html.replace(/\.\/assets\//g, './public/assets/')
      fsLib.writeFileSync(dest, updated)
      fsLib.unlinkSync(src)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyIndexToRoot()],
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
