import { cx } from '../../lib/cx'

export function LogoWall({ clients, label }) {
  return (
    <div>
      {label && <p className="mb-6 text-sm text-muted">{label}</p>}
      <ul data-reveal className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
        {clients.map((c) => (
          <li
            key={c.name}
            className={cx('group flex h-24 items-center justify-center border-r border-b border-line px-6 transition-colors hover:bg-paper', c.dark && 'bg-ink hover:bg-ink')}
          >
            {c.logo ? (
              <img
                src={c.logo}
                alt={c.name}
                title={c.name}
                loading="lazy"
                className={cx('max-h-12 max-w-[140px] object-contain', !c.dark && 'mix-blend-multiply')}
              />
            ) : (
              // Clients without a logo file get a clean wordmark.
              <span className="text-center text-[0.9375rem] font-semibold leading-tight tracking-tight text-ink">{c.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
