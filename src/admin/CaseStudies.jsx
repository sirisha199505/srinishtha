import { useSite } from '../content/SiteProvider'
import { CollectionEditor } from './CollectionEditor'

const slugify = (text = '') => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function CaseStudies() {
  const { industries, capabilities } = useSite()
  const schema = [
    { name: 'client', label: 'Client', required: true },
    { name: 'title', label: 'Headline', required: true, placeholder: 'e.g. A D2C storefront for a snack brand' },
    { name: 'slug', label: 'Page address', hint: 'Used in /work/<address>. Leave empty to create it from the client name.' },
    { name: 'status', label: 'Status', required: true, placeholder: 'e.g. Live' },
    { name: 'industry', label: 'Industry', type: 'select', required: true, options: industries.map((i) => ({ value: i.slug, label: i.name })) },
    { name: 'url', label: 'Live website link', type: 'url', placeholder: 'https://…' },
    { name: 'capabilities', label: 'Capabilities', type: 'multiselect', options: capabilities.map((c) => ({ value: c.slug, label: c.title })) },
    { name: 'flagship', label: 'Show in Selected work', type: 'checkbox', hint: 'home page and top of Work page' },
    { name: 'screenshot', label: 'Screenshot', type: 'image', required: true },
    { name: 'summary', label: 'Summary', type: 'textarea', required: true, hint: 'Client context, what we delivered and the headline result.' },
    { name: 'challenge', label: 'The challenge', type: 'textarea', required: true },
    { name: 'approach', label: 'What we delivered', type: 'lines', required: true, hint: 'One deliverable per line.' },
    { name: 'outcome', label: 'Outcome', type: 'textarea', required: true },
    { name: 'metric.value', label: 'Headline metric (optional)', placeholder: 'e.g. 3' },
    { name: 'metric.label', label: 'Metric label', placeholder: 'e.g. warehouses tracked in real time' },
  ]

  return (
    <CollectionEditor
      blockKey="caseStudies"
      title="Case studies"
      lede="Detailed project stories on the Work page. Tick “Show in Selected work” to feature one on the home page."
      itemName="case study"
      schema={schema}
      newItem={{ status: 'Live', capabilities: [] }}
      describe={(c) => ({ title: c.client, subtitle: [c.title, c.flagship && 'Selected work'].filter(Boolean).join(' · '), image: c.screenshot || c.image })}
      prepare={(item) => ({ ...item, slug: item.slug ? slugify(item.slug) : slugify(item.client) })}
      validate={(item, items, index) => {
        const slug = item.slug ? slugify(item.slug) : slugify(item.client)
        const clash = items.some((c, i) => i !== index && c.slug === slug)
        return clash ? { slug: `Another case study already uses /work/${slug}.` } : {}
      }}
    />
  )
}
