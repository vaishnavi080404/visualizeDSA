const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};
function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  themeIcon.innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
}
themeToggle.addEventListener("click", () => {
  const cur = localStorage.getItem("dsa-theme") || "dark";
  const next = themes[(themes.indexOf(cur) + 1) % themes.length];
  applyTheme(next);
});
applyTheme(localStorage.getItem("dsa-theme") || "dark");

/*
       GROWTH CHART  
*/
function drawComplexityChart() {
  const svg = document.getElementById("complexityChart");
  if (!svg) return;

  const container = svg.parentElement;
  const W = container.clientWidth || 800;
  const H = 340;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", H);
  svg.innerHTML = "";

  const pad = { top: 20, right: 160, bottom: 45, left: 55 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const N = 20;
  const MAX = 400;

  const complexities = [
    { label: "O(1)", fn: () => 1, color: "#10b981" },
    { label: "O(log n)", fn: (n) => Math.log2(n), color: "#06b6d4" },
    { label: "O(n)", fn: (n) => n, color: "#8b5cf6" },
    { label: "O(n log n)", fn: (n) => n * Math.log2(n), color: "#f59e0b" },
    { label: "O(n²)", fn: (n) => n * n, color: "#ef4444" },
  ];

  const sx = (i) => pad.left + (i / N) * cw;
  const sy = (v) => pad.top + ch - Math.min(v / MAX, 1) * ch;

  const ns = (tag, attrs = {}, parent = svg) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    parent.appendChild(el);
    return el;
  };

  // Grid
  [0, 0.25, 0.5, 0.75, 1].forEach((f) => {
    ns("line", {
      x1: pad.left,
      x2: pad.left + cw,
      y1: pad.top + f * ch,
      y2: pad.top + f * ch,
      stroke: "rgba(255,255,255,0.06)",
      "stroke-width": 1,
    });
  });
  [0, 0.2, 0.4, 0.6, 0.8, 1].forEach((f) => {
    ns("line", {
      x1: pad.left + f * cw,
      x2: pad.left + f * cw,
      y1: pad.top,
      y2: pad.top + ch,
      stroke: "rgba(255,255,255,0.06)",
      "stroke-width": 1,
    });
  });

  // Axes
  ns("line", {
    x1: pad.left,
    y1: pad.top,
    x2: pad.left,
    y2: pad.top + ch,
    stroke: "rgba(255,255,255,0.3)",
    "stroke-width": 1.5,
  });
  ns("line", {
    x1: pad.left,
    y1: pad.top + ch,
    x2: pad.left + cw,
    y2: pad.top + ch,
    stroke: "rgba(255,255,255,0.3)",
    "stroke-width": 1.5,
  });

  // Axis tick labels
  [4, 8, 12, 16, 20].forEach((v) => {
    const t = ns("text", {
      x: sx(v),
      y: pad.top + ch + 18,
      fill: "#777",
      "font-size": 11,
      "text-anchor": "middle",
      "font-family": "JetBrains Mono,monospace",
    });
    t.textContent = v;
  });
  const xl = ns("text", {
    x: pad.left + cw / 2,
    y: H - 4,
    fill: "#777",
    "font-size": 12,
    "text-anchor": "middle",
    "font-family": "Inter,sans-serif",
  });
  xl.textContent = "n  (Input Size)";

  const yl = ns("text", {
    x: 14,
    y: pad.top + ch / 2,
    fill: "#777",
    "font-size": 12,
    "text-anchor": "middle",
    "font-family": "Inter,sans-serif",
    transform: `rotate(-90,14,${pad.top + ch / 2})`,
  });
  yl.textContent = "Operations";

  // curves
  complexities.forEach((c, idx) => {
    let d = "";
    for (let i = 1; i <= N; i++) {
      const x = sx(i).toFixed(1);
      const y = sy(c.fn(i)).toFixed(1);
      d += (i === 1 ? "M" : "L") + `${x},${y}`;
    }
    const path = ns("path", {
      d,
      stroke: c.color,
      "stroke-width": 2.5,
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    });
    // Animate draw
    try {
      const len = path.getTotalLength();
      path.style.cssText = `stroke-dasharray:${len};stroke-dashoffset:${len};animation:cDraw 1.4s ${idx * 0.18}s ease forwards`;
    } catch (e) {}
  });

  // Legend (right side)
  complexities.forEach((c, i) => {
    const lx = pad.left + cw + 12;
    const ly = pad.top + 16 + i * 24;
    ns("rect", {
      x: lx,
      y: ly - 7,
      width: 20,
      height: 3,
      fill: c.color,
      rx: 2,
    });
    const t = ns("text", {
      x: lx + 26,
      y: ly,
      fill: "#ccc",
      "font-size": 12,
      "text-anchor": "start",
      "font-family": "JetBrains Mono,monospace",
    });
    t.textContent = c.label;
  });

  // Inject keyframes once
  if (!document.getElementById("cdraw-kf")) {
    const s = document.createElement("style");
    s.id = "cdraw-kf";
    s.textContent = "@keyframes cDraw { to { stroke-dashoffset: 0; } }";
    document.head.appendChild(s);
  }
}

