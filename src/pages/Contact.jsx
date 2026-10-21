import { useSearchParams } from 'react-router-dom'
import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { LeadForm } from '../components/blocks/LeadForm'
import { Mail, Phone, Pin } from '../components/ui/Icons'
import { Container, Eyebrow } from '../components/ui/Layout'

function Channel({ icon: Icon, label, href, children }) {
  return (
    <li className="flex gap-4 border-t border-line py-4">
      <Icon className="size-5 shrink-0 text-muted" />
      <div>
        <p className="text-sm text-muted">{label}</p>
        <a href={href} className="mt-1 block leading-relaxed text-ink hover:text-accent" {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
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
    <section className="bg-paper pt-24 pb-10 sm:pt-28 sm:pb-14">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>{meta.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-headline font-semibold">{contactForm.title}</h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{contactForm.lede}</p>
          <h2 className="mt-10 text-sm font-medium text-ink">{l.reach}</h2>
          <ul className="mt-4 border-b border-line">
            <Channel icon={Mail} label={l.email} href={`mailto:${company.email}`}>{company.email}</Channel>
            <Channel icon={Phone} label={l.phone} href={company.phoneHref}>{company.phone}</Channel>
            <Channel icon={Pin} label={l.office} href={company.mapUrl}>{company.address}</Channel>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-white p-6 sm:p-8 lg:col-span-7">
          <LeadForm form={contactForm} responseTime={company.responseTime} initialInterest={interest} />
        </div>
      </Container>
    </section>
  )
}
