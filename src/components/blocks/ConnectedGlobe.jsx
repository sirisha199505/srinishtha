import { useEffect, useRef } from 'react'
import { createGlobe } from '../../lib/globe'
import { NamedIcon } from '../ui/Icons'

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
// Small screens and low-core devices get fewer dots, links and stars.
const isLite = () => window.innerWidth < 640 || (navigator.hardwareConcurrency || 8) <= 4

// Desktop: a large globe to the right of the copy, bleeding off the right and bottom edges.
// Below lg: a horizon rising behind the bottom of the hero, so the headline and CTAs stay
// first (HomeHero reserves that space).
function heroLayout(w, h) {
  if (w >= 1024) {
    // The top of the globe always clears the 76px header; the bottom may bleed off.
    const r = Math.min(h * 0.52, w * 0.36)
    return { cx: w * 0.74, cy: Math.max(h * 0.62, 100 + r), r }
  }
  // Only the top of the globe shows here, so it is tipped back to bring South Asia into view.
  const r = Math.min(w * 0.6, 420)
  return { cx: w / 2, cy: h + r * 0.18, r, tilt: -24 }
}

// `labels`: [{ icon, label, x, y, align }] with x/y in globe radii from its centre.
export function ConnectedGlobe({ labels = [] }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const globe = createGlobe(canvasRef.current, {
      layout: heroLayout,
      reducedMotion: reducedMotion(),
      lite: isLite(),
      onLayout: ({ cx, cy, r }) => {
        wrap.style.setProperty('--gx', `${cx}px`)
        wrap.style.setProperty('--gy', `${cy}px`)
        wrap.style.setProperty('--gr', `${r}px`)
      },
    })
    return () => globe?.destroy()
  }, [])

  return (
    <div ref={wrapRef} aria-hidden="true" className="globe-fallback absolute inset-0 -z-10 select-none">
      <canvas ref={canvasRef} className="globe-canvas size-full" />
      {/* Stage 3: what travels along the connections */}
      <ul className="hidden xl:block">
        {labels.map((l, i) => (
          <li
            key={l.label}
            className="globe-label absolute flex items-center gap-2 rounded-full border border-white/10 bg-navy/75 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] whitespace-nowrap text-white/85 uppercase"
            style={{
              // Kept inside the hero even when the globe runs off the right edge
              left: `clamp(1rem, calc(var(--gx) + var(--gr) * ${l.x}), calc(100% - 1.5rem))`,
              top: `max(6.5rem, calc(var(--gy) + var(--gr) * ${l.y}))`,
              translate: `${{ left: '0', center: '-50%', right: '-100%' }[l.align || 'center']} -50%`,
              '--d': `${2600 + i * 220}ms`,
            }}
          >
            <NamedIcon name={l.icon} className="size-4 text-gold" />
            {l.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
