let currentFilter = "all";
let currentSearch = "";

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
let mobileNavOpen = false;

menuToggle.addEventListener("click", () => {
  mobileNavOpen = !mobileNavOpen;
  mobileNav.classList.toggle("open", mobileNavOpen);
  menuToggle.setAttribute("aria-expanded", mobileNavOpen);
});

// close mobile nav on outside click
document.addEventListener("click", (e) => {
  if (
    mobileNavOpen &&
    !mobileNav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    mobileNavOpen = false;
    mobileNav.classList.remove("open");
  }
});

// close mobile nav on link click
mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileNavOpen = false;
    mobileNav.classList.remove("open");
  });
});

(function () {
  "use strict";
  const SERVER_URL = "http://localhost:3001";
  const instances = {};
  let counter = 0;
  let serverOnline = false;

  const THEME_MAP = {
    dark: "material-ocean",
    light: "eclipse",
    blue: "nord",
  };
  const getTheme = () =>
    THEME_MAP[document.body.getAttribute("data-theme")] || "material-ocean";

  const LANGS = {
    c: {
      label: "C",
      mode: "text/x-csrc",
      badge: "lang-c",
      server: "c",
      icon: "🔵",
    },
    cpp: {
      label: "C++",
      mode: "text/x-c++src",
      badge: "lang-cpp",
      server: "cpp",
      icon: "🔷",
    },
    java: {
      label: "Java",
      mode: "text/x-java",
      badge: "lang-java",
      server: "java",
      icon: "☕",
    },
    python: {
      label: "Python",
      mode: "text/x-python",
      badge: "lang-python",
      server: "python",
      icon: "🐍",
    },
    javascript: {
      label: "JS",
      mode: "text/javascript",
      badge: "lang-javascript",
      server: "javascript",
      icon: "⚡",
    },
  };

  async function checkServer() {
    try {
      const res = await fetch(`${SERVER_URL}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      serverOnline = res.ok;
    } catch {
      serverOnline = false;
    }
    updateServerBar(serverOnline);
  }

  function updateServerBar(online) {
    let bar = document.getElementById("ice-srv-status");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "ice-srv-status";
      document.querySelector("nav").after(bar);
    }
    bar.className = online
      ? "ice-server-bar ice-srv-online"
      : "ice-server-bar ice-srv-offline";
    bar.innerHTML = online
      ? `<span class="ice-srv-dot"></span><span class="ice-srv-label">✓ Server Online — All Languages Active</span>`
      : `<span class="ice-srv-dot"></span><span class="ice-srv-label">✗ Server Offline — JavaScript Only Mode</span>`;
  }

  window.buildInteractiveEditor = function (codeBlock, language) {
    const rawCode = codeBlock.querySelector("code").textContent.trim();
    const cfg = LANGS[language.toLowerCase()] || LANGS.c;
    const id = `ice-${counter++}`;

    const wrapper = document.createElement("div");
    wrapper.className = "interactive-code-wrapper";
    wrapper.innerHTML = `
                <div class="code-editor-header">
                    <div class="editor-label">
                        <span class="editor-label-icon">${cfg.icon}</span>
                        <span>Interactive Code Editor</span>
                        <span class="language-badge ${cfg.badge}">${cfg.label}</span>
                    </div>
                    <div class="code-controls">
                        <span class="status-badge" id="st-${id}">● Ready</span>
                        <button class="btn-run" onclick="iceRun('${id}', this)">▶ Run</button>
                    </div>
                </div>
                <div id="cm-cont-${id}"></div>
                <div class="code-input-section">
                    <div class="input-header">
                        <div class="input-title">⌨️ Custom Input (stdin)</div>
                        <button class="clear-input-btn" onclick="document.getElementById('in-${id}').value=''">✕ Clear</button>
                    </div>
                    <textarea id="in-${id}" class="user-input-box" placeholder="Enter program inputs here..."></textarea>
                </div>
                <div class="code-output">
                    <div class="output-title">▸ Program Output</div>
                    <div class="output-text empty" id="out-${id}">Click Run to execute...</div>
                </div>
            `;

    codeBlock.parentNode.replaceChild(wrapper, codeBlock);

    const cm = CodeMirror(document.getElementById(`cm-cont-${id}`), {
      value: rawCode,
      mode: cfg.mode,
      theme: getTheme(),
      lineNumbers: true,
      indentUnit: 4,
      lineWrapping: true,
      autoCloseBrackets: true,
      matchBrackets: true,
    });

    instances[id] = { cm, lang: language.toLowerCase(), cfg, wrapper };
  };

  window.iceRun = async function (id, btn) {
    const inst = instances[id];
    const out = document.getElementById(`out-${id}`);
    const st = document.getElementById(`st-${id}`);
    const stdin = document.getElementById(`in-${id}`).value;
    const code = inst.cm.getValue();

    btn.disabled = true;
    st.innerHTML = `<span class="spinner"></span> Running...`;
    st.className = "status-badge compiling";
    out.textContent = "Executing...";
    out.className = "output-text";

    try {
      let result;
      if (inst.lang === "javascript") {
        result = await executeJS(code);
      } else if (serverOnline) {
        const res = await fetch(`${SERVER_URL}/execute`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            language: inst.cfg.server,
            stdin,
          }),
        });
        result = await res.json();
      } else {
        throw new Error(
          "Server offline. Please run 'node server.js' to enable compiled languages.",
        );
      }

      const hasError = !!(result.stderr || result.compile_output);
      const output =
        (result.stdout || "") +
        (result.stderr || "") +
        (result.compile_output || "");
      out.textContent = output || "✓ Success (no output)";
      out.className = hasError ? "output-text error" : "output-text success";
      st.innerHTML = hasError ? "● Error" : "● Success";
      st.className = hasError ? "status-badge error" : "status-badge";
    } catch (e) {
      out.textContent = "❌ " + e.message;
      out.className = "output-text error";
      st.innerHTML = "● Failed";
      st.className = "status-badge error";
    } finally {
      btn.disabled = false;
    }
  };

  async function executeJS(code) {
    let logs = [];
    const mockConsole = {
      log: (...a) => logs.push(a.join(" ")),
      error: (...a) => logs.push("ERROR: " + a.join(" ")),
      warn: (...a) => logs.push("WARN: " + a.join(" ")),
    };
    try {
      new Function("console", code)(mockConsole);
      return { stdout: logs.join("\n") };
    } catch (e) {
      return { stderr: e.message };
    }
  }

  window.refreshAllEditors = function () {
    Object.values(instances).forEach((inst) => {
      inst.cm.setOption("theme", getTheme());
      inst.cm.refresh();
    });
  };

  setInterval(checkServer, 5000);
  document.addEventListener("DOMContentLoaded", checkServer);
})();

//  RENDER PROBLEMS
function renderProblems() {
  const container = document.getElementById("problemsContainer");
  const noResults = document.getElementById("noResults");
  const totalDisplay = document.getElementById("totalProblems");

  if (typeof allEnhancedProblems === "undefined") {
    container.innerHTML =
      '<div class="no-results"><div class="no-results-icon">⚠️</div><h3>Data file missing</h3><p>Make sure data.js is in the same folder.</p></div>';
    return;
  }

  const filtered = allEnhancedProblems.filter((p) => {
    const matchFilter =
      currentFilter === "all" || p.difficulty.toLowerCase() === currentFilter;
    const matchSearch =
      !currentSearch ||
      p.title.toLowerCase().includes(currentSearch) ||
      (p.problemStatement &&
        p.problemStatement.toLowerCase().includes(currentSearch));
    return matchFilter && matchSearch;
  });

  totalDisplay.textContent = `${filtered.length} Problem${filtered.length !== 1 ? "s" : ""}`;

  if (!filtered.length) {
    container.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  container.innerHTML = filtered
    .map(
      (problem) => `
            <div class="problem-card" data-id="${problem.id}">
                <div class="problem-header">
                    <div class="problem-title-section">
                        <div class="problem-number">${problem.id}</div>
                        <div class="problem-title-wrapper">
                            <div class="problem-title">${escapeHtml(problem.title)}</div>
                            <span class="difficulty-badge difficulty-${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
                        </div>
                    </div>
                    <div class="expand-icon">▼</div>
                </div>
                <div class="problem-content">
                    <div class="problem-body">
                        <div class="section">
                            <div class="section-title">Problem Statement</div>
                            <div class="problem-statement">${problem.problemStatement}</div>
                        </div>
                        <div class="section">
                            <div class="section-title">Solutions</div>
                            <div class="language-tabs">
                                ${Object.keys(problem.solutions)
                                  .map(
                                    (lang, idx) => `
                                    <button class="lang-tab ${idx === 0 ? "active" : ""}" data-problem="${problem.id}" data-lang="${lang}">
                                        ${lang.toUpperCase()}
                                    </button>
                                `,
                                  )
                                  .join("")}
                            </div>
                            ${Object.entries(problem.solutions)
                              .map(
                                ([lang, sol], idx) => `
                                <div class="solution-content ${idx === 0 ? "active" : ""}" data-problem="${problem.id}" data-lang="${lang}">
                                    <div class="code-block" data-lang="${lang}"><code>${escapeHtml(sol.code)}</code></div>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>
        `,
    )
    .join("");

  attachEventListeners();
  initializeEditors();
}

function initializeEditors() {
  document.querySelectorAll(".code-block").forEach((block) => {
    window.buildInteractiveEditor(block, block.dataset.lang || "c");
  });
}

function attachEventListeners() {
  // Card expand/collapse
  document.querySelectorAll(".problem-header").forEach((header) => {
    header.addEventListener("click", function () {
      const card = this.parentElement;
      card.classList.toggle("expanded");
      // Refresh editors after transition
      setTimeout(window.refreshAllEditors, 350);
    });
  });

  // Language tab switching
  document.querySelectorAll(".lang-tab").forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.stopPropagation(); // prevent card toggle
      const probId = this.dataset.problem;
      const lang = this.dataset.lang;
      document
        .querySelectorAll(`.lang-tab[data-problem="${probId}"]`)
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      document
        .querySelectorAll(`.solution-content[data-problem="${probId}"]`)
        .forEach((s) => s.classList.remove("active"));
      const target = document.querySelector(
        `.solution-content[data-problem="${probId}"][data-lang="${lang}"]`,
      );
      if (target) target.classList.add("active");
      setTimeout(window.refreshAllEditors, 10);
    });
  });
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return (text || "").replace(/[&<>"']/g, (m) => map[m]);
}

//  FILTERS
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    currentFilter = this.dataset.filter;
    renderProblems();
  });
});

document.getElementById("searchInput").addEventListener("input", function () {
  currentSearch = this.value.toLowerCase().trim();
  renderProblems();
});

// THEME
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeIcon.innerHTML = themeIcons[theme] || themeIcons.dark;
  localStorage.setItem("dsa-theme", theme);
  if (window.refreshAllEditors) window.refreshAllEditors();
}

themeToggle.addEventListener("click", () => {
  const themes = ["dark", "light", "blue"];
  const current = localStorage.getItem("dsa-theme") || "dark";
  const next = themes[(themes.indexOf(current) + 1) % themes.length];
  applyTheme(next);
});

// ===== INIT =====
window.addEventListener("load", () => {
  const saved = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(saved);
  renderProblems();
});
