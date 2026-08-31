import { test } from "node:test";
import assert from "node:assert/strict";
import { addReport, getReport, listSummaries, toSummary } from "../../src/regression/reports.ts";
import type { Report, ReportResultEntry, StatusCounts } from "../../src/regression/types.ts";
import { getPool } from "../../src/db.ts";

function fakeData(pass = 1): { summary: StatusCounts; results: ReportResultEntry[] } {
  const summary: StatusCounts = { untested: 0, pass, fail: 0, "not supported": 0 };
  const results: ReportResultEntry[] = [
    { id: "tc-1", section: "1. SECTION", title: "Test one", status: "pass" },
  ];
  return { summary, results };
}

async function cleanup(id: string): Promise<void> {
  await getPool().query("DELETE FROM regression_reports WHERE id = $1", [id]);
}

test("addReport: zapisuje raport i nadaje id oraz datę", async () => {
  const report = await addReport(fakeData());
  try {
    assert.ok(report.id, "raport powinien mieć id");
    assert.ok(report.generatedAt, "raport powinien mieć datę");
    assert.equal(report.summary.pass, 1);

    const found = await getReport(report.id);
    assert.equal(found?.id, report.id);
  } finally {
    await cleanup(report.id);
  }
});

test("getReport: zwraca undefined dla nieznanego id", async () => {
  assert.equal(await getReport("nie-istnieje"), undefined);
});

test("listSummaries: zawiera dodany raport (bez pełnej listy wyników)", async () => {
  const report = await addReport(fakeData(3));
  try {
    const summaries = await listSummaries();
    const found = summaries.find((s) => s.id === report.id);
    assert.ok(found, "dodany raport powinien być na liście");
    assert.deepEqual(Object.keys(found).sort(), ["generatedAt", "id", "summary"]);
    assert.equal(found.summary.pass, 3);
  } finally {
    await cleanup(report.id);
  }
});

test("toSummary: mapuje pola z raportu", () => {
  const report: Report = {
    id: "abc",
    generatedAt: "2026-08-06T12:00:00.000Z",
    summary: { untested: 0, pass: 1, fail: 0, "not supported": 0 },
    results: [{ id: "tc-1", section: "1. SECTION", title: "Test one", status: "pass" }],
  };
  assert.deepEqual(toSummary(report), {
    id: "abc",
    generatedAt: "2026-08-06T12:00:00.000Z",
    summary: { untested: 0, pass: 1, fail: 0, "not supported": 0 },
  });
});
