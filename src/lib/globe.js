// Canvas renderer for the home hero's "connected world": a dotted Earth with India lit up,
// great-circle links that all reach out from Hyderabad, and light trails travelling outward along
// them. After the intro the globe sways around India and links keep redrawing in staggered waves.
// Plain 2D canvas (no WebGL): a few thousand points per frame, paused while off screen.

import { LAND } from './landMask'

const DEG = Math.PI / 180
// Logo colours: orange, pink, purple (lightened for the dark globe), cyan.
const ORANGE = [255, 139, 38]
const PINK = [229, 75, 122]
const PURPLE = [176, 124, 240]
const CYAN = [57, 196, 214]
const WHITE = [255, 255, 255]
const LINK_COLORS = [ORANGE, PINK, PURPLE, CYAN]

// [name, lat, lon, brightness]. The first entry is the hub.
const CITIES = [
  ['Hyderabad', 17.39, 78.49, 1],
  ['Mumbai', 19.08, 72.88, 0.9], ['Delhi', 28.61, 77.21, 0.9], ['Bengaluru', 12.97, 77.59, 0.85],
  ['Chennai', 13.08, 80.27, 0.75], ['Kolkata', 22.57, 88.36, 0.75], ['Pune', 18.52, 73.86, 0.55],
  ['Ahmedabad', 23.02, 72.57, 0.55], ['Lahore', 31.55, 74.34, 0.55], ['Karachi', 24.86, 67.0, 0.65],
  ['Dhaka', 23.81, 90.41, 0.7], ['Colombo', 6.93, 79.86, 0.45], ['Kathmandu', 27.72, 85.32, 0.4],
  ['Dubai', 25.2, 55.27, 0.95], ['Doha', 25.29, 51.53, 0.55], ['Riyadh', 24.71, 46.68, 0.7],
  ['Muscat', 23.59, 58.38, 0.45], ['Kuwait', 29.38, 47.99, 0.45], ['Tehran', 35.69, 51.39, 0.65],
  ['Baghdad', 33.31, 44.36, 0.5], ['Tashkent', 41.3, 69.24, 0.45], ['Almaty', 43.24, 76.89, 0.45],
  ['Istanbul', 41.0, 28.98, 0.8], ['Moscow', 55.76, 37.62, 0.85], ['Kyiv', 50.45, 30.52, 0.5],
  ['Warsaw', 52.23, 21.01, 0.5], ['Stockholm', 59.33, 18.07, 0.45], ['Athens', 37.98, 23.73, 0.45],
  ['Rome', 41.9, 12.5, 0.6], ['Zurich', 47.37, 8.54, 0.5], ['Frankfurt', 50.11, 8.68, 0.75],
  ['Amsterdam', 52.37, 4.9, 0.6], ['Paris', 48.86, 2.35, 0.8], ['London', 51.51, -0.13, 0.9],
  ['Madrid', 40.42, -3.7, 0.6], ['Casablanca', 33.57, -7.59, 0.45], ['Cairo', 30.04, 31.24, 0.75],
  ['Lagos', 6.52, 3.38, 0.6], ['Addis Ababa', 9.03, 38.74, 0.45], ['Nairobi', -1.29, 36.82, 0.6],
  ['Dar es Salaam', -6.79, 39.21, 0.4], ['Luanda', -8.84, 13.23, 0.4], ['Johannesburg', -26.2, 28.05, 0.7],
  ['Cape Town', -33.92, 18.42, 0.5], ['Bangkok', 13.76, 100.5, 0.75], ['Kuala Lumpur', 3.14, 101.69, 0.6],
  ['Singapore', 1.35, 103.82, 0.9], ['Jakarta', -6.2, 106.85, 0.75], ['Ho Chi Minh City', 10.82, 106.63, 0.6],
  ['Manila', 14.6, 120.98, 0.6], ['Hong Kong', 22.32, 114.17, 0.85], ['Taipei', 25.03, 121.56, 0.55],
  ['Shanghai', 31.23, 121.47, 0.85], ['Chengdu', 30.57, 104.07, 0.5], ['Beijing', 39.9, 116.4, 0.8],
  ['Seoul', 37.57, 126.98, 0.7], ['Osaka', 34.69, 135.5, 0.5], ['Tokyo', 35.68, 139.69, 0.9],
  ['Perth', -31.95, 115.86, 0.45], ['Sydney', -33.87, 151.21, 0.7], ['Melbourne', -37.81, 144.96, 0.55],
  ['Auckland', -36.85, 174.76, 0.45], ['Honolulu', 21.31, -157.86, 0.35], ['Anchorage', 61.22, -149.9, 0.3],
  ['Vancouver', 49.28, -123.12, 0.5], ['Seattle', 47.61, -122.33, 0.55], ['San Francisco', 37.77, -122.42, 0.8],
  ['Los Angeles', 34.05, -118.24, 0.8], ['Dallas', 32.78, -96.8, 0.6], ['Chicago', 41.88, -87.63, 0.75],
  ['Toronto', 43.65, -79.38, 0.7], ['New York', 40.71, -74.0, 0.95], ['Washington', 38.91, -77.04, 0.6],
  ['Miami', 25.76, -80.19, 0.6], ['Mexico City', 19.43, -99.13, 0.8], ['Bogotá', 4.71, -74.07, 0.55],
  ['Lima', -12.05, -77.04, 0.5], ['São Paulo', -23.55, -46.63, 0.9], ['Rio de Janeiro', -22.91, -43.17, 0.6],
  ['Buenos Aires', -34.6, -58.38, 0.7], ['Santiago', -33.45, -70.67, 0.5],
]

