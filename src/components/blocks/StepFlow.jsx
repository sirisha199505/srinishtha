import { revealDelay } from '../../lib/brand'
import { cx } from '../../lib/cx'

// Numbered process (approach, delivery model, hiring process). Desktop: a horizontal sequence
// joined by a line that draws in; phones: a vertical timeline.
export function StepFlow({ steps, inverse = false }) {
  const cols = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }[steps.length] || 'lg:grid-cols-3'
  return (
    <div className="relative">
      <div data-reveal aria-hidden="true" className="absolute top-[1.375rem] right-0 left-0 hidden h-px lg:block">
        <span className={cx('block h-full', inverse ? 'bg-line-dark' : 'bg-line')} />
        <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform delay-200 duration-[1600ms] ease-[var(--ease-out-soft)] [.is-visible>&]:scale-x-100" />
      </div>
      <ol className={cx('relative grid gap-0 lg:gap-8', cols)}>
        {steps.map((s, i) => (
          <li key={s.title} data-reveal style={revealDelay(i, 140)} className="relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0">
            {i < steps.length - 1 && (
              <span aria-hidden="true" className={cx('absolute top-11 bottom-0 left-[1.375rem] w-px lg:hidden', inverse ? 'bg-line-dark' : 'bg-line')} />
            )}
            <span
              aria-hidden="true"
              className={cx(
                'relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border',
                inverse ? 'border-accent-bright bg-navy' : 'border-accent bg-white',
              )}
            >
              <span className={cx('size-2.5 rounded-full', inverse ? 'bg-accent-bright' : 'bg-accent')} />
            </span>
            <div className="lg:mt-7">
              <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className={cx('mt-2 text-[0.9375rem] leading-relaxed', inverse ? 'text-muted-dark' : 'text-muted')}>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
