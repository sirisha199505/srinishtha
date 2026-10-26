import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { revealDelay } from '../../lib/brand'
import { track } from '../../lib/track'
import { ArrowRight, ArrowUpRight } from '../ui/Icons'
import { ScreenFrame } from '../ui/ScreenFrame'

export function ProjectArchive({ projects }) {
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <li key={p.client} data-reveal style={revealDelay(i % 3)}>
          <ScreenFrame src={p.screenshot} alt={`${p.client} website`} url={p.url} device={p.device} />
          <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{p.category}</p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('outbound_client_link', { client: p.client })}
                className="inline-flex items-center gap-1.5 hover:text-accent-strong"
              >
                {p.client}
                <ArrowUpRight className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : p.caseStudy ? (
              <Link to={caseStudyPath(p.caseStudy)} className="inline-flex items-center gap-1.5 hover:text-accent-strong">
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