// Every link starts in India (the hub) and reaches out to the world: the first INTRO_LINKS go out
// in the opening sequence; the rest join the loop in staggered waves.
const HUB = 'Hyderabad'
const INTRO_LINKS = 11
const LINKS = [
  'London', 'Dubai', 'Singapore', 'Frankfurt', 'Tokyo', 'Johannesburg', 'Moscow', 'Hong Kong',
  'Nairobi', 'Sydney', 'Riyadh',
  'New York', 'Paris', 'Cairo', 'Shanghai', 'Istanbul', 'Jakarta', 'Toronto', 'Lagos', 'Seoul',
  'Doha', 'São Paulo', 'Amsterdam', 'Bangkok', 'San Francisco', 'Cape Town', 'Kuala Lumpur',
  'Madrid', 'Melbourne', 'Tashkent', 'Chicago', 'Manila', 'Stockholm',
].map((to) => [HUB, to])

// Rough outline of India ([lon, lat]); land dots inside it are drawn lit up.
const INDIA = [
  [68.2, 23.7], [68.8, 22.3], [70.5, 20.7], [72.6, 21.1], [72.8, 19], [73.4, 16], [74.5, 12.8], [76.3, 9.5],
  [77.5, 8.1], [78.2, 8.9], [79.3, 10.3], [80.3, 13], [80.2, 15.9], [82.3, 17], [84.9, 19.3], [86.9, 21.2],
  [88.9, 21.6], [89, 22.9], [88.6, 24.3], [88.1, 24.6], [89.8, 25.9], [92, 25], [92.4, 22], [93.2, 22.3],
  [94.6, 24.7], [95.3, 26.6], [97.3, 27.9], [96, 29.2], [94.6, 29.3], [91.7, 27.8], [88.8, 27.3], [88.1, 27.9],
  [86, 27.9], [83.3, 27.4], [80.1, 28.8], [79, 30.9], [78.7, 31.9], [78.9, 32.6], [78, 34.5], [79.2, 35.5],
  [77.8, 35.5], [75, 36.9], [73.9, 34.7], [74.4, 32.8], [75.3, 32.3], [74.5, 31.1], [73.9, 30], [71.9, 27.9],
  [70.2, 28], [69.5, 26.7], [70.8, 25.2], [68.8, 24.3],
]
const inIndia = (lon, lat) => {
  let inside = false
  for (let i = 0, j = INDIA.length - 1; i < INDIA.length; j = i++) {
    const [xi, yi] = INDIA[i], [xj, yj] = INDIA[j]
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
// Cheap bounding-box check first, so the outline test only runs for the few cells near India.
const isIndian = (lat, lon) => lat > 6 && lat < 37.5 && lon > 68 && lon < 97.5 && inIndia(lon, lat)

// After the intro the view sways gently either side of India (72°E ± SWING°), so India and its
// rays always stay in view.
const SWING = 45, SWING_PERIOD = 60
// A link draws in, carries light, fades out, rests, then redraws.
const DRAW = 1.4, FADE = 1.2, REST = 1.6

const toVec = (lat, lon) => {
  const c = Math.cos(lat * DEG)
  return [c * Math.sin(lon * DEG), Math.sin(lat * DEG), c * Math.cos(lon * DEG)]
}

// Returns { dots, india }: land dots elsewhere, and the ones inside India (always kept at full density).
function decodeLand(thin) {
  const raw = atob(LAND.bits)
  const dots = []
  const india = []
  for (let r = 0; r < LAND.rows; r++) {
    const lat = 90 - LAND.step / 2 - r * LAND.step
    // Keep dot spacing even on the sphere: fewer columns toward the poles.
    const stride = Math.max(1, Math.round(1 / Math.cos(lat * DEG))) * thin
    for (let c = 0; c < LAND.cols; c++) {
      const i = r * LAND.cols + c
      if (!(raw.charCodeAt(i >> 3) & (1 << (i & 7)))) continue
      const lon = -180 + LAND.step / 2 + c * LAND.step
      if (isIndian(lat, lon)) india.push(toVec(lat, lon))
      else if (!(thin > 1 && r % thin) && c % stride === 0) dots.push(toVec(lat, lon))
    }
  }
  return { dots, india }
}

// Points along the great circle a→b, lifted off the surface (higher for longer routes).
function arcPoints(a, b, steps = 72) {
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const omega = Math.acos(Math.min(1, Math.max(-1, dot)))
  const lift = 0.05 + 0.22 * (omega / Math.PI)
  const pts = []
  for (let s = 0; s <= steps; s++) {
    const t = s / steps
    const k1 = Math.sin((1 - t) * omega) / Math.sin(omega)
    const k2 = Math.sin(t * omega) / Math.sin(omega)
    const h = 1 + lift * Math.sin(Math.PI * t)
    pts.push([(k1 * a[0] + k2 * b[0]) * h, (k1 * a[1] + k2 * b[1]) * h, (k1 * a[2] + k2 * b[2]) * h])
  }
  return pts
}

function glowSprite(rgb, size = 64) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, `rgba(${rgb},1)`)
  grad.addColorStop(0.18, `rgba(${rgb},0.65)`)
  grad.addColorStop(0.5, `rgba(${rgb},0.12)`)
  grad.addColorStop(1, `rgba(${rgb},0)`)
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

const clamp01 = (t) => Math.min(1, Math.max(0, t))
const easeOut = (t) => 1 - Math.pow(1 - clamp01(t), 3)
const easeInOut = (t) => {
  t = clamp01(t)
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Seeded random, so the star field is identical on every load.
function rng(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
}

/**
 * createGlobe(canvas, { layout(w, h) → { cx, cy, r, tilt? }, onLayout?, reducedMotion?, lite? })
 * `tilt` is the latitude (degrees) turned toward the viewer; default 12.
 * Returns { destroy }. Timeline (seconds): 0–1.6 the world emerges, 1.2–3.6 links draw in from
 * Hyderabad; from 3.4 the globe keeps turning and links redraw in staggered waves.
 */
export function createGlobe(canvas, { layout, onLayout, reducedMotion = false, lite = false }) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const { dots, india } = decodeLand(lite ? 2 : 1)
  const cityByName = Object.fromEntries(CITIES.map(([n, lat, lon, w]) => [n, { v: toVec(lat, lon), w }]))
  const cities = CITIES.map(([n, lat, lon]) => ({ ...cityByName[n], indian: isIndian(lat, lon) }))
  const links = LINKS.filter((_, i) => !lite || i % 2 === 0 || i < INTRO_LINKS).map(([a, b], i) => ({
    pts: arcPoints(cityByName[a].v, cityByName[b].v),
    start: i < INTRO_LINKS ? 1.2 + i * 0.12 : 3 + (i - INTRO_LINKS) * 0.55,
    // Varied cycle lengths keep the waves from falling into step.
    cycle: 9 + ((i * 5) % 7) * 0.85,
    color: LINK_COLORS[i % LINK_COLORS.length],
    period: 3.2 + ((i * 7) % 5) * 0.45,
    offset: (i * 0.37) % 1,
  }))
  const random = rng(7)
  const stars = Array.from({ length: lite ? 40 : 90 }, () => [random(), random(), random() * 0.6 + 0.15, random() * 6.28])
  const glows = new Map(LINK_COLORS.map((c) => [c, glowSprite(c.join(','))]))
  const cityGlow = glows.get(ORANGE)
  const indiaGlow = glowSprite('255,170,70', 128)
  const whiteGlow = glowSprite(WHITE.join(','))

  let w = 0, h = 0, dpr = 1, geo = { cx: 0, cy: 0, r: 0 }
  let raf = 0, running = false, visible = true, t0 = performance.now()
  const base = document.createElement('canvas')
  const bctx = base.getContext('2d')
  let baseKey = ''

  function resize() {
    const rect = canvas.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2)
    w = rect.width
    h = rect.height
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    base.width = canvas.width
    base.height = canvas.height
    baseKey = ''
    geo = layout(w, h)
    onLayout?.(geo)
    if (!running) draw(reducedMotion ? 99 : (performance.now() - t0) / 1000)
  }

  // Atmosphere, ocean sphere, land dots and rim light, drawn on the offscreen layer.
  function drawBase(R, project) {
    const { cx, cy } = geo
    const g = bctx
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.clearRect(0, 0, w, h)
    // Atmosphere: a warm halo, brightest toward the upper-left limb ("sunrise")
    const halo = g.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.32)
    halo.addColorStop(0, 'rgba(176,124,240,0.34)')
    halo.addColorStop(0.25, 'rgba(138,63,209,0.14)')
    halo.addColorStop(1, 'rgba(138,63,209,0)')
    g.fillStyle = halo
    g.beginPath()
    g.arc(cx, cy, R * 1.32, 0, Math.PI * 2)
    g.fill()
    const sunX = cx - R * 0.62, sunY = cy - R * 0.72
    const sun = g.createRadialGradient(sunX, sunY, 0, sunX, sunY, R * 1.1)
    sun.addColorStop(0, 'rgba(255,139,38,0.26)')
    sun.addColorStop(0.4, 'rgba(229,75,122,0.12)')
    sun.addColorStop(1, 'rgba(229,75,122,0)')
    g.fillStyle = sun
    g.fillRect(sunX - R * 1.1, sunY - R * 1.1, R * 2.2, R * 2.2)

    // Ocean sphere, lit from the upper left
    const body = g.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R)
    body.addColorStop(0, '#2b2558')
    body.addColorStop(0.6, '#191536')
    body.addColorStop(1, '#0d0b1f')
    g.fillStyle = body
    g.beginPath()
    g.arc(cx, cy, R, 0, Math.PI * 2)
    g.fill()

    // Land as dots, dimmer toward the limb (4 brightness bands = 4 fills per redraw)
    // Dot size follows the grid spacing on screen (one cell = step° of arc)
    const size = Math.max(1, R * LAND.step * DEG * (lite ? 0.5 : 0.36))
    const bands = [new Path2D(), new Path2D(), new Path2D(), new Path2D()]
    for (const v of dots) {
      const [x, y, z] = project(v)
      if (z <= 0.02) continue
      bands[Math.min(3, (z * 4) | 0)].rect(x - size / 2, y - size / 2, size, size)
    }
    bands.forEach((p, i) => {
      g.fillStyle = `rgba(206,196,245,${(0.1 + i * 0.1).toFixed(2)})`
      g.fill(p)
    })

    // India: the same dots, lit warm gold so the home country stands out (a soft wider dot under
    // a bright core reads as a glow without the cost of canvas blur on every redraw)
    const litHalo = new Path2D(), core = new Path2D()
    const coreSize = Math.max(1.2, size * 1.25), haloSize = coreSize * 2.2
    for (const v of india) {
      const [x, y, z] = project(v)
      if (z <= 0.02) continue
      litHalo.rect(x - haloSize / 2, y - haloSize / 2, haloSize, haloSize)
      core.rect(x - coreSize / 2, y - coreSize / 2, coreSize, coreSize)
    }
    g.fillStyle = 'rgba(255,139,38,0.18)'
    g.fill(litHalo)
    g.fillStyle = 'rgba(255,190,110,0.95)'
    g.fill(core)

    // Rim light
    g.strokeStyle = 'rgba(229,75,122,0.4)'
    g.lineWidth = 1
    g.beginPath()
    g.arc(cx, cy, R, Math.PI * 0.9, Math.PI * 1.75)
    g.stroke()
  }

  function draw(t) {
    // Nothing to draw while the canvas has no size (hidden, or being removed on navigation)
    if (!canvas.width || !canvas.height) return
    const { cx, cy } = geo
    const intro = easeOut(t / 1.6)
    const R = geo.r * (0.94 + 0.06 * intro)
    // Rotation: eases in from the west to face India, then sways either side of it.
    // (The sway eases in from rest, so there is no jolt when the intro ends.)
    const spun = t > 3.4 ? -SWING * Math.sin(((t - 3.4) * 2 * Math.PI) / SWING_PERIOD) * easeInOut((t - 3.4) / 6) : 0
    const yaw = (reducedMotion ? 72 : 72 - 34 * (1 - easeInOut(t / 3.4)) + spun) * DEG
    const tilt = (geo.tilt ?? 12) * DEG
    const cy0 = Math.cos(yaw), sy0 = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt)
    const project = (v) => {
      const x = v[0] * cy0 - v[2] * sy0
      const z0 = v[2] * cy0 + v[0] * sy0
      const y = v[1] * ct - z0 * st
      const z = v[1] * st + z0 * ct
      return [cx + R * x, cy - R * y, z, x * x + y * y]
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.globalAlpha = 1

    // Faint stars, twinkling slowly
    for (const [sx, sy, a, ph] of stars) {
      ctx.fillStyle = `rgba(240,236,255,${(a * (0.7 + 0.3 * Math.sin(t * 0.6 + ph)) * intro * 0.5).toFixed(3)})`
      ctx.fillRect(sx * w, sy * h, 1.2, 1.2)
    }

    // The globe body changes only as it turns, so it is cached and redrawn only when it moves.
    const key = `${(yaw / DEG).toFixed(1)}|${R.toFixed(1)}|${w}x${h}`
    if (key !== baseKey) {
      baseKey = key
      drawBase(R, project)
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = intro
    ctx.drawImage(base, 0, 0)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    ctx.globalCompositeOperation = 'lighter'

    // India's glow: a warm, slowly breathing light over the subcontinent
    const [ix, iy, iz] = project(toVec(22, 79))
    if (iz > 0) {
      const s = R * 0.34 * (1 + 0.05 * Math.sin(t * 1.1))
      ctx.globalAlpha = intro * Math.min(1, iz * 1.6) * 0.55
      ctx.drawImage(indiaGlow, ix - s, iy - s, s * 2, s * 2)
    }

    // City lights: India's at full strength, the rest of the world dimmer
    cities.forEach((c, i) => {
      const [x, y, z] = project(c.v)
      if (z <= 0.05) return
      const flicker = 0.85 + 0.15 * Math.sin(t * 1.3 + i * 1.7)
      const s = R * (0.03 + 0.05 * c.w) * flicker * (c.indian ? 1.15 : 0.8)
      ctx.globalAlpha = intro * Math.min(1, z * 2.2) * (0.45 + 0.55 * c.w) * (c.indian ? 1 : 0.5)
      ctx.drawImage(cityGlow, x - s, y - s, s * 2, s * 2)
    })

    // Links: draw in, then carry light trails
    ctx.lineCap = 'round'
    links.forEach((link, index) => {
      if (reducedMotion && index >= INTRO_LINKS) return
      if (t < link.start) return
      // Age within this link's current cycle (reduced motion: fully drawn, no fading).
      const age = reducedMotion ? DRAW : (t - link.start) % link.cycle
      const life = link.cycle - REST
      if (age > life) return
      const p = easeInOut(age / DRAW)
      const fade = intro * (1 - clamp01((age - (life - FADE)) / FADE))
      if (p <= 0 || fade <= 0) return
      const proj = link.pts.map(project)
      const last = Math.max(1, Math.floor(p * (proj.length - 1)))
      const visibleAt = (q) => q[2] > 0 || q[3] > 1
      ctx.globalAlpha = fade * 0.5
      ctx.strokeStyle = `rgb(${link.color})`
      ctx.lineWidth = Math.max(0.75, R / 520)
      ctx.beginPath()
      let pen = false
      for (let i = 0; i <= last; i++) {
        const q = proj[i]
        if (!visibleAt(q)) { pen = false; continue }
        pen ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])
        pen = true
      }
      ctx.stroke()

      // Drawing head while the link is still growing
      if (p < 1 && visibleAt(proj[last])) {
        const s = R * 0.05
        ctx.globalAlpha = fade
        ctx.drawImage(glows.get(link.color), proj[last][0] - s, proj[last][1] - s, s * 2, s * 2)
      }
      if (p < 1 || reducedMotion) return

      // Light trail: a short fading tail behind a bright head
      const u = ((age - DRAW) / link.period + link.offset) % 1
      const head = u * (proj.length - 1)
      const tail = 14
      for (let k = 0; k < tail; k++) {
        const a = Math.floor(head - k - 1), b = Math.floor(head - k)
        if (a < 0 || !visibleAt(proj[a]) || !visibleAt(proj[b])) continue
        ctx.globalAlpha = fade * 0.9 * (1 - k / tail)
        ctx.lineWidth = Math.max(1, R / 300) * (1 - k / (tail * 1.4))
        ctx.beginPath()
        ctx.moveTo(proj[a][0], proj[a][1])
        ctx.lineTo(proj[b][0], proj[b][1])
        ctx.stroke()
      }
      const hq = proj[Math.floor(head)]
      if (visibleAt(hq)) {
        const s = R * 0.035
        ctx.globalAlpha = fade
        ctx.drawImage(glows.get(link.color), hq[0] - s, hq[1] - s, s * 2, s * 2)
      }
      // Launch flash in India as each light leaves
      if (u < 0.12 && proj[0][2] > 0) {
        const s = R * 0.06 * (1 - u / 0.12)
        ctx.globalAlpha = fade * (1 - u / 0.12)
        ctx.drawImage(whiteGlow, proj[0][0] - s, proj[0][1] - s, s * 2, s * 2)
      }
      // Arrival pulse at the destination
      if (u > 0.86) {
        const q = proj[proj.length - 1]
        const k = (u - 0.86) / 0.14
        if (q[2] > 0) {
          ctx.globalAlpha = fade * (1 - k) * 0.8
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(q[0], q[1], 2 + k * R * 0.045, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    })

    // Hub: Hyderabad, with a slow breathing ring
    const [hx, hy, hz] = project(cityByName.Hyderabad.v)
    if (hz > 0) {
      const s = R * 0.09
      ctx.globalAlpha = intro
      ctx.drawImage(cityGlow, hx - s, hy - s, s * 2, s * 2)
      ctx.drawImage(whiteGlow, hx - s * 0.35, hy - s * 0.35, s * 0.7, s * 0.7)
      if (!reducedMotion) {
        const k = (t % 3.2) / 3.2
        ctx.globalAlpha = intro * (1 - k) * 0.7
        ctx.strokeStyle = `rgb(${ORANGE})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(hx, hy, 3 + k * R * 0.12, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
  }

  function frame(now) {
    draw((now - t0) / 1000)
    raf = requestAnimationFrame(frame)
  }
  function start() {
    if (running || reducedMotion || !visible || document.hidden) return
    running = true
    raf = requestAnimationFrame(frame)
  }
  function stop() {
    running = false
    cancelAnimationFrame(raf)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    visible ? start() : stop()
  })
  io.observe(canvas)
  const onVisibility = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', onVisibility)

  resize()
  start()

  return {
    destroy() {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    },
  }
}
