import { cx } from '../../lib/cx'

// A list separated by hairlines — used for capability items, approaches, problems.
export function RuleList({ items, columns = 1, inverse = false, numbered = false, className }) {
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
          <span aria-hidden="true" className={cx('shrink-0 tabular-nums', numbered ? 'w-6 text-sm text-muted' : 'mt-2.5 size-1.5 rounded-full bg-accent')}>
            {numbered ? String(i + 1).padStart(2, '0') : null}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
