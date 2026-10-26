import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { pad } from '../../lib/brand'
import { cx } from '../../lib/cx'
import { ArrowRight, ArrowUpRight } from '../ui/Icons'
import { Tag } from '../ui/Layout'
import { ConnectedFrame } from '../ui/ConnectedFrame'
import { ScreenFrame } from '../ui/ScreenFrame'

// Products whose only imagery is generic stock get a typographic panel instead.
function ProductVisual({ product }) {
  if (product.screenshot && product.device !== 'photo') {
    return <ScreenFrame src={product.screenshot} alt={`${product.name} interface`} device={product.device} />
  }
  return (
    <div aria-hidden="true" className="relative flex aspect-[2/1] flex-col justify-end overflow-hidden rounded-[4px] bg-navy bg-blueprint p-8">
      <span className="absolute -top-12 -right-12 size-48 rounded-full border border-white/10" />
      <span className="absolute top-6 right-6 size-20 rounded-full border border-accent-bright/30" />
      <p className="text-xs font-semibold tracking-[0.14em] text-accent-bright uppercase">Srinishtha Projects</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{product.name}</p>
    </div>
  )
}

// One product or client project: logo, status, name, tagline, description and screenshot.
// Links to its case study when there is one, otherwise to the live site (`url`).
// On reveal the brand line draws round the screenshot, it fades in, then the copy follows.
export function ProductRow({ product, storyLabel, index = 0 }) {
  const flip = index % 2
  return (
    <article data-reveal className="product-row grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className={cx('product-copy cine-copy lg:col-span-5', flip && 'lg:order-2')}>
        <p aria-hidden="true" className="text-brand-gradient text-3xl font-bold tracking-tight">{pad(index + 1)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {product.logo && <img src={product.logo} alt={`${product.name} logo`} className="h-8 w-auto max-w-[200px] object-contain" />}
          {product.status && <Tag>{product.status}</Tag>}
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[2rem]">{product.name}</h2>
        <p className="mt-2 text-lg text-accent-strong">{product.tagline}</p>
        <p className="mt-3 leading-relaxed text-muted">{product.text}</p>
        {product.caseStudy ? (
          <Link to={caseStudyPath(product.caseStudy)} className="group mt-4 inline-flex items-center gap-2 font-semibold text-accent-strong hover:text-ink">
            {storyLabel} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          product.url && (
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="group mt-4 inline-flex items-center gap-2 font-semibold text-accent-strong hover:text-ink">
              Visit the live site <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )
        )}
      </div>
      <ConnectedFrame className={cx('lg:col-span-7', flip && 'lg:order-1')}>
        <ProductVisual product={product} />
      </ConnectedFrame>
    </article>
  )
}
