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

let cArr = [64, 25, 12, 22, 11],
  cPass = 0;
function renderConcept(minIdx = -1, sortedUpto = -1, swapPair = []) {
  const el = document.getElementById("conceptBars");
  el.innerHTML = "";
  const mx = Math.max(...cArr);
  cArr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "bar";
    b.style.height = Math.max(18, Math.round((v / mx) * 85)) + "px";
    if (swapPair.includes(i)) b.classList.add("swapping");
    else if (i <= sortedUpto) b.classList.add("sorted");
    else if (i === minIdx) b.classList.add("minimum");
    else b.classList.add("def");
    b.textContent = v;
    el.appendChild(b);
  });
}
function conceptStep() {
  if (cPass >= cArr.length - 1) {
    renderConcept(-1, cArr.length - 1);
    document.getElementById("conceptStatus").innerHTML =
      "✅ Fully sorted! Selection sort complete.";
    return;
  }
  let mi = cPass;
  for (let j = cPass + 1; j < cArr.length; j++) if (cArr[j] < cArr[mi]) mi = j;
  renderConcept(mi, cPass - 1, [cPass, mi]);
  const ov = cArr[cPass];
  [cArr[cPass], cArr[mi]] = [cArr[mi], cArr[cPass]];
  document.getElementById("conceptStatus").innerHTML =
    `Pass ${cPass + 1}: min=<strong style="color:var(--primary-orange)">${cArr[cPass]}</strong> at [${mi}] → swapped with [${cPass}]=${ov}`;
  cPass++;
  setTimeout(() => renderConcept(-1, cPass - 1), 350);
}
function conceptReset() {
  cArr = [64, 25, 12, 22, 11];
  cPass = 0;
  renderConcept();
  document.getElementById("conceptStatus").textContent =
    'Click "Next Pass" to step through selection sort';
}
renderConcept();

/* 1. FLASH */
let fArr = [7, 2, 5, 1, 8, 4, 3, 6],
  fOrig = [...fArr],
  fTimer = null,
  fW = 0,
  fC = 0;
function buildFlash(arr, mi = -1, su = -1) {
  const el = document.getElementById("flashBars");
  el.innerHTML = "";
  const mx = Math.max(...arr);
  arr.forEach((v, i) => {
    const b = document.createElement("div");
    b.className = "mbar";
    b.style.height = Math.max(12, Math.round((v / mx) * 52)) + "px";
    if (i <= su) b.classList.add("done");
    else if (i === mi) b.classList.add("min");
    else b.classList.add("def");
    b.textContent = v;
    el.appendChild(b);
  });
}
function flashSort() {
  clearTimeout(fTimer);
  fArr = [...fOrig];
  fW = 0;
  fC = 0;
  buildFlash(fArr);
  document.getElementById("flashWrites").textContent = 0;
  document.getElementById("flashComps").textContent = 0;
  document.getElementById("flashStatus").textContent = "Sorting...";
  let i = 0;
  const pass = () => {
    if (i >= fArr.length - 1) {
      buildFlash(fArr, -1, fArr.length - 1);
      document.getElementById("flashStatus").innerHTML =
        `✅ Done! Only <span>${fW}</span> writes — bubble sort would need up to ${(fArr.length * (fArr.length - 1)) / 2}`;
      return;
    }
    let mi = i;
    for (let j = i + 1; j < fArr.length; j++) {
      fC++;
      if (fArr[j] < fArr[mi]) mi = j;
    }
    buildFlash(fArr, mi, i - 1);
    document.getElementById("flashStatus").innerHTML =
      `Pass ${i + 1}: min=${fArr[mi]} at [${mi}]`;
    if (mi !== i) {
      [fArr[i], fArr[mi]] = [fArr[mi], fArr[i]];
      fW++;
    }
    document.getElementById("flashWrites").textContent = fW;
    document.getElementById("flashComps").textContent = fC;
    i++;
    fTimer = setTimeout(pass, 600);
  };
  fTimer = setTimeout(pass, 300);
}
function flashReset() {
  clearTimeout(fTimer);
  fArr = [...fOrig];
  fW = 0;
  fC = 0;
  buildFlash(fArr);
  document.getElementById("flashStatus").textContent =
    "Press Sort to see write count";
  document.getElementById("flashWrites").textContent = 0;
  document.getElementById("flashComps").textContent = 0;
}
buildFlash(fArr);

/* 2. SEEDING */
const teams = [
  { name: "Team Gamma", pts: 71 },
  { name: "Team Alpha", pts: 95 },
  { name: "Team Delta", pts: 68 },
  { name: "Team Beta", pts: 88 },
  { name: "Team Omega", pts: 55 },
  { name: "Team Zeta", pts: 82 },
];
let sArr = [...teams],
  sPass = 0;
