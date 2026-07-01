
let currentType = "singly"; // singly | doubly | circular
let currentLang = "cpp";
let codeEditor;
let vizList = [10, 20, 30]; // main visualizer list
let currentInputResolver = null;

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
];



const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};
const applyTheme = (t) => {
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIcon").innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
  if (window.syncThemeToServer) window.syncThemeToServer(t);
  if (codeEditor) codeEditor.setOption("theme", getCMTheme(t));
};
document.getElementById("themeToggle").onclick = () => {
  const cur = document.body.getAttribute("data-theme") || "dark";
  applyTheme(themes[(themes.indexOf(cur) + 1) % 3]);
};
const getCMTheme = (t) =>
  t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean";

/*   Hamburger   */
document.getElementById("hamburger").onclick = () =>
  document.getElementById("mobileMenu").classList.toggle("open");

// LL RENDER HELPERS

function makeNodeEl(val, idx, isHead, isTail, type) {
  const wrap = document.createElement("div");
  wrap.className = "ll-node-wrap";

  if (isHead) {
    const hl = document.createElement("div");
    hl.className = "ll-head-label";
    hl.textContent = "HEAD";
    wrap.appendChild(hl);
  } else {
    // spacer
    const sp = document.createElement("div");
    sp.style.height = "18px";
    wrap.appendChild(sp);
  }

  const nodeEl = document.createElement("div");
  nodeEl.className = "ll-node";

  const box = document.createElement("div");
  box.className = "ll-node-box";

  if (type === "doubly") {
    const prev = document.createElement("div");
    prev.className = "ll-node-ptr";
    prev.title = "prev";
    prev.textContent = isHead ? "N" : "←";
    prev.style.background = "rgba(245,158,11,.2)";
    prev.style.color = "#f59e0b";
    box.appendChild(prev);
  }

  const data = document.createElement("div");
  data.className = "ll-node-data";
  data.textContent = val;
  data.style.background = COLORS[idx % COLORS.length];
  box.appendChild(data);

  const nxt = document.createElement("div");
  nxt.className = "ll-node-ptr";
  nxt.textContent = type === "circular" && isTail ? "↩" : isTail ? "N" : "→";
  nxt.style.color =
    type === "circular" && isTail ? "#10b981" : isTail ? "#ef4444" : "#06b6d4";
  box.appendChild(nxt);

  nodeEl.appendChild(box);
  wrap.appendChild(nodeEl);
  return wrap;
}

function renderLL(containerEl, data, type, highlightIdx = -1) {
  containerEl.innerHTML = "";
  if (!data.length) {
    const empty = document.createElement("div");
    empty.style.cssText =
      'color:var(--text-secondary);font-family:"JetBrains Mono",monospace;font-size:.85rem;';
    empty.textContent = "[ empty list ]";
    containerEl.appendChild(empty);
    return;
  }

  data.forEach((val, i) => {
    const isHead = i === 0;
    const isTail = i === data.length - 1;
    const nodeWrap = makeNodeEl(val, i, isHead, isTail, type);
    const dataEl = nodeWrap.querySelector(".ll-node-data");
    if (i === highlightIdx) dataEl.classList.add("highlight");

    containerEl.appendChild(nodeWrap);

    // arrow between nodes
    if (!isTail) {
      const arrowWrap = document.createElement("div");
      arrowWrap.className = "ll-arrow-wrap";
      arrowWrap.style.flexDirection = "column";
      arrowWrap.style.alignItems = "center";
      arrowWrap.style.paddingTop = "18px";

      const fwd = document.createElement("span");
      fwd.className = "ll-arrow-fwd";
      fwd.textContent = "→";
      arrowWrap.appendChild(fwd);

      if (type === "doubly") {
        const bwd = document.createElement("span");
        bwd.className = "ll-arrow-bwd";
        bwd.textContent = "←";
        arrowWrap.appendChild(bwd);
      }
      containerEl.appendChild(arrowWrap);
    }

    // circular arc badge at end
    if (isTail && type === "circular") {
      const badge = document.createElement("div");
      badge.className = "circular-badge";
      badge.style.marginLeft = "8px";
      badge.style.marginTop = "18px";
      badge.textContent = "↩ HEAD";
      containerEl.appendChild(badge);
    }

    // NULL badge at end of singly/doubly
    if (isTail && type !== "circular") {
      const arrowWrap = document.createElement("div");
      arrowWrap.className = "ll-arrow-wrap";
      arrowWrap.style.paddingTop = "18px";
      const fwd = document.createElement("span");
      fwd.className = "ll-arrow-fwd";
      fwd.textContent = "→";
      arrowWrap.appendChild(fwd);
      containerEl.appendChild(arrowWrap);
      const nb = document.createElement("div");
      nb.className = "ll-null-badge";
      nb.style.marginTop = "18px";
      nb.textContent = "NULL";
      containerEl.appendChild(nb);
    }
  });
}

/*   Main visualizer render   */
function renderViz() {
  renderLL(document.getElementById("ll-canvas"), vizList, currentType);
}

function showMsg(txt, type) {
  const el = document.getElementById("ll-msg");
  el.style.display = "block";
  el.className = "alert-" + type;
  el.innerHTML = txt;
  setTimeout(() => (el.style.display = "none"), 3000);
}

// PSEUDO-CODE TEXT per type

const pseudoData = {
  singly: {
    "insert-head": "newNode.next = head\nhead = newNode",
    "insert-tail":
      "ptr = head\nwhile ptr.next ≠ NULL:\n  ptr = ptr.next\nptr.next = newNode",
    delete:
      "if head.data == key:\n  head = head.next\nelse:\n  prev.next = curr.next",
    search:
      "ptr = head\nwhile ptr ≠ NULL:\n  if ptr.data == key: return ptr\n  ptr = ptr.next",
    traverse:
      "ptr = head\nwhile ptr ≠ NULL:\n  visit ptr.data\n  ptr = ptr.next",
  },
  doubly: {
    "insert-head":
      "newNode.next = head\nif head: head.prev = newNode\nhead = newNode",
    "insert-tail":
      "ptr = head\nwhile ptr.next ≠ NULL: ptr = ptr.next\nptr.next = newNode\nnewNode.prev = ptr",
    delete:
      "if node.prev: node.prev.next = node.next\nif node.next: node.next.prev = node.prev",
    search:
      "ptr = head\nwhile ptr:\n  if ptr.data == key: return ptr\n  ptr = ptr.next",
    traverse:
      "fwd: ptr = head → while ptr: ptr = ptr.next\nbwd: ptr = tail → while ptr: ptr = ptr.prev",
  },
  circular: {
    "insert-head": "newNode.next = head\ntail.next = newNode\nhead = newNode",
    "insert-tail": "tail.next = newNode\nnewNode.next = head\ntail = newNode",
    delete:
      "prev.next = curr.next\nif curr == head: head = head.next\nif curr == tail: tail = prev",
    search:
      "ptr = head\ndo:\n  if ptr.data == key: found\n  ptr = ptr.next\nwhile ptr ≠ head",
    traverse:
      "ptr = head\ndo:\n  visit ptr.data\n  ptr = ptr.next\nwhile ptr ≠ head",
  },
};

