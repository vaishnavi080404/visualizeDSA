const THEMES = ["dark", "light", "blue"];
let thIdx = 0;
document.getElementById("themeToggle").addEventListener("click", () => {
  thIdx = (thIdx + 1) % THEMES.length;
  document.body.setAttribute("data-theme", THEMES[thIdx]);
  if (codeEditor)
    codeEditor.setOption(
      "theme",
      { dark: "material-ocean", light: "eclipse", blue: "nord" }[THEMES[thIdx]],
    );
});

const COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#a78bfa",
];

function buildChars(containerId, str, stateMap = {}, showIdx = true) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  [...str].forEach((ch, i) => {
    const cell = document.createElement("div");
    cell.className = "str-cell";
    const ptr = stateMap[i + "_ptr"]
      ? `<div class="str-pointer">▼</div>`
      : `<div style="height:22px;"></div>`;
    const cls = stateMap[i] || "ch-default";
    const style =
      cls === "ch-default"
        ? `background:${COLORS[i % COLORS.length]};color:#000;`
        : "";
    cell.innerHTML = `${ptr}<div class="str-char ${cls}" style="${style}">${ch == " " ? "·" : ch}</div>${showIdx ? `<div class="str-cell-idx">[${i}]</div>` : ""}`;
    el.appendChild(cell);
  });
}

function setCaption(id, text, cls = "") {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = "str-caption" + (cls ? " " + cls : "");
}

function setBadge(id, text, cls) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = text
    ? `<div class="str-result-badge ${cls}">${text}</div>`
    : "";
}

function highlightPS(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`[data-step="${step}"]`);
  if (el) el.classList.add("active");
}

/* ════════════════════════════════════════════════════════
   MAIN VISUALIZER — OPERATION RUNNER
════════════════════════════════════════════════════════ */
let currentOp = "length";
let mainStr = "",
  mainArg = "",
  mainArg2 = "";
let stepIdx = 0,
  stepDone = false,
  stepTimer = null;
let stepData = null; // holds per-operation step state

const OP_CONTROLS = {
  length: `
    <div style="display:grid;grid-template-columns:2fr auto auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
      <input type="text" id="mc-str" class="form-control" placeholder='e.g. "hello world"' value="hello world"></div>
      <button class="btn btn-primary" id="btnStep" onclick="mainStep()" disabled>▶ Step</button>
      <button class="btn btn-warning" id="btnAuto" onclick="mainAuto()" disabled>⚡ Auto</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
      <button class="btn btn-success" onclick="mainBuild()">🔨 Build</button>
      <button class="btn btn-ghost"   onclick="mainReset()">↺ Reset</button>
    </div>`,
  search: `
    <div style="display:grid;grid-template-columns:2fr 1fr auto auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
      <input type="text" id="mc-str" class="form-control" value="hello world"></div>
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Target Char</label>
      <input type="text" id="mc-arg" class="form-control" maxlength="1" value="o" style="width:60px;"></div>
      <button class="btn btn-primary" id="btnStep" onclick="mainStep()" disabled>▶ Step</button>
      <button class="btn btn-warning" id="btnAuto" onclick="mainAuto()" disabled>⚡ Auto</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
      <button class="btn btn-success" onclick="mainBuild()">🔨 Build</button>
      <button class="btn btn-ghost"   onclick="mainReset()">↺ Reset</button>
    </div>`,
  substring: `
    <div style="display:grid;grid-template-columns:2fr 1fr auto auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
      <input type="text" id="mc-str" class="form-control" value="algorithms"></div>
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Substring</label>
      <input type="text" id="mc-arg" class="form-control" value="rit"></div>
      <button class="btn btn-primary" id="btnStep" onclick="mainStep()" disabled>▶ Step</button>
      <button class="btn btn-warning" id="btnAuto" onclick="mainAuto()" disabled>⚡ Auto</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
      <button class="btn btn-success" onclick="mainBuild()">🔨 Build</button>
      <button class="btn btn-ghost"   onclick="mainReset()">↺ Reset</button>
    </div>`,
  insert: `
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
      <input type="text" id="mc-str" class="form-control" value="helo"></div>
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Char</label>
      <input type="text" id="mc-arg" class="form-control" maxlength="1" value="l" style="width:60px;"></div>
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Index</label>
      <input type="number" id="mc-arg2" class="form-control" value="3" style="width:70px;"></div>
      <button class="btn btn-success" onclick="mainBuildInstant('insert')">▶ Run</button>
    </div>
    <button class="btn btn-ghost" style="margin-top:10px;width:100%;" onclick="mainReset()">↺ Reset</button>`,
  delete: `
    <div style="display:grid;grid-template-columns:2fr 1fr auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
      <input type="text" id="mc-str" class="form-control" value="helllo"></div>
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Index to delete</label>
      <input type="number" id="mc-arg" class="form-control" value="3" style="width:70px;"></div>
      <button class="btn btn-danger" onclick="mainBuildInstant('delete')">✂️ Delete</button>
    </div>
    <button class="btn btn-ghost" style="margin-top:10px;width:100%;" onclick="mainReset()">↺ Reset</button>`,
  same: `
    <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String 1</label>
      <input type="text" id="mc-str" class="form-control" value="code"></div>
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String 2</label>
      <input type="text" id="mc-arg" class="form-control" value="code"></div>
      <button class="btn btn-primary" onclick="mainBuildInstant('same')">🔀 Check</button>
    </div>
    <button class="btn btn-ghost" style="margin-top:10px;width:100%;" onclick="mainReset()">↺ Reset</button>`,
  concat: `
    <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String 1</label>
      <input type="text" id="mc-str" class="form-control" value="hello"></div>
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String 2</label>
      <input type="text" id="mc-arg" class="form-control" value=" world"></div>
      <button class="btn btn-success" onclick="mainBuildInstant('concat')">🔗 Concat</button>
    </div>
    <button class="btn btn-ghost" style="margin-top:10px;width:100%;" onclick="mainReset()">↺ Reset</button>`,
  reverse: `
    <div style="display:grid;grid-template-columns:2fr auto auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
      <input type="text" id="mc-str" class="form-control" value="abcdef"></div>
      <button class="btn btn-primary" id="btnStep" onclick="mainStep()" disabled>▶ Step</button>
      <button class="btn btn-warning" id="btnAuto" onclick="mainAuto()" disabled>⚡ Auto</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
      <button class="btn btn-success" onclick="mainBuild()">🔨 Build</button>
      <button class="btn btn-ghost"   onclick="mainReset()">↺ Reset</button>
    </div>`,
  rotate: `
    <div style="display:grid;grid-template-columns:2fr 1fr auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
      <input type="text" id="mc-str" class="form-control" value="abcdef"></div>
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Rotate by k</label>
      <input type="number" id="mc-arg" class="form-control" value="2" style="width:70px;"></div>
      <button class="btn btn-purple" onclick="mainBuildInstant('rotate')">🔄 Rotate</button>
    </div>
    <button class="btn btn-ghost" style="margin-top:10px;width:100%;" onclick="mainReset()">↺ Reset</button>`,
  palindrome: `
    <div style="display:grid;grid-template-columns:2fr auto auto;gap:10px;align-items:end;">
      <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
      <input type="text" id="mc-str" class="form-control" value="racecar"></div>
      <button class="btn btn-primary" id="btnStep" onclick="mainStep()" disabled>▶ Step</button>
      <button class="btn btn-warning" id="btnAuto" onclick="mainAuto()" disabled>⚡ Auto</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
      <button class="btn btn-success" onclick="mainBuild()">🔨 Build</button>
      <button class="btn btn-ghost"   onclick="mainReset()">↺ Reset</button>
    </div>`,
};

function setOp(op) {
  currentOp = op;
  document
    .querySelectorAll(".op-btn")
    .forEach((b) => b.classList.toggle("active", b.dataset.op === op));
  document.getElementById("vis-title").textContent =
    {
      length: "Length of String",
      search: "Search a Character",
      substring: "Check for Substring",
      insert: "Insert a Character",
      delete: "Delete a Character",
      same: "Check for Same Strings",
      concat: "String Concatenation",
      reverse: "Reverse a String",
      rotate: "Rotate a String",
      palindrome: "Check for Palindrome",
    }[op] + " — Visualizer";
  document.getElementById("mainControls").innerHTML = OP_CONTROLS[op] || "";
  mainStr = "";
  stepIdx = 0;
  stepDone = false;
  clearTimeout(stepTimer);
  document.getElementById("mainChars").innerHTML = "";
  setCaption("mainCaption", "Build the string to begin.", "");
  setBadge("mainBadge", "", "");
}

function getInputs() {
  mainStr = (document.getElementById("mc-str") || { value: "" }).value.trim();
  mainArg = (document.getElementById("mc-arg") || { value: "" }).value.trim();
  mainArg2 = (document.getElementById("mc-arg2") || { value: "" }).value.trim();
}

function mainReset() {
  clearTimeout(stepTimer);
  stepIdx = 0;
  stepDone = false;
  stepData = null;
  document.getElementById("mainChars").innerHTML = "";
  setCaption("mainCaption", "Build the string to begin.", "");
  setBadge("mainBadge", "", "");
  const bs = document.getElementById("btnStep"),
    ba = document.getElementById("btnAuto");
  if (bs) bs.disabled = true;
  if (ba) ba.disabled = true;
}

