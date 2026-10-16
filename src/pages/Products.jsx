import { Link } from 'react-router-dom'
import { useSite } from '../content/SiteProvider'
import { caseStudyPath } from '../content/selectors'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'
import { ClosingCta } from '../components/layout/ClosingCta'
import { ArrowRight } from '../components/ui/Icons'
import { Section, Tag } from '../components/ui/Layout'
import { ScreenFrame } from '../components/ui/ScreenFrame'

function ProductRow({ product, storyLabel }) {
  return (
    <article className="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3">
          {product.logo && <img src={product.logo} alt="" className="size-10 rounded-md object-contain" />}
          <Tag>{product.status}</Tag>
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{product.name}</h2>
        <p className="mt-2 text-lg text-muted">{product.tagline}</p>
        <p className="mt-4 leading-relaxed text-body">{product.text}</p>
        {product.caseStudy && (
          <Link to={caseStudyPath(product.caseStudy)} className="mt-6 inline-flex items-center gap-2 font-medium text-accent">
            {storyLabel} <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
      {product.screenshot && (
        <ScreenFrame src={product.screenshot} alt={`${product.name} interface`} device={product.device} className="lg:col-span-7" />
      )}
    </article>
  )
}

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
