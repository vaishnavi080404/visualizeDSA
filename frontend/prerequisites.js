const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
};

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeIcon.innerHTML = themeIcons[theme];
  localStorage.setItem("dsa-theme", theme);
}

themeToggle.addEventListener("click", () => {
  let current = localStorage.getItem("dsa-theme") || "dark";
  let next = themes[(themes.indexOf(current) + 1) % themes.length];
  applyTheme(next);
});

// initialize theme
applyTheme(localStorage.getItem("dsa-theme") || "dark");
// Language tab switching
document.querySelectorAll(".lang-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active from all tabs
    document
      .querySelectorAll(".lang-tab")
      .forEach((t) => t.classList.remove("active"));
    // Add active to clicked tab
    this.classList.add("active");

    // hide all content
    document.querySelectorAll(".lang-content").forEach((content) => {
      content.classList.remove("active");
    });

    // show selected content
    const lang = this.getAttribute("data-lang");
    document.getElementById(lang + "-content").classList.add("active");
  });
});

// topic card expansion
document.querySelectorAll(".topic-card").forEach((card) => {
  const header = card.querySelector(".topic-header");
  header.addEventListener("click", function () {
    card.classList.toggle("expanded");
  });
});

//  C Animation - Variable Animation

setInterval(() => {
  const values = [20, 21, 22, 20];
  const heights = [5.7, 5.8, 5.9, 5.7];
  const grades = ["A", "B", "A+", "A"];

  const index = Math.floor(Date.now() / 3000) % values.length;

  document.getElementById("varValue").textContent = values[index];
  document.getElementById("heightValue").textContent = heights[index];
  document.getElementById("gradeValue").textContent = "'" + grades[index] + "'";
}, 3000);

// loop counter animation
let loopCount = 0;
setInterval(() => {
  loopCount = (loopCount + 1) % 6;
  document.getElementById("loopCounter").textContent = loopCount;
}, 1000);

// Conditional Animation - Alternating conditions
setInterval(() => {
  const conditions = ["age >= 18", "age < 18", "score > 50"];
  const index = Math.floor(Date.now() / 4000) % conditions.length;
  document.getElementById("conditionInput").textContent = conditions[index];
}, 4000);
let isAllocated = false;

function allocateMemory() {
  const blocks = document.querySelectorAll(".memory-block");
  blocks.forEach((block, index) => {
    setTimeout(() => {
      block.classList.add("allocated");
      block.textContent = index + 1;
    }, index * 200);
  });
  isAllocated = true;
}

function freeMemory() {
  const blocks = document.querySelectorAll(".memory-block");
  blocks.forEach((block, index) => {
    setTimeout(() => {
      block.classList.remove("allocated");
      block.classList.add("freed");
      block.textContent = "NULL";
    }, index * 100);
  });
  isAllocated = false;
}

//auto-demo memory allocation
setInterval(() => {
  if (!isAllocated) {
    allocateMemory();
  } else {
    freeMemory();
  }
}, 5000);

// C++ Animation

// C++ Variables
let cppVarIndex = 0;
const cppVariables = [
  { age: 20, bool: "true", string: '"John"', auto: 100 },
  { age: 25, bool: "false", string: '"Alice"', auto: 200 },
  { age: 18, bool: "true", string: '"Bob"', auto: 150 },
];
setInterval(() => {
  cppVarIndex = (cppVarIndex + 1) % cppVariables.length;
  const d = cppVariables[cppVarIndex];
  const age = document.getElementById("cpp-age");
  const bool = document.getElementById("cpp-bool");
  const str = document.getElementById("cpp-string");
  const auto = document.getElementById("cpp-auto");
  if (age) age.textContent = d.age;
  if (bool) bool.textContent = d.bool;
  if (str) str.textContent = d.string;
  if (auto) auto.textContent = d.auto;
}, 3000);

