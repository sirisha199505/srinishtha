import { cx } from '../../lib/cx'
import { track } from '../../lib/track'
import { SmartLink } from './SmartLink'
import { ArrowRight } from './Icons'

const VARIANTS = {
  primary: 'bg-brand-gradient text-white',
  inverse: 'bg-canvas text-navy hover:bg-accent-soft',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
  'outline-inverse': 'border border-white/40 text-white hover:border-gold hover:text-gold',
}

const BASE =
  'group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-6 text-[0.9375rem] font-semibold tracking-[-0.005em] transition-colors duration-200'

const MAGNET_PULL = 0.3
const MAGNET_MAX = 8
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
const COLOR_EASE = 'color 200ms, background-color 200ms, border-color 200ms'
const clamp = (v) => Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, v))

// Magnetic pull for key CTAs: within a 16px zone around the button it leans towards the
// pointer (up to 8px) and springs back when the pointer leaves. The zone's padding is
// cancelled by an equal negative margin, so the layout never shifts. Mouse only; still
// under reduced motion.
function Magnet({ children }) {
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const el = e.currentTarget.firstElementChild
    el.style.transition = `translate 200ms ease-out, ${COLOR_EASE}`
    el.style.translate = `${clamp((e.clientX - r.left - r.width / 2) * MAGNET_PULL)}px ${clamp((e.clientY - r.top - r.height / 2) * MAGNET_PULL)}px`
  }
  const onPointerLeave = (e) => {
    const el = e.currentTarget.firstElementChild
    el.style.transition = `translate 700ms ${SPRING}, ${COLOR_EASE}`
    el.style.translate = ''
  }
  return (
    <span className="-m-4 flex p-4 sm:inline-flex" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {children}
    </span>
  )
}

// Renders as a link when given `to`/`href`, otherwise as a <button>. `magnetic` adds the
// pointer pull; keep it to the few primary calls to action.
export function Button({ magnetic = false, ...props }) {
  if (!magnetic) return <PlainButton {...props} />
  return (
    <Magnet>
      <PlainButton {...props} className={cx('flex-1', props.className)} />
    </Magnet>
  )
}

function PlainButton({ to, href, variant = 'primary', arrow = false, children, className, onClick, ...rest }) {
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
        <Button to={cta.primary.to} href={cta.primary.href} arrow magnetic>
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
