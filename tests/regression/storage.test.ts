import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { manualResults, e2eResults } from "../../src/regression/storage.ts";
import { getPool } from "../../src/db.ts";

// Unikalne id na test, żeby wpisy różnych testów (na współdzielonej bazie) się nie mylily.
function fakeId(): string {
  return `test-${randomUUID()}`;
}

const stores = [
  { label: "manualResults", store: manualResults, table: "regression_results" },
  { label: "e2eResults", store: e2eResults, table: "regression_results_e2e" },
];

for (const { label, store, table } of stores) {
  async function cleanup(...ids: string[]): Promise<void> {
    await getPool().query(`DELETE FROM ${table} WHERE test_case_id = ANY($1)`, [ids]);
  }

  test(`${label}.getResult: brak wpisu → undefined`, async () => {
    assert.equal(await store.getResult(fakeId()), undefined);
  });

  test(`${label}.setResult: zapisuje status i datę`, async () => {
    const id = fakeId();
    try {
      const result = await store.setResult(id, "pass");
      assert.equal(result.status, "pass");
      assert.ok(result.updatedAt, "wynik powinien mieć datę");

      const found = await store.getResult(id);
      assert.equal(found?.status, "pass");
    } finally {
      await cleanup(id);
    }
  });

  test(`${label}.setResult: nadpisuje poprzedni wynik tego samego test case'a`, async () => {
    const id = fakeId();
    try {
      await store.setResult(id, "fail");
      await store.setResult(id, "pass");

      const found = await store.getResult(id);
      assert.equal(found?.status, "pass");
    } finally {
      await cleanup(id);
    }
  });

  test(`${label}.setResult: wyniki różnych test case'ów nie nadpisują się nawzajem`, async () => {
    const id1 = fakeId();
    const id2 = fakeId();
    try {
      await store.setResult(id1, "pass");
      await store.setResult(id2, "not supported");

      assert.equal((await store.getResult(id1))?.status, "pass");
      assert.equal((await store.getResult(id2))?.status, "not supported");
    } finally {
      await cleanup(id1, id2);
    }
  });

  test(`${label}.deleteResult: usuwa wynik jednego test case'a, nie ruszając innych`, async () => {
    const id1 = fakeId();
    const id2 = fakeId();
    try {
      await store.setResult(id1, "pass");
      await store.setResult(id2, "fail");

      await store.deleteResult(id1);

      assert.equal(await store.getResult(id1), undefined);
      assert.equal((await store.getResult(id2))?.status, "fail");
    } finally {
      await cleanup(id1, id2);
    }
  });

  test(`${label}.deleteResult: działa nawet jeśli wpis nie istniał`, async () => {
    await store.deleteResult(fakeId());
  });

  // clearResults() celowo NIE jest tu testowane: czyści całą tabelę wyników,
  // a testy działają na tej samej bazie co produkcja (patrz README) — test
  // wywołujący ją skasowałby prawdziwe wyniki.
}

test("manualResults i e2eResults trzymają wyniki niezależnie (ta sama id nie koliduje między tabelami)", async () => {
  const id = fakeId();
  try {
    await manualResults.setResult(id, "pass");
    await e2eResults.setResult(id, "fail");

    assert.equal((await manualResults.getResult(id))?.status, "pass");
    assert.equal((await e2eResults.getResult(id))?.status, "fail");
  } finally {
    await getPool().query("DELETE FROM regression_results WHERE test_case_id = $1", [id]);
    await getPool().query("DELETE FROM regression_results_e2e WHERE test_case_id = $1", [id]);
  }
});
