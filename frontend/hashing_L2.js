const TABLE_SIZE = 7;

function hashKey(k) {
  let s = String(k);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i)) % TABLE_SIZE;
  return h;
}

let currentType = "hashset";
// table = array of arrays of {key, val}
let mainTable = Array.from({ length: TABLE_SIZE }, () => []);

function renderMainTable(highlightBucket = -1, hlType = "", foundKey = null) {
  const grid = document.getElementById("hashTableGrid");
  grid.innerHTML = "";
  for (let i = 0; i < TABLE_SIZE; i++) {
    const row = document.createElement("div");
    row.className = "hash-row";

    const idx = document.createElement("div");
    idx.className = "hash-idx";
    idx.textContent = i;
    row.appendChild(idx);

    const bucket = document.createElement("div");
    bucket.className = "hash-bucket";
    if (mainTable[i].length > 0) bucket.classList.add("occupied");
    if (i === highlightBucket) {
      if (hlType === "insert") bucket.classList.add("highlight");
      else if (hlType === "delete") bucket.classList.add("delete-hl");
      else if (hlType === "search")
        bucket.classList.add(foundKey !== null ? "highlight" : "delete-hl");
      else if (hlType === "collision") bucket.classList.add("collision");
    }

    if (mainTable[i].length === 0) {
      const e = document.createElement("span");
      e.className = "hash-empty";
      e.textContent = "— empty —";
      bucket.appendChild(e);
    } else {
      mainTable[i].forEach((entry) => {
        const item = document.createElement("span");
        item.className =
          currentType === "hashset"
            ? "hash-item type-set"
            : "hash-item type-map";
        if (foundKey !== null && entry.key == foundKey)
          item.className = "hash-item type-found";
        item.textContent =
          currentType === "hashset" ? entry.key : `${entry.key}:${entry.val}`;
        bucket.appendChild(item);
      });
    }
    row.appendChild(bucket);
    grid.appendChild(row);
  }
}

function showMsg(txt, type) {
  const el = document.getElementById("msg_show");
  el.style.display = "block";
  el.className = "alert-" + type;
  el.innerHTML = txt;
  setTimeout(() => (el.style.display = "none"), 2800);
}

function highlightPS(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.getElementById("ps-" + step);
  if (el) el.classList.add("active");
}

/* Insert */
async function mainInsert() {
  const k = document.getElementById("mainInput").value.trim();
  const v = document.getElementById("mapValInput")
    ? document.getElementById("mapValInput").value.trim()
    : "";
  if (!k) {
    showMsg("Enter a key", "warn");
    return;
  }
  const idx = hashKey(k);
  const existing = mainTable[idx].find((e) => e.key == k);
  if (existing) {
    showMsg(`Key "${k}" already exists at bucket ${idx}`, "warn");
    return;
  }
  const collision = mainTable[idx].length > 0;
  mainTable[idx].push({ key: k, val: v || "—" });
  highlightPS(collision ? "collision" : "insert");
  renderMainTable(idx, collision ? "collision" : "insert");
  showMsg(
    `Inserted "${k}" → bucket ${idx}${collision ? " (chain appended)" : ""}`,
    "success",
  );
  document.getElementById("mainInput").value = "";
  if (document.getElementById("mapValInput"))
    document.getElementById("mapValInput").value = "";
}

/* Search */
async function mainSearch() {
  const k = document.getElementById("mainInput").value.trim();
  if (!k) {
    showMsg("Enter a key to search", "warn");
    return;
  }
  highlightPS("search");
  const idx = hashKey(k);
  const found = mainTable[idx].find((e) => e.key == k);
  renderMainTable(idx, "search", found ? k : null);
  if (found)
    showMsg(
      `Found "${k}" at bucket ${idx}${currentType === "hashmap" ? ` → value: ${found.val}` : ""}`,
      "success",
    );
  else showMsg(`"${k}" not found (bucket ${idx} checked)`, "danger");
}

/* Delete */
async function mainDelete() {
  const k = document.getElementById("mainInput").value.trim();
  if (!k) {
    showMsg("Enter a key to delete", "warn");
    return;
  }
  highlightPS("delete");
  const idx = hashKey(k);
  const before = mainTable[idx].length;
  mainTable[idx] = mainTable[idx].filter((e) => e.key != k);
  if (mainTable[idx].length < before) {
    renderMainTable(idx, "delete");
    showMsg(`Deleted "${k}" from bucket ${idx}`, "info");
  } else {
    renderMainTable(idx, "delete");
    showMsg(`"${k}" not found — nothing deleted`, "warn");
  }
}

