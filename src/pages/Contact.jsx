import { useSearchParams } from 'react-router-dom'
import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { LeadForm } from '../components/blocks/LeadForm'
import { PageHeader } from '../components/blocks/PageHeader'
import { Mail, Phone, Pin } from '../components/ui/Icons'
import { Container } from '../components/ui/Layout'

function Channel({ icon: Icon, label, href, children }) {
  return (
    <li className="flex gap-4 border-t border-line py-5">
      <span className="flex size-10 shrink-0 items-center justify-center bg-accent-soft text-accent-strong">
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

export default function Contact() {
  const { company, contactForm, labels } = useSite()
  const meta = usePageMeta('contact')
  const [params] = useSearchParams()
  const interest = contactForm.options.interest.some((o) => o.value === params.get('interest')) ? params.get('interest') : ''
  const l = labels.contact

  return (
    <>
      <PageHeader eyebrow={meta.eyebrow} heading="Let's talk about what you want to build." lede={contactForm.lede} crumbs={[{ label: 'Contact' }]} />
      <section className="bg-paper pb-20 sm:pb-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative -mt-8 border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(16,36,58,0.35)] sm:-mt-10 sm:p-10 lg:col-span-7">
            <h2 className="text-2xl font-semibold tracking-tight">{contactForm.title}</h2>
            <p className="mt-2 mb-8 text-muted">All fields marked optional can be left blank.</p>
            <LeadForm form={contactForm} responseTime={company.responseTime} initialInterest={interest} />
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-accent-strong uppercase">{l.reach}</h2>
            <ul className="mt-5 border-b border-line">
              <Channel icon={Mail} label={l.email} href={`mailto:${company.email}`}>{company.email}</Channel>
              <Channel icon={Phone} label={l.phone} href={company.phoneHref}>{company.phone}</Channel>
              <Channel icon={Pin} label={l.office} href={company.mapUrl}>{company.address}</Channel>
            </ul>
            <p className="mt-8 border-l-2 border-accent pl-5 text-[0.9375rem] leading-relaxed text-muted">
              A senior member of our team reads every message and responds within {company.responseTime}.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
