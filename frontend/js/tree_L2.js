//DATA STRUCTURES

class BSTNode {
  constructor(v) {
    this.v = v;
    this.l = null;
    this.r = null;
  }
}
class NNode {
  constructor(v) {
    this.v = v;
    this.ch = [];
    this._id = ++NNode._cnt;
  }
}
NNode._cnt = 0;

//BST OPERATIONS

function bstIns(root, v) {
  if (!root) return new BSTNode(v);
  if (v < root.v) root.l = bstIns(root.l, v);
  else if (v > root.v) root.r = bstIns(root.r, v);
  return root;
}
function bstFind(root, v) {
  if (!root) return null;
  if (root.v === v) return root;
  return v < root.v ? bstFind(root.l, v) : bstFind(root.r, v);
}
function bstSearch(root, v, path) {
  if (!root) return null;
  path.push(root.v);
  if (root.v === v) return path;
  return v < root.v ? bstSearch(root.l, v, path) : bstSearch(root.r, v, path);
}
function bstMin(n) {
  while (n.l) n = n.l;
  return n;
}
function bstDel(root, v) {
  if (!root) return null;
  if (v < root.v) {
    root.l = bstDel(root.l, v);
  } else if (v > root.v) {
    root.r = bstDel(root.r, v);
  } else {
    if (!root.l) return root.r;
    if (!root.r) return root.l;
    const s = bstMin(root.r);
    root.v = s.v;
    root.r = bstDel(root.r, s.v);
  }
  return root;
}
function bstInorder(root, res) {
  if (!root) return;
  bstInorder(root.l, res);
  res.push(root.v);
  bstInorder(root.r, res);
}
function bstPreorder(root, res) {
  if (!root) return;
  res.push(root.v);
  bstPreorder(root.l, res);
  bstPreorder(root.r, res);
}
function bstH(root) {
  if (!root) return 0;
  return 1 + Math.max(bstH(root.l), bstH(root.r));
}

//BINARY TREE (level-order array)

function arrToTree(arr) {
  if (!arr.length) return null;
  const nodes = arr.map((v) => new BSTNode(v));
  for (let i = 0; i < nodes.length; i++) {
    if (2 * i + 1 < nodes.length) nodes[i].l = nodes[2 * i + 1];
    if (2 * i + 2 < nodes.length) nodes[i].r = nodes[2 * i + 2];
  }
  return nodes[0];
}

//SVG DRAWING

const NS = "http://www.w3.org/2000/svg";
const NODE_COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
];

function mkEl(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

// hl=highlighted(cyan), found=found(green), searching=searching(orange)
function drawBST(svgEl, root, hl = [], found = [], searching = []) {
  svgEl.innerHTML = "";
  if (!root) {
    const t = mkEl("text", {
      x: "50%",
      y: "50%",
      fill: "#555",
      "text-anchor": "middle",
      "font-size": "13",
      dy: ".3em",
    });
    t.textContent = "Empty Tree";
    svgEl.appendChild(t);
    return;
  }
  const h = bstH(root);
  const leafCount = Math.pow(2, h - 1);
  const W = Math.max(500, leafCount * 52);
  const H = Math.max(240, h * 80 + 50);
  svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svgEl.removeAttribute("width"); // let CSS/viewBox handle scaling

  const dw = document.getElementById("depthWarn");
  if (dw) dw.classList.toggle("show", h >= 4);

  const pos = {};
  function layout(node, depth, lo, hi) {
    if (!node) return;
    const x = (lo + hi) / 2,
      y = 40 + depth * 72;
    // FIX: use a unique key that won't collide for duplicate values at diff positions
    const key = `${node.v}_${depth}_${Math.round(lo)}`;
    pos[key] = { x, y, node, depth, lo, hi };
    layout(node.l, depth + 1, lo, (lo + hi) / 2);
    layout(node.r, depth + 1, (lo + hi) / 2, hi);
  }
  layout(root, 0, 0, W);

  // Edges first
  for (const p of Object.values(pos)) {
    const drawEdge = (child, cLo, cHi) => {
      const ck = `${child.v}_${p.depth + 1}_${Math.round(cLo)}`;
      const cp = pos[ck];
      if (!cp) return;
      svgEl.appendChild(
        mkEl("line", {
          x1: p.x,
          y1: p.y,
          x2: cp.x,
          y2: cp.y,
          stroke: "#3a3a5a",
          "stroke-width": 2,
        }),
      );
    };
    if (p.node.l) drawEdge(p.node.l, p.lo, (p.lo + p.hi) / 2);
    if (p.node.r) drawEdge(p.node.r, (p.lo + p.hi) / 2, p.hi);
  }

  // Nodes
  const colorByDepth = (d) => NODE_COLORS[d % NODE_COLORS.length];
  for (const p of Object.values(pos)) {
    const val = p.node.v;
    let fill = colorByDepth(p.depth),
      stroke = "none",
      sw = 0;
    if (found.includes(val)) {
      fill = "#10b981";
      stroke = "#fff";
      sw = 2.5;
    }
    if (searching.includes(val)) {
      fill = "#f59e0b";
      stroke = "#fff";
      sw = 2.5;
    }
    if (hl.includes(val)) {
      fill = "#06b6d4";
      stroke = "#fff";
      sw = 2.5;
    }

    const circ = mkEl("circle", { cx: p.x, cy: p.y, r: 20, fill });
    if (sw) {
      circ.setAttribute("stroke", stroke);
      circ.setAttribute("stroke-width", sw);
    }
    svgEl.appendChild(circ);

    const txt = mkEl("text", {
      x: p.x,
      y: p.y,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "white",
      "font-size": 12,
      "font-weight": "bold",
      "font-family": "'JetBrains Mono',monospace",
    });
    txt.textContent = val;
    svgEl.appendChild(txt);
  }
}

// Draw N-ary tree. highlightId = node._id to highlight green
function drawNary(svgEl, root, highlightId = -1) {
  svgEl.innerHTML = "";
  if (!root) {
    const t = mkEl("text", {
      x: "50%",
      y: "50%",
      fill: "#555",
      "text-anchor": "middle",
      "font-size": "13",
      dy: ".3em",
    });
    t.textContent = "Empty — add a node";
    svgEl.appendChild(t);
    return;
  }
  const W = 280;
  function countLeaves(n) {
    return n.ch.length ? n.ch.reduce((s, c) => s + countLeaves(c), 0) : 1;
  }
  const H = Math.max(120, nH(root) * 72 + 40);
  svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);

  const nodePos = {};
  function layout(node, depth, lo, hi) {
    const x = (lo + hi) / 2,
      y = 36 + depth * 68;
    nodePos[node._id] = { x, y, node };
    if (!node.ch.length) return;
    const total = countLeaves(node);
    let cur = lo;
    for (const c of node.ch) {
      const w = (countLeaves(c) / total) * (hi - lo);
      layout(c, depth + 1, cur, cur + w);
      cur += w;
    }
  }
  layout(root, 0, 0, W);

  for (const p of Object.values(nodePos)) {
    for (const c of p.node.ch) {
      const cp = nodePos[c._id];
      if (!cp) continue;
      svgEl.appendChild(
        mkEl("line", {
          x1: p.x,
          y1: p.y + 20,
          x2: cp.x,
          y2: cp.y - 20,
          stroke: "#3a3a5a",
          "stroke-width": 2,
        }),
      );
    }
  }
  let ci = 0;
  for (const p of Object.values(nodePos)) {
    const isHl = p.node._id === highlightId;
    const fill = isHl ? "#10b981" : NODE_COLORS[ci++ % NODE_COLORS.length];
    const circ = mkEl("circle", { cx: p.x, cy: p.y, r: 20, fill });
    if (isHl) {
      circ.setAttribute("stroke", "#fff");
      circ.setAttribute("stroke-width", 2.5);
    }
    svgEl.appendChild(circ);
    const txt = mkEl("text", {
      x: p.x,
      y: p.y,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "white",
      "font-size": 12,
      "font-weight": "bold",
      "font-family": "'JetBrains Mono',monospace",
    });
    txt.textContent = String(p.node.v);
    svgEl.appendChild(txt);
  }
}