function mainBuild() {
  getInputs();
  if (!mainStr) {
    setCaption("mainCaption", "Please enter a string!", "cap-red");
    return;
  }
  clearTimeout(stepTimer);
  stepIdx = 0;
  stepDone = false;
  buildChars("mainChars", mainStr);
  setCaption("mainCaption", `"${mainStr}" — ready. Click ▶ Step.`, "");
  setBadge("mainBadge", "", "");
  const bs = document.getElementById("btnStep"),
    ba = document.getElementById("btnAuto");
  if (bs) bs.disabled = false;
  if (ba) ba.disabled = false;
  // prepare step data
  if (currentOp === "length") stepData = { chars: [...mainStr], i: 0 };
  if (currentOp === "search")
    stepData = {
      chars: [...mainStr],
      target: mainArg[0] || "",
      i: 0,
      found: -1,
    };
  if (currentOp === "substring")
    stepData = { chars: [...mainStr], sub: mainArg, i: 0, found: -1 };
  if (currentOp === "reverse") {
    const a = [...mainStr];
    stepData = { arr: a, lo: 0, hi: a.length - 1 };
  }
  if (currentOp === "palindrome") {
    const a = [...mainStr];
    stepData = { arr: a, lo: 0, hi: a.length - 1, ok: true };
  }
}

function mainStep() {
  if (stepDone) return;
  if (currentOp === "length") doLengthStep();
  else if (currentOp === "search") doSearchStep();
  else if (currentOp === "substring") doSubStep();
  else if (currentOp === "reverse") doReverseStep();
  else if (currentOp === "palindrome") doPalinStep();
}

function mainAuto() {
  if (stepDone) return;
  const bs = document.getElementById("btnStep"),
    ba = document.getElementById("btnAuto");
  if (ba) ba.disabled = true;
  (function go() {
    if (stepDone) return;
    mainStep();
    stepTimer = setTimeout(go, 700);
  })();
}

/* LENGTH STEPS */
function doLengthStep() {
  const d = stepData;
  if (d.i < d.chars.length) {
    highlightPS("len-loop");
    const sm = {};
    for (let k = 0; k < d.i; k++) sm[k] = "ch-found";
    sm[d.i] = "ch-highlight";
    sm[d.i + "_ptr"] = true;
    buildChars("mainChars", mainStr, sm);
    setCaption(
      "mainCaption",
      `Counting index ${d.i}: '${d.chars[d.i]}' — count = ${d.i + 1}`,
      "",
    );
    d.i++;
  } else {
    highlightPS("len-ret");
    const sm = {};
    [...mainStr].forEach((_, k) => (sm[k] = "ch-found"));
    buildChars("mainChars", mainStr, sm);
    setCaption("mainCaption", `Length = ${d.chars.length}`, "cap-green");
    setBadge("mainBadge", `Length: ${d.chars.length}`, "badge-green");
    stepDone = true;
    clearTimeout(stepTimer);
    const bs = document.getElementById("btnStep"),
      ba = document.getElementById("btnAuto");
    if (bs) bs.disabled = true;
    if (ba) ba.disabled = true;
  }
}

/* SEARCH STEPS */
function doSearchStep() {
  const d = stepData;
  if (d.i < d.chars.length) {
    highlightPS("sch-loop");
    const sm = {};
    for (let k = 0; k < d.i; k++) sm[k] = "ch-delete";
    sm[d.i] = "ch-highlight";
    sm[d.i + "_ptr"] = true;
    if (d.chars[d.i] === d.target) {
      sm[d.i] = "ch-found";
      highlightPS("sch-ret");
      buildChars("mainChars", mainStr, sm);
      setCaption(
        "mainCaption",
        `Found '${d.target}' at index ${d.i}!`,
        "cap-green",
      );
      setBadge("mainBadge", `Index: ${d.i}`, "badge-green");
      stepDone = true;
      clearTimeout(stepTimer);
      const bs = document.getElementById("btnStep"),
        ba = document.getElementById("btnAuto");
      if (bs) bs.disabled = true;
      if (ba) ba.disabled = true;
    } else {
      highlightPS("sch-cmp");
      buildChars("mainChars", mainStr, sm);
      setCaption(
        "mainCaption",
        `Index ${d.i}: '${d.chars[d.i]}' ≠ '${d.target}'`,
        "cap-orange",
      );
      d.i++;
    }
  } else {
    highlightPS("sch-ret");
    const sm = {};
    [...mainStr].forEach((_, k) => (sm[k] = "ch-delete"));
    buildChars("mainChars", mainStr, sm);
    setCaption("mainCaption", `'${d.target}' not found in string!`, "cap-red");
    setBadge("mainBadge", "Not Found: -1", "badge-red");
    stepDone = true;
    clearTimeout(stepTimer);
    const bs = document.getElementById("btnStep"),
      ba = document.getElementById("btnAuto");
    if (bs) bs.disabled = true;
    if (ba) ba.disabled = true;
  }
}

/* SUBSTRING STEPS */
function doSubStep() {
  const d = stepData;
  const slen = d.sub.length,
    n = d.chars.length;
  if (d.i <= n - slen) {
    highlightPS("sub-loop");
    const sm = {};
    let match = true;
    for (let k = 0; k < slen; k++) {
      if (d.chars[d.i + k] !== d.sub[k]) {
        match = false;
        break;
      }
    }
    if (match) {
      highlightPS("sub-ret");
      for (let k = 0; k < n; k++) sm[k] = "ch-default";
      for (let k = 0; k < slen; k++) sm[d.i + k] = "ch-found";
      buildChars("mainChars", mainStr, sm);
      setCaption(
        "mainCaption",
        `"${d.sub}" found at index ${d.i}!`,
        "cap-green",
      );
      setBadge("mainBadge", `Found at index ${d.i}`, "badge-green");
      stepDone = true;
      clearTimeout(stepTimer);
      const bs = document.getElementById("btnStep"),
        ba = document.getElementById("btnAuto");
      if (bs) bs.disabled = true;
      if (ba) ba.disabled = true;
    } else {
      highlightPS("sub-cmp");
      for (let k = 0; k < n; k++) sm[k] = "ch-default";
      for (let k = 0; k < slen; k++) {
        if (d.i + k < n) sm[d.i + k] = "ch-highlight";
      }
      buildChars("mainChars", mainStr, sm);
      setCaption(
        "mainCaption",
        `Window at [${d.i}…${d.i + slen - 1}]: "${mainStr.substring(d.i, d.i + slen)}" ≠ "${d.sub}"`,
        "cap-orange",
      );
      d.i++;
    }
  } else {
    highlightPS("sub-ret");
    const sm = {};
    [...mainStr].forEach((_, k) => (sm[k] = "ch-delete"));
    buildChars("mainChars", mainStr, sm);
    setCaption("mainCaption", `"${d.sub}" not found in string!`, "cap-red");
    setBadge("mainBadge", "Not Found", "badge-red");
    stepDone = true;
    clearTimeout(stepTimer);
    const bs = document.getElementById("btnStep"),
      ba = document.getElementById("btnAuto");
    if (bs) bs.disabled = true;
    if (ba) ba.disabled = true;
  }
}

/* REVERSE STEPS */
function doReverseStep() {
  const d = stepData;
  if (d.lo < d.hi) {
    highlightPS("rev-swap");
    [d.arr[d.lo], d.arr[d.hi]] = [d.arr[d.hi], d.arr[d.lo]];
    const sm = {};
    sm[d.lo] = "ch-reverse";
    sm[d.hi] = "ch-reverse";
    buildChars("mainChars", d.arr.join(""), sm);
    setCaption(
      "mainCaption",
      `Swapped [${d.lo}]↔[${d.hi}]: "${d.arr.join("")}"`,
      "cap-purple",
    );
    d.lo++;
    d.hi--;
  } else {
    highlightPS("rev-done");
    const sm = {};
    d.arr.forEach((_, k) => (sm[k] = "ch-reverse"));
    buildChars("mainChars", d.arr.join(""), sm);
    setCaption("mainCaption", `Reversed: "${d.arr.join("")}"`, "cap-purple");
    setBadge("mainBadge", `"${d.arr.join("")}"`, "badge-purple");
    stepDone = true;
    clearTimeout(stepTimer);
    const bs = document.getElementById("btnStep"),
      ba = document.getElementById("btnAuto");
    if (bs) bs.disabled = true;
    if (ba) ba.disabled = true;
  }
}

/* PALINDROME STEPS */
function doPalinStep() {
  const d = stepData;
  if (d.lo < d.hi) {
    highlightPS("pal");
    const match = d.arr[d.lo] === d.arr[d.hi];
    if (!match) d.ok = false;
    const sm = {};
    sm[d.lo] = match ? "ch-palindrome-yes" : "ch-palindrome-no";
    sm[d.hi] = match ? "ch-palindrome-yes" : "ch-palindrome-no";
    buildChars("mainChars", d.arr.join(""), sm);
    setCaption(
      "mainCaption",
      `Comparing [${d.lo}]='${d.arr[d.lo]}' with [${d.hi}]='${d.arr[d.hi]}': ${match ? "✓ Match" : "✗ Mismatch"}`,
      "cap-" + (match ? "green" : "red"),
    );
    d.lo++;
    d.hi--;
    if (!match) {
      setBadge("mainBadge", "Not a Palindrome", "badge-red");
      stepDone = true;
      clearTimeout(stepTimer);
      const bs = document.getElementById("btnStep"),
        ba = document.getElementById("btnAuto");
      if (bs) bs.disabled = true;
      if (ba) ba.disabled = true;
    }
  } else {
    if (d.ok) {
      const sm = {};
      d.arr.forEach((_, k) => (sm[k] = "ch-palindrome-yes"));
      buildChars("mainChars", d.arr.join(""), sm);
      setCaption(
        "mainCaption",
        `"${d.arr.join("")}" IS a Palindrome! ✓`,
        "cap-green",
      );
      setBadge("mainBadge", "✓ Palindrome", "badge-green");
    }
    stepDone = true;
    clearTimeout(stepTimer);
    const bs = document.getElementById("btnStep"),
      ba = document.getElementById("btnAuto");
    if (bs) bs.disabled = true;
    if (ba) ba.disabled = true;
  }
}

