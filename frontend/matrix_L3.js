const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};
function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIcon").innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
}
document.getElementById("themeToggle").addEventListener("click", () => {
  const c = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(c) + 1) % 3]);
});
applyTheme(localStorage.getItem("dsa-theme") || "dark");

function makeSmGrid(elId, rows, cols, data, classes) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  for (let r = 0; r < rows; r++) {
    const row = document.createElement("div");
    row.className = "sm-row";
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "scell " + (classes[r][c] || "def");
      cell.textContent = data[r][c];
      row.appendChild(cell);
    }
    el.appendChild(row);
  }
}

/* ── CONCEPT: row-major traversal ── */
const CM_R = 4,
  CM_C = 5;
const cMatData = [
  [3, 7, 2, 9, 4],
  [8, 1, 5, 6, 3],
  [4, 2, 8, 1, 7],
  [9, 6, 3, 5, 2],
];
let cRow = 0,
  cCol = 0,
  cVisited = [];
function renderConceptMat(ar = -1, ac = -1) {
  const el = document.getElementById("conceptMat");
  el.innerHTML = "";
  for (let r = 0; r < CM_R; r++) {
    const row = document.createElement("div");
    row.className = "mat-row";
    for (let c = 0; c < CM_C; c++) {
      const cell = document.createElement("div");
      cell.className = "mat-cell";
      cell.innerHTML = `${cMatData[r][c]}<span class="cidx">[${r},${c}]</span>`;
      const key = r * CM_C + c;
      if (r === ar && c === ac) cell.classList.add("active");
      else if (cVisited.includes(key)) cell.classList.add("visited");
      else cell.classList.add("def");
      row.appendChild(cell);
    }
    el.appendChild(row);
  }
}
function conceptStep() {
  if (cRow >= CM_R) {
    renderConceptMat(-1, -1);
    document.getElementById("conceptStatus").innerHTML =
      `✅ Visited all ${CM_R * CM_C} cells in row-major order — O(n×m)`;
    cRow = 0;
    cCol = 0;
    cVisited = [];
    return;
  }
  cVisited.push(cRow * CM_C + cCol);
  renderConceptMat(cRow, cCol);
  document.getElementById("conceptStatus").innerHTML =
    `mat[<span>${cRow}</span>][<span>${cCol}</span>] = ${cMatData[cRow][cCol]} → flat index <span>${cRow * CM_C + cCol}</span>`;
  cCol++;
  if (cCol >= CM_C) {
    cCol = 0;
    cRow++;
  }
}
function conceptReset() {
  cRow = 0;
  cCol = 0;
  cVisited = [];
  renderConceptMat();
  document.getElementById("conceptStatus").textContent =
    'Click "Visit Next Cell" — row-major traversal';
}
renderConceptMat();

/* ── 1 BFS PATHFINDING ── */
const BFS_ROWS = 5,
  BFS_COLS = 6;
