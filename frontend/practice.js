const SERVER_URL = window.location.origin;

/* 
   LOAD TOPIC DATA FROM URL PARAM    
*/
const urlParams = new URLSearchParams(window.location.search);
const topicParam = urlParams.get("topic") || "stack";

// Map topic names to their data files
const TOPIC_FILES = {
  stack: "stack_problems.js",
  arrays: "array_problems.js",
  matrix: "matrix_problems.js",
  queue: "queue_problems.js",
  string: "string_problems.js",
  recursion: "recursion_problems.js",
  selectionsort: "selectionsort_problems.js",
  bubblesort: "bubblesort_problems.js",
  insertion_sort: "insertionsort_problems.js",
  merge_sort: "mergesort_problems.js",
  quick_sort: "quicksort_problems.js",
  linearsearch: "linearsearch_problems.js",
  binarysearch: "binarysearch_problems.js",
};

// dynamically load the topic's data file
function loadTopicData(topic) {
  return new Promise((resolve, reject) => {
    const file = TOPIC_FILES[topic];
    if (!file) {
      reject(new Error(`Unknown topic: ${topic}`));
      return;
    }
    const script = document.createElement("script");
    script.src = file;
    script.onload = () => {
      // After script loads, PROBLEMS and TOPIC_CONFIG are available globally
      if (
        typeof PROBLEMS !== "undefined" &&
        typeof TOPIC_CONFIG !== "undefined"
      ) {
        resolve({ problems: PROBLEMS, config: TOPIC_CONFIG });
      } else {
        reject(new Error(`Data file loaded but PROBLEMS not found in ${file}`));
      }
    };
    script.onerror = () => reject(new Error(`Could not load: ${file}`));
    document.head.appendChild(script);
  });
}

/* ═
   STATE
*/
let problems = [];
let topicConfig = {};
let currentProblem = null;
let currentLang = "cpp";
let codeEditor;
let solved = new Set();
let currentFilter = "all";
let serverOnline = false;
const SOLVED_KEY = () => `${topicParam}_solved`;

document.addEventListener("DOMContentLoaded", async () => {
  // Init CodeMirror
  codeEditor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    lineNumbers: true,
    theme: "material-ocean",
    mode: "text/x-c++src",
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: false,
    autoCloseBrackets: true,
  });
  const cmWrap = document.getElementById("cmWrapper");
  codeEditor.setSize("100%", cmWrap.offsetHeight + "px");

  // apply saved theme
  const saved = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(saved);

  // Load solved state for this topic
  solved = new Set(JSON.parse(localStorage.getItem(SOLVED_KEY()) || "[]"));

  // load topic data
  try {
    document.getElementById("loadingText").textContent =
      `Loading ${topicParam} problems...`;
    const { problems: p, config: c } = await loadTopicData(topicParam);
    problems = p;
    topicConfig = c;

    // update page title and breadcrumb
    document.title = `${c.name} - Level 3 | CODEANIME`;
    document.getElementById("sidebarTitle").textContent = `${c.name} Problems`;
    document.getElementById("levelBadge").textContent = c.level || "Problems";
    const topicLink = document.getElementById("breadcrumbTopicLink");
    topicLink.textContent = c.name;
    topicLink.href = c.backLink || "topics.html";

    // Hide loading, show app
    document.getElementById("loadingScreen").classList.add("hidden");

    // Render
    renderProblemList();
    loadProblem(problems[0]);
    setTimeout(refreshCM, 100);
    checkServerStatus();
    setInterval(checkServerStatus, 10000);
  } catch (err) {
    document.getElementById("loadingText").textContent = `❌ ${err.message}`;
    console.error(err);
  }
});

