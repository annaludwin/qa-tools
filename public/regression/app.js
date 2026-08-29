const listEl = document.getElementById("testcase-list");
const previewEl = document.getElementById("preview");
const generateReportBtn = document.getElementById("generate-report-btn");
const clearResultsBtn = document.getElementById("clear-results-btn");
const addTestCaseBtn = document.getElementById("add-testcase-btn");
const filterBarEl = document.getElementById("status-filter");
const sectionOptionsEl = document.getElementById("section-options");

let selectedId = null;
let allTestCases = [];
const activeStatuses = new Set(["untested", "pass", "fail", "not supported"]);

const STATUS_LABELS = {
  untested: "Untested",
  pass: "Pass",
  fail: "Fail",
  "not supported": "Not Supported",
};

const PLATFORM_OPTIONS = ["Desktop", "Mobile", "Tablet"];

async function loadTestCaseList() {
  const res = await fetch("/api/regression/testcases");
  allTestCases = await res.json();
  renderList(filterTestCases(allTestCases));
  renderSectionOptions(allTestCases);
}

function renderSectionOptions(testCases) {
  const sections = [...new Set(testCases.map((tc) => tc.section))];
  sectionOptionsEl.innerHTML = sections.map((s) => `<option value="${escapeHtml(s)}"></option>`).join("");
}

function filterTestCases(testCases) {
  return testCases.filter((tc) => activeStatuses.has(tc.status));
}

function renderList(testCases) {
  listEl.innerHTML = "";

  if (testCases.length === 0) {
    listEl.innerHTML = `<li class="empty-state">No test cases match the selected filters.</li>`;
    return;
  }

  let lastSection = null;
  for (const tc of testCases) {
    if (tc.section !== lastSection) {
      const heading = document.createElement("li");
      heading.className = "section-header";
      heading.textContent = tc.section;
      listEl.appendChild(heading);
      lastSection = tc.section;
    }

    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "testcase-btn" + (tc.id === selectedId ? " active" : "");
    btn.dataset.id = tc.id;

    const title = document.createElement("span");
    title.className = "testcase-title";
    title.textContent = tc.title;

    const badge = document.createElement("span");
    badge.className = "status-badge";
    badge.dataset.status = tc.status;
    badge.textContent = STATUS_LABELS[tc.status];

    btn.append(title, badge);
    btn.addEventListener("click", () => selectTestCase(tc.id));
    li.appendChild(btn);
    listEl.appendChild(li);
  }
}

async function selectTestCase(id) {
  selectedId = id;
  const res = await fetch(`/api/regression/testcases/${id}`);
  if (!res.ok) {
    previewEl.innerHTML = `<p class="empty-state">Failed to load the test case.</p>`;
    return;
  }
  const testCase = await res.json();
  renderPreview(testCase);
  highlightActiveInList(id);
}

function highlightActiveInList(id) {
  for (const btn of listEl.querySelectorAll(".testcase-btn")) {
    btn.classList.toggle("active", btn.dataset.id === id);
  }
}

function renderPreview(testCase) {
  previewEl.innerHTML = "";

  const header = document.createElement("div");
  header.className = "preview-header";
  header.innerHTML = `
    <h2></h2>
    <div class="preview-header-actions">
      <span class="status-badge" data-status="${testCase.status}">${STATUS_LABELS[testCase.status]}</span>
      <button class="icon-btn" id="edit-testcase-btn" title="Edit">Edit</button>
      <button class="icon-btn icon-btn-danger" id="delete-testcase-btn" title="Delete">Delete</button>
    </div>
  `;
  header.querySelector("h2").textContent = testCase.title;
  header.querySelector("#edit-testcase-btn").addEventListener("click", () => renderTestCaseForm(testCase));
  header.querySelector("#delete-testcase-btn").addEventListener("click", () => deleteTestCase(testCase.id));
  previewEl.appendChild(header);

  previewEl.appendChild(section("Priority", `<p>${escapeHtml(testCase.priority)}</p>`));

  const platformTags = testCase.platforms
    .map((p) => `<span class="platform-tag">${escapeHtml(p)}</span>`)
    .join("");
  previewEl.appendChild(section("Platforms", `<div class="platform-tags">${platformTags}</div>`));

  previewEl.appendChild(section("Preconditions", `<p>${escapeHtml(testCase.preconditions)}</p>`));

  const stepsHtml = `<ol>${testCase.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>`;
  previewEl.appendChild(section("Steps", stepsHtml));

  const expectedHtml = `<ul>${testCase.expectedResult.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`;
  previewEl.appendChild(section("Expected Result", expectedHtml));

  previewEl.appendChild(buildResultPanel(testCase));
}