function updatePseudo() {
  const d = pseudoData[currentType];
  document.getElementById("ps-insert-head").innerHTML = d[
    "insert-head"
  ].replace(/\n/g, "<br>");
  document.getElementById("ps-insert-tail").innerHTML = d[
    "insert-tail"
  ].replace(/\n/g, "<br>");
  document.getElementById("ps-delete").innerHTML = d["delete"].replace(
    /\n/g,
    "<br>",
  );
  document.getElementById("ps-search").innerHTML = d["search"].replace(
    /\n/g,
    "<br>",
  );
  document.getElementById("ps-traverse").innerHTML = d["traverse"].replace(
    /\n/g,
    "<br>",
  );
}

function highlightPS(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`.pseudo-step[data-step="${step}"]`);
  if (el) el.classList.add("active");
}

//  TYPE SWITCH — updates everything

const typeLabels = {
  singly: "Singly Linked List",
  doubly: "Doubly Linked List",
  circular: "Circular Linked List",
};
const vizTitles = {
  singly: "Linked List Visualizer — Singly",
  doubly: "Linked List Visualizer — Doubly",
  circular: "Linked List Visualizer — Circular",
};

function switchType(type) {
  currentType = type;
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  document.getElementById("viz-title").textContent = vizTitles[type];
  document.getElementById("scenario-type-name").textContent = typeLabels[type];

  // Update pseudo-code
  updatePseudo();

  // Update complexity cards
  updateComplexityCards();

  // Update scenario descriptions
  updateScenarioDesc();

  // Re-render visualizer
  vizList = [10, 20, 30];
  renderViz();

  // Re-init scenarios
  resetBest();
  resetAvg();
  resetWorst();
  resetCustom();

  // Update code editor
  if (codeEditor)
    codeEditor.setValue(
      codeTemplates[currentType][currentLang] || "// Not implemented",
    );
}

function updateComplexityCards() {
  const deleteTime = currentType === "doubly" ? "O(1)*" : "O(n)";
  const deleteReason =
    currentType === "doubly"
      ? "With prev pointer: O(1) if node known, O(n) to find it"
      : "Must find node via linear scan first";
  const searchReason =
    currentType === "circular"
      ? "Circular traversal — stops when back at head"
      : "Linear scan from head to NULL";

  document.getElementById("cc-delete-time").textContent = deleteTime;
  document.getElementById("cc-delete-reason").textContent = deleteReason;
  document.getElementById("cc-search-reason").textContent = searchReason;
}

function updateScenarioDesc() {
  const descs = {
    singly: {
      best: [
        "Best Case",
        'Insert at head — always <strong style="color:var(--primary-green)">O(1)</strong>. Redirect head pointer, done.',
      ],
      avg: [
        "Average Case",
        "Search for a node at mid-list — traverse ~N/2 nodes. O(N) average.",
      ],
      worst: [
        "Worst Case",
        "Insert at tail or search for non-existent element — traverse all N nodes. O(N).",
      ],
      extra: "👁 Peek Head",
    },
    doubly: {
      best: [
        "Best Case",
        "Insert at head or tail — O(1) with tail pointer. Both ends accessible directly.",
      ],
      avg: [
        "Average Case",
        "Delete a node in the middle — O(n) to find, O(1) to unlink (thanks to prev ptr).",
      ],
      worst: [
        "Worst Case",
        "Search element not in list — traverse all N nodes forward and confirm not found.",
      ],
      extra: "↩ Traverse Back",
    },
    circular: {
      best: [
        "Best Case",
        "Insert at head or tail — O(1). Tail's next always points to head, just relink.",
      ],
      avg: [
        "Average Case",
        "Search element at mid-list — traverse ~N/2 steps. O(N) average.",
      ],
      worst: [
        "Worst Case",
        "Element absent — must traverse full circle back to head. O(N).",
      ],
      extra: "🔄 Full Circle",
    },
  };
  const d = descs[currentType];
  document.getElementById("best-title").textContent = d.best[0];
  document.getElementById("best-desc").innerHTML = d.best[1];
  document.getElementById("avg-title").textContent = d.avg[0];
  document.getElementById("avg-desc").innerHTML = d.avg[1];
  document.getElementById("worst-title").textContent = d.worst[0];
  document.getElementById("worst-desc").innerHTML = d.worst[1];
  document.getElementById("best-extra-btn").textContent = d.extra;
  document.getElementById("custom-desc").textContent =
    `Build your own ${typeLabels[currentType]}. Operations and complexity reflect this type.`;
}

// MAIN VISUALIZER OPERATIONS

function vizInsertHead() {
  const val = document.getElementById("ll-input").value.trim();
  if (!val) return;
  highlightPS("insert-head");
  vizList.unshift(isNaN(val) ? val : Number(val));
  renderViz();
  showMsg(`Inserted <b>${val}</b> at head`, "success");
  document.getElementById("ll-input").value = "";
}
function vizInsertTail() {
  const val = document.getElementById("ll-input").value.trim();
  if (!val) return;
  highlightPS("insert-tail");
  vizList.push(isNaN(val) ? val : Number(val));
  renderViz();
  showMsg(`Inserted <b>${val}</b> at tail`, "success");
  document.getElementById("ll-input").value = "";
}
function vizDeleteHead() {
  if (!vizList.length) {
    showMsg("List is empty!", "danger");
    return;
  }
  highlightPS("delete");
  const removed = vizList.shift();
  renderViz();
  showMsg(`Deleted head: <b>${removed}</b>`, "danger");
}
async function vizSearch() {
  const val = document.getElementById("ll-input").value.trim();
  if (!val) return;
  highlightPS("search");
  const target = isNaN(val) ? val : Number(val);
  const idx = vizList.indexOf(target);
  const canvas = document.getElementById("ll-canvas");
  for (let i = 0; i <= (idx === -1 ? vizList.length - 1 : idx); i++) {
    renderLL(canvas, vizList, currentType, i);
    await sleep(500);
  }
  if (idx === -1) showMsg(`<b>${val}</b> not found in list`, "danger");
  else showMsg(`Found <b>${val}</b> at position ${idx}`, "success");
  await sleep(600);
  renderViz();
}
async function vizTraverse() {
  highlightPS("traverse");
  const canvas = document.getElementById("ll-canvas");
  for (let i = 0; i < vizList.length; i++) {
    renderLL(canvas, vizList, currentType, i);
    await sleep(500);
  }
  showMsg(`Traversal complete — visited ${vizList.length} nodes`, "info");
  await sleep(600);
  renderViz();
}

