const THEMES = ["dark", "light", "blue"];
let thIdx = 0;
const THEME_MAP_CM = { dark: "material-ocean", light: "eclipse", blue: "nord" };
document.getElementById("themeToggle").addEventListener("click", () => {
  thIdx = (thIdx + 1) % THEMES.length;
  document.body.setAttribute("data-theme", THEMES[thIdx]);
  if (codeEditor) codeEditor.setOption("theme", THEME_MAP_CM[THEMES[thIdx]]);
});

const speedSlider = document.getElementById("speedSlider");
const speedLabel = document.getElementById("speedLabel");
speedSlider.addEventListener("input", () => {
  const v = parseInt(speedSlider.value);
  speedLabel.textContent = v <= 300 ? "Fast" : v >= 900 ? "Slow" : "Normal";
});
function getSpeed() {
  return parseInt(speedSlider.value);
}

function highlightPS(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active", "returning"));
  const el = document.querySelector(`[data-step="${step}"]`);
  if (el) el.classList.add("active");
}
function highlightPSRet(step) {
  const el = document.querySelector(`[data-step="${step}"]`);
  if (el) {
    el.classList.remove("active");
    el.classList.add("returning");
  }
}
function setCaption(text, cls = "") {
  const el = document.getElementById("mainCaption");
  el.textContent = text;
  el.className = "vis-caption" + (cls ? " " + cls : "");
}
function setBadge(text, cls) {
  const wrap = document.getElementById("mainBadgeWrap");
  wrap.innerHTML = text
    ? `<div class="vis-result-badge ${cls}">${text}</div>`
    : "";
}
function setDepth(cur, max) {
  const wrap = document.getElementById("depthBarWrap");
  wrap.style.display = "flex";
  document.getElementById("depthBarFill").style.width = max
    ? `${(cur / max) * 100}%`
    : "0%";
  document.getElementById("depthLabel").textContent = `${cur}/${max}`;
}

/* 
   MAIN VISUALIZER
*/
let currentOp = "factorial";
let stepQueue = [],
  stepIdx = 0,
  stepDone = false,
  stepTimer = null;
let mainN = 5,
  mainArg = "";
let maxDepth = 0;

function setOp(op) {
  currentOp = op;
  document
    .querySelectorAll(".op-btn")
    .forEach((b) => b.classList.toggle("active", b.dataset.op === op));
  const TITLES = {
    factorial: "Factorial — Recursive Call Stack",
    fibonacci: "Fibonacci — Binary Recursion Tree",
    sum: "Sum of N — Linear Recursion",
    power: "Power(b,exp) — Recursive Exponentiation",
    countdown: "Countdown — Tail Recursion",
    printdigits: "Print Digits — Recursive Digit Extraction",
    reversestr: "Reverse String — Recursive Reversal",
    palindrome: "Palindrome Check — Recursive Symmetry",
    binarysearch: "Binary Search — Recursive Halving",
    gcd: "GCD — Euclidean Algorithm Recursion",
  };
  document.getElementById("vis-title").textContent =
    TITLES[op] || "Recursion Visualizer";
  mainReset();
  updateInputsForOp(op);
}

function updateInputsForOp(op) {
  const n = document.getElementById("mc-n");
  const l = document.getElementById("input1Label");
  const hasTwoInputs = ["power", "gcd", "binarysearch"].includes(op);
  const hasStr = ["reversestr", "palindrome"].includes(op);
  if (hasTwoInputs) {
    const DEFAULTS = {
      power: { n: "2", arg: "8", l1: "Base (b)", l2: "Exponent / b" },
      gcd: { n: "48", arg: "18", l1: "a", l2: "b" },
      binarysearch: { n: "7", arg: "", l1: "target", l2: "" },
    };
    l.textContent = DEFAULTS[op].l1;
    n.value = DEFAULTS[op].n;
    let extraInput = document.getElementById("mc-arg");
    if (!extraInput) {
      extraInput = document.createElement("input");
      extraInput.type = "number";
      extraInput.id = "mc-arg";
      extraInput.className = "form-control";
      extraInput.style.marginTop = "6px";
      const label2 = document.createElement("label");
      label2.style.cssText =
        "font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;margin-top:8px;";
      label2.id = "input2Label";
      label2.textContent = DEFAULTS[op].l2;
      const ctrl = document.querySelector(".ctrl-grid>div");
      ctrl.appendChild(label2);
      ctrl.appendChild(extraInput);
    }
    extraInput.value = DEFAULTS[op].arg;
    document.getElementById("input2Label").textContent = DEFAULTS[op].l2;
  } else if (hasStr) {
    l.textContent = "String";
    n.type = "text";
    n.value = "racecar";
    const old = document.getElementById("mc-arg");
    if (old) old.parentElement.removeChild(old);
    const ol2 = document.getElementById("input2Label");
    if (ol2) ol2.parentElement.removeChild(ol2);
  } else {
    l.textContent = "n (value)";
    n.type = "number";
    n.value = op === "printdigits" ? "12345" : op === "countdown" ? "5" : "5";
    const old = document.getElementById("mc-arg");
    if (old) old.parentElement.removeChild(old);
    const ol2 = document.getElementById("input2Label");
    if (ol2) ol2.parentElement.removeChild(ol2);
  }
}

function mainReset() {
  clearTimeout(stepTimer);
  stepQueue = [];
  stepIdx = 0;
  stepDone = false;
  maxDepth = 0;
  document.getElementById("mainStackArea").innerHTML =
    `<div style="color:var(--text-secondary);font-family:'JetBrains Mono',monospace;font-size:.9rem;">Set input and click 🔨 Build to begin</div>`;
  setCaption("Choose an operation and click 🔨 Build.", "");
  setBadge("", "");
  document.getElementById("depthBarWrap").style.display = "none";
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active", "returning"));
  const bs = document.getElementById("btnStep"),
    ba = document.getElementById("btnAuto");
  if (bs) bs.disabled = true;
  if (ba) ba.disabled = true;
}

function mainBuild() {
  mainReset();
  mainN = document.getElementById("mc-n").value;
  const argEl = document.getElementById("mc-arg");
  mainArg = argEl ? argEl.value : "";
  buildStepQueue(currentOp, mainN, mainArg);
  if (!stepQueue.length) {
    setCaption("Nothing to visualize.", "cap-red");
    return;
  }
  maxDepth = Math.max(...stepQueue.map((s) => s.depth || 0));
  renderStack();
  const bs = document.getElementById("btnStep"),
    ba = document.getElementById("btnAuto");
  if (bs) bs.disabled = false;
  if (ba) ba.disabled = false;
  setCaption("Ready — click ▶ Step to begin.", "");
}

function mainStep() {
  if (stepIdx >= stepQueue.length) {
    stepDone = true;
    clearTimeout(stepTimer);
    document.getElementById("btnStep").disabled = true;
    document.getElementById("btnAuto").disabled = true;
    return;
  }
  const step = stepQueue[stepIdx++];
  applyStep(step);
  if (stepIdx >= stepQueue.length) {
    stepDone = true;
    clearTimeout(stepTimer);
    document.getElementById("btnStep").disabled = true;
    document.getElementById("btnAuto").disabled = true;
  }
}

function mainAuto() {
  if (stepDone) return;
  document.getElementById("btnAuto").disabled = true;
  (function go() {
    if (stepDone || stepIdx >= stepQueue.length) {
      stepDone = true;
      document.getElementById("btnStep").disabled = true;
      return;
    }
    mainStep();
    stepTimer = setTimeout(go, getSpeed());
  })();
}

/* ─── STEP QUEUE BUILDERS ─── */
function buildStepQueue(op, n, arg) {
  stepQueue = [];
  if (op === "factorial") buildFactorial(parseInt(n) || 0);
  else if (op === "fibonacci") buildFibonacci(parseInt(n) || 0);
  else if (op === "sum") buildSum(parseInt(n) || 0);
  else if (op === "power") buildPower(parseInt(n) || 0, parseInt(arg) || 0);
  else if (op === "countdown") buildCountdown(parseInt(n) || 0);
  else if (op === "printdigits") buildPrintDigits(parseInt(n) || 12345);
  else if (op === "reversestr") buildReverseStr(n.toString() || "hello");
  else if (op === "palindrome") buildPalindrome(n.toString() || "racecar");
  else if (op === "binarysearch") buildBinarySearch(parseInt(n) || 7);
  else if (op === "gcd") buildGCD(parseInt(n) || 48, parseInt(arg) || 18);
}

/* FACTORIAL */
let stk = [];
function buildFactorial(n) {
  stk = [];
  function rec(n, depth) {
    stk = [...stk, { fn: `fact(${n})`, args: `n=${n}`, depth, tag: "call" }];
    stepQueue.push({
      type: "call",
      fn: `factorial(${n})`,
      n,
      depth,
      stack: [...stk],
      ps: "fact-call",
      caption: `Calling factorial(${n})`,
      captionCls: "",
    });
    if (n === 0) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = "→ 1";
      stepQueue.push({
        type: "base",
        fn: `factorial(0)`,
        n: 0,
        depth,
        stack: [...stk],
        ps: "fact-base",
        caption: `Base case: factorial(0) = 1`,
        captionCls: "cap-orange",
        badge: "Base Case: returns 1",
        badgeCls: "badge-orange",
      });
    } else {
      rec(n - 1, depth + 1);
      const res = factorial(n);
      stk.pop();
      const top2 = stk.length ? stk[stk.length - 1] : null;
      if (top2) {
        top2.tag = "ret";
        top2.ret = `→ ${res}`;
      }
      stepQueue.push({
        type: "return",
        fn: `factorial(${n})`,
        n,
        depth,
        result: res,
        stack: [...stk],
        ps: "fact-ret",
        caption: `factorial(${n}) returns ${res}`,
        captionCls: "cap-green",
        badge: stk.length === 0 ? `Result: ${res}` : null,
        badgeCls: "badge-green",
      });
    }
  }
  function factorial(n) {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }
  rec(n, 0);
}