function nH(node) {
  if (!node) return 0;
  if (!node.ch.length) return 1;
  return 1 + Math.max(...node.ch.map(nH));
}

//MAIN VISUALIZER STATE

let curType = "binary";
let bstRoot = null;
let btArr = [];
// FIX: renamed nRoot → mainNRoot to avoid future collisions
let mainNRoot = null;

function getMainSVG() {
  return document.getElementById("mainSvg");
}

function renderMain(hl = [], found = [], searching = []) {
  const svg = getMainSVG();
  if (curType === "nary") {
    drawNary(svg, mainNRoot);
    return;
  }
  const root = curType === "binary" ? arrToTree(btArr) : bstRoot;
  drawBST(svg, root, hl, found, searching);
}

function showMsg(txt, type) {
  const el = document.getElementById("msgBox");
  el.className = "msg-box show msg-" + type;
  el.textContent = txt;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 3000);
}

function hlPS(id) {
  document
    .querySelectorAll(".ps-step")
    .forEach((s) => s.classList.remove("on"));
  const el = document.getElementById("ps-" + id);
  if (el) el.classList.add("on");
}

//MAIN TREE OPERATIONS

function doInsert() {
  const v = parseInt(document.getElementById("mainInp").value);
  if (isNaN(v)) {
    showMsg("Enter a number", "w");
    return;
  }
  hlPS("insert");
  if (curType === "binary") {
    if (btArr.includes(v)) {
      showMsg(`${v} already in tree`, "w");
      return;
    }
    btArr.push(v);
    renderMain([v]);
    const h = bstH(arrToTree(btArr));
    showMsg(`Inserted ${v} — height = ${h}`, "s");
  } else if (curType === "bst") {
    if (bstFind(bstRoot, v)) {
      showMsg(`${v} already in BST`, "w");
      return;
    }
    bstRoot = bstIns(bstRoot, v);
    renderMain([v]);
    const nodes = [],
      h = bstH(bstRoot);
    bstInorder(bstRoot, nodes);
    const skewEl = document.getElementById("skewWarn");
    // skewed = height equals node count (linked-list shape) for 3+ nodes
    if (h === nodes.length && nodes.length >= 3) {
      skewEl.classList.add("show");
      showMsg(`⚠ Inserted ${v} — tree is skewed! Use middle values.`, "w");
    } else {
      skewEl.classList.remove("show");
      showMsg(`Inserted ${v} — height = ${h}, nodes = ${nodes.length}`, "s");
    }
  }
  document.getElementById("mainInp").value = "";
}

function doDelete() {
  const v = parseInt(document.getElementById("mainInp").value);
  if (isNaN(v)) {
    showMsg("Enter a number", "w");
    return;
  }
  hlPS("delete");
  if (curType === "bst") {
    const node = bstFind(bstRoot, v);
    if (!node) {
      showMsg(`${v} not found`, "e");
      return;
    }
    let msg = "";
    if (!node.l && !node.r) msg = `Deleted leaf ${v}. No restructuring needed.`;
    else if (!node.l || !node.r) {
      const ch = node.l ? node.l.v : node.r.v;
      msg = `Deleted ${v}. Replaced by child ${ch}.`;
    } else {
      let s = node.r;
      while (s.l) s = s.l;
      msg = `Deleted ${v}. Inorder Successor ${s.v} took its place.`;
    }
    bstRoot = bstDel(bstRoot, v);
    renderMain();
    document.getElementById("skewWarn").classList.remove("show");
    showMsg(msg, "i");
  } else if (curType === "binary") {
    const idx = btArr.indexOf(v);
    if (idx < 0) {
      showMsg(`${v} not found`, "e");
      return;
    }
    btArr.splice(idx, 1);
    renderMain();
    showMsg(`Deleted ${v}. Nodes re-arranged level-order.`, "i");
  } else {
    showMsg("Delete not supported for N-ary in this demo", "w");
  }
  document.getElementById("mainInp").value = "";
}

async function doSearch() {
  const v = parseInt(document.getElementById("mainInp").value);
  if (isNaN(v)) {
    showMsg("Enter a number", "w");
    return;
  }
  hlPS("search");
  if (curType === "bst") {
    const path = [];
    const result = bstSearch(bstRoot, v, path);
    if (!result) {
      showMsg(`${v} not found`, "e");
      return;
    }
    for (let i = 0; i < path.length; i++) {
      renderMain([], path[i] === v ? [path[i]] : [], [path[i]]);
      await sleep(550);
    }
    showMsg(`Found ${v} in ${path.length} step(s)`, "s");
  } else {
    showMsg("Switch to BST for animated search", "i");
  }
}

async function doInorder() {
  hlPS("inorder");
  const res = [];
  if (curType === "bst") bstInorder(bstRoot, res);
  else if (curType === "binary") bstInorder(arrToTree(btArr), res);
  if (!res.length) {
    showMsg("Tree is empty", "w");
    return;
  }
  for (const val of res) {
    renderMain([val]);
    await sleep(380);
  }
  showMsg(`Inorder: [ ${res.join(" → ")} ]`, "s");
}

async function doPreorder() {
  hlPS("preorder");
  const res = [];
  if (curType === "bst") bstPreorder(bstRoot, res);
  else if (curType === "binary") bstPreorder(arrToTree(btArr), res);
  if (!res.length) {
    showMsg("Tree is empty", "w");
    return;
  }
  for (const val of res) {
    renderMain([val]);
    await sleep(380);
  }
  showMsg(`Preorder: [ ${res.join(" → ")} ]`, "s");
}

function doReset() {
  bstRoot = null;
  btArr = [];
  mainNRoot = null;
  NNode._cnt = 0;
  document.getElementById("skewWarn").classList.remove("show");
  document.getElementById("depthWarn").classList.remove("show");
  if (curType === "nary") {
    document.getElementById("naryPicker").classList.remove("show");
    document.getElementById("naryInp").value = "";
    drawNary(getMainSVG(), null);
  } else {
    renderMain();
  }
  showMsg("Tree cleared", "i");
}

//N-ARY TREE UI

function nAllNodes(node, out) {
  if (!node) return;
  out.push(node);
  node.ch.forEach((c) => nAllNodes(c, out));
}

function naryRebuildPicker() {
  const picker = document.getElementById("naryPicker");
  const btnsEl = document.getElementById("naryPickerBtns");
  if (!mainNRoot) {
    picker.classList.remove("show");
    return;
  }
  picker.classList.add("show");
  btnsEl.innerHTML = "";
  const all = [];
  nAllNodes(mainNRoot, all);
  all.forEach((node) => {
    const b = document.createElement("button");
    b.className = "btn btn-p";
    b.style.cssText = "padding:5px 10px;font-size:.75rem;";
    b.textContent = node.v;
    b.title = `Add new node as child of "${node.v}"`;
    b.onclick = () => naryAttach(node);
    btnsEl.appendChild(b);
  });
}

