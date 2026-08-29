const listEl = document.getElementById("report-list");
const viewEl = document.getElementById("report-view");

let selectedId = new URLSearchParams(window.location.search).get("id");

const STATUS_LABELS = {
  untested: "Untested",
  pass: "Pass",
  fail: "Fail",
  "not supported": "Not Supported",
};

const STATUS_ORDER = ["pass", "fail", "not supported", "untested"];

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

async function loadReportList() {
  const res = await fetch("/api/regression/reports");
  const reports = await res.json();
  renderList(reports);

  if (!selectedId && reports.length > 0) {
    selectedId = reports[0].id;
  }

  if (selectedId) {
    await selectReport(selectedId);
  } else {
    viewEl.innerHTML = `<p class="empty-state">No reports yet. Generate one from the main page.</p>`;
  }
}

function renderList(reports) {
  listEl.innerHTML = "";
  if (reports.length === 0) {
    listEl.innerHTML = `<li class="empty-state">No reports yet.</li>`;
    return;
  }

  for (const report of reports) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "report-btn" + (report.id === selectedId ? " active" : "");
    btn.dataset.id = report.id;

    const date = document.createElement("span");
    date.className = "report-date";
    date.textContent = formatDate(report.generatedAt);

    const counts = document.createElement("span");
    counts.className = "report-counts";
    counts.textContent = `${report.summary.pass} pass · ${report.summary.fail} fail · ${report.summary["not supported"]} n/s · ${report.summary.untested} untested`;

    btn.append(date, counts);
    btn.addEventListener("click", () => selectReport(report.id));
    li.appendChild(btn);
    listEl.appendChild(li);
  }
}

async function selectReport(id) {
  selectedId = id;
  history.replaceState(null, "", `report.html?id=${id}`);
  highlightActiveInList(id);

  const res = await fetch(`/api/regression/reports/${id}`);
  if (!res.ok) {
    viewEl.innerHTML = `<p class="empty-state">Failed to load the report.</p>`;
    return;
  }
  const report = await res.json();
  renderReport(report);
}

function highlightActiveInList(id) {
  for (const btn of listEl.querySelectorAll(".report-btn")) {
    btn.classList.toggle("active", btn.dataset.id === id);
  }
}

function renderReport(report) {
  viewEl.innerHTML = "";

  const header = document.createElement("div");
  header.className = "report-header";
  header.innerHTML = `
    <div>
      <h2>Report</h2>
      <p class="report-generated-at">Generated: ${formatDate(report.generatedAt)}</p>
    </div>
    <button id="print-btn" class="toolbar-btn toolbar-btn-primary no-print">Print / Save as PDF</button>
  `;
  viewEl.appendChild(header);
  header.querySelector("#print-btn").addEventListener("click", () => window.print());

  const stats = document.createElement("div");
  stats.className = "report-stats";
  const total = Object.values(report.summary).reduce((sum, n) => sum + n, 0);
  stats.appendChild(statTile("Total", total, null));
  for (const status of STATUS_ORDER) {
    stats.appendChild(statTile(STATUS_LABELS[status], report.summary[status], status));
  }
  viewEl.appendChild(stats);

  const resultsHeading = document.createElement("h3");
  resultsHeading.className = "report-results-heading";
  resultsHeading.textContent = "Results";
  viewEl.appendChild(resultsHeading);

  const resultsList = document.createElement("ul");
  resultsList.className = "report-results";
  let lastSection = null;
  for (const entry of report.results) {
    if (entry.section !== lastSection) {
      const heading = document.createElement("li");
      heading.className = "section-header";
      heading.textContent = entry.section;
      resultsList.appendChild(heading);
      lastSection = entry.section;
    }

    const li = document.createElement("li");
    li.className = "report-result-row";

    const title = document.createElement("span");
    title.className = "testcase-title";
    title.textContent = entry.title;

    const badge = document.createElement("span");
    badge.className = "status-badge";
    badge.dataset.status = entry.status;
    badge.textContent = STATUS_LABELS[entry.status];

    li.append(title, badge);
    resultsList.appendChild(li);
  }
  viewEl.appendChild(resultsList);
}

function statTile(label, value, status) {
  const tile = document.createElement("div");
  tile.className = "stat-tile";
  if (status) tile.dataset.status = status;
  tile.innerHTML = `<span class="stat-value">${value}</span><span class="stat-label">${label}</span>`;
  return tile;
}

loadReportList();
