import { brandColor, revealDelay } from '../../lib/brand'

export function Timeline({ items }) {
  return (
    <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((t, i) => (
        <li key={t.date} data-reveal style={revealDelay(i, 90)} className="bg-white p-5 sm:p-6">
          <p className="text-sm font-semibold tabular-nums" style={{ color: brandColor(i) }}>{t.date}</p>
          <h3 className="mt-3 text-[1.0625rem] font-semibold">{t.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{t.text}</p>
        </li>
      ))}
    </ol>
  )
}
