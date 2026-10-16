import { useEffect } from 'react'
import { useSite } from '../content/SiteProvider'

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(attr === 'href' ? 'link' : 'meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

// Sets title, description, canonical and Open Graph tags. `override` lets
// detail pages (case studies, capabilities) supply their own title/description.
export function usePageMeta(key, override) {
  const { pages, company } = useSite()
  const meta = { ...pages[key], ...override }
  const title = key === 'home' ? meta.title : `${meta.title} | ${company.name}`

  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'content', meta.description || '')
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', meta.description || '')
    setMeta('link[rel="canonical"]', 'href', `${window.location.origin}${window.location.pathname}`)
  }, [title, meta.description])

  return meta
}
