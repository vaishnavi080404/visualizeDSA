const TABLE_SIZE = 7;
let currentImpl = "hashmap";
let mainTable = Array.from({ length: TABLE_SIZE }, () => []);
let codeEditor;
let currentLang = "cpp";
let currentInputResolver = null;

/*   HASH FUNCTION   */
function hashKey(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++)
    h = (h * 31 + key.charCodeAt(i)) % TABLE_SIZE;
  return h;
}

/*   THEME   */
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

function getCMTheme(t) {
  return t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean";
}

function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIcon").innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
  if (window.syncThemeToServer) window.syncThemeToServer(t);
  if (codeEditor) codeEditor.setOption("theme", getCMTheme(t));
}

document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const cur = document.body.getAttribute("data-theme") || "dark";
  applyTheme(themes[(themes.indexOf(cur) + 1) % 3]);
};

/*   HELPERS   */
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function addLog(logId, text, cls = "log-info") {
  const log = document.getElementById(logId);
  const e = document.createElement("div");
  e.className = "log-entry " + cls;
  e.textContent = "> " + text;
  log.appendChild(e);
  log.scrollTop = log.scrollHeight;
}

function showMsg(text, type) {
  const el = document.getElementById("msg_show");
  el.style.display = "block";
  el.className = "alert-" + type;
  el.innerHTML = text;
}

function highlightStep(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`.pseudo-step[data-step="${step}"]`);
  if (el) el.classList.add("active");
}

/*   BUILD TABLE HTML   */
function buildTableEl(
  containerId,
  tableData,
  chipClass,
  highlightIdx = -1,
  mode = "",
) {
  const cont = document.getElementById(containerId);
  cont.innerHTML = "";
  for (let i = 0; i < TABLE_SIZE; i++) {
    const row = document.createElement("div");
    row.className = "ht-row";

    const idx = document.createElement("div");
    idx.className = "ht-idx";
    idx.textContent = i;
    row.appendChild(idx);

    const bucket = document.createElement("div");
    let bucketClass = "ht-bucket";
    if (i === highlightIdx) {
      if (mode === "found") bucketClass += " ht-found";
      else if (mode === "del") bucketClass += " ht-delete";
      else if (mode === "col") bucketClass += " ht-collide";
      else bucketClass += " ht-active";
    }
    bucket.className = bucketClass;

    if (!tableData[i] || tableData[i].length === 0) {
      const emp = document.createElement("span");
      emp.className = "ht-empty";
      emp.textContent = "—";
      bucket.appendChild(emp);
    } else {
      tableData[i].forEach((item, idx2) => {
        if (idx2 > 0) {
          const ar = document.createElement("span");
          ar.className = "arrow-chain";
          ar.textContent = "→";
          bucket.appendChild(ar);
        }
        const chip = document.createElement("span");
        chip.className = "ht-chip " + chipClass;
        chip.textContent = item;
        bucket.appendChild(chip);
      });
    }
    row.appendChild(bucket);
    cont.appendChild(row);
  }
}

                          
   //MAIN VISUALIZER

const pseudoTexts = {
  hashmap: {
    insert: "idx = hash(key) mod 7\ntable[idx].add(key→val)",
    search: "idx = hash(key) mod 7\nreturn table[idx].find(key)",
    delete: "idx = hash(key) mod 7\ntable[idx].remove(key)",
    contains: "idx = hash(key) mod 7\nreturn key in table[idx]",
    size: "return total entries stored",
  },
  hashset: {
    insert: "idx = hash(key) mod 7\ntable[idx].add(key)",
    search: "idx = hash(key) mod 7\nreturn key in table[idx]",
    delete: "idx = hash(key) mod 7\ntable[idx].remove(key)",
    contains: "idx = hash(key) mod 7\nreturn key in table[idx]",
    size: "return total keys stored",
  },
};

function switchImpl(type) {
  currentImpl = type;
  mainTable = Array.from({ length: TABLE_SIZE }, () => []);
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  const isMap = type === "hashmap";
  document.getElementById("visualizer-title").textContent =
    `Hash ${isMap ? "Map" : "Set"} Visualizer — Chaining (size = 7)`;
  document.getElementById("valInput").style.display = isMap ? "" : "none";
  const pt = pseudoTexts[type];
  document.getElementById("pseudo-insert-text").textContent = pt.insert;
  document.getElementById("pseudo-search-text").textContent = pt.search;
  document.getElementById("pseudo-delete-text").textContent = pt.delete;
  document.getElementById("pseudo-contains-text").textContent = pt.contains;
  document.getElementById("pseudo-size-text").textContent = pt.size;
  renderMain();

  // update editor if ready
  if (codeEditor) {
    codeEditor.setValue(codeTemplates[type][currentLang]);
    setTimeout(() => codeEditor.refresh(), 50);
  }
}