// C++ Loop
let cppLoopIndex = 0;
const cppNumbers = [1, 2, 3, 4, 5];
setInterval(() => {
  for (let i = 0; i < 5; i++) {
    const b = document.getElementById(`cpp-box-${i}`);
    if (b) {
      b.style.background = "var(--primary-purple)";
      b.style.transform = "scale(1)";
      b.style.boxShadow = "none";
    }
  }
  const current = document.getElementById(`cpp-box-${cppLoopIndex}`);
  if (current) {
    current.style.background = "var(--primary-cyan)";
    current.style.transform = "scale(1.2)";
    current.style.boxShadow = "0 0 25px rgba(6, 182, 212, 0.8)";
  }
  const numDisp = document.getElementById("cpp-current-num");
  if (numDisp) numDisp.textContent = cppNumbers[cppLoopIndex];
  cppLoopIndex = (cppLoopIndex + 1) % 5;
}, 1200);

// JAVA ANIMATIONS

// variables
let javaVarIdx = 0;
const javaVars = [
  { age: 20, name: '"John"' },
  { age: 28, name: '"Alice"' },
  { age: 15, name: '"Bob"' },
];

setInterval(() => {
  javaVarIdx = (javaVarIdx + 1) % javaVars.length;
  const d = javaVars[javaVarIdx];
  const age = document.getElementById("java-age");
  const name = document.getElementById("java-string");
  if (age) age.textContent = d.age;
  if (name) name.textContent = d.name;
}, 3000);

//  For Loop
let javaLoopIdx = 0;
setInterval(() => {
  document
    .querySelectorAll('[id^="java-box-"]')
    .forEach((box) => box.classList.remove("active"));

  const currentBox = document.getElementById(`java-box-${javaLoopIdx}`);
  if (currentBox) {
    currentBox.classList.add("active");
    // Custom styling for Java loop accent
    currentBox.style.background = "#E76F00";
    currentBox.style.boxShadow = "0 0 25px rgba(231, 111, 0, 0.6)";

    const label = document.getElementById("java-loop-val");
    if (label) label.textContent = `num: ${javaLoopIdx + 1}`;
  }
  javaLoopIdx = (javaLoopIdx + 1) % 5;
}, 1000);

// PYTHON ANIMATIONS

//  dynamic typing demo
let pyVarIdx = 0;
const pyVars = [
  { val: "20", type: "Type: int" },
  { val: '"Twenty"', type: "Type: str" },
  { val: "True", type: "Type: bool" },
];

setInterval(() => {
  pyVarIdx = (pyVarIdx + 1) % pyVars.length;
  const d = pyVars[pyVarIdx];
  const valEl = document.getElementById("py-var-val");
  const typeEl = document.getElementById("py-var-type");
  if (valEl) valEl.textContent = d.val;
  if (typeEl) typeEl.textContent = d.type;
}, 3000);

// list
let pyLoopIdx = 0;
const pySquares = [0, 1, 4, 9, 16];

setInterval(() => {
  document.querySelectorAll('[id^="py-box-"]').forEach((box) => {
    box.classList.remove("active");
    box.style.background = "var(--border-color)";
  });

  const currentBox = document.getElementById(`py-box-${pyLoopIdx}`);
  const resEl = document.getElementById("py-loop-res");

  if (currentBox) {
    currentBox.classList.add("active");
    currentBox.style.background = "#3776AB";
    currentBox.style.boxShadow = "0 0 20px rgba(55, 118, 171, 0.6)";

    let currentList = pySquares.slice(0, pyLoopIdx + 1);
    if (resEl) resEl.textContent = `[${currentList.join(", ")}]`;
  }

  pyLoopIdx = (pyLoopIdx + 1) % 6; // 6 to include empty state
  if (pyLoopIdx === 5) {
    if (resEl) resEl.textContent = `[ ]`;
    pyLoopIdx = 0;
  }
}, 1000);

