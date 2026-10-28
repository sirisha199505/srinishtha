import { useState } from 'react'
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
export function ScreenFrame({ src, alt = '', url, device = 'desktop', className, imgClassName }) {
  // Captures wider than the 2:1 frame are shown whole (never cropped at the sides) over a
  // blurred copy of themselves; taller ones fill the width and lose only the bottom.
  const [wide, setWide] = useState(false)
  if (device === 'mobile') {
    return (
      // Same outer height as the browser frame (28px bar + 2:1), with the phone centred in it
      <div className={cx('relative overflow-hidden rounded-[4px] border border-line bg-paper', className)}>
        <div aria-hidden="true" className="mt-7 aspect-[2/1]" />
        <div className="absolute inset-y-[6%] left-1/2 -translate-x-1/2 overflow-hidden rounded-[1.25rem] border-[5px] border-navy bg-white shadow-[0_18px_40px_-18px_rgba(16,36,58,0.45)]">
          <img src={src} alt={alt} loading="lazy" className="h-full w-auto object-cover object-top" />
        </div>
      </div>
    )
  }

  if (device === 'photo') {
    return (
      <div className={cx('overflow-hidden rounded-[4px] border border-line bg-paper', className)}>
        <img src={src} alt={alt} loading="lazy" className={cx('aspect-[2/1] w-full object-cover', imgClassName)} />
      </div>
    )
  }

  const host = url && hostOf(url)
  return (
    <div className={cx('overflow-hidden rounded-[4px] border border-line bg-white shadow-[0_24px_50px_-30px_rgba(16,36,58,0.4)]', className)}>
      <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-line bg-paper px-3">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        {host && <span className="ml-3 truncate text-[0.6875rem] text-muted">{host}</span>}
      </div>
      <div className="relative aspect-[2/1] overflow-hidden">
        {wide && <img src={src} alt="" aria-hidden="true" className="absolute inset-0 size-full scale-110 object-cover object-bottom blur-xl" />}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={(e) => setWide(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight > 2.01)}
          className={cx('relative size-full object-top', wide ? 'object-contain' : 'object-cover', imgClassName)}
        />
      </div>
    </div>
  )
}
