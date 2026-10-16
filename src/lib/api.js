const BASE = import.meta.env.VITE_API_BASE || '/api'
const TOKEN_KEY = 'srinishtha.admin.token'

export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

export const session = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  set: (token) => {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch {
      /* private mode: token lives for this page only */
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch {
      /* nothing stored */
    }
  },
}

async function request(path, { method = 'GET', body, form, auth = false, withMeta = false } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (auth && session.get()) headers.Authorization = `Bearer ${session.get()}`

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: form || (body ? JSON.stringify({ data: body }) : undefined),
  })
  const json = await res.json().catch(() => ({}))
  if (res.status === 401 && auth) session.clear()
  if (!res.ok || json.status !== 'success') {
    const errors = typeof json.data === 'object' ? json.data : undefined
    throw new ApiError(typeof json.data === 'string' ? json.data : 'Request failed', { status: res.status, errors })
  }
  return withMeta ? json : json.data
}

export const api = {
  site: () => request('/site'),
  createLead: (lead) => request('/leads', { method: 'POST', body: lead }),
}

// Admin endpoints (require a token from login).
export const adminApi = {
  login: (email, password) => request('/login', { method: 'POST', body: { email, password } }),
  me: () => request('/me/info', { auth: true }),
  leads: ({ page = 1, status = '' } = {}) => request(`/leads?page=${page}&page_size=25${status ? `&status=${status}` : ''}`, { auth: true, withMeta: true }),
  updateLead: (id, data) => request(`/leads/${id}`, { method: 'PUT', body: data, auth: true }),
  blocks: () => request('/content-blocks', { auth: true }),
  updateBlock: (id, data) => request(`/content-blocks/${id}`, { method: 'PUT', body: data, auth: true }),
  upload: (file) => {
    const form = new FormData()
    form.append('file', file)
    return request('/uploads', { method: 'POST', form, auth: true })
  },
}
