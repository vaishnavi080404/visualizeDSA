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

/* CONCEPT ARRAY DEMO  */
const CONCEPT_DATA = [2, 5, 9, 1, 7, 4, 8, 3];
const CONCEPT_TARGET = 7;
let conceptTimer = null;
let conceptStep = 0;

function buildConceptArray(highlight = -1, found = false) {
  const el = document.getElementById("conceptArray");
  el.innerHTML = "";
  CONCEPT_DATA.forEach((v, i) => {
    const wrap = document.createElement("div");
    wrap.style.cssText =
      "display:flex;flex-direction:column;align-items:center;gap:6px;";
    const cell = document.createElement("div");
    cell.className =
      "ls-cell" +
      (i === highlight && found
        ? " found"
        : i === highlight
          ? " checking"
          : i < highlight
            ? " passed"
            : "");
    cell.innerHTML = `${v}<span class="idx">[${i}]</span>`;
    wrap.appendChild(cell);
    el.appendChild(wrap);
  });
}

function conceptSearch() {
  clearInterval(conceptTimer);
  conceptStep = 0;
  buildConceptArray();
  document.getElementById("conceptStatus").textContent =
    `Searching for ${CONCEPT_TARGET}...`;
  document.getElementById("conceptStatus").style.color =
    "var(--text-secondary)";
  conceptTimer = setInterval(() => {
    if (conceptStep >= CONCEPT_DATA.length) {
      clearInterval(conceptTimer);
      document.getElementById("conceptStatus").innerHTML =
        `❌ <span style="color:var(--primary-red)">${CONCEPT_TARGET} not found</span> — checked all ${CONCEPT_DATA.length} elements`;
      return;
    }
    if (CONCEPT_DATA[conceptStep] === CONCEPT_TARGET) {
      clearInterval(conceptTimer);
      buildConceptArray(conceptStep, true);
      document.getElementById("conceptStatus").innerHTML =
        `✅ Found <strong style="color:var(--primary-green)">${CONCEPT_TARGET}</strong> at index [${conceptStep}] — took ${conceptStep + 1} comparison${conceptStep > 0 ? "s" : ""}`;
      return;
    }
    buildConceptArray(conceptStep, false);
    document.getElementById("conceptStatus").innerHTML =
      `Checking index [${conceptStep}]: <strong style="color:var(--primary-orange)">${CONCEPT_DATA[conceptStep]}</strong> ≠ ${CONCEPT_TARGET}`;
    conceptStep++;
  }, 600);
}
function conceptReset() {
  clearInterval(conceptTimer);
  conceptStep = 0;
  buildConceptArray();
  document.getElementById("conceptStatus").textContent =
    'Click "Start Search" to see linear search in action';
  document.getElementById("conceptStatus").style.color =
    "var(--text-secondary)";
}
buildConceptArray();

/*  1. CTRL+F SEARCH */
const ctrlFWords = [
  "The",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "the",
  "lazy",
  "dog",
  "and",
  "runs",
  "into",
  "the",
  "forest",
];
function ctrlFSearch(q) {
  const list = document.getElementById("ctrlFList");
  const steps = document.getElementById("ctrlFSteps");
  list.innerHTML = "";
  if (!q) {
    steps.textContent = "";
    return;
  }
  let count = 0,
    matches = 0;
  ctrlFWords.forEach((w) => {
    count++;
    const div = document.createElement("div");
    div.className = "search-result-item";
    const isMatch = w.toLowerCase().includes(q.toLowerCase());
    if (isMatch) {
      div.className += " match";
      div.textContent = `✓ "${w}" — match!`;
      matches++;
    } else {
      div.className += " no-match";
      div.textContent = `  "${w}"`;
    }
    list.appendChild(div);
  });
  steps.innerHTML = `Scanned <b>${count}</b> words — found <b style="color:var(--primary-green)">${matches}</b> match${matches !== 1 ? "es" : ""}`;
}

