import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { FeatureGrid } from '../components/blocks/FeatureGrid'
import { LogoWall } from '../components/blocks/LogoWall'
import { PageHeader } from '../components/blocks/PageHeader'
import { StatsBar } from '../components/blocks/StatsBar'
import { Timeline } from '../components/blocks/Timeline'
import { ClosingCta } from '../components/layout/ClosingCta'
import { TextLink } from '../components/ui/Button'
import { Eyebrow, Section, SectionHeading } from '../components/ui/Layout'

export default function About() {
  const site = useSite()
  const meta = usePageMeta('about')
  const labels = site.labels.about
  const { company } = site

  return (
    <>
      <PageHeader {...meta} heading="Enterprise-grade engineering, with senior people accountable." crumbs={[{ label: 'About Us' }]} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <figure data-reveal className="lg:col-span-6">
            <img src="/images/office-space.jpeg" alt={`The ${company.name} office in ${company.city}`} loading="lazy" width="1600" height="1200" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-3 text-xs text-muted">Our office, {company.address.split(',').slice(-2).join(',').trim()}</figcaption>
          </figure>
          <div data-reveal className="lg:col-span-6">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 text-headline font-semibold">{company.promise}</h2>
            <p className="mt-6 text-lede text-muted">{company.positioning}</p>
            <p className="mt-4 text-lede text-muted">{company.narrative}</p>
            <TextLink to="/leadership" className="mt-8">Meet our leadership</TextLink>
          </div>
        </div>
        <StatsBar stats={site.stats} className="mt-8 sm:mt-10" />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow={labels.timeline} title={labels.timelineTitle} />
        <Timeline items={site.timeline} />
      </Section>

      <Section tone="navy" className="bg-blueprint">
        <SectionHeading {...site.enterpriseExperience} inverse />
        <FeatureGrid items={site.enterpriseExperience.domains} inverse />
      </Section>

      <Section>
        <SectionHeading eyebrow={labels.principles} title={labels.principlesTitle} action={<TextLink to="/how-we-work">How we work</TextLink>} />
        <FeatureGrid items={site.principles} />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow={labels.clients} title={labels.clientsTitle} />
        <LogoWall clients={site.clients} />
      </Section>

      <ClosingCta />
    </>
  )
}