function renderMain(highlightIdx = -1, mode = "") {
  const chipClass = currentImpl === "hashmap" ? "chip-map" : "chip-set";
  buildTableEl("mainHashTable", mainTable, chipClass, highlightIdx, mode);
}

function mainInsert() {
  const key = document.getElementById("keyInput").value.trim();
  const val = document.getElementById("valInput").value.trim();
  if (!key) {
    showMsg("Enter a key first!", "warn");
    return;
  }
  highlightStep("insert");
  const idx = hashKey(key);
  const entry =
    currentImpl === "hashmap" ? (val ? `${key}→${val}` : `${key}→?`) : key;
  const exists = mainTable[idx].some((e) => e.split("→")[0] === key);
  if (exists) {
    showMsg(`⚠ Key "${key}" already exists at index ${idx}`, "warn");
    return;
  }
  mainTable[idx].push(entry);
  renderMain(idx);
  showMsg(`✓ Inserted "${entry}" at index ${idx}`, "success");
  document.getElementById("keyInput").value = "";
  document.getElementById("valInput").value = "";
}

function mainSearch() {
  const key = document.getElementById("keyInput").value.trim();
  if (!key) {
    showMsg("Enter a key to search!", "warn");
    return;
  }
  highlightStep("search");
  const idx = hashKey(key);
  const found = mainTable[idx].find((e) => e.split("→")[0] === key);
  if (found) {
    renderMain(idx, "found");
    showMsg(`✓ Found "${found}" at index ${idx}`, "success");
  } else {
    renderMain(idx);
    showMsg(`✗ Key "${key}" not found (checked index ${idx})`, "danger");
  }
}

function mainDelete() {
  const key = document.getElementById("keyInput").value.trim();
  if (!key) {
    showMsg("Enter a key to delete!", "warn");
    return;
  }
  highlightStep("delete");
  const idx = hashKey(key);
  const before = mainTable[idx].length;
  mainTable[idx] = mainTable[idx].filter((e) => e.split("→")[0] !== key);
  if (mainTable[idx].length < before) {
    renderMain(idx, "del");
    showMsg(`🗑 Deleted "${key}" from index ${idx}`, "danger");
  } else {
    renderMain(idx);
    showMsg(`✗ Key "${key}" not found`, "danger");
  }
}

function mainContains() {
  const key = document.getElementById("keyInput").value.trim();
  if (!key) {
    showMsg("Enter a key!", "warn");
    return;
  }
  highlightStep("contains");
  const idx = hashKey(key);
  const has = mainTable[idx].some((e) => e.split("→")[0] === key);
  renderMain(idx, has ? "found" : "");
  showMsg(
    has ? `✓ Contains "${key}" → TRUE` : `✗ Contains "${key}" → FALSE`,
    has ? "success" : "info",
  );
}

function mainSize() {
  highlightStep("size");
  const total = mainTable.reduce((s, b) => s + b.length, 0);
  renderMain();
  showMsg(`📊 Size = ${total} entries`, "info");
}


   //SCENARIO TAB SWITCH
                            
const TAB_ACTIVE = {
  insert: "active-insert",
  search: "active-search",
  delete: "active-delete",
  collide: "active-collide",
  custom: "active-custom",
};

function switchScenario(name) {
  document
    .querySelectorAll(".scenario-tab")
    .forEach((t) => (t.className = "scenario-tab"));
  document.getElementById("stab-" + name).classList.add(TAB_ACTIVE[name]);
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}


   //INSERT SCENARIO
                           
const INS_ITEMS = [
  { k: "apple", v: "5" },
  { k: "banana", v: "3" },
  { k: "cherry", v: "8" },
  { k: "date", v: "2" },
  { k: "elderberry", v: "7" },
  { k: "fig", v: "1" },
];
let insState = [],
  insIdx = 0,
  insAutoTimer = null;

function initInsert() {
  insState = Array.from({ length: TABLE_SIZE }, () => []);
  insIdx = 0;
  clearTimeout(insAutoTimer);
  buildTableEl("ins-table", insState, "chip-map");
  const log = document.getElementById("log-insert");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  document.getElementById("ins-step-btn").disabled = false;
  document.getElementById("ins-auto-btn").disabled = false;
  addLog(
    "log-insert",
    `Table size = 7, hash = sum(charCode) mod 7`,
    "log-info",
  );
  addLog(
    "log-insert",
    `Ready to insert ${INS_ITEMS.length} entries`,
    "log-info",
  );
}