/* INSTANT OPERATIONS (no stepping) */
function mainBuildInstant(op) {
  getInputs();
  if (!mainStr) {
    setCaption("mainCaption", "Please enter a string!", "cap-red");
    return;
  }
  clearTimeout(stepTimer);
  stepIdx = 0;
  stepDone = true;
  const charsEl = document.getElementById("mainChars");

  if (op === "insert") {
    const idx = parseInt(mainArg2) || 0,
      ch = mainArg[0] || "*";
    const result = mainStr.slice(0, idx) + ch + mainStr.slice(idx);
    highlightPS("ins");
    const sm = {};
    for (let k = 0; k < result.length; k++)
      sm[k] = k === idx ? "ch-insert" : "ch-default";
    buildChars("mainChars", result, sm);
    setCaption(
      "mainCaption",
      `Inserted '${ch}' at index ${idx} → "${result}"`,
      "cap-orange",
    );
    setBadge("mainBadge", `"${result}"`, "badge-orange");
  }
  if (op === "delete") {
    const idx = parseInt(mainArg) || 0;
    if (idx < 0 || idx >= mainStr.length) {
      setCaption("mainCaption", "Index out of bounds!", "cap-red");
      return;
    }
    const del = mainStr[idx];
    const sm = {};
    [...mainStr].forEach((_, k) => {
      if (k === idx) sm[k] = "ch-delete";
    });
    buildChars("mainChars", mainStr, sm);
    setCaption("mainCaption", `Deleting '${del}' at index ${idx}…`, "cap-red");
    highlightPS("del");
    setTimeout(() => {
      const result = mainStr.slice(0, idx) + mainStr.slice(idx + 1);
      buildChars("mainChars", result, {});
      setCaption("mainCaption", `Deleted '${del}' → "${result}"`, "cap-red");
      setBadge("mainBadge", `"${result}"`, "badge-red");
    }, 600);
  }
  if (op === "same") {
    const s1 = mainStr,
      s2 = mainArg;
    const same = s1 === s2;
    highlightPS("same");
    const sm = {};
    [...s1].forEach((_, k) => (sm[k] = same ? "ch-found" : "ch-delete"));
    buildChars("mainChars", s1, sm);
    const sep = document.createElement("div");
    sep.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:1.5rem;color:${same ? "var(--primary-green)" : "var(--primary-red)"};margin:0 12px;font-weight:700;">${same ? "==" : "≠"}</span>`;
    charsEl.appendChild(sep);
    [...s2].forEach((c, k) => {
      const cell = document.createElement("div");
      cell.className = "str-cell";
      const cls = same ? "ch-found" : "ch-delete";
      cell.innerHTML = `<div style="height:22px;"></div><div class="str-char ${cls}">${c}</div><div class="str-cell-idx">[${k}]</div>`;
      charsEl.appendChild(cell);
    });
    setCaption(
      "mainCaption",
      `"${s1}" ${same ? "==" : "≠"} "${s2}"`,
      "cap-" + (same ? "green" : "red"),
    );
    setBadge(
      "mainBadge",
      same ? "✓ Same Strings" : "✗ Different Strings",
      same ? "badge-green" : "badge-red",
    );
  }
  if (op === "concat") {
    const s1 = mainStr,
      s2 = mainArg,
      result = s1 + s2;
    highlightPS("cat");
    const sm = {};
    [...result].forEach((_, k) => {
      sm[k] = k < s1.length ? "ch-default" : "ch-concat";
    });
    buildChars("mainChars", result, sm);
    setCaption("mainCaption", `"${s1}" + "${s2}" = "${result}"`, "cap-pink");
    setBadge("mainBadge", `"${result}"`, "badge-pink");
  }
  if (op === "rotate") {
    const k =
      (((parseInt(mainArg) || 0) % mainStr.length) + mainStr.length) %
      mainStr.length;
    const result = mainStr.slice(k) + mainStr.slice(0, k);
    highlightPS("rot");
    const sm = {};
    [...result].forEach((_, i) => {
      sm[i] = "ch-rotate";
    });
    buildChars("mainChars", result, sm);
    setCaption("mainCaption", `Rotated by ${k}: "${result}"`, "cap-orange");
    setBadge("mainBadge", `"${result}"`, "badge-orange");
  }
}

