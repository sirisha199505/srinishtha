// Saves the current site content (GET /api/site) into src/content/siteSnapshot.json.
// The site renders from this snapshot instantly and then swaps in live content, so visitors
// never wait on the API. Re-run after content changes: npm run snapshot
import { writeFile } from 'node:fs/promises'

const API = process.env.API_TARGET || 'https://srinishtha-api.onrender.com'
const res = await fetch(`${API}/api/site`)
const json = await res.json()
if (!res.ok || json.status !== 'success') throw new Error(`Snapshot failed: HTTP ${res.status}`)

const out = new URL('../src/content/siteSnapshot.json', import.meta.url)
await writeFile(out, JSON.stringify(json.data))
console.log(`Saved ${out.pathname}`)
