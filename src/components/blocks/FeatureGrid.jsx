import { pad, revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'

// Title + text items on a hairline grid. Used for AI, trust, perks, principles, experience.
export function FeatureGrid({ items, columns = 3, inverse = false, numbered = false }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns]
  return (
    <ul className={cx('grid gap-x-10', cols)}>
      {items.map((item, i) => (
        <li key={item.title} data-reveal style={revealDelay(i)} className={cx('relative border-t py-7 sm:py-8', inverse ? 'border-line-dark' : 'border-line')}>
          <span aria-hidden="true" className={cx('absolute -top-px left-0 h-0.5 w-10', inverse ? 'bg-accent-bright' : 'bg-accent')} />
          {numbered && <p className={cx('mb-3 text-xs font-semibold tabular-nums', inverse ? 'text-accent-bright' : 'text-accent-strong')}>{pad(i + 1)}</p>}
          <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className={cx('mt-2.5 text-[0.9375rem] leading-relaxed', inverse ? 'text-muted-dark' : 'text-muted')}>{item.text}</p>
        </li>
      ))}
    </ul>
  )
}
