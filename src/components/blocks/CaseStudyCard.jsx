import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'
import { ArrowRight } from '../ui/Icons'
import { ScreenFrame } from '../ui/ScreenFrame'

// A real screenshot when one exists; otherwise a typographic panel, so no low-quality
// stock photography appears next to genuine project work.
export function CaseVisual({ study, industry, wide = false, className }) {
  if (study.screenshot) {
    return <ScreenFrame src={study.screenshot} alt={`${study.client} platform`} url={study.url} device={study.device} className={className} />
  }
  // Card panels match a ScreenFrame's height (its 28px bar + a 2:1 image) so rows line up
  return (
    <div aria-hidden="true" className={cx('relative overflow-hidden rounded-[4px] bg-navy-3 bg-blueprint', !wide && 'pt-7', className)}>
      <div className={cx('flex flex-col justify-between p-6 sm:p-8', wide ? 'aspect-[2/1] sm:aspect-[7/2] sm:p-12' : 'aspect-[2/1] pt-0 sm:pt-1')}>
        <span className="text-xs font-semibold tracking-[0.14em] text-accent-bright uppercase">{industry}</span>
        <div>
          <p className="text-2xl leading-tight font-semibold tracking-tight text-white sm:text-3xl">{study.client}</p>
          <p className="mt-2 text-sm text-muted-dark">{study.status}</p>
        </div>
      </div>
      <span className="absolute -right-10 -bottom-10 size-40 rounded-full border border-white/10" />
      <span className="absolute -right-2 -bottom-2 size-24 rounded-full border border-accent-bright/30" />
    </div>
  )
}

// "View project" cursor and spotlight for a card's visual (a dark glow on the navy panel).
const cardPointer = (study) => ({ 'data-cursor-label': 'View project', 'data-spotlight': study.screenshot ? 'light' : 'dark' })

function Meta({ study, industry }) {
  return (
    <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
      {[industry, study.status].filter(Boolean).join(' · ')}
    </p>
  )
}

// `feature` renders the large flagship layout; default is the compact editorial card.
export function CaseStudyCard({ study, industry, feature = false, index = 0 }) {
  const to = caseStudyPath(study.slug)

  if (feature) {
    return (
      <article data-reveal className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Link to={to} {...cardPointer(study)} className={cx('relative block rounded-[4px] lg:col-span-7', index % 2 && 'lg:order-2')} tabIndex={-1} aria-hidden="true">
          <CaseVisual study={study} industry={industry} className="transition-transform duration-500 group-hover:-translate-y-1" />
        </Link>
        <div className="lg:col-span-5">
          <Meta study={study} industry={industry} />
          <p className="mt-4 text-sm font-semibold text-accent-strong">{study.client}</p>
          <h3 className="mt-2 text-2xl leading-tight font-semibold tracking-tight sm:text-[1.875rem]">
            <Link to={to} className="hover:text-accent-strong">
              {study.title}
            </Link>
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{study.summary}</p>
          {study.metric && (
            <p className="mt-6 border-t border-line pt-5">
              <span className="block text-4xl font-semibold tracking-tight text-ink">{study.metric.value}</span>
              <span className="text-sm text-muted">{study.metric.label}</span>
            </p>
          )}
          <Link to={to} className="mt-7 inline-flex items-center gap-2 font-semibold text-accent-strong hover:text-ink">
            Read the case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article data-reveal style={revealDelay(index)} className="group flex flex-col">
      <Link to={to} {...cardPointer(study)} className="relative block rounded-[4px]" tabIndex={-1} aria-hidden="true">
        <CaseVisual study={study} industry={industry} className="transition-transform duration-500 group-hover:-translate-y-1" />
      </Link>
      <div className="mt-5">
        <Meta study={study} industry={industry} />
        <p className="mt-3 text-sm font-semibold text-accent-strong">{study.client}</p>
        <h3 className="mt-1.5 text-lg leading-snug font-semibold tracking-tight">
          <Link to={to} className="hover:text-accent-strong">
            {study.title}
          </Link>
        </h3>
      </div>
    </article>
  )
}

// `related`: a short "more like this" pick, so on two-column (tablet) screens an odd last card
// is dropped rather than left alone on its row. Full listings keep every card.
export function CaseStudyGrid({ studies, industryOf, related = false, className }) {
  return (
    <div className={cx('grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3', related && 'sm:max-lg:[&>:last-child:nth-child(odd):not(:first-child)]:hidden', className)}>
      {studies.map((s, i) => (
        <CaseStudyCard key={s.slug} study={s} industry={industryOf?.(s.industry)} index={i} />
      ))}
    </div>
  )
}
