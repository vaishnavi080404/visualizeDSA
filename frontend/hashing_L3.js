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

const SZ = 11; // table size for demos
function hf(k) {
  let s = 0;
  for (let i = 0; i < k.length; i++) s += k.charCodeAt(i);
  return s % SZ;
}
function hfNum(n) {
  return n % SZ;
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function buildCells(elId, items, classes = []) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  items.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "mcell " + (classes[i] || "def");
    c.textContent = v;
    el.appendChild(c);
  });
}

/*  CONCEPT VISUALIZER  */
const conceptKeys = ["cat", "dog", "fish", "owl", "cat", "bee", "ant"];
let conceptTable = Array(SZ).fill(null),
  conceptIdx = 0;

function renderConceptCells(activeSlot = -1, chainSlot = -1) {
  const el = document.getElementById("conceptCells");
  el.innerHTML = "";
  for (let i = 0; i < SZ; i++) {
    const c = document.createElement("div");
    c.className = "ht-cell";
    const isActive = i === activeSlot,
      isChain = i === chainSlot;
    if (isActive) c.classList.add("active");
    else if (isChain) c.classList.add("collision");
    else if (conceptTable[i]) c.classList.add("found");
    else c.classList.add("def");
    c.innerHTML = `<span class="idx">${i}</span><span class="val">${conceptTable[i] || "—"}</span>`;
    el.appendChild(c);
  }
}

function conceptStep() {
  if (conceptIdx >= conceptKeys.length) {
    conceptIdx = 0;
    conceptTable = Array(SZ).fill(null);
    renderConceptCells();
    document.getElementById("conceptStatus").textContent =
      'Click "Hash Next Key" — watch O(1) direct slot access';
    return;
  }
  const key = conceptKeys[conceptIdx];
  const slot = hf(key);
  const occupied = conceptTable[slot];
  if (occupied) {
    // chain into next slot
    let next = (slot + 1) % SZ;
    while (conceptTable[next] && next !== slot) next = (next + 1) % SZ;
    conceptTable[next] = key;
    renderConceptCells(next, slot);
    document.getElementById("conceptStatus").innerHTML =
      `hash("${key}")=${slot} → <span>collision!</span> chained to slot ${next}`;
  } else {
    conceptTable[slot] = key;
    renderConceptCells(slot);
    document.getElementById("conceptStatus").innerHTML =
      `hash("<span>${key}</span>") = ${slot} → stored at slot ${slot} in O(1)`;
  }
  conceptIdx++;
}
function conceptReset() {
  conceptIdx = 0;
  conceptTable = Array(SZ).fill(null);
  renderConceptCells();
  document.getElementById("conceptStatus").textContent =
    'Click "Hash Next Key" — watch O(1) direct slot access';
}
renderConceptCells();

/*  1. PASSWORD HASHING  */
const pwData = [
  { pw: "abc123", hash: null },
  { pw: "p@ssw0rd", hash: null },
  { pw: "letmein", hash: null },
  { pw: "qwerty", hash: null },
  { pw: "abc123", hash: null }, // duplicate to show match
];
let pwIdx = 0;
const pwHashes = Array(SZ).fill("·");

function pwStep() {
  if (pwIdx >= pwData.length) {
    pwIdx = 0;
    pwHashes.fill("·");
    buildCells("pwCells", pwHashes);
    document.getElementById("pwStatus").textContent =
      "Hash(password) mod 11 — one-way mapping";
    document.getElementById("pwStored").textContent = "—";
    document.getElementById("pwMatch").textContent = "—";
    return;
  }
  const entry = pwData[pwIdx];
  const slot = hf(entry.pw);
  const prevSlot = pwHashes[slot] !== "·" ? slot : -1;
  const match =
    pwIdx > 0 && pwHashes[slot] !== "·" && pwHashes[slot] === `h${slot}`;
  pwHashes[slot] = `h${slot}`;
  const cls = pwHashes.map((v, i) =>
    v === "·" ? "empty" : i === slot ? "active" : "found",
  );
  buildCells("pwCells", pwHashes, cls);
  document.getElementById("pwStatus").innerHTML =
    `hash("<span>${entry.pw}</span>") = ${slot} → <span>h${slot}</span> stored`;
  document.getElementById("pwStored").textContent = `h${slot}`;
  document.getElementById("pwMatch").textContent = match ? "✓ Match" : "✗ New";
  pwIdx++;
}
function pwReset() {
  pwIdx = 0;
  pwHashes.fill("·");
  buildCells("pwCells", pwHashes);
  document.getElementById("pwStatus").textContent =
    "Hash(password) mod 11 — one-way mapping";
  document.getElementById("pwStored").textContent = "—";
  document.getElementById("pwMatch").textContent = "—";
}
buildCells("pwCells", pwHashes, Array(SZ).fill("empty"));