/* Iterate */
async function mainIterate() {
  highlightPS("iterate");
  const all = [];
  for (let i = 0; i < TABLE_SIZE; i++)
    mainTable[i].forEach((e) =>
      all.push(
        `[${i}] ${currentType === "hashmap" ? e.key + ":" + e.val : e.key}`,
      ),
    );
  if (!all.length) {
    showMsg("Table is empty", "warn");
    return;
  }
  for (let i = 0; i < TABLE_SIZE; i++) {
    renderMainTable(i, "insert");
    await sleep(300);
  }
  renderMainTable();
  showMsg(`All entries: ${all.join(" → ")}`, "info");
}

/* Size */
function mainSize() {
  const n = mainTable.reduce((s, b) => s + b.length, 0);
  const lf = (n / TABLE_SIZE).toFixed(2);
  showMsg(
    `Size: ${n} entries | Load Factor: ${lf} (n/capacity = ${n}/${TABLE_SIZE})`,
    "info",
  );
}

/* Reset */
function mainReset() {
  mainTable = Array.from({ length: TABLE_SIZE }, () => []);
  renderMainTable();
  showMsg("Table cleared", "info");
}

/* Switch type */
const PSEUDO_TEXTS = {
  hashset: {
    insert: "idx = hash(key) mod size\ntable[idx].add(key)",
    search: "idx = hash(key) mod size\nreturn table[idx].has(key)",
    delete: "idx = hash(key) mod size\ntable[idx].remove(key)",
  },
  hashmap: {
    insert: "idx = hash(key) mod size\ntable[idx][key] = value",
    search: "idx = hash(key) mod size\nreturn table[idx].get(key)",
    delete: "idx = hash(key) mod size\ndel table[idx][key]",
  },
};
const TITLES = {
  hashset: "Hash Set Visualizer — Chaining (size = 7)",
  hashmap: "Hash Map Visualizer — Chaining (size = 7)",
};

function switchType(type) {
  currentType = type;
  mainTable = Array.from({ length: TABLE_SIZE }, () => []);
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  document.getElementById("viz-title").textContent = TITLES[type];
  const mv = document.getElementById("mapValInput");
  if (mv) mv.style.display = type === "hashmap" ? "block" : "none";
  const pt = PSEUDO_TEXTS[type];
  document.getElementById("ps-insert-text").innerHTML = pt.insert.replace(
    "\n",
    "<br>",
  );
  document.getElementById("ps-search-text").innerHTML = pt.search.replace(
    "\n",
    "<br>",
  );
  document.getElementById("ps-delete-text").innerHTML = pt.delete.replace(
    "\n",
    "<br>",
  );
  renderMainTable();
  updateCodeEditor();
}

/* ════════════════════════════════════════════════
   MINI TABLE HELPERS
════════════════════════════════════════════════ */
function buildMiniTable(
  containerId,
  data,
  hlBucket = -1,
  hlCls = "",
  hlItem = null,
) {
  const c = document.getElementById(containerId);
  c.innerHTML = "";
  for (let i = 0; i < TABLE_SIZE; i++) {
    const row = document.createElement("div");
    row.className = "mini-row";
    const idx = document.createElement("div");
    idx.className = "mini-idx";
    idx.textContent = i;
    const bucket = document.createElement("div");
    bucket.className = "mini-bucket";
    if (data[i] && data[i].length > 0) bucket.classList.add("occ");
    if (i === hlBucket && hlCls) bucket.classList.add(hlCls);
    if (!data[i] || data[i].length === 0) {
      const e = document.createElement("span");
      e.className = "mini-empty";
      e.textContent = "—";
      bucket.appendChild(e);
    } else {
      data[i].forEach((entry) => {
        const item = document.createElement("span");
        const isHl = hlItem !== null && entry == hlItem;
        item.className = "mini-item " + (isHl ? "mi-green" : "mi-cyan");
        item.textContent =
          typeof entry === "object" ? `${entry.k}:${entry.v}` : entry;
        bucket.appendChild(item);
      });
    }
    row.appendChild(idx);
    row.appendChild(bucket);
    c.appendChild(row);
  }
}

