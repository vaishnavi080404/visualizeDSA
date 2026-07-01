const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

const applyTheme = (t) => {
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIcon").innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
  if (window.syncThemeToServer) window.syncThemeToServer(t);
};

document.getElementById("themeToggle").addEventListener("click", () => {
  const cur = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(cur) + 1) % 3]);
});

applyTheme(localStorage.getItem("dsa-theme") || "dark");

// ── HAMBURGER     

function toggleMobileNav() {
  document.querySelector(".nav-links").classList.toggle("mobile-open");
}

document
  .querySelectorAll(".nav-links a")
  .forEach((a) =>
    a.addEventListener("click", () =>
      document.querySelector(".nav-links").classList.remove("mobile-open"),
    ),
  );

// ── SVG HELPERS     

const NS = "http://www.w3.org/2000/svg";

// Quick helper to make SVG elements — saves a lot of repetition
const svgEl = (tag, attrs) => {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
};

// Draw a circle node on an SVG
const drawNode = (
  svg,
  x,
  y,
  r,
  fill,
  label,
  textColor = "#fff",
  fontSize = "12",
) => {
  svg.appendChild(svgEl("circle", { cx: x, cy: y, r, fill }));
  const t = svgEl("text", {
    x,
    y: +y + 4,
    "text-anchor": "middle",
    "font-size": fontSize,
    "font-weight": "700",
    "font-family": "JetBrains Mono, monospace",
    fill: textColor,
  });
  t.textContent = label;
  svg.appendChild(t);
};

// Draw an edge (line) between two positions
const drawEdge = (
  svg,
  x1,
  y1,
  x2,
  y2,
  color = "#3a3a3a",
  width = 2,
  dashed = false,
) => {
  const attrs = {
    x1,
    y1,
    x2,
    y2,
    stroke: color,
    "stroke-width": width,
    "stroke-linecap": "round",
  };
  if (dashed) attrs["stroke-dasharray"] = "4 3";
  svg.appendChild(svgEl("line", attrs));
};

// Draw an edge label at midpoint
const drawEdgeLabel = (svg, x1, y1, x2, y2, label, color = "#666") => {
  const mx = (x1 + x2) / 2,
    my = (y1 + y2) / 2;
  const bg = svgEl("rect", {
    x: mx - 9,
    y: my - 8,
    width: 18,
    height: 13,
    rx: 3,
    fill: "#111",
  });
  svg.appendChild(bg);
  const t = svgEl("text", {
    x: mx,
    y: my + 2,
    "text-anchor": "middle",
    "font-size": "9",
    "font-weight": "700",
    "font-family": "JetBrains Mono, monospace",
    fill: color,
  });
  t.textContent = label;
  svg.appendChild(t);
};

// Mini cell builder
const buildCells = (elId, arr, classes) => {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  arr.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "mcell " + (classes[i] || "def");
    c.textContent = v;
    el.appendChild(c);
  });
};

    
//  CONCEPT VISUALIZER — BFS on 7-node graph
    

// Graph: 7 nodes (0-6), labeled A-G
// Adjacency list (undirected)
const BFS_LABELS = ["A", "B", "C", "D", "E", "F", "G"];
const BFS_ADJ = [
  [1, 2], // A → B, C
  [0, 3, 4], // B → A, D, E
  [0, 5, 6], // C → A, F, G
  [1], // D → B
  [1], // E → B
  [2], // F → C
  [2], // G → C
];

// Node positions inside viewBox 0 0 460 200
const BFS_POS = [
  { x: 230, y: 35 }, // A — root
  { x: 110, y: 105 }, // B
  { x: 350, y: 105 }, // C
  { x: 40, y: 175 }, // D
  { x: 180, y: 175 }, // E
  { x: 290, y: 175 }, // F
  { x: 420, y: 175 }, // G
];

// BFS state
let bfsVisited = new Array(7).fill(false);
let bfsQueue = []; // indices waiting to be processed
let bfsInQueue = new Array(7).fill(false); // tracking who's in queue
let bfsStep = 0;
let bfsDone = false;

const BFS_COLORS = {
  unvisited: "#1e1e1e",
  inQueue: "#f59e0b", // orange — in queue
  visited: "#10b981", // green  — done
  source: "#f43f5e", // rose   — source node
};

