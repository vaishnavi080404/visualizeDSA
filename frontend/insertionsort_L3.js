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
let cArr = [6, 3, 8, 1, 7, 2, 5],
  cI = 1,
  cDone = false,
  cTotalShifts = 0;
const cOrig = [6, 3, 8, 1, 7, 2, 5];
function renderConceptBars(arr, keyIdx = -1, shiftRegion = -1, sortedTo = -1) {
  const el = document.getElementById("conceptBars");
  el.innerHTML = "";
  const mx = Math.max(...arr);
  arr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "bar";
    b.style.height = Math.max(18, Math.round((v / mx) * 85)) + "px";
    if (i === keyIdx) b.classList.add("key");
    else if (shiftRegion >= 0 && i >= shiftRegion && i < keyIdx)
      b.classList.add("shifting");
    else if (sortedTo >= 0 && i <= sortedTo) b.classList.add("sorted");
    else b.classList.add("def");
    b.textContent = v;
    el.appendChild(b);
  });
}
function conceptStep() {
  if (cDone || cI >= cArr.length) {
    renderConceptBars(cArr, -1, -1, cArr.length - 1);
    document.getElementById("conceptStatus").innerHTML =
      `✅ Fully sorted! <span style="color:var(--primary-teal)">${cTotalShifts}</span> total shifts`;
    cDone = true;
    return;
  }
  const key = cArr[cI];
  let j = cI - 1,
    shifts = 0;
  while (j >= 0 && cArr[j] > key) {
    cArr[j + 1] = cArr[j];
    j--;
    shifts++;
    cTotalShifts++;
  }
  cArr[j + 1] = key;
  const insertedAt = j + 1;
  renderConceptBars(cArr, insertedAt, -1, cI);
  if (shifts === 0)
    document.getElementById("conceptStatus").innerHTML =
      `Insert <span>${key}</span> at position ${insertedAt} — already in place, 0 shifts`;
  else
    document.getElementById("conceptStatus").innerHTML =
      `Insert <span>${key}</span> at position ${insertedAt} — shifted ${shifts} element${shifts !== 1 ? "s" : ""} right`;
  cI++;
  if (cI >= cArr.length) {
    setTimeout(() => {
      renderConceptBars(cArr, -1, -1, cArr.length - 1);
      document.getElementById("conceptStatus").innerHTML =
        `✅ Sorted! <span style="color:var(--primary-teal)">${cTotalShifts}</span> total shifts`;
      cDone = true;
    }, 600);
  }
}
function conceptReset() {
  cArr = [...cOrig];
  cI = 1;
  cDone = false;
  cTotalShifts = 0;
  renderConceptBars(cArr, -1, -1, 0);
  document.getElementById("conceptStatus").textContent =
    'Click "Insert Next" to step through insertion sort';
}
renderConceptBars(cArr, -1, -1, 0);

/*  build mini bars */
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

/*  1. TIMSORT IS */
let tsArr = [5, 2, 8, 1, 6, 4, 7],
  tsOrig = [...tsArr],
  tsI = 1,
  tsDone = false,
  tsShifts = 0;
function timsortISStep() {
  if (tsDone) {
    timsortISReset();
    return;
  }
  if (tsI >= tsArr.length) {
    buildMB(
      "timsortBars",
      tsArr,
      tsArr.map(() => "done"),
    );
    document.getElementById("timsortStatus").innerHTML =
      `✅ n=7 subarray sorted in <span>${tsShifts}</span> shifts — Timsort hands off to merge`;
    document.getElementById("timsortKey").textContent = "—";
    tsDone = true;
    return;
  }
  const key = tsArr[tsI];
  let j = tsI - 1,
    sh = 0;
  while (j >= 0 && tsArr[j] > key) {
    tsArr[j + 1] = tsArr[j];
    j--;
    sh++;
    tsShifts++;
  }
  tsArr[j + 1] = key;
  const ins = j + 1;
  const cls = tsArr.map((_, i) =>
    i === ins ? "key" : i < tsI ? "done" : "def",
  );
  buildMB("timsortBars", tsArr, cls);
  document.getElementById("timsortStatus").innerHTML =
    `Inserted <span>${key}</span> at [${ins}] — ${sh} shift${sh !== 1 ? "s" : ""}`;
  document.getElementById("timsortKey").textContent = key;
  document.getElementById("timsortShifts").textContent = tsShifts;
  tsI++;
}
function timsortISReset() {
  tsArr = [...tsOrig];
  tsI = 1;
  tsDone = false;
  tsShifts = 0;
  buildMB("timsortBars", tsArr, [
    "done",
    ...Array(tsArr.length - 1).fill("def"),
  ]);
  document.getElementById("timsortStatus").textContent =
    "n=7 subarray — Timsort picks insertion sort";
  document.getElementById("timsortKey").textContent = "—";
  document.getElementById("timsortShifts").textContent = 0;
}
buildMB("timsortBars", tsOrig, [
  "done",
  ...Array(tsOrig.length - 1).fill("def"),
]);

