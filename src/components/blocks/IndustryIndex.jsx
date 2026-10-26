import { Link } from 'react-router-dom'
import { pad, revealDelay } from '../../lib/brand'
import { ArrowRight } from '../ui/Icons'

// Sector names on a hairline list, each linking to its section of the Industries page.
export function IndustryIndex({ industries }) {
  return (
    <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
      {industries.map((item, i) => (
        <li key={item.slug} data-reveal style={revealDelay(i % 3, 60)} className="border-b border-line">
          <Link to={`/industries#${item.slug}`} className="group flex items-center gap-4 py-5">
            <span className="text-xs font-semibold text-muted tabular-nums">{pad(i + 1)}</span>
            <span className="flex-1 text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-strong">{item.name}</span>
            <ArrowRight className="size-4 text-accent-strong transition-transform group-hover:translate-x-1" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
