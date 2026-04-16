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
  const c = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(c) + 1) % 3]);
});
applyTheme(localStorage.getItem("dsa-theme") || "dark");

/* ── CONCEPT ── */

const cPhases = [
  {
    arr: [7, 2, 9, 4, 6, 1, 8, 3, 5],
    pivot: -1,
    left: -1,
    right: -1,
    sorted: [],
    label: "Original array — pivot will be last element (5)",
  },
  {
    arr: [2, 4, 1, 3, 5, 6, 8, 9, 7],
    pivot: 4,
    left: [0, 1, 2, 3],
    right: [5, 6, 7, 8],
    sorted: [4],
    label: "After first partition: 5 is in final position [4]. Left≤5, Right>5",
  },
  {
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    pivot: -1,
    left: [],
    right: [],
    sorted: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    label: "Recurse on sub-arrays → fully sorted!",
  },
];
let cPhaseIdx = 0;
function renderConceptBars(ph) {
  const el = document.getElementById("conceptBars");
  el.innerHTML = "";
  const mx = Math.max(...ph.arr);
  ph.arr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "bar";
    b.style.height = Math.max(18, Math.round((v / mx) * 85)) + "px";
    if (ph.sorted.includes(i)) b.classList.add("sorted");
    else if (i === ph.pivot) b.classList.add("pivot");
    else if (ph.left.includes(i)) b.classList.add("less");
    else if (ph.right.includes(i)) b.classList.add("greater");
    else b.classList.add("def");
    b.textContent = v;
    el.appendChild(b);
  });
  document.getElementById("conceptStatus").innerHTML =
    `<span style="color:var(--primary-orange)">${ph.label}</span>`;
}
function conceptStep() {
  if (cPhaseIdx >= cPhases.length) {
    conceptReset();
    return;
  }
  renderConceptBars(cPhases[cPhaseIdx]);
  cPhaseIdx++;
}
function conceptReset() {
  cPhaseIdx = 0;
  renderConceptBars(cPhases[0]);
  document.getElementById("conceptStatus").textContent =
    'Click "Next Partition" to step through quick sort';
}
renderConceptBars(cPhases[0]);

/* ── HELPER: build mini bars ── */
function buildMB(elId, arr, classes = []) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  const mx = Math.max(...arr, 1);
  arr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "smbar " + (classes[i] || "def");
    b.style.height = Math.max(10, Math.round((v / mx) * 52)) + "px";
    b.textContent = v;
    el.appendChild(b);
  });
}

/*  1. INTRO TO PARTITIONING*/
let introArr = [8, 3, 6, 1, 9, 4, 7, 2, 5],
  introOrig = [...introArr],
  introSorted = 0,
  introPivotVal = null;
const introSteps = [
  {
    arr: [8, 3, 6, 1, 9, 4, 7, 2, 5],
    cls: [],
    piv: "—",
    s: 0,
    msg: "Array ready — pivot = last element (5)",
  },
  {
    arr: [3, 1, 4, 2, 5, 9, 6, 7, 8],
    cls: ["lo", "lo", "lo", "lo", "piv", "hi", "hi", "hi", "hi"],
    piv: 5,
    s: 1,
    msg: "Partition done: [3,1,4,2] | 5 | [9,6,7,8]",
  },
  {
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    cls: Array(9).fill("done"),
    piv: "—",
    s: 9,
    msg: "Recurse on sub-arrays → fully sorted ✅",
  },
];
let introIdx = 0;
function introStep() {
  if (introIdx >= introSteps.length) {
    introReset();
    return;
  }
  const s = introSteps[introIdx];
  buildMB("introBars", s.arr, s.cls);
  document.getElementById("introStatus").innerHTML = `<span>${s.msg}</span>`;
  document.getElementById("introPivot").textContent = s.piv;
  document.getElementById("introSorted").textContent = s.s;
  introIdx++;
}
function introReset() {
  introIdx = 0;
  buildMB("introBars", introOrig);
  document.getElementById("introStatus").textContent =
    "Ready to partition — pivot = last element";
  document.getElementById("introPivot").textContent = "—";
  document.getElementById("introSorted").textContent = 0;
}
buildMB("introBars", introOrig);

