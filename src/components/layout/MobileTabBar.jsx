import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cx } from '../../lib/cx'
import { Briefcase, Building, Close, Dots, Grid, Home } from '../ui/Icons'

const ICONS = { '/': Home, '/capabilities': Grid, '/industries': Building, '/work': Briefcase, '/about': Dots }

const isActive = (item, pathname) =>
  item.to === '/' ? pathname === '/' : (item.match || [item.to]).some((p) => pathname.startsWith(p))

// Panel that slides up above the tab bar, listing a section's pages.
function Sheet({ title, items, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.querySelector('a')?.focus()
  }, [])

  return (
    <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" aria-label="Close" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-ink/50" style={{ animation: 'fade-in 200ms ease-out both' }} />
      <div ref={ref} className="sheet-up absolute inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] max-h-[70svh] overflow-y-auto rounded-t-2xl border-t-2 border-gold bg-canvas px-5 pt-4 pb-4 shadow-[0_-20px_40px_-20px_rgba(23,33,43,0.45)]">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent-strong uppercase">{title}</p>
          <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 flex size-10 items-center justify-center rounded-full text-muted hover:bg-paper">
            <Close className="size-5" />
          </button>
        </div>
        <ul className="divide-y divide-line">
          {items.map((item) => (
            <li key={item.to + item.label}>
              <Link to={item.to} onClick={onClose} className="flex min-h-12 items-center text-[0.9375rem] font-medium text-ink hover:text-accent-strong">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// App-style bottom navigation for phones and tablets (replaces a hamburger menu).
// `nav` is the primary navigation; items with a `menu` open a sheet of their sub-pages.
// Contact has no tab of its own: it sits in the About sheet and in the header CTA.
export function MobileTabBar({ nav, menus }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(null)

  useEffect(() => setOpen(null), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const contact = nav.find((n) => n.to === '/contact')
  const tabs = nav
    .filter((n) => n !== contact)
    .map((n) => ({
      ...n,
      label: n.short || n.label,
      sheet: n.menu && [{ label: `${n.label} overview`, to: n.to }, ...menus[n.menu], ...(n.menu === 'about' && contact ? [contact] : [])],
    }))
  const current = tabs.find((t) => t.menu && t.menu === open)

  return (
    <>
      {current && <Sheet title={current.label} items={current.sheet} onClose={() => setOpen(null)} />}
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-24px_rgba(23,33,43,0.5)] lg:hidden">
        <ul className="mx-auto grid max-w-xl" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
          {tabs.map((tab) => {
            const Icon = ICONS[tab.to] || Grid
            const active = open ? open === tab.menu : isActive(tab, pathname) || (tab.menu === 'about' && pathname.startsWith('/contact'))
            const cls = cx(
              'flex h-16 w-full flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium transition-colors',
              active ? 'text-accent-strong' : 'text-muted hover:text-ink',
            )
            const content = (
              <>
                <span className={cx('flex h-7 w-12 items-center justify-center rounded-full transition-colors', active && 'bg-accent-soft')}>
                  <Icon className="size-[22px]" />
                </span>
                <span className="max-w-full truncate px-1">{tab.label}</span>
              </>
            )
            return (
              <li key={tab.to}>
                {tab.menu ? (
                  <button type="button" aria-expanded={open === tab.menu} onClick={() => setOpen(open === tab.menu ? null : tab.menu)} className={cls}>
                    {content}
                  </button>
                ) : (
                  <NavLink to={tab.to} end={tab.to === '/'} className={cls}>
                    {content}
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
