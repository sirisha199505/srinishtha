import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSite } from '../content/SiteProvider'
import { bySlug, capabilityPath, industryName, pickSlugs, testimonialFor } from '../content/selectors'
import { usePageMeta } from '../hooks/usePageMeta'
import { track } from '../lib/track'
import { CaseStudyGrid } from '../components/blocks/CaseStudyCard'
import { PageHeader } from '../components/blocks/PageHeader'
import { Quote } from '../components/blocks/Quote'
import { ClosingCta } from '../components/layout/ClosingCta'
import { ArrowUpRight } from '../components/ui/Icons'
import { Container, Section, SectionHeading } from '../components/ui/Layout'
import { RuleList } from '../components/ui/RuleList'
import { ScreenFrame } from '../components/ui/ScreenFrame'
import NotFound from './NotFound'

function Fact({ label, children }) {
  return (
    <div className="border-t border-line py-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-[0.9375rem] text-ink">{children}</dd>
    </div>
  )
}

function Block({ title, children }) {
  return (
    <section className="grid gap-3 border-t border-line py-7 lg:grid-cols-12 lg:gap-10">
      <h2 className="text-xl font-semibold lg:col-span-4">{title}</h2>
      <div className="leading-relaxed text-body lg:col-span-8">{children}</div>
    </section>
  )
}

function CaseStudyPage({ study }) {
  const site = useSite()
  const labels = site.labels.caseStudy
  usePageMeta('work', { title: study.title, description: study.summary })
  useEffect(() => track('case_study_view', { case_study: study.slug }), [study.slug])

  const capabilities = pickSlugs(site.capabilities, study.capabilities)
  const more = site.caseStudies.filter((s) => s.slug !== study.slug).slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow={`${labels.eyebrow} · ${study.client}`}
        heading={study.title}
        crumbs={[{ label: labels.all, to: '/work' }, { label: study.client }]}
      />

      <Container className="pt-10 sm:pt-12">
        {study.screenshot ? (
          <ScreenFrame src={study.screenshot} alt={`${study.client} platform`} url={study.url} device={study.device} />
        ) : (
          <ScreenFrame src={study.image} alt={`${study.client}`} device="photo" />
        )}
      </Container>

      <Section className="!pt-10 sm:!pt-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <dl>
              <Fact label={labels.client}>{study.client}</Fact>
              <Fact label={labels.industry}>{industryName(site, study.industry)}</Fact>
              <Fact label={labels.status}>{study.status}</Fact>
              <Fact label={labels.capabilities}>
                <ul className="space-y-1">
                  {capabilities.map((c) => (
                    <li key={c.slug}>
                      <Link to={capabilityPath(c.slug)} className="text-accent hover:text-accent-strong">
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Fact>
            </dl>
            {study.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('outbound_client_link', { client: study.client })}
                className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-medium text-accent"
              >
                {labels.visit} <ArrowUpRight className="size-4" />
              </a>
            )}
          </aside>

          <article className="lg:col-span-9">
            <p className="text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">{study.summary}</p>
            {study.metric && (
              <p className="mt-7">
                <span className="block text-4xl font-semibold tracking-tight text-ink">{study.metric.value}</span>
                <span className="text-muted">{study.metric.label}</span>
              </p>
            )}
            <div className="mt-8">
              <Block title={labels.challenge}>
                <p>{study.challenge}</p>
              </Block>
              <Block title={labels.approach}>
                <RuleList items={study.approach} numbered className="-mt-4" />
              </Block>
              <Block title={labels.outcome}>
                <p>{study.outcome}</p>
              </Block>
            </div>
          </article>
        </div>
      </Section>

      {study.testimonial && (
        <Section tone="paper">
          <div className="max-w-4xl">
            <Quote testimonial={testimonialFor(site, study.testimonial)} />
          </div>
        </Section>
      )}

      <Section>
        <SectionHeading title={labels.more} />
        <CaseStudyGrid studies={more} industryOf={(slug) => industryName(site, slug)} />
      </Section>

      <ClosingCta ctaKey="caseStudy" />
    </>
  )
}

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const study = bySlug(useSite().caseStudies, slug)
  return study ? <CaseStudyPage study={study} /> : <NotFound />
}