/*  2. DB QUICKSORT  */
const dbRows = [
  { id: 347, name: "Eve" },
  { id: 101, name: "Alice" },
  { id: 289, name: "Dave" },
  { id: 412, name: "Grace" },
  { id: 156, name: "Bob" },
  { id: 203, name: "Carol" },
];
let dbQsArr = [...dbRows],
  dbQsPass = 0;
const dbPivotColors = [
  "var(--primary-orange)",
  "var(--primary-amber)",
  "var(--primary-yellow)",
];
function renderDbQs(pivotIdx = -1, leftEnd = -1) {
  const el = document.getElementById("dbQsList");
  el.innerHTML = "";
  dbQsArr.forEach((r, i) => {
    const d = document.createElement("div");
    const isPivot = i === pivotIdx;
    const isLeft = leftEnd >= 0 && i < leftEnd;
    const isRight = leftEnd >= 0 && i > pivotIdx;
    d.className =
      "list-item " +
      (isPivot ? "pivot" : isLeft ? "less" : isRight ? "greater" : "idle");
    d.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:.68rem;min-width:38px">${r.id}</span><span style="flex:1;font-size:.76rem;font-weight:600">${r.name}</span>${isPivot ? '<span style="font-size:.62rem;font-weight:700;color:var(--primary-orange)">PIVOT</span>' : ""}`;
    el.appendChild(d);
  });
}
const dbSteps = [
  {
    arr: [...dbRows],
    pivotIdx: 5,
    leftEnd: 4,
    info: "Pivot = Carol(203) — IDs < 203 go left, > 203 go right",
  },
  {
    arr: [
      { id: 101, name: "Alice" },
      { id: 156, name: "Bob" },
      { id: 203, name: "Carol" },
      { id: 289, name: "Dave" },
      { id: 347, name: "Eve" },
      { id: 412, name: "Grace" },
    ],
    pivotIdx: 2,
    leftEnd: 2,
    info: "203 is in final position. Recurse on left [101,156] and right [289,347,412]",
  },
  {
    arr: [
      { id: 101, name: "Alice" },
      { id: 156, name: "Bob" },
      { id: 203, name: "Carol" },
      { id: 289, name: "Dave" },
      { id: 347, name: "Eve" },
      { id: 412, name: "Grace" },
    ],
    pivotIdx: -1,
    leftEnd: -1,
    info: "✅ All rows sorted by ID — B-tree index ready to build",
  },
];
let dbQsIdx = 0;
function dbQsStep() {
  if (dbQsIdx >= dbSteps.length) {
    dbQsReset();
    return;
  }
  const s = dbSteps[dbQsIdx];
  dbQsArr = [...s.arr];
  renderDbQs(s.pivotIdx, s.leftEnd);
  document.getElementById("dbQsInfo").innerHTML =
    `Step ${dbQsIdx + 1}: <b>${s.info}</b>`;
  dbQsIdx++;
}
function dbQsReset() {
  dbQsIdx = 0;
  dbQsArr = [...dbRows];
  renderDbQs();
  document.getElementById("dbQsInfo").textContent = "";
}
renderDbQs();

/* ── 3. QUICKSELECT ── */
const qsArr = [9, 3, 7, 1, 8, 4, 6, 2, 5];
const qsSteps = [
  {
    arr: [9, 3, 7, 1, 8, 4, 6, 2, 5],
    cls: [],
    msg: "Find 3rd largest (= 7). Pivot = 5",
  },
  {
    arr: [3, 1, 4, 2, 5, 9, 7, 8, 6],
    cls: ["lo", "lo", "lo", "lo", "piv", "hi", "hi", "hi", "hi"],
    msg: "Partition: 5 at index 4. 3rd largest is in right [9,7,8,6]",
  },
  {
    arr: [3, 1, 4, 2, 5, 6, 7, 9, 8],
    cls: ["def", "def", "def", "def", "done", "piv", "done", "hi", "hi"],
    msg: "Pivot=6 in right sub. 3rd largest in [9,8] — recurse right",
  },
  {
    arr: [3, 1, 4, 2, 5, 6, 7, 8, 9],
    cls: ["def", "def", "def", "def", "done", "done", "done", "done", "done"],
    msg: "✅ 3rd largest = 7 found at index 6 — O(n) average!",
  },
];
let qsIdx = 0;
function qselectStep() {
  if (qsIdx >= qsSteps.length) {
    qselectReset();
    return;
  }
  const s = qsSteps[qsIdx];
  buildMB("qselectBars", s.arr, s.cls);
  document.getElementById("qselectStatus").innerHTML = `<span>${s.msg}</span>`;
  document.getElementById("qselectInfo").innerHTML =
    qsIdx > 0
      ? `Step <b>${qsIdx}</b> — only recurse on relevant partition`
      : "";
  qsIdx++;
}
function qselectReset() {
  qsIdx = 0;
  buildMB("qselectBars", qsArr);
  document.getElementById("qselectStatus").textContent =
    "Find 3rd largest — QuickSelect homes in";
  document.getElementById("qselectInfo").textContent = "";
}
buildMB("qselectBars", qsArr);

