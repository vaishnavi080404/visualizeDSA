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

function makeStrRow(elId, chars, classes) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  chars.forEach((ch, i) => {
    const c = document.createElement("div");
    c.className = "scell-s " + (classes[i] || "def");
    c.textContent = ch === " " ? "·" : ch;
    el.appendChild(c);
  });
}

/*  sequential traversal ── */
const cStr = "Hello World!".split("");
let cIdx = 0,
  cSeen = [];
function renderConceptStr(ai = -1) {
  const el = document.getElementById("conceptStr");
  el.innerHTML = "";
  cStr.forEach((ch, i) => {
    const cell = document.createElement("div");
    cell.className = "str-cell";
    cell.innerHTML = `${ch == " " ? "·" : ch}<span class="cidx">[${i}]</span>`;
    if (i === ai) cell.classList.add("active");
    else if (cSeen.includes(i)) cell.classList.add("visited");
    else cell.classList.add("def");
    el.appendChild(cell);
  });
}
function conceptStep() {
  if (cIdx >= cStr.length) {
    renderConceptStr(-1);
    document.getElementById("conceptStatus").innerHTML =
      `✅ Traversed all ${cStr.length} characters in O(n)`;
    cIdx = 0;
    cSeen = [];
    return;
  }
  cSeen.push(cIdx);
  renderConceptStr(cIdx);
  const ch = cStr[cIdx];
  document.getElementById("conceptStatus").innerHTML =
    `str[<span>${cIdx}</span>] = '<span>${ch == " " ? "space" : ch}</span>' (ASCII ${ch.charCodeAt(0)})`;
  cIdx++;
}
function conceptReset() {
  cIdx = 0;
  cSeen = [];
  renderConceptStr();
  document.getElementById("conceptStatus").textContent =
    'Click "Visit Next Char" — sequential traversal';
}
renderConceptStr();

/* PATTERN MATCHING ── */
const kmpText = "AABABABABCABABC".split("");
const kmpPat = "ABABC".split("");
let kmpI = 0,
  kmpJ = 0,
  kmpCompsVal = 0,
  kmpMatchesVal = 0,
  kmpDone = false,
  kmpMatchPos = [];
