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

/* ═══ BROWSER HISTORY DEMO ═══ */
let backStack = ["google.com"];
let fwdStack = [];

function renderHistory() {
  const el = document.getElementById("historyStack");
  el.innerHTML = "";
  const display = [...backStack].reverse().slice(0, 4);
  display.forEach((url, i) => {
    const div = document.createElement("div");
    div.className = "history-item" + (i === 0 ? " current" : "");
    div.innerHTML = `
    <span>${i === 0 ? "▶" : "  "}</span>
    <span>${url}</span>${i === 0
         ?
         '<span style="margin-left:auto;font-size:.65rem;color:var(--primary-cyan)">← current</span>' 
         :
          ""
    }`;
    el.appendChild(div);
  });
  document.getElementById("browserUrl").textContent =
    backStack[backStack.length - 1];
  document.getElementById("btnBack").disabled = backStack.length <= 1;
  document.getElementById("btnFwd").disabled = fwdStack.length === 0;
}

function browserVisit(url) {
  fwdStack = [];
  backStack.push(url);
  renderHistory();
}
function browserBack() {
  if (backStack.length > 1) {
    fwdStack.push(backStack.pop());
    renderHistory();
  }
}
function browserFwd() {
  if (fwdStack.length > 0) {
    backStack.push(fwdStack.pop());
    renderHistory();
  }
}
renderHistory();


let editorText = "Hello";
let undoStack = [];
let redoStack = [];

function updateEditor() {
  document.getElementById("editorArea").textContent = editorText;
  document.getElementById("undoSize").textContent = undoStack.length;
  document.getElementById("redoSize").textContent = redoStack.length;
  document.getElementById("btnUndo").disabled = undoStack.length === 0;
  document.getElementById("btnRedo").disabled = redoStack.length === 0;
}
function typeWord(word) {
  undoStack.push(editorText);
  redoStack = [];
  editorText += word;
  updateEditor();
}
function undoAction() {
  if (undoStack.length > 0) {
    redoStack.push(editorText);
    editorText = undoStack.pop();
    updateEditor();
  }
}
function redoAction() {
  if (redoStack.length > 0) {
    undoStack.push(editorText);
    editorText = redoStack.pop();
    updateEditor();
  }
}
updateEditor();


function validateLive() {
  const input = document.getElementById("valInput").value;
  if (input) validateBrackets();
  else {
    document.getElementById("valSteps").innerHTML = "";
    document.getElementById("valResult").style.display = "none";
  }
}

function validateBrackets() {
  const input = document.getElementById("valInput").value;
  const stepsEl = document.getElementById("valSteps");
  const resultEl = document.getElementById("valResult");
  stepsEl.innerHTML = "";
  const stack = [];
  const match = { ")": "(", "}": "{", "]": "[" };
  const colors = {
    "(": "#06b6d4",
    ")": "#06b6d4",
    "{": "#10b981",
    "}": "#10b981",
    "[": "#8b5cf6",
    "]": "#8b5cf6",
  };
  let valid = true;
  for (const c of input) {
    if ("({[".includes(c)) {
      stack.push(c);
    } else if (")}]".includes(c)) {
      if (!stack.length || stack[stack.length - 1] !== match[c]) {
        valid = false;
        break;
      }
      stack.pop();
    }
  }
  if (stack.length > 0) valid = false;
 
  const finalStack = [];
  for (const c of input) {
    if ("({[".includes(c)) finalStack.push(c);
    else if (")}]".includes(c) && finalStack.length) finalStack.pop();
  }
  if (finalStack.length === 0 && valid) {
    stepsEl.innerHTML = `<span style="color:var(--primary-green);font-size:.78rem">Stack empty ✓ — all brackets matched</span>`;
  } else {
    finalStack.forEach((c) => {
      const span = document.createElement("span");
      span.className = "val-step";
      span.style.cssText = `background:rgba(255,255,255,.06);color:${colors[c] || "#fff"};border:1px solid ${colors[c] || "#444"}40;`;
      span.textContent = c;
      stepsEl.appendChild(span);
    });
  }
  resultEl.style.display = "block";
  resultEl.className = "val-result " + (valid ? "ok" : "err");
  resultEl.textContent = valid
    ? "✅ Valid — All brackets are properly matched!"
    : "❌ Invalid — Mismatched or unclosed brackets found";
}


function evalExpr(expr) {
  document.getElementById("exprDisplay").textContent = expr;
  document.getElementById("exprResult").textContent = "";
  const numEl = document.getElementById("numStack");
  const opEl = document.getElementById("opStack");
  numEl.innerHTML =
    '<span style="color:var(--text-secondary);font-size:.75rem">processing...</span>';
  opEl.innerHTML =
    '<span style="color:var(--text-secondary);font-size:.75rem">processing...</span>';
  
  try {
    const result = Function(
      '"use strict";return (' +
        expr.replace(/×/g, "*").replace(/−/g, "-") +
        ")",
    )();
 
    const tokens = expr.split(" ");
    const nums = tokens.filter((t) => !isNaN(t) && t !== "");
    const ops = tokens.filter((t) => isNaN(t) && t !== "");
    setTimeout(() => {
      numEl.innerHTML = nums
        .map((n) => `<span class="mini-stack-item">${n}</span>`)
        .join("");
      opEl.innerHTML = ops
        .map(
          (o) =>
            `<span class="mini-stack-item" style="background:rgba(139,92,246,.15);color:var(--primary-purple);border-color:rgba(139,92,246,.3)">${o}</span>`,
        )
        .join("");
    }, 300);
    setTimeout(() => {
      document.getElementById("exprResult").textContent = "= " + result;
      numEl.innerHTML = `<span class="mini-stack-item" style="background:rgba(16,185,129,.15);color:var(--primary-green);border-color:rgba(16,185,129,.3)">${result}</span>`;
      opEl.innerHTML =
        '<span style="color:var(--text-secondary);font-size:.75rem">empty ✓</span>';
    }, 900);
  } catch (e) {}
}


