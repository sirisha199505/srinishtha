import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { Container, Eyebrow } from '../ui/Layout'
import { ConnectedGlobe } from './ConnectedGlobe'

// Headline split into masked lines that rise in sequence; `highlight` gets the logo's colour sweep.
function Headline({ lines, highlight }) {
  return (
    <h1 className="hero-title font-bold text-white">
      {lines.map((line, i) => (
        <span key={line} className="hero-line">
          <span style={{ '--d': `${200 + i * 140}ms` }} className={line === highlight ? 'text-brand-gradient-inverse' : undefined}>
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
    <dl className="reveal mt-10 grid max-w-[40rem] grid-cols-2 gap-y-6 border-t border-white/10 pt-6 short:mt-7 short:pt-5 [animation-delay:900ms] sm:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} className={cx('flex flex-col-reverse justify-end pr-3', i % 2 ? 'border-l border-white/15 pl-5 sm:pl-6' : i && 'sm:border-l sm:border-white/15 sm:pl-6')}>
          <dt className="mt-1 text-[0.8125rem] leading-snug text-white/60">{s.label}</dt>
          <dd className="text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-[1.75rem]">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function HomeHero({ hero, stats }) {
  return (
    <section data-spotlight="hero" className="relative isolate overflow-hidden bg-navy">
      <div aria-hidden="true" className="hero-ambient absolute inset-0 -z-20" />
      <ConnectedGlobe labels={hero.labels} />
      {/* Keeps the copy legible where the globe's glow reaches behind it (desktop) */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 hidden w-[64%] bg-[linear-gradient(90deg,var(--color-navy)_40%,rgba(20,17,43,0.65)_52%,transparent)] lg:block" />

      <Container className="flex min-h-[min(100svh,880px)] flex-col justify-center pt-[68px] pb-[52vw] sm:pb-[min(47vw,380px)] lg:min-h-[max(560px,min(100svh,920px))] lg:pt-[76px] lg:pb-0">
        <div className="py-10 sm:py-14 lg:max-w-[40rem] lg:py-16 short:py-8">
          <Eyebrow inverse className="reveal tracking-[0.3em]">{hero.eyebrow}</Eyebrow>
          <div className="mt-6 sm:mt-7 short:mt-4">
            <Headline lines={hero.headline} highlight={hero.highlight} />
          </div>
          <p className="reveal mt-7 max-w-[33rem] text-lede short:mt-4 short:text-base text-white/75 [animation-delay:600ms]">{hero.lede}</p>
          <div className="reveal mt-9 flex flex-col gap-3 short:mt-6 sm:flex-row [animation-delay:750ms]">
            <Button to={hero.primary.to} arrow magnetic>
              {hero.primary.label}
            </Button>
            <Button to={hero.secondary.to} variant="outline-inverse">
              {hero.secondary.label}
            </Button>
          </div>
          <HeroStats stats={stats} />
        </div>
      </Container>
    </section>
  )
}