function naryAttach(parentNode) {
  const raw = document.getElementById("naryInp").value.trim();
  if (!raw) {
    showMsg("Type a value first, then click a parent", "w");
    return;
  }
  const newNode = new NNode(raw);
  parentNode.ch.push(newNode);
  document.getElementById("naryInp").value = "";
  drawNary(getMainSVG(), mainNRoot, newNode._id);
  naryRebuildPicker();
  showMsg(`Added "${raw}" as child of "${parentNode.v}"`, "s");
  hlPS("insert");
}

function naryAdd() {
  const raw = document.getElementById("naryInp").value.trim();
  if (!raw) {
    showMsg("Enter a node value", "w");
    return;
  }
  if (!mainNRoot) {
    mainNRoot = new NNode(raw);
    document.getElementById("naryInp").value = "";
    drawNary(getMainSVG(), mainNRoot);
    naryRebuildPicker();
    showMsg(`Root "${raw}" created. Now add children!`, "s");
    hlPS("insert");
  } else {
    showMsg("Click a parent button below to attach this node", "i");
    document.querySelectorAll("#naryPickerBtns .btn").forEach((b) => {
      b.style.borderColor = "var(--o)";
      b.style.boxShadow = "0 0 8px rgba(245,158,11,.4)";
      setTimeout(() => {
        b.style.borderColor = "";
        b.style.boxShadow = "";
      }, 1400);
    });
  }
}

function naryPreorder() {
  if (!mainNRoot) {
    showMsg("Tree is empty", "w");
    return;
  }
  hlPS("preorder");
  const res = [];
  function pre(n) {
    res.push(n.v);
    n.ch.forEach(pre);
  }
  pre(mainNRoot);
  showMsg(`Preorder: [ ${res.join(" → ")} ]`, "s");
}

function naryLevelOrder() {
  if (!mainNRoot) {
    showMsg("Tree is empty", "w");
    return;
  }
  const q = [mainNRoot],
    res = [];
  while (q.length) {
    const n = q.shift();
    res.push(n.v);
    n.ch.forEach((c) => q.push(c));
  }
  showMsg(`Level-order: [ ${res.join(" → ")} ]`, "s");
}

function naryHeight() {
  if (!mainNRoot) {
    showMsg("Tree is empty", "w");
    return;
  }
  hlPS("height");
  showMsg(`Tree height = ${nH(mainNRoot)}`, "i");
}

//SWITCH TYPE

const PSEUDO_TEXT = {
  binary: {
    psi: "if empty: root=node<br>else: level-order BFS",
    pss: "no ordering — BFS/DFS all nodes",
    psio: "left → root → right",
    pspo: "root → left → right",
  },
  bst: {
    psi: "if v&lt;root: go left<br>else: go right",
    pss: "if v&lt;cur: go left<br>else: go right",
    psio: "gives sorted output (BST property)",
    pspo: "root then left subtree, right subtree",
  },
  nary: {
    psi: "find parent node<br>append child to parent.ch",
    pss: "BFS/DFS through all children",
    psio: "post-order: children then root",
    pspo: "pre-order: root then children",
  },
};
const VIZ_TITLES = {
  binary: "Tree Visualizer — Binary Tree",
  bst: "Tree Visualizer — Binary Search Tree (BST)",
  nary: "Tree Visualizer — N-ary Tree",
};

function switchType(t) {
  curType = t;
  bstRoot = null;
  btArr = [];
  mainNRoot = null;
  NNode._cnt = 0;
  document.querySelectorAll(".topt").forEach((o) => o.classList.remove("on"));
  document.querySelector(`[data-t="${t}"]`).classList.add("on");
  document.getElementById("vizTitle").textContent = VIZ_TITLES[t];

  const isNary = t === "nary";
  document.getElementById("ftBst").style.display = isNary ? "none" : "";
  document.getElementById("ftNary").style.display = isNary ? "" : "none";
  document.getElementById("naryPicker").classList.remove("show");
  document.getElementById("depthWarn").classList.remove("show");
  document.getElementById("skewWarn").classList.remove("show");
  if (isNary) {
    document.getElementById("naryInp").value = "";
    drawNary(getMainSVG(), null);
  } else {
    document.getElementById("mainInp").value = "";
    renderMain();
  }

  const ps = PSEUDO_TEXT[t];
  document.getElementById("psi").innerHTML = ps.psi;
  document.getElementById("pss").textContent = ps.pss;
  document.getElementById("psio").textContent = ps.psio;
  document.getElementById("pspo").textContent = ps.pspo;

  // FIX: don't call updateScenarios here to avoid re-initing scenarios on every type switch
  // Just update sub-panel visibility and refresh the active scenario
  updateScenarioPanels();
  updateCodeEditor();
}

//SCENARIO TABS

const STAB_CLS = {
  best: "s-best",
  avg: "s-avg",
  worst: "s-worst",
  custom: "s-custom",
};
let curScenario = "best";

// Only updates which sub-panels are visible — no recursive init calls
function updateScenarioPanels() {
  ["best", "avg", "worst"].forEach((tab) => {
    ["bst", "binary", "nary"].forEach((type) => {
      const ids = {
        best: `sb-${type}`,
        avg: `sa-${type}`,
        worst: `sw-${type}`,
      };
      const el = document.getElementById(ids[tab]);
      if (el) el.style.display = type === curType ? "" : "none";
    });
  });
}

function showScenario(name) {
  curScenario = name;
  document.querySelectorAll(".stab").forEach((b) => (b.className = "stab"));
  const cap = name.charAt(0).toUpperCase() + name.slice(1);
  document.getElementById("st" + cap).classList.add(STAB_CLS[name]);
  document.querySelectorAll(".spanel").forEach((p) => p.classList.remove("on"));
  document.getElementById("sp-" + name).classList.add("on");
  // FIX: call the correct init for each scenario, custom just shows as-is
  if (name === "best") initBest();
  if (name === "avg") initAvg();
  if (name === "worst") initWorst();
  if (name === "custom") initCustom();
}

//SCENARIO: BEST CASE

let scenBestRoot = null;
let binBestArr = [],
  binBestIdx = 0,
  binBestTimer = null;
let scenNBestRoot = null;

function initBest() {
  updateScenarioPanels(); // only updates visibility, no recursive call

  if (curType === "bst") {
    scenBestRoot = null;
    [40, 20, 60, 10, 30, 50, 70].forEach((v) => {
      scenBestRoot = bstIns(scenBestRoot, v);
    });
    drawBST(document.getElementById("sv-best"), scenBestRoot);
    const lg = document.getElementById("lg-best");
    lg.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lg, "BST [40,20,60,10,30,50,70] ready", "li");
    addLog(lg, "Balanced — height = 3", "li");
  }

  if (curType === "binary") {
    binBestArr = [];
    binBestIdx = 0;
    clearTimeout(binBestTimer);
    drawBST(document.getElementById("sv-best-b"), null);
    const lgb = document.getElementById("lg-best-b");
    lgb.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lgb, "Click Insert Next to build [1..7]", "li");
    const bb = document.getElementById("binBestBtn");
    if (bb) bb.disabled = false;
  }

  if (curType === "nary") {
    NNode._cnt = 0;
    scenNBestRoot = new NNode("A");
    ["B", "C", "D", "E", "F", "G"].forEach((v) =>
      scenNBestRoot.ch.push(new NNode(v)),
    );
    drawNary(document.getElementById("sv-best-n"), scenNBestRoot);
    const lg = document.getElementById("lg-best-n");
    lg.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lg, "Root A with 6 children — height = 1", "li");
    addLog(lg, "All nodes reachable in 1 hop", "li");
  }
}

