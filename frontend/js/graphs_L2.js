//  ─ THEME
const THEMES = ["dark", "light", "blue"];
const CM_THEMES = {
  dark: "material-ocean",
  light: "eclipse",
  blue: "material-ocean",
};
const THEME_ICONS = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

let thIdx = THEMES.indexOf(localStorage.getItem("dsa-theme") || "dark");

const applyTheme = (t) => {
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIcon").innerHTML = THEME_ICONS[t];
  localStorage.setItem("dsa-theme", t);
  if (window.syncThemeToServer) window.syncThemeToServer(t);
  if (editorCM) editorCM.setOption("theme", CM_THEMES[t]);
};

document.getElementById("themeToggle").addEventListener("click", () => {
  thIdx = (thIdx + 1) % THEMES.length;
  applyTheme(THEMES[thIdx]);
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav")) navLinks.classList.remove("open");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("nav"))
    document.getElementById("navLinks").classList.remove("open");
});

document.querySelectorAll(".spRange").forEach((sl) => {
  sl.nextElementSibling.textContent =
    +sl.value <= 300 ? "Fast" : +sl.value >= 1000 ? "Slow" : "Normal";
  sl.addEventListener("input", () => {
    sl.nextElementSibling.textContent =
      +sl.value <= 300 ? "Fast" : +sl.value >= 1000 ? "Slow" : "Normal";
  });
});

const getSpeed = (wrap) => {
  const r = wrap && wrap.querySelector(".spRange");
  return r ? +r.value : 750;
};

//  ─ WHICH TYPE IS CURRENTLY ACTIVE
let currentType = "undirected";

// True when the active type is a directed graph
// Used by the scenario canvas draw and cycle code templates
const isDirectedType = (t) => ["directed", "cyclic", "dag"].includes(t);
const isWeightedType = (t) => t === "weighted";

//  ─ CANVAS / DRAW HELPERS
const NCOLORS = {
  unvisited: "#1e3a4a",
  current: "#f59e0b",
  inQueue: "#06b6d4",
  inStack: "#8b5cf6",
  visited: "#10b981",
  cycle: "#ef4444",
  path: "#ec4899",
};
const COMP_COLORS = [
  "#06b6d4",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#ef4444",
  "#3b82f6",
];

// Parse undirected "0-1,1-2" or directed same format (directed flag controls adj building)
const parseEdges = (str, directed = false, weighted = false) => {
  const edges = [];
  let maxNode = -1;
  str.split(",").forEach((e) => {
    const p = e.trim().split("-");
    if (p.length < 2) return;
    const u = parseInt(p[0]),
      v = parseInt(p[1]);
    if (isNaN(u) || isNaN(v)) return;
    const w = weighted && p[2] ? parseFloat(p[2]) : 1;
    edges.push({ u, v, w });
    maxNode = Math.max(maxNode, u, v);
  });
  const n = maxNode + 1;
  if (n <= 0) return { adj: [], n: 0 };
  const adj = Array.from({ length: n }, () => []);
  edges.forEach(({ u, v, w }) => {
    adj[u].push({ to: v, w });
    // Only add reverse edge for undirected
    if (!directed) adj[v].push({ to: u, w });
  });
  return { adj, n };
};

// Parse disconnected graph strings like "0-1,2-3,4"
const parseConnected = (str) => {
  let maxNode = -1;
  const edges = [];
  str.split(",").forEach((p) => {
    const sides = p.trim().split("-");
    if (sides.length >= 2) {
      const u = parseInt(sides[0]),
        v = parseInt(sides[1]);
      if (!isNaN(u) && !isNaN(v)) {
        edges.push({ u, v });
        maxNode = Math.max(maxNode, u, v);
      }
    } else {
      const solo = parseInt(sides[0]);
      if (!isNaN(solo)) maxNode = Math.max(maxNode, solo);
    }
  });
  const n = maxNode + 1;
  if (n <= 0) return { adj: [], n: 0 };
  const adj = Array.from({ length: n }, () => []);
  edges.forEach(({ u, v }) => {
    adj[u].push({ to: v, w: 1 });
    adj[v].push({ to: u, w: 1 });
  });
  return { adj, n };
};

