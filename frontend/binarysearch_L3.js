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

/*  CONCEPT DEMO */
const BS_DATA = [2, 7, 11, 15, 19, 23, 31, 38, 44, 50];
const BS_TARGET = 31;
let bsLow = 0,
  bsHigh = BS_DATA.length - 1,
  bsDone = false,
  bsStepCount = 0;

function buildBSConcept(low, high, mid, found = false) {
  const el = document.getElementById("conceptBSArray");
  el.innerHTML = "";
  BS_DATA.forEach((v, i) => {
    const cell = document.createElement("div");
    cell.className = "bs-cell";
    const isElim = i < low || i > high;
    if (found && i === mid) {
      cell.classList.add("found");
    } else if (i === mid) {
      cell.classList.add("mid");
    } else if (i === low && i === mid) {
    } else if (i === low) {
      cell.classList.add("low");
    } else if (i === high) {
      cell.classList.add("high");
    }
    if (isElim) cell.classList.add("eliminated");
    cell.innerHTML = `<span class="val">${v}</span><span class="lbl">${found && i === mid ? "✓ FOUND" : i === mid ? "mid" : i === low && !isElim ? "low" : i === high && !isElim ? "high" : ""}</span>`;
    el.appendChild(cell);
  });
}

function bsConceptStep() {
  if (bsDone) {
    bsConceptReset();
    return;
  }
  if (bsLow > bsHigh) {
    document.getElementById("conceptBSStatus").innerHTML =
      `❌ <span style="color:var(--primary-red)">${BS_TARGET} not found</span>`;
    bsDone = true;
    return;
  }
  const mid = Math.floor((bsLow + bsHigh) / 2);
  bsStepCount++;
  buildBSConcept(bsLow, bsHigh, mid, BS_DATA[mid] === BS_TARGET);
  if (BS_DATA[mid] === BS_TARGET) {
    document.getElementById("conceptBSStatus").innerHTML =
      `✅ Found <strong style="color:var(--primary-teal)">${BS_TARGET}</strong> at index [${mid}] in <strong style="color:var(--primary-orange)">${bsStepCount}</strong> step${bsStepCount > 1 ? "s" : ""}!`;
    bsDone = true;
  } else if (BS_DATA[mid] < BS_TARGET) {
    document.getElementById("conceptBSStatus").innerHTML =
      `Step ${bsStepCount}: mid[${mid}]=${BS_DATA[mid]} &lt; ${BS_TARGET} → search <span>RIGHT half</span> [${mid + 1}..${bsHigh}]`;
    bsLow = mid + 1;
  } else {
    document.getElementById("conceptBSStatus").innerHTML =
      `Step ${bsStepCount}: mid[${mid}]=${BS_DATA[mid]} &gt; ${BS_TARGET} → search <span>LEFT half</span> [${bsLow}..${mid - 1}]`;
    bsHigh = mid - 1;
  }
}
function bsConceptReset() {
  bsLow = 0;
  bsHigh = BS_DATA.length - 1;
  bsDone = false;
  bsStepCount = 0;
  buildBSConcept(-1, -1, -1);
  document.getElementById("conceptBSStatus").textContent =
    'Click "Next Step" to run binary search step by step';
}
buildBSConcept(-1, -1, -1);

/* 1. DICTIONARY SEARCH */
const dictWords = [
  "apple",
  "banana",
  "cherry",
  "dragon",
  "elephant",
  "fig",
  "grape",
  "honey",
  "iris",
  "jaguar",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "papaya",
  "quince",
  "raspberry",
  "strawberry",
  "tiger",
  "umbrella",
  "vanilla",
  "watermelon",
  "xylophone",
  "yellow",
  "zebra",
];

function dictSearch(q) {
  const res = document.getElementById("dictResult");
  const steps = document.getElementById("dictSteps");
  res.innerHTML = "";
  steps.textContent = "";
  if (!q) {
    return;
  }
  q = q.toLowerCase().trim();
  let lo = 0,
    hi = dictWords.length - 1,
    comparisons = 0,
    found = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    comparisons++;
    if (dictWords[mid] === q) {
      found = mid;
      break;
    } else if (dictWords[mid] < q) lo = mid + 1;
    else hi = mid - 1;
  }
  const div = document.createElement("div");
  div.className = "dict-result";
  if (found >= 0) {
    div.classList.add("found");
    div.innerHTML = `✅ Found "<strong>${dictWords[found]}</strong>" at index [${found}]`;
  } else {
    // suggest closest
    const closest = dictWords.find((w) => w.startsWith(q[0])) || null;
    div.classList.add("notfound");
    div.innerHTML = `❌ "${q}" not in dictionary${closest ? ` — did you mean "${closest}"?` : ""}`;
  }
  res.appendChild(div);
  steps.innerHTML = `Binary search used <b>${comparisons}</b> comparison${comparisons !== 1 ? "s" : ""} out of ${dictWords.length} words`;
}

