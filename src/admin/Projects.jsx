import { useSite } from '../content/SiteProvider'
import { CollectionEditor } from './CollectionEditor'

export default function Projects() {
  const { caseStudies } = useSite()
  const schema = [
    { name: 'client', label: 'Client / project name', required: true },
    { name: 'category', label: 'Category', required: true, placeholder: 'e.g. D2C Commerce' },
    { name: 'url', label: 'Live website link', type: 'url', placeholder: 'https://…' },
    { name: 'device', label: 'Screenshot type', type: 'select', options: [{ value: 'mobile', label: 'Mobile app (phone frame)' }], hint: 'Leave empty for a desktop website.' },
    { name: 'screenshot', label: 'Screenshot', type: 'image', required: true },
    { name: 'description', label: 'Short description', type: 'textarea', required: true, hint: 'One or two sentences shown under the screenshot.' },
    { name: 'caseStudy', label: 'Linked case study', type: 'select', options: caseStudies.map((c) => ({ value: c.slug, label: c.client })), hint: 'Optional: link to a detailed case study.' },
  ]
  return (
    <CollectionEditor
      blockKey="projects"
      title="Project archive"
      lede="Shown at the bottom of the Work page. The first items appear first."
      itemName="project"
      schema={schema}
      newItem={{}}
      describe={(p) => ({ title: p.client, subtitle: [p.category, p.url].filter(Boolean).join(' · '), image: p.screenshot })}
    />
  )
}
