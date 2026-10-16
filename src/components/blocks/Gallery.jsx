import { cx } from '../../lib/cx'

export function Gallery({ photos }) {
  return (
    <ul className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-3">
      {photos.map((p) => (
        <li key={p.image} className={cx('relative overflow-hidden rounded-lg bg-paper', p.span === 'wide' && 'sm:col-span-2')}>
          <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover" />
          <p className="absolute bottom-0 left-0 m-3 rounded bg-ink/75 px-2.5 py-1 text-xs text-white">{p.title}</p>
        </li>
      ))}
    </ul>
  )
}
