import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { FeatureGrid } from '../components/blocks/FeatureGrid'
import { PageHeader } from '../components/blocks/PageHeader'
import { StepFlow } from '../components/blocks/StepFlow'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section, SectionHeading } from '../components/ui/Layout'

export default function HowWeWork() {
  const site = useSite()
  const meta = usePageMeta('howWeWork')
  const labels = site.labels.about

  return (
    <>
      <PageHeader {...meta} crumbs={[{ label: 'About Us', to: '/about' }, { label: 'How We Work' }]} />

      <Section>
        <SectionHeading eyebrow={site.delivery.eyebrow} title={site.delivery.title} lede={site.delivery.lede} />
        <StepFlow steps={site.delivery.steps} />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow={labels.principles} title={labels.principlesTitle} />
        <FeatureGrid items={site.principles} />
      </Section>

      <ClosingCta />
    </>
  )
}