function insStep() {
  if (insIdx >= INS_ITEMS.length) {
    addLog("log-insert", "All entries inserted!", "log-result");
    return;
  }
  const { k, v } = INS_ITEMS[insIdx];
  const idx = hashKey(k);
  insState[idx].push(`${k}→${v}`);
  buildTableEl("ins-table", insState, "chip-map", idx);
  addLog("log-insert", `hash("${k}") = ${idx}`, "log-info");
  addLog(
    "log-insert",
    `insert("${k}"→${v}) at index ${idx}  ✓ O(1)`,
    "log-insert",
  );
  insIdx++;
  if (insIdx >= INS_ITEMS.length) {
    addLog(
      "log-insert",
      `All ${INS_ITEMS.length} entries inserted!`,
      "log-result",
    );
    document.getElementById("ins-step-btn").disabled = true;
    document.getElementById("ins-auto-btn").disabled = true;
    clearTimeout(insAutoTimer);
  }
}

function insAuto() {
  if (insIdx >= INS_ITEMS.length) return;
  document.getElementById("ins-auto-btn").disabled = true;
  function next() {
    if (insIdx >= INS_ITEMS.length) return;
    insStep();
    insAutoTimer = setTimeout(next, 900);
  }
  next();
}

function resetInsert() {
  clearTimeout(insAutoTimer);
  initInsert();
  addLog("log-insert", "↺ Reset", "log-info");
}

 //SEARCH SCENARIO
                       
const SRCH_DATA = [
  { k: "apple", v: "5" },
  { k: "banana", v: "3" },
  { k: "cherry", v: "8" },
  { k: "date", v: "2" },
  { k: "grape", v: "9" },
];
const SRCH_TARGET = "grape";
let srchState = [],
  srchPhase = 0,
  srchAutoTimer = null;

function initSearch() {
  srchState = Array.from({ length: TABLE_SIZE }, () => []);
  SRCH_DATA.forEach(({ k, v }) => srchState[hashKey(k)].push(`${k}→${v}`));
  srchPhase = 0;
  clearTimeout(srchAutoTimer);
  buildTableEl("srch-table", srchState, "chip-map");
  const log = document.getElementById("log-search");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  document.getElementById("srch-step-btn").disabled = false;
  document.getElementById("srch-auto-btn").disabled = false;
  addLog(
    "log-search",
    `Table pre-loaded with ${SRCH_DATA.length} entries`,
    "log-info",
  );
  addLog("log-search", `Searching for key: "${SRCH_TARGET}"`, "log-info");
}

function srchStep() {
  if (srchPhase === 0) {
    const idx = hashKey(SRCH_TARGET);
    addLog("log-search", `Step 1: hash("${SRCH_TARGET}") = ${idx}`, "log-info");
    addLog("log-search", `Go to bucket index ${idx}`, "log-search");
    buildTableEl("srch-table", srchState, "chip-map", idx);
    srchPhase = 1;
  } else if (srchPhase === 1) {
    const idx = hashKey(SRCH_TARGET);
    const found = srchState[idx].find((e) => e.split("→")[0] === SRCH_TARGET);
    if (found) {
      addLog(
        "log-search",
        `Step 2: Scan chain at [${idx}] → Found "${found}" ✓`,
        "log-insert",
      );
      addLog("log-search", `✓ Search complete — O(1)`, "log-result");
      buildTableEl("srch-table", srchState, "chip-map", idx, "found");
    } else {
      addLog(
        "log-search",
        `Step 2: Key not in bucket [${idx}] ✗`,
        "log-delete",
      );
      addLog("log-search", `Result: NOT FOUND`, "log-result");
    }
    srchPhase = 2;
    document.getElementById("srch-step-btn").disabled = true;
    document.getElementById("srch-auto-btn").disabled = true;
    clearTimeout(srchAutoTimer);
  }
}

function srchAuto() {
  if (srchPhase >= 2) return;
  document.getElementById("srch-auto-btn").disabled = true;
  function next() {
    if (srchPhase >= 2) return;
    srchStep();
    srchAutoTimer = setTimeout(next, 1100);
  }
  next();
}

function resetSearch() {
  clearTimeout(srchAutoTimer);
  initSearch();
  addLog("log-search", "↺ Reset", "log-info");
}


//   DELETE SCENARIO
                          
const DEL_DATA = [
  { k: "apple", v: "5" },
  { k: "banana", v: "3" },
  { k: "cherry", v: "8" },
  { k: "date", v: "2" },
  { k: "elderberry", v: "7" },
];
const DEL_QUEUE = ["cherry", "apple", "date"];
let delState = [],
  delIdx = 0,
  delAutoTimer = null;

function initDelete() {
  delState = Array.from({ length: TABLE_SIZE }, () => []);
  DEL_DATA.forEach(({ k, v }) => delState[hashKey(k)].push(`${k}→${v}`));
  delIdx = 0;
  clearTimeout(delAutoTimer);
  buildTableEl("del-table", delState, "chip-map");
  const log = document.getElementById("log-delete");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  document.getElementById("del-step-btn").disabled = false;
  document.getElementById("del-auto-btn").disabled = false;
  addLog(
    "log-delete",
    `Table pre-loaded with ${DEL_DATA.length} entries`,
    "log-info",
  );
  addLog("log-delete", `Deleting: ${DEL_QUEUE.join(", ")}`, "log-info");
}