/* ════════════════════════════════════════════════════════
   SCENARIO SECTION
════════════════════════════════════════════════════════ */
function qSwitch(name) {
  const MAP = {
    best: "qtab-best",
    avg: "qtab-avg",
    worst: "qtab-worst",
    custom: "qtab-custom",
  };
  document
    .querySelectorAll(".q-scenario-tab")
    .forEach((t) => (t.className = "q-scenario-tab"));
  document.getElementById("qstab-" + name).classList.add(MAP[name]);
  document
    .querySelectorAll(".q-scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("qspanel-" + name).classList.add("active");
}

function scLog(logId, msg, cls) {
  const log = document.getElementById(logId);
  if (!log) return;
  const e = document.createElement("div");
  e.className = "q-log-entry " + (cls || "q-log-info");
  e.textContent = "> " + msg;
  log.appendChild(e);
  log.scrollTop = log.scrollHeight;
}

function scBuildChars(containerId, arr, stateMap = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  arr.forEach((ch, i) => {
    const d = document.createElement("div");
    d.className = "sc-char " + (stateMap[i] || "sc-default");
    if (!stateMap[i]) d.style.background = COLORS[i % COLORS.length];
    d.textContent = ch == " " ? "·" : ch;
    el.appendChild(d);
  });
}

/* ─ BEST ─ */
const SC_BEST_STR = [..."hello"];
const SC_BEST_TGT = "h";
let scBestIdx = 0,
  scBestDone = false,
  scBestTimer = null;
function scInitBest() {
  clearTimeout(scBestTimer);
  scBestIdx = 0;
  scBestDone = false;
  scBuildChars("sc-best-chars", SC_BEST_STR);
  document.getElementById("sc-best-log").innerHTML =
    '<div class="q-log-title">📋 Operation Log</div>';
  document.getElementById("sc-best-info").textContent = "Comparisons: 0";
  document.getElementById("sc-best-step").disabled = false;
  document.getElementById("sc-best-auto").disabled = false;
  scLog(
    "sc-best-log",
    `String: "${SC_BEST_STR.join("")}"  Target: '${SC_BEST_TGT}'`,
    "q-log-info",
  );
  scLog("sc-best-log", "Target at index 0 → Best Case O(1)", "q-log-info");
}
function scBestStep() {
  if (scBestDone) return;
  if (scBestIdx === 0) {
    scBuildChars("sc-best-chars", SC_BEST_STR, { 0: "sc-active" });
    scLog(
      "sc-best-log",
      `Check [0]='${SC_BEST_STR[0]}' == '${SC_BEST_TGT}'? YES ✓`,
      "q-log-green",
    );
    document.getElementById("sc-best-info").textContent = "Comparisons: 1";
    setTimeout(() => {
      scBuildChars("sc-best-chars", SC_BEST_STR, { 0: "sc-found" });
      scLog(
        "sc-best-log",
        "Found at index 0! Only 1 comparison.",
        "q-log-result",
      );
      scLog("sc-best-log", "✓ Best Case: O(1)", "q-log-result");
      scBestDone = true;
      document.getElementById("sc-best-step").disabled = true;
      document.getElementById("sc-best-auto").disabled = true;
    }, 500);
  }
  scBestIdx++;
}
function scBestAuto() {
  document.getElementById("sc-best-auto").disabled = true;
  scBestStep();
}

/* ─ AVERAGE ─ */
const SC_AVG_STR = [..."algorithms"];
const SC_AVG_SUB = "rit"; // at index 4
let scAvgIdx = 0,
  scAvgDone = false,
  scAvgTimer = null;
function scInitAvg() {
  clearTimeout(scAvgTimer);
  scAvgIdx = 0;
  scAvgDone = false;
  scBuildChars("sc-avg-chars", SC_AVG_STR);
  document.getElementById("sc-avg-log").innerHTML =
    '<div class="q-log-title">📋 Operation Log</div>';
  document.getElementById("sc-avg-info").textContent = "Window position: 0";
  document.getElementById("sc-avg-step").disabled = false;
  document.getElementById("sc-avg-auto").disabled = false;
  scLog(
    "sc-avg-log",
    `String: "${SC_AVG_STR.join("")}"  Sub: "${SC_AVG_SUB}"`,
    "q-log-info",
  );
}
function scAvgStep() {
  if (scAvgDone || scAvgIdx > SC_AVG_STR.length - SC_AVG_SUB.length) return;
  const n = SC_AVG_STR.length,
    slen = SC_AVG_SUB.length;
  const window = SC_AVG_STR.slice(scAvgIdx, scAvgIdx + slen).join("");
  const sm = {};
  for (let k = scAvgIdx; k < scAvgIdx + slen && k < n; k++) sm[k] = "sc-active";
  scBuildChars("sc-avg-chars", SC_AVG_STR, sm);
  document.getElementById("sc-avg-info").textContent =
    `Window position: ${scAvgIdx}`;
  const match = window === SC_AVG_SUB;
  scLog(
    "sc-avg-log",
    `[${scAvgIdx}…${scAvgIdx + slen - 1}]: "${window}" ${match ? "== FOUND!" : "≠ " + SC_AVG_SUB}`,
    match ? "q-log-green" : "q-log-red",
  );
  if (match) {
    const sm2 = {};
    for (let k = scAvgIdx; k < scAvgIdx + slen; k++) sm2[k] = "sc-found";
    scBuildChars("sc-avg-chars", SC_AVG_STR, sm2);
    scLog(
      "sc-avg-log",
      `Found at index ${scAvgIdx} after ${scAvgIdx + 1} windows`,
      "q-log-result",
    );
    scLog("sc-avg-log", "✓ Average Case: O(N/2) = O(N)", "q-log-result");
    scAvgDone = true;
    document.getElementById("sc-avg-step").disabled = true;
    document.getElementById("sc-avg-auto").disabled = true;
    clearTimeout(scAvgTimer);
  }
  scAvgIdx++;
}
function scAvgAuto() {
  if (scAvgDone) return;
  document.getElementById("sc-avg-auto").disabled = true;
  (function go() {
    if (scAvgDone || scAvgIdx > SC_AVG_STR.length - SC_AVG_SUB.length) return;
    scAvgStep();
    scAvgTimer = setTimeout(go, 750);
  })();
}
function scInitAvgFull() {
  clearTimeout(scAvgTimer);
  scInitAvg();
}

/* ─ WORST ─ */
const SC_WORST_STR = [..."reverse"];
let scWorstIdx = 0,
  scWorstDone = false,
  scWorstTimer = null,
  scWorstArr = [...SC_WORST_STR];
function scInitWorst() {
  clearTimeout(scWorstTimer);
  scWorstIdx = 0;
  scWorstDone = false;
  scWorstArr = [...SC_WORST_STR];
  scBuildChars("sc-worst-chars", scWorstArr);
  document.getElementById("sc-worst-log").innerHTML =
    '<div class="q-log-title">📋 Operation Log</div>';
  document.getElementById("sc-worst-info").textContent =
    "Swaps: 0 / " + Math.floor(SC_WORST_STR.length / 2);
  document.getElementById("sc-worst-step").disabled = false;
  document.getElementById("sc-worst-auto").disabled = false;
  scLog(
    "sc-worst-log",
    `Reversing: "${SC_WORST_STR.join("")}"  (N=${SC_WORST_STR.length})`,
    "q-log-info",
  );
  scLog("sc-worst-log", "Every char must be visited → O(N)", "q-log-warn");
}
function scWorstStep() {
  if (scWorstDone) return;
  const hi = scWorstArr.length - 1 - scWorstIdx;
  if (scWorstIdx < Math.floor(scWorstArr.length / 2)) {
    const lo = scWorstIdx;
    const a = scWorstArr[lo],
      b = scWorstArr[hi];
    [scWorstArr[lo], scWorstArr[hi]] = [b, a];
    const sm = {};
    sm[lo] = "sc-mark";
    sm[hi] = "sc-mark";
    scBuildChars("sc-worst-chars", scWorstArr, sm);
    scLog(
      "sc-worst-log",
      `Swap [${lo}]↔[${hi}]: '${a}'↔'${b}' → "${scWorstArr.join("")}"`,
      "q-log-cyan",
    );
    document.getElementById("sc-worst-info").textContent =
      `Swaps: ${scWorstIdx + 1} / ${Math.floor(SC_WORST_STR.length / 2)}`;
    scWorstIdx++;
    if (scWorstIdx >= Math.floor(scWorstArr.length / 2)) {
      setTimeout(() => {
        const sm2 = {};
        scWorstArr.forEach((_, k) => (sm2[k] = "sc-found"));
        scBuildChars("sc-worst-chars", scWorstArr, sm2);
        scLog(
          "sc-worst-log",
          `Reversed: "${scWorstArr.join("")}" — all N processed!`,
          "q-log-result",
        );
        scLog("sc-worst-log", "✓ Worst Case: O(N)", "q-log-result");
        scWorstDone = true;
        document.getElementById("sc-worst-step").disabled = true;
        document.getElementById("sc-worst-auto").disabled = true;
        clearTimeout(scWorstTimer);
      }, 500);
    }
  }
}
function scWorstAuto() {
  if (scWorstDone) return;
  document.getElementById("sc-worst-auto").disabled = true;
  (function go() {
    if (scWorstDone) return;
    scWorstStep();
    scWorstTimer = setTimeout(go, 700);
  })();
}

/* ─ CUSTOM ─ */
let ccTimer = null;
function scInitCustom() {
  document.getElementById("sc-cust-chars").innerHTML = "";
  document.getElementById("sc-cust-log").innerHTML =
    '<div class="q-log-title">📋 Operation Log</div>';
  document.getElementById("sc-cust-info").textContent =
    "Result will appear here";
  const toast = document.getElementById("q-cc-toast");
  if (toast) toast.className = "q-cc-toast";
  scLog(
    "sc-cust-log",
    "Enter string & select operation, then click Run.",
    "q-log-info",
  );
}
function scCustomReset() {
  clearTimeout(ccTimer);
  scInitCustom();
}

function scCustomRun() {
  const str = document.getElementById("cust-str").value.trim();
  const arg = document.getElementById("cust-arg").value.trim();
  const op = document.getElementById("cust-op").value;
  if (!str) {
    scLog("sc-cust-log", "⚠ Enter a string first!", "q-log-warn");
    return;
  }
  document.getElementById("sc-cust-log").innerHTML =
    '<div class="q-log-title">📋 Operation Log</div>';
  scLog(
    "sc-cust-log",
    `String: "${str}"  Op: ${op}  Arg: "${arg || "-"}"`,
    "q-log-info",
  );

  const sm = {};
  let info = "",
    toastType = "cyan",
    toastMsg = "";

  if (op === "length") {
    [...str].forEach((_, k) => (sm[k] = "sc-found"));
    scBuildChars("sc-cust-chars", [...str], sm);
    info = `Length = ${str.length}`;
    scLog("sc-cust-log", info, "q-log-green");
    scLog("sc-cust-log", "✓ O(N) — traverse once", "q-log-result");
    toastType = "cyan";
    toastMsg = "O(N) — count each char";
    sCcCard("on");
  }
  if (op === "search") {
    const tgt = arg[0] || "";
    const idx = str.indexOf(tgt);
    [...str].forEach((_, k) => {
      sm[k] =
        k === idx ? "sc-found" : idx > -1 && k < idx ? "sc-miss" : "sc-default";
    });
    scBuildChars("sc-cust-chars", [...str], sm);
    info =
      idx > -1 ? `Found '${tgt}' at index ${idx}` : `'${tgt}' not found (-1)`;
    const cmp = idx > -1 ? idx + 1 : str.length;
    scLog("sc-cust-log", info, idx > -1 ? "q-log-green" : "q-log-red");
    scLog(
      "sc-cust-log",
      `Comparisons: ${cmp} → ${idx === 0 ? "O(1) Best" : "O(N)"}`,
      "q-log-result",
    );
    toastType = idx === 0 ? "green" : "cyan";
    toastMsg = idx === 0 ? "O(1) Best Case!" : "O(N) Average/Worst";
    sCcCard(idx === 0 ? "o1" : "on");
  }
  if (op === "substring") {
    const pos = str.indexOf(arg);
    [...str].forEach((_, k) => {
      sm[k] =
        pos > -1 && k >= pos && k < pos + arg.length
          ? "sc-found"
          : "sc-default";
    });
    scBuildChars("sc-cust-chars", [...str], sm);
    info = pos > -1 ? `"${arg}" found at index ${pos}` : `"${arg}" not found`;
    scLog("sc-cust-log", info, pos > -1 ? "q-log-green" : "q-log-red");
    scLog("sc-cust-log", "O(N×M) — sliding window", "q-log-result");
    toastType = "cyan";
    toastMsg = "O(N×M) substring search";
    sCcCard("on");
  }
  if (op === "insert") {
    const pos = parseInt(arg) || 0;
    const ch = document.getElementById("cust-arg").value.trim() || "*";
    const result = str.slice(0, pos) + ch + str.slice(pos);
    [...result].forEach((_, k) => {
      sm[k] = k === pos ? "sc-mark" : "sc-default";
    });
    scBuildChars("sc-cust-chars", [...result], sm);
    info = `Inserted '${ch}' at ${pos} → "${result}"`;
    scLog("sc-cust-log", info, "q-log-cyan");
    scLog("sc-cust-log", "O(N) — shift characters", "q-log-result");
    toastType = "cyan";
    toastMsg = "O(N) — shift needed";
    sCcCard("on");
  }
  if (op === "delete") {
    const pos = parseInt(arg) || 0;
    if (pos < 0 || pos >= str.length) {
      scLog("sc-cust-log", "⚠ Index out of bounds", "q-log-warn");
      return;
    }
    const del = str[pos];
    sm[pos] = "sc-miss";
    scBuildChars("sc-cust-chars", [...str], sm);
    const result = str.slice(0, pos) + str.slice(pos + 1);
    setTimeout(() => {
      scBuildChars("sc-cust-chars", [...result], {});
      scLog("sc-cust-log", `Deleted '${del}' → "${result}"`, "q-log-red");
    }, 600);
    info = `Deleting '${del}' at index ${pos}`;
    scLog("sc-cust-log", info, "q-log-red");
    scLog("sc-cust-log", "O(N) — shift characters", "q-log-result");
    toastType = "cyan";
    toastMsg = "O(N) — shift needed";
    sCcCard("on");
  }
  if (op === "same") {
    const s2 = arg;
    const same = str === s2;
    [...str].forEach((_, k) => {
      sm[k] = same ? "sc-found" : "sc-miss";
    });
    scBuildChars("sc-cust-chars", [...str], sm);
    info = `"${str}" ${same ? "==" : "≠"} "${s2}" → ${same}`;
    scLog("sc-cust-log", info, same ? "q-log-green" : "q-log-red");
    scLog("sc-cust-log", "O(N) — compare each char", "q-log-result");
    toastType = same ? "green" : "cyan";
    toastMsg = "O(N) — full comparison";
    sCcCard("on");
  }
  if (op === "concat") {
    const s2 = arg,
      result = str + s2;
    [...result].forEach((_, k) => {
      sm[k] = k < str.length ? "sc-default" : "sc-mark";
    });
    scBuildChars("sc-cust-chars", [...result], sm);
    info = `"${str}"+"${s2}" = "${result}"`;
    scLog("sc-cust-log", info, "q-log-cyan");
    scLog("sc-cust-log", "O(N) — copy both strings", "q-log-result");
    toastType = "cyan";
    toastMsg = "O(N) — copy s2 chars";
    sCcCard("on");
  }
  if (op === "reverse") {
    const rev = [...str].reverse();
    rev.forEach((_, k) => {
      sm[k] = "sc-found";
    });
    scBuildChars("sc-cust-chars", rev, sm);
    info = `Reversed: "${rev.join("")}"`;
    scLog("sc-cust-log", info, "q-log-cyan");
    scLog("sc-cust-log", "O(N) — N/2 swaps", "q-log-result");
    toastType = "cyan";
    toastMsg = "O(N) — N/2 swaps needed";
    sCcCard("on");
  }
  if (op === "rotate") {
    const k = (((parseInt(arg) || 0) % str.length) + str.length) % str.length;
    const result = str.slice(k) + str.slice(0, k);
    [...result].forEach((_, i) => {
      sm[i] = "sc-mark";
    });
    scBuildChars("sc-cust-chars", [...result], sm);
    info = `Rotated by ${k}: "${result}"`;
    scLog("sc-cust-log", info, "q-log-cyan");
    scLog("sc-cust-log", "O(N) — copy with offset", "q-log-result");
    toastType = "cyan";
    toastMsg = "O(N) — copy all chars";
    sCcCard("on");
  }
  if (op === "palindrome") {
    const arr = [...str];
    let isPal = true;
    for (let lo = 0, hi = arr.length - 1; lo < hi; lo++, hi--) {
      if (arr[lo] !== arr[hi]) {
        isPal = false;
        sm[lo] = "sc-miss";
        sm[hi] = "sc-miss";
      } else {
        sm[lo] = "sc-found";
        sm[hi] = "sc-found";
      }
    }
    if (arr.length % 2 === 1) sm[Math.floor(arr.length / 2)] = "sc-found";
    scBuildChars("sc-cust-chars", arr, sm);
    info = isPal
      ? `"${str}" IS a Palindrome ✓`
      : `"${str}" is NOT a Palindrome ✗`;
    scLog("sc-cust-log", info, isPal ? "q-log-green" : "q-log-red");
    scLog("sc-cust-log", "O(N/2) = O(N)", "q-log-result");
    toastType = isPal ? "green" : "cyan";
    toastMsg = isPal ? "✓ Palindrome O(N/2)" : "✗ Not Palindrome O(N)";
    sCcCard("on");
  }

  document.getElementById("sc-cust-info").textContent = info;
  showCcToast(toastType, toastMsg);
}

function sCcCard(type) {
  ["o1", "on"].forEach((t) => {
    const c = document.getElementById("qcc-" + t);
    if (c) c.classList.remove("qcc-active");
  });
  clearTimeout(ccTimer);
  const card = document.getElementById("qcc-" + type);
  if (card) {
    card.classList.add("qcc-active");
    ccTimer = setTimeout(() => card.classList.remove("qcc-active"), 2000);
  }
}
function showCcToast(type, msg) {
  const toast = document.getElementById("q-cc-toast");
  document.getElementById("q-cc-toast-icon").textContent =
    type === "green" ? "⚡" : type === "orange" ? "⚠" : "ℹ";
  document.getElementById("q-cc-toast-text").textContent = msg;
  toast.className = "q-cc-toast show-toast qtoast-" + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (toast.className = "q-cc-toast"), 2800);
}


