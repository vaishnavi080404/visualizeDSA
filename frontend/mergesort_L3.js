
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

/* ── CONCEPT VISUALIZER ── */
const cOrig = [38, 12, 45, 7, 29, 51, 16, 3];
// Pre-build phases: split levels then merge levels
const cPhases = [
  {
    label: "Original array",
    arr: [[38, 12, 45, 7, 29, 51, 16, 3]],
    state: "def",
  },
  {
    label: "Split → halves",
    arr: [
      [38, 12, 45, 7],
      [29, 51, 16, 3],
    ],
    state: "split",
  },
  {
    label: "Split → quarters",
    arr: [
      [38, 12],
      [45, 7],
      [29, 51],
      [16, 3],
    ],
    state: "split",
  },
  {
    label: "Split → singles",
    arr: [[38], [12], [45], [7], [29], [51], [16], [3]],
    state: "split",
  },
  {
    label: "Merge pairs",
    arr: [
      [12, 38],
      [7, 45],
      [29, 51],
      [3, 16],
    ],
    state: "merge",
  },
  {
    label: "Merge quads",
    arr: [
      [7, 12, 38, 45],
      [3, 16, 29, 51],
    ],
    state: "merge",
  },
  {
    label: "Final merge → sorted",
    arr: [[3, 7, 12, 16, 29, 38, 45, 51]],
    state: "done",
  },
];
let cPhaseIdx = 0;
function renderConceptPhase(ph) {
  const viz = document.getElementById("conceptViz");
  viz.innerHTML = "";
  const maxH = 60;
  const allVals = [38, 12, 45, 7, 29, 51, 16, 3];
  const mx = Math.max(...allVals);
  const row = document.createElement("div");
  row.style.cssText =
    "display:flex;gap:8px;justify-content:center;align-items:flex-end;flex-wrap:wrap;";
  ph.arr.forEach((chunk, ci) => {
    const group = document.createElement("div");
    group.style.cssText =
      "display:flex;gap:3px;align-items:flex-end;padding:4px 6px;border-radius:8px;border:1px solid;";
    const isLeft = ci % 2 === 0;
    if (ph.state === "split") {
      group.style.borderColor = isLeft
        ? "rgba(139,92,246,.3)"
        : "rgba(99,102,241,.3)";
      group.style.background = isLeft
        ? "rgba(139,92,246,.04)"
        : "rgba(99,102,241,.04)";
    } else if (ph.state === "merge") {
      group.style.borderColor = "rgba(245,158,11,.3)";
      group.style.background = "rgba(245,158,11,.04)";
    } else if (ph.state === "done") {
      group.style.borderColor = "rgba(16,185,129,.3)";
      group.style.background = "rgba(16,185,129,.04)";
    } else {
      group.style.borderColor = "var(--border-color)";
      group.style.background = "transparent";
    }
    chunk.forEach((v) => {
      const b = document.createElement("div");
      b.className = "mbar";
      b.style.height = Math.max(14, Math.round((v / mx) * maxH)) + "px";
      if (ph.state === "split")
        b.classList.add(ci % 2 === 0 ? "left" : "right");
      else if (ph.state === "merge") b.classList.add("merging");
      else if (ph.state === "done") b.classList.add("done");
      else b.classList.add("def");
      b.textContent = v;
      group.appendChild(b);
    });
    row.appendChild(group);
    if (ci < ph.arr.length - 1) {
      const sep = document.createElement("div");
      sep.style.cssText =
        "display:flex;align-items:center;font-size:.65rem;color:rgba(255,255,255,.25);padding-bottom:4px;";
      sep.textContent = "|";
      row.appendChild(sep);
    }
  });
  viz.appendChild(row);
  document.getElementById("conceptStatus").innerHTML =
    `Phase ${cPhaseIdx}: <span style="color:var(--primary-purple)">${ph.label}</span>`;
}
function conceptStep() {
  if (cPhaseIdx >= cPhases.length) {
    conceptReset();
    return;
  }
  renderConceptPhase(cPhases[cPhaseIdx]);
  cPhaseIdx++;
  if (cPhaseIdx === cPhases.length)
    document.getElementById("conceptStatus").innerHTML =
      `✅ <span style="color:var(--primary-green)">Fully sorted!</span> Merge sort complete.`;
}
function conceptReset() {
  cPhaseIdx = 0;
  renderConceptPhase(cPhases[0]);
  document.getElementById("conceptStatus").textContent =
    'Click "Next Phase" to step through merge sort';
}
renderConceptPhase(cPhases[0]);