/* FIBONACCI */
function buildFibonacci(n) {
  stk = [];
  let callCount = 0;
  function rec(n, depth) {
    callCount++;
    stk = [...stk, { fn: `fib(${n})`, args: `n=${n}`, depth, tag: "call" }];
    stepQueue.push({
      type: "call",
      fn: `fib(${n})`,
      n,
      depth,
      calls: callCount,
      stack: [...stk],
      ps: "fib-left",
      caption: `Calling fib(${n}) — call #${callCount}`,
      captionCls: "",
    });
    if (n <= 1) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = `→ ${n}`;
      stepQueue.push({
        type: "base",
        fn: `fib(${n})`,
        depth,
        stack: [...stk],
        result: n,
        ps: "fib-base",
        caption: `Base case: fib(${n}) = ${n}`,
        captionCls: "cap-orange",
      });
      stk.pop();
    } else {
      rec(n - 1, depth + 1);
      stepQueue.push({
        type: "branch",
        fn: `fib(${n})`,
        depth,
        stack: [...stk],
        ps: "fib-right",
        caption: `Now computing fib(${n - 2}) (right branch)`,
        captionCls: "cap-cyan",
      });
      rec(n - 2, depth + 1);
      const res = fib(n);
      stk.pop();
      const top2 = stk.length ? stk[stk.length - 1] : null;
      if (top2) {
        top2.tag = "ret";
        top2.ret = `→ ${res}`;
      }
      stepQueue.push({
        type: "return",
        fn: `fib(${n})`,
        n,
        depth,
        result: res,
        stack: [...stk],
        ps: "fib-ret",
        caption: `fib(${n}) = fib(${n - 1}) + fib(${n - 2}) = ${res}`,
        captionCls: "cap-green",
        badge: stk.length === 0 ? `fib(${n}) = ${res}` : null,
        badgeCls: "badge-green",
      });
    }
  }
  function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  }
  rec(n, 0);
}

/* SUM */
function buildSum(n) {
  stk = [];
  function rec(n, depth) {
    stk = [...stk, { fn: `sum(${n})`, args: `n=${n}`, depth, tag: "call" }];
    stepQueue.push({
      type: "call",
      fn: `sum(${n})`,
      n,
      depth,
      stack: [...stk],
      ps: "sum-call",
      caption: `Calling sum(${n})`,
    });
    if (n === 0) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = "→ 0";
      stepQueue.push({
        type: "base",
        fn: "sum(0)",
        depth,
        stack: [...stk],
        ps: "sum-base",
        caption: "Base case: sum(0) = 0",
        captionCls: "cap-orange",
      });
    } else {
      rec(n - 1, depth + 1);
      const res = (n * (n + 1)) / 2;
      stk.pop();
      const top2 = stk.length ? stk[stk.length - 1] : null;
      if (top2) {
        top2.tag = "ret";
        top2.ret = `→ ${res}`;
      }
      stepQueue.push({
        type: "return",
        fn: `sum(${n})`,
        n,
        depth,
        result: res,
        stack: [...stk],
        ps: "sum-call",
        caption: `sum(${n}) = ${n} + sum(${n - 1}) = ${res}`,
        captionCls: "cap-green",
        badge: stk.length === 0 ? `Sum = ${res}` : null,
        badgeCls: "badge-green",
      });
    }
  }
  rec(n, 0);
}

/* POWER */
function buildPower(b, exp) {
  stk = [];
  function rec(b, e, depth) {
    stk = [
      ...stk,
      { fn: `pow(${b},${e})`, args: `b=${b},e=${e}`, depth, tag: "call" },
    ];
    stepQueue.push({
      type: "call",
      fn: `power(${b},${e})`,
      depth,
      stack: [...stk],
      ps: "pow-call",
      caption: `Calling power(${b}, ${e})`,
    });
    if (e === 0) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = "→ 1";
      stepQueue.push({
        type: "base",
        fn: `pow(${b},0)`,
        depth,
        stack: [...stk],
        ps: "pow-base",
        caption: `Base case: power(${b},0) = 1`,
        captionCls: "cap-orange",
      });
    } else {
      rec(b, e - 1, depth + 1);
      const res = Math.pow(b, e);
      stk.pop();
      const top2 = stk.length ? stk[stk.length - 1] : null;
      if (top2) {
        top2.tag = "ret";
        top2.ret = `→ ${res}`;
      }
      stepQueue.push({
        type: "return",
        fn: `pow(${b},${e})`,
        depth,
        result: res,
        stack: [...stk],
        ps: "pow-call",
        caption: `power(${b},${e}) = ${b} × power(${b},${e - 1}) = ${res}`,
        captionCls: "cap-green",
        badge: stk.length === 0 ? `${b}^${exp} = ${res}` : null,
        badgeCls: "badge-purple",
      });
    }
  }
  rec(b, exp, 0);
}

/* COUNTDOWN */
function buildCountdown(n) {
  stk = [];
  function rec(n, depth) {
    stk = [...stk, { fn: `cd(${n})`, args: `n=${n}`, depth, tag: "call" }];
    stepQueue.push({
      type: "call",
      fn: `countdown(${n})`,
      n,
      depth,
      stack: [...stk],
      ps: "cd-call",
      caption: `Print ${n}, then countdown(${n - 1})`,
    });
    if (n < 0) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = "→ done";
      stepQueue.push({
        type: "base",
        fn: "cd(-1)",
        depth,
        stack: [...stk],
        ps: "cd-base",
        caption: "Base case: n < 0, stop!",
        captionCls: "cap-orange",
      });
    } else {
      rec(n - 1, depth + 1);
      stk.pop();
      stepQueue.push({
        type: "return",
        fn: `countdown(${n})`,
        depth,
        stack: [...stk],
        ps: "cd-call",
        caption: `countdown(${n}) returned`,
        captionCls: "cap-green",
        badge: stk.length === 0 ? "Countdown complete!" : null,
        badgeCls: "badge-green",
      });
    }
  }
  rec(n, 0);
}

/* PRINT DIGITS */
function buildPrintDigits(n) {
  stk = [];
  function rec(n, depth) {
    stk = [...stk, { fn: `pd(${n})`, args: `n=${n}`, depth, tag: "call" }];
    stepQueue.push({
      type: "call",
      fn: `printDigits(${n})`,
      n,
      depth,
      stack: [...stk],
      ps: "digits-call",
      caption: `Calling printDigits(${n})`,
    });
    if (n < 10) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = `→ '${n}'`;
      stepQueue.push({
        type: "base",
        fn: `pd(${n})`,
        depth,
        stack: [...stk],
        ps: "digits-base",
        caption: `Base case: single digit ${n} → print it!`,
        captionCls: "cap-orange",
      });
      stk.pop();
    } else {
      rec(Math.floor(n / 10), depth + 1);
      stk.pop();
      stepQueue.push({
        type: "return",
        fn: `pd(${n})`,
        depth,
        stack: [...stk],
        ps: "digits-call",
        caption: `Print digit ${n % 10}, return from printDigits(${n})`,
        captionCls: "cap-green",
        badge: stk.length === 0 ? `Digits printed!` : null,
        badgeCls: "badge-purple",
      });
    }
  }
  rec(n, 0);
}

/* REVERSE STRING */
function buildReverseStr(s) {
  stk = [];
  function rec(s, depth) {
    stk = [...stk, { fn: `rev("${s}")`, args: `"${s}"`, depth, tag: "call" }];
    stepQueue.push({
      type: "call",
      fn: `reverse("${s}")`,
      depth,
      stack: [...stk],
      ps: "rev-call",
      caption: `Calling reverse("${s}")`,
    });
    if (s.length <= 1) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = `→ "${s}"`;
      stepQueue.push({
        type: "base",
        fn: `rev("${s}")`,
        depth,
        stack: [...stk],
        ps: "rev-base",
        caption: `Base case: "${s}" has ≤1 char, return it!`,
        captionCls: "cap-orange",
      });
    } else {
      rec(s.slice(1), depth + 1);
      const res = s.split("").reverse().join("");
      stk.pop();
      const top2 = stk.length ? stk[stk.length - 1] : null;
      if (top2) {
        top2.tag = "ret";
        top2.ret = `→ "${res.slice(0, s.length)}"}`;
      }
      stepQueue.push({
        type: "return",
        fn: `rev("${s}")`,
        depth,
        stack: [...stk],
        ps: "rev-call",
        caption: `reverse("${s}") = reverse("${s.slice(1)}") + "${s[0]}"`,
        captionCls: "cap-green",
        badge:
          stk.length === 0
            ? `Result: "${s.split("").reverse().join("")}"`
            : null,
        badgeCls: "badge-cyan",
      });
    }
  }
  rec(s, 0);
}

/* PALINDROME */
function buildPalindrome(s) {
  stk = [];
  function rec(s, depth) {
    stk = [...stk, { fn: `pal("${s}")`, args: `"${s}"`, depth, tag: "call" }];
    stepQueue.push({
      type: "call",
      fn: `isPal("${s}")`,
      depth,
      stack: [...stk],
      ps: "pal-call",
      caption: `Calling isPalindrome("${s}")`,
    });
    if (s.length <= 1) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = "→ true";
      stepQueue.push({
        type: "base",
        fn: `pal("${s}")`,
        depth,
        stack: [...stk],
        ps: "pal-base",
        caption: `Base case: "${s}" ≤1 char → true`,
        captionCls: "cap-orange",
      });
    } else if (s[0] !== s[s.length - 1]) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = "→ false";
      stepQueue.push({
        type: "base",
        fn: `pal("${s}")`,
        depth,
        stack: [...stk],
        ps: "pal-call",
        caption: `'${s[0]}' ≠ '${s[s.length - 1]}' → NOT palindrome!`,
        captionCls: "cap-red",
      });
    } else {
      stepQueue.push({
        type: "call",
        fn: `isPal("${s}")`,
        depth,
        stack: [...stk],
        ps: "pal-call",
        caption: `'${s[0]}' == '${s[s.length - 1]}' ✓ → check inner "${s.slice(1, -1)}"`,
        captionCls: "cap-cyan",
      });
      rec(s.slice(1, -1), depth + 1);
      const res = isPal(s);
      stk.pop();
      const top2 = stk.length ? stk[stk.length - 1] : null;
      if (top2) {
        top2.tag = "ret";
        top2.ret = `→ ${res}`;
      }
      stepQueue.push({
        type: "return",
        fn: `isPal("${s}")`,
        depth,
        result: res,
        stack: [...stk],
        ps: "pal-call",
        caption: `isPalindrome("${s}") = ${res}`,
        captionCls: res ? "cap-green" : "cap-red",
        badge:
          stk.length === 0 ? (res ? `✓ Palindrome` : `✗ Not Palindrome`) : null,
        badgeCls: res ? "badge-green" : "badge-orange",
      });
    }
  }
  function isPal(s) {
    if (s.length <= 1) return true;
    if (s[0] !== s[s.length - 1]) return false;
    return isPal(s.slice(1, -1));
  }
  rec(s, 0);
}

