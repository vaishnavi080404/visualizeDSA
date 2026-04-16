const ROWS = 4,
  COLS = 4;
const BASE_MAT = [
  [3, 17, 8, 42],
  [25, 11, 36, 7],
  [19, 5, 28, 14],
  [33, 2, 45, 21],
];

let currentOp = "access";
let currentLang = "cpp";
let currentCodeOp = "access";
let mainAnimating = false;
let mainMat = deepCopy(BASE_MAT);
let codeEditor, outputDiv;
let currentInputResolver = null;

function deepCopy(m) {
  return m.map((r) => [...r]);
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const PSEUDOS = {
  access: [
    { id: "a1", label: "ACCESS(mat, r, c)", text: "return mat[r][c]" },
    { id: "a2", label: "", text: "// O(1) — direct address" },
    { id: "a3", label: "", text: "addr = base + (r*C + c)*size" },
  ],
  traverse: [
    { id: "t1", label: "TRAVERSE(mat)", text: "for r = 0 to R-1" },
    { id: "t2", label: "", text: "&nbsp;&nbsp;for c = 0 to C-1" },
    { id: "t3", label: "", text: "&nbsp;&nbsp;&nbsp;&nbsp;visit mat[r][c]" },
    { id: "t4", label: "", text: "end for" },
  ],
  sort: [
    { id: "s1", label: "SORT_ROW(mat, r)", text: "sort(mat[r][0..C-1])" },
    { id: "s2", label: "", text: "// using any O(C logC) sort" },
    { id: "s3", label: "SORT_COL(mat, c)", text: "extract col c into tmp[]" },
    { id: "s4", label: "", text: "sort(tmp)  →  put back" },
  ],
  search: [
    { id: "f1", label: "SEARCH(mat, key)", text: "for r = 0 to R-1" },
    { id: "f2", label: "", text: "&nbsp;&nbsp;for c = 0 to C-1" },
    {
      id: "f3",
      label: "",
      text: "&nbsp;&nbsp;&nbsp;&nbsp;if mat[r][c] == key",
    },
    {
      id: "f4",
      label: "",
      text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return (r, c)",
    },
    { id: "f5", label: "", text: "return NOT FOUND" },
  ],
};


function renderMatrix(wrapId, mat, options = {}) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  const R = mat.length,
    C = mat[0].length;
  // col labels
  let colHTML = '<div class="col-labels">';
  for (let c = 0; c < C; c++) colHTML += `<div class="col-label">[${c}]</div>`;
  colHTML += "</div>";

  let html =
    colHTML +
    '<div class="matrix-with-col-labels"><div class="matrix-row-labels">';
  for (let r = 0; r < R; r++) html += `<div class="row-label">[${r}]</div>`;
  html += '</div><div class="matrix-grid-container">';
  for (let r = 0; r < R; r++) {
    html += '<div class="matrix-row">';
    for (let c = 0; c < C; c++) {
      const id = `cell-${wrapId}-${r}-${c}`;
      html += `<div class="m-cell" id="${id}">${mat[r][c]}</div>`;
    }
    html += "</div>";
  }
  html += "</div></div>";
  wrap.innerHTML = html;
}

function getCell(wrapId, r, c) {
  return document.getElementById(`cell-${wrapId}-${r}-${c}`);
}

function hlCell(wrapId, r, c, cls) {
  const el = getCell(wrapId, r, c);
  if (el) {
    el.className = "m-cell " + cls;
  }
}

function clearHL(wrapId, mat) {
  const R = mat.length,
    C = mat[0].length;
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      const el = getCell(wrapId, r, c);
      if (el) el.className = "m-cell";
    }
}

function updateCellVal(wrapId, r, c, val) {
  const el = getCell(wrapId, r, c);
  if (el) el.textContent = val;
}

function setCaption(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function addLog(logId, text, cls = "l-info") {
  const log = document.getElementById(logId);
  if (!log) return;
  const e = document.createElement("div");
  e.className = "log-entry " + cls;
  e.textContent = "> " + text;
  log.appendChild(e);
  log.scrollTop = log.scrollHeight;
}

function highlightPseudo(stepId) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.getElementById("pseudo-" + stepId);
  if (el) el.classList.add("active");
}


function switchOp(op) {
  currentOp = op;
  mainMat = deepCopy(BASE_MAT);
  mainAnimating = false;
  document
    .querySelectorAll(".op-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-op="${op}"]`).classList.add("active");
  const titles = {
    access: "Matrix Visualizer — Accessing",
    traverse: "Matrix Visualizer — Traversal",
    sort: "Matrix Visualizer — Sorting",
    search: "Matrix Visualizer — Searching",
  };
  document.getElementById("viz-title").textContent = titles[op];
  buildPseudo(op);
  buildMainControls(op);
  renderMatrix("main-matrix-wrap", mainMat);
  setCaption("main-caption", "Select an operation below to begin.");
}

function buildPseudo(op) {
  const container = document.getElementById("pseudo-steps");
  container.innerHTML = "";
  PSEUDOS[op].forEach((step) => {
    const d = document.createElement("div");
    d.className = "pseudo-step";
    d.id = "pseudo-" + step.id;
    d.innerHTML =
      (step.label ? `<strong>${step.label}:</strong><br>` : "") + step.text;
    container.appendChild(d);
  });
}

function buildMainControls(op) {
  const footer = document.getElementById("main-controls");
  const ctrls = {
    access: `<div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
      <div><div class="input-label-sm" style="margin-bottom:4px;">Row</div><input type="number" class="form-ctrl" id="m-row" value="1" min="0" max="3" style="width:80px;"></div>
      <div><div class="input-label-sm" style="margin-bottom:4px;">Col</div><input type="number" class="form-ctrl" id="m-col" value="2" min="0" max="3" style="width:80px;"></div>
      <button class="btn btn-primary" onclick="mainAccess()">🎯 Access Cell</button>
      <button class="btn btn-info" onclick="resetMainViz()">↺ Reset</button>
    </div>`,
    traverse: `<div style="display:flex;gap:12px;flex-wrap:wrap;">
      <button class="btn btn-primary" onclick="mainTraverse()">▶ Traverse Row-by-Row</button>
      <button class="btn btn-info" onclick="resetMainViz()">↺ Reset</button>
    </div>`,
    sort: `<div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
      <button class="btn btn-warning" onclick="mainSortRows()">🔢 Sort All Rows</button>
      <button class="btn btn-success" onclick="mainSortCols()">🔢 Sort All Cols</button>
      <button class="btn btn-info"    onclick="resetMainViz()">↺ Reset</button>
    </div>`,
    search: `<div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
      <div><div class="input-label-sm" style="margin-bottom:4px;">Search Value</div>
        <input type="number" class="form-ctrl" id="m-sval" value="28" style="width:100px;"></div>
      <button class="btn btn-warning" onclick="mainSearch()">🔍 Search</button>
      <button class="btn btn-info"    onclick="resetMainViz()">↺ Reset</button>
    </div>`,
  };
  footer.innerHTML = ctrls[op];
}

function resetMainViz() {
  mainAnimating = false;
  mainMat = deepCopy(BASE_MAT);
  renderMatrix("main-matrix-wrap", mainMat);
  setCaption("main-caption", "Select an operation below to begin.");
}


async function mainAccess() {
  if (mainAnimating) return;
  const r = parseInt(document.getElementById("m-row").value);
  const c = parseInt(document.getElementById("m-col").value);
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) {
    setCaption("main-caption", "⚠ Invalid row/col! Range: 0-3");
    return;
  }
  mainAnimating = true;
  clearHL("main-matrix-wrap", mainMat);
  highlightPseudo("a1");
  setCaption(
    "main-caption",
    `Computing address for <span>mat[${r}][${c}]</span>...`,
  );
  await sleep(600);
  highlightPseudo("a3");
  setCaption(
    "main-caption",
    `Address = base + (${r}×${COLS} + ${c}) × size = base + ${r * COLS + c} × size`,
  );
  await sleep(800);
  hlCell("main-matrix-wrap", r, c, "m-cell hl-access");
  highlightPseudo("a2");
  setCaption(
    "main-caption",
    `✅ <span>mat[${r}][${c}] = ${mainMat[r][c]}</span> — Direct access! Time: <span>O(1)</span>`,
  );
  mainAnimating = false;
}


