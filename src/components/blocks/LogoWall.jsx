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
        <li key={c.name} title={hidden ? undefined : c.name} className={cx(ITEM, 'px-6 sm:px-9')}>
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

// `marquee`: two rows drifting in opposite directions (paused on hover).
export function LogoWall({ clients, label, marquee = false, className }) {
  if (marquee) {
    const half = Math.ceil(clients.length / 2)
    return (
      <div data-reveal className={cx('marquee space-y-6 sm:space-y-8', className)}>
        <MarqueeRow clients={clients.slice(0, half)} duration={38} />
        <MarqueeRow clients={clients.slice(half)} duration={44} reverse />
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
