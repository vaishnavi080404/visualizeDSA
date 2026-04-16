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

const FACT_VALS = [1, 1, 2, 6, 24, 120]; // factorial 0..5
let cPhase = 0,
  cFrames = [];

function renderConceptStack() {
  const el = document.getElementById("conceptStack");
  el.innerHTML = "";
  // Display newest (top of stack) first
  [...cFrames].reverse().forEach((f) => {
    const d = document.createElement("div");
    d.className = "stack-frame " + f.state;
    d.innerHTML = `<span>${f.label}</span><span class="frame-tag">${f.tag}</span>`;
    el.appendChild(d);
  });
}

function conceptStep() {
  const TOTAL_PHASES = (5 + 1) * 2; // 6 calling + 6 returning
  if (cPhase <= 5) {
    // Calling down
    const n = 5 - cPhase;
    if (cFrames.length > 0) cFrames[cFrames.length - 1].state = "done";
    const isBase = n <= 1;
    cFrames.push({
      label: `factorial(${n})`,
      state: isBase ? "base" : "calling",
      tag: isBase ? "BASE" : `depth ${cPhase}`,
    });
    renderConceptStack();
    document.getElementById("conceptFormula").textContent = isBase
      ? `return 1`
      : `return ${n} × factorial(${n - 1})`;
    document.getElementById("conceptResult").textContent = isBase ? "→ 1" : "";
    document.getElementById("conceptStatus").textContent = isBase
      ? `Base case reached — factorial(${n}) = 1, start unwinding`
      : `Calling factorial(${n}) — pushing frame onto stack`;
    cPhase++;
  } else {
    // Returning / unwinding
    const unwindStep = cPhase - 6;
    const n = 1 + unwindStep; // n=1 returns first, then 2, 3, 4, 5
    if (unwindStep >= cFrames.length) {
      conceptReset();
      return;
    }
    // mark top frame as returning
    const frameIdx = cFrames.length - 1 - unwindStep;
    if (frameIdx < 0) {
      conceptReset();
      return;
    }
    cFrames[frameIdx].state = "returning";
    cFrames[frameIdx].tag = `= ${FACT_VALS[n]}`;
    if (frameIdx + 1 < cFrames.length) cFrames[frameIdx + 1].state = "done";
    renderConceptStack();
    document.getElementById("conceptFormula").textContent =
      n <= 1 ? `return 1` : `${n} × ${FACT_VALS[n - 1]} = ${FACT_VALS[n]}`;
    document.getElementById("conceptResult").textContent = `→ ${FACT_VALS[n]}`;
    document.getElementById("conceptStatus").textContent =
      frameIdx === 0
        ? `✅ factorial(5) = ${FACT_VALS[5]} — all frames returned!`
        : `factorial(${n}) returns ${FACT_VALS[n]} to its caller above`;
    cPhase++;
  }
}

function conceptReset() {
  cPhase = 0;
  cFrames = [];
  renderConceptStack();
  document.getElementById("conceptFormula").textContent = "";
  document.getElementById("conceptResult").textContent = "";
  document.getElementById("conceptStatus").textContent =
    'Click "Next Call" — watch factorial(5) build and unwind the call stack';
}
conceptReset();

/* ══════════════════════════════════════════════
   1. FILE SYSTEM TRAVERSAL
══════════════════════════════════════════════ */
const FS_NODES = [
  { label: "project/", type: "dir", depth: 0 },
  { label: "src/", type: "dir", depth: 1 },
  { label: "main.cpp", type: "file", depth: 2 },
  { label: "utils/", type: "dir", depth: 2 },
  { label: "helper.cpp", type: "file", depth: 3 },
  { label: "config.h", type: "file", depth: 3 },
  { label: "tests/", type: "dir", depth: 1 },
  { label: "test_main.cpp", type: "file", depth: 2 },
  { label: "README.md", type: "file", depth: 0 },
];
let fsIdx = 0,
  fsVisited = new Set();

