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

/* ── CONCEPT VISUALIZER ── */
const cData = [14, 7, 23, 5, 18, 31, 9, 42];
const BASE = 0x1a00;
let cIdx = 0,
  cVisited = [];
function renderConceptCells(activeIdx = -1, foundIdx = -1) {
  const addrEl = document.getElementById("conceptAddrs");
  const cellEl = document.getElementById("conceptCells");
  addrEl.innerHTML = "";
  cellEl.innerHTML = "";
  cData.forEach((_, i) => {
    const a = document.createElement("div");
    a.className = "addr-cell";
    a.textContent = "0x" + (BASE + i * 4).toString(16).toUpperCase();
    addrEl.appendChild(a);
    const c = document.createElement("div");
    c.className = "mem-cell";
    c.innerHTML = `<span class="val">${cData[i]}</span><span class="idx">[${i}]</span>`;
    if (i === foundIdx) c.classList.add("found");
    else if (i === activeIdx) c.classList.add("active");
    else if (cVisited.includes(i)) c.classList.add("visited");
    else c.classList.add("def");
    cellEl.appendChild(c);
  });
}
function conceptStep() {
  if (cIdx >= cData.length) {
    renderConceptCells(-1, -1);
    cVisited = [];
    cIdx = 0;
    document.getElementById("conceptStatus").innerHTML =
      `✅ Visited all 8 elements. <span>Reset</span> to start again`;
    return;
  }
  cVisited.push(cIdx);
  renderConceptCells(cIdx, -1);
  const addr = "0x" + (BASE + cIdx * 4).toString(16).toUpperCase();
  document.getElementById("conceptStatus").innerHTML =
    `arr[<span>${cIdx}</span>] = ${cData[cIdx]} → address <span>${addr}</span> = base + ${cIdx}×4`;
  cIdx++;
}
function conceptReset() {
  cIdx = 0;
  cVisited = [];
  renderConceptCells();
  document.getElementById("conceptStatus").textContent =
    'Click "Access Next Index" — watch O(1) direct access';
}
renderConceptCells();

/* mini cells */
function buildMC(elId, arr, classes = []) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  arr.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "mcell " + (classes[i] || "def");
    c.textContent = v;
    el.appendChild(c);
  });
}

/* 1. PIXEL GRID  */
const PW = 6,
  PH = 5;
const pixelVals = Array.from({ length: PH * PW }, (_, i) =>
  Math.floor(Math.random() * 200 + 50),
);
let pixelIdx = 0,
  pixelVisited = [];
function renderPixelGrid(activeFlat = -1) {
  const el = document.getElementById("pixelGrid");
  el.innerHTML = "";
  for (let r = 0; r < PH; r++) {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;gap:2px;";
    for (let col = 0; col < PW; col++) {
      const flat = r * PW + col;
      const c = document.createElement("div");
      c.style.cssText = `width:28px;height:22px;border-radius:3px;border:1px solid;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:.52rem;font-weight:700;transition:all .3s;`;
      const isActive = flat === activeFlat;
      const isVisited = pixelVisited.includes(flat);
      if (isActive) {
        c.style.background = "rgba(244,63,94,.2)";
        c.style.borderColor = "var(--primary-rose)";
        c.style.color = "var(--primary-rose)";
      } else if (isVisited) {
        c.style.background = "rgba(236,72,153,.08)";
        c.style.borderColor = "rgba(236,72,153,.3)";
        c.style.color = "var(--primary-pink)";
      } else {
        c.style.background = "rgba(255,255,255,.04)";
        c.style.borderColor = "var(--border-color)";
        c.style.color = "var(--text-secondary)";
      }
      c.textContent = pixelVals[flat];
      row.appendChild(c);
    }
    el.appendChild(row);
  }
}
function pixelStep() {
  if (pixelIdx >= PW * PH) {
    pixelIdx = 0;
    pixelVisited = [];
    renderPixelGrid();
    document.getElementById("pixelStatus").textContent =
      "Row-major order — arr[row × width + col]";
    document.getElementById("pixelInfo").textContent = "";
    return;
  }
  pixelVisited.push(pixelIdx);
  const row = Math.floor(pixelIdx / PW),
    col = pixelIdx % PW;
  renderPixelGrid(pixelIdx);
  document.getElementById("pixelStatus").innerHTML =
    `arr[${row}×${PW}+${col}] = arr[<span>${pixelIdx}</span>] = ${pixelVals[pixelIdx]}`;
  document.getElementById("pixelInfo").innerHTML =
    `Row <b>${row}</b>, Col <b>${col}</b> → flat index <b>${pixelIdx}</b>`;
  pixelIdx++;
}
function pixelReset() {
  pixelIdx = 0;
  pixelVisited = [];
  renderPixelGrid();
  document.getElementById("pixelStatus").textContent =
    "Row-major order — arr[row × width + col]";
  document.getElementById("pixelInfo").textContent = "";
}
renderPixelGrid();