/*  2. DATABASE SEARCH */
const dbIds = [
  1001, 1008, 1015, 1024, 1031, 1042, 1055, 1063, 1071, 1078, 1085, 1092, 1099,
];
let dbTimer = null;

function buildDbArray(lo, hi, mid, found = false) {
  const el = document.getElementById("dbArray");
  el.innerHTML = "";
  dbIds.forEach((id, i) => {
    const c = document.createElement("div");
    c.className = "mc";
    if (found && i === mid) c.classList.add("found");
    else if (i === mid) c.classList.add("mid");
    else if (i < lo || i > hi) c.classList.add("elim");
    else if (i === lo) c.classList.add("low");
    else if (i === hi) c.classList.add("high");
    c.textContent = id;
    el.appendChild(c);
  });
}
function dbSearch(target) {
  dbReset();
  let lo = 0,
    hi = dbIds.length - 1,
    step = 0;
  buildDbArray(lo, hi, -1);
  document.getElementById("dbStatus").innerHTML =
    `Searching for ID <span>${target}</span>...`;
  const run = () => {
    if (lo > hi) {
      buildDbArray(0, -1, -1);
      document.getElementById("dbStatus").innerHTML =
        `❌ ID <span style="color:var(--primary-red)">${target}</span> not found`;
      return;
    }
    const mid = Math.floor((lo + hi) / 2);
    step++;
    buildDbArray(lo, hi, mid, dbIds[mid] === target);
    if (dbIds[mid] === target) {
      document.getElementById("dbStatus").innerHTML =
        `✅ Found user <span>${target}</span> at index [${mid}]`;
      document.getElementById("dbSteps").innerHTML =
        `Found in <b>${step}</b> step${step > 1 ? "s" : ""} — linear would take up to ${dbIds.length}`;
      return;
    }
    if (dbIds[mid] < target) {
      document.getElementById("dbStatus").innerHTML =
        `Step ${step}: ${dbIds[mid]} &lt; ${target} → go <span>RIGHT</span>`;
      lo = mid + 1;
    } else {
      document.getElementById("dbStatus").innerHTML =
        `Step ${step}: ${dbIds[mid]} &gt; ${target} → go <span>LEFT</span>`;
      hi = mid - 1;
    }
    document.getElementById("dbSteps").innerHTML = `Step <b>${step}</b>`;
    dbTimer = setTimeout(run, 700);
  };
  dbTimer = setTimeout(run, 400);
}
function dbReset() {
  clearTimeout(dbTimer);
  buildDbArray(0, dbIds.length - 1, -1);
  document.getElementById("dbStatus").textContent =
    "Select a user ID to search";
  document.getElementById("dbSteps").textContent = "";
}
buildDbArray(0, dbIds.length - 1, -1);

/*  3. GIT BISECT */
const commits = [
  "c1a",
  "c2b",
  "c3c",
  "c4d",
  "c5e",
  "c6f",
  "c7g",
  "c8h",
  "c9i",
  "c10j",
];
const BUG_AT = 6; // index where bug was introduced
let bisLo = 0,
  bisHi = commits.length - 1,
  bisDone = false,
  bisSteps = 0;

