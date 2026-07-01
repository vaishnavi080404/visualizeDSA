/*   THEME   */
const themes = ["dark", "light", "blue"];
const TI = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};
function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIcon").innerHTML = TI[t];
  localStorage.setItem("dsa-theme", t);
  if (window.syncThemeToServer) window.syncThemeToServer(t);
}
document.getElementById("themeToggle").addEventListener("click", () => {
  const c = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(c) + 1) % 3]);
});
applyTheme(localStorage.getItem("dsa-theme") || "dark");

/*   HAMBURGER   */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
let menuOpen = false;
hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileNav.classList.toggle("open", menuOpen);
  const spans = hamburger.querySelectorAll("span");
  if (menuOpen) {
    spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "";
  }
});
document.addEventListener("click", (e) => {
  if (
    menuOpen &&
    !mobileNav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    menuOpen = false;
    mobileNav.classList.remove("open");
    hamburger.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  }
});
mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuOpen = false;
    mobileNav.classList.remove("open");
    hamburger.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  }),
);

/*   HELPERS   */
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function buildMNodes(elId, vals, classes = []) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  vals.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "mnode " + (classes[i] || "def");
    c.textContent = v;
    el.appendChild(c);
  });
}

/*   CONCEPT: BST SEARCH VISUALIZER   */
// BST: 50 as root, balanced
//         50
//       30   70
//      20 40 60 80
//            55 65
const conceptBST = [[50], [30, 70], [20, 40, 60, 80]];
const searchTarget = 60;
// Path to 60: 50 (go right) → 70 (go left) → 60 (found)
const searchPath = [50, 70, 60];
let cStep = 0,
  cVisited = [];

function renderConceptTree(active = -1, found = -1) {
  const el = document.getElementById("conceptTree");
  el.innerHTML = "";
  conceptBST.forEach((level, li) => {
    const row = document.createElement("div");
    row.className = "tree-level";
    level.forEach((v) => {
      const n = document.createElement("div");
      n.className = "tnode";
      if (v === found) n.classList.add("found");
      else if (v === active) n.classList.add("active");
      else if (cVisited.includes(v)) n.classList.add("visited");
      else n.classList.add("def");
      n.textContent = v;
      row.appendChild(n);
    });
    el.appendChild(row);
  });
}

function conceptStep() {
  if (cStep >= searchPath.length) {
    cStep = 0;
    cVisited = [];
    renderConceptTree();
    document.getElementById("conceptStatus").textContent =
      'Click "Search Next Value" — watch BST halve the search space';
    return;
  }
  const node = searchPath[cStep];
  const isFound = node === searchTarget;
  cVisited.push(node);
  renderConceptTree(isFound ? -1 : node, isFound ? node : -1);
  if (isFound) {
    document.getElementById("conceptStatus").innerHTML =
      `Found <span>${searchTarget}</span>! Took ${cStep + 1} comparisons — O(log n) = O(${Math.ceil(Math.log2(7))}) for 7 nodes`;
  } else {
    const dir = searchTarget < node ? "left" : "right";
    document.getElementById("conceptStatus").innerHTML =
      `Node <span>${node}</span>: target ${searchTarget} ${searchTarget < node ? "<" : ">"} ${node} → go <span>${dir}</span>`;
  }
  cStep++;
}
function conceptReset() {
  cStep = 0;
  cVisited = [];
  renderConceptTree();
  document.getElementById("conceptStatus").textContent =
    'Click "Search Next Value" — watch BST halve the search space';
}
renderConceptTree();

/*   1. FILE SYSTEM   */
const fsParts = [
  "/",
  "/usr",
  "/usr/local",
  "/usr/local/bin",
  "/usr/local/bin/node",
];
let fsIdx = 0;
function renderFsDirs(upTo) {
  let html = "";
  for (let i = 0; i <= upTo && i < fsParts.length; i++) {
    const indent = "  ".repeat(i);
    const isActive = i === upTo;
    const icon = i === fsParts.length - 1 ? "📄" : "📁";
    html += `<span style="color:${isActive ? "var(--primary-violet)" : "var(--primary-green)"}">${indent}${icon} ${fsParts[i].split("/").pop() || "/"}</span>\n`;
  }
  document.getElementById("fsDirs").innerHTML = html.replace(/\n/g, "<br>");
}
function fsStep() {
  if (fsIdx >= fsParts.length) {
    fsIdx = 0;
    renderFsDirs(-1);
    document.getElementById("fsStatus").textContent =
      "Resolving path: /usr/local/bin/node";
    document.getElementById("fsInfo").textContent = "";
    return;
  }
  renderFsDirs(fsIdx);
  document.getElementById("fsStatus").innerHTML =
    `Resolving <span>${fsParts[fsIdx]}</span>`;
  document.getElementById("fsInfo").innerHTML =
    `Depth ${fsIdx} — each directory lookup is O(children) per level`;
  fsIdx++;
}
function fsReset() {
  fsIdx = 0;
  renderFsDirs(-1);
  document.getElementById("fsStatus").textContent =
    "Resolving path: /usr/local/bin/node";
  document.getElementById("fsInfo").textContent = "";
}
renderFsDirs(-1);

