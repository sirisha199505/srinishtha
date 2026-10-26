// Temporary local preview config (proxies to the live API). Safe to delete.
import base from './vite.config.js'
const target = 'https://srinishtha-api.onrender.com'
export default { ...base, server: { port: 5200, strictPort: true, watch: { usePolling: true, interval: 300 }, proxy: { '/api': { target, changeOrigin: true }, '/uploads': { target, changeOrigin: true } } } }
