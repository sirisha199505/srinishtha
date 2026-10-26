import { useEffect, useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import { revealDelay } from '../../lib/brand'
import { ConnectedFrame } from '../ui/ConnectedFrame'
import { ArrowRight, ArrowUpRight, Close, Pause, Play } from '../ui/Icons'

// Hover tilt: the photo leans towards the mouse, up to ±6° (mouse only; touch stays flat).
const tilt = (e) => {
  if (e.pointerType !== 'mouse') return
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`)
  e.currentTarget.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 12}deg`)
}
const untilt = (e) => {
  e.currentTarget.style.removeProperty('--ry')
  e.currentTarget.style.removeProperty('--rx')
}

const SLIDE_MS = 5500
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Cinematic view: full screen behind letterbox bars. Each photo fades in with a slow pan and
// zoom (alternating direction) while its title rises in like a credit; plays on its own every
// 5.5s with a brand-colour progress bar. Arrows (buttons or keys) step, Space pauses, Esc
// closes. No autoplay or camera move under reduced motion (index.css: .cine-*).
function CinematicView({ photos, index, onIndex, onClose }) {
  const ref = useRef(null)
  const n = photos.length
  const [playing, setPlaying] = useState(() => !reducedMotion())

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  const step = (d) => onIndex((index + d + n) % n)

  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => onIndex((index + 1) % n), SLIDE_MS)
    return () => clearTimeout(id)
  }, [playing, index, n, onIndex])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
    if (e.key === ' ') {
      e.preventDefault()
      setPlaying((p) => !p)
    }
  }

  const photo = photos[index]
  return (
    <dialog
      ref={ref}
      aria-label={`Life at Srinishtha: ${photo.title}`}
      onClose={onClose}
      onKeyDown={onKeyDown}
      className="cine-view fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden bg-black p-0 text-white backdrop:bg-black"
    >
      {/* Photos stacked; the active one fades in under a slow camera move */}
      {photos.map((p, i) => (
        <img
          key={p.image}
          src={p.image}
          alt={i === index ? p.title : ''}
          className={cx('cine-shot absolute inset-0 size-full object-cover', i === index && 'is-active', i % 2 && 'cine-shot-alt')}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65))]" />

      {/* Letterbox bars */}
      <div aria-hidden="true" className="cine-bar cine-bar-top absolute inset-x-0 top-0 h-[9vh] bg-black" />
      <div aria-hidden="true" className="cine-bar cine-bar-bottom absolute inset-x-0 bottom-0 h-[9vh] bg-black" />

      {/* Credit */}
      <div key={index} className="cine-credit absolute bottom-[calc(9vh+2rem)] left-6 max-w-[80vw] sm:left-12">
        <p className="text-xs font-semibold tracking-[0.3em] text-accent-bright uppercase">Life at Srinishtha</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{photo.title}</p>
        <p className="mt-3 text-sm text-white/60 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </p>
      </div>

      {/* Controls, in the bottom bar */}
      <div className="absolute inset-x-0 bottom-0 flex h-[9vh] items-center justify-end gap-2 px-6 sm:px-12">
        {[
          ['Previous photo', () => step(-1), <ArrowRight key="p" className="size-4 rotate-180" />],
          [playing ? 'Pause' : 'Play', () => setPlaying((p) => !p), playing ? <Pause key="pa" className="size-4" /> : <Play key="pl" className="size-4" />],
          ['Next photo', () => step(1), <ArrowRight key="n" className="size-4" />],
          ['Close', () => ref.current.close(), <Close key="c" className="size-4" />],
        ].map(([label, onClick, icon]) => (
          <button key={label} type="button" aria-label={label} onClick={onClick} className="flex size-10 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-black">
            {icon}
          </button>
        ))}
      </div>

      {/* Progress to the next photo */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[9vh] h-0.5 bg-white/10">
        {playing && <div key={index} className="cine-progress bg-brand-line h-full" style={{ animationDuration: `${SLIDE_MS}ms` }} />}
      </div>
    </dialog>
  )
}

// Life at Srinishtha photo grid. Each photo arrives face-down inside the brand line
// (ConnectedFrame), a navy card with its title, then turns over to the picture, cascading
// through the grid like dealt cards. Hover tilts it slightly in 3D and reveals its title and "View photo ↗"; clicking opens it
// full size. Touch screens
// show the title strip instead (index.css: .photo-*).
export function Gallery({ photos }) {
  const [open, setOpen] = useState(null)
  return (
    <>
      <div className="mb-6 flex justify-end">
        <button type="button" onClick={() => setOpen(0)} className="group inline-flex items-center gap-3 text-sm font-semibold text-ink hover:text-accent-strong">
          <span className="flex size-10 items-center justify-center rounded-full bg-navy text-white transition-transform group-hover:scale-110">
            <Play className="size-4 translate-x-px" />
          </span>
          Play cinematic view
        </button>
      </div>
      <ul className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-3">
        {photos.map((p, i) => (
          <li key={p.image} data-reveal style={revealDelay(i, 140)} className={cx('photo-item relative', p.span === 'wide' && 'sm:col-span-2')}>
            <ConnectedFrame className="photo-tilt size-full" onPointerMove={tilt} onPointerLeave={untilt}>
              <div className="photo-flip size-full">
                <button type="button" onClick={() => setOpen(i)} className="photo-card relative block size-full overflow-hidden rounded-[4px] bg-paper text-left">
                  <img src={p.image} alt="" loading="lazy" className="photo-image size-full object-cover" />
                  <p className="photo-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-white">{p.title}</p>
                  <span className="photo-overlay absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/90 via-navy/45 to-navy/10 p-5 sm:p-6">
                    <span className="text-xs font-semibold tracking-[0.16em] text-accent-bright uppercase">Life at Srinishtha</span>
                    <span className="mt-2 text-xl font-semibold tracking-tight text-white">{p.title}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      View photo <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                  <span className="sr-only">{p.title}: open in cinematic view</span>
                </button>
                <span aria-hidden="true" className="photo-back flex flex-col items-center justify-center rounded-[4px] bg-navy bg-blueprint p-6 text-center">
                  <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-accent-bright uppercase">Life at Srinishtha</span>
                  <span className="mt-2 text-xl font-semibold tracking-tight text-white">{p.title}</span>
                  <span className="bg-brand-line mt-4 h-0.5 w-12" />
                </span>
              </div>
            </ConnectedFrame>
          </li>
        ))}
      </ul>
      {open !== null && <CinematicView photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}