/* ── 1 DB MERGE ── */
const dbA = [
  { id: 101, name: "Alice" },
  { id: 203, name: "Carol" },
  { id: 347, name: "Eve" },
  { id: 412, name: "Grace" },
];
const dbB = [
  { id: 156, name: "Bob" },
  { id: 289, name: "Dave" },
  { id: 378, name: "Frank" },
  { id: 450, name: "Hank" },
];
let dbAi = 0,
  dbBi = 0,
  dbResult = [];
function renderDbRow(r, color) {
  const d = document.createElement("div");
  d.style.cssText = `display:flex;gap:.5rem;padding:.2rem .5rem;border-radius:5px;font-family:'JetBrains Mono',monospace;font-size:.68rem;border:1px solid ${color}22;color:${color};background:${color}0d;`;
  d.innerHTML = `<span>${r.id}</span><span style="color:var(--text-secondary)">${r.name}</span>`;
  return d;
}
function renderDbState() {
  ["dbChunkA", "dbChunkB"].forEach(
    (id) => (document.getElementById(id).innerHTML = ""),
  );
  dbA
    .slice(dbAi)
    .forEach((r) =>
      document
        .getElementById("dbChunkA")
        .appendChild(renderDbRow(r, "var(--primary-purple)")),
    );
  dbB
    .slice(dbBi)
    .forEach((r) =>
      document
        .getElementById("dbChunkB")
        .appendChild(renderDbRow(r, "var(--primary-indigo)")),
    );
}
function renderDbOutput() {
  const el = document.getElementById("dbOutput");
  el.innerHTML = "";
  dbResult.forEach((r) => {
    const d = document.createElement("div");
    d.style.cssText =
      "padding:.15rem .4rem;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:.65rem;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.3);color:var(--primary-green);";
    d.textContent = r.id;
    el.appendChild(d);
  });
}
function dbMergeStep() {
  if (dbAi >= dbA.length && dbBi >= dbB.length) {
    document.getElementById("dbStatus").innerHTML =
      `✅ Merge complete — <span>${dbResult.length}</span> rows in sorted order`;
    return;
  }
  let chosen;
  if (
    dbBi >= dbB.length ||
    (dbAi < dbA.length && dbA[dbAi].id <= dbB[dbBi].id)
  ) {
    chosen = dbA[dbAi++];
    document.getElementById("dbStatus").innerHTML =
      `Took <span>${chosen.id} ${chosen.name}</span> from Chunk A (${chosen.id} ≤ ${dbBi < dbB.length ? dbB[dbBi].id : "—"})`;
  } else {
    chosen = dbB[dbBi++];
    document.getElementById("dbStatus").innerHTML =
      `Took <span>${chosen.id} ${chosen.name}</span> from Chunk B`;
  }
  dbResult.push(chosen);
  renderDbState();
  renderDbOutput();
}
function dbMergeReset() {
  dbAi = 0;
  dbBi = 0;
  dbResult = [];
  renderDbState();
  document.getElementById("dbOutput").innerHTML = "";
  document.getElementById("dbStatus").textContent =
    "Compare front of each chunk — take the smaller";
}
renderDbState();

/* ── 2 GIT MERGE ── */
const gitA = [
  { n: "auth.js:L12", v: 2 },
  { n: "config.js:L3", v: 5 },
  { n: "index.js:L8", v: 8 },
  { n: "router.js:L1", v: 11 },
];
const gitB = [
  { n: "api.js:L5", v: 3 },
  { n: "db.js:L7", v: 6 },
  { n: "index.js:L15", v: 9 },
  { n: "utils.js:L2", v: 13 },
];
let gitAi = 0,
  gitBi = 0,
  gitOut = [];
