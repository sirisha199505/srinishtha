import { useParams } from 'react-router-dom'
import { useSite } from '../content/SiteProvider'
import { bySlug, ctaFor, industryName, pickSlugs } from '../content/selectors'
import { usePageMeta } from '../hooks/usePageMeta'
import { BeforeAfter } from '../components/blocks/BeforeAfter'
import { CaseStudyGrid } from '../components/blocks/CaseStudyCard'
import { FeatureGrid } from '../components/blocks/FeatureGrid'
import { PageHeader } from '../components/blocks/PageHeader'
import { StepFlow } from '../components/blocks/StepFlow'
import { ClosingCta } from '../components/layout/ClosingCta'
import { CtaPair, MoreLink } from '../components/ui/Button'
import { Section, SectionHeading, Tag } from '../components/ui/Layout'
import NotFound from './NotFound'

// Landing page per solution, following the blueprint's landing-page formula.
function SolutionPage({ solution }) {
  const site = useSite()
  const l = site.labels.solution
  usePageMeta('solutions', { title: solution.title, description: solution.lede })

  const capability = bySlug(site.capabilities, solution.capability)
  const layers = solution.modules.map((key) => site.framework.layers.find((layer) => layer.key === key)).filter(Boolean)
  const studies = pickSlugs(site.caseStudies, solution.caseStudies)

  return (
    <>
      <PageHeader
        eyebrow={capability ? `${l.eyebrow} · ${capability.title}` : l.eyebrow}
        heading={solution.headline}
        lede={solution.lede}
        crumbs={[{ label: l.all, to: '/solutions' }, { label: solution.title }]}
      >
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-3 text-sm font-medium text-ink">{l.problems}</p>
            <ul className="flex flex-wrap gap-2">
              {solution.problems.map((p) => (
                <li key={p}><Tag>{p}</Tag></li>
              ))}
            </ul>
          </div>
          <CtaPair cta={ctaFor(site, solution.cta)} />
        </div>
      </PageHeader>

      <Section>
        <SectionHeading eyebrow={solution.title} title={l.compare} />
        <BeforeAfter before={solution.before} after={solution.after} labels={l} />
      </Section>

      <Section tone="dark">
        <SectionHeading eyebrow={site.framework.title} title={l.modules} lede={l.modulesLede} inverse />
        <FeatureGrid items={layers.map((layer) => ({ title: layer.name, text: `${layer.value}. ${layer.modules.join(', ')}.` }))} inverse />
      </Section>

      {studies.length > 0 && (
        <Section>
          <SectionHeading title={l.work} />
          <CaseStudyGrid studies={studies} industryOf={(slug) => industryName(site, slug)} />
        </Section>
      )}

      <Section tone="paper">
        <SectionHeading
          title={l.phases}
          lede={`${l.security}: ${l.securityText}`}
          action={<MoreLink link={l.securityLink} />}
        />
        <StepFlow steps={l.steps} />
      </Section>

      <ClosingCta ctaKey={solution.cta} question={solution.headline} />
    </>
  )
}

export default function SolutionDetail() {
  const { slug } = useParams()
  const solution = bySlug(useSite().solutions, slug)
  return solution ? <SolutionPage solution={solution} /> : <NotFound />
}