async function mainTraverse() {
  if (mainAnimating) return;
  mainAnimating = true;
  clearHL("main-matrix-wrap", mainMat);
  setCaption("main-caption", "Starting row-by-row traversal...");
  highlightPseudo("t1");
  await sleep(500);
  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    highlightPseudo("t2");
    for (let c = 0; c < COLS; c++) {
      if (!mainAnimating) return;
      highlightPseudo("t3");
      hlCell("main-matrix-wrap", r, c, "m-cell hl-traverse");
      setCaption(
        "main-caption",
        `Visiting <span>mat[${r}][${c}] = ${mainMat[r][c]}</span> — step ${++count} of ${ROWS * COLS}`,
      );
      await sleep(300);
      hlCell("main-matrix-wrap", r, c, "m-cell hl-visited");
    }
  }
  highlightPseudo("t4");
  setCaption(
    "main-caption",
    `✅ Traversal complete! Visited <span>${ROWS * COLS}</span> cells. Time: <span>O(R×C)</span>`,
  );
  mainAnimating = false;
}


async function mainSortRows() {
  if (mainAnimating) return;
  mainAnimating = true;
  highlightPseudo("s1");
  setCaption(
    "main-caption",
    "Sorting each row individually using insertion sort...",
  );
  for (let r = 0; r < ROWS; r++) {
    if (!mainAnimating) return;
    // mark row
    for (let c = 0; c < COLS; c++)
      hlCell("main-matrix-wrap", r, c, "m-cell hl-sort-row");
    setCaption(
      "main-caption",
      `<span>Sorting row ${r}:</span> [${mainMat[r].join(", ")}]`,
    );
    await sleep(500);
    // insertion sort with animation
    for (let i = 1; i < COLS; i++) {
      let key = mainMat[r][i],
        j = i - 1;
      hlCell("main-matrix-wrap", r, i, "m-cell hl-sort-cmp");
      await sleep(280);
      while (j >= 0 && mainMat[r][j] > key) {
        mainMat[r][j + 1] = mainMat[r][j];
        hlCell("main-matrix-wrap", r, j, "m-cell hl-swap");
        updateCellVal("main-matrix-wrap", r, j + 1, mainMat[r][j + 1]);
        await sleep(220);
        hlCell("main-matrix-wrap", r, j, "m-cell hl-sort-row");
        hlCell("main-matrix-wrap", r, j + 1, "m-cell hl-sort-row");
        j--;
      }
      mainMat[r][j + 1] = key;
      updateCellVal("main-matrix-wrap", r, j + 1, key);
      await sleep(150);
    }
    for (let c = 0; c < COLS; c++)
      hlCell("main-matrix-wrap", r, c, "m-cell hl-sort-done");
    await sleep(300);
  }
  setCaption(
    "main-caption",
    `✅ All rows sorted! Each row sorted independently. Time: <span>O(R × C log C)</span>`,
  );
  mainAnimating = false;
}

async function mainSortCols() {
  if (mainAnimating) return;
  mainAnimating = true;
  highlightPseudo("s3");
  setCaption("main-caption", "Sorting each column individually...");
  for (let c = 0; c < COLS; c++) {
    if (!mainAnimating) return;
    for (let r = 0; r < ROWS; r++)
      hlCell("main-matrix-wrap", r, c, "m-cell hl-sort-row");
    let col = mainMat.map((row) => row[c]);
    setCaption(
      "main-caption",
      `<span>Sorting col ${c}:</span> [${col.join(", ")}]`,
    );
    await sleep(500);
    highlightPseudo("s4");
    // insertion sort on column
    for (let i = 1; i < ROWS; i++) {
      let key = col[i],
        j = i - 1;
      hlCell("main-matrix-wrap", i, c, "m-cell hl-sort-cmp");
      await sleep(280);
      while (j >= 0 && col[j] > key) {
        col[j + 1] = col[j];
        mainMat[j + 1][c] = col[j + 1];
        hlCell("main-matrix-wrap", j, c, "m-cell hl-swap");
        updateCellVal("main-matrix-wrap", j + 1, c, col[j + 1]);
        await sleep(220);
        hlCell("main-matrix-wrap", j, c, "m-cell hl-sort-row");
        hlCell("main-matrix-wrap", j + 1, c, "m-cell hl-sort-row");
        j--;
      }
      col[j + 1] = key;
      mainMat[j + 1][c] = key;
      updateCellVal("main-matrix-wrap", j + 1, c, key);
      await sleep(150);
    }
    for (let r = 0; r < ROWS; r++)
      hlCell("main-matrix-wrap", r, c, "m-cell hl-sort-done");
    await sleep(300);
  }
  setCaption(
    "main-caption",
    `✅ All columns sorted! Time: <span>O(C × R log R)</span>`,
  );
  mainAnimating = false;
}


async function mainSearch() {
  if (mainAnimating) return;
  const target = parseInt(document.getElementById("m-sval").value);
  if (isNaN(target)) {
    setCaption("main-caption", "⚠ Enter a valid search value");
    return;
  }
  mainAnimating = true;
  clearHL("main-matrix-wrap", mainMat);
  setCaption("main-caption", `Searching for <span>${target}</span>...`);
  highlightPseudo("f1");
  await sleep(400);
  let found = false;
  for (let r = 0; r < ROWS && !found; r++) {
    highlightPseudo("f2");
    for (let c = 0; c < COLS; c++) {
      if (!mainAnimating) return;
      highlightPseudo("f3");
      hlCell("main-matrix-wrap", r, c, "m-cell hl-search");
      setCaption(
        "main-caption",
        `Checking <span>mat[${r}][${c}] = ${mainMat[r][c]}</span> vs ${target}...`,
      );
      await sleep(350);
      if (mainMat[r][c] === target) {
        highlightPseudo("f4");
        hlCell("main-matrix-wrap", r, c, "m-cell hl-found");
        setCaption(
          "main-caption",
          `✅ Found <span>${target}</span> at <span>mat[${r}][${c}]</span>! Time: <span>O(R×C)</span>`,
        );
        found = true;
        break;
      }
      hlCell("main-matrix-wrap", r, c, "m-cell hl-miss");
      await sleep(100);
    }
  }
  if (!found) {
    highlightPseudo("f5");
    setCaption(
      "main-caption",
      `❌ <span>${target}</span> not found. Checked all <span>${ROWS * COLS}</span> cells. Worst case: <span>O(R×C)</span>`,
    );
  }
  mainAnimating = false;
}

