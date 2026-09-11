import { test } from "node:test";
import assert from "node:assert/strict";
import { addReport, getReport, listSummaries, toSummary } from "../../src/regression/reports.ts";
import type { Report, ReportResultEntry, StatusCounts, TestSuite } from "../../src/regression/types.ts";
import { getPool } from "../../src/db.ts";

function fakeData(pass = 1, type: TestSuite = "manual"): { type: TestSuite; summary: StatusCounts; results: ReportResultEntry[] } {
  const summary: StatusCounts = { untested: 0, pass, fail: 0, "not supported": 0 };
  const results: ReportResultEntry[] = [
    { id: "tc-1", section: "1. SECTION", title: "Test one", status: "pass" },
  ];
  return { type, summary, results };
}

async function cleanup(id: string): Promise<void> {
  await getPool().query("DELETE FROM regression_reports WHERE id = $1", [id]);
}

test("addReport: zapisuje raport i nadaje id oraz datę", async () => {
  const report = await addReport(fakeData());
  try {
    assert.ok(report.id, "raport powinien mieć id");
    assert.ok(report.generatedAt, "raport powinien mieć datę");
    assert.equal(report.type, "manual");
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

test("listSummaries: zawiera dodany raport tylko w suite, do którego należy", async () => {
  const manualReport = await addReport(fakeData(3, "manual"));
  const e2eReport = await addReport(fakeData(2, "e2e"));
  try {
    const manualSummaries = await listSummaries("manual");
    const foundManual = manualSummaries.find((s) => s.id === manualReport.id);
    assert.ok(foundManual, "raport manual powinien być na liście manual");
    assert.deepEqual(Object.keys(foundManual).sort(), ["generatedAt", "id", "summary", "type"]);
    assert.equal(foundManual.summary.pass, 3);
    assert.equal(manualSummaries.some((s) => s.id === e2eReport.id), false, "raport e2e nie powinien być na liście manual");

    const e2eSummaries = await listSummaries("e2e");
    assert.ok(e2eSummaries.find((s) => s.id === e2eReport.id), "raport e2e powinien być na liście e2e");
  } finally {
    await cleanup(manualReport.id);
    await cleanup(e2eReport.id);
  }
});

test("toSummary: mapuje pola z raportu", () => {
  const report: Report = {
    id: "abc",
    generatedAt: "2026-08-06T12:00:00.000Z",
    type: "manual",
    summary: { untested: 0, pass: 1, fail: 0, "not supported": 0 },
    results: [{ id: "tc-1", section: "1. SECTION", title: "Test one", status: "pass" }],
  };
  assert.deepEqual(toSummary(report), {
    id: "abc",
    generatedAt: "2026-08-06T12:00:00.000Z",
    type: "manual",
    summary: { untested: 0, pass: 1, fail: 0, "not supported": 0 },
  });
});