function fsRenderTree() {
  const el = document.getElementById("fsTree");
  el.innerHTML = "";
  FS_NODES.forEach((n, i) => {
    const indent = "  ".repeat(n.depth);
    const icon =
      n.type === "dir" ? "📁" : n.label.endsWith(".md") ? "📄" : "📝";
    const isCur = i === fsIdx - 1 && fsIdx > 0;
    const isVis = fsVisited.has(i) && !isCur;
    const cls = isCur ? "ft-active" : isVis ? "ft-visited" : "ft-idle";
    const prefix = isCur ? "► " : isVis ? "✓ " : "  ";
    const d = document.createElement("div");
    d.className = "ftree-line " + cls;
    d.textContent = indent + prefix + icon + " " + n.label;
    el.appendChild(d);
  });
}

function fsReset() {
  fsIdx = 0;
  fsVisited = new Set();
  fsRenderTree();
  document.getElementById("fsStatus").textContent =
    "DFS enters a dir → recurses into children → backtracks on return";
  document.getElementById("fsInfo").textContent = "";
}

function fsStep() {
  if (fsIdx >= FS_NODES.length) {
    fsReset();
    return;
  }
  fsVisited.add(fsIdx);
  const n = FS_NODES[fsIdx];
  fsIdx++;
  fsRenderTree();
  document.getElementById("fsStatus").innerHTML =
    n.type === "dir"
      ? `📁 Enter dir <span>"${n.label}"</span> — depth ${n.depth}, recurse into children`
      : `📝 Found file <span>"${n.label}"</span> — depth ${n.depth}, base case, return`;
  document.getElementById("fsInfo").textContent =
    `Visited ${fsVisited.size} / ${FS_NODES.length} nodes total`;
}
fsReset();

/* ══════════════════════════════════════════════
   2. MERGE SORT
══════════════════════════════════════════════ */
const MS_ARR = [5, 3, 8, 1, 9, 2];
let msLog = [],
  msLogIdx = 0;