/*  4. JS OBJECTS SORT  */
const jsObjs = [
  { k: "render", v: 85 },
  { k: "fetch", v: 42 },
  { k: "parse", v: 93 },
  { k: "init", v: 17 },
  { k: "sort", v: 67 },
  { k: "hash", v: 55 },
];
let jsArr = [...jsObjs],
  jsPass = 0;
function renderJsQs(pivotIdx = -1, leftEnd = -1, sorted = []) {
  const el = document.getElementById("jsQsList");
  el.innerHTML = "";
  jsArr.forEach((r, i) => {
    const isPivot = i === pivotIdx;
    const isL = leftEnd >= 0 && i < leftEnd;
    const isR = leftEnd >= 0 && i > pivotIdx;
    const isDone = sorted.includes(i);
    const d = document.createElement("div");
    d.className =
      "list-item " +
      (isDone
        ? "done"
        : isPivot
          ? "pivot"
          : isL
            ? "less"
            : isR
              ? "greater"
              : "idle");
    const bar = Math.round((r.v / 100) * 60);
    d.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:.65rem;min-width:45px;color:var(--text-secondary)">${r.k}</span><div style="flex:1;height:6px;background:var(--border-color);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${bar}%;background:${isDone ? "var(--primary-cyan)" : isPivot ? "var(--primary-orange)" : "rgba(255,255,255,.3)"};border-radius:3px;transition:width .3s"></div></div><span style="font-family:'JetBrains Mono',monospace;font-size:.68rem;min-width:28px;text-align:right">${r.v}</span>`;
    el.appendChild(d);
  });
}
const jsSteps = [
  {
    arr: [...jsObjs],
    piv: 5,
    le: 3,
    s: [],
    info: "Pivot = hash(55): parse(93),render(85),sort(67) go right",
  },
  {
    arr: [
      { k: "init", v: 17 },
      { k: "fetch", v: 42 },
      { k: "hash", v: 55 },
      { k: "sort", v: 67 },
      { k: "render", v: 85 },
      { k: "parse", v: 93 },
    ],
    piv: 2,
    le: 2,
    s: [2],
    info: "hash(55) in final slot. Recurse on [init,fetch] and [sort,render,parse]",
  },
  {
    arr: [
      { k: "init", v: 17 },
      { k: "fetch", v: 42 },
      { k: "hash", v: 55 },
      { k: "sort", v: 67 },
      { k: "render", v: 85 },
      { k: "parse", v: 93 },
    ],
    piv: -1,
    le: -1,
    s: [0, 1, 2, 3, 4, 5],
    info: "✅ All objects sorted by value ascending",
  },
];
let jsQsIdx = 0;
function jsQsStep() {
  if (jsQsIdx >= jsSteps.length) {
    jsQsReset();
    return;
  }
  const s = jsSteps[jsQsIdx];
  jsArr = [...s.arr];
  renderJsQs(s.piv, s.le, s.s);
  document.getElementById("jsQsInfo").innerHTML = `<b>${s.info}</b>`;
  jsQsIdx++;
}
function jsQsReset() {
  jsQsIdx = 0;
  jsArr = [...jsObjs];
  renderJsQs();
  document.getElementById("jsQsInfo").textContent = "";
}
renderJsQs();

/*5. DUTCH NATIONAL FLAG  */
const dutchOrig = [3, 5, 8, 5, 2, 5, 7, 1, 5, 4];
let dutchArr = [...dutchOrig],
  lo = 0,
  mid = 0,
  hi = dutchArr.length - 1,
  pivot5 = 5;