const drawConceptGraph = (activeIdx = -1) => {
  const svg = document.getElementById("conceptSvg");
  svg.innerHTML = "";

  // Draw edges first
  for (let u = 0; u < BFS_ADJ.length; u++) {
    for (const v of BFS_ADJ[u]) {
      if (v > u) {
        // draw each edge once
        drawEdge(
          svg,
          BFS_POS[u].x,
          BFS_POS[u].y,
          BFS_POS[v].x,
          BFS_POS[v].y,
          "#3a3a3a",
          2,
        );
      }
    }
  }

  // Draw nodes
  BFS_LABELS.forEach((lbl, i) => {
    let fill;
    if (i === 0 && bfsStep === 0) fill = BFS_COLORS.source;
    else if (bfsVisited[i]) fill = BFS_COLORS.visited;
    else if (bfsInQueue[i]) fill = BFS_COLORS.inQueue;
    else fill = BFS_COLORS.unvisited;

    // Glow ring for active node
    if (i === activeIdx) {
      svg.appendChild(
        svgEl("circle", {
          cx: BFS_POS[i].x,
          cy: BFS_POS[i].y,
          r: "24",
          fill: "none",
          stroke: "#fff",
          "stroke-width": "2",
          opacity: "0.4",
        }),
      );
    }

    drawNode(svg, BFS_POS[i].x, BFS_POS[i].y, 20, fill, lbl);
  });
};

// Render the queue display as small cells
const renderBfsQueueDisplay = () => {
  const el = document.getElementById("bfsQueue");
  el.innerHTML = "";
  bfsQueue.forEach((idx) => {
    const c = document.createElement("div");
    c.style.cssText =
      'min-width:24px;height:24px;border-radius:4px;background:rgba(245,158,11,.2);border:1.5px solid #f59e0b;display:flex;align-items:center;justify-content:center;font-family:"JetBrains Mono",monospace;font-size:.62rem;font-weight:700;color:#f59e0b;';
    c.textContent = BFS_LABELS[idx];
    el.appendChild(c);
  });
  if (bfsQueue.length === 0 && !bfsDone) {
    el.innerHTML =
      "<span style=\"font-size:.65rem;color:var(--txt2);font-family:'JetBrains Mono',monospace;\">empty</span>";
  }
};

const doBfsStep = () => {
  if (bfsDone) {
    doBfsReset();
    return;
  }

  // First call — init BFS from node 0 (A)
  if (bfsStep === 0) {
    bfsQueue.push(0);
    bfsInQueue[0] = true;
    drawConceptGraph(0);
    renderBfsQueueDisplay();
    document.getElementById("conceptMsg").innerHTML =
      "BFS init: source <span>A</span> added to queue. Queue = [A]";
    bfsStep++;
    return;
  }

  if (bfsQueue.length === 0) {
    bfsDone = true;
    drawConceptGraph(-1);
    document.getElementById("conceptMsg").innerHTML =
      "✅ BFS complete! All <span>" +
      BFS_LABELS.filter((_, i) => bfsVisited[i]).length +
      "</span> reachable nodes visited in level-order.";
    return;
  }

  // Dequeue front
  const u = bfsQueue.shift();
  bfsVisited[u] = true;
  bfsInQueue[u] = false;

  // Enqueue unvisited neighbors
  const newNeighbors = [];
  for (const v of BFS_ADJ[u]) {
    if (!bfsVisited[v] && !bfsInQueue[v]) {
      bfsQueue.push(v);
      bfsInQueue[v] = true;
      newNeighbors.push(BFS_LABELS[v]);
    }
  }

  drawConceptGraph(u);
  renderBfsQueueDisplay();

  const neighborStr =
    newNeighbors.length > 0
      ? " — added [" + newNeighbors.join(",") + "] to queue"
      : " — no new neighbors";
  document.getElementById("conceptMsg").innerHTML =
    "Visited <span>" +
    BFS_LABELS[u] +
    "</span>" +
    neighborStr +
    ". Queue: [" +
    bfsQueue.map((i) => BFS_LABELS[i]).join(",") +
    "]";

  bfsStep++;
};

