import { pad, revealDelay } from '../../lib/brand'

// Differentiators as short numbered points: a title and one line each.
export function WhyList({ items }) {
  return (
    <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <li key={item.title} data-reveal style={revealDelay(i, 80)} className="border-t-2 border-gold pt-6">
          <span className="text-sm font-semibold text-accent-strong tabular-nums">{pad(i + 1)}</span>
          <h3 className="mt-3 text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  )
}
