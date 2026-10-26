import { brandColor, revealDelay } from '../../lib/brand'
import { Eyebrow, Highlighted, Section } from '../ui/Layout'

// The studio's positioning in one statement, on navy so it stands out between the light
// sections: who we are (left), who it is for and how we deliver (right).
export function PositioningBand({ eyebrow, title, highlight, lede, groups }) {
  return (
    <Section tone="navy" aria-labelledby="positioning-title" className="bg-blueprint">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
        <div data-reveal className="lg:col-span-7">
          <Eyebrow inverse>{eyebrow}</Eyebrow>
          <h2 id="positioning-title" className="mt-5 text-headline font-semibold text-white">
            <Highlighted text={title} highlight={highlight} inverse />
          </h2>
          <p className="mt-5 max-w-[34rem] text-lede text-white/75">{lede}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:gap-6">
          {groups.map((g, gi) => (
            <div key={g.label} data-reveal style={revealDelay(gi + 1, 120)}>
              <p className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">{g.label}</p>
              <ul className="mt-4 space-y-3">
                {g.items.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 font-semibold text-white">
                    <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ background: brandColor(gi * 3 + i) }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
