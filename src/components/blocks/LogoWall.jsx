import { cx } from '../../lib/cx'

// One client logo on a uniform card. `dark` = light logo on a dark card;
// `bg` = a brand colour card (text shown in white).
function LogoCard({ client }) {
  const branded = Boolean(client.bg)
  return (
    <div
      className={cx(
        'flex h-20 items-center justify-center rounded-xl border px-5',
        client.dark ? 'border-ink bg-ink' : branded ? 'border-transparent' : 'border-line bg-white',
      )}
      style={branded ? { background: client.bg } : undefined}
      title={client.name}
    >
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          loading="lazy"
          className={cx('max-h-10 w-auto max-w-[120px] object-contain', !client.dark && !branded && 'mix-blend-multiply')}
        />
      ) : (
        // Clients without a logo file get a clean wordmark.
        <span className={cx('text-center text-sm leading-tight font-semibold tracking-tight', branded || client.dark ? 'text-white' : 'text-ink')}>
          {client.name}
        </span>
      )}
    </div>
  )
}

// `marquee`: a slow, continuous logo strip (home). Default: a uniform grid (About).
export function LogoWall({ clients, label, marquee = false }) {
  return (
    <div>
      {label && <p className="mb-6 text-center text-sm text-muted sm:text-left">{label}</p>}
      {marquee ? (
        <div className="logo-marquee group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <ul className="logo-track flex w-max gap-4 group-hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((c, i) => (
              <li key={`${c.name}-${i}`} aria-hidden={i >= clients.length ? true : undefined} className="w-40 shrink-0 sm:w-48">
                <LogoCard client={c} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul data-reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {clients.map((c) => (
            <li key={c.name}>
              <LogoCard client={c} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
