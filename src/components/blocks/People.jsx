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