// Build failure function
function buildFailure(pat) {
  const f = Array(pat.length).fill(0);
  let k = 0;
  for (let i = 1; i < pat.length; i++) {
    while (k > 0 && pat[i] !== pat[k]) k = f[k - 1];
    if (pat[i] === pat[k]) k++;
    f[i] = k;
  }
  return f;
}
const kmpFail = buildFailure(kmpPat);
function renderKMP() {
  const tCls = Array(kmpText.length).fill("def");
  const pCls = Array(kmpPat.length).fill("def");
  kmpMatchPos.forEach((p) => {
    for (let x = p; x < p + kmpPat.length; x++) tCls[x] = "found";
  });
  if (!kmpDone && kmpI < kmpText.length) {
    tCls[kmpI] = "active";
    if (kmpJ > 0) for (let x = kmpI - kmpJ; x < kmpI; x++) tCls[x] = "match";
  }
  for (let x = 0; x < kmpJ; x++) pCls[x] = "match";
  if (kmpJ < kmpPat.length) pCls[kmpJ] = "active";
  makeStrRow("kmpTextRow", kmpText, tCls);
  makeStrRow("kmpPatRow", kmpPat, pCls);
}
function kmpReset() {
  kmpI = 0;
  kmpJ = 0;
  kmpCompsVal = 0;
  kmpMatchesVal = 0;
  kmpDone = false;
  kmpMatchPos = [];
  renderKMP();
  document.getElementById("kmpStatus").textContent =
    "KMP: precompute failure function → search in O(n+m)";
  document.getElementById("kmpComps").textContent = 0;
  document.getElementById("kmpMatches").textContent = "—";
}
function kmpStep() {
  if (kmpDone) {
    kmpReset();
    return;
  }
  if (kmpI >= kmpText.length) {
    kmpDone = true;
    renderKMP();
    document.getElementById("kmpStatus").innerHTML =
      `✅ Done: <span>${kmpMatchesVal}</span> match(es) found in ${kmpCompsVal} comparisons`;
    document.getElementById("kmpMatches").textContent = kmpMatchesVal;
    return;
  }
  kmpCompsVal++;
  if (kmpText[kmpI] === kmpPat[kmpJ]) {
    document.getElementById("kmpStatus").innerHTML =
      `str[${kmpI}]='${kmpText[kmpI]}' = pat[${kmpJ}]='${kmpPat[kmpJ]}' → <span>match ✓</span>`;
    kmpJ++;
    kmpI++;
    if (kmpJ === kmpPat.length) {
      kmpMatchesVal++;
      kmpMatchPos.push(kmpI - kmpJ);
      kmpJ = kmpFail[kmpJ - 1];
      document.getElementById("kmpStatus").innerHTML =
        `🎉 <span>Full match found at index ${kmpI - kmpPat.length}!</span>`;
    }
  } else {
    if (kmpJ > 0) {
      document.getElementById("kmpStatus").innerHTML =
        `Mismatch — jump j from ${kmpJ} to <span>${kmpFail[kmpJ - 1]}</span> (no backtrack on i)`;
      kmpJ = kmpFail[kmpJ - 1];
    } else {
      document.getElementById("kmpStatus").innerHTML =
        `str[${kmpI}]='${kmpText[kmpI]}' ≠ pat[0]='${kmpPat[0]}' → advance i`;
      kmpI++;
    }
  }
  renderKMP();
  document.getElementById("kmpComps").textContent = kmpCompsVal;
  document.getElementById("kmpMatches").textContent = kmpMatchesVal || "—";
}
kmpReset();

/* ──  SLIDING WINDOW ── */
const swStr = "abcabcbb".split("");
let swLeft = 0,
  swRight = 0,
  swMap = {},
  swMaxVal = 0,
  swMaxL = 0,
  swMaxR = 0,
  swDone = false;
function renderSW() {
  const cls = swStr.map((c, i) => {
    if (i === swRight && !swDone) return "active";
    if (i >= swLeft && i < swRight) return "window";
    if (swDone && i >= swMaxL && i <= swMaxR) return "found";
    return "def";
  });
  makeStrRow("swRow", swStr, cls);
}
function swReset() {
  swLeft = 0;
  swRight = 0;
  swMap = {};
  swMaxVal = 0;
  swMaxL = 0;
  swMaxR = 0;
  swDone = false;
  renderSW();
  document.getElementById("swStatus").textContent =
    "Sliding window: expand right, shrink left on duplicate";
  document.getElementById("swL").textContent = 0;
  document.getElementById("swR").textContent = 0;
  document.getElementById("swMax").textContent = 0;
}
function swStep() {
  if (swDone) {
    swReset();
    return;
  }
  if (swRight >= swStr.length) {
    swDone = true;
    renderSW();
    document.getElementById("swStatus").innerHTML =
      `✅ Longest substring: "<span>${swStr.slice(swMaxL, swMaxR + 1).join("")}</span>" length <span>${swMaxVal}</span>`;
    document.getElementById("swMax").textContent = swMaxVal;
    return;
  }
  const ch = swStr[swRight];
  if (swMap[ch] !== undefined && swMap[ch] >= swLeft) {
    document.getElementById("swStatus").innerHTML =
      `'<span>${ch}</span>' already in window → shrink left to ${swMap[ch] + 1}`;
    swLeft = swMap[ch] + 1;
  } else {
    document.getElementById("swStatus").innerHTML =
      `'<span>${ch}</span>' is new → expand window to [${swLeft},${swRight}] len=${swRight - swLeft + 1}`;
  }
  swMap[ch] = swRight;
  const len = swRight - swLeft + 1;
  if (len > swMaxVal) {
    swMaxVal = len;
    swMaxL = swLeft;
    swMaxR = swRight;
  }
  renderSW();
  document.getElementById("swL").textContent = swLeft;
  document.getElementById("swR").textContent = swRight;
  document.getElementById("swMax").textContent = swMaxVal;
  swRight++;
}
swReset();