// SCENARIO TABS

const TAB_CLASS = {
  best: "active-best",
  avg: "active-avg",
  worst: "active-worst",
  custom: "active-custom",
};
function switchScenario(name) {
  document
    .querySelectorAll(".scenario-tab")
    .forEach((t) => (t.className = "scenario-tab"));
  document.getElementById("stab-" + name).classList.add(TAB_CLASS[name]);
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}

// SCENARIO: BEST

let bestList = [10, 20, 30];
let bestColorIdx = 3;

function initBest() {
  renderLL(document.getElementById("scene-best"), bestList, currentType);
  const log = document.getElementById("log-best");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog(log, `List: [${bestList.join(", ")}]`, "log-info");
  addLog(log, `Type: ${typeLabels[currentType]}`, "log-info");
  addLog(log, "Insert at head = O(1)", "log-info");
}
function bestInsert() {
  const val = Math.floor(Math.random() * 90) + 10;
  bestList.unshift(val);
  renderLL(document.getElementById("scene-best"), bestList, currentType);
  addLog(
    document.getElementById("log-best"),
    `insertHead(${val}) → O(1)`,
    "log-insert",
  );
  addLog(
    document.getElementById("log-best"),
    "✓ Constant time — no traversal",
    "log-result",
  );
}
function bestDelete() {
  if (!bestList.length) {
    addLog(document.getElementById("log-best"), "List empty!", "log-warn");
    return;
  }
  const val = bestList.shift();
  renderLL(document.getElementById("scene-best"), bestList, currentType);
  addLog(
    document.getElementById("log-best"),
    `deleteHead() → removed ${val}`,
    "log-delete",
  );
  addLog(
    document.getElementById("log-best"),
    "✓ O(1) — direct head redirect",
    "log-result",
  );
}
function bestExtra() {
  if (!bestList.length) {
    addLog(document.getElementById("log-best"), "List empty!", "log-warn");
    return;
  }
  const log = document.getElementById("log-best");
  if (currentType === "doubly") {
    addLog(
      log,
      `Traverse backward: [${[...bestList].reverse().join(" ← ")}]`,
      "log-search",
    );
    addLog(log, "✓ Doubly LL enables O(n) backward traversal", "log-result");
  } else if (currentType === "circular") {
    addLog(log, `Full circle: [${bestList.join(" → ")} → HEAD]`, "log-search");
    addLog(log, "✓ Circular: tail.next always points to head", "log-result");
  } else {
    addLog(log, `Peek head = ${bestList[0]}`, "log-search");
    addLog(log, "✓ O(1) — direct head pointer read", "log-result");
  }
}
function resetBest() {
  bestList = [10, 20, 30];
  bestColorIdx = 3;
  initBest();
}

// SCENARIO: AVERAGE

const AVG_DATA_MAP = {
  singly: [10, 20, 30, 40, 50],
  doubly: [10, 20, 30, 40, 50],
  circular: [10, 20, 30, 40, 50],
};
const AVG_TARGET_MAP = { singly: 30, doubly: 30, circular: 30 };
let avgList = [];
let avgIdx = 0;
let avgTarget = 30;
let avgFound = false;
let avgAutoTimer = null;

function initAvg() {
  avgList = [...AVG_DATA_MAP[currentType]];
  avgTarget = AVG_TARGET_MAP[currentType];
  avgIdx = 0;
  avgFound = false;
  clearTimeout(avgAutoTimer);
  document.getElementById("avg-target-label").textContent = avgTarget;
  renderLL(document.getElementById("scene-avg"), avgList, currentType);
  const log = document.getElementById("log-avg");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog(log, `List: [${avgList.join(", ")}]`, "log-info");
  addLog(log, `Searching for: ${avgTarget}`, "log-info");
  addLog(
    log,
    `Expected: ~${Math.ceil(avgList.length / 2)} steps (avg case)`,
    "log-info",
  );
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}
function avgStep() {
  if (avgFound || avgIdx >= avgList.length) return;
  const log = document.getElementById("log-avg");
  const val = avgList[avgIdx];
  renderLL(document.getElementById("scene-avg"), avgList, currentType, avgIdx);
  addLog(
    log,
    `Step ${avgIdx + 1}: Check node[${avgIdx}] = ${val}`,
    "log-search",
  );
  if (val === avgTarget) {
    avgFound = true;
    addLog(log, `FOUND ${avgTarget} at index ${avgIdx} 🎉`, "log-insert");
    addLog(
      log,
      `Steps: ${avgIdx + 1} ≈ N/2 = ${Math.ceil(avgList.length / 2)} → O(N) avg`,
      "log-result",
    );
    document.getElementById("avg-step-btn").disabled = true;
    document.getElementById("avg-auto-btn").disabled = true;
    clearTimeout(avgAutoTimer);
  } else {
    addLog(log, `${val} ≠ ${avgTarget}, move to next`, "log-search");
    avgIdx++;
    if (avgIdx >= avgList.length) {
      addLog(log, "End of list — not found", "log-warn");
      document.getElementById("avg-step-btn").disabled = true;
    }
  }
}
function avgAuto() {
  if (avgFound || avgIdx >= avgList.length) return;
  document.getElementById("avg-auto-btn").disabled = true;
  const doStep = () => {
    if (avgFound || avgIdx >= avgList.length) return;
    avgStep();
    avgAutoTimer = setTimeout(doStep, 850);
  };
  doStep();
}
function resetAvg() {
  clearTimeout(avgAutoTimer);
  initAvg();
}

// SCENARIO: WORST