async function scenBestSearchRoot() {
  if (!scenBestRoot) return;
  const lg = document.getElementById("lg-best");
  addLog(lg, "search(40) → check root...", "ls");
  await sleep(300);
  drawBST(document.getElementById("sv-best"), scenBestRoot, [], [40], []);
  addLog(lg, "✓ Found at root! 1 step = O(1)", "lk");
}

async function scenBestSearchLeaf() {
  if (!scenBestRoot) return;
  const lg = document.getElementById("lg-best");
  const path = [];
  bstSearch(scenBestRoot, 30, path);
  for (let i = 0; i < path.length; i++) {
    drawBST(
      document.getElementById("sv-best"),
      scenBestRoot,
      [],
      i === path.length - 1 ? [30] : [],
      [path[i]],
    );
    addLog(
      lg,
      `Step ${i + 1}: check ${path[i]}${i === path.length - 1 ? " → FOUND ✓" : ""}`,
      i === path.length - 1 ? "lk" : "ls",
    );
    await sleep(580);
  }
  addLog(lg, `${path.length} steps ≈ O(log n) ✓`, "lk");
}

const BIN_BEST_DATA = [1, 2, 3, 4, 5, 6, 7];
function binBestStepFn() {
  if (binBestIdx >= BIN_BEST_DATA.length) {
    addLog(
      document.getElementById("lg-best-b"),
      "All 7 inserted — perfectly balanced!",
      "lk",
    );
    return;
  }
  const v = BIN_BEST_DATA[binBestIdx++];
  binBestArr.push(v);
  drawBST(document.getElementById("sv-best-b"), arrToTree(binBestArr), [v]);
  addLog(
    document.getElementById("lg-best-b"),
    `Inserted ${v} — level-order index ${binBestIdx - 1}`,
    "ls",
  );
  if (binBestIdx >= BIN_BEST_DATA.length) {
    addLog(
      document.getElementById("lg-best-b"),
      "✓ Height = 3, balanced!",
      "lk",
    );
    const bb = document.getElementById("binBestBtn");
    if (bb) bb.disabled = true;
  }
}
function binBestAutoFn() {
  clearTimeout(binBestTimer);
  const bb = document.getElementById("binBestBtn");
  if (bb) bb.disabled = true;
  function go() {
    if (binBestIdx >= BIN_BEST_DATA.length) return;
    binBestStepFn();
    binBestTimer = setTimeout(go, 650);
  }
  go();
}

async function naryBestSearchFn() {
  if (!scenNBestRoot || !scenNBestRoot.ch.length) return;
  const target = scenNBestRoot.ch[2];
  const lg = document.getElementById("lg-best-n");
  addLog(lg, `search("${target.v}") → check root's children...`, "ls");
  await sleep(350);
  drawNary(document.getElementById("sv-best-n"), scenNBestRoot, target._id);
  addLog(lg, `✓ Found "${target.v}" in 1 step = O(1)!`, "lk");
}

//SCENARIO: AVERAGE CASE

const AVG_DATA = [50, 25, 75, 12, 37, 62, 88],
  AVG_TARGET = 37;
let avgRoot = null,
  avgPath = [],
  avgIdx = 0,
  avgTimer = null;
let binAvgRoot = null,
  binAvgOrder = [],
  binAvgIdx = 0,
  binAvgTimer = null;
let nAvgRoot = null,
  nAvgQueue = [],
  nAvgTimer = null;

function initAvg() {
  updateScenarioPanels();

  if (curType === "bst") {
    avgRoot = null;
    AVG_DATA.forEach((v) => {
      avgRoot = bstIns(avgRoot, v);
    });
    avgPath = [];
    bstSearch(avgRoot, AVG_TARGET, avgPath);
    avgIdx = 0;
    clearTimeout(avgTimer);
    drawBST(document.getElementById("sv-avg"), avgRoot);
    const lg = document.getElementById("lg-avg");
    lg.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lg, `BST: [${AVG_DATA.join(",")}]`, "li");
    addLog(
      lg,
      `Target: ${AVG_TARGET} — expect ~${Math.ceil(Math.log2(AVG_DATA.length))} steps`,
      "li",
    );
    const sb = document.getElementById("avgStepBtn");
    if (sb) sb.disabled = false;
    const ab = document.getElementById("avgAutoBtn");
    if (ab) ab.disabled = false;
  }

  if (curType === "binary") {
    binAvgRoot = arrToTree([1, 2, 3, 4, 5, 6, 7]);
    binAvgOrder = [];
    bstInorder(binAvgRoot, binAvgOrder);
    binAvgIdx = 0;
    clearTimeout(binAvgTimer);
    drawBST(document.getElementById("sv-avg-b"), binAvgRoot);
    const lg = document.getElementById("lg-avg-b");
    lg.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lg, "Inorder on [1,2,3,4,5,6,7]", "li");
    addLog(lg, "Will visit all 7 nodes — O(n)", "li");
    const sb = document.getElementById("binAvgBtn");
    if (sb) sb.disabled = false;
  }

  if (curType === "nary") {
    NNode._cnt = 0;
    nAvgRoot = new NNode("1");
    const n2 = new NNode("2"),
      n3 = new NNode("3"),
      n4 = new NNode("4");
    nAvgRoot.ch.push(n2, n3, n4);
    n2.ch.push(new NNode("5"), new NNode("6"));
    n3.ch.push(new NNode("7"), new NNode("8"));
    n4.ch.push(new NNode("9"));
    nAvgQueue = [nAvgRoot];
    clearTimeout(nAvgTimer);
    drawNary(document.getElementById("sv-avg-n"), nAvgRoot);
    const lg = document.getElementById("lg-avg-n");
    lg.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lg, "BFS on 3-level N-ary tree (9 nodes)", "li");
    addLog(lg, "Every node visited once — O(n)", "li");
    const sb = document.getElementById("naryAvgBtn");
    if (sb) sb.disabled = false;
  }
}

function avgStep() {
  if (avgIdx >= avgPath.length) return;
  const v = avgPath[avgIdx],
    isFound = v === AVG_TARGET;
  drawBST(
    document.getElementById("sv-avg"),
    avgRoot,
    [],
    isFound ? [v] : [],
    isFound ? [] : [v],
  );
  const dir =
    v < AVG_TARGET
      ? "< target → go right"
      : v > AVG_TARGET
        ? "> target → go left"
        : "= FOUND ✓";
  addLog(
    document.getElementById("lg-avg"),
    `Step ${avgIdx + 1}: check ${v} ${dir}`,
    isFound ? "lk" : "ls",
  );
  avgIdx++;
  if (avgIdx >= avgPath.length) {
    addLog(
      document.getElementById("lg-avg"),
      `Done in ${avgPath.length} steps — O(log n) ✓`,
      "lk",
    );
    const sb = document.getElementById("avgStepBtn");
    if (sb) sb.disabled = true;
    const ab = document.getElementById("avgAutoBtn");
    if (ab) ab.disabled = true;
    clearTimeout(avgTimer);
  }
}
function avgAuto() {
  const ab = document.getElementById("avgAutoBtn");
  if (ab) ab.disabled = true;
  function go() {
    if (avgIdx >= avgPath.length) return;
    avgStep();
    avgTimer = setTimeout(go, 750);
  }
  go();
}

