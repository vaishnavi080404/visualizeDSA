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
  if (window.syncThemeToServer) window.syncThemeToServer(t);
}
document.getElementById("themeToggle").addEventListener("click", () => {
  const cur = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(cur) + 1) % 3]);
});
applyTheme(localStorage.getItem("dsa-theme") || "dark");

// hamburger
document.getElementById("hamburger").onclick = () =>
  document.getElementById("mobileMenu").classList.toggle("open");

//1. MUSIC PLAYLIST — Circular LL

let songs = ["Blinding Lights", "Levitating", "Shivers", "As It Was"];
let songIdx = 0;
let songCounter = 5;

function renderPlaylist() {
  const el = document.getElementById("playlistTracks");
  el.innerHTML = "";
  songs.forEach((s, i) => {
    const div = document.createElement("div");
    div.className =
      "playlist-track" +
      (i === songIdx ? " playing" : i < songIdx ? " played" : "");
    div.innerHTML = `
      <span class="track-num">${i + 1}</span>
      <span class="track-dot"></span>
      <span style="flex:1">${s}</span>
      <span class="track-arrow">${i === songIdx ? "▶ playing" : i === (songIdx + 1) % songs.length ? "· next" : ""}</span>`;
    el.appendChild(div);
  });
  document.getElementById("playlist-now").textContent = songs[songIdx];
  document.getElementById("playlist-count").textContent = songs.length;
}
function playNext() {
  songIdx = (songIdx + 1) % songs.length; // circular: tail.next = head
  renderPlaylist();
}
function playPrev() {
  songIdx = (songIdx - 1 + songs.length) % songs.length;
  renderPlaylist();
}
function addSong() {
  songs.push("Track " + songCounter++);
  renderPlaylist();
}
function removeSong() {
  if (songs.length <= 1) return;
  songs.splice(songIdx, 1);
  songIdx = songIdx % songs.length;
  renderPlaylist();
}
renderPlaylist();

//2. BROWSER HISTORY — Doubly LL

// Doubly LL simulated as array with curr pointer
let hist2 = ["google.com"];
let histIdx2 = 0;

function renderHistory2() {
  const el = document.getElementById("historyNodes");
  el.innerHTML = "";
  // show at most 5 nodes around current
  const start = Math.max(0, histIdx2 - 2);
  const end = Math.min(hist2.length - 1, histIdx2 + 2);
  for (let i = start; i <= end; i++) {
    const div = document.createElement("div");
    div.className = "history-node" + (i === histIdx2 ? " curr" : "");
    const hasPrev = i > 0;
    const hasNext = i < hist2.length - 1;
    div.innerHTML = `
      <span class="back-arrow">${hasPrev ? "←" : "×"}</span>
      <span style="flex:1">${hist2[i]}</span>
      <span class="arrow">${hasNext ? "→" : "NULL"}</span>
      ${i === histIdx2 ? '<span style="font-size:.65rem;color:var(--primary-cyan);margin-left:4px">curr</span>' : ""}`;
    el.appendChild(div);
  }
  document.getElementById("browserUrl2").textContent = hist2[histIdx2];
  document.getElementById("hist-prev").textContent =
    histIdx2 > 0 ? hist2[histIdx2 - 1] : "NULL";
  document.getElementById("hist-next").textContent =
    histIdx2 < hist2.length - 1 ? hist2[histIdx2 + 1] : "NULL";
  document.getElementById("btn-back2").disabled = histIdx2 <= 0;
  document.getElementById("btn-fwd2").disabled = histIdx2 >= hist2.length - 1;
}
function browserVisit2(url) {
  // remove forward history
  hist2 = hist2.slice(0, histIdx2 + 1);
  hist2.push(url);
  histIdx2++;
  renderHistory2();
}
function browserBack2() {
  if (histIdx2 > 0) {
    histIdx2--;
    renderHistory2();
  }
}
function browserFwd2() {
  if (histIdx2 < hist2.length - 1) {
    histIdx2++;
    renderHistory2();
  }
}
renderHistory2();

//3. IMAGE CAROUSEL — Circular LL

const carouselItems = [
  { emoji: "🏔️", title: "Mountains", caption: "Majestic peaks" },
  { emoji: "🌊", title: "Ocean", caption: "Rolling waves" },
  { emoji: "🌇", title: "City", caption: "Urban skyline" },
  { emoji: "🌸", title: "Sakura", caption: "Cherry blossoms" },
  { emoji: "🏜️", title: "Desert", caption: "Golden dunes" },
];
let carIdx = 0;

