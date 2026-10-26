import { cx } from '../../lib/cx'
import { track } from '../../lib/track'
import { SmartLink } from './SmartLink'
import { ArrowRight } from './Icons'

const VARIANTS = {
  primary: 'bg-accent text-white hover:bg-accent-strong',
  inverse: 'bg-canvas text-navy hover:bg-accent-soft',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
  'outline-inverse': 'border border-white/40 text-white hover:border-gold hover:text-gold',
}

const BASE =
  'group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-6 text-[0.9375rem] font-semibold tracking-[-0.005em] transition-colors duration-200'

// Renders as a link when given `to`/`href`, otherwise as a <button>.
export function Button({ to, href, variant = 'primary', arrow = false, children, className, onClick, ...rest }) {
  const classes = cx(BASE, VARIANTS[variant], className)
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
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

// Quiet text link with an arrow, for "view all" actions: { label, to }.
export function TextLink({ to, href, children, inverse = false, className }) {
  return (
    <SmartLink
      to={to}
      href={href}
      className={cx(
        'group inline-flex items-center gap-2 text-[0.9375rem] font-semibold',
        inverse ? 'text-white hover:text-accent-bright' : 'text-accent-strong hover:text-ink',
        className,
      )}
    >
      <span className="border-b border-current/30 pb-0.5 transition-colors group-hover:border-current">{children}</span>
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </SmartLink>
  )
}

// Secondary "see more" link for section headings: { label, to }.
export function MoreLink({ link, inverse = false }) {
  if (!link) return null
  return (
    <TextLink to={link.to} inverse={inverse}>
      {link.label}
    </TextLink>
  )
}

// A CTA pair as defined by the `ctas` content block: { primary, secondary }.
export function CtaPair({ cta, inverse = false, className }) {
  if (!cta) return null
  return (
    <div className={cx('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
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
