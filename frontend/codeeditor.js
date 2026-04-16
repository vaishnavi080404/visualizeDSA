const SERVER = window.location.origin;

const STARTERS = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;
    cout << "You entered: " << n << endl;
    cout << "Square: " << n * n << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    printf("You entered: %d\\n", n);
    printf("Square: %d\\n", n * n);
    return 0;
}`,
  python: `n = int(input("Enter a number: "))
print(f"You entered: {n}")
print(f"Square: {n * n}")`,
  java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        System.out.println("You entered: " + n);
        System.out.println("Square: " + (n * n));
    }
}`,

  javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];

rl.on('line', line => lines.push(line));
rl.on('close', () => {
  let idx = 0;
  const input = () => lines[idx++];

  const n = parseInt(input());
  console.log("You entered: " + n);
  console.log("Square: " + (n * n));
});`,
};

const LANG_MODES = {
  cpp: "text/x-c++src",
  c: "text/x-csrc",
  python: "text/x-python",
  java: "text/x-java",
  javascript: "text/javascript",
};

let currentLang = "cpp";
let editor = null;
let isRunning = false;
let collectedInputs = [];
let activeInputEl = null;

const term = () => document.getElementById("terminal");

function tLine(html, cls = "") {
  const div = document.createElement("div");
  if (cls) div.className = cls;
  div.innerHTML = html;
  term().appendChild(div);
  scrollTerm();
}

function scrollTerm() {
  const t = term();
  t.scrollTop = t.scrollHeight;
}

function clearTerminal() {
  term().innerHTML = "";
  collectedInputs = [];
  activeInputEl = null;
}

function focusActiveInput() {
  if (activeInputEl) activeInputEl.focus();
}

function askUser(promptText) {
  return new Promise((resolve) => {
    const row = document.createElement("div");
    row.className = "input-row";

    const span = document.createElement("span");
    span.className = "prompt-text";
    span.textContent = promptText;
    row.appendChild(span);

    const inp = document.createElement("input");
    inp.type = "text";
    inp.autocomplete = "off";
    inp.spellcheck = false;
    inp.setAttribute("autocorrect", "off");
    row.appendChild(inp);

    term().appendChild(row);
    scrollTerm();

    activeInputEl = inp;
    inp.focus();

    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const val = inp.value;
        row.remove();
        // Show the prompt + typed value as a frozen line
        tLine(
          escHtml(promptText) +
            '<span class="t-input-line">' +
            escHtml(val) +
            "</span>",
          "t-prompt",
        );
        activeInputEl = null;
        resolve(val);
      }
    });
  });
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* 
   RUN PROGRAM
   Flow:
     1. /analyze  → get prompts array
     2. Ask user interactively for each prompt
     3. /execute  → run with all stdin joined
     4. renderOutput → show result
 */
async function runProgram() {
  if (isRunning) return;

  const code = editor.getValue().trim();
  if (!code) {
    tLine("⚠ No code to run.", "t-warn");
    return;
  }

  const online = await checkServer(false);
  if (!online) {
    tLine("❌ Server offline. Start it with: <b>node server.js</b>", "t-error");
    return;
  }

  setRunning(true);
  collectedInputs = [];

  tLine("─".repeat(48), "t-dim");
  tLine(
    `<span class="spinner"></span>Analyzing <b>${currentLang.toUpperCase()}</b>...`,
    "t-system",
  );

  /* STEP 1 — analyze */
  let prompts = [];
  try {
    const ar = await fetch(`${SERVER}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language: currentLang }),
    });
    const ad = await ar.json();
    prompts = ad.prompts || [];
  } catch (e) {
    prompts = [];
  }

  // Remove the "Analyzing..." line
  const t = term();
  if (t.lastChild) t.removeChild(t.lastChild);

  /* STEP 2 — Collect inputs interactively */
  if (prompts.length > 0) {
    tLine("▶ Program started — enter inputs below:", "t-system");

    for (let i = 0; i < prompts.length; i++) {
      if (!isRunning) return; // killed
      const userVal = await askUser(prompts[i]);
      collectedInputs.push(userVal);
    }
    tLine("", "");
  } else {
    tLine(`▶ Running <b>${currentLang.toUpperCase()}</b>...`, "t-system");
  }

  setStatus("Running...");

  /* STEP 3 — execute */
  const stdin = collectedInputs.join("\n");
  let data;
  try {
    const resp = await fetch(`${SERVER}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language: currentLang, stdin }),
    });
    data = await resp.json();
  } catch (e) {
    tLine("❌ Network error: " + e.message, "t-error");
    setRunning(false);
    return;
  }

  /* STEP 4 — render */
  renderOutput(data);
  setRunning(false);
}

/* 
   RENDER OUTPUT
   
 */
function renderOutput(data) {
  if (data.compile_error) {
    tLine("── Compilation Error ──", "t-warn");
    data.compile_error.split("\n").forEach((l) => {
      if (l.trim()) tLine(escHtml(l), "t-compile");
    });
    tLine("");
    setStatus("Compile Error");
    return;
  }

  const rawOut = (data.stdout || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  if (collectedInputs.length === 0) {
    // No inputs — show everything
    if (rawOut.trim()) {
      rawOut.split("\n").forEach((line) => tLine(escHtml(line), "t-output"));
    }
  } else {
    const inputsAppearsInOutput = collectedInputs.some(
      (v) => v !== "" && rawOut.includes(v),
    );

    let resultPart = rawOut;

    if (inputsAppearsInOutput) {
      // C/C++ style: walk through stdout, skip past prompt+echo pairs
      let pos = 0;
      let ok = true;
      for (const val of collectedInputs) {
        if (!ok) break;
        const idx = rawOut.indexOf(val, pos);
        if (idx === -1) {
          ok = false;
          break;
        }
        pos = idx + val.length;
        if (rawOut[pos] === "\n") pos++;
        else if (rawOut[pos] === "\r" && rawOut[pos + 1] === "\n") pos += 2;
      }
      resultPart = ok ? rawOut.slice(pos) : rawOut;
    }

    if (resultPart.trim()) {
      tLine("── Output ──", "t-dim");
      resultPart.split("\n").forEach((line) => {
        if (line !== "") tLine(escHtml(line), "t-output");
      });
    } else if (!data.stderr) {
      tLine("(Program produced no output)", "t-dim");
    }
  }

  if (data.stderr && data.stderr.trim()) {
    tLine("── Runtime Error ──", "t-warn");
    data.stderr.split("\n").forEach((l) => {
      if (l.trim()) tLine(escHtml(l), "t-error");
    });
  }

  if (!rawOut.trim() && !data.stderr?.trim() && !data.compile_error) {
    tLine("(Program exited with no output)", "t-dim");
  }

  const ok2 = data.exitCode === 0;
  tLine(
    `<span style="color:${ok2 ? "#10b981" : "#ef4444"};font-size:.72rem;">── Exited with code ${data.exitCode} ──</span>`,
    "",
  );
  tLine("");
  setStatus(ok2 ? "Done ✓" : `Exit ${data.exitCode}`);
}