function delStep() {
  if (delIdx >= DEL_QUEUE.length) return;
  const key = DEL_QUEUE[delIdx];
  const idx = hashKey(key);
  delState[idx] = delState[idx].filter((e) => e.split("→")[0] !== key);
  buildTableEl("del-table", delState, "chip-map", idx, "del");
  addLog("log-delete", `hash("${key}") = ${idx}`, "log-info");
  addLog(
    "log-delete",
    `delete("${key}") from index ${idx}  ✓ O(1)`,
    "log-delete",
  );
  delIdx++;
  if (delIdx >= DEL_QUEUE.length) {
    addLog("log-delete", "All target keys deleted!", "log-result");
    document.getElementById("del-step-btn").disabled = true;
    document.getElementById("del-auto-btn").disabled = true;
    clearTimeout(delAutoTimer);
  }
}

function delAuto() {
  if (delIdx >= DEL_QUEUE.length) return;
  document.getElementById("del-auto-btn").disabled = true;
  function next() {
    if (delIdx >= DEL_QUEUE.length) return;
    delStep();
    delAutoTimer = setTimeout(next, 900);
  }
  next();
}

function resetDelete() {
  clearTimeout(delAutoTimer);
  initDelete();
  addLog("log-delete", "↺ Reset", "log-info");
}


  // COLLISION SCENARIO
                      
const COL_ITEMS = (function () {
  const items = [];
  const candidates = [
    "ab",
    "hi",
    "op",
    "ab0",
    "xyz",
    "m",
    "jk",
    "ba",
    "cf",
    "gh",
  ];
  const buckets = {};
  for (const k of candidates) {
    const h = hashKey(k);
    if (!buckets[h]) buckets[h] = [];
    buckets[h].push(k);
  }
  const sorted = Object.entries(buckets).sort(
    (a, b) => b[1].length - a[1].length,
  );
  const colBucket = sorted[0][1];
  colBucket
    .slice(0, 3)
    .forEach((k) => items.push({ k, v: String(k.charCodeAt(0)) }));
  ["date", "fig"].forEach((k) => items.push({ k, v: String(k.length) }));
  return items;
})();

let colState = [],
  colIdx = 0,
  colAutoTimer = null;

function initCollide() {
  colState = Array.from({ length: TABLE_SIZE }, () => []);
  colIdx = 0;
  clearTimeout(colAutoTimer);
  buildTableEl("col-table", colState, "chip-collide");
  const log = document.getElementById("log-collide");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  document.getElementById("col-step-btn").disabled = false;
  document.getElementById("col-auto-btn").disabled = false;
  addLog(
    "log-collide",
    "Watch collisions → chaining resolves them",
    "log-info",
  );
}

function colStep() {
  if (colIdx >= COL_ITEMS.length) return;
  const { k, v } = COL_ITEMS[colIdx];
  const idx = hashKey(k);
  const isCollision = colState[idx].length > 0;
  colState[idx].push(`${k}→${v}`);
  buildTableEl("col-table", colState, "chip-collide", idx, "col");
  addLog("log-collide", `hash("${k}") = ${idx}`, "log-info");
  if (isCollision) {
    addLog(
      "log-collide",
      `💥 COLLISION at [${idx}]! Chain length = ${colState[idx].length}`,
      "log-warn",
    );
    addLog("log-collide", `Appended to chain → still O(1) avg`, "log-result");
  } else {
    addLog("log-collide", `Inserted "${k}→${v}" at [${idx}]  ✓`, "log-insert");
  }
  colIdx++;
  if (colIdx >= COL_ITEMS.length) {
    addLog("log-collide", "Chaining resolved all collisions! ✓", "log-result");
    document.getElementById("col-step-btn").disabled = true;
    document.getElementById("col-auto-btn").disabled = true;
    clearTimeout(colAutoTimer);
  }
}

function colAuto() {
  if (colIdx >= COL_ITEMS.length) return;
  document.getElementById("col-auto-btn").disabled = true;
  function next() {
    if (colIdx >= COL_ITEMS.length) return;
    colStep();
    colAutoTimer = setTimeout(next, 900);
  }
  next();
}

function resetCollide() {
  clearTimeout(colAutoTimer);
  initCollide();
  addLog("log-collide", "↺ Reset", "log-info");
}

//CUSTOM SCENARIO
                      
let customState = Array.from({ length: TABLE_SIZE }, () => []);
let customType = "hashmap";
let ccTimer = null;

