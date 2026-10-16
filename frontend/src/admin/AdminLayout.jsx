import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { adminApi, session } from '../lib/api'
import { cx } from '../lib/cx'

const NAV = [
  { to: '/admin', label: 'Enquiries', end: true },
  { to: '/admin/projects', label: 'Project archive' },
  { to: '/admin/case-studies', label: 'Case studies' },
]

// Guards every admin page: no valid token → login screen.
export function AdminLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [state, setState] = useState(session.get() ? 'checking' : 'anonymous')

  useEffect(() => {
    if (state !== 'checking') return
    adminApi
      .me()
      .then((me) => {
        setUser(me)
        setState('ready')
      })
      .catch(() => setState('anonymous'))
  }, [state])

  useEffect(() => {
    document.title = 'Admin | Srinishtha'
  }, [])

  if (state === 'anonymous') return <Navigate to="/admin/login" replace />
  if (state === 'checking') return <div className="min-h-screen bg-ink" />

  const signOut = () => {
    session.clear()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-paper bg-[radial-gradient(ellipse_at_top_right,rgba(255,139,38,0.10),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(138,63,209,0.10),transparent_50%)] bg-fixed lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-ink bg-[radial-gradient(ellipse_at_top,rgba(138,63,209,0.25),transparent_60%)] text-muted-dark lg:min-h-screen lg:border-b-0">
        <div className="h-[3px] bg-brand-gradient" />
        <div className="flex items-center justify-between gap-4 p-5 lg:block">
          <img src="/images/logo1.png" alt="Srinishtha" className="h-7 w-auto" />
          <p className="text-xs lg:mt-2">Admin</p>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-0">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cx('whitespace-nowrap rounded-md px-3 py-2 text-sm', isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden border-t border-line-dark p-5 text-xs lg:mt-6 lg:block">
          <p className="text-white">{user?.full_name}</p>
          <p className="mt-0.5 truncate">{user?.email}</p>
          <div className="mt-4 flex gap-4">
            <button onClick={signOut} className="hover:text-white">Sign out</button>
            <a href="/" className="hover:text-white">View site</a>
          </div>
        </div>
      </aside>
      <main className="min-w-0 p-5 sm:p-8">
        <Outlet />
        <button onClick={signOut} className="mt-10 text-sm text-muted underline lg:hidden">Sign out</button>
      </main>
    </div>
  )
}

export function AdminPageTitle({ title, lede, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {lede && <p className="mt-1 text-sm text-muted">{lede}</p>}
      </div>
      {action}
    </div>
  )
}