const drawGraph = (
  canvasId,
  adj,
  n,
  nodeState,
  edgeActive,
  directed = false,
  weights = false,
) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 1) return;
  canvas.width = rect.width;
  canvas.height = rect.height;
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  if (!n) return;

  const margin = Math.max(28, Math.min(40, Math.min(W, H) * 0.12));
  const R = Math.min(W, H) / 2 - margin;
  const cx = W / 2,
    cy = H / 2;
  const nr = Math.max(14, Math.min(22, R * 0.22));

  // Position nodes in a circle
  const pos = Array.from({ length: n }, (_, i) => {
    const ang = (2 * Math.PI * i) / n - Math.PI / 2;
    return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) };
  });

  // Draw edges first so nodes sit on top
  for (let u = 0; u < n; u++) {
    (adj[u] || []).forEach(({ to: v, w }) => {
      // For undirected, avoid drawing the same edge twice
      if (!directed && v < u) return;

      const lit = edgeActive.has(`${u}-${v}`) || edgeActive.has(`${v}-${u}`);
      ctx.beginPath();
      ctx.moveTo(pos[u].x, pos[u].y);
      ctx.lineTo(pos[v].x, pos[v].y);
      ctx.strokeStyle = lit ? "#10b981" : "#2a3a4a";
      ctx.lineWidth = lit ? 2.6 : 1.6;
      ctx.stroke();

      // Weight label
      if (weights && w !== 1) {
        const mx = (pos[u].x + pos[v].x) / 2;
        const my = (pos[u].y + pos[v].y) / 2;
        ctx.fillStyle = lit ? "#10b981" : "#a0a0a0";
        ctx.font = `bold ${Math.max(9, Math.floor(nr * 0.55))}px 'JetBrains Mono',monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(w, mx, my - 8);
      }

      // Arrowhead for directed graphs
      if (directed) {
        const ang = Math.atan2(pos[v].y - pos[u].y, pos[v].x - pos[u].x);
        const tx = pos[v].x - nr * Math.cos(ang);
        const ty = pos[v].y - nr * Math.sin(ang);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(
          tx - 10 * Math.cos(ang - 0.42),
          ty - 10 * Math.sin(ang - 0.42),
        );
        ctx.lineTo(
          tx - 10 * Math.cos(ang + 0.42),
          ty - 10 * Math.sin(ang + 0.42),
        );
        ctx.fillStyle = lit ? "#10b981" : "#3a4a5a";
        ctx.fill();
      }
    });
  }

  // Draw nodes
  for (let i = 0; i < n; i++) {
    const st = nodeState[i] || "unvisited";
    let color;
    if (st.startsWith("comp"))
      color =
        COMP_COLORS[parseInt(st.replace("comp", "")) % COMP_COLORS.length];
    else color = NCOLORS[st] || NCOLORS.unvisited;

    // Glow ring for active nodes
    if (["current", "inQueue", "inStack"].includes(st)) {
      ctx.beginPath();
      ctx.arc(pos[i].x, pos[i].y, nr + 5, 0, Math.PI * 2);
      ctx.strokeStyle = color + "55";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(pos[i].x, pos[i].y, nr, 0, Math.PI * 2);
    ctx.fillStyle = color + "2a";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.max(10, Math.floor(nr * 0.72))}px 'JetBrains Mono',monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(i), pos[i].x, pos[i].y);
  }
};

//  ─ PSEUDO-CODE DEFINITIONS
const PS_DEFS = {
  bfs: [
    { key: "init", text: "INIT  queue=[start], visited[start]=true" },
    { key: "loop", text: "WHILE queue is not empty" },
    { key: "deq", text: "  DEQUEUE node = queue.front()" },
    { key: "process", text: "  PROCESS node (record/print)" },
    { key: "nbrs", text: "  FOR each neighbour nbr of node" },
    { key: "check", text: "    IF not visited[nbr]" },
    { key: "enq", text: "      ENQUEUE nbr, mark visited" },
    { key: "done", text: "DONE — all reachable nodes visited" },
  ],
  dfs: [
    { key: "init", text: "INIT  mark start as visited" },
    { key: "visit", text: "VISIT current node (record/print)" },
    { key: "nbrs", text: "FOR each neighbour nbr" },
    { key: "check", text: "  IF not visited[nbr]" },
    { key: "recurse", text: "    RECURSE → DFS(nbr)" },
    { key: "back", text: "BACKTRACK — return from call" },
    { key: "done", text: "DONE — all paths explored" },
  ],
  // Directed cycle uses rec-stack; undirected uses parent check
  cycle_directed: [
    { key: "init", text: "INIT  visited[], recStack[]" },
    { key: "loop", text: "FOR each unvisited node i" },
    { key: "visit", text: "  VISIT i, add to recStack" },
    { key: "nbrs", text: "  FOR each neighbour nbr" },
    { key: "check1", text: "    IF not visited[nbr] → recurse" },
    {
      key: "check2",
      text: "    ELSE IF in recStack → CYCLE! ← key difference",
    },
    { key: "remove", text: "  REMOVE i from recStack (backtrack)" },
    { key: "done", text: "DONE — cycle found or not" },
  ],
  cycle_undirected: [
    { key: "init", text: "INIT  visited[], parent[]=-1" },
    { key: "loop", text: "FOR each unvisited node i" },
    { key: "visit", text: "  VISIT i via DFS(node, parent)" },
    { key: "nbrs", text: "  FOR each neighbour nbr" },
    { key: "check1", text: "    IF not visited[nbr] → recurse" },
    {
      key: "check2",
      text: "    ELSE IF nbr ≠ parent → CYCLE! ← key difference",
    },
    { key: "done", text: "DONE — cycle found or not" },
  ],
  components: [
    { key: "init", text: "INIT  visited[] = all false, comp=0" },
    { key: "loop", text: "FOR i = 0 to V-1" },
    { key: "check", text: "  IF not visited[i]" },
    { key: "bfs", text: "    BFS/DFS from i → label comp" },
    { key: "mark", text: "    Mark all reachable nodes comp" },
    { key: "inc", text: "    comp++ (new component found)" },
    { key: "done", text: "DONE — comp = total components" },
  ],
  dijkstra: [
    { key: "init", text: "INIT  dist[src]=0, others=∞" },
    { key: "pq", text: "INIT  minHeap with (0, src)" },
    { key: "loop", text: "WHILE heap not empty" },
    { key: "pop", text: "  POP (d, u) with min distance" },
    { key: "skip", text: "  IF d > dist[u]: SKIP" },
    { key: "relax", text: "  FOR each neighbour v, weight w" },
    { key: "update", text: "    IF dist[u]+w < dist[v]: UPDATE" },
    { key: "done", text: "DONE — dist[] has all shortest paths" },
  ],
  topo: [
    { key: "init", text: "INIT  visited[], result=[]" },
    { key: "loop", text: "FOR each unvisited node i" },
    { key: "visit", text: "  VISIT i — mark visited" },
    { key: "nbrs", text: "  FOR each neighbour nbr" },
    { key: "recurse", text: "    IF not visited → DFS(nbr)" },
    { key: "push", text: "  PUSH i to result (post-order)" },
    { key: "done", text: "DONE — reverse result = topo order" },
  ],
};

// Get the right pseudo-code key for cycle detection based on type
const getCyclePS = (typeId) =>
  isDirectedType(typeId) ? "cycle_directed" : "cycle_undirected";

const setPS = (typeId, algoKey) => {
  const nameEl = document.getElementById(`psAlgoName-${typeId}`);
  const linesEl = document.getElementById(`psLines-${typeId}`);
  if (!nameEl || !linesEl) return;

  // Pick the right variant for cycle
  const key = algoKey === "cycle" ? getCyclePS(typeId) : algoKey;
  const lines = PS_DEFS[key] || PS_DEFS.bfs;

  nameEl.textContent = algoKey.toUpperCase();
  linesEl.innerHTML = "";
  lines.forEach(({ key: k, text }) => {
    const div = document.createElement("div");
    div.className = "ps-line";
    div.setAttribute("data-k", k);
    div.textContent = text;
    linesEl.appendChild(div);
  });
};

const litPS = (typeId, key) => {
  document.querySelectorAll(`#psLines-${typeId} .ps-line`).forEach((el) => {
    el.classList.remove("lit");
    if (el.getAttribute("data-k") === key) el.classList.add("lit");
  });
};

const clearPS = (typeId) =>
  document
    .querySelectorAll(`#psLines-${typeId} .ps-line`)
    .forEach((el) => el.classList.remove("lit", "done"));

//  ─ TYPE STATE MACHINE           ─
const TYPE_STATE = {};
const TYPES = [
  "undirected",
  "directed",
  "weighted",
  "connected",
  "cyclic",
  "dag",
];
TYPES.forEach((t) => {
  TYPE_STATE[t] = {
    adj: [],
    n: 0,
    steps: [],
    stepIdx: 0,
    stepDone: false,
    autoTimer: null,
    currentAlgo: defaultAlgo(t),
  };
});

function defaultAlgo(type) {
  const map = {
    undirected: "bfs",
    directed: "bfs",
    weighted: "dijkstra",
    connected: "components",
    cyclic: "cycle",
    dag: "topo",
  };
  return map[type];
}

const switchType = (type) => {
  currentType = type;
  document
    .querySelectorAll(".gt-tab")
    .forEach((t) => t.classList.toggle("active", t.dataset.type === type));
  document
    .querySelectorAll(".gtype-panel")
    .forEach((p) => p.classList.remove("show"));
  document.getElementById("gp-" + type).classList.add("show");

  // Update label
  const names = {
    undirected: "Undirected Graph",
    directed: "Directed Graph",
    weighted: "Weighted Graph",
    connected: "Connected Graph",
    cyclic: "Cyclic Graph",
    dag: "DAG",
  };
  document.getElementById("scTypeLabel").textContent = names[type];

  // FIX 1 — reinitialise scenarios so they draw the correct directed/undirected graph
  scInitBest();
  scInitAvg();
  scInitWorst();

  // Always reload the editor when type switches — templates change based on type.
  // e.g. cycle switches between parent-check and rec-stack,
  // dijkstra shows a note when you're not on the Weighted tab.
  if (editorCM) {
    setEditorAlgo(curEdAlgo);
  }
};

const switchAlgo = (typeId, algo, btn) => {
  TYPE_STATE[typeId].currentAlgo = algo;

  const container = document.getElementById(`algoTabs-${typeId}`);
  const accentMap = {
    undirected: "var(--cyan)",
    directed: "var(--orange)",
    weighted: "var(--green)",
    connected: "var(--purple)",
    cyclic: "var(--red)",
    dag: "var(--yellow)",
  };
  const col = accentMap[typeId] || "var(--cyan)";

  container.querySelectorAll(".algo-tab").forEach((t) => {
    t.classList.remove("on");
    t.style.cssText = "";
  });
  btn.classList.add("on");
  btn.style.borderColor = col;
  btn.style.color = col;

  const algoNames = {
    bfs: "BFS",
    dfs: "DFS",
    dijkstra: "Dijkstra",
    cycle: "Cycle Detect",
    components: "Components",
    topo: "Topo Sort",
  };
  document.getElementById(`vTitle-${typeId}`).textContent =
    `${typeId.charAt(0).toUpperCase() + typeId.slice(1)} — ${algoNames[algo] || algo}`;

  setPS(typeId, algo);
  doReset(typeId);
};

//  ─ BUILD / STEP / AUTO
const doBuild = (typeId) => {
  const st = TYPE_STATE[typeId];
  const edgesStr = document.getElementById(`edges-${typeId}`)?.value || "";
  const startVal =
    parseInt(document.getElementById(`start-${typeId}`)?.value) || 0;

  let adj, n;
  if (typeId === "weighted") {
    ({ adj, n } = parseEdges(edgesStr, false, true));
  } else if (typeId === "directed" || typeId === "cyclic") {
    ({ adj, n } = parseEdges(edgesStr, true, false));
  } else if (typeId === "dag") {
    const r = parseEdges(edgesStr, true, false);
    adj = r.adj;
    n = Math.max(r.n, startVal || 0);
    while (adj.length < n) adj.push([]);
  } else if (typeId === "connected") {
    ({ adj, n } = parseConnected(edgesStr));
  } else {
    ({ adj, n } = parseEdges(edgesStr, false, false));
  }

  if (n === 0) {
    setCaption(typeId, "⚠ Parse error. Use format: 0-1,1-2", "cap-r");
    return;
  }
  st.adj = adj;
  st.n = n;

  drawGraph(
    `c-${typeId}`,
    adj,
    n,
    Array(n).fill("unvisited"),
    new Set(),
    isDirectedType(typeId),
    isWeightedType(typeId),
  );

  // Generate steps for the selected algorithm
  st.steps = [];
  const algo = st.currentAlgo;
  const start = Math.min(startVal, n - 1);
  if (algo === "bfs") genBFS(typeId, start);
  else if (algo === "dfs") genDFS(typeId, start);
  else if (algo === "dijkstra") genDijkstra(typeId, start);
  else if (algo === "cycle") genCycle(typeId);
  else if (algo === "components") genComponents(typeId);
  else if (algo === "topo") genTopo(typeId, n);

  st.stepIdx = 0;
  st.stepDone = false;
  clearPS(typeId);
  setPS(typeId, algo);
  setCaption(typeId, "Ready — click ▶ Step or ⚡ Auto.", "");
  setProgress(typeId, 0);
  setChips(`qrow-${typeId}`, "Queue:", []);
  setChips(`vrow-${typeId}`, "Visited:", []);
  setResult(typeId, "", "");
  document.getElementById(`btnStep-${typeId}`).disabled = false;
  document.getElementById(`btnAuto-${typeId}`).disabled = false;
};

const doReset = (typeId) => {
  const st = TYPE_STATE[typeId];
  clearTimeout(st.autoTimer);
  st.steps = [];
  st.stepIdx = 0;
  st.stepDone = false;
  clearPS(typeId);
  setPS(typeId, st.currentAlgo);
  setCaption(typeId, "Build the graph to begin.", "");
  setResult(typeId, "", "");
  setProgress(typeId, 0);
  setChips(`qrow-${typeId}`, "Queue:", []);
  setChips(`vrow-${typeId}`, "Visited:", []);
  document.getElementById(`btnStep-${typeId}`).disabled = true;
  document.getElementById(`btnAuto-${typeId}`).disabled = true;
  if (st.n > 0)
    drawGraph(
      `c-${typeId}`,
      st.adj,
      st.n,
      Array(st.n).fill("unvisited"),
      new Set(),
      isDirectedType(typeId),
    );
};

const doStep = (typeId) => {
  const st = TYPE_STATE[typeId];
  if (st.stepDone || st.stepIdx >= st.steps.length) return;
  applyStep(typeId, st.steps[st.stepIdx++]);
  if (st.stepIdx >= st.steps.length) {
    st.stepDone = true;
    document.getElementById(`btnStep-${typeId}`).disabled = true;
    document.getElementById(`btnAuto-${typeId}`).disabled = true;
  }
};

const doAuto = (typeId) => {
  const st = TYPE_STATE[typeId];
  if (st.stepDone) return;
  document.getElementById(`btnAuto-${typeId}`).disabled = true;
  const footWrap = document
    .getElementById(`btnAuto-${typeId}`)
    .closest(".vis-foot");
  const tick = () => {
    if (st.stepDone || st.stepIdx >= st.steps.length) return;
    doStep(typeId);
    st.autoTimer = setTimeout(tick, footWrap ? getSpeed(footWrap) : 750);
  };
  tick();
};

const applyStep = (typeId, s) => {
  if (!s) return;
  const st = TYPE_STATE[typeId];
  drawGraph(
    `c-${typeId}`,
    st.adj,
    st.n,
    s.ns,
    s.es,
    isDirectedType(typeId),
    isWeightedType(typeId),
  );
  if (s.ps) litPS(typeId, s.ps);
  setCaption(typeId, s.caption || "", s.captionCls || "");
  if (s.result) setResult(typeId, s.result, s.resultCls || "rb-g");
  if (s.qRow !== undefined)
    setChips(
      `qrow-${typeId}`,
      s.qLabel || "Queue:",
      s.qRow,
      s.qChipClass || "chip-q",
    );
  if (s.vRow !== undefined)
    setChips(
      `vrow-${typeId}`,
      s.vLabel || "Visited:",
      s.vRow,
      s.vChipClass || "chip-v",
    );
  setProgress(typeId, (st.stepIdx / st.steps.length) * 100);
};

//  ─ UI HELPERS               ─
const setCaption = (typeId, txt, cls) => {
  const el = document.getElementById(`cap-${typeId}`);
  if (el) {
    el.textContent = txt;
    el.className = "caption" + (cls ? " " + cls : "");
  }
};
const setResult = (typeId, txt, cls) => {
  const el = document.getElementById(`res-${typeId}`);
  if (el) el.innerHTML = txt ? `<div class="rb ${cls}">${txt}</div>` : "";
};
const setProgress = (typeId, pct) => {
  const f = document.getElementById(`prog-${typeId}`);
  const l = document.getElementById(`progTxt-${typeId}`);
  if (f) f.style.width = Math.round(pct) + "%";
  if (l) l.textContent = Math.round(pct) + "%";
};
const setChips = (rowId, label, items, chipClass = "chip-v") => {
  const row = document.getElementById(rowId);
  if (!row) return;
  row.innerHTML = `<span class="s-label">${label}</span>`;
  if (!items || !items.length) {
    row.innerHTML += '<span class="s-empty">—</span>';
    return;
  }
  items.forEach((v) => {
    const ch = document.createElement("div");
    ch.className = "chip " + chipClass;
    ch.textContent = v;
    row.appendChild(ch);
  });
};

// Snapshot helpers
const NS = (arr) => [...arr];
const ES = (set) => new Set(set);

//  ─ STEP GENERATORS

const genBFS = (typeId, start) => {
  const { adj, n, steps } = getCtx(typeId);
  const ns = Array(n).fill("unvisited"),
    es = new Set(),
    vis = Array(n).fill(false);
  const q = [start];
  vis[start] = true;
  ns[start] = "inQueue";
  steps.push({
    ns: NS(ns),
    es: ES(es),
    ps: "init",
    caption: `Init: enqueue node ${start}`,
    qRow: [...q],
    qLabel: "Queue:",
    qChipClass: "chip-q",
    vRow: [],
    vLabel: "Visited:",
  });
  while (q.length) {
    const node = q.shift();
    ns[node] = "current";
    const visited = ns
      .map((s, i) => (s === "visited" || s === "current" ? i : null))
      .filter((x) => x !== null);
    steps.push({
      ns: NS(ns),
      es: ES(es),
      ps: "deq",
      caption: `Dequeue ${node}`,
      qRow: [...q],
      qLabel: "Queue:",
      qChipClass: "chip-q",
      vRow: visited,
      vLabel: "Visited:",
    });
    for (const { to: nbr } of adj[node] || []) {
      if (!vis[nbr]) {
        vis[nbr] = true;
        ns[nbr] = "inQueue";
        q.push(nbr);
        es.add(`${node}-${nbr}`);
        es.add(`${nbr}-${node}`);
        steps.push({
          ns: NS(ns),
          es: ES(es),
          ps: "enq",
          caption: `Enqueue ${nbr}`,
          qRow: [...q],
          qLabel: "Queue:",
          qChipClass: "chip-q",
        });
      } else {
        steps.push({
          ns: NS(ns),
          es: ES(es),
          ps: "check",
          caption: `${nbr} already visited — skip`,
          qRow: [...q],
          qLabel: "Queue:",
        });
      }
    }
    ns[node] = "visited";
  }
  const order = ns
    .map((s, i) => (s === "visited" ? i : null))
    .filter((x) => x !== null);
  steps.push({
    ns: NS(ns),
    es: ES(es),
    ps: "done",
    caption: `BFS done! Order: ${order.join(" → ")}`,
    captionCls: "cap-g",
    result: "✓ BFS Complete",
    resultCls: "rb-g",
    qRow: [],
    qLabel: "Queue:",
    vRow: order,
    vLabel: "Visited:",
  });
};

const genDFS = (typeId, start) => {
  const { adj, n, steps } = getCtx(typeId);
  const ns = Array(n).fill("unvisited"),
    es = new Set(),
    vis = Array(n).fill(false),
    stk = [];
  steps.push({
    ns: NS(ns),
    es: ES(es),
    ps: "init",
    caption: `Init DFS from ${start}`,
    qRow: [],
    qLabel: "Stack:",
  });
  const dfs = (node) => {
    vis[node] = true;
    ns[node] = "current";
    stk.push(node);
    steps.push({
      ns: NS(ns),
      es: ES(es),
      ps: "visit",
      caption: `Visit ${node} — push to stack`,
      qRow: [...stk],
      qLabel: "Stack:",
      qChipClass: "chip-stk",
    });
    for (const { to: nbr } of adj[node] || []) {
      if (!vis[nbr]) {
        es.add(`${node}-${nbr}`);
        es.add(`${nbr}-${node}`);
        steps.push({
          ns: NS(ns),
          es: ES(es),
          ps: "check",
          caption: `${nbr} not visited → recurse`,
          qRow: [...stk],
          qLabel: "Stack:",
          qChipClass: "chip-stk",
        });
        dfs(nbr);
      } else {
        steps.push({
          ns: NS(ns),
          es: ES(es),
          ps: "check",
          caption: `${nbr} visited — skip`,
          qRow: [...stk],
          qLabel: "Stack:",
        });
      }
    }
    ns[node] = "visited";
    stk.pop();
    steps.push({
      ns: NS(ns),
      es: ES(es),
      ps: "back",
      caption: `Backtrack from ${node}`,
      qRow: [...stk],
      qLabel: "Stack:",
      qChipClass: "chip-stk",
    });
  };
  dfs(start);
  const order = ns
    .map((s, i) => (s === "visited" ? i : null))
    .filter((x) => x !== null);
  steps.push({
    ns: NS(ns),
    es: ES(es),
    ps: "done",
    caption: `DFS done! Order: ${order.join(" → ")}`,
    captionCls: "cap-g",
    result: "✓ DFS Complete",
    resultCls: "rb-p",
    qRow: [],
    qLabel: "Stack:",
    vRow: order,
    vLabel: "Visited:",
  });
};

const genDijkstra = (typeId, start) => {
  const { adj, n, steps } = getCtx(typeId);
  const ns = Array(n).fill("unvisited"),
    es = new Set();
  const dist = Array(n).fill(Infinity),
    vis = Array(n).fill(false);
  dist[start] = 0;
  const getMin = () => {
    let u = -1,
      d = Infinity;
    for (let i = 0; i < n; i++)
      if (!vis[i] && dist[i] < d) {
        d = dist[i];
        u = i;
      }
    return u;
  };
  const distRow = () => dist.map((d, i) => `${i}:${d === Infinity ? "∞" : d}`);
  ns[start] = "inQueue";
  steps.push({
    ns: NS(ns),
    es: ES(es),
    ps: "init",
    caption: `Init: dist[${start}]=0, others=∞`,
    qRow: distRow(),
    qLabel: "Distances:",
    qChipClass: "chip-v",
  });
  for (let iter = 0; iter < n; iter++) {
    const u = getMin();
    if (u === -1) break;
    vis[u] = true;
    ns[u] = "current";
    steps.push({
      ns: NS(ns),
      es: ES(es),
      ps: "pop",
      caption: `Pick node ${u} (dist=${dist[u]})`,
      qRow: distRow(),
      qLabel: "Distances:",
      qChipClass: "chip-v",
    });
    for (const { to: v, w } of adj[u] || []) {
      if (!vis[v]) {
        const nd = dist[u] + w;
        if (nd < dist[v]) {
          dist[v] = nd;
          ns[v] = "inQueue";
          es.add(`${u}-${v}`);
          es.add(`${v}-${u}`);
          steps.push({
            ns: NS(ns),
            es: ES(es),
            ps: "update",
            caption: `Relax ${u}→${v}: dist=${nd}`,
            captionCls: "cap-g",
            qRow: distRow(),
            qLabel: "Distances:",
            qChipClass: "chip-v",
          });
        } else {
          steps.push({
            ns: NS(ns),
            es: ES(es),
            ps: "relax",
            caption: `${u}→${v}: ${dist[u] + w} ≥ ${dist[v]}, no update`,
            qRow: distRow(),
            qLabel: "Distances:",
          });
        }
      }
    }
    ns[u] = "visited";
  }
  steps.push({
    ns: NS(ns),
    es: ES(es),
    ps: "done",
    caption: `Dijkstra done! Distances: [${distRow().join("  ")}]`,
    captionCls: "cap-g",
    result: "✓ Shortest Paths Found",
    resultCls: "rb-g",
    qRow: distRow(),
    qLabel: "Distances:",
    qChipClass: "chip-v",
  });
};

/*
 * FIX: Cycle detection generates DIFFERENT steps based on graph direction.
 * Directed  → uses recursion stack (rec[]) — back edge = same rec-stack node
 * Undirected → uses parent check       — back edge = neighbour that isn't parent
 */
const genCycle = (typeId) => {
  const { adj, n, steps } = getCtx(typeId);
  const ns = Array(n).fill("unvisited"),
    es = new Set();
  const vis = Array(n).fill(false);
  let found = false;

  if (isDirectedType(typeId)) {
    //   DIRECTED: rec-stack approach
    const rec = Array(n).fill(false);
    steps.push({
      ns: NS(ns),
      es: ES(es),
      ps: "init",
      caption: "Directed cycle detection: DFS + recursion stack",
      qRow: [],
      qLabel: "Rec Stack:",
    });

    const dfs = (node) => {
      if (found) return;
      vis[node] = true;
      rec[node] = true;
      ns[node] = "current";
      const recNodes = rec
        .map((v, i) => (v ? i : null))
        .filter((x) => x !== null);
      steps.push({
        ns: NS(ns),
        es: ES(es),
        ps: "visit",
        caption: `Visit ${node} — add to rec-stack`,
        qRow: recNodes,
        qLabel: "Rec Stack:",
        qChipClass: "chip-stk",
      });

      for (const { to: nbr } of adj[node] || []) {
        if (found) return;
        if (!vis[nbr]) {
          es.add(`${node}-${nbr}`);
          dfs(nbr);
        } else if (rec[nbr]) {
          // This is the directed-specific check
          ns[nbr] = "cycle";
          ns[node] = "cycle";
          found = true;
          steps.push({
            ns: NS(ns),
            es: ES(es),
            ps: "check2",
            caption: `Back-edge to ${nbr} (in rec-stack) → CYCLE!`,
            captionCls: "cap-r",
            result: "⚠ Cycle Found!",
            resultCls: "rb-r",
          });
          return;
        }
      }
      rec[node] = false;
      ns[node] = "visited";
      steps.push({
        ns: NS(ns),
        es: ES(es),
        ps: "remove",
        caption: `Done with ${node} — remove from rec-stack`,
        qRow: rec.map((v, i) => (v ? i : null)).filter((x) => x !== null),
        qLabel: "Rec Stack:",
        qChipClass: "chip-stk",
      });
    };
    for (let i = 0; i < n; i++) if (!vis[i]) dfs(i);
  } else {
    //   UNDIRECTED: parent check approach
    // Note: much simpler — no rec-stack needed.
    // A back-edge is just a visited neighbour that isn't the parent.
    steps.push({
      ns: NS(ns),
      es: ES(es),
      ps: "init",
      caption:
        "Undirected cycle detection: DFS + parent check (no rec-stack needed)",
      qRow: [],
      qLabel: "Visited:",
    });

    const dfs = (node, parent) => {
      if (found) return;
      vis[node] = true;
      ns[node] = "current";
      const visNodes = vis
        .map((v, i) => (v ? i : null))
        .filter((x) => x !== null);
      steps.push({
        ns: NS(ns),
        es: ES(es),
        ps: "visit",
        caption: `Visit ${node} (parent=${parent})`,
        qRow: visNodes,
        qLabel: "Visited:",
        qChipClass: "chip-v",
      });

      for (const { to: nbr } of adj[node] || []) {
        if (found) return;
        if (!vis[nbr]) {
          es.add(`${node}-${nbr}`);
          es.add(`${nbr}-${node}`);
          dfs(nbr, node);
        } else if (nbr !== parent) {
          // This is the undirected-specific check — just check it's not our parent
          ns[nbr] = "cycle";
          ns[node] = "cycle";
          found = true;
          steps.push({
            ns: NS(ns),
            es: ES(es),
            ps: "check2",
            caption: `${nbr} is visited and NOT parent → CYCLE!`,
            captionCls: "cap-r",
            result: "⚠ Cycle Found!",
            resultCls: "rb-r",
          });
          return;
        } else {
          steps.push({
            ns: NS(ns),
            es: ES(es),
            ps: "check2",
            caption: `${nbr} is parent — skip (not a cycle)`,
            qRow: visNodes,
            qLabel: "Visited:",
          });
        }
      }
      ns[node] = "visited";
    };
    for (let i = 0; i < n; i++) if (!vis[i]) dfs(i, -1);
  }

  if (!found)
    steps.push({
      ns: NS(ns),
      es: ES(es),
      ps: "done",
      caption: "No cycle found — graph is acyclic!",
      captionCls: "cap-g",
      result: "✓ No Cycle (Acyclic)",
      resultCls: "rb-g",
    });
};

const genComponents = (typeId) => {
  const { adj, n, steps } = getCtx(typeId);
  const ns = Array(n).fill("unvisited"),
    es = new Set(),
    vis = Array(n).fill(false);
  let comp = 0;
  steps.push({
    ns: NS(ns),
    es: ES(es),
    ps: "init",
    caption: "Find components — loop all vertices",
    qRow: [],
    qLabel: "Comp #:",
  });
  const dfs = (node, c) => {
    vis[node] = true;
    ns[node] = `comp${c}`;
    steps.push({
      ns: NS(ns),
      es: ES(es),
      ps: "mark",
      caption: `Node ${node} → Component ${c}`,
      qRow: [c],
      qLabel: "Comp #:",
      qChipClass: "chip-q",
    });
    for (const { to: nbr } of adj[node] || []) {
      if (!vis[nbr]) {
        es.add(`${node}-${nbr}`);
        es.add(`${nbr}-${node}`);
        dfs(nbr, c);
      }
    }
  };
  for (let i = 0; i < n; i++) {
    if (!vis[i]) {
      steps.push({
        ns: NS(ns),
        es: ES(es),
        ps: "check",
        caption: `Node ${i} not visited → new component ${comp}`,
        qRow: [comp],
        qLabel: "Comp #:",
        qChipClass: "chip-q",
      });
      dfs(i, comp++);
    }
  }
  steps.push({
    ns: NS(ns),
    es: ES(es),
    ps: "done",
    caption: `Found ${comp} component${comp > 1 ? "s" : ""}!`,
    captionCls: "cap-g",
    result: `✓ ${comp} Component${comp > 1 ? "s" : ""}`,
    resultCls: "rb-c",
  });
};

const genTopo = (typeId, n) => {
  const { adj, steps } = getCtx(typeId);
  const ns = Array(n).fill("unvisited"),
    vis = Array(n).fill(false),
    order = [];
  steps.push({
    ns: NS(ns),
    es: new Set(),
    ps: "init",
    caption: "Topological sort: DFS post-order",
    qRow: [],
    qLabel: "Stack:",
  });
  const dfs = (node) => {
    vis[node] = true;
    ns[node] = "current";
    steps.push({
      ns: NS(ns),
      es: new Set(),
      ps: "visit",
      caption: `Visit ${node}`,
      qRow: [...order],
      qLabel: "Result:",
      qChipClass: "chip-v",
    });
    for (const { to: nbr } of adj[node] || []) if (!vis[nbr]) dfs(nbr);
    ns[node] = "visited";
    order.unshift(node);
    steps.push({
      ns: NS(ns),
      es: new Set(),
      ps: "push",
      caption: `Finish ${node} → prepend to result`,
      qRow: [...order],
      qLabel: "Result:",
      qChipClass: "chip-v",
      vRow: [...order],
      vLabel: "Topo:",
    });
  };
  for (let i = 0; i < n; i++) if (!vis[i]) dfs(i);
  steps.push({
    ns: NS(ns),
    es: new Set(),
    ps: "done",
    caption: `Topo order: ${order.join(" → ")}`,
    captionCls: "cap-g",
    result: `Topo: ${order.join("→")}`,
    resultCls: "rb-p",
    qRow: order,
    qLabel: "Result:",
    qChipClass: "chip-v",
    vRow: order,
    vLabel: "Topo:",
  });
};

const getCtx = (typeId) => ({
  adj: TYPE_STATE[typeId].adj,
  n: TYPE_STATE[typeId].n,
  steps: TYPE_STATE[typeId].steps,
});

//  ─ SCENARIOS                ─
/*
 * Each graph type now gets a SPECIFIC scenario graph — not the same chain for all.
 *
 *  UNDIRECTED / CONNECTED:  5-node undirected path  0—1—2—3—4
 *  DIRECTED   / DAG:        5-node directed chain   0→1→2→3→4  (arrows only)
 *  CYCLIC:                  4-node directed ring    0→1→2→3→0  (has back-edge)
 *  WEIGHTED:                4-node weighted graph   with visible edge costs
 *
 * getScenarioConfig() returns the right adj/dir/weighted for the active tab.
 */

//   Config lookup: returns the right graph for the active type tab
const getScenarioConfig = () => {
  const t = currentType;
  if (t === "weighted") {
    return {
      adj: [
        [
          { to: 1, w: 5 },
          { to: 2, w: 12 },
        ],
        [
          { to: 0, w: 5 },
          { to: 2, w: 10 },
        ],
        [
          { to: 0, w: 12 },
          { to: 1, w: 10 },
          { to: 3, w: 3 },
        ],
        [{ to: 2, w: 3 }],
      ],
      n: 4,
      dir: false,
      weighted: true,
      label:
        "Weighted graph — edge costs are visible. Dijkstra picks lowest-cost path, not shortest hops.",
      worstLabel:
        "Weighted graph: DFS ignores edge costs and explores all paths — this is why we use Dijkstra.",
    };
  }
  if (t === "directed" || t === "dag") {
    return {
      adj: [
        [{ to: 1, w: 1 }],
        [{ to: 2, w: 1 }],
        [{ to: 3, w: 1 }],
        [{ to: 4, w: 1 }],
        [],
      ],
      n: 5,
      dir: true,
      weighted: false,
      label:
        "Directed chain 0→1→2→3→4 — edges are one-way. BFS/DFS respect arrow direction.",
      worstLabel:
        "Directed DFS: arrows force a single direction, recursion depth hits N.",
    };
  }
  if (t === "cyclic") {
    return {
      adj: [
        [{ to: 1, w: 1 }],
        [{ to: 2, w: 1 }],
        [{ to: 3, w: 1 }],
        [{ to: 0, w: 1 }],
      ],
      n: 4,
      dir: true,
      weighted: false,
      label:
        "Cyclic directed graph 0→1→2→3→0 — the back-edge 3→0 creates the cycle.",
      worstLabel:
        "Cyclic DFS: rec-stack catches back-edge 3→0 as the cycle indicator.",
    };
  }
  // undirected / connected (default)
  return {
    adj: [
      [{ to: 1, w: 1 }],
      [
        { to: 0, w: 1 },
        { to: 2, w: 1 },
      ],
      [
        { to: 1, w: 1 },
        { to: 3, w: 1 },
      ],
      [
        { to: 2, w: 1 },
        { to: 4, w: 1 },
      ],
      [{ to: 3, w: 1 }],
    ],
    n: 5,
    dir: false,
    weighted: false,
    label: "Undirected path 0—1—2—3—4 — edges go both ways, no direction.",
    worstLabel:
      "Undirected DFS: max depth = N, must backtrack all the way back.",
  };
};

// Average-case: 6-node graph, type-specific
const getAvgConfig = () => {
  const t = currentType;
  if (t === "weighted") {
    // Weighted 6-node: show actual edge costs
    return {
      adj: [
        [
          { to: 1, w: 4 },
          { to: 2, w: 1 },
        ],
        [
          { to: 0, w: 4 },
          { to: 3, w: 5 },
        ],
        [
          { to: 0, w: 1 },
          { to: 3, w: 8 },
          { to: 4, w: 3 },
        ],
        [
          { to: 1, w: 5 },
          { to: 2, w: 8 },
          { to: 5, w: 2 },
        ],
        [
          { to: 2, w: 3 },
          { to: 5, w: 6 },
        ],
        [
          { to: 3, w: 2 },
          { to: 4, w: 6 },
        ],
      ],
      n: 6,
      dir: false,
      weighted: true,
      label:
        "Weighted 6-node — Dijkstra picks the path with lowest total cost, not fewest hops.",
    };
  }
  if (t === "directed" || t === "dag") {
    return {
      adj: [
        [
          { to: 1, w: 1 },
          { to: 2, w: 1 },
        ],
        [
          { to: 3, w: 1 },
          { to: 4, w: 1 },
        ],
        [{ to: 5, w: 1 }],
        [],
        [],
        [],
      ],
      n: 6,
      dir: true,
      weighted: false,
      label:
        "Directed 6-node — BFS follows arrows level by level. No reverse traversal.",
    };
  }
  if (t === "cyclic") {
    return {
      adj: [
        [
          { to: 1, w: 1 },
          { to: 2, w: 1 },
        ],
        [
          { to: 3, w: 1 },
          { to: 4, w: 1 },
        ],
        [{ to: 0, w: 1 }], // back-edge creates cycle
        [],
        [{ to: 2, w: 1 }],
        [],
      ],
      n: 6,
      dir: true,
      weighted: false,
      label:
        "Cyclic directed 6-node — BFS explores nodes, back-edges 2→0 and 4→2 create cycles.",
    };
  }
  // undirected / connected
  return {
    adj: [
      [
        { to: 1, w: 1 },
        { to: 2, w: 1 },
      ],
      [
        { to: 0, w: 1 },
        { to: 3, w: 1 },
        { to: 4, w: 1 },
      ],
      [
        { to: 0, w: 1 },
        { to: 5, w: 1 },
      ],
      [{ to: 1, w: 1 }],
      [{ to: 1, w: 1 }],
      [{ to: 2, w: 1 }],
    ],
    n: 6,
    dir: false,
    weighted: false,
    label:
      "Undirected 6-node balanced graph — BFS explores level by level, O(V+E).",
  };
};

const switchSc = (name) => {
  const clsMap = { best: "t-g", avg: "t-c", worst: "t-o" };
  const scNames = ["best", "avg", "worst"];
  document.querySelectorAll(".sc-tab").forEach((t, i) => {
    t.className = "sc-tab";
    if (scNames[i] === name) t.classList.add(clsMap[name]);
  });
  document
    .querySelectorAll(".sc-panel")
    .forEach((p) => p.classList.remove("show"));
  document.getElementById("sc-" + name).classList.add("show");
};

// Shared log helper
const scLog = (id, msg, cls) => {
  const l = document.getElementById(id);
  if (!l) return;
  const e = document.createElement("div");
  e.className = "log-line " + (cls || "lc-i");
  e.textContent = "> " + msg;
  l.appendChild(e);
  l.scrollTop = l.scrollHeight;
};

//   Scenario BEST: BFS, target = source
let bestSt = [],
  bestIdx = 0,
  bestDone = false,
  bestTimer = null;

const scInitBest = () => {
  clearTimeout(bestTimer);
  bestIdx = 0;
  bestDone = false;

  const cfg = getScenarioConfig();
  drawGraph(
    "sc-best-c",
    cfg.adj,
    cfg.n,
    Array(cfg.n).fill("unvisited"),
    new Set(),
    cfg.dir,
    cfg.weighted,
  );

  document.getElementById("sc-best-log").innerHTML =
    '<div class="sc-log-title">📋 Log</div>';
  document.getElementById("sc-best-info").textContent = "Steps: 0";
  document.getElementById("sc-best-stepBtn").disabled = false;
  document.getElementById("sc-best-autoBtn").disabled = false;
  document.getElementById("sc-best-title").textContent =
    `⚡ Best Case — O(1): Target = Source (${cfg.dir ? "Directed" : "Undirected"} BFS)`;

  // Two steps: enqueue node 0, then immediately find it
  bestSt = [
    {
      ns: Array(cfg.n)
        .fill("unvisited")
        .map((s, i) => (i === 0 ? "inQueue" : s)),
      es: new Set(),
      log: "Enqueue node 0 (start = target)",
      cls: "lc-q",
      info: "Steps: 1 | Queue:[0]",
    },
    {
      ns: Array(cfg.n)
        .fill("unvisited")
        .map((s, i) => (i === 0 ? "current" : s)),
      es: new Set(),
      log: "Dequeue 0 — this IS the target! Done immediately.",
      cls: "lc-v",
      info: "Found at step 1 — O(1)!",
      done: true,
    },
  ];
  scLog("sc-best-log", cfg.label, "lc-i");
  scLog(
    "sc-best-log",
    "BFS: start = target = 0 → O(1) — no actual traversal needed",
    "lc-i",
  );
};

const scBestStep = () => {
  if (bestDone || bestIdx >= bestSt.length) return;
  const cfg = getScenarioConfig();
  const s = bestSt[bestIdx++];
  drawGraph("sc-best-c", cfg.adj, cfg.n, s.ns, s.es, cfg.dir, cfg.weighted);
  scLog("sc-best-log", s.log, s.cls);
  document.getElementById("sc-best-info").textContent = s.info;
  if (s.done) {
    bestDone = true;
    clearTimeout(bestTimer);
    document.getElementById("sc-best-stepBtn").disabled = true;
    document.getElementById("sc-best-autoBtn").disabled = true;
    scLog("sc-best-log", "✓ Best case O(1) confirmed", "lc-r");
  }
};

const scBestAuto = () => {
  document.getElementById("sc-best-autoBtn").disabled = true;
  const tick = () => {
    if (bestDone) return;
    scBestStep();
    bestTimer = setTimeout(tick, 700);
  };
  tick();
};

//   Scenario AVERAGE: BFS level-by-level on type-specific graph
let avgSt = [],
  avgIdx = 0,
  avgDone = false,
  avgTimer = null;

const scInitAvg = () => {
  clearTimeout(avgTimer);
  avgIdx = 0;
  avgDone = false;

  const cfg = getAvgConfig();
  drawGraph(
    "sc-avg-c",
    cfg.adj,
    cfg.n,
    Array(cfg.n).fill("unvisited"),
    new Set(),
    cfg.dir,
    cfg.weighted,
  );
  document.getElementById("sc-avg-log").innerHTML =
    '<div class="sc-log-title">📋 Log</div>';
  document.getElementById("sc-avg-info").textContent = "Step 0 | Queue: [0]";
  document.getElementById("sc-avg-stepBtn").disabled = false;
  document.getElementById("sc-avg-autoBtn").disabled = false;

  // Generate BFS steps on the type-specific graph
  avgSt = [];
  const ns = Array(cfg.n).fill("unvisited");
  const es = new Set();
  const vis = Array(cfg.n).fill(false);
  const q = [0];
  vis[0] = true;
  ns[0] = "inQueue";
  avgSt.push({
    ns: NS(ns),
    es: ES(es),
    log: "Enqueue 0",
    cls: "lc-q",
    info: "Queue:[0]",
  });

  while (q.length) {
    const node = q.shift();
    ns[node] = "current";
    avgSt.push({
      ns: NS(ns),
      es: ES(es),
      log: `Dequeue ${node}`,
      cls: "lc-v",
      info: `Queue:[${q}]`,
    });
    for (const { to: nbr, w } of cfg.adj[node] || []) {
      if (!vis[nbr]) {
        vis[nbr] = true;
        ns[nbr] = "inQueue";
        q.push(nbr);
        es.add(`${node}-${nbr}`);
        if (!cfg.dir) es.add(`${nbr}-${node}`);
        // For weighted graphs, show the edge cost in the log
        const wNote = cfg.weighted ? ` (edge cost: ${w})` : "";
        avgSt.push({
          ns: NS(ns),
          es: ES(es),
          log: `Enqueue ${nbr}${wNote}`,
          cls: "lc-q",
          info: `Queue:[${q}]`,
        });
      } else {
        avgSt.push({
          ns: NS(ns),
          es: ES(es),
          log: `${nbr} already visited — skip`,
          cls: "lc-i",
          info: `Queue:[${q}]`,
        });
      }
    }
    ns[node] = "visited";
  }
  avgSt.push({
    ns: NS(ns),
    es: ES(es),
    log: `BFS done! ${vis.filter(Boolean).length} nodes visited`,
    cls: "lc-r",
    info: "Done — O(V+E)",
    done: true,
  });

  scLog("sc-avg-log", cfg.label, "lc-i");
  scLog(
    "sc-avg-log",
    "Average case O(V+E): roughly half the nodes visited before mid-graph target",
    "lc-i",
  );
};

const scAvgStep = () => {
  if (avgDone || avgIdx >= avgSt.length) return;
  const cfg = getAvgConfig();
  const s = avgSt[avgIdx++];
  drawGraph("sc-avg-c", cfg.adj, cfg.n, s.ns, s.es, cfg.dir, cfg.weighted);
  scLog("sc-avg-log", s.log, s.cls);
  document.getElementById("sc-avg-info").textContent =
    `Step ${avgIdx} | ${s.info}`;
  if (s.done) {
    avgDone = true;
    clearTimeout(avgTimer);
    document.getElementById("sc-avg-stepBtn").disabled = true;
    document.getElementById("sc-avg-autoBtn").disabled = true;
  }
};

const scAvgAuto = () => {
  document.getElementById("sc-avg-autoBtn").disabled = true;
  const tick = () => {
    if (avgDone) return;
    scAvgStep();
    avgTimer = setTimeout(tick, 600);
  };
  tick();
};

//   Scenario WORST: DFS chain — max recursion depth
// Uses a type-specific chain: directed for directed types, cyclic chain for cyclic
let worstSt = [],
  worstIdx = 0,
  worstDone = false,
  worstTimer = null;

const scInitWorst = () => {
  clearTimeout(worstTimer);
  worstIdx = 0;
  worstDone = false;

  const cfg = getScenarioConfig();
  // Build chain: N=4 for cyclic (with back-edge), N=6 for others
  const chainN = currentType === "cyclic" ? 4 : 6;
  const chainAdj = [];
  for (let i = 0; i < chainN; i++) {
    const nb = [];
    if (i + 1 < chainN) nb.push({ to: i + 1, w: 1 });
    if (!cfg.dir && i > 0) nb.push({ to: i - 1, w: 1 }); // undirected reverse
    chainAdj.push(nb);
  }
  if (currentType === "cyclic") chainAdj[chainN - 1].push({ to: 0, w: 1 }); // back-edge

  drawGraph(
    "sc-worst-c",
    chainAdj,
    chainN,
    Array(chainN).fill("unvisited"),
    new Set(),
    cfg.dir,
    false,
  );
  document.getElementById("sc-worst-log").innerHTML =
    '<div class="sc-log-title">📋 Log</div>';
  document.getElementById("sc-worst-info").textContent =
    `Stack depth: 0/${chainN}`;
  document.getElementById("sc-worst-stepBtn").disabled = false;
  document.getElementById("sc-worst-autoBtn").disabled = false;
  document.getElementById("sc-worst-title").textContent =
    `⚠ Worst Case — O(V+E): DFS on ${cfg.dir ? "Directed" : "Undirected"} ${currentType === "cyclic" ? "Cyclic Chain" : "Linear Chain"}`;
  document.getElementById("sc-worst-desc").textContent = cfg.worstLabel;

  // Generate DFS steps on this chain
  worstSt = [];
  const ns = Array(chainN).fill("unvisited");
  const es = new Set();
  const vis = Array(chainN).fill(false);
  const stk = [];
  const rec = Array(chainN).fill(false); // for cyclic directed
  let cycleFound = false;

  const dfs = (node) => {
    vis[node] = true;
    ns[node] = "current";
    stk.push(node);
    if (currentType === "cyclic") rec[node] = true;
    worstSt.push({
      ns: NS(ns),
      es: ES(es),
      log: `Visit ${node} — stack depth: ${stk.length}/${chainN}`,
      cls: "lc-v",
      info: `Depth: ${stk.length}/${chainN}`,
    });

    for (const { to: nbr } of chainAdj[node] || []) {
      if (!vis[nbr]) {
        es.add(`${node}-${nbr}`);
        if (!cfg.dir) es.add(`${nbr}-${node}`);
        dfs(nbr);
      } else if (currentType === "cyclic" && rec[nbr] && !cycleFound) {
        cycleFound = true;
        ns[nbr] = "cycle";
        ns[node] = "cycle";
        worstSt.push({
          ns: NS(ns),
          es: ES(es),
          log: `Back-edge ${node}→${nbr} (in rec-stack) → CYCLE DETECTED!`,
          cls: "lc-r",
          info: `Cycle: ${node}→${nbr}`,
        });
      } else {
        worstSt.push({
          ns: NS(ns),
          es: ES(es),
          log: `${nbr} visited${currentType === "cyclic" ? " (not in rec-stack)" : ""} — skip`,
          cls: "lc-i",
          info: `Depth: ${stk.length}`,
        });
      }
    }
    if (!cycleFound || ns[node] !== "cycle") ns[node] = "visited";
    if (currentType === "cyclic") rec[node] = false;
    stk.pop();
    worstSt.push({
      ns: NS(ns),
      es: ES(es),
      log: `Backtrack from ${node} — depth now: ${stk.length}`,
      cls: "lc-d",
      info: `${vis.filter(Boolean).length}/${chainN} visited`,
    });
  };

  dfs(0);
  const finalMsg =
    currentType === "cyclic"
      ? `DFS done — cycle detected via back-edge, max rec-stack = ${chainN}`
      : `DFS done — max recursion depth was ${chainN} = N (worst case)`;
  worstSt.push({
    ns: NS(ns),
    es: ES(es),
    log: finalMsg,
    cls: "lc-r",
    info: "Worst case O(V+E)",
    done: true,
  });

  scLog("sc-worst-log", cfg.worstLabel, "lc-i");
  scLog(
    "sc-worst-log",
    `Worst case: max recursion depth = ${chainN} (= N)`,
    "lc-i",
  );
};

const scWorstStep = () => {
  if (worstDone || worstIdx >= worstSt.length) return;
  const cfg = getScenarioConfig();
  const chainN = currentType === "cyclic" ? 4 : 6;
  const chainAdj = [];
  for (let i = 0; i < chainN; i++) {
    const nb = [];
    if (i + 1 < chainN) nb.push({ to: i + 1, w: 1 });
    if (!cfg.dir && i > 0) nb.push({ to: i - 1, w: 1 });
    chainAdj.push(nb);
  }
  if (currentType === "cyclic") chainAdj[chainN - 1].push({ to: 0, w: 1 });

  const s = worstSt[worstIdx++];
  drawGraph("sc-worst-c", chainAdj, chainN, s.ns, s.es, cfg.dir, false);
  scLog("sc-worst-log", s.log, s.cls);
  document.getElementById("sc-worst-info").textContent = s.info;
  if (s.done) {
    worstDone = true;
    clearTimeout(worstTimer);
    document.getElementById("sc-worst-stepBtn").disabled = true;
    document.getElementById("sc-worst-autoBtn").disabled = true;
  }
};

const scWorstAuto = () => {
  document.getElementById("sc-worst-autoBtn").disabled = true;
  const tick = () => {
    if (worstDone) return;
    scWorstStep();
    worstTimer = setTimeout(tick, 480);
  };
  tick();
};

//  ─ CODE EDITOR              ─
/*
 * FIX 2: The cycle templates are now SPLIT into two variants:
 *   cycle_undirected  — uses parent check (the correct approach for undirected)
 *   cycle_directed    — uses recursion stack (the correct approach for directed)
 *
 * getEditorTemplate() picks the right one based on currentType.
 */

let editorCM = null,
  curEdAlgo = "bfs",
  curEdLang = "cpp";

const ED_NAMES = {
  bfs: "BFS",
  dfs: "DFS",
  dijkstra: "Dijkstra's",
  cycle: "Cycle Detection",
  components: "Connected Components",
  topo: "Topological Sort",
};

// Returns current cycle variant label for the badge
const getCycleVariantLabel = () =>
  isDirectedType(currentType)
    ? "directed (rec-stack)"
    : "undirected (parent check)";

//   CODE TEMPLATES
// Only showing cycle split here — other algos are universal
const TEMPLATES = {
  bfs: {
    cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Time: O(V+E) | Space: O(V)
void bfs(vector<vector<int>>& adj, int start, int V) {
    vector<bool> vis(V, false);
    queue<int> q;
    vis[start] = true;
    q.push(start);
    cout << "BFS: ";
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int nbr : adj[node])
            if (!vis[nbr]) { vis[nbr] = true; q.push(nbr); }
    }
    cout << endl;
}

int main() {
    int V = 6;
    vector<vector<int>> adj(V);
    // undirected — add both directions
    auto add = [&](int u, int v) { adj[u].push_back(v); adj[v].push_back(u); };
    add(0,1); add(0,2); add(1,3); add(1,4); add(2,5);
    bfs(adj, 0, V);
    return 0;
}`,
    python: `from collections import deque

# Time: O(V+E) | Space: O(V)
def bfs(adj, start):
    vis = [False] * len(adj)
    q = deque([start])
    vis[start] = True
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for nbr in adj[node]:
            if not vis[nbr]:
                vis[nbr] = True
                q.append(nbr)
    print("BFS:", "->".join(map(str, order)))

# undirected adjacency list
adj = [[1,2],[0,3,4],[0,5],[1],[1],[2]]
bfs(adj, 0)`,
    java: `import java.util.*;

public class BFS {
    static void bfs(List<List<Integer>> adj, int start, int V) {
        boolean[] vis = new boolean[V];
        Queue<Integer> q = new LinkedList<>();
        vis[start] = true;
        q.add(start);
        System.out.print("BFS: ");
        while (!q.isEmpty()) {
            int node = q.poll();
            System.out.print(node + " ");
            for (int nbr : adj.get(node))
                if (!vis[nbr]) { vis[nbr] = true; q.add(nbr); }
        }
        System.out.println();
    }
}`,
    c: `#include <stdio.h>
#define V 6
int adj[V][V], vis[V], q[100], f=0, r=0;

void bfs(int s) {
    vis[s]=1; q[r++]=s;
    printf("BFS: ");
    while (f < r) {
        int nd = q[f++];
        printf("%d ", nd);
        for (int i=0; i<V; i++)
            if (adj[nd][i] && !vis[i]) { vis[i]=1; q[r++]=i; }
    }
    printf("\\n");
}

int main() {
    // Build undirected adj matrix
    int edges[][2]={{0,1},{0,2},{1,3},{1,4},{2,5}};
    for (int i=0; i<5; i++) {
        adj[edges[i][0]][edges[i][1]] = 1;
        adj[edges[i][1]][edges[i][0]] = 1;
    }
    bfs(0);
    return 0;
}`,
    js: `// Time: O(V+E) | Space: O(V)
function bfs(adj, start) {
    const vis = new Array(adj.length).fill(false);
    const q = [start];
    vis[start] = true;
    const order = [];
    while (q.length) {
        const node = q.shift();
        order.push(node);
        for (const nbr of adj[node])
            if (!vis[nbr]) { vis[nbr] = true; q.push(nbr); }
    }
    console.log("BFS:", order.join("->"));
}

const adj = [[1,2],[0,3,4],[0,5],[1],[1],[2]];
bfs(adj, 0);`,
  },

  dfs: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

// Time: O(V+E) | Space: O(V) recursion stack
void dfs(vector<vector<int>>& adj, vector<bool>& vis, int node) {
    vis[node] = true;
    cout << node << " ";
    for (int nbr : adj[node])
        if (!vis[nbr]) dfs(adj, vis, nbr);
}

int main() {
    int V = 6;
    vector<vector<int>> adj(V);
    auto add = [&](int u, int v) { adj[u].push_back(v); adj[v].push_back(u); };
    add(0,1); add(0,2); add(1,3); add(1,4); add(2,5);
    vector<bool> vis(V, false);
    cout << "DFS: ";
    dfs(adj, vis, 0);
    cout << endl;
    return 0;
}`,
    python: `def dfs(adj, vis, node, order):
    vis[node] = True
    order.append(node)
    for nbr in adj[node]:
        if not vis[nbr]:
            dfs(adj, vis, nbr, order)

adj = [[1,2],[0,3,4],[0,5],[1],[1],[2]]
vis = [False] * 6
order = []
dfs(adj, vis, 0, order)
print("DFS:", "->".join(map(str, order)))`,
    java: `import java.util.*;

public class DFS {
    static void dfs(List<List<Integer>> adj, boolean[] vis, int node) {
        vis[node] = true;
        System.out.print(node + " ");
        for (int nbr : adj.get(node))
            if (!vis[nbr]) dfs(adj, vis, nbr);
    }
}`,
    c: `#include <stdio.h>
#define V 6
int adj[V][V], vis[V];

void dfs(int n) {
    vis[n] = 1;
    printf("%d ", n);
    for (int i=0; i<V; i++)
        if (adj[n][i] && !vis[i]) dfs(i);
}

int main() {
    int e[][2]={{0,1},{0,2},{1,3},{1,4},{2,5}};
    for (int i=0;i<5;i++){adj[e[i][0]][e[i][1]]=adj[e[i][1]][e[i][0]]=1;}
    printf("DFS: ");
    dfs(0);
    printf("\\n");
    return 0;
}`,
    js: `function dfs(adj, vis, node, order = []) {
    vis[node] = true;
    order.push(node);
    for (const nbr of adj[node])
        if (!vis[nbr]) dfs(adj, vis, nbr, order);
    return order;
}

const adj = [[1,2],[0,3,4],[0,5],[1],[1],[2]];
const vis = new Array(adj.length).fill(false);
console.log("DFS:", dfs(adj, vis, 0).join("->"));`,
  },

  dijkstra: {
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;
typedef pair<int,int> pii;

// Time: O((V+E) log V) | Space: O(V)
vector<int> dijkstra(vector<vector<pii>>& adj, int src, int V) {
    vector<int> dist(V, INT_MAX);
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;  // skip stale entry
        for (auto [w, v] : adj[u])
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
    }
    return dist;
}`,
    python: `import heapq