let codeEditor,
  currentCodeOp = "length",
  currentLang = "cpp";

const CODE_TEMPLATES = {
  length: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

int lengthOfString(const string& s) {
    int count = 0;
    for (char c : s) count++;   // manual count
    return count;
    // OR: return s.length();   // built-in O(1)
}

int main() {
    string s;
    cout << "Enter string: ";
    cin >> s;
    cout << "Length: " << lengthOfString(s) << endl;
    return 0;
}`,
    python: `def length_of_string(s):
    count = 0
    for _ in s:
        count += 1          # manual count
    return count
    # OR: return len(s)     # built-in O(1)

s = input("Enter string: ")
print("Length:", length_of_string(s))`,
    java: `import java.util.Scanner;
public class StringLength {
    static int lengthOfString(String s) {
        int count = 0;
        for (char c : s.toCharArray()) count++;
        return count;
        // OR: return s.length();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: ");
        String s = sc.next();
        System.out.println("Length: " + lengthOfString(s));
    }
}`,
    c: `#include <stdio.h>
int lengthOfString(const char* s) {
    int count = 0;
    while (s[count] != '\\0') count++;
    return count;
}
int main() {
    char s[100];
    printf("Enter string: "); scanf("%s", s);
    printf("Length: %d\\n", lengthOfString(s));
    return 0;
}`,
    javascript: `function lengthOfString(s) {
    let count = 0;
    for (let c of s) count++;   // manual
    return count;
    // OR: return s.length;
}

const s = prompt("Enter string:") || "hello";
console.log("Length:", lengthOfString(s));`,
  },
  search: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

int searchChar(const string& s, char target) {
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == target) return i;    // Found at index i
    }
    return -1;                           // Not found
}

int main() {
    string s; char c;
    cout << "Enter string: "; cin >> s;
    cout << "Enter char to search: "; cin >> c;
    int idx = searchChar(s, c);
    if (idx != -1) cout << "Found at index: " << idx << endl;
    else cout << "'" << c << "' not found\\n";
    return 0;
}`,
    python: `def search_char(s, target):
    for i, c in enumerate(s):
        if c == target:
            return i      # Found
    return -1             # Not found

s = input("Enter string: ")
t = input("Enter char to search: ")
idx = search_char(s, t[0] if t else '')
if idx != -1: print(f"Found at index: {idx}")
else: print(f"'{t}' not found")`,
    java: `import java.util.Scanner;
public class SearchChar {
    static int searchChar(String s, char target) {
        for (int i = 0; i < s.length(); i++)
            if (s.charAt(i) == target) return i;
        return -1;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: "); String s = sc.next();
        System.out.print("Enter char: ");   char c = sc.next().charAt(0);
        int idx = searchChar(s, c);
        System.out.println(idx != -1 ? "Found at: " + idx : "Not found");
    }
}`,
    c: `#include <stdio.h>
int searchChar(const char* s, char target) {
    for (int i = 0; s[i] != '\\0'; i++)
        if (s[i] == target) return i;
    return -1;
}
int main() {
    char s[100]; char c;
    printf("Enter string: "); scanf("%s", s);
    printf("Enter char: ");   scanf(" %c", &c);
    int idx = searchChar(s, c);
    if (idx != -1) printf("Found at index: %d\\n", idx);
    else printf("Not found\\n");
    return 0;
}`,
    javascript: `function searchChar(s, target) {
    for (let i = 0; i < s.length; i++) {
        if (s[i] === target) return i;
    }
    return -1;
}

const s = prompt("String:") || "hello";
const c = (prompt("Char to search:") || "l")[0];
const idx = searchChar(s, c);
console.log(idx !== -1 ? \`Found at: \${idx}\` : "Not found");`,
  },
  substring: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

int checkSubstring(const string& s, const string& sub) {
    int n = s.size(), m = sub.size();
    for (int i = 0; i <= n - m; i++) {
        bool match = true;
        for (int j = 0; j < m; j++) {
            if (s[i+j] != sub[j]) { match = false; break; }
        }
        if (match) return i;    // Substring found at i
    }
    return -1;                  // Not found
}

int main() {
    string s, sub;
    cout << "Enter string: ";    cin >> s;
    cout << "Enter substring: "; cin >> sub;
    int pos = checkSubstring(s, sub);
    if (pos != -1) cout << "Found at index: " << pos << endl;
    else cout << "Substring not found\\n";
    return 0;
}`,
    python: `def check_substring(s, sub):
    n, m = len(s), len(sub)
    for i in range(n - m + 1):
        if s[i:i+m] == sub:
            return i        # Found at i
    return -1               # Not found

s   = input("Enter string: ")
sub = input("Enter substring: ")
pos = check_substring(s, sub)
if pos != -1: print(f"Found at index: {pos}")
else: print("Substring not found")`,
    java: `import java.util.Scanner;
