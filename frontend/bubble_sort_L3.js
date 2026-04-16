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

let cArr = [5, 3, 8, 1, 9, 2, 7],
  cPass = 0,
  cDone = false;
function renderConceptBars(
  arr,
  compareA = -1,
  compareB = -1,
  sortedFrom = -1,
  swapPair = [],
) {
  const el = document.getElementById("conceptBars");
  el.innerHTML = "";
  const mx = Math.max(...arr);
  arr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "bar";
    b.style.height = Math.max(18, Math.round((v / mx) * 85)) + "px";
    if (swapPair.includes(i)) b.classList.add("swapping");
    else if (i >= sortedFrom && sortedFrom >= 0) b.classList.add("sorted");
    else if (i === compareA || i === compareB) b.classList.add("compare");
    else b.classList.add("def");
    b.textContent = v;
    el.appendChild(b);
  });
}
function conceptStep() {
  if (cDone) {
    conceptReset();
    return;
  }
  if (cPass >= cArr.length - 1) {
    renderConceptBars(cArr, -1, -1, 0);
    document.getElementById("conceptStatus").innerHTML =
      "✅ Fully sorted! All elements in place.";
    cDone = true;
    return;
  }
  let swapped = false;
  const tmp = [...cArr];
  for (let j = 0; j < cArr.length - 1 - cPass; j++) {
    if (cArr[j] > cArr[j + 1]) {
      [cArr[j], cArr[j + 1]] = [cArr[j + 1], cArr[j]];
      swapped = true;
    }
  }
  const sortedFrom = cArr.length - 1 - cPass;
  renderConceptBars(cArr, -1, -1, sortedFrom);
  if (!swapped) {
    renderConceptBars(cArr, -1, -1, 0);
    document.getElementById("conceptStatus").innerHTML =
      `✅ Pass ${cPass + 1}: <span style="color:var(--primary-green)">No swaps — array already sorted!</span> Early exit.`;
    cDone = true;
  } else {
    document.getElementById("conceptStatus").innerHTML =
      `Pass ${cPass + 1}: <span style="color:var(--primary-orange)">${cArr[sortedFrom]}</span> bubbled to position ${sortedFrom + 1}. Sorted region grows ✓`;
  }
  cPass++;
}
function conceptReset() {
  cArr = [5, 3, 8, 1, 9, 2, 7];
  cPass = 0;
  cDone = false;
  renderConceptBars(cArr);
  document.getElementById("conceptStatus").textContent =
    'Click "Next Pass" to step through bubble sort';
}
renderConceptBars(cArr);

function buildMini(
  elId,
  arr,
  sortedFrom = -1,
  cmpA = -1,
  cmpB = -1,
  swpA = -1,
  swpB = -1,
) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  const mx = Math.max(...arr);
  arr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "mbar";
    b.style.height = Math.max(10, Math.round((v / mx) * 52)) + "px";
    if (swpA === i || swpB === i) b.classList.add("swp");
    else if (i >= sortedFrom && sortedFrom >= 0) b.classList.add("done");
    else if (i === cmpA || i === cmpB) b.classList.add("cmp");
    else b.classList.add("def");
    b.textContent = v;
    el.appendChild(b);
  });
}

/* 1. LEADERBOARD RE-SORT */
const lbBase = [
  { n: "Alice", s: 950 },
  { n: "Bob", s: 920 },
  { n: "Carol", s: 880 },
  { n: "Dave", s: 860 },
  { n: "Eve", s: 830 },
  { n: "Frank", s: 800 },
];
let lbData = [...lbBase],
  lbPass = 0,
  lbDone = false;