# Time: O((V+E) log V) | Space: O(V)
def dijkstra(adj, src, V):
    dist = [float('inf')] * V
    dist[src] = 0
    pq = [(0, src)]  # (distance, node)
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue  # stale — skip
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
    java: `import java.util.*;

public class Dijkstra {
    static int[] dijkstra(List<int[]>[] adj, int src, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        dist[src] = 0;
        pq.add(new int[]{0, src});
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int d = top[0], u = top[1];
            if (d > dist[u]) continue;
            for (int[] e : adj[u]) {
                int v = e[0], w = e[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.add(new int[]{dist[v], v});
                }
            }
        }
        return dist;
    }
}`,
    c: `#include <stdio.h>
#include <limits.h>
#define V 5

// Simple O(V^2) Dijkstra — good enough for small graphs
int dist[V], vis[V];
int adj[V][V], w[V][V];

void dijkstra(int src) {
    for (int i=0;i<V;i++){dist[i]=INT_MAX;vis[i]=0;}
    dist[src] = 0;
    for (int c=0;c<V;c++){
        int u=-1;
        for (int i=0;i<V;i++)
            if (!vis[i] && (u==-1 || dist[i]<dist[u])) u=i;
        if (u==-1 || dist[u]==INT_MAX) break;
        vis[u]=1;
        for (int v=0;v<V;v++)
            if (adj[u][v] && !vis[v] && dist[u]+w[u][v] < dist[v])
                dist[v] = dist[u] + w[u][v];
    }
}`,
    js: `// Time: O((V+E) log V) | Space: O(V)
function dijkstra(adj, src) {
    const V = adj.length;
    const dist = new Array(V).fill(Infinity);
    dist[src] = 0;
    // Array-based min-priority queue (fine for small graphs)
    const pq = [[0, src]];
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, u] = pq.shift();
        if (d > dist[u]) continue;
        for (const [v, wt] of adj[u])
            if (dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
                pq.push([dist[v], v]);
            }
    }
    return dist;
}`,
  },

  //   CYCLE: TWO SEPARATE VARIANTS
  // The editor picks the right one via getEditorTemplate()
  cycle_undirected: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