const doBfsReset = () => {
  bfsVisited = new Array(7).fill(false);
  bfsInQueue = new Array(7).fill(false);
  bfsQueue = [];
  bfsStep = 0;
  bfsDone = false;
  drawConceptGraph(-1);
  renderBfsQueueDisplay();
  document.getElementById("conceptMsg").textContent =
    'Click "BFS Next Step" — nodes explored level by level, shortest path guaranteed';
};

// Draw on page load
drawConceptGraph(-1);
renderBfsQueueDisplay();

    
//  1. DIJKSTRA'S — GPS / SHORTEST PATH
//  6-node weighted graph: A B C D E F
    

// Node positions for Dijkstra SVG (viewBox 0 0 300 160)
const DIJK_POS = [
  { x: 30, y: 80, lbl: "A" }, // 0
  { x: 110, y: 30, lbl: "B" }, // 1
  { x: 110, y: 130, lbl: "C" }, // 2
  { x: 200, y: 30, lbl: "D" }, // 3
  { x: 200, y: 130, lbl: "E" }, // 4
  { x: 275, y: 80, lbl: "F" }, // 5
];

// Weighted edges: [u, v, weight]
const DIJK_EDGES = [
  [0, 1, 4],
  [0, 2, 2],
  [1, 3, 5],
  [1, 2, 1],
  [2, 4, 8],
  [3, 5, 2],
  [3, 4, 2],
  [4, 5, 3],
];

// Dijkstra's step-by-step state
// Note: running a simplified preset simulation for clarity
let dijkDist = [0, Infinity, Infinity, Infinity, Infinity, Infinity];
let dijkSettledSet = new Set();
let dijkInQueue = [true, false, false, false, false, false];

// Pre-computed steps for the simulation
const DIJK_STEPS = [
  {
    settle: 0,
    updates: [
      { n: 1, d: 4 },
      { n: 2, d: 2 },
    ],
    msg: "Settled <span>A</span> (dist=0) — updated B=4, C=2",
  },
  {
    settle: 2,
    updates: [
      { n: 1, d: 3 },
      { n: 4, d: 10 },
    ],
    msg: "Settled <span>C</span> (dist=2) — updated B=3, E=10",
  },
  {
    settle: 1,
    updates: [{ n: 3, d: 8 }],
    msg: "Settled <span>B</span> (dist=3) — updated D=8",
  },
  {
    settle: 3,
    updates: [
      { n: 5, d: 10 },
      { n: 4, d: 10 },
    ],
    msg: "Settled <span>D</span> (dist=8) — D→F=10, D→E=10",
  },
  {
    settle: 4,
    updates: [{ n: 5, d: 13 }],
    msg: "Settled <span>E</span> (dist=10) — E→F would be 13 (no update)",
  },
  {
    settle: 5,
    updates: [],
    msg: "Settled <span>F</span> (dist=10) — all nodes done! ✅",
  },
];

let dijkPhase = 0;

const drawDijkGraph = () => {
  const svg = document.getElementById("dijkSvg");
  svg.innerHTML = "";

  // Draw all edges
  DIJK_EDGES.forEach(([u, v, w]) => {
    const pu = DIJK_POS[u],
      pv = DIJK_POS[v];
    const settled = dijkSettledSet.has(u) && dijkSettledSet.has(v);
    drawEdge(
      svg,
      pu.x,
      pu.y,
      pv.x,
      pv.y,
      settled ? "#10b981" : "#3a3a3a",
      settled ? 2.5 : 1.5,
    );
    drawEdgeLabel(svg, pu.x, pu.y, pv.x, pv.y, w, "#888");
  });

  // Draw nodes
  DIJK_POS.forEach((p, i) => {
    let fill;
    if (dijkSettledSet.has(i))
      fill = "#10b981"; // settled = green
    else if (dijkInQueue[i])
      fill = "#f59e0b"; // in queue = orange
    else fill = "#1e1e1e"; // not yet discovered

    drawNode(svg, p.x, p.y, 18, fill, p.lbl);

    // Show current dist below node
    const d = dijkDist[i] === Infinity ? "∞" : dijkDist[i];
    const dt = svgEl("text", {
      x: p.x,
      y: p.y + 30,
      "text-anchor": "middle",
      "font-size": "9",
      "font-family": "JetBrains Mono, monospace",
      fill: dijkSettledSet.has(i) ? "#10b981" : "#666",
    });
    dt.textContent = d;
    svg.appendChild(dt);
  });
};

