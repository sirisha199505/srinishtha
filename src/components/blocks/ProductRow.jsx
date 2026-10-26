import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { cx } from '../../lib/cx'
import { ArrowRight } from '../ui/Icons'
import { Tag } from '../ui/Layout'
import { ScreenFrame } from '../ui/ScreenFrame'

// Products whose only imagery is generic stock get a typographic panel instead.
function ProductVisual({ product, className }) {
  if (product.screenshot && product.device !== 'photo') {
    return <ScreenFrame src={product.screenshot} alt={`${product.name} interface`} device={product.device} className={className} />
  }
  return (
    <div aria-hidden="true" className={cx('relative flex aspect-[2/1] flex-col justify-end overflow-hidden rounded-[4px] bg-navy bg-blueprint p-8', className)}>
      <span className="absolute -top-12 -right-12 size-48 rounded-full border border-white/10" />
      <span className="absolute top-6 right-6 size-20 rounded-full border border-accent-bright/30" />
      <p className="text-xs font-semibold tracking-[0.14em] text-accent-bright uppercase">Srinishtha Labs</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{product.name}</p>
    </div>
  )
}

// One product: logo, status, name, tagline, description and screenshot.
export function ProductRow({ product, storyLabel, index = 0 }) {
  return (
    <article data-reveal className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:items-center lg:gap-14">
      <div className={cx('lg:col-span-5', index % 2 && 'lg:order-2')}>
        <div className="flex flex-wrap items-center gap-3">
          {product.logo && <img src={product.logo} alt={`${product.name} logo`} className="h-8 w-auto max-w-[200px] object-contain" />}
          <Tag>{product.status}</Tag>
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-[2rem]">{product.name}</h2>
        <p className="mt-2 text-lg text-accent-strong">{product.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted">{product.text}</p>
        {product.caseStudy && (
          <Link to={caseStudyPath(product.caseStudy)} className="group mt-6 inline-flex items-center gap-2 font-semibold text-accent-strong hover:text-ink">
            {storyLabel} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      <ProductVisual product={product} className={cx('lg:col-span-7', index % 2 && 'lg:order-1')} />
    </article>
  )
}