/*
 * UNDIRECTED graph cycle detection.
 * Trick: just pass the parent node. If we see a visited neighbour
 * that isn't our parent, that's a back-edge → cycle!
 * No recursion stack needed — much simpler than directed version.
 */
bool dfsCycle(vector<vector<int>>& adj, vector<bool>& vis, int node, int parent) {
    vis[node] = true;
    for (int nbr : adj[node]) {
        if (!vis[nbr]) {
            if (dfsCycle(adj, vis, nbr, node)) return true;
        } else if (nbr != parent) {
            // Visited AND not our parent → back edge → CYCLE
            return true;
        }
    }
    return false;
}

bool hasCycle(vector<vector<int>>& adj, int V) {
    vector<bool> vis(V, false);
    for (int i = 0; i < V; i++)
        if (!vis[i] && dfsCycle(adj, vis, i, -1)) return true;
    return false;
}

int main() {
    int V = 5;
    vector<vector<int>> adj(V);
    // Undirected edges
    auto add = [&](int u, int v) { adj[u].push_back(v); adj[v].push_back(u); };
    add(0,1); add(1,2); add(2,3); add(3,4);  // no cycle
    cout << (hasCycle(adj,V) ? "Cycle!" : "No cycle") << endl;
    add(4,1);  // creates cycle 1-2-3-4-1
    cout << (hasCycle(adj,V) ? "Cycle!" : "No cycle") << endl;
    return 0;
}`,
    python: `# UNDIRECTED graph cycle detection