function addLog(logId, text, cls = "log-info") {
  const log = document.getElementById(logId);
  const e = document.createElement("div");
  e.className = "log-entry " + cls;
  e.textContent = "> " + text;
  log.appendChild(e);
  log.scrollTop = log.scrollHeight;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ════════════════════════════════════════════════
   BEST CASE
════════════════════════════════════════════════ */
const bestKeys = [10, 22, 36, 3]; // all different buckets
let bestData, bestIdx;

function initBest() {
  bestData = Array.from({ length: TABLE_SIZE }, () => []);
  bestIdx = 0;
  buildMiniTable("mini-best", bestData);
  const log = document.getElementById("log-best");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-best", "Empty table (size 7) — ready", "log-info");
  addLog("log-best", "Keys: 10, 22, 36, 3 → all different buckets", "log-info");
  addLog("log-best", "Press Insert to see O(1) in action", "log-info");
}

function bestInsert() {
  if (bestIdx >= bestKeys.length) {
    addLog("log-best", "All keys inserted!", "log-warn");
    return;
  }
  const k = bestKeys[bestIdx++];
  const idx = hashKey(k);
  bestData[idx].push(k);
  buildMiniTable("mini-best", bestData, idx, "hl-green");
  addLog(
    "log-best",
    `insert(${k}) → h(${k}) mod 7 = ${idx}  ✓  O(1)`,
    "log-insert",
  );
  addLog("log-best", `Bucket ${idx} was empty → direct store`, "log-result");
}

function bestSearch() {
  if (!bestData.flat().length) {
    addLog("log-best", "Insert some keys first", "log-warn");
    return;
  }
  const k = bestData.flat()[0];
  const idx = hashKey(k);
  buildMiniTable("mini-best", bestData, idx, "hl-cyan", k);
  addLog("log-best", `search(${k}) → h(${k}) mod 7 = ${idx}`, "log-search");
  addLog("log-best", `✓ Found in 1 step — O(1) best case`, "log-result");
}

function resetBest() {
  initBest();
  addLog("log-best", "↺ Reset", "log-info");
}

/* ════════════════════════════════════════════════
   AVERAGE CASE
════════════════════════════════════════════════ */
const avgPreload = [14, 21, 7, 28, 35, 42]; // 14%7=0, 21%7=0, 7%7=0, 28%7=0 → chain; 35%7=0, 42%7=0
// But we want SOME at same bucket, some not
// 14→0, 3→3, 21→0, 8→1, 35→0, 15→1
const avgKeys = [3, 8, 14, 21, 15]; // 3→3, 8→1, 14→0, 21→0, 15→1
const avgTarget = 21;
let avgData, avgSearchBucket, avgSearchChain, avgChainIdx, avgAutoTimer;

function initAvg() {
  avgData = Array.from({ length: TABLE_SIZE }, () => []);
  avgKeys.forEach((k) => avgData[hashKey(k)].push(k));
  avgSearchBucket = hashKey(avgTarget);
  avgSearchChain = [...avgData[avgSearchBucket]];
  avgChainIdx = 0;
  clearTimeout(avgAutoTimer);
  buildMiniTable("mini-avg", avgData);
  const log = document.getElementById("log-avg");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-avg", `Keys inserted: [${avgKeys.join(", ")}]`, "log-info");
  addLog(
    "log-avg",
    `Target: ${avgTarget}  →  h(${avgTarget}) mod 7 = ${avgSearchBucket}`,
    "log-info",
  );
  addLog(
    "log-avg",
    `Bucket ${avgSearchBucket} has ${avgSearchChain.length} item(s)`,
    "log-info",
  );
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}

function avgStep() {
  if (avgChainIdx >= avgSearchChain.length) return;
  const item = avgSearchChain[avgChainIdx];
  const found = item == avgTarget;
  buildMiniTable(
    "mini-avg",
    avgData,
    avgSearchBucket,
    found ? "hl-green" : "hl-cyan",
    found ? item : null,
  );
  addLog(
    "log-avg",
    `Step ${avgChainIdx + 1}: check ${item} ${found ? "→ FOUND ✓" : "≠ " + avgTarget}`,
    found ? "log-result" : "log-search",
  );
  avgChainIdx++;
  if (found || avgChainIdx >= avgSearchChain.length) {
    if (found)
      addLog(
        "log-avg",
        `Chain length: ${avgSearchChain.length} → O(1) average`,
        "log-result",
      );
    else
      addLog("log-avg", `Not found after ${avgChainIdx} step(s)`, "log-warn");
    document.getElementById("avg-step-btn").disabled = true;
    document.getElementById("avg-auto-btn").disabled = true;
    clearTimeout(avgAutoTimer);
  }
}
function avgAuto() {
  if (avgChainIdx >= avgSearchChain.length) return;
  document.getElementById("avg-auto-btn").disabled = true;
  function go() {
    if (avgChainIdx >= avgSearchChain.length) return;
    avgStep();
    avgAutoTimer = setTimeout(go, 800);
  }
  go();
}
function resetAvg() {
  clearTimeout(avgAutoTimer);
  initAvg();
}

/* ════════════════════════════════════════════════
   WORST CASE
════════════════════════════════════════════════ */
const worstChain = [7, 14, 21, 28, 35, 42]; // all hash to 0 (mod 7 = 0)
const worstTarget = 99;
let worstData, worstChainIdx2, worstDone, worstAutoTimer2;

function initWorst() {
  worstData = Array.from({ length: TABLE_SIZE }, () => []);
  worstChain.forEach((k) => worstData[0].push(k));
  worstChainIdx2 = 0;
  worstDone = false;
  clearTimeout(worstAutoTimer2);
  buildMiniTable("mini-worst", worstData);
  const log = document.getElementById("log-worst");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-worst",
    `Chain at bucket 0: [${worstChain.join(", ")}]`,
    "log-warn",
  );
  addLog("log-worst", `All keys → h(k) mod 7 = 0 (worst case)`, "log-warn");
  addLog(
    "log-worst",
    `Searching for: ${worstTarget} (not present)`,
    "log-warn",
  );
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}