/*  2. CONTACTS SEARCH  */
const contacts = [
  "Alice Johnson",
  "Bob Smith",
  "Carol White",
  "Dave Brown",
  "Eve Davis",
  "Frank Wilson",
  "Grace Lee",
  "Henry Taylor",
  "Iris Martin",
  "Jack Anderson",
  "Karen Thomas",
  "Liam Jackson",
  "Maya Harris",
  "Noah Clark",
];
function contactSearch(q) {
  const list = document.getElementById("contactList");
  const steps = document.getElementById("contactSteps");
  list.innerHTML = "";
  if (!q) {
    steps.textContent = "";
    return;
  }
  let count = 0,
    found = 0;
  contacts.forEach((c) => {
    count++;
    const div = document.createElement("div");
    div.className = "search-result-item";
    if (c.toLowerCase().includes(q.toLowerCase())) {
      div.className += " match";
      div.innerHTML = `👤 ${c}`;
      found++;
      list.appendChild(div);
    }
  });
  if (found === 0) {
    const div = document.createElement("div");
    div.className = "search-result-item no-match";
    div.textContent = "No contacts found";
    list.appendChild(div);
  }
  steps.innerHTML = `Scanned <b>${count}</b> contacts — <b style="color:var(--primary-green)">${found}</b> match${found !== 1 ? "es" : ""}`;
}

/*  3. ANTIVIRUS SCAN  */
const avBytes = [
  "0xAF",
  "0x3C",
  "0x9B",
  "0xD2",
  "0x4E",
  "VIRUS",
  "0x71",
  "0x88",
  "0x1A",
  "0xF3",
  "0x6D",
  "0x29",
];
let avTimer = null;

function buildAVArray(step = -1, found = false) {
  const el = document.getElementById("antivirusArray");
  el.innerHTML = "";
  avBytes.forEach((b, i) => {
    const cell = document.createElement("div");
    cell.className =
      "m-cell" +
      (i === step && found
        ? " found"
        : i === step
          ? " checking"
          : i < step
            ? " passed"
            : "");
    cell.textContent = b;
    el.appendChild(cell);
  });
}
function antivirusScan() {
  clearInterval(avTimer);
  let i = 0;
  buildAVArray();
  document.getElementById("antivirusStatus").textContent = "Scanning...";
  document.getElementById("antivirusSteps").textContent = "";
  avTimer = setInterval(() => {
    if (i >= avBytes.length) {
      clearInterval(avTimer);
      document.getElementById("antivirusStatus").innerHTML =
        "✅ <span>Scan complete — no threats found</span>";
      buildAVArray(avBytes.length);
      return;
    }
    buildAVArray(i, false);
    if (avBytes[i] === "VIRUS") {
      clearInterval(avTimer);
      buildAVArray(i, true);
      document.getElementById("antivirusStatus").innerHTML =
        `🚨 <span style="color:var(--primary-red)">VIRUS DETECTED at byte ${i}!</span>`;
      document.getElementById("antivirusSteps").innerHTML =
        `Found after <b>${i + 1}</b> byte checks`;
      return;
    }
    document.getElementById("antivirusStatus").innerHTML =
      `Checking byte ${i}: <span>${avBytes[i]}</span>`;
    document.getElementById("antivirusSteps").innerHTML =
      `Checked <b>${i + 1}</b> of ${avBytes.length} bytes`;
    i++;
  }, 400);
}
function antivirusReset() {
  clearInterval(avTimer);
  buildAVArray();
  document.getElementById("antivirusStatus").textContent =
    "Press Start Scan to begin";
  document.getElementById("antivirusSteps").textContent = "";
}
buildAVArray();