// 0=open, 1=wall, 2=start, 3=end
const bfsMapOrig = [
  [2, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [1, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 3],
];
let bfsMap,
  bfsQueue,
  bfsPrev,
  bfsVisited2,
  bfsDone,
  bfsPathCells,
  bfsVisitedCount;
function bfsRenderGrid(highlight = []) {
  const el = document.getElementById("bfsGrid");
  el.innerHTML = "";
  for (let r = 0; r < BFS_ROWS; r++) {
    const row = document.createElement("div");
    row.className = "sm-row";
    for (let c = 0; c < BFS_COLS; c++) {
      const cell = document.createElement("div");
      const key = r * BFS_COLS + c;
      let cls = "def";
      if (bfsMap[r][c] === 1) cls = "wall";
      else if (bfsMap[r][c] === 2) cls = "start";
      else if (bfsMap[r][c] === 3) cls = "end";
      else if (bfsPathCells.includes(key)) cls = "path";
      else if (highlight.includes(key)) cls = "active";
      else if (bfsVisited2.has(key)) cls = "visited";
      cell.className = "scell " + cls;
      const labels = { 1: "▪", 2: "S", 3: "E" };
      cell.textContent = labels[bfsMap[r][c]] || "";
      row.appendChild(cell);
    }
    el.appendChild(row);
  }
}
function bfsReset() {
  bfsMap = bfsMapOrig.map((r) => [...r]);
  bfsQueue = [];
  bfsPrev = {};
  bfsVisited2 = new Set();
  bfsDone = false;
  bfsPathCells = [];
  bfsVisitedCount = 0;
  // find start
  for (let r = 0; r < BFS_ROWS; r++)
    for (let c = 0; c < BFS_COLS; c++)
      if (bfsMap[r][c] === 2) {
        bfsQueue.push([r, c]);
        bfsVisited2.add(r * BFS_COLS + c);
      }
  bfsRenderGrid();
  document.getElementById("bfsStatus").textContent =
    "BFS explores level by level from S — guaranteed shortest path";
  document.getElementById("bfsVisited").textContent = 0;
  document.getElementById("bfsPathLen").textContent = "—";
}
function bfsStep() {
  if (bfsDone) {
    bfsReset();
    return;
  }
  if (bfsQueue.length === 0) {
    document.getElementById("bfsStatus").innerHTML =
      "⚠ No path found — destination unreachable";
    return;
  }
  const [r, c] = bfsQueue.shift();
  const key = r * BFS_COLS + c;
  if (bfsMap[r][c] === 3) {
    // trace path
    let cur = key;
    while (cur !== undefined) {
      bfsPathCells.unshift(cur);
      cur = bfsPrev[cur];
    }
    bfsRenderGrid();
    document.getElementById("bfsStatus").innerHTML =
      `✅ Path found! <span>${bfsPathCells.length - 1}</span> steps from S to E`;
    document.getElementById("bfsPathLen").textContent = bfsPathCells.length - 1;
    bfsDone = true;
    return;
  }
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const next = [];
  for (const [dr, dc] of dirs) {
    const nr = r + dr,
      nc = c + dc;
    if (nr < 0 || nr >= BFS_ROWS || nc < 0 || nc >= BFS_COLS) continue;
    const nk = nr * BFS_COLS + nc;
    if (bfsVisited2.has(nk) || bfsMap[nr][nc] === 1) continue;
    bfsVisited2.add(nk);
    bfsPrev[nk] = key;
    bfsQueue.push([nr, nc]);
    next.push(nk);
  }
  bfsVisitedCount = bfsVisited2.size;
  bfsRenderGrid(next);
  document.getElementById("bfsStatus").innerHTML =
    `Visiting [${r},${c}] → exploring <span>${next.length}</span> neighbors`;
  document.getElementById("bfsVisited").textContent = bfsVisitedCount;
}
bfsReset();

/* ── 2 MATRIX ROTATION ── */
const rotOrig = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
let rotMat,
  rotPhase = 0;
function renderRotGrid(elId, mat, highlight = []) {
  const el = document.getElementById(elId);
  el.innerHTML = "";
  const n = mat.length;
  for (let r = 0; r < n; r++) {
    const row = document.createElement("div");
    row.className = "sm-row";
    for (let c = 0; c < n; c++) {
      const cell = document.createElement("div");
      cell.className =
        "scell " +
        (highlight.some(([hr, hc]) => hr === r && hc === c) ? "active" : "def");
      cell.textContent = mat[r][c];
      row.appendChild(cell);
    }
    el.appendChild(row);
  }
}
function rotateReset() {
  rotMat = rotOrig.map((r) => [...r]);
  rotPhase = 0;
  renderRotGrid("rotateOrigGrid", rotOrig);
  renderRotGrid("rotateResGrid", rotMat);
  document.getElementById("rotateStatus").textContent =
    "Step 1: Transpose the matrix (swap mat[i][j] ↔ mat[j][i])";
  document.getElementById("rotateInfo").textContent = "";
}
function rotateStep() {
  const n = rotMat.length;
  if (rotPhase === 0) {
    // Transpose
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++) {
        [rotMat[i][j], rotMat[j][i]] = [rotMat[j][i], rotMat[i][j]];
      }
    renderRotGrid("rotateResGrid", rotMat);
    document.getElementById("rotateStatus").innerHTML =
      `<span>Transposed!</span> Swap mat[i][j] ↔ mat[j][i] for all i < j`;
    document.getElementById("rotateInfo").innerHTML =
      `Step 2 coming: reverse each row to complete 90° CW rotation`;
    rotPhase = 1;
  } else if (rotPhase === 1) {
    // Reverse each row
    for (let i = 0; i < n; i++) rotMat[i].reverse();
    renderRotGrid("rotateResGrid", rotMat);
    document.getElementById("rotateStatus").innerHTML =
      `✅ <span>Rotated 90° clockwise!</span> Transpose + reverse rows = O(n²), O(1) space`;
    document.getElementById("rotateInfo").innerHTML =
      `Original → Transposed → Reversed rows = 90° CW rotation`;
    rotPhase = 2;
  } else {
    rotateReset();
  }
}
rotateReset();

