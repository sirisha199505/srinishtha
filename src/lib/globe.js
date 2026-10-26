// Canvas renderer for the home hero's "connected world": a dotted Earth lit by city lights,
// great-circle links that draw in from Hyderabad, and light trails travelling along them.
// After the intro the globe keeps turning and links keep redrawing in staggered waves.
// Plain 2D canvas (no WebGL): a few thousand points per frame, paused while off screen.

import { LAND } from './landMask'

const DEG = Math.PI / 180
const GOLD = [232, 180, 106]
const WHITE = [255, 246, 232]

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

// Links: the first INTRO_LINKS go out from the hub in the opening sequence; the rest join the
// loop as the globe turns, so every region shows live connections.
const INTRO_LINKS = 11
const LINKS = [
  ['Hyderabad', 'London'], ['Hyderabad', 'Dubai'], ['Hyderabad', 'Singapore'], ['Hyderabad', 'Frankfurt'],
  ['Hyderabad', 'Tokyo'], ['Hyderabad', 'Johannesburg'], ['Hyderabad', 'Moscow'], ['Hyderabad', 'Hong Kong'],
  ['Hyderabad', 'Nairobi'], ['Hyderabad', 'Sydney'], ['Hyderabad', 'Riyadh'],
  ['London', 'Dubai'], ['Dubai', 'Singapore'], ['Singapore', 'Sydney'], ['Hong Kong', 'Tokyo'],
  ['Paris', 'Cairo'], ['Johannesburg', 'Dubai'], ['Istanbul', 'Moscow'], ['Shanghai', 'Singapore'],
  ['Hyderabad', 'New York'], ['London', 'New York'], ['Toronto', 'London'], ['Chicago', 'Frankfurt'],
  ['New York', 'São Paulo'], ['Mexico City', 'Madrid'], ['São Paulo', 'Lagos'], ['San Francisco', 'Tokyo'],
  ['Los Angeles', 'Sydney'], ['San Francisco', 'New York'], ['Miami', 'Bogotá'], ['Sydney', 'Auckland'],
  ['Buenos Aires', 'Cape Town'], ['Seattle', 'Seoul'],
]

// After the intro the view swings continuously between South Asia (72°E) and the Americas
// (SWING° further west) and back, so land and live links are always in view (never the open Pacific).
const SWING = 130, SWING_PERIOD = 110
// A link draws in, carries light, fades out, rests, then redraws.
const DRAW = 1.4, FADE = 1.2, REST = 1.6

const toVec = (lat, lon) => {
  const c = Math.cos(lat * DEG)
  return [c * Math.sin(lon * DEG), Math.sin(lat * DEG), c * Math.cos(lon * DEG)]
}

