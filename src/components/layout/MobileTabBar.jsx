import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cx } from '../../lib/cx'
import { Briefcase, Close, Dots, Grid, Home, Layers } from '../ui/Icons'

const ICONS = { '/': Home, '/capabilities': Grid, '/solutions': Layers, '/work': Briefcase }

// Slide-up panel listing a tab's sub-pages.
function Sheet({ title, groups, onClose }) {
  return (
    <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-ink/40" />
      <div className="sheet-up absolute inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white px-5 pt-4 pb-5 shadow-[0_-20px_40px_-20px_rgba(11,15,26,0.35)]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-semibold text-ink">{title}</p>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-muted hover:bg-paper">
            <Close className="size-5" />
          </button>
        </div>
        {groups.map((group) => (
          <div key={group.title || 'links'} className="mb-3 last:mb-0">
            {group.title && <p className="mb-1 text-xs font-medium tracking-wide text-accent uppercase">{group.title}</p>}
            <ul className="divide-y divide-line">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="block py-3 text-[0.9375rem] text-ink">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// App-style bottom navigation for phones and tablets (replaces a hamburger menu).
export function MobileTabBar({ navigation, menus }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(null)
  const m = navigation.mobile

  useEffect(() => setOpen(null), [pathname])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const primary = navigation.primary
  const tabItems = m.tabs.map((to) => primary.find((p) => p.to === to)).filter(Boolean)
  const rest = primary.filter((p) => !m.tabs.includes(p.to))
  const tabs = [
    { key: 'home', label: m.home, to: '/', icon: Home },
    ...tabItems.map((item) => ({
      key: item.to,
      label: item.label,
      to: item.to,
      icon: ICONS[item.to] || Grid,
      sheet: item.menu && { title: item.label, groups: [{ items: [{ label: `${m.all}: ${item.label}`, to: item.to }, ...menus[item.menu]] }] },
    })),
    {
      key: 'more',
      label: m.more,
      icon: Dots,
      sheet: {
        title: m.more,
        groups: [
          { title: m.explore, items: rest.filter((p) => !p.menu).map((p) => ({ label: p.label, to: p.to })) },
          ...rest.filter((p) => p.menu).map((p) => ({ title: p.label, items: menus[p.menu] })),
        ],
      },
    },
  ]
  const isActive = (tab) =>
    tab.key === 'more'
      ? tab.sheet.groups.some((g) => g.items.some((i) => pathname === i.to.split('#')[0]))
      : tab.to === '/' ? pathname === '/' : pathname.startsWith(tab.to)
  const current = tabs.find((t) => t.key === open)

  return (
    <>
      {current?.sheet && <Sheet title={current.sheet.title} groups={current.sheet.groups} onClose={() => setOpen(null)} />}
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <ul className="mx-auto grid max-w-xl grid-cols-5">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = open ? open === tab.key : isActive(tab)
            const cls = cx('flex h-16 flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium transition-colors', active ? 'text-accent' : 'text-muted')
            const content = (
              <>
                <span className={cx('flex h-7 w-12 items-center justify-center rounded-full transition-colors', active && 'bg-accent-soft')}>
                  <Icon className="size-[22px]" />
                </span>
                <span className="max-w-full truncate px-1">{tab.label}</span>
              </>
            )
            return (
              <li key={tab.key}>
                {tab.sheet ? (
                  <button type="button" aria-expanded={open === tab.key} onClick={() => setOpen(open === tab.key ? null : tab.key)} className={cx(cls, 'w-full')}>
                    {content}
                  </button>
                ) : (
                  <NavLink to={tab.to} className={cls} onClick={() => setOpen(null)}>
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
