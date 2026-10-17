import { brandColor, revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'

// Title + text items on a hairline grid. Used for AI, trust, perks, principles, experience.
export function FeatureGrid({ items, columns = 3, inverse = false }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns]
  return (
    <ul className={cx('grid gap-x-10', cols)}>
      {items.map((item, i) => (
        <li key={item.title} data-reveal style={revealDelay(i)} className={cx('relative border-t py-5 sm:py-6', inverse ? 'border-line-dark' : 'border-line')}>
          <span aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-12" style={{ background: brandColor(i) }} />
          <h3 className="text-[1.0625rem] font-semibold">{item.title}</h3>
          <p className={cx('mt-2 text-[0.9375rem] leading-relaxed', inverse ? 'text-muted-dark' : 'text-muted')}>{item.text}</p>
        </li>
      ))}
    </ul>
  )
}
