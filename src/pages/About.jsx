import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { LogoWall } from '../components/blocks/LogoWall'
import { PageHeader } from '../components/blocks/PageHeader'
import { StatsBar } from '../components/blocks/StatsBar'
import { Timeline } from '../components/blocks/Timeline'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section, SectionHeading } from '../components/ui/Layout'

// Company story only. Leadership and How We Work have their own pages.
export default function About() {
  const site = useSite()
  const meta = usePageMeta('about')
  const labels = site.labels.about

  return (
    <>
      <PageHeader {...meta}>
        <StatsBar stats={site.stats} />
      </PageHeader>

      <Section>
        <SectionHeading eyebrow={labels.timeline} title={labels.timelineTitle} />
        <Timeline items={site.timeline} />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow={labels.clients} title={labels.clientsTitle} />
        <LogoWall clients={site.clients} />
      </Section>

      <ClosingCta />
    </>
  )
}