# Uses parent check — no rec-stack needed.

def dfs_cycle(adj, vis, node, parent):
    vis[node] = True
    for nbr in adj[node]:
        if not vis[nbr]:
            if dfs_cycle(adj, vis, nbr, node):
                return True
        elif nbr != parent:
            # visited AND not our parent → back edge → cycle
            return True
    return False

def has_cycle(adj, V):
    vis = [False] * V
    return any(not vis[i] and dfs_cycle(adj, vis, i, -1) for i in range(V))

# Test
adj = [[1],[0,2],[1,3],[2,4],[3]]  # linear chain — no cycle
print(has_cycle(adj, 5))  # False
adj[4].append(1); adj[1].append(4)  # add 1-4 edge → creates cycle
print(has_cycle(adj, 5))  # True`,
    java: `import java.util.*;

public class CycleUndirected {
    /*
     * Undirected cycle: check if visited neighbour is NOT the parent.
     * Parent tracking avoids false positives (parent is always "visited").
     */
    static boolean dfs(List<List<Integer>> adj, boolean[] vis, int node, int parent) {
        vis[node] = true;
        for (int nbr : adj.get(node)) {
            if (!vis[nbr]) {
                if (dfs(adj, vis, nbr, node)) return true;
            } else if (nbr != parent) {
                return true;  // back edge found
            }
        }
        return false;
    }

    static boolean hasCycle(List<List<Integer>> adj, int V) {
        boolean[] vis = new boolean[V];
        for (int i = 0; i < V; i++)
            if (!vis[i] && dfs(adj, vis, i, -1)) return true;
        return false;
    }
}`,
    c: `#include <stdio.h>
#define V 5
int adj[V][V], vis[V];

// Undirected: pass parent to avoid going back on same edge
int dfsCycle(int node, int parent) {
    vis[node] = 1;
    for (int nbr = 0; nbr < V; nbr++) {
        if (!adj[node][nbr]) continue;
        if (!vis[nbr]) {
            if (dfsCycle(nbr, node)) return 1;
        } else if (nbr != parent) {
            return 1;  // cycle!
        }
    }
    return 0;
}

int main() {
    // Build undirected graph: 0-1-2-3-4-1 (cycle)
    int e[][2]={{0,1},{1,2},{2,3},{3,4},{4,1}};
    for(int i=0;i<5;i++){adj[e[i][0]][e[i][1]]=adj[e[i][1]][e[i][0]]=1;}
    printf(dfsCycle(0,-1)?"Cycle!\\n":"No cycle\\n");
    return 0;
}`,
    js: `// UNDIRECTED cycle detection — parent check approach
function dfsCycle(adj, vis, node, parent) {
    vis[node] = true;
    for (const nbr of adj[node]) {
        if (!vis[nbr]) {
            if (dfsCycle(adj, vis, nbr, node)) return true;
        } else if (nbr !== parent) {
            return true;  // back edge — cycle found
        }
    }
    return false;
}

function hasCycle(adj) {
    const vis = new Array(adj.length).fill(false);
    return adj.some((_, i) => !vis[i] && dfsCycle(adj, vis, i, -1));
}

// Test
const adj = [[1],[0,2],[1,3],[2,4],[3]];  // no cycle
console.log(hasCycle(adj));  // false
adj[4].push(1); adj[1].push(4);  // add back edge → cycle
console.log(hasCycle(adj));  // true`,
  },

  cycle_directed: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

