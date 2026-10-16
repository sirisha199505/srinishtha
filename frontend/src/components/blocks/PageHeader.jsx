import { Link } from 'react-router-dom'
import { Container, Eyebrow } from '../ui/Layout'

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.to ? (
              <Link to={item.to} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Standard header for every inner page.
export function PageHeader({ eyebrow, heading, lede, crumbs, children }) {
  return (
    <header className="border-b border-line bg-paper bg-[radial-gradient(ellipse_at_top_right,rgba(255,139,38,0.10),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(138,63,209,0.10),transparent_50%)] pt-28 pb-12 sm:pt-32 sm:pb-14">
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="reveal mt-4 text-display font-semibold">{heading}</h1>
          </div>
          {lede && <p className="text-lg leading-relaxed text-muted lg:col-span-7">{lede}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  )
}