function renderGitBranches() {
  ["gitBranchA", "gitBranchB"].forEach(
    (id) => (document.getElementById(id).innerHTML = ""),
  );
  gitA.slice(gitAi).forEach((r, i) => {
    const d = document.createElement("div");
    d.style.cssText =
      "padding:.2rem .45rem;border-radius:4px;font-size:.68rem;font-family:'JetBrains Mono',monospace;color:var(--primary-purple);background:rgba(139,92,246,.07);border:1px solid rgba(139,92,246,.2);margin-bottom:.18rem;";
    d.textContent = r.n;
    document.getElementById("gitBranchA").appendChild(d);
  });
  gitB.slice(gitBi).forEach((r, i) => {
    const d = document.createElement("div");
    d.style.cssText =
      "padding:.2rem .45rem;border-radius:4px;font-size:.68rem;font-family:'JetBrains Mono',monospace;color:var(--primary-indigo);background:rgba(99,102,241,.07);border:1px solid rgba(99,102,241,.2);margin-bottom:.18rem;";
    d.textContent = r.n;
    document.getElementById("gitBranchB").appendChild(d);
  });
}
function renderGitOutput() {
  const el = document.getElementById("gitOutput");
  el.innerHTML = "";
  gitOut.forEach((r) => {
    const d = document.createElement("div");
    d.style.cssText =
      "padding:.2rem .45rem;border-radius:4px;font-size:.68rem;font-family:'JetBrains Mono',monospace;color:var(--primary-green);background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.2);";
    d.textContent = r.n;
    el.appendChild(d);
  });
}
function gitMergeStep() {
  if (gitAi >= gitA.length && gitBi >= gitB.length) {
    document.getElementById("gitInfo").innerHTML =
      `✅ Merge complete — <b>${gitOut.length}</b> lines merged in order`;
    return;
  }
  let ch, src;
  if (
    gitBi >= gitB.length ||
    (gitAi < gitA.length && gitA[gitAi].v <= gitB[gitBi].v)
  ) {
    ch = gitA[gitAi++];
    src = "main";
  } else {
    ch = gitB[gitBi++];
    src = "feature";
  }
  gitOut.push(ch);
  renderGitBranches();
  renderGitOutput();
  document.getElementById("gitInfo").innerHTML =
    `Took <b>${ch.n}</b> from <b>${src}</b>`;
}
function gitMergeReset() {
  gitAi = 0;
  gitBi = 0;
  gitOut = [];
  renderGitBranches();
  document.getElementById("gitOutput").innerHTML = "";
  document.getElementById("gitInfo").textContent = "";
}
renderGitBranches();