/* 
       INTERACTIVE VISUALIZER  (fixes the missing function)
   */
let _vizActive = false;

async function visualizeComplexity(evt, type) {
  // Kill any running animation
  _vizActive = false;
  await sleep(50);
  _vizActive = true;

  // Highlight button
  document
    .querySelectorAll(".control-btn")
    .forEach((b) => b.classList.remove("active"));
  if (evt && evt.target) evt.target.classList.add("active");

  const counter = document.getElementById("vizCounter");
  const desc = document.getElementById("vizDesc");
  const boxesEl = document.getElementById("vizBoxes");
  const progress = document.getElementById("vizProgress");
  const fill = document.getElementById("vizFill");
  const pct = document.getElementById("vizPct");

  boxesEl.innerHTML = "";
  progress.style.display = "none";

  const N = 8;
  let ops = 0;

  const setOps = (n, label, total = 0) => {
    counter.textContent = `Operations: ${n}  |  ${label}`;
    if (total > 0) {
      progress.style.display = "block";
      const p = Math.min(100, Math.round((n / total) * 100));
      fill.style.width = p + "%";
      pct.textContent = p + "%";
    }
  };

  if (type === "O1") {
    desc.textContent =
      "Access one element directly — always 1 operation, no matter the array size.";
    for (let i = 0; i < N; i++)
      addBox(boxesEl, i + 1, "var(--border-color)", i + 1);
    await sleep(400);
    if (!_vizActive) return;
    setBox(boxesEl, 0, "#10b981", "✓");
    setOps(1, "O(1)");
    _vizActive = false;
    return;
  }

  if (type === "On") {
    desc.textContent =
      "Visit every element once — operations grow linearly with n.";
    for (let i = 0; i < N; i++)
      addBox(boxesEl, i + 1, "var(--border-color)", i + 1);
    await sleep(300);
    for (let i = 0; i < N; i++) {
      if (!_vizActive) return;
      setBox(boxesEl, i, "#8b5cf6", i + 1);
      ops = i + 1;
      setOps(ops, "O(n)", N);
      await sleep(300);
      if (!_vizActive) return;
      setBox(boxesEl, i, "#1a3a2a", "✓");
    }
    _vizActive = false;
    return;
  }

  if (type === "Ologn") {
    desc.textContent =
      "Binary search — halve the search space each step. Only ~log₂(n) steps needed!";
    const arr = [1, 3, 5, 7, 9, 11, 13, 15];
    arr.forEach((v, i) => addBox(boxesEl, i, "var(--border-color)", v));
    await sleep(300);
    const target = arr[Math.floor(N / 2)]; // 9
    let lo = 0,
      hi = N - 1;
    while (lo <= hi) {
      if (!_vizActive) return;
      const mid = Math.floor((lo + hi) / 2);
      setBox(boxesEl, mid, "#06b6d4", arr[mid]);
      ops++;
      setOps(
        ops,
        `O(log n) — searching for ${target}`,
        Math.ceil(Math.log2(N)),
      );
      await sleep(600);
      if (!_vizActive) return;
      if (arr[mid] === target) {
        setBox(boxesEl, mid, "#10b981", "✓ " + arr[mid]);
        break;
      } else if (arr[mid] < target) {
        setBox(boxesEl, mid, "#1a1a2a", arr[mid]);
        lo = mid + 1;
      } else {
        setBox(boxesEl, mid, "#1a1a2a", arr[mid]);
        hi = mid - 1;
      }
    }
    _vizActive = false;
    return;
  }

  if (type === "On2") {
    desc.textContent =
      "Bubble sort — nested loops. Each pass bubbles the largest element to the end.";
    const arr = [5, 3, 8, 1, 9, 2, 7, 4];
    arr.forEach((v, i) => addBox(boxesEl, i, "var(--border-color)", v));
    await sleep(300);
    const total = (N * (N - 1)) / 2;
    for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < N - i - 1; j++) {
        if (!_vizActive) return;
        setBox(boxesEl, j, "#ef4444", arr[j]);
        setBox(boxesEl, j + 1, "#f59e0b", arr[j + 1]);
        ops++;
        setOps(ops, "O(n²) — Bubble Sort", total);
        await sleep(90);
        if (!_vizActive) return;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setBox(boxesEl, j, "#2a2a2a", arr[j]);
          setBox(boxesEl, j + 1, "#2a2a2a", arr[j + 1]);
        } else {
          setBox(boxesEl, j, "#2a2a2a", arr[j]);
          setBox(boxesEl, j + 1, "#2a2a2a", arr[j + 1]);
        }
      }
      setBox(boxesEl, N - 1 - i, "#10b981", arr[N - 1 - i]);
    }
    setBox(boxesEl, 0, "#10b981", arr[0]);
    _vizActive = false;
  }
}

