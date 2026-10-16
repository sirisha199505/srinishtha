import { Fragment, useEffect, useState } from 'react'
import { useSite } from '../content/SiteProvider'
import { adminApi } from '../lib/api'
import { cx } from '../lib/cx'
import { AdminPageTitle } from './AdminLayout'

const STATUSES = ['new', 'contacted', 'qualified', 'closed']
const STATUS_TONE = {
  new: 'bg-brand-orange/15 text-[#b85a0a]',
  contacted: 'bg-brand-cyan/15 text-[#16808e]',
  qualified: 'bg-brand-purple/15 text-accent',
  closed: 'bg-line text-muted',
}

const formatDate = (iso) =>
  new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function Enquiries() {
  const { contactForm } = useSite()
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState({ rows: [], pages: 0, loading: true, error: '' })
  const [open, setOpen] = useState(null)

  // Show option labels ("Workflow automation") instead of stored values ("automation").
  const labelOf = (field, value) => contactForm.options[field]?.find((o) => o.value === value)?.label || value || '—'

  useEffect(() => {
    let alive = true
    setData((d) => ({ ...d, loading: true }))
    adminApi
      .leads({ page, status: filter })
      .then((res) => alive && setData({ rows: res.data, pages: res.total_pages, loading: false, error: '' }))
      .catch((e) => alive && setData({ rows: [], pages: 0, loading: false, error: e.message }))
    return () => {
      alive = false
    }
  }, [page, filter])

  const changeStatus = async (lead, status) => {
    setData((d) => ({ ...d, rows: d.rows.map((r) => (r.id === lead.id ? { ...r, status } : r)) }))
    try {
      await adminApi.updateLead(lead.id, { status })
    } catch {
      setData((d) => ({ ...d, rows: d.rows.map((r) => (r.id === lead.id ? lead : r)) }))
    }
  }

  return (
    <>
      <AdminPageTitle
        title="Enquiries"
        lede="Every message sent through the contact form. Click a row to read it."
        action={
          <div className="flex flex-wrap gap-2">
            {['', ...STATUSES].map((s) => (
              <button
                key={s || 'all'}
                onClick={() => {
                  setFilter(s)
                  setPage(1)
                }}
                className={cx('rounded-full border px-3 py-1 text-sm capitalize', filter === s ? 'border-accent bg-accent text-white' : 'border-line bg-white text-body')}
              >
                {s || 'All'}
              </button>
            ))}
          </div>
        }
      />

      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs text-muted">
            <tr>
              {['Received', 'Name', 'Email', 'Company', 'Interest', 'Stage', 'Timeline', 'Status'].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.rows.map((lead) => (
              <Fragment key={lead.id}>
                <tr onClick={() => setOpen(open === lead.id ? null : lead.id)} className="cursor-pointer hover:bg-paper/60">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(lead.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-ink">
                    {lead.name}
                    {lead.role && <span className="block text-xs font-normal text-muted">{lead.role}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()} className="text-accent hover:underline">{lead.email}</a>
                  </td>
                  <td className="px-4 py-3">{lead.company || '—'}</td>
                  <td className="px-4 py-3">{labelOf('interest', lead.interest)}</td>
                  <td className="px-4 py-3">{labelOf('stage', lead.stage)}</td>
                  <td className="px-4 py-3">{labelOf('timeline', lead.timeline)}</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      aria-label={`Status for ${lead.name}`}
                      value={lead.status}
                      onChange={(e) => changeStatus(lead, e.target.value)}
                      className={cx('rounded-full border-0 px-2.5 py-1 text-xs font-medium capitalize', STATUS_TONE[lead.status])}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
                {open === lead.id && (
                  <tr className="bg-paper/60">
                    <td colSpan={8} className="px-4 py-5">
                      <p className="text-xs font-medium text-muted">What they are trying to achieve</p>
                      <p className="mt-1 max-w-3xl whitespace-pre-line leading-relaxed text-ink">{lead.goal}</p>
                      <p className="mt-4 text-xs text-muted">
                        Sent from {lead.source_page || '—'}
                        {Object.keys(lead.attribution || {}).length > 0 && ` · ${Object.entries(lead.attribution).map(([k, v]) => `${k}: ${v}`).join(' · ')}`}
                      </p>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {!data.loading && data.rows.length === 0 && (
          <p className="px-4 py-12 text-center text-sm text-muted">{data.error || 'No enquiries yet.'}</p>
        )}
      </div>

      {data.pages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-3 text-sm">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border border-line bg-white px-3 py-1.5 disabled:opacity-40">Previous</button>
          <span className="text-muted">Page {page} of {data.pages}</span>
          <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)} className="rounded border border-line bg-white px-3 py-1.5 disabled:opacity-40">Next</button>
        </div>
      )}
    </>
  )
}
