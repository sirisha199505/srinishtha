import { useState } from 'react'
import { brandColor } from '../../lib/brand'
import { cx } from '../../lib/cx'
import { track } from '../../lib/track'

function LayerDetail({ layer }) {
  return (
    <div>
      <p className="text-sm text-muted-dark">Buyer value</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-white">{layer.value}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {layer.modules.map((m) => (
          <li key={m} className="rounded-full border border-brand-purple/40 bg-brand-purple/15 px-3.5 py-1.5 text-sm text-white/90">
            {m}
          </li>
        ))}
      </ul>
      <div className="mt-8 border-t border-line-dark pt-5">
        <p className="text-sm text-muted-dark">In practice</p>
        <p className="mt-2 leading-relaxed text-white/85">{layer.useCase}</p>
      </div>
    </div>
  )
}

// Interactive layer diagram on desktop; a simple stacked list on mobile.
export function FrameworkExplorer({ layers, disclaimer }) {
  const [activeKey, setActiveKey] = useState(layers[0].key)
  const active = layers.find((l) => l.key === activeKey)

  const select = (key) => {
    setActiveKey(key)
    track('framework_interaction', { layer: key })
  }

  return (
    <div>
      <div className="hidden overflow-hidden rounded-lg border border-line-dark lg:grid lg:grid-cols-12">
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
                  'flex w-full items-center gap-4 px-6 py-3.5 text-left transition-colors',
                  selected ? 'bg-ink-2 text-white' : 'text-muted-dark hover:bg-ink-2/60 hover:text-white',
                )}
              >
                <span className="w-6 text-xs tabular-nums opacity-60">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-medium">{l.name}</span>
                <span aria-hidden="true" className="ml-auto size-2 rounded-full transition-opacity" style={{ background: brandColor(i), opacity: selected ? 1 : 0.35 }} />
              </button>
            )
          })}
        </div>
        <div id="framework-panel" role="tabpanel" aria-labelledby={`tab-${activeKey}`} className="col-span-7 p-8">
          <h3 className="mb-6 text-sm font-medium text-muted-dark">{active.name}</h3>
          <LayerDetail layer={active} />
        </div>
      </div>

      <ol className="divide-y divide-line-dark border-y border-line-dark lg:hidden">
        {layers.map((l) => (
          <li key={l.key} className="py-5">
            <h3 className="text-lg font-semibold">{l.name}</h3>
            <p className="mt-1 text-muted-dark">{l.value}</p>
            <p className="mt-3 text-sm text-white/70">{l.modules.join(' · ')}</p>
          </li>
        ))}
      </ol>

      {disclaimer && <p className="mt-6 text-sm text-muted-dark">{disclaimer}</p>}
    </div>
  )
}