/* BINARY SEARCH */
function buildBinarySearch(target) {
  const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  stk = [];
  function rec(lo, hi, depth) {
    if (lo > hi) {
      stk = [
        ...stk,
        { fn: `bs(-1)`, args: `lo=${lo},hi=${hi}`, depth, tag: "base" },
      ];
      stepQueue.push({
        type: "base",
        fn: "binarySearch",
        depth,
        stack: [...stk],
        ps: "bs-base",
        caption: `lo(${lo}) > hi(${hi}) → target not found!`,
        captionCls: "cap-red",
        badge: "Not Found: -1",
        badgeCls: "badge-orange",
      });
      return;
    }
    const mid = Math.floor((lo + hi) / 2);
    stk = [
      ...stk,
      {
        fn: `bs([${lo}..${hi}])`,
        args: `mid=${mid}→${arr[mid]}`,
        depth,
        tag: "call",
      },
    ];
    stepQueue.push({
      type: "call",
      fn: `bs(lo=${lo},hi=${hi})`,
      depth,
      stack: [...stk],
      ps: "bs-call",
      caption: `Check mid=${mid} → arr[${mid}]=${arr[mid]} vs target=${target}`,
    });
    if (arr[mid] === target) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = `→ ${mid}`;
      stepQueue.push({
        type: "base",
        fn: `bs(mid=${mid})`,
        depth,
        stack: [...stk],
        ps: "bs-base",
        caption: `Found! arr[${mid}]=${arr[mid]} == target=${target}`,
        captionCls: "cap-green",
        badge: `Found at index ${mid}`,
        badgeCls: "badge-green",
      });
    } else if (arr[mid] < target) {
      stepQueue.push({
        type: "call",
        fn: `bs(lo=${lo},hi=${hi})`,
        depth,
        stack: [...stk],
        ps: "bs-call",
        caption: `${arr[mid]} < ${target} → search right half [${mid + 1}..${hi}]`,
        captionCls: "cap-cyan",
      });
      rec(mid + 1, hi, depth + 1);
      stk.pop();
      stepQueue.push({
        type: "return",
        fn: `bs(lo=${lo},hi=${hi})`,
        depth,
        stack: [...stk],
        ps: "bs-call",
        caption: `Return from left-biased search`,
        captionCls: "cap-green",
      });
    } else {
      stepQueue.push({
        type: "call",
        fn: `bs(lo=${lo},hi=${hi})`,
        depth,
        stack: [...stk],
        ps: "bs-call",
        caption: `${arr[mid]} > ${target} → search left half [${lo}..${mid - 1}]`,
        captionCls: "cap-cyan",
      });
      rec(lo, mid - 1, depth + 1);
      stk.pop();
      stepQueue.push({
        type: "return",
        fn: `bs(lo=${lo},hi=${hi})`,
        depth,
        stack: [...stk],
        ps: "bs-call",
        caption: `Return from right-biased search`,
        captionCls: "cap-green",
      });
    }
  }
  stepQueue.push({
    type: "info",
    fn: "binarySearch",
    depth: 0,
    stack: [],
    ps: "bs-call",
    caption: `Array: [${arr.join(",")}]  Target: ${target}`,
    captionCls: "cap-cyan",
  });
  rec(0, arr.length - 1, 0);
}

/* GCD */
function buildGCD(a, b) {
  stk = [];
  function rec(a, b, depth) {
    stk = [
      ...stk,
      { fn: `gcd(${a},${b})`, args: `a=${a},b=${b}`, depth, tag: "call" },
    ];
    stepQueue.push({
      type: "call",
      fn: `gcd(${a},${b})`,
      depth,
      stack: [...stk],
      ps: "gcd-call",
      caption: `Calling gcd(${a}, ${b})`,
    });
    if (b === 0) {
      const top = stk[stk.length - 1];
      top.tag = "base";
      top.ret = `→ ${a}`;
      stepQueue.push({
        type: "base",
        fn: `gcd(${a},0)`,
        depth,
        stack: [...stk],
        ps: "gcd-base",
        caption: `Base case: b=0 → GCD = ${a}`,
        captionCls: "cap-orange",
        badge: stk.length === 1 ? `GCD = ${a}` : null,
        badgeCls: "badge-green",
      });
    } else {
      rec(b, a % b, depth + 1);
      stk.pop();
      const g = gcd(a, b);
      const top2 = stk.length ? stk[stk.length - 1] : null;
      if (top2) {
        top2.tag = "ret";
        top2.ret = `→ ${g}`;
      }
      stepQueue.push({
        type: "return",
        fn: `gcd(${a},${b})`,
        depth,
        result: g,
        stack: [...stk],
        ps: "gcd-call",
        caption: `gcd(${a},${b}) = gcd(${b}, ${a % b}) = ${g}`,
        captionCls: "cap-green",
        badge: stk.length === 0 ? `GCD(${mainN},${mainArg}) = ${g}` : null,
        badgeCls: "badge-green",
      });
    }
  }
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  rec(a, b, 0);
}

/* ─── RENDER STEP ─── */
function applyStep(step) {
  if (!step) return;
  if (step.ps) highlightPS(step.ps);
  setCaption(step.caption || "", step.captionCls || "");
  if (step.badge) setBadge(step.badge, step.badgeCls || "badge-purple");
  if (step.type === "return" && step.ps) highlightPSRet(step.ps);
  renderStack(step.stack, step.type);
  if (step.stack) setDepth(step.stack.length, maxDepth + 1);
}

function renderStack(stack, type) {
  const area = document.getElementById("mainStackArea");
  area.innerHTML = "";
  if (!stack || !stack.length) {
    area.innerHTML = `<div style="color:var(--text-secondary);font-family:'JetBrains Mono',monospace;font-size:.9rem;text-align:center;">Stack empty — computation done!</div>`;
    return;
  }
  // vertical stack: bottom at bottom
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "display:flex;flex-direction:column;align-items:center;gap:5px;width:100%;max-width:340px;";

  // label
  const lbl = document.createElement("div");
  lbl.style.cssText =
    "font-size:11px;color:var(--text-secondary);font-family:Space Grotesk,sans-serif;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;";
  lbl.textContent = "▲ STACK GROWS UPWARD ▲";
  wrap.appendChild(lbl);

  stack
    .slice()
    .reverse()
    .forEach((frame, ri) => {
      const isTop = ri === 0;
      const el = document.createElement("div");
      el.className =
        "stack-frame " +
        (frame.tag === "base"
          ? "frame-base"
          : isTop
            ? type === "return"
              ? "frame-return"
              : "frame-active"
            : "frame-call");
      el.innerHTML = `
      ${frame.tag === "base" ? '<div class="frame-tag tag-base">BASE</div>' : isTop && type === "return" ? '<div class="frame-tag tag-ret">RETURN</div>' : '<div class="frame-tag tag-call">CALL</div>'}
      <div class="frame-number">#${stack.length - ri}</div>
      <div class="frame-fn">${frame.fn}</div>
      <div class="frame-args">${frame.args}</div>
      ${frame.ret ? `<div class="frame-ret">${frame.ret}</div>` : ""}
    `;
      wrap.appendChild(el);
    });

  // base marker
  const base = document.createElement("div");
  base.style.cssText =
    "width:180px;height:3px;background:linear-gradient(90deg,var(--primary-purple),var(--primary-cyan));border-radius:2px;margin-top:4px;";
  wrap.appendChild(base);
  const baseLabel = document.createElement("div");
  baseLabel.style.cssText =
    "font-size:10px;color:var(--text-secondary);font-family:JetBrains Mono,monospace;margin-top:2px;";
  baseLabel.textContent = "─── MAIN STACK ───";
  wrap.appendChild(baseLabel);

  area.appendChild(wrap);
}

/* 
   SCENARIOS
*/
function qSwitch(name) {
  const TABS = {
    best: "qtab-best",
    avg: "qtab-avg",
    worst: "qtab-worst",
    custom: "qtab-custom",
  };
  document
    .querySelectorAll(".q-scenario-tab")
    .forEach((t) => (t.className = "q-scenario-tab"));
  const btn = document.querySelectorAll(".q-scenario-tab");
  ["best", "avg", "worst", "custom"].forEach((n, i) => {
    if (n === name) btn[i].classList.add(TABS[n]);
  });
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
  e.textContent = msg;
  log.appendChild(e);
  log.scrollTop = log.scrollHeight;
}

function scRenderMiniStack(containerId, stack) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  if (!stack || !stack.length) {
    el.innerHTML =
      '<div style="color:var(--text-secondary);font-size:.78rem;font-family:JetBrains Mono,monospace;">Stack empty</div>';
    return;
  }
  stack
    .slice()
    .reverse()
    .forEach((f, ri) => {
      const d = document.createElement("div");
      const isTop = ri === 0;
      d.className =
        "sc-frame " +
        (f.tag === "base" ? "scf-base" : isTop ? "scf-active" : "scf-call");
      d.textContent = `${f.fn}  ${f.ret ? f.ret : ""}`;
      el.appendChild(d);
    });
}

/* ─ BEST ─ */
let scBestSteps = [],
  scBestIdx = 0,
  scBestDone = false,
  scBestTimer = null;
function scInitBest() {
  clearTimeout(scBestTimer);
  scBestIdx = 0;
  scBestDone = false;
  scBestSteps = [
    {
      stack: [{ fn: "factorial(0)", args: "n=0", tag: "call" }],
      log: "CALL: factorial(0)",
      cls: "q-log-call",
      info: "Stack depth: 1",
    },
    {
      stack: [{ fn: "factorial(0)", args: "n=0", tag: "base", ret: "→ 1" }],
      log: "BASE CASE HIT: n==0, return 1 immediately",
      cls: "q-log-base",
      info: "Stack depth: 1 (base)",
    },
    {
      stack: [],
      log: "RETURN: 1 → function done in O(1)!",
      cls: "q-log-ret",
      info: "Stack cleared — O(1) done!",
      done: true,
    },
  ];
  scRenderMiniStack("sc-best-stack", []);
  document.getElementById("sc-best-info").textContent = "Stack depth: 0";
  document.getElementById("sc-best-log").innerHTML =
    '<div class="q-log-title">📋 Call Log</div>';
  document.getElementById("sc-best-step").disabled = false;
  document.getElementById("sc-best-auto").disabled = false;
  scLog(
    "sc-best-log",
    "factorial(0) — will hit base case immediately",
    "q-log-info",
  );
  scLog("sc-best-log", "Expected: O(1) — no recursion!", "q-log-info");
}
function scBestStep() {
  if (scBestDone || scBestIdx >= scBestSteps.length) return;
  const s = scBestSteps[scBestIdx++];
  scRenderMiniStack("sc-best-stack", s.stack);
  scLog("sc-best-log", s.log, s.cls);
  document.getElementById("sc-best-info").textContent = s.info;
  if (s.done) {
    scBestDone = true;
    clearTimeout(scBestTimer);
    document.getElementById("sc-best-step").disabled = true;
    document.getElementById("sc-best-auto").disabled = true;
    scLog("sc-best-log", "✓ Best Case: O(1) — instant return", "q-log-result");
  }
}
function scBestAuto() {
  document.getElementById("sc-best-auto").disabled = true;
  (function go() {
    if (scBestDone) return;
    scBestStep();
    scBestTimer = setTimeout(go, 700);
  })();
}