/*
 * DIRECTED graph cycle detection.
 * Must use a recursion stack (rec[]) — parent check doesn't work
 * because in a directed graph, visiting a node doesn't mean cycle.
 * Only if we reach a node that's CURRENTLY in our DFS call stack
 * does it confirm a cycle (back edge).
 */
bool dfsCycle(vector<vector<int>>& adj, vector<bool>& vis, vector<bool>& rec, int node) {
    vis[node] = true;
    rec[node] = true;  // add to current call stack

    for (int nbr : adj[node]) {
        if (!vis[nbr] && dfsCycle(adj, vis, rec, nbr)) return true;
        else if (rec[nbr]) return true;  // still in call stack → cycle!
    }

    rec[node] = false;  // remove from call stack on backtrack
    return false;
}

bool hasCycle(vector<vector<int>>& adj, int V) {
    vector<bool> vis(V, false), rec(V, false);
    for (int i = 0; i < V; i++)
        if (!vis[i] && dfsCycle(adj, vis, rec, i)) return true;
    return false;
}

int main() {
    int V = 4;
    vector<vector<int>> adj(V);
    adj[0].push_back(1);
    adj[1].push_back(2);
    adj[2].push_back(3);
    adj[3].push_back(1);  // directed cycle 1→2→3→1
    cout << (hasCycle(adj, V) ? "Cycle!" : "No cycle") << endl;
    return 0;
}`,
    python: `# DIRECTED graph cycle detection
# Must use a recursion stack (rec[]) — parent check doesn't work
# for directed graphs. Only a node IN the current call stack
# confirms a cycle.

def dfs_cycle(adj, vis, rec, node):
    vis[node] = True
    rec[node] = True   # add to current DFS call stack

    for nbr in adj[node]:
        if not vis[nbr]:
            if dfs_cycle(adj, vis, rec, nbr):
                return True
        elif rec[nbr]:
            return True  # in call stack → back edge → cycle!

    rec[node] = False  # remove from call stack on backtrack
    return False

def has_cycle(adj, V):
    vis = [False] * V
    rec = [False] * V
    return any(not vis[i] and dfs_cycle(adj, vis, rec, i) for i in range(V))

# Test: directed cycle 1→2→3→1
adj = [[1],[2],[3],[1]]
print(has_cycle(adj, 4))  # True