/* ── 3 DP TABLE (LCS) ── */
const dpS1 = "ABCB",
  dpS2 = "BDCAB";
const dpRows = dpS1.length + 1,
  dpCols = dpS2.length + 1;
let dpTable = Array.from({ length: dpRows }, () => Array(dpCols).fill(0));
let dpR = 1,
  dpC = 1,
  dpDone = false;
function renderDPGrid(ar = -1, ac = -1) {
  const el = document.getElementById("dpGrid");
  el.innerHTML = "";
  // header row
  const hrow = document.createElement("div");
  hrow.className = "sm-row";
  hrow.appendChild(
    Object.assign(document.createElement("div"), {
      className: "scell def",
      textContent: "",
    }),
  );
  hrow.appendChild(
    Object.assign(document.createElement("div"), {
      className: "scell highlight",
      textContent: "ε",
    }),
  );
  for (const ch of dpS2) {
    hrow.appendChild(
      Object.assign(document.createElement("div"), {
        className: "scell highlight",
        textContent: ch,
      }),
    );
  }
  el.appendChild(hrow);
  for (let r = 0; r < dpRows; r++) {
    const row = document.createElement("div");
    row.className = "sm-row";
    const lbl = document.createElement("div");
    lbl.className = "scell highlight";
    lbl.textContent = r === 0 ? "ε" : dpS1[r - 1];
    row.appendChild(lbl);
    for (let c = 0; c < dpCols; c++) {
      const cell = document.createElement("div");
      const isActive = r === ar && c === ac;
      const isFilled = dpTable[r][c] > 0 || r === 0 || c === 0;
      cell.className =
        "scell " +
        (isActive
          ? "active"
          : isFilled && (r <= ar || r < dpRows - 1)
            ? "visited"
            : "def");
      cell.textContent = dpTable[r][c];
      row.appendChild(cell);
    }
    el.appendChild(row);
  }
}
function dpStep() {
  if (dpDone) {
    dpReset();
    return;
  }
  if (dpR >= dpRows) {
    renderDPGrid(-1, -1);
    document.getElementById("dpStatus").innerHTML =
      `✅ LCS length = <span>${dpTable[dpRows - 1][dpCols - 1]}</span> — "BCB" is the LCS of "${dpS1}" and "${dpS2}"`;
    dpDone = true;
    return;
  }
  const r = dpR,
    c = dpC;
  if (dpS1[r - 1] === dpS2[c - 1]) {
    dpTable[r][c] = dpTable[r - 1][c - 1] + 1;
    document.getElementById("dpStatus").innerHTML =
      `mat[${r}][${c}]: '${dpS1[r - 1]}'='${dpS2[c - 1]}' → match! dp[${r - 1}][${c - 1}]+1 = <span>${dpTable[r][c]}</span>`;
  } else {
    dpTable[r][c] = Math.max(dpTable[r - 1][c], dpTable[r][c - 1]);
    document.getElementById("dpStatus").innerHTML =
      `mat[${r}][${c}]: '${dpS1[r - 1]}'≠'${dpS2[c - 1]}' → max(${dpTable[r - 1][c]},${dpTable[r][c - 1]}) = <span>${dpTable[r][c]}</span>`;
  }
  document.getElementById("dpInfo").innerHTML =
    `Row <b>${r}</b>="${dpS1[r - 1]}", Col <b>${c}</b>="${dpS2[c - 1]}"`;
  renderDPGrid(r, c);
  dpC++;
  if (dpC >= dpCols) {
    dpC = 1;
    dpR++;
  }
}
function dpReset() {
  dpTable = Array.from({ length: dpRows }, () => Array(dpCols).fill(0));
  dpR = 1;
  dpC = 1;
  dpDone = false;
  renderDPGrid();
  document.getElementById("dpStatus").textContent =
    'LCS of "ABCB" and "BDCAB" — fill DP table row by row';
  document.getElementById("dpInfo").textContent = "";
}
renderDPGrid();