/*  2. FREQUENCY COUNTER  */
const freqWords = ["the", "cat", "sat", "on", "the", "mat", "the"];
let freqMap = {},
  freqIdx = 0;

function renderFreqBuckets(activeWord = "") {
  const el = document.getElementById("freqBuckets");
  el.innerHTML = "";
  const sorted = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
  sorted.forEach(([w, cnt]) => {
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex;align-items:center;gap:6px;margin-bottom:3px;";
    const label = document.createElement("span");
    label.style.cssText = `font-family:'JetBrains Mono',monospace;font-size:.72rem;min-width:55px;color:${w === activeWord ? "var(--primary-teal)" : "var(--text-secondary)"}`;
    label.textContent = w + ":";
    const bar = document.createElement("div");
    bar.style.cssText = `height:14px;border-radius:3px;background:${w === activeWord ? "var(--primary-teal)" : "rgba(6,182,212,.4)"};width:${cnt * 20}px;transition:width .4s;`;
    const num = document.createElement("span");
    num.style.cssText = `font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--text-secondary);`;
    num.textContent = cnt;
    row.appendChild(label);
    row.appendChild(bar);
    row.appendChild(num);
    el.appendChild(row);
  });
}

function freqStep() {
  if (freqIdx >= freqWords.length) {
    freqIdx = 0;
    freqMap = {};
    renderFreqBuckets();
    document.getElementById("freqStatus").textContent =
      'Count word frequencies in "the cat sat on the mat"';
    document.getElementById("freqInfo").textContent = "";
    return;
  }
  const w = freqWords[freqIdx];
  freqMap[w] = (freqMap[w] || 0) + 1;
  renderFreqBuckets(w);
  document.getElementById("freqStatus").innerHTML =
    `freq["<span>${w}</span>"] = ${freqMap[w]} (${freqMap[w] > 1 ? "increment" : "new key"})`;
  document.getElementById("freqInfo").innerHTML =
    `Word ${freqIdx + 1} of ${freqWords.length} — <b>${Object.keys(freqMap).length}</b> unique words so far`;
  freqIdx++;
}
function freqReset() {
  freqIdx = 0;
  freqMap = {};
  renderFreqBuckets();
  document.getElementById("freqStatus").textContent =
    'Count word frequencies in "the cat sat on the mat"';
  document.getElementById("freqInfo").textContent = "";
}
renderFreqBuckets();

/*  3. DEDUPLICATION  */
const dedupStream = [3, 7, 3, 1, 9, 7, 2, 1, 5, 3];
let dedupIdx = 0,
  dedupSeen = new Set(),
  dedupOut = [];

function renderDedup(activeIdx = -1) {
  const inCls = dedupStream.map((_, i) =>
    i === activeIdx ? "active" : i < dedupIdx ? "visited" : "def",
  );
  buildCells("dedupInput", dedupStream, inCls);
  const seenArr = [...dedupSeen];
  buildCells("dedupSet", seenArr, Array(seenArr.length).fill("found"));
  buildCells("dedupOutput", dedupOut, Array(dedupOut.length).fill("found"));
}

function dedupStep() {
  if (dedupIdx >= dedupStream.length) {
    dedupIdx = 0;
    dedupSeen = new Set();
    dedupOut = [];
    renderDedup();
    document.getElementById("dedupStatus").textContent =
      "Process each element — O(1) lookup per item";
    return;
  }
  const v = dedupStream[dedupIdx];
  const seen = dedupSeen.has(v);
  renderDedup(dedupIdx);
  if (seen) {
    document.getElementById("dedupStatus").innerHTML =
      `${v} → <span>DUPLICATE</span> — already in set, skip`;
  } else {
    dedupSeen.add(v);
    dedupOut.push(v);
    document.getElementById("dedupStatus").innerHTML =
      `${v} → <span>NEW</span> — add to set and output`;
  }
  dedupIdx++;
  setTimeout(() => renderDedup(), 100);
}
function dedupReset() {
  dedupIdx = 0;
  dedupSeen = new Set();
  dedupOut = [];
  renderDedup();
  document.getElementById("dedupStatus").textContent =
    "Process each element — O(1) lookup per item";
}
renderDedup();

