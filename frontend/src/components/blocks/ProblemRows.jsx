import { Link } from 'react-router-dom'
import { ArrowRight } from '../ui/Icons'

// Row layout for solutions and industries: name · problem/description · supporting list · link.
export function ProblemRows({ rows }) {
  return (
    <ul className="border-b border-line">
      {rows.map((row) => (
        <li key={row.key} id={row.key} data-reveal className="grid scroll-mt-28 gap-4 border-t border-line py-7 lg:grid-cols-12 lg:gap-10">
          <h3 className="text-xl font-semibold tracking-tight lg:col-span-4">
            {row.titleTo ? (
              <Link to={row.titleTo} className="hover:text-accent">{row.title}</Link>
            ) : (
              row.title
            )}
          </h3>
          <div className="lg:col-span-5">
            {row.text && <p className="leading-relaxed text-body">{row.text}</p>}
            {row.list && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {row.list.map((item) => (
                  <li key={item} className="rounded border border-line px-2.5 py-1 text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col gap-3 text-sm lg:col-span-3">
            {row.note && <p className="text-muted">{row.note}</p>}
            {row.links?.map((l) => (
              <Link key={l.to} to={l.to} className="inline-flex items-center gap-2 font-medium text-accent hover:text-accent-strong">
                {l.label} <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