/* ── 4 SPIRAL TRAVERSAL ── */
const spiralData = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
const SR = 4,
  SC = 4;
let spiralVisited, spiralOrder, spiralIdx2;
function buildSpiralOrder() {
  const order = [];
  let top = 0,
    bot = SR - 1,
    left = 0,
    right = SC - 1;
  while (top <= bot && left <= right) {
    for (let c = left; c <= right; c++) order.push([top, c]);
    top++;
    for (let r = top; r <= bot; r++) order.push([r, right]);
    right--;
    if (top <= bot) {
      for (let c = right; c >= left; c--) order.push([bot, c]);
      bot--;
    }
    if (left <= right) {
      for (let r = bot; r >= top; r--) order.push([r, left]);
      left++;
    }
  }
  return order;
}
function spiralReset() {
  spiralVisited = Array.from({ length: SR }, () => Array(SC).fill(false));
  spiralOrder = buildSpiralOrder();
  spiralIdx2 = 0;
  const cls = Array.from({ length: SR }, () => Array(SC).fill("def"));
  makeSmGrid("spiralGrid", SR, SC, spiralData, cls);
  document.getElementById("spiralStatus").textContent =
    "Spiral: →→ ↓↓ ←← ↑↑ then inner ring";
  document.getElementById("spiralInfo").textContent = "";
}
function spiralStep() {
  if (spiralIdx2 >= spiralOrder.length) {
    spiralReset();
    return;
  }
  const [r, c] = spiralOrder[spiralIdx2];
  spiralVisited[r][c] = true;
  spiralIdx2++;
  const cls = Array.from({ length: SR }, (_, ri) =>
    Array.from({ length: SC }, (_, ci) =>
      spiralVisited[ri][ci]
        ? ri === r && ci === c
          ? "active"
          : "path"
        : "def",
    ),
  );
  makeSmGrid("spiralGrid", SR, SC, spiralData, cls);
  document.getElementById("spiralStatus").innerHTML =
    `Cell <span>${spiralIdx2}</span>/16 → mat[${r}][${c}] = ${spiralData[r][c]}`;
  document.getElementById("spiralInfo").innerHTML = `Collected: <b>${spiralOrder
    .slice(0, spiralIdx2)
    .map(([ri, ci]) => spiralData[ri][ci])
    .join(", ")}</b>`;
}
spiralReset();

/* ── 5 SORTED MATRIX SEARCH ── */
const searchMat = [
  [1, 4, 7, 11],
  [2, 5, 8, 12],
  [3, 9, 10, 16],
  [4, 6, 14, 19],
];
const SM_R = 4,
  SM_C = 4,
  SEARCH_TARGET = 14;