/* ── 3 TIMSORT ── */
// Data with two natural runs already present
let tsArr = [3, 7, 12, 45, 2, 9, 18, 31, 5, 22];
const tsOrig = [...tsArr];
let tsPhase = 0; // 0=detect runs, 1=show runs, 2=merge runs
let tsRuns = [];
function buildSmbars(elId, arr, classes = []) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  const mx = Math.max(...arr);
  arr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "smbar " + (classes[i] || "def");
    b.style.height = Math.max(10, Math.round((v / mx) * 52)) + "px";
    b.textContent = v;
    el.appendChild(b);
  });
}
function timsortStep() {
  if (tsPhase === 0) {
    // Detect natural runs
    tsRuns = [];
    let i = 0;
    while (i < tsArr.length) {
      let j = i + 1;
      while (j < tsArr.length && tsArr[j] >= tsArr[j - 1]) j++;
      tsRuns.push({ start: i, end: j });
      i = j;
    }
    const cls = tsArr.map((_, i) => {
      const ri = tsRuns.findIndex((r) => i >= r.start && i < r.end);
      return ri % 2 === 0 ? "L" : "R";
    });
    buildSmbars("timsortBars", tsArr, cls);
    document.getElementById("timsortStatus").innerHTML =
      `Found <span>${tsRuns.length}</span> natural runs — highlighted in purple/indigo`;
    document.getElementById("timsortInfo").innerHTML =
      `Run 1: indices 0-${tsRuns[0].end - 1} &nbsp;|&nbsp; Run 2: ${tsRuns[1] ? `indices ${tsRuns[1].start}-${tsRuns[1].end - 1}` : "(none)"}`;
    tsPhase = 1;
  } else if (tsPhase === 1) {
    // Merge the two runs
    const r1 = tsArr.slice(tsRuns[0].start, tsRuns[0].end);
    const r2 = tsArr.slice(tsRuns[1] ? tsRuns[1].start : tsArr.length);
    let merged = [],
      ai = 0,
      bi = 0;
    while (ai < r1.length && bi < r2.length) {
      if (r1[ai] <= r2[bi]) merged.push(r1[ai++]);
      else merged.push(r2[bi++]);
    }
    merged = [...merged, ...r1.slice(ai), ...r2.slice(bi)];
    tsArr = merged;
    buildSmbars(
      "timsortBars",
      tsArr,
      tsArr.map(() => "mrg"),
    );
    document.getElementById("timsortStatus").innerHTML =
      `Merging runs → <span>sorted output</span>`;
    document.getElementById("timsortInfo").innerHTML =
      `Timsort's merge phase produces the final sorted array`;
    tsPhase = 2;
  } else {
    buildSmbars(
      "timsortBars",
      tsArr,
      tsArr.map(() => "done"),
    );
    document.getElementById("timsortStatus").innerHTML =
      `✅ <span>Timsort complete</span> — O(n log n), stable, adaptive`;
    document.getElementById("timsortInfo").innerHTML =
      `Used in Python's list.sort() and Java's Arrays.sort()`;
    tsPhase = 3;
  }
}
function timsortReset() {
  tsArr = [...tsOrig];
  tsPhase = 0;
  buildSmbars("timsortBars", tsArr);
  document.getElementById("timsortStatus").textContent =
    "Click to detect natural runs in data";
  document.getElementById("timsortInfo").textContent = "";
}
buildSmbars("timsortBars", tsArr);

/* ── 4 LOG MERGE ── */
const logServers = [
  {
    name: "Server A",
    color: "var(--primary-purple)",
    events: [
      { t: "10:01", msg: "login" },
      { t: "10:04", msg: "query" },
      { t: "10:08", msg: "logout" },
    ],
  },
  {
    name: "Server B",
    color: "var(--primary-indigo)",
    events: [
      { t: "10:02", msg: "upload" },
      { t: "10:06", msg: "error" },
      { t: "10:09", msg: "retry" },
    ],
  },
  {
    name: "Server C",
    color: "var(--primary-cyan)",
    events: [
      { t: "10:03", msg: "ping" },
      { t: "10:05", msg: "sync" },
      { t: "10:07", msg: "ack" },
    ],
  },
];
let logPtrs = [0, 0, 0],
  logOut2 = [];
