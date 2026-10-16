import { CtaPair } from '../ui/Button'
import { Container } from '../ui/Layout'

// Closing call-to-action used at the end of every page.
export function CtaPanel({ question, lede, cta }) {
  return (
    <section className="bg-ink bg-[radial-gradient(ellipse_at_top_left,rgba(229,75,122,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(138,63,209,0.35),transparent_55%)] py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="text-headline font-semibold text-white">{question}</h2>
            {lede && <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-dark">{lede}</p>}
          </div>
          <CtaPair cta={cta} inverse className="lg:col-span-4 lg:flex-col lg:items-stretch" />
        </div>
      </Container>
    </section>
  )
}