/*2. LIVE STREAM */
const streamPrices = [142, 138, 155, 131, 147, 161, 135, 152];
let streamSorted = [],
  streamIdx = 0;
function renderStreamList(newIdx = -1) {
  const el = document.getElementById("streamList");
  el.innerHTML = "";
  streamSorted.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "list-item " + (i === newIdx ? "key" : "done");
    d.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--primary-teal);min-width:22px">${i + 1}.</span><span style="flex:1;font-family:'JetBrains Mono',monospace;font-size:.75rem;font-weight:700">${p}</span><div style="height:5px;width:${Math.round((p / 170) * 80)}px;background:${i === newIdx ? "var(--primary-teal)" : "var(--primary-emerald)"};border-radius:2px;opacity:.7"></div>`;
    el.appendChild(d);
  });
}
function streamInsert() {
  if (streamIdx >= streamPrices.length) {
    document.getElementById("streamInfo").innerHTML =
      `✅ All <b>${streamSorted.length}</b> prices sorted — stream complete`;
    return;
  }
  const p = streamPrices[streamIdx];
  // Insert into sorted position
  let pos = streamSorted.length;
  while (pos > 0 && streamSorted[pos - 1] > p) pos--;
  streamSorted.splice(pos, 0, p);
  streamIdx++;
  renderStreamList(pos);
  document.getElementById("streamInfo").innerHTML =
    `Received <b>${p}</b> → inserted at rank <b>${pos + 1}</b>. ${streamPrices.length - streamIdx} prices remaining`;
}
function streamReset() {
  streamSorted = [];
  streamIdx = 0;
  renderStreamList();
  document.getElementById("streamInfo").textContent = "";
}
renderStreamList();

/*3. NEARLY SORTED */
// Nearly sorted: [1,2,3,4,8,6,7,5,9] — 8 and 5 are out of place
const nearlyOrig = [1, 2, 3, 4, 8, 6, 7, 5, 9];
let nearlyArr = [...nearlyOrig],
  nearlyI = 1,
  nearlyDone = false,
  nearlyShiftsTotal = 0,
  nearlyPassNum = 0;
function nearlySortedStep() {
  if (nearlyDone) {
    nearlySortedReset();
    return;
  }
  if (nearlyI >= nearlyArr.length) {
    buildMB(
      "nearlyBars",
      nearlyArr,
      nearlyArr.map(() => "done"),
    );
    document.getElementById("nearlyStatus").innerHTML =
      `✅ Done! Only <span>${nearlyShiftsTotal}</span> total shifts — nearly-sorted advantage`;
    nearlyDone = true;
    return;
  }
  nearlyPassNum = nearlyI;
  const key = nearlyArr[nearlyI];
  let j = nearlyI - 1,
    sh = 0;
  while (j >= 0 && nearlyArr[j] > key) {
    nearlyArr[j + 1] = nearlyArr[j];
    j--;
    sh++;
    nearlyShiftsTotal++;
  }
  nearlyArr[j + 1] = key;
  const ins = j + 1;
  const cls = nearlyArr.map((_, i) =>
    i === ins ? "key" : i <= nearlyI ? "done" : "def",
  );
  buildMB("nearlyBars", nearlyArr, cls);
  document.getElementById("nearlyStatus").innerHTML =
    sh === 0
      ? `Pass ${nearlyI}: <span>${key}</span> already in place — 0 shifts`
      : `Pass ${nearlyI}: <span>${key}</span> shifted ${sh} place${sh !== 1 ? "s" : ""} left`;
  document.getElementById("nearlyShifts").textContent = nearlyShiftsTotal;
  document.getElementById("nearlyPass").textContent = nearlyI;
  nearlyI++;
}
function nearlySortedReset() {
  nearlyArr = [...nearlyOrig];
  nearlyI = 1;
  nearlyDone = false;
  nearlyShiftsTotal = 0;
  nearlyPassNum = 0;
  buildMB("nearlyBars", nearlyArr, [
    "done",
    ...Array(nearlyArr.length - 1).fill("def"),
  ]);
  document.getElementById("nearlyStatus").textContent =
    "Almost sorted — 2 elements out of place";
  document.getElementById("nearlyShifts").textContent = 0;
  document.getElementById("nearlyPass").textContent = 0;
}
buildMB("nearlyBars", nearlyOrig, [
  "done",
  ...Array(nearlyOrig.length - 1).fill("def"),
]);