function decodeLand(thin) {
  const raw = atob(LAND.bits)
  const dots = []
  for (let r = 0; r < LAND.rows; r++) {
    const lat = 90 - LAND.step / 2 - r * LAND.step
    // Keep dot spacing even on the sphere: fewer columns toward the poles.
    const stride = Math.max(1, Math.round(1 / Math.cos(lat * DEG))) * thin
    if (thin > 1 && r % thin) continue
    for (let c = 0; c < LAND.cols; c += stride) {
      const i = r * LAND.cols + c
      if (raw.charCodeAt(i >> 3) & (1 << (i & 7))) dots.push(toVec(lat, -180 + LAND.step / 2 + c * LAND.step))
    }
  }
  return dots
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

  const dots = decodeLand(lite ? 2 : 1)
  const cityByName = Object.fromEntries(CITIES.map(([n, lat, lon, w]) => [n, { v: toVec(lat, lon), w }]))
  const cities = CITIES.map(([n]) => cityByName[n])
  const links = LINKS.filter((_, i) => !lite || i % 2 === 0 || i < INTRO_LINKS).map(([a, b], i) => ({
    pts: arcPoints(cityByName[a].v, cityByName[b].v),
    start: i < INTRO_LINKS ? 1.2 + i * 0.12 : 3 + (i - INTRO_LINKS) * 0.55,
    // Varied cycle lengths keep the waves from falling into step.
    cycle: 9 + ((i * 5) % 7) * 0.85,
    color: i % 3 === 2 ? WHITE : GOLD,
    period: 3.2 + ((i * 7) % 5) * 0.45,
    offset: (i * 0.37) % 1,
  }))
  const random = rng(7)
  const stars = Array.from({ length: lite ? 40 : 90 }, () => [random(), random(), random() * 0.6 + 0.15, random() * 6.28])
  const goldGlow = glowSprite(GOLD.join(','))
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
    halo.addColorStop(0, 'rgba(232,180,106,0.30)')
    halo.addColorStop(0.25, 'rgba(182,106,32,0.12)')
    halo.addColorStop(1, 'rgba(182,106,32,0)')
    g.fillStyle = halo
    g.beginPath()
    g.arc(cx, cy, R * 1.32, 0, Math.PI * 2)
    g.fill()
    const sunX = cx - R * 0.62, sunY = cy - R * 0.72
    const sun = g.createRadialGradient(sunX, sunY, 0, sunX, sunY, R * 1.1)
    sun.addColorStop(0, 'rgba(232,180,106,0.32)')
    sun.addColorStop(0.4, 'rgba(182,106,32,0.10)')
    sun.addColorStop(1, 'rgba(182,106,32,0)')
    g.fillStyle = sun
    g.fillRect(sunX - R * 1.1, sunY - R * 1.1, R * 2.2, R * 2.2)

    // Ocean sphere, lit from the upper left
    const body = g.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R)
    body.addColorStop(0, '#26384a')
    body.addColorStop(0.6, '#18232f')
    body.addColorStop(1, '#0f161d')
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
      g.fillStyle = `rgba(214,190,150,${(0.12 + i * 0.13).toFixed(2)})`
      g.fill(p)
    })

    // Rim light
    g.strokeStyle = 'rgba(232,180,106,0.35)'
    g.lineWidth = 1
    g.beginPath()
    g.arc(cx, cy, R, Math.PI * 0.9, Math.PI * 1.75)
    g.stroke()
  }

  function draw(t) {
    const { cx, cy } = geo
    const intro = easeOut(t / 1.6)
    const R = geo.r * (0.94 + 0.06 * intro)
    // Rotation: eases in from the west to face South Asia, then keeps turning. The swing starts
    // from rest (1 − cos), so there is no jolt when the intro ends.
    const spun = t > 3.4 ? -(SWING / 2) * (1 - Math.cos(((t - 3.4) * 2 * Math.PI) / SWING_PERIOD)) : 0
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
      ctx.fillStyle = `rgba(255,240,220,${(a * (0.7 + 0.3 * Math.sin(t * 0.6 + ph)) * intro * 0.5).toFixed(3)})`
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

    // City lights
    ctx.globalCompositeOperation = 'lighter'
    cities.forEach((c, i) => {
      const [x, y, z] = project(c.v)
      if (z <= 0.05) return
      const flicker = 0.85 + 0.15 * Math.sin(t * 1.3 + i * 1.7)
      const s = R * (0.03 + 0.05 * c.w) * flicker
      ctx.globalAlpha = intro * Math.min(1, z * 2.2) * (0.45 + 0.55 * c.w)
      ctx.drawImage(goldGlow, x - s, y - s, s * 2, s * 2)
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
        ctx.drawImage(link.color === GOLD ? goldGlow : whiteGlow, proj[last][0] - s, proj[last][1] - s, s * 2, s * 2)
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
        ctx.drawImage(link.color === GOLD ? goldGlow : whiteGlow, hq[0] - s, hq[1] - s, s * 2, s * 2)
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
      ctx.drawImage(goldGlow, hx - s, hy - s, s * 2, s * 2)
      ctx.drawImage(whiteGlow, hx - s * 0.35, hy - s * 0.35, s * 0.7, s * 0.7)
      if (!reducedMotion) {
        const k = (t % 3.2) / 3.2
        ctx.globalAlpha = intro * (1 - k) * 0.7
        ctx.strokeStyle = `rgb(${GOLD})`
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