/*
   SERVER STATUS
*/
async function checkServerStatus() {
  try {
    const res = await fetch(`${SERVER_URL}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await res.json();
    serverOnline = true;
    const badge = document.getElementById("serverStatus");
    const text = document.getElementById("serverStatusText");
    badge.className = "server-status online";
    const available = Object.entries(data.languages)
      .filter(([, v]) => v)
      .map(([k]) => k.toUpperCase())
      .join(" · ");
    text.textContent = `Server Online · ${available}`;
  } catch (e) {
    serverOnline = false;
    document.getElementById("serverStatus").className = "server-status offline";
    document.getElementById("serverStatusText").textContent = "Server Offline";
  }
}

/*
   THEME
*/
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
  if (codeEditor)
    codeEditor.setOption(
      "theme",
      t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean",
    );
}
document.getElementById("themeToggle").addEventListener("click", () => {
  const cur = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(cur) + 1) % 3]);
});

/* 
   PROBLEM LIST
*/
function renderProblemList() {
  const list = document.getElementById("problemList");
  list.innerHTML = "";
  const toShow = problems
    .filter((p) => currentFilter === "all" || p.difficulty === currentFilter)
    .filter((p) => {
      if (!currentSearch) return true;
      return (
        p.title.toLowerCase().includes(currentSearch) ||
        p.difficulty.toLowerCase().includes(currentSearch) ||
        p.pattern.toLowerCase().includes(currentSearch) ||
        p.companies.some((c) => c.toLowerCase().includes(currentSearch))
      );
    });
  toShow.forEach((p) => {
    const item = document.createElement("div");
    item.className =
      "prob-item" +
      (currentProblem && p.id === currentProblem.id ? " active" : "");
    item.onclick = () => loadProblem(p);
    item.innerHTML = `
      <div class="prob-num">${p.id}.</div>
      <div class="prob-info">
        <div class="prob-title">${p.title}</div>
        <div class="prob-meta">
          <span class="diff-badge diff-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
          ${p.companies
            .slice(0, 2)
            .map((c) => `<span class="prob-company">${c}</span>`)
            .join("")}
        </div>
      </div>
      ${solved.has(p.id) ? '<div class="prob-solved">✓</div>' : ""}
    `;
    list.appendChild(item);
  });
}

function filterProblems(f, btn) {
  currentFilter = f;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderProblemList();
}
let currentSearch = "";

function searchProblems(query) {
  currentSearch = query.toLowerCase().trim();
  renderProblemList();
}

/* 
   LOAD PROBLEM
 */
function loadProblem(p) {
  currentProblem = p;
  renderProblemList();
  renderProblemContent(p);
  loadCode(currentLang);
  renderTestCases(p);
  clearResult();
  closeOverlay("hintOverlay");
  closeOverlay("solOverlay");
}

function renderProblemContent(p) {
  document.getElementById("problemContent").innerHTML = `
    <div class="prob-header">
      <div class="prob-title-main">${p.id}. ${p.title}</div>
      <div class="prob-tags-row">
        <span class="diff-badge diff-${p.difficulty.toLowerCase()}" style="font-size:.8rem;padding:.3rem .9rem">${p.difficulty}</span>
        ${p.companies.map((c) => `<span class="tag-pill tag-company">${c}</span>`).join("")}
        <span class="tag-pill tag-pattern">${p.pattern}</span>
      </div>
      <div class="prob-stats">
        <div class="prob-stat"><div class="prob-stat-val">${p.accuracy}</div><div class="prob-stat-lbl">Accuracy</div></div>

      </div>
    </div>
    <div class="section-label">Problem Statement</div>
    <div class="prob-desc">${p.description}</div>
    <div class="section-label">Examples</div>
    ${p.examples
      .map(
        (ex, i) => `
      <div class="example-block">
        <div class="example-label">Example ${i + 1}</div>
        <div class="example-io">
          <div><span class="io-key">Input: </span><span class="io-val">${ex.input}</span></div>
          <div><span class="io-key">Output: </span><span class="io-val">${ex.output}</span></div>
        </div>
        ${ex.explain ? `<div class="example-explain">💬 ${ex.explain}</div>` : ""}
      </div>
    `,
      )
      .join("")}
    <div class="section-label">Constraints</div>
    <div class="constraints-box">
      ${p.constraints.map((c) => `<div class="constraint-item">• ${c}</div>`).join("")}
    </div>
    <div class="approach-box" style="margin-top:1.2rem">
      <div class="approach-title">🧩 Approach Pattern</div>
      <div class="approach-text">This problem uses the <strong style="color:var(--primary-cyan)">${p.pattern}</strong> pattern.</div>
    </div>
    <div class="realworld-box">
      <div class="realworld-icon">🌍</div>
      <div class="realworld-text"><strong>Real World:</strong> ${p.realWorld}</div>
    </div>
  `;
}

/* 
   CODE EDITOR
 */
const modeMap = {
  cpp: "text/x-c++src",
  python: "text/x-python",
  java: "text/x-java",
  javascript: "text/javascript",
};

document.querySelectorAll(".lang-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".lang-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentLang = tab.dataset.lang;
    loadCode(currentLang);
  });
});

function loadCode(lang) {
  const code =
    currentProblem.starterCode[lang] || `// No starter code for ${lang} yet`;
  codeEditor.setOption("mode", modeMap[lang]);
  codeEditor.setValue(code);
  clearResult();
}

/* 
   TEST CASES
 */
function renderTestCases(p, results) {
  const el = document.getElementById("testCasesList");
  el.innerHTML = "";
  p.testCases.forEach((tc, i) => {
    const r = results ? results[i] : null;
    let statusHtml = '<span class="tc-pending">○ Not run</span>';
    if (r === "pass") statusHtml = '<span class="tc-pass">✓ Passed</span>';
    if (r === "fail") statusHtml = '<span class="tc-fail">✗ Failed</span>';
    if (r === "error") statusHtml = '<span class="tc-fail">⚠ Error</span>';
    el.innerHTML += `
      <div class="test-case">
        <div><div class="tc-label">Input</div><div class="tc-val">${tc.input}</div></div>
        <div><div class="tc-label">Expected</div><div class="tc-val">${tc.expected}</div></div>
        <div class="tc-status">${statusHtml}</div>
      </div>
    `;
  });
}

function switchBottom(tab, btn) {
  document
    .querySelectorAll(".bottom-tab")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("tab-testcases").style.display =
    tab === "testcases" ? "" : "none";
  document.getElementById("tab-output").style.display =
    tab === "output" ? "" : "none";
}

/* 
   JS IN-BROWSER FALLBACK
 */
function runJSInBrowser(userCode, jsTestCall, input) {
  const cleanCode = userCode
    .split("\n")
    .filter((l) => {
      const t = l.trim();
      return (
        !t.includes("require('fs')") &&
        !t.includes("readFileSync") &&
        !t.includes("process.stdin") &&
        !t.startsWith("const s =") &&
        !t.startsWith("console.log(")
      );
    })
    .join("\n");
  const callExpr = jsTestCall.replace("__INPUT__", JSON.stringify(input));
  try {
    const result = new Function(`${cleanCode}\nreturn (${callExpr});`)();
    return { got: String(result ?? "").trim(), errored: false };
  } catch (e) {
    return { got: e.message, errored: true };
  }
}

/* 
   RUN CODE
 */
async function runCode() {
  const btn = document.getElementById("runBtn");
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Running';
  clearResult();
  switchBottom("output", document.querySelectorAll(".bottom-tab")[1]);

  const outputEl = document.getElementById("outputArea");
  const userCode = codeEditor.getValue().trim();
  const results = [];

  if (
    !userCode ||
    userCode === (currentProblem.starterCode[currentLang] || "").trim()
  ) {
    outputEl.innerHTML = `<span class="out-line-warn">⚠ Write your solution first, then click Run.</span>`;
    btn.disabled = false;
    btn.innerHTML = "▶ Run";
    return;
  }

  // server offline fallback
  if (!serverOnline) {
    if (currentLang === "javascript") {
      outputEl.innerHTML = `<span class="out-line-warn">⚠ Server offline — running JS in browser</span><br>`;
      let allPass = true;
      for (let i = 0; i < currentProblem.testCases.length; i++) {
        const tc = currentProblem.testCases[i];
        const { got, errored } = runJSInBrowser(
          userCode,
          currentProblem.jsTestCall,
          tc.input,
        );
        const pass = !errored && got === tc.expected.trim();
        results.push(errored ? "error" : pass ? "pass" : "fail");
        if (!pass) allPass = false;
        outputEl.innerHTML += errored
          ? `<span class="out-line-error">Test ${i + 1}: ✗ Error — ${escHtml(got)}</span><br>`
          : `<span class="${pass ? "out-line-success" : "out-line-error"}">Test ${i + 1}: ${pass ? "✓ PASS" : `✗ FAIL  got <b>"${escHtml(got)}"</b>  expected <b>"${tc.expected}"</b>`}</span><br>`;
      }
      showResult(allPass ? "accepted" : "wrong");
      if (allPass) markSolved(currentProblem.id);
    } else {
      outputEl.innerHTML = `
        <span class="out-line-error">❌ Server offline. Cannot run ${currentLang.toUpperCase()} code.</span><br><br>
        <span class="out-line-warn">Start server:</span><br>
        <span class="out-line-info">&nbsp;&nbsp;cd your-project-folder</span><br>
        <span class="out-line-info">&nbsp;&nbsp;node server.js</span><br><br>
        <span class="out-line-warn">💡 Switch to JS tab to run without server.</span>
      `;
      showResult("error");
    }
    renderTestCases(currentProblem, results);
    btn.disabled = false;
    btn.innerHTML = "▶ Run";
    return;
  }

  outputEl.innerHTML = `<span class="out-line-info">⚡ Executing...</span><br>`;

  try {
    let allPass = true;
    for (let i = 0; i < currentProblem.testCases.length; i++) {
      const tc = currentProblem.testCases[i];
      let data;
      try {
        const resp = await fetch(`${SERVER_URL}/execute`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: userCode,
            language: currentLang,
            stdin: tc.input,
          }),
        });
        data = await resp.json();
      } catch (fetchErr) {
        serverOnline = false;
        outputEl.innerHTML = `<span class="out-line-error">❌ Lost connection to server.</span>`;
        showResult("error");
        btn.disabled = false;
        btn.innerHTML = "▶ Run";
        return;
      }

      const stdout = (data.stdout || "").trim();
      const stderr = (data.stderr || "").trim();
      const compErr = (data.compile_output || "").trim();
      const exitCode = data.exitCode ?? 0;

      if (i === 0) outputEl.innerHTML = "";

      if (compErr) {
        const cleaned = compErr
          .replace(/\/tmp\/[^\s:]+:/g, "")
          .trim()
          .slice(0, 600);
        outputEl.innerHTML =
          `<span class="out-line-error">❌ Compilation Error</span><br><br>` +
          `<pre style="color:var(--primary-red);white-space:pre-wrap;font-size:.78rem;line-height:1.6">${escHtml(cleaned)}</pre>`;
        results.push("error");
        showResult("error");
        renderTestCases(currentProblem, results);
        btn.disabled = false;
        btn.innerHTML = "▶ Run";
        return;
      }

      if (exitCode !== 0 && !stdout) {
        results.push("error");
        allPass = false;
        const errMsg =
          stderr.slice(0, 300) || `Process exited with code ${exitCode}`;
        outputEl.innerHTML += `<span class="out-line-error">Test ${i + 1}: ✗ Runtime Error — ${escHtml(errMsg.split("\n")[0])}</span><br>`;
        if (stderr.includes("\n"))
          outputEl.innerHTML += `<pre style="color:var(--primary-red);white-space:pre-wrap;font-size:.75rem;line-height:1.5;margin-left:1rem">${escHtml(stderr.slice(0, 300))}</pre>`;
        continue;
      }

      const normalize = (s) => s.replace(/\s+/g, " ").trim();
      const pass = normalize(stdout) === normalize(tc.expected);
      results.push(pass ? "pass" : "fail");
      if (!pass) allPass = false;
      outputEl.innerHTML += `<span class="${pass ? "out-line-success" : "out-line-error"}">Test ${i + 1}: ${
        pass
          ? "✓ PASS"
          : `✗ FAIL  got <b>"${escHtml(stdout)}"</b>  expected <b>"${tc.expected}"</b>`
      }</span><br>`;
      if (stderr && !pass)
        outputEl.innerHTML += `<pre style="color:var(--primary-orange);white-space:pre-wrap;font-size:.73rem;line-height:1.5;margin-left:1rem;margin-bottom:.5rem">${escHtml(stderr.slice(0, 200))}</pre>`;
    }
    showResult(allPass ? "accepted" : "wrong");
    if (allPass) markSolved(currentProblem.id);
  } catch (e) {
    outputEl.innerHTML += `<span class="out-line-error">Unexpected error: ${escHtml(e.message)}</span>`;
    showResult("error");
  }

  renderTestCases(currentProblem, results);
  btn.disabled = false;
  btn.innerHTML = "▶ Run";
}

