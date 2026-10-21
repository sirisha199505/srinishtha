import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { FeatureGrid } from '../components/blocks/FeatureGrid'
import { LeaderGrid } from '../components/blocks/People'
import { PageHeader } from '../components/blocks/PageHeader'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section, SectionHeading } from '../components/ui/Layout'

export default function Leadership() {
  const site = useSite()
  const meta = usePageMeta('leadership')
  const labels = site.labels.about

  return (
    <>
      <PageHeader {...meta} />

      <Section>
        <SectionHeading eyebrow={labels.leadership} title={labels.leadershipTitle} />
        <LeaderGrid leaders={site.leadership} />
      </Section>

      <Section tone="dark">
        <SectionHeading {...site.enterpriseExperience} inverse />
        <FeatureGrid items={site.enterpriseExperience.domains} inverse />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow={labels.team} title={labels.teamTitle} lede={labels.teamLede} highlight />
        <LeaderGrid leaders={site.team} />
      </Section>

      <ClosingCta ctaKey="careers" question={site.careers.title} lede={site.careers.ctaLede} />
    </>
  )
}