const dijkStep = () => {
  if (dijkPhase >= DIJK_STEPS.length) {
    document.getElementById("dijkStatus").innerHTML =
      "✅ Dijkstra complete — shortest paths from A found!";
    return;
  }

  const step = DIJK_STEPS[dijkPhase];
  dijkSettledSet.add(step.settle);
  dijkInQueue[step.settle] = false;

  // Apply distance updates
  step.updates.forEach(({ n, d }) => {
    if (d < dijkDist[n]) {
      dijkDist[n] = d;
      dijkInQueue[n] = true;
    }
  });

  dijkPhase++;
  drawDijkGraph();

  document.getElementById("dijkStatus").innerHTML = step.msg;
  document.getElementById("dijkSettled").textContent = dijkSettledSet.size;
  document.getElementById("dijkRemain").textContent = 6 - dijkSettledSet.size;
};

const dijkReset = () => {
  dijkDist = [0, Infinity, Infinity, Infinity, Infinity, Infinity];
  dijkSettledSet = new Set();
  dijkInQueue = [true, false, false, false, false, false];
  dijkPhase = 0;
  drawDijkGraph();
  document.getElementById("dijkStatus").innerHTML =
    "Dijkstra from A — min-heap picks nearest unvisited node";
  document.getElementById("dijkSettled").textContent = "0";
  document.getElementById("dijkRemain").textContent = "6";
};

dijkReset();

    
//  2. SOCIAL NETWORK — BFS friend suggestions
    

// Nodes: You(0), Alice(1), Bob(2), Carol(3), Dave(4), Eve(5), Frank(6), Grace(7), Heidi(8)
const SOCIAL_NAMES = [
  "You",
  "Alice",
  "Bob",
  "Carol",
  "Dave",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
];
const SOCIAL_ADJ = [
  [1, 2, 3], // You → Alice, Bob, Carol  (degree 1)
  [0, 4, 5], // Alice → You, Dave, Eve
  [0, 6], // Bob → You, Frank
  [0, 7, 8], // Carol → You, Grace, Heidi
  [1], // Dave → Alice
  [1], // Eve → Alice
  [2], // Frank → Bob
  [3], // Grace → Carol
  [3], // Heidi → Carol
];

let socialVisited = new Array(9).fill(false);
let socialQueue = [];
let socialInQ = new Array(9).fill(false);
let socialDeg = 0;
let socialPhase = 0;
let socialFoundCount = 0;

const socialRender = (highlightLevel) => {
  const cls = SOCIAL_NAMES.map((_, i) => {
    if (i === 0) return "active"; // You = always rose
    if (socialVisited[i]) return "found"; // visited = green
    if (socialInQ[i]) return "hi"; // in queue = orange
    return "def";
  });
  buildCells("socialCells", SOCIAL_NAMES, cls);
  document.getElementById("socialDeg").textContent = socialDeg;
  document.getElementById("socialFound").textContent = socialFoundCount;
};

const socialStep = () => {
  if (socialPhase === 0) {
    // Init: mark You as visited, enqueue neighbors (degree 1)
    socialVisited[0] = true;
    SOCIAL_ADJ[0].forEach((n) => {
      socialQueue.push(n);
      socialInQ[n] = true;
    });
    socialPhase++;
    socialDeg = 1;
    socialRender();
    document.getElementById("socialStatus").innerHTML =
      "Level 1 — Direct friends: <span>" +
      SOCIAL_ADJ[0].map((i) => SOCIAL_NAMES[i]).join(", ") +
      "</span>";
    return;
  }

  if (socialPhase === 1) {
    // Process all level-1 nodes, collect level-2
    let nextQueue = [];
    socialQueue.forEach((u) => {
      socialVisited[u] = true;
      socialInQ[u] = false;
      socialFoundCount++;
      SOCIAL_ADJ[u].forEach((v) => {
        if (!socialVisited[v] && !socialInQ[v]) {
          nextQueue.push(v);
          socialInQ[v] = true;
        }
      });
    });
    socialQueue = nextQueue;
    socialPhase++;
    socialDeg = 2;
    socialRender();
    document.getElementById("socialStatus").innerHTML =
      '2nd degree — "People you may know": <span>' +
      nextQueue.map((i) => SOCIAL_NAMES[i]).join(", ") +
      "</span>";
    return;
  }

  if (socialPhase === 2) {
    // Process level-2
    socialQueue.forEach((u) => {
      socialVisited[u] = true;
      socialInQ[u] = false;
      socialFoundCount++;
    });
    socialQueue = [];
    socialPhase++;
    socialRender();
    document.getElementById("socialStatus").innerHTML =
      "✅ BFS done! Found <span>" +
      socialFoundCount +
      "</span> people across 2 degrees of separation.";
    return;
  }

  socialReset();
};

