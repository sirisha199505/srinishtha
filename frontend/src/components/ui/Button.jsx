import { cx } from '../../lib/cx'
import { track } from '../../lib/track'
import { SmartLink } from './SmartLink'
import { ArrowRight } from './Icons'

const VARIANTS = {
  primary: 'bg-brand-gradient text-white shadow-[0_10px_24px_-10px_rgba(229,75,122,0.6)] hover:brightness-110',
  inverse: 'bg-white text-ink hover:bg-paper',
  outline: 'border border-accent/30 text-accent hover:border-accent hover:bg-accent-soft',
  'outline-inverse': 'border border-white/30 text-white hover:border-white',
}

const BASE =
  'group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-[0.9375rem] font-medium transition-colors duration-300'

// Renders as a link when given `to`/`href`, otherwise as a <button>.
export function Button({ to, href, variant = 'primary', arrow = false, children, className, onClick, ...rest }) {
  const classes = cx(BASE, VARIANTS[variant], className)
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="size-4" />}
    </>
  )

  if (to || href) {
    const handleClick = (e) => {
      track('cta_click', { label: typeof children === 'string' ? children : undefined, to: to || href })
      onClick?.(e)
    }
    return (
      <SmartLink to={to} href={href} className={classes} onClick={handleClick} {...rest}>
        {content}
      </SmartLink>
    )
  }
  return (
    <button className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}

// Secondary "see more" link for section headings: { label, to }.
export function MoreLink({ link }) {
  if (!link) return null
  return (
    <Button to={link.to} variant="outline" arrow className="self-start">
      {link.label}
    </Button>
  )
}

// A CTA pair as defined by the `ctas` content block: { primary, secondary }.
export function CtaPair({ cta, inverse = false, className }) {
  if (!cta) return null
  return (
    <div className={cx('flex flex-col gap-3 sm:flex-row', className)}>
      {cta.primary && (
        <Button to={cta.primary.to} href={cta.primary.href} arrow>
          {cta.primary.label}
        </Button>
      )}
      {cta.secondary && (
        <Button to={cta.secondary.to} href={cta.secondary.href} variant={inverse ? 'outline-inverse' : 'outline'}>
          {cta.secondary.label}
        </Button>
      )}
    </div>
  )
}
