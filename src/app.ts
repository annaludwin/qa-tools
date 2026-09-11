// .env jest opcjonalny — lokalnie wczytuje DATABASE_URL z pliku,
// na Render/Vercel zmienne środowiskowe są ustawiane bezpośrednio w panelu.
try {
  process.loadEnvFile();
} catch {
  // brak .env — w porządku, jeśli DATABASE_URL jest już ustawione w środowisku
}

import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { initSchema } from "./db.ts";

// ── SEO Analyzer ──────────────────────────────────────────────
import { buildReport } from "./seo/analyzer.ts";
import { normalizeUrl } from "./seo/url.ts";
import { addEntry, getEntry, listSummaries as listSeoHistory } from "./seo/storage.ts";

// ── Regression Test Suite ────────────────────────────────────
import {
  readAll,
  getById,
  create,
  update,
  removeFromTrash,
  trash,
  readTrash,
  restore,
  purgeExpired,
  setAutomated,
} from "./regression/testCaseStore.ts";
import type { TestCaseInput } from "./regression/testCaseStore.ts";
import { manualResults, e2eResults } from "./regression/storage.ts";
import { addReport, getReport, listSummaries as listReports } from "./regression/reports.ts";
import type {
  Priority,
  ReportResultEntry,
  StatusCounts,
  TestCase,
  TestCaseDetail,
  TestCaseSummary,
  TestStatus,
  TestSuite,
} from "./regression/types.ts";

const app = express();

app.use(express.json());

// Serwuje public/ lokalnie i na hostach typu Render. Na Vercel ten sam
// folder jest serwowany bezpośrednio przez ich CDN (Express.static jest
// tam pomijany), więc to nie koliduje — po prostu nie jest tam używane.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

// ════════════════════════════════════════════════════════════
// SEO Analyzer — /api/seo/*
// ════════════════════════════════════════════════════════════

/**
 * Endpoint analizy: przyjmuje { url }, pobiera stronę i zwraca raport SEO.
 * Pobieranie dzieje się TU (na serwerze), bo przeglądarka nie może
 * pobrać cudzej strony z powodu ograniczeń CORS.
 */
app.post("/api/seo/analyze", async (req, res) => {
  const rawUrl = typeof req.body?.url === "string" ? req.body.url : "";
  const normalized = normalizeUrl(rawUrl);

  let target: URL;
  try {
    target = new URL(normalized);
  } catch {
    return res.status(400).json({ error: "Enter a valid URL, e.g. https://example.com" });
  }
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return res.status(400).json({ error: "Only http:// and https:// addresses are supported" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  const startedAt = performance.now();

  try {
    const response = await fetch(target, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "SEO-Analyzer-QA/1.0 (educational QA tool)" },
    });
    const responseTimeMs = Math.round(performance.now() - startedAt);

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return res.status(415).json({
        error: `The address did not return an HTML page (type: ${contentType || "unknown"}).`,
      });
    }

    const html = await response.text();
    const report = buildReport({
      url: response.url || target.href,
      statusCode: response.status,
      responseTimeMs,
      html,
    });

    try {
      await addEntry(report);
    } catch (err) {
      console.error("Failed to save the audit to history:", err);
    }

    return res.json(report);
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    return res.status(502).json({
      error: isAbort
        ? "Timed out (10 s) while fetching the page."
        : "Failed to fetch the page. Check the address and try again.",
    });
  } finally {
    clearTimeout(timeout);
  }
});

/** Lista historycznych audytów (skróty, najnowsze pierwsze). */
app.get("/api/seo/history", async (_req, res) => {
  try {
    const summaries = await listSeoHistory();
    return res.json(summaries);
  } catch (err) {
    console.error("Error reading history:", err);
    return res.status(500).json({ error: "Failed to read history." });
  }
});

/** Pełny raport z historii po id. */
app.get("/api/seo/history/:id", async (req, res) => {
  try {
    const entry = await getEntry(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: "No audit found with the given id." });
    }
    return res.json(entry);
  } catch (err) {
    console.error("Error reading audit:", err);
    return res.status(500).json({ error: "Failed to read the audit." });
  }
});

// ════════════════════════════════════════════════════════════
// Regression Test Suite — /api/regression/*
// ════════════════════════════════════════════════════════════

const VALID_STATUSES: TestStatus[] = ["pass", "fail", "not supported"];
const VALID_PRIORITIES: Priority[] = ["HIGH", "MEDIUM", "LOW"];
const VALID_SUITES: TestSuite[] = ["manual", "e2e"];

/** Parsuje parametr `suite` z query (domyślnie "manual" — kompatybilność wstecz). */
function parseSuite(value: unknown): TestSuite {
  return typeof value === "string" && VALID_SUITES.includes(value as TestSuite) ? (value as TestSuite) : "manual";
}

/** Magazyn wyników odpowiadający danemu suite'owi. */
function resultsStoreFor(suite: TestSuite) {
  return suite === "e2e" ? e2eResults : manualResults;
}

