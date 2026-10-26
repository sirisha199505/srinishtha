import { useSite } from '../content/SiteProvider'
import { splitByStatus } from '../content/selectors'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProductRow } from '../components/blocks/ProductRow'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section, SectionHeading } from '../components/ui/Layout'

// Client projects shown in the product row layout: client as name, category as tagline.
const asRow = (p) => ({ name: p.client, tagline: p.category, text: p.description, screenshot: p.screenshot, device: p.device, caseStudy: p.caseStudy, url: p.url, status: p.status })

// Our own products are live when their status says so; the rest are in development or pilots.
const isLive = (p) => /\blive\b/i.test(p.status || '')

// Our live products first, then every live client platform with a screenshot, then everything
// still being built (our products and client projects) in one section.
export default function Products() {
  const site = useSite()
  usePageMeta('products')
  const { products } = site
  const [live, building] = splitByStatus(site.projects.filter((p) => p.screenshot))
  const inDevelopment = [...products.items.filter((p) => !isLive(p)), ...building.map(asRow)]
  return (
    <>
      <PageHeader crumbs={[{ label: 'Our Work', to: '/work' }, { label: 'Srinishtha Projects' }]} eyebrow={products.eyebrow} heading={products.title} lede={products.lede} />
      <Section>
        <div className="space-y-8 sm:space-y-10">
          {products.items.filter(isLive).map((p, i) => (
            <ProductRow key={p.name} product={p} index={i} storyLabel={site.labels.products.caseStudy} />
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <SectionHeading eyebrow="Client projects" title="Platforms we have delivered for our clients." />
        <div className="space-y-8 sm:space-y-10">
          {live.map((p, i) => (
            <ProductRow key={p.client} product={asRow(p)} index={i} storyLabel={site.labels.products.caseStudy} />
          ))}
        </div>
      </Section>
      {inDevelopment.length > 0 && (
        <Section>
          <SectionHeading eyebrow="In development" title="Platforms we are building right now." />
          <div className="space-y-8 sm:space-y-10">
            {inDevelopment.map((p, i) => (
              <ProductRow key={p.name} product={p} index={i} storyLabel={site.labels.products.caseStudy} />
            ))}
          </div>
        </Section>
      )}
      <ClosingCta ctaKey="product" />
    </>
  )
}