function worstStep() {
  if (worstDone || worstChainIdx2 >= worstChain.length) return;
  const item = worstChain[worstChainIdx2];
  buildMiniTable("mini-worst", worstData, 0, "hl-orange", null);
  addLog(
    "log-worst",
    `Step ${worstChainIdx2 + 1}: check ${item} ≠ ${worstTarget}`,
    "log-delete",
  );
  worstChainIdx2++;
  if (worstChainIdx2 >= worstChain.length) {
    worstDone = true;
    setTimeout(() => {
      addLog("log-worst", `${worstTarget} NOT FOUND ❌`, "log-warn");
      addLog(
        "log-worst",
        `${worstChain.length} steps = N → O(N) worst case`,
        "log-result",
      );
      buildMiniTable("mini-worst", worstData, 0, "hl-red");
    }, 300);
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
    clearTimeout(worstAutoTimer2);
  }
}
function worstAuto() {
  if (worstDone) return;
  document.getElementById("worst-auto-btn").disabled = true;
  function go() {
    if (worstDone || worstChainIdx2 >= worstChain.length) return;
    worstStep();
    worstAutoTimer2 = setTimeout(go, 700);
  }
  go();
}
function resetWorst() {
  clearTimeout(worstAutoTimer2);
  initWorst();
}

/* ════════════════════════════════════════════════
   CUSTOM INPUT
════════════════════════════════════════════════ */
let customData = Array.from({ length: TABLE_SIZE }, () => []);
let ccTimer;

function initCustom() {
  customData = Array.from({ length: TABLE_SIZE }, () => []);
  buildMiniTable("mini-custom", customData);
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-custom",
    "Custom hash map ready (size 7). Insert key-value pairs!",
    "log-info",
  );
}

function hlCC(type) {
  ["insert", "delete", "search"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c)
      c.classList.remove(
        "cc-active-insert",
        "cc-active-delete",
        "cc-active-search",
      );
  });
  clearTimeout(ccTimer);
  const card = document.getElementById("cc-" + type);
  if (card) {
    card.classList.add("cc-active-" + type);
    ccTimer = setTimeout(
      () => card.classList.remove("cc-active-" + type),
      1800,
    );
  }
}
function showCCToast(type, msg) {
  const toast = document.getElementById("cc-toast"),
    icon = document.getElementById("cc-toast-icon"),
    text = document.getElementById("cc-toast-text");
  const icons = { insert: "➕", delete: "🗑", search: "🔍", warn: "⚠" };
  icon.textContent = icons[type] || "⚡";
  text.textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (toast.className = "cc-toast"), 2400);
}

