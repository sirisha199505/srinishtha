import { useSite } from '../content/SiteProvider'
import { industryName } from '../content/selectors'
import { usePageMeta } from '../hooks/usePageMeta'
import { CaseStudyCard, CaseStudyGrid } from '../components/blocks/CaseStudyCard'
import { PageHeader } from '../components/blocks/PageHeader'
import { ProjectArchive } from '../components/blocks/ProjectArchive'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Section, SectionHeading } from '../components/ui/Layout'

export default function Work() {
  const site = useSite()
  const meta = usePageMeta('work')
  const labels = site.labels.work
  const industryOf = (slug) => industryName(site, slug)
  const flagship = site.caseStudies.filter((s) => s.flagship)
  const others = site.caseStudies.filter((s) => !s.flagship)

  return (
    <>
      <PageHeader {...meta} crumbs={[{ label: 'Our Work' }]} />
      <Section>
        <h2 className="sr-only">{labels.flagship}</h2>
        <div className="space-y-8 sm:space-y-10">
          {flagship.map((s, i) => (
            <CaseStudyCard key={s.slug} study={s} industry={industryOf(s.industry)} feature index={i} />
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <SectionHeading eyebrow="Case studies" title={labels.more} />
        <CaseStudyGrid studies={others} industryOf={industryOf} />
      </Section>
      <Section id="archive">
        <SectionHeading eyebrow="Archive" title={labels.archive} lede={labels.archiveLede} />
        <ProjectArchive projects={site.projects} />
      </Section>
      <ClosingCta ctaKey="caseStudy" />
    </>
  )
}