/* ─ AVERAGE ─ */
let scAvgSteps = [],
  scAvgIdx = 0,
  scAvgDone = false,
  scAvgTimer = null;
function scInitAvg() {
  clearTimeout(scAvgTimer);
  scAvgIdx = 0;
  scAvgDone = false;
  const calls = [
    {
      stack: [{ fn: "factorial(4)", args: "n=4", tag: "call" }],
      log: "CALL: factorial(4)",
      cls: "q-log-call",
      info: "Stack depth: 1",
    },
    {
      stack: [
        { fn: "factorial(4)", args: "n=4", tag: "call" },
        { fn: "factorial(3)", args: "n=3", tag: "call" },
      ],
      log: "CALL: factorial(3)",
      cls: "q-log-call",
      info: "Stack depth: 2",
    },
    {
      stack: [
        { fn: "factorial(4)", args: "n=4", tag: "call" },
        { fn: "factorial(3)", args: "n=3", tag: "call" },
        { fn: "factorial(2)", args: "n=2", tag: "call" },
      ],
      log: "CALL: factorial(2)",
      cls: "q-log-call",
      info: "Stack depth: 3",
    },
    {
      stack: [
        { fn: "factorial(4)", args: "n=4", tag: "call" },
        { fn: "factorial(3)", args: "n=3", tag: "call" },
        { fn: "factorial(2)", args: "n=2", tag: "call" },
        { fn: "factorial(1)", args: "n=1", tag: "call" },
      ],
      log: "CALL: factorial(1)",
      cls: "q-log-call",
      info: "Stack depth: 4",
    },
    {
      stack: [
        { fn: "factorial(4)", args: "n=4", tag: "call" },
        { fn: "factorial(3)", args: "n=3", tag: "call" },
        { fn: "factorial(2)", args: "n=2", tag: "call" },
        { fn: "factorial(1)", args: "n=1", tag: "call" },
        { fn: "factorial(0)", args: "n=0", tag: "base", ret: "→ 1" },
      ],
      log: "BASE CASE: factorial(0) = 1",
      cls: "q-log-base",
      info: "Stack depth: 5 (max!)",
    },
    {
      stack: [
        { fn: "factorial(4)", args: "n=4", tag: "call" },
        { fn: "factorial(3)", args: "n=3", tag: "call" },
        { fn: "factorial(2)", args: "n=2", tag: "call" },
        { fn: "factorial(1)", args: "n=1", tag: "ret", ret: "→ 1" },
      ],
      log: "RETURN: factorial(1) = 1×1 = 1",
      cls: "q-log-ret",
      info: "Unwinding...",
    },
    {
      stack: [
        { fn: "factorial(4)", args: "n=4", tag: "call" },
        { fn: "factorial(3)", args: "n=3", tag: "call" },
        { fn: "factorial(2)", args: "n=2", tag: "ret", ret: "→ 2" },
      ],
      log: "RETURN: factorial(2) = 2×1 = 2",
      cls: "q-log-ret",
      info: "Unwinding...",
    },
    {
      stack: [
        { fn: "factorial(4)", args: "n=4", tag: "call" },
        { fn: "factorial(3)", args: "n=3", tag: "ret", ret: "→ 6" },
      ],
      log: "RETURN: factorial(3) = 3×2 = 6",
      cls: "q-log-ret",
      info: "Unwinding...",
    },
    {
      stack: [{ fn: "factorial(4)", args: "n=4", tag: "ret", ret: "→ 24" }],
      log: "RETURN: factorial(4) = 4×6 = 24",
      cls: "q-log-ret",
      info: "Almost done!",
    },
    {
      stack: [],
      log: "✓ FINAL RESULT: factorial(4) = 24",
      cls: "q-log-result",
      info: "Stack cleared! O(N) complete.",
      done: true,
    },
  ];
  scAvgSteps = calls;
  scRenderMiniStack("sc-avg-stack", []);
  document.getElementById("sc-avg-info").textContent = "Stack depth: 0";
  document.getElementById("sc-avg-log").innerHTML =
    '<div class="q-log-title">📋 Call Log</div>';
  document.getElementById("sc-avg-step").disabled = false;
  document.getElementById("sc-avg-auto").disabled = false;
  scLog("sc-avg-log", "factorial(4) — N=4 recursive calls", "q-log-info");
  scLog("sc-avg-log", "Expected: O(N) time, O(N) stack space", "q-log-info");
}
function scAvgStep() {
  if (scAvgDone || scAvgIdx >= scAvgSteps.length) return;
  const s = scAvgSteps[scAvgIdx++];
  scRenderMiniStack("sc-avg-stack", s.stack);
  scLog("sc-avg-log", s.log, s.cls);
  document.getElementById("sc-avg-info").textContent = s.info;
  if (s.done) {
    scAvgDone = true;
    clearTimeout(scAvgTimer);
    document.getElementById("sc-avg-step").disabled = true;
    document.getElementById("sc-avg-auto").disabled = true;
  }
}
function scAvgAuto() {
  document.getElementById("sc-avg-auto").disabled = true;
  (function go() {
    if (scAvgDone) return;
    scAvgStep();
    scAvgTimer = setTimeout(go, 600);
  })();
}

/* ─ WORST ─ */
let scWorstCalls = [],
  scWorstIdx = 0,
  scWorstDone = false,
  scWorstTimer = null;
function scInitWorst() {
  clearTimeout(scWorstTimer);
  scWorstIdx = 0;
  scWorstDone = false;
  // Generate all calls for fib(5) in DFS order
  scWorstCalls = [];
  let totalCalls = 0;
  function genFib(n, depth) {
    totalCalls++;
    const call = { fn: `fib(${n})`, n, depth, total: totalCalls };
    scWorstCalls.push({
      stack: [{ fn: call.fn, args: `n=${n}`, tag: "call", depth }],
      log: `CALL #${totalCalls}: fib(${n}) at depth ${depth}`,
      cls: "q-log-call",
      info: `Total calls: ${totalCalls}`,
    });
    if (n <= 1) {
      scWorstCalls.push({
        stack: [{ fn: call.fn, args: `n=${n}`, tag: "base", ret: `→ ${n}` }],
        log: `BASE: fib(${n}) = ${n}`,
        cls: "q-log-base",
        info: `Total calls: ${totalCalls}`,
      });
    } else {
      genFib(n - 1, depth + 1);
      genFib(n - 2, depth + 1);
      scWorstCalls.push({
        stack: [
          { fn: call.fn, args: `n=${n}`, tag: "ret", ret: `→ fib=${fib(n)}` },
        ],
        log: `RETURN: fib(${n}) = ${fib(n)}`,
        cls: "q-log-ret",
        info: `Total calls: ${totalCalls}`,
      });
    }
  }
  function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  }
  genFib(5, 0);
  scWorstCalls.push({
    stack: [],
    log: `✓ DONE: fib(5) = ${fib(5)} — Total calls: ${totalCalls}`,
    cls: "q-log-result",
    info: `Done! ${totalCalls} calls for fib(5)`,
    done: true,
  });
  scRenderMiniStack("sc-worst-stack", []);
  document.getElementById("sc-worst-info").textContent = "Total calls: 0";
  document.getElementById("sc-worst-log").innerHTML =
    '<div class="q-log-title">📋 Call Log</div>';
  document.getElementById("sc-worst-step").disabled = false;
  document.getElementById("sc-worst-auto").disabled = false;
  scLog("sc-worst-log", "fib(5) — O(2ⁿ) exponential calls!", "q-log-info");
  scLog("sc-worst-log", "Expected: ~2⁵=32 function calls", "q-log-info");
}
function scWorstStep() {
  if (scWorstDone || scWorstIdx >= scWorstCalls.length) return;
  const s = scWorstCalls[scWorstIdx++];
  scRenderMiniStack("sc-worst-stack", s.stack);
  scLog("sc-worst-log", s.log, s.cls);
  document.getElementById("sc-worst-info").textContent = s.info;
  if (s.done) {
    scWorstDone = true;
    clearTimeout(scWorstTimer);
    document.getElementById("sc-worst-step").disabled = true;
    document.getElementById("sc-worst-auto").disabled = true;
  }
}
function scWorstAuto() {
  document.getElementById("sc-worst-auto").disabled = true;
  (function go() {
    if (scWorstDone) return;
    scWorstStep();
    scWorstTimer = setTimeout(go, 400);
  })();
}

