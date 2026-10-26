import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'
import { track } from '../../lib/track'
import { ArrowRight, ArrowUpRight } from '../ui/Icons'
import { ConnectedFrame } from '../ui/ConnectedFrame'
import { ScreenFrame } from '../ui/ScreenFrame'

// Where a project leads: its case study, its live site, or both.
function ProjectLinks({ project, inverse }) {
  const style = cx('inline-flex items-center gap-1.5 text-sm font-semibold', inverse ? 'text-white hover:text-accent-bright' : 'text-accent-strong hover:text-ink')
  return (
    <span className="flex flex-wrap gap-x-5 gap-y-2">
      {project.caseStudy && (
        <Link to={caseStudyPath(project.caseStudy)} className={style}>
          Explore project <ArrowRight className="size-4" />
        </Link>
      )}
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={() => track('outbound_client_link', { client: project.client })} className={style}>
          Visit live site <ArrowUpRight className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </span>
  )
}

// One archive card: the screenshot flips over to the project details on its back. Mouse:
// flips on hover. Touch: tap to flip, tap again to turn back. Keyboard: flips while its
// links have focus (index.css: .flip-*).
function ArchiveCard({ project, index }) {
  const [flipped, setFlipped] = useState(false)
  const pointer = useRef('mouse')
  return (
    <li data-reveal style={revealDelay(index % 3, 150)} className="archive-card">
      <ConnectedFrame>
        <div className={cx('flip-card', flipped && 'is-flipped')}>
          <div className="flip-face">
            <ScreenFrame src={project.screenshot} alt={`${project.client} website`} url={project.url} device={project.device} />
            <button
              type="button"
              aria-label={`Show details for ${project.client}`}
              aria-pressed={flipped}
              onPointerDown={(e) => (pointer.current = e.pointerType)}
              onClick={() => pointer.current !== 'mouse' && setFlipped(true)}
              className="absolute inset-0 cursor-default"
              tabIndex={-1}
            />
          </div>
          <div
            className="flip-back flex flex-col justify-center rounded-[4px] bg-navy bg-blueprint p-5 sm:p-6"
            onClick={(e) => e.target === e.currentTarget && setFlipped(false)}
          >
            <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-accent-bright uppercase">{project.category}</p>
            <p className="mt-1.5 text-lg font-semibold tracking-tight text-white">{project.client}</p>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/75">{project.description}</p>
            <div className="mt-4">
              <ProjectLinks project={project} inverse />
            </div>
          </div>
        </div>
      </ConnectedFrame>
      <div className="cine-copy">
        <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{project.category}</p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">{project.client}</h3>
      </div>
    </li>
  )
}

// Grid of delivered platforms. Staggered across the row: the brand line draws round each
// screenshot, it fades in, then its name follows (ConnectedFrame); each card flips to its details.
export function ProjectArchive({ projects }) {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <ArchiveCard key={p.client} project={p} index={i} />
      ))}
    </ul>
  )
}
