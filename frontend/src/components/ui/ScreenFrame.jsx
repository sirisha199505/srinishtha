import { cx } from '../../lib/cx'

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

// Presents a product screenshot uncropped: a browser window for desktop captures (2:1),
// a phone outline for mobile captures. Photos (no `device`) fill a 2:1 frame.
export function ScreenFrame({ src, alt = '', url, device = 'desktop', className }) {
  if (device === 'mobile') {
    return (
      <div className={cx('flex aspect-[2/1] items-center justify-center overflow-hidden rounded-lg border border-line bg-paper', className)}>
        <div className="h-[88%] overflow-hidden rounded-[1.25rem] border-[5px] border-ink bg-white shadow-[0_18px_40px_-18px_rgba(11,15,26,0.45)]">
          <img src={src} alt={alt} loading="lazy" className="h-full w-auto object-cover object-top" />
        </div>
      </div>
    )
  }

  if (device === 'photo') {
    return (
      <div className={cx('overflow-hidden rounded-lg border border-line bg-paper', className)}>
        <img src={src} alt={alt} loading="lazy" className="aspect-[2/1] w-full object-cover" />
      </div>
    )
  }

  const host = url && hostOf(url)
  return (
    <div className={cx('overflow-hidden rounded-lg border border-line bg-white shadow-[0_12px_32px_-18px_rgba(11,15,26,0.25)]', className)}>
      <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-line bg-paper px-3">
        <span className="size-2 rounded-full bg-brand-pink/70" />
        <span className="size-2 rounded-full bg-brand-orange/70" />
        <span className="size-2 rounded-full bg-brand-cyan/70" />
        {host && <span className="ml-3 truncate text-[0.6875rem] text-muted">{host}</span>}
      </div>
      <img src={src} alt={alt} loading="lazy" className="aspect-[2/1] w-full object-cover object-top" />
    </div>
  )
}