function cSwitchType(type) {
  customType = type;
  customState = Array.from({ length: TABLE_SIZE }, () => []);
  document.getElementById("ctype-map").className =
    type === "hashmap" ? "ctl-btn ctl-btn-cyan" : "ctl-btn ctl-btn-ghost";
  document.getElementById("ctype-set").className =
    type === "hashset" ? "ctl-btn ctl-btn-cyan" : "ctl-btn ctl-btn-ghost";
  document.getElementById("c-val").style.display =
    type === "hashmap" ? "" : "none";
  document.getElementById("custom-panel-title").textContent =
    `📋 Hash ${type === "hashmap" ? "Map" : "Set"} (size 7)`;
  renderCustom();
  addLog(
    "log-custom",
    `Switched to Hash ${type === "hashmap" ? "Map" : "Set"}`,
    "log-info",
  );
}

function renderCustom(highlightIdx = -1, mode = "") {
  const chipClass = customType === "hashmap" ? "chip-map" : "chip-set";
  buildTableEl("custom-table", customState, chipClass, highlightIdx, mode);
}

function highlightCC(type) {
  ["insert", "search", "delete", "worst"].forEach((t) =>
    document.getElementById("ccc-" + t).classList.remove("cc-active"),
  );
  const card = document.getElementById("ccc-" + type);
  if (card) {
    card.classList.add("cc-active");
    ccTimer = setTimeout(() => card.classList.remove("cc-active"), 1800);
  }
}

function showToast(type, msg) {
  const toast = document.getElementById("cc-toast");
  const icons = { insert: "⬆", search: "🔍", delete: "🗑", warn: "⚠" };
  document.getElementById("cc-toast-icon").textContent = icons[type] || "⚡";
  document.getElementById("cc-toast-text").textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "cc-toast";
  }, 2500);
}

function initCustom() {
  customState = Array.from({ length: TABLE_SIZE }, () => []);
  renderCustom();
  const log = document.getElementById("log-custom");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-custom", "Custom structure ready!", "log-info");
}

function customInsert() {
  const key = document.getElementById("c-key").value.trim();
  const val = document.getElementById("c-val").value.trim();
  if (!key) {
    showToast("warn", "Enter a key!");
    return;
  }
  const idx = hashKey(key);
  const exists = customState[idx].some((e) => e.split("→")[0] === key);
  if (exists) {
    showToast("warn", `"${key}" already in table!`);
    addLog("log-custom", `"${key}" already exists at [${idx}]`, "log-warn");
    return;
  }
  const entry =
    customType === "hashmap" ? (val ? `${key}→${val}` : `${key}→?`) : key;
  customState[idx].push(entry);
  renderCustom(idx);
  highlightCC("insert");
  showToast("insert", `insert("${key}")  →  O(1)`);
  addLog("log-custom", `insert("${entry}") at [${idx}]  ✓ O(1)`, "log-insert");
  document.getElementById("c-key").value = "";
  document.getElementById("c-val").value = "";
}

function customDelete() {
  const key = document.getElementById("c-key").value.trim();
  if (!key) {
    showToast("warn", "Enter a key!");
    return;
  }
  const idx = hashKey(key);
  const before = customState[idx].length;
  customState[idx] = customState[idx].filter((e) => e.split("→")[0] !== key);
  if (customState[idx].length < before) {
    renderCustom(idx, "del");
    highlightCC("delete");
    showToast("delete", `delete("${key}")  →  O(1)`);
    addLog(
      "log-custom",
      `delete("${key}") from [${idx}]  ✓ O(1)`,
      "log-delete",
    );
  } else {
    showToast("warn", `"${key}" not found!`);
    addLog("log-custom", `"${key}" not found at [${idx}]`, "log-warn");
  }
}

function customSearch() {
  const key = document.getElementById("c-key").value.trim();
  if (!key) {
    showToast("warn", "Enter a key!");
    return;
  }
  const idx = hashKey(key);
  const found = customState[idx].find((e) => e.split("→")[0] === key);
  if (found) {
    renderCustom(idx, "found");
    highlightCC("search");
    showToast("search", `found "${found}"  →  O(1)`);
    addLog(
      "log-custom",
      `search("${key}") → FOUND "${found}" at [${idx}]  ✓`,
      "log-search",
    );
  } else {
    renderCustom(idx);
    showToast("warn", `"${key}" not found`);
    addLog("log-custom", `search("${key}") → NOT FOUND  [${idx}]`, "log-warn");
  }
}

function resetCustom() {
  initCustom();
  addLog("log-custom", "↺ Cleared", "log-info");
}

document.getElementById("c-key").addEventListener("keydown", (e) => {
  if (e.key === "Enter") customInsert();
});

 //CODE TEMPLATES
                            
