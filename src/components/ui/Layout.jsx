import { cx } from '../../lib/cx'

export function Container({ className, children }) {
  return <div className={cx('mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10', className)}>{children}</div>
}

const TONES = {
  white: 'bg-canvas',
  paper: 'bg-paper',
  navy: 'bg-navy text-muted-dark [&_h2]:text-white [&_h3]:text-white',
}

// Vertical padding shared by every page band (sections, CTA panel, logo strip, contact,
// footer) so the rhythm is the same everywhere: 40px phone, 48px tablet, 56px desktop.
export const SECTION_Y = 'py-10 sm:py-12 lg:py-14'
export const SECTION_PT = 'pt-10 sm:pt-12 lg:pt-14'
export const SECTION_PB = 'pb-10 sm:pb-12 lg:pb-14'

// `dark` kept as an alias so older call sites keep working.
export function Section({ tone = 'white', id, className, containerClassName, children, ...rest }) {
  return (
    <section id={id} className={cx(TONES[tone === 'dark' ? 'navy' : tone], SECTION_Y, className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, inverse = false, className }) {
  if (!children) return null
  return (
    <p
      className={cx(
        'flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase',
        inverse ? 'text-accent-bright' : 'text-accent-strong',
        className,
      )}
    >
      <span aria-hidden="true" className="eyebrow-line h-px w-6" />
      {children}
    </p>
  )
}

// Sets one phrase of a heading in the logo's colour sweep (light- or dark-surface variant).
export function Highlighted({ text, highlight, inverse = false }) {
  if (!highlight || !text.includes(highlight)) return text
  const [before, after] = text.split(highlight)
  return (
    <>
      {before}
      <span className={inverse ? 'text-brand-gradient-inverse' : 'text-brand-gradient'}>{highlight}</span>
      {after}
    </>
  )
}

// Editorial section heading: title left, lede (and optional action) right on wide screens.
export function SectionHeading({ eyebrow, title, highlight, lede, as: Tag = 'h2', inverse = false, split = true, action, className }) {
  return (
    <div data-reveal className={cx('mb-7 grid gap-4 lg:grid-cols-12 lg:gap-12', className)}>
      <div className={split ? 'lg:col-span-7' : 'lg:col-span-9'}>
        <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
        <Tag className={cx('text-headline font-semibold', eyebrow && 'mt-4', inverse && 'text-white')}>
          <Highlighted text={title} highlight={highlight} inverse={inverse} />
        </Tag>
      </div>
      {(lede || action) && (
        <div className={cx('flex flex-col items-start justify-end gap-6', split ? 'lg:col-span-5' : 'lg:col-span-9')}>
          {lede && <p className={cx('text-lede', inverse ? 'text-muted-dark' : 'text-muted')}>{lede}</p>}
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
        'inline-flex items-center rounded-sm border px-2.5 py-1 text-xs font-medium',
        inverse ? 'border-white/20 text-white/80' : 'border-line bg-white text-muted',
      )}
    >
      {children}
    </span>
  )
}
