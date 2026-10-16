import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { CapabilityList } from '../components/blocks/CapabilityList'
import { PageHeader } from '../components/blocks/PageHeader'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section } from '../components/ui/Layout'

export default function Capabilities() {
  const site = useSite()
  const meta = usePageMeta('capabilities')
  return (
    <>
      <PageHeader {...meta} />
      <Section>
        <CapabilityList capabilities={site.capabilities} />
      </Section>
      <ClosingCta />
    </>
  )
}