public class CheckSubstring {
    static int checkSubstring(String s, String sub) {
        int n = s.length(), m = sub.length();
        for (int i = 0; i <= n - m; i++) {
            if (s.substring(i, i + m).equals(sub)) return i;
        }
        return -1;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("String: ");    String s   = sc.next();
        System.out.print("Substring: "); String sub = sc.next();
        int pos = checkSubstring(s, sub);
        System.out.println(pos != -1 ? "Found at: " + pos : "Not found");
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
int checkSubstring(const char* s, const char* sub) {
    int n = strlen(s), m = strlen(sub);
    for (int i = 0; i <= n - m; i++) {
        int match = 1;
        for (int j = 0; j < m; j++)
            if (s[i+j] != sub[j]) { match = 0; break; }
        if (match) return i;
    }
    return -1;
}
int main() {
    char s[100], sub[50];
    printf("String: ");    scanf("%s", s);
    printf("Substring: "); scanf("%s", sub);
    int pos = checkSubstring(s, sub);
    if (pos != -1) printf("Found at: %d\\n", pos);
    else printf("Not found\\n");
    return 0;
}`,
    javascript: `function checkSubstring(s, sub) {
    const n = s.length, m = sub.length;
    for (let i = 0; i <= n - m; i++) {
        if (s.slice(i, i + m) === sub) return i;
    }
    return -1;
}

const s   = prompt("String:")    || "algorithms";
const sub = prompt("Substring:") || "rit";
const pos = checkSubstring(s, sub);
console.log(pos !== -1 ? \`Found at: \${pos}\` : "Not found");`,
  },
  insert: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

string insertChar(string s, char c, int pos) {
    if (pos < 0 || pos > (int)s.size()) return s;
    return s.substr(0, pos) + c + s.substr(pos);
    // or: s.insert(pos, 1, c); return s;
}

int main() {
    string s; char c; int pos;
    cout << "Enter string: ";   cin >> s;
    cout << "Char to insert: "; cin >> c;
    cout << "Position: ";       cin >> pos;
    cout << "Result: " << insertChar(s, c, pos) << endl;
    return 0;
}`,
    python: `def insert_char(s, c, pos):
    if pos < 0 or pos > len(s):
        return s
    return s[:pos] + c + s[pos:]

s   = input("Enter string: ")
c   = input("Char to insert: ")[0]
pos = int(input("Position: "))
print("Result:", insert_char(s, c, pos))`,
    java: `import java.util.Scanner;
public class InsertChar {
    static String insertChar(String s, char c, int pos) {
        if (pos < 0 || pos > s.length()) return s;
        return s.substring(0, pos) + c + s.substring(pos);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("String: ");       String s = sc.next();
        System.out.print("Char: ");         char   c = sc.next().charAt(0);
        System.out.print("Position: ");     int  pos = sc.nextInt();
        System.out.println("Result: " + insertChar(s, c, pos));
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
void insertChar(char* s, char c, int pos) {
    int n = strlen(s);
    for (int i = n; i >= pos; i--) s[i+1] = s[i];
    s[pos] = c;
}
int main() {
    char s[110]; char c; int pos;
    printf("String: ");   scanf("%s", s);
    printf("Char: ");     scanf(" %c", &c);
    printf("Position: "); scanf("%d", &pos);
    insertChar(s, c, pos);
    printf("Result: %s\\n", s);
    return 0;
}`,
    javascript: `function insertChar(s, c, pos) {
    if (pos < 0 || pos > s.length) return s;
    return s.slice(0, pos) + c + s.slice(pos);
}

const s   = prompt("String:")       || "helo";
const c   = (prompt("Char:") || "l")[0];
const pos = parseInt(prompt("Position:")) || 3;
console.log("Result:", insertChar(s, c, pos));`,
  },
  delete: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

string deleteChar(string s, int pos) {
    if (pos < 0 || pos >= (int)s.size()) return s;
    return s.substr(0, pos) + s.substr(pos + 1);
    // or: s.erase(pos, 1); return s;
}

int main() {
    string s; int pos;
    cout << "Enter string: ";       cin >> s;
    cout << "Position to delete: "; cin >> pos;
    cout << "Result: " << deleteChar(s, pos) << endl;
    return 0;
}`,
    python: `def delete_char(s, pos):
    if pos < 0 or pos >= len(s):
        return s
    return s[:pos] + s[pos+1:]

s   = input("Enter string: ")
pos = int(input("Position to delete: "))
print("Result:", delete_char(s, pos))`,
    java: `import java.util.Scanner;
public class DeleteChar {
    static String deleteChar(String s, int pos) {
        if (pos < 0 || pos >= s.length()) return s;
        return s.substring(0, pos) + s.substring(pos + 1);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("String: ");   String s   = sc.next();
        System.out.print("Position: "); int    pos = sc.nextInt();
        System.out.println("Result: " + deleteChar(s, pos));
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
void deleteChar(char* s, int pos) {
    int n = strlen(s);
    for (int i = pos; i < n - 1; i++) s[i] = s[i+1];
    s[n-1] = '\\0';
}
int main() {
    char s[100]; int pos;
    printf("String: ");   scanf("%s", s);
    printf("Position: "); scanf("%d", &pos);
    deleteChar(s, pos);
    printf("Result: %s\\n", s);
    return 0;
}`,
    javascript: `function deleteChar(s, pos) {
    if (pos < 0 || pos >= s.length) return s;
    return s.slice(0, pos) + s.slice(pos + 1);
}

const s   = prompt("String:")       || "helllo";
const pos = parseInt(prompt("Position:")) || 3;
console.log("Result:", deleteChar(s, pos));`,
  },
  same: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

bool sameStrings(const string& s1, const string& s2) {
    if (s1.size() != s2.size()) return false;
    for (int i = 0; i < s1.size(); i++)
        if (s1[i] != s2[i]) return false;
    return true;
}

int main() {
    string s1, s2;
    cout << "Enter string 1: "; cin >> s1;
    cout << "Enter string 2: "; cin >> s2;
    cout << (sameStrings(s1, s2) ? "Same!" : "Different!") << endl;
    return 0;
}`,
    python: `def same_strings(s1, s2):
    if len(s1) != len(s2): return False
    for a, b in zip(s1, s2):
        if a != b: return False
    return True
    # OR: return s1 == s2

s1 = input("String 1: ")
s2 = input("String 2: ")
print("Same!" if same_strings(s1, s2) else "Different!")`,
    java: `import java.util.Scanner;
public class SameStrings {
    static boolean sameStrings(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        for (int i = 0; i < s1.length(); i++)
            if (s1.charAt(i) != s2.charAt(i)) return false;
        return true;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("String 1: "); String s1 = sc.next();
        System.out.print("String 2: "); String s2 = sc.next();
        System.out.println(sameStrings(s1, s2) ? "Same!" : "Different!");
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
int sameStrings(const char* s1, const char* s2) {
    if (strlen(s1) != strlen(s2)) return 0;
    for (int i = 0; s1[i]; i++)
        if (s1[i] != s2[i]) return 0;
    return 1;
}
int main() {
    char s1[100], s2[100];
    printf("String 1: "); scanf("%s", s1);
    printf("String 2: "); scanf("%s", s2);
    printf(sameStrings(s1, s2) ? "Same!\\n" : "Different!\\n");
    return 0;
}`,
    javascript: `function sameStrings(s1, s2) {
    if (s1.length !== s2.length) return false;
    for (let i = 0; i < s1.length; i++)
        if (s1[i] !== s2[i]) return false;
    return true;
}

const s1 = prompt("String 1:") || "code";
const s2 = prompt("String 2:") || "code";
console.log(sameStrings(s1, s2) ? "Same!" : "Different!");`,
  },
  concat: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

string concatenate(const string& s1, const string& s2) {
    string result = s1;
    for (char c : s2) result += c;  // manual append
    return result;
    // OR: return s1 + s2;
}

int main() {
    string s1, s2;
    cout << "String 1: "; cin >> s1;
    cout << "String 2: "; cin >> s2;
    cout << "Result: " << concatenate(s1, s2) << endl;
    return 0;
}`,
    python: `def concatenate(s1, s2):
    result = s1
    for c in s2:
        result += c     # manual append
    return result
    # OR: return s1 + s2

s1 = input("String 1: ")
s2 = input("String 2: ")
print("Result:", concatenate(s1, s2))`,
    java: `import java.util.Scanner;
public class Concatenate {
    static String concatenate(String s1, String s2) {
        StringBuilder sb = new StringBuilder(s1);
        for (char c : s2.toCharArray()) sb.append(c);
        return sb.toString();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("String 1: "); String s1 = sc.next();
        System.out.print("String 2: "); String s2 = sc.next();
        System.out.println("Result: " + concatenate(s1, s2));
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
void concatenate(char* dest, const char* s2) {
    int n = strlen(dest);
    for (int i = 0; s2[i]; i++) dest[n+i] = s2[i];
    dest[n + strlen(s2)] = '\\0';
}
int main() {
    char s1[200], s2[100];
    printf("String 1: "); scanf("%s", s1);
    printf("String 2: "); scanf("%s", s2);
    concatenate(s1, s2);
    printf("Result: %s\\n", s1);
    return 0;
}`,
    javascript: `function concatenate(s1, s2) {
    let result = s1;
    for (let c of s2) result += c;
    return result;
}

const s1 = prompt("String 1:") || "hello";
const s2 = prompt("String 2:") || " world";
console.log("Result:", concatenate(s1, s2));`,
  },
  reverse: {
    cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string reverseString(string s) {
    int lo = 0, hi = s.size() - 1;
    while (lo < hi) {
        swap(s[lo], s[hi]);
        lo++; hi--;
    }
    return s;
    // OR: reverse(s.begin(), s.end()); return s;
}

int main() {
    string s;
    cout << "Enter string: "; cin >> s;
    cout << "Reversed: " << reverseString(s) << endl;
    return 0;
}`,
    python: `def reverse_string(s):
    arr = list(s)
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        arr[lo], arr[hi] = arr[hi], arr[lo]
        lo += 1; hi -= 1
    return ''.join(arr)
    # OR: return s[::-1]

s = input("Enter string: ")
print("Reversed:", reverse_string(s))`,
    java: `import java.util.Scanner;
public class ReverseString {
    static String reverseString(String s) {
        char[] arr = s.toCharArray();
        int lo = 0, hi = arr.length - 1;
        while (lo < hi) {
            char tmp = arr[lo]; arr[lo] = arr[hi]; arr[hi] = tmp;
            lo++; hi--;
        }
        return new String(arr);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: "); String s = sc.next();
        System.out.println("Reversed: " + reverseString(s));
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
void reverseString(char* s) {
    int lo = 0, hi = strlen(s) - 1;
    while (lo < hi) {
        char tmp = s[lo]; s[lo] = s[hi]; s[hi] = tmp;
        lo++; hi--;
    }
}
int main() {
    char s[100];
    printf("Enter string: "); scanf("%s", s);
    reverseString(s);
    printf("Reversed: %s\\n", s);
    return 0;
}`,
    javascript: `function reverseString(s) {
    const arr = s.split('');
    let lo = 0, hi = arr.length - 1;
    while (lo < hi) {
        [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
        lo++; hi--;
    }
    return arr.join('');
    // OR: return s.split('').reverse().join('');
}

const s = prompt("Enter string:") || "abcdef";
console.log("Reversed:", reverseString(s));`,
  },
  rotate: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

string rotateString(string s, int k) {
    int n = s.size();
    if (n == 0) return s;
    k = ((k % n) + n) % n;     // handle negative k
    return s.substr(k) + s.substr(0, k);
}

int main() {
    string s; int k;
    cout << "Enter string: ";     cin >> s;
    cout << "Rotate by k = ";     cin >> k;
    cout << "Rotated: " << rotateString(s, k) << endl;
    return 0;
}`,
    python: `def rotate_string(s, k):
    n = len(s)
    if n == 0: return s
    k = k % n                   # normalize k
    return s[k:] + s[:k]

s = input("Enter string: ")
k = int(input("Rotate by k = "))
print("Rotated:", rotate_string(s, k))`,
    java: `import java.util.Scanner;
public class RotateString {
    static String rotateString(String s, int k) {
        int n = s.length();
        if (n == 0) return s;
        k = ((k % n) + n) % n;
        return s.substring(k) + s.substring(0, k);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: "); String s = sc.next();
        System.out.print("Rotate by k: ");  int    k = sc.nextInt();
        System.out.println("Rotated: " + rotateString(s, k));
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
void rotateString(char* s, int k) {
    int n = strlen(s);
    k = ((k % n) + n) % n;
    char tmp[110];
    strcpy(tmp, s + k);
    strncat(tmp, s, k);
    strcpy(s, tmp);
}
int main() {
    char s[100]; int k;
    printf("Enter string: "); scanf("%s", s);
    printf("Rotate by k: ");  scanf("%d", &k);
    rotateString(s, k);
    printf("Rotated: %s\\n", s);
    return 0;
}`,
    javascript: `function rotateString(s, k) {
    const n = s.length;
    if (n === 0) return s;
    k = ((k % n) + n) % n;
    return s.slice(k) + s.slice(0, k);
}

const s = prompt("String:") || "abcdef";
const k = parseInt(prompt("Rotate by k:")) || 2;
console.log("Rotated:", rotateString(s, k));`,
  },
  palindrome: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(const string& s) {
    int lo = 0, hi = s.size() - 1;
    while (lo < hi) {
        if (s[lo] != s[hi]) return false;  // mismatch
        lo++; hi--;
    }
    return true;    // all pairs matched
}

int main() {
    string s;
    cout << "Enter string: "; cin >> s;
    cout << s << " is " << (isPalindrome(s) ? "" : "NOT ") << "a palindrome\\n";
    return 0;
}`,
    python: `def is_palindrome(s):
    lo, hi = 0, len(s) - 1
    while lo < hi:
        if s[lo] != s[hi]:
            return False    # mismatch
        lo += 1; hi -= 1
    return True             # all matched
    # OR: return s == s[::-1]

s = input("Enter string: ")
print(f'"{s}" is{" " if is_palindrome(s) else " NOT "}a palindrome')`,
    java: `import java.util.Scanner;
public class Palindrome {
    static boolean isPalindrome(String s) {
        int lo = 0, hi = s.length() - 1;
        while (lo < hi) {
            if (s.charAt(lo) != s.charAt(hi)) return false;
            lo++; hi--;
        }
        return true;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: "); String s = sc.next();
        System.out.println(s + (isPalindrome(s) ? " IS" : " is NOT") + " a palindrome");
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
int isPalindrome(const char* s) {
    int lo = 0, hi = strlen(s) - 1;
    while (lo < hi) {
        if (s[lo] != s[hi]) return 0;
        lo++; hi--;
    }
    return 1;
}
int main() {
    char s[100];
    printf("Enter string: "); scanf("%s", s);
    printf("%s %s a palindrome\\n", s, isPalindrome(s) ? "IS" : "is NOT");
    return 0;
}`,
    javascript: `function isPalindrome(s) {
    let lo = 0, hi = s.length - 1;
    while (lo < hi) {
        if (s[lo] !== s[hi]) return false;
        lo++; hi--;
    }
    return true;
}

const s = prompt("Enter string:") || "racecar";
console.log(\`"\${s}" \${isPalindrome(s) ? "IS" : "is NOT"} a palindrome\`);`,
  },
};

const OP_LABELS = {
  length: "Length of String",
  search: "Search a Character",
  substring: "Check for Substring",
  insert: "Insert a Character",
  delete: "Delete a Character",
  same: "Check for Same Strings",
  concat: "String Concatenation",
  reverse: "Reverse a String",
  rotate: "Rotate a String",
  palindrome: "Check for Palindrome",
};

const RUN_INPUTS = {
  length: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
    <input type="text" id="ri-str" class="form-control" value="hello world"></div>
    <div></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  search: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
    <input type="text" id="ri-str" class="form-control" value="hello"></div>
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Target Char</label>
    <input type="text" id="ri-arg" class="form-control" maxlength="1" value="l"></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  substring: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
    <input type="text" id="ri-str" class="form-control" value="algorithms"></div>
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Substring</label>
    <input type="text" id="ri-arg" class="form-control" value="rit"></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  insert: `<div class="input-grid-3">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
    <input type="text" id="ri-str" class="form-control" value="helo"></div>
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Char to Insert</label>
    <input type="text" id="ri-arg" class="form-control" maxlength="1" value="l"></div>
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Position</label>
    <input type="number" id="ri-arg2" class="form-control" value="3"></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  delete: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
    <input type="text" id="ri-str" class="form-control" value="helllo"></div>
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Position to Delete</label>
    <input type="number" id="ri-arg" class="form-control" value="3"></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  same: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String 1</label>
    <input type="text" id="ri-str" class="form-control" value="code"></div>
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String 2</label>
    <input type="text" id="ri-arg" class="form-control" value="code"></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  concat: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String 1</label>
    <input type="text" id="ri-str" class="form-control" value="hello"></div>
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String 2</label>
    <input type="text" id="ri-arg" class="form-control" value=" world"></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  reverse: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
    <input type="text" id="ri-str" class="form-control" value="abcdef"></div>
    <div></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  rotate: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
    <input type="text" id="ri-str" class="form-control" value="abcdef"></div>
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">k (rotate by)</label>
    <input type="number" id="ri-arg" class="form-control" value="2"></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
  palindrome: `<div class="input-grid">
    <div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label>
    <input type="text" id="ri-str" class="form-control" value="racecar"></div>
    <div></div>
    <button class="run-code-btn" style="margin:0;" onclick="runCode()"><i class="fas fa-play"></i> Run</button>
  </div>`,
};

function setCodeOp(op) {
  currentCodeOp = op;
  document
    .querySelectorAll(".impl-opt")
    .forEach((o) => o.classList.toggle("active", o.dataset.cop === op));
  document.getElementById("editorLabel").textContent =
    `${currentLang.toUpperCase()} — ${OP_LABELS[op]}`;
  codeEditor.setValue(
    CODE_TEMPLATES[op][currentLang] || "// Not yet available",
  );
  document.getElementById("runInputArea").innerHTML = RUN_INPUTS[op] || "";
  document.getElementById("codeOutput").textContent =
    "Fill inputs and click Run...";
}

function runCode() {
  const s = (document.getElementById("ri-str") || { value: "" }).value;
  const arg = (document.getElementById("ri-arg") || { value: "" }).value;
  const arg2 = (document.getElementById("ri-arg2") || { value: "" }).value;
  const out = document.getElementById("codeOutput");
  out.innerHTML = '<span style="color:var(--primary-cyan)">[Executing…]</span>';

  setTimeout(() => {
    if (currentLang === "javascript") {
      try {
        const logs = [];
        const origLog = console.log;
        console.log = (...a) => logs.push(a.join(" "));
        let code = codeEditor.getValue();
        // patch prompt calls with actual inputs
        code = code.replace(
          /prompt\([^)]*\)\s*\|\|\s*["'][^"']*["']/g,
          `"${s.replace(/"/g, '\\"')}"`,
        );
        code = code.replace(/prompt\([^)]*\)/g, `"${s.replace(/"/g, '\\"')}"`);
        eval(code);
        console.log = origLog;
        out.innerHTML =
          logs
            .map((l) => `<span style="color:var(--primary-green)">${l}</span>`)
            .join("<br>") || "No output.";
      } catch (e) {
        out.innerHTML = `<span style="color:var(--primary-red)">Error: ${e.message}</span>`;
      }
      return;
    }
    // Simulate for compiled languages
    let result = "",
      html = "";
    const fmt = (label, val, col = "var(--primary-green)") =>
      `<span style="color:${col}">${label}: ${val}</span>`;

    if (currentCodeOp === "length") {
      result = s.length;
      html = fmt("Length", result);
    } else if (currentCodeOp === "search") {
      const idx = s.indexOf(arg[0] || "");
      html = `<span>String: "${s}"</span><br><span>Target: '${arg[0] || ""}'</span><br><br>`;
      for (let i = 0; i < s.length; i++) {
        const hit = s[i] === (arg[0] || "");
        html += `<span style="color:${hit ? "var(--primary-green)" : "var(--text-secondary)"}">Check [${i}]='${s[i]}' ${hit ? "== FOUND" : "≠ target"}</span><br>`;
        if (hit) break;
      }
      html +=
        `<br>` +
        fmt(
          idx > -1 ? `Found at index` : "Not found",
          idx > -1 ? idx : -1,
          idx > -1 ? "var(--primary-green)" : "var(--primary-red)",
        );
    } else if (currentCodeOp === "substring") {
      const pos = s.indexOf(arg);
      html = `<span>String: "${s}"</span><br><span>Substring: "${arg}"</span><br><br>`;
      const slen = arg.length;
      for (let i = 0; i <= s.length - slen; i++) {
        const w = s.slice(i, i + slen);
        const m = w === arg;
        html += `<span style="color:${m ? "var(--primary-green)" : "var(--text-secondary)"}">Window [${i}…${i + slen - 1}]: "${w}" ${m ? "✓ MATCH" : "≠ target"}</span><br>`;
        if (m) break;
      }
      html +=
        `<br>` +
        fmt(
          pos > -1 ? "Found at index" : "Not found",
          pos > -1 ? pos : "N/A",
          pos > -1 ? "var(--primary-green)" : "var(--primary-red)",
        );
    } else if (currentCodeOp === "insert") {
      const pos = parseInt(arg2) || 0;
      const c = arg[0] || "*";
      const res = s.slice(0, pos) + c + s.slice(pos);
      html =
        `<span>Original: "${s}"</span><br><span>Insert '${c}' at [${pos}]</span><br><br>` +
        fmt("Result", `"${res}"`);
    } else if (currentCodeOp === "delete") {
      const pos = parseInt(arg) || 0;
      if (pos < 0 || pos >= s.length) {
        html = `<span style="color:var(--primary-red)">Error: index out of bounds</span>`;
        out.innerHTML = html;
        return;
      }
      const res = s.slice(0, pos) + s.slice(pos + 1);
      html =
        `<span>Original: "${s}"</span><br><span>Delete at [${pos}]: '${s[pos]}'</span><br><br>` +
        fmt("Result", `"${res}"`);
    } else if (currentCodeOp === "same") {
      const same = s === arg;
      html =
        `<span>String 1: "${s}"</span><br><span>String 2: "${arg}"</span><br><br>` +
        fmt(
          "Result",
          same ? "Same ✓" : "Different ✗",
          same ? "var(--primary-green)" : "var(--primary-red)",
        );
    } else if (currentCodeOp === "concat") {
      const res = s + arg;
      html =
        `<span>String 1: "${s}"</span><br><span>String 2: "${arg}"</span><br><br>` +
        fmt("Result", `"${res}"`);
    } else if (currentCodeOp === "reverse") {
      const res = [...s].reverse().join("");
      html = `<span>Original: "${s}"</span><br>`;
      [...s].forEach((c, i) => {
        html += `<span style="color:var(--text-secondary)">Swap [${i}]↔[${s.length - 1 - i}]</span><br>`;
        if (i >= Math.floor(s.length / 2) - 1) return;
      });
      html += `<br>` + fmt("Reversed", `"${res}"`, "var(--primary-purple)");
    } else if (currentCodeOp === "rotate") {
      const k = (((parseInt(arg) || 0) % s.length) + s.length) % s.length;
      const res = s.slice(k) + s.slice(0, k);
      html =
        `<span>Original: "${s}"</span><br><span>k = ${k}</span><br><br>` +
        fmt("Rotated", `"${res}"`, "var(--primary-orange)");
    } else if (currentCodeOp === "palindrome") {
      let isPal = true;
      const arr = [...s];
      html = `<span>String: "${s}"</span><br><br>`;
      for (let lo = 0, hi = arr.length - 1; lo < hi; lo++, hi--) {
        const m = arr[lo] === arr[hi];
        if (!m) isPal = false;
        html += `<span style="color:${m ? "var(--primary-green)" : "var(--primary-red)"}">Compare [${lo}]='${arr[lo]}' ↔ [${hi}]='${arr[hi]}': ${m ? "✓ Match" : "✗ Mismatch"}</span><br>`;
      }
      html +=
        `<br>` +
        fmt(
          "Result",
          isPal ? "✓ Palindrome" : "✗ Not a Palindrome",
          isPal ? "var(--primary-green)" : "var(--primary-red)",
        );
    }
    out.innerHTML =
      `<span style="color:var(--primary-cyan)">[Simulated ${currentLang.toUpperCase()} Output]</span><br><br>` +
      html;
  }, 600);
}


