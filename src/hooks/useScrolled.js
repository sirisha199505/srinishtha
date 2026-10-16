import { useEffect, useState } from 'react'

export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > offset)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}
