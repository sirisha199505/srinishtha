import { useSite } from '../content/SiteProvider'
import { caseStudyPath, pickSlugs } from '../content/selectors'
import { INDUSTRY_IMAGES } from '../content/home'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProblemRows } from '../components/blocks/ProblemRows'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section } from '../components/ui/Layout'

export default function Industries() {
  const site = useSite()
  const meta = usePageMeta('industries')
  const rows = site.industries.map((i) => ({
    key: i.slug,
    title: i.name,
    text: i.problem,
    list: i.solutions,
    image: INDUSTRY_IMAGES[i.slug],
    links: pickSlugs(site.caseStudies, i.caseStudies).map((s) => ({ label: `${site.labels.industries.caseStudies}: ${s.client}`, to: caseStudyPath(s.slug) })),
  }))

  return (
    <>
      <PageHeader {...meta} crumbs={[{ label: 'Industries' }]} />
      <Section>
        <ProblemRows rows={rows} />
      </Section>
      <ClosingCta />
    </>
  )
}
