import { brandColor, revealDelay } from '../../lib/brand'

// Differentiators as short points: a title and one line each.
export function WhyList({ items }) {
  return (
    <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <li key={item.title} data-reveal style={{ ...revealDelay(i, 80), borderColor: brandColor(i) }} className="border-t-2 pt-6">
          <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  )
}
