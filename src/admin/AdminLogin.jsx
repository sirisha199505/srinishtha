import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { PasswordField, TextField } from '../components/ui/Fields'
import { adminApi, session } from '../lib/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { token } = await adminApi.login(values.email.trim(), values.password)
      session.set(token)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message === 'Request failed' ? 'Could not sign in. Please try again.' : err.message)
      setBusy(false)
    }
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4">
      <img src="/images/office-space.jpeg" alt="" className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/95 via-[#160d2e]/90 to-[#4a1d6e]/70" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-brand-gradient" />
      <div className="w-full max-w-sm">
        <img src="/images/logo1.png" alt="Srinishtha" className="mx-auto h-9 w-auto" />
        <p className="mt-3 text-center text-sm text-white/60">Website admin</p>
        <form onSubmit={submit} className="mt-6 grid gap-5 rounded-xl border border-white/10 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-8">
          <div>
            <h1 className="text-xl font-semibold">Admin sign in</h1>
            <p className="mt-1 text-sm text-muted">Enquiries and website content.</p>
          </div>
          <TextField label="Email" type="email" autoComplete="username" value={values.email} onChange={update('email')} required />
          <PasswordField label="Password" autoComplete="current-password" value={values.password} onChange={update('password')} required />
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
          <Button type="submit" disabled={busy} className="disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}
