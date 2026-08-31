import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { addEntry, getEntry, listSummaries, toSummary } from "../../src/seo/storage.ts";
import type { SeoReport } from "../../src/seo/types.ts";
import { getPool } from "../../src/db.ts";
import type { HistoryEntry } from "../../src/seo/storage.ts";

// Tworzy przykładowy raport do testów. URL jest unikalny na test, żeby wpisy
// dodane przez różne testy (na współdzielonej bazie) się nie mylily.
function fakeReport(score = 80): SeoReport {
  return {
    url: `https://${randomUUID()}.test`,
    statusCode: 200,
    responseTimeMs: 123,
    score,
    checks: [],
    headings: [],
  };
}

async function cleanup(id: string): Promise<void> {
  await getPool().query("DELETE FROM seo_history WHERE id = $1", [id]);
}

test("addEntry: zapisuje raport i nadaje id oraz datę", async () => {
  const report = fakeReport();
  const entry = await addEntry(report);
  try {
    assert.ok(entry.id, "wpis powinien mieć id");
    assert.ok(entry.savedAt, "wpis powinien mieć datę");
    assert.equal(entry.report.url, report.url);

    const found = await getEntry(entry.id);
    assert.equal(found?.report.url, report.url);
  } finally {
    await cleanup(entry.id);
  }
});

test("getEntry: zwraca undefined dla nieznanego id", async () => {
  assert.equal(await getEntry("nie-istnieje"), undefined);
});

test("listSummaries: zawiera dodany wpis (bez pełnego raportu)", async () => {
  const entry = await addEntry(fakeReport(90));
  try {
    const summaries = await listSummaries();
    const found = summaries.find((s) => s.id === entry.id);
    assert.ok(found, "dodany wpis powinien być na liście");
    assert.deepEqual(Object.keys(found).sort(), ["id", "savedAt", "score", "statusCode", "url"]);
    assert.equal(found.score, 90);
  } finally {
    await cleanup(entry.id);
  }
});

test("listSummaries: nowsze wpisy są przed starszymi", async () => {
  const older = await addEntry(fakeReport());
  await new Promise((resolve) => setTimeout(resolve, 10)); // upewnij się, że savedAt się różni
  const newer = await addEntry(fakeReport());
  try {
    const summaries = await listSummaries();
    const olderIndex = summaries.findIndex((s) => s.id === older.id);
    const newerIndex = summaries.findIndex((s) => s.id === newer.id);
    assert.ok(newerIndex < olderIndex, "nowszy wpis powinien być wcześniej na liście");
  } finally {
    await cleanup(older.id);
    await cleanup(newer.id);
  }
});

test("toSummary: mapuje pola z wpisu", () => {
  const entry: HistoryEntry = {
    id: "abc",
    savedAt: "2026-08-06T12:00:00.000Z",
    report: fakeReport(75),
  };
  assert.deepEqual(toSummary(entry), {
    id: "abc",
    savedAt: "2026-08-06T12:00:00.000Z",
    url: entry.report.url,
    score: 75,
    statusCode: 200,
  });
});
