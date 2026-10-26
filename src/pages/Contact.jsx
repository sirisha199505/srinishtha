import { useSearchParams } from 'react-router-dom'
import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { LeadForm } from '../components/blocks/LeadForm'
import { PageHeader } from '../components/blocks/PageHeader'
import { brandColor, revealDelay } from '../lib/brand'
import { cx } from '../lib/cx'
import { ConnectedFrame } from '../components/ui/ConnectedFrame'
import { Mail, Phone, Pin } from '../components/ui/Icons'
import { Container, SECTION_Y } from '../components/ui/Layout'

// One way to reach us; the icon tile fills with the logo colours on hover.
function Channel({ icon: Icon, label, href, index, children }) {
  return (
    <li data-reveal style={revealDelay(index + 1, 120)} className="channel group flex gap-4 border-t border-line py-5">
      <span className="channel-icon flex size-10 shrink-0 items-center justify-center bg-accent-soft text-accent-strong">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">{label}</p>
        <a href={href} className="mt-1 block leading-relaxed font-medium text-ink hover:text-accent-strong" {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
          {children}
        </a>
      </div>
    </li>
  )
}

// What follows a message, as three connected steps; the line draws down as they appear.
function NextSteps({ responseTime }) {
  const steps = [
    { title: 'We read it', text: 'A senior member of our team reads every message.' },
    { title: 'We reply', text: `Within ${responseTime}, usually with a few questions.` },
    { title: 'We talk', text: 'A suggested time for a short call about your goals.' },
  ]
  return (
    <div data-reveal className="next-steps mt-10">
      <h2 className="text-xs font-semibold tracking-[0.14em] text-accent-strong uppercase">What happens next</h2>
      <ol className="relative mt-6 space-y-6">
        <span aria-hidden="true" className="next-line absolute top-2 bottom-2 left-[5px] w-0.5 bg-[linear-gradient(180deg,#ff8b26,#e54b7a,#8a3fd1)]" />
        {steps.map((s, i) => (
          <li key={s.title} className="next-step relative pl-8" style={{ '--i': i }}>
            <span aria-hidden="true" className="absolute top-1.5 left-0 size-3 rounded-full ring-4 ring-paper" style={{ background: brandColor(i) }} />
            <p className="font-semibold text-ink">{s.title}</p>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

// The form card arrives inside the brand line (ConnectedFrame) and its fields cascade in;
// the contact channels and next steps follow on the right (index.css: Contact page).
export default function Contact() {
  const { company, contactForm, labels } = useSite()
  const meta = usePageMeta('contact')
  const [params] = useSearchParams()
  const interest = contactForm.options.interest.some((o) => o.value === params.get('interest')) ? params.get('interest') : ''
  const l = labels.contact

  return (
    <>
      <PageHeader eyebrow={meta.eyebrow} heading="Let's talk about what you want to build." lede={contactForm.lede} crumbs={[{ label: 'Contact' }]} />
      <section className={cx('bg-paper', SECTION_Y)}>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="relative lg:col-span-7">
            <ConnectedFrame flush className="cf-still">
              <div className="border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(16,36,58,0.35)] sm:p-10">
                <h2 className="text-2xl font-semibold tracking-tight">{contactForm.title}</h2>
                <p className="mt-2 mb-8 text-muted">All fields marked optional can be left blank.</p>
                <LeadForm form={contactForm} responseTime={company.responseTime} initialInterest={interest} />
              </div>
            </ConnectedFrame>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <h2 data-reveal className="text-xs font-semibold tracking-[0.14em] text-accent-strong uppercase">{l.reach}</h2>
            <ul className="mt-5 border-b border-line">
              <Channel index={0} icon={Mail} label={l.email} href={`mailto:${company.email}`}>{company.email}</Channel>
              <Channel index={1} icon={Phone} label={l.phone} href={company.phoneHref}>{company.phone}</Channel>
              <Channel index={2} icon={Pin} label={l.office} href={company.mapUrl}>{company.address}</Channel>
            </ul>
            <NextSteps responseTime={company.responseTime} />
          </div>
        </Container>
      </section>
    </>
  )
}