function renderSeeds() {
  const el = document.getElementById("seedList");
  el.innerHTML = "";
  sArr.forEach((t, i) => {
    const d = document.createElement("div");
    d.className =
      "list-item " + (i < sPass ? "done" : i === sPass ? "active" : "idle");
    d.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:.7rem;min-width:24px;color:${i < sPass ? "var(--primary-green)" : "var(--text-secondary)"}">${i < sPass ? "#" + (i + 1) : "—"}</span><span style="flex:1;font-weight:600">${t.name}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--primary-orange)">${t.pts}pts</span>`;
    el.appendChild(d);
  });
}
function seedNext() {
  if (sPass >= sArr.length) {
    document.getElementById("seedInfo").textContent = "All seeded!";
    return;
  }
  let mi = sPass;
  for (let j = sPass + 1; j < sArr.length; j++)
    if (sArr[j].pts > sArr[mi].pts) mi = j;
  [sArr[sPass], sArr[mi]] = [sArr[mi], sArr[sPass]];
  sPass++;
  renderSeeds();
  document.getElementById("seedInfo").innerHTML =
    `Assigned Seed <b>#${sPass}</b> → <b>${sArr[sPass - 1].name}</b> (${sArr[sPass - 1].pts}pts)`;
}
function seedReset() {
  sArr = [...teams];
  sPass = 0;
  renderSeeds();
  document.getElementById("seedInfo").textContent = "";
}
renderSeeds();

/* 3. PLAYLIST */
const songs = [
  { t: "Blinding Lights", p: 847 },
  { t: "Shape of You", p: 1203 },
  { t: "Levitating", p: 412 },
  { t: "Bad Guy", p: 683 },
  { t: "Watermelon Sugar", p: 291 },
  { t: "Stay", p: 539 },
];
let plArr = [...songs],
  plPass = 0;
function renderPlaylist() {
  const el = document.getElementById("playlistList");
  el.innerHTML = "";
  plArr.forEach((s, i) => {
    const d = document.createElement("div");
    d.className =
      "list-item " + (i < plPass ? "done" : i === plPass ? "active" : "idle");
    d.innerHTML = `<span style="font-size:.8rem">🎵</span><span style="flex:1;font-size:.78rem;font-weight:600">${s.t}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--primary-purple)">${s.p} plays</span>`;
    el.appendChild(d);
  });
}
function playlistStep() {
  if (plPass >= plArr.length - 1) {
    document.getElementById("playlistInfo").textContent =
      "✅ Playlist sorted by plays!";
    return;
  }
  let mi = plPass;
  for (let j = plPass + 1; j < plArr.length; j++)
    if (plArr[j].p > plArr[mi].p) mi = j;
  [plArr[plPass], plArr[mi]] = [plArr[mi], plArr[plPass]];
  plPass++;
  renderPlaylist();
  document.getElementById("playlistInfo").innerHTML =
    `Pass ${plPass}: Placed "<b>${plArr[plPass - 1].t}</b>" (${plArr[plPass - 1].p} plays)`;
}
function playlistReset() {
  plArr = [...songs];
  plPass = 0;
  renderPlaylist();
  document.getElementById("playlistInfo").textContent = "";
}
renderPlaylist();

/* 4. CARDS */
let cardArr = [8, 3, 1, 6, 4, 9, 2, 7],
  cardOrig = [...cardArr],
  cardPass = 0;
function renderCards() {
  const el = document.getElementById("cardRow");
  el.innerHTML = "";
  cardArr.forEach((v, i) => {
    const c = document.createElement("div");
    c.style.cssText = `width:38px;height:48px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:.9rem;font-weight:700;border:2px solid;transition:all .3s;`;
    if (i < cardPass) {
      c.style.background = "rgba(16,185,129,.15)";
      c.style.borderColor = "var(--primary-green)";
      c.style.color = "var(--primary-green)";
    } else {
      c.style.background = "rgba(255,255,255,.06)";
      c.style.borderColor = "rgba(255,255,255,.15)";
      c.style.color = "rgba(255,255,255,.8)";
    }
    c.textContent = v;
    el.appendChild(c);
  });
}
function cardStep() {
  if (cardPass >= cardArr.length - 1) {
    document.getElementById("cardStatus").innerHTML = "✅ All cards sorted!";
    renderCards();
    return;
  }
  let mi = cardPass;
  for (let j = cardPass + 1; j < cardArr.length; j++)
    if (cardArr[j] < cardArr[mi]) mi = j;
  const mv = cardArr[mi];
  [cardArr[cardPass], cardArr[mi]] = [cardArr[mi], cardArr[cardPass]];
  cardPass++;
  renderCards();
  document.getElementById("cardStatus").innerHTML =
    `Picked <span style="color:var(--primary-rose)">${mv}</span> → placed in position ${cardPass}`;
}
function cardReset() {
  cardArr = [...cardOrig];
  cardPass = 0;
  renderCards();
  document.getElementById("cardStatus").textContent =
    "Click to find and place the minimum card";
}
renderCards();