const socialReset = () => {
  socialVisited = new Array(9).fill(false);
  socialQueue = [];
  socialInQ = new Array(9).fill(false);
  socialDeg = 0;
  socialPhase = 0;
  socialFoundCount = 0;
  buildCells(
    "socialCells",
    SOCIAL_NAMES,
    SOCIAL_NAMES.map((_, i) => (i === 0 ? "active" : "def")),
  );
  document.getElementById("socialStatus").innerHTML =
    'Starting from "You" — explore friend network';
  document.getElementById("socialDeg").textContent = "0";
  document.getElementById("socialFound").textContent = "0";
};

socialReset();

    
//  3. WEB CRAWLER — DFS
    

// Pages as nodes, links as edges (directed)
const PAGES = [
  "Home",
  "About",
  "Blog",
  "Post1",
  "Post2",
  "Contact",
  "Services",
  "FAQ",
  "Portfolio",
  "Team",
];
// DFS order from Home (index 0)
const DFS_ORDER = [0, 1, 7, 2, 3, 4, 5, 8, 9, 6];
// Parent for each (to show depth)
const DFS_DEPTH = [0, 1, 1, 2, 2, 1, 1, 2, 1, 2];

let crawlIdx = 0;
let crawlVisited = [];
let crawlAutoTmr = null;

const crawlRender = (activeIdx) => {
  const cls = PAGES.map((_, i) => {
    if (i === activeIdx) return "active";
    if (crawlVisited.includes(i)) return "found";
    return "def";
  });
  buildCells("crawlCells", PAGES, cls);
  document.getElementById("crawlCount").textContent = crawlVisited.length;
};

const crawlStep = () => {
  if (crawlIdx >= DFS_ORDER.length) {
    document.getElementById("crawlStatus").innerHTML =
      "✅ DFS complete — all <span>" +
      crawlVisited.length +
      "</span> pages crawled!";
    crawlRender(-1);
    return;
  }

  const node = DFS_ORDER[crawlIdx];
  const depth = DFS_DEPTH[crawlIdx];
  crawlVisited.push(node);
  crawlRender(node);

  document.getElementById("crawlStatus").innerHTML =
    "Crawled: <span>" +
    PAGES[node] +
    "</span> (depth " +
    depth +
    ") — DFS pushes to stack, follows deepest link first";
  document.getElementById("crawlDepth").textContent = depth;

  crawlIdx++;
};

const crawlAuto = () => {
  clearTimeout(crawlAutoTmr);
  const next = () => {
    if (crawlIdx >= DFS_ORDER.length) return;
    crawlStep();
    crawlAutoTmr = setTimeout(next, 550);
  };
  next();
};

const crawlReset = () => {
  clearTimeout(crawlAutoTmr);
  crawlIdx = 0;
  crawlVisited = [];
  crawlRender(-1);
  document.getElementById("crawlStatus").innerHTML =
    "DFS from homepage — follow links depth-first";
  document.getElementById("crawlDepth").textContent = "0";
  document.getElementById("crawlCount").textContent = "0";
};

crawlReset();

    
//  4. TOPOLOGICAL SORT — KAHN'S ALGORITHM
//  Courses as nodes, prerequisites as edges
    

// Courses: 0=Math, 1=CS101, 2=DS, 3=Algo, 4=ML, 5=AI, 6=Capstone
const COURSES = ["Math", "CS101", "DS", "Algo", "ML", "AI", "Cap"];
// Edges: [from, to] — from must be taken before to
const TOPO_EDGES = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [5, 6],
];

