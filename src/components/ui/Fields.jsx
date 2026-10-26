import { useId, useState } from 'react'
import { cx } from '../../lib/cx'
import { Eye, EyeOff } from './Icons'

const CONTROL =
  'block min-h-12 w-full rounded-[3px] border bg-white px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'

// Visible label, hint and accessible inline error for any form control.
function Field({ label, hint, error, optional, children }) {
  const id = useId()
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-muted">Optional</span>}
      </label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

const borderFor = (error) => (error ? 'border-danger' : 'border-line')

export function TextField({ label, hint, error, optional, className, ...input }) {
  return (
    <Field label={label} hint={hint} error={error} optional={optional}>
      {(a11y) => <input className={cx(CONTROL, borderFor(error), className)} {...a11y} {...input} />}
    </Field>
  )
}

// Password input with a show/hide toggle.
export function PasswordField({ label, hint, error, optional, className, ...input }) {
  const [visible, setVisible] = useState(false)
  const Toggle = visible ? EyeOff : Eye
  return (
    <Field label={label} hint={hint} error={error} optional={optional}>
      {(a11y) => (
        <div className="relative">
          <input type={visible ? 'text' : 'password'} className={cx(CONTROL, borderFor(error), 'pr-11', className)} {...a11y} {...input} />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-[3px] text-muted hover:text-ink"
          >
            <Toggle className="size-5" />
          </button>
        </div>
      )}
    </Field>
  )
}

export function TextAreaField({ label, hint, error, optional, ...input }) {
  return (
    <Field label={label} hint={hint} error={error} optional={optional}>
      {(a11y) => <textarea rows={5} className={cx(CONTROL, borderFor(error), 'resize-y')} {...a11y} {...input} />}
    </Field>
  )
}

export function SelectField({ label, hint, error, optional, options, placeholder = 'Select…', ...input }) {
  return (
    <Field label={label} hint={hint} error={error} optional={optional}>
      {(a11y) => (
        <select className={cx(CONTROL, borderFor(error), 'appearance-none bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10')} style={{ backgroundImage: SELECT_CHEVRON }} {...a11y} {...input}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  )
}

const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7080' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"
