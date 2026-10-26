import { useSite } from '../content/SiteProvider'
import { capabilityPath, solutionPath } from '../content/selectors'
import { SERVICES } from '../content/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProblemRows } from '../components/blocks/ProblemRows'
import { ServiceIndex } from '../components/blocks/ServiceIndex'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section, SectionHeading } from '../components/ui/Layout'

export default function Capabilities() {
  const site = useSite()
  usePageMeta('capabilities', { title: 'Services' })

  return (
    <>
      <PageHeader
        eyebrow="Services"
        heading="Technology services, engineered around your business."
        lede="Five areas of practice and one senior team, covering strategy, engineering, cloud, data and long-term support on a shared engineering foundation."
        crumbs={[{ label: 'Services' }]}
      />

      <Section>
        <SectionHeading eyebrow="What we do" title="Our services" lede="Every service is delivered by the same team, using the reusable Srinishtha Technology Framework." />
        <ServiceIndex services={SERVICES} />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Practices in depth" title="How each practice delivers." lede="Outcomes, scope and related work for each of our five practices." />
        <ProblemRows
          rows={site.capabilities.map((c) => ({
            key: c.slug,
            title: c.title,
            titleTo: capabilityPath(c.slug),
            text: c.outcome,
            list: c.items.slice(0, 5),
            links: [{ label: `Explore ${c.title}`, to: capabilityPath(c.slug) }],
          }))}
        />
      </Section>

      <Section>
        <SectionHeading eyebrow="Solutions" title="Solutions by business problem." lede={site.pages.solutions.lede} />
        <ProblemRows
          rows={site.solutions.map((s) => ({
            key: s.slug,
            title: s.title,
            titleTo: solutionPath(s.slug),
            text: s.headline,
            list: s.problems,
            links: [{ label: site.labels.solutions.view, to: solutionPath(s.slug) }],
          }))}
        />
      </Section>

      <ClosingCta />
    </>
  )
}
