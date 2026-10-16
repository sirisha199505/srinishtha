import { useState } from 'react'
import { api } from '../lib/api'
import { readAttribution, track } from '../lib/track'

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const EMPTY = { name: '', email: '', company: '', role: '', goal: '', interest: '', stage: '', timeline: '', consent: false, website: '' }

// Client-side checks mirror App::Models::Lead#validate; the server stays authoritative.
function validate(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = 'Please enter your name.'
  if (!EMAIL.test(v.email.trim())) errors.email = 'Please enter a valid work email.'
  if (v.goal.trim().length < 10) errors.goal = 'Please tell us a little more (at least 10 characters).'
  if (!v.consent) errors.consent = 'Please confirm we may contact you about this enquiry.'
  return errors
}

const firstMessage = (value) => (Array.isArray(value) ? value[0] : value)

export function useLeadForm(initial = {}) {
  const [values, setValues] = useState({ ...EMPTY, ...initial })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [started, setStarted] = useState(false)

  const update = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (!started) {
      setStarted(true)
      track('contact_start')
    }
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest)
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      // Wait for the error state to render before moving focus to the first invalid field.
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    setStatus('submitting')
    try {
      await api.createLead({ ...values, source_page: window.location.pathname, attribution: readAttribution() })
      track('contact_submit', { interest: values.interest })
      setStatus('success')
    } catch (err) {
      if (err.errors) {
        setErrors(Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, `This field ${firstMessage(v)}.`])))
      }
      setStatus('error')
    }
  }

  // Props for a field by name: value, onChange and error message.
  const field = (name) => ({ name, value: values[name], onChange: update(name), error: errors[name] })

  return { values, errors, status, field, update, submit }
}
