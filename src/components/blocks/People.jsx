import { brandColor, revealDelay } from '../../lib/brand'

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

// Portrait when supplied in content, otherwise a quiet monogram.
function Avatar({ name, image, color }) {
  if (image) return <img src={image} alt="" loading="lazy" className="size-16 rounded-full bg-paper object-cover" />
  return (
    <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full text-lg font-semibold text-white" style={{ background: color }}>
      {initials(name)}
    </span>
  )
}

export function LeaderGrid({ leaders }) {
  return (
    <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {leaders.map((l, i) => (
        <li key={l.name} data-reveal style={revealDelay(i)} className="border-t border-line pt-5">
          <div className="flex items-center gap-4">
            <Avatar name={l.name} image={l.image} color={brandColor(i)} />
            <div>
              <h3 className="text-lg font-semibold">{l.name}</h3>
              <p className="text-sm text-muted">{l.role}</p>
            </div>
          </div>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{l.bio}</p>
        </li>
      ))}
    </ul>
  )
}

export function VoiceGrid({ voices }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {voices.map((v, i) => (
        <li
          key={v.author}
          data-reveal
          style={{ ...revealDelay(i), borderTopColor: brandColor(i) }}
          className="flex flex-col rounded-2xl border border-t-4 border-line bg-white p-6 shadow-[0_12px_30px_-20px_rgba(20,20,40,0.35)]"
        >
          <span aria-hidden="true" className="font-serif text-5xl leading-none" style={{ color: brandColor(i) }}>“</span>
          <blockquote className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink">{v.quote}</blockquote>
          <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: brandColor(i) }}>
              {initials(v.author)}
            </span>
            <div>
              <p className="font-semibold text-ink">{v.author}</p>
              <p className="text-xs text-muted">{v.role}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