function customInsert() {
  const k = document.getElementById("cus-key").value.trim();
  const v = document.getElementById("cus-val").value.trim();
  if (!k) {
    showCCToast("warn", "Enter a key!");
    return;
  }
  const idx = hashKey(k);
  const exists = customData[idx].find((e) => e.k == k);
  if (exists) {
    exists.v = v || "—";
  } else customData[idx].push({ k, v: v || "—" });
  buildMiniTable("mini-custom", customData, idx, "hl-green");
  hlCC("insert");
  showCCToast("insert", `insert(${k}) → bucket ${idx} → O(1)`);
  addLog(
    "log-custom",
    `insert(${k}${v ? ":" + v : ""}) → h(${k}) mod 7 = ${idx}`,
    "log-insert",
  );
  addLog("log-custom", `✓ Time: O(1) avg | Space: O(1)`, "log-result");
  document.getElementById("cus-key").value = "";
  document.getElementById("cus-val").value = "";
}
function customDelete() {
  const k = document.getElementById("cus-key").value.trim();
  if (!k) {
    showCCToast("warn", "Enter a key!");
    return;
  }
  const idx = hashKey(k);
  const before = customData[idx].length;
  customData[idx] = customData[idx].filter((e) => e.k != k);
  buildMiniTable("mini-custom", customData, idx, "hl-red");
  if (customData[idx].length < before) {
    hlCC("delete");
    showCCToast("delete", `delete(${k}) → O(1)`);
    addLog(
      "log-custom",
      `delete(${k}) → removed from bucket ${idx}`,
      "log-delete",
    );
  } else {
    showCCToast("warn", `${k} not found`);
    addLog("log-custom", `${k} not found in bucket ${idx}`, "log-warn");
  }
}
async function customSearch() {
  const k = document.getElementById("cus-key").value.trim();
  if (!k) {
    showCCToast("warn", "Enter a key!");
    return;
  }
  const idx = hashKey(k);
  const found = customData[idx].find((e) => e.k == k);
  buildMiniTable(
    "mini-custom",
    customData,
    idx,
    found ? "hl-green" : "hl-red",
    found ? found : null,
  );
  hlCC("search");
  if (found) {
    showCCToast("search", `search(${k}) → found: ${found.v}`);
    addLog(
      "log-custom",
      `search(${k}) → bucket ${idx} → "${found.v}" ✓`,
      "log-search",
    );
    addLog("log-custom", `✓ Time: O(1) avg`, "log-result");
  } else {
    showCCToast("warn", `${k} not found`);
    addLog(
      "log-custom",
      `search(${k}) → bucket ${idx} → not found`,
      "log-warn",
    );
  }
}
function resetCustom() {
  initCustom();
  const toast = document.getElementById("cc-toast");
  if (toast) toast.className = "cc-toast";
  ["insert", "delete", "search"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c)
      c.classList.remove(
        "cc-active-insert",
        "cc-active-delete",
        "cc-active-search",
      );
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cus-key").addEventListener("keydown", (e) => {
    if (e.key === "Enter") customInsert();
  });
});

/* ════════════════════════════════════════════════
   SCENARIO TABS
════════════════════════════════════════════════ */
const TAB_CLS = {
  best: "active-best",
  avg: "active-avg",
  worst: "active-worst",
  custom: "active-custom",
};
function switchScenario(name) {
  document
    .querySelectorAll(".scenario-tab")
    .forEach((t) => (t.className = "scenario-tab"));
  document.getElementById("stab-" + name).classList.add(TAB_CLS[name]);
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}

