import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { revealDelay } from '../../lib/brand'
import { track } from '../../lib/track'
import { ArrowRight, ArrowUpRight } from '../ui/Icons'
import { ScreenFrame } from '../ui/ScreenFrame'

// The lead case study: a large screenshot with its headline result and the client's own words.
function LeadProject({ study, industry, testimonial }) {
  const to = caseStudyPath(study.slug)
  return (
    <article data-reveal className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
      <Link to={to} tabIndex={-1} aria-hidden="true" className="block lg:col-span-7">
        <ScreenFrame src={study.screenshot} alt="" url={study.url} className="transition-transform duration-500 group-hover:-translate-y-1" />
      </Link>
      <div className="lg:col-span-5">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase">
          <span className="text-accent-strong">{study.client}</span>
          <span className="text-muted"> · {industry}</span>
        </p>
        <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight sm:text-[1.875rem]">
          <Link to={to} className="hover:text-accent-strong">{study.title}</Link>
        </h3>
        {study.metric && (
          <p className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-semibold tracking-tight text-ink">{study.metric.value}</span>
            <span className="text-sm text-muted">{study.metric.label}</span>
          </p>
        )}
        {testimonial && (
          <figure className="mt-6 border-l-2 border-gold pl-5">
            <blockquote className="text-[0.9375rem] leading-relaxed text-body">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-ink">
              {testimonial.author}
              <span className="font-normal text-muted">, {testimonial.role}</span>
            </figcaption>
          </figure>
        )}
        <Link to={to} className="mt-7 inline-flex items-center gap-2 font-semibold text-accent-strong hover:text-ink">
          View the case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

// One delivered platform: screenshot, client and category. Links to its case study when there
// is one, otherwise to the live site.
function ProjectTile({ project, index }) {
  const internal = Boolean(project.caseStudy)
  const props = internal
    ? { as: Link, to: caseStudyPath(project.caseStudy) }
    : { as: 'a', href: project.url, target: '_blank', rel: 'noopener noreferrer', onClick: () => track('outbound_client_link', { client: project.client }) }
  const { as: Tag, ...linkProps } = props
  const Icon = internal ? ArrowRight : ArrowUpRight
  return (
    <li data-reveal style={revealDelay(index % 3)}>
      <Tag {...linkProps} className="group block">
        <ScreenFrame src={project.screenshot} alt="" url={project.url} device={project.device} className="transition-transform duration-500 group-hover:-translate-y-1" />
        <p className="mt-4 flex items-center justify-between gap-3">
          <span className="font-semibold text-ink group-hover:text-accent-strong">{project.client}</span>
          <Icon className="size-4 shrink-0 text-accent-strong" />
        </p>
        <p className="mt-1 text-sm text-muted">{project.category}</p>
        {!internal && <span className="sr-only">(opens in a new tab)</span>}
      </Tag>
    </li>
  )
}

export function ProjectShowcase({ lead, industry, testimonial, projects }) {
  return (
    <>
      {lead && <LeadProject study={lead} industry={industry} testimonial={testimonial} />}
      <ul className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectTile key={p.client} project={p} index={i} />
        ))}
      </ul>
    </>
  )
}