// Compute in-degrees
let topoInDeg = new Array(7).fill(0);
TOPO_EDGES.forEach(([, v]) => topoInDeg[v]++);

let topoQueue = []; // nodes with in-degree 0
let topoResult = []; // sorted order
let topoRemAdj = TOPO_EDGES.map((e) => [...e]); // mutable copy of edges
let topoCurInDeg = [...topoInDeg];
let topoDone = false;

// Init queue with zero in-degree nodes
const topoInitQueue = () => {
  topoQueue = [];
  for (let i = 0; i < 7; i++) {
    if (topoCurInDeg[i] === 0 && !topoResult.includes(i)) topoQueue.push(i);
  }
};

const topoRender = () => {
  // Available courses (in queue)
  buildCells(
    "topoQueue",
    topoQueue.map((i) => COURSES[i]),
    topoQueue.map(() => "hi"),
  );
  // Sorted result so far
  buildCells(
    "topoResult",
    topoResult.map((i) => COURSES[i]),
    topoResult.map(() => "found"),
  );
};

const topoStep = () => {
  if (topoDone) {
    topoReset();
    return;
  }

  if (topoQueue.length === 0) {
    topoInitQueue();
    if (topoQueue.length === 0) {
      document.getElementById("topoStatus").innerHTML =
        "✅ All courses ordered — valid plan: " +
        topoResult.map((i) => COURSES[i]).join(" → ");
      topoDone = true;
      topoRender();
      return;
    }
  }

  // Take front of queue
  const u = topoQueue.shift();
  topoResult.push(u);

  // Reduce in-degree of all neighbors
  const freed = [];
  TOPO_EDGES.forEach(([from, to]) => {
    if (from === u) {
      topoCurInDeg[to]--;
      if (topoCurInDeg[to] === 0) {
        topoQueue.push(to);
        freed.push(COURSES[to]);
      }
    }
  });

  topoRender();

  const freedStr =
    freed.length > 0
      ? " — unlocked: <span>" + freed.join(", ") + "</span>"
      : "";
  document.getElementById("topoStatus").innerHTML =
    "Added <span>" + COURSES[u] + "</span> to order" + freedStr;

  if (topoResult.length === 7) {
    topoDone = true;
    document.getElementById("topoStatus").innerHTML =
      "✅ Done! Valid order: " + topoResult.map((i) => COURSES[i]).join(" → ");
  }
};

const topoReset = () => {
  topoCurInDeg = [...topoInDeg];
  topoQueue = [];
  topoResult = [];
  topoDone = false;
  topoInitQueue();
  topoRender();
  document.getElementById("topoStatus").innerHTML =
    "Kahn's algorithm — process nodes with no prerequisites first";
};

topoReset();

    
//  5. NETWORK FLOW — FORD-FULKERSON
//  Simple 6-node flow network S→A→B→T + S→C→D→T
    

// Nodes: 0=S, 1=A, 2=B, 3=C, 4=D, 5=T
const FLOW_POS = [
  { x: 25, y: 70, lbl: "S" },
  { x: 110, y: 30, lbl: "A" },
  { x: 200, y: 30, lbl: "B" },
  { x: 110, y: 110, lbl: "C" },
  { x: 200, y: 110, lbl: "D" },
  { x: 280, y: 70, lbl: "T" },
];

// Edges with capacity and current flow
// Each: {u, v, cap, flow}
let flowEdges = [
  { u: 0, v: 1, cap: 10, flow: 0 },
  { u: 0, v: 3, cap: 10, flow: 0 },
  { u: 1, v: 2, cap: 10, flow: 0 },
  { u: 2, v: 5, cap: 10, flow: 0 },
  { u: 3, v: 4, cap: 10, flow: 0 },
  { u: 4, v: 5, cap: 10, flow: 0 },
  { u: 1, v: 4, cap: 5, flow: 0 }, // cross edge
];

