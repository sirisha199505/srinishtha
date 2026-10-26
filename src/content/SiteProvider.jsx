import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'
import snapshot from './siteSnapshot.json'

const SiteContext = createContext(null)
const CACHE_KEY = 'srinishtha.site'

// Last payload this browser received; falls back to the build-time snapshot.
function initialContent() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    if (cached) return cached
  } catch {
    /* storage blocked or corrupt: use the snapshot */
  }
  return snapshot
}

// All website content (GET /api/site). Pages render immediately from the cached or
// snapshot payload, then switch to live content when the API answers, so a slow or
// sleeping API never delays the first screen.
export function SiteProvider({ children }) {
  const [site, setSite] = useState(initialContent)

  useEffect(() => {
    let alive = true
    api
      .site()
      .then((data) => {
        if (!alive) return
        setSite(data)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        } catch {
          /* storage full or blocked: live content still shown */
        }
      })
      .catch(() => {
        /* API unreachable: keep showing the saved content */
      })
    return () => {
      alive = false
    }
  }, [])

  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>
}

export function useSite() {
  const site = useContext(SiteContext)
  if (!site) throw new Error('useSite must be used inside <SiteProvider>')
  return site
}