function renderCarousel() {
  const item = carouselItems[carIdx];
  document.getElementById("carouselEmoji").textContent = item.emoji;
  document.getElementById("carouselTitle").textContent = item.title;
  // show circular pointer info
  const nextIdx = (carIdx + 1) % carouselItems.length;
  document.getElementById("carouselCaption").textContent =
    `node[${carIdx}] → node[${nextIdx}]${nextIdx === 0 ? " (HEAD)" : ""}`;

  // dots
  const dotsEl = document.getElementById("carouselDots");
  dotsEl.innerHTML = "";
  carouselItems.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "cdot" + (i === carIdx ? " active" : "");
    d.onclick = () => {
      carIdx = i;
      renderCarousel();
    };
    dotsEl.appendChild(d);
  });

  // node chain
  const chainEl = document.getElementById("carouselChain");
  chainEl.innerHTML = "";
  carouselItems.forEach((it, i) => {
    const n = document.createElement("div");
    n.className = "chain-node" + (i === carIdx ? " cur" : "");
    n.textContent = it.emoji;
    chainEl.appendChild(n);
    if (i < carouselItems.length - 1) {
      const a = document.createElement("div");
      a.className = "chain-arrow";
      a.textContent = "→";
      chainEl.appendChild(a);
    }
  });
  // circular arrow back to head
  const loopEl = document.createElement("div");
  loopEl.className = "chain-loop";
  loopEl.textContent = "↩ HEAD";
  chainEl.appendChild(loopEl);
}
function carouselNext() {
  carIdx = (carIdx + 1) % carouselItems.length;
  renderCarousel();
}
function carouselPrev() {
  carIdx = (carIdx - 1 + carouselItems.length) % carouselItems.length;
  renderCarousel();
}
renderCarousel();

//4. LRU CACHE — Doubly LL

// Doubly LL: head = most recent, tail = evict next
const LRU_CAP = 4;
let lruList = []; // [{key, val}] — index 0 = head (most recent)

function renderLRU() {
  const el = document.getElementById("lruList");
  el.innerHTML = "";
  lruList.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "lru-item" + (i === 0 ? " most-recent" : "");
    let tag = "";
    if (i === 0) tag = '<span class="lru-tag head-tag">HEAD · MRU</span>';
    else if (i === lruList.length - 1)
      tag = '<span class="lru-tag tail-tag">TAIL · LRU</span>';
    else if (i === lruList.length - 2)
      tag = '<span class="lru-tag evict-soon">evict soon</span>';
    div.innerHTML = `
      <span>${i === 0 ? "⬆" : "↓"}</span>
      <span style="flex:1">${item.key}</span>
      <span style="color:var(--primary-orange);margin-right:.5rem">${item.val}</span>
      ${tag}`;
    el.appendChild(div);
  });
  document.getElementById("lru-size").textContent = lruList.length;
}
function lruGet() {
  const key = document.getElementById("lru-key").value.trim();
  if (!key) return;
  const idx = lruList.findIndex((x) => x.key === key);
  if (idx === -1) {
    document.getElementById("lru-action").textContent =
      `MISS: "${key}" not found`;
    document.getElementById("lru-action").style.color = "var(--primary-red)";
  } else {
    const item = lruList.splice(idx, 1)[0];
    lruList.unshift(item); // move to head
    document.getElementById("lru-action").textContent =
      `HIT: "${key}" moved to head`;
    document.getElementById("lru-action").style.color = "var(--primary-green)";
  }
  renderLRU();
  document.getElementById("lru-key").value = "";
}
function lruPut() {
  const key = document.getElementById("lru-key").value.trim();
  if (!key) return;
  const val = Math.floor(Math.random() * 900) + 100;
  const idx = lruList.findIndex((x) => x.key === key);
  if (idx !== -1) lruList.splice(idx, 1);
  lruList.unshift({ key, val });
  if (lruList.length > LRU_CAP) {
    const evicted = lruList.pop();
    document.getElementById("lru-action").textContent =
      `PUT "${key}" — evicted "${evicted.key}"`;
    document.getElementById("lru-action").style.color = "var(--primary-orange)";
  } else {
    document.getElementById("lru-action").textContent = `PUT "${key}" at head`;
    document.getElementById("lru-action").style.color = "var(--primary-green)";
  }
  renderLRU();
  document.getElementById("lru-key").value = "";
}
// seed cache
["userA", "userB", "userC"].forEach((k, i) =>
  lruList.push({ key: k, val: 100 + i * 50 }),
);
renderLRU();

