import { test } from "node:test";
import assert from "node:assert/strict";
import { readAll, getById, create, update, remove } from "../../src/regression/testCaseStore.ts";
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

test("readAll: zwraca niepustą listę (zasiloną danymi seed przy pierwszym starcie)", async () => {
  const testCases = await readAll();
  assert.ok(testCases.length > 0);
});

test("create: dodaje test case z nowym id", async () => {
  const created = await create(fakeInput());
  try {
    assert.ok(created.id);
    assert.equal(created.title, "A brand new test case");
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

test("remove: usuwa test case i zwraca true", async () => {
  const created = await create(fakeInput());
  const removed = await remove(created.id);
  assert.equal(removed, true);
  assert.equal(await getById(created.id), undefined);
});

test("remove: zwraca false dla nieznanego id", async () => {
  assert.equal(await remove("nie-istnieje"), false);
});
