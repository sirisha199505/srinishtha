import { CtaPair } from '../ui/Button'
import { cx } from '../../lib/cx'
import { Container, Highlighted, SECTION_Y } from '../ui/Layout'

// Closing call-to-action used at the end of every page; `highlight` sets one phrase in the logo colours.
export function CtaPanel({ question, highlight, lede, cta, children }) {
  return (
    <section className={cx('relative isolate overflow-hidden bg-navy bg-blueprint', SECTION_Y)}>
      <div aria-hidden="true" className="absolute top-1/2 -right-40 -z-10 size-[34rem] -translate-y-1/2 rounded-full border border-white/10" />
      <div aria-hidden="true" className="absolute top-1/2 -right-16 -z-10 size-[22rem] -translate-y-1/2 rounded-full border border-brand-pink/30" />
      <div aria-hidden="true" className="absolute top-1/2 right-0 -z-20 size-[40rem] translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(138,63,209,0.3),transparent)]" />
      <Container>
        <div data-reveal className="max-w-3xl">
          <span aria-hidden="true" className="bg-brand-line mb-6 block h-0.5 w-16" />
          <h2 className="text-title font-semibold text-white">
            <Highlighted text={question} highlight={highlight} inverse />
          </h2>
          {lede && <p className="mt-6 max-w-2xl text-lede text-muted-dark">{lede}</p>}
          <CtaPair cta={cta} inverse className="mt-8" />
          {children}
        </div>
      </Container>
    </section>
  )
}