let callStack = [];
const frameColors = [
  {
    bg: "rgba(6,182,212,.12)",
    border: "rgba(6,182,212,.3)",
    color: "var(--primary-cyan)",
  },
  {
    bg: "rgba(16,185,129,.12)",
    border: "rgba(16,185,129,.3)",
    color: "var(--primary-green)",
  },
  {
    bg: "rgba(139,92,246,.12)",
    border: "rgba(139,92,246,.3)",
    color: "var(--primary-purple)",
  },
  {
    bg: "rgba(245,158,11,.12)",
    border: "rgba(245,158,11,.3)",
    color: "var(--primary-orange)",
  },
  {
    bg: "rgba(239,68,68,.12)",
    border: "rgba(239,68,68,.3)",
    color: "var(--primary-red)",
  },
];

function renderCallStack() {
  const el = document.getElementById("callStackViz");
  el.innerHTML = "";
  if (callStack.length === 0) {
    el.innerHTML =
      '<div style="text-align:center;color:var(--text-secondary);font-size:.8rem;padding:1rem">Stack is empty — call a function</div>';
    return;
  }
  callStack.forEach((fn, i) => {
    const c = frameColors[i % frameColors.length];
    const div = document.createElement("div");
    div.className = "frame";
    div.style.cssText = `background:${c.bg};border:1px solid ${c.border};color:${c.color};`;
    div.innerHTML = `<span>${fn}</span><span class="frame-tag">${i === callStack.length - 1 ? "← TOP" : "frame " + (i + 1)}</span>`;
    el.appendChild(div);
  });
}

function callFn(name) {
  if (callStack.length >= 5) {
    alert("⚠️ Stack Overflow! Too many nested calls without returning.");
    return;
  }
  callStack.push(name);
  renderCallStack();
}
function returnFn() {
  if (callStack.length > 0) {
    callStack.pop();
    renderCallStack();
  }
}
renderCallStack();


const MAZE = [
  [0, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 0, 2],
];

let mazePos = { r: 0, c: 0 };
let mazePath = [{ r: 0, c: 0 }];

function renderMaze() {
  const grid = document.getElementById("mazeGrid");
  grid.innerHTML = "";
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      const cell = document.createElement("div");
      const isPlayer = mazePos.r === r && mazePos.c === c;
      const inPath = mazePath.some((p) => p.r === r && p.c === c) && !isPlayer;
      const isWall = MAZE[r][c] === 1;
      const isGoal = MAZE[r][c] === 2;

      cell.style.cssText = `
        width:100%;aspect-ratio:1;border-radius:5px;
        display:flex;align-items:center;justify-content:center;
        font-size:.85rem;transition:all .2s;
        background:${isPlayer ?  "var(--primary-green)" 
            : isGoal 
            ? "rgba(245,158,11,.2)" 
            : isWall
            ? "rgba(255,255,255,.08)"
            : inPath 
            ?"rgba(6,182,212,.15)" 
            : "rgba(255,255,255,.03)"
        };
        border:1px solid ${isPlayer 
            ? "var(--primary-green)" 
            : isGoal 
            ? "rgba(245,158,11,.4)" 
            : isWall 
            ? "rgba(255,255,255,.1)" 
            : inPath 
            ? "rgba(6,182,212,.3)" 
            : "rgba(255,255,255,.06)"
        };
        color:${isWall ? "var(--text-secondary)" : "var(--text-primary)"};
      `;

      cell.textContent = isPlayer
        ? "🧭"
        : isGoal
          ? "🏁"
          : isWall
            ? "█"
            : inPath
              ? "·"
              : "";
      grid.appendChild(cell);
    }
  }

  document.getElementById("mazeStackSize").textContent = mazePath.length;

  if (mazePos.r === 3 && mazePos.c === 5) {
    document.getElementById("mazeStatus").textContent =
      "🎉 Goal reached! Stack had " + mazePath.length + " steps";
    document.getElementById("mazeStatus").style.color = "var(--primary-green)";
  }
}

function mazeMove(dir) {
  let { r, c } = mazePos;

  if (dir === "up") r--;
  if (dir === "down") r++;
  if (dir === "left") c--;
  if (dir === "right") c++;

  if (r < 0 || r > 3 || c < 0 || c > 5) return;

  if (MAZE[r][c] === 1) {
    document.getElementById("mazeStatus").textContent =
      "🧱 Wall! Try another direction";
    document.getElementById("mazeStatus").style.color = "var(--primary-red)";
    return;
  }

  mazePos = { r, c };
  mazePath.push({ r, c });

  document.getElementById("mazeStatus").textContent =
    `Navigate to reach 🏁 (${mazePath.length} steps)`;
  document.getElementById("mazeStatus").style.color = "var(--text-secondary)";

  renderMaze();
}

function mazeBacktrack() {
  if (mazePath.length > 1) {
    mazePath.pop();
    mazePos = { ...mazePath[mazePath.length - 1] };
    document.getElementById("mazeStatus").textContent =
      `↩ Backtracked! (${mazePath.length} steps)`;
    document.getElementById("mazeStatus").style.color = "var(--primary-orange)";
    renderMaze();
  }
}

function mazeReset() {
  mazePos = { r: 0, c: 0 };
  mazePath = [{ r: 0, c: 0 }];
  document.getElementById("mazeStatus").textContent = "Navigate to reach 🏁";
  document.getElementById("mazeStatus").style.color = "var(--text-secondary)";
  renderMaze();
}

renderMaze();
