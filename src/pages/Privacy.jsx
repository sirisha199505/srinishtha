import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'

export default function Privacy() {
  const meta = usePageMeta('privacy')
  return <PageHeader {...meta} />
}
