import { cx } from '../../lib/cx'

export function Container({ className, children }) {
  return <div className={cx('mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10', className)}>{children}</div>
}

const TONES = {
  white: 'bg-white',
  paper: 'bg-paper',
  dark: 'bg-ink bg-[radial-gradient(ellipse_at_top_right,rgba(138,63,209,0.28),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(255,139,38,0.12),transparent_50%)] text-muted-dark [&_h2]:text-white [&_h3]:text-white',
}

export function Section({ tone = 'white', id, className, containerClassName, children, ...rest }) {
  return (
    <section id={id} className={cx(TONES[tone], 'py-10 sm:py-14', className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, inverse = false, className }) {
  if (!children) return null
  return (
    <p
      className={cx(
        'flex items-center gap-3 text-[0.8125rem] font-medium tracking-wide',
        inverse ? 'text-brand-orange' : 'text-accent',
        className,
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-brand-gradient" />
      {children}
    </p>
  )
}

// Editorial section heading: title left, lede right on wide screens.
export function SectionHeading({ eyebrow, title, lede, as: Tag = 'h2', inverse = false, split = true, highlight = false, action, className }) {
  return (
    <div data-reveal className={cx('mb-6 grid gap-4 sm:mb-8 lg:grid-cols-12 lg:gap-10', className)}>
      <div className={split ? 'lg:col-span-7' : 'lg:col-span-9'}>
        <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
        <Tag className={cx('mt-3 text-headline font-semibold', inverse && 'text-white')}>
          {highlight ? <span className="text-brand-gradient">{title}</span> : title}
        </Tag>
      </div>
      {(lede || action) && (
        <div className={cx('flex flex-col justify-end gap-5', split ? 'lg:col-span-5' : 'lg:col-span-9')}>
          {lede && <p className={cx('text-[1.0625rem] leading-relaxed', inverse ? 'text-muted-dark' : 'text-muted')}>{lede}</p>}
          {action}
        </div>
      )}
    </div>
  )
}

export function Tag({ children, inverse = false }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        inverse ? 'border-white/20 text-white/80' : 'border-line text-muted',
      )}
    >
      {children}
    </span>
  )
}
