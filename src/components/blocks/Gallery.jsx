import { cx } from '../../lib/cx'
import { revealDelay } from '../../lib/brand'

export function Gallery({ photos }) {
  return (
    <ul className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:auto-rows-[240px] sm:grid-cols-3">
      {photos.map((p, i) => (
        <li key={p.image} data-reveal style={revealDelay(i % 3)} className={cx('group relative overflow-hidden bg-paper', p.span === 'wide' && 'sm:col-span-2')}>
          <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-white">{p.title}</p>
        </li>
      ))}
    </ul>
  )
}
