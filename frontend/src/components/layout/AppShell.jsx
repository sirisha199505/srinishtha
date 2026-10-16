import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSite } from '../../content/SiteProvider'
import { useReveal } from '../../hooks/useReveal'
import { SiteFooter } from './SiteFooter'
import { SiteHeader, buildMenus } from './SiteHeader'

function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
}

// The only layout component that reads content; it hands plain props to header/footer.
export function AppShell() {
  const site = useSite()
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  useScrollRestoration()
  useReveal(mainRef)

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <SiteHeader
        company={site.company}
        navigation={site.navigation}
        menus={buildMenus(site)}
        cta={site.ctas.global.primary}
        overHero={pathname === '/'}
      />
      <main id="main" ref={mainRef}>
        <Outlet />
      </main>
      <SiteFooter company={site.company} navigation={site.navigation} capabilities={site.capabilities} />
    </>
  )
}