/*  4. LRU CACHE  */
const LRU_CAP = 4;
const lruPages = [1, 2, 3, 4, 2, 5, 1, 3, 6, 4];
let lruCache = [],
  lruIdx = 0,
  lruHits = 0,
  lruMisses = 0;

function renderLRU(activeVal = -1) {
  // Show cache from most-recent (right) to least-recent (left)
  const display = [...lruCache].reverse();
  const cls = display.map((v) => (v === activeVal ? "active" : "found"));
  // pad to capacity
  while (display.length < LRU_CAP) {
    display.push("—");
  }
  const padCls = [...cls, ...Array(LRU_CAP - cls.length).fill("empty")];
  buildCells("lruCells", display, padCls);
}

function lruStep() {
  if (lruIdx >= lruPages.length) {
    lruIdx = 0;
    lruCache = [];
    lruHits = 0;
    lruMisses = 0;
    renderLRU();
    document.getElementById("lruStatus").textContent =
      "LRU cache: capacity = 4. Most-recent → least-recent";
    document.getElementById("lruHits").textContent = 0;
    document.getElementById("lruMiss").textContent = 0;
    return;
  }
  const page = lruPages[lruIdx];
  const hitIdx = lruCache.indexOf(page);
  if (hitIdx >= 0) {
    // Cache hit — move to most recent (end)
    lruCache.splice(hitIdx, 1);
    lruCache.push(page);
    lruHits++;
    document.getElementById("lruStatus").innerHTML =
      `Page <span>${page}</span> → CACHE HIT ✓ — moved to most-recent`;
  } else {
    // Cache miss
    if (lruCache.length >= LRU_CAP) {
      const evicted = lruCache.shift();
      document.getElementById("lruStatus").innerHTML =
        `Page <span>${page}</span> → MISS — evict LRU (${evicted}), load page ${page}`;
    } else {
      document.getElementById("lruStatus").innerHTML =
        `Page <span>${page}</span> → MISS — load into cache`;
    }
    lruCache.push(page);
    lruMisses++;
  }
  renderLRU(page);
  document.getElementById("lruHits").textContent = lruHits;
  document.getElementById("lruMiss").textContent = lruMisses;
  lruIdx++;
}
function lruReset() {
  lruIdx = 0;
  lruCache = [];
  lruHits = 0;
  lruMisses = 0;
  renderLRU();
  document.getElementById("lruStatus").textContent =
    "LRU cache: capacity = 4. Most-recent → least-recent";
  document.getElementById("lruHits").textContent = 0;
  document.getElementById("lruMiss").textContent = 0;
}
renderLRU();

/*  5. ANAGRAM DETECTION  */
const strA = "listen",
  strB = "silent";
let anagramMapA = {},
  anagramMapB = {},
  anagramIdx = 0,
  anagramPhase = 0;

function getFreqArr(map, keys) {
  return keys.map((k) => `${k}:${map[k] || 0}`);
}
function renderAnagram(activeCharA = "", activeCharB = "") {
  const keys = [...new Set([...strA, ...strB].sort())];
  const aArr = keys.map((k) => `${k}:${anagramMapA[k] || 0}`);
  const bArr = keys.map((k) => `${k}:${anagramMapB[k] || 0}`);
  const aCls = aArr.map((v, i) =>
    keys[i] === activeCharA ? "active" : anagramMapA[keys[i]] ? "found" : "def",
  );
  const bCls = bArr.map((v, i) =>
    keys[i] === activeCharB
      ? "active"
      : anagramMapB[keys[i]]
        ? "visited"
        : "def",
  );
  buildCells("anagramA", aArr, aCls);
  buildCells("anagramB", bArr, bCls);
}

