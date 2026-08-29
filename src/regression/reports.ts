import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Report, ReportSummary } from "./types.ts";

// Maksymalna liczba przechowywanych raportów. Starsze są usuwane,
// żeby plik nie rósł w nieskończoność.
const MAX_ENTRIES = 100;

/**
 * Wczytuje wszystkie raporty z pliku.
 * Jeśli plik jeszcze nie istnieje — zwraca pustą listę.
 */
export async function readReports(file: string): Promise<Report[]> {
  try {
    const content = await readFile(file, "utf8");
    const data = JSON.parse(content);
    return Array.isArray(data) ? (data as Report[]) : [];
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

/** Zamienia pełny raport na skrót do listy historii. */
export function toSummary(report: Report): ReportSummary {
  return { id: report.id, generatedAt: report.generatedAt, summary: report.summary };
}

/**
 * Dodaje raport do historii i zapisuje plik.
 * Nowe raporty trafiają na początek; lista jest przycinana do MAX_ENTRIES.
 */
export async function addReport(
  file: string,
  data: Pick<Report, "summary" | "results">,
): Promise<Report> {
  const report: Report = {
    id: randomUUID(),
    generatedAt: new Date().toISOString(),
    ...data,
  };

  const reports = await readReports(file);
  reports.unshift(report);
  const trimmed = reports.slice(0, MAX_ENTRIES);

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(trimmed, null, 2), "utf8");

  return report;
}

/** Zwraca pełny raport po id lub undefined, jeśli nie znaleziono. */
export async function getReport(file: string, id: string): Promise<Report | undefined> {
  const reports = await readReports(file);
  return reports.find((r) => r.id === id);
}

/** Zwraca skróty wszystkich raportów (najnowsze pierwsze). */
export async function listSummaries(file: string): Promise<ReportSummary[]> {
  const reports = await readReports(file);
  return reports.map(toSummary);
}