/* ════════════════════════════════════════════════
   CODE TEMPLATES
════════════════════════════════════════════════ */
const codeTemplates = {
  hashset: {
    cpp: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    unordered_set<string> mySet;

    // INSERT — O(1) average
    mySet.insert("apple");
    mySet.insert("banana");
    mySet.insert("cherry");
    mySet.insert("apple");  // duplicate — ignored

    // SEARCH / MEMBERSHIP
    if (mySet.count("banana"))
        cout << "banana is in the set\\n";

    // DELETE
    mySet.erase("banana");
    cout << "After delete banana: size = " << mySet.size() << "\\n";

    // ITERATE (unordered)
    cout << "Elements: ";
    for (const auto& item : mySet)
        cout << item << " ";
    cout << "\\n";

    // SIZE & LOAD FACTOR
    cout << "Load factor: " << mySet.load_factor() << "\\n";
    return 0;
}`,
    python: `# Python set — built-in hash set
my_set = set()

# INSERT — O(1) average
my_set.add("apple")
my_set.add("banana")
my_set.add("cherry")
my_set.add("apple")   # duplicate — ignored

print("Set:", my_set)

# SEARCH — O(1) average
print("banana in set:", "banana" in my_set)

# DELETE — O(1) average
my_set.discard("banana")   # safe — no error if missing
# my_set.remove("banana")  # raises KeyError if missing

print("After delete:", my_set)
print("Size:", len(my_set))

# ITERATE
for item in my_set:
    print("  ->", item)`,
    java: `import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> mySet = new HashSet<>();

        // INSERT — O(1) average
        mySet.add("apple");
        mySet.add("banana");
        mySet.add("cherry");
        mySet.add("apple");  // duplicate — ignored

        System.out.println("Set: " + mySet);

        // SEARCH — O(1) average
        System.out.println("Contains banana: " + mySet.contains("banana"));

        // DELETE — O(1) average
        mySet.remove("banana");
        System.out.println("After delete: " + mySet);
        System.out.println("Size: " + mySet.size());

        // ITERATE
        for (String item : mySet)
            System.out.println("  -> " + item);
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SIZE 7

// Simple string hash set using chaining
typedef struct Node { char* key; struct Node* next; } Node;
Node* table[SIZE];

int hash(const char* key) {
    int h = 0;
    for (int i = 0; key[i]; i++) h = (h + key[i]) % SIZE;
    return h;
}

void insert(const char* key) {
    int idx = hash(key);
    Node* cur = table[idx];
    while (cur) { if (!strcmp(cur->key, key)) return; cur = cur->next; } // dup
    Node* n = (Node*)malloc(sizeof(Node));
    n->key = strdup(key); n->next = table[idx]; table[idx] = n;
    printf("Inserted '%s' at bucket %d\\n", key, idx);
}

int search(const char* key) {
    int idx = hash(key);
    Node* cur = table[idx];
    while (cur) { if (!strcmp(cur->key, key)) return 1; cur = cur->next; }
    return 0;
}

int main() {
    insert("apple"); insert("banana"); insert("cherry"); insert("apple");
    printf("Search banana: %s\\n", search("banana") ? "Found" : "Not found");
    return 0;
}`,
    javascript: `// JavaScript Set — built-in hash set
const mySet = new Set();

// INSERT — O(1) average
mySet.add("apple");
mySet.add("banana");
mySet.add("cherry");
mySet.add("apple");  // duplicate — ignored

console.log("Set size:", mySet.size);

// SEARCH — O(1) average
console.log("Has banana:", mySet.has("banana"));

// DELETE — O(1) average
mySet.delete("banana");
console.log("After delete, size:", mySet.size);

// ITERATE (insertion order)
for (const item of mySet) {
    console.log(" ->", item);
}

// Convert to array
const arr = [...mySet];
console.log("As array:", arr);`,
  },
  hashmap: {
    cpp: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> freq;

    // INSERT — O(1) average
    freq["apple"]  = 5;
    freq["banana"] = 3;
    freq["cherry"] = 8;
    freq["apple"]++;   // update existing value

    // SEARCH — O(1) average
    auto it = freq.find("apple");
    if (it != freq.end())
        cout << "apple: " << it->second << "\\n";  // 6

    // getOrDefault pattern
    cout << "grape: " << (freq.count("grape") ? freq["grape"] : 0) << "\\n";

    // DELETE — O(1) average
    freq.erase("banana");

    // ITERATE
    for (auto& [k, v] : freq)
        cout << k << " -> " << v << "\\n";

    // SIZE & LOAD FACTOR
    cout << "Size: " << freq.size() << "\\n";
    cout << "Load factor: " << freq.load_factor() << "\\n";
    return 0;
}`,
    python: `# Python dict — built-in hash map
freq = {}

# INSERT / UPDATE — O(1) average
freq["apple"]  = 5
freq["banana"] = 3
freq["cherry"] = 8
freq["apple"] += 1   # update: now 6

print("Map:", freq)

# SEARCH — O(1) average
val = freq.get("apple", 0)    # 6
print("apple:", val)
print("grape:", freq.get("grape", 0))  # default 0

# DELETE — O(1) average
removed = freq.pop("banana", None)
print("Removed banana:", removed)

# ITERATE
for k, v in freq.items():
    print(f"  {k} -> {v}")

print("Size:", len(freq))

# Frequency counter pattern
words = ["hi", "bye", "hi", "hello", "bye", "hi"]
counter = {}
for w in words:
    counter[w] = counter.get(w, 0) + 1
print("Word frequencies:", counter)`,
    java: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> freq = new HashMap<>();

        // INSERT — O(1) average
        freq.put("apple",  5);
        freq.put("banana", 3);
        freq.put("cherry", 8);
        freq.merge("apple", 1, Integer::sum); // update: apple → 6

        System.out.println("Map: " + freq);

        // SEARCH — O(1) average
        System.out.println("apple: " + freq.get("apple"));
        System.out.println("grape: " + freq.getOrDefault("grape", 0));

        // DELETE — O(1) average
        freq.remove("banana");

        // ITERATE
        for (Map.Entry<String,Integer> e : freq.entrySet())
            System.out.println(e.getKey() + " -> " + e.getValue());

        System.out.println("Size: " + freq.size());
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SIZE 7

typedef struct Node {
    char* key; int value; struct Node* next;
} Node;
Node* table[SIZE];

int hash(const char* key) {
    int h = 0;
    for (int i = 0; key[i]; i++) h = (h + key[i]) % SIZE;
    return h;
}

void put(const char* key, int val) {
    int idx = hash(key);
    Node* cur = table[idx];
    while (cur) {
        if (!strcmp(cur->key, key)) { cur->value = val; return; }
        cur = cur->next;
    }
    Node* n = (Node*)malloc(sizeof(Node));
    n->key = strdup(key); n->value = val; n->next = table[idx]; table[idx] = n;
}

int get(const char* key) {
    int idx = hash(key);
    Node* cur = table[idx];
    while (cur) { if (!strcmp(cur->key, key)) return cur->value; cur = cur->next; }
    return -1;
}

int main() {
    put("apple", 5); put("banana", 3); put("cherry", 8);
    printf("apple: %d\\n", get("apple"));
    printf("banana: %d\\n", get("banana"));
    return 0;
}`,
    javascript: `// JavaScript Map — built-in hash map
const freq = new Map();

// INSERT / UPDATE — O(1) average
freq.set("apple",  5);
freq.set("banana", 3);
freq.set("cherry", 8);
freq.set("apple", (freq.get("apple") || 0) + 1); // update → 6

console.log("Map size:", freq.size);

// SEARCH — O(1) average
console.log("apple:", freq.get("apple"));           // 6
console.log("grape:", freq.get("grape") ?? 0);      // 0

// DELETE — O(1) average
freq.delete("banana");

// ITERATE
for (const [k, v] of freq) {
    console.log(\`  \${k} -> \${v}\`);
}

// Frequency counter pattern
const words = ["hi","bye","hi","hello","bye","hi"];
const counter = new Map();
words.forEach(w => counter.set(w, (counter.get(w)||0)+1));
console.log("Word frequencies:", [...counter.entries()]);`,
  },
};

let codeEditor,
  currentLang = "cpp";
const langModes = {
  cpp: "text/x-c++src",
  python: "text/x-python",
  java: "text/x-java",
  c: "text/x-csrc",
  javascript: "text/javascript",
};
const langNames = {
  cpp: "C++",
  python: "Python",
  java: "Java",
  c: "C",
  javascript: "JavaScript",
};
function getCMTheme(t) {
  return t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean";
}

function updateCodeEditor() {
  if (!codeEditor) return;
  const tmpl = codeTemplates[currentType] || codeTemplates.hashset;
  codeEditor.setValue(tmpl[currentLang] || tmpl.cpp);
}

function initEditor() {
  const t = document.body.getAttribute("data-theme") || "dark";
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: langModes.cpp,
    theme: getCMTheme(t),
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });
  updateCodeEditor();
}