function buildMsLog(arr, depth, log) {
  if (arr.length <= 1) {
    log.push({
      type: "base",
      arr: [...arr],
      depth,
      msg: `base [${arr}] — length 1, return as-is`,
    });
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const L = arr.slice(0, mid),
    R = arr.slice(mid);
  log.push({
    type: "split",
    arr: [...arr],
    L: [...L],
    R: [...R],
    depth,
    msg: `split [${arr.join(",")}] → [${L.join(",")}] | [${R.join(",")}]`,
  });
  const sL = buildMsLog(L, depth + 1, log);
  const sR = buildMsLog(R, depth + 1, log);
  const merged = [];
  let i = 0,
    j = 0;
  while (i < sL.length && j < sR.length) {
    if (sL[i] <= sR[j]) merged.push(sL[i++]);
    else merged.push(sR[j++]);
  }
  while (i < sL.length) merged.push(sL[i++]);
  while (j < sR.length) merged.push(sR[j++]);
  log.push({
    type: "merge",
    L: sL,
    R: sR,
    merged: [...merged],
    depth,
    msg: `merge [${sL.join(",")}] + [${sR.join(",")}] → [${merged.join(",")}]`,
  });
  return merged;
}

function msReset() {
  msLog = [];
  msLogIdx = 0;
  buildMsLog([...MS_ARR], 0, msLog);
  const el = document.getElementById("msViz");
  el.innerHTML =
    '<span style="color:var(--text-secondary)">Click ▶ to trace merge sort step by step...</span>';
  document.getElementById("msStatus").textContent =
    "mergeSort([5,3,8,1,9,2]) — divide until single elements, merge back up";
  document.getElementById("msInfo").textContent = "";
}

function msStep() {
  if (msLogIdx >= msLog.length) {
    msReset();
    return;
  }
  const s = msLog[msLogIdx];
  const el = document.getElementById("msViz");
  if (msLogIdx === 0) el.innerHTML = "";
  const depthColors = [
    "var(--primary-indigo)",
    "var(--primary-violet)",
    "var(--primary-blue)",
    "var(--primary-cyan)",
  ];
  const color = depthColors[Math.min(s.depth, depthColors.length - 1)];
  const indent = "  ".repeat(s.depth);
  const icons = { split: "↓", base: "○", merge: "↑" };
  const line = document.createElement("div");
  line.style.cssText = `color:${s.type === "merge" ? "var(--primary-green)" : s.type === "base" ? "var(--primary-orange)" : color};white-space:pre;`;
  line.textContent = `${indent}${icons[s.type]} ${s.msg}`;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
  document.getElementById("msStatus").innerHTML =
    `<span>Step ${msLogIdx + 1}/${msLog.length}</span>: ${s.type} at depth ${s.depth}`;
  document.getElementById("msInfo").innerHTML =
    `<b>${s.type === "merge" ? "↑ returning (merge)" : s.type === "base" ? "○ base case" : "↓ recursing (split)"}</b> — subarray size ${s.arr ? s.arr.length : s.merged.length}`;
  msLogIdx++;
}
msReset();

/* ══════════════════════════════════════════════
   3. BST IN-ORDER TRAVERSAL
   Tree layout:
         8
        / \
       3  10
      / \    \
     1   6   14
        / \
       4   7
   In-order: 1 3 4 6 7 8 10 14
══════════════════════════════════════════════ */
const BST_LAYOUT = [
  [{ v: 8 }],
  [{ v: 3 }, { v: null }, { v: 10 }],
  [{ v: 1 }, { v: 6 }, { v: null }, { v: 14 }],
  [{ v: null }, { v: 4 }, { v: 7 }, { v: null }, { v: null }, { v: null }],
];
const IN_ORDER = [1, 3, 4, 6, 7, 8, 10, 14];
let bstIdx = 0,
  bstVisited = new Set();

function renderBST() {
  const el = document.getElementById("bstViz");
  el.innerHTML = "";
  BST_LAYOUT.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "t-row";
    row.forEach(({ v }) => {
      const cell = document.createElement("div");
      if (v === null) {
        cell.className = "t-node empty";
        rowDiv.appendChild(cell);
        return;
      }
      const isCur = v === IN_ORDER[bstIdx - 1] && bstIdx > 0;
      const isDone = bstVisited.has(v) && !isCur;
      cell.className = "t-node " + (isCur ? "active" : isDone ? "done" : "def");
      cell.textContent = v;
      rowDiv.appendChild(cell);
    });
    el.appendChild(rowDiv);
  });
}

function bstReset() {
  bstIdx = 0;
  bstVisited = new Set();
  renderBST();
  document.getElementById("bstStatus").textContent =
    "In-order traversal produces the BST values in sorted order";
  document.getElementById("bstInfo").textContent = "";
}

function bstStep() {
  if (bstIdx >= IN_ORDER.length) {
    bstReset();
    return;
  }
  bstVisited.add(IN_ORDER[bstIdx]);
  bstIdx++;
  renderBST();
  document.getElementById("bstStatus").innerHTML =
    `Visit node <span>${IN_ORDER[bstIdx - 1]}</span> — in-order position ${bstIdx}/${IN_ORDER.length}`;
  document.getElementById("bstInfo").innerHTML =
    `Sorted output so far: <b>[${IN_ORDER.slice(0, bstIdx).join(", ")}]</b>`;
}
bstReset();

/* ══════════════════════════════════════════════
   4. N-QUEENS BACKTRACKING (4x4)
══════════════════════════════════════════════ */
const QN = 4;
let qSteps = [],
  qStepIdx = 0;

function qIsSafe(board, row, col) {
  for (let i = 0; i < row; i++) if (board[i] === col) return false;
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
    if (board[i] === j) return false;
  for (let i = row - 1, j = col + 1; i >= 0 && j < QN; i--, j++)
    if (board[i] === j) return false;
  return true;
}

