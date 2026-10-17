import { cx } from '../../lib/cx'

// One client logo on a uniform card. `dark` = light logo on a dark card;
// `bg` = a brand colour card (text shown in white).
function LogoCard({ client, compact }) {
  const branded = Boolean(client.bg)
  return (
    <div
      className={cx(
        'flex items-center justify-center rounded-xl border',
        compact ? 'h-14 px-2 sm:h-20 sm:px-4' : 'h-20 px-4',
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
          className={cx('max-h-8 w-auto max-w-full object-contain sm:max-h-10 sm:max-w-[120px]', !client.dark && !branded && 'mix-blend-multiply')}
        />
      ) : (
        // Clients without a logo file get a clean wordmark.
        <span className={cx('text-center text-[0.6875rem] leading-tight font-semibold tracking-tight sm:text-sm', branded || client.dark ? 'text-white' : 'text-ink')}>
          {client.name}
        </span>
      )}
    </div>
  )
}

// Uniform grid of client logo cards.
export function LogoWall({ clients, label, compact = false }) {
  return (
    <div>
      {label && <p className="mb-6 text-center text-sm text-muted sm:text-left">{label}</p>}
      <ul data-reveal className={cx('grid gap-3 sm:gap-4 lg:grid-cols-5', compact ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3')}>
        {clients.map((c) => (
          <li key={c.name}>
            <LogoCard client={c} compact={compact} />
          </li>
        ))}
      </ul>
    </div>
  )
}