function binAvgStepFn() {
  if (binAvgIdx >= binAvgOrder.length) {
    addLog(
      document.getElementById("lg-avg-b"),
      "All nodes visited — O(n)",
      "lk",
    );
    return;
  }
  const v = binAvgOrder[binAvgIdx++];
  drawBST(document.getElementById("sv-avg-b"), binAvgRoot, [v]);
  addLog(
    document.getElementById("lg-avg-b"),
    `Visit node ${v} (${binAvgIdx}/${binAvgOrder.length})`,
    "lt",
  );
  if (binAvgIdx >= binAvgOrder.length) {
    addLog(
      document.getElementById("lg-avg-b"),
      `Inorder: [${binAvgOrder.join("→")}]`,
      "lk",
    );
    const sb = document.getElementById("binAvgBtn");
    if (sb) sb.disabled = true;
  }
}
function binAvgAutoFn() {
  clearTimeout(binAvgTimer);
  const sb = document.getElementById("binAvgBtn");
  if (sb) sb.disabled = true;
  function go() {
    if (binAvgIdx >= binAvgOrder.length) return;
    binAvgStepFn();
    binAvgTimer = setTimeout(go, 520);
  }
  go();
}

function naryAvgStepFn() {
  if (!nAvgQueue.length) {
    addLog(document.getElementById("lg-avg-n"), "BFS complete — O(n) ✓", "lk");
    return;
  }
  const node = nAvgQueue.shift();
  node.ch.forEach((c) => nAvgQueue.push(c));
  drawNary(document.getElementById("sv-avg-n"), nAvgRoot, node._id);
  addLog(
    document.getElementById("lg-avg-n"),
    `Visit "${node.v}" — queue: [${nAvgQueue.map((n) => n.v).join(",") || "empty"}]`,
    "lt",
  );
  if (!nAvgQueue.length) {
    addLog(
      document.getElementById("lg-avg-n"),
      "All 9 nodes visited → O(n)",
      "lk",
    );
    const sb = document.getElementById("naryAvgBtn");
    if (sb) sb.disabled = true;
  }
}
function naryAvgAutoFn() {
  clearTimeout(nAvgTimer);
  const sb = document.getElementById("naryAvgBtn");
  if (sb) sb.disabled = true;
  function go() {
    if (!nAvgQueue.length) return;
    naryAvgStepFn();
    nAvgTimer = setTimeout(go, 620);
  }
  go();
}

//SCENARIO: WORST CASE

const WORST_DATA = [10, 20, 30, 40, 50, 60];
let worstRoot = null,
  worstIdx = 0,
  worstDone = false,
  worstTimer = null;
let binWorstRoot = null,
  binWorstScan = [],
  binWorstIdx = 0,
  binWorstDone = false,
  binWorstTimer = null;
const NARY_CHAIN = ["A", "B", "C", "D", "E", "F"];
let nWorstRoot = null,
  nWorstIdx = 0,
  nWorstDone = false,
  nWorstTimer = null;

function initWorst() {
  updateScenarioPanels();

  if (curType === "bst") {
    worstRoot = null;
    WORST_DATA.forEach((v) => {
      worstRoot = bstIns(worstRoot, v);
    });
    worstIdx = 0;
    worstDone = false;
    clearTimeout(worstTimer);
    drawBST(document.getElementById("sv-worst"), worstRoot);
    const lg = document.getElementById("lg-worst");
    lg.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lg, "Skewed BST: 10→20→30→40→50→60", "lw");
    addLog(lg, "Search 99 (absent) — must check ALL", "lw");
    const sb = document.getElementById("worstStepBtn");
    if (sb) sb.disabled = false;
    const ab = document.getElementById("worstAutoBtn");
    if (ab) ab.disabled = false;
  }

  if (curType === "binary") {
    binWorstRoot = arrToTree([4, 2, 6, 1, 3, 5, 7]);
    // BFS order scan
    binWorstScan = [];
    const q = [binWorstRoot];
    while (q.length) {
      const n = q.shift();
      if (n) {
        binWorstScan.push(n.v);
        q.push(n.l, n.r);
      }
    }
    binWorstIdx = 0;
    binWorstDone = false;
    clearTimeout(binWorstTimer);
    drawBST(document.getElementById("sv-worst-b"), binWorstRoot);
    const lg = document.getElementById("lg-worst-b");
    lg.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lg, "Binary Tree — no ordering rule", "lw");
    addLog(lg, "Search for 7 — scan all nodes", "lw");
    const sb = document.getElementById("binWorstBtn");
    if (sb) sb.disabled = false;
  }

  if (curType === "nary") {
    NNode._cnt = 0;
    nWorstRoot = null;
    let prev = null;
    NARY_CHAIN.forEach((v) => {
      const n = new NNode(v);
      if (!nWorstRoot) nWorstRoot = n;
      else prev.ch.push(n);
      prev = n;
    });
    nWorstIdx = 0;
    nWorstDone = false;
    clearTimeout(nWorstTimer);
    drawNary(document.getElementById("sv-worst-n"), nWorstRoot);
    const lg = document.getElementById("lg-worst-n");
    lg.innerHTML = '<div class="log-title">📋 Log</div>';
    addLog(lg, "Chain: A→B→C→D→E→F (branching=1)", "lw");
    addLog(lg, 'Search "Z" — visit all nodes', "lw");
    const sb = document.getElementById("naryWorstBtn");
    if (sb) sb.disabled = false;
  }
}

function worstStepFn() {
  if (worstDone || worstIdx >= WORST_DATA.length) return;
  const v = WORST_DATA[worstIdx];
  drawBST(document.getElementById("sv-worst"), worstRoot, [], [], [v]);
  addLog(
    document.getElementById("lg-worst"),
    `Step ${worstIdx + 1}: check ${v} ≠ 99, go right`,
    "ld",
  );
  worstIdx++;
  if (worstIdx >= WORST_DATA.length) {
    worstDone = true;
    setTimeout(() => {
      addLog(document.getElementById("lg-worst"), "99 NOT FOUND ❌", "lw");
      addLog(
        document.getElementById("lg-worst"),
        `${WORST_DATA.length} steps = N → O(N)`,
        "lk",
      );
    }, 280);
    const sb = document.getElementById("worstStepBtn");
    if (sb) sb.disabled = true;
    const ab = document.getElementById("worstAutoBtn");
    if (ab) ab.disabled = true;
    clearTimeout(worstTimer);
  }
}
function worstAutoFn() {
  if (worstDone) return;
  const ab = document.getElementById("worstAutoBtn");
  if (ab) ab.disabled = true;
  function go() {
    if (worstDone || worstIdx >= WORST_DATA.length) return;
    worstStepFn();
    worstTimer = setTimeout(go, 680);
  }
  go();
}

function binWorstStepFn() {
  if (binWorstDone || binWorstIdx >= binWorstScan.length) return;
  const v = binWorstScan[binWorstIdx],
    isIt = v === 7;
  drawBST(
    document.getElementById("sv-worst-b"),
    binWorstRoot,
    [],
    isIt ? [v] : [],
    isIt ? [] : [v],
  );
  addLog(
    document.getElementById("lg-worst-b"),
    `Step ${binWorstIdx + 1}: check ${v} ${isIt ? "→ FOUND ✓" : "≠ 7"}`,
    isIt ? "lk" : "ld",
  );
  binWorstIdx++;
  if (isIt || binWorstIdx >= binWorstScan.length) {
    binWorstDone = true;
    setTimeout(
      () =>
        addLog(
          document.getElementById("lg-worst-b"),
          `Scanned ${binWorstIdx} nodes — O(N)`,
          "lk",
        ),
      250,
    );
    const sb = document.getElementById("binWorstBtn");
    if (sb) sb.disabled = true;
    clearTimeout(binWorstTimer);
  }
}
function binWorstAutoFn() {
  clearTimeout(binWorstTimer);
  const sb = document.getElementById("binWorstBtn");
  if (sb) sb.disabled = true;
  function go() {
    if (binWorstDone || binWorstIdx >= binWorstScan.length) return;
    binWorstStepFn();
    binWorstTimer = setTimeout(go, 620);
  }
  go();
}

