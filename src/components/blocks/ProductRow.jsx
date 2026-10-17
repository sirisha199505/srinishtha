import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { ArrowRight } from '../ui/Icons'
import { Tag } from '../ui/Layout'
import { ScreenFrame } from '../ui/ScreenFrame'

// One product: logo, status, name, tagline, description and screenshot.
export function ProductRow({ product, storyLabel }) {
  return (
    <article className="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          {product.logo && <img src={product.logo} alt={`${product.name} logo`} className="h-8 w-auto max-w-[200px] object-contain" />}
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
