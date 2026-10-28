import { Link } from 'react-router-dom'
import { FOOTER, SOCIAL } from '../../content/siteConfig'
import { SERVICES } from '../../content/services'
import { cx } from '../../lib/cx'
import { Container, SECTION_PT } from '../ui/Layout'
import { Linkedin, Mail, Phone, Pin } from '../ui/Icons'

function Column({ title, links }) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-[0.14em] text-white uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link to={l.to} className="text-sm text-muted-dark transition-colors hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SOCIAL_ICONS = { linkedin: Linkedin }

export function SiteFooter({ company, industries, legal }) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-2 text-muted-dark">
      <Container className={cx('grid gap-10 pb-8 lg:grid-cols-12 lg:gap-10', SECTION_PT)}>
        <div className="lg:col-span-4">
          <img src={company.logo} alt={company.name} width="160" height="34" loading="lazy" className="h-8 w-auto" />
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">{FOOTER.description}</p>
          <ul className="mt-8 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 translate-y-0.5 text-accent-bright" />
              <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 translate-y-0.5 text-accent-bright" />
              <a href={company.phoneHref} className="hover:text-white">{company.phone}</a>
            </li>
            <li className="flex gap-3">
              <Pin className="size-4 shrink-0 translate-y-0.5 text-accent-bright" />
              <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="max-w-xs leading-relaxed hover:text-white">{company.address}</a>
            </li>
          </ul>
          {SOCIAL.length > 0 && (
            <ul className="mt-8 flex gap-3">
              {SOCIAL.map((s) => {
                const Icon = SOCIAL_ICONS[s.network]
                return (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex size-10 items-center justify-center rounded-[3px] border border-line-dark hover:border-white hover:text-white">
                      {Icon ? <Icon className="size-5" /> : s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:pl-10">
          <Column title="Services" links={SERVICES.map((s) => ({ label: s.title, to: s.to }))} />
          <Column title="Industries" links={industries.map((i) => ({ label: i.name, to: `/industries#${i.slug}` }))} />
          <Column title="Company" links={FOOTER.company} />
        </div>
      </Container>
      <Container>
        <div className="flex flex-col gap-3 border-t border-line-dark py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.legalName}. All rights reserved.</p>
          <ul className="flex gap-6">
            {legal.map((l) => (
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