# No cycle: 0→1→2→3
adj2 = [[1],[2],[3],[]]
print(has_cycle(adj2, 4))  # False`,
    java: `import java.util.*;

public class CycleDirected {
    /*
     * Directed cycle detection: uses rec[] (recursion stack).
     * If we reach a node still in rec[], we found a back edge = cycle.
     * This is different from undirected — we can't just check the parent.
     */
    static boolean dfs(List<List<Integer>> adj, boolean[] vis, boolean[] rec, int node) {
        vis[node] = true;
        rec[node] = true;
        for (int nbr : adj.get(node)) {
            if (!vis[nbr] && dfs(adj, vis, rec, nbr)) return true;
            else if (rec[nbr]) return true;
        }
        rec[node] = false;
        return false;
    }

    static boolean hasCycle(List<List<Integer>> adj, int V) {
        boolean[] vis = new boolean[V], rec = new boolean[V];
        for (int i = 0; i < V; i++)
            if (!vis[i] && dfs(adj, vis, rec, i)) return true;
        return false;
    }
}`,
    c: `#include <stdio.h>
#define V 4
int adj[V][V], vis[V], rec[V];

// Directed: must track recursion stack separately from visited
int dfsCycle(int node) {
    vis[node] = rec[node] = 1;
    for (int nbr = 0; nbr < V; nbr++) {
        if (!adj[node][nbr]) continue;
        if (!vis[nbr] && dfsCycle(nbr)) return 1;
        else if (rec[nbr]) return 1;  // back edge!
    }
    rec[node] = 0;  // remove from call stack on backtrack
    return 0;
}

int main() {
    // Directed cycle: 0→1→2→3→1
    adj[0][1]=adj[1][2]=adj[2][3]=adj[3][1]=1;
    int found=0;
    for(int i=0;i<V;i++) if(!vis[i]&&dfsCycle(i)){found=1;break;}
    printf(found?"Cycle!\\n":"No cycle\\n");
    return 0;
}`,
    js: `// DIRECTED cycle detection — uses recursion stack (rec[])
// This is the key difference from undirected:
// we can't just check if neighbour is parent.

function dfsCycle(adj, vis, rec, node) {
    vis[node] = true;
    rec[node] = true;   // add to current call stack
    for (const nbr of adj[node]) {
        if (!vis[nbr] && dfsCycle(adj, vis, rec, nbr)) return true;
        else if (rec[nbr]) return true;  // in call stack = back edge = cycle
    }
    rec[node] = false;  // remove on backtrack
    return false;
}

function hasCycle(adj) {
    const vis = new Array(adj.length).fill(false);
    const rec = new Array(adj.length).fill(false);
    return adj.some((_, i) => !vis[i] && dfsCycle(adj, vis, rec, i));
}

// Test: directed cycle 1→2→3→1
const adj = [[1],[2],[3],[1]];
console.log(hasCycle(adj));  // true

// No cycle
const adj2 = [[1],[2],[3],[]];
console.log(hasCycle(adj2));  // false`,
  },

  components: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<int>>& adj, vector<bool>& vis, int node, vector<int>& comp) {
    vis[node] = true;
    comp.push_back(node);
    for (int nbr : adj[node]) if (!vis[nbr]) dfs(adj, vis, nbr, comp);
}

int countComponents(vector<vector<int>>& adj, int V) {
    vector<bool> vis(V, false);
    int count = 0;
    for (int i = 0; i < V; i++) {
        if (!vis[i]) {
            vector<int> comp;
            dfs(adj, vis, i, comp);
            cout << "Component " << count++ << ": ";
            for (int v : comp) cout << v << " ";
            cout << "\\n";
        }
    }
    return count;
}

int main() {
    int V = 7;
    vector<vector<int>> adj(V);
    auto add = [&](int u, int v) { adj[u].push_back(v); adj[v].push_back(u); };
    add(0,1); add(1,2);   // component 0
    add(3,4);              // component 1
    add(5,6);              // component 2
    cout << countComponents(adj, V) << " components total\\n";
    return 0;
}`,
    python: `def dfs(adj, vis, node, comp):
    vis[node] = True
    comp.append(node)
    for nbr in adj[node]:
        if not vis[nbr]: dfs(adj, vis, nbr, comp)

def count_components(adj, V):
    vis = [False] * V
    count = 0
    for i in range(V):
        if not vis[i]:
            comp = []
            dfs(adj, vis, i, comp)
            print(f"Component {count}: {comp}")
            count += 1
    return count

V = 7
adj = [[] for _ in range(V)]
def add(u,v): adj[u].append(v); adj[v].append(u)
add(0,1); add(1,2); add(3,4); add(5,6)
print(count_components(adj, V), "components")`,
    java: `import java.util.*;

public class Components {
    static void dfs(List<List<Integer>> adj, boolean[] vis, int n, List<Integer> comp) {
        vis[n] = true; comp.add(n);
        for (int nbr : adj.get(n)) if (!vis[nbr]) dfs(adj, vis, nbr, comp);
    }

    static int count(List<List<Integer>> adj, int V) {
        boolean[] vis = new boolean[V]; int count = 0;
        for (int i = 0; i < V; i++) if (!vis[i]) {
            List<Integer> c = new ArrayList<>();
            dfs(adj, vis, i, c);
            System.out.println("Component " + count++ + ": " + c);
        }
        return count;
    }
}`,
    c: `#include <stdio.h>
#define V 7
int adj[V][V], vis[V];

void dfs(int n, int c) {
    vis[n]=1; printf("%d(C%d) ", n, c);
    for (int i=0;i<V;i++) if(adj[n][i]&&!vis[i]) dfs(i,c);
}

int main() {
    int e[][2]={{0,1},{1,2},{3,4},{5,6}};
    for(int i=0;i<4;i++){adj[e[i][0]][e[i][1]]=adj[e[i][1]][e[i][0]]=1;}
    int c=0;
    for(int i=0;i<V;i++) if(!vis[i]){dfs(i,c);c++;printf("\\n");}
    printf("%d components\\n",c);
    return 0;
}`,
    js: `function dfs(adj, vis, node, comp) {
    vis[node] = true; comp.push(node);
    for (const nbr of adj[node]) if (!vis[nbr]) dfs(adj, vis, nbr, comp);
}

function countComponents(adj) {
    const vis = new Array(adj.length).fill(false);
    let count = 0;
    for (let i = 0; i < adj.length; i++) if (!vis[i]) {
        const comp = [];
        dfs(adj, vis, i, comp);
        console.log("Component " + count++ + ":", comp.join(","));
    }
    return count;
}

// 3 separate components
const adj = [[1],[0,2],[1],[4],[3],[6],[5]];
console.log(countComponents(adj), "components");`,
  },

  topo: {
    cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

void dfs(vector<vector<int>>& adj, vector<bool>& vis, stack<int>& stk, int node) {
    vis[node] = true;
    for (int nbr : adj[node]) if (!vis[nbr]) dfs(adj, vis, stk, nbr);
    stk.push(node);  // push AFTER all descendants — that's what makes it topo
}

vector<int> topoSort(vector<vector<int>>& adj, int V) {
    vector<bool> vis(V, false);
    stack<int> stk;
    for (int i = 0; i < V; i++) if (!vis[i]) dfs(adj, vis, stk, i);
    vector<int> order;
    while (!stk.empty()) { order.push_back(stk.top()); stk.pop(); }
    return order;
}

int main() {
    int V = 6;
    vector<vector<int>> adj(V);
    adj[5].push_back(2); adj[5].push_back(0);
    adj[4].push_back(0); adj[4].push_back(1);
    adj[2].push_back(3); adj[3].push_back(1);
    auto order = topoSort(adj, V);
    for (int v : order) cout << v << " ";
    cout << endl;
    return 0;
}`,
    python: `import sys; sys.setrecursionlimit(10000)

def dfs(adj, vis, node, stack):
    vis[node] = True
    for nbr in adj[node]:
        if not vis[nbr]: dfs(adj, vis, nbr, stack)
    stack.append(node)  # push AFTER all descendants

def topo_sort(adj, V):
    vis = [False] * V
    stack = []
    for i in range(V):
        if not vis[i]: dfs(adj, vis, i, stack)
    return list(reversed(stack))

V = 6; adj = [[] for _ in range(V)]
adj[5] += [2, 0]; adj[4] += [0, 1]; adj[2].append(3); adj[3].append(1)
print("Topo:", "->".join(map(str, topo_sort(adj, V))))`,
    java: `import java.util.*;

public class Topo {
    static void dfs(List<List<Integer>> adj, boolean[] vis, Deque<Integer> stk, int n) {
        vis[n] = true;
        for (int nbr : adj.get(n)) if (!vis[nbr]) dfs(adj, vis, stk, nbr);
        stk.push(n);  // post-order push
    }

    public static void main(String[] a) {
        int V = 6;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
        adj.get(5).addAll(Arrays.asList(2, 0));
        adj.get(4).addAll(Arrays.asList(0, 1));
        adj.get(2).add(3); adj.get(3).add(1);
        boolean[] vis = new boolean[V];
        Deque<Integer> stk = new ArrayDeque<>();
        for (int i = 0; i < V; i++) if (!vis[i]) dfs(adj, vis, stk, i);
        while (!stk.isEmpty()) System.out.print(stk.pop() + " ");
    }
}`,
    c: `#include <stdio.h>
#define V 6
int adj[V][V], vis[V], res[V], top=0;

void dfs(int n) {
    vis[n]=1;
    for (int i=0;i<V;i++) if(adj[n][i]&&!vis[i]) dfs(i);
    res[top++]=n;  // push after all children
}

int main() {
    adj[5][2]=adj[5][0]=adj[4][0]=adj[4][1]=adj[2][3]=adj[3][1]=1;
    for(int i=0;i<V;i++) if(!vis[i]) dfs(i);
    for(int i=top-1;i>=0;i--) printf("%d ",res[i]);
    printf("\\n");
    return 0;
}`,
    js: `function topoSort(adj) {
    const V = adj.length;
    const vis = new Array(V).fill(false);
    const stack = [];

    function dfs(node) {
        vis[node] = true;
        for (const nbr of adj[node]) if (!vis[nbr]) dfs(nbr);
        stack.push(node);  // push AFTER all children — post-order
    }

    for (let i = 0; i < V; i++) if (!vis[i]) dfs(i);
    return stack.reverse();
}

// Directed acyclic graph
const adj = [[], [], [3], [1], [0,1], [2,0]];
console.log("Topo:", topoSort(adj).join("->"));`,
  },
};


const getEditorTemplate = (algo, lang) => {
  // Cycle detection: pick the right variant based on graph direction
  if (algo === "cycle") {
    const variant = isDirectedType(currentType)
      ? "cycle_directed"
      : "cycle_undirected";
    return TEMPLATES[variant]?.[lang] || "// Not available";
  }

  // Dijkstra on a non-weighted tab: add a note so the user knows the context
  if (algo === "dijkstra" && !isWeightedType(currentType)) {
    const note = [
      `// Note: You're viewing this from the "${currentType}" tab.`,
      `// Dijkstra is designed for WEIGHTED graphs (edge costs matter).`,
      `// Switch to the "Weighted" tab to see it animate with edge weights.`,
      `// The code below is correct for a weighted undirected graph.\n`,
    ].join("\n");
    return note + (TEMPLATES["dijkstra"]?.[lang] || "// Not available");
  }

  return TEMPLATES[algo]?.[lang] || "// Not available";
};

const RUN_INPUTS = {
  bfs: `<div class="ig2"><div><label class="ctrl-lbl">Edges (u-v)</label><input id="ri0" value="0-1,0-2,1-3,1-4,2-5"></div><div><label class="ctrl-lbl">Start</label><input type="number" id="ri1" value="0" style="width:70px;"></div></div>`,
  dfs: `<div class="ig2"><div><label class="ctrl-lbl">Edges (u-v)</label><input id="ri0" value="0-1,0-2,1-3,1-4,2-5"></div><div><label class="ctrl-lbl">Start</label><input type="number" id="ri1" value="0" style="width:70px;"></div></div>`,
  dijkstra: `<div class="ig2"><div><label class="ctrl-lbl">Weighted edges (u-v-w)</label><input id="ri0" value="0-1-4,0-2-1,2-1-2,1-3-5,2-3-8"></div><div><label class="ctrl-lbl">Source</label><input type="number" id="ri1" value="0" style="width:70px;"></div></div>`,
  cycle: `<div class="ig2"><div><label class="ctrl-lbl">Directed edges (try 0-1,1-2,2-0)</label><input id="ri0" value="0-1,1-2,2-3,3-1"></div><div><label class="ctrl-lbl">V</label><input type="number" id="ri1" value="4" style="width:70px;"></div></div>`,
  components: `<div class="ig2"><div><label class="ctrl-lbl">Edges (gaps ok: 0-1,2-3,4)</label><input id="ri0" value="0-1,1-2,3-4,5-6"></div><div><label class="ctrl-lbl">Total V</label><input type="number" id="ri1" value="7" style="width:70px;"></div></div>`,
  topo: `<div class="ig2"><div><label class="ctrl-lbl">Directed acyclic edges (u→v as u-v)</label><input id="ri0" value="5-2,5-0,4-0,4-1,2-3,3-1"></div><div><label class="ctrl-lbl">V</label><input type="number" id="ri1" value="6" style="width:70px;"></div></div>`,
};

