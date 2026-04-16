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
  const cur = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(cur) + 1) % 3]);
});
applyTheme(localStorage.getItem("dsa-theme") || "dark");

/* 1. PRINT QUEUE  */
let printQ = [];
const printColors = [
  "rgba(245,158,11,.15)",
  "rgba(6,182,212,.15)",
  "rgba(139,92,246,.15)",
  "rgba(16,185,129,.15)",
  "rgba(239,68,68,.15)",
];
const printBorderColors = [
  "rgba(245,158,11,.4)",
  "rgba(6,182,212,.4)",
  "rgba(139,92,246,.4)",
  "rgba(16,185,129,.4)",
  "rgba(239,68,68,.4)",
];
const printTextColors = [
  "var(--primary-orange)",
  "var(--primary-cyan)",
  "var(--primary-purple)",
  "var(--primary-green)",
  "var(--primary-red)",
];

function renderPrintQ() {
  const el = document.getElementById("printQueue");
  el.innerHTML = "";
  if (printQ.length === 0) {
    el.innerHTML =
      '<span style="color:var(--text-secondary);font-size:.78rem">Empty queue</span>';
    return;
  }
  printQ.forEach((job, i) => {
    const wrap = document.createElement("div");
    wrap.className = "q-item-wrap";
    const item = document.createElement("div");
    item.className = "q-item";
    item.style.cssText = `background:${printColors[i % 5]};border-color:${printBorderColors[i % 5]};color:${printTextColors[i % 5]};padding:0 .5rem;`;
    item.textContent = job;
    wrap.appendChild(item);
    if (i === 0) {
      const t = document.createElement("div");
      t.className = "q-front-tag";
      t.textContent = "FRONT";
      wrap.appendChild(t);
    }
    if (i === printQ.length - 1) {
      const t = document.createElement("div");
      t.className = "q-rear-tag";
      t.textContent = "REAR";
      wrap.appendChild(t);
    }
    el.appendChild(wrap);
  });
}
function addPrintJob(name) {
  if (printQ.length >= 5) {
    document.getElementById("printStatus").textContent =
      "Queue full! Print something first.";
    return;
  }
  printQ.push(name);
  document.getElementById("printStatus").innerHTML =
    `<span>${printQ.length}</span> job(s) waiting`;
  renderPrintQ();
}
function printNext() {
  if (printQ.length === 0) {
    document.getElementById("printStatus").textContent = "No jobs to print!";
    return;
  }
  const job = printQ.shift();
  document.getElementById("printStatus").innerHTML =
    `🖨️ Printing: <span>${job}</span> — ${printQ.length} remaining`;
  renderPrintQ();
}
renderPrintQ();

/* 2. BFS DEMO  */
const GRID_ROWS = 4,
  GRID_COLS = 5;
const WALLS = new Set([1, 3, 6, 11, 13, 16]);
const START = 0,
  END = 19;
let bfsVisited = new Set(),
  bfsQueue = [],
  bfsParent = {},
  bfsTimer = null,
  bfsRunning = false;

