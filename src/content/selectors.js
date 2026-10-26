// Pure lookups over the site payload, so pages never re-implement joins.
export const bySlug = (list, slug) => list.find((item) => item.slug === slug)
export const pickSlugs = (list, slugs = []) => slugs.map((slug) => bySlug(list, slug)).filter(Boolean)

export const capabilityPath = (slug) => `/capabilities/${slug}`
export const caseStudyPath = (slug) => `/work/${slug}`
export const solutionPath = (slug) => `/solutions/${slug}`

export const pillars = (site) => site.capabilities.filter((c) => c.pillar)
export const flagships = (site) => site.caseStudies.filter((c) => c.flagship)
export const testimonialFor = (site, key) => site.testimonials.find((t) => t.key === key)
export const industryName = (site, slug) => bySlug(site.industries, slug)?.name
export const ctaFor = (site, key) => site.ctas[key] || site.ctas.global

// Projects split for display: live (no status) first, then those still being built (any status, e.g. 'In development').
export const splitByStatus = (projects) => [projects.filter((p) => !p.status), projects.filter((p) => p.status)]