function buildQSteps(board, row, steps) {
  if (row === QN) {
    steps.push({
      board: [...board],
      msg: `✅ Solution found! Queens at cols [${board.join(",")}]`,
      type: "sol",
    });
    return true;
  }
  for (let col = 0; col < QN; col++) {
    if (qIsSafe(board, row, col)) {
      board[row] = col;
      steps.push({
        board: [...board],
        msg: `Row ${row}: place queen at col ${col} — safe ✓`,
        type: "place",
      });
      if (buildQSteps(board, row + 1, steps)) return true;
      board[row] = -1;
      steps.push({
        board: [...board],
        msg: `Backtrack! Remove from row ${row} col ${col} — no solution down this path`,
        type: "bt",
      });
    }
  }
  return false;
}

function queensReset() {
  qSteps = [];
  qStepIdx = 0;
  buildQSteps(Array(QN).fill(-1), 0, qSteps);
  renderQueens(Array(QN).fill(-1));
  document.getElementById("queensStatus").textContent =
    "Recurse row by row — backtrack when no safe column found";
  document.getElementById("queensInfo").textContent = "";
}

function renderQueens(board) {
  const el = document.getElementById("queensViz");
  el.innerHTML = "";
  for (let r = 0; r < QN; r++) {
    const row = document.createElement("div");
    row.className = "q-row";
    for (let c = 0; c < QN; c++) {
      const cell = document.createElement("div");
      const hasQ = board[r] === c;
      cell.className =
        "q-cell " + (hasQ ? "queen" : (r + c) % 2 === 0 ? "light" : "dark2");
      cell.textContent = hasQ ? "♛" : "";
      row.appendChild(cell);
    }
    el.appendChild(row);
  }
}

function queensStep() {
  if (qStepIdx >= qSteps.length) {
    queensReset();
    return;
  }
  const s = qSteps[qStepIdx];
  renderQueens(s.board);
  const colors = {
    place: "var(--primary-green)",
    bt: "var(--primary-red)",
    sol: "var(--primary-orange)",
  };
  document.getElementById("queensStatus").innerHTML =
    `<span style="color:${colors[s.type]}">${s.msg}</span>`;
  document.getElementById("queensInfo").innerHTML =
    `Step ${qStepIdx + 1}/${qSteps.length} — <b>${s.type === "bt" ? "backtrack" : s.type === "sol" ? "solution" : s.type}</b>`;
  qStepIdx++;
}
queensReset();

/* ══════════════════════════════════════════════
   5. TOWER OF HANOI (3 disks)
══════════════════════════════════════════════ */
const HN = 3;
let hMoves = [],
  hMoveIdx = 0;
let hPegs = [[], [], []]; // A=0, B=1, C=2; array = disk stack (top = last element)
const DISK_COLORS = ["#f43f5e", "#8b5cf6", "#06b6d4"];
const PEG_NAMES = ["A", "B", "C"];

function buildHanoi(n, from, to, via, moves) {
  if (n === 0) return;
  buildHanoi(n - 1, from, via, to, moves);
  moves.push([from, to, n]);
  buildHanoi(n - 1, via, to, from, moves);
}

function renderHanoi() {
  const el = document.getElementById("hanoiViz");
  el.innerHTML = "";
  hPegs.forEach((peg, pi) => {
    const col = document.createElement("div");
    col.className = "peg-col";
    // Fill empty slots from top
    const slots = Array(HN).fill(null);
    peg.forEach((disk, i) => {
      slots[HN - 1 - i] = disk;
    }); // bottom disk at index HN-1
    slots.forEach((disk) => {
      if (disk) {
        const w = 20 + disk * 14;
        const d = document.createElement("div");
        d.className = "disk";
        d.style.cssText = `width:${w}px;background:${DISK_COLORS[disk - 1]};`;
        d.textContent = disk;
        col.appendChild(d);
      } else {
        const rod = document.createElement("div");
        rod.className = "peg-rod";
        col.appendChild(rod);
      }
    });
    const lbl = document.createElement("div");
    lbl.className = "peg-label";
    lbl.textContent = PEG_NAMES[pi];
    col.appendChild(lbl);
    el.appendChild(col);
  });
}

