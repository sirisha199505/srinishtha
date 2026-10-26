import { revealDelay } from '../../lib/brand'

export function Timeline({ items }) {
  return (
    <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((t, i) => (
        <li key={t.date} data-reveal style={revealDelay(i, 90)} className="relative border-b border-line py-8 sm:pr-8 lg:border-b-0">
          <span aria-hidden="true" className="absolute -top-[5px] left-0 size-[9px] rounded-full border-2 border-accent bg-white" />
          <p className="text-3xl font-semibold tracking-tight text-accent-strong tabular-nums">{t.date}</p>
          <h3 className="mt-4 text-lg font-semibold tracking-tight">{t.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{t.text}</p>
        </li>
      ))}
    </ol>
  )
}
