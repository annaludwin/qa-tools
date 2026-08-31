# QA Tools

A small hub of QA web tools, served from a single Express app:

- **[SEO Analyzer](public/seo)** — paste a page URL and get a readable SEO
  report (pass / warning / fail + score 0–100), with audit history.
- **[Regression Test Suite](public/regression)** — a simplified TestRail-style
  tool: browse test cases grouped by section, record results (Pass / Fail /
  Not Supported), add/edit/delete test cases, and generate dated reports.

Built in TypeScript (Express + Cheerio, run natively by Node — no build
step). The frontend is plain HTML/CSS/JS, no framework or bundler.

## Requirements

- Node.js (LTS)
- A Postgres database — this project uses [Supabase](https://supabase.com)'s
  free tier (no credit card required), but any Postgres connection string works.

## Setup

1. Create a free Supabase project (or use any other Postgres database).
2. Get its connection string. **Use the Session pooler or Transaction pooler
   connection string, not "Direct connection"** — direct connections are
   IPv6-only, which fails on many networks (Windows without IPv6, some
   corporate networks). The pooler connection string looks like:
   ```
   postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres
   ```
3. Copy `.env.example` to `.env` and set `DATABASE_URL` to that connection
   string (with your real password, url-encoded if it has special characters).

```bash
npm install
npm start
```

Then open the local URL printed in the terminal (default:
`http://localhost:3000`, or the port set in `PORT`) — it opens the QA Tools
hub, with a tile for each tool.

On first run, the app creates its tables automatically and seeds the
regression test case list from the data bundled in the repo
(`src/regression/seedTestCases.ts`). All runtime data (SEO audit history,
regression test cases, results, reports) lives in that one Postgres
database — locally and in production alike, so nothing is lost between
runs or deploys.

For development with auto-restart on file changes:

```bash
npm run dev
```

## Tests

```bash
npm test
```

Tests run against the **same database** as `DATABASE_URL` points to (there's
no separate test database). They're written to only touch rows they create
themselves — with random IDs, cleaned up afterwards — so they're safe to run
against the real data. Test files run one at a time (`--test-concurrency=1`)
to avoid racing on first-time table creation.

Typecheck:

```bash
npm run typecheck
```

## Project structure

| Path | What it is |
|------|------------|
| `src/server.ts` | Single Express app: serves the UI + both tools' `/api/*` routes |
| `src/db.ts` | Shared Postgres connection pool + table creation (`initSchema`) |
| `src/seo/` | SEO Analyzer logic (`analyzer.ts`, `url.ts`, `storage.ts`, `types.ts`) |
| `src/regression/` | Regression suite logic (`testCaseStore.ts`, `storage.ts`, `reports.ts`, `seedTestCases.ts`, `types.ts`) |
| `public/index.html` | QA Tools landing page |
| `public/seo/` | SEO Analyzer UI |
| `public/regression/` | Regression Test Suite UI (list, detail, add/edit form, report history) |
| `tests/seo/`, `tests/regression/` | Unit tests (`node --test`) |

## API

- SEO Analyzer: `/api/seo/analyze`, `/api/seo/history`, `/api/seo/history/:id`
- Regression Test Suite: `/api/regression/testcases`, `/api/regression/testcases/:id`,
  `/api/regression/testcases/:id/result`, `/api/regression/results/clear`,
  `/api/regression/reports`, `/api/regression/reports/:id`

## Scripts

| Script | Command |
|--------|---------|
| `start` | `node src/server.ts` |
| `dev` | watch mode |
| `test` | unit tests |
| `typecheck` | `tsc --noEmit` |