const WORST_DATA = [10, 20, 30, 40, 50, 60];
let worstIdx = 0;
let worstDone = false;
let worstAutoTimer = null;

function initWorst() {
  worstIdx = 0;
  worstDone = false;
  clearTimeout(worstAutoTimer);
  renderLL(document.getElementById("scene-worst"), WORST_DATA, currentType);
  const log = document.getElementById("log-worst");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  const worstLabel =
    currentType === "circular" ? "back to HEAD" : "tail / absent element";
  document.getElementById("worst-target-label").textContent = worstLabel;
  addLog(log, `List: [${WORST_DATA.join(", ")}]`, "log-info");
  const goal =
    currentType === "circular"
      ? "Traverse full circle — O(N)"
      : "Search element 99 (absent) — traverse all N nodes";
  addLog(log, goal, "log-warn");
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}
function worstStep() {
  if (worstDone || worstIdx >= WORST_DATA.length) return;
  const log = document.getElementById("log-worst");
  renderLL(
    document.getElementById("scene-worst"),
    WORST_DATA,
    currentType,
    worstIdx,
  );
  addLog(
    log,
    `Visit node[${worstIdx}] = ${WORST_DATA[worstIdx]}`,
    "log-delete",
  );
  worstIdx++;
  if (worstIdx >= WORST_DATA.length) {
    worstDone = true;
    const msg =
      currentType === "circular"
        ? `Full circle complete — back at HEAD. Visited all ${WORST_DATA.length} nodes.`
        : `99 not found. Visited all ${WORST_DATA.length} nodes → O(N) worst case ❌`;
    setTimeout(() => addLog(log, msg, "log-result"), 200);
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
    clearTimeout(worstAutoTimer);
  }
}
function worstAuto() {
  if (worstDone || worstIdx >= WORST_DATA.length) return;
  document.getElementById("worst-auto-btn").disabled = true;
  const doStep = () => {
    if (worstDone || worstIdx >= WORST_DATA.length) return;
    worstStep();
    worstAutoTimer = setTimeout(doStep, 700);
  };
  doStep();
}
function resetWorst() {
  clearTimeout(worstAutoTimer);
  initWorst();
}

//SCENARIO: CUSTOM

let customList = [];
let customColorIdxC = 0;
const MAX_CUSTOM = 8;

function initCustom() {
  customList = [];
  customColorIdxC = 0;
  renderLL(document.getElementById("scene-custom"), customList, currentType);
  const log = document.getElementById("log-custom");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog(log, `${typeLabels[currentType]} ready. Build your list!`, "log-info");
}

let ccTimer = null;
function highlightCC(type) {
  ["insert", "delete", "search"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
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
function showToast(type, msg) {
  const t = document.getElementById("cc-toast");
  const icons = { insert: "⬆", delete: "✖", search: "🔍", warn: "⚠" };
  document.getElementById("cc-toast-icon").textContent = icons[type] || "⚡";
  document.getElementById("cc-toast-text").textContent = msg;
  t.className = "cc-toast show toast-" + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => (t.className = "cc-toast"), 2400);
}

function customInsertHead() {
  const input = document.getElementById("custom-val");
  const raw = input.value.trim();
  if (raw === "" || isNaN(raw)) {
    showToast("warn", "Enter a valid number!");
    return;
  }
  if (customList.length >= MAX_CUSTOM) {
    showToast("warn", "Max 8 nodes!");
    return;
  }
  const val = Number(raw);
  customList.unshift(val);
  renderLL(document.getElementById("scene-custom"), customList, currentType);
  highlightCC("insert");
  showToast("insert", `insertHead(${val}) → Time: O(1)`);
  addLog(
    document.getElementById("log-custom"),
    `insertHead(${val}) → O(1)`,
    "log-insert",
  );
  addLog(
    document.getElementById("log-custom"),
    "✓ Time: O(1) — no traversal needed",
    "log-result",
  );
  input.value = "";
}
function customInsertTail() {
  const input = document.getElementById("custom-val");
  const raw = input.value.trim();
  if (raw === "" || isNaN(raw)) {
    showToast("warn", "Enter a valid number!");
    return;
  }
  if (customList.length >= MAX_CUSTOM) {
    showToast("warn", "Max 8 nodes!");
    return;
  }
  const val = Number(raw);
  customList.push(val);
  renderLL(document.getElementById("scene-custom"), customList, currentType);
  highlightCC("insert");
  const t =
    currentType === "circular"
      ? "O(1) — tail ptr maintained"
      : "O(n) — traverse to tail";
  showToast("insert", `insertTail(${val}) → ${t}`);
  addLog(
    document.getElementById("log-custom"),
    `insertTail(${val})`,
    "log-insert",
  );
  addLog(document.getElementById("log-custom"), `✓ ${t}`, "log-result");
  input.value = "";
}
function customDeleteHead() {
  if (!customList.length) {
    showToast("warn", "List is empty!");
    return;
  }
  const val = customList.shift();
  renderLL(document.getElementById("scene-custom"), customList, currentType);
  highlightCC("delete");
  showToast("delete", `deleteHead() → Time: O(1)`);
  addLog(
    document.getElementById("log-custom"),
    `deleteHead() → removed ${val}`,
    "log-delete",
  );
  addLog(document.getElementById("log-custom"), "✓ Time: O(1)", "log-result");
}
async function customSearch() {
  const input = document.getElementById("custom-val");
  const raw = input.value.trim();
  if (raw === "" || isNaN(raw)) {
    showToast("warn", "Enter a value to search!");
    return;
  }
  const val = Number(raw);
  highlightCC("search");
  showToast("search", `search(${val}) → Time: O(n)`);
  const log = document.getElementById("log-custom");
  addLog(log, `search(${val}) — scanning...`, "log-search");
  const scene = document.getElementById("scene-custom");
  let found = false;
  for (let i = 0; i < customList.length; i++) {
    renderLL(scene, customList, currentType, i);
    await sleep(450);
    if (customList[i] === val) {
      found = true;
      addLog(log, `Found ${val} at index ${i} 🎉`, "log-insert");
      break;
    }
  }
  if (!found) addLog(log, `${val} not found in list`, "log-warn");
  await sleep(700);
  renderLL(scene, customList, currentType);
  addLog(log, `✓ Time: O(n) — linear scan`, "log-result");
}
function resetCustom() {
  ["insert", "delete", "search"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c) c.classList.remove("cc-active-" + t);
  });
  document.getElementById("cc-toast").className = "cc-toast";
  initCustom();
  addLog(document.getElementById("log-custom"), "↺ List cleared.", "log-info");
}
document.getElementById("custom-val").addEventListener("keydown", (e) => {
  if (e.key === "Enter") customInsertHead();
});

