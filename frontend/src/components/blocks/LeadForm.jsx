import { useLeadForm } from '../../hooks/useLeadForm'
import { Button } from '../ui/Button'
import { SelectField, TextAreaField, TextField } from '../ui/Fields'
import { Check } from '../ui/Icons'

export function LeadForm({ form, responseTime, initialInterest }) {
  const { status, errors, values, field, update, submit } = useLeadForm({ interest: initialInterest || '' })
  const { options } = form

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border border-line bg-paper p-8 sm:p-10">
        <span className="flex size-10 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="size-5" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">Thank you, {values.name.split(' ')[0]}.</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Your message has reached our team. We will reply to {values.email} within {responseTime}, usually with a few
          questions and a suggested time to talk.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" autoComplete="name" required {...field('name')} />
        <TextField label="Work email" type="email" autoComplete="email" required {...field('email')} />
        <TextField label="Company" autoComplete="organization" optional {...field('company')} />
        <TextField label="Your role" autoComplete="organization-title" optional {...field('role')} />
      </div>
      <TextAreaField
        label="What are you trying to achieve?"
        hint="A few sentences on the process, system or product, and what success would look like."
        required
        {...field('goal')}
      />
      <SelectField label="Area of interest" options={options.interest} optional {...field('interest')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Project stage" options={options.stage} optional {...field('stage')} />
        <SelectField label="Timeline" options={options.timeline} optional {...field('timeline')} />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...field('website')} />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-body">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={update('consent')}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5 size-4 shrink-0 rounded border-line accent-accent"
          />
          <span>
            I agree that Srinishtha may contact me about this enquiry. {form.privacy}{' '}
            <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
              Privacy
            </a>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 text-sm text-danger">
            {errors.consent}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          We could not send your message. Please check the highlighted fields, or email us directly.
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We respond within {responseTime}.</p>
        <Button type="submit" arrow disabled={status === 'submitting'} className="disabled:opacity-60">
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}
