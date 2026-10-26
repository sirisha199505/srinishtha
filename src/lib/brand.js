// Logo colours (orange, pink, purple, cyan), cycled so each item in a list gets its own accent.
export const BRAND_COLORS = ['#ff8b26', '#e54b7a', '#8a3fd1', '#39c4d6']
export const brandColor = (index) => BRAND_COLORS[index % BRAND_COLORS.length]

// Inline style for a staggered scroll-reveal (see useReveal / index.css).
export const revealDelay = (index, step = 70) => ({ '--reveal-delay': `${Math.min(index, 6) * step}ms` })