/*  TWO POINTER PALINDROME  */
const palStr = "racecar".split("");
let palL = 0,
  palR = palStr.length - 1,
  palDone = false,
  palResult = null;
function renderPal(state = "default") {
  const cls = palStr.map((c, i) => {
    if (palDone) {
      return palResult ? "found" : "skip";
    }
    if (i === palL || i === palR) return "active";
    if (i < palL || i > palR) return "visited";
    return "def";
  });
  makeStrRow("palRow", palStr, cls);
}
function palReset() {
  palL = 0;
  palR = palStr.length - 1;
  palDone = false;
  palResult = null;
  renderPal();
  document.getElementById("palStatus").textContent =
    "Two pointers: left → and ← right, compare each pair";
  document.getElementById("palInfo").textContent = "";
}
function palStep() {
  if (palDone) {
    palReset();
    return;
  }
  if (palL >= palR) {
    palDone = true;
    palResult = true;
    renderPal();
    document.getElementById("palStatus").innerHTML =
      `✅ "<span>${palStr.join("")}</span>" IS a palindrome — all pairs matched!`;
    document.getElementById("palInfo").innerHTML =
      `Two-pointer check: O(n) time, O(1) space`;
    return;
  }
  const lc = palStr[palL],
    rc = palStr[palR];
  if (lc !== rc) {
    palDone = true;
    palResult = false;
    renderPal();
    document.getElementById("palStatus").innerHTML =
      `❌ Mismatch: str[${palL}]='<span>${lc}</span>' ≠ str[${palR}]='<span>${rc}</span>' — NOT a palindrome`;
    document.getElementById("palInfo").innerHTML =
      `Failed at indices <b>${palL}</b> and <b>${palR}</b>`;
    return;
  }
  document.getElementById("palStatus").innerHTML =
    `str[${palL}]='<span>${lc}</span>' = str[${palR}]='<span>${rc}</span>' → <span>match ✓</span>`;
  document.getElementById("palInfo").innerHTML =
    `Advance: left ${palL}→${palL + 1}, right ${palR}→${palR - 1}`;
  palL++;
  palR--;
  renderPal();
}
palReset();

/* 4 ANAGRAM  */
const anaS1 = "listen".split("");
const anaS2 = "silent".split("");
let anaIdx = 0,
  anaFreq1 = {},
  anaFreq2 = {},
  anaDone = false;
