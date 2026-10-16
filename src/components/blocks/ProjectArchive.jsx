import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { track } from '../../lib/track'
import { ArrowRight, ArrowUpRight } from '../ui/Icons'
import { ScreenFrame } from '../ui/ScreenFrame'

export function ProjectArchive({ projects }) {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <li key={p.client} data-reveal>
          <ScreenFrame src={p.screenshot} alt={`${p.client} website`} url={p.url} device={p.device} />
          <p className="mt-4 text-sm text-muted">{p.category}</p>
          <h3 className="mt-1 text-lg font-semibold">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('outbound_client_link', { client: p.client })}
                className="inline-flex items-center gap-1.5 hover:text-accent"
              >
                {p.client}
                <ArrowUpRight className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : p.caseStudy ? (
              <Link to={caseStudyPath(p.caseStudy)} className="inline-flex items-center gap-1.5 hover:text-accent">
                {p.client}
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              p.client
            )}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.description}</p>
        </li>
      ))}
    </ul>
  )
}
