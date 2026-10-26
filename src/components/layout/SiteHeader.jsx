import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { solutionPath } from '../../content/selectors'
import { ABOUT_MENU, WORK_MENU } from '../../content/siteConfig'
import { SERVICES } from '../../content/services'
import { useScrolled } from '../../hooks/useScrolled'
import { cx } from '../../lib/cx'
import { Button, TextLink } from '../ui/Button'
import { Container } from '../ui/Layout'
import { ChevronDown, Close, Menu, NamedIcon } from '../ui/Icons'

const isActive = (item, pathname) =>
  item.to === '/' ? pathname === '/' : (item.match || [item.to]).some((p) => pathname.startsWith(p))

function MenuList({ items, onNavigate, compact = false }) {
  return (
    <ul className={cx('grid', compact ? 'gap-0.5' : 'gap-1')}>
      {items.map((item) => (
        <li key={item.to + item.label}>
          <Link to={item.to} onClick={onNavigate} className="group flex gap-3 rounded-[3px] px-3 py-2.5 hover:bg-paper">
            {item.icon && <NamedIcon name={item.icon} className="mt-0.5 size-5 shrink-0 text-accent-strong" />}
            <span>
              <span className="block text-[0.9375rem] font-medium text-ink group-hover:text-accent-strong">{item.label}</span>
              {item.text && !compact && <span className="mt-0.5 block text-sm leading-snug text-muted">{item.text}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function ServicesPanel({ menus, onNavigate }) {
  return (
    <div className="grid w-[min(94vw,980px)] grid-cols-12 overflow-hidden rounded-[4px] border border-line bg-canvas shadow-[0_30px_60px_-30px_rgba(23,33,43,0.4)]">
      <div className="col-span-4 bg-navy bg-blueprint p-8 text-white">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent-bright uppercase">Services</p>
        <p className="mt-4 text-xl leading-snug font-semibold tracking-tight">Engineering for every stage of your technology journey.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-dark">From strategy and discovery to cloud operations and long-term support.</p>
        <TextLink to="/capabilities" inverse className="mt-8">
          All services
        </TextLink>
      </div>
      <div className="col-span-5 p-5">
        <p className="px-3 pb-2 text-xs font-semibold tracking-[0.12em] text-muted uppercase">What we do</p>
        <MenuList items={menus.services} onNavigate={onNavigate} compact />
      </div>
      <div className="col-span-3 border-l border-line bg-paper/60 p-5">
        <p className="px-3 pb-2 text-xs font-semibold tracking-[0.12em] text-muted uppercase">Solutions</p>
        <MenuList items={menus.solutions} onNavigate={onNavigate} compact />
      </div>
    </div>
  )
}

function DropdownPanel({ menu, menus, onNavigate }) {
  return (
    <div className={cx('panel-in absolute top-full pt-3', menu === 'services' ? 'left-1/2 -translate-x-[38%]' : 'left-1/2 -translate-x-1/2')}>
      {menu === 'services' ? (
        <ServicesPanel menus={menus} onNavigate={onNavigate} />
      ) : (
        <div className="w-[380px] rounded-[4px] border border-line bg-canvas p-3 shadow-[0_30px_60px_-30px_rgba(23,33,43,0.4)]">
          <MenuList items={menus[menu]} onNavigate={onNavigate} />
        </div>
      )}
    </div>
  )
}

function DesktopNav({ nav, menus, pathname }) {
  const [open, setOpen] = useState(null)
  const ref = useRef(null)
  const timer = useRef(null)

  useEffect(() => setOpen(null), [pathname])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  // Small close delay so the pointer can travel from the trigger into the panel.
  const hover = (menu) => {
    clearTimeout(timer.current)
    if (menu) setOpen(menu)
    else timer.current = setTimeout(() => setOpen(null), 120)
  }

  return (
    <nav ref={ref} aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center">
        {nav.map((item) => {
          const active = isActive(item, pathname)
          const cls = cx(
            'group relative flex h-[76px] items-center gap-1 px-3 text-[0.9375rem] font-medium transition-colors xl:px-4',
            active ? 'text-accent-strong' : 'text-body hover:text-ink',
          )
          // Amber bar marks the current section; a gold one follows the pointer.
          const bar = (
            <span
              aria-hidden="true"
              className={cx(
                'absolute inset-x-3 bottom-4 h-0.5 transition-transform duration-300 xl:inset-x-4',
                active ? 'scale-x-100 bg-accent' : cx('bg-gold group-hover:scale-x-100', open === item.menu ? 'scale-x-100' : 'scale-x-0'),
              )}
            />
          )
          return (
            <li key={item.label} className="relative" onMouseEnter={() => item.menu && hover(item.menu)} onMouseLeave={() => item.menu && hover(null)}>
              {item.menu ? (
                <>
                  <button
                    type="button"
                    className={cls}
                    aria-expanded={open === item.menu}
                    onClick={() => setOpen(open === item.menu ? null : item.menu)}
                  >
                    {item.label}
                    <ChevronDown className={cx('size-4 transition-transform duration-200', open === item.menu && 'rotate-180')} />
                    {bar}
                  </button>
                  {open === item.menu && <DropdownPanel menu={item.menu} menus={menus} onNavigate={() => setOpen(null)} />}
                </>
              ) : (
                <NavLink to={item.to} end={item.to === '/'} className={cls}>
                  {item.label}
                  {bar}
                </NavLink>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function MobileMenu({ nav, menus, cta, company, onClose, pathname }) {
  const [expanded, setExpanded] = useState(() => nav.find((n) => n.menu && isActive(n, pathname))?.menu || null)
  const panelRef = useRef(null)

  useEffect(() => {
    panelRef.current?.querySelector('a, button')?.focus()
  }, [])

  return (
    <div id="mobile-menu" ref={panelRef} className="fixed inset-x-0 top-[68px] bottom-0 z-40 flex flex-col overflow-y-auto border-t border-line bg-canvas lg:hidden" style={{ animation: 'fade-in 200ms ease-out both' }}>
      <nav aria-label="Mobile" className="flex-1 px-5 pt-2 pb-6 sm:px-8">
        <ul className="divide-y divide-line">
          {nav.map((item) => (
            <li key={item.label}>
              {item.menu ? (
                <>
                  <button
                    type="button"
                    aria-expanded={expanded === item.menu}
                    onClick={() => setExpanded(expanded === item.menu ? null : item.menu)}
                    className={cx('flex min-h-14 w-full items-center justify-between text-left text-lg font-semibold', isActive(item, pathname) ? 'text-accent-strong' : 'text-ink')}
                  >
                    {item.label}
                    <ChevronDown className={cx('size-5 text-muted transition-transform duration-200', expanded === item.menu && 'rotate-180')} />
                  </button>
                  {expanded === item.menu && (
                    <div className="pb-4">
                      <Link to={item.to} onClick={onClose} className="block py-2.5 text-[0.9375rem] font-semibold text-accent-strong">
                        {item.label} overview
                      </Link>
                      <ul>
                        {(item.menu === 'services' ? menus.services : menus[item.menu]).map((sub) => (
                          <li key={sub.to + sub.label}>
                            <Link to={sub.to} onClick={onClose} className="block py-2.5 text-[0.9375rem] text-body">
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <NavLink to={item.to} end={item.to === '/'} onClick={onClose} className={cx('flex min-h-14 items-center text-lg font-semibold', isActive(item, pathname) ? 'text-accent-strong' : 'text-ink')}>
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-line bg-paper px-5 py-6 sm:px-8">
        <Button to={cta.to} arrow className="w-full" onClick={onClose}>
          {cta.label}
        </Button>
        <p className="mt-4 text-center text-sm text-muted">
          <a href={`mailto:${company.email}`} className="hover:text-ink">{company.email}</a>
          <span aria-hidden="true" className="mx-2">·</span>
          <a href={company.phoneHref} className="hover:text-ink">{company.phone}</a>
        </p>
      </div>
    </div>
  )
}

// `menus` maps a nav item's `menu` key to its dropdown items (see buildMenus).
export function SiteHeader({ company, nav, menus, cta }) {
  const scrolled = useScrolled(8)
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => setMobileOpen(false), [pathname])
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setMobileOpen(false)
      toggleRef.current?.focus()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  return (
    <>
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b bg-canvas transition-[border-color,box-shadow] duration-300',
        scrolled || mobileOpen ? 'border-line shadow-[0_10px_30px_-22px_rgba(23,33,43,0.45)]' : 'border-transparent',
      )}
    >
      <Container className="flex h-[68px] items-center justify-between gap-6 lg:h-[76px]">
        <Link to="/" className="shrink-0" aria-label={`${company.name} home`}>
          <img src={company.logo} alt={company.name} width="160" height="34" className="h-7 w-auto lg:h-8" />
        </Link>

        <DesktopNav nav={nav} menus={menus} pathname={pathname} />

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button to={cta.to} arrow className="min-h-11 px-5 text-sm">
              {cta.label}
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
            className="-mr-2 flex size-11 items-center justify-center rounded-[3px] text-ink hover:bg-paper lg:hidden"
          >
            {mobileOpen ? <Close className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>
    </header>
    {/* Sibling of the header, so the fixed panel is positioned against the viewport */}
    {mobileOpen && <MobileMenu nav={nav} menus={menus} cta={cta} company={company} pathname={pathname} onClose={() => setMobileOpen(false)} />}
    </>
  )
}

// Builds dropdown items from content so menus never drift from pages.
export function buildMenus(site) {
  return {
    services: SERVICES.map((s) => ({ label: s.title, text: s.text, to: s.to, icon: s.icon })),
    solutions: site.solutions.map((s) => ({ label: s.title, to: solutionPath(s.slug) })),
    work: WORK_MENU,
    about: ABOUT_MENU,
  }
}
