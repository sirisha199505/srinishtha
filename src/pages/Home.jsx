import { useSite } from '../content/SiteProvider'
import { bySlug, industryName, testimonialFor } from '../content/selectors'
import { APPROACH, FINAL_CTA, HERO, INDUSTRIES, SERVICES_INTRO, TRUST, WHY, WORK } from '../content/home'
import { SERVICES } from '../content/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { CtaPanel } from '../components/blocks/CtaPanel'
import { HomeHero } from '../components/blocks/HomeHero'
import { IndustryIndex } from '../components/blocks/IndustryIndex'
import { LogoWall } from '../components/blocks/LogoWall'
import { ProjectShowcase } from '../components/blocks/ProjectShowcase'
import { ServiceIndex } from '../components/blocks/ServiceIndex'
import { StepFlow } from '../components/blocks/StepFlow'
import { WhyList } from '../components/blocks/WhyList'
import { MoreLink } from '../components/ui/Button'
import { Container, Section, SectionHeading } from '../components/ui/Layout'

// Each fact appears once: company figures in the hero, clients in the logo strip,
// projects (with the client quote) in Our work.
export default function Home() {
  const site = useSite()
  usePageMeta('home')
  const lead = bySlug(site.caseStudies, WORK.lead)
  const projects = WORK.projects.map((name) => site.projects.find((p) => p.client === name)).filter((p) => p?.screenshot)

  return (
    <>
      {/* 1 · Hero */}
      <HomeHero hero={HERO} stats={site.stats} nextId="clients" />

      {/* 2 · Clients */}
      <section id="clients" aria-labelledby="clients-title" className="border-b border-line bg-white py-12 sm:py-14">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <h2 id="clients-title" className="text-center text-xs font-semibold tracking-[0.16em] text-muted uppercase lg:col-span-2 lg:text-left">{TRUST.label}</h2>
          <LogoWall clients={site.clients} marquee className="lg:col-span-10" />
        </Container>
      </section>

      {/* 3 · Our work */}
      <Section>
        <SectionHeading {...WORK} action={<MoreLink link={WORK.link} />} />
        <ProjectShowcase lead={lead} industry={industryName(site, lead?.industry)} testimonial={testimonialFor(site, WORK.testimonial)} projects={projects} />
      </Section>

      {/* 4 · What we do */}
      <Section tone="paper">
        <SectionHeading {...SERVICES_INTRO} action={<MoreLink link={SERVICES_INTRO.link} />} />
        <ServiceIndex services={SERVICES} compact />
      </Section>

      {/* 5 · Industries */}
      <Section>
        <SectionHeading {...INDUSTRIES} action={<MoreLink link={INDUSTRIES.link} />} />
        <IndustryIndex industries={site.industries} />
      </Section>

      {/* 6 · Why Srinishtha */}
      <Section tone="paper">
        <SectionHeading {...WHY} />
        <WhyList items={WHY.items} />
      </Section>

      {/* 7 · Our approach */}
      <Section>
        <SectionHeading {...APPROACH} />
        <StepFlow steps={APPROACH.steps} />
      </Section>

      {/* 8 · Final CTA */}
      <CtaPanel question={FINAL_CTA.title} highlight={FINAL_CTA.highlight} lede={FINAL_CTA.lede} cta={FINAL_CTA.cta}>
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-dark">
          <a href={`mailto:${site.company.email}`} className="hover:text-gold">{site.company.email}</a>
          <a href={site.company.phoneHref} className="hover:text-gold">{site.company.phone}</a>
        </p>
      </CtaPanel>
    </>
  )
}