// python indentation conditionals
let pyScore = 85;
setInterval(() => {
  pyScore = pyScore === 85 ? 95 : 85;
  const isA = pyScore >= 90;

  const scoreEl = document.getElementById("py-score-val");
  const boxEl = document.getElementById("py-cond-box");
  const resEl = document.getElementById("py-cond-res");

  if (scoreEl) scoreEl.textContent = pyScore;
  if (resEl) resEl.textContent = isA ? "Grade: A" : "Grade: B";

  if (boxEl) {
    boxEl.className = "condition-box";
    boxEl.style.borderColor = isA
      ? "var(--primary-green)"
      : "var(--primary-cyan)";
    boxEl.style.background = isA
      ? "rgba(16, 185, 129, 0.1)"
      : "rgba(6, 182, 212, 0.1)";
  }
}, 3000);

// JAVASCRIPT ANIMATIONS

//Variable
let jsVarIdx = 0;
const jsVars = [
  { label: "const PI", val: "3.14" },
  { label: "let age", val: "21" },
  { label: "let age", val: "22" },
];

setInterval(() => {
  jsVarIdx = (jsVarIdx + 1) % jsVars.length;
  const d = jsVars[jsVarIdx];
  const labelEl = document.getElementById("js-var-label");
  const valEl = document.getElementById("js-var-val");
  if (labelEl) labelEl.textContent = d.label;
  if (valEl) valEl.textContent = d.val;
}, 3000);

// for...of iteration
let jsLoopIdx = 0;
const jsNums = [10, 20, 30, 40, 50];

setInterval(() => {
  document.querySelectorAll('[id^="js-box-"]').forEach((box) => {
    box.classList.remove("active");
    box.style.background = "var(--border-color)";
    box.style.color = "var(--muted)";
  });

  const currentBox = document.getElementById(`js-box-${jsLoopIdx}`);
  const label = document.getElementById("js-loop-val");

  if (currentBox) {
    currentBox.classList.add("active");
    currentBox.style.background = "#F7DF1E";
    currentBox.style.color = "#000";
    currentBox.style.boxShadow = "0 0 25px rgba(247, 223, 30, 0.6)";

    if (label) label.textContent = `val: ${jsNums[jsLoopIdx]}`;
  }
  jsLoopIdx = (jsLoopIdx + 1) % 5;
}, 1200);

// <!-- MULTI-LANGUAGE CODE EDITOR SCRIPT -->