function naryWorstStepFn() {
  if (nWorstDone) return;
  // Walk chain to position nWorstIdx
  let node = nWorstRoot;
  for (let i = 0; i < nWorstIdx; i++) {
    if (node.ch.length) node = node.ch[0];
    else break;
  }
  drawNary(document.getElementById("sv-worst-n"), nWorstRoot, node._id);
  addLog(
    document.getElementById("lg-worst-n"),
    `Step ${nWorstIdx + 1}: check "${node.v}" ≠ "Z"`,
    "ld",
  );
  nWorstIdx++;
  if (nWorstIdx >= NARY_CHAIN.length) {
    nWorstDone = true;
    setTimeout(() => {
      addLog(document.getElementById("lg-worst-n"), '"Z" NOT FOUND ❌', "lw");
      addLog(
        document.getElementById("lg-worst-n"),
        `${NARY_CHAIN.length} steps = N → O(N)`,
        "lk",
      );
    }, 280);
    const sb = document.getElementById("naryWorstBtn");
    if (sb) sb.disabled = true;
    clearTimeout(nWorstTimer);
  }
}
function naryWorstAutoFn() {
  if (nWorstDone) return;
  const sb = document.getElementById("naryWorstBtn");
  if (sb) sb.disabled = true;
  function go() {
    if (nWorstDone) return;
    naryWorstStepFn();
    nWorstTimer = setTimeout(go, 680);
  }
  go();
}

//CUSTOM BST

let custRoot = null,
  ccTmr = null;

function initCustom() {
  custRoot = null;
  drawBST(document.getElementById("sv-custom"), null);
  const lg = document.getElementById("lg-custom");
  lg.innerHTML = '<div class="log-title">📋 Log</div>';
  addLog(lg, "Custom BST ready. Start with 50!", "li");
  ["i", "d", "s"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c) c.className = "cc";
  });
}

function hlCC(t) {
  ["i", "d", "s"].forEach((x) => {
    const c = document.getElementById("cc-" + x);
    if (c) c.className = "cc";
  });
  clearTimeout(ccTmr);
  const c = document.getElementById("cc-" + t);
  if (c) {
    c.classList.add("hi-" + t);
    ccTmr = setTimeout(() => (c.className = "cc"), 1800);
  }
}

function showToast(t, msg) {
  const el = document.getElementById("ccToast");
  const ic = document.getElementById("ccTIcon");
  const tx = document.getElementById("ccTText");
  ic.textContent = { i: "➕", d: "🗑", s: "🔍", w: "⚠" }[t] || "⚡";
  tx.textContent = msg;
  el.className = "cc-toast show ct-" + t;
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.className = "cc-toast";
  }, 2300);
}

function custInsert() {
  const v = parseInt(document.getElementById("cInp").value);
  if (isNaN(v)) {
    showToast("w", "Enter a number!");
    return;
  }
  if (bstFind(custRoot, v)) {
    showToast("w", `${v} already exists`);
    return;
  }
  custRoot = bstIns(custRoot, v);
  drawBST(document.getElementById("sv-custom"), custRoot, [v]);
  hlCC("i");
  const h = bstH(custRoot);
  showToast("i", `insert(${v}) — height=${h}`);
  addLog(
    document.getElementById("lg-custom"),
    `insert(${v}) ✓  height=${h}`,
    "ls",
  );
  document.getElementById("cInp").value = "";
}

function custDelete() {
  const v = parseInt(document.getElementById("cInp").value);
  if (isNaN(v)) {
    showToast("w", "Enter a number!");
    return;
  }
  if (!bstFind(custRoot, v)) {
    showToast("w", `${v} not found`);
    return;
  }
  const node = bstFind(custRoot, v);
  let msg = "";
  if (!node.l && !node.r) msg = `delete(${v}) — leaf removed`;
  else if (!node.l || !node.r) msg = `delete(${v}) — replaced by child`;
  else {
    let s = node.r;
    while (s.l) s = s.l;
    msg = `delete(${v}) — inorder successor ${s.v}`;
  }
  custRoot = bstDel(custRoot, v);
  drawBST(document.getElementById("sv-custom"), custRoot);
  hlCC("d");
  showToast("d", msg);
  addLog(document.getElementById("lg-custom"), msg, "ld");
  document.getElementById("cInp").value = "";
}

async function custSearch() {
  const v = parseInt(document.getElementById("cInp").value);
  if (isNaN(v)) {
    showToast("w", "Enter a number!");
    return;
  }
  const path = [];
  const res = bstSearch(custRoot, v, path);
  const lg = document.getElementById("lg-custom");
  if (!res) {
    showToast("w", `${v} not found`);
    addLog(lg, `search(${v}) → not found`, "lw");
    return;
  }
  for (let i = 0; i < path.length; i++) {
    drawBST(
      document.getElementById("sv-custom"),
      custRoot,
      [],
      path[i] === v ? [v] : [],
      [path[i]],
    );
    await sleep(480);
  }
  hlCC("s");
  showToast("s", `search(${v}) — ${path.length} step(s)`);
  addLog(lg, `search(${v}) found in ${path.length} step(s)`, "ls");
  document.getElementById("cInp").value = "";
}

function custReset() {
  initCustom();
  const t = document.getElementById("ccToast");
  if (t) t.className = "cc-toast";
}

document.getElementById("cInp").addEventListener("keydown", (e) => {
  if (e.key === "Enter") custInsert();
});

//CODE EDITOR

