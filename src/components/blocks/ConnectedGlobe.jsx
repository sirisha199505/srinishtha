import { useEffect, useRef } from 'react'
import { createGlobe } from '../../lib/globe'
import { NamedIcon } from '../ui/Icons'

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
// Small screens and low-core devices get fewer dots, links and stars.
const isLite = () => window.innerWidth < 640 || (navigator.hardwareConcurrency || 8) <= 4

// The canvas covers the whole hero (so stars, halo and arcs can spill past the sphere), while the
// sphere itself fills `slotRef`: a square HomeHero places inside its Container, so the globe is
// always whole and keeps the same side gutters as the copy (right of the copy on desktop, below
// it on tablet and phone).
function slotLayout(canvas, slot) {
  const c = canvas.getBoundingClientRect()
  const s = slot.getBoundingClientRect()
  return { cx: s.left - c.left + s.width / 2, cy: s.top - c.top + s.height / 2, r: s.width / 2 }
}

// `labels`: [{ icon, label, x, y, align }] with x/y in globe radii from its centre.
export function ConnectedGlobe({ slotRef, labels = [] }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const globe = createGlobe(canvas, {
      layout: () => slotLayout(canvas, slotRef.current),
      reducedMotion: reducedMotion(),
      lite: isLite(),
      onLayout: ({ cx, cy, r }) => {
        wrap.style.setProperty('--gx', `${cx}px`)
        wrap.style.setProperty('--gy', `${cy}px`)
        wrap.style.setProperty('--gr', `${r}px`)
      },
    })
    return () => globe?.destroy()
  }, [slotRef])

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
              // Kept inside the hero
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