const codeTemplates = {
  hashmap: {
    cpp: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> hashMap;

    // Insert
    hashMap["apple"]  = 5;
    hashMap["banana"] = 3;
    hashMap["cherry"] = 8;
    hashMap.insert({"date", 2});
    cout << "Inserted 4 entries\\n";

    // Search
    auto it = hashMap.find("apple");
    if (it != hashMap.end())
        cout << "Found apple: " << it->second << "\\n";

    // Contains check
    cout << "Contains banana: " << hashMap.count("banana") << "\\n";

    // Delete
    hashMap.erase("cherry");
    cout << "Deleted cherry\\n";

    // Size
    cout << "Size: " << hashMap.size() << "\\n";

    // Iterate
    for (auto& [k, v] : hashMap)
        cout << k << " -> " << v << "\\n";

    return 0;
}`,
    python: `# Python dict — built-in hash map
hash_map = {}

# Insert
hash_map["apple"]  = 5
hash_map["banana"] = 3
hash_map["cherry"] = 8
hash_map.update({"date": 2})
print(f"Inserted {len(hash_map)} entries")

# Search
val = hash_map.get("apple", -1)
print(f"apple -> {val}")

# Contains
print(f"Contains banana: {'banana' in hash_map}")

# Delete
del hash_map["cherry"]
print("Deleted cherry")

# Size
print(f"Size: {len(hash_map)}")

# Iterate
for key, val in hash_map.items():
    print(f"{key} -> {val}")`,
    java: `import java.util.*;

public class HashMapDemo {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();

        // Insert
        map.put("apple",  5);
        map.put("banana", 3);
        map.put("cherry", 8);
        map.put("date",   2);
        System.out.println("Inserted " + map.size() + " entries");

        // Search
        System.out.println("apple -> " + map.get("apple"));

        // Contains
        System.out.println("Contains banana: " + map.containsKey("banana"));

        // Delete
        map.remove("cherry");
        System.out.println("Deleted cherry");

        // Size
        System.out.println("Size: " + map.size());

        // Iterate
        for (Map.Entry<String,Integer> e : map.entrySet())
            System.out.println(e.getKey() + " -> " + e.getValue());
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SIZE 7

typedef struct Node {
    char key[50]; int value; struct Node* next;
} Node;

Node* table[SIZE];

int hash(const char* key) {
    int h = 0;
    for (int i = 0; key[i]; i++) h = (h * 31 + key[i]) % SIZE;
    return h;
}

void insert(const char* key, int val) {
    int idx = hash(key);
    Node* n = malloc(sizeof(Node));
    strcpy(n->key, key); n->value = val; n->next = table[idx];
    table[idx] = n;
    printf("insert(%s,%d) at [%d]\\n", key, val, idx);
}

int search(const char* key) {
    Node* cur = table[hash(key)];
    while (cur) { if (!strcmp(cur->key, key)) return cur->value; cur = cur->next; }
    return -1;
}

int main() {
    insert("apple", 5); insert("banana", 3);
    insert("cherry", 8); insert("date", 2);
    printf("apple -> %d\\n", search("apple"));
    printf("grape -> %d (not found)\\n", search("grape"));
    return 0;
}`,
    javascript: `// JavaScript Map — built-in hash map
const hashMap = new Map();

// Insert
hashMap.set("apple",  5);
hashMap.set("banana", 3);
hashMap.set("cherry", 8);
hashMap.set("date",   2);
console.log("Inserted", hashMap.size, "entries");

// Search
console.log("apple ->", hashMap.get("apple"));

// Contains
console.log("Contains banana:", hashMap.has("banana"));

// Delete
hashMap.delete("cherry");
console.log("Deleted cherry");

// Size
console.log("Size:", hashMap.size);

// Iterate
for (const [key, val] of hashMap)
    console.log(key, "->", val);`,
  },
  hashset: {
    cpp: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    unordered_set<string> hashSet;

    // Insert
    hashSet.insert("apple");
    hashSet.insert("banana");
    hashSet.insert("cherry");
    hashSet.insert("apple"); // duplicate — ignored
    cout << "Size: " << hashSet.size() << "\\n"; // 3

    // Contains / search
    cout << "Contains apple: " << hashSet.count("apple") << "\\n";
    cout << "Contains grape: " << hashSet.count("grape") << "\\n";

    // Delete
    hashSet.erase("banana");
    cout << "Deleted banana\\n";

    // Iterate
    for (const auto& k : hashSet)
        cout << k << "\\n";

    return 0;
}`,
    python: `# Python set — built-in hash set
hash_set = set()

# Insert
hash_set.add("apple")
hash_set.add("banana")
hash_set.add("cherry")
hash_set.add("apple")   # duplicate — ignored
print(f"Size: {len(hash_set)}")  # 3

# Contains
print(f"Contains apple: {'apple' in hash_set}")
print(f"Contains grape: {'grape' in hash_set}")

# Delete
hash_set.discard("banana")
print("Deleted banana")

# Size
print(f"Size now: {len(hash_set)}")

# Iterate
for key in hash_set:
    print(key)

# Set operations
s1 = {"a", "b", "c"}
s2 = {"b", "c", "d"}
print("Union:",        s1 | s2)
print("Intersection:", s1 & s2)
print("Difference:",   s1 - s2)`,
    java: `import java.util.*;

public class HashSetDemo {
    public static void main(String[] args) {
        HashSet<String> hashSet = new HashSet<>();

        // Insert
        hashSet.add("apple");
        hashSet.add("banana");
        hashSet.add("cherry");
        hashSet.add("apple");  // duplicate — ignored
        System.out.println("Size: " + hashSet.size()); // 3

        // Contains
        System.out.println("Contains apple: " + hashSet.contains("apple"));
        System.out.println("Contains grape: " + hashSet.contains("grape"));

        // Delete
        hashSet.remove("banana");
        System.out.println("Deleted banana");

        // Iterate
        for (String key : hashSet)
            System.out.println(key);
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SIZE 7

typedef struct Node { char key[50]; struct Node* next; } Node;
Node* table[SIZE];

int hash(const char* key) {
    int h = 0;
    for (int i = 0; key[i]; i++) h = (h*31 + key[i]) % SIZE;
    return h;
}

void insert(const char* key) {
    int idx = hash(key);
    for (Node* c=table[idx]; c; c=c->next)
        if (!strcmp(c->key,key)) { printf("%s already in set\\n",key); return; }
    Node* n = malloc(sizeof(Node)); strcpy(n->key,key); n->next=table[idx]; table[idx]=n;
    printf("insert(%s) at [%d]\\n", key, idx);
}

int contains(const char* key) {
    for (Node* c=table[hash(key)]; c; c=c->next)
        if (!strcmp(c->key,key)) return 1;
    return 0;
}

int main() {
    insert("apple"); insert("banana"); insert("cherry"); insert("apple");
    printf("apple in set: %d\\n", contains("apple"));
    printf("grape in set: %d\\n", contains("grape"));
    return 0;
}`,
    javascript: `// JavaScript Set — built-in hash set
const hashSet = new Set();

// Insert
hashSet.add("apple");
hashSet.add("banana");
hashSet.add("cherry");
hashSet.add("apple");   // duplicate — ignored
console.log("Size:", hashSet.size);  // 3

// Contains
console.log("Contains apple:", hashSet.has("apple"));
console.log("Contains grape:", hashSet.has("grape"));

// Delete
hashSet.delete("banana");
console.log("Deleted banana");
console.log("Size now:", hashSet.size);

// Iterate
for (const key of hashSet)
    console.log(key);

// Set operations (manual)
const s1 = new Set(["a","b","c"]);
const s2 = new Set(["b","c","d"]);
const union        = new Set([...s1, ...s2]);
const intersection = new Set([...s1].filter(x => s2.has(x)));
const difference   = new Set([...s1].filter(x => !s2.has(x)));
console.log("Union:",        [...union]);
console.log("Intersection:", [...intersection]);
console.log("Difference:",   [...difference]);`,
  },
};