async function submitCode() {
  await runCode();
}

function showResult(type) {
  const banner = document.getElementById("resultBanner");
  banner.className = "result-banner " + type;
  if (type === "accepted")
    banner.innerHTML = "🎉 Accepted — All test cases passed!";
  else if (type === "wrong")
    banner.innerHTML = "✗ Wrong Answer — Some test cases failed.";
  else banner.innerHTML = "⚠ Error — Check your code.";
}
function clearResult() {
  document.getElementById("resultBanner").className = "result-banner";
}
function markSolved(id) {
  solved.add(id);
  localStorage.setItem(SOLVED_KEY(), JSON.stringify([...solved]));
  renderProblemList();
}

function showHint() {
  document.getElementById("hintContent").innerHTML = currentProblem.hint;
  document.getElementById("hintOverlay").classList.add("show");
}
function showSolution() {
  const sol =
    currentProblem.solution[currentLang] ||
    currentProblem.solution["cpp"] ||
    "Not available.";
  document.getElementById("solContent").innerHTML = `
    <div style="background:var(--code-bg);border:1px solid var(--border-color);border-radius:10px;padding:1rem 1.2rem;margin-bottom:.8rem">
      <div style="font-size:.72rem;color:var(--primary-orange);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:.6rem">${currentLang.toUpperCase()}</div>
      <pre style="font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--text-primary);white-space:pre-wrap;line-height:1.7">${escHtml(sol)}</pre>
    </div>
    <button onclick="applySolution()" style="background:var(--primary-orange);color:#000;border:none;padding:.5rem 1.2rem;border-radius:7px;font-weight:700;cursor:pointer;font-size:.82rem">📋 Copy to Editor</button>
  `;
  document.getElementById("solOverlay").classList.add("show");
}
function applySolution() {
  codeEditor.setValue(
    currentProblem.solution[currentLang] ||
      currentProblem.solution["cpp"] ||
      "",
  );
  closeOverlay("solOverlay");
}
function closeOverlay(id) {
  document.getElementById(id).classList.remove("show");
}
function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

let sidebarVisible = true;
function toggleSidebar() {
  sidebarVisible = !sidebarVisible;
  const layout = document.getElementById("appLayout");
  const btn = document.getElementById("sidebarToggle");
  layout.classList.toggle("sidebar-hidden", !sidebarVisible);
  btn.textContent = sidebarVisible ? "‹" : "›";
  setTimeout(refreshCM, 320);
}
function refreshCM() {
  const cmWrap = document.getElementById("cmWrapper");
  if (cmWrap && codeEditor) {
    codeEditor.setSize("100%", cmWrap.offsetHeight + "px");
    codeEditor.refresh();
  }
}
window.addEventListener("resize", refreshCM);
