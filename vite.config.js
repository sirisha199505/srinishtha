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
    // Roda serves the built SPA from backend/public (see backend/src/routes.rb)
    outDir: '../backend/public',
    emptyOutDir: true,
  },
})
