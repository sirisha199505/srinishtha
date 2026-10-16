import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { Gallery } from '../components/blocks/Gallery'
import { PageHeader } from '../components/blocks/PageHeader'
import { Quote } from '../components/blocks/Quote'
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
        <SectionHeading title={labels.voices} />
        <ul className="grid gap-8 lg:grid-cols-3">
          {careers.voices.map((v) => (
            <li key={v.author} className="border-t border-line pt-6">
              <Quote testimonial={v} size="sm" />
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta ctaKey="careers" question={careers.title} lede={careers.ctaLede} />
    </>
  )
}