/*   CODEMIRROR INIT   */
function initEditor() {
  const t = document.body.getAttribute("data-theme") || "dark";
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-c++src",
    theme: getCMTheme(t),
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });
  // don't set value here — switchImpl handles it right after
}

/* lang tab clicks */
document.querySelectorAll(".lang-tab").forEach((btn) => {
  btn.onclick = () => {
    const lang = btn.dataset.lang;
    btn.parentElement
      .querySelectorAll(".lang-tab")
      .forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    const modeMap = {
      cpp: "text/x-c++src",
      python: "text/x-python",
      java: "text/x-java",
      c: "text/x-csrc",
      javascript: "text/javascript",
    };
    const display = {
      cpp: "C++",
      python: "Python",
      java: "Java",
      c: "C",
      javascript: "JavaScript",
    };
    currentLang = lang;
    document.getElementById("lang-display-label").textContent = display[lang];
    if (codeEditor) {
      codeEditor.setOption("mode", modeMap[lang]);
      codeEditor.setValue(codeTemplates[currentImpl][lang]);
      setTimeout(() => codeEditor.refresh(), 50);
    }
  };
});

function copyCode() {
  if (!codeEditor) return;
  navigator.clipboard.writeText(codeEditor.getValue()).then(() => {
    const btn = document.querySelector(".code-copy");
    const orig = btn.textContent;
    btn.textContent = "✓";
    btn.style.background = "var(--primary-green)";
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = "var(--primary-purple)";
    }, 2000);
  });
}