function buildBisect(lo, hi, mid, bugFound = false) {
  const el = document.getElementById("bisectArray");
  el.innerHTML = "";
  commits.forEach((c, i) => {
    const cell = document.createElement("div");
    cell.className = "mc";
    const hasBug = i >= BUG_AT;
    if (bugFound && i === mid) {
      cell.classList.add("found");
      cell.style.borderColor = "var(--primary-red)";
    } else if (i === mid) {
      cell.classList.add("mid");
    } else if (i < lo || i > hi) {
      cell.classList.add("elim");
    }
    cell.textContent = c;
    if (!cell.classList.contains("elim")) {
      cell.style.background = hasBug
        ? "rgba(239,68,68,.08)"
        : "rgba(16,185,129,.08)";
    }
    el.appendChild(cell);
  });
}
function bisectStep(verdict) {
  if (bisDone) return;
  const mid = Math.floor((bisLo + bisHi) / 2);
  bisSteps++;
  if (verdict === "good") {
    bisLo = mid + 1;
    document.getElementById("bisectStatus").innerHTML =
      `✅ Commit ${commits[mid]} is good → bug introduced AFTER this`;
  } else {
    bisHi = mid;
    document.getElementById("bisectStatus").innerHTML =
      `❌ Commit ${commits[mid]} has bug → bug introduced AT or BEFORE this`;
  }
  if (bisLo >= bisHi) {
    buildBisect(bisLo, bisHi, bisLo, true);
    document.getElementById("bisectStatus").innerHTML =
      `🐛 Bug found! First bad commit: <span style="color:var(--primary-red)">${commits[bisLo]}</span>`;
    document.getElementById("bisectSteps").innerHTML =
      `Found in <b>${bisSteps}</b> steps — linear would take up to ${commits.length}`;
    bisDone = true;
    return;
  }
  buildBisect(bisLo, bisHi, Math.floor((bisLo + bisHi) / 2));
  document.getElementById("bisectSteps").innerHTML =
    `Step <b>${bisSteps}</b> — range narrowed to ${bisHi - bisLo + 1} commits`;
}
function bisectReset() {
  bisLo = 0;
  bisHi = commits.length - 1;
  bisDone = false;
  bisSteps = 0;
  buildBisect(bisLo, bisHi, Math.floor((bisLo + bisHi) / 2));
  document.getElementById("bisectStatus").textContent =
    "Start: mark commits as good or bad";
  document.getElementById("bisectSteps").textContent = "";
}
buildBisect(bisLo, bisHi, Math.floor((bisLo + bisHi) / 2));

/*  4. LEADERBOARD  */
const leaderboard = [
  { name: "Alice", score: 9850 },
  { name: "Bob", score: 8920 },
  { name: "Carol", score: 8100 },
  { name: "Dave", score: 7650 },
  { name: "Eve", score: 7200 },
  { name: "Frank", score: 6800 },
  { name: "Grace", score: 5900 },
  { name: "Henry", score: 5100 },
  { name: "Iris", score: 4200 },
  { name: "Jack", score: 3800 },
  { name: "Karen", score: 2900 },
  { name: "Liam", score: 1800 },
  { name: "Maya", score: 900 },
  { name: "Noah", score: 400 },
  { name: "Zara", score: 100 },
].sort((a, b) => a.name.localeCompare(b.name)); // sorted by name for binary search

function renderLB(checkIdx = -1, foundIdx = -1) {
  const el = document.getElementById("lbList");
  el.innerHTML = "";
  leaderboard.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "lb-row";
    if (i === foundIdx) div.classList.add("found");
    else if (i === checkIdx) div.classList.add("checking");
    else div.classList.add("elim-row");
    div.innerHTML = `<span class="lb-rank">#${i + 1}</span><span class="lb-name">${p.name}</span><span class="lb-score">${p.score.toLocaleString()} pts</span>`;
    el.appendChild(div);
  });
}
function lbSearch(target) {
  lbReset();
  let lo = 0,
    hi = leaderboard.length - 1,
    step = 0;
  const animate = () => {
    if (lo > hi) {
      renderLB(-1, -1);
      document.getElementById("lbSteps").innerHTML =
        `❌ Player not found after <b>${step}</b> steps`;
      return;
    }
    const mid = Math.floor((lo + hi) / 2);
    step++;
    const cmp = leaderboard[mid].name.localeCompare(target);
    if (cmp === 0) {
      renderLB(-1, mid);
      document.getElementById("lbSteps").innerHTML =
        `✅ Found <b>${target}</b> at rank #${mid + 1} in <b>${step}</b> steps`;
      return;
    }
    renderLB(mid, -1);
    if (cmp < 0) lo = mid + 1;
    else hi = mid - 1;
    setTimeout(animate, 600);
  };
  renderLB(Math.floor((lo + hi) / 2), -1);
  setTimeout(animate, 400);
}
function lbReset() {
  const el = document.getElementById("lbList");
  el.innerHTML = "";
  leaderboard.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "lb-row";
    div.innerHTML = `<span class="lb-rank">#${i + 1}</span><span class="lb-name">${p.name}</span><span class="lb-score">${p.score.toLocaleString()} pts</span>`;
    el.appendChild(div);
  });
  document.getElementById("lbSteps").textContent = "";
}
lbReset();

/*  5. VERSION FINDER  */
const versions = [
  "v1.0",
  "v1.1",
  "v1.2",
  "v1.3",
  "v1.4",
  "v1.5",
  "v1.6",
  "v1.7",
  "v1.8",
  "v1.9",
  "v2.0",
  "v2.1",
];
const FIRST_BAD = 7;
let verTimer = null;