const BEST_MAT = [
  [7, 14, 21, 28],
  [35, 42, 49, 56],
  [63, 70, 77, 84],
  [91, 98, 105, 112],
];
function initBest() {
  renderMatrix("best-matrix", BEST_MAT);
  setCaption("best-caption", "Click a button to see O(1) direct access.");
  document.getElementById("log-best").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-best",
    `Matrix: ${ROWS}×${COLS}  (${ROWS * COLS} cells)`,
    "l-info",
  );
  addLog("log-best", "Best Case: O(1) — index directly", "l-info");
}
function bestAccess() {
  clearHL("best-matrix", BEST_MAT);
  hlCell("best-matrix", 1, 2, "m-cell hl-access");
  setCaption(
    "best-caption",
    `<span>mat[1][2] = ${BEST_MAT[1][2]}</span> — Accessed in <span class="g">O(1)</span>. No loops, direct memory jump.`,
  );
  addLog(
    "log-best",
    `mat[1][2] = ${BEST_MAT[1][2]}  →  O(1)  direct access`,
    "l-access",
  );
  addLog("log-best", "✓ Best Case confirmed: constant time", "l-result");
}
function bestAccessCorner() {
  clearHL("best-matrix", BEST_MAT);
  hlCell("best-matrix", 0, 0, "m-cell hl-access");
  setCaption(
    "best-caption",
    `<span>mat[0][0] = ${BEST_MAT[0][0]}</span> — First element. Always <span class="g">O(1)</span>.`,
  );
  addLog(
    "log-best",
    `mat[0][0] = ${BEST_MAT[0][0]}  →  O(1)  first element`,
    "l-access",
  );
  addLog("log-best", "✓ O(1): regardless of matrix size", "l-result");
}
function resetBest() {
  initBest();
  addLog("log-best", "↺ Reset.", "l-info");
}


const AVG_MAT = [
  [3, 8, 12, 17],
  [20, 25, 30, 35],
  [40, 45, 50, 55],
  [60, 65, 70, 75],
];
const AVG_TARGET = 25; // at [1][1] — roughly middle
let avgR = 0,
  avgC = 0,
  avgDone = false,
  avgAutoTimer = null;

function initAvg() {
  avgR = 0;
  avgC = 0;
  avgDone = false;
  clearTimeout(avgAutoTimer);
  renderMatrix("avg-matrix", AVG_MAT);
  setCaption(
    "avg-caption",
    `Press Next Step to search for <span style="color:var(--primary-cyan);font-weight:700;">${AVG_TARGET}</span> row by row.`,
  );
  document.getElementById("log-avg").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-avg",
    `Target: ${AVG_TARGET}  (at mat[1][1] — near middle)`,
    "l-info",
  );
  addLog(
    "log-avg",
    `Cells before finding: ~${(ROWS * COLS) / 2}  (average case)`,
    "l-info",
  );
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}

function avgStep() {
  if (avgDone || avgR >= ROWS) return;
  const r = avgR,
    c = avgC,
    val = AVG_MAT[r][c];
  clearHL("avg-matrix", AVG_MAT);
  // re-shade visited
  let pr = 0,
    pc = 0;
  while (pr < r || (pr === r && pc < c)) {
    hlCell("avg-matrix", pr, pc, "m-cell hl-miss");
    pc++;
    if (pc >= COLS) {
      pc = 0;
      pr++;
    }
  }
  hlCell("avg-matrix", r, c, "m-cell hl-search");
  setCaption(
    "avg-caption",
    `Checking <span>mat[${r}][${c}] = ${val}</span> vs <span>${AVG_TARGET}</span>...`,
  );
  if (val === AVG_TARGET) {
    hlCell("avg-matrix", r, c, "m-cell hl-found");
    const steps = r * COLS + c + 1;
    setCaption(
      "avg-caption",
      `✅ Found <span>${AVG_TARGET}</span> at <span>mat[${r}][${c}]</span>! Steps: ${steps} ≈ R×C/2.`,
    );
    addLog("log-avg", `mat[${r}][${c}] = ${val}  ← FOUND! 🎉`, "l-found");
    addLog(
      "log-avg",
      `Steps: ${steps} ≈ R×C/2 = ${Math.floor((ROWS * COLS) / 2)}  (Average Case)`,
      "l-result",
    );
    avgDone = true;
    document.getElementById("avg-step-btn").disabled = true;
    document.getElementById("avg-auto-btn").disabled = true;
    clearTimeout(avgAutoTimer);
    return;
  }
  addLog("log-avg", `mat[${r}][${c}] = ${val}  ≠  ${AVG_TARGET}`, "l-search");
  avgC++;
  if (avgC >= COLS) {
    avgC = 0;
    avgR++;
  }
  if (avgR >= ROWS && !avgDone) {
    avgDone = true;
    setCaption("avg-caption", "Not found after full scan.");
  }
}

function avgAuto() {
  if (avgDone || avgR >= ROWS) return;
  document.getElementById("avg-auto-btn").disabled = true;
  function step() {
    if (avgDone || avgR >= ROWS) return;
    avgStep();
    avgAutoTimer = setTimeout(step, 700);
  }
  step();
}
function resetAvg() {
  clearTimeout(avgAutoTimer);
  initAvg();
}


const WORST_MAT = [
  [5, 10, 15, 20],
  [25, 30, 35, 40],
  [45, 50, 55, 60],
  [65, 70, 75, 80],
];
const WORST_TARGET = 99;
let wR = 0,
  wC = 0,
  wDone = false,
  wAutoTimer = null;

function initWorst() {
  wR = 0;
  wC = 0;
  wDone = false;
  clearTimeout(wAutoTimer);
  renderMatrix("worst-matrix", WORST_MAT);
  setCaption(
    "worst-caption",
    `Searching for <span class="r">${WORST_TARGET}</span> — NOT in matrix. Must scan all ${ROWS * COLS} cells.`,
  );
  document.getElementById("log-worst").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-worst",
    `Target: ${WORST_TARGET}  (absent from matrix)`,
    "l-warn",
  );
  addLog("log-worst", `Must check ALL ${ROWS * COLS} cells → O(R×C)`, "l-warn");
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}

function worstStep() {
  if (wDone || wR >= ROWS) return;
  const r = wR,
    c = wC,
    val = WORST_MAT[r][c];
  hlCell("worst-matrix", r, c, "m-cell hl-miss");
  setCaption(
    "worst-caption",
    `<span>mat[${r}][${c}] = ${val}</span> ≠ ${WORST_TARGET} — Not here...`,
  );
  addLog(
    "log-worst",
    `mat[${r}][${c}] = ${val}  ≠  ${WORST_TARGET}`,
    "l-search",
  );
  wC++;
  if (wC >= COLS) {
    wC = 0;
    wR++;
  }
  if (wR >= ROWS) {
    wDone = true;
    setTimeout(() => {
      setCaption(
        "worst-caption",
        `❌ <span class="r">${WORST_TARGET}</span> not found. Checked <span>${ROWS * COLS}</span> cells. Worst Case: <span class="o">O(R×C)</span>.`,
      );
      addLog(
        "log-worst",
        `All ${ROWS * COLS} cells checked — not found ❌`,
        "l-warn",
      );
      addLog(
        "log-worst",
        `✓ Worst Case: O(R×C) = O(${ROWS * COLS})`,
        "l-result",
      );
    }, 300);
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
    clearTimeout(wAutoTimer);
  }
}

function worstAuto() {
  if (wDone || wR >= ROWS) return;
  document.getElementById("worst-auto-btn").disabled = true;
  function step() {
    if (wDone || wR >= ROWS) return;
    worstStep();
    wAutoTimer = setTimeout(step, 400);
  }
  step();
}
function resetWorst() {
  clearTimeout(wAutoTimer);
  initWorst();
}


let customMat = deepCopy(BASE_MAT);
let customAnimating = false;

function initCustom() {
  customMat = deepCopy(BASE_MAT);
  renderMatrix("custom-matrix", customMat);
  setCaption("custom-caption", "Choose any operation to experiment!");
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog("log-custom", `Matrix initialized: ${ROWS}×${COLS}`, "l-info");
}

