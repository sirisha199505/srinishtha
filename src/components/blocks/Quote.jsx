import { cx } from '../../lib/cx'

export function Quote({ testimonial, inverse = false, size = 'lg' }) {
  if (!testimonial) return null
  return (
    <figure>
      <blockquote
        className={cx(
          'font-medium tracking-tight',
          size === 'lg' ? 'text-xl leading-snug sm:text-[1.625rem] sm:leading-[1.35]' : 'text-lg leading-relaxed',
          inverse ? 'text-white' : 'text-ink',
        )}
      >
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        {(testimonial.logo || testimonial.photo) && (
          <img
            src={testimonial.logo || testimonial.photo}
            alt=""
            className={cx('size-12 object-cover', testimonial.photo ? 'rounded-full' : 'rounded-md bg-white object-contain p-1.5')}
          />
        )}
        <div>
          <p className={cx('font-medium', inverse ? 'text-white' : 'text-ink')}>{testimonial.author}</p>
          <p className={cx('text-sm', inverse ? 'text-muted-dark' : 'text-muted')}>{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  )
}
