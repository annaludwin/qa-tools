import { randomUUID } from "node:crypto";
import { getPool } from "../db.ts";
import type { SeoReport } from "./types.ts";

// Maksymalna liczba przechowywanych audytów. Starsze są usuwane,
// żeby tabela nie rosła w nieskończoność.
const MAX_ENTRIES = 100;

/** Pojedynczy wpis w historii: raport + metadane zapisu. */
export interface HistoryEntry {
  id: string;
  /** Data zapisu w formacie ISO (np. "2026-08-06T12:00:00.000Z"). */
  savedAt: string;
  report: SeoReport;
}

/** Skrót wpisu — na listę historii (bez pełnego raportu). */
export interface HistorySummary {
  id: string;
  savedAt: string;
  url: string;
  score: number;
  statusCode: number;
}

interface HistoryRow {
  id: string;
  saved_at: Date;
  report: SeoReport;
}

function rowToEntry(row: HistoryRow): HistoryEntry {
  return { id: row.id, savedAt: row.saved_at.toISOString(), report: row.report };
}

/** Zamienia pełny wpis na skrót do listy. */
export function toSummary(entry: HistoryEntry): HistorySummary {
  return {
    id: entry.id,
    savedAt: entry.savedAt,
    url: entry.report.url,
    score: entry.report.score,
    statusCode: entry.report.statusCode,
  };
}

/** Wczytuje całą historię (najnowsze pierwsze). */
export async function readHistory(): Promise<HistoryEntry[]> {
  const pool = getPool();
  const { rows } = await pool.query<HistoryRow>(
    "SELECT id, saved_at, report FROM seo_history ORDER BY saved_at DESC",
  );
  return rows.map(rowToEntry);
}

/**
 * Dodaje raport do historii.
 * Lista jest przycinana do MAX_ENTRIES (starsze wpisy usuwane).
 * Zwraca utworzony wpis (z nadanym id i datą).
 */
export async function addEntry(report: SeoReport): Promise<HistoryEntry> {
  const pool = getPool();
  const entry: HistoryEntry = { id: randomUUID(), savedAt: new Date().toISOString(), report };

  await pool.query("INSERT INTO seo_history (id, saved_at, report) VALUES ($1, $2, $3)", [
    entry.id,
    entry.savedAt,
    JSON.stringify(entry.report),
  ]);
  await pool.query(
    "DELETE FROM seo_history WHERE id NOT IN (SELECT id FROM seo_history ORDER BY saved_at DESC LIMIT $1)",
    [MAX_ENTRIES],
  );

  return entry;
}

/** Zwraca pełny wpis po id lub undefined, jeśli nie znaleziono. */
export async function getEntry(id: string): Promise<HistoryEntry | undefined> {
  const pool = getPool();
  const { rows } = await pool.query<HistoryRow>(
    "SELECT id, saved_at, report FROM seo_history WHERE id = $1",
    [id],
  );
  return rows[0] ? rowToEntry(rows[0]) : undefined;
}

/** Zwraca skróty wszystkich wpisów (najnowsze pierwsze). */
export async function listSummaries(): Promise<HistorySummary[]> {
  const history = await readHistory();
  return history.map(toSummary);
}
