import { Link } from 'react-router-dom'
import { capabilityPath } from '../../content/selectors'
import { Container } from '../ui/Layout'
import { Mail, Phone, Pin } from '../ui/Icons'

function Column({ title, links }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-muted-dark hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter({ company, navigation, capabilities }) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-muted-dark">
      <div aria-hidden="true" className="h-[3px] bg-brand-gradient" />
      <Container className="grid gap-10 py-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <img src={company.logo} alt={company.name} width="160" height="34" loading="lazy" className="h-8 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{company.promise}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 translate-y-0.5" />
              <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 translate-y-0.5" />
              <a href={company.phoneHref} className="hover:text-white">{company.phone}</a>
            </li>
            <li className="flex gap-3">
              <Pin className="size-4 shrink-0 translate-y-0.5" />
              <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-white">{company.address}</a>
            </li>
          </ul>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          <Column title="Capabilities" links={capabilities.map((c) => ({ label: c.title, to: capabilityPath(c.slug) }))} />
          <Column
            title="Explore"
            links={navigation.primary.filter((n) => !['Capabilities', 'Company'].includes(n.label)).map((n) => ({ label: n.label, to: n.to }))}
          />
          <Column title="Company" links={navigation.company} />
        </div>
      </Container>
      <Container>
        <div className="flex flex-col gap-3 border-t border-line-dark py-5 text-xs sm:flex-row sm:justify-between">
          <p>© {year} {company.legalName}. All rights reserved.</p>
          <ul className="flex gap-6">
            {navigation.legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