const FLOW_PATHS = [
  {
    path: [0, 1, 2, 5],
    bottleneck: 7,
    msg: "Path S→A→B→T — bottleneck = 7, send 7 units",
  },
  {
    path: [0, 3, 4, 5],
    bottleneck: 5,
    msg: "Path S→C→D→T — bottleneck = 5, send 5 units",
  },
  {
    path: [0, 1, 4, 5],
    bottleneck: 3,
    msg: "Path S→A→D→T — bottleneck = 3, send 3 units",
  },
];

let flowPhase = 0;
let flowTotal = 0;

const drawFlowGraph = (activePath = []) => {
  const svg = document.getElementById("flowSvg");
  svg.innerHTML = "";

  flowEdges.forEach((e) => {
    const pu = FLOW_POS[e.u],
      pv = FLOW_POS[e.v];
    const isActive =
      activePath.includes(e.u) &&
      activePath.includes(e.v) &&
      Math.abs(activePath.indexOf(e.u) - activePath.indexOf(e.v)) === 1;
    drawEdge(
      svg,
      pu.x,
      pu.y,
      pv.x,
      pv.y,
      isActive ? "#f43f5e" : e.flow > 0 ? "#10b981" : "#3a3a3a",
      isActive ? 3 : 2,
    );
    drawEdgeLabel(
      svg,
      pu.x,
      pu.y,
      pv.x,
      pv.y,
      e.flow + "/" + e.cap,
      e.flow > 0 ? "#10b981" : "#666",
    );
  });

  FLOW_POS.forEach((p, i) => {
    let fill;
    if (i === 0 || i === 5)
      fill = "#f43f5e"; // source/sink = rose
    else if (activePath.includes(i))
      fill = "#f59e0b"; // on current path = orange
    else fill = "#1e1e1e";
    drawNode(svg, p.x, p.y, 18, fill, p.lbl);
  });
};

const flowStep = () => {
  if (flowPhase >= FLOW_PATHS.length) {
    document.getElementById("flowStatus").innerHTML =
      "✅ Max flow = <span>" +
      flowTotal +
      "</span> — no more augmenting paths exist!";
    return;
  }

  const fp = FLOW_PATHS[flowPhase];
  // Update edge flows along the path
  for (let i = 0; i < fp.path.length - 1; i++) {
    const u = fp.path[i],
      v = fp.path[i + 1];
    const e = flowEdges.find((e) => e.u === u && e.v === v);
    if (e) e.flow = Math.min(e.flow + fp.bottleneck, e.cap);
  }

  flowTotal += fp.bottleneck;
  flowPhase++;

  drawFlowGraph(fp.path);
  document.getElementById("flowStatus").innerHTML = fp.msg;
  document.getElementById("flowTotal").textContent = flowTotal;
  document.getElementById("flowPaths").textContent = flowPhase;
};

const flowReset = () => {
  flowEdges = flowEdges.map((e) => ({ ...e, flow: 0 }));
  flowPhase = 0;
  flowTotal = 0;
  drawFlowGraph();
  document.getElementById("flowStatus").innerHTML =
    "Find augmenting paths from S to T — Ford-Fulkerson";
  document.getElementById("flowTotal").textContent = "0";
  document.getElementById("flowPaths").textContent = "0";
};

flowReset();

    
//  6. MINIMUM SPANNING TREE — KRUSKAL'S
//  5-node graph, find MST by adding cheapest non-cycle edges
    

// Nodes: A B C D E
const MST_POS = [
  { x: 50, y: 80, lbl: "A" },
  { x: 150, y: 30, lbl: "B" },
  { x: 250, y: 80, lbl: "C" },
  { x: 150, y: 130, lbl: "D" },
  { x: 250, y: 130, lbl: "E" },
];

// All edges sorted by weight (Kruskal's needs sorted edges)
const ALL_MST_EDGES = [
  { u: 0, v: 3, w: 1 }, // A-D: 1  ← cheapest
  { u: 1, v: 3, w: 2 }, // B-D: 2
  { u: 0, v: 1, w: 4 }, // A-B: 4
  { u: 1, v: 2, w: 3 }, // B-C: 3
  { u: 2, v: 4, w: 2 }, // C-E: 2
  { u: 3, v: 4, w: 5 }, // D-E: 5 (would form cycle — skip)
  { u: 0, v: 2, w: 8 }, // A-C: 8 (skip)
];