function hanoiReset() {
  hMoves = [];
  hMoveIdx = 0;
  buildHanoi(HN, 0, 2, 1, hMoves);
  hPegs = [[3, 2, 1], [], []]; // peg A: disk 3 (bottom) to 1 (top)
  renderHanoi();
  document.getElementById("hanoiStatus").textContent =
    "3 disks → 2³ − 1 = 7 moves total to transfer peg A → peg C";
  document.getElementById("hanoiInfo").textContent = "";
}

function hanoiStep() {
  if (hMoveIdx >= hMoves.length) {
    hanoiReset();
    return;
  }
  const [from, to, disk] = hMoves[hMoveIdx];
  hPegs[to].push(hPegs[from].pop());
  renderHanoi();
  document.getElementById("hanoiStatus").innerHTML =
    `Move disk <span>${disk}</span>: peg <span>${PEG_NAMES[from]}</span> → peg <span>${PEG_NAMES[to]}</span>`;
  document.getElementById("hanoiInfo").innerHTML =
    `Move ${hMoveIdx + 1} of ${hMoves.length} — recursive decomposition depth: <b>${HN}</b>`;
  hMoveIdx++;
}
hanoiReset();

/* ══════════════════════════════════════════════
   6. MEMOIZED FIBONACCI fib(6)
══════════════════════════════════════════════ */
const MEMO_N = 6;
let memoSteps = [],
  memoStepIdx = 0,
  memoComputedCount = 0,
  memoCachedCount = 0;

function buildMemoSteps(n, cache, steps) {
  if (n <= 1) {
    steps.push({
      n,
      type: "base",
      result: n,
      msg: `fib(${n}) = ${n}  [base case]`,
    });
    cache[n] = n;
    return n;
  }
  if (cache[n] !== undefined) {
    steps.push({
      n,
      type: "cache",
      result: cache[n],
      msg: `fib(${n}) = ${cache[n]}  [cache hit ✓ — saved recomputation]`,
    });
    return cache[n];
  }
  steps.push({
    n,
    type: "call",
    result: null,
    msg: `fib(${n}): need fib(${n - 1}) + fib(${n - 2}) — call both`,
  });
  const l = buildMemoSteps(n - 1, cache, steps);
  const r = buildMemoSteps(n - 2, cache, steps);
  const res = l + r;
  cache[n] = res;
  steps.push({
    n,
    type: "return",
    result: res,
    msg: `fib(${n}) = ${l}+${r} = ${res}  [computed & stored in cache]`,
  });
  return res;
}

function memoReset() {
  memoSteps = [];
  memoStepIdx = 0;
  memoComputedCount = 0;
  memoCachedCount = 0;
  buildMemoSteps(MEMO_N, {}, memoSteps);
  const el = document.getElementById("memoViz");
  el.innerHTML =
    '<span style="color:var(--text-secondary)">Click ▶ to trace fib(6) with memoization...</span>';
  document.getElementById("memoStatus").textContent =
    "fib(6): each unique subproblem computed once, rest from cache";
  document.getElementById("memoComputed").textContent = "0";
  document.getElementById("memoCached").textContent = "0";
}

function memoStep() {
  if (memoStepIdx >= memoSteps.length) {
    memoReset();
    return;
  }
  const s = memoSteps[memoStepIdx];
  const el = document.getElementById("memoViz");
  if (memoStepIdx === 0) el.innerHTML = "";
  const colors = {
    call: "var(--primary-indigo)",
    base: "var(--primary-orange)",
    return: "var(--primary-green)",
    cache: "var(--primary-cyan)",
  };
  const icons = { call: "→", base: "○", return: "←", cache: "✓" };
  const line = document.createElement("div");
  line.style.cssText = `color:${colors[s.type]};white-space:pre;`;
  line.textContent = `${icons[s.type]} ${s.msg}`;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
  if (s.type === "return" || s.type === "base") memoComputedCount++;
  if (s.type === "cache") memoCachedCount++;
  document.getElementById("memoStatus").innerHTML = `<span>${s.msg}</span>`;
  document.getElementById("memoComputed").textContent = memoComputedCount;
  document.getElementById("memoCached").textContent = memoCachedCount;
  memoStepIdx++;
}
memoReset();
