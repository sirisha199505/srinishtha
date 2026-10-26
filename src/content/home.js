// Home page copy. Kept in the frontend so the page needs no database changes.
// Facts and evidence are taken from the site content (seed): no new claims are introduced here.

export const HERO = {
  eyebrow: 'Srinishtha Technologies',
  // One entry per line; the line equal to `highlight` is set in champagne gold.
  headline: ['Technology That', 'Moves Business', 'Forward.'],
  highlight: 'Moves Business',
  lede: 'We design and build intelligent digital solutions that help businesses modernize operations, create better customer experiences, and scale with confidence.',
  primary: { label: 'Explore Our Capabilities', to: '/capabilities' },
  secondary: { label: 'Talk to Our Experts', to: '/contact' },
  // What travels along the globe's connections (wide screens). x/y are in globe radii from its centre.
  labels: [
    { icon: 'code', label: 'Software systems', x: -0.5, y: -0.5 },
    { icon: 'cloud', label: 'Cloud infrastructure', x: 0.05, y: -0.82 },
    { icon: 'database', label: 'Data & AI', x: 0.6, y: -0.96 },
    { icon: 'building', label: 'Business operations', x: 0.78, y: -0.3, align: 'right' },
    { icon: 'network', label: 'Connected industries', x: 0.5, y: 0.5 },
  ],
}

export const TRUST = {
  label: 'Trusted by',
}

export const WORK = {
  eyebrow: 'Our work',
  title: 'Platforms we built, live in production.',
  highlight: 'live in production.',
  link: { label: 'View all work', to: '/work' },
  lead: 'sids-farm',
  testimonial: 'sids-farm',
  // Delivered platforms shown under the lead case study (clients from the project archive).
  projects: ['Comfort Cool Systems', 'Crave Better Foods', 'Tenju Tofu', 'Grameena Vidhya Jyothi Bharath', 'Vardhaman Bank', 'Soham Academy'],
}

export const SERVICES_INTRO = {
  eyebrow: 'What we do',
  title: 'End-to-end technology solutions.',
  link: { label: 'Explore all services', to: '/capabilities' },
}

export const INDUSTRIES = {
  eyebrow: 'Industries',
  title: 'Sectors we serve.',
  link: { label: 'All industries', to: '/industries' },
}

export const WHY = {
  eyebrow: 'Why Srinishtha',
  title: 'A partner that stays accountable.',
  items: [
    { title: 'Business-first', text: 'We start with your process, not the code.' },
    { title: 'Transparent', text: 'Honest estimates, regular demos, no surprises.' },
    { title: 'Quality-focused', text: 'Code review, automated tests and release gates.' },
    { title: 'Long-term', text: 'Support and a roadmap long after launch.' },
  ],
}

export const APPROACH = {
  eyebrow: 'Our approach',
  title: 'From idea to impact.',
  highlight: 'impact.',
  steps: [
    { title: 'Discover', text: 'Understand the process and goals.' },
    { title: 'Strategize', text: 'Plan the architecture and releases.' },
    { title: 'Build', text: 'Short iterations, regular demos.' },
    { title: 'Launch', text: 'Tested, monitored rollout.' },
    { title: 'Improve', text: 'Support and continuous upgrades.' },
  ],
}

export const FINAL_CTA = {
  title: "Let's Build What Comes Next.",
  highlight: 'What Comes Next.',
  lede: "Tell us about your business challenge, and let's explore the right technology solution.",
  cta: { primary: { label: 'Start a Conversation', to: '/contact' } },
}

// Real project imagery for each industry (used on the Industries page).
export const INDUSTRY_IMAGES = {
  'agriculture-dairy': { src: '/images/sidsfarm_site.webp', caption: "Sid's Farm" },
  'retail-commerce': { src: '/images/crave_better_site.webp', caption: 'Crave Better Foods' },
  education: { src: '/images/gvjb_ss.webp', caption: 'Grameena Vidhya Jyothi Bharath' },
  distribution: { src: '/images/comfort_cool_login.webp', caption: 'Comfort Cool Systems' },
  'professional-services': { src: '/images/dr_laxmi_nadh_ss.webp', caption: 'Dr. Laxminadh Sivaraju' },
  institutions: { src: '/images/sri_rama_navami_ss.webp', caption: 'Sri Ramanavami' },
  'financial-services': { src: '/images/vardhaman_bank_ss.webp', caption: 'Vardhaman Bank' },
}
