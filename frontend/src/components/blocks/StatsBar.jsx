import { useEffect, useRef, useState } from 'react'
import { cx } from '../../lib/cx'

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Counts a value like "100+" or "12+" up once when it first becomes visible.
// Years (e.g. "2024") and non-numeric values render as-is.
function CountUp({ value }) {
  const match = /^(\d+)(.*)$/.exec(value)
  const target = match ? Number(match[1]) : null
  const animate = target !== null && target < 1000
  const [current, setCurrent] = useState(animate ? 0 : target)
  const ref = useRef(null)

  useEffect(() => {
    if (!animate) return
    if (reducedMotion()) return setCurrent(target)
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / 1200)
        setCurrent(Math.round(target * (1 - Math.pow(1 - t, 3))))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [animate, target])

  if (!match) return value
  return (
    <span ref={ref} aria-label={value}>
      {current}
      {match[2]}
    </span>
  )
}

export function StatsBar({ stats, inverse = false }) {
  return (
    <dl className={cx('grid grid-cols-2 lg:grid-cols-4', inverse ? 'border-t border-white/15' : 'border-t border-line')}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cx(
            'flex flex-col-reverse py-5 pr-6 lg:py-6',
            i > 0 && 'lg:border-l lg:pl-8',
            i % 2 === 1 && 'border-l pl-6 lg:pl-8',
            inverse ? 'border-white/15' : 'border-line',
          )}
        >
          <dt className={cx('mt-1 text-sm', inverse ? 'text-white/60' : 'text-muted')}>{s.label}</dt>
          <dd className="text-brand-gradient text-3xl font-semibold tracking-tight tabular-nums">
            <CountUp value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