const CODE = {
  binary: {
    cpp: `#include <iostream>\n#include <queue>\nusing namespace std;\nstruct Node{int d;Node*l=nullptr,*r=nullptr;Node(int v):d(v){}};\n// Level-order insert (complete binary tree)\nNode* insert(Node* root, int val){\n    Node* n=new Node(val);\n    if(!root) return n;\n    queue<Node*> q; q.push(root);\n    while(!q.empty()){\n        auto cur=q.front(); q.pop();\n        if(!cur->l){cur->l=n;return root;}else q.push(cur->l);\n        if(!cur->r){cur->r=n;return root;}else q.push(cur->r);\n    }\n    return root;\n}\nvoid inorder(Node* r){\n    if(!r)return; inorder(r->l); cout<<r->d<<" "; inorder(r->r);\n}\nint main(){\n    Node* root=nullptr;\n    for(int v:{1,2,3,4,5,6,7}) root=insert(root,v);\n    cout<<"Inorder: "; inorder(root); cout<<endl;\n}`,
    python: `from collections import deque\nclass Node:\n    def __init__(self,v): self.d=v; self.l=self.r=None\n\ndef insert(root,val):\n    n=Node(val)\n    if not root: return n\n    q=deque([root])\n    while q:\n        cur=q.popleft()\n        if not cur.l: cur.l=n; return root\n        q.append(cur.l)\n        if not cur.r: cur.r=n; return root\n        q.append(cur.r)\n    return root\n\ndef inorder(root,res=[]):\n    if not root: return\n    inorder(root.l,res); res.append(root.d); inorder(root.r,res)\n    return res\n\nroot=None\nfor v in [1,2,3,4,5,6,7]: root=insert(root,v)\nprint("Inorder:",inorder(root,[]))`,
    java: `import java.util.LinkedList;\nimport java.util.Queue;\nclass Node{int d;Node l,r;Node(int v){d=v;}}\npublic class BinaryTree{\n    static Node insert(Node root,int val){\n        Node n=new Node(val);\n        if(root==null)return n;\n        Queue<Node>q=new LinkedList<>();q.add(root);\n        while(!q.isEmpty()){\n            Node cur=q.poll();\n            if(cur.l==null){cur.l=n;return root;}else q.add(cur.l);\n            if(cur.r==null){cur.r=n;return root;}else q.add(cur.r);\n        }\n        return root;\n    }\n    static void inorder(Node r){if(r==null)return;inorder(r.l);System.out.print(r.d+" ");inorder(r.r);}\n    public static void main(String[]a){\n        Node root=null;\n        for(int v:new int[]{1,2,3,4,5,6,7})root=insert(root,v);\n        System.out.print("Inorder: ");inorder(root);\n    }\n}`,
    javascript: `class Node{constructor(v){this.d=v;this.l=null;this.r=null;}}\nfunction insert(root,val){\n    const n=new Node(val);\n    if(!root)return n;\n    const q=[root];\n    while(q.length){\n        const cur=q.shift();\n        if(!cur.l){cur.l=n;return root;}else q.push(cur.l);\n        if(!cur.r){cur.r=n;return root;}else q.push(cur.r);\n    }\n    return root;\n}\nfunction inorder(r,res=[]){\n    if(!r)return;inorder(r.l,res);res.push(r.d);inorder(r.r,res);return res;\n}\nlet root=null;\n[1,2,3,4,5,6,7].forEach(v=>root=insert(root,v));\nconsole.log("Inorder:",inorder(root,[]).join(" "));`,
  },
  bst: {
    cpp: `#include <iostream>\nusing namespace std;\nstruct Node{int d;Node*l=nullptr,*r=nullptr;Node(int v):d(v){}};  \nNode* insert(Node*r,int v){if(!r)return new Node(v);if(v<r->d)r->l=insert(r->l,v);else if(v>r->d)r->r=insert(r->r,v);return r;}\nbool search(Node*r,int v){if(!r)return false;if(v==r->d)return true;return v<r->d?search(r->l,v):search(r->r,v);}\nvoid inorder(Node*r){if(!r)return;inorder(r->l);cout<<r->d<<" ";inorder(r->r);}\nint main(){\n    Node*root=nullptr;\n    for(int v:{50,30,70,20,40,60,80})root=insert(root,v);\n    cout<<"Inorder: ";inorder(root);cout<<endl;\n    cout<<"Search 40: "<<(search(root,40)?"Found":"Not found")<<endl;\n}`,
    python: `class Node:\n    def __init__(self,v): self.d=v; self.l=self.r=None\n\ndef insert(root,v):\n    if not root: return Node(v)\n    if v<root.d: root.l=insert(root.l,v)\n    elif v>root.d: root.r=insert(root.r,v)\n    return root\n\ndef search(root,v):\n    if not root: return False\n    if v==root.d: return True\n    return search(root.l,v) if v<root.d else search(root.r,v)\n\ndef inorder(root,res=[]):\n    if not root: return\n    inorder(root.l,res); res.append(root.d); inorder(root.r,res)\n    return res\n\nroot=None\nfor v in [50,30,70,20,40,60,80]: root=insert(root,v)\nprint("Inorder:",inorder(root,[]))\nprint("Search 40:",search(root,40))`,
    java: `class BSTNode{int d;BSTNode l,r;BSTNode(int v){d=v;}}\npublic class BST{\n    BSTNode root;\n    void insert(int v){ root=ins(root,v); }\n    BSTNode ins(BSTNode r,int v){\n        if(r==null)return new BSTNode(v);\n        if(v<r.d)r.l=ins(r.l,v);else if(v>r.d)r.r=ins(r.r,v);\n        return r;\n    }\n    boolean search(BSTNode r,int v){\n        if(r==null)return false;if(v==r.d)return true;\n        return v<r.d?search(r.l,v):search(r.r,v);\n    }\n    void inorder(BSTNode r){if(r==null)return;inorder(r.l);System.out.print(r.d+" ");inorder(r.r);}\n    public static void main(String[]a){\n        BST b=new BST();\n        for(int v:new int[]{50,30,70,20,40,60,80})b.insert(v);\n        System.out.print("Inorder: ");b.inorder(b.root);System.out.println();\n        System.out.println("Search 40: "+b.search(b.root,40));\n    }\n}`,
    javascript: `class BSTNode{constructor(v){this.d=v;this.l=null;this.r=null;}}\nfunction insert(r,v){if(!r)return new BSTNode(v);if(v<r.d)r.l=insert(r.l,v);else if(v>r.d)r.r=insert(r.r,v);return r;}\nfunction search(r,v){if(!r)return false;if(v===r.d)return true;return v<r.d?search(r.l,v):search(r.r,v);}\nfunction inorder(r,res=[]){if(!r)return;inorder(r.l,res);res.push(r.d);inorder(r.r,res);return res;}\nlet root=null;\n[50,30,70,20,40,60,80].forEach(v=>root=insert(root,v));\nconsole.log("Inorder:",inorder(root,[]).join(" "));\nconsole.log("Search 40:",search(root,40));`,
  },
  nary: {
    cpp: `#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nstruct Node{int d;vector<Node*>ch;Node(int v):d(v){}};\nvoid addChild(Node*p,Node*c){p->ch.push_back(c);}\nvoid dfs(Node*r){if(!r)return;cout<<r->d<<" ";for(auto c:r->ch)dfs(c);}\nvoid bfs(Node*r){queue<Node*>q;q.push(r);while(!q.empty()){auto n=q.front();q.pop();cout<<n->d<<" ";for(auto c:n->ch)q.push(c);}}\nint main(){\n    Node*root=new Node(1);\n    Node*n2=new Node(2),*n3=new Node(3);\n    addChild(root,n2);addChild(root,n3);\n    addChild(n2,new Node(4));addChild(n2,new Node(5));\n    cout<<"DFS: ";dfs(root);cout<<endl;\n    cout<<"BFS: ";bfs(root);cout<<endl;\n}`,
    python: `from collections import deque\nclass Node:\n    def __init__(self,v): self.d=v; self.ch=[]\n\ndef add_child(p,c): p.ch.append(c)\n\ndef dfs(root,res=[]):\n    if not root: return\n    res.append(root.d)\n    for c in root.ch: dfs(c,res)\n    return res\n\ndef bfs(root):\n    q,res=deque([root]),[]\n    while q:\n        n=q.popleft(); res.append(n.d)\n        q.extend(n.ch)\n    return res\n\nroot=Node(1); n2,n3=Node(2),Node(3)\nadd_child(root,n2); add_child(root,n3)\nadd_child(n2,Node(4)); add_child(n2,Node(5))\nprint("DFS:",dfs(root,[])); print("BFS:",bfs(root))`,
    java: `import java.util.*;\nclass NNode{int d;List<NNode>ch=new ArrayList<>();NNode(int v){d=v;}}\npublic class NaryTree{\n    static void dfs(NNode r,List<Integer>res){if(r==null)return;res.add(r.d);for(NNode c:r.ch)dfs(c,res);}\n    static List<Integer>bfs(NNode r){\n        Queue<NNode>q=new LinkedList<>();q.add(r);\n        List<Integer>res=new ArrayList<>();\n        while(!q.isEmpty()){NNode n=q.poll();res.add(n.d);q.addAll(n.ch);}\n        return res;\n    }\n    public static void main(String[]a){\n        NNode root=new NNode(1),n2=new NNode(2),n3=new NNode(3);\n        root.ch.add(n2);root.ch.add(n3);\n        n2.ch.add(new NNode(4));n2.ch.add(new NNode(5));\n        List<Integer>d=new ArrayList<>();dfs(root,d);\n        System.out.println("DFS:"+d);\n        System.out.println("BFS:"+bfs(root));\n    }\n}`,
    javascript: `class NNode{constructor(v){this.d=v;this.ch=[];}}\nfunction dfs(r,res=[]){if(!r)return;res.push(r.d);r.ch.forEach(c=>dfs(c,res));return res;}\nfunction bfs(r){const q=[r],res=[];while(q.length){const n=q.shift();res.push(n.d);n.ch.forEach(c=>q.push(c));}return res;}\nconst root=new NNode(1),n2=new NNode(2),n3=new NNode(3);\nroot.ch.push(n2,n3);\nn2.ch.push(new NNode(4),new NNode(5));\nconsole.log("DFS:", dfs(root,[]).join(" "));\nconsole.log("BFS:", bfs(root).join(" "));`,
  },
};

