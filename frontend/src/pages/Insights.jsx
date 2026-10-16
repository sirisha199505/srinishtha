import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProblemRows } from '../components/blocks/ProblemRows'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section } from '../components/ui/Layout'

export default function Insights() {
  const { insights } = useSite()
  usePageMeta('insights')
  return (
    <>
      <PageHeader eyebrow={insights.eyebrow} heading={insights.title} lede={insights.lede} />
      <Section>
        <ProblemRows rows={insights.pillars.map((p) => ({ key: p.title, title: p.title, list: p.topics }))} />
      </Section>
      <ClosingCta />
    </>
  )
}