// Kruskal's steps (pre-computed: only valid edges added)
const MST_STEPS = [
  {
    u: 0,
    v: 3,
    w: 1,
    add: true,
    msg: "A—D (weight 1) — cheapest edge, no cycle → ADD ✓",
  },
  {
    u: 2,
    v: 4,
    w: 2,
    add: true,
    msg: "C—E (weight 2) — no cycle → ADD ✓",
  },
  {
    u: 1,
    v: 3,
    w: 2,
    add: true,
    msg: "B—D (weight 2) — no cycle → ADD ✓",
  },
  {
    u: 1,
    v: 2,
    w: 3,
    add: true,
    msg: "B—C (weight 3) — no cycle → ADD ✓ — MST complete!",
  },
  {
    u: 0,
    v: 1,
    w: 4,
    add: false,
    msg: "A—B (weight 4) — would form cycle → SKIP ✗",
  },
  {
    u: 3,
    v: 4,
    w: 5,
    add: false,
    msg: "D—E (weight 5) — would form cycle → SKIP ✗",
  },
];

let mstAdded = []; // edges added to MST
let mstPhase = 0;
let mstCostTotal = 0;

const drawMstGraph = (highlightEdge = null) => {
  const svg = document.getElementById("mstSvg");
  svg.innerHTML = "";

  // Draw all candidate edges first (grey)
  ALL_MST_EDGES.forEach((e) => {
    const pu = MST_POS[e.u],
      pv = MST_POS[e.v];
    drawEdge(svg, pu.x, pu.y, pv.x, pv.y, "#2a2a2a", 1.5, true);
    drawEdgeLabel(svg, pu.x, pu.y, pv.x, pv.y, e.w, "#444");
  });

  // Draw MST edges on top (green)
  mstAdded.forEach((e) => {
    const pu = MST_POS[e.u],
      pv = MST_POS[e.v];
    drawEdge(svg, pu.x, pu.y, pv.x, pv.y, "#10b981", 3);
    drawEdgeLabel(svg, pu.x, pu.y, pv.x, pv.y, e.w, "#10b981");
  });

  // Draw highlighted (current candidate) edge
  if (highlightEdge) {
    const pu = MST_POS[highlightEdge.u],
      pv = MST_POS[highlightEdge.v];
    const col = highlightEdge.add ? "#f43f5e" : "#ef4444";
    drawEdge(svg, pu.x, pu.y, pv.x, pv.y, col, 2.5);
    drawEdgeLabel(svg, pu.x, pu.y, pv.x, pv.y, highlightEdge.w, col);
  }

  // Draw nodes — green if in MST, else default
  const inMst = new Set();
  mstAdded.forEach((e) => {
    inMst.add(e.u);
    inMst.add(e.v);
  });

  MST_POS.forEach((p, i) => {
    const fill = inMst.has(i) ? "#10b981" : "#1e1e1e";
    drawNode(svg, p.x, p.y, 18, fill, p.lbl);
  });
};

const mstStep = () => {
  if (mstPhase >= MST_STEPS.length) {
    document.getElementById("mstStatus").innerHTML =
      "✅ MST complete — total cost = <span>" + mstCostTotal + "</span>";
    return;
  }

  const step = MST_STEPS[mstPhase];
  if (step.add) {
    mstAdded.push(step);
    mstCostTotal += step.w;
  }
  mstPhase++;

  drawMstGraph(step);
  document.getElementById("mstStatus").innerHTML = step.msg;
  document.getElementById("mstCost").textContent = mstCostTotal;
  document.getElementById("mstEdges").textContent = mstAdded.length;

  if (mstAdded.length === 4) {
    // V-1 = 4 edges for 5 nodes
    document.getElementById("mstStatus").innerHTML =
      "✅ MST complete! Total cost = <span>" +
      mstCostTotal +
      "</span> — minimum to connect all cities";
  }
};

const mstReset = () => {
  mstAdded = [];
  mstPhase = 0;
  mstCostTotal = 0;
  drawMstGraph();
  document.getElementById("mstStatus").innerHTML =
    "Sort edges by weight — add cheapest non-cycle edge";
  document.getElementById("mstCost").textContent = "0";
  document.getElementById("mstEdges").textContent = "0";
};

mstReset();