function section(title, innerHtml) {
  const div = document.createElement("div");
  div.className = "preview-section";
  div.innerHTML = `<h3>${title}</h3>${innerHtml}`;
  return div;
}

function buildResultPanel(testCase) {
  const panel = document.createElement("div");
  panel.className = "result-panel";

  const current = document.createElement("div");
  current.className = "result-current";
  current.innerHTML = `Current status: <span class="status-badge" id="current-status-badge" data-status="${testCase.status}">${STATUS_LABELS[testCase.status]}</span>`;
  panel.appendChild(current);

  const buttons = document.createElement("div");
  buttons.className = "result-buttons";
  for (const status of ["pass", "fail", "not supported"]) {
    const btn = document.createElement("button");
    btn.className = "result-btn";
    btn.dataset.status = status;
    btn.textContent = STATUS_LABELS[status];
    btn.addEventListener("click", () => submitResult(testCase.id, status));
    buttons.appendChild(btn);
  }
  panel.appendChild(buttons);

  return panel;
}

async function submitResult(id, status) {
  const res = await fetch(`/api/regression/testcases/${id}/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    return;
  }

  await selectTestCase(id);
  await loadTestCaseList();
}

function renderTestCaseForm(existing) {
  selectedId = null;
  highlightActiveInList(null);
  previewEl.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = existing ? "Edit Test Case" : "New Test Case";
  previewEl.appendChild(heading);

  const form = document.createElement("form");
  form.className = "testcase-form";
  form.innerHTML = `
    <label class="form-field">
      <span>Title</span>
      <input type="text" id="tc-title" required />
    </label>
    <label class="form-field">
      <span>Section</span>
      <input type="text" id="tc-section" list="section-options" required />
    </label>
    <label class="form-field">
      <span>Priority</span>
      <select id="tc-priority">
        <option value="HIGH">HIGH</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="LOW">LOW</option>
      </select>
    </label>
    <div class="form-field">
      <span>Platforms</span>
      <div class="multiselect" id="tc-platforms-multiselect">
        <button type="button" class="multiselect-toggle" id="tc-platforms-toggle">Select platforms</button>
        <div class="multiselect-menu" id="tc-platforms-menu" hidden>
          ${PLATFORM_OPTIONS.map(
            (p) => `<label><input type="checkbox" value="${escapeHtml(p)}" /> ${escapeHtml(p)}</label>`,
          ).join("")}
        </div>
      </div>
    </div>
    <label class="form-field">
      <span>Preconditions</span>
      <textarea id="tc-preconditions" rows="2" required></textarea>
    </label>
    <label class="form-field">
      <span>Steps <small>(one per line)</small></span>
      <textarea id="tc-steps" rows="5" required></textarea>
    </label>
    <label class="form-field">
      <span>Expected Result <small>(one per line)</small></span>
      <textarea id="tc-expected" rows="4" required></textarea>
    </label>
    <p id="form-error" class="form-error" hidden></p>
    <div class="form-actions">
      <button type="submit" class="toolbar-btn toolbar-btn-primary">Save</button>
      <button type="button" id="cancel-form-btn" class="toolbar-btn toolbar-btn-secondary">Cancel</button>
    </div>
  `;

  const platformsMenu = form.querySelector("#tc-platforms-menu");
  const platformsToggle = form.querySelector("#tc-platforms-toggle");

  if (existing) {
    form.querySelector("#tc-title").value = existing.title;
    form.querySelector("#tc-section").value = existing.section;
    form.querySelector("#tc-priority").value = existing.priority;
    for (const checkbox of platformsMenu.querySelectorAll("input")) {
      checkbox.checked = existing.platforms.includes(checkbox.value);
    }
    form.querySelector("#tc-preconditions").value = existing.preconditions;
    form.querySelector("#tc-steps").value = existing.steps.join("\n");
    form.querySelector("#tc-expected").value = existing.expectedResult.join("\n");
  }
  updatePlatformsToggleLabel(platformsMenu, platformsToggle);

  platformsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    platformsMenu.hidden = !platformsMenu.hidden;
  });
  platformsMenu.addEventListener("change", () => updatePlatformsToggleLabel(platformsMenu, platformsToggle));
  platformsMenu.addEventListener("click", (event) => event.stopPropagation());

  document.addEventListener("click", function closeOnOutsideClick(event) {
    if (!document.body.contains(platformsMenu)) {
      document.removeEventListener("click", closeOnOutsideClick);
      return;
    }
    if (!platformsMenu.hidden && !form.querySelector("#tc-platforms-multiselect").contains(event.target)) {
      platformsMenu.hidden = true;
    }
  });

  form.querySelector("#cancel-form-btn").addEventListener("click", () => {
    if (existing) {
      selectTestCase(existing.id);
    } else {
      previewEl.innerHTML = `<p class="empty-state">Select a test case on the left to see its details.</p>`;
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitTestCaseForm(form, existing ? existing.id : null);
  });

  previewEl.appendChild(form);
}

function updatePlatformsToggleLabel(menu, toggleBtn) {
  const selected = [...menu.querySelectorAll("input:checked")].map((cb) => cb.value);
  toggleBtn.textContent = selected.length > 0 ? selected.join(", ") : "Select platforms";
}

function splitLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

async function submitTestCaseForm(form, existingId) {
  const errorEl = form.querySelector("#form-error");
  const platforms = [...form.querySelectorAll("#tc-platforms-menu input:checked")].map((cb) => cb.value);

  if (platforms.length === 0) {
    errorEl.textContent = "At least one platform is required.";
    errorEl.hidden = false;
    return;
  }

  const payload = {
    title: form.querySelector("#tc-title").value.trim(),
    section: form.querySelector("#tc-section").value.trim(),
    priority: form.querySelector("#tc-priority").value,
    platforms,
    preconditions: form.querySelector("#tc-preconditions").value.trim(),
    steps: splitLines(form.querySelector("#tc-steps").value),
    expectedResult: splitLines(form.querySelector("#tc-expected").value),
  };

  const url = existingId ? `/api/regression/testcases/${existingId}` : "/api/regression/testcases";
  const method = existingId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    errorEl.textContent = body.error || "Failed to save the test case.";
    errorEl.hidden = false;
    return;
  }

  const testCase = await res.json();
  await loadTestCaseList();
  await selectTestCase(testCase.id);
}

async function deleteTestCase(id) {
  const confirmed = window.confirm("Delete this test case? This cannot be undone.");
  if (!confirmed) {
    return;
  }

  const res = await fetch(`/api/regression/testcases/${id}`, { method: "DELETE" });
  if (!res.ok) {
    return;
  }

  selectedId = null;
  previewEl.innerHTML = `<p class="empty-state">Select a test case on the left to see its details.</p>`;
  await loadTestCaseList();
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

async function generateReport() {
  generateReportBtn.disabled = true;
  try {
    const res = await fetch("/api/regression/reports", { method: "POST" });
    if (!res.ok) {
      return;
    }
    const report = await res.json();
    window.open(`report.html?id=${report.id}`, "_blank");
  } finally {
    generateReportBtn.disabled = false;
  }
}

async function clearResults() {
  const confirmed = window.confirm(
    "Clear all test results? Every test case will go back to Untested. This cannot be undone.",
  );
  if (!confirmed) {
    return;
  }

  const res = await fetch("/api/regression/results/clear", { method: "POST" });
  if (!res.ok) {
    return;
  }

  if (selectedId) {
    await selectTestCase(selectedId);
  }
  await loadTestCaseList();
}

function toggleStatusFilter(chip) {
  const status = chip.dataset.status;
  if (activeStatuses.has(status)) {
    activeStatuses.delete(status);
  } else {
    activeStatuses.add(status);
  }
  chip.classList.toggle("active");
  renderList(filterTestCases(allTestCases));
}

generateReportBtn.addEventListener("click", generateReport);
clearResultsBtn.addEventListener("click", clearResults);
addTestCaseBtn.addEventListener("click", () => renderTestCaseForm(null));
for (const chip of filterBarEl.querySelectorAll(".filter-chip")) {
  chip.addEventListener("click", () => toggleStatusFilter(chip));
}

loadTestCaseList();
