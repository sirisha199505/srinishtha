import { cx } from '../../lib/cx'

// One client mark at a balanced size: the logo is fitted inside a fixed box, so square
// marks render taller and wide marks narrower, giving every logo similar visual weight.
// No logo file → a compact wordmark. `dark` = light logo on a dark backing; `bg` = brand colour.
function LogoMark({ client }) {
  if (!client.logo) {
    return (
      <span
        className="max-w-[7.5rem] text-center text-[0.8125rem] leading-tight font-bold tracking-tight sm:text-sm"
        style={{ color: client.bg || 'var(--color-ink)' }}
      >
        {client.name}
      </span>
    )
  }
  const img = (
    <img
      src={client.logo}
      alt={client.name}
      loading="lazy"
      className={cx('h-full w-full object-contain', !client.dark && 'mix-blend-multiply')}
    />
  )
  return client.dark ? (
    <span className="flex size-10 rounded-lg bg-ink p-1 sm:size-11">{img}</span>
  ) : (
    <span className="flex h-9 w-[5.5rem] sm:h-10 sm:w-28">{img}</span>
  )
}

// Logo cloud: an even, borderless 3/4-column layout on phones and tablets,
// a flowing centred row on desktop.
export function LogoWall({ clients, label }) {
  return (
    <div className="rounded-2xl border border-line bg-paper bg-[radial-gradient(ellipse_at_top_left,rgba(255,139,38,0.08),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(138,63,209,0.10),transparent_50%)] px-4 py-8 sm:rounded-3xl sm:px-10 sm:py-12">
      {label && <p className="mb-8 text-center text-sm font-medium text-muted">{label}</p>}
      <ul
        data-reveal
        className="grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-8 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-14 lg:gap-y-10"
      >
        {clients.map((c) => (
          <li key={c.name} title={c.name} className="flex h-11 items-center justify-center">
            <LogoMark client={c} />
          </li>
        ))}
      </ul>
    </div>
  )
}
