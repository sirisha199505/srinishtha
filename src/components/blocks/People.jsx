import { revealDelay } from '../../lib/brand'
import { Quote as QuoteMark } from '../ui/Icons'

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

// Portrait when supplied in content, otherwise a quiet monogram.
function Avatar({ name, image, size = 'size-16' }) {
  if (image) return <img src={image} alt="" loading="lazy" className={`${size} rounded-full bg-paper object-cover`} />
  return (
    <span aria-hidden="true" className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-navy text-base font-semibold tracking-wide text-gold ring-1 ring-gold/40 ring-offset-2 ring-offset-canvas`}>
      {initials(name)}
    </span>
  )
}

export function LeaderGrid({ leaders }) {
  return (
    <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
      {leaders.map((l, i) => (
        <li key={l.name} data-reveal style={revealDelay(i)} className="border-t border-line py-8">
          <div className="flex items-center gap-4">
            <Avatar name={l.name} image={l.image} />
            <div>
              <h3 className="text-lg font-semibold tracking-tight">{l.name}</h3>
              <p className="text-sm font-medium text-accent-strong">{l.role}</p>
            </div>
          </div>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{l.bio}</p>
        </li>
      ))}
    </ul>
  )
}

export function VoiceGrid({ voices }) {
  return (
    <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
      {voices.map((v, i) => (
        <li key={v.author} data-reveal style={revealDelay(i % 4)} className="flex flex-col border-t border-line py-8">
          <QuoteMark className="size-6 text-accent-strong" />
          <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-body">{v.quote}</blockquote>
          <div className="mt-6 flex items-center gap-3">
            <Avatar name={v.author} size="size-10" />
            <div>
              <p className="text-sm font-semibold text-ink">{v.author}</p>
              <p className="text-xs text-muted">{v.role}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
