import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'
import { Container, Eyebrow, SECTION_PB } from '../ui/Layout'

export function Breadcrumbs({ items, inverse = false }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className={cx('flex flex-wrap items-center gap-2 text-sm', inverse ? 'text-muted-dark' : 'text-muted')}>
        <li className="flex items-center gap-2">
          <Link to="/" className={inverse ? 'hover:text-white' : 'hover:text-ink'}>Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.to ? (
              <Link to={item.to} className={inverse ? 'hover:text-white' : 'hover:text-ink'}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={inverse ? 'text-white' : 'text-ink'}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Standard header for every inner page: navy band with a blueprint grid, one clear H1.
export function PageHeader({ eyebrow, heading, lede, crumbs, children, tone = 'navy' }) {
  const inverse = tone === 'navy'
  return (
    <header className={cx('relative isolate overflow-hidden pt-[calc(68px+2.5rem)] sm:pt-[calc(68px+3rem)] lg:pt-[calc(76px+3.5rem)]', SECTION_PB, inverse ? 'bg-navy bg-blueprint' : 'border-b border-line bg-paper')}>
      {inverse && (
        <>
          <div aria-hidden="true" className="absolute -top-24 -right-32 -z-10 size-[30rem] rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute top-10 -right-10 -z-10 size-[18rem] rounded-full border border-accent-bright/20" />
        </>
      )}
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} inverse={inverse} />}
        <div className="max-w-4xl">
          <Eyebrow inverse={inverse} className="reveal">{eyebrow}</Eyebrow>
          <h1 className={cx('reveal mt-5 text-title font-semibold [animation-delay:80ms]', inverse && 'text-white')}>{heading}</h1>
          {lede && <p className={cx('reveal mt-6 max-w-3xl text-lede [animation-delay:160ms]', inverse ? 'text-muted-dark' : 'text-muted')}>{lede}</p>}
        </div>
        {children && <div className="reveal mt-10 [animation-delay:240ms]">{children}</div>}
      </Container>
    </header>
  )
}