/*  4. MOVIE FILTER  */
const movies = [
  { t: "Avengers", g: "Action" },
  { t: "The Office", g: "Comedy" },
  { t: "Interstellar", g: "Sci-Fi" },
  { t: "Die Hard", g: "Action" },
  { t: "Superbad", g: "Comedy" },
  { t: "The Matrix", g: "Sci-Fi" },
  { t: "Mad Max", g: "Action" },
  { t: "Inception", g: "Sci-Fi" },
  { t: "Hangover", g: "Comedy" },
];
const genreColors = {
  Action: "var(--primary-red)",
  Comedy: "var(--primary-orange)",
  "Sci-Fi": "var(--primary-cyan)",
};
function filterGenre(genre) {
  const list = document.getElementById("movieList");
  const steps = document.getElementById("movieSteps");
  list.innerHTML = "";
  let count = 0,
    shown = 0;
  movies.forEach((m) => {
    count++;
    const div = document.createElement("div");
    div.className = "search-result-item";
    const match = !genre || m.g === genre;
    if (match) {
      div.className += " match";
      div.innerHTML = `🎬 ${m.t} <span style="font-size:.68rem;color:${genreColors[m.g]};margin-left:.4rem">${m.g}</span>`;
      shown++;
    } else {
      div.className += " no-match";
      div.innerHTML = `  ${m.t} <span style="font-size:.68rem;opacity:.4">${m.g}</span>`;
    }
    list.appendChild(div);
  });
  steps.innerHTML = genre
    ? `Scanned <b>${count}</b> movies — showing <b style="color:var(--primary-green)">${shown}</b> ${genre} films`
    : `Showing all <b>${count}</b> movies`;
}
filterGenre("");

/*  5. ID CARD LOOKUP  */
const idList = [
  "A-101",
  "A-102",
  "A-103",
  "B-201",
  "B-202",
  "B-205",
  "C-301",
  "C-302",
];
function buildIDArray(step = -1, found = false) {
  const el = document.getElementById("idArray");
  el.innerHTML = "";
  idList.forEach((id, i) => {
    const cell = document.createElement("div");
    cell.className =
      "m-cell" +
      (i === step && found
        ? " found"
        : i === step
          ? " checking"
          : i < step
            ? " passed"
            : "");
    cell.style.minWidth = "52px";
    cell.textContent = id;
    el.appendChild(cell);
  });
}
function scanID(target) {
  idReset();
  let i = 0;
  const timer = setInterval(() => {
    if (i >= idList.length) {
      clearInterval(timer);
      buildIDArray(idList.length);
      document.getElementById("idStatus").innerHTML =
        `❌ <span style="color:var(--primary-red)">${target} not found — access denied</span>`;
      return;
    }
    buildIDArray(i, false);
    if (idList[i] === target) {
      clearInterval(timer);
      buildIDArray(i, true);
      document.getElementById("idStatus").innerHTML =
        `✅ <span>${target} verified!</span> Found at position ${i} after ${i + 1} check${i > 0 ? "s" : ""}`;
      return;
    }
    document.getElementById("idStatus").innerHTML =
      `Checking <span>${idList[i]}</span>...`;
    i++;
  }, 400);
}
function idReset() {
  buildIDArray();
  document.getElementById("idStatus").textContent = "Select an ID to scan";
}
buildIDArray();

/*  6. GIT HISTORY SEARCH  */
const commits = [
  { hash: "a3f9c2", msg: "fix: resolve login bug on mobile" },
  { hash: "b81e45", msg: "feat: add dark mode support" },
  { hash: "c72d11", msg: "refactor: clean up auth module" },
  { hash: "d4a830", msg: "fix: broken navbar on Safari" },
  { hash: "e99f12", msg: "feat: implement search feature" },
  { hash: "f55b67", msg: "docs: update README" },
  { hash: "g21c93", msg: "test: add unit tests for queue" },
  { hash: "h78d40", msg: "chore: update dependencies" },
];
function gitSearch(q) {
  const list = document.getElementById("gitList");
  const steps = document.getElementById("gitSteps");
  list.innerHTML = "";
  if (!q) {
    steps.textContent = "";
    return;
  }
  let count = 0,
    found = 0;
  commits.forEach((c) => {
    count++;
    const div = document.createElement("div");
    const match = c.msg.toLowerCase().includes(q.toLowerCase());
    div.className = "search-result-item" + (match ? " match" : " no-match");
    div.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--primary-orange);margin-right:.5rem">${c.hash}</span>${c.msg}`;
    if (match) found++;
    list.appendChild(div);
  });
  steps.innerHTML = `Scanned <b>${count}</b> commits — <b style="color:var(--primary-green)">${found}</b> match${found !== 1 ? "es" : ""}`;
}
