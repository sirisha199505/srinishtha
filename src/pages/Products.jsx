import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProductRow } from '../components/blocks/ProductRow'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section } from '../components/ui/Layout'

export default function Products() {
  const site = useSite()
  usePageMeta('products')
  const { products } = site
  return (
    <>
      <PageHeader eyebrow={products.eyebrow} heading={products.title} lede={products.lede} />
      <Section>
        <div className="space-y-14">
          {products.items.map((p) => (
            <ProductRow key={p.name} product={p} storyLabel={site.labels.products.caseStudy} />
          ))}
        </div>
      </Section>
      <ClosingCta ctaKey="product" />
    </>
  )
}