/* ─ CUSTOM ─ */
let ccTimer = null;
function scCustomReset() {
  clearTimeout(ccTimer);
  document.getElementById("sc-cust-stack").innerHTML = "";
  document.getElementById("sc-cust-log").innerHTML =
    '<div class="q-log-title">📋 Call Log</div>';
  document.getElementById("sc-cust-info").textContent =
    "Result will appear here";
  const toast = document.getElementById("q-cc-toast");
  if (toast) toast.className = "q-cc-toast";
  scLog(
    "sc-cust-log",
    "Enter values & select operation, then click Run.",
    "q-log-info",
  );
}
function scCustomRun() {
  const op = document.getElementById("cust-op").value;
  const n = document.getElementById("cust-n").value;
  const arg = document.getElementById("cust-arg").value;
  document.getElementById("sc-cust-log").innerHTML =
    '<div class="q-log-title">📋 Call Log</div>';
  scLog("sc-cust-log", `Op: ${op}  n/a=${n}  arg=${arg || "-"}`, "q-log-info");

  let result = "",
    complexity = "",
    stackDepth = 0;
  const frames = [];

  if (op === "factorial") {
    const nv = Math.min(parseInt(n) || 0, 12);
    let r = 1;
    for (let i = 1; i <= nv; i++) {
      r *= i;
      frames.push({
        fn: `factorial(${nv - i + 1}... → ${i})`,
        args: `n=${nv - i + 1}`,
        tag: "call",
      });
    }
    frames.reverse();
    result = `factorial(${nv}) = ${r}`;
    complexity = "O(N) — linear, N frames on stack";
    stackDepth = nv;
    scCcCard("linear");
    showCcToast("purple", `O(N) — depth = ${nv}`);
  } else if (op === "fibonacci") {
    const nv = Math.min(parseInt(n) || 0, 8);
    function fib(x) {
      if (x <= 1) return x;
      return fib(x - 1) + fib(x - 2);
    }
    let calls = 0;
    function countCalls(x) {
      calls++;
      if (x <= 1) return;
      countCalls(x - 1);
      countCalls(x - 2);
    }
    countCalls(nv);
    result = `fib(${nv}) = ${fib(nv)}`;
    complexity = `O(2ⁿ) — ${calls} total calls!`;
    stackDepth = nv;
    for (let i = nv; i >= 0; i--)
      frames.push({ fn: `fib(${i})`, args: `n=${i}`, tag: "call" });
    scCcCard("expo");
    showCcToast("orange", `O(2ⁿ) — ${calls} calls for n=${nv}`);
  } else if (op === "sum") {
    const nv = parseInt(n) || 0;
    const r = (nv * (nv + 1)) / 2;
    result = `sum(${nv}) = ${r}`;
    complexity = `O(N) — ${nv} frames`;
    stackDepth = nv;
    for (let i = nv; i >= 0; i--)
      frames.push({ fn: `sum(${i})`, args: `n=${i}`, tag: "call" });
    scCcCard("linear");
    showCcToast("purple", `O(N) — linear depth = ${nv}`);
  } else if (op === "power") {
    const b = parseInt(n) || 2,
      e = parseInt(arg) || 0;
    result = `power(${b},${e}) = ${Math.pow(b, e)}`;
    complexity = `O(exp) = O(${e})`;
    stackDepth = e;
    for (let i = e; i >= 0; i--)
      frames.push({ fn: `pow(${b},${i})`, args: `e=${i}`, tag: "call" });
    scCcCard("linear");
    showCcToast("purple", `O(exp) = O(${e})`);
  } else if (op === "countdown") {
    const nv = parseInt(n) || 0;
    result = `Countdown from ${nv} to -1`;
    complexity = `O(N+1) — ${nv + 1} calls`;
    stackDepth = nv + 1;
    for (let i = nv; i >= -1; i--)
      frames.push({ fn: `cd(${i})`, args: `n=${i}`, tag: "call" });
    scCcCard("linear");
    showCcToast("purple", `O(N) — ${nv + 1} calls`);
  } else if (op === "printdigits") {
    const nv = parseInt(n) || 0;
    const digits = nv.toString().length;
    result = `Digits of ${nv}: ${nv.toString().split("").join(", ")}`;
    complexity = `O(log₁₀N) = O(${digits}) frames`;
    stackDepth = digits;
    let tmp = nv;
    while (tmp > 0) {
      frames.push({ fn: `pd(${tmp})`, args: `n=${tmp}`, tag: "call" });
      tmp = Math.floor(tmp / 10);
    }
    scCcCard("linear");
    showCcToast("purple", `O(log N) — only ${digits} calls`);
  } else if (op === "reversestr") {
    const s = n.toString() || "hello";
    result = `reverse("${s}") = "${s.split("").reverse().join("")}"`;
    complexity = `O(N) — ${s.length} frames`;
    stackDepth = s.length;
    for (let i = s.length; i >= 0; i--)
      frames.push({
        fn: `rev("${s.slice(i)}")`,
        args: `"${s.slice(i)}"`,
        tag: "call",
      });
    scCcCard("linear");
    showCcToast("purple", `O(N) — ${s.length} recursive calls`);
  } else if (op === "palindrome") {
    const s = n.toString() || "racecar";
    function isPal(s) {
      if (s.length <= 1) return true;
      if (s[0] !== s[s.length - 1]) return false;
      return isPal(s.slice(1, -1));
    }
    const res = isPal(s);
    result = `"${s}" is${res ? " " : " NOT "}a palindrome`;
    complexity = `O(N/2) = O(${Math.floor(s.length / 2)}) frames`;
    stackDepth = Math.floor(s.length / 2);
    for (let i = 0; i <= Math.floor(s.length / 2); i++)
      frames.push({
        fn: `pal("${s.slice(i, s.length - i)}")`,
        args: `"${s.slice(i, s.length - i)}"`,
        tag: "call",
      });
    scCcCard("linear");
    showCcToast("purple", `O(N/2) — ${Math.floor(s.length / 2)} comparisons`);
  } else if (op === "binarysearch") {
    const t = parseInt(n) || 7;
    const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const idx = arr.indexOf(t);
    result =
      idx > -1 ? `Found ${t} at index ${idx}` : `${t} not found in array`;
    complexity = `O(log N) = O(${Math.ceil(Math.log2(arr.length))}) max`;
    stackDepth = Math.ceil(Math.log2(arr.length));
    frames.push({
      fn: `bs([0..${arr.length - 1}])`,
      args: `target=${t}`,
      tag: "call",
    });
    scCcCard("linear");
    showCcToast(
      "green",
      `O(log N) — only ${Math.ceil(Math.log2(arr.length))} max levels`,
    );
  } else if (op === "gcd") {
    const a = parseInt(n) || 48,
      b = parseInt(arg) || 18;
    function gcd(a, b) {
      return b === 0 ? a : gcd(b, a % b);
    }
    let calls = 0,
      ta = a,
      tb = b;
    while (tb !== 0) {
      frames.push({
        fn: `gcd(${ta},${tb})`,
        args: `a=${ta},b=${tb}`,
        tag: "call",
      });
      const nr = ta % tb;
      ta = tb;
      tb = nr;
      calls++;
    }
    frames.push({ fn: `gcd(${ta},0)`, args: "base", tag: "base" });
    result = `gcd(${a},${b}) = ${gcd(a, b)}`;
    complexity = `O(log min(a,b)) = ~${calls} calls`;
    stackDepth = calls;
    scCcCard("linear");
    showCcToast("green", `O(log N) — only ${calls} calls!`);
  }

  scRenderMiniStack("sc-cust-stack", frames.slice(0, 6));
  document.getElementById("sc-cust-info").textContent =
    `${result} | ${complexity}`;
  scLog("sc-cust-log", result, "q-log-result");
  scLog("sc-cust-log", complexity, "q-log-result");
  scLog("sc-cust-log", `Stack depth: ${stackDepth}`, "q-log-info");
}

function scCcCard(type) {
  ["linear", "expo"].forEach((t) => {
    const c = document.getElementById("qcc-" + t);
    if (c) c.classList.remove("qcc-active");
  });
  clearTimeout(ccTimer);
  const card = document.getElementById("qcc-" + type);
  if (card) {
    card.classList.add("qcc-active");
    ccTimer = setTimeout(() => card.classList.remove("qcc-active"), 2500);
  }
}
function showCcToast(type, msg) {
  const toast = document.getElementById("q-cc-toast");
  document.getElementById("q-cc-toast-icon").textContent =
    type === "green" ? "✓" : type === "orange" ? "⚠" : "ℹ";
  document.getElementById("q-cc-toast-text").textContent = msg;
  toast.className = "q-cc-toast show-toast qtoast-" + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (toast.className = "q-cc-toast"), 3000);
}

/* 
   CODE TEMPLATES
*/
let codeEditor,
  currentCodeOp = "factorial",
  currentLang = "cpp";

const OP_LABELS = {
  factorial: "Factorial",
  fibonacci: "Fibonacci",
  sum: "Sum of N",
  power: "Power(b,exp)",
  countdown: "Countdown",
  printdigits: "Print Digits",
  reversestr: "Reverse String",
  palindrome: "Palindrome Check",
  binarysearch: "Binary Search",
  gcd: "GCD (Euclid)",
};

