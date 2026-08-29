import { test } from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { rm } from "node:fs/promises";
import { readReports, addReport, getReport, listSummaries, toSummary } from "../../src/regression/reports.ts";
import type { Report, ReportResultEntry, StatusCounts } from "../../src/regression/types.ts";

function tempFile(): string {
  return path.join(tmpdir(), `regression-reports-${randomUUID()}.json`);
}

function fakeData(pass = 1): { summary: StatusCounts; results: ReportResultEntry[] } {
  const summary: StatusCounts = { untested: 0, pass, fail: 0, "not supported": 0 };
  const results: ReportResultEntry[] = [
    { id: "tc-1", section: "1. SECTION", title: "Test one", status: "pass" },
  ];
  return { summary, results };
}

test("readReports: nieistniejący plik → pusta lista", async () => {
  const file = tempFile();
  assert.deepEqual(await readReports(file), []);
});

test("addReport: zapisuje raport i nadaje id oraz datę", async () => {
  const file = tempFile();
  try {
    const report = await addReport(file, fakeData());
    assert.ok(report.id, "raport powinien mieć id");
    assert.ok(report.generatedAt, "raport powinien mieć datę");
    assert.equal(report.summary.pass, 1);

    const reports = await readReports(file);
    assert.equal(reports.length, 1);
    assert.equal(reports[0].id, report.id);
  } finally {
    await rm(file, { force: true });
  }
});

test("addReport: najnowszy raport jest pierwszy", async () => {
  const file = tempFile();
  try {
    await addReport(file, fakeData(1));
    const second = await addReport(file, fakeData(2));
    const reports = await readReports(file);
    assert.equal(reports.length, 2);
    assert.equal(reports[0].id, second.id);
  } finally {
    await rm(file, { force: true });
  }
});

test("getReport: znajduje po id oraz zwraca undefined dla nieznanego id", async () => {
  const file = tempFile();
  try {
    const report = await addReport(file, fakeData());
    const found = await getReport(file, report.id);
    assert.equal(found?.id, report.id);
    assert.equal(await getReport(file, "nie-istnieje"), undefined);
  } finally {
    await rm(file, { force: true });
  }
});

test("listSummaries: zwraca skróty (bez pełnej listy wyników)", async () => {
  const file = tempFile();
  try {
    await addReport(file, fakeData(3));
    const summaries = await listSummaries(file);
    assert.equal(summaries.length, 1);
    assert.deepEqual(Object.keys(summaries[0]).sort(), ["generatedAt", "id", "summary"]);
    assert.equal(summaries[0].summary.pass, 3);
  } finally {
    await rm(file, { force: true });
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
