// Event taxonomy from the GTM blueprint (cta_click, contact_submit, case_study_view, ...).
// Events go to window.dataLayer so any tag manager can pick them up.
const ATTRIBUTION_KEY = 'srinishtha.attribution'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

export function track(event, props = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...props })
}

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(ATTRIBUTION_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const data = Object.fromEntries(UTM_KEYS.filter((k) => params.get(k)).map((k) => [k, params.get(k)]))
    if (document.referrer) data.referrer = document.referrer
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data))
  } catch {
    /* storage unavailable: attribution is best-effort */
  }
}

export function readAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY)) || {}
  } catch {
    return {}
  }
}
