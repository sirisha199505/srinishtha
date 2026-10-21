import { useSite } from '../content/SiteProvider'
import { flagships, industryName, pillars, testimonialFor } from '../content/selectors'
import { usePageMeta } from '../hooks/usePageMeta'
import { CapabilityList } from '../components/blocks/CapabilityList'
import { CaseStudyCard } from '../components/blocks/CaseStudyCard'
import { FeatureGrid } from '../components/blocks/FeatureGrid'
import { FrameworkExplorer } from '../components/blocks/FrameworkExplorer'
import { HomeHero } from '../components/blocks/HomeHero'
import { LogoWall } from '../components/blocks/LogoWall'
import { ProductRow } from '../components/blocks/ProductRow'
import { Quote } from '../components/blocks/Quote'
import { StepFlow } from '../components/blocks/StepFlow'
import { ClosingCta } from '../components/layout/ClosingCta'
import { MoreLink } from '../components/ui/Button'
import { Section, SectionHeading } from '../components/ui/Layout'

export default function Home() {
  const site = useSite()
  const { home } = site
  usePageMeta('home')
  const [lead, ...supporting] = flagships(site)
  const industryOf = (slug) => industryName(site, slug)

  return (
    <>
      <HomeHero hero={site.hero} cta={site.ctas.global} stats={site.stats} />

      <Section className="!py-8 sm:!py-10">
        <LogoWall
          clients={[...site.clients, ...site.products.items.filter((p) => p.logo).map((p) => ({ name: p.name, logo: p.logo }))]}
          label={home.trustLabel}
        />
      </Section>

      <Section tone="paper">
        <SectionHeading {...home.capabilities} action={<MoreLink link={home.capabilities.link} />} />
        <CapabilityList capabilities={pillars(site)} />
      </Section>

      <Section tone="dark">
        <SectionHeading {...site.framework} inverse />
        <FrameworkExplorer layers={site.framework.layers} disclaimer={site.framework.disclaimer} />
      </Section>

      <Section>
        <SectionHeading {...home.work} action={<MoreLink link={home.work.link} />} />
        <CaseStudyCard study={lead} industry={industryOf(lead.industry)} feature />
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {supporting.slice(0, 2).map((s) => (
            <CaseStudyCard key={s.slug} study={s} industry={industryOf(s.industry)} />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading {...home.products} action={<MoreLink link={home.products.link} />} />
        <ProductRow product={site.products.items[0]} storyLabel={site.labels.products.caseStudy} />
      </Section>

      <Section>
        <SectionHeading {...site.automationFlow} />
        <StepFlow steps={site.automationFlow.steps} />
      </Section>

      <Section>
        <SectionHeading {...site.appliedAi} action={<MoreLink link={home.ai.link} />} />
        <FeatureGrid items={site.appliedAi.items} />
      </Section>

      <Section tone="paper">
        <SectionHeading {...home.industries} action={<MoreLink link={home.industries.link} />} />
        <FeatureGrid items={site.industries.map((i) => ({ title: i.name, text: i.problem }))} />
      </Section>

      <Section tone="dark">
        <div className="max-w-4xl">
          <Quote testimonial={testimonialFor(site, 'sids-farm')} inverse />
        </div>
      </Section>

      <ClosingCta />
    </>
  )
}
