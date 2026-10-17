import { cx } from '../../lib/cx'

// One client mark: the logo at a uniform height, or a wordmark when there is no logo file.
// `dark` = light logo that needs a dark backing; `bg` = brand colour for the wordmark.
function LogoMark({ client }) {
  if (!client.logo) {
    return (
      <span className="text-[0.9375rem] font-bold tracking-tight whitespace-nowrap sm:text-base" style={{ color: client.bg || 'var(--color-ink)' }}>
        {client.name}
      </span>
    )
  }
  const img = (
    <img
      src={client.logo}
      alt={client.name}
      loading="lazy"
      className={cx('h-7 w-auto max-w-[110px] object-contain sm:h-9 sm:max-w-[140px]', !client.dark && 'mix-blend-multiply')}
    />
  )
  return client.dark ? <span className="flex rounded-lg bg-ink p-1.5">{img}</span> : img
}

// Borderless "logo cloud": marks at an even height, centred and wrapping naturally.
export function LogoWall({ clients, label }) {
  return (
    <div>
      {label && <p className="mb-8 text-center text-sm text-muted">{label}</p>}
      <ul data-reveal className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7 sm:gap-x-12 sm:gap-y-10">
        {clients.map((c) => (
          <li key={c.name} title={c.name} className="flex items-center opacity-90 transition-opacity hover:opacity-100">
            <LogoMark client={c} />
          </li>
        ))}
      </ul>
    </div>
  )
}
