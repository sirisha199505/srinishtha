import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const API_TARGET = process.env.API_TARGET || 'http://localhost:9292'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: { '/api': API_TARGET, '/uploads': API_TARGET },
  },
  build: {
    // Vercel (and other static hosts) expect dist/. Locally, Roda serves the SPA
    // from backend/public (see backend/src/routes.rb). BUILD_OUT_DIR overrides both.
    outDir: process.env.BUILD_OUT_DIR || (process.env.VERCEL ? 'dist' : '../backend/public'),
    emptyOutDir: true,
  },
})
