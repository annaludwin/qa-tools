// .env jest opcjonalny — lokalnie wczytuje DATABASE_URL z pliku,
// na Render zmienne środowiskowe są ustawiane bezpośrednio w panelu.
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
import { readAll, getById, create, update, remove } from "./regression/testCaseStore.ts";
import type { TestCaseInput } from "./regression/testCaseStore.ts";
import { getResult, readResults, setResult, clearResults, deleteResult } from "./regression/storage.ts";
import { addReport, getReport, listSummaries as listReports } from "./regression/reports.ts";
import type {
  Priority,
  ReportResultEntry,
  StatusCounts,
  TestCaseDetail,
  TestCaseSummary,
  TestStatus,
} from "./regression/types.ts";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

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

/** Lista test case'ów z ich aktualnym statusem (do lewej kolumny). */
app.get("/api/regression/testcases", async (_req, res) => {
  try {
    const testCases = await readAll();
    const summaries: TestCaseSummary[] = await Promise.all(
      testCases.map(async (tc) => {
        const result = await getResult(tc.id);
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
app.get("/api/regression/testcases/:id", async (req, res) => {
  try {
    const testCase = await getById(req.params.id);
    if (!testCase) {
      return res.status(404).json({ error: "No test case found with the given id." });
    }

    const result = await getResult(testCase.id);
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

/** Usuwa test case razem z jego zapisanym wynikiem (jeśli istniał). */
app.delete("/api/regression/testcases/:id", async (req, res) => {
  try {
    const removed = await remove(req.params.id);
    if (!removed) {
      return res.status(404).json({ error: "No test case found with the given id." });
    }
    await deleteResult(req.params.id);
    return res.status(204).end();
  } catch (err) {
    console.error("Error deleting test case:", err);
    return res.status(500).json({ error: "Failed to delete the test case." });
  }
});

/** Zapisuje wynik wykonania testu. */
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
    const result = await setResult(testCase.id, status as TestStatus);
    return res.json(result);
  } catch (err) {
    console.error("Error saving test result:", err);
    return res.status(500).json({ error: "Failed to save the test result." });
  }
});

/** Czyści wszystkie zapisane wyniki — test case'y wracają do statusu "untested". */
app.post("/api/regression/results/clear", async (_req, res) => {
  try {
    await clearResults();
    return res.status(204).end();
  } catch (err) {
    console.error("Error clearing results:", err);
    return res.status(500).json({ error: "Failed to clear the results." });
  }
});

/** Generuje raport: snapshot aktualnych statusów wszystkich test case'ów, zapisuje go do historii. */
app.post("/api/regression/reports", async (_req, res) => {
  try {
    const testCases = await readAll();
    const results = await readResults();

    const summary: StatusCounts = { untested: 0, pass: 0, fail: 0, "not supported": 0 };
    const entries: ReportResultEntry[] = testCases.map((tc) => {
      const status: TestStatus = results[tc.id]?.status ?? "untested";
      summary[status]++;
      return { id: tc.id, section: tc.section, title: tc.title, status };
    });

    const report = await addReport({ summary, results: entries });
    return res.status(201).json(report);
  } catch (err) {
    console.error("Error generating report:", err);
    return res.status(500).json({ error: "Failed to generate the report." });
  }
});

/** Lista historycznych raportów (skróty, najnowsze pierwsze). */
app.get("/api/regression/reports", async (_req, res) => {
  try {
    const summaries = await listReports();
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

app.listen(PORT, () => {
  console.log(`\n✅ QA Tools is running!  Open in your browser:  http://localhost:${PORT}\n`);
});