function buildVersionArray(lo, hi, mid, badFound = false) {
  const el = document.getElementById("versionArray");
  el.innerHTML = "";
  versions.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "mc";
    const isBad = i >= FIRST_BAD;
    if (badFound && i === mid) {
      c.classList.add("found");
      c.style.borderColor = "var(--primary-red)";
      c.style.color = "var(--primary-red)";
    } else if (i === mid) c.classList.add("mid");
    else if (i < lo || i > hi) c.classList.add("elim");
    c.textContent = v;
    el.appendChild(c);
  });
}
function versionSearch() {
  versionReset();
  let lo = 0,
    hi = versions.length - 1,
    step = 0;
  buildVersionArray(lo, hi, Math.floor((lo + hi) / 2));
  const run = () => {
    if (lo >= hi) {
      buildVersionArray(lo, hi, lo, true);
      document.getElementById("versionStatus").innerHTML =
        `🚨 First bad version: <span style="color:var(--primary-red)">${versions[lo]}</span>`;
      document.getElementById("versionSteps").innerHTML =
        `Found in <b>${step}</b> steps out of ${versions.length} versions`;
      return;
    }
    const mid = Math.floor((lo + hi) / 2);
    step++;
    const isBad = mid >= FIRST_BAD;
    buildVersionArray(lo, hi, mid);
    document.getElementById("versionStatus").innerHTML =
      `Step ${step}: Is <span>${versions[mid]}</span> bad? → ${isBad ? '<span style="color:var(--primary-red)">YES → search LEFT</span>' : '<span style="color:var(--primary-green)">NO → search RIGHT</span>'}`;
    document.getElementById("versionSteps").innerHTML = `Step <b>${step}</b>`;
    if (isBad) hi = mid;
    else lo = mid + 1;
    verTimer = setTimeout(run, 700);
  };
  verTimer = setTimeout(run, 400);
}
function versionReset() {
  clearTimeout(verTimer);
  buildVersionArray(0, versions.length - 1, -1);
  document.getElementById("versionStatus").textContent =
    "Press button to find the first bad version";
  document.getElementById("versionSteps").textContent = "";
}
buildVersionArray(0, versions.length - 1, -1);

/*  6. PRICE RANGE FILTER */
const products = [
  { name: "Pen", price: 20 },
  { name: "Notebook", price: 80 },
  { name: "Bag", price: 250 },
  { name: "Mouse", price: 350 },
  { name: "Keyboard", price: 450 },
  { name: "Monitor", price: 600 },
  { name: "Headphones", price: 700 },
  { name: "Webcam", price: 800 },
  { name: "Tablet", price: 900 },
  { name: "Laptop", price: 950 },
];
const prices = products.map((p) => p.price);

function buildPriceArray(boundary) {
  const el = document.getElementById("priceArray");
  el.innerHTML = "";
  prices.forEach((p, i) => {
    const c = document.createElement("div");
    c.className = "mc";
    if (i === boundary) c.classList.add("found");
    else if (i < boundary) c.classList.add("elim");
    c.textContent = "₹" + p;
    el.appendChild(c);
  });
}
function priceFilter() {
  const min = parseInt(document.getElementById("priceSlider").value);
  document.getElementById("priceVal").textContent = "₹" + min;
  // binary search for first price >= min
  let lo = 0,
    hi = prices.length - 1,
    boundary = prices.length,
    steps = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps++;
    if (prices[mid] >= min) {
      boundary = mid;
      hi = mid - 1;
    } else lo = mid + 1;
  }
  buildPriceArray(boundary);
  const results = document.getElementById("priceResults");
  results.innerHTML = "";
  const matching = products.slice(boundary);
  matching.forEach((p) => {
    const d = document.createElement("div");
    d.style.cssText =
      "font-size:.75rem;padding:.25rem .5rem;border-radius:5px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);color:var(--primary-green);margin-bottom:.2rem;display:flex;justify-content:space-between;";
    d.innerHTML = `<span>${p.name}</span><span style="font-family:'JetBrains Mono',monospace">₹${p.price}</span>`;
    results.appendChild(d);
  });
  if (matching.length === 0) {
    results.innerHTML =
      '<div style="font-size:.75rem;color:var(--text-secondary)">No products in this range</div>';
  }
  document.getElementById("priceSteps").innerHTML =
    `Binary search found boundary in <b>${steps}</b> steps — showing <b>${matching.length}</b> product${matching.length !== 1 ? "s" : ""}`;
}
priceFilter();