const CODE_TEMPLATES = {
  factorial: {
    cpp: `#include <iostream>
using namespace std;

// Time: O(N)  |  Space: O(N) stack frames
long long factorial(int n) {
    // Base Case: 0! = 1
    if (n == 0) return 1;

    // Recursive Case: n! = n × (n-1)!
    return (long long)n * factorial(n - 1);
}

int main() {
    int n;
    cout << "Enter n: "; cin >> n;
    cout << n << "! = " << factorial(n) << endl;
    return 0;
}`,
    python: `# Time: O(N)  |  Space: O(N) stack frames
def factorial(n):
    # Base Case: 0! = 1
    if n == 0:
        return 1
    # Recursive Case: n! = n × (n-1)!
    return n * factorial(n - 1)

n = int(input("Enter n: "))
print(f"{n}! = {factorial(n)}")`,
    java: `import java.util.Scanner;
public class Factorial {
    // Time: O(N)  |  Space: O(N) stack frames
    static long factorial(int n) {
        // Base Case
        if (n == 0) return 1;
        // Recursive Case
        return (long) n * factorial(n - 1);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: "); int n = sc.nextInt();
        System.out.println(n + "! = " + factorial(n));
    }
}`,
    c: `#include <stdio.h>
// Time: O(N)  |  Space: O(N) stack frames
long long factorial(int n) {
    if (n == 0) return 1;          // Base Case
    return n * factorial(n - 1);  // Recursive Case
}
int main() {
    int n; printf("Enter n: "); scanf("%d", &n);
    printf("%d! = %lld\\n", n, factorial(n));
    return 0;
}`,
    javascript: `// Time: O(N)  |  Space: O(N) stack frames
function factorial(n) {
    // Base Case: 0! = 1
    if (n === 0) return 1;
    // Recursive Case: n! = n × (n-1)!
    return n * factorial(n - 1);
}

const n = parseInt(prompt("Enter n:")) || 5;
console.log(\`\${n}! = \${factorial(n)}\`);`,
  },
  fibonacci: {
    cpp: `#include <iostream>
using namespace std;

// Naïve: Time O(2^n)  |  Space O(N) stack depth
int fibonacci(int n) {
    // Base Cases: fib(0)=0, fib(1)=1
    if (n <= 1) return n;

    // Recursive Case: fib(n) = fib(n-1) + fib(n-2)
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n;
    cout << "Enter n: "; cin >> n;
    cout << "fib(" << n << ") = " << fibonacci(n) << endl;
    return 0;
}`,
    python: `# Naïve: Time O(2^n)  |  Space O(N) stack depth
def fibonacci(n):
    # Base Cases
    if n <= 1:
        return n
    # Recursive Case: both branches
    return fibonacci(n - 1) + fibonacci(n - 2)

n = int(input("Enter n: "))
print(f"fib({n}) = {fibonacci(n)}")`,
    java: `import java.util.Scanner;
public class Fibonacci {
    // Naïve: Time O(2^n)  |  Space O(N)
    static int fibonacci(int n) {
        if (n <= 1) return n;       // Base Cases
        return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: "); int n = sc.nextInt();
        System.out.println("fib(" + n + ") = " + fibonacci(n));
    }
}`,
    c: `#include <stdio.h>
// Naïve: Time O(2^n)  |  Space O(N)
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
int main() {
    int n; printf("Enter n: "); scanf("%d", &n);
    printf("fib(%d) = %d\\n", n, fibonacci(n));
    return 0;
}`,
    javascript: `// Naïve: Time O(2^n)  |  Space O(N) stack depth
function fibonacci(n) {
    // Base Cases
    if (n <= 1) return n;
    // Two recursive branches!
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const n = parseInt(prompt("Enter n:")) || 6;
console.log(\`fib(\${n}) = \${fibonacci(n)}\`);`,
  },
  sum: {
    cpp: `#include <iostream>
using namespace std;

// Time: O(N)  |  Space: O(N) stack frames
int sumN(int n) {
    // Base Case: sum(0) = 0
    if (n == 0) return 0;

    // Recursive Case: n + sum(n-1)
    return n + sumN(n - 1);
}

int main() {
    int n;
    cout << "Enter n: "; cin >> n;
    cout << "Sum(1.." << n << ") = " << sumN(n) << endl;
    return 0;
}`,
    python: `# Time: O(N)  |  Space: O(N) stack frames
def sum_n(n):
    # Base Case: sum(0) = 0
    if n == 0:
        return 0
    # Recursive Case: n + sum(n-1)
    return n + sum_n(n - 1)

n = int(input("Enter n: "))
print(f"Sum(1..{n}) = {sum_n(n)}")`,
    java: `import java.util.Scanner;
public class SumN {
    // Time: O(N)  |  Space: O(N) frames
    static int sumN(int n) {
        if (n == 0) return 0;        // Base Case
        return n + sumN(n - 1);      // Recursive
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: "); int n = sc.nextInt();
        System.out.println("Sum(1.." + n + ") = " + sumN(n));
    }
}`,
    c: `#include <stdio.h>
// Time: O(N)  |  Space: O(N)
int sumN(int n) {
    if (n == 0) return 0;
    return n + sumN(n - 1);
}
int main() {
    int n; printf("Enter n: "); scanf("%d", &n);
    printf("Sum(1..%d) = %d\\n", n, sumN(n));
    return 0;
}`,
    javascript: `// Time: O(N)  |  Space: O(N) stack frames
function sumN(n) {
    // Base Case
    if (n === 0) return 0;
    // Recursive Case
    return n + sumN(n - 1);
}

const n = parseInt(prompt("Enter n:")) || 5;
console.log(\`Sum(1..\${n}) = \${sumN(n)}\`);`,
  },
  power: {
    cpp: `#include <iostream>
using namespace std;

// Time: O(exp)  |  Space: O(exp) stack frames
double power(double base, int exp) {
    // Base Case: b^0 = 1
    if (exp == 0) return 1;

    // Recursive Case: b^n = b × b^(n-1)
    return base * power(base, exp - 1);
}

// Optimized: O(log exp) with fast exponentiation
double fastPower(double base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        double half = fastPower(base, exp / 2);
        return half * half;   // reuse result!
    }
    return base * fastPower(base, exp - 1);
}

int main() {
    double b; int e;
    cout << "Base: "; cin >> b;
    cout << "Exp: ";  cin >> e;
    cout << b << "^" << e << " = " << power(b, e) << endl;
    cout << "Fast: " << fastPower(b, e) << endl;
    return 0;
}`,
    python: `# Time: O(exp)  |  Space: O(exp)
def power(base, exp):
    # Base Case: b^0 = 1
    if exp == 0:
        return 1
    # Recursive Case
    return base * power(base, exp - 1)

# Optimized O(log exp)
def fast_power(base, exp):
    if exp == 0: return 1
    if exp % 2 == 0:
        half = fast_power(base, exp // 2)
        return half * half
    return base * fast_power(base, exp - 1)

b = float(input("Base: "))
e = int(input("Exp: "))
print(f"{b}^{e} = {power(b, e)}")
print(f"Fast: {fast_power(b, e)}")`,
    java: `import java.util.Scanner;
public class Power {
    // Time: O(exp)  |  Space: O(exp)
    static double power(double base, int exp) {
        if (exp == 0) return 1;       // Base Case
        return base * power(base, exp - 1);
    }
    static double fastPower(double base, int exp) {
        if (exp == 0) return 1;
        if (exp % 2 == 0) { double h = fastPower(base, exp/2); return h*h; }
        return base * fastPower(base, exp-1);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Base: "); double b = sc.nextDouble();
        System.out.print("Exp: ");  int    e = sc.nextInt();
        System.out.println(b + "^" + e + " = " + power(b, e));
    }
}`,
    c: `#include <stdio.h>
double power(double base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}
int main() {
    double b; int e;
    printf("Base: "); scanf("%lf", &b);
    printf("Exp: ");  scanf("%d", &e);
    printf("%.0lf^%d = %.0lf\\n", b, e, power(b, e));
    return 0;
}`,
    javascript: `// Time: O(exp)  |  Space: O(exp)
function power(base, exp) {
    if (exp === 0) return 1;         // Base Case
    return base * power(base, exp - 1);
}

// Optimized O(log exp)
function fastPower(base, exp) {
    if (exp === 0) return 1;
    if (exp % 2 === 0) { const h = fastPower(base, exp/2); return h*h; }
    return base * fastPower(base, exp - 1);
}

const b = parseFloat(prompt("Base:")) || 2;
const e = parseInt(prompt("Exp:"))  || 8;
console.log(\`\${b}^\${e} = \${power(b, e)}\`);`,
  },
  countdown: {
    cpp: `#include <iostream>
using namespace std;

// Time: O(N)  |  Space: O(N) — tail recursion
void countdown(int n) {
    // Base Case: stop when negative
    if (n < 0) {
        cout << "Blastoff! 🚀" << endl;
        return;
    }
    cout << n << "... ";

    // Recursive Case: call with n-1 (tail call)
    countdown(n - 1);
}

int main() {
    int n;
    cout << "Start countdown from: "; cin >> n;
    countdown(n);
    return 0;
}`,
    python: `# Time: O(N)  |  Space: O(N) — tail recursion
def countdown(n):
    # Base Case
    if n < 0:
        print("Blastoff! 🚀")
        return
    print(n, end="... ")
    # Recursive Case (tail call)
    countdown(n - 1)

n = int(input("Start countdown from: "))
countdown(n)`,
    java: `import java.util.Scanner;
public class Countdown {
    // Time: O(N)  |  Space: O(N)
    static void countdown(int n) {
        if (n < 0) {               // Base Case
            System.out.println("Blastoff! 🚀"); return;
        }
        System.out.print(n + "... ");
        countdown(n - 1);          // Tail call
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Start from: "); int n = sc.nextInt();
        countdown(n);
    }
}`,
    c: `#include <stdio.h>
void countdown(int n) {
    if (n < 0) { printf("Blastoff!\\n"); return; }
    printf("%d... ", n);
    countdown(n - 1);
}
int main() {
    int n; printf("Start from: "); scanf("%d", &n);
    countdown(n); return 0;
}`,
    javascript: `// Time: O(N)  |  Space: O(N)
function countdown(n) {
    // Base Case
    if (n < 0) { console.log("Blastoff! 🚀"); return; }
    process.stdout ? process.stdout.write(n + "... ") : console.log(n);
    // Recursive Case
    countdown(n - 1);
}

const n = parseInt(prompt("Start from:")) || 5;
countdown(n);`,
  },
  printdigits: {
    cpp: `#include <iostream>
using namespace std;

// Time: O(log N)  |  Space: O(log N) — digits count
void printDigits(int n) {
    // Base Case: single digit — just print it
    if (n < 10) {
        cout << n;
        return;
    }
    // Recursive Case: print all-but-last digits first
    printDigits(n / 10);

    // Then print last digit (on the way back)
    cout << (n % 10);
}

int main() {
    int n;
    cout << "Enter number: "; cin >> n;
    cout << "Digits: "; printDigits(n); cout << endl;
    return 0;
}`,
    python: `# Time: O(log N)  |  Space: O(log N)
def print_digits(n):
    # Base Case: single digit
    if n < 10:
        print(n, end='')
        return
    # Recursive: go deeper first, then print current digit
    print_digits(n // 10)
    print(n % 10, end='')

n = int(input("Enter number: "))
print("Digits: ", end='')
print_digits(n)
print()  # newline`,
    java: `import java.util.Scanner;
public class PrintDigits {
    // Time: O(log N)  |  Space: O(log N)
    static void printDigits(int n) {
        if (n < 10) { System.out.print(n); return; }  // Base
        printDigits(n / 10);         // Recurse deeper
        System.out.print(n % 10);   // Print on the way back
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: "); int n = sc.nextInt();
        System.out.print("Digits: "); printDigits(n); System.out.println();
    }
}`,
    c: `#include <stdio.h>
void printDigits(int n) {
    if (n < 10) { printf("%d", n); return; }
    printDigits(n / 10);
    printf("%d", n % 10);
}
int main() {
    int n; printf("Enter number: "); scanf("%d", &n);
    printf("Digits: "); printDigits(n); printf("\\n");
    return 0;
}`,
    javascript: `// Time: O(log N)  |  Space: O(log N)
function printDigits(n) {
    // Base Case: single digit
    if (n < 10) { process.stdout ? process.stdout.write(String(n)) : null; return n.toString(); }
    // Recurse first, then print this digit
    return printDigits(Math.floor(n / 10)) + (n % 10);
}

const n = parseInt(prompt("Enter number:")) || 12345;
console.log("Digits:", printDigits(n));`,
  },
  reversestr: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

// Time: O(N)  |  Space: O(N) stack + strings
string reverseStr(const string& s) {
    // Base Case: empty or single char
    if (s.length() <= 1) return s;

    // Recursive Case: reverse rest + first char
    return reverseStr(s.substr(1)) + s[0];
}

// In-place using two pointers (more efficient)
void reverseInPlace(string& s, int lo, int hi) {
    if (lo >= hi) return;          // Base Case
    swap(s[lo], s[hi]);            // Swap pointers
    reverseInPlace(s, lo + 1, hi - 1);  // Recurse inward
}

int main() {
    string s;
    cout << "Enter string: "; cin >> s;
    cout << "Reversed: " << reverseStr(s) << endl;
    return 0;
}`,
    python: `# Time: O(N)  |  Space: O(N)
def reverse_str(s):
    # Base Case
    if len(s) <= 1:
        return s
    # Recursive Case: reverse(s[1:]) + s[0]
    return reverse_str(s[1:]) + s[0]

# Two-pointer approach
def reverse_in_place(s, lo, hi):
    if lo >= hi: return s          # Base Case
    s[lo], s[hi] = s[hi], s[lo]
    return reverse_in_place(s, lo+1, hi-1)

s = input("Enter string: ")
print("Reversed:", reverse_str(s))`,
    java: `import java.util.Scanner;
public class ReverseStr {
    // Time: O(N)  |  Space: O(N)
    static String reverseStr(String s) {
        if (s.length() <= 1) return s;          // Base Case
        return reverseStr(s.substring(1)) + s.charAt(0);
    }
    static void reverseInPlace(char[] s, int lo, int hi) {
        if (lo >= hi) return;
        char tmp = s[lo]; s[lo] = s[hi]; s[hi] = tmp;
        reverseInPlace(s, lo + 1, hi - 1);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: "); String s = sc.next();
        System.out.println("Reversed: " + reverseStr(s));
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
void reverseInPlace(char* s, int lo, int hi) {
    if (lo >= hi) return;
    char tmp = s[lo]; s[lo] = s[hi]; s[hi] = tmp;
    reverseInPlace(s, lo + 1, hi - 1);
}
int main() {
    char s[100]; printf("Enter string: "); scanf("%s", s);
    reverseInPlace(s, 0, strlen(s) - 1);
    printf("Reversed: %s\\n", s);
    return 0;
}`,
    javascript: `// Time: O(N)  |  Space: O(N)
function reverseStr(s) {
    // Base Case
    if (s.length <= 1) return s;
    // Recursive: reverse(rest) + first char
    return reverseStr(s.slice(1)) + s[0];
}

const s = prompt("Enter string:") || "hello";
console.log("Reversed:", reverseStr(s));`,
  },
  palindrome: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

// Time: O(N/2) = O(N)  |  Space: O(N/2) stack
bool isPalindrome(const string& s) {
    // Base Cases: 0 or 1 char is always palindrome
    if (s.length() <= 1) return true;

    // If first != last, NOT a palindrome
    if (s.front() != s.back()) return false;

    // Recurse on the inner substring
    return isPalindrome(s.substr(1, s.length() - 2));
}

int main() {
    string s;
    cout << "Enter string: "; cin >> s;
    cout << s << (isPalindrome(s) ? " IS" : " is NOT")
         << " a palindrome" << endl;
    return 0;
}`,
    python: `# Time: O(N/2) = O(N)  |  Space: O(N/2)
def is_palindrome(s):
    # Base Cases
    if len(s) <= 1:
        return True
    # Mismatch at edges
    if s[0] != s[-1]:
        return False
    # Recurse on inner substring
    return is_palindrome(s[1:-1])

s = input("Enter string: ")
res = is_palindrome(s)
print(f'"{s}" {"IS" if res else "is NOT"} a palindrome')`,
    java: `import java.util.Scanner;
public class Palindrome {
    // Time: O(N)  |  Space: O(N) stack
    static boolean isPalindrome(String s) {
        if (s.length() <= 1) return true;       // Base Case
        if (s.charAt(0) != s.charAt(s.length()-1)) return false;
        return isPalindrome(s.substring(1, s.length()-1));
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: "); String s = sc.next();
        System.out.println(s + (isPalindrome(s) ? " IS" : " is NOT") + " a palindrome");
    }
}`,
    c: `#include <stdio.h>
#include <string.h>
int isPal(const char* s, int lo, int hi) {
    if (lo >= hi) return 1;
    if (s[lo] != s[hi]) return 0;
    return isPal(s, lo+1, hi-1);
}
int main() {
    char s[100]; printf("Enter string: "); scanf("%s", s);
    printf("%s %s a palindrome\\n", s, isPal(s, 0, strlen(s)-1)?"IS":"is NOT");
    return 0;
}`,
    javascript: `// Time: O(N/2)  |  Space: O(N/2)
function isPalindrome(s) {
    // Base Cases
    if (s.length <= 1) return true;
    if (s[0] !== s[s.length - 1]) return false;
    // Recurse inward
    return isPalindrome(s.slice(1, -1));
}

const s = prompt("Enter string:") || "racecar";
console.log(\`"\${s}" \${isPalindrome(s) ? "IS" : "is NOT"} a palindrome\`);`,
  },
  binarysearch: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

// Time: O(log N)  |  Space: O(log N) stack
int binarySearch(const vector<int>& arr, int target, int lo, int hi) {
    // Base Case: not found
    if (lo > hi) return -1;

    int mid = lo + (hi - lo) / 2;

    if (arr[mid] == target) return mid;          // Found!
    else if (arr[mid] < target)
        return binarySearch(arr, target, mid+1, hi);  // Go right
    else
        return binarySearch(arr, target, lo, mid-1);  // Go left
}

int main() {
    vector<int> arr = {1,3,5,7,9,11,13,15,17,19};
    int target;
    cout << "Array: [1,3,5,7,9,11,13,15,17,19]" << endl;
    cout << "Search target: "; cin >> target;
    int idx = binarySearch(arr, target, 0, arr.size()-1);
    if (idx != -1) cout << "Found at index: " << idx << endl;
    else cout << target << " not found" << endl;
    return 0;
}`,
    python: `# Time: O(log N)  |  Space: O(log N)
def binary_search(arr, target, lo, hi):
    # Base Case: not found
    if lo > hi:
        return -1

    mid = (lo + hi) // 2

    if arr[mid] == target:
        return mid                               # Found!
    elif arr[mid] < target:
        return binary_search(arr, target, mid+1, hi)   # Right
    else:
        return binary_search(arr, target, lo, mid-1)   # Left

arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
print("Array:", arr)
target = int(input("Search target: "))
idx = binary_search(arr, target, 0, len(arr)-1)
print(f"Found at index: {idx}" if idx != -1 else f"{target} not found")`,
    java: `import java.util.Scanner;
public class BinarySearch {
    // Time: O(log N)  |  Space: O(log N)
    static int binarySearch(int[] arr, int target, int lo, int hi) {
        if (lo > hi) return -1;               // Base Case
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;   // Found
        else if (arr[mid] < target) return binarySearch(arr, target, mid+1, hi);
        else return binarySearch(arr, target, lo, mid-1);
    }
    public static void main(String[] args) {
        int[] arr = {1,3,5,7,9,11,13,15,17,19};
        Scanner sc = new Scanner(System.in);
        System.out.print("Target: "); int t = sc.nextInt();
        int idx = binarySearch(arr, t, 0, arr.length-1);
        System.out.println(idx != -1 ? "Found at: " + idx : t + " not found");
    }
}`,
    c: `#include <stdio.h>
int binarySearch(int arr[], int target, int lo, int hi) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) return binarySearch(arr, target, mid+1, hi);
    else return binarySearch(arr, target, lo, mid-1);
}
int main() {
    int arr[] = {1,3,5,7,9,11,13,15,17,19};
    int t; printf("Target: "); scanf("%d", &t);
    int idx = binarySearch(arr, t, 0, 9);
    if (idx != -1) printf("Found at index: %d\\n", idx);
    else printf("Not found\\n");
    return 0;
}`,
    javascript: `// Time: O(log N)  |  Space: O(log N)
