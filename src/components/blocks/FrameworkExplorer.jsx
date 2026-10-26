import { useState } from 'react'
import { pad } from '../../lib/brand'
import { cx } from '../../lib/cx'
import { track } from '../../lib/track'
import { ChevronDown } from '../ui/Icons'

function LayerDetail({ layer }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] text-accent-bright uppercase">Business value</p>
      <p className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-white">{layer.value}</p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {layer.modules.map((m) => (
          <li key={m} className="rounded-sm border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/90">
            {m}
          </li>
        ))}
      </ul>
      <div className="mt-10 border-t border-line-dark pt-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-dark uppercase">In practice</p>
        <p className="mt-3 text-lg leading-relaxed text-white/85">{layer.useCase}</p>
      </div>
    </div>
  )
}

// Interactive layer diagram on desktop; a simple collapsible list on phones.
export function FrameworkExplorer({ layers, disclaimer }) {
  const [activeKey, setActiveKey] = useState(layers[0].key)
  const active = layers.find((l) => l.key === activeKey)

  const select = (key) => {
    setActiveKey(key)
    track('framework_interaction', { layer: key })
  }

  return (
    <div>
      <div className="hidden border border-line-dark lg:grid lg:grid-cols-12">
        <div role="tablist" aria-label="Framework layers" aria-orientation="vertical" className="col-span-5 divide-y divide-line-dark border-r border-line-dark">
          {layers.map((l, i) => {
            const selected = l.key === activeKey
            return (
              <button
                key={l.key}
                role="tab"
                id={`tab-${l.key}`}
                aria-selected={selected}
                aria-controls="framework-panel"
                onClick={() => select(l.key)}
                onKeyDown={(e) => {
                  const step = { ArrowDown: 1, ArrowUp: -1 }[e.key]
                  if (!step) return
                  e.preventDefault()
                  const next = layers[(i + step + layers.length) % layers.length]
                  select(next.key)
                  document.getElementById(`tab-${next.key}`)?.focus()
                }}
                tabIndex={selected ? 0 : -1}
                className={cx(
                  'relative flex w-full items-center gap-4 px-6 py-4 text-left transition-colors',
                  selected ? 'bg-navy-3 text-white' : 'text-muted-dark hover:bg-navy-3/50 hover:text-white',
                )}
              >
                <span aria-hidden="true" className={cx('absolute inset-y-0 left-0 w-0.5 bg-accent-bright transition-opacity', selected ? 'opacity-100' : 'opacity-0')} />
                <span className="w-6 text-xs tabular-nums opacity-60">{pad(i + 1)}</span>
                <span className="font-medium">{l.name}</span>
              </button>
            )
          })}
        </div>
        <div id="framework-panel" role="tabpanel" aria-labelledby={`tab-${activeKey}`} className="col-span-7 p-10">
          <h3 className="mb-8 text-sm font-medium text-muted-dark">{active.name}</h3>
          <div key={active.key} style={{ animation: 'reveal 400ms var(--ease-out-soft) both' }}>
            <LayerDetail layer={active} />
          </div>
        </div>
      </div>

      <ol className="divide-y divide-line-dark border-y border-line-dark lg:hidden">
        {layers.map((l, i) => (
          <li key={l.key}>
            <details className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
                <span className="w-6 text-xs text-accent-bright tabular-nums">{pad(i + 1)}</span>
                <span className="flex-1 font-semibold text-white">{l.name}</span>
                <ChevronDown className="size-5 text-muted-dark transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-5 pl-10">
                <p className="text-white/85">{l.value}</p>
                <p className="mt-2 text-sm text-muted-dark">{l.modules.join(' · ')}</p>
              </div>
            </details>
          </li>
        ))}
      </ol>

      {disclaimer && <p className="mt-8 text-sm text-muted-dark">{disclaimer}</p>}
    </div>
  )
}