/*
   KILL / STOP
*/
function killProgram() {
  if (isRunning) {
    isRunning = false;
    document.querySelectorAll(".input-row").forEach((r) => r.remove());
    activeInputEl = null;
    tLine("⛔ Program killed.", "t-warn");
    setRunning(false);
  } else {
    clearTerminal();
  }
}

/* 
   UI STATE
 */
function setRunning(state) {
  isRunning = state;
  const btn = document.getElementById("runBtn");
  btn.disabled = state;
  btn.innerHTML = state ? '<span class="spinner"></span>Running' : "▶ Run";
  if (!state) setStatus("Ready");
}

function setStatus(msg) {
  document.getElementById("sb-state").textContent = msg;
}

/* 
   SERVER HEALTH CHECK
 */
async function checkServer(log = true) {
  try {
    const r = await fetch(`${SERVER}/health`, {
      signal: AbortSignal.timeout(2500),
    });
    const ok = r.ok;
    const badge = document.getElementById("serverBadge");
    badge.className = "server-badge " + (ok ? "online" : "offline");
    document.getElementById("serverText").textContent = ok
      ? "Server Online"
      : "Server Offline";
    return ok;
  } catch (e) {
    document.getElementById("serverBadge").className = "server-badge offline";
    document.getElementById("serverText").textContent = "Server Offline";
    return false;
  }
}

/*
   LANGUAGE SWITCHING
*/
document.querySelectorAll(".lang-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    if (isRunning) return;
    document
      .querySelectorAll(".lang-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentLang = tab.dataset.lang;
    editor.setOption("mode", LANG_MODES[currentLang]);
    editor.setValue(STARTERS[currentLang] || "");
    document.getElementById("sb-lang").innerHTML =
      `<span class="status-dot" style="background:var(--primary-cyan);"></span>${currentLang.toUpperCase()}`;
    const t = localStorage.getItem("dsa-theme") || "dark";
    editor.setOption("theme", getCMTheme(t));
  });
});

/*    THEME
 */
const THEMES = ["dark", "light", "blue"];
const THEME_ICONS = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

function getCMTheme(t) {
  return t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean";
}

function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIcon").innerHTML = THEME_ICONS[t];
  localStorage.setItem("dsa-theme", t);
  if (editor) editor.setOption("theme", getCMTheme(t));
}

document.getElementById("themeToggle").addEventListener("click", () => {
  const cur = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(THEMES[(THEMES.indexOf(cur) + 1) % 3]);
});

window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";

  editor = CodeMirror.fromTextArea(document.getElementById("codeArea"), {
    lineNumbers: true,
    theme: getCMTheme(savedTheme),
    mode: LANG_MODES[currentLang],
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    autoCloseBrackets: true,
    matchBrackets: true,
    lineWrapping: false,
    extraKeys: {
      "Ctrl-Enter": () => runProgram(),
      "Cmd-Enter": () => runProgram(),
      Tab: (cm) => cm.replaceSelection("    "),
    },
  });

  editor.setValue(STARTERS[currentLang]);
  applyTheme(savedTheme);

  editor.on("change", () => {
    document.getElementById("sb-lines").textContent =
      "Lines: " + editor.lineCount();
  });

  tLine("CODEANIME — Interactive Terminal", "t-system");
  tLine("Press ▶ Run or Ctrl+Enter to execute your code.", "t-dim");
  tLine("");

  checkServer(false);
  setInterval(() => checkServer(false), 8000);
};
