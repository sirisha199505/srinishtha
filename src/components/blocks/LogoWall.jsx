import { cx } from '../../lib/cx'

// One client mark at a balanced size: the logo is fitted inside a fixed box, so square
// marks render taller and wide marks narrower. Shown in full colour.
// No logo file → a compact wordmark. `dark` = light logo on a dark backing.
function LogoMark({ client }) {
  if (!client.logo) {
    return <span className="max-w-[8rem] text-center text-sm leading-tight font-bold tracking-tight text-ink/70">{client.name}</span>
  }
  const img = (
    <img src={client.logo} alt={client.name} loading="lazy" className={cx('h-full w-full object-contain', !client.dark && 'mix-blend-multiply')} />
  )
  return client.dark ? (
    <span className="flex size-10 rounded-[3px] bg-navy p-1 sm:size-11">{img}</span>
  ) : (
    <span className="flex h-9 w-24 sm:h-10 sm:w-28">{img}</span>
  )
}

const ITEM = 'flex h-11 items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105'

// One scrolling row: the list is rendered twice so the loop is seamless; the copy is hidden
// from assistive tech. Moves right-to-left, or left-to-right with `reverse`.
function MarqueeRow({ clients, reverse = false, duration }) {
  const copy = (hidden) => (
    <ul aria-hidden={hidden || undefined} className={cx('marquee-copy flex shrink-0 items-center', hidden && 'marquee-dup')}>
      {clients.map((c) => (
        <li key={c.name} title={hidden ? undefined : c.name} className={cx(ITEM, 'px-5 sm:px-9')}>
          <LogoMark client={c} />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cx('marquee-track', reverse && 'marquee-reverse')} style={{ '--marquee-duration': `${duration}s` }}>
      {copy(false)}
      {copy(true)}
    </div>
  )
}

// Splits the list into `count` rows of near-equal length.
const rows = (list, count) => {
  const size = Math.ceil(list.length / count)
  return Array.from({ length: count }, (_, i) => list.slice(i * size, (i + 1) * size)).filter((r) => r.length)
}

// Rows of logos drifting in alternating directions (paused on hover): three shorter rows on
// phones, two on wider screens.
function Marquee({ clients, count, className }) {
  return (
    <div className={cx('space-y-5 sm:space-y-8', className)}>
      {rows(clients, count).map((row, i) => (
        <MarqueeRow key={i} clients={row} duration={30 + i * 5} reverse={i % 2 === 1} />
      ))}
    </div>
  )
}

export function LogoWall({ clients, label, marquee = false, className }) {
  if (marquee) {
    return (
      <div data-reveal className={cx('marquee', className)}>
        <Marquee clients={clients} count={3} className="sm:hidden" />
        <Marquee clients={clients} count={2} className="hidden sm:block" />
      </div>
    )
  }

  return (
    <div className={className}>
      {label && <p className="mb-8 text-xs font-semibold tracking-[0.14em] text-muted uppercase">{label}</p>}
      <ul data-reveal className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-5 lg:grid-cols-8 lg:gap-x-10">
        {clients.map((c) => (
          <li key={c.name} title={c.name} className={ITEM}>
            <LogoMark client={c} />
          </li>
        ))}
      </ul>
    </div>
  )
}