document.addEventListener("DOMContentLoaded", () => {
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    lineNumbers: true,
    theme: "material-ocean",
    mode: "text/x-c++src",
    indentUnit: 4,
    autoCloseBrackets: true,
  });
  setCodeOp("length");
  // render default op controls
  setOp("length");
  document.getElementById("mainControls").innerHTML = OP_CONTROLS["length"];
  // init scenarios
  scInitBest();
  scInitAvg();
  scInitWorst();
  scInitCustom();

  document.querySelectorAll("#editorLangTabs .lang-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll("#editorLangTabs .lang-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentLang = tab.dataset.lang;
      const modes = {
        cpp: "text/x-c++src",
        python: "text/x-python",
        java: "text/x-java",
        c: "text/x-csrc",
        javascript: "text/javascript",
      };
      codeEditor.setOption("mode", modes[currentLang]);
      codeEditor.setValue(
        CODE_TEMPLATES[currentCodeOp][currentLang] || "// Not yet available",
      );
      document.getElementById("editorLabel").textContent =
        `${currentLang.toUpperCase()} — ${OP_LABELS[currentCodeOp]}`;
    });
  });
});

function copyCode() {
  navigator.clipboard.writeText(codeEditor.getValue());
  const btn = document.getElementById("copyBtn");
  btn.textContent = "Copied!";
  setTimeout(() => (btn.textContent = "Copy"), 2000);
}

