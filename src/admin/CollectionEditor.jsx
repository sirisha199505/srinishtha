import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { SelectField, TextAreaField, TextField } from '../components/ui/Fields'
import { adminApi } from '../lib/api'
import { cx } from '../lib/cx'
import { AdminPageTitle } from './AdminLayout'

// --- nested values: schema fields may use paths like "metric.value" -------
const getPath = (obj, path) => path.split('.').reduce((v, k) => (v == null ? v : v[k]), obj)
const setPath = (obj, path, value) => {
  const [head, ...rest] = path.split('.')
  if (!rest.length) return { ...obj, [head]: value }
  return { ...obj, [head]: setPath(obj?.[head] || {}, rest.join('.'), value) }
}
const isBlank = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0)

// Drops empty optional values so the saved JSON stays tidy.
function clean(item) {
  return Object.fromEntries(
    Object.entries(item)
      .map(([k, v]) => [k, Array.isArray(v) ? v.map((x) => (typeof x === 'string' ? x.trim() : x)).filter((x) => x !== '') : v && typeof v === 'object' ? clean(v) : typeof v === 'string' ? v.trim() : v])
      .filter(([, v]) => !isBlank(v) && !(typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0)),
  )
}

function ImageField({ label, value, onChange, hint, error }) {
  const [busy, setBusy] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const upload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setUploadError('')
    try {
      const { url } = await adminApi.upload(file)
      onChange(url)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">{label}</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex aspect-[2/1] w-full max-w-[220px] items-center justify-center overflow-hidden rounded-md border border-line bg-paper">
          {value ? <img src={value} alt="" className="size-full object-cover object-top" /> : <span className="text-xs text-muted">No image</span>}
        </div>
        <div className="flex-1 space-y-2">
          <label className="inline-flex cursor-pointer items-center rounded-md border border-accent/30 px-3 py-2 text-sm font-medium text-accent hover:bg-accent-soft">
            {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={upload} className="sr-only" disabled={busy} />
          </label>
          <p className="text-xs text-muted">{hint || 'Website screenshot works best at a 2:1 shape (e.g. 1600×800). PNG, JPG or WebP, up to 5 MB.'}</p>
          {(uploadError || error) && <p className="text-sm text-danger">{uploadError || error}</p>}
        </div>
      </div>
    </div>
  )
}

function CheckboxGroup({ label, options, value = [], onChange }) {
  const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className={cx('cursor-pointer rounded-full border px-3 py-1.5 text-sm', value.includes(o.value) ? 'border-accent bg-accent-soft text-accent' : 'border-line bg-white text-body')}>
            <input type="checkbox" className="sr-only" checked={value.includes(o.value)} onChange={() => toggle(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

// Renders one schema field. Types: text, url, textarea, lines, select, multiselect, checkbox, image.
function SchemaField({ field, value, onChange, error }) {
  const common = { label: field.label, hint: field.hint, error, optional: !field.required }
  switch (field.type) {
    case 'textarea':
      return <TextAreaField {...common} value={value || ''} onChange={(e) => onChange(e.target.value)} />
    case 'lines':
      return (
        <TextAreaField
          {...common}
          hint={field.hint || 'One item per line.'}
          value={(value || []).join('\n')}
          onChange={(e) => onChange(e.target.value.split('\n').map((l) => l.trimStart()).filter((l, i, all) => l || i < all.length - 1))}
        />
      )
    case 'select':
      return <SelectField {...common} options={field.options} placeholder="None" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    case 'multiselect':
      return <CheckboxGroup label={field.label} options={field.options} value={value} onChange={onChange} />
    case 'checkbox':
      return (
        <label className="flex items-center gap-3 text-sm text-ink">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-accent" />
          {field.label}
          {field.hint && <span className="text-muted">({field.hint})</span>}
        </label>
      )
    case 'image':
      return <ImageField label={field.label} hint={field.hint} value={value} onChange={onChange} error={error} />
    default:
      return <TextField {...common} type={field.type === 'url' ? 'url' : 'text'} placeholder={field.placeholder} value={value || ''} onChange={(e) => onChange(e.target.value)} />
  }
}

function ItemForm({ schema, initial, onCancel, onSave, validate }) {
  const [item, setItem] = useState(initial)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const found = {}
    schema.forEach((f) => {
      if (f.required && isBlank(getPath(item, f.name))) found[f.name] = `${f.label} is required.`
    })
    Object.assign(found, validate?.(item) || {})
    setErrors(found)
    if (Object.keys(found).length) return
    setSaving(true)
    const ok = await onSave(clean(item))
    if (!ok) setSaving(false)
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-line bg-white p-5 sm:p-8">
      <div className="grid gap-5 lg:grid-cols-2">
        {schema.map((f) => (
          <div key={f.name} className={f.wide || ['textarea', 'lines', 'image', 'multiselect'].includes(f.type) ? 'lg:col-span-2' : ''}>
            <SchemaField field={f} value={getPath(item, f.name)} error={errors[f.name]} onChange={(v) => setItem((it) => setPath(it, f.name, v))} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={saving} className="disabled:opacity-60">{saving ? 'Saving…' : 'Save and publish'}</Button>
      </div>
    </form>
  )
}

// Generic list editor for an array-valued content block (projects, caseStudies).
export function CollectionEditor({ blockKey, title, lede, itemName, schema, newItem, describe, validate, prepare }) {
  const [block, setBlock] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // { index } — index -1 means a new item
  const [notice, setNotice] = useState('')

  const load = () =>
    adminApi
      .blocks()
      .then((blocks) => setBlock(blocks.find((b) => b.key === blockKey)))
      .catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [blockKey])

  const items = block?.payload || []

  const persist = async (next, message) => {
    try {
      const saved = await adminApi.updateBlock(block.id, { payload: next })
      setBlock(saved)
      setNotice(message)
      setError('')
      return true
    } catch (e) {
      setError(e.errors ? Object.values(e.errors).flat().join(' ') : e.message)
      return false
    }
  }

  const save = async (item) => {
    const prepared = prepare ? prepare(item, items, editing.index) : item
    const next = editing.index === -1 ? [prepared, ...items] : items.map((it, i) => (i === editing.index ? prepared : it))
    const ok = await persist(next, `${describe(prepared).title} saved. It is live on the website within a minute.`)
    if (ok) setEditing(null)
    return ok
  }

  const remove = (index) => {
    const name = describe(items[index]).title
    if (!window.confirm(`Delete "${name}" from the website?`)) return
    persist(items.filter((_, i) => i !== index), `${name} deleted.`)
  }

  const move = (index, step) => {
    const next = [...items]
    const [it] = next.splice(index, 1)
    next.splice(index + step, 0, it)
    persist(next, 'Order updated.')
  }

  if (editing) {
    return (
      <>
        <AdminPageTitle title={editing.index === -1 ? `Add ${itemName}` : `Edit ${describe(items[editing.index]).title}`} />
        {error && <p role="alert" className="mb-4 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{error}</p>}
        <ItemForm
          schema={schema}
          initial={editing.index === -1 ? newItem : items[editing.index]}
          validate={(item) => validate?.(item, items, editing.index)}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      </>
    )
  }

  return (
    <>
      <AdminPageTitle title={title} lede={lede} action={<Button onClick={() => { setNotice(''); setEditing({ index: -1 }) }} arrow>Add {itemName}</Button>} />
      {notice && <p role="status" className="mb-4 rounded-md border border-success/30 bg-success/5 px-4 py-3 text-sm text-success">{notice}</p>}
      {error && <p role="alert" className="mb-4 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{error}</p>}
      <ul className="divide-y divide-line rounded-lg border border-line bg-white">
        {items.map((item, i) => {
          const d = describe(item)
          return (
            <li key={`${d.title}-${i}`} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="aspect-[2/1] w-full shrink-0 overflow-hidden rounded border border-line bg-paper sm:w-32">
                {d.image && <img src={d.image} alt="" className="size-full object-cover object-top" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{d.title}</p>
                <p className="truncate text-sm text-muted">{d.subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <button aria-label={`Move ${d.title} up`} disabled={i === 0} onClick={() => move(i, -1)} className="rounded border border-line px-2 py-1 disabled:opacity-30">↑</button>
                <button aria-label={`Move ${d.title} down`} disabled={i === items.length - 1} onClick={() => move(i, 1)} className="rounded border border-line px-2 py-1 disabled:opacity-30">↓</button>
                <button onClick={() => { setNotice(''); setEditing({ index: i }) }} className="rounded border border-accent/30 px-3 py-1 font-medium text-accent hover:bg-accent-soft">Edit</button>
                <button onClick={() => remove(i)} className="rounded border border-danger/30 px-3 py-1 text-danger hover:bg-danger/5">Delete</button>
              </div>
            </li>
          )
        })}
        {block && items.length === 0 && <li className="p-10 text-center text-sm text-muted">Nothing here yet.</li>}
      </ul>
    </>
  )
}
