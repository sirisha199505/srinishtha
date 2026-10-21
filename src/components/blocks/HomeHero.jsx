import { CtaPair } from '../ui/Button'
import { Container } from '../ui/Layout'
import { StatsBar } from './StatsBar'

export function HomeHero({ hero, cta, stats }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img src={hero.background} alt="" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-[#160d2e]/90 to-[#4a1d6e]/45" />
      <Container className="flex min-h-[88svh] flex-col justify-end pt-24">
        <div className="max-w-3xl pb-8 sm:pb-10">
          <p className="reveal inline-flex rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80">{hero.eyebrow}</p>
          <h1 className="reveal mt-5 text-display font-semibold text-white [animation-delay:80ms]">{hero.headline}</h1>
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-white/75 [animation-delay:160ms]">{hero.lede}</p>
          <CtaPair cta={cta} inverse className="reveal mt-8 [animation-delay:240ms]" />
          <p className="mt-7 text-sm text-white/50">{hero.trustCue}</p>
        </div>
        <StatsBar stats={stats} inverse />
      </Container>
    </section>
  )
}
