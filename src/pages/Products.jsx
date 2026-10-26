import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProductRow } from '../components/blocks/ProductRow'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section, SectionHeading } from '../components/ui/Layout'

// Client projects shown in the product row layout: client as name, category as tagline.
const asRow = (p) => ({ name: p.client, tagline: p.category, text: p.description, screenshot: p.screenshot, device: p.device, caseStudy: p.caseStudy, url: p.url })

// Our own products first, then every delivered client platform with a screenshot.
export default function Products() {
  const site = useSite()
  usePageMeta('products')
  const { products } = site
  const projects = site.projects.filter((p) => p.screenshot)
  return (
    <>
      <PageHeader crumbs={[{ label: 'Our Work', to: '/work' }, { label: 'Srinishtha Projects' }]} eyebrow={products.eyebrow} heading={products.title} lede={products.lede} />
      <Section>
        <div className="space-y-8 sm:space-y-10">
          {products.items.map((p, i) => (
            <ProductRow key={p.name} product={p} index={i} storyLabel={site.labels.products.caseStudy} />
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <SectionHeading eyebrow="Client projects" title="Platforms we have delivered for our clients." />
        <div className="space-y-8 sm:space-y-10">
          {projects.map((p, i) => (
            <ProductRow key={p.client} product={asRow(p)} index={i} storyLabel={site.labels.products.caseStudy} />
          ))}
        </div>
      </Section>
      <ClosingCta ctaKey="product" />
    </>
  )
}