function renderDutch() {
  const el = document.getElementById("dutchBars");
  el.innerHTML = "";
  const mx = Math.max(...dutchArr);
  dutchArr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "smbar";
    b.style.height = Math.max(10, Math.round((v / mx) * 52)) + "px";
    if (i < lo) b.classList.add("lo");
    else if (i >= lo && i < mid) b.classList.add("piv");
    else if (i > hi) b.classList.add("hi");
    else b.classList.add("def");
    b.textContent = v;
    el.appendChild(b);
  });
  document.getElementById("dutchLo").textContent = lo;
  document.getElementById("dutchEq").textContent = Math.max(0, mid - lo);
  document.getElementById("dutchHi").textContent = dutchArr.length - 1 - hi;
}
function dutchStep() {
  if (mid > hi) {
    document.getElementById("dutchStatus").innerHTML =
      `✅ <span>3-way partition done</span> — all equal keys grouped in O(n)`;
    renderDutch();
    return;
  }
  if (dutchArr[mid] < pivot5) {
    [dutchArr[lo], dutchArr[mid]] = [dutchArr[mid], dutchArr[lo]];
    lo++;
    mid++;
    document.getElementById("dutchStatus").innerHTML =
      `${dutchArr[lo - 1]}<5 → moved to left region`;
  } else if (dutchArr[mid] === pivot5) {
    mid++;
    document.getElementById("dutchStatus").innerHTML =
      `${dutchArr[mid - 1]}=5 → equal region grows`;
  } else {
    [dutchArr[mid], dutchArr[hi]] = [dutchArr[hi], dutchArr[mid]];
    hi--;
    document.getElementById("dutchStatus").innerHTML =
      `${dutchArr[hi + 1]}>5 → moved to right region`;
  }
  renderDutch();
}
function dutchReset() {
  dutchArr = [...dutchOrig];
  lo = 0;
  mid = 0;
  hi = dutchArr.length - 1;
  renderDutch();
  document.getElementById("dutchStatus").textContent =
    "3-way partition: pivot = 5";
}
renderDutch();

/* 6. PIVOT COMPARISON  */
const pivotInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // sorted — worst case for naive
let pivotArr = [...pivotInput];
function buildPivotBars(arr, classes = []) {
  buildMB("pivotBars", arr, classes);
}
function pivotCompare(type) {
  buildPivotBars(pivotInput);
  const n = pivotInput.length;
  if (type === "naive") {
    // Naive pivot = last element on sorted array = O(n²)
    const comps = (n * (n - 1)) / 2;
    const depth = n - 1;
    document.getElementById("pivotStatus").innerHTML =
      `⚠ Naive pivot on sorted data: <span style="color:var(--primary-red)">O(n²) = ${comps} comparisons, depth ${depth}</span>`;
    document.getElementById("pivotComps").textContent = comps;
    document.getElementById("pivotDepth").textContent = depth;
    buildPivotBars(
      pivotInput,
      pivotInput.map((_, i) => (i === n - 1 ? "piv" : "hi")),
    );
  } else {
    const comps = Math.round(n * Math.log2(n));
    const depth = Math.ceil(Math.log2(n));
    document.getElementById("pivotStatus").innerHTML =
      `✅ Random pivot: <span>~O(n log n) = ${comps} comparisons, depth ${depth}</span> — DoS impossible`;
    document.getElementById("pivotComps").textContent = comps;
    document.getElementById("pivotDepth").textContent = depth;
    const shuffled = [...pivotInput].sort(() => Math.random() - 0.5);
    const pivIdx = Math.floor(n / 2);
    buildPivotBars(
      shuffled,
      shuffled.map((v, i) =>
        i === pivIdx ? "piv" : v < shuffled[pivIdx] ? "lo" : "hi",
      ),
    );
  }
}
function pivotReset() {
  buildPivotBars(pivotInput);
  document.getElementById("pivotStatus").textContent =
    "Try both strategies on the same sorted input";
  document.getElementById("pivotComps").textContent = 0;
  document.getElementById("pivotDepth").textContent = 0;
}
buildPivotBars(pivotInput);