function initBfsGrid() {
  const g = document.getElementById("bfsGrid");
  g.innerHTML = "";
  for (let i = 0; i < GRID_ROWS * GRID_COLS; i++) {
    const c = document.createElement("div");
    c.className = "bfs-cell";
    c.id = "bc" + i;
    if (WALLS.has(i)) {
      c.className += " wall";
      c.textContent = "█";
    } else if (i === START) {
      c.className += " start";
      c.textContent = "S";
    } else if (i === END) {
      c.className += " end";
      c.textContent = "E";
    }
    g.appendChild(c);
  }
}
function bfsNeighbors(i) {
  const r = Math.floor(i / GRID_COLS),
    c = i % GRID_COLS,
    nb = [];
  if (r > 0) nb.push(i - GRID_COLS);
  if (r < GRID_ROWS - 1) nb.push(i + GRID_COLS);
  if (c > 0) nb.push(i - 1);
  if (c < GRID_COLS - 1) nb.push(i + 1);
  return nb.filter((n) => !WALLS.has(n));
}
function renderBfsQueue() {
  const el = document.getElementById("bfsQueueShow");
  el.innerHTML = "";
  bfsQueue.forEach((idx) => {
    const s = document.createElement("span");
    s.className = "bfs-q-item";
    s.textContent = idx === START ? "S" : idx === END ? "E" : idx;
    el.appendChild(s);
  });
  if (bfsQueue.length === 0)
    el.innerHTML =
      '<span style="color:var(--text-secondary);font-size:.72rem">Queue empty</span>';
}
function bfsStart() {
  if (bfsRunning) return;
  bfsReset();
  bfsRunning = true;
  bfsQueue = [START];
  bfsVisited.add(START);
  bfsParent = {};
  renderBfsQueue();
  document.getElementById("bfsStatus").innerHTML =
    '<span style="color:var(--primary-purple)">BFS running — exploring level by level...</span>';
  bfsTimer = setInterval(bfsStep, 600);
}
function bfsStep() {
  if (bfsQueue.length === 0) {
    clearInterval(bfsTimer);
    bfsRunning = false;
    document.getElementById("bfsStatus").textContent = "No path found!";
    return;
  }
  const cur = bfsQueue.shift();
  if (cur !== START && cur !== END) {
    document.getElementById("bc" + cur).className = "bfs-cell visited";
    document.getElementById("bc" + cur).textContent = "·";
  }
  if (cur === END) {
    clearInterval(bfsTimer);
    bfsRunning = false;
    // trace path
    let p = END;
    while (p !== undefined && p !== START) {
      if (p !== END) {
        document.getElementById("bc" + p).className = "bfs-cell path";
        document.getElementById("bc" + p).textContent = "●";
      }
      p = bfsParent[p];
    }
    document.getElementById("bfsStatus").innerHTML =
      '<span style="color:var(--primary-orange)">✓ Shortest path found!</span>';
    document.getElementById("bfsQueueShow").innerHTML =
      '<span style="color:var(--primary-green);font-size:.72rem">Done ✓</span>';
    return;
  }
  bfsNeighbors(cur).forEach((nb) => {
    if (!bfsVisited.has(nb)) {
      bfsVisited.add(nb);
      bfsQueue.push(nb);
      bfsParent[nb] = cur;
      if (nb !== END) {
        document.getElementById("bc" + nb).className = "bfs-cell queued";
      }
    }
  });
  renderBfsQueue();
}
function bfsReset() {
  clearInterval(bfsTimer);
  bfsRunning = false;
  bfsVisited = new Set();
  bfsQueue = [];
  bfsParent = {};
  initBfsGrid();
  document.getElementById("bfsQueueShow").innerHTML =
    '<span style="color:var(--text-secondary);font-size:.72rem">Queue empty</span>';
  document.getElementById("bfsStatus").innerHTML =
    '<span style="color:var(--primary-green)">S</span>=Start &nbsp;<span style="color:var(--primary-red)">E</span>=End &nbsp;<span style="color:var(--primary-purple)">■</span>=In Queue &nbsp;<span style="color:var(--primary-cyan)">■</span>=Visited &nbsp;<span style="color:var(--primary-orange)">■</span>=Path';
}
initBfsGrid();

/* 3. PRIORITY QUEUE (HOSPITAL) */
let patients = [];
let patientId = 1;
const priColors = {
  1: {
    bg: "rgba(239,68,68,.15)",
    border: "rgba(239,68,68,.3)",
    text: "var(--primary-red)",
    badge: "🔴",
  },
  2: {
    bg: "rgba(245,158,11,.15)",
    border: "rgba(245,158,11,.3)",
    text: "var(--primary-orange)",
    badge: "🟡",
  },
  3: {
    bg: "rgba(16,185,129,.15)",
    border: "rgba(16,185,129,.3)",
    text: "var(--primary-green)",
    badge: "🟢",
  },
};
const names = [
  "Alice",
  "Bob",
  "Carol",
  "Dave",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
];

