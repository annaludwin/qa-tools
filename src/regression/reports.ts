import { randomUUID } from "node:crypto";
import { getPool } from "../db.ts";
import type { Report, ReportResultEntry, ReportSummary, StatusCounts } from "./types.ts";

// Maksymalna liczba przechowywanych raportów. Starsze są usuwane,
// żeby tabela nie rosła w nieskończoność.
const MAX_ENTRIES = 100;

interface ReportRow {
  id: string;
  generated_at: Date;
  summary: StatusCounts;
  results: ReportResultEntry[];
}

function rowToReport(row: ReportRow): Report {
  return {
    id: row.id,
    generatedAt: row.generated_at.toISOString(),
    summary: row.summary,
    results: row.results,
  };
}

/** Zamienia pełny raport na skrót do listy historii. */
export function toSummary(report: Report): ReportSummary {
  return { id: report.id, generatedAt: report.generatedAt, summary: report.summary };
}

/** Wczytuje wszystkie raporty (najnowsze pierwsze). */
export async function readReports(): Promise<Report[]> {
  const pool = getPool();
  const { rows } = await pool.query<ReportRow>(
    "SELECT id, generated_at, summary, results FROM regression_reports ORDER BY generated_at DESC",
  );
  return rows.map(rowToReport);
}

/**
 * Dodaje raport do historii.
 * Lista jest przycinana do MAX_ENTRIES (starsze wpisy usuwane).
 */
export async function addReport(data: Pick<Report, "summary" | "results">): Promise<Report> {
  const pool = getPool();
  const report: Report = { id: randomUUID(), generatedAt: new Date().toISOString(), ...data };

  await pool.query(
    "INSERT INTO regression_reports (id, generated_at, summary, results) VALUES ($1, $2, $3, $4)",
    [report.id, report.generatedAt, JSON.stringify(report.summary), JSON.stringify(report.results)],
  );
  await pool.query(
    "DELETE FROM regression_reports WHERE id NOT IN (SELECT id FROM regression_reports ORDER BY generated_at DESC LIMIT $1)",
    [MAX_ENTRIES],
  );

  return report;
}

/** Zwraca pełny raport po id lub undefined, jeśli nie znaleziono. */
export async function getReport(id: string): Promise<Report | undefined> {
  const pool = getPool();
  const { rows } = await pool.query<ReportRow>(
    "SELECT id, generated_at, summary, results FROM regression_reports WHERE id = $1",
    [id],
  );
  return rows[0] ? rowToReport(rows[0]) : undefined;
}

/** Zwraca skróty wszystkich raportów (najnowsze pierwsze). */
export async function listSummaries(): Promise<ReportSummary[]> {
  const reports = await readReports();
  return reports.map(toSummary);
}