let ccTimer = null;
function hlCC(type) {
  ["access", "traverse", "sort", "search"].forEach((t) => {
    const c = document.getElementById("ccc-" + t);
    if (c)
      c.classList.remove(
        `cc-active-access`,
        "cc-active-traverse",
        "cc-active-sort",
        "cc-active-search",
      );
  });
  clearTimeout(ccTimer);
  const card = document.getElementById("ccc-" + type);
  if (card) {
    card.classList.add("cc-active-" + type);
    ccTimer = setTimeout(
      () => card.classList.remove("cc-active-" + type),
      2000,
    );
  }
}
function showToast(type, msg) {
  const t = document.getElementById("cc-toast");
  t.className = "cc-toast show t-" + type;
  document.getElementById("cc-ti").textContent =
    { access: "🎯", traverse: "🔄", sort: "🔢", search: "🔍", warn: "⚠" }[
      type
    ] || "⚡";
  document.getElementById("cc-tt").textContent = msg;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => (t.className = "cc-toast"), 2500);
}

function getInputs() {
  return {
    r: parseInt(document.getElementById("c-row").value) || 0,
    c: parseInt(document.getElementById("c-col").value) || 0,
    sv: parseInt(document.getElementById("c-sval").value) || 0,
  };
}

async function cAccess() {
  if (customAnimating) return;
  const { r, c } = getInputs();
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) {
    showToast("warn", "Row/Col out of range! (0-3)");
    return;
  }
  customAnimating = true;
  clearHL("custom-matrix", customMat);
  await sleep(200);
  hlCell("custom-matrix", r, c, "m-cell hl-access");
  setCaption(
    "custom-caption",
    `<span>mat[${r}][${c}] = ${customMat[r][c]}</span> — Accessed in <span class="g">O(1)</span>.`,
  );
  hlCC("access");
  showToast("access", `access(${r},${c}) = ${customMat[r][c]}  →  O(1)`);
  addLog(
    "log-custom",
    `access(${r},${c}) = ${customMat[r][c]}  →  O(1)`,
    "l-access",
  );
  addLog("log-custom", "✓ Time: O(1)  |  Space: O(1)", "l-result");
  customAnimating = false;
}

async function cTraverse() {
  if (customAnimating) return;
  customAnimating = true;
  clearHL("custom-matrix", customMat);
  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!customAnimating) return;
      hlCell("custom-matrix", r, c, "m-cell hl-traverse");
      setCaption(
        "custom-caption",
        `Visiting <span>mat[${r}][${c}] = ${customMat[r][c]}</span> — cell ${++count}/${ROWS * COLS}`,
      );
      await sleep(280);
      hlCell("custom-matrix", r, c, "m-cell hl-visited");
    }
  }
  setCaption(
    "custom-caption",
    `✅ Traversal done! Visited <span>${ROWS * COLS}</span> cells. Time: <span class="o">O(R×C)</span>`,
  );
  hlCC("traverse");
  showToast("traverse", `traverse()  →  O(R×C) = O(${ROWS * COLS})`);
  addLog(
    "log-custom",
    `traverse(): visited ${ROWS * COLS} cells`,
    "l-traverse",
  );
  addLog("log-custom", "✓ Time: O(R×C)  |  Space: O(1)", "l-result");
  customAnimating = false;
}

async function cSortRow() {
  if (customAnimating) return;
  const { r } = getInputs();
  if (r < 0 || r >= ROWS) {
    showToast("warn", "Row out of range! (0-3)");
    return;
  }
  customAnimating = true;
  clearHL("custom-matrix", customMat);
  for (let c = 0; c < COLS; c++)
    hlCell("custom-matrix", r, c, "m-cell hl-sort-row");
  setCaption(
    "custom-caption",
    `Sorting <span>row ${r}</span>: [${customMat[r].join(", ")}]...`,
  );
  await sleep(400);
  for (let i = 1; i < COLS; i++) {
    let key = customMat[r][i],
      j = i - 1;
    hlCell("custom-matrix", r, i, "m-cell hl-sort-cmp");
    await sleep(250);
    while (j >= 0 && customMat[r][j] > key) {
      customMat[r][j + 1] = customMat[r][j];
      hlCell("custom-matrix", r, j, "m-cell hl-swap");
      updateCellVal("custom-matrix", r, j + 1, customMat[r][j + 1]);
      await sleep(220);
      hlCell("custom-matrix", r, j, "m-cell hl-sort-row");
      hlCell("custom-matrix", r, j + 1, "m-cell hl-sort-row");
      j--;
    }
    customMat[r][j + 1] = key;
    updateCellVal("custom-matrix", r, j + 1, key);
  }
  for (let c = 0; c < COLS; c++)
    hlCell("custom-matrix", r, c, "m-cell hl-sort-done");
  setCaption(
    "custom-caption",
    `✅ Row ${r} sorted: [${customMat[r].join(", ")}]. Time: <span class="o">O(C log C)</span>`,
  );
  hlCC("sort");
  showToast("sort", `sortRow(${r})  →  O(C log C)`);
  addLog("log-custom", `sortRow(${r}): [${customMat[r].join(", ")}]`, "l-sort");
  addLog("log-custom", "✓ Time: O(C log C)  |  Space: O(1)", "l-result");
  customAnimating = false;
}

async function cSortCol() {
  if (customAnimating) return;
  const { c } = getInputs();
  if (c < 0 || c >= COLS) {
    showToast("warn", "Col out of range! (0-3)");
    return;
  }
  customAnimating = true;
  clearHL("custom-matrix", customMat);
  let col = customMat.map((row) => row[c]);
  for (let r = 0; r < ROWS; r++)
    hlCell("custom-matrix", r, c, "m-cell hl-sort-row");
  setCaption(
    "custom-caption",
    `Sorting <span>column ${c}</span>: [${col.join(", ")}]...`,
  );
  await sleep(400);
  for (let i = 1; i < ROWS; i++) {
    let key = col[i],
      j = i - 1;
    hlCell("custom-matrix", i, c, "m-cell hl-sort-cmp");
    await sleep(250);
    while (j >= 0 && col[j] > key) {
      col[j + 1] = col[j];
      customMat[j + 1][c] = col[j + 1];
      hlCell("custom-matrix", j, c, "m-cell hl-swap");
      updateCellVal("custom-matrix", j + 1, c, col[j + 1]);
      await sleep(220);
      hlCell("custom-matrix", j, c, "m-cell hl-sort-row");
      hlCell("custom-matrix", j + 1, c, "m-cell hl-sort-row");
      j--;
    }
    col[j + 1] = key;
    customMat[j + 1][c] = key;
    updateCellVal("custom-matrix", j + 1, c, key);
  }
  for (let r = 0; r < ROWS; r++)
    hlCell("custom-matrix", r, c, "m-cell hl-sort-done");
  const colVals = customMat.map((row) => row[c]);
  setCaption(
    "custom-caption",
    `✅ Column ${c} sorted: [${colVals.join(", ")}]. Time: <span class="o">O(R log R)</span>`,
  );
  hlCC("sort");
  showToast("sort", `sortCol(${c})  →  O(R log R)`);
  addLog("log-custom", `sortCol(${c}): [${colVals.join(", ")}]`, "l-sort");
  addLog("log-custom", "✓ Time: O(R log R)  |  Space: O(1)", "l-result");
  customAnimating = false;
}

