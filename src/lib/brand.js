// Inline style for a staggered scroll-reveal (see useReveal / index.css).
export const revealDelay = (index, step = 70) => ({ '--reveal-delay': `${Math.min(index, 6) * step}ms` })

// Two-digit index label ("01", "02"…) used by numbered lists and process steps.
export const pad = (n) => String(n).padStart(2, '0')