const setEditorAlgo = (algo) => {
  curEdAlgo = algo;
  document
    .querySelectorAll("#algoPicker .ap")
    .forEach((el) => el.classList.toggle("on", el.dataset.a === algo));
  if (editorCM) editorCM.setValue(getEditorTemplate(algo, curEdLang));
  document.getElementById("edLabel").textContent =
    `${curEdLang.toUpperCase()} — ${ED_NAMES[algo]}`;

  // Variant badge: shows context-specific info for cycle and dijkstra
  const badge = document.getElementById("edVariantBadge");
  if (algo === "cycle") {
    badge.textContent = getCycleVariantLabel();
    badge.style.display = "inline";
  } else if (algo === "dijkstra" && !isWeightedType(currentType)) {
    badge.textContent = "⚠ best used on Weighted tab";
    badge.style.background = "rgba(245,158,11,.12)";
    badge.style.borderColor = "var(--orange)";
    badge.style.color = "var(--orange)";
    badge.style.display = "inline";
  } else {
    badge.style.display = "none";
  }

  document.getElementById("runInputs").innerHTML = RUN_INPUTS[algo] || "";
  document.getElementById("codeOut").textContent =
    "Fill inputs and click Run...";
};

const copyEd = () => {
  if (!editorCM) return;
  navigator.clipboard.writeText(editorCM.getValue());
  const b = document.querySelector(".copy-btn");
  b.textContent = "Copied!";
  setTimeout(() => (b.textContent = "Copy"), 2000);
};

const runCode = () => {
  const r0 = (document.getElementById("ri0") || {}).value || "";
  const r1 = parseInt((document.getElementById("ri1") || {}).value) || 0;
  const out = document.getElementById("codeOut");
  out.innerHTML = '<span style="color:var(--cyan)">[Running…]</span>';

  setTimeout(() => {
    // JavaScript runs inline; others are simulated
    if (curEdLang === "js") {
      try {
        const logs = [];
        const origLog = console.log;
        console.log = (...a) => logs.push(a.map(String).join(" "));
        eval(editorCM.getValue());
        console.log = origLog;
        out.innerHTML =
          logs
            .map((l) => `<span style="color:var(--green)">${l}</span>`)
            .join("<br>") || "(No output)";
      } catch (e) {
        out.innerHTML = `<span style="color:var(--red)">Error: ${e.message}</span>`;
      }
      return;
    }

    const f = (s, c = "var(--green)") => `<span style="color:${c}">${s}</span>`;

    
    const typeInfo = {
      undirected: "Undirected Graph — edges go both ways (u↔v)",
      directed: "Directed Graph — edges are one-way (u→v only)",
      weighted: "Weighted Graph — edge costs determine shortest path",
      connected: "Connected/Disconnected Graph — finding components",
      cyclic: "Cyclic Graph — directed edges, checking for back-edges",
      dag: "DAG — Directed Acyclic Graph, topological ordering",
    };

    let html = f(`[Simulated ${curEdLang.toUpperCase()} Output]`) + "<br>";
    html += f(typeInfo[currentType] || "", "var(--muted)") + "<br><br>";

    if (curEdAlgo === "bfs" || curEdAlgo === "dfs") {
      const { adj, n } = parseEdges(r0, false, false);
      const vis = new Set();
      const order = [];
      if (curEdAlgo === "bfs") {
        const q = [r1];
        vis.add(r1);
        while (q.length) {
          const nd = q.shift();
          order.push(nd);
          (adj[nd] || []).forEach(({ to: nb }) => {
            if (!vis.has(nb)) {
              vis.add(nb);
              q.push(nb);
            }
          });
        }
      } else {
        (function dfs(nd) {
          vis.add(nd);
          order.push(nd);
          (adj[nd] || []).forEach(({ to: nb }) => {
            if (!vis.has(nb)) dfs(nb);
          });
        })(r1);
      }
      html += f(`${curEdAlgo.toUpperCase()}: ${order.join(" -> ")}`);
    } else if (curEdAlgo === "dijkstra") {
      const { adj, n } = parseEdges(r0, false, true);
      if (!n) {
        html += f("⚠ Parse error", "var(--red)");
        out.innerHTML = html;
        return;
      }
      const dist = new Array(n).fill(Infinity);
      dist[r1] = 0;
      const vis = new Set();
      for (let i = 0; i < n; i++) {
        let u = -1,
          d = Infinity;
        for (let j = 0; j < n; j++)
          if (!vis.has(j) && dist[j] < d) {
            d = dist[j];
            u = j;
          }
        if (u === -1) break;
        vis.add(u);
        (adj[u] || []).forEach(({ to: v, w }) => {
          if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        });
      }
      dist.forEach((d, i) => {
        html +=
          f(`  0 -> ${i}: ${d === Infinity ? "∞ (unreachable)" : d}`) + "<br>";
      });
    } else if (curEdAlgo === "cycle") {
      if (isDirectedType(currentType)) {
        // Directed: rec-stack approach
        const { adj, n } = parseEdges(r0, true, false);
        const vis = new Set();
        const rec = new Set();
        let found = false;
        const dfsCy = (nd) => {
          if (found) return;
          vis.add(nd);
          rec.add(nd);
          (adj[nd] || []).forEach(({ to: nb }) => {
            if (!vis.has(nb)) dfsCy(nb);
            else if (rec.has(nb)) found = true;
          });
          rec.delete(nd);
        };
        for (let i = 0; i < n; i++) if (!vis.has(i)) dfsCy(i);
        html +=
          f(
            "Algorithm: Directed cycle detection (recursion stack)",
            "var(--muted)",
          ) + "<br>";
        html += f(
          found ? "⚠ Cycle Detected!" : "✓ No Cycle — Acyclic graph",
          found ? "var(--red)" : "var(--green)",
        );
      } else {
        // Undirected: parent-check approach
        const { adj, n } = parseEdges(r0, false, false);
        const vis = new Set();
        let found = false;
        const dfsCy = (nd, parent) => {
          if (found) return;
          vis.add(nd);
          (adj[nd] || []).forEach(({ to: nb }) => {
            if (!vis.has(nb)) dfsCy(nb, nd);
            else if (nb !== parent) found = true; // not parent = back edge
          });
        };
        for (let i = 0; i < n; i++) if (!vis.has(i)) dfsCy(i, -1);
        html +=
          f(
            "Algorithm: Undirected cycle detection (parent check, no rec-stack needed)",
            "var(--muted)",
          ) + "<br>";
        html += f(
          found ? "⚠ Cycle Detected!" : "✓ No Cycle — Acyclic graph",
          found ? "var(--red)" : "var(--green)",
        );
      }
    } else if (curEdAlgo === "components") {
      const { adj, n } = parseConnected(r0);
      const vis = new Set();
      let cnt = 0;
      function dfsC(nd, arr) {
        vis.add(nd);
        arr.push(nd);
        (adj[nd] || []).forEach(({ to: nb }) => {
          if (!vis.has(nb)) dfsC(nb, arr);
        });
      }
      for (let i = 0; i < n; i++)
        if (!vis.has(i)) {
          const a = [];
          dfsC(i, a);
          html += f(`Component ${cnt}: [${a.join(", ")}]`) + "<br>";
          cnt++;
        }
      html +=
        "<br>" +
        f(`${cnt} component${cnt > 1 ? "s" : ""} total`, "var(--cyan)");
    } else if (curEdAlgo === "topo") {
      const { adj, n } = parseEdges(r0, true, false);
      const vis = new Set();
      const order = [];
      (function dfsT(nd) {
        vis.add(nd);
        (adj[nd] || []).forEach(({ to: nb }) => {
          if (!vis.has(nb)) dfsT(nb);
        });
        order.unshift(nd);
      })(0);
      for (let i = 0; i < n; i++)
        if (!vis.has(i)) {
          (function dfsT(nd) {
            vis.add(nd);
            (adj[nd] || []).forEach(({ to: nb }) => {
              if (!vis.has(nb)) dfsT(nb);
            });
            order.unshift(nd);
          })(i);
        }
      html += f("Topological Order: " + order.join(" -> "), "var(--purple)");
    }
    out.innerHTML = html;
  }, 400);
};

//   INIT                  
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(THEMES[thIdx]);

  // Set pseudo-code for all type panels
  TYPES.forEach((t) => setPS(t, defaultAlgo(t)));

  // CodeMirror
  editorCM = CodeMirror.fromTextArea(document.getElementById("codeArea"), {
    lineNumbers: true,
    theme: CM_THEMES[THEMES[thIdx]],
    mode: "text/x-c++src",
    indentUnit: 4,
  });
  setEditorAlgo("bfs");

  // Language tabs
  document.querySelectorAll("#langTabs .lt").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll("#langTabs .lt")
        .forEach((t) => t.classList.remove("on"));
      tab.classList.add("on");
      curEdLang = tab.dataset.l;
      const modes = {
        cpp: "text/x-c++src",
        python: "text/x-python",
        java: "text/x-java",
        c: "text/x-csrc",
        js: "text/javascript",
      };
      editorCM.setOption("mode", modes[curEdLang]);
      editorCM.setValue(getEditorTemplate(curEdAlgo, curEdLang));
      document.getElementById("edLabel").textContent =
        `${curEdLang.toUpperCase()} — ${ED_NAMES[curEdAlgo]}`;
    });
  });

  // Init scenarios (undirected by default)
  scInitBest();
  scInitAvg();
  scInitWorst();

  // Redraw canvases on resize
  window.addEventListener("resize", () => {
    TYPES.forEach((t) => {
      const st = TYPE_STATE[t];
      if (st.n > 0)
        drawGraph(
          `c-${t}`,
          st.adj,
          st.n,
          Array(st.n).fill("unvisited"),
          new Set(),
          isDirectedType(t),
        );
    });
  });
});

//  ─ LEVEL NAV + MODAL

const ALGO_KEY = "graphs"; // Must match topics.html ID

function getLevelFromDB() {
  const progress = window.__levelProgress || {};
  return progress[ALGO_KEY] || 0;
}

function updateLevelButtons() {
  const currentLevel = getLevelFromDB();
  const btnL2 = document.getElementById("l2");
  const btnL3 = document.getElementById("l3");

  // If Level 2 or higher is reached, highlight L2 button
  if (currentLevel >= 2) {
    btnL2.style.borderColor = "var(--green)";
    btnL2.style.background = "rgba(16,185,129,0.12)";
    btnL2.style.color = "var(--green)";
  }
  // If Level 3 is reached (by solving a problem), highlight L3 button
  if (currentLevel >= 3) {
    btnL3.style.borderColor = "var(--green)";
    btnL3.style.background = "rgba(16,185,129,0.12)";
    btnL3.style.color = "var(--green)";
  }
}

// Level 1 Click
document.getElementById("l1").addEventListener("click", () => {
  window.location.href = "graphs_L1.html";
});

// Level 2 Click
document.getElementById("l2").addEventListener("click", () => {
  // Level 2 is always accessible if you are on this page
  window.location.reload();
});

// Level 3 Click 
document.getElementById("l3").addEventListener("click", () => {
  const currentLevel = getLevelFromDB();
  const modal = document.getElementById("modal");
  const modalMsg = document.getElementById("modalMsg");
  const okBtn = document.getElementById("mOk");

  if (currentLevel >= 2) {
    // SUCCESS: Redirect to practice page
    window.location.href = "practice.html?topic=graphs";
  } else {
    // LOCKED: Show modal
    modalMsg.textContent =
      "Pass the Level 2 Quiz to unlock the Practice Problems.";
    okBtn.textContent = "Take Quiz";
    okBtn.onclick = () => (window.location.href = "quiz.html?id=graphs-l2");
    modal.classList.add("show");
  }
});

// Modal Cancel
document.getElementById("mCancel").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("show");
});

window.addEventListener("progressReady", () => {
  if (typeof updateLevelButtons === "function") updateLevelButtons();
});