function renderLogServers() {
  const el = document.getElementById("logServers");
  el.innerHTML = "";
  logServers.forEach((s, si) => {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;gap:.4rem;";
    const lbl = document.createElement("span");
    lbl.style.cssText = `font-size:.62rem;font-weight:700;min-width:60px;color:${s.color};font-family:'JetBrains Mono',monospace;`;
    lbl.textContent = s.name;
    row.appendChild(lbl);
    const events = document.createElement("div");
    events.style.cssText = "display:flex;gap:.25rem;flex-wrap:wrap;";
    s.events.slice(logPtrs[si]).forEach((e) => {
      const d = document.createElement("div");
      d.style.cssText = `padding:.15rem .35rem;border-radius:4px;font-size:.64rem;font-family:'JetBrains Mono',monospace;color:${s.color};background:${s.color}18;border:1px solid ${s.color}33;`;
      d.textContent = `${e.t} ${e.msg}`;
      events.appendChild(d);
    });
    row.appendChild(events);
    el.appendChild(row);
  });
}
function renderLogOut() {
  const el = document.getElementById("logOutput");
  el.innerHTML = "";
  logOut2.forEach((e) => {
    const d = document.createElement("div");
    d.style.cssText =
      "padding:.15rem .4rem;border-radius:4px;font-size:.64rem;font-family:'JetBrains Mono',monospace;color:var(--primary-green);background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.25);";
    d.textContent = `${e.t} ${e.msg}`;
    el.appendChild(d);
  });
}
function logMergeStep() {
  // Find server with minimum timestamp
  let mi = -1,
    mt = "99:99";
  logServers.forEach((s, si) => {
    if (logPtrs[si] < s.events.length && s.events[logPtrs[si]].t < mt) {
      mt = s.events[logPtrs[si]].t;
      mi = si;
    }
  });
  if (mi < 0) {
    document.getElementById("logInfo").innerHTML =
      `✅ All <b>${logOut2.length}</b> events merged into unified timeline`;
    return;
  }
  const ev = logServers[mi].events[logPtrs[mi]];
  logPtrs[mi]++;
  logOut2.push(ev);
  renderLogServers();
  renderLogOut();
  document.getElementById("logInfo").innerHTML =
    `Took <b>${ev.t} ${ev.msg}</b> from <b>${logServers[mi].name}</b>`;
}
function logMergeReset() {
  logPtrs = [0, 0, 0];
  logOut2 = [];
  renderLogServers();
  document.getElementById("logOutput").innerHTML = "";
  document.getElementById("logInfo").textContent = "";
}
renderLogServers();

/* ── 5 INVERSION COUNT ── */
let invArr = [4, 2, 7, 1, 5, 3, 8, 6];
const invOrig = [...invArr];
let invPhase = 0,
  invTotal = 0;
function renderInvBars(classes = []) {
  const el = document.getElementById("invBars");
  el.innerHTML = "";
  const mx = Math.max(...invArr);
  invArr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "smbar " + (classes[i] || "def");
    b.style.height = Math.max(10, Math.round((v / mx) * 52)) + "px";
    b.textContent = v;
    el.appendChild(b);
  });
}

const invSteps = [
  {
    arr: [4, 2, 7, 1, 5, 3, 8, 6],
    inv: 0,
    label: "Original: [4,2,7,1,5,3,8,6] — counting inversions",
    cls: [],
  },
  {
    arr: [2, 4, 1, 7, 3, 5, 6, 8],
    inv: 0,
    label: "Merge pairs: found inversions (4>2), (7>1), (5>3), (8>6)",
    cls: Array(8).fill("L"),
  },
  {
    arr: [1, 2, 4, 7, 3, 5, 6, 8],
    inv: 4,
    label:
      "Merge left half [2,4,1,7] → [1,2,4,7]: +4 inversions from right crossing",
    cls: [...Array(4).fill("mrg"), ...Array(4).fill("R")],
  },
  {
    arr: [1, 2, 3, 4, 5, 6, 7, 8],
    inv: 10,
    label: "Final merge: total 10 inversions — similarity score computed",
    cls: Array(8).fill("done"),
  },
];
let invStep2 = 0;
function invStep() {
  if (invStep2 >= invSteps.length) {
    invReset();
    return;
  }
  const s = invSteps[invStep2];
  invArr = [...s.arr];
  invTotal = s.inv;
  renderInvBars(s.cls);
  document.getElementById("invStatus").innerHTML = `<span>${s.label}</span>`;
  document.getElementById("invCount").textContent = invTotal;
  invStep2++;
}
function invReset() {
  invArr = [...invOrig];
  invStep2 = 0;
  invTotal = 0;
  renderInvBars();
  document.getElementById("invStatus").textContent =
    "Array represents preference ranking";
  document.getElementById("invCount").textContent = 0;
}
renderInvBars();

