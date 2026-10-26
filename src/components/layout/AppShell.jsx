import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSite } from '../../content/SiteProvider'
import { HEADER_CTA, NAV } from '../../content/siteConfig'
import { useReveal } from '../../hooks/useReveal'
import { SiteFooter } from './SiteFooter'
import { SiteHeader, buildMenus } from './SiteHeader'

function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
}

// The only layout component that reads content; it hands plain props to header/footer.
export function AppShell() {
  const site = useSite()
  const mainRef = useRef(null)
  useScrollRestoration()
  useReveal(mainRef)

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[3px] focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <SiteHeader company={site.company} nav={NAV} menus={buildMenus(site)} cta={HEADER_CTA} />
      <main id="main" ref={mainRef}>
        {/* Only the page content waits for its code; the header stays mounted */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter company={site.company} industries={site.industries} legal={site.navigation.legal} />
    </>
  )
}
