import { revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'
import { Check, Close } from '../ui/Icons'

function Column({ title, items, positive }) {
  const Icon = positive ? Check : Close
  return (
    <div data-reveal style={revealDelay(positive ? 1 : 0, 120)} className={cx('p-7 sm:p-10', positive ? 'bg-navy text-white' : 'border border-line bg-paper')}>
      <p className={cx('text-xs font-semibold tracking-[0.14em] uppercase', positive ? 'text-accent-bright' : 'text-muted')}>{title}</p>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
            <span className={cx('mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full', positive ? 'bg-accent text-white' : 'bg-line text-muted')}>
              <Icon className="size-3" />
            </span>
            <span className={positive ? 'text-white' : 'text-muted'}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Two-column comparison: how things work today vs. after the solution.
export function BeforeAfter({ before, after, labels }) {
  return (
    <div className="grid md:grid-cols-2">
      <Column title={labels.before} items={before} />
      <Column title={labels.after} items={after} positive />
    </div>
  )
}
