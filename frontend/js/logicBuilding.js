let currentFilter = "all";
let currentSearch = "";

(function () {
  "use strict";

  const SERVER_URL = (typeof COMPILER_URL !== "undefined") ? COMPILER_URL : "http://localhost:3001/api/compiler";
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
      label: "JavaScript",
      mode: "text/javascript",
      badge: "lang-javascript",
      server: "javascript",
      icon: "⚡",
    },
  };

  //   SERVER CHECK
  async function checkServer() {
    try {
      const res = await fetch(`${SERVER_URL}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      serverOnline = res.ok;
      updateServerBar(serverOnline);
    } catch {
      serverOnline = false;
      updateServerBar(false);
    }
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
      ? `<span class="ice-srv-dot"></span> <span class="ice-srv-label">✓ Server Online (All Languages Active)</span>`
      : `<span class="ice-srv-dot"></span> <span class="ice-srv-label">✗ Server Offline (JavaScript Browser-Only Mode)</span>`;
  }

  //   BUILD EDITOR UI
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
                <button class="btn-run" onclick="iceRun('${id}')">▶ Run Code</button>
            </div>
        </div>
        <div id="cm-cont-${id}"></div>
        <div class="code-input-section">
            <div class="input-header">
                <div class="input-title"><i>⌨️</i> Custom Input (stdin)</div>
            </div>
            <textarea id="in-${id}" class="user-input-box" placeholder="Enter program inputs here..."></textarea>
        </div>
        <div class="code-output">
            <div class="output-title">▸ Program Output</div>
            <div class="output-text empty" id="out-${id}">Click Run Code to execute...</div>
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

  //   EXECUTION LOGIC
  window.iceRun = async function (id) {
    const inst = instances[id];
    const out = document.getElementById(`out-${id}`);
    const st = document.getElementById(`st-${id}`);
    const btn = event.target;
    const stdin = document.getElementById(`in-${id}`).value;
    const code = inst.cm.getValue();

    btn.disabled = true;
    st.innerHTML = `<span class="spinner"></span> Running...`;
    st.className = "status-badge compiling";
    out.textContent = "Executing...";

    try {
      let result;
      if (inst.lang === "javascript") {
        result = await executeJS(code);
      } else if (serverOnline) {
        const res = await fetch(`${SERVER_URL}/execute`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // THE FIX
          },
          body: JSON.stringify({
            code,
            language: inst.cfg.server,
            stdin,
          }),
        });
        result = await res.json();
      } else {
        throw new Error("Server offline. Please run 'node server.js'");
      }

      const output =
        (result.stdout || "") +
        (result.stderr || "") +
        (result.compile_output || "");
      out.textContent = output || "Success (No output)";
      out.className =
        result.stderr || result.compile_output
          ? "output-text error"
          : "output-text success";
      st.innerHTML =
        result.stderr || result.compile_output ? "● Error" : "● Success";
      st.className =
        result.stderr || result.compile_output
          ? "status-badge error"
          : "status-badge";
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
    const mockConsole = { log: (...args) => logs.push(args.join(" ")) };
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

//  RENDER PROBLEMS FUNCTION
function renderProblems() {
  const container = document.getElementById("problemsContainer");
  const noResults = document.getElementById("noResults");
  const totalDisplay = document.getElementById("totalProblems");

  // Safety check for data.js
  if (typeof allEnhancedProblems === "undefined") {
    console.error(
      "allEnhancedProblems is not defined. Check your data.js file.",
    );
    return;
  }

  // Filter problems
  const filtered = allEnhancedProblems.filter((problem) => {
    const matchesFilter =
      currentFilter === "all" ||
      problem.difficulty.toLowerCase() === currentFilter.toLowerCase();
    const matchesSearch =
      problem.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
      problem.problemStatement
        .toLowerCase()
        .includes(currentSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // UPDATE THE COUNT HERE
  totalDisplay.textContent = `${filtered.length} Problems`;

  if (filtered.length === 0) {
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
                    <span class="problem-title">${problem.id}. ${problem.title}</span>
                    <span class="difficulty-badge difficulty-${problem.difficulty}">${problem.difficulty}</span>
                </div>
                <span class="expand-icon">▼</span>
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
    const lang = block.dataset.lang;
    window.buildInteractiveEditor(block, lang);
  });
}

function attachEventListeners() {
  document.querySelectorAll(".problem-header").forEach((header) => {
    header.addEventListener("click", function () {
      this.parentElement.classList.toggle("expanded");
      setTimeout(window.refreshAllEditors, 300);
    });
  });

  document.querySelectorAll(".lang-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      const probId = this.dataset.problem;
      const lang = this.dataset.lang;
      document
        .querySelectorAll(`.lang-tab[data-problem="${probId}"]`)
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      document
        .querySelectorAll(`.solution-content[data-problem="${probId}"]`)
        .forEach((s) => s.classList.remove("active"));
      document
        .querySelector(
          `.solution-content[data-problem="${probId}"][data-lang="${lang}"]`,
        )
        .classList.add("active");
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
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

//  FILTERS & THEME
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
  currentSearch = this.value;
  renderProblems();
});

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
};

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeIcon.innerHTML = themeIcons[theme];
  localStorage.setItem("dsa-theme", theme);
  if (window.syncThemeToServer) window.syncThemeToServer(theme);
  window.refreshAllEditors();
}

themeToggle.addEventListener("click", () => {
  const themes = ["dark", "light", "blue"];
  let current = localStorage.getItem("dsa-theme") || "dark";
  let next = themes[(themes.indexOf(current) + 1) % themes.length];
  applyTheme(next);
});

//  INIT
window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(savedTheme);
  renderProblems(); // This will now correctly show the count from data.js
};
