import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './index.css'
import { captureAttribution } from './lib/track'
import App from './App'

captureAttribution()

// After a deploy, a page opened on the previous build asks for code chunks that no longer
// exist. Reload once to pick up the new build instead of leaving the route blank.
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()
  try {
    const last = Number(sessionStorage.getItem('srinishtha.reloadedAt'))
    if (last && Date.now() - last < 10000) return
    sessionStorage.setItem('srinishtha.reloadedAt', String(Date.now()))
  } catch {
    /* storage blocked: still reload once */
  }
  window.location.reload()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