document.querySelectorAll(".lang-tab-btn").forEach((btn) => {
  btn.onclick = () => {
    document
      .querySelectorAll(".lang-tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    document.getElementById("langDisplay").textContent = langNames[currentLang];
    codeEditor.setOption("mode", langModes[currentLang]);
    updateCodeEditor();
  };
});

function copyEditorCode() {
  navigator.clipboard.writeText(codeEditor.getValue()).catch(() => {});
  const btn = document.querySelector(".code-copy-btn");
  btn.textContent = "✓";
  btn.style.background = "var(--primary-green)";
  setTimeout(() => {
    btn.textContent = "Copy";
    btn.style.background = "var(--primary-purple)";
  }, 2000);
}

function runCode() {
  const out = document.getElementById("codeOutput");
  out.innerHTML = '<span style="color:#fbbf24">🔄 Simulating...</span><br><br>';
  const type = currentType === "hashset" ? "Hash Set" : "Hash Map";
  const lang = langNames[currentLang];
  out.innerHTML += `<span style="color:#06b6d4">${type} — ${lang}</span><br><br>`;
  if (currentType === "hashset") {
    out.innerHTML +=
      '<span style="color:#10b981">add("apple") → inserted</span><br>';
    out.innerHTML +=
      '<span style="color:#10b981">add("banana") → inserted</span><br>';
    out.innerHTML +=
      '<span style="color:#10b981">add("cherry") → inserted</span><br>';
    out.innerHTML +=
      '<span style="color:#10b981">add("apple") → duplicate ignored</span><br><br>';
    out.innerHTML += '<span style="color:#a0a0a0">Set size: 3</span><br>';
    out.innerHTML +=
      '<span style="color:#a0a0a0">Contains banana: true</span><br>';
    out.innerHTML +=
      '<span style="color:#a0a0a0">After delete banana, size: 2</span><br>';
    out.innerHTML +=
      '<span style="color:#a0a0a0">Elements: apple cherry</span><br>';
  } else {
    out.innerHTML +=
      '<span style="color:#10b981">put("apple", 5) → inserted</span><br>';
    out.innerHTML +=
      '<span style="color:#10b981">put("banana", 3) → inserted</span><br>';
    out.innerHTML +=
      '<span style="color:#10b981">put("cherry", 8) → inserted</span><br>';
    out.innerHTML +=
      '<span style="color:#10b981">apple updated → 6</span><br><br>';
    out.innerHTML +=
      '<span style="color:#a0a0a0">Map: {apple:6, banana:3, cherry:8}</span><br>';
    out.innerHTML += '<span style="color:#a0a0a0">apple: 6</span><br>';
    out.innerHTML +=
      '<span style="color:#a0a0a0">grape: 0 (default)</span><br>';
    out.innerHTML +=
      '<span style="color:#a0a0a0">After delete banana:</span><br>';
    out.innerHTML += '<span style="color:#a0a0a0">  apple -> 6</span><br>';
    out.innerHTML += '<span style="color:#a0a0a0">  cherry -> 8</span><br>';
  }
  out.innerHTML +=
    '<br><span style="color:#10b981">✓ Execution complete</span>';
}

const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};
const themes = ["dark", "light", "blue"];