(function () {
  "use strict";

  /*  config  */
  const SERVER_URL = "http://localhost:3001";

  /*  state  */
  const instances = {};
  let counter = 0;
  let serverOnline = false;

  /*  theme  */
  const THEME_MAP = { dark: "material-ocean", light: "eclipse", blue: "nord" };
  const getTheme = () =>
    THEME_MAP[document.body.getAttribute("data-theme")] || "material-ocean";

  /*  language map  */
  const LANGS = {
    c: {
      label: "C",
      mode: "text/x-csrc",
      badge: "lang-c",
      server: "c", // This ID must match the key in server.js
      detect: (s) =>
        s.includes("#include") && (s.includes("printf") || s.includes("scanf")),
    },
    cpp: {
      label: "C++",
      mode: "text/x-c++src",
      badge: "lang-cpp",
      server: "cpp",
      detect: (s) => s.includes("iostream") || s.includes("cout"),
    },
    java: {
      label: "Java",
      mode: "text/x-java",
      badge: "lang-java",
      server: "java",
      detect: (s) => s.includes("public class"),
    },
    python: {
      label: "Python",
      mode: "text/x-python",
      badge: "lang-python",
      server: "python",
      detect: (s) => /^\s*(def |import |print\()/m.test(s),
    },
    javascript: {
      label: "JavaScript",
      mode: "text/javascript",
      badge: "lang-javascript",
      server: "javascript",
      detect: (s) => s.includes("console.log") || s.includes("=>"),
    },
  };

  function detectLang(code, el) {
    const parent = el.closest(".lang-content");
    if (parent) {
      const map = {
        "c-content": "c",
        "cpp-content": "cpp",
        "java-content": "java",
        "python-content": "python",
        "javascript-content": "javascript",
      };
      if (map[parent.id]) return map[parent.id];
    }
    return Object.entries(LANGS).find(([, c]) => c.detect(code))?.[0] ?? "c";
  }

  /*  CSS  */
  const css = document.createElement("style");
  css.textContent = `
    /* server status badge */
    .ice-server-bar {
      display:flex; align-items:center; gap:.5rem;
      padding:.4rem 1rem; background:var(--card-bg);
      border-bottom:1px solid var(--border-color);
      font-size:.72rem; font-weight:700; font-family:'Inter',sans-serif;
    }
    .ice-srv-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
    .ice-srv-online  .ice-srv-dot { background:#10b981; box-shadow:0 0 6px #10b981; }
    .ice-srv-offline .ice-srv-dot { background:#ef4444; box-shadow:0 0 6px #ef4444; }
    .ice-srv-online  .ice-srv-label { color:#10b981; }
    .ice-srv-offline .ice-srv-label { color:#ef4444; }

    /* editor card */
    .ice-wrapper {
      margin:2.5rem 0; background:var(--card-bg);
      border:1px solid var(--border-color); border-radius:16px;
      overflow:hidden; box-shadow:0 20px 60px -15px rgba(0,0,0,.3);
      transition:border-color .3s, box-shadow .3s, transform .3s;
    }
    .ice-wrapper:hover   { border-color:var(--primary-cyan); transform:translateY(-2px); }
    .ice-wrapper.running { border-color:var(--primary-purple); }
    .ice-wrapper.ok      { border-color:var(--primary-green); }
    .ice-wrapper.err     { border-color:#ef4444; }

    .ice-header {
      background:var(--card-bg); padding:1rem 1.5rem;
      border-bottom:1px solid var(--border-color);
      display:flex; justify-content:space-between; align-items:center;
      flex-wrap:wrap; gap:.7rem;
    }
    .ice-label { display:flex; align-items:center; gap:.6rem;
                  font-size:.875rem; font-weight:600; color:var(--text-primary); }
    .ice-label i {
      width:30px; height:30px;
      background:linear-gradient(135deg,var(--primary-cyan),var(--primary-purple));
      border-radius:7px; display:flex; align-items:center; justify-content:center;
      color:#fff; font-size:.8rem;
    }
    .ice-badge {
      padding:.25rem .75rem; border-radius:6px; font-size:.75rem; font-weight:700;
      font-family:'JetBrains Mono',monospace; border:1px solid;
    }
    .ice-badge.lang-c          { background:rgba(3,89,156,.1);  border-color:rgba(3,89,156,.3);  color:#03599C; }
    .ice-badge.lang-cpp        { background:rgba(0,89,156,.1);  border-color:rgba(0,89,156,.3);  color:#00599C; }
    .ice-badge.lang-java       { background:rgba(231,111,0,.1); border-color:rgba(231,111,0,.3); color:#E76F00; }
    .ice-badge.lang-python     { background:rgba(55,118,171,.1);border-color:rgba(55,118,171,.3);color:#3776AB; }
    .ice-badge.lang-javascript { background:rgba(247,223,30,.1);border-color:rgba(247,223,30,.3);color:#b8a200; }
    [data-theme="light"] .ice-badge.lang-javascript { color:#7a6a00; }

    .ice-controls { display:flex; gap:.5rem; align-items:center; }

    .ice-status {
      display:inline-flex; align-items:center; gap:.4rem; padding:.35rem .85rem;
      background:rgba(16,185,129,.08); border:1px solid rgba(16,185,129,.2);
      border-radius:8px; font-size:.78rem; font-weight:600; color:var(--primary-green);
      font-family:'Inter',sans-serif; transition:all .2s;
    }
    .ice-status.compiling { background:rgba(139,92,246,.08); border-color:rgba(139,92,246,.2); color:var(--primary-purple); }
    .ice-status.err       { background:rgba(239,68,68,.08);  border-color:rgba(239,68,68,.2);  color:#ef4444; }

    .ice-btn-reset {
      background:var(--border-color); border:1px solid var(--border-color);
      color:var(--text-secondary); padding:.5rem 1rem; border-radius:8px;
      cursor:pointer; font-size:.82rem; font-weight:600;
      font-family:'Inter',sans-serif; display:flex; align-items:center; gap:.4rem;
      transition:all .2s;
    }
    .ice-btn-reset:hover { background:rgba(168,85,247,.1); border-color:var(--primary-purple); color:var(--primary-purple); }

    .ice-btn-run {
      background:linear-gradient(135deg,var(--primary-green),#059669);
      color:#fff; border:none; padding:.5rem 1.25rem; border-radius:8px;
      font-weight:700; cursor:pointer; font-size:.82rem;
      font-family:'Inter',sans-serif; display:flex; align-items:center; gap:.4rem;
      box-shadow:0 4px 14px rgba(16,185,129,.3); transition:all .25s;
    }
    .ice-btn-run:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 6px 20px rgba(16,185,129,.4); }
    .ice-btn-run:disabled { opacity:.6; cursor:not-allowed; transform:none; box-shadow:none; }

    /* output area */
    .ice-output {
      background:var(--editor-bg,var(--code-bg)); padding:1.2rem 1.5rem;
      border-top:1px solid var(--border-color); max-height:280px; overflow-y:auto;
    }
    .ice-output-title {
      color:var(--primary-green); font-family:'Inter',sans-serif; font-size:.7rem;
      font-weight:700; text-transform:uppercase; letter-spacing:1.2px;
      margin-bottom:.8rem; display:flex; align-items:center; gap:.4rem;
    }
    .ice-output-text {
      font-family:'JetBrains Mono',monospace; font-size:.88rem; line-height:1.8;
      color:var(--text-primary); white-space:pre-wrap; word-break:break-word;
      background:var(--border-color); padding:1rem 1.2rem; border-radius:10px;
      border:1px solid var(--border-color); min-height:48px; transition:all .3s;
    }
    .ice-output-text.empty { color:var(--text-secondary); font-style:italic; }
    .ice-output-text.ok    { border-left:3px solid var(--primary-green);
                              background:linear-gradient(90deg,rgba(16,185,129,.05),var(--border-color)); }
    .ice-output-text.err   { color:#ef4444; border-left:3px solid #ef4444;
                              background:linear-gradient(90deg,rgba(239,68,68,.05),var(--border-color)); }
    .ice-output-text.warn  { border-left:3px solid #f59e0b;
                              background:linear-gradient(90deg,rgba(245,158,11,.05),var(--border-color)); }

    /* offline hint box */
    .ice-offline-hint {
      margin-top:.7rem; padding:.65rem 1rem;
      background:rgba(245,158,11,.08); border:1px solid rgba(245,158,11,.25);
      border-radius:8px; font-size:.78rem; color:#f59e0b;
      font-family:'Inter',sans-serif; line-height:1.6; display:none;
    }
    .ice-offline-hint.show { display:block; }
    .ice-offline-hint code {
      font-family:'JetBrains Mono',monospace; background:rgba(245,158,11,.12);
      padding:.1rem .35rem; border-radius:4px; font-size:.75rem;
    }

    /* spinner */
    .ice-spin {
      display:inline-block; width:12px; height:12px;
      border:2px solid rgba(255,255,255,.25); border-top-color:#fff;
      border-radius:50%; animation:ice-rotation .65s linear infinite;
    }
    @keyframes ice-rotation { to { transform:rotate(360deg); } }

    .CodeMirror {
      height:380px !important; font-size:13.5px !important;
      font-family:'JetBrains Mono','Fira Code',monospace !important;
      line-height:1.7 !important;
    }
  `;
  document.head.appendChild(css);

  /*  global server-status bar (injected once)  */
  function injectServerBar() {
    if (document.getElementById("ice-server-bar")) return;
    const bar = document.createElement("div");
    bar.id = "ice-server-bar";
    bar.className = "ice-server-bar ice-srv-offline";
    bar.innerHTML = `
      <span class="ice-srv-dot"></span>
      <span class="ice-srv-label" id="ice-srv-label">⏳ Checking server…</span>
      <span style="color:var(--text-secondary);font-weight:400;margin-left:auto;">
        Start server: <code style="font-family:'JetBrains Mono',monospace;font-size:.7rem;
          background:var(--code-bg);padding:.1rem .4rem;border-radius:4px;">node server.js</code>
      </span>
    `;
    // insert after nav or at top of first content section
    const nav = document.querySelector("nav");
    if (nav && nav.nextSibling)
      nav.parentNode.insertBefore(bar, nav.nextSibling);
    else document.body.prepend(bar);
  }

  function updateServerBar(online, langs) {
    const bar = document.getElementById("ice-server-bar");
    const label = document.getElementById("ice-srv-label");
    if (!bar || !label) return;
    if (online) {
      bar.className = "ice-server-bar ice-srv-online";
      label.textContent = `✓ Server Online  ·  ${langs}`;
    } else {
      bar.className = "ice-server-bar ice-srv-offline";
      label.textContent =
        "✗ Server Offline — JS runs in browser; C/C++/Java/Python need the server";
    }
  }

  async function checkServer() {
    try {
      const res = await fetch(`${SERVER_URL}/health`, {
        signal: AbortSignal.timeout(3000),
      });
      const data = await res.json();
      serverOnline = true;
      const langs = Object.entries(data.languages || {})
        .filter(([, v]) => v)
        .map(([k]) => k.toUpperCase())
        .join(" · ");
      updateServerBar(true, langs);
    } catch {
      serverOnline = false;
      updateServerBar(false, "");
    }
  }

  /*  build editor DOM  */
  function buildEditor(codeBlock) {
    const codeEl = codeBlock.querySelector("code");
    const code = codeEl ? codeEl.textContent.trim() : "";
    if (!code) return;

    const lang = detectLang(code, codeBlock);
    const cfg = LANGS[lang];
    const id = `ice-${counter++}`;

    const wrap = document.createElement("div");
    wrap.className = "ice-wrapper";
    wrap.innerHTML = `
      <div class="ice-header">
        <div class="ice-label">
          <i class="fas fa-code"></i>
          <span>Interactive Editor</span>
          <span class="ice-badge ${cfg.badge}">${cfg.label}</span>
        </div>
        <div class="ice-controls">
          <span class="ice-status" id="st-${id}">
            <i class="fas fa-circle" style="font-size:.5rem"></i>&nbsp;Ready
          </span>
          <button class="ice-btn-reset" onclick="iceReset('${id}')">
            <i class="fas fa-undo-alt"></i> Reset
          </button>
          <button class="ice-btn-run" id="rb-${id}" onclick="iceRun('${id}')">
            <i class="fas fa-play"></i> Run Code
          </button>
        </div>
      </div>
      <textarea id="ta-${id}"></textarea>
      <div class="ice-output">
        <div class="ice-output-title">
          <i class="fas fa-terminal"></i> Program Output
        </div>
        <div class="ice-output-text empty" id="ot-${id}">
          Click "Run Code" to execute ▶
        </div>
        <div class="ice-offline-hint" id="oh-${id}">
          ⚠ Server offline — cannot run <strong>${cfg.label}</strong> without server.<br>
          Start it: <code>node server.js</code> in your project folder.
        </div>
      </div>`;

    codeBlock.parentNode.replaceChild(wrap, codeBlock);

    setTimeout(() => {
      const cm = CodeMirror.fromTextArea(document.getElementById(`ta-${id}`), {
        mode: cfg.mode,
        theme: getTheme(),
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        styleActiveLine: true,
      });
      cm.setValue(code);
      instances[id] = { cm, orig: code, wrap, lang, cfg };
      requestAnimationFrame(() => cm.refresh());
    }, 60);
  }

  /*  execute via server  */
  async function executeOnServer(lang, code) {
    const resp = await fetch(`${SERVER_URL}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language: lang, stdin: "" }),
    });
    if (!resp.ok) throw new Error(`Server error ${resp.status}`);
    return await resp.json();
  }

  /*  execute JS in browser (fallback)  */
  function executeJS(code) {
    const logs = [];
    const con = {
      log: (...a) => logs.push(a.map(v2s).join(" ")),
      error: (...a) => logs.push("Error: " + a.map(v2s).join(" ")),
      warn: (...a) => logs.push("Warning: " + a.map(v2s).join(" ")),
      info: (...a) => logs.push(a.map(v2s).join(" ")),
    };
    function v2s(v) {
      if (v === null) return "null";
      if (v === undefined) return "undefined";
      if (typeof v === "object") {
        try {
          return JSON.stringify(v);
        } catch {
          return String(v);
        }
      }
      return String(v);
    }
    try {
      new Function(
        "console",
        "Math",
        "JSON",
        "Array",
        "Object",
        "String",
        "Number",
        "Boolean",
        "Date",
        "parseInt",
        "parseFloat",
        "isNaN",
        "isFinite",
        "Map",
        "Set",
        code,
      )(
        con,
        Math,
        JSON,
        Array,
        Object,
        String,
        Number,
        Boolean,
        Date,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        Map,
        Set,
      );
      return {
        stdout: logs.join("\n") || "(no output)",
        stderr: "",
        exitCode: 0,
      };
    } catch (e) {
      return { stdout: "", stderr: `${e.name}: ${e.message}`, exitCode: 1 };
    }
  }

  /*  run handler  */
  window.iceRun = async function (id) {
    const inst = instances[id];
    if (!inst) return;

    const ot = document.getElementById(`ot-${id}`);
    const oh = document.getElementById(`oh-${id}`);
    const st = document.getElementById(`st-${id}`);
    const btn = document.getElementById(`rb-${id}`);
    const { wrap, lang, cfg } = inst;
    const code = inst.cm.getValue();

    // reset state
    wrap.classList.remove("ok", "err");
    wrap.classList.add("running");
    btn.disabled = true;
    btn.innerHTML = '<span class="ice-spin"></span> Running…';
    st.innerHTML = '<span class="ice-spin"></span>&nbsp;Executing…';
    st.className = "ice-status compiling";
    ot.textContent = `⚙️  Running ${cfg.label} code…`;
    ot.className = "ice-output-text";
    oh.classList.remove("show");

    try {
      let result;

      //  JS: always run in browser
      if (lang === "javascript") {
        result = executeJS(code);

        //  other langs: try server first
      } else if (serverOnline) {
        try {
          result = await executeOnServer(cfg.server, code);
        } catch (e) {
          // server dropped mid-session
          serverOnline = false;
          updateServerBar(false, "");
          throw new Error("Lost connection to server. Is it still running?");
        }

        //  server offline → show instructions
      } else {
        ot.textContent = `Server is offline. Cannot execute ${cfg.label} code in the browser.`;
        ot.className = "ice-output-text warn";
        oh.classList.add("show");
        wrap.classList.remove("running");
        wrap.classList.add("err");
        st.innerHTML =
          '<i class="fas fa-exclamation-triangle"></i>&nbsp;Offline';
        st.className = "ice-status err";
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-play"></i> Run Code';
        return;
      }

      //  process result
      const stdout = (result.stdout || "").trim();
      const stderr = (result.stderr || "").trim();
      const compErr = (result.compile_output || "").trim();
      const exitCode = result.exitCode ?? 0;

      if (compErr) {
        // compilation error
        const cleaned = compErr
          .replace(/\/tmp\/[^\s:]+:/g, "")
          .trim()
          .slice(0, 800);
        ot.textContent = `❌ Compilation Error\n\n${cleaned}`;
        ot.className = "ice-output-text err";
        wrap.classList.add("err");
        st.innerHTML = '<i class="fas fa-times-circle"></i>&nbsp;Compile Error';
        st.className = "ice-status err";
      } else if (exitCode !== 0 && !stdout) {
        // runtime error
        const msg = stderr || `Process exited with code ${exitCode}`;
        ot.textContent = `⚠️ Runtime Error\n\n${msg.slice(0, 500)}`;
        ot.className = "ice-output-text err";
        wrap.classList.add("err");
        st.innerHTML = '<i class="fas fa-times-circle"></i>&nbsp;Runtime Error';
        st.className = "ice-status err";
      } else {
        // success — show stdout (+ stderr as extra info if present)
        let display = stdout || "(no output)";
        if (stderr) display += `\n\n─── stderr ───\n${stderr.slice(0, 300)}`;
        ot.textContent = display;
        ot.className = `ice-output-text ok`;
        wrap.classList.add("ok");
        st.innerHTML = '<i class="fas fa-check-circle"></i>&nbsp;Success';
        st.className = "ice-status";
      }
    } catch (e) {
      ot.textContent = `⚠️ Error\n\n${e.message}`;
      ot.className = "ice-output-text err";
      wrap.classList.add("err");
      st.innerHTML = '<i class="fas fa-times-circle"></i>&nbsp;Error';
      st.className = "ice-status err";
    }

    wrap.classList.remove("running");
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-play"></i> Run Code';
  };

  /*  reset  */
  window.iceReset = function (id) {
    const inst = instances[id];
    if (!inst) return;
    inst.cm.setValue(inst.orig);
    inst.wrap.classList.remove("ok", "err", "running");
    const ot = document.getElementById(`ot-${id}`);
    if (ot) {
      ot.textContent = 'Click "Run Code" to execute ▶';
      ot.className = "ice-output-text empty";
    }
    const oh = document.getElementById(`oh-${id}`);
    if (oh) oh.classList.remove("show");
    const st = document.getElementById(`st-${id}`);
    if (st) {
      st.innerHTML =
        '<i class="fas fa-circle" style="font-size:.5rem"></i>&nbsp;Ready';
      st.className = "ice-status";
    }
  };

  /*  theme & tab sync  */
  window.updateEditorThemes = function () {
    const t = getTheme();
    Object.values(instances).forEach((i) => {
      if (i?.cm) {
        i.cm.setOption("theme", t);
        i.cm.refresh();
      }
    });
  };
  window.refreshAllEditors = function () {
    Object.values(instances).forEach((i) => {
      if (i?.cm) i.cm.refresh();
    });
  };

  new MutationObserver((ms) =>
    ms.forEach((m) => {
      if (m.attributeName === "data-theme") updateEditorThemes();
    }),
  ).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  new MutationObserver((ms) =>
    ms.forEach((m) => {
      if (
        m.attributeName === "class" &&
        m.target.classList.contains("active") &&
        m.target.classList.contains("lang-content")
      )
        setTimeout(refreshAllEditors, 100);
    }),
  ).observe(document.querySelector(".container") || document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
  });

  document
    .querySelectorAll(".lang-tab")
    .forEach((t) =>
      t.addEventListener("click", () => setTimeout(refreshAllEditors, 150)),
    );

  /*  init  */
  function init() {
    injectServerBar();
    document.querySelectorAll(".code-block").forEach(buildEditor);
    setTimeout(refreshAllEditors, 300);
    // check server now and every 8s
    checkServer();
    setInterval(checkServer, 8000);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
