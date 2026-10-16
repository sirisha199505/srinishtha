import { brandColor, revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'

// Numbered horizontal process (automation flow, delivery model, hiring process).
export function StepFlow({ steps, inverse = false }) {
  const cols = { 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }[steps.length] || 'lg:grid-cols-3'
  return (
    <ol className={cx('grid gap-px sm:grid-cols-2', cols, inverse ? 'bg-line-dark' : 'bg-line')}>
      {steps.map((s, i) => (
        <li key={s.title} data-reveal style={revealDelay(i, 90)} className={cx('relative p-5 sm:p-6', inverse ? 'bg-ink' : 'bg-white')}>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full text-sm font-semibold text-white tabular-nums" style={{ background: brandColor(i) }}>
              {i + 1}
            </span>
            {i < steps.length - 1 && <span aria-hidden="true" className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${brandColor(i)}, ${brandColor(i + 1)})` }} />}
          </div>
          <h3 className="text-[1.0625rem] font-semibold">{s.title}</h3>
          <p className={cx('mt-2 text-[0.9375rem] leading-relaxed', inverse ? 'text-muted-dark' : 'text-muted')}>{s.text}</p>
        </li>
      ))}
    </ol>
  )
}
