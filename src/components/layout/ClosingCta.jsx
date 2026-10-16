import { useSite } from '../../content/SiteProvider'
import { ctaFor } from '../../content/selectors'
import { CtaPanel } from '../blocks/CtaPanel'

// Page-level container: picks the contextual CTA pair (blueprint CTA system) for a page.
export function ClosingCta({ ctaKey = 'global', question, lede }) {
  const site = useSite()
  return <CtaPanel question={question || site.ctas.final.question} lede={lede || site.ctas.final.lede} cta={ctaFor(site, ctaKey)} />
}