//  HELPERS

function addLog(logEl, text, cls = "log-info") {
  const e = document.createElement("div");
  e.className = "log-entry " + cls;
  e.textContent = "> " + text;
  logEl.appendChild(e);
  logEl.scrollTop = logEl.scrollHeight;
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// CODE TEMPLATES

const codeTemplates = {
  singly: {
    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

class SinglyLL {
    Node* head = nullptr;
public:
    void insertHead(int val) {
        Node* n = new Node{val, head};
        head = n;
        cout << "Inserted " << val << " at head\\n";
    }
    void insertTail(int val) {
        Node* n = new Node{val, nullptr};
        if (!head) { head = n; return; }
        Node* ptr = head;
        while (ptr->next) ptr = ptr->next;
        ptr->next = n;
        cout << "Inserted " << val << " at tail\\n";
    }
    void deleteHead() {
        if (!head) { cout << "List empty\\n"; return; }
        Node* tmp = head;
        head = head->next;
        cout << "Deleted: " << tmp->data << "\\n";
        delete tmp;
    }
    bool search(int key) {
        Node* ptr = head;
        int idx = 0;
        while (ptr) {
            if (ptr->data == key) {
                cout << key << " found at index " << idx << "\\n";
                return true;
            }
            ptr = ptr->next; idx++;
        }
        cout << key << " not found\\n"; return false;
    }
    void print() {
        Node* ptr = head;
        while (ptr) { cout << ptr->data << " → "; ptr = ptr->next; }
        cout << "NULL\\n";
    }
};

int main() {
    SinglyLL ll;
    int n; cin >> n;
    for (int i = 0; i < n; i++) { int v; cin >> v; ll.insertTail(v); }
    ll.print();
    ll.deleteHead();
    ll.print();
    ll.search(20);
    return 0;
}`,
    python: `class Node:
    def __init__(self, val): self.data = val; self.next = None

class SinglyLL:
    def __init__(self): self.head = None

    def insert_head(self, val):
        n = Node(val); n.next = self.head; self.head = n
        print(f"Inserted {val} at head")

    def insert_tail(self, val):
        n = Node(val)
        if not self.head: self.head = n; return
        ptr = self.head
        while ptr.next: ptr = ptr.next
        ptr.next = n
        print(f"Inserted {val} at tail")

    def delete_head(self):
        if not self.head: print("List empty"); return
        val = self.head.data
        self.head = self.head.next
        print(f"Deleted: {val}")

    def search(self, key):
        ptr, idx = self.head, 0
        while ptr:
            if ptr.data == key: print(f"{key} at index {idx}"); return True
            ptr = ptr.next; idx += 1
        print(f"{key} not found"); return False

    def display(self):
        ptr = self.head; parts = []
        while ptr: parts.append(str(ptr.data)); ptr = ptr.next
        print(" → ".join(parts) + " → None")

ll = SinglyLL()
n = int(input("Enter count: "))
for i in range(n):
    v = int(input(f"Value {i+1}: "))
    ll.insert_tail(v)
ll.display()
ll.delete_head()
ll.display()
ll.search(20)`,
    java: `class SinglyLL {
    static class Node { int data; Node next; Node(int v){data=v;} }
    Node head;

    void insertHead(int val) {
        Node n = new Node(val); n.next = head; head = n;
        System.out.println("Inserted " + val + " at head");
    }
    void insertTail(int val) {
        Node n = new Node(val);
        if (head == null) { head = n; return; }
        Node ptr = head;
        while (ptr.next != null) ptr = ptr.next;
        ptr.next = n;
        System.out.println("Inserted " + val + " at tail");
    }
    void deleteHead() {
        if (head == null) { System.out.println("Empty"); return; }
        System.out.println("Deleted: " + head.data);
        head = head.next;
    }
    boolean search(int key) {
        Node ptr = head; int idx = 0;
        while (ptr != null) {
            if (ptr.data == key) { System.out.println(key+" found at "+idx); return true; }
            ptr = ptr.next; idx++;
        }
        System.out.println(key+" not found"); return false;
    }
    void print() {
        Node ptr = head;
        while (ptr != null) { System.out.print(ptr.data+" → "); ptr = ptr.next; }
        System.out.println("null");
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node* next; } Node;
Node* head = NULL;

void insertHead(int val) {
    Node* n = malloc(sizeof(Node));
    n->data = val; n->next = head; head = n;
    printf("Inserted %d at head\\n", val);
}
void insertTail(int val) {
    Node* n = malloc(sizeof(Node));
    n->data = val; n->next = NULL;
    if (!head) { head = n; return; }
    Node* ptr = head;
    while (ptr->next) ptr = ptr->next;
    ptr->next = n;
    printf("Inserted %d at tail\\n", val);
}
void deleteHead() {
    if (!head) { printf("Empty\\n"); return; }
    Node* tmp = head; head = head->next;
    printf("Deleted: %d\\n", tmp->data);
    free(tmp);
}
void search(int key) {
    Node* ptr = head; int idx = 0;
    while (ptr) {
        if (ptr->data == key) { printf("%d at index %d\\n",key,idx); return; }
        ptr = ptr->next; idx++;
    }
    printf("%d not found\\n", key);
}
void print() {
    Node* ptr = head;
    while (ptr) { printf("%d → ", ptr->data); ptr = ptr->next; }
    printf("NULL\\n");
}
int main() {
    int n; scanf("%d",&n);
    for (int i=0;i<n;i++){int v;scanf("%d",&v);insertTail(v);}
    print(); deleteHead(); print(); search(20);
    return 0;
}`,
    javascript: `class Node { constructor(v){this.data=v;this.next=null;} }

class SinglyLL {
    constructor(){this.head=null;}
    insertHead(val){
        const n=new Node(val);n.next=this.head;this.head=n;
        console.log("Inserted "+val+" at head");
    }
    insertTail(val){
        const n=new Node(val);
        if(!this.head){this.head=n;return;}
        let ptr=this.head;
        while(ptr.next)ptr=ptr.next;
        ptr.next=n;
        console.log("Inserted "+val+" at tail");
    }
    deleteHead(){
        if(!this.head){console.log("Empty");return;}
        console.log("Deleted:",this.head.data);
        this.head=this.head.next;
    }
    search(key){
        let ptr=this.head,i=0;
        while(ptr){
            if(ptr.data===key){console.log(key+" at index "+i);return true;}
            ptr=ptr.next;i++;
        }
        console.log(key+" not found");return false;
    }
    print(){
        let ptr=this.head,r=[];
        while(ptr){r.push(ptr.data);ptr=ptr.next;}
        console.log(r.join(" → ")+" → null");
    }
}

const ll=new SinglyLL();
[10,20,30].forEach(v=>ll.insertTail(v));
ll.print(); ll.deleteHead(); ll.print(); ll.search(20);`,
  },

  doubly: {
    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node *prev, *next; };

class DoublyLL {
    Node *head = nullptr, *tail = nullptr;
public:
    void insertHead(int val) {
        Node* n = new Node{val, nullptr, head};
        if (head) head->prev = n;
        head = n;
        if (!tail) tail = n;
        cout << "Inserted " << val << " at head\\n";
    }
    void insertTail(int val) {
        Node* n = new Node{val, tail, nullptr};
        if (tail) tail->next = n;
        tail = n;
        if (!head) head = n;
        cout << "Inserted " << val << " at tail\\n";
    }
    void deleteHead() {
        if (!head) { cout << "Empty\\n"; return; }
        Node* tmp = head; head = head->next;
        if (head) head->prev = nullptr; else tail = nullptr;
        cout << "Deleted: " << tmp->data << "\\n";
        delete tmp;
    }
    void traverseFwd() {
        Node* ptr = head;
        while (ptr) { cout << ptr->data << " ⇆ "; ptr = ptr->next; }
        cout << "NULL\\n";
    }
    void traverseBwd() {
        Node* ptr = tail;
        while (ptr) { cout << ptr->data << " ← "; ptr = ptr->prev; }
        cout << "NULL\\n";
    }
};

int main() {
    DoublyLL ll;
    int n; cin >> n;
    for (int i=0;i<n;i++){int v;cin>>v;ll.insertTail(v);}
    cout << "Forward: "; ll.traverseFwd();
    cout << "Backward: "; ll.traverseBwd();
    ll.deleteHead();
    cout << "After delete: "; ll.traverseFwd();
    return 0;
}`,
    python: `class Node:
    def __init__(self, val): self.data = val; self.prev = None; self.next = None

class DoublyLL:
    def __init__(self): self.head = None; self.tail = None

    def insert_head(self, val):
        n = Node(val); n.next = self.head
        if self.head: self.head.prev = n
        self.head = n
        if not self.tail: self.tail = n
        print(f"Inserted {val} at head")

    def insert_tail(self, val):
        n = Node(val); n.prev = self.tail
        if self.tail: self.tail.next = n
        self.tail = n
        if not self.head: self.head = n
        print(f"Inserted {val} at tail")

    def delete_head(self):
        if not self.head: print("Empty"); return
        val = self.head.data
        self.head = self.head.next
        if self.head: self.head.prev = None
        else: self.tail = None
        print(f"Deleted: {val}")

    def traverse_fwd(self):
        ptr = self.head; parts = []
        while ptr: parts.append(str(ptr.data)); ptr = ptr.next
        print(" ⇆ ".join(parts) + " ⇆ None")

    def traverse_bwd(self):
        ptr = self.tail; parts = []
        while ptr: parts.append(str(ptr.data)); ptr = ptr.prev
        print(" ← ".join(parts) + " ← None")

ll = DoublyLL()
n = int(input("Count: "))
for i in range(n):
    v = int(input(f"Value {i+1}: "))
    ll.insert_tail(v)
print("Forward:"); ll.traverse_fwd()
print("Backward:"); ll.traverse_bwd()
ll.delete_head()
print("After delete:"); ll.traverse_fwd()`,
    java: `class DoublyLL {
    static class Node { int data; Node prev,next; Node(int v){data=v;} }
    Node head,tail;

    void insertHead(int val) {
        Node n=new Node(val); n.next=head;
        if(head!=null)head.prev=n; head=n;
        if(tail==null)tail=n;
        System.out.println("Inserted "+val+" at head");
    }
    void insertTail(int val) {
        Node n=new Node(val); n.prev=tail;
        if(tail!=null)tail.next=n; tail=n;
        if(head==null)head=n;
        System.out.println("Inserted "+val+" at tail");
    }
    void deleteHead() {
        if(head==null){System.out.println("Empty");return;}
        System.out.println("Deleted: "+head.data);
        head=head.next;
        if(head!=null)head.prev=null; else tail=null;
    }
    void traverseFwd() {
        Node ptr=head;
        while(ptr!=null){System.out.print(ptr.data+" ⇆ ");ptr=ptr.next;}
        System.out.println("null");
    }
    void traverseBwd() {
        Node ptr=tail;
        while(ptr!=null){System.out.print(ptr.data+" ← ");ptr=ptr.prev;}
        System.out.println("null");
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
typedef struct Node{int data;struct Node*prev,*next;}Node;
Node*head=NULL,*tail=NULL;
void insertTail(int val){
    Node*n=malloc(sizeof(Node));n->data=val;n->next=NULL;n->prev=tail;
    if(tail)tail->next=n; tail=n;
    if(!head)head=n;
    printf("Inserted %d at tail\\n",val);
}
void deleteHead(){
    if(!head){printf("Empty\\n");return;}
    Node*tmp=head;head=head->next;
    if(head)head->prev=NULL;else tail=NULL;
    printf("Deleted: %d\\n",tmp->data);free(tmp);
}
void traverseFwd(){
    Node*ptr=head;
    while(ptr){printf("%d ⇆ ",ptr->data);ptr=ptr->next;}
    printf("NULL\\n");
}
int main(){
    int n;scanf("%d",&n);
    for(int i=0;i<n;i++){int v;scanf("%d",&v);insertTail(v);}
    traverseFwd();deleteHead();traverseFwd();return 0;
}`,
    javascript: `class Node{constructor(v){this.data=v;this.prev=null;this.next=null;}}
class DoublyLL{
    constructor(){this.head=null;this.tail=null;}
    insertHead(val){
        const n=new Node(val);n.next=this.head;
        if(this.head)this.head.prev=n;this.head=n;
        if(!this.tail)this.tail=n;
        console.log("Inserted "+val+" at head");
    }
    insertTail(val){
        const n=new Node(val);n.prev=this.tail;
        if(this.tail)this.tail.next=n;this.tail=n;
        if(!this.head)this.head=n;
        console.log("Inserted "+val+" at tail");
    }
    deleteHead(){
        if(!this.head){console.log("Empty");return;}
        console.log("Deleted:",this.head.data);
        this.head=this.head.next;
        if(this.head)this.head.prev=null;else this.tail=null;
    }
    traverseFwd(){
        let p=this.head,r=[];while(p){r.push(p.data);p=p.next;}
        console.log(r.join(" ⇆ ")+" ⇆ null");
    }
    traverseBwd(){
        let p=this.tail,r=[];while(p){r.push(p.data);p=p.prev;}
        console.log(r.join(" ← ")+" ← null");
    }
}
const ll=new DoublyLL();
[10,20,30].forEach(v=>ll.insertTail(v));
ll.traverseFwd();ll.traverseBwd();
ll.deleteHead();ll.traverseFwd();`,
  },

  circular: {
    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

class CircularLL {
    Node* tail = nullptr;
public:
    void insert(int val) {
        Node* n = new Node{val, nullptr};
        if (!tail) { n->next = n; tail = n; }
        else { n->next = tail->next; tail->next = n; tail = n; }
        cout << "Inserted " << val << "\\n";
    }
    void deleteHead() {
        if (!tail) { cout << "Empty\\n"; return; }
        Node* head = tail->next;
        cout << "Deleted: " << head->data << "\\n";
        if (tail == head) { delete head; tail = nullptr; }
        else { tail->next = head->next; delete head; }
    }
    bool search(int key) {
        if (!tail) { cout << "Empty\\n"; return false; }
        Node* ptr = tail->next;
        do {
            if (ptr->data == key) { cout << key << " found\\n"; return true; }
            ptr = ptr->next;
        } while (ptr != tail->next);
        cout << key << " not found\\n"; return false;
    }
    void print() {
        if (!tail) { cout << "Empty\\n"; return; }
        Node* ptr = tail->next;
        do { cout << ptr->data << " → "; ptr = ptr->next; } while (ptr != tail->next);
        cout << "(back to HEAD)\\n";
    }
};

int main() {
    CircularLL ll;
    int n; cin >> n;
    for (int i=0;i<n;i++){int v;cin>>v;ll.insert(v);}
    ll.print(); ll.deleteHead(); ll.print(); ll.search(20);
    return 0;
}`,
    python: `class Node:
    def __init__(self, val): self.data = val; self.next = None

class CircularLL:
    def __init__(self): self.tail = None

    def insert(self, val):
        n = Node(val)
        if not self.tail: n.next = n; self.tail = n
        else: n.next = self.tail.next; self.tail.next = n; self.tail = n
        print(f"Inserted {val}")

    def delete_head(self):
        if not self.tail: print("Empty"); return
        head = self.tail.next
        print(f"Deleted: {head.data}")
        if self.tail == head: self.tail = None
        else: self.tail.next = head.next

    def search(self, key):
        if not self.tail: print("Empty"); return False
        ptr = self.tail.next
        while True:
            if ptr.data == key: print(f"{key} found"); return True
            ptr = ptr.next
            if ptr == self.tail.next: break
        print(f"{key} not found"); return False

    def display(self):
        if not self.tail: print("Empty"); return
        ptr = self.tail.next; parts = []
        while True:
            parts.append(str(ptr.data)); ptr = ptr.next
            if ptr == self.tail.next: break
        print(" → ".join(parts) + " → (HEAD)")

ll = CircularLL()
n = int(input("Count: "))
for i in range(n):
    v = int(input(f"Value {i+1}: "))
    ll.insert(v)
ll.display(); ll.delete_head(); ll.display(); ll.search(20)`,
    java: `class CircularLL {
    static class Node { int data; Node next; Node(int v){data=v;} }
    Node tail;

    void insert(int val) {
        Node n=new Node(val);
        if(tail==null){n.next=n;tail=n;}
        else{n.next=tail.next;tail.next=n;tail=n;}
        System.out.println("Inserted "+val);
    }
    void deleteHead() {
        if(tail==null){System.out.println("Empty");return;}
        Node head=tail.next;
        System.out.println("Deleted: "+head.data);
        if(tail==head)tail=null; else tail.next=head.next;
    }
    boolean search(int key) {
        if(tail==null){System.out.println("Empty");return false;}
        Node ptr=tail.next;
        do{
            if(ptr.data==key){System.out.println(key+" found");return true;}
            ptr=ptr.next;
        }while(ptr!=tail.next);
        System.out.println(key+" not found");return false;
    }
    void print(){
        if(tail==null){System.out.println("Empty");return;}
        Node ptr=tail.next;
        do{System.out.print(ptr.data+" → ");ptr=ptr.next;}while(ptr!=tail.next);
        System.out.println("(HEAD)");
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
typedef struct Node{int data;struct Node*next;}Node;
Node*tail=NULL;
void insert(int val){
    Node*n=malloc(sizeof(Node));n->data=val;
    if(!tail){n->next=n;tail=n;}
    else{n->next=tail->next;tail->next=n;tail=n;}
    printf("Inserted %d\\n",val);
}
void deleteHead(){
    if(!tail){printf("Empty\\n");return;}
    Node*head=tail->next;
    printf("Deleted: %d\\n",head->data);
    if(tail==head){free(head);tail=NULL;}
    else{tail->next=head->next;free(head);}
}
void print(){
    if(!tail){printf("Empty\\n");return;}
    Node*ptr=tail->next;
    do{printf("%d → ",ptr->data);ptr=ptr->next;}while(ptr!=tail->next);
    printf("(HEAD)\\n");
}
int main(){
    int n;scanf("%d",&n);
    for(int i=0;i<n;i++){int v;scanf("%d",&v);insert(v);}
    print();deleteHead();print();return 0;
}`,
    javascript: `class Node{constructor(v){this.data=v;this.next=null;}}
class CircularLL{
    constructor(){this.tail=null;}
    insert(val){
        const n=new Node(val);
        if(!this.tail){n.next=n;this.tail=n;}
        else{n.next=this.tail.next;this.tail.next=n;this.tail=n;}
        console.log("Inserted "+val);
    }
    deleteHead(){
        if(!this.tail){console.log("Empty");return;}
        const head=this.tail.next;
        console.log("Deleted:",head.data);
        if(this.tail===head)this.tail=null;
        else this.tail.next=head.next;
    }
    search(key){
        if(!this.tail){console.log("Empty");return false;}
        let ptr=this.tail.next;
        do{
            if(ptr.data===key){console.log(key+" found");return true;}
            ptr=ptr.next;
        }while(ptr!==this.tail.next);
        console.log(key+" not found");return false;
    }
    print(){
        if(!this.tail){console.log("Empty");return;}
        let ptr=this.tail.next,r=[];
        do{r.push(ptr.data);ptr=ptr.next;}while(ptr!==this.tail.next);
        console.log(r.join(" → ")+" → (HEAD)");
    }
}
const ll=new CircularLL();
[10,20,30].forEach(v=>ll.insert(v));
ll.print();ll.deleteHead();ll.print();ll.search(20);`,
  },
};

// CODE EDITOR

function initEditor() {
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-c++src",
    theme: getCMTheme(document.body.getAttribute("data-theme") || "dark"),
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });
  codeEditor.setValue(codeTemplates.singly.cpp);
}

document.querySelectorAll(".lang-tab").forEach((btn) => {
  btn.onclick = () => {
    document
      .querySelectorAll(".lang-tab")
      .forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    document.querySelector(".lang-display").textContent = btn.textContent;
    const modeMap = {
      cpp: "text/x-c++src",
      python: "text/x-python",
      java: "text/x-java",
      c: "text/x-csrc",
      javascript: "text/javascript",
    };
    codeEditor.setOption("mode", modeMap[currentLang]);
    codeEditor.setValue(
      codeTemplates[currentType][currentLang] || "// Not available",
    );
  };
});

function copyEditorCode() {
  navigator.clipboard.writeText(codeEditor.getValue());
  const btn = document.querySelector(".code-copy");
  btn.textContent = "✓";
  btn.style.background = "var(--primary-green)";
  setTimeout(() => {
    btn.textContent = "Copy";
    btn.style.background = "var(--primary-purple)";
  }, 2000);
}

/*   Interactive run simulation   */
let currentInputRes = null;
async function getInput(prompt) {
  return new Promise((resolve) => {
    document.getElementById("promptText").textContent = prompt;
    document.getElementById("inputPrompt").style.display = "block";
    document.getElementById("userInput").value = "";
    document.getElementById("userInput").focus();
    currentInputRes = resolve;
  });
}
function submitInput() {
  const v = document.getElementById("userInput").value.trim();
  if (v && currentInputRes) {
    document.getElementById("inputPrompt").style.display = "none";
    currentInputRes(v);
    currentInputRes = null;
  }
}
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitInput();
});

async function runCode() {
  const out = document.getElementById("codeOutput");
  out.innerHTML =
    '<span style="color:#fbbf24;">🔄 Simulating...</span><br><br>';

  const typeNames = {
    singly: "Singly Linked List",
    doubly: "Doubly Linked List",
    circular: "Circular Linked List",
  };
  out.innerHTML += `<span style="color:var(--primary-cyan);">${typeNames[currentType]}</span><br><br>`;

  const n = await getInput("Enter number of elements: ");
  out.innerHTML += `<span style="color:var(--text-secondary);">Count: </span>${n}<br>`;
  const list = [];
  for (let i = 0; i < parseInt(n); i++) {
    const v = await getInput(`Enter value ${i + 1}: `);
    list.push(parseInt(v));
    out.innerHTML += `<span style="color:var(--primary-green);">Inserted: ${v}</span><br>`;
  }
  out.innerHTML += `<br><span style="color:var(--primary-cyan);">List: ${list.join(" → ")}${currentType === "circular" ? " → HEAD" : " → null"}</span><br>`;
  out.innerHTML += `<span style="color:var(--primary-red);">Deleted head: ${list.shift()}</span><br>`;
  out.innerHTML += `<span style="color:var(--primary-cyan);">After: ${list.join(" → ")}${currentType === "circular" ? " → HEAD" : " → null"}</span><br><br>`;
  out.innerHTML += `<span style="color:var(--primary-green);">✓ Done.</span>`;
}

// LEVEL LOGIC

const ALGO_KEY = "linked_list";
const L2_KEY = `${ALGO_KEY}_l2_unlocked`;
const L3_KEY = `${ALGO_KEY}_l3_unlocked`;

function updateLevelButtons() {
  const btnL2 = document.getElementById("l2");
  const btnL3 = document.getElementById("l3");
  if (isLevelUnlocked(ALGO_KEY, 1)) {
    btnL2.style.borderColor = "var(--primary-green)";
    btnL2.style.background = "rgba(16,185,129,.15)";
    btnL2.style.color = "var(--primary-green)";
  }
  if (isLevelUnlocked(ALGO_KEY, 2)) {
    btnL3.style.borderColor = "var(--primary-green)";
    btnL3.style.background = "rgba(16,185,129,.15)";
    btnL3.style.color = "var(--primary-green)";
  }
}

document.getElementById("l1").onclick = () =>
  (window.location.href = "linked_list.html");
document.getElementById("l2").onclick = () => {
  // already here
};
document.getElementById("l3").onclick = () => {
  const modal = document.getElementById("quizModal");
  const msg = document.getElementById("modalMsg");
  if (isLevelUnlocked(ALGO_KEY, 2)) {
    window.location.href = "linked_list_L3.html";
  } else if (!isLevelUnlocked(ALGO_KEY, 1)) {
    msg.textContent = "Pass the Level 2 Quiz to unlock Level 3.";
    document.getElementById("startQuiz").onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l2`);
    modal.style.display = "flex";
  } else {
    msg.textContent =
      "Pass the Level 2 Quiz to unlock Level 3 and complete your Linked List journey.";
    document.getElementById("startQuiz").onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l2`);
    modal.style.display = "flex";
  }
};
document.getElementById("cancelBtn").onclick = () =>
  (document.getElementById("quizModal").style.display = "none");
window.onclick = (e) => {
  if (e.target === document.getElementById("quizModal"))
    document.getElementById("quizModal").style.display = "none";
};



window.onload = () => {
  applyTheme(localStorage.getItem("dsa-theme") || "dark");
  initEditor();
  updatePseudo();
  updateComplexityCards();
  updateScenarioDesc();
  renderViz();
  resetBest();
  resetAvg();
  resetWorst();
  resetCustom();
  updateLevelButtons();
};

window.addEventListener("progressReady", () => {
  if (typeof updateLevelButtons === "function") updateLevelButtons();
  else if (typeof updateLevels === "function") updateLevels();
});