// --- Level Slider & Modal Logic (FIXED) ---
// Get the algorithm name from the page to use as a unique key
const ALGO_KEY = document.title
  .split(" - ")[0]
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "_");
const L2_KEY = `${ALGO_KEY}_l2_unlocked`;
const L3_KEY = `${ALGO_KEY}_l3_unlocked`;

const btnL2 = document.getElementById("l2");
const btnL3 = document.getElementById("l3");
const modal = document.getElementById("quizModal");
const cancelBtn = document.getElementById("cancelBtn");
const startQuizBtn = document.getElementById("startQuiz");

function updateLevelButtons() {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  const l3Unlocked = localStorage.getItem(L3_KEY) === "true";

  if (l2Unlocked) {
    btnL2.style.borderColor = "var(--primary-green)";
    btnL2.style.background = "rgba(16, 185, 129, 0.15)";
    btnL2.style.color = "var(--primary-green)";
    btnL2.title = "Unlocked";
  }
  if (l3Unlocked) {
    btnL3.style.borderColor = "var(--primary-green)";
    btnL3.style.background = "rgba(16, 185, 129, 0.15)";
    btnL3.style.color = "var(--primary-green)";
    btnL3.title = "Unlocked";
  }
}

btnL2.onclick = () => {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  if (l2Unlocked) {
    // Already unlocked — go directly, no modal
    window.location.href = `${ALGO_KEY}_L2.html`;
  } else {
    // Not yet unlocked — show quiz modal
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
  }
};

btnL3.onclick = () => {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  const l3Unlocked = localStorage.getItem(L3_KEY) === "true";
  if (l3Unlocked) {
    window.location.href = `${ALGO_KEY}_L3.html`;
  } else if (!l2Unlocked) {
    // L2 not even unlocked yet — prompt L1 quiz first
    modal.querySelector("p").textContent =
      "Pass the Level 1 Quiz to unlock Level 2 first before accessing Level 3.";
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
  } else {
    // L2 unlocked but L3 not — prompt L2 quiz
    modal.querySelector("p").textContent =
      "Pass the Level 2 Quiz to unlock Level 3 and complete your journey.";
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l2`);
  }
};

cancelBtn.onclick = () => {
  
  modal.style.display = "none";
 
  modal.querySelector("p").textContent =
    `Pass the Level 1 Quiz to unlock Level 2 and continue your journey.`;
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("p").textContent =
      `Pass the Level 1 Quiz to unlock Level 2 and continue your journey.`;
  }
};