async function cSearch() {
  if (customAnimating) return;
  const target = getInputs().sv;
  if (isNaN(target)) {
    showToast("warn", "Enter a search value!");
    return;
  }
  customAnimating = true;
  clearHL("custom-matrix", customMat);
  setCaption("custom-caption", `Searching for <span>${target}</span>...`);
  let found = false;
  for (let r = 0; r < ROWS && !found; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!customAnimating) return;
      hlCell("custom-matrix", r, c, "m-cell hl-search");
      setCaption(
        "custom-caption",
        `Checking <span>mat[${r}][${c}] = ${customMat[r][c]}</span> vs <span>${target}</span>...`,
      );
      await sleep(300);
      if (customMat[r][c] === target) {
        hlCell("custom-matrix", r, c, "m-cell hl-found");
        setCaption(
          "custom-caption",
          `✅ Found <span>${target}</span> at <span>mat[${r}][${c}]</span>!`,
        );
        hlCC("search");
        showToast("search", `search(${target}) found at [${r}][${c}]`);
        addLog(
          "log-custom",
          `search(${target}) → mat[${r}][${c}]  FOUND!`,
          "l-found",
        );
        addLog("log-custom", "✓ Time: O(R×C)  |  Space: O(1)", "l-result");
        found = true;
        break;
      }
      hlCell("custom-matrix", r, c, "m-cell hl-miss");
      await sleep(80);
    }
  }
  if (!found) {
    setCaption(
      "custom-caption",
      `❌ <span>${target}</span> not found in matrix.`,
    );
    showToast("warn", `${target} not found`);
    addLog("log-custom", `search(${target}) → not found`, "l-warn");
  }
  customAnimating = false;
}

function resetCustom() {
  customAnimating = false;
  customMat = deepCopy(BASE_MAT);
  ["access", "traverse", "sort", "search"].forEach((t) => {
    const c = document.getElementById("ccc-" + t);
    if (c)
      c.classList.remove(
        "cc-active-access",
        "cc-active-traverse",
        "cc-active-sort",
        "cc-active-search",
      );
  });
  const toast = document.getElementById("cc-toast");
  if (toast) toast.className = "cc-toast";
  initCustom();
  addLog("log-custom", "↺ Reset to base matrix.", "l-info");
}


const TAB_CLS = {
  best: "active-best",
  avg: "active-avg",
  worst: "active-worst",
  custom: "active-custom",
};
function switchScenario(name) {
  document
    .querySelectorAll(".scenario-tab")
    .forEach((t) => (t.className = "scenario-tab"));
  document.getElementById("stab-" + name).classList.add(TAB_CLS[name]);
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}


const CODE = {
  access: {
    cpp: `#include <iostream>
using namespace std;

int main() {
    int rows, cols;
    cout << "Enter rows and cols: ";
    cin >> rows >> cols;

    int mat[10][10];
    cout << "Enter matrix elements:\\n";
    for(int i = 0; i < rows; i++)
        for(int j = 0; j < cols; j++) {
            cout << "mat[" << i << "][" << j << "]: ";
            cin >> mat[i][j];
        }

    int r, c;
    cout << "Enter row and column to access: ";
    cin >> r >> c;

    if(r >= 0 && r < rows && c >= 0 && c < cols)
        cout << "mat[" << r << "][" << c << "] = " << mat[r][c] << "\\n";
    else
        cout << "Invalid index!\\n";

    cout << "Time: O(1) — direct address calculation\\n";
    return 0;
}`,
    python: `def access_element(mat, r, c):
    rows, cols = len(mat), len(mat[0])
    if 0 <= r < rows and 0 <= c < cols:
        return mat[r][c]
    return None

rows = int(input("Enter rows: "))
cols = int(input("Enter cols: "))

mat = []
for i in range(rows):
    row = []
    for j in range(cols):
        val = int(input(f"mat[{i}][{j}]: "))
        row.append(val)
    mat.append(row)

r = int(input("Enter row to access: "))
c = int(input("Enter col to access: "))

val = access_element(mat, r, c)
if val is not None:
    print(f"mat[{r}][{c}] = {val}")
else:
    print("Invalid index!")
print("Time: O(1) — direct address calculation")`,
    java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter rows: "); int rows = sc.nextInt();
        System.out.print("Enter cols: "); int cols = sc.nextInt();
        int[][] mat = new int[rows][cols];
        System.out.println("Enter matrix elements:");
        for(int i = 0; i < rows; i++)
            for(int j = 0; j < cols; j++) {
                System.out.print("mat["+i+"]["+j+"]: ");
                mat[i][j] = sc.nextInt();
            }
        System.out.print("Row to access: "); int r = sc.nextInt();
        System.out.print("Col to access: "); int c = sc.nextInt();
        if(r >= 0 && r < rows && c >= 0 && c < cols)
            System.out.println("mat["+r+"]["+c+"] = "+mat[r][c]);
        else System.out.println("Invalid index!");
        System.out.println("Time: O(1)");
    }
}`,
    c: `#include <stdio.h>

int main() {
    int rows, cols;
    printf("Enter rows and cols: ");
    scanf("%d %d", &rows, &cols);

    int mat[10][10];
    printf("Enter matrix elements:\\n");
    for(int i = 0; i < rows; i++)
        for(int j = 0; j < cols; j++) {
            printf("mat[%d][%d]: ", i, j);
            scanf("%d", &mat[i][j]);
        }

    int r, c;
    printf("Enter row and col to access: ");
    scanf("%d %d", &r, &c);

    if(r >= 0 && r < rows && c >= 0 && c < cols)
        printf("mat[%d][%d] = %d\\n", r, c, mat[r][c]);
    else printf("Invalid index!\\n");

    printf("Time: O(1)\\n");
    return 0;
}`,
    javascript: `function accessElement(mat, r, c) {
    const rows = mat.length, cols = mat[0].length;
    if(r >= 0 && r < rows && c >= 0 && c < cols)
        return mat[r][c];
    return null;
}

// Demo matrix
const mat = [
    [3,  17,  8, 42],
    [25, 11, 36,  7],
    [19,  5, 28, 14],
    [33,  2, 45, 21]
];