/*   RUN CODE   */
async function runCode() {
  const outputDiv = document.getElementById("codeOutput");
  outputDiv.innerHTML =
    '<span style="color:#fbbf24;">🔄 Executing...</span><br><br>';
  const isMap = currentImpl === "hashmap";
  const lang =
    currentLang === "python"
      ? "Python"
      : currentLang === "javascript"
        ? "JavaScript"
        : "C++";
  outputDiv.innerHTML += `<span style="color:#06b6d4;">Hash ${isMap ? "Map" : "Set"} Demo — ${lang}</span><br><br>`;

  const data = isMap
    ? [
        { k: "apple", v: 5 },
        { k: "banana", v: 3 },
        { k: "cherry", v: 8 },
        { k: "date", v: 2 },
      ]
    : [{ k: "apple" }, { k: "banana" }, { k: "cherry" }, { k: "apple" }];

  if (isMap) {
    data.forEach(({ k, v }) => {
      outputDiv.innerHTML += `<span style="color:#10b981;">insert("${k}", ${v})</span><br>`;
    });
    outputDiv.innerHTML += `<br><span style="color:#06b6d4;">Size: ${data.length}</span><br>`;
    outputDiv.innerHTML += `<span style="color:#06b6d4;">apple → ${data.find((d) => d.k === "apple").v}</span><br>`;
    outputDiv.innerHTML += `<span style="color:#06b6d4;">Contains banana: true</span><br>`;
    outputDiv.innerHTML += `<br><span style="color:#ef4444;">delete("cherry")</span><br>`;
    outputDiv.innerHTML += `<span style="color:#06b6d4;">Size after delete: ${data.length - 1}</span><br>`;
    outputDiv.innerHTML += `<br><span style="color:#a0a0a0;">Entries:</span><br>`;
    data
      .filter((d) => d.k !== "cherry")
      .forEach(({ k, v }) => {
        outputDiv.innerHTML += `<span style="color:#10b981;">${k} → ${v}</span><br>`;
      });
  } else {
    const unique = [...new Set(data.map((d) => d.k))];
    data.forEach(({ k }) => {
      outputDiv.innerHTML += `<span style="color:#8b5cf6;">add("${k}")</span><br>`;
    });
    outputDiv.innerHTML += `<br><span style="color:#06b6d4;">Size: ${unique.length} (1 duplicate ignored)</span><br>`;
    outputDiv.innerHTML += `<span style="color:#06b6d4;">Contains apple: true</span><br>`;
    outputDiv.innerHTML += `<span style="color:#06b6d4;">Contains grape: false</span><br>`;
    outputDiv.innerHTML += `<br><span style="color:#ef4444;">remove("banana")</span><br>`;
    outputDiv.innerHTML += `<br><span style="color:#a0a0a0;">Remaining entries:</span><br>`;
    unique
      .filter((k) => k !== "banana")
      .forEach((k) => {
        outputDiv.innerHTML += `<span style="color:#8b5cf6;">${k}</span><br>`;
      });
  }
  outputDiv.innerHTML +=
    '<br><span style="color:#10b981;">✓ Execution complete!</span>';
}

function submitInput() {
  const v = document.getElementById("userInput").value.trim();
  if (v && currentInputResolver) {
    document.getElementById("inputPrompt").style.display = "none";
    currentInputResolver(v);
    currentInputResolver = null;
  }
}
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitInput();
});

/*   LEVEL BUTTONS   */
const ALGO_KEY = "hashing";
const L3_KEY = `${ALGO_KEY}_l3_unlocked`;
const modal = document.getElementById("quizModal");

function updateLevelButtons() {
  if (isLevelUnlocked(ALGO_KEY, 2)) {
    const b = document.getElementById("l3");
    b.style.cssText =
      "border-color:var(--primary-green);background:rgba(16,185,129,0.12);color:var(--primary-green)";
  }
}

document.getElementById("l3").onclick = () => {
  if (isLevelUnlocked(ALGO_KEY, 2)) {
    window.location.href = "hashing_l3.html";
    return;
  }
  document.getElementById("modalMsg").textContent =
    "Pass the Level 2 Quiz to unlock Level 3 and complete your Hashing journey.";
  modal.style.display = "flex";
  document.getElementById("startQuiz").onclick = () =>
    (window.location.href = "quiz.html?id=hashing-l2");
};

document.getElementById("cancelBtn").onclick = () =>
  (modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

 //INIT — correct order fixes the blank editor
                           
window.addEventListener("load", () => {
  // 1. theme first so CodeMirror gets right theme on init
  const saved = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(saved);

  // 2. init CM instance (no value set yet)
  initEditor();

  // 3. switchImpl sets value + refreshes CM
  switchImpl("hashmap");

  // 4. everything else
  renderMain();
  updateLevelButtons();
  initInsert();
  initSearch();
  initDelete();
  initCollide();
  initCustom();

  // 5. safety refresh in case CM painted before layout settled
  setTimeout(() => {
    if (codeEditor) codeEditor.refresh();
  }, 150);
});

window.addEventListener("progressReady", () => {
  if (typeof updateLevelButtons === "function") updateLevelButtons();
  else if (typeof updateLevels === "function") updateLevels();
});
