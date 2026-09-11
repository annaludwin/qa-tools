import { test } from "node:test";
import assert from "node:assert/strict";
import { readAll, getById, create, update, remove, setAutomated } from "../../src/regression/testCaseStore.ts";
import type { TestCaseInput } from "../../src/regression/testCaseStore.ts";

function fakeInput(overrides: Partial<TestCaseInput> = {}): TestCaseInput {
  return {
    section: "99. TEST SECTION (auto-generated, safe to ignore)",
    title: "A brand new test case",
    priority: "MEDIUM",
    platforms: ["Desktop"],
    preconditions: "User is logged in",
    steps: ["Do the thing"],
    expectedResult: ["The thing happens"],
    ...overrides,
  };
}

test("readAll: zwraca niepustą listę manual (zasiloną danymi seed przy pierwszym starcie)", async () => {
  const testCases = await readAll("manual");
  assert.ok(testCases.length > 0);
  assert.ok(testCases.every((tc) => tc.automated === false));
});

test("create: dodaje test case z nowym id i automated=false", async () => {
  const created = await create(fakeInput());
  try {
    assert.ok(created.id);
    assert.equal(created.title, "A brand new test case");
    assert.equal(created.automated, false);
  } finally {
    await remove(created.id);
  }
});

test("getById: znajduje po id oraz zwraca undefined dla nieznanego id", async () => {
  const created = await create(fakeInput());
  try {
    const found = await getById(created.id);
    assert.equal(found?.id, created.id);
    assert.equal(await getById("nie-istnieje"), undefined);
  } finally {
    await remove(created.id);
  }
});

test("update: nadpisuje dane istniejącego test case'a, zachowując id", async () => {
  const created = await create(fakeInput());
  try {
    const updated = await update(created.id, fakeInput({ title: "Updated title", priority: "HIGH" }));

    assert.equal(updated?.id, created.id);
    assert.equal(updated?.title, "Updated title");
    assert.equal(updated?.priority, "HIGH");

    const found = await getById(created.id);
    assert.equal(found?.title, "Updated title");
  } finally {
    await remove(created.id);
  }
});

test("update: zwraca undefined dla nieznanego id", async () => {
  const result = await update("nie-istnieje", fakeInput());
  assert.equal(result, undefined);
});

test("setAutomated: przenosi test case między readAll('manual') i readAll('e2e')", async () => {
  const created = await create(fakeInput({ section: "99. E2E SWITCH TEST (auto-generated, safe to ignore)" }));
  try {
    assert.ok((await readAll("manual")).some((tc) => tc.id === created.id));
    assert.ok(!(await readAll("e2e")).some((tc) => tc.id === created.id));

    const automated = await setAutomated(created.id, true);
    assert.equal(automated?.automated, true);

    assert.ok(!(await readAll("manual")).some((tc) => tc.id === created.id));
    assert.ok((await readAll("e2e")).some((tc) => tc.id === created.id));

    const backToManual = await setAutomated(created.id, false);
    assert.equal(backToManual?.automated, false);
    assert.ok((await readAll("manual")).some((tc) => tc.id === created.id));
  } finally {
    await remove(created.id);
  }
});

test("setAutomated: zwraca undefined dla nieznanego id", async () => {
  assert.equal(await setAutomated("nie-istnieje", true), undefined);
});

test("remove: usuwa test case i zwraca true", async () => {
  const created = await create(fakeInput());
  const removed = await remove(created.id);
  assert.equal(removed, true);
  assert.equal(await getById(created.id), undefined);
});

test("remove: zwraca false dla nieznanego id", async () => {
  assert.equal(await remove("nie-istnieje"), false);
});