/** Magazyn wyników odpowiadający aktualnej flagzie automated danego test case'a. */
function resultsStoreForTestCase(testCase: TestCase) {
  return resultsStoreFor(testCase.automated ? "e2e" : "manual");
}

/** Parsuje i waliduje dane test case'a z body żądania (POST/PUT). Zwraca komunikat błędu albo dane. */
function parseTestCaseInput(body: unknown): { data: TestCaseInput } | { error: string } {
  const b = (body ?? {}) as Record<string, unknown>;

  const section = typeof b.section === "string" ? b.section.trim() : "";
  const title = typeof b.title === "string" ? b.title.trim() : "";
  const priority = typeof b.priority === "string" ? (b.priority.toUpperCase() as Priority) : undefined;
  const platforms = Array.isArray(b.platforms)
    ? b.platforms.filter((p): p is string => typeof p === "string" && p.trim().length > 0).map((p) => p.trim())
    : [];
  const preconditions = typeof b.preconditions === "string" ? b.preconditions.trim() : "";
  const steps = Array.isArray(b.steps)
    ? b.steps.filter((s): s is string => typeof s === "string" && s.trim().length > 0).map((s) => s.trim())
    : [];
  const expectedResult = Array.isArray(b.expectedResult)
    ? b.expectedResult.filter((r): r is string => typeof r === "string" && r.trim().length > 0).map((r) => r.trim())
    : [];

  if (!section) return { error: "Section is required." };
  if (!title) return { error: "Title is required." };
  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    return { error: `Priority must be one of: ${VALID_PRIORITIES.join(", ")}` };
  }
  if (platforms.length === 0) return { error: "At least one platform is required." };
  if (!preconditions) return { error: "Preconditions are required." };
  if (steps.length === 0) return { error: "At least one step is required." };
  if (expectedResult.length === 0) return { error: "At least one expected result item is required." };

  return { data: { section, title, priority, platforms, preconditions, steps, expectedResult } };
}

/** Lista test case'ów danego suite'u (manual/e2e) z ich aktualnym statusem (do lewej kolumny). */
app.get("/api/regression/testcases", async (req, res) => {
  try {
    const suite = parseSuite(req.query.suite);
    const results = resultsStoreFor(suite);
    const testCases = await readAll(suite);
    const summaries: TestCaseSummary[] = await Promise.all(
      testCases.map(async (tc) => {
        const result = await results.getResult(tc.id);
        return { id: tc.id, section: tc.section, title: tc.title, status: result?.status ?? "untested" };
      }),
    );
    return res.json(summaries);
  } catch (err) {
    console.error("Error reading test case list:", err);
    return res.status(500).json({ error: "Failed to read the test case list." });
  }
});

/** Pełny test case ze statusem (do podglądu w prawej kolumnie). */
/** Lista test case'ów z tymczasowego kosza. */
app.get("/api/regression/trash", async (_req, res) => {
  try {
    return res.json(await readTrash());
  } catch (err) {
    console.error("Error reading regression trash:", err);
    return res.status(500).json({ error: "Failed to read the trash." });
  }
});

app.get("/api/regression/testcases/:id", async (req, res) => {
  try {
    const testCase = await getById(req.params.id);
    if (!testCase) {
      return res.status(404).json({ error: "No test case found with the given id." });
    }

    const result = await resultsStoreForTestCase(testCase).getResult(testCase.id);
    const detail: TestCaseDetail = { ...testCase, status: result?.status ?? "untested" };
    return res.json(detail);
  } catch (err) {
    console.error("Error reading test case result:", err);
    return res.status(500).json({ error: "Failed to read the test case." });
  }
});

/** Tworzy nowy test case. */
app.post("/api/regression/testcases", async (req, res) => {
  const parsed = parseTestCaseInput(req.body);
  if ("error" in parsed) {
    return res.status(400).json({ error: parsed.error });
  }

  try {
    const testCase = await create(parsed.data);
    return res.status(201).json(testCase);
  } catch (err) {
    console.error("Error creating test case:", err);
    return res.status(500).json({ error: "Failed to create the test case." });
  }
});

/** Aktualizuje istniejący test case. */
app.put("/api/regression/testcases/:id", async (req, res) => {
  const parsed = parseTestCaseInput(req.body);
  if ("error" in parsed) {
    return res.status(400).json({ error: parsed.error });
  }

  try {
    const testCase = await update(req.params.id, parsed.data);
    if (!testCase) {
      return res.status(404).json({ error: "No test case found with the given id." });
    }
    return res.json(testCase);
  } catch (err) {
    console.error("Error updating test case:", err);
    return res.status(500).json({ error: "Failed to update the test case." });
  }
});

/** Przenosi test case do tymczasowego kosza. */
app.delete("/api/regression/testcases/:id", async (req, res) => {
  try {
    const movedToTrash = await trash(req.params.id);
    if (!movedToTrash) {
      return res.status(404).json({ error: "No test case found with the given id." });
    }
    return res.status(204).end();
  } catch (err) {
    console.error("Error deleting test case:", err);
    return res.status(500).json({ error: "Failed to delete the test case." });
  }
});