//5. PROCESS SCHEDULER — Singly LL

let tasks = []; // head is tasks[0]

function renderTasks() {
  const el = document.getElementById("taskList");
  el.innerHTML = "";
  tasks.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "task-item" + (i === 0 ? " head-task" : "");
    div.innerHTML = `
      <span>${i === 0 ? "▶" : " "}</span>
      <span style="flex:1">${t}</span>
      <span class="next-ptr">${i < tasks.length - 1 ? "next→" : "NULL"}</span>`;
    el.appendChild(div);
  });
  const headPtr = document.getElementById("task-head-ptr");
  headPtr.textContent = tasks.length ? `HEAD → ${tasks[0]}` : "HEAD → (empty)";
  document.getElementById("task-count").textContent = tasks.length;
  document.getElementById("task-head-val").textContent = tasks.length
    ? tasks[0]
    : "—";
}
function addTask(name) {
  if (tasks.length >= 5) return;
  tasks.push(name);
  renderTasks();
}
function dispatchTask() {
  if (!tasks.length) return;
  tasks.shift(); // O(1) — just move head pointer
  renderTasks();
}
renderTasks();

//6. TRAIN ROUTE — Singly LL

let stops = ["Central", "Majestic"];
let selectedStop = null;
let tracing = false;

function renderRoute() {
  const el = document.getElementById("trainRoute");
  el.innerHTML = "";
  if (!stops.length) {
    el.innerHTML =
      '<span style="color:var(--text-secondary);font-size:.8rem">No stops — add one above</span>';
    document.getElementById("train-count").textContent = 0;
    return;
  }
  stops.forEach((s, i) => {
    const wrap = document.createElement("div");
    wrap.className = "station-wrap";

    const station = document.createElement("div");
    const isOrigin = i === 0;
    station.className = "station " + (isOrigin ? "origin" : "stop");
    if (s === selectedStop) station.classList.add("selected");
    station.textContent = s;
    station.onclick = () => {
      selectedStop = selectedStop === s ? null : s;
      document.getElementById("train-status").textContent = selectedStop
        ? `Selected: ${selectedStop} (node[${stops.indexOf(s)}])`
        : "Click a station to highlight it";
      renderRoute();
    };
    wrap.appendChild(station);

    if (i < stops.length - 1) {
      const line = document.createElement("div");
      line.className = "track-line";
      wrap.appendChild(line);
      const arr = document.createElement("span");
      arr.style.cssText = "font-size:.75rem;color:var(--text-secondary);";
      arr.textContent = "→";
      wrap.appendChild(arr);
    }
    el.appendChild(wrap);
  });
  document.getElementById("train-count").textContent = stops.length;
}
function addStop() {
  const input = document.getElementById("train-stop-input");
  const name = input.value.trim();
  if (!name || stops.length >= 7) return;
  stops.push(name);
  input.value = "";
  renderRoute();
}
function removeLastStop() {
  if (stops.length <= 1) return;
  stops.pop();
  if (selectedStop && !stops.includes(selectedStop)) selectedStop = null;
  renderRoute();
}
async function traceRoute() {
  if (tracing) return;
  tracing = true;
  for (let i = 0; i < stops.length; i++) {
    selectedStop = stops[i];
    document.getElementById("train-status").textContent =
      `Traversing → ${stops[i]} (step ${i + 1}/${stops.length})`;
    renderRoute();
    await new Promise((r) => setTimeout(r, 600));
  }
  selectedStop = null;
  document.getElementById("train-status").textContent =
    `Route traced — ${stops.length} stops visited`;
  renderRoute();
  tracing = false;
}
function resetRoute() {
  stops = ["Central", "Majestic"];
  selectedStop = null;
  tracing = false;
  document.getElementById("train-status").textContent =
    "Click a station to highlight it";
  renderRoute();
}
document.getElementById("train-stop-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addStop();
});
document.getElementById("lru-key").addEventListener("keydown", (e) => {
  if (e.key === "Enter") lruPut();
});
renderRoute();