function binarySearch(arr, target, lo, hi) {
    // Base Case: not found
    if (lo > hi) return -1;

    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;          // Found!
    else if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, hi);  // Right
    else
        return binarySearch(arr, target, lo, mid - 1);  // Left
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = parseInt(prompt("Search target:")) || 7;
const idx = binarySearch(arr, target, 0, arr.length - 1);
console.log(idx !== -1 ? \`Found at index: \${idx}\` : \`\${target} not found\`);`,
  },
  gcd: {
    cpp: `#include <iostream>
using namespace std;

// Euclidean Algorithm — Time: O(log min(a,b))
int gcd(int a, int b) {
    // Base Case: when b becomes 0, a is the GCD
    if (b == 0) return a;

    // Recursive Case: gcd(a,b) = gcd(b, a mod b)
    return gcd(b, a % b);
}

// Extended GCD (Bezout's identity)
int extGCD(int a, int b, int& x, int& y) {
    if (b == 0) { x = 1; y = 0; return a; }
    int x1, y1;
    int g = extGCD(b, a % b, x1, y1);
    x = y1; y = x1 - (a / b) * y1;
    return g;
}

int main() {
    int a, b;
    cout << "Enter a: "; cin >> a;
    cout << "Enter b: "; cin >> b;
    cout << "GCD(" << a << ", " << b << ") = " << gcd(a, b) << endl;
    return 0;
}`,
    python: `# Euclidean Algorithm — Time: O(log min(a,b))
def gcd(a, b):
    # Base Case: when b = 0, GCD is a
    if b == 0:
        return a
    # Recursive Case: gcd(a,b) = gcd(b, a mod b)
    return gcd(b, a % b)

a = int(input("Enter a: "))
b = int(input("Enter b: "))
print(f"GCD({a}, {b}) = {gcd(a, b)}")`,
    java: `import java.util.Scanner;
public class GCD {
    // Euclidean: Time O(log min(a,b))
    static int gcd(int a, int b) {
        if (b == 0) return a;            // Base Case
        return gcd(b, a % b);           // Recursive
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a: "); int a = sc.nextInt();
        System.out.print("Enter b: "); int b = sc.nextInt();
        System.out.println("GCD(" + a + ", " + b + ") = " + gcd(a, b));
    }
}`,
    c: `#include <stdio.h>
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
int main() {
    int a, b;
    printf("Enter a: "); scanf("%d", &a);
    printf("Enter b: "); scanf("%d", &b);
    printf("GCD(%d, %d) = %d\\n", a, b, gcd(a, b));
    return 0;
}`,
    javascript: `// Euclidean Algorithm — Time: O(log min(a,b))
function gcd(a, b) {
    // Base Case: when b = 0, GCD is a
    if (b === 0) return a;
    // Recursive Case
    return gcd(b, a % b);
}

const a = parseInt(prompt("Enter a:")) || 48;
const b = parseInt(prompt("Enter b:")) || 18;
console.log(\`GCD(\${a}, \${b}) = \${gcd(a, b)}\`);`,
  },
};