/* ── 6. PARALLEL SORT ── */
const parallelData = [
  [8, 3],
  [11, 5],
  [7, 14],
  [2, 9],
]; // 4 cores, 2 elements each
let parPhase = 0;
const parColors = [
  "var(--primary-violet)",
  "var(--primary-purple)",
  "var(--primary-indigo)",
  "var(--primary-cyan)",
];
function renderParCores(sortedMask = []) {
  const el = document.getElementById("parallelCores");
  el.innerHTML = "";
  parallelData.forEach((chunk, ci) => {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;gap:.5rem;";
    const lbl = document.createElement("span");
    lbl.style.cssText = `font-size:.62rem;font-weight:700;min-width:52px;font-family:'JetBrains Mono',monospace;color:${parColors[ci]};`;
    lbl.textContent = `Core ${ci + 1}:`;
    row.appendChild(lbl);
    const vals = document.createElement("div");
    vals.style.cssText = "display:flex;gap:.25rem;";
    chunk.forEach((v) => {
      const d = document.createElement("div");
      const sorted = sortedMask[ci];
      d.style.cssText = `padding:.15rem .4rem;border-radius:4px;font-size:.7rem;font-family:'JetBrains Mono',monospace;color:${sorted ? "var(--primary-green)" : parColors[ci]};background:${sorted ? "rgba(16,185,129,.1)" : parColors[ci] + "18"};border:1px solid ${sorted ? "rgba(16,185,129,.3)" : parColors[ci] + "33"};`;
      d.textContent = v;
      vals.appendChild(d);
    });
    row.appendChild(vals);
    el.appendChild(row);
  });
}
function parallelStep() {
  if (parPhase === 0) {
    // Each core sorts its chunk
    parallelData.forEach((c) => c.sort((a, b) => a - b));
    renderParCores([true, true, true, true]);
    document.getElementById("parallelStatus").innerHTML =
      `All 4 cores sorted in <span>parallel</span> simultaneously`;
    document.getElementById("parallelOutput").innerHTML = "";
    parPhase = 1;
  } else if (parPhase === 1) {
    // merge phase 1: merge pairs
    const m1 = [...parallelData[0], ...parallelData[1]].sort((a, b) => a - b);
    const m2 = [...parallelData[2], ...parallelData[3]].sort((a, b) => a - b);
    document.getElementById("parallelStatus").innerHTML =
      `Merged pairs: [${m1}] and [${m2}]`;
    const el = document.getElementById("parallelOutput");
    el.innerHTML = "";
    [...m1, ...m2].forEach((v, i) => {
      const d = document.createElement("div");
      d.style.cssText = `padding:.15rem .4rem;border-radius:4px;font-size:.7rem;font-family:'JetBrains Mono',monospace;color:${i < m1.length ? "var(--primary-purple)" : "var(--primary-indigo)"};background:${i < m1.length ? "rgba(139,92,246,.1)" : "rgba(99,102,241,.1)"};border:1px solid ${i < m1.length ? "rgba(139,92,246,.3)" : "rgba(99,102,241,.3)"};`;
      d.textContent = v;
      el.appendChild(d);
    });
    parPhase = 2;
  } else {
    const final = [
      ...parallelData[0],
      ...parallelData[1],
      ...parallelData[2],
      ...parallelData[3],
    ].sort((a, b) => a - b);
    document.getElementById("parallelStatus").innerHTML =
      `✅ <span>Final merge complete</span> — all 8 elements sorted`;
    const el = document.getElementById("parallelOutput");
    el.innerHTML = "";
    final.forEach((v) => {
      const d = document.createElement("div");
      d.style.cssText =
        "padding:.15rem .4rem;border-radius:4px;font-size:.7rem;font-family:'JetBrains Mono',monospace;color:var(--primary-green);background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.3);";
      d.textContent = v;
      el.appendChild(d);
    });
    parPhase = 3;
  }
}
function parallelReset() {
  parPhase = 0;
  parallelData[0] = [8, 3];
  parallelData[1] = [11, 5];
  parallelData[2] = [7, 14];
  parallelData[3] = [2, 9];
  renderParCores([]);
  document.getElementById("parallelOutput").innerHTML = "";
  document.getElementById("parallelStatus").textContent =
    "4 cores ready — each will sort its chunk";
}
renderParCores([]);