console.log("Matrix:");
mat.forEach((row, i) => console.log(\`  [\${row.join(', ')}]\`));

const r = 1, c = 2;
const val = accessElement(mat, r, c);
console.log(\`\\nmat[\${r}][\${c}] = \${val}\`);
console.log("Time: O(1) — direct access");`,
  },
  traverse: {
    cpp: `#include <iostream>
using namespace std;

void traverseMatrix(int mat[][10], int rows, int cols) {
    cout << "Row-by-row traversal:\\n";
    for(int i = 0; i < rows; i++) {
        cout << "Row " << i << ": ";
        for(int j = 0; j < cols; j++) {
            cout << "mat[" << i << "][" << j << "]=" << mat[i][j];
            if(j < cols-1) cout << "  ";
        }
        cout << "\\n";
    }
    cout << "\\nTotal cells visited: " << rows*cols << "\\n";
    cout << "Time: O(R×C)  |  Space: O(1)\\n";
}

int main() {
    int rows, cols;
    cout << "Enter rows and cols: ";
    cin >> rows >> cols;
    int mat[10][10];
    for(int i=0;i<rows;i++)
        for(int j=0;j<cols;j++) {
            cout << "mat[" << i << "][" << j << "]: ";
            cin >> mat[i][j];
        }
    traverseMatrix(mat, rows, cols);
    return 0;
}`,
    python: `def traverse_matrix(mat):
    rows, cols = len(mat), len(mat[0])
    print("Row-by-row traversal:")
    for i in range(rows):
        print(f"  Row {i}:", end=" ")
        for j in range(cols):
            print(f"mat[{i}][{j}]={mat[i][j]}", end="  ")
        print()
    print(f"\\nTotal cells: {rows * cols}")
    print(f"Time: O(R×C)  |  Space: O(1)")

rows = int(input("Enter rows: "))
cols = int(input("Enter cols: "))
mat = []
for i in range(rows):
    row = [int(input(f"mat[{i}][{j}]: ")) for j in range(cols)]
    mat.append(row)
traverse_matrix(mat)`,
    java: `import java.util.Scanner;

public class Main {
    static void traverse(int[][] mat) {
        int rows = mat.length, cols = mat[0].length;
        System.out.println("Row-by-row traversal:");
        for(int i = 0; i < rows; i++) {
            System.out.print("  Row "+i+": ");
            for(int j = 0; j < cols; j++)
                System.out.print("mat["+i+"]["+j+"]="+mat[i][j]+"  ");
            System.out.println();
        }
        System.out.println("Total: "+rows*cols+" cells. Time: O(R×C)");
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Rows: "); int r = sc.nextInt();
        System.out.print("Cols: "); int c = sc.nextInt();
        int[][] mat = new int[r][c];
        for(int i=0;i<r;i++) for(int j=0;j<c;j++) {
            System.out.print("mat["+i+"]["+j+"]: "); mat[i][j]=sc.nextInt();
        }
        traverse(mat);
    }
}`,
    c: `#include <stdio.h>

void traverseMatrix(int mat[10][10], int rows, int cols) {
    printf("Row-by-row traversal:\\n");
    for(int i = 0; i < rows; i++) {
        printf("  Row %d: ", i);
        for(int j = 0; j < cols; j++)
            printf("mat[%d][%d]=%d  ", i, j, mat[i][j]);
        printf("\\n");
    }
    printf("Total: %d cells. Time: O(R×C)\\n", rows*cols);
}

int main() {
    int rows, cols, mat[10][10];
    printf("Enter rows and cols: ");
    scanf("%d %d", &rows, &cols);
    for(int i=0;i<rows;i++)
        for(int j=0;j<cols;j++) {
            printf("mat[%d][%d]: ", i, j);
            scanf("%d", &mat[i][j]);
        }
    traverseMatrix(mat, rows, cols);
    return 0;
}`,
    javascript: `function traverseMatrix(mat) {
    const rows = mat.length, cols = mat[0].length;
    console.log("Row-by-row traversal:");
    for(let i = 0; i < rows; i++) {
        let rowStr = \`  Row \${i}: \`;
        for(let j = 0; j < cols; j++)
            rowStr += \`mat[\${i}][\${j}]=\${mat[i][j]}  \`;
        console.log(rowStr);
    }
    console.log(\`\\nTotal: \${rows*cols} cells. Time: O(R×C)\`);
}

const mat = [
    [3,  17,  8, 42],
    [25, 11, 36,  7],
    [19,  5, 28, 14],
    [33,  2, 45, 21]
];
traverseMatrix(mat);`,
  },
  sort: {
    cpp: `#include <iostream>
#include <algorithm>
using namespace std;

void sortRows(int mat[][10], int rows, int cols) {
    cout << "Sorting each row:\\n";
    for(int i = 0; i < rows; i++) {
        sort(mat[i], mat[i] + cols);
        cout << "Row " << i << ": ";
        for(int j = 0; j < cols; j++) cout << mat[i][j] << " ";
        cout << "\\n";
    }
    cout << "Time: O(R × C log C)\\n";
}

void sortCols(int mat[][10], int rows, int cols) {
    cout << "Sorting each column:\\n";
    for(int j = 0; j < cols; j++) {
        int col[10];
        for(int i = 0; i < rows; i++) col[i] = mat[i][j];
        sort(col, col + rows);
        for(int i = 0; i < rows; i++) mat[i][j] = col[i];
        cout << "Col " << j << ": ";
        for(int i = 0; i < rows; i++) cout << mat[i][j] << " ";
        cout << "\\n";
    }
    cout << "Time: O(C × R log R)\\n";
}

int main() {
    int rows, cols, mat[10][10];
    cout << "Enter rows and cols: ";
    cin >> rows >> cols;
    for(int i=0;i<rows;i++)
        for(int j=0;j<cols;j++) {
            cout << "mat[" << i << "][" << j << "]: ";
            cin >> mat[i][j];
        }
    int choice;
    cout << "Sort (1=rows, 2=cols): ";
    cin >> choice;
    if(choice == 1) sortRows(mat, rows, cols);
    else sortCols(mat, rows, cols);
    return 0;
}`,
    python: `def sort_rows(mat):
    print("Sorting each row:")
    for i, row in enumerate(mat):
        mat[i] = sorted(row)
        print(f"  Row {i}: {mat[i]}")
    print("Time: O(R × C log C)")

def sort_cols(mat):
    rows, cols = len(mat), len(mat[0])
    print("Sorting each column:")
    for j in range(cols):
        col = sorted(mat[i][j] for i in range(rows))
        for i in range(rows):
            mat[i][j] = col[i]
        print(f"  Col {j}: {[mat[i][j] for i in range(rows)]}")
    print("Time: O(C × R log R)")

rows = int(input("Rows: "))
cols = int(input("Cols: "))
mat = []
for i in range(rows):
    row = [int(input(f"mat[{i}][{j}]: ")) for j in range(cols)]
    mat.append(row)

choice = int(input("Sort (1=rows, 2=cols): "))
if choice == 1: sort_rows(mat)
else: sort_cols(mat)`,
    java: `import java.util.*;

public class Main {
    static void sortRows(int[][] mat) {
        int rows=mat.length, cols=mat[0].length;
        for(int i=0;i<rows;i++) {
            Arrays.sort(mat[i]);
            System.out.print("Row "+i+": ");
            for(int v:mat[i]) System.out.print(v+" ");
            System.out.println();
        }
        System.out.println("Time: O(R × C log C)");
    }
    static void sortCols(int[][] mat) {
        int rows=mat.length, cols=mat[0].length;
        for(int j=0;j<cols;j++) {
            int[] col=new int[rows];
            for(int i=0;i<rows;i++) col[i]=mat[i][j];
            Arrays.sort(col);
            for(int i=0;i<rows;i++) mat[i][j]=col[i];
            System.out.print("Col "+j+": ");
            for(int i=0;i<rows;i++) System.out.print(mat[i][j]+" ");
            System.out.println();
        }
        System.out.println("Time: O(C × R log R)");
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int r=sc.nextInt(), c=sc.nextInt();
        int[][] mat=new int[r][c];
        for(int i=0;i<r;i++) for(int j=0;j<c;j++) mat[i][j]=sc.nextInt();
        System.out.print("Sort (1=rows,2=cols): ");
        if(sc.nextInt()==1) sortRows(mat); else sortCols(mat);
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a,const void *b){return *(int*)a - *(int*)b;}

void sortRows(int mat[10][10], int rows, int cols) {
    for(int i=0;i<rows;i++){
        qsort(mat[i], cols, sizeof(int), cmp);
        printf("Row %d: ", i);
        for(int j=0;j<cols;j++) printf("%d ", mat[i][j]);
        printf("\\n");
    }
    printf("Time: O(R x C log C)\\n");
}

void sortCols(int mat[10][10], int rows, int cols) {
    for(int j=0;j<cols;j++){
        int col[10];
        for(int i=0;i<rows;i++) col[i]=mat[i][j];
        qsort(col, rows, sizeof(int), cmp);
        for(int i=0;i<rows;i++) mat[i][j]=col[i];
        printf("Col %d: ", j);
        for(int i=0;i<rows;i++) printf("%d ", mat[i][j]);
        printf("\\n");
    }
    printf("Time: O(C x R log R)\\n");
}

int main(){
    int rows,cols,mat[10][10];
    printf("Rows cols: "); scanf("%d %d",&rows,&cols);
    for(int i=0;i<rows;i++) for(int j=0;j<cols;j++){
        printf("mat[%d][%d]: ",i,j); scanf("%d",&mat[i][j]);
    }
    int ch; printf("Sort (1=rows,2=cols): "); scanf("%d",&ch);
    if(ch==1) sortRows(mat,rows,cols); else sortCols(mat,rows,cols);
}`,
    javascript: `function sortRows(mat) {
    console.log("Sorting each row:");
    mat.forEach((row, i) => {
        row.sort((a, b) => a - b);
        console.log(\`  Row \${i}: [\${row.join(', ')}]\`);
    });
    console.log("Time: O(R × C log C)");
}

function sortCols(mat) {
    const rows = mat.length, cols = mat[0].length;
    console.log("Sorting each column:");
    for(let j = 0; j < cols; j++) {
        const col = mat.map(row => row[j]).sort((a,b) => a-b);
        col.forEach((val, i) => mat[i][j] = val);
        console.log(\`  Col \${j}: [\${col.join(', ')}]\`);
    }
    console.log("Time: O(C × R log R)");
}

const mat = [[3,17,8,42],[25,11,36,7],[19,5,28,14],[33,2,45,21]];
console.log("Original:", JSON.stringify(mat));
sortRows(mat);
console.log("After sorting rows:", JSON.stringify(mat));`,
  },
  search: {
    cpp: `#include <iostream>
using namespace std;

pair<int,int> linearSearch(int mat[][10], int rows, int cols, int target) {
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < cols; j++) {
            cout << "Checking mat[" << i << "][" << j << "] = " << mat[i][j];
            if(mat[i][j] == target) {
                cout << "  <- FOUND!\\n";
                return {i, j};
            }
            cout << "  != " << target << "\\n";
        }
    }
    return {-1, -1};
}

int main() {
    int rows, cols;
    cout << "Enter rows and cols: ";
    cin >> rows >> cols;
    int mat[10][10];
    for(int i=0;i<rows;i++)
        for(int j=0;j<cols;j++) {
            cout << "mat[" << i << "][" << j << "]: ";
            cin >> mat[i][j];
        }
    int target;
    cout << "Enter search target: ";
    cin >> target;
    auto [r, c] = linearSearch(mat, rows, cols, target);
    if(r != -1)
        cout << "\\nFound " << target << " at mat[" << r << "][" << c << "]\\n";
    else
        cout << "\\n" << target << " not found! Time: O(R×C)\\n";
    return 0;
}`,
    python: `def linear_search(mat, target):
    rows, cols = len(mat), len(mat[0])
    for i in range(rows):
        for j in range(cols):
            print(f"  mat[{i}][{j}] = {mat[i][j]}", end="")
            if mat[i][j] == target:
                print(f"  <- FOUND!")
                return (i, j)
            print(f"  != {target}")
    return (-1, -1)

rows = int(input("Rows: "))
cols = int(input("Cols: "))
mat = []
for i in range(rows):
    row = [int(input(f"mat[{i}][{j}]: ")) for j in range(cols)]
    mat.append(row)
target = int(input("Search target: "))
r, c = linear_search(mat, target)
if r != -1:
    print(f"\\nFound {target} at mat[{r}][{c}]. Time: O(R×C)")
else:
    print(f"\\n{target} not found! Time: O(R×C)")`,
    java: `import java.util.*;

public class Main {
    static int[] linearSearch(int[][] mat, int target) {
        for(int i=0;i<mat.length;i++)
            for(int j=0;j<mat[0].length;j++) {
                System.out.print("  mat["+i+"]["+j+"] = "+mat[i][j]);
                if(mat[i][j]==target){System.out.println("  <- FOUND!"); return new int[]{i,j};}
                System.out.println("  != "+target);
            }
        return new int[]{-1,-1};
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int r=sc.nextInt(), c=sc.nextInt();
        int[][] mat=new int[r][c];
        for(int i=0;i<r;i++) for(int j=0;j<c;j++) mat[i][j]=sc.nextInt();
        int target=sc.nextInt();
        int[] res=linearSearch(mat,target);
        if(res[0]!=-1) System.out.println("Found at ["+res[0]+"]["+res[1]+"]");
        else System.out.println(target+" not found. Time: O(R×C)");
    }
}`,
    c: `#include <stdio.h>

void linearSearch(int mat[10][10], int rows, int cols, int target) {
    for(int i=0;i<rows;i++)
        for(int j=0;j<cols;j++){
            printf("  mat[%d][%d]=%d", i, j, mat[i][j]);
            if(mat[i][j]==target){
                printf("  <- FOUND!\\n");
                printf("Found %d at [%d][%d]. Time: O(R*C)\\n", target,i,j);
                return;
            }
            printf("  != %d\\n", target);
        }
    printf("%d not found! Time: O(R*C)\\n", target);
}

int main(){
    int rows,cols,mat[10][10],target;
    printf("Rows cols: "); scanf("%d %d",&rows,&cols);
    for(int i=0;i<rows;i++) for(int j=0;j<cols;j++){
        printf("mat[%d][%d]: ",i,j); scanf("%d",&mat[i][j]);
    }
    printf("Target: "); scanf("%d",&target);
    linearSearch(mat,rows,cols,target);
}`,
    javascript: `function linearSearch(mat, target) {
    const rows = mat.length, cols = mat[0].length;
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            process.stdout && process.stdout.write(\`  mat[\${i}][\${j}] = \${mat[i][j]}\`);
            if(mat[i][j] === target) {
                console.log(\`  <- FOUND!\`);
                return [i, j];
            }
            console.log(\`  != \${target}\`);
        }
    }
    return [-1, -1];
}

const mat = [[3,17,8,42],[25,11,36,7],[19,5,28,14],[33,2,45,21]];
const target = 28;
console.log(\`Searching for \${target} in matrix:\`);
const [r, c] = linearSearch(mat, target);
if(r !== -1) console.log(\`\\nFound at mat[\${r}][\${c}]\`);
else console.log(\`\\n\${target} not found. Time: O(R×C)\`);`,
  },
};


