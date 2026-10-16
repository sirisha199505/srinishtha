import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { cx } from '../../lib/cx'
import { ArrowRight } from '../ui/Icons'
import { ScreenFrame } from '../ui/ScreenFrame'

function Visual({ study }) {
  return study.screenshot ? (
    <ScreenFrame src={study.screenshot} url={study.url} device={study.device} />
  ) : (
    <ScreenFrame src={study.image} device="photo" />
  )
}

function Meta({ study, industry }) {
  return (
    <p className="text-sm text-muted">
      {[study.client, industry, study.status].filter(Boolean).join(' · ')}
    </p>
  )
}

// `feature` renders the large flagship layout; default is the compact card.
export function CaseStudyCard({ study, industry, feature = false }) {
  const to = caseStudyPath(study.slug)

  if (feature) {
    return (
      <article data-reveal className="group grid gap-6 lg:grid-cols-12 lg:gap-10">
        <Link to={to} className="block lg:col-span-7" tabIndex={-1} aria-hidden="true">
          <Visual study={study} />
        </Link>
        <div className="flex flex-col justify-center lg:col-span-5">
          <Meta study={study} industry={industry} />
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            <Link to={to} className="hover:text-accent">
              {study.title}
            </Link>
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{study.summary}</p>
          {study.metric && (
            <p className="mt-6 border-t border-line pt-5">
              <span className="block text-3xl font-semibold tracking-tight text-ink">{study.metric.value}</span>
              <span className="text-sm text-muted">{study.metric.label}</span>
            </p>
          )}
          <Link to={to} className="mt-6 inline-flex items-center gap-2 font-medium text-accent">
            Read the case study <ArrowRight className="size-4" />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article data-reveal className="group flex flex-col">
      <Link to={to} className="block" tabIndex={-1} aria-hidden="true">
        <Visual study={study} />
      </Link>
      <div className="mt-4">
        <Meta study={study} industry={industry} />
        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          <Link to={to} className="hover:text-accent">
            {study.title}
          </Link>
        </h3>
      </div>
    </article>
  )
}

export function CaseStudyGrid({ studies, industryOf, className }) {
  return (
    <div className={cx('grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {studies.map((s) => (
        <CaseStudyCard key={s.slug} study={s} industry={industryOf?.(s.industry)} />
      ))}
    </div>
  )
}
