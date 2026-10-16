import { revealDelay } from '../../lib/brand'
import { Check, Close } from '../ui/Icons'

function Column({ title, items, positive }) {
  const Icon = positive ? Check : Close
  return (
    <div data-reveal style={revealDelay(positive ? 1 : 0, 120)} className={positive ? 'rounded-lg border border-accent/25 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(138,63,209,0.45)] sm:p-7' : 'rounded-lg border border-line bg-white/60 p-6 sm:p-7'}>
      <p className={positive ? 'text-sm font-semibold text-accent' : 'text-sm font-semibold text-muted'}>{title}</p>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
            <span className={positive ? 'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white' : 'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-line text-muted'}>
              <Icon className="size-3" />
            </span>
            <span className={positive ? 'text-ink' : 'text-muted'}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Two-column comparison: how things work today vs. after the solution.
export function BeforeAfter({ before, after, labels }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Column title={labels.before} items={before} />
      <Column title={labels.after} items={after} positive />
    </div>
  )
}
