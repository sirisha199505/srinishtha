import { Link } from 'react-router-dom'
import { ArrowRight } from '../ui/Icons'
import { ScreenFrame } from '../ui/ScreenFrame'

// Row layout for solutions and industries: name · problem/description · supporting list · link.
// `image` (optional) adds a project screenshot beside the row.
export function ProblemRows({ rows }) {
  return (
    <ul className="border-b border-line">
      {rows.map((row) => (
        <li key={row.key} id={row.key} data-reveal className="grid scroll-mt-28 gap-5 border-t border-line py-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            {row.eyebrow && <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-accent-strong uppercase">{row.eyebrow}</p>}
            <h3 className="text-2xl font-semibold tracking-tight">
              {row.titleTo ? (
                <Link to={row.titleTo} className="hover:text-accent-strong">{row.title}</Link>
              ) : (
                row.title
              )}
            </h3>
          </div>
          <div className={row.image ? 'lg:col-span-4' : 'lg:col-span-5'}>
            {row.text && <p className="text-[1.0625rem] leading-relaxed text-body">{row.text}</p>}
            {row.list && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {row.list.map((item) => (
                  <li key={item} className="rounded-sm border border-line bg-white px-3 py-1.5 text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {row.note && <p className="mt-4 text-sm text-muted">{row.note}</p>}
            {row.links?.length > 0 && (
              <div className="mt-5 flex flex-col gap-2.5">
                {row.links.map((l) => (
                  <Link key={l.to} to={l.to} className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-strong hover:text-ink">
                    {l.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            )}
          </div>
          {row.image && (
            <figure className="lg:col-span-4">
              <ScreenFrame src={row.image.src} alt={`${row.image.caption} platform`} />
              <figcaption className="mt-2 text-xs text-muted">{row.image.caption}</figcaption>
            </figure>
          )}
        </li>
      ))}
    </ul>
  )
}