/** Przywraca test case z kosza. */
app.post("/api/regression/trash/:id/restore", async (req, res) => {
  try {
    const restored = await restore(req.params.id);
    if (!restored) {
      return res.status(404).json({ error: "No deleted test case found with the given id." });
    }
    return res.status(204).end();
  } catch (err) {
    console.error("Error restoring test case:", err);
    return res.status(500).json({ error: "Failed to restore the test case." });
  }
});

/** Trwale usuwa test case z kosza razem z zapisanymi wynikami. */
app.delete("/api/regression/trash/:id", async (req, res) => {
  try {
    const deleted = await removeFromTrash(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "No deleted test case found with the given id." });
    }
    await Promise.all([manualResults.deleteResult(req.params.id), e2eResults.deleteResult(req.params.id)]);
    return res.status(204).end();
  } catch (err) {
    console.error("Error permanently deleting test case:", err);
    return res.status(500).json({ error: "Failed to permanently delete the test case." });
  }
});

/** Zapisuje wynik wykonania testu (do magazynu odpowiadającego aktualnej fladze automated). */
app.post("/api/regression/testcases/:id/result", async (req, res) => {
  const testCase = await getById(req.params.id);
  if (!testCase) {
    return res.status(404).json({ error: "No test case found with the given id." });
  }

  const status = req.body?.status;
  if (typeof status !== "string" || !VALID_STATUSES.includes(status as TestStatus)) {
    return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
  }

  try {
    const result = await resultsStoreForTestCase(testCase).setResult(testCase.id, status as TestStatus);
    return res.json(result);
  } catch (err) {
    console.error("Error saving test result:", err);
    return res.status(500).json({ error: "Failed to save the test result." });
  }
});

/** Oznacza test case jako zautomatyzowany — przenosi go z zakładki Manual do E2E. */
app.post("/api/regression/testcases/:id/automate", async (req, res) => {
  try {
    const testCase = await setAutomated(req.params.id, true);
    if (!testCase) {
      return res.status(404).json({ error: "No test case found with the given id." });
    }
    return res.json(testCase);
  } catch (err) {
    console.error("Error marking test case as automated:", err);
    return res.status(500).json({ error: "Failed to mark the test case as automated." });
  }
});

/** Cofa oznaczenie automatyzacji — przenosi test case z powrotem do zakładki Manual. */
app.post("/api/regression/testcases/:id/unautomate", async (req, res) => {
  try {
    const testCase = await setAutomated(req.params.id, false);
    if (!testCase) {
      return res.status(404).json({ error: "No test case found with the given id." });
    }
    return res.json(testCase);
  } catch (err) {
    console.error("Error unmarking test case as automated:", err);
    return res.status(500).json({ error: "Failed to move the test case back to manual." });
  }
});

/** Czyści wszystkie zapisane wyniki danego suite'u — test case'y wracają do statusu "untested". */
app.post("/api/regression/results/clear", async (req, res) => {
  try {
    const suite = parseSuite(req.query.suite ?? req.body?.suite);
    await resultsStoreFor(suite).clearResults();
    return res.status(204).end();
  } catch (err) {
    console.error("Error clearing results:", err);
    return res.status(500).json({ error: "Failed to clear the results." });
  }
});

/** Generuje raport: snapshot aktualnych statusów test case'ów danego suite'u, zapisuje go do historii. */
app.post("/api/regression/reports", async (req, res) => {
  try {
    const suite = parseSuite(req.query.suite ?? req.body?.suite);
    const testCases = await readAll(suite);
    const results = await resultsStoreFor(suite).readResults();

    const summary: StatusCounts = { untested: 0, pass: 0, fail: 0, "not supported": 0 };
    const entries: ReportResultEntry[] = testCases.map((tc) => {
      const status: TestStatus = results[tc.id]?.status ?? "untested";
      summary[status]++;
      return { id: tc.id, section: tc.section, title: tc.title, status };
    });

    const report = await addReport({ type: suite, summary, results: entries });
    return res.status(201).json(report);
  } catch (err) {
    console.error("Error generating report:", err);
    return res.status(500).json({ error: "Failed to generate the report." });
  }
});

/** Lista historycznych raportów danego suite'u (skróty, najnowsze pierwsze). */
app.get("/api/regression/reports", async (req, res) => {
  try {
    const suite = parseSuite(req.query.suite);
    const summaries = await listReports(suite);
    return res.json(summaries);
  } catch (err) {
    console.error("Error reading report history:", err);
    return res.status(500).json({ error: "Failed to read the report history." });
  }
});

/** Pełna treść raportu po id. */
app.get("/api/regression/reports/:id", async (req, res) => {
  try {
    const report = await getReport(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "No report found with the given id." });
    }
    return res.json(report);
  } catch (err) {
    console.error("Error reading report:", err);
    return res.status(500).json({ error: "Failed to read the report." });
  }
});

await initSchema();
const purgedCount = await purgeExpired();
if (purgedCount > 0) {
  console.log(`Purged ${purgedCount} expired regression test case(s) from trash.`);
}

export default app;
