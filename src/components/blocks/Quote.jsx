import { cx } from '../../lib/cx'
import { Quote as QuoteMark } from '../ui/Icons'

export function Quote({ testimonial, inverse = false, size = 'lg' }) {
  if (!testimonial) return null
  return (
    <figure>
      <QuoteMark className={cx('size-10', inverse ? 'text-accent-bright' : 'text-accent-strong')} />
      <blockquote
        className={cx(
          'mt-6 font-medium tracking-tight',
          size === 'lg' ? 'text-[1.375rem] leading-snug sm:text-[2rem] sm:leading-[1.3]' : 'text-lg leading-relaxed',
          inverse ? 'text-white' : 'text-ink',
        )}
      >
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className={cx('mt-10 flex items-center gap-4 border-t pt-6', inverse ? 'border-line-dark' : 'border-line')}>
        {(testimonial.logo || testimonial.photo) && (
          <img
            src={testimonial.logo || testimonial.photo}
            alt=""
            className={cx('size-14 object-cover', testimonial.photo ? 'rounded-full' : 'rounded-[3px] bg-white object-contain p-2')}
          />
        )}
        <div>
          <p className={cx('font-semibold', inverse ? 'text-white' : 'text-ink')}>{testimonial.author}</p>
          <p className={cx('text-sm', inverse ? 'text-muted-dark' : 'text-muted')}>{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  )
}
