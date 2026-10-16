import { useSite } from '../content/SiteProvider'
import { bySlug, capabilityPath, solutionPath } from '../content/selectors'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProblemRows } from '../components/blocks/ProblemRows'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section } from '../components/ui/Layout'

export default function Solutions() {
  const site = useSite()
  const meta = usePageMeta('solutions')
  const rows = site.solutions.map((s) => {
    const capability = bySlug(site.capabilities, s.capability)
    return {
      key: s.slug,
      title: s.title,
      titleTo: solutionPath(s.slug),
      text: s.headline,
      list: s.problems,
      note: `${site.labels.solutions.proof}: ${s.proof}`,
      links: [{ label: site.labels.solutions.view, to: solutionPath(s.slug) }, ...(capability ? [{ label: capability.title, to: capabilityPath(capability.slug) }] : [])],
    }
  })

  return (
    <>
      <PageHeader {...meta} />
      <Section>
        <ProblemRows rows={rows} />
      </Section>
      <ClosingCta ctaKey="workflow" />
    </>
  )
}