/*   2. DATABASE BST RANGE QUERY   */
// BST values for range query demo: 10,20,30,40,50,60,70,80,90
// Inorder: 10 20 30 40 50 60 70 80 90 — find values in [30,70]
const dbVals = [50, 30, 70, 20, 40, 60, 80, 10, 35, 55, 65];
const DB_LO = 30,
  DB_HI = 70;
let dbIdx = 0,
  dbFoundCount = 0,
  dbVisitedCount = 0;

function dbStep() {
  if (dbIdx >= dbVals.length) {
    buildMNodes(
      "dbNodes",
      dbVals,
      dbVals.map((v) => (v >= DB_LO && v <= DB_HI ? "found" : "visited")),
    );
    document.getElementById("dbStatus").innerHTML =
      `✅ Found <span>${dbFoundCount}</span> values in [${DB_LO}, ${DB_HI}] — visited ${dbVisitedCount} nodes`;
    return;
  }
  const v = dbVals[dbIdx];
  const inRange = v >= DB_LO && v <= DB_HI;
  if (inRange) dbFoundCount++;
  dbVisitedCount++;
  const cls = dbVals.map((x, i) =>
    i < dbIdx
      ? dbVals[i] >= DB_LO && dbVals[i] <= DB_HI
        ? "found"
        : "visited"
      : i === dbIdx
        ? "active"
        : "def",
  );
  buildMNodes("dbNodes", dbVals, cls);
  document.getElementById("dbStatus").innerHTML =
    `Node <span>${v}</span>: ${inRange ? `✓ in range [${DB_LO},${DB_HI}]` : `outside range — prune subtree if BST ordering`}`;
  document.getElementById("dbVisited").textContent = dbVisitedCount;
  document.getElementById("dbFound").textContent = dbFoundCount;
  dbIdx++;
}
function dbReset() {
  dbIdx = 0;
  dbFoundCount = 0;
  dbVisitedCount = 0;
  buildMNodes("dbNodes", dbVals);
  document.getElementById("dbStatus").textContent =
    `Range query: find all nodes where ${DB_LO} ≤ value ≤ ${DB_HI}`;
  document.getElementById("dbVisited").textContent = 0;
  document.getElementById("dbFound").textContent = 0;
}
buildMNodes("dbNodes", dbVals);

/*   3. COMPILER AST   */
// Expression: (3 + 4) × 2
// Tree levels:
//      ×
//   +     2
//  3  4
const astLevels = [
  [{ v: "×", t: "op" }],
  [
    { v: "+", t: "op" },
    { v: "2", t: "num" },
  ],
  [
    { v: "3", t: "num" },
    { v: "4", t: "num" },
  ],
];
// Postorder: 3, 4, +, 2, ×
const astOrder = [
  { node: "3", result: null, msg: "Leaf node 3 → value = 3" },
  { node: "4", result: null, msg: "Leaf node 4 → value = 4" },
  { node: "+", result: 7, msg: "Operator + → 3 + 4 = 7" },
  { node: "2", result: null, msg: "Leaf node 2 → value = 2" },
  { node: "×", result: 14, msg: "Operator × → 7 × 2 = 14 ✅" },
];
let astIdx = 0,
  astVisited = [];

