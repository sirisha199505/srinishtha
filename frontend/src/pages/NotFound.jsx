import { Link } from 'react-router-dom'
import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'

export default function NotFound() {
  const { labels, navigation } = useSite()
  usePageMeta('notFound')
  const l = labels.notFound
  return (
    <PageHeader eyebrow={l.eyebrow} heading={l.heading} lede={l.lede}>
      <ul className="flex flex-wrap gap-x-8 gap-y-3">
        {[{ label: 'Home', to: '/' }, ...navigation.primary].map((n) => (
          <li key={n.to}>
            <Link to={n.to} className="font-medium text-accent hover:text-accent-strong">
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </PageHeader>
  )
}
