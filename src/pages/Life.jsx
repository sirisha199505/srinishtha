import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { Gallery } from '../components/blocks/Gallery'
import { PageHeader } from '../components/blocks/PageHeader'
import { VoiceGrid } from '../components/blocks/People'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section, SectionHeading } from '../components/ui/Layout'

export default function Life() {
  const site = useSite()
  const meta = usePageMeta('life')
  const { careers } = site
  const labels = site.labels.careers

  return (
    <>
      <PageHeader {...meta} />

      <Section>
        <SectionHeading eyebrow={labels.life} title={labels.lifeTitle} />
        <Gallery photos={careers.gallery} />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow={labels.voicesEyebrow} title={labels.voices} lede={labels.voicesLede} />
        <VoiceGrid voices={careers.voices} />
      </Section>

      <ClosingCta ctaKey="careers" question={careers.title} lede={careers.ctaLede} />
    </>
  )
}
