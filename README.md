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

## Install and run

```bash
npm install
npm start
```

Then open the local URL printed in the terminal (default:
`http://localhost:3000`, or the port set in `PORT`) — it opens the QA Tools
hub, with a tile for each tool.

On first run, the regression test case list is seeded from the data bundled
in the repo (`src/regression/seedTestCases.ts`). All runtime data (SEO audit
history, regression test cases, results, reports) is stored as JSON files
under `data/`, which is gitignored.

For development with auto-restart on file changes:

```bash
npm run dev
```

## Tests

```bash
npm test
```

Typecheck:

```bash
npm run typecheck
```

## Project structure

| Path | What it is |
|------|------------|
| `src/server.ts` | Single Express app: serves the UI + both tools' `/api/*` routes |
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