function renderAST(active = "") {
  const el = document.getElementById("astTree");
  el.innerHTML = "";
  astLevels.forEach((level) => {
    const row = document.createElement("div");
    row.className = "tree-level";
    level.forEach((item) => {
      const n = document.createElement("div");
      n.className = "tnode";
      const isActive = item.v === active;
      const isVisited = astVisited.includes(item.v) && item.v !== active;
      if (item.v === "×" && astIdx >= astOrder.length) n.classList.add("found");
      else if (isActive) n.classList.add("active");
      else if (isVisited) n.classList.add("visited");
      else n.classList.add("def");
      n.textContent = item.v;
      row.appendChild(n);
    });
    el.appendChild(row);
  });
}

function astStep() {
  if (astIdx >= astOrder.length) {
    astIdx = 0;
    astVisited = [];
    renderAST();
    document.getElementById("astStatus").textContent =
      "Postorder: left → right → root (evaluates bottom-up)";
    document.getElementById("astInfo").textContent = "";
    return;
  }
  const step = astOrder[astIdx];
  astVisited.push(step.node);
  renderAST(step.node);
  document.getElementById("astStatus").innerHTML =
    `<span>${step.node}</span>: ${step.msg}`;
  document.getElementById("astInfo").innerHTML = step.result
    ? `Stack result: <b>${step.result}</b> — intermediate value stored`
    : `Leaf pushed to evaluation stack`;
  astIdx++;
}
function astReset() {
  astIdx = 0;
  astVisited = [];
  renderAST();
  document.getElementById("astStatus").textContent =
    "Postorder: left → right → root (evaluates bottom-up)";
  document.getElementById("astInfo").textContent = "";
}
renderAST();

/*   4. DFS TRAVERSAL   */
const dfsTree = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// DFS order (preorder on implicit BST): 1→2→4→8→9→5→10→3→6→7
const dfsOrder = [1, 2, 4, 8, 9, 5, 10, 3, 6, 7];
let dfsIdx = 0,
  dfsVisit = [],
  dfsStack = [];

function dfsStep() {
  if (dfsIdx >= dfsOrder.length) {
    buildMNodes(
      "dfsNodes",
      dfsTree,
      dfsTree.map((_, i) => "found"),
    );
    document.getElementById("dfsStatus").innerHTML =
      `✅ DFS complete — visited all <span>${dfsTree.length}</span> nodes`;
    document.getElementById("dfsVisited").textContent = dfsTree.length;
    document.getElementById("dfsDepth").textContent = 0;
    return;
  }
  const v = dfsOrder[dfsIdx];
  dfsVisit.push(v);
  const depth = Math.floor(Math.log2(v + 0.5));
  dfsStack = dfsStack.slice(0, depth + 1);
  dfsStack[depth] = v;
  const cls = dfsTree.map((x) =>
    x === v ? "active" : dfsVisit.includes(x) ? "visited" : "def",
  );
  buildMNodes("dfsNodes", dfsTree, cls);
  document.getElementById("dfsStatus").innerHTML =
    `Visit node <span>${v}</span> — depth ${depth}, explore children first`;
  document.getElementById("dfsVisited").textContent = dfsVisit.length;
  document.getElementById("dfsDepth").textContent = depth;
  dfsIdx++;
}
function dfsReset() {
  dfsIdx = 0;
  dfsVisit = [];
  dfsStack = [];
  buildMNodes("dfsNodes", dfsTree);
  document.getElementById("dfsStatus").textContent =
    "DFS from root — explore deepest unvisited child first";
  document.getElementById("dfsVisited").textContent = 0;
  document.getElementById("dfsDepth").textContent = 0;
}
buildMNodes("dfsNodes", dfsTree);

/*   5. HEAP   */
let heapArr = [],
  heapNext = Math.floor(Math.random() * 20) + 10;

function renderHeap(activeIdx = -1) {
  const cls = heapArr.map((_, i) => (i === activeIdx ? "active" : "found"));
  buildMNodes("heapNodes", heapArr, cls);
  document.getElementById("heapSize").textContent = heapArr.length;
  document.getElementById("heapMax").textContent = heapArr.length
    ? heapArr[0]
    : "—";
}

function heapify(arr, i) {
  // bubble down
  let largest = i,
    l = 2 * i + 1,
    r = 2 * i + 2;
  if (l < arr.length && arr[l] > arr[largest]) largest = l;
  if (r < arr.length && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, largest);
  }
}
function heapBubbleUp(arr, i) {
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (arr[p] < arr[i]) {
      [arr[p], arr[i]] = [arr[i], arr[p]];
      i = p;
    } else break;
  }
}

