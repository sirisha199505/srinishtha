import { Link } from 'react-router-dom'
import { capabilityPath } from '../../content/selectors'
import { brandColor, revealDelay } from '../../lib/brand'
import { ArrowRight } from '../ui/Icons'

// Numbered editorial rows: number · title · outcome · link.
export function CapabilityList({ capabilities }) {
  return (
    <ol className="border-b border-line">
      {capabilities.map((c, i) => (
        <li key={c.slug} data-reveal style={revealDelay(i)} className="border-t border-line">
          <Link
            to={capabilityPath(c.slug)}
            className="group grid gap-2 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-7"
          >
            <span className="flex items-center gap-3 text-sm font-semibold tabular-nums sm:col-span-1" style={{ color: brandColor(i) }}>
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: brandColor(i) }} />
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:col-span-4">
              {c.title}
            </h3>
            <p className="leading-relaxed text-muted sm:col-span-6">{c.outcome}</p>
            <ArrowRight className="hidden size-5 text-muted transition-colors group-hover:text-accent sm:col-span-1 sm:block sm:justify-self-end" />
          </Link>
        </li>
      ))}
    </ol>
  )
}