function addPatient(name, level, pri) {
  const realName = names[(patientId - 1) % names.length];
  patients.push({ name: realName, level, pri, id: patientId++ });
  patients.sort((a, b) => a.pri - b.pri);
  renderPatients();
}
function renderPatients() {
  const el = document.getElementById("patientQueue");
  el.innerHTML = "";
  if (patients.length === 0) {
    document.getElementById("patientStatus").textContent =
      "Queue empty — add patients";
    return;
  }
  patients.forEach((p, i) => {
    const c = priColors[p.pri];
    const div = document.createElement("div");
    div.className = "pq-item";
    div.style.cssText = `background:${c.bg};border-color:${c.border};`;
    div.innerHTML = `<div class="pq-priority" style="background:${c.bg};border:1px solid ${c.border};color:${c.text}">${p.pri}</div>
      <div class="pq-name" style="color:${c.text}">${p.name}</div>
      <div class="pq-badge" style="background:${c.bg};color:${c.text};border:1px solid ${c.border}">${c.badge} ${p.level}</div>
      ${i === 0 ? '<div style="font-size:.65rem;color:' + c.text + ';font-weight:700">← NEXT</div>' : ""}`;
    el.appendChild(div);
  });
  document.getElementById("patientStatus").innerHTML =
    `<span>${patients.length}</span> patient(s) waiting — sorted by priority`;
}
function treatNext() {
  if (patients.length === 0) {
    document.getElementById("patientStatus").textContent =
      "No patients waiting";
    return;
  }
  const p = patients.shift();
  document.getElementById("patientStatus").innerHTML =
    `🩺 Treating: <span>${p.name}</span> (${p.level}) — ${patients.length} remaining`;
  renderPatients();
}

/*  4. MESSAGE QUEUE */
let msgQueue = [];
let isOnline = false;

function sendMsg(text) {
  msgQueue.push(text);
  const el = document.getElementById("chatDemo");
  const div = document.createElement("div");
  div.className = "chat-msg incoming";
  div.innerHTML = `📤 Queued: "${text}"`;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
  document.getElementById("msgStatus").innerHTML =
    `Offline — <span>${msgQueue.length}</span> message(s) queued`;
}
async function deliverMsgs() {
  if (msgQueue.length === 0) {
    document.getElementById("msgStatus").textContent = "No messages queued";
    return;
  }
  const btn = document.getElementById("deliverBtn");
  btn.disabled = true;
  document.getElementById("msgStatus").innerHTML =
    "📶 Online! Delivering in order...";
  const el = document.getElementById("chatDemo");
  const meta = document.createElement("div");
  meta.className = "chat-msg meta";
  meta.textContent = "— Connected —";
  el.appendChild(meta);
  while (msgQueue.length > 0) {
    await new Promise((r) => setTimeout(r, 700));
    const msg = msgQueue.shift();
    const div = document.createElement("div");
    div.className = "chat-msg processing";
    div.innerHTML = `✅ Delivered: "${msg}"`;
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
    document.getElementById("msgStatus").innerHTML =
      `Delivering... <span>${msgQueue.length}</span> remaining`;
  }
  document.getElementById("msgStatus").innerHTML =
    "<span>✓</span> All messages delivered in order!";
  btn.disabled = false;
}

/*  5. TICKET COUNTER */
let ticketQueue = [];
let ticketCounter = 1;
let servingNum = "—";

function takeTicket() {
  const num = String(ticketCounter).padStart(3, "0");
  ticketCounter++;
  ticketQueue.push(num);
  document.getElementById("nextTicket").textContent = String(
    ticketCounter,
  ).padStart(3, "0");
  renderWaiting();
  document.getElementById("ticketStatus").innerHTML =
    `Ticket <span>${num}</span> issued — ${ticketQueue.length} waiting`;
}
function callNext() {
  if (ticketQueue.length === 0) {
    document.getElementById("ticketStatus").textContent = "No one waiting!";
    return;
  }
  servingNum = ticketQueue.shift();
  document.getElementById("nowServing").textContent = servingNum;
  renderWaiting();
  document.getElementById("ticketStatus").innerHTML =
    `<span>Now serving #${servingNum}</span> — ${ticketQueue.length} still waiting`;
}
function renderWaiting() {
  const el = document.getElementById("waitingLine");
  el.innerHTML = "";
  if (ticketQueue.length === 0) {
    el.innerHTML =
      '<span style="color:var(--text-secondary);font-size:.78rem">No one waiting</span>';
    return;
  }
  ticketQueue.forEach((n) => {
    const d = document.createElement("div");
    d.className = "person-chip";
    d.textContent = "#" + n;
    el.appendChild(d);
  });
}
renderWaiting();

