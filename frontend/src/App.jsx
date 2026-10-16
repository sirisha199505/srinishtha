import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteProvider } from './content/SiteProvider'
import { AppShell } from './components/layout/AppShell'
import Home from './pages/Home'

const Capabilities = lazy(() => import('./pages/Capabilities'))
const CapabilityDetail = lazy(() => import('./pages/CapabilityDetail'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'))
const Industries = lazy(() => import('./pages/Industries'))
const Work = lazy(() => import('./pages/Work'))
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'))
const Products = lazy(() => import('./pages/Products'))
const About = lazy(() => import('./pages/About'))
const Leadership = lazy(() => import('./pages/Leadership'))
const HowWeWork = lazy(() => import('./pages/HowWeWork'))
const Security = lazy(() => import('./pages/Security'))
const Careers = lazy(() => import('./pages/Careers'))
const Life = lazy(() => import('./pages/Life'))
const Insights = lazy(() => import('./pages/Insights'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const AdminShell = lazy(() => import('./admin/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const Enquiries = lazy(() => import('./admin/Enquiries'))
const AdminProjects = lazy(() => import('./admin/Projects'))
const AdminCaseStudies = lazy(() => import('./admin/CaseStudies'))

// Old srinishtha.com URLs → new information architecture.
const REDIRECTS = {
  '/services': '/capabilities',
  '/about-us': '/about',
  '/contact-us': '/contact',
  '/resources/case-studies': '/work',
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<AdminShell />}>
              <Route index element={<Enquiries />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="case-studies" element={<AdminCaseStudies />} />
            </Route>
            <Route element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="capabilities" element={<Capabilities />} />
              <Route path="capabilities/:slug" element={<CapabilityDetail />} />
              <Route path="solutions" element={<Solutions />} />
              <Route path="solutions/:slug" element={<SolutionDetail />} />
              <Route path="industries" element={<Industries />} />
              <Route path="work" element={<Work />} />
              <Route path="work/:slug" element={<CaseStudyDetail />} />
              <Route path="products" element={<Products />} />
              <Route path="about" element={<About />} />
              <Route path="leadership" element={<Leadership />} />
              <Route path="how-we-work" element={<HowWeWork />} />
              <Route path="security" element={<Security />} />
              <Route path="careers" element={<Careers />} />
              <Route path="life" element={<Life />} />
              <Route path="insights" element={<Insights />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              {Object.entries(REDIRECTS).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </SiteProvider>
    </BrowserRouter>
  )
}