function getCMTheme(t) {
  return t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean";
}

function initEditor() {
  const theme = document.body.getAttribute("data-theme") || "dark";
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-c++src",
    theme: getCMTheme(theme),
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });
  codeEditor.setValue(CODE.access.cpp);
}

function switchLang(lang, btn) {
  document
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  currentLang = lang;
  const modeMap = {
    cpp: "text/x-c++src",
    python: "text/x-python",
    java: "text/x-java",
    c: "text/x-csrc",
    javascript: "text/javascript",
  };
  const names = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    c: "C",
    javascript: "JavaScript",
  };
  document.getElementById("lang-display").textContent = names[lang];
  codeEditor.setOption("mode", modeMap[lang]);
  codeEditor.setValue(
    CODE[currentCodeOp][lang] || `// ${names[lang]} code for ${currentCodeOp}`,
  );
}

document.querySelectorAll(".lang-tab").forEach((btn) => {
  btn.onclick = () => switchLang(btn.dataset.lang, btn);
});

function switchCodeOp(op) {
  currentCodeOp = op;
  document
    .querySelectorAll(".code-op-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("cop-" + op).classList.add("active");
  codeEditor.setValue(CODE[op][currentLang] || `// Code for ${op}`);
}

function copyCode() {
  navigator.clipboard.writeText(codeEditor.getValue()).then(() => {
    const btn = document.querySelector(".code-copy");
    btn.textContent = "✓";
    btn.style.background = "var(--primary-green)";
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.style.background = "var(--primary-purple)";
    }, 2000);
  });
}