/* 2. SLIDING WINDOW */
const winArr = [2, 7, 3, 9, 4, 8, 1, 6, 5];
const WIN_K = 3;
let winPos = 0,
  winMaxSum = 0,
  winMaxStart = 0;
function windowStep() {
  if (winPos + WIN_K > winArr.length) {
    const cls = winArr.map((_, i) =>
      i >= winMaxStart && i < winMaxStart + WIN_K ? "found" : "def",
    );
    buildMC("windowCells", winArr, cls);
    document.getElementById("windowStatus").innerHTML =
      `✅ Max sum = <span>${winMaxSum}</span> at indices [${winMaxStart}..${winMaxStart + WIN_K - 1}]`;
    document.getElementById("windowSum").textContent = winMaxSum;
    return;
  }
  const sum = winArr.slice(winPos, winPos + WIN_K).reduce((a, b) => a + b, 0);
  if (sum > winMaxSum) {
    winMaxSum = sum;
    winMaxStart = winPos;
  }
  const cls = winArr.map((_, i) =>
    i >= winPos && i < winPos + WIN_K ? "active" : "visited",
  );
  winArr.slice(0, winPos).forEach((_, i) => {
    cls[i] = "visited";
  });
  winArr.slice(winPos + WIN_K).forEach((_, i) => {
    cls[winPos + WIN_K + i] = "def";
  });
  buildMC("windowCells", winArr, cls);
  document.getElementById("windowStatus").innerHTML =
    `Window [${winPos}..${winPos + WIN_K - 1}]: sum = <span>${sum}</span>`;
  document.getElementById("windowSum").textContent = sum;
  document.getElementById("windowMax").textContent = winMaxSum;
  winPos++;
}
function windowReset() {
  winPos = 0;
  winMaxSum = 0;
  winMaxStart = 0;
  buildMC("windowCells", winArr);
  document.getElementById("windowStatus").textContent =
    "Slide a window of size 3 across the array";
  document.getElementById("windowSum").textContent = "—";
  document.getElementById("windowMax").textContent = "—";
}
buildMC("windowCells", winArr);

/* 3. DYNAMIC ARRAY  */
let dynArr = [],
  dynCap = 4,
  dynNextVal = 1;
function renderDynCells() {
  const el = document.getElementById("dynCells");
  el.innerHTML = "";
  for (let i = 0; i < dynCap; i++) {
    const c = document.createElement("div");
    c.className = "mcell " + (i < dynArr.length ? "active" : "def");
    c.textContent = i < dynArr.length ? dynArr[i] : "—";
    el.appendChild(c);
  }
}
function dynAppend() {
  if (dynArr.length >= dynCap) {
    const oldCap = dynCap;
    dynCap *= 2;
    document.getElementById("dynStatus").innerHTML =
      `🔴 Full! Resize: capacity <span>${oldCap}</span> → <span>${dynCap}</span> (copy all elements)`;
  } else {
    dynArr.push(dynNextVal++);
    document.getElementById("dynStatus").innerHTML =
      `Appended <span>${dynArr[dynArr.length - 1]}</span> at index [${dynArr.length - 1}] — O(1)`;
  }
  renderDynCells();
  document.getElementById("dynSize").textContent = dynArr.length;
  document.getElementById("dynCap").textContent = dynCap;
  if (dynArr.length >= 12) {
    document.getElementById("dynStatus").innerHTML =
      `✅ Array grown: 4→8→16 via doubling — amortized O(1) appends`;
  }
}
function dynReset() {
  dynArr = [];
  dynCap = 4;
  dynNextVal = 1;
  renderDynCells();
  document.getElementById("dynStatus").textContent =
    "Dynamic array: size=0, capacity=4";
  document.getElementById("dynSize").textContent = 0;
  document.getElementById("dynCap").textContent = 4;
}
renderDynCells();

