# Srinishtha Technologies — website

React + Tailwind CSS frontend, Ruby (Roda + Sequel) backend on Neon Postgres.
Built from the *Ultra-Premium GTM Website Enhancement Blueprint* (15 Oct 2026) with content and imagery from www.srinishtha.com.

## Run it

```bash
# Backend (API + serves the built site) — http://localhost:9292
cd backend
bundle install
bundle exec rake db:migrate      # creates content_blocks + leads
bundle exec rake db:seed         # loads website content (src/seeds/content.rb)
bundle exec puma -p 9292 config.ru

# Frontend dev server with hot reload — http://localhost:5173 (proxies /api to :9292)
cd frontend
npm install
npm run dev
npm run build                    # outputs to backend/public, served by Roda
```

`backend/.env` holds `DB_URL` (Neon) and `JWT_SECRET`. It is git-ignored; never commit it.

## Admin panel — http://localhost:9292/admin

- **Enquiries:** every contact-form message; click a row to read it, set status (new → contacted → qualified → closed).
- **Project archive / Case studies:** add, edit, reorder, delete; upload screenshots (stored in `backend/uploads/`).
  Ticking *Show in Selected work* features a case study on the home page.
- Create an admin or reset a password: `bundle exec rake admin:create EMAIL=you@srinishtha.com NAME="Your Name"`
- `rake db:seed` never overwrites projects/case studies edited in the admin; `rake db:seed FORCE=1` does.
- In production, keep `backend/uploads/` on persistent storage (or move uploads to S3).

## SEO (server-side, `backend/src/services/seo.rb`)

- Every page's HTML carries its own title, description, canonical URL, Open Graph/Twitter tags and JSON-LD
  (WebSite, BreadcrumbList, Service for capabilities/solutions, Article for case studies) — built from the same content blocks.
- `/robots.txt` and `/sitemap.xml` are generated live; projects and case studies added in the admin appear automatically.
- Unknown URLs return a real 404; `/admin` is `noindex`.
- Old URLs (`/services`, `/about-us`, `/contact-us`, `/resources/case-studies`) return 301 redirects.
- Set `SITE_URL` in `.env` for the live domain (defaults to https://www.srinishtha.com).
- After launch: submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## How it is put together

**Single source of truth.** All copy, navigation, CTAs, case studies, people and images live in one place:
`backend/src/seeds/content.rb` → `content_blocks` table → `GET /api/site` (one call) → `SiteProvider` (React context).
To change text on the site, edit the seed and run `rake db:seed` — no frontend change needed.

**Pure, reusable components.** `frontend/src/components/ui` (Button, Section, Fields, RuleList…) and
`frontend/src/components/blocks` (CaseStudyCard, StepFlow, FeatureGrid, FrameworkExplorer, LeadForm…) receive
everything through props. Only page containers (`src/pages/*`) and `AppShell` read the content context.

**API**

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/site` | public | All website content |
| POST | `/api/leads` | public | Contact form (validated, honeypot, UTM attribution) |
| GET/PUT | `/api/leads[/:id]` | admin | List leads, update status |
| CRUD | `/api/content-blocks[/:id]` | admin | Edit content blocks |

**Brand & motion.** Orange · pink · purple · cyan from the logo (`src/lib/brand.js`, tokens in `src/index.css`).
Sections fade in once on scroll (`useReveal`); hero stats count up once. Both respect *reduced motion*.

## Before launch — please verify (blueprint "proof layer")

- Leadership portraits: the live site only had placeholder silhouettes, so initials are shown. Add real photos via `image:` in the `leadership` seed block.
- Leadership bios: add years of experience, prior roles and LinkedIn per blueprint §12.
- Security & Engineering page describes practices, not certifications — confirm each statement is accurate.
- Client logos, screenshots and the Sid's Farm quote: confirm you have permission to publish.