document.getElementById("themeToggle").onclick = () => {
  const cur = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(cur) + 1) % 3];
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
  document.getElementById("themeIcon").innerHTML = themeIcons[next];
  if (codeEditor) codeEditor.setOption("theme", getCMTheme(next));
};

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
let mobileOpen = false;
menuToggle.addEventListener("click", () => {
  mobileOpen = !mobileOpen;
  mobileNav.classList.toggle("open", mobileOpen);
});
document.addEventListener("click", (e) => {
  if (
    mobileOpen &&
    !mobileNav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    mobileOpen = false;
    mobileNav.classList.remove("open");
  }
});

const ALGO = "hashing",
  L2K = `${ALGO}_l2_unlocked`,
  L3K = `${ALGO}_l3_unlocked`;
const modal = document.getElementById("quizModal"),
  modalMsg = document.getElementById("modalMsg");
const startQuiz = document.getElementById("startQuiz"),
  cancelBtn = document.getElementById("cancelBtn");

function updateLevels() {
  const l3 = localStorage.getItem(L3K) === "true";
  const btnL3 = document.getElementById("l3");
  if (l3) {
    btnL3.style.borderColor = "var(--primary-green)";
    btnL3.style.background = "rgba(16,185,129,.15)";
    btnL3.style.color = "var(--primary-green)";
  }
}

document.getElementById("l3").onclick = () => {
  const l3 = localStorage.getItem(L3K) === "true";
  if (l3) {
    window.location.href = "hashing_l3.html";
    return;
  }
  modalMsg.textContent =
    "Pass the Level 2 Quiz to unlock Level 3 and complete your Hashing journey.";
  startQuiz.onclick = () => (window.location.href = "quiz.html?id=hashing-l2");
  modal.style.display = "flex";
};
cancelBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

/* INIT */
window.onload = () => {
  const saved = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", saved);
  document.getElementById("themeIcon").innerHTML = themeIcons[saved];
  initEditor();
  // Main table seed
  const seeds =
    currentType === "hashset"
      ? [{ key: "apple" }, { key: "mango" }, { key: "rice" }]
      : [
          { key: "apple", val: "5" },
          { key: "mango", val: "3" },
          { key: "rice", val: "8" },
        ];
  seeds.forEach((s) => {
    mainTable[hashKey(s.key)].push(s);
  });
  renderMainTable();
  // Scenarios
  initBest();
  initAvg();
  initWorst();
  initCustom();
  updateLevels();
  // show map val input if hashmap
  const mv = document.getElementById("mapValInput");
  if (mv && currentType === "hashmap") mv.style.display = "block";
};