let sRow, sCol, sDone, sVisitedCells;
function searchReset() {
  sRow = 0;
  sCol = SM_C - 1;
  sDone = false;
  sVisitedCells = [];
  const cls = Array.from({ length: SM_R }, () => Array(SM_C).fill("def"));
  makeSmGrid("searchGrid", SM_R, SM_C, searchMat, cls);
  document.getElementById("searchStatus").innerHTML =
    `Start top-right: searching for <span>${SEARCH_TARGET}</span>`;
  document.getElementById("searchInfo").textContent = "";
}
function searchStep() {
  if (sDone) {
    searchReset();
    return;
  }
  if (sRow >= SM_R || sCol < 0) {
    const cls = Array.from({ length: SM_R }, () => Array(SM_C).fill("def"));
    sVisitedCells.forEach(([r, c]) => {
      cls[r][c] = "visited";
    });
    makeSmGrid("searchGrid", SM_R, SM_C, searchMat, cls);
    document.getElementById("searchStatus").innerHTML =
      `⚠ <span>${SEARCH_TARGET}</span> not found — exhausted search space`;
    sDone = true;
    return;
  }
  sVisitedCells.push([sRow, sCol]);
  const val = searchMat[sRow][sCol];
  const cls = Array.from({ length: SM_R }, () => Array(SM_C).fill("def"));
  sVisitedCells.forEach(([r, c], i) => {
    cls[r][c] = i === sVisitedCells.length - 1 ? "active" : "visited";
  });
  if (val === SEARCH_TARGET) {
    cls[sRow][sCol] = "found";
    makeSmGrid("searchGrid", SM_R, SM_C, searchMat, cls);
    document.getElementById("searchStatus").innerHTML =
      `✅ Found <span>${SEARCH_TARGET}</span> at [${sRow},${sCol}] in ${sVisitedCells.length} steps!`;
    document.getElementById("searchInfo").innerHTML =
      `O(n+m) = O(${SM_R + SM_C}) max steps — this took <b>${sVisitedCells.length}</b>`;
    sDone = true;
    return;
  }
  makeSmGrid("searchGrid", SM_R, SM_C, searchMat, cls);
  if (val > SEARCH_TARGET) {
    document.getElementById("searchStatus").innerHTML =
      `[${sRow},${sCol}]=${val} > ${SEARCH_TARGET} → move <span>left ←</span>`;
    document.getElementById("searchInfo").innerHTML =
      `Eliminating col ${sCol} — all values in this col ≥ ${val} > target`;
    sCol--;
  } else {
    document.getElementById("searchStatus").innerHTML =
      `[${sRow},${sCol}]=${val} < ${SEARCH_TARGET} → move <span>down ↓</span>`;
    document.getElementById("searchInfo").innerHTML =
      `Eliminating row ${sRow} — all values in this row ≤ ${val} < target`;
    sRow++;
  }
}
searchReset();

/* ── 6 ADJACENCY MATRIX ── */
const ADJ_N = 5;
const adjEdges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [1, 4],
];
let adjMat, adjEdgeIdx;
function adjReset() {
  adjMat = Array.from({ length: ADJ_N }, () => Array(ADJ_N).fill(0));
  adjEdgeIdx = 0;
  renderAdjGrid();
  document.getElementById("adjStatus").textContent =
    "5-node graph — O(1) edge check with adjacency matrix";
  document.getElementById("adjInfo").textContent = "";
}
function renderAdjGrid(lastEdge = null) {
  const el = document.getElementById("adjGrid");
  el.innerHTML = "";
  // header
  const hrow = document.createElement("div");
  hrow.className = "sm-row";
  hrow.appendChild(
    Object.assign(document.createElement("div"), {
      className: "scell def",
      textContent: "",
    }),
  );
  for (let i = 0; i < ADJ_N; i++)
    hrow.appendChild(
      Object.assign(document.createElement("div"), {
        className: "scell highlight",
        textContent: i,
      }),
    );
  el.appendChild(hrow);
  for (let r = 0; r < ADJ_N; r++) {
    const row = document.createElement("div");
    row.className = "sm-row";
    row.appendChild(
      Object.assign(document.createElement("div"), {
        className: "scell highlight",
        textContent: r,
      }),
    );
    for (let c = 0; c < ADJ_N; c++) {
      const cell = document.createElement("div");
      const isLast =
        lastEdge &&
        ((lastEdge[0] === r && lastEdge[1] === c) ||
          (lastEdge[0] === c && lastEdge[1] === r));
      const isDiag = r === c;
      cell.className =
        "scell " +
        (isDiag
          ? "diag"
          : isLast
            ? "active"
            : adjMat[r][c] === 1
              ? "found"
              : "def");
      cell.textContent = isDiag ? "·" : adjMat[r][c];
      row.appendChild(cell);
    }
    el.appendChild(row);
  }
}
function adjStep() {
  if (adjEdgeIdx >= adjEdges.length) {
    adjReset();
    return;
  }
  const [u, v] = adjEdges[adjEdgeIdx];
  adjMat[u][v] = 1;
  adjMat[v][u] = 1;
  renderAdjGrid([u, v]);
  document.getElementById("adjStatus").innerHTML =
    `Added edge <span>${u}—${v}</span>: mat[${u}][${v}]=mat[${v}][${u}]=1 (undirected)`;
  const edgeCount = adjEdgeIdx + 1;
  document.getElementById("adjInfo").innerHTML =
    `${edgeCount} edge${edgeCount !== 1 ? "s" : ""} added — <b>${edgeCount * 2}</b> cells set`;
  adjEdgeIdx++;
}
adjReset();
