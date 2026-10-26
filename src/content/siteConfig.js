// Site chrome that lives in the frontend: header navigation, footer links and social profiles.
// Page copy for inner pages still comes from GET /api/site.

// `menu` names a dropdown built in SiteHeader (buildMenus) from content + these lists.
// `short` is the label used in the phone tab bar.
export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/capabilities', menu: 'services', match: ['/capabilities', '/solutions'] },
  { label: 'Industries', to: '/industries' },
  { label: 'Our Work', to: '/work', menu: 'work', match: ['/work', '/products'] },
  { label: 'About Us', short: 'About', to: '/about', menu: 'about', match: ['/about', '/leadership', '/how-we-work', '/security', '/careers', '/life'] },
  { label: 'Contact', to: '/contact' },
]

export const HEADER_CTA = { label: "Let's Talk", to: '/contact' }

export const WORK_MENU = [
  { label: 'Case studies', text: 'Platforms we have engineered, from challenge to outcome.', to: '/work' },
  { label: 'Project archive', text: 'Websites, apps and portfolios delivered across sectors.', to: '/work#archive' },
  { label: 'Srinishtha Projects', text: 'Our own products, built on the same framework.', to: '/products' },
]

export const ABOUT_MENU = [
  { label: 'Our company', text: 'Our story, clients and the experience behind us.', to: '/about' },
  { label: 'Leadership & team', text: 'The people accountable for your project.', to: '/leadership' },
  { label: 'How we work', text: 'Our delivery model and operating principles.', to: '/how-we-work' },
  { label: 'Security & engineering', text: 'How we protect, test and run what we build.', to: '/security' },
  { label: 'Careers', text: 'Join our engineering team in Hyderabad.', to: '/careers' },
  { label: 'Life at Srinishtha', text: 'The office, the celebrations and the people.', to: '/life' },
]

export const FOOTER = {
  description: 'Srinishtha Technologies is a premium India-based product engineering studio, delivering senior-led, flexible custom software for SMEs, institutions and founders.',
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Leadership', to: '/leadership' },
    { label: 'How We Work', to: '/how-we-work' },
    { label: 'Our Work', to: '/work' },
    { label: 'Srinishtha Projects', to: '/products' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ],
}

// Add profile URLs here, e.g. { network: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/…' }.
// The footer hides this row while the list is empty.
export const SOCIAL = []
