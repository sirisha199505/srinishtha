import { revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'

// Verified company facts (from the `stats` content block), separated by hairlines.
export function StatsBar({ stats, inverse = false, className }) {
  return (
    <dl className={cx('grid grid-cols-2 lg:grid-cols-4', className)}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          data-reveal
          style={revealDelay(i)}
          className={cx(
            'flex flex-col-reverse border-t py-6 pr-4 lg:py-7',
            i % 2 === 1 && 'border-l pl-5 sm:pl-8',
            i > 0 && 'lg:border-l lg:pl-8',
            inverse ? 'border-line-dark' : 'border-line',
          )}
        >
          <dt className={cx('mt-2 text-sm leading-snug', inverse ? 'text-muted-dark' : 'text-muted')}>{s.label}</dt>
          <dd className={cx('text-[2.5rem] leading-none font-semibold tracking-tight tabular-nums sm:text-5xl', inverse ? 'text-white' : 'text-ink')}>{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}