const RUN_INPUTS = {
  factorial: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">n</label><input type="number" id="ri-n" class="form-control" value="5" min="0" max="12"></div><div></div></div>`,
  fibonacci: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">n (keep ≤ 10)</label><input type="number" id="ri-n" class="form-control" value="6" min="0" max="10"></div><div></div></div>`,
  sum: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">n</label><input type="number" id="ri-n" class="form-control" value="5"></div><div></div></div>`,
  power: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Base (b)</label><input type="number" id="ri-n" class="form-control" value="2"></div><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Exponent</label><input type="number" id="ri-arg" class="form-control" value="8"></div></div>`,
  countdown: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Start from n</label><input type="number" id="ri-n" class="form-control" value="5"></div><div></div></div>`,
  printdigits: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Number</label><input type="number" id="ri-n" class="form-control" value="12345"></div><div></div></div>`,
  reversestr: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label><input type="text" id="ri-str" class="form-control" value="hello"></div><div></div></div>`,
  palindrome: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">String</label><input type="text" id="ri-str" class="form-control" value="racecar"></div><div></div></div>`,
  binarysearch: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">Target (array: 1,3,5,7,9,11,13,15,17,19)</label><input type="number" id="ri-n" class="form-control" value="7"></div><div></div></div>`,
  gcd: `<div class="input-grid"><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">a</label><input type="number" id="ri-n" class="form-control" value="48"></div><div><label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px;">b</label><input type="number" id="ri-arg" class="form-control" value="18"></div></div>`,
};

function setCodeOp(op) {
  currentCodeOp = op;
  document
    .querySelectorAll(".impl-opt")
    .forEach((o) => o.classList.toggle("active", o.dataset.cop === op));
  const cm = CODE_TEMPLATES[op];
  if (cm) codeEditor.setValue(cm[currentLang] || "// Not yet available");
  document.getElementById("editorLabel").textContent =
    `${currentLang.toUpperCase()} — ${OP_LABELS[op]}`;
  document.getElementById("runInputArea").innerHTML = RUN_INPUTS[op] || "";
  document.getElementById("codeOutput").textContent =
    "Fill inputs and click Run...";
}

function runCode() {
  const nEl = document.getElementById("ri-n"),
    sEl = document.getElementById("ri-str"),
    argEl = document.getElementById("ri-arg");
  const nv = nEl ? parseInt(nEl.value) || 0 : 0;
  const sv = sEl ? sEl.value : "";
  const av = argEl ? parseInt(argEl.value) || 0 : 0;
  const out = document.getElementById("codeOutput");
  out.innerHTML = '<span style="color:var(--primary-cyan)">[Executing…]</span>';

  setTimeout(() => {
    if (currentLang === "javascript") {
      try {
        const logs = [];
        const orig = console.log;
        console.log = (...a) => logs.push(a.map((x) => x).join(" "));
        let code = codeEditor.getValue();
        // patch prompts
        code = code.replace(
          /parseInt\(prompt\([^)]*\)\)|parseFloat\(prompt\([^)]*\)\)/g,
          nv,
        );
        code = code.replace(/prompt\([^)]*\)/g, `"${sv || nv}"`);
        eval(code);
        console.log = orig;
        out.innerHTML =
          logs
            .map((l) => `<span style="color:var(--primary-green)">${l}</span>`)
            .join("<br>") || "(No output)";
      } catch (e) {
        out.innerHTML = `<span style="color:var(--primary-red)">Error: ${e.message}</span>`;
      }
      return;
    }
    // Simulate output
    const fmt = (label, val, col = "var(--primary-green)") =>
      `<span style="color:${col}">${label}: ${val}</span>`;
    let html = "";
    const op = currentCodeOp;
    const header = `<span style="color:var(--primary-purple)">[Simulated ${currentLang.toUpperCase()} Output]</span><br><br>`;

    if (op === "factorial") {
      function fact(n) {
        let r = 1;
        for (let i = 2; i <= n; i++) r *= i;
        return r;
      }
      const n = Math.min(nv, 12);
      html = header;
      for (let i = 0; i <= n; i++)
        html += `<span style="color:var(--text-secondary)">factorial(${n - i})${i < n ? ` → calls factorial(${n - i - 1})` : "→ BASE CASE = 1"}</span><br>`;
      html += `<br>` + fmt(`${n}! = `, fact(n), "var(--primary-green)");
    } else if (op === "fibonacci") {
      function fib(n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
      }
      let calls = 0;
      function c(n) {
        calls++;
        if (n <= 1) return;
        c(n - 1);
        c(n - 2);
      }
      const n = Math.min(nv, 10);
      c(n);
      html =
        header +
        `<span style="color:var(--text-secondary)">fib(${n}) → branches into fib(${n - 1}) and fib(${n - 2})</span><br><span style="color:var(--primary-orange)">Total function calls: ${calls} (O(2ⁿ))</span><br><br>` +
        fmt(`fib(${n}) = `, fib(n));
    } else if (op === "sum") {
      const s = (nv * (nv + 1)) / 2;
      html = header;
      for (let i = nv; i >= 0; i--)
        html += `<span style="color:var(--text-secondary)">sum(${i}) → ${i === 0 ? "0 (base)" : "returns " + i + " + sum(" + (i - 1) + ")"}</span><br>`;
      html += `<br>` + fmt(`Sum(1..${nv}) = `, s);
    } else if (op === "power") {
      const r = Math.pow(nv, av);
      html = header;
      for (let i = av; i >= 0; i--)
        html += `<span style="color:var(--text-secondary)">power(${nv},${i}) → ${i === 0 ? "1 (base)" : nv + " × power(" + nv + "," + (i - 1) + ")"}</span><br>`;
      html += `<br>` + fmt(`${nv}^${av} = `, r, "var(--primary-purple)");
    } else if (op === "countdown") {
      html = header;
      for (let i = nv; i >= -1; i--)
        html += `<span style="color:${i < 0 ? "var(--primary-green)" : "var(--text-secondary)"}">countdown(${i}) → ${i < 0 ? "🚀 Blastoff!" : "print " + i + ", call countdown(" + (i - 1) + ")"}</span><br>`;
    } else if (op === "printdigits") {
      const digits = nv.toString().split("").join(", ");
      html = header;
      let t = nv;
      while (t >= 10) {
        html += `<span style="color:var(--text-secondary)">printDigits(${t}) → calls printDigits(${Math.floor(t / 10)}), then prints ${t % 10}</span><br>`;
        t = Math.floor(t / 10);
      }
      html += `<span style="color:var(--primary-orange)">printDigits(${t}) → base! print ${t}</span><br><br>`;
      html += fmt("Digits:", digits, "var(--primary-purple)");
    } else if (op === "reversestr") {
      const r = sv.split("").reverse().join("");
      html = header;
      for (let i = 0; i < sv.length; i++)
        html += `<span style="color:var(--text-secondary)">reverse("${sv.slice(i)}") → reverse("${sv.slice(i + 1)}") + '${sv[i]}'</span><br>`;
      html += `<span style="color:var(--primary-orange)">BASE: "" → ""</span><br><br>`;
      html += fmt("Reversed:", `"${r}"`, "var(--primary-cyan)");
    } else if (op === "palindrome") {
      function isPal(s) {
        if (s.length <= 1) return true;
        if (s[0] !== s[s.length - 1]) return false;
        return isPal(s.slice(1, -1));
      }
      const res = isPal(sv);
      html = header;
      let tmp = sv;
      while (tmp.length > 1) {
        const m = tmp[0] === tmp[tmp.length - 1];
        html += `<span style="color:${m ? "var(--primary-green)" : "var(--primary-red)"}">isPal("${tmp}") → '${tmp[0]}' ${m ? "==" : "!="} '${tmp[tmp.length - 1]}' → ${m ? "check inner" : "FALSE"}</span><br>`;
        if (!m) break;
        tmp = tmp.slice(1, -1);
      }
      if (tmp.length <= 1)
        html += `<span style="color:var(--primary-orange)">BASE: "${tmp}" ≤1 char → true</span><br>`;
      html +=
        `<br>` +
        fmt(
          `"${sv}" is`,
          res ? "✓ a palindrome" : "✗ NOT a palindrome",
          res ? "var(--primary-green)" : "var(--primary-red)",
        );
    } else if (op === "binarysearch") {
      const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
      const t = nv;
      html =
        header +
        `<span style="color:var(--text-secondary)">Array: [${arr.join(",")}]  Target: ${t}</span><br><br>`;
      let lo = 0,
        hi = arr.length - 1,
        steps = 0;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        steps++;
        const hit = arr[mid] === t;
        html += `<span style="color:${hit ? "var(--primary-green)" : "var(--text-secondary)"}">Step ${steps}: mid=${mid} → arr[${mid}]=${arr[mid]} ${hit ? "== FOUND!" : arr[mid] < t ? "< target, go right" : "> target, go left"}</span><br>`;
        if (hit) {
          html += `<br>` + fmt("Found at index", mid, "var(--primary-green)");
          break;
        } else if (arr[mid] < t) lo = mid + 1;
        else hi = mid - 1;
        if (lo > hi) {
          html += `<br>` + fmt("Not found", "-1", "var(--primary-red)");
          break;
        }
      }
    } else if (op === "gcd") {
      function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
      }
      let a = nv,
        b = av;
      html = header;
      while (b !== 0) {
        html += `<span style="color:var(--text-secondary)">gcd(${a},${b}) → gcd(${b}, ${a % b})</span><br>`;
        const r = a % b;
        a = b;
        b = r;
      }
      html += `<span style="color:var(--primary-orange)">gcd(${a},0) → BASE! return ${a}</span><br><br>`;
      html += fmt(`GCD(${nv},${av}) = `, a, "var(--primary-green)");
    }

    out.innerHTML = html;
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
  setCodeOp("factorial");
  setOp("factorial");
  document
    .getElementById("mainControls")
    .querySelector("button.btn-success").textContent = "🔨 Build";
  scInitBest();
  scInitAvg();
  scInitWorst();
  scCustomReset();

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
      const tpl = CODE_TEMPLATES[currentCodeOp];
      codeEditor.setValue(
        tpl ? tpl[currentLang] || "// Not yet available" : "",
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
  // Reset modal text in case it was changed
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