async function getInput(prompt) {
  return new Promise((resolve) => {
    const pd = document.getElementById("inputPrompt");
    document.getElementById("promptText").textContent = prompt;
    document.getElementById("userInput").value = "";
    pd.style.display = "block";
    document.getElementById("userInput").focus();
    currentInputResolver = resolve;
  });
}

function submitInput() {
  const val = document.getElementById("userInput").value.trim();
  if (val && currentInputResolver) {
    document.getElementById("inputPrompt").style.display = "none";
    currentInputResolver(val);
    currentInputResolver = null;
  }
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitInput();
});

async function runCode() {
  outputDiv = document.getElementById("codeOutput");
  outputDiv.innerHTML =
    '<span style="color:#fbbf24;">🔄 Executing...</span><br><br>';
  const opNames = {
    access: "Accessing",
    traverse: "Traversal",
    sort: "Sorting",
    search: "Searching",
  };
  outputDiv.innerHTML += `<span style="color:#06b6d4;">Matrix ${opNames[currentCodeOp]} — ${currentLang.toUpperCase()}</span><br><br>`;
  try {
    await runOpSim(currentCodeOp);
  } catch (e) {
    outputDiv.innerHTML += `<br><span style="color:#ef4444;">Error: ${e.message}</span>`;
  }
}

function out(txt, color = "#a0a0a0") {
  outputDiv.innerHTML += `<span style="color:${color}">${txt}</span><br>`;
}

async function getMatrix() {
  const r = parseInt(await getInput("Enter rows (e.g. 3): "));
  const c = parseInt(await getInput("Enter cols (e.g. 3): "));
  out(`Rows: ${r}, Cols: ${c}`, "#06b6d4");
  const mat = [];
  for (let i = 0; i < r; i++) {
    const row = [];
    for (let j = 0; j < c; j++) {
      const v = parseInt(await getInput(`mat[${i}][${j}]: `));
      row.push(v);
      out(`mat[${i}][${j}] = ${v}`, "#8b8b8b");
    }
    mat.push(row);
  }
  return mat;
}

async function runOpSim(op) {
  const mat = await getMatrix();
  const R = mat.length,
    C = mat[0].length;
  out("");

  if (op === "access") {
    const r = parseInt(await getInput(`Row to access (0-${R - 1}): `));
    const c = parseInt(await getInput(`Col to access (0-${C - 1}): `));
    if (r >= 0 && r < R && c >= 0 && c < C) {
      out(`mat[${r}][${c}] = ${mat[r][c]}`, "#10b981");
      out(`✓ Direct access — Time: O(1)`, "#10b981");
    } else out("Invalid index!", "#ef4444");
  } else if (op === "traverse") {
    out("Row-by-row traversal:", "#06b6d4");
    for (let i = 0; i < R; i++) {
      let s = `  Row ${i}: `;
      for (let j = 0; j < C; j++) s += `mat[${i}][${j}]=${mat[i][j]}  `;
      out(s, "#8b5cf6");
      await sleep(300);
    }
    out(`✓ Visited ${R * C} cells. Time: O(R×C)`, "#10b981");
  } else if (op === "sort") {
    const choice = await getInput("Sort rows or cols? (r/c): ");
    if (choice.toLowerCase() === "r") {
      out("Sorting each row:", "#f59e0b");
      for (let i = 0; i < R; i++) {
        mat[i].sort((a, b) => a - b);
        out(`  Row ${i}: [${mat[i].join(", ")}]`, "#f59e0b");
        await sleep(200);
      }
      out(`✓ All rows sorted. Time: O(R × C log C)`, "#10b981");
    } else {
      out("Sorting each column:", "#f59e0b");
      for (let j = 0; j < C; j++) {
        const col = mat.map((row) => row[j]).sort((a, b) => a - b);
        col.forEach((v, i) => (mat[i][j] = v));
        out(`  Col ${j}: [${col.join(", ")}]`, "#f59e0b");
        await sleep(200);
      }
      out(`✓ All columns sorted. Time: O(C × R log R)`, "#10b981");
    }
  } else if (op === "search") {
    const target = parseInt(await getInput("Search target: "));
    out(`Searching for ${target}...`, "#f59e0b");
    let found = false;
    for (let i = 0; i < R && !found; i++)
      for (let j = 0; j < C; j++) {
        await sleep(150);
        if (mat[i][j] === target) {
          out(`  mat[${i}][${j}] = ${mat[i][j]}  <- FOUND! 🎉`, "#10b981");
          out(`✓ Found at [${i}][${j}]. Time: O(R×C)`, "#10b981");
          found = true;
          break;
        }
        out(`  mat[${i}][${j}] = ${mat[i][j]}  != ${target}`, "#555");
      }
    if (!found) out(`${target} not found! Time: O(R×C) worst case.`, "#ef4444");
  }
}


document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const cur = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(cur) + 1) % 3];
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
  codeEditor.setOption("theme", getCMTheme(next));
};
// --- Level Slider & Modal Logic (FIXED) ---
// Get the algorithm name from the page to use as a unique key
const ALGO_KEY = document.title
  .split(" - ")[0]
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "_");
const L2_KEY = `${ALGO_KEY}_l2_unlocked`;
const L3_KEY = `${ALGO_KEY}_l3_unlocked`;

const btnL2 = document.getElementById("l2");
const btnL3 = document.getElementById("l3");
const modal = document.getElementById("quizModal");
const cancelBtn = document.getElementById("cancelBtn");
const startQuizBtn = document.getElementById("startQuiz");

function updateLevelButtons() {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  const l3Unlocked = localStorage.getItem(L3_KEY) === "true";

  if (l2Unlocked) {
    btnL2.style.borderColor = "var(--primary-green)";
    btnL2.style.background = "rgba(16, 185, 129, 0.15)";
    btnL2.style.color = "var(--primary-green)";
    btnL2.title = "Unlocked";
  }
  if (l3Unlocked) {
    btnL3.style.borderColor = "var(--primary-green)";
    btnL3.style.background = "rgba(16, 185, 129, 0.15)";
    btnL3.style.color = "var(--primary-green)";
    btnL3.title = "Unlocked";
  }
}

btnL2.onclick = () => {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  if (l2Unlocked) {
    // Already unlocked — go directly, no modal
    window.location.href = `${ALGO_KEY}_L2.html`;
  } else {
    // Not yet unlocked — show quiz modal
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
  }
};

btnL3.onclick = () => {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  const l3Unlocked = localStorage.getItem(L3_KEY) === "true";
  if (l3Unlocked) {
    window.location.href = `${ALGO_KEY}_L3.html`;
  } else if (!l2Unlocked) {
    // L2 not even unlocked yet — prompt L1 quiz first
    modal.querySelector("p").textContent =
      "Pass the Level 1 Quiz to unlock Level 2 first before accessing Level 3.";
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
  } else {
    // L2 unlocked but L3 not — prompt L2 quiz
    modal.querySelector("p").textContent =
      "Pass the Level 2 Quiz to unlock Level 3 and complete your journey.";
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l2`);
  }
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
  // Reset modal text in case it was changed
  modal.querySelector("p").textContent =
    `Pass the Level 1 Quiz to unlock Level 2 and continue your journey.`;
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("p").textContent =
      `Pass the Level 1 Quiz to unlock Level 2 and continue your journey.`;
  }
};

window.onload = () => {
  const saved = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", saved);
  initEditor();
  switchOp("access");
  initBest();
  initAvg();
  initWorst();
  initCustom();
  switchCodeOp("access");
};
