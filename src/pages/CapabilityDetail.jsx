import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSite } from '../content/SiteProvider'
import { bySlug, ctaFor, industryName, pickSlugs, solutionPath } from '../content/selectors'
import { usePageMeta } from '../hooks/usePageMeta'
import { track } from '../lib/track'
import { CaseStudyGrid } from '../components/blocks/CaseStudyCard'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProblemRows } from '../components/blocks/ProblemRows'
import { ClosingCta } from '../components/layout/ClosingCta'
import { CtaPair } from '../components/ui/Button'
import { Section, SectionHeading } from '../components/ui/Layout'
import { RuleList } from '../components/ui/RuleList'
import NotFound from './NotFound'

function CapabilityPage({ capability }) {
  const site = useSite()
  const labels = site.labels.capability
  usePageMeta('capabilities', { title: capability.title, description: capability.summary })
  useEffect(() => track('capability_view', { capability: capability.slug }), [capability.slug])

  const studies = pickSlugs(site.caseStudies, capability.caseStudies)
  const solutions = site.solutions.filter((s) => s.capability === capability.slug)

  return (
    <>
      <PageHeader
        eyebrow={labels.eyebrow}
        heading={capability.headline}
        lede={capability.summary}
        crumbs={[{ label: 'Services', to: '/capabilities' }, { label: capability.title }]}
      >
        <CtaPair cta={ctaFor(site, capability.cta)} inverse />
      </PageHeader>

      <Section>
        <SectionHeading eyebrow={capability.title} title={labels.deliver} lede={capability.outcome} />
        <RuleList items={capability.items} columns={2} />
      </Section>

      {solutions.length > 0 && (
        <Section tone="paper">
          <SectionHeading title={labels.solutions} />
          <ProblemRows rows={solutions.map((s) => ({ key: s.slug, title: s.title, titleTo: solutionPath(s.slug), text: s.headline, list: s.problems, links: [{ label: site.labels.solutions.view, to: solutionPath(s.slug) }] }))} />
        </Section>
      )}

      {studies.length > 0 && (
        <Section>
          <SectionHeading title={labels.work} />
          <CaseStudyGrid related studies={studies} industryOf={(slug) => industryName(site, slug)} />
        </Section>
      )}

      <ClosingCta ctaKey={capability.cta} />
    </>
  )
}

export default function CapabilityDetail() {
  const { slug } = useParams()
  const capability = bySlug(useSite().capabilities, slug)
  return capability ? <CapabilityPage capability={capability} /> : <NotFound />
}
