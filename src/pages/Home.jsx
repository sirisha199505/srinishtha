import { useSite } from '../content/SiteProvider'
import { bySlug, industryName, splitByStatus, testimonialFor } from '../content/selectors'
import { APPROACH, FINAL_CTA, HERO, INDUSTRIES, POSITIONING, SERVICES_INTRO, TRUST, WHY, WORK } from '../content/home'
import { SERVICES } from '../content/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { CtaPanel } from '../components/blocks/CtaPanel'
import { HomeHero } from '../components/blocks/HomeHero'
import { IndustryIndex } from '../components/blocks/IndustryIndex'
import { LogoWall } from '../components/blocks/LogoWall'
import { PositioningBand } from '../components/blocks/PositioningBand'
import { ProjectShowcase } from '../components/blocks/ProjectShowcase'
import { ServiceIndex } from '../components/blocks/ServiceIndex'
import { StepFlow } from '../components/blocks/StepFlow'
import { WhyList } from '../components/blocks/WhyList'
import { MoreLink } from '../components/ui/Button'
import { cx } from '../lib/cx'
import { Container, SECTION_Y, Section, SectionHeading } from '../components/ui/Layout'

// Each fact appears once: company figures in the hero, clients in the logo strip, positioning
// in the band under it, projects (with the client quote) in Our work.
export default function Home() {
  const site = useSite()
  usePageMeta('home')
  const lead = bySlug(site.caseStudies, WORK.lead)
  // Featured clients first, then every other live platform with a screenshot, then those in development.
  const featured = WORK.projects.map((name) => site.projects.find((p) => p.client === name)).filter((p) => p?.screenshot)
  const projects = [...featured, ...splitByStatus(site.projects.filter((p) => p.screenshot && !featured.includes(p))).flat()]

  return (
    <>
      {/* 1 · Hero */}
      <HomeHero hero={HERO} stats={site.stats} />

      {/* 2 · Clients */}
      <section id="clients" aria-labelledby="clients-title" className={cx('border-b border-line bg-white', SECTION_Y)}>
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <h2 id="clients-title" className="text-center text-xs font-semibold tracking-[0.16em] text-muted uppercase lg:col-span-2 lg:text-left">{TRUST.label}</h2>
          <LogoWall clients={site.clients} marquee className="lg:col-span-10" />
        </Container>
      </section>

      {/* 3 · Who we are: the positioning statement */}
      <PositioningBand {...POSITIONING} />

      {/* 4 · Our work (clipped sideways: the carousel's outer cards extend past the edges) */}
      <Section className="overflow-x-clip">
        <SectionHeading {...WORK} action={<MoreLink link={WORK.link} />} />
        <ProjectShowcase lead={lead} industry={industryName(site, lead?.industry)} testimonial={testimonialFor(site, WORK.testimonial)} projects={projects} />
      </Section>

      {/* 5 · What we do */}
      <Section tone="paper">
        <SectionHeading {...SERVICES_INTRO} action={<MoreLink link={SERVICES_INTRO.link} />} />
        <ServiceIndex services={SERVICES} compact />
      </Section>

      {/* 6 · Industries */}
      <Section>
        <SectionHeading {...INDUSTRIES} action={<MoreLink link={INDUSTRIES.link} />} />
        <IndustryIndex industries={site.industries} />
      </Section>

      {/* 7 · Why Srinishtha */}
      <Section tone="paper">
        <SectionHeading {...WHY} />
        <WhyList items={WHY.items} />
      </Section>

      {/* 8 · Our approach */}
      <Section>
        <SectionHeading {...APPROACH} />
        <StepFlow steps={APPROACH.steps} />
      </Section>

      {/* 9 · Final CTA */}
      <CtaPanel question={FINAL_CTA.title} highlight={FINAL_CTA.highlight} lede={FINAL_CTA.lede} cta={FINAL_CTA.cta}>
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-dark">
          <a href={`mailto:${site.company.email}`} className="hover:text-gold">{site.company.email}</a>
          <a href={site.company.phoneHref} className="hover:text-gold">{site.company.phone}</a>
        </p>
      </CtaPanel>
    </>
  )
}