function heapInsert() {
  if (heapArr.length >= 10) {
    document.getElementById("heapStatus").innerHTML =
      "Max size 10 reached — <span>extract first</span>";
    return;
  }
  const val = heapNext;
  heapNext = Math.floor(Math.random() * 50) + 5;
  heapArr.push(val);
  heapBubbleUp(heapArr, heapArr.length - 1);
  renderHeap();
  document.getElementById("heapStatus").innerHTML =
    `Inserted <span>${val}</span> — bubbled up to maintain heap property`;
}
function heapExtract() {
  if (!heapArr.length) {
    document.getElementById("heapStatus").innerHTML =
      "Heap <span>empty</span>!";
    return;
  }
  const max = heapArr[0];
  heapArr[0] = heapArr[heapArr.length - 1];
  heapArr.pop();
  if (heapArr.length) heapify(heapArr, 0);
  renderHeap();
  document.getElementById("heapStatus").innerHTML =
    `Extracted max = <span>${max}</span> — heapified down O(log n)`;
}
function heapReset() {
  heapArr = [];
  renderHeap();
  document.getElementById("heapStatus").textContent =
    "Max-heap: parent ≥ both children always";
  document.getElementById("heapMax").textContent = "—";
}
renderHeap();

/*   6. TRIE PREFIX SEARCH   */
const trieWords = [
  "cat",
  "car",
  "card",
  "care",
  "cast",
  "can",
  "dog",
  "door",
  "do",
];
const triePrefix = "ca";
let trieIdx = 0;

// Simulate trie traversal: first show prefix navigation, then matching words
const trieSteps = [
  {
    type: "prefix",
    ch: "c",
    msg: `Trie: following prefix character '<span>c</span>'`,
  },
  {
    type: "prefix",
    ch: "a",
    msg: `Trie: following prefix character '<span>a</span>'`,
  },
  {
    type: "match",
    word: "cat",
    msg: `Found word '<span>cat</span>' — matches prefix "ca"`,
  },
  {
    type: "match",
    word: "car",
    msg: `Found word '<span>car</span>' — matches prefix "ca"`,
  },
  {
    type: "match",
    word: "card",
    msg: `Found word '<span>card</span>' — matches prefix "ca"`,
  },
  {
    type: "match",
    word: "care",
    msg: `Found word '<span>care</span>' — matches prefix "ca"`,
  },
  {
    type: "match",
    word: "cast",
    msg: `Found word '<span>cast</span>' — matches prefix "ca"`,
  },
  {
    type: "match",
    word: "can",
    msg: `Found word '<span>can</span>' — matches prefix "ca"`,
  },
  {
    type: "done",
    msg: `✅ Found <span>6</span> words starting with "ca" — O(2) to reach node, O(k) to enumerate`,
  },
];
let trieMatches = [];

function renderTrie() {
  const el = document.getElementById("trieDisplay");
  let html = trieWords
    .map((w) => {
      const isMatch = trieMatches.includes(w);
      return `<span style="color:${isMatch ? "var(--primary-violet)" : "var(--text-secondary)"};">${isMatch ? "✓ " : " ─ "} ${w}</span>`;
    })
    .join("<br>");
  el.innerHTML = html;
}

function trieStep() {
  if (trieIdx >= trieSteps.length) {
    trieIdx = 0;
    trieMatches = [];
    renderTrie();
    document.getElementById("trieStatus").textContent =
      'Searching prefix "ca" in word list';
    document.getElementById("trieInfo").textContent = "";
    return;
  }
  const step = trieSteps[trieIdx];
  if (step.type === "match") {
    trieMatches.push(step.word);
  }
  renderTrie();
  document.getElementById("trieStatus").innerHTML = step.msg;
  if (step.type === "prefix")
    document.getElementById("trieInfo").innerHTML =
      `Navigating prefix — O(1) per character, no full-word comparison`;
  else if (step.type === "match")
    document.getElementById("trieInfo").innerHTML =
      `Match ${trieMatches.length} found so far — enumeration phase`;
  else
    document.getElementById("trieInfo").innerHTML =
      `Total: O(|prefix|) + O(k matches) — hash map can't do this`;
  trieIdx++;
}
function trieReset() {
  trieIdx = 0;
  trieMatches = [];
  renderTrie();
  document.getElementById("trieStatus").textContent =
    'Searching prefix "ca" in word list';
  document.getElementById("trieInfo").textContent = "";
}
renderTrie();
