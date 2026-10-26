import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { Container, Eyebrow } from '../ui/Layout'
import { ConnectedGlobe } from './ConnectedGlobe'

// Headline split into masked lines that rise in sequence; `highlight` is set in champagne gold.
function Headline({ lines, highlight }) {
  return (
    <h1 className="text-display font-bold text-white">
      {lines.map((line, i) => (
        <span key={line} className="hero-line">
          <span style={{ '--d': `${200 + i * 140}ms` }} className={line === highlight ? 'text-gold' : undefined}>
            {line}
          </span>
        </span>
      ))}
    </h1>
  )
}

// Verified company facts (the `stats` content block), compact and hairline-separated.
function HeroStats({ stats }) {
  return (
    <dl className="reveal mt-12 grid max-w-[40rem] grid-cols-2 gap-y-6 border-t border-white/10 pt-8 [animation-delay:900ms] sm:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} className={cx('flex flex-col-reverse pr-3', i % 2 ? 'border-l border-white/15 pl-5 sm:pl-6' : i && 'sm:border-l sm:border-white/15 sm:pl-6')}>
          <dt className="mt-1 text-[0.8125rem] leading-snug text-white/60">{s.label}</dt>
          <dd className="text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-[1.75rem]">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function HomeHero({ hero, stats, nextId }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div aria-hidden="true" className="hero-ambient absolute inset-0 -z-20" />
      <ConnectedGlobe labels={hero.labels} />
      {/* Keeps the copy legible where the globe's glow reaches behind it (desktop) */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 hidden w-[64%] bg-[linear-gradient(90deg,var(--color-navy)_40%,rgba(23,33,43,0.65)_52%,transparent)] lg:block" />

      <Container className="flex min-h-[min(100svh,880px)] flex-col justify-center pt-[68px] pb-[52vw] sm:pb-[min(47vw,380px)] lg:min-h-[max(720px,min(100svh,920px))] lg:pt-[76px] lg:pb-0">
        <div className="py-12 sm:py-16 lg:max-w-[40rem] lg:py-20">
          <Eyebrow inverse className="reveal tracking-[0.3em]">{hero.eyebrow}</Eyebrow>
          <div className="mt-6 sm:mt-7">
            <Headline lines={hero.headline} highlight={hero.highlight} />
          </div>
          <p className="reveal mt-7 max-w-[33rem] text-lede text-white/75 [animation-delay:600ms]">{hero.lede}</p>
          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:750ms]">
            <Button to={hero.primary.to} arrow>
              {hero.primary.label}
            </Button>
            <Button to={hero.secondary.to} variant="outline-inverse">
              {hero.secondary.label}
            </Button>
          </div>
          <HeroStats stats={stats} />
        </div>
      </Container>

      {nextId && (
        <a
          href={`#${nextId}`}
          className="reveal absolute right-8 bottom-8 hidden flex-col items-center gap-2 text-xs font-medium tracking-[0.14em] text-white/70 uppercase [animation-delay:1600ms] hover:text-gold lg:flex"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-white/30">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </span>
          Scroll
        </a>
      )}
    </section>
  )
}