function renderLb(cmpIdx = -1, swpIdx = -1, sortedFrom = -1) {
  const el = document.getElementById("lbList");
  el.innerHTML = "";
  lbData.forEach((p, i) => {
    const d = document.createElement("div");
    d.className =
      "list-item " +
      (i >= sortedFrom && sortedFrom >= 0
        ? "done"
        : i === cmpIdx || i === cmpIdx + 1
          ? "active"
          : i === swpIdx || i === swpIdx + 1
            ? "swap"
            : "idle");
    d.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:.68rem;min-width:20px;color:var(--text-secondary)">${i + 1}.</span><span style="flex:1;font-weight:600;font-size:.78rem">${p.n}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--primary-orange)">${p.s}pts</span>`;
    el.appendChild(d);
  });
}
function lbResort() {
  if (lbDone) {
    lbReset();
    return;
  }
  // First call: inject one score change
  if (lbPass === 0) {
    lbData[3].s = 940;
    document.getElementById("lbInfo").innerHTML =
      `Score update: Dave → <b>940pts</b> (was 860). Re-sorting...`;
    renderLb();
    setTimeout(() => _lbBubble(), 400);
    return;
  }
  _lbBubble();
}
function _lbBubble() {
  if (lbPass >= lbData.length - 1) {
    renderLb(-1, -1, 0);
    document.getElementById("lbInfo").innerHTML =
      `✅ Re-sorted in <b>${lbPass}</b> pass${lbPass !== 1 ? "es" : ""} — bubble sort's early-exit wins here`;
    lbDone = true;
    return;
  }
  let swapped = false;
  for (let j = 0; j < lbData.length - 1 - lbPass; j++) {
    if (lbData[j].s < lbData[j + 1].s) {
      [lbData[j], lbData[j + 1]] = [lbData[j + 1], lbData[j]];
      swapped = true;
    }
  }
  lbPass++;
  const sf = lbData.length - lbPass;
  renderLb(-1, -1, sf);
  if (!swapped) {
    renderLb(-1, -1, 0);
    document.getElementById("lbInfo").innerHTML =
      `✅ Done in <b>${lbPass}</b> pass${lbPass !== 1 ? "es" : ""}! No swaps in last pass — early exit ✓`;
    lbDone = true;
    return;
  }
  document.getElementById("lbInfo").innerHTML =
    `Pass <b>${lbPass}</b>: sorted region now ${lbPass} item${lbPass !== 1 ? "s" : ""}`;
}
function lbReset() {
  lbData = [...lbBase.map((x) => ({ ...x }))];
  lbPass = 0;
  lbDone = false;
  renderLb();
  document.getElementById("lbInfo").textContent = "";
}
renderLb();

/* 2. CHECK SORTED */
const sortedData = [2, 4, 6, 8, 10, 12, 14, 16];
const unsortedData = [2, 4, 9, 8, 10, 6, 14, 16];
let chkArr = [],
  chkTimer = null;
function checkSorted(type) {
  clearTimeout(chkTimer);
  chkArr = type === "sorted" ? [...sortedData] : [...unsortedData];
  buildMini("checkBars", chkArr);
  document.getElementById("checkStatus").textContent = "Scanning...";
  document.getElementById("checkInfo").textContent = "";
  let swapped = false,
    comps = 0;
  for (let i = 0; i < chkArr.length - 1; i++) {
    comps++;
    if (chkArr[i] > chkArr[i + 1]) {
      swapped = true;
      break;
    }
  }
  chkTimer = setTimeout(() => {
    if (!swapped) {
      buildMini("checkBars", chkArr, -1, -1, -1, -1, -1);
      chkArr.forEach((_, i) => {
        const bs = document.getElementById("checkBars").children[i];
        if (bs) bs.className = "mbar done";
      });
      document.getElementById("checkStatus").innerHTML =
        `✅ <span>SORTED</span> — confirmed in ${comps} comparison${comps !== 1 ? "s" : ""}. Early exit!`;
      document.getElementById("checkInfo").innerHTML =
        `<b>0 swaps needed</b> — bubble sort detects this in O(n)`;
    } else {
      document.getElementById("checkStatus").innerHTML =
        `⚠ <span style="color:var(--primary-red)">NOT SORTED</span> — found out-of-order pair after ${comps} comparison${comps !== 1 ? "s" : ""}`;
      document.getElementById("checkInfo").innerHTML =
        `<b>Swaps needed</b> — array must be sorted`;
    }
  }, 600);
}
function checkSortedReset() {
  clearTimeout(chkTimer);
  chkArr = [...sortedData];
  buildMini("checkBars", chkArr);
  document.getElementById("checkStatus").textContent =
    "Pick a dataset to check";
  document.getElementById("checkInfo").textContent = "";
}
buildMini("checkBars", sortedData);

/* 3. NETWORK PACKETS */
// Nearly sorted: seq 1-9 with two out of place
let pkArr = [1, 2, 3, 7, 5, 6, 4, 8, 9],
  pkPass = 0,
  pkDone = false;
function buildPkBars(sortedFrom = -1) {
  buildMini("packetBars", pkArr, sortedFrom);
}
function packetStep() {
  if (pkDone) {
    packetReset();
    return;
  }
  if (pkPass >= pkArr.length - 1) {
    buildPkBars(0);
    document.getElementById("packetStatus").innerHTML =
      `✅ All packets reordered!`;
    document.getElementById("packetInfo").innerHTML =
      `Done in <b>${pkPass}</b> passes — nearly-sorted made this fast`;
    pkDone = true;
    return;
  }
  let swapped = false;
  for (let j = 0; j < pkArr.length - 1 - pkPass; j++)
    if (pkArr[j] > pkArr[j + 1]) {
      [pkArr[j], pkArr[j + 1]] = [pkArr[j + 1], pkArr[j]];
      swapped = true;
    }
  pkPass++;
  const sf = pkArr.length - pkPass;
  buildPkBars(sf);
  if (!swapped) {
    buildPkBars(0);
    document.getElementById("packetStatus").innerHTML =
      `✅ <span>No swaps</span> — packets fully ordered!`;
    document.getElementById("packetInfo").innerHTML =
      `Early exit after <b>${pkPass}</b> passes`;
    pkDone = true;
    return;
  }
  document.getElementById("packetStatus").innerHTML =
    `Pass ${pkPass}: Packet <span>${pkArr[sf]}</span> settled. ${sf} remaining`;
  document.getElementById("packetInfo").innerHTML =
    `<b>${pkPass}</b> pass${pkPass !== 1 ? "es" : ""} completed`;
}
function packetReset() {
  pkArr = [1, 2, 3, 7, 5, 6, 4, 8, 9];
  pkPass = 0;
  pkDone = false;
  buildPkBars();
  document.getElementById("packetStatus").textContent =
    "Packets arrive mostly in order";
  document.getElementById("packetInfo").textContent = "";
}
buildPkBars();

/* 4. STABLE SORT */

const stableBase = [
  { n: "Carol", g: 85 },
  { n: "Alice", g: 92 },
  { n: "Dave", g: 85 },
  { n: "Bob", g: 78 },
  { n: "Eve", g: 92 },
  { n: "Frank", g: 78 },
];
let stArr = [...stableBase],
  stPass = 0,
  stDone = false;
function renderStable(cmpIdx = -1, swpIdx = -1, sortedFrom = -1) {
  const el = document.getElementById("stableList");
  el.innerHTML = "";
  stArr.forEach((s, i) => {
    const d = document.createElement("div");
    const isComp = i === cmpIdx || i === cmpIdx + 1;
    const isSwap = i === swpIdx || i === swpIdx + 1;
    const isDone = i >= sortedFrom && sortedFrom >= 0;
    d.className =
      "list-item " +
      (isDone ? "done" : isSwap ? "swap" : isComp ? "active" : "idle");
    const gradeColor =
      s.g >= 90
        ? "var(--primary-green)"
        : s.g >= 80
          ? "var(--primary-orange)"
          : "var(--primary-red)";
    d.innerHTML = `<span style="font-size:.78rem;flex:1;font-weight:600">${s.n}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.72rem;color:${gradeColor};font-weight:700">${s.g}</span>`;
    el.appendChild(d);
  });
}
function stableStep() {
  if (stDone) {
    stableReset();
    return;
  }
  if (stPass >= stArr.length - 1) {
    renderStable(-1, -1, 0);
    document.getElementById("stableInfo").innerHTML =
      `✅ Sorted by grade — equal grades kept original name order (stable!)`;
    stDone = true;
    return;
  }
  let swapped = false;
  for (let j = 0; j < stArr.length - 1 - stPass; j++) {
    if (stArr[j].g < stArr[j + 1].g) {
      [stArr[j], stArr[j + 1]] = [stArr[j + 1], stArr[j]];
      swapped = true;
    }
  }
  stPass++;
  const sf = stArr.length - stPass;
  renderStable(-1, -1, sf);
  if (!swapped) {
    renderStable(-1, -1, 0);
    document.getElementById("stableInfo").innerHTML =
      `✅ Done in <b>${stPass}</b> passes — stability preserved ✓`;
    stDone = true;
    return;
  }
  document.getElementById("stableInfo").innerHTML =
    `Pass <b>${stPass}</b>: grade <span style="color:var(--primary-orange)">${stArr[sf].g}</span> bubbled to position ${sf + 1}`;
}
function stableReset() {
  stArr = [...stableBase.map((x) => ({ ...x }))];
  stPass = 0;
  stDone = false;
  renderStable();
  document.getElementById("stableInfo").textContent = "";
}
renderStable();

/* 5. SENSOR WINDOW */
let senArr = [38, 41, 29, 44, 35, 31, 43, 37],
  senPass = 0,
  senDone = false;
function sensorStep() {
  if (senDone) {
    sensorReset();
    return;
  }
  if (senPass >= senArr.length - 1) {
    buildMini("sensorBars", senArr, 0);
    document.getElementById("sensorStatus").innerHTML =
      `✅ Median = <span>${senArr[Math.floor(senArr.length / 2)]}</span>°C (sorted window)`;
    document.getElementById("sensorInfo").innerHTML =
      `Done in <b>${senPass}</b> passes — n=8 makes O(n²) trivial`;
    senDone = true;
    return;
  }
  let swapped = false;
  for (let j = 0; j < senArr.length - 1 - senPass; j++)
    if (senArr[j] > senArr[j + 1]) {
      [senArr[j], senArr[j + 1]] = [senArr[j + 1], senArr[j]];
      swapped = true;
    }
  senPass++;
  const sf = senArr.length - senPass;
  buildMini("sensorBars", senArr, sf);
  if (!swapped) {
    buildMini("sensorBars", senArr, 0);
    document.getElementById("sensorStatus").innerHTML =
      `✅ Median = <span>${senArr[Math.floor(senArr.length / 2)]}</span>°C — early exit`;
    senDone = true;
    return;
  }
  document.getElementById("sensorStatus").innerHTML =
    `Pass ${senPass}: max remaining = <span>${senArr[sf]}</span>°C placed`;
  document.getElementById("sensorInfo").innerHTML =
    `Pass <b>${senPass}</b> of max ${senArr.length - 1}`;
}
function sensorReset() {
  senArr = [38, 41, 29, 44, 35, 31, 43, 37].sort(() => Math.random() - 0.5);
  senPass = 0;
  senDone = false;
  buildMini("sensorBars", senArr);
  document.getElementById("sensorStatus").textContent =
    "Window of 8 sensor readings";
  document.getElementById("sensorInfo").textContent = "";
}
buildMini("sensorBars", senArr);

/* 6. AUTO SORT */
let autoArr = [6, 4, 8, 2, 9, 1, 7, 3, 5],
  autoTimer = null,
  autoSwapCount = 0,
  autoPassCount = 0;
function buildAutoMini(
  arr,
  sortedFrom = -1,
  cmpA = -1,
  cmpB = -1,
  swpA = -1,
  swpB = -1,
) {
  const el = document.getElementById("autoBars");
  if (!el) return;
  el.innerHTML = "";
  const mx = Math.max(...arr);
  arr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "mbar";
    b.style.height = Math.max(10, Math.round((v / mx) * 52)) + "px";
    if (swpA === i || swpB === i) b.classList.add("swp");
    else if (i >= sortedFrom && sortedFrom >= 0) b.classList.add("done");
    else if (i === cmpA || i === cmpB) b.classList.add("cmp");
    else b.classList.add("def");
    b.textContent = v;
    el.appendChild(b);
  });
}
function autoSort() {
  clearTimeout(autoTimer);
  autoArr = [6, 4, 8, 2, 9, 1, 7, 3, 5];
  autoSwapCount = 0;
  autoPassCount = 0;
  document.getElementById("autoBtn").disabled = true;
  document.getElementById("autoSwaps").textContent = 0;
  document.getElementById("autoPasses").textContent = 0;
  buildAutoMini(autoArr);
  const steps = [];
  const tmp = [...autoArr];
  for (let i = 0; i < tmp.length - 1; i++) {
    let sw = false;
    for (let j = 0; j < tmp.length - 1 - i; j++) {
      steps.push({
        type: "cmp",
        a: j,
        b: j + 1,
        sortedFrom: tmp.length - i,
        arr: [...tmp],
      });
      if (tmp[j] > tmp[j + 1]) {
        [tmp[j], tmp[j + 1]] = [tmp[j + 1], tmp[j]];
        sw = true;
        autoSwapCount++;
        steps.push({
          type: "swp",
          a: j,
          b: j + 1,
          sortedFrom: tmp.length - i,
          arr: [...tmp],
        });
      }
    }
    steps.push({ type: "pass", sortedFrom: tmp.length - 1 - i, arr: [...tmp] });
    if (!sw) {
      steps.push({ type: "done", arr: [...tmp] });
      break;
    }
  }
  autoSwapCount = 0;
  let d = 0;
  steps.forEach((s, idx) => {
    autoTimer = setTimeout(() => {
      if (s.type === "cmp") buildAutoMini(s.arr, s.sortedFrom, s.a, s.b);
      else if (s.type === "swp") {
        buildAutoMini(s.arr, s.sortedFrom, -1, -1, s.a, s.b);
        autoSwapCount++;
        document.getElementById("autoSwaps").textContent = autoSwapCount;
      } else if (s.type === "pass") {
        autoPassCount++;
        document.getElementById("autoPasses").textContent = autoPassCount;
        buildAutoMini(s.arr, s.sortedFrom);
        document.getElementById("autoStatus").innerHTML =
          `Pass ${autoPassCount} done — ${s.sortedFrom} element${s.sortedFrom !== 1 ? "s" : ""} sorted`;
      } else if (s.type === "done" || idx === steps.length - 1) {
        buildAutoMini(s.arr, 0);
        document.getElementById("autoStatus").innerHTML =
          `✅ Sorted! <span style="color:var(--primary-sky)">${autoSwapCount} swaps</span> in <span style="color:var(--primary-orange)">${autoPassCount} passes</span>`;
        document.getElementById("autoBtn").disabled = false;
      }
    }, d * 90);
    d++;
  });
}
function autoReset() {
  clearTimeout(autoTimer);
  autoArr = [6, 4, 8, 2, 9, 1, 7, 3, 5];
  buildAutoMini(autoArr);
  document.getElementById("autoStatus").textContent =
    "Press Auto Sort to watch every step";
  document.getElementById("autoSwaps").textContent = 0;
  document.getElementById("autoPasses").textContent = 0;
  document.getElementById("autoBtn").disabled = false;
}
buildAutoMini(autoArr);