function addBox(parent, key, bg, label) {
  const d = document.createElement("div");
  d.className = "viz-box";
  d.dataset.key = key;
  d.style.background = bg;
  d.textContent = label;
  parent.appendChild(d);
}
function setBox(parent, idx, bg, label) {
  const box = parent.children[idx];
  if (!box) return;
  box.style.background = bg;
  box.style.transform =
    bg.includes("4444") || bg.includes("5cf6") || bg.includes("b6d4")
      ? "scale(1.18)"
      : "scale(1)";
  box.textContent = label;
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function switchLang(e, example, lang) {
  const tabs = e.target.parentElement;
  tabs
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  e.target.classList.add("active");
  document
    .querySelectorAll(`[data-example="${example}"]`)
    .forEach((c) => c.classList.remove("active"));
  const target = document.querySelector(
    `[data-example="${example}"][data-lang="${lang}"]`,
  );
  if (target) {
    target.classList.add("active");
    Object.values(cmInstances).forEach((i) => i.refresh());
  }
}

/* 
       CODE EDITOR (CodeMirror)
    */
const SERVER_URL = "http://localhost:3001";
const cmInstances = {};
let serverOnline = false;

const THEME_MAP = { dark: "material-ocean", light: "eclipse", blue: "nord" };
const getTheme = () =>
  THEME_MAP[document.body.getAttribute("data-theme")] || "material-ocean";

const LANG_MODES = {
  c: "text/x-csrc",
  cpp: "text/x-c++src",
  java: "text/x-java",
  python: "text/x-python",
  js: "text/javascript",
};

async function checkServer() {
  try {
    const r = await fetch(`${SERVER_URL}/health`);
    serverOnline = r.ok;
  } catch {
    serverOnline = false;
  }
}

function initEditors() {
  document.querySelectorAll('textarea[id^="editor-"]').forEach((ta) => {
    const id = ta.id.replace("editor-", "");
    const lang = id.split("-").pop(); // last segment
    const mode = LANG_MODES[lang] || "text/javascript";
    const cm = CodeMirror.fromTextArea(ta, {
      mode,
      theme: getTheme(),
      lineNumbers: true,
      indentUnit: 4,
      lineWrapping: true,
      tabSize: 4,
    });
    cm.setSize(null, 300);
    cmInstances[id] = cm;
  });
}

async function runCode(id) {
  const cm = cmInstances[id];
  const out = document.getElementById(`output-${id}`);
  const btn = document.querySelector(`[onclick="runCode('${id}')"]`);
  if (!cm || !out) return;

  const code = cm.getValue();
  const lang = id.split("-").pop();
  btn.disabled = true;
  btn.innerHTML =
    '<span style="display:inline-block;width:10px;height:10px;border:2px solid rgba(255,255,255,.2);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle"></span> Running...';
  out.textContent = "⏳ Executing...";

  try {
    let result;
    if (lang === "js") {
      result = execJS(code);
    } else if (lang === "python") {
      result = execPython(code);
    } else if (serverOnline) {
      const r = await fetch(`${SERVER_URL}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: lang === "js" ? "javascript" : lang,
        }),
      });
      result = await r.json();
    } else {
      result = {
        stderr: `⚠ Server offline. Start the backend to run ${lang.toUpperCase()} code.\n\nFor JavaScript — switch to the JS tab and run directly in browser!`,
      };
    }
    out.textContent =
      result.stdout || result.stderr || result.compile_output || "(No output)";
  } catch (e) {
    out.textContent = "Error: " + e.message;
  } finally {
    btn.disabled = false;
    btn.innerHTML = "▶ Run Code";
  }
}

function execJS(code) {
  const logs = [];
  const fake = {
    log: (...a) => logs.push(a.join(" ")),
    error: (...a) => logs.push("ERROR: " + a.join(" ")),
    warn: (...a) => logs.push("WARN: " + a.join(" ")),
  };
  try {
    new Function("console", code)(fake);
    return { stdout: logs.join("\n") };
  } catch (e) {
    return { stderr: e.toString() };
  }
}

function execPython(code) {
  // Simple Python subset interpreter — handles the examples in this page
  const lines = [];
  const fake = { log: (s) => lines.push(s) };
  // We'll try Pyodide if available, else show note
  return {
    stderr:
      "⚠ Python requires a backend server or Pyodide.\nSwitch to the JavaScript tab to run code directly in your browser!",
  };
}

// ── theme observer ──
const obs = new MutationObserver(() => {
  const t = getTheme();
  Object.values(cmInstances).forEach((cm) => cm.setOption("theme", t));
});

// ── INIT ──
document.addEventListener("DOMContentLoaded", () => {
  initEditors();
  drawComplexityChart();
  window.addEventListener("resize", drawComplexityChart);
  checkServer();
  setInterval(checkServer, 8000);

  // Default visualizer
  setTimeout(() => {
    const fakeEvt = { target: document.querySelector(".control-btn.active") };
    visualizeComplexity(fakeEvt, "O1");
  }, 700);

  obs.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
});

// spin animation for run button
const spinStyle = document.createElement("style");
spinStyle.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(spinStyle);