/*  6. CPU ROUND ROBIN  */
const cpuProcesses = [
  {
    name: "Chrome",
    color: "rgba(6,182,212,.15)",
    border: "rgba(6,182,212,.4)",
    text: "var(--primary-cyan)",
    total: 5,
    done: 0,
  },
  {
    name: "VSCode",
    color: "rgba(16,185,129,.15)",
    border: "rgba(16,185,129,.4)",
    text: "var(--primary-green)",
    total: 3,
    done: 0,
  },
  {
    name: "Spotify",
    color: "rgba(139,92,246,.15)",
    border: "rgba(139,92,246,.4)",
    text: "var(--primary-purple)",
    total: 4,
    done: 0,
  },
  {
    name: "Slack",
    color: "rgba(245,158,11,.15)",
    border: "rgba(245,158,11,.4)",
    text: "var(--primary-orange)",
    total: 2,
    done: 0,
  },
];
let cpuQueue = [];
let cpuInterval = null;
let cpuRunning = false;

function cpuStart() {
  if (cpuRunning) return;
  cpuRunning = true;
  cpuQueue = [...cpuProcesses.map((p) => ({ ...p, done: 0 }))];
  document.getElementById("cpuStartBtn").textContent = "⏸ Running...";
  renderCpuBars();
  renderCpuQueue();
  cpuInterval = setInterval(cpuTick, 800);
}
function cpuTick() {
  if (cpuQueue.length === 0) {
    clearInterval(cpuInterval);
    cpuRunning = false;
    document.getElementById("cpuStatus").innerHTML =
      "<span>✓</span> All processes completed!";
    document.getElementById("cpuStartBtn").textContent = "▶ Start Scheduler";
    return;
  }
  const proc = cpuQueue.shift();
  proc.done = Math.min(proc.done + 1, proc.total);
  document.getElementById("cpuStatus").innerHTML =
    `⚙️ Running: <span>${proc.name}</span> (slot ${proc.done}/${proc.total})`;
  if (proc.done < proc.total) {
    cpuQueue.push(proc);
  } else {
    document.getElementById("cpuStatus").innerHTML =
      `✅ <span>${proc.name}</span> finished! ${cpuQueue.length} remaining`;
  }
  renderCpuBars();
  renderCpuQueue();
}
function renderCpuBars() {
  const el = document.getElementById("cpuDemo");
  el.innerHTML = "";
  cpuProcesses.forEach((p) => {
    const cur = cpuQueue.find((q) => q.name === p.name);
    const done = cur ? cur.done : p.total;
    const pct = Math.round((done / p.total) * 100);
    const div = document.createElement("div");
    div.className = "cpu-bar";
    div.innerHTML = `<div class="cpu-label">${p.name}</div>
      <div class="cpu-track"><div class="cpu-fill" style="width:${pct}%;background:${p.text.includes("cyan") ? "#06b6d4" : p.text.includes("green") ? "#10b981" : p.text.includes("purple") ? "#8b5cf6" : "#f59e0b"}">${pct > 15 ? p.name + " " + pct + "%" : ""}</div></div>
      <div class="cpu-time">${done}/${p.total}</div>`;
    el.appendChild(div);
  });
}
function renderCpuQueue() {
  const el = document.getElementById("cpuQueue");
  el.innerHTML = "";
  if (cpuQueue.length === 0) {
    el.innerHTML =
      '<span style="color:var(--text-secondary);font-size:.78rem">Circular queue empty</span>';
    return;
  }
  cpuQueue.forEach((p, i) => {
    const wrap = document.createElement("div");
    wrap.className = "q-item-wrap";
    const item = document.createElement("div");
    item.className = "q-item";
    item.style.cssText = `background:${p.color};border-color:${p.border};color:${p.text};padding:0 .6rem;`;
    item.textContent = p.name;
    wrap.appendChild(item);
    if (i === 0) {
      const t = document.createElement("div");
      t.className = "q-front-tag";
      t.textContent = "NEXT";
      wrap.appendChild(t);
    }
    el.appendChild(wrap);
  });
}
function cpuReset() {
  clearInterval(cpuInterval);
  cpuRunning = false;
  cpuQueue = [];
  cpuProcesses.forEach((p) => (p.done = 0));
  document.getElementById("cpuStartBtn").textContent = "▶ Start Scheduler";
  document.getElementById("cpuStatus").textContent =
    "Processes waiting in circular queue";
  renderCpuBars();
  document.getElementById("cpuQueue").innerHTML =
    '<span style="color:var(--text-secondary);font-size:.78rem">Press Start to begin</span>';
}
renderCpuBars();