/*  4. TWO POINTERS  */
const tpArr = [1, 3, 5, 7, 9, 11, 13, 15];
const TARGET = 17;
let tpL = 0,
  tpR = tpArr.length - 1,
  tpDone = false;
function twoPointerStep() {
  if (tpDone) {
    twoPointerReset();
    return;
  }
  const sum = tpArr[tpL] + tpArr[tpR];
  const cls = tpArr.map((_, i) =>
    i === tpL ? "active" : i === tpR ? "highlight" : "def",
  );
  if (sum === TARGET) {
    cls[tpL] = "found";
    cls[tpR] = "found";
    buildMC("tpCells", tpArr, cls);
    document.getElementById("tpStatus").innerHTML =
      `✅ Found! arr[<span>${tpL}</span>]=${tpArr[tpL]} + arr[${tpR}]=${tpArr[tpR]} = ${TARGET}`;
    document.getElementById("tpInfo").innerHTML =
      `Two pointers met in <b>${tpL + 1}</b> steps — O(n)`;
    tpDone = true;
    return;
  }
  buildMC("tpCells", tpArr, cls);
  if (sum < TARGET) {
    document.getElementById("tpStatus").innerHTML =
      `${tpArr[tpL]}+${tpArr[tpR]}=${sum} < ${TARGET} → move <span>left →</span>`;
    tpL++;
  } else {
    document.getElementById("tpStatus").innerHTML =
      `${tpArr[tpL]}+${tpArr[tpR]}=${sum} > ${TARGET} → move <span>← right</span>`;
    tpR--;
  }
  document.getElementById("tpInfo").innerHTML =
    `L=${tpL}, R=${tpR} — ${tpArr.length - (tpR - tpL + 1)} comparisons so far`;
}
function twoPointerReset() {
  tpL = 0;
  tpR = tpArr.length - 1;
  tpDone = false;
  buildMC("tpCells", tpArr);
  document.getElementById("tpStatus").textContent =
    "Find two numbers that sum to 17";
  document.getElementById("tpInfo").textContent = "";
}
buildMC("tpCells", tpArr);

/*  5. PREFIX SUM  */
const prefOrig = [3, 1, 4, 1, 5, 9, 2, 6];
let prefBuilt = 0,
  prefArr = [0],
  prefPhase = 0;