/*  4. CARD SORT  */
const suits = ["♠", "♥", "♦", "♣"];
const vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const cardOrder = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
const deckOrig = [
  { v: "7", s: "♠" },
  { v: "Q", s: "♥" },
  { v: "3", s: "♦" },
  { v: "J", s: "♣" },
  { v: "5", s: "♠" },
  { v: "A", s: "♥" },
  { v: "9", s: "♦" },
];
let cardArr = [...deckOrig],
  cardI = 1,
  cardDone = false;
function renderCards(arr, keyIdx = -1, sortedTo = -1) {
  const el = document.getElementById("cardHand");
  el.innerHTML = "";
  arr.forEach((c, i) => {
    const d = document.createElement("div");
    const isRed = c.s === "♥" || c.s === "♦";
    const isKey = i === keyIdx;
    const isDone = sortedTo >= 0 && i <= sortedTo;
    d.style.cssText = `display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:34px;height:48px;border-radius:6px;border:1.5px solid ${isKey ? "var(--primary-teal)" : isDone ? "rgba(5,150,105,.4)" : "var(--border-color)"};background:${isKey ? "rgba(20,184,166,.12)" : isDone ? "rgba(5,150,105,.06)" : "rgba(255,255,255,.04)"};font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:700;color:${isRed ? "#f87171" : isKey ? "var(--primary-teal)" : isDone ? "var(--primary-emerald)" : "var(--text-secondary)"};transition:all .3s;`;
    d.innerHTML = `<span>${c.v}</span><span style="font-size:.8rem">${c.s}</span>`;
    el.appendChild(d);
  });
}
function cardStep() {
  if (cardDone) {
    cardReset();
    return;
  }
  if (cardI >= cardArr.length) {
    renderCards(cardArr, -1, cardArr.length - 1);
    document.getElementById("cardStatus").innerHTML =
      `✅ Hand sorted! <span style="color:var(--primary-teal)">Insertion sort</span> — just like a human`;
    cardDone = true;
    return;
  }
  const key = { ...cardArr[cardI] };
  const keyVal = cardOrder[key.v];
  let j = cardI - 1;
  while (j >= 0 && cardOrder[cardArr[j].v] > keyVal) {
    cardArr[j + 1] = { ...cardArr[j] };
    j--;
  }
  cardArr[j + 1] = key;
  const ins = j + 1;
  renderCards(cardArr, ins, cardI);
  document.getElementById("cardStatus").innerHTML =
    `Picked <span>${key.v}${key.s}</span> → slid to position ${ins + 1}`;
  document.getElementById("cardInfo").innerHTML =
    `Card <b>${cardI + 1}</b> of ${cardArr.length} inserted`;
  cardI++;
}
function cardReset() {
  cardArr = [...deckOrig.map((c) => ({ ...c }))];
  cardI = 1;
  cardDone = false;
  renderCards(cardArr, -1, 0);
  document.getElementById("cardStatus").textContent =
    "Pick the next unsorted card and slide it left";
  document.getElementById("cardInfo").textContent = "";
}
renderCards(cardArr, -1, 0);

/*  5. INTROSORT FINAL PASS */

const introISArr = [1, 2, 4, 3, 5, 7, 6, 8, 9, 10];
let iisArr = [...introISArr],
  iisI = 1,
  iisDone = false,
  iisPhase = 0;
