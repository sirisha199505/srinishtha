import { useEffect } from 'react'

// Adds .is-visible to [data-reveal] elements the first time they enter the viewport.
// A MutationObserver picks up elements rendered later (lazy routes, route changes).
export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return
    document.documentElement.classList.add('reveal-ready')

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const observeAll = () => root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el))
    observeAll()
    const mo = new MutationObserver(observeAll)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [rootRef])
}
