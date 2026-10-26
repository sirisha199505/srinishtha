import { useId } from 'react'
import { BRAND_COLORS } from '../../lib/brand'
import { cx } from '../../lib/cx'

// The site's signature motion, after the hero globe's connection lines: a thin line in the
// logo colours draws itself around the media as it scrolls into view, the media fades in
// inside it (rising 40px), and on hover a bright segment travels round the frame while the
// image zooms to 1.04 (index.css: .cf-*).
// Reveals with its nearest [data-reveal] ancestor. `flush` draws the line on the media's own
// edge (square corners) instead of just outside it, so it keeps the column's alignment.
export function ConnectedFrame({ className, children, flush = false, ...rest }) {
  const id = `cf${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <div className={cx('cf relative', flush && 'cf-flush', className)} {...rest}>
      <svg aria-hidden="true" className={cx('cf-line pointer-events-none absolute z-10 overflow-visible', flush ? 'inset-0 size-full' : '-top-1.5 -left-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)]')}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            {BRAND_COLORS.map((c, i) => (
              <stop key={c} offset={i / (BRAND_COLORS.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
        <rect className="cf-base" pathLength="1" stroke={`url(#${id})`} />
        <rect className="cf-run" pathLength="1" stroke={`url(#${id})`} />
      </svg>
      <div className="cf-media size-full">{children}</div>
    </div>
  )
}
