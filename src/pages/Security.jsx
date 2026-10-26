import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { FeatureGrid } from '../components/blocks/FeatureGrid'
import { PageHeader } from '../components/blocks/PageHeader'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section } from '../components/ui/Layout'

export default function Security() {
  const site = useSite()
  usePageMeta('security')
  const { trust } = site
  return (
    <>
      <PageHeader crumbs={[{ label: 'About Us', to: '/about' }, { label: 'Security & Engineering' }]} eyebrow={trust.eyebrow} heading={trust.title} lede={trust.lede} />
      <Section>
        <FeatureGrid items={trust.domains} columns={2} />
        <p className="mt-10 border-t border-line pt-6 text-sm text-muted">{trust.note}</p>
      </Section>
      <ClosingCta ctaKey="modernization" />
    </>
  )
}
