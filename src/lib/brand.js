// Brand colours from the Srinishtha logo, cycled so every item in a list gets its own accent.
export const BRAND_COLORS = ['#FF8B26', '#E54B7A', '#8A3FD1', '#39C4D6']
export const brandColor = (index) => BRAND_COLORS[index % BRAND_COLORS.length]

// Inline style for a staggered scroll-reveal (see useReveal / index.css).
export const revealDelay = (index, step = 70) => ({ '--reveal-delay': `${Math.min(index, 6) * step}ms` })