function renderAna() {
  const cls1 = anaS1.map((c, i) =>
    i < anaIdx ? "visited" : i === anaIdx && !anaDone ? "active" : "def",
  );
  const cls2 = anaS2.map((c, i) =>
    i < anaIdx ? "visited" : i === anaIdx && !anaDone ? "active" : "def",
  );
  makeStrRow("anaRow1", anaS1, cls1);
  makeStrRow("anaRow2", anaS2, cls2);
}
function anaReset() {
  anaIdx = 0;
  anaFreq1 = {};
  anaFreq2 = {};
  anaDone = false;
  renderAna();
  document.getElementById("anaStatus").textContent =
    "Build frequency map for each string then compare";
  document.getElementById("anaInfo").textContent = "";
}
function anaStep() {
  if (anaDone) {
    anaReset();
    return;
  }
  if (anaIdx >= anaS1.length) {
    // compare
    const isAna =
      Object.keys(anaFreq1).every((k) => anaFreq1[k] === (anaFreq2[k] || 0)) &&
      Object.keys(anaFreq2).every((k) => anaFreq2[k] === (anaFreq1[k] || 0));
    anaDone = true;
    renderAna();
    if (isAna)
      document.getElementById("anaStatus").innerHTML =
        `✅ <span>"${anaS1.join("")}" and "${anaS2.join("")}" ARE anagrams!</span> Frequency maps match`;
    else
      document.getElementById("anaStatus").innerHTML =
        `❌ NOT anagrams — frequency maps differ`;
    document.getElementById("anaInfo").innerHTML = `freq1: {${Object.entries(
      anaFreq1,
    )
      .map(([k, v]) => `${k}:${v}`)
      .join(", ")}}<br>freq2: {${Object.entries(anaFreq2)
      .map(([k, v]) => `${k}:${v}`)
      .join(", ")}}`;
    return;
  }
  const c1 = anaS1[anaIdx],
    c2 = anaS2[anaIdx];
  anaFreq1[c1] = (anaFreq1[c1] || 0) + 1;
  anaFreq2[c2] = (anaFreq2[c2] || 0) + 1;
  document.getElementById("anaStatus").innerHTML =
    `idx ${anaIdx}: count '${c1}' in s1 → <span>${anaFreq1[c1]}</span>, count '${c2}' in s2 → <span>${anaFreq2[c2]}</span>`;
  document.getElementById("anaInfo").innerHTML =
    `s1[${anaIdx}]='${c1}', s2[${anaIdx}]='${c2}'`;
  anaIdx++;
  renderAna();
}
anaReset();

/*  RUN-LENGTH ENCODING */
const rleStr = "AAABBBCCDDDDEE".split("");
let rleIdx = 0,
  rleGroups = [],
  rleCurChar = rleStr[0],
  rleCurCount = 1,
  rleDone = false;
function renderRLE() {
  const cls = rleStr.map((c, i) => {
    if (i < rleIdx) return "visited";
    if (i === rleIdx) return "active";
    return "def";
  });
  makeStrRow("rleRow", rleStr, cls);
}
function rleReset() {
  rleIdx = 0;
  rleGroups = [];
  rleCurChar = rleStr[0];
  rleCurCount = 1;
  rleDone = false;
  renderRLE();
  document.getElementById("rleStatus").textContent =
    "Scan left to right — group identical consecutive chars";
  document.getElementById("rleInfo").textContent = "";
}
function rleStep() {
  if (rleDone) {
    rleReset();
    return;
  }
  rleIdx++;
  if (rleIdx >= rleStr.length) {
    rleGroups.push({ ch: rleCurChar, cnt: rleCurCount });
    rleDone = true;
    const enc = rleGroups.map((g) => g.ch + g.cnt).join("");
    document.getElementById("rleStatus").innerHTML =
      `✅ Encoded: "<span>${enc}</span>" (${rleStr.length} → ${enc.length} chars, ${Math.round((1 - enc.length / rleStr.length) * 100)}% saved)`;
    document.getElementById("rleInfo").innerHTML =
      `Groups: ${rleGroups.map((g) => `${g.ch}×${g.cnt}`).join(" | ")}`;
    return;
  }
  const ch = rleStr[rleIdx];
  if (ch === rleCurChar) {
    rleCurCount++;
    document.getElementById("rleStatus").innerHTML =
      `str[${rleIdx}]='<span>${ch}</span>' = current '${rleCurChar}' → count = <span>${rleCurCount}</span>`;
  } else {
    rleGroups.push({ ch: rleCurChar, cnt: rleCurCount });
    document.getElementById("rleStatus").innerHTML =
      `New char '${ch}' → flush '${rleCurChar}'×${rleCurCount}, start new group '<span>${ch}</span>'`;
    rleCurChar = ch;
    rleCurCount = 1;
  }
  document.getElementById("rleInfo").innerHTML =
    `Encoded so far: <b>${rleGroups.map((g) => g.ch + g.cnt).join("")}</b>${rleCurChar ? "[" + rleCurChar + "…]" : ""}`;
  renderRLE();
}
rleReset();

