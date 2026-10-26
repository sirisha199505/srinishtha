import { CtaPair } from '../ui/Button'
import { Container, Highlighted } from '../ui/Layout'

// Closing call-to-action used at the end of every page; `highlight` sets one phrase in gold.
export function CtaPanel({ question, highlight, lede, cta, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy bg-blueprint py-20 sm:py-28">
      <div aria-hidden="true" className="absolute top-1/2 -right-40 -z-10 size-[34rem] -translate-y-1/2 rounded-full border border-white/10" />
      <div aria-hidden="true" className="absolute top-1/2 -right-16 -z-10 size-[22rem] -translate-y-1/2 rounded-full border border-gold/30" />
      <div aria-hidden="true" className="absolute top-1/2 right-0 -z-20 size-[40rem] translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(182,106,32,0.18),transparent)]" />
      <Container>
        <div data-reveal className="max-w-3xl">
          <span aria-hidden="true" className="mb-8 block h-0.5 w-12 bg-gold" />
          <h2 className="text-title font-semibold text-white">
            <Highlighted text={question} highlight={highlight} inverse />
          </h2>
          {lede && <p className="mt-6 max-w-2xl text-lede text-muted-dark">{lede}</p>}
          <CtaPair cta={cta} inverse className="mt-10" />
          {children}
        </div>
      </Container>
    </section>
  )
}
