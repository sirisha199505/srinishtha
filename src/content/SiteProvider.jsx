import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'
import { StatusScreen } from '../components/ui/StatusScreen'

const SiteContext = createContext(null)

// The one content call: every page reads from this payload (GET /api/site).
export function SiteProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    let alive = true
    api
      .site()
      .then((data) => alive && setState({ status: 'ready', data }))
      .catch(() => alive && setState({ status: 'error', data: null }))
    return () => {
      alive = false
    }
  }, [])

  if (state.status === 'loading') return <StatusScreen loading />
  if (state.status === 'error') return <StatusScreen />
  return <SiteContext.Provider value={state.data}>{children}</SiteContext.Provider>
}

export function useSite() {
  const site = useContext(SiteContext)
  if (!site) throw new Error('useSite must be used inside <SiteProvider>')
  return site
}