function renderPrefixCells() {
  buildMC(
    "prefixOrigCells",
    prefOrig,
    prefOrig.map((_, i) =>
      i < prefBuilt ? "visited" : i === prefBuilt ? "active" : "def",
    ),
  );
  const padded = [
    ...prefArr,
    ...Array(prefOrig.length + 1 - prefArr.length).fill("?"),
  ];
  buildMC(
    "prefixSumCells",
    padded,
    padded.map((v, i) =>
      v === "?"
        ? "def"
        : i === prefArr.length - 1 && prefArr.length > 1
          ? "found"
          : "done",
    ),
  );
}
function prefixStep() {
  if (prefPhase === 0) {
    renderPrefixCells();
    document.getElementById("prefixStatus").innerHTML =
      `prefix[0] = 0 (empty sum). Building prefix[1..n]...`;
    document.getElementById("prefixInfo").innerHTML =
      `prefix[i] = sum of first i elements`;
    prefPhase = 1;
    return;
  }
  if (prefBuilt >= prefOrig.length) {
    // Show a range query
    const i = 2,
      j = 5,
      ans = prefArr[j + 1] - prefArr[i];
    const cls = prefOrig.map((_, idx) =>
      idx >= i && idx <= j ? "found" : "visited",
    );
    buildMC("prefixOrigCells", prefOrig, cls);
    document.getElementById("prefixStatus").innerHTML =
      `✅ Query sum[${i}..${j}] = prefix[${j + 1}]-prefix[${i}] = ${prefArr[j + 1]}-${prefArr[i]} = <span>${ans}</span>`;
    document.getElementById("prefixInfo").innerHTML =
      `O(1) range query — no loop needed!`;
    return;
  }
  const next = prefArr[prefBuilt] + prefOrig[prefBuilt];
  prefArr.push(next);
  prefBuilt++;
  renderPrefixCells();
  document.getElementById("prefixStatus").innerHTML =
    `prefix[${prefBuilt}] = prefix[${prefBuilt - 1}] + ${prefOrig[prefBuilt - 1]} = <span>${next}</span>`;
  document.getElementById("prefixInfo").innerHTML =
    `Running sum after ${prefBuilt} element${prefBuilt !== 1 ? "s" : ""}`;
}
function prefixReset() {
  prefBuilt = 0;
  prefArr = [0];
  prefPhase = 0;
  buildMC("prefixOrigCells", prefOrig);
  buildMC(
    "prefixSumCells",
    Array(prefOrig.length + 1).fill("?"),
    Array(prefOrig.length + 1).fill("def"),
  );
  document.getElementById("prefixStatus").textContent =
    "Build the prefix sum array step by step";
  document.getElementById("prefixInfo").textContent = "";
}
buildMC("prefixOrigCells", prefOrig);
buildMC(
  "prefixSumCells",
  Array(prefOrig.length + 1).fill("?"),
  Array(prefOrig.length + 1).fill("def"),
);

/*  6. CIRCULAR BUFFER */
const CIRC_CAP = 8;
let circBuf = Array(CIRC_CAP).fill(null),
  circHead = 0,
  circTail = 0,
  circSz = 0,
  circNext = 1;
function renderCircCells() {
  const el = document.getElementById("circCells");
  el.innerHTML = "";
  circBuf.forEach((v, i) => {
    const c = document.createElement("div");
    const isHead = i === circHead && circSz > 0;
    const isTail = i === circTail;
    const hasVal = v !== null;
    c.className = "mcell " + (hasVal ? "active" : "def");
    if (i === circHead && circSz > 0 && i === circTail)
      c.className = "mcell found";
    else if (i === circHead && circSz > 0) c.className = "mcell active";
    else if (hasVal) c.className = "mcell visited";
    c.textContent = hasVal ? v : "·";
    if (isHead && circSz > 0) {
      const marker = document.createElement("span");
      marker.style.cssText =
        "font-size:.4rem;display:block;color:var(--primary-rose);line-height:1";
      marker.textContent = "H";
      c.appendChild(marker);
    }
    el.appendChild(c);
  });
  document.getElementById("circHead").textContent = circHead;
  document.getElementById("circTail").textContent = circTail;
  document.getElementById("circSize").textContent = circSz;
}
function circEnqueue() {
  if (circSz >= CIRC_CAP) {
    document.getElementById("circStatus").innerHTML =
      `⚠ Buffer <span>full</span> (size=${CIRC_CAP}) — dequeue first`;
    return;
  }
  circBuf[circTail] = circNext++;
  document.getElementById("circStatus").innerHTML =
    `Enqueued <span>${circBuf[circTail]}</span> at tail[${circTail}]`;
  circTail = (circTail + 1) % CIRC_CAP;
  circSz++;
  renderCircCells();
}
function circDequeue() {
  if (circSz === 0) {
    document.getElementById("circStatus").innerHTML =
      `⚠ Buffer <span>empty</span> — nothing to dequeue`;
    return;
  }
  const val = circBuf[circHead];
  circBuf[circHead] = null;
  document.getElementById("circStatus").innerHTML =
    `Dequeued <span>${val}</span> from head[${circHead}] — wraps with % ${CIRC_CAP}`;
  circHead = (circHead + 1) % CIRC_CAP;
  circSz--;
  renderCircCells();
}
function circReset() {
  circBuf = Array(CIRC_CAP).fill(null);
  circHead = 0;
  circTail = 0;
  circSz = 0;
  circNext = 1;
  renderCircCells();
  document.getElementById("circStatus").textContent =
    "Circular buffer: head=0, tail=0, size=0";
}
renderCircCells();
