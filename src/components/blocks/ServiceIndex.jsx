import { Link } from 'react-router-dom'
import { pad, revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'
import { ArrowRight, NamedIcon } from '../ui/Icons'

// The service catalogue on a hairline grid (no cards): icon, number, title, outcome, link.
// `compact` shows icon and title only (home page overview).
export function ServiceIndex({ services, compact = false }) {
  return (
    <ul className={cx('grid border-t border-l border-line lg:grid-cols-4', compact ? 'grid-cols-2' : 'sm:grid-cols-2')}>
      {services.map((s, i) => (
        <li key={s.title} data-reveal style={revealDelay(i % 4, 80)} className="border-r border-b border-line">
          <Link to={s.to} className={cx('group relative flex h-full flex-col transition-colors duration-300 hover:bg-white', compact ? 'p-5 sm:p-7' : 'p-6 sm:p-8')}>
            <span aria-hidden="true" className="absolute inset-x-0 top-0 bg-brand-line h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            <div className="flex items-start justify-between">
              <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <NamedIcon name={s.icon} className="size-6" />
              </span>
              {compact ? (
                <ArrowRight className="size-4 text-accent-strong opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              ) : (
                <span className="text-xs font-semibold text-muted tabular-nums">{pad(i + 1)}</span>
              )}
            </div>
            <h3 className={cx('leading-snug font-semibold tracking-tight', compact ? 'mt-6 text-base sm:text-lg' : 'mt-8 text-lg sm:mt-10')}>{s.title}</h3>
            {!compact && (
              <>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-strong">
                  Learn more
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  <span className="sr-only">about {s.title}</span>
                </span>
              </>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
