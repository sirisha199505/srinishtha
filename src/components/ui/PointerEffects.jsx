import { useEffect, useRef } from 'react'

// Two pointer touches, wired once for the whole site. They start with the first real mouse
// movement (html.has-mouse), so touch input never triggers them; under reduced motion the
// label snaps to the pointer instead of trailing it (index.css: .cursor-label, [data-spotlight]).
// - Spotlight: an element marked [data-spotlight] gets --sx/--sy at the pointer, which CSS
//   turns into a soft radial glow while it is hovered.
// - Project cursor: over an element marked [data-cursor-label], a small label (its value,
//   e.g. "View project") trails the normal pointer. It is aria-hidden and ignores the
//   pointer, so it never blocks clicks or text selection; the card stays the real link.
export function PointerEffects() {
  const labelRef = useRef(null)

  useEffect(() => {
    const label = labelRef.current
    const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.3
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let frame = 0
    let card = null

    // The label eases towards the pointer, so it trails it slightly rather than sticking.
    const tick = () => {
      pos.x += (target.x - pos.x) * ease
      pos.y += (target.y - pos.y) * ease
      label.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.2 ? requestAnimationFrame(tick) : 0
    }

    const show = (next) => {
      if (next === card) return
      card = next
      if (card) label.firstChild.lastChild.textContent = card.dataset.cursorLabel
      label.classList.toggle('is-visible', Boolean(card))
    }

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      document.documentElement.classList.add('has-mouse')
      const spot = e.target.closest?.('[data-spotlight]')
      if (spot) {
        const r = spot.getBoundingClientRect()
        spot.style.setProperty('--sx', `${e.clientX - r.left}px`)
        spot.style.setProperty('--sy', `${e.clientY - r.top}px`)
      }
      // Jump straight to the pointer when the label appears, then trail it.
      if (!card) {
        pos.x = e.clientX
        pos.y = e.clientY
      }
      target.x = e.clientX
      target.y = e.clientY
      show(e.target.closest?.('[data-cursor-label]') ?? null)
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const hide = () => show(null)

    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('scroll', hide, { passive: true })
    window.addEventListener('pointerdown', hide)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('scroll', hide)
      window.removeEventListener('pointerdown', hide)
    }
  }, [])

  return (
    <div ref={labelRef} aria-hidden="true" className="cursor-label">
      <span className="cursor-label-chip">
        <span className="cursor-label-dot" />
        <span>View project</span>
      </span>
    </div>
  )
}
