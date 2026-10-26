import { Link } from 'react-router-dom'
import { useSite } from '../content/SiteProvider'
import { NAV } from '../content/siteConfig'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'

export default function NotFound() {
  const { labels } = useSite()
  usePageMeta('notFound')
  const l = labels.notFound
  return (
    <PageHeader eyebrow={l.eyebrow} heading={l.heading} lede={l.lede}>
      <ul className="flex flex-wrap gap-x-8 gap-y-3">
        {NAV.map((n) => (
          <li key={n.to}>
            <Link to={n.to} className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </PageHeader>
  )
}