function introISStep() {
  if (iisPhase === 0) {
    buildMB(
      "introISBars",
      iisArr,
      iisArr.map(() => "ins"),
    );
    document.getElementById("introISStatus").innerHTML =
      `<span>After quicksort:</span> [${iisArr}] — nearly sorted, 2 inversions`;
    document.getElementById("introISInfo").innerHTML =
      `Now insertion sort makes a single sweep to finish`;
    iisPhase = 1;
    return;
  }
  if (iisDone || iisI >= iisArr.length) {
    buildMB(
      "introISBars",
      iisArr,
      iisArr.map(() => "done"),
    );
    document.getElementById("introISStatus").innerHTML =
      `✅ <span>Final pass complete</span> — single insertion sort sweep finished the sort`;
    iisDone = true;
    return;
  }
  const key = iisArr[iisI];
  let j = iisI - 1,
    sh = 0;
  while (j >= 0 && iisArr[j] > key) {
    iisArr[j + 1] = iisArr[j];
    j--;
    sh++;
  }
  iisArr[j + 1] = key;
  const ins = j + 1;
  const cls = iisArr.map((_, i) =>
    i === ins ? "key" : i <= iisI ? "done" : "ins",
  );
  buildMB("introISBars", iisArr, cls);
  document.getElementById("introISStatus").innerHTML =
    sh === 0
      ? `Pass ${iisI}: <span>${key}</span> in place — no shift needed`
      : `Pass ${iisI}: <span>${key}</span> → shifted ${sh} place left`;
  document.getElementById("introISInfo").innerHTML =
    sh === 0
      ? `Near-sorted data: most elements need <b>0 shifts</b>`
      : `Inversion fixed: <b>${sh}</b> shift needed`;
  iisI++;
}
function introISReset() {
  iisArr = [...introISArr];
  iisI = 1;
  iisDone = false;
  iisPhase = 0;
  buildMB(
    "introISBars",
    iisArr,
    iisArr.map(() => "ins"),
  );
  document.getElementById("introISStatus").textContent =
    "After quicksort: nearly sorted, few inversions remain";
  document.getElementById("introISInfo").textContent = "";
}
buildMB(
  "introISBars",
  introISArr,
  introISArr.map(() => "ins"),
);

/*  6. BINARY INSERTION SORT  */
const binaryOrig = [8, 3, 7, 1, 9, 4, 6, 2, 5];
let binArr = [...binaryOrig],
  binI = 1,
  binDone = false,
  binTotalComps = 0,
  binLinearComps = 0;
function binaryISStep() {
  if (binDone) {
    binaryISReset();
    return;
  }
  if (binI >= binArr.length) {
    buildMB(
      "binaryBars",
      binArr,
      binArr.map(() => "done"),
    );
    document.getElementById("binaryStatus").innerHTML =
      `✅ Sorted! Binary: <span>${binTotalComps}</span> comparisons vs Linear: <span style="color:var(--primary-orange)">${binLinearComps}</span>`;
    binDone = true;
    return;
  }
  const key = binArr[binI];
  // binary search for insertion point
  let lo = 0,
    hi = binI,
    comps = 0;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    comps++;
    if (binArr[mid] <= key) lo = mid + 1;
    else hi = mid;
  }
  const ins = lo;
  // linear comparison count would be
  let linC = 0,
    tmp = binI - 1;
  while (tmp >= 0 && binArr[tmp] > key) {
    linC++;
    tmp--;
  }
  linC++; // one more for the stopping condition
  binTotalComps += comps;
  binLinearComps += linC;
  // shift
  for (let j = binI; j > ins; j--) binArr[j] = binArr[j - 1];
  binArr[ins] = key;
  const cls = binArr.map((_, i) =>
    i === ins ? "key" : i <= binI ? "done" : "def",
  );
  buildMB("binaryBars", binArr, cls);
  document.getElementById("binaryStatus").innerHTML =
    `Binary found pos [${ins}] in <span>${comps}</span> comparisons (linear would need ${linC})`;
  document.getElementById("binaryComps").textContent = binTotalComps;
  document.getElementById("binaryLinear").textContent = binLinearComps;
  binI++;
}
function binaryISReset() {
  binArr = [...binaryOrig];
  binI = 1;
  binDone = false;
  binTotalComps = 0;
  binLinearComps = 0;
  buildMB("binaryBars", binArr, [
    "done",
    ...Array(binArr.length - 1).fill("def"),
  ]);
  document.getElementById("binaryStatus").textContent =
    "Binary search locates insertion point — fewer comparisons";
  document.getElementById("binaryComps").textContent = 0;
  document.getElementById("binaryLinear").textContent = 0;
}
buildMB("binaryBars", binaryOrig, [
  "done",
  ...Array(binaryOrig.length - 1).fill("def"),
]);
