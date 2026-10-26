import { cx } from '../../lib/cx'

// A list separated by hairlines — used for capability items, approaches, problems.
export function RuleList({ items, columns = 1, inverse = false, className }) {
  return (
    <ul className={cx('grid gap-x-10', columns === 2 && 'sm:grid-cols-2', className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className={cx(
            'flex gap-4 border-t py-3 text-[0.9375rem] leading-relaxed',
            inverse ? 'border-line-dark text-muted-dark' : 'border-line text-body',
          )}
        >
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