function anagramStep() {
  const keys = [...new Set([...strA, ...strB].sort())];
  if (anagramIdx >= strA.length && anagramPhase === 0) {
    anagramPhase = 1;
    anagramIdx = 0;
  }
  if (anagramPhase === 0) {
    const ch = strA[anagramIdx];
    anagramMapA[ch] = (anagramMapA[ch] || 0) + 1;
    renderAnagram(ch, "");
    document.getElementById("anagramStatus").innerHTML =
      `A: freqA['<span>${ch}</span>'] = ${anagramMapA[ch]}`;
    document.getElementById("anagramInfo").innerHTML =
      `Processing string A, index ${anagramIdx}`;
    anagramIdx++;
  } else if (anagramPhase === 1 && anagramIdx < strB.length) {
    const ch = strB[anagramIdx];
    anagramMapB[ch] = (anagramMapB[ch] || 0) + 1;
    renderAnagram("", ch);
    document.getElementById("anagramStatus").innerHTML =
      `B: freqB['<span>${ch}</span>'] = ${anagramMapB[ch]}`;
    document.getElementById("anagramInfo").innerHTML =
      `Processing string B, index ${anagramIdx}`;
    anagramIdx++;
  } else {
    // Compare
    const isAnagram = keys.every(
      (k) => (anagramMapA[k] || 0) === (anagramMapB[k] || 0),
    );
    renderAnagram("", "");
    document.getElementById("anagramStatus").innerHTML = isAnagram
      ? `✅ <span>ANAGRAM</span> — all frequencies match!`
      : `❌ Not anagram — frequencies differ`;
    document.getElementById("anagramInfo").innerHTML =
      `"${strA}" and "${strB}" — O(n) comparison via hash maps`;
    anagramIdx = 0;
    anagramPhase = 0;
    anagramMapA = {};
    anagramMapB = {};
  }
}
function anagramReset() {
  anagramIdx = 0;
  anagramPhase = 0;
  anagramMapA = {};
  anagramMapB = {};
  renderAnagram();
  document.getElementById("anagramStatus").textContent =
    "Build frequency maps — O(n) per string";
  document.getElementById("anagramInfo").textContent = "";
}
renderAnagram();

/*  6. TWO SUM  */
const tsArr = [2, 7, 11, 4, 3, 6];
const TS_TARGET = 9;
let tsMap = {},
  tsIdx = 0,
  tsDone = false;

function renderTwoSum(activeIdx = -1, foundPair = null) {
  const arrCls = tsArr.map((_, i) => {
    if (foundPair && (i === foundPair[0] || i === foundPair[1])) return "found";
    if (i === activeIdx) return "active";
    if (i < tsIdx) return "visited";
    return "def";
  });
  buildCells("twoSumArr", tsArr, arrCls);
  // map display: show (value → index) pairs
  const mapItems = Object.entries(tsMap).map(([v, i]) => `${v}:${i}`);
  const mapCls = mapItems.map(() => "found");
  // add current if being inserted
  buildCells(
    "twoSumMap",
    mapItems.length ? mapItems : ["empty"],
    mapItems.length ? mapCls : ["empty"],
  );
}

function twoSumStep() {
  if (tsDone || tsIdx >= tsArr.length) {
    tsMap = {};
    tsIdx = 0;
    tsDone = false;
    renderTwoSum();
    document.getElementById("twoSumStatus").textContent =
      `Find two numbers that sum to ${TS_TARGET}`;
    document.getElementById("twoSumInfo").textContent = "";
    return;
  }
  const v = tsArr[tsIdx];
  const comp = TS_TARGET - v;
  if (tsMap.hasOwnProperty(comp)) {
    const j = tsMap[comp];
    renderTwoSum(tsIdx, [j, tsIdx]);
    document.getElementById("twoSumStatus").innerHTML =
      `✅ Found! arr[<span>${j}</span>]=${comp} + arr[${tsIdx}]=${v} = ${TS_TARGET}`;
    document.getElementById("twoSumInfo").innerHTML =
      `complement ${comp} was in map at index ${j} — O(1) lookup!`;
    tsDone = true;
  } else {
    tsMap[v] = tsIdx;
    renderTwoSum(tsIdx);
    document.getElementById("twoSumStatus").innerHTML =
      `v=${v}, need <span>${comp}</span> — not in map yet. Store map[${v}]=${tsIdx}`;
    document.getElementById("twoSumInfo").innerHTML =
      `Stored ${v}→${tsIdx} in hash map`;
    tsIdx++;
  }
}
function twoSumReset() {
  tsMap = {};
  tsIdx = 0;
  tsDone = false;
  renderTwoSum();
  document.getElementById("twoSumStatus").textContent =
    `Find two numbers that sum to ${TS_TARGET}`;
  document.getElementById("twoSumInfo").textContent = "";
}
renderTwoSum();

/*  HAMBURGER MENU  */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
let menuOpen = false;

hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileNav.classList.toggle("open", menuOpen);
  const spans = hamburger.querySelectorAll("span");
  if (menuOpen) {
    spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "";
  }
});

/* close on outside click */
document.addEventListener("click", (e) => {
  if (
    menuOpen &&
    !mobileNav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    menuOpen = false;
    mobileNav.classList.remove("open");
    hamburger.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  }
});

/* close on nav link click */
mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuOpen = false;
    mobileNav.classList.remove("open");
    hamburger.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  }),
);