/* 6 LCS DP */
const lcsS1 = "ABCBDAB",
  lcsS2 = "BDCAB";
const lcsR = lcsS1.length + 1,
  lcsC = lcsS2.length + 1;
let lcsTable = Array.from({ length: lcsR }, () => Array(lcsC).fill(0));
let lcsDpR = 1,
  lcsDpC = 1,
  lcsDone = false;
function renderLCS(ar = -1, ac = -1) {
  const el = document.getElementById("lcsGrid");
  el.innerHTML = "";
  const mkCell = (txt, cls) => {
    const d = document.createElement("div");
    d.className = "scell-s " + cls;
    d.textContent = txt;
    d.style.minWidth = "22px";
    d.style.fontSize = ".55rem";
    return d;
  };
  // header
  const hr = document.createElement("div");
  hr.style.display = "flex";
  hr.style.gap = "2px";
  hr.appendChild(mkCell("", "def"));
  hr.appendChild(mkCell("ε", "highlight"));
  for (const ch of lcsS2) hr.appendChild(mkCell(ch, "highlight"));
  el.appendChild(hr);
  for (let r = 0; r < lcsR; r++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "2px";
    row.appendChild(mkCell(r === 0 ? "ε" : lcsS1[r - 1], "highlight"));
    for (let c = 0; c < lcsC; c++) {
      const isActive = r === ar && c === ac;
      const isFilled = r === 0 || c === 0 || r < ar || (r === ar && c < ac);
      const cls = isActive ? "active" : isFilled ? "visited" : "def";
      row.appendChild(mkCell(lcsTable[r][c], cls));
    }
    el.appendChild(row);
  }
}
function lcsReset() {
  lcsTable = Array.from({ length: lcsR }, () => Array(lcsC).fill(0));
  lcsDpR = 1;
  lcsDpC = 1;
  lcsDone = false;
  renderLCS();
  document.getElementById("lcsStatus").textContent =
    "LCS DP: if chars match → diagonal+1, else max(up, left)";
  document.getElementById("lcsInfo").textContent = "";
}
function lcsStep() {
  if (lcsDone) {
    lcsReset();
    return;
  }
  if (lcsDpR >= lcsR) {
    renderLCS(-1, -1);
    document.getElementById("lcsStatus").innerHTML =
      `✅ LCS length = <span>${lcsTable[lcsR - 1][lcsC - 1]}</span> — "BCAB" is the LCS of "${lcsS1}" and "${lcsS2}"`;
    lcsDone = true;
    return;
  }
  const r = lcsDpR,
    c = lcsDpC;
  if (lcsS1[r - 1] === lcsS2[c - 1]) {
    lcsTable[r][c] = lcsTable[r - 1][c - 1] + 1;
    document.getElementById("lcsStatus").innerHTML =
      `dp[${r}][${c}]: '<span>${lcsS1[r - 1]}</span>'='<span>${lcsS2[c - 1]}</span>' match → diag+1 = <span>${lcsTable[r][c]}</span>`;
  } else {
    lcsTable[r][c] = Math.max(lcsTable[r - 1][c], lcsTable[r][c - 1]);
    document.getElementById("lcsStatus").innerHTML =
      `dp[${r}][${c}]: '${lcsS1[r - 1]}'≠'${lcsS2[c - 1]}' → max(${lcsTable[r - 1][c]},${lcsTable[r][c - 1]}) = <span>${lcsTable[r][c]}</span>`;
  }
  document.getElementById("lcsInfo").innerHTML =
    `Row <b>${r}</b>="${lcsS1[r - 1]}", Col <b>${c}</b>="${lcsS2[c - 1]}"`;
  renderLCS(r, c);
  lcsDpC++;
  if (lcsDpC >= lcsC) {
    lcsDpC = 1;
    lcsDpR++;
  }
}
lcsReset();