/* 5. TASKS */
const tasks = [
  { n: "Fix login bug", u: 9 },
  { n: "Update docs", u: 3 },
  { n: "Deploy hotfix", u: 10 },
  { n: "Code review", u: 5 },
  { n: "Write tests", u: 7 },
  { n: "Team standup", u: 6 },
];
let tArr = [...tasks],
  tPass = 0;
function renderTasks() {
  const el = document.getElementById("taskList");
  el.innerHTML = "";
  tArr.forEach((t, i) => {
    const d = document.createElement("div");
    d.className =
      "list-item " + (i < tPass ? "done" : i === tPass ? "active" : "idle");
    const badge =
      i < tPass
        ? `<span style="font-size:.62rem;padding:.1rem .3rem;border-radius:3px;background:rgba(16,185,129,.15);color:var(--primary-green);font-weight:700">P${i + 1}</span>`
        : `<span style="font-size:.62rem;padding:.1rem .3rem;border-radius:3px;background:rgba(255,255,255,.05);color:var(--text-secondary)">—</span>`;
    d.innerHTML = `${badge}<span style="flex:1;font-size:.78rem;font-weight:600;margin-left:.3rem">${t.n}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--primary-orange)">u:${t.u}</span>`;
    el.appendChild(d);
  });
}
function taskStep() {
  if (tPass >= tArr.length) {
    document.getElementById("taskInfo").textContent =
      "✅ All priorities assigned!";
    return;
  }
  let mi = tPass;
  for (let j = tPass + 1; j < tArr.length; j++)
    if (tArr[j].u > tArr[mi].u) mi = j;
  [tArr[tPass], tArr[mi]] = [tArr[mi], tArr[tPass]];
  tPass++;
  renderTasks();
  document.getElementById("taskInfo").innerHTML =
    `<b>P${tPass}</b> → "<b>${tArr[tPass - 1].n}</b>" (urgency ${tArr[tPass - 1].u})`;
}
function taskReset() {
  tArr = [...tasks];
  tPass = 0;
  renderTasks();
  document.getElementById("taskInfo").textContent = "";
}
renderTasks();

/* 6. RANKING */
const students = [
  { n: "Alice", s: 88 },
  { n: "Bob", s: 72 },
  { n: "Carol", s: 95 },
  { n: "Dave", s: 61 },
  { n: "Eve", s: 83 },
  { n: "Frank", s: 77 },
];
let rArr = [...students],
  rPass = 0;
function buildRankBars() {
  const el = document.getElementById("rankBars");
  el.innerHTML = "";
  const mx = Math.max(...rArr.map((s) => s.s));
  rArr.forEach((s, i) => {
    const b = document.createElement("div");
    b.className = "mbar";
    b.style.height = Math.max(12, Math.round((s.s / mx) * 52)) + "px";
    b.classList.add(i < rPass ? "done" : "def");
    b.textContent = s.s;
    el.appendChild(b);
  });
}
function renderRankList() {
  const el = document.getElementById("rankList");
  el.innerHTML = "";
  rArr.slice(0, rPass).forEach((s, i) => {
    const d = document.createElement("div");
    d.className = "list-item done";
    d.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--primary-green);min-width:20px">#${i + 1}</span><span style="flex:1;font-size:.78rem;font-weight:600">${s.n}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--primary-orange)">${s.s}</span>`;
    el.appendChild(d);
  });
}
function rankStep() {
  if (rPass >= rArr.length) {
    document.getElementById("rankInfo").textContent = "✅ All students ranked!";
    return;
  }
  let mi = rPass;
  for (let j = rPass + 1; j < rArr.length; j++)
    if (rArr[j].s > rArr[mi].s) mi = j;
  [rArr[rPass], rArr[mi]] = [rArr[mi], rArr[rPass]];
  rPass++;
  buildRankBars();
  renderRankList();
  document.getElementById("rankInfo").innerHTML =
    `Rank <b>#${rPass}</b> → <b>${rArr[rPass - 1].n}</b> scored <b>${rArr[rPass - 1].s}</b>`;
}
function rankReset() {
  rArr = [...students];
  rPass = 0;
  buildRankBars();
  renderRankList();
  document.getElementById("rankInfo").textContent = "";
}
buildRankBars();
renderRankList();
