import { useSite } from '../content/SiteProvider'
import { usePageMeta } from '../hooks/usePageMeta'
import { FeatureGrid } from '../components/blocks/FeatureGrid'
import { PageHeader } from '../components/blocks/PageHeader'
import { StepFlow } from '../components/blocks/StepFlow'
import { ClosingCta } from '../components/layout/ClosingCta'
import { CtaPair } from '../components/ui/Button'
import { Section, SectionHeading } from '../components/ui/Layout'
import { RuleList } from '../components/ui/RuleList'

export default function Careers() {
  const site = useSite()
  usePageMeta('careers')
  const { careers } = site
  const labels = site.labels.careers
  const cta = site.ctas.careers

  return (
    <>
      <PageHeader eyebrow={careers.eyebrow} heading={careers.title} lede={careers.lede} crumbs={[{ label: 'About Us', to: '/about' }, { label: careers.eyebrow }]}>
        <CtaPair cta={cta} inverse />
      </PageHeader>

      <Section>
        <SectionHeading eyebrow={labels.perks} title={labels.perksTitle} />
        <FeatureGrid items={careers.perks} />
      </Section>

      <Section tone="paper" id="openings">
        <SectionHeading eyebrow={labels.roles} title={labels.rolesTitle} lede={labels.rolesLede} />
        <RuleList items={careers.roles} columns={2} />
      </Section>

      <Section>
        <SectionHeading eyebrow={labels.process} title={labels.processTitle} />
        <StepFlow steps={careers.hiringProcess} />
      </Section>

      <ClosingCta ctaKey="careers" question={careers.title} lede={careers.ctaLede} />
    </>
  )
}