let cm,
  curLang = "cpp";
const MODES = {
  cpp: "text/x-c++src",
  python: "text/x-python",
  java: "text/x-java",
  javascript: "text/javascript",
};
const LNAMES = {
  cpp: "C++",
  python: "Python",
  java: "Java",
  javascript: "JavaScript",
};

function cmTheme(t) {
  return t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean";
}

function initEditor() {
  const t = document.body.getAttribute("data-theme") || "dark";
  cm = CodeMirror.fromTextArea(document.getElementById("codeArea"), {
    mode: MODES.cpp,
    theme: cmTheme(t),
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });
  updateCodeEditor();
}

function updateCodeEditor() {
  if (!cm) return;
  const tmpl = CODE[curType] || CODE.binary;
  cm.setValue(tmpl[curLang] || tmpl.cpp);
  cm.setOption("mode", MODES[curLang]);
}

document.querySelectorAll(".lt-btn").forEach((btn) => {
  btn.onclick = () => {
    document
      .querySelectorAll(".lt-btn")
      .forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    curLang = btn.dataset.lang;
    document.getElementById("edLang").textContent = LNAMES[curLang] || curLang;
    updateCodeEditor();
  };
});

function copyCode() {
  navigator.clipboard.writeText(cm.getValue()).catch(() => {});
  const b = document.querySelector(".copy-btn");
  b.textContent = "✓";
  b.style.background = "var(--g)";
  setTimeout(() => {
    b.textContent = "Copy";
    b.style.background = "var(--p)";
  }, 2000);
}

function runCode() {
  const out = document.getElementById("codeOut");
  out.innerHTML = '<span style="color:#fbbf24">🔄 Simulating...</span><br><br>';
  const t = { binary: "Binary Tree", bst: "BST", nary: "N-ary Tree" }[curType];
  out.innerHTML += `<span style="color:var(--c)">${t} — ${LNAMES[curLang]}</span><br><br>`;
  if (curType === "binary") {
    out.innerHTML +=
      '<span style="color:var(--g)">Inserted: 1,2,3,4,5,6,7 (level-order)</span><br><span style="color:var(--ts)">Inorder: 4 2 5 1 6 3 7</span><br><span style="color:var(--ts)">Height: 3</span><br>';
  } else if (curType === "bst") {
    out.innerHTML +=
      '<span style="color:var(--g)">Inserted: 50,30,70,20,40,60,80</span><br><span style="color:var(--ts)">Inorder: 20 30 40 50 60 70 80</span><br><span style="color:var(--ts)">Search 40: Found</span><br>';
  } else {
    out.innerHTML +=
      '<span style="color:var(--g)">Built N-ary tree: 1→[2,3], 2→[4,5]</span><br><span style="color:var(--ts)">DFS: 1 2 4 5 3</span><br><span style="color:var(--ts)">BFS: 1 2 3 4 5</span><br>';
  }
  out.innerHTML +=
    '<br><span style="color:var(--g)">✓ Execution complete</span>';
}

//UTILS

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function addLog(el, txt, cls = "li") {
  if (!el) return;
  const e = document.createElement("div");
  e.className = "le " + cls;
  e.textContent = "> " + txt;
  el.appendChild(e);
  el.scrollTop = el.scrollHeight;
}

//THEME

const TI = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};
const THEMES = ["dark", "light", "blue"];

document.getElementById("themeBtn").onclick = () => {
  const cur = document.body.getAttribute("data-theme") || "dark";
  const nxt = THEMES[(THEMES.indexOf(cur) + 1) % 3];
  document.body.setAttribute("data-theme", nxt);
  document.getElementById("themeIco").innerHTML = TI[nxt];
  localStorage.setItem("dsa-theme", nxt);
  if (window.syncThemeToServer) window.syncThemeToServer(nxt);
  if (cm) cm.setOption("theme", cmTheme(nxt));
};

//HAMBURGER

const hbgEl = document.getElementById("hbg");
const mobNavEl = document.getElementById("mobNav");
let mOpen = false;

hbgEl.addEventListener("click", () => {
  mOpen = !mOpen;
  mobNavEl.classList.toggle("open", mOpen);
  const spans = hbgEl.querySelectorAll("span");
  if (mOpen) {
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
  if (mOpen && !mobNavEl.contains(e.target) && !hbgEl.contains(e.target)) {
    mOpen = false;
    mobNavEl.classList.remove("open");
    hbgEl.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  }
});
mobNavEl.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mOpen = false;
    mobNavEl.classList.remove("open");
    hbgEl.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  }),
);

//LEVEL NAVIGATION

document.getElementById("lb1").onclick = () =>
  (window.location.href = "tree_L1.html");

// FIX: lb2 stays on the current page
document.getElementById("lb2").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.getElementById("lb3").onclick = () => {
  if (isLevelUnlocked("tree", 2)) {
    window.location.href = "tree_L3.html";
    return;
  }
  document.getElementById("mMsg").textContent =
    "Pass the Level 2 Quiz to unlock Level 3.";
  document.getElementById("mStart").onclick = () =>
    (window.location.href = "quiz.html?id=tree-l2");
  document.getElementById("qModal").style.display = "flex";
};
document.getElementById("mCancel").onclick = () => {
  document.getElementById("qModal").style.display = "none";
};
window.onclick = (e) => {
  if (e.target === document.getElementById("qModal"))
    document.getElementById("qModal").style.display = "none";
};

//KEYBOARD SHORTCUTS

document.getElementById("mainInp").addEventListener("keydown", (e) => {
  if (e.key === "Enter") doInsert();
});
document.getElementById("naryInp").addEventListener("keydown", (e) => {
  if (e.key === "Enter") naryAdd();
});

//INIT

window.onload = () => {
  const t = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIco").innerHTML = TI[t];

  // Boot with binary tree + seed data
  curType = "binary";
  [1, 2, 3, 4, 5, 6, 7].forEach((v) => btArr.push(v));
  renderMain();

  initEditor();

  // FIX: init sub-panels and scenarios cleanly, no circular calls
  updateScenarioPanels();
  initBest(); // sets up Best Case for binary (the default type + tab)
  initCustom(); // Custom BST always ready
};

// Re-render on resize
let resizeTmr;
window.addEventListener("resize", () => {
  clearTimeout(resizeTmr);
  resizeTmr = setTimeout(() => {
    renderMain();
  }, 200);
});
