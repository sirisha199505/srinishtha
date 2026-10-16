import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { capabilityPath, solutionPath } from '../../content/selectors'
import { useScrolled } from '../../hooks/useScrolled'
import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { Container } from '../ui/Layout'
import { ChevronDown, Close, Menu } from '../ui/Icons'

function MenuPanel({ items, onNavigate }) {
  return (
    <div className="absolute left-1/2 top-full w-[min(92vw,640px)] -translate-x-1/2 pt-3">
      <ul className="grid gap-1 rounded-lg border border-line bg-white p-3 shadow-[0_24px_48px_-24px_rgba(11,15,26,0.25)] sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} onClick={onNavigate} className="block rounded-md px-4 py-3 hover:bg-paper">
              <span className="block text-[0.9375rem] font-medium text-ink">{item.label}</span>
              {item.text && <span className="mt-1 block text-sm leading-snug text-muted">{item.text}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const linkTone = (light) => (light ? 'text-white/85 hover:text-white' : 'text-body hover:text-ink')

// `menus` maps a nav item's `menu` key to its dropdown items.
export function SiteHeader({ company, navigation, menus, cta, overHero }) {
  const scrolled = useScrolled()
  const { pathname } = useLocation()
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)
  const light = overHero && !scrolled && !mobileOpen

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (setOpenMenu(null), setMobileOpen(false))
    const onClick = (e) => navRef.current && !navRef.current.contains(e.target) && setOpenMenu(null)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        light ? 'border-transparent bg-transparent' : mobileOpen ? 'border-line bg-white' : 'border-line bg-white/95 backdrop-blur',
      )}
    >
      <div aria-hidden="true" className="h-[3px] bg-brand-gradient" />
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" className="shrink-0" aria-label={`${company.name} home`}>
          <img src={company.logo} alt={company.name} width="160" height="34" className="h-8 w-auto" />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.primary.map((item) => {
              const items = item.menu && menus[item.menu]
              const active = pathname.startsWith(item.to)
              const cls = cx('flex items-center gap-1 rounded-md px-3 py-2 text-[0.9375rem] transition-colors', linkTone(light), active && !light && 'text-ink')
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => items && setOpenMenu(item.menu)}
                  onMouseLeave={() => items && setOpenMenu(null)}
                >
                  {items ? (
                    <>
                      <button
                        className={cls}
                        aria-expanded={openMenu === item.menu}
                        onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu)}
                      >
                        {item.label}
                        <ChevronDown className={cx('size-4 transition-transform', openMenu === item.menu && 'rotate-180')} />
                      </button>
                      {openMenu === item.menu && <MenuPanel items={items} onNavigate={() => setOpenMenu(null)} />}
                    </>
                  ) : (
                    <NavLink to={item.to} className={cls}>
                      {item.label}
                    </NavLink>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button to={cta.to} className="min-h-10 px-4 text-sm">
              {cta.label}
            </Button>
          </div>
          <button
            className={cx('rounded-md p-2 lg:hidden', light ? 'text-white' : 'text-ink')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <Close className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <Container className="py-6">
            <ul className="divide-y divide-line border-b border-line">
              {navigation.primary.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="block py-4 text-xl font-medium text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button to={cta.to} arrow className="mt-8 w-full">
              {cta.label}
            </Button>
            <p className="mt-6 text-sm text-muted">
              {company.email} · {company.phone}
            </p>
          </Container>
        </nav>
      )}
    </header>
  )
}

// Builds dropdown items from content so menus never drift from pages.
export function buildMenus(site) {
  return {
    capabilities: site.capabilities.map((c) => ({ label: c.title, text: c.outcome, to: capabilityPath(c.slug) })),
    solutions: site.solutions.map((s) => ({ label: s.title, text: s.problems.slice(0, 2).join(', '), to: solutionPath(s.slug) })),
    company: site.navigation.company,
  }
}
