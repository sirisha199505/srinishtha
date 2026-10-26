import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { caseStudyPath } from '../../content/selectors'
import { cx } from '../../lib/cx'
import { track } from '../../lib/track'
import { ArrowRight, ArrowUpRight } from '../ui/Icons'
import { ConnectedFrame } from '../ui/ConnectedFrame'
import { ScreenFrame } from '../ui/ScreenFrame'

// The lead case study: a large screenshot with its headline result and the client's own words.
function LeadProject({ study, industry, testimonial }) {
  const to = caseStudyPath(study.slug)
  return (
    <article data-reveal className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
      <Link to={to} tabIndex={-1} aria-hidden="true" className="block lg:col-span-7">
        <ConnectedFrame>
          <ScreenFrame src={study.screenshot} alt="" url={study.url} />
        </ConnectedFrame>
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
          <figure className="mt-6 border-l-2 border-brand-pink pl-5">
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
function ProjectTile({ project }) {
  const internal = Boolean(project.caseStudy)
  const props = internal
    ? { as: Link, to: caseStudyPath(project.caseStudy) }
    : { as: 'a', href: project.url, target: '_blank', rel: 'noopener noreferrer', onClick: () => track('outbound_client_link', { client: project.client }) }
  const { as: Tag, ...linkProps } = props
  const Icon = internal ? ArrowRight : ArrowUpRight
  return (
    <Tag {...linkProps} className="group block">
      <ScreenFrame src={project.screenshot} alt="" url={project.url} device={project.device} className="transition-transform duration-500 group-hover:-translate-y-1" />
      <p className="mt-4 flex items-center justify-between gap-3">
        <span className="font-semibold text-ink group-hover:text-accent-strong">{project.client}</span>
        <Icon className="size-4 shrink-0 text-accent-strong" />
      </p>
      <p className="mt-1 text-sm text-muted">{[project.category, project.status].filter(Boolean).join(' · ')}</p>
      {!internal && <span className="sr-only">(opens in a new tab)</span>}
    </Tag>
  )
}

const AUTOPLAY_MS = 3500
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Signed distance of card i from the active card on a loop of n (e.g. -2…2).
const offsetOf = (i, active, n) => {
  let d = i - active
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

// Placement of a card `d` steps from the centre: side cards slide out, shrink and angle
// slightly inward. Each card carries its own perspective (no shared 3D space), so cards never
// cut through each other and z-index alone decides what sits in front. Cards stay opaque;
// only the outer pair fades. --shift (set per breakpoint on the stage) is how far each step
// moves, as a % of card width.
const cardStyle = (d) => {
  const a = Math.abs(d)
  return {
    transform: `translateX(calc(-50% + var(--shift) * ${d})) perspective(1600px) rotateY(${-Math.sign(d) * Math.min(a, 1) * 16}deg) scale(${1 - Math.min(a, 3) * 0.14})`,
    opacity: a <= 1 ? 1 : a === 2 ? 0.45 : 0,
    zIndex: 10 - a,
    pointerEvents: a > 1 ? 'none' : undefined,
  }
}

// 3D rotating carousel of delivered platforms. The centre card is the live link; a side card
// rotates to the centre when clicked. Turns on its own and loops; also arrows, keyboard and
// swipe. Pauses on hover/focus, off screen and in background tabs; no autoplay or transition
// under reduced motion.
function ProjectSlider({ projects }) {
  const n = projects.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const stageRef = useRef(null)
  const dragX = useRef(null)

  const goTo = useCallback((i) => setIndex(((i % n) + n) % n), [n])
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 })
    io.observe(stageRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible || reducedMotion()) return
    const id = setTimeout(() => !document.hidden && goTo(index + 1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [paused, visible, index, goTo])

  // Swipe / drag: a horizontal flick of 40px+ turns the carousel.
  const onPointerDown = (e) => (dragX.current = e.clientX)
  const onPointerUp = (e) => {
    if (dragX.current === null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <div
      data-reveal
      className="mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className="mb-4 flex items-center justify-end gap-6">
        <p className="sr-only" aria-live="polite">
          {projects[index]?.client}
        </p>
        <div className="flex gap-2">
          {[
            ['Previous project', prev, 'rotate-180'],
            ['Next project', next, ''],
          ].map(([label, onClick, flip]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={onClick}
              className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              <ArrowRight className={cx('size-4', flip)} />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragX.current = null)}
        className="relative touch-pan-y select-none [--shift:80%] sm:[--shift:74%] lg:[--shift:72%]"
      >
        {/* In-flow copy of a card that gives the stage its height */}
        <div aria-hidden="true" className="invisible mx-auto w-[78%] sm:w-[58%] lg:w-[44%]">
          <ProjectTile project={projects[0]} />
        </div>
        <ul aria-label="Delivered projects" className="absolute inset-0">
          {projects.map((p, i) => {
            const d = offsetOf(i, index, n)
            const centre = d === 0
            return (
              <li
                key={p.client}
                aria-hidden={!centre || undefined}
                style={cardStyle(d)}
                className="carousel-card absolute top-0 left-1/2 w-[78%] sm:w-[58%] lg:w-[44%]"
                onClickCapture={(e) => {
                  if (centre) return
                  e.preventDefault()
                  goTo(i)
                }}
              >
                {/* Only the centre card shows its caption; side cards are muted previews */}
                <div className={cx('transition-[filter] duration-700 [&_p]:transition-opacity [&_p]:duration-500', !centre && 'brightness-95 saturate-50 [&_p]:opacity-0')} inert={!centre || undefined}>
                  <ProjectTile project={p} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div aria-hidden="true" className="mt-6 h-0.5 bg-line">
        <div className="bg-brand-line h-full transition-[width] duration-700" style={{ width: `${((index + 1) / n) * 100}%` }} />
      </div>
    </div>
  )
}

export function ProjectShowcase({ lead, industry, testimonial, projects }) {
  return (
    <>
      {lead && <LeadProject study={lead} industry={industry} testimonial={testimonial} />}
      <ProjectSlider projects={projects} />
    </>
  )
}
