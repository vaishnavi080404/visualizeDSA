

var mainHeap = [];
var mainType = "maxheap"; // 'maxheap' | 'minheap' | 'binary'

var codeEditor;
var currentLang = "cpp";

// colours for the tree nodes
var NODE_COLORS = {
  maxheap: {
    root: "#10b981",
    node: "#8b5cf6",
    lit: "#06b6d4",
    swap: "#f59e0b",
    done: "#10b981",
  },
  minheap: {
    root: "#06b6d4",
    node: "#8b5cf6",
    lit: "#10b981",
    swap: "#f59e0b",
    done: "#06b6d4",
  },
  binary: {
    root: "#f59e0b",
    node: "#8b5cf6",
    lit: "#10b981",
    swap: "#ef4444",
    done: "#f59e0b",
  },
};


//  HEAP COMPARE FUNCTIONS
//  returns true if parent should be ABOVE child


function compare(parent, child, type) {
  if (type === "minheap") return parent <= child;
  return parent >= child; // maxheap and binary both use max
}


//  CORE HEAP OPERATIONS (on any array)


// insert value into heap (modifies arr in place)
function heapInsert(arr, val, type) {
  arr.push(val);
  var i = arr.length - 1;

  // move the new element UP until it's in the right place
  while (i > 0) {
    var parent = Math.floor((i - 1) / 2);
    if (!compare(arr[parent], arr[i], type)) {
      // Parent violates heap property — swap
      var tmp = arr[parent];
      arr[parent] = arr[i];
      arr[i] = tmp;
      i = parent;
    } else {
      break; 
    }
  }
}

// extract root (max or min) from heap
function heapExtract(arr, type) {
  if (arr.length === 0) return null;
  var root = arr[0];

  // Move last element to root position
  arr[0] = arr[arr.length - 1];
  arr.pop();

  // sift the new root DOWN
  heapifyDown(arr, 0, type);

  return root;
}

// heapify down starting from index i
function heapifyDown(arr, i, type) {
  var n = arr.length;

  while (true) {
    var extreme = i; // index of largest (max) or smallest (min)
    var left = 2 * i + 1;
    var right = 2 * i + 2;

    if (left < n && !compare(arr[extreme], arr[left], type)) extreme = left;
    if (right < n && !compare(arr[extreme], arr[right], type)) extreme = right;

    if (extreme === i) break; // Already in correct position

    // Swap
    var tmp = arr[i];
    arr[i] = arr[extreme];
    arr[extreme] = tmp;

    i = extreme;
  }
}

// build heap from any array (Floyd's algorithm) — O(N)
function buildHeap(arr, type) {
  var n = arr.length;
  // Start from last non-leaf and go upward
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDown(arr, i, type);
  }
}


//  SVG TREE DRAWING
//  draw a heap stored as an array as a tree


function drawHeapTree(svgId, arr, type, highlightIdx, swapIdx) {
  var svg = document.getElementById(svgId);
  if (!svg) return;

  var colors = NODE_COLORS[type];
  var n = arr.length;

  // Clear previous drawing
  svg.innerHTML = "";

  if (n === 0) {
    svg.innerHTML =
      '<text x="170" y="110" fill="#2a2a2a" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">Empty</text>';
    return;
  }

  // Tree levels: level 0 = root, level 1 = 2 nodes, etc.
  var maxLevel = Math.floor(Math.log2(n)); // how many levels
  var svgWidth = 340;
  var svgHeight = 220;
  var levelH = Math.min(52, svgHeight / (maxLevel + 1.5)); // vertical spacing
  var positions = []; // positions[i] = {x, y} for node i

  // calculate x position based on how nodes are spaced at each level
  for (var i = 0; i < n; i++) {
    var level = Math.floor(Math.log2(i + 1));
    var levelW = Math.pow(2, level); // nodes at this level
    var posInLvl = i - (levelW - 1); // position within level (0-indexed)
    var slotWidth = svgWidth / levelW;

    positions[i] = {
      x: slotWidth * posInLvl + slotWidth / 2,
      y: 25 + level * levelH,
    };
  }

  // draw edges first (so nodes appear on top)
  for (var i = 1; i < n; i++) {
    var p = Math.floor((i - 1) / 2);
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", positions[p].x);
    line.setAttribute("y1", positions[p].y);
    line.setAttribute("x2", positions[i].x);
    line.setAttribute("y2", positions[i].y);
    line.setAttribute("stroke", "#2a2a2a");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
  }

  // draw each node
  var nodeR = Math.max(16, Math.min(22, svgWidth / (n + 4))); // adaptive radius

  for (var i = 0; i < n; i++) {
    var x = positions[i].x;
    var y = positions[i].y;

    // pick colour based on state
    var fillColor;
    if (i === 0) fillColor = colors.root;
    else if (i === swapIdx) fillColor = colors.swap;
    else if (i === highlightIdx) fillColor = colors.lit;
    else fillColor = colors.node;

    // draw circle
    var circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", nodeR);
    circle.setAttribute("fill", fillColor);
    svg.appendChild(circle);

    // draw value text
    var fontSize = n > 12 ? 10 : 13;
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + fontSize / 3);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", fontSize);
    text.setAttribute("font-weight", "bold");
    text.setAttribute("font-family", "JetBrains Mono, monospace");
    text.setAttribute(
      "fill",
      fillColor === "#f59e0b" || (fillColor === "#10b981" && i !== 0)
        ? "#000"
        : "#fff",
    );
    text.textContent = arr[i];
    svg.appendChild(text);

    // label index below root
    if (i === 0) {
      var idx_lbl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      idx_lbl.setAttribute("x", x + nodeR + 5);
      idx_lbl.setAttribute("y", y + 4);
      idx_lbl.setAttribute("font-size", "10");
      idx_lbl.setAttribute("fill", fillColor);
      idx_lbl.setAttribute("font-family", "JetBrains Mono, monospace");
      idx_lbl.setAttribute("font-weight", "700");
      idx_lbl.textContent = type === "minheap" ? "← MIN" : "← MAX";
      svg.appendChild(idx_lbl);
    }
  }
}

// draw a small arr label string
function arrLabel(arr) {
  return "arr: [" + arr.join(", ") + "]";
}

//  MAIN VISUALIZER


function showMsg(text, type) {
  var el = document.getElementById("msgBox");
  el.style.display = "block";
  el.className = "msg-" + type;
  el.innerHTML = text;
}

function litPseudo(id) {
  // Un-highlight all, then highlight target
  ["ps-insert", "ps-extract", "ps-peek", "ps-size", "ps-build"].forEach(
    function (s) {
      document.getElementById(s).classList.remove("lit");
    },
  );
  if (id) document.getElementById(id).classList.add("lit");
}

function switchHeapType(type, el) {
  mainType = type;
  mainHeap = [];

  // Update UI
  document.querySelectorAll(".heap-opt").forEach(function (o) {
    o.classList.remove("selected");
  });
  el.classList.add("selected");

  // Update pseudocode hints
  if (type === "minheap") {
    document.getElementById("ps-insert-txt").textContent =
      "while i>0 && arr[(i-1)/2] > arr[i]: swap";
    document.getElementById("ps-extract-txt").textContent =
      "while smallest ≠ i: swap with smallest child";
  } else {
    document.getElementById("ps-insert-txt").textContent =
      "while i>0 && arr[(i-1)/2] < arr[i]: swap";
    document.getElementById("ps-extract-txt").textContent =
      "while largest ≠ i: swap with largest child";
  }

  var titles = {
    maxheap: "Max-Heap Visualizer — Tree & Array View",
    minheap: "Min-Heap Visualizer — Tree & Array View",
    binary: "Binary Heap Visualizer — Build From Array",
  };
  document.getElementById("vis-title").textContent = titles[type];

  renderMain();
  if (codeEditor) codeEditor.setValue(CODE_TEMPLATES[type][currentLang]);
  document.getElementById("msgBox").style.display = "none";
}

function renderMain(hlIdx, swIdx) {
  drawHeapTree("heapTreeSvg", mainHeap, mainType, hlIdx, swIdx);
  renderArrayBar();
}

function renderArrayBar() {
  var bar = document.getElementById("arrayBar");
  bar.innerHTML =
    "<span style=\"font-size:0.75rem;color:var(--txt2);font-family:'JetBrains Mono',monospace;margin-right:4px;\">arr[]:</span>";
  mainHeap.forEach(function (val, i) {
    var wrap = document.createElement("div");
    wrap.className = "array-cell-wrap";

    var cell = document.createElement("div");
    cell.className = "array-cell" + (i === 0 ? " root-cell" : "");
    cell.textContent = val;
    wrap.appendChild(cell);

    var idx = document.createElement("div");
    idx.className = "array-idx";
    idx.textContent = i;
    wrap.appendChild(idx);

    bar.appendChild(wrap);
  });
}

function mainInsert() {
  var raw = document.getElementById("mainInput").value.trim();
  if (raw === "" || isNaN(raw)) {
    showMsg("⚠ Enter a number!", "warn");
    return;
  }
  if (mainHeap.length >= 15) {
    showMsg("⚠ Max 15 elements for clarity!", "warn");
    return;
  }

  var val = parseInt(raw);
  litPseudo("ps-insert");

  if (mainType === "binary") {
    // For binary mode, just push and do heapify down (build-style)
    mainHeap.push(val);
    buildHeap(mainHeap, mainType);
  } else {
    heapInsert(mainHeap, val, mainType);
  }

  renderMain();
  showMsg("✓ Inserted " + val + " into heap", "ok");
  document.getElementById("mainInput").value = "";
}

function mainExtract() {
  if (mainHeap.length === 0) {
    showMsg("✗ Heap is empty — nothing to extract!", "err");
    return;
  }
  litPseudo("ps-extract");
  var removed = heapExtract(mainHeap, mainType);
  renderMain();
  showMsg("🗑 Extracted root: " + removed, "info");
}

function mainPeek() {
  litPseudo("ps-peek");
  if (mainHeap.length === 0) {
    showMsg("✗ Heap is empty!", "err");
    return;
  }
  renderMain(0, -1);
  showMsg("👁 Root (peek) = " + mainHeap[0] + "  [O(1) — no removal]", "ok");
}

function mainSize() {
  litPseudo("ps-size");
  showMsg("📊 Heap size = " + mainHeap.length, "info");
}

function mainReset() {
  mainHeap = [];
  renderMain();
  showMsg("↺ Heap cleared", "info");
  litPseudo("");
}

// allow Enter key on main input
document.getElementById("mainInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") mainInsert();
});


//  SCENARIO — tab switching


var SCENE_TABS = {
  insert: "tab-insert",
  extract: "tab-extract",
  peek: "tab-peek",
  build: "tab-build",
  custom: "tab-custom",
};

function switchScene(name) {
  // Hide all panels, reset tabs
  document.querySelectorAll(".s-panel").forEach(function (p) {
    p.classList.remove("show");
  });
  document.querySelectorAll(".s-tab").forEach(function (t) {
    t.className = "s-tab"; // reset to base
  });

  // Show chosen panel and activate tab
  document.getElementById("spanel-" + name).classList.add("show");
  var tab = document.getElementById("stab-" + name);
  tab.className = "s-tab " + SCENE_TABS[name];
}


//  SCENARIO — INSERT (step-by-step)


// preset values to insert one by one
var INS_VALUES = [50, 30, 80, 10, 60, 40, 90, 20];
var insHeap = [];
var insIdx = 0;
var insAutoTmr = null;

function insReset() {
  clearTimeout(insAutoTmr);
  insHeap = [];
  insIdx = 0;
  document.getElementById("ins-step-btn").disabled = false;
  document.getElementById("ins-auto-btn").disabled = false;
  drawHeapTree("ins-svg", insHeap, mainType, -1, -1);
  document.getElementById("ins-arr-label").textContent = arrLabel(insHeap);
  var log = document.getElementById("log-insert");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-insert", "Ready to insert: " + INS_VALUES.join(", "), "log-info");
  addLog(
    "log-insert",
    "Type: " + mainType + " — watch heapify-up!",
    "log-info",
  );
}

function insStep() {
  if (insIdx >= INS_VALUES.length) {
    addLog("log-insert", "✓ All values inserted!", "log-result");
    document.getElementById("ins-step-btn").disabled = true;
    document.getElementById("ins-auto-btn").disabled = true;
    return;
  }

  var val = INS_VALUES[insIdx];
  heapInsert(insHeap, val, mainType);
  var newPos = insHeap.indexOf(val); // rough highlight of new element

  drawHeapTree("ins-svg", insHeap, mainType, newPos, -1);
  document.getElementById("ins-arr-label").textContent = arrLabel(insHeap);

  addLog(
    "log-insert",
    "insert(" + val + ") → heapify-up from index " + (insHeap.length - 1),
    "log-insert",
  );
  addLog("log-insert", "  root = " + insHeap[0] + "  [O(log N)]", "log-result");

  insIdx++;

  if (insIdx >= INS_VALUES.length) {
    document.getElementById("ins-step-btn").disabled = true;
    document.getElementById("ins-auto-btn").disabled = true;
    addLog("log-insert", "✓ Heap complete!", "log-result");
  }
}

function insAuto() {
  if (insIdx >= INS_VALUES.length) return;
  document.getElementById("ins-auto-btn").disabled = true;
  function next() {
    if (insIdx >= INS_VALUES.length) return;
    insStep();
    insAutoTmr = setTimeout(next, 900);
  }
  next();
}


//  SCENARIO — EXTRACT (step-by-step)


var extHeap = [];
var extDone = false;
var extAutoTmr = null;

function extReset() {
  clearTimeout(extAutoTmr);
  extDone = false;
  extHeap = [90, 80, 70, 50, 60, 40, 30]; // pre-built max-heap
  document.getElementById("ext-step-btn").disabled = false;
  document.getElementById("ext-auto-btn").disabled = false;
  drawHeapTree("ext-svg", extHeap, mainType, -1, -1);
  document.getElementById("ext-arr-label").textContent = arrLabel(extHeap);
  var log = document.getElementById("log-extract");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-extract", "Pre-loaded: [90, 80, 70, 50, 60, 40, 30]", "log-info");
  addLog("log-extract", "Will extract root repeatedly until empty", "log-info");
}

function extStep() {
  if (extHeap.length === 0) {
    addLog("log-extract", "✗ Heap empty — nothing to extract!", "log-remove");
    document.getElementById("ext-step-btn").disabled = true;
    document.getElementById("ext-auto-btn").disabled = true;
    return;
  }

  var removed = extHeap[0];
  addLog("log-extract", "extractRoot() → removing " + removed, "log-remove");
  heapExtract(extHeap, mainType);
  drawHeapTree("ext-svg", extHeap, mainType, -1, -1);
  document.getElementById("ext-arr-label").textContent = arrLabel(extHeap);

  if (extHeap.length > 0) {
    addLog(
      "log-extract",
      "  new root = " + extHeap[0] + "  heap size = " + extHeap.length,
      "log-result",
    );
  } else {
    addLog("log-extract", "  Heap is now empty ✓", "log-result");
    document.getElementById("ext-step-btn").disabled = true;
    document.getElementById("ext-auto-btn").disabled = true;
  }
}

function extAuto() {
  if (extHeap.length === 0) return;
  document.getElementById("ext-auto-btn").disabled = true;
  function next() {
    if (extHeap.length === 0) return;
    extStep();
    extAutoTmr = setTimeout(next, 800);
  }
  next();
}

//  SCENARIO — PEEK


var peekHeap = [];

function peekReset() {
  peekHeap = [95, 70, 80, 40, 60, 55, 30];
  drawHeapTree("peek-svg", peekHeap, mainType, -1, -1);
  document.getElementById("peek-arr-label").textContent = arrLabel(peekHeap);
  var log = document.getElementById("log-peek");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-peek",
    "Heap loaded. Click Peek Root to see O(1) lookup!",
    "log-info",
  );
}

function doPeek() {
  if (peekHeap.length === 0) {
    addLog("log-peek", "✗ Heap is empty!", "log-remove");
    return;
  }
  // Highlight root node
  drawHeapTree("peek-svg", peekHeap, mainType, 0, -1);
  addLog("log-peek", "peek() → root = " + peekHeap[0], "log-peek");
  addLog("log-peek", "  Just read arr[0] — no removal!", "log-info");
  addLog("log-peek", "  Time complexity: O(1) ✓", "log-result");
}

//  SCENARIO 


var BUILD_INPUT = [3, 9, 2, 7, 1, 8, 4, 6, 5];
var buildArr = [];
var buildPhaseIdx = 0; // which non-leaf we're heapifying (going right to left)
var buildMaxPhase = 0;
var buildAutoTmr = null;

function buildReset() {
  clearTimeout(buildAutoTmr);
  buildArr = [...BUILD_INPUT];
  buildMaxPhase = Math.floor(buildArr.length / 2) - 1; // last non-leaf index
  buildPhaseIdx = buildMaxPhase; // start from last non-leaf
  document.getElementById("build-step-btn").disabled = false;
  document.getElementById("build-auto-btn").disabled = false;
  drawHeapTree("build-svg", buildArr, mainType, buildPhaseIdx, -1);
  document.getElementById("build-arr-label").textContent = arrLabel(buildArr);
  var log = document.getElementById("log-build");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-build", "Input: " + BUILD_INPUT.join(", "), "log-info");
  addLog(
    "log-build",
    "Non-leaf nodes: index 0 to " + buildMaxPhase,
    "log-info",
  );
  addLog(
    "log-build",
    "Start from last non-leaf (index " + buildMaxPhase + ") going up",
    "log-info",
  );
}

function buildStep() {
  if (buildPhaseIdx < 0) {
    addLog("log-build", "✓ Heap built successfully!", "log-result");
    addLog(
      "log-build",
      "  Total cost: O(N) — better than O(N log N)!",
      "log-result",
    );
    document.getElementById("build-step-btn").disabled = true;
    document.getElementById("build-auto-btn").disabled = true;
    drawHeapTree("build-svg", buildArr, mainType, -1, -1);
    document.getElementById("build-arr-label").textContent = arrLabel(buildArr);
    return;
  }

  var before = buildArr[buildPhaseIdx];
  heapifyDown(buildArr, buildPhaseIdx, mainType);

  addLog(
    "log-build",
    "heapifyDown(" + buildPhaseIdx + ")  value=" + before,
    "log-insert",
  );
  addLog("log-build", "  arr now: [" + buildArr.join(", ") + "]", "log-info");

  drawHeapTree("build-svg", buildArr, mainType, buildPhaseIdx, -1);
  document.getElementById("build-arr-label").textContent = arrLabel(buildArr);

  buildPhaseIdx--;

  if (buildPhaseIdx < 0) {
    addLog("log-build", "✓ All non-leaves processed!", "log-result");
    document.getElementById("build-step-btn").disabled = true;
    document.getElementById("build-auto-btn").disabled = true;
  }
}

function buildAuto() {
  if (buildPhaseIdx < 0) return;
  document.getElementById("build-auto-btn").disabled = true;
  function next() {
    if (buildPhaseIdx < 0) return;
    buildStep();
    buildAutoTmr = setTimeout(next, 900);
  }
  next();
}


//  SCENARIO — CUSTOM


var custHeap = [];
var custType = "maxheap";
var ccTimer = null;

function cSetType(type) {
  custType = type;
  custHeap = [];

  // Reset all type buttons
  ["ctype-max", "ctype-min", "ctype-bin"].forEach(function (id) {
    document.getElementById(id).className = "ctl ctl-ghost";
  });

  // Highlight chosen
  var idMap = {
    maxheap: "ctype-max",
    minheap: "ctype-min",
    binary: "ctype-bin",
  };
  document.getElementById(idMap[type]).className = "ctl ctl-cyan";

  var names = {
    maxheap: "Max-Heap",
    minheap: "Min-Heap",
    binary: "Binary Heap",
  };
  document.getElementById("custom-title").textContent =
    "📋 " + names[type] + " (size 0)";

  drawHeapTree("cust-svg", custHeap, custType, -1, -1);
  document.getElementById("cust-arr-label").textContent = arrLabel(custHeap);
}

function hlCC(type) {
  ["ccc-insert", "ccc-extract", "ccc-peek"].forEach(function (id) {
    document.getElementById(id).classList.remove("cc-lit");
  });
  clearTimeout(ccTimer);
  var card = document.getElementById("ccc-" + type);
  if (card) {
    card.classList.add("cc-lit");
    ccTimer = setTimeout(function () {
      card.classList.remove("cc-lit");
    }, 1800);
  }
}

function showToast(type, msg) {
  var toast = document.getElementById("cc-toast");
  var icons = { insert: "⬆", extract: "⬇", peek: "👁", warn: "⚠" };
  document.getElementById("cc-icon").textContent = icons[type] || "⚡";
  document.getElementById("cc-text").textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(function () {
    toast.className = "cc-toast";
  }, 2500);
}

function customInsert() {
  var raw = document.getElementById("c-val").value.trim();
  if (raw === "" || isNaN(raw)) {
    showToast("warn", "Enter a number!");
    return;
  }
  if (custHeap.length >= 15) {
    showToast("warn", "Max 15 elements!");
    return;
  }

  var val = parseInt(raw);

  if (custType === "binary") {
    custHeap.push(val);
    buildHeap(custHeap, custType);
  } else {
    heapInsert(custHeap, val, custType);
  }

  drawHeapTree("cust-svg", custHeap, custType, -1, -1);
  document.getElementById("cust-arr-label").textContent = arrLabel(custHeap);
  document.getElementById("custom-title").textContent =
    "📋 " +
    custType.charAt(0).toUpperCase() +
    custType.slice(1) +
    " (size " +
    custHeap.length +
    ")";

  hlCC("insert");
  showToast("insert", "insert(" + val + ")  →  O(log N)");
  addLog(
    "log-custom",
    "insert(" + val + ")  root=" + custHeap[0],
    "log-insert",
  );

  document.getElementById("c-val").value = "";
  document.getElementById("c-val").focus();
}

function customExtract() {
  if (custHeap.length === 0) {
    showToast("warn", "Heap is empty!");
    return;
  }

  var removed = custHeap[0];
  heapExtract(custHeap, custType);

  drawHeapTree("cust-svg", custHeap, custType, -1, -1);
  document.getElementById("cust-arr-label").textContent = arrLabel(custHeap);
  document.getElementById("custom-title").textContent =
    "📋 " +
    custType.charAt(0).toUpperCase() +
    custType.slice(1) +
    " (size " +
    custHeap.length +
    ")";

  hlCC("extract");
  showToast("extract", "extract()  →  " + removed + "  [O(log N)]");
  addLog("log-custom", "extract() → removed " + removed, "log-remove");
  if (custHeap.length > 0)
    addLog("log-custom", "  new root = " + custHeap[0], "log-result");
}

function customPeek() {
  if (custHeap.length === 0) {
    showToast("warn", "Heap is empty!");
    return;
  }

  drawHeapTree("cust-svg", custHeap, custType, 0, -1);
  hlCC("peek");
  showToast("peek", "peek()  →  " + custHeap[0] + "  [O(1)]");
  addLog(
    "log-custom",
    "peek() → root = " + custHeap[0] + "  [O(1)]",
    "log-peek",
  );
}

function customReset() {
  custHeap = [];
  drawHeapTree("cust-svg", custHeap, custType, -1, -1);
  document.getElementById("cust-arr-label").textContent = arrLabel(custHeap);
  document.getElementById("custom-title").textContent =
    "📋 " + custType.charAt(0).toUpperCase() + custType.slice(1) + " (size 0)";
  var log = document.getElementById("log-custom");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-custom", "↺ Cleared. Start inserting!", "log-info");
}

document.getElementById("c-val").addEventListener("keydown", function (e) {
  if (e.key === "Enter") customInsert();
});


//  LOG 


function addLog(logId, text, cls) {
  var log = document.getElementById(logId);
  var line = document.createElement("div");
  line.className = "log-line " + (cls || "log-info");
  line.textContent = "> " + text;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}


//  CODE TEMPLATES


var CODE_TEMPLATES = {
  maxheap: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

// ── Max-Heap Implementation ──
class MaxHeap {
    vector<int> arr;  // internal array storage

    // Get parent/child indices
    int parent(int i) { return (i - 1) / 2; }
    int left(int i)   { return 2 * i + 1;   }
    int right(int i)  { return 2 * i + 2;   }

    void swap(int i, int j) {
        int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }

public:
    // Insert a new value — O(log N)
    void insert(int val) {
        arr.push_back(val);        // add at end
        int i = arr.size() - 1;

        // Bubble UP: while parent is smaller, swap up
        while (i > 0 && arr[parent(i)] < arr[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
    }

    // Remove and return maximum — O(log N)
    int extractMax() {
        if (arr.empty()) return -1;

        int maxVal = arr[0];       // save root (max)
        arr[0] = arr.back();       // move last to root
        arr.pop_back();            // remove last slot

        heapifyDown(0);            // fix heap property
        return maxVal;
    }

    // Restore heap property going down — O(log N)
    void heapifyDown(int i) {
        int largest = i;
        int l = left(i), r = right(i);
        int n = arr.size();

        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

        if (largest != i) {
            swap(i, largest);
            heapifyDown(largest);  // recurse down
        }
    }

    // Peek at max without removing — O(1)
    int peek() {
        if (arr.empty()) return -1;
        return arr[0];
    }

    bool isEmpty() { return arr.empty(); }
    int  size()    { return arr.size();  }
};

int main() {
    MaxHeap h;
    h.insert(50); h.insert(30); h.insert(80);
    h.insert(10); h.insert(60);

    cout << "Max (peek): " << h.peek() << endl;   // 80

    while (!h.isEmpty())
        cout << h.extractMax() << " ";  // 80 60 50 30 10
    cout << endl;
    return 0;
}`,

    python: `import heapq

# ── Max-Heap in Python using negation trick ──
# Python's heapq is a Min-Heap by default.
# To simulate Max-Heap, negate all values.

class MaxHeap:
    def __init__(self):
        self._heap = []   # stores negated values

    def insert(self, val):
        heapq.heappush(self._heap, -val)  # negate before insert
        print(f"Inserted {val}, root = {self.peek()}")

    def extract_max(self):
        if not self._heap:
            return None
        return -heapq.heappop(self._heap)  # negate back when popping

    def peek(self):
        if not self._heap:
            return None
        return -self._heap[0]  # root is most negative = actual max

    def size(self):
        return len(self._heap)

# ── Usage ──
h = MaxHeap()
for val in [50, 30, 80, 10, 60]:
    h.insert(val)

print(f"Max peek: {h.peek()}")          # 80
print(f"Size: {h.size()}")              # 5

extracted = []
while h.size() > 0:
    extracted.append(h.extract_max())

print("Sorted desc:", extracted)        # [80, 60, 50, 30, 10]`,

    java: `import java.util.PriorityQueue;
import java.util.Collections;

public class MaxHeapDemo {

    public static void main(String[] args) {
        // Max-Heap using PriorityQueue with reversed order
        PriorityQueue<Integer> maxHeap =
            new PriorityQueue<>(Collections.reverseOrder());

        // Insert values
        int[] values = {50, 30, 80, 10, 60};
        for (int v : values) {
            maxHeap.offer(v);
            System.out.println("Inserted " + v + ", max = " + maxHeap.peek());
        }

        System.out.println("\\nSize: " + maxHeap.size());
        System.out.println("Peek max: " + maxHeap.peek());  // 80

        // Extract all (comes out in descending order)
        System.out.print("Extract order: ");
        while (!maxHeap.isEmpty()) {
            System.out.print(maxHeap.poll() + " ");  // 80 60 50 30 10
        }
        System.out.println();
    }
}`,

    c: `#include <stdio.h>
#define MAX_SIZE 100

// ── Max-Heap using array ──
int heap[MAX_SIZE];
int heapSize = 0;

void swapNodes(int i, int j) {
    int tmp = heap[i]; heap[i] = heap[j]; heap[j] = tmp;
}

// Insert and bubble up — O(log N)
void insert(int val) {
    heap[heapSize++] = val;
    int i = heapSize - 1;

    while (i > 0 && heap[(i-1)/2] < heap[i]) {
        swapNodes(i, (i-1)/2);
        i = (i-1)/2;
    }
}

// Sift down from index i — O(log N)
void heapifyDown(int i) {
    int largest = i;
    int left  = 2*i + 1;
    int right = 2*i + 2;

    if (left  < heapSize && heap[left]  > heap[largest]) largest = left;
    if (right < heapSize && heap[right] > heap[largest]) largest = right;

    if (largest != i) {
        swapNodes(i, largest);
        heapifyDown(largest);
    }
}

// Extract max — O(log N)
int extractMax() {
    if (heapSize == 0) return -1;
    int maxVal  = heap[0];
    heap[0]     = heap[--heapSize];
    heapifyDown(0);
    return maxVal;
}

int main() {
    insert(50); insert(30); insert(80);
    insert(10); insert(60);

    printf("Max (peek): %d\\n", heap[0]);  // 80

    while (heapSize > 0)
        printf("%d ", extractMax());       // 80 60 50 30 10
    printf("\\n");
    return 0;
}`,

    js: `// ── Max-Heap in JavaScript ──
class MaxHeap {
    constructor() {
        this.arr = [];  // internal array
    }

    // Helper: parent and children indices
    parent(i) { return Math.floor((i - 1) / 2); }
    left(i)   { return 2 * i + 1; }
    right(i)  { return 2 * i + 2; }

    swap(i, j) {
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
    }

    // Insert and heapify up — O(log N)
    insert(val) {
        this.arr.push(val);
        let i = this.arr.length - 1;

        while (i > 0 && this.arr[this.parent(i)] < this.arr[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
        console.log(\`Inserted \${val}, root = \${this.peek()}\`);
    }

    // Heapify down from index i — O(log N)
    heapifyDown(i) {
        const n = this.arr.length;
        let largest = i;
        const l = this.left(i), r = this.right(i);

        if (l < n && this.arr[l] > this.arr[largest]) largest = l;
        if (r < n && this.arr[r] > this.arr[largest]) largest = r;

        if (largest !== i) {
            this.swap(i, largest);
            this.heapifyDown(largest);
        }
    }

    // Extract max — O(log N)
    extractMax() {
        if (!this.arr.length) return null;
        const max = this.arr[0];
        this.arr[0] = this.arr.pop();
        if (this.arr.length) this.heapifyDown(0);
        return max;
    }

    peek()    { return this.arr[0] ?? null; }
    size()    { return this.arr.length;     }
    isEmpty() { return !this.arr.length;    }
}

// Usage
const h = new MaxHeap();
[50, 30, 80, 10, 60].forEach(v => h.insert(v));

console.log("Max:", h.peek());      // 80
console.log("Size:", h.size());     // 5

const sorted = [];
while (!h.isEmpty()) sorted.push(h.extractMax());
console.log("Desc order:", sorted); // [80, 60, 50, 30, 10]`,
  },

  minheap: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

// ── Min-Heap Implementation ──
class MinHeap {
    vector<int> arr;

    int parent(int i) { return (i - 1) / 2; }
    int left(int i)   { return 2 * i + 1;   }
    int right(int i)  { return 2 * i + 2;   }

    void swap(int i, int j) {
        int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }

public:
    // Insert — bubble UP if smaller than parent
    void insert(int val) {
        arr.push_back(val);
        int i = arr.size() - 1;

        // Key difference from Max-Heap: bubble up if SMALLER
        while (i > 0 && arr[parent(i)] > arr[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
    }

    // Extract minimum — O(log N)
    int extractMin() {
        if (arr.empty()) return -1;
        int minVal = arr[0];
        arr[0] = arr.back();
        arr.pop_back();
        heapifyDown(0);
        return minVal;
    }

    void heapifyDown(int i) {
        int smallest = i;
        int l = left(i), r = right(i);
        int n = arr.size();

        // Find smallest among node and its children
        if (l < n && arr[l] < arr[smallest]) smallest = l;
        if (r < n && arr[r] < arr[smallest]) smallest = r;

        if (smallest != i) {
            swap(i, smallest);
            heapifyDown(smallest);
        }
    }

    int peek()     { return arr.empty() ? -1 : arr[0]; }
    int size()     { return arr.size(); }
    bool isEmpty() { return arr.empty(); }
};

int main() {
    MinHeap h;
    for (int v : {5, 3, 8, 1, 6, 4, 2})
        h.insert(v);

    cout << "Min (peek): " << h.peek() << endl;  // 1

    // Extract all — comes out in ascending order
    while (!h.isEmpty())
        cout << h.extractMin() << " ";  // 1 2 3 4 5 6 8
    cout << endl;
    return 0;
}`,

    python: `import heapq

# ── Min-Heap in Python (heapq is Min-Heap by default) ──
class MinHeap:
    def __init__(self):
        self._heap = []

    # Insert and heapify up — O(log N)
    def insert(self, val):
        heapq.heappush(self._heap, val)  # heapq does heapify-up automatically
        print(f"Inserted {val}, min = {self.peek()}")

    # Extract minimum — O(log N)
    def extract_min(self):
        if not self._heap:
            return None
        return heapq.heappop(self._heap)  # removes and returns the smallest

    # Peek at minimum without removing — O(1)
    def peek(self):
        return self._heap[0] if self._heap else None

    def size(self):    return len(self._heap)
    def is_empty(self): return len(self._heap) == 0

# ── Build heap from existing list — O(N) ──
def build_min_heap(arr):
    heapq.heapify(arr)  # modifies in place!
    return arr

# Usage
h = MinHeap()
for val in [5, 3, 8, 1, 6, 4, 2]:
    h.insert(val)

print(f"Min peek: {h.peek()}")   # 1
print(f"Size: {h.size()}")       # 7

extracted = []
while not h.is_empty():
    extracted.append(h.extract_min())

print("Sorted asc:", extracted)  # [1, 2, 3, 4, 5, 6, 8]

# Build from array — O(N)
raw = [9, 3, 7, 1, 5]
build_min_heap(raw)
print("Built Min-Heap:", raw)`,

    java: `import java.util.PriorityQueue;

public class MinHeapDemo {
    public static void main(String[] args) {
        // PriorityQueue is Min-Heap by default in Java
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        // Insert values — O(log N) each
        int[] values = {5, 3, 8, 1, 6, 4, 2};
        for (int v : values) {
            minHeap.offer(v);
            System.out.println("Inserted " + v + ", min = " + minHeap.peek());
        }

        System.out.println("\\nSize: " + minHeap.size());
        System.out.println("Peek min: " + minHeap.peek()); // 1

        // Extract all (comes out in ascending order)
        System.out.print("Extract order: ");
        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + " "); // 1 2 3 4 5 6 8
        }
        System.out.println();
    }
}`,

    c: `#include <stdio.h>
#define MAX_SIZE 100

int heap[MAX_SIZE], heapSize = 0;

void swap(int i, int j) {
    int tmp = heap[i]; heap[i] = heap[j]; heap[j] = tmp;
}

// Insert into Min-Heap — O(log N)
void insert(int val) {
    heap[heapSize++] = val;
    int i = heapSize - 1;

    // Bubble UP while smaller than parent (min-heap rule)
    while (i > 0 && heap[(i-1)/2] > heap[i]) {
        swap(i, (i-1)/2);
        i = (i-1)/2;
    }
}

// Sift down to restore min-heap property
void heapifyDown(int i) {
    int smallest = i;
    int left = 2*i+1, right = 2*i+2;

    if (left  < heapSize && heap[left]  < heap[smallest]) smallest = left;
    if (right < heapSize && heap[right] < heap[smallest]) smallest = right;

    if (smallest != i) {
        swap(i, smallest);
        heapifyDown(smallest);
    }
}

// Extract minimum — O(log N)
int extractMin() {
    if (heapSize == 0) return -1;
    int min = heap[0];
    heap[0] = heap[--heapSize];
    heapifyDown(0);
    return min;
}

int main() {
    int vals[] = {5, 3, 8, 1, 6, 4, 2};
    for (int i = 0; i < 7; i++) insert(vals[i]);

    printf("Min peek: %d\\n", heap[0]);  // 1

    while (heapSize > 0)
        printf("%d ", extractMin());  // 1 2 3 4 5 6 8
    printf("\\n");
    return 0;
}`,

    js: `// ── Min-Heap in JavaScript ──
class MinHeap {
    constructor() {
        this.arr = [];
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    left(i)   { return 2 * i + 1; }
    right(i)  { return 2 * i + 2; }

    swap(i, j) {
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
    }

    // Insert and heapify up — smaller values bubble up
    insert(val) {
        this.arr.push(val);
        let i = this.arr.length - 1;

        while (i > 0 && this.arr[this.parent(i)] > this.arr[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
        console.log(\`Inserted \${val}, min = \${this.peek()}\`);
    }

    // Sift down — find smallest child and swap
    heapifyDown(i) {
        const n = this.arr.length;
        let smallest = i;
        const l = this.left(i), r = this.right(i);

        if (l < n && this.arr[l] < this.arr[smallest]) smallest = l;
        if (r < n && this.arr[r] < this.arr[smallest]) smallest = r;

        if (smallest !== i) {
            this.swap(i, smallest);
            this.heapifyDown(smallest);
        }
    }

    // Extract minimum — O(log N)
    extractMin() {
        if (!this.arr.length) return null;
        const min = this.arr[0];
        this.arr[0] = this.arr.pop();
        if (this.arr.length) this.heapifyDown(0);
        return min;
    }

    peek()    { return this.arr[0] ?? null; }
    size()    { return this.arr.length; }
    isEmpty() { return !this.arr.length; }
}

const h = new MinHeap();
[5, 3, 8, 1, 6, 4, 2].forEach(v => h.insert(v));

console.log("Min:", h.peek());   // 1

const sorted = [];
while (!h.isEmpty()) sorted.push(h.extractMin());
console.log("Asc:", sorted);     // [1, 2, 3, 4, 5, 6, 8]`,
  },

  binary: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

// ── Build Heap from ANY array in O(N) — Floyd's Algorithm ──
// This is faster than inserting N elements one by one (which is O(N log N))

void heapifyDown(vector<int>& arr, int i, int n) {
    int largest = i;
    int left  = 2 * i + 1;
    int right = 2 * i + 2;

    if (left  < n && arr[left]  > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapifyDown(arr, largest, n);  // continue fixing downward
    }
}

// Build Max-Heap in O(N) using bottom-up approach
void buildHeap(vector<int>& arr) {
    int n = arr.length;
    // All nodes from index n/2 onward are LEAVES — skip them
    // Start from the last non-leaf node and work upward
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapifyDown(arr, i, n);
    }
}

// Heap Sort — O(N log N), O(1) space, in-place
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Step 1: Build Max-Heap — O(N)
    buildHeap(arr);

    // Step 2: Extract max one by one — O(N log N)
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);    // move current max to end
        heapifyDown(arr, 0, i);  // shrink heap, fix top
    }
}

int main() {
    vector<int> arr = {3, 9, 2, 7, 1, 8, 4, 6, 5};

    cout << "Input:    ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    buildHeap(arr);
    cout << "Max-Heap: ";
    for (int x : arr) cout << x << " ";
    cout << endl;  // root = 9 (largest)

    // Reset and sort
    arr = {3, 9, 2, 7, 1, 8, 4, 6, 5};
    heapSort(arr);
    cout << "Sorted:   ";
    for (int x : arr) cout << x << " ";
    cout << endl;  // 1 2 3 4 5 6 7 8 9
    return 0;
}`,

    python: `import heapq

# ── Build Heap from Array — O(N) ──
# heapq.heapify() implements Floyd's bottom-up algorithm

def build_max_heap(arr):
    """Build Max-Heap by negating (since heapq is Min-Heap)"""
    negated = [-x for x in arr]
    heapq.heapify(negated)  # O(N) — much faster than N inserts!
    return negated

def build_min_heap(arr):
    """Build Min-Heap directly"""
    heap = arr[:]
    heapq.heapify(heap)  # O(N) in place
    return heap

def heap_sort_asc(arr):
    """Sort ascending using Min-Heap"""
    heap = arr[:]
    heapq.heapify(heap)
    return [heapq.heappop(heap) for _ in range(len(heap))]

def heap_sort_desc(arr):
    """Sort descending using Max-Heap (negate trick)"""
    heap = [-x for x in arr]
    heapq.heapify(heap)
    return [-heapq.heappop(heap) for _ in range(len(heap))]

# ── Usage ──
data = [3, 9, 2, 7, 1, 8, 4, 6, 5]
print("Input:     ", data)

min_h = build_min_heap(data)
print("Min-Heap:  ", min_h)   # root = 1 (smallest)

max_h = build_max_heap(data)
print("Max-Heap:  ", [-x for x in max_h])  # root = 9 (largest)

asc  = heap_sort_asc(data)
desc = heap_sort_desc(data)
print("Asc sort:  ", asc)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]
print("Desc sort: ", desc)  # [9, 8, 7, 6, 5, 4, 3, 2, 1]

# K largest elements — O(N log K)
k = 3
print(f"Top {k} largest:", heapq.nlargest(k, data))   # [9, 8, 7]
print(f"Top {k} smallest:", heapq.nsmallest(k, data)) # [1, 2, 3]`,

    java: `import java.util.*;

public class BinaryHeapDemo {

    // Heapify down for Max-Heap
    static void heapifyDown(int[] arr, int i, int n) {
        int largest = i;
        int left    = 2 * i + 1;
        int right   = 2 * i + 2;

        if (left  < n && arr[left]  > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            int tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
            heapifyDown(arr, largest, n);
        }
    }

    // Build Max-Heap in O(N) using Floyd's algorithm
    static void buildHeap(int[] arr) {
        int n = arr.length;
        // Start from last internal node, go up to root
        for (int i = n / 2 - 1; i >= 0; i--)
            heapifyDown(arr, i, n);
    }

    // Heap Sort — in-place, O(N log N)
    static void heapSort(int[] arr) {
        buildHeap(arr);  // Step 1: build Max-Heap
        for (int i = arr.length - 1; i > 0; i--) {
            // Move max to end
            int tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp;
            heapifyDown(arr, 0, i);  // re-heapify smaller heap
        }
    }

    public static void main(String[] args) {
        int[] arr = {3, 9, 2, 7, 1, 8, 4, 6, 5};

        System.out.print("Input:  ");
        for (int x : arr) System.out.print(x + " ");

        buildHeap(arr);
        System.out.print("\\nHeap:   ");
        for (int x : arr) System.out.print(x + " ");
        System.out.println("  (root = " + arr[0] + ")");

        // Reset and sort
        arr = new int[]{3, 9, 2, 7, 1, 8, 4, 6, 5};
        heapSort(arr);
        System.out.print("Sorted: ");
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}`,

    c: `#include <stdio.h>

// ── Build Heap + Heap Sort in C ──

void swap(int *a, int *b) { int t=*a; *a=*b; *b=t; }

// Fix heap property at index i (Max-Heap)
void heapifyDown(int arr[], int n, int i) {
    int largest = i;
    int left  = 2*i + 1;
    int right = 2*i + 2;

    if (left  < n && arr[left]  > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapifyDown(arr, n, largest);
    }
}

// Build Max-Heap — O(N)
void buildHeap(int arr[], int n) {
    // Start from last non-leaf, work upward
    for (int i = n/2 - 1; i >= 0; i--)
        heapifyDown(arr, n, i);
}

// Heap Sort — O(N log N), in-place
void heapSort(int arr[], int n) {
    buildHeap(arr, n);            // build heap first

    for (int i = n-1; i > 0; i--) {
        swap(&arr[0], &arr[i]);   // move max to end
        heapifyDown(arr, i, 0);   // fix remaining heap
    }
}

void print(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {3, 9, 2, 7, 1, 8, 4, 6, 5};
    int n = 9;

    printf("Input:  "); print(arr, n);

    buildHeap(arr, n);
    printf("Heap:   "); print(arr, n);  // root = 9

    int arr2[] = {3, 9, 2, 7, 1, 8, 4, 6, 5};
    heapSort(arr2, n);
    printf("Sorted: "); print(arr2, n); // 1 2 3 ... 9
    return 0;
}`,

    js: `// ── Binary Heap — Build + Heap Sort ──

// Heapify down for Max-Heap
function heapifyDown(arr, i, n) {
    let largest = i;
    const left  = 2 * i + 1;
    const right = 2 * i + 2;

    if (left  < n && arr[left]  > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];  // swap
        heapifyDown(arr, largest, n);  // continue fixing downward
    }
}

// Build Max-Heap from any array — O(N) (Floyd's algorithm)
function buildMaxHeap(arr) {
    const n = arr.length;
    // All leaves are already valid heaps — start from last non-leaf
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyDown(arr, i, n);
    }
    return arr;  // modified in place
}

// Heap Sort — O(N log N), in-place
function heapSort(arr) {
    buildMaxHeap(arr);  // Step 1: build heap

    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];  // move max to end
        heapifyDown(arr, 0, i);               // fix smaller heap
    }
    return arr;  // sorted ascending
}

// ── Usage ──
const data = [3, 9, 2, 7, 1, 8, 4, 6, 5];

console.log("Input:", data.join(' '));

const heap = [...data];
buildMaxHeap(heap);
console.log("Max-Heap:", heap.join(' '));   // root = 9

const sorted = [...data];
heapSort(sorted);
console.log("Sorted:", sorted.join(' '));   // 1 2 3 4 5 6 7 8 9

// K largest in O(N log K) using Min-Heap
function kLargest(arr, k) {
    // Keep a min-heap of size k
    const minHeap = arr.slice(0, k).sort((a, b) => a - b);
    for (let i = k; i < arr.length; i++) {
        if (arr[i] > minHeap[0]) {
            minHeap[0] = arr[i];
            // Fix heap property
            let j = 0;
            while (true) {
                let smallest = j, l = 2*j+1, r = 2*j+2;
                if (l < k && minHeap[l] < minHeap[smallest]) smallest = l;
                if (r < k && minHeap[r] < minHeap[smallest]) smallest = r;
                if (smallest === j) break;
                [minHeap[j], minHeap[smallest]] = [minHeap[smallest], minHeap[j]];
                j = smallest;
            }
        }
    }
    return minHeap.sort((a, b) => b - a);
}

console.log("Top 3 largest:", kLargest(data, 3));  // [9, 8, 7]`,
  },
};


//  CODEMIRROR SETUP


function getCMTheme(t) {
  if (t === "light") return "eclipse";
  if (t === "blue") return "nord";
  return "material-ocean";
}

function initEditor() {
  var theme = document.body.getAttribute("data-theme") || "dark";
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-c++src",
    theme: getCMTheme(theme),
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });
  codeEditor.setValue(CODE_TEMPLATES.maxheap.cpp);
}

// language tab clicks
document.querySelectorAll(".l-tab").forEach(function (btn) {
  btn.onclick = function () {
    var lang = btn.dataset.lang;
    document.querySelectorAll(".l-tab").forEach(function (b) {
      b.classList.remove("on");
    });
    btn.classList.add("on");

    var modeMap = {
      cpp: "text/x-c++src",
      python: "text/x-python",
      java: "text/x-java",
      c: "text/x-csrc",
      js: "text/javascript",
    };

    var names = {
      cpp: "C++",
      python: "Python",
      java: "Java",
      c: "C",
      js: "JavaScript",
    };

    currentLang = lang;
    document.getElementById("lang-display").textContent = names[lang];
    codeEditor.setOption("mode", modeMap[lang]);
    codeEditor.setValue(CODE_TEMPLATES[mainType][lang]);
  };
});

function copyCode() {
  navigator.clipboard.writeText(codeEditor.getValue()).then(function () {
    var btn = document.querySelector(".copy-btn");
    btn.textContent = "✓";
    btn.style.background = "var(--green)";
    setTimeout(function () {
      btn.textContent = "Copy";
      btn.style.background = "var(--purple)";
    }, 2000);
  });
}

function runCode() {
  var out = document.getElementById("code-out");
  var lang = currentLang;
  var type = mainType;

  out.innerHTML =
    '<span style="color:var(--orange);">🔄 Simulating ' +
    type +
    " in " +
    lang +
    "...</span><br><br>";

  // Simple JavaScript simulation for demo output
  setTimeout(function () {
    var lines = [];

    if (type === "maxheap") {
      var values = [50, 30, 80, 10, 60];
      var simHeap = [];
      values.forEach(function (v) {
        heapInsert(simHeap, v, "maxheap");
        lines.push(
          '<span style="color:var(--green);">insert(' +
            v +
            ")  →  root = " +
            simHeap[0] +
            "</span>",
        );
      });
      lines.push("");
      lines.push(
        '<span style="color:var(--cyan);">Max peek: ' + simHeap[0] + "</span>",
      );
      lines.push(
        '<span style="color:var(--cyan);">Size: ' + simHeap.length + "</span>",
      );
      lines.push("");
      lines.push('<span style="color:var(--orange);">Extract order:</span>');
      var extracted = [];
      while (simHeap.length > 0)
        extracted.push(heapExtract(simHeap, "maxheap"));
      lines.push(
        '<span style="color:var(--txt2);">' + extracted.join("  ") + "</span>",
      );
    } else if (type === "minheap") {
      var values = [5, 3, 8, 1, 6, 4, 2];
      var simHeap = [];
      values.forEach(function (v) {
        heapInsert(simHeap, v, "minheap");
        lines.push(
          '<span style="color:var(--green);">insert(' +
            v +
            ")  →  root = " +
            simHeap[0] +
            "</span>",
        );
      });
      lines.push("");
      lines.push(
        '<span style="color:var(--cyan);">Min peek: ' + simHeap[0] + "</span>",
      );
      lines.push(
        '<span style="color:var(--cyan);">Size: ' + simHeap.length + "</span>",
      );
      lines.push("");
      var extracted = [];
      while (simHeap.length > 0)
        extracted.push(heapExtract(simHeap, "minheap"));
      lines.push(
        '<span style="color:var(--orange);">Sorted asc: </span><span style="color:var(--txt2);">' +
          extracted.join("  ") +
          "</span>",
      );
    } else {
      // binary — build heap + sort
      var arr = [3, 9, 2, 7, 1, 8, 4, 6, 5];
      lines.push(
        '<span style="color:var(--orange);">Input: ' +
          arr.join(" ") +
          "</span>",
      );
      var built = [...arr];
      buildHeap(built, "binary");
      lines.push(
        '<span style="color:var(--cyan);">Max-Heap: ' +
          built.join(" ") +
          "</span>",
      );
      lines.push(
        '<span style="color:var(--txt2);">  root = ' +
          built[0] +
          "  (largest)</span>",
      );
      lines.push("");
      var sorted = [...arr];
      buildHeap(sorted, "binary");
      // do heap sort manually
      for (var i = sorted.length - 1; i > 0; i--) {
        var tmp = sorted[0];
        sorted[0] = sorted[i];
        sorted[i] = tmp;
        heapifyDown(sorted, 0, i, "binary");
      }
      lines.push(
        '<span style="color:var(--green);">Sorted asc: ' +
          sorted.join(" ") +
          "</span>",
      );
    }

    lines.push("");
    lines.push(
      '<span style="color:var(--green);">✓ Execution complete!</span>',
    );
    out.innerHTML = lines.join("<br>");
  }, 600);
}


//  MOBILE NAV / THEME

var drawer = document.getElementById("drawer");
var drawerOpen = false;

document.getElementById("menuBtn").addEventListener("click", function () {
  drawerOpen = !drawerOpen;
  drawer.classList.toggle("open", drawerOpen);
});

document.addEventListener("click", function (e) {
  if (
    drawerOpen &&
    !drawer.contains(e.target) &&
    !document.getElementById("menuBtn").contains(e.target)
  ) {
    drawerOpen = false;
    drawer.classList.remove("open");
  }
});

drawer.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    drawerOpen = false;
    drawer.classList.remove("open");
  });
});

var THEME_ICONS = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  document.getElementById("themeIcon").innerHTML = THEME_ICONS[t];
  localStorage.setItem("dsa-theme", t);
  if (codeEditor) codeEditor.setOption("theme", getCMTheme(t));
}

document.getElementById("themeBtn").addEventListener("click", function () {
  var themes = ["dark", "light", "blue"];
  var current = localStorage.getItem("dsa-theme") || "dark";
  var next = themes[(themes.indexOf(current) + 1) % 3];
  applyTheme(next);
});


//  LEVEL BUTTONS + MODAL


var ALGO_KEY = "heap";
var L3_KEY = ALGO_KEY + "_l3_unlocked";
var modal = document.getElementById("modal");

function updateLevelBtns() {
  if (localStorage.getItem(L3_KEY) === "true") {
    var b = document.getElementById("l3");
    b.style.cssText =
      "border-color:var(--green);background:rgba(16,185,129,0.12);color:var(--green)";
  }
}

document.getElementById("l3").addEventListener("click", function () {
  if (localStorage.getItem(L3_KEY) === "true") {
    window.location.href = "heap_l3.html";
    return;
  }
  document.getElementById("modal-msg").textContent =
    "Pass the Level 2 Quiz to unlock Level 3 and complete your Heap journey!";
  modal.classList.add("open");
  document.getElementById("startQuiz").onclick = function () {
    window.location.href = "quiz.html?id=heap-l2";
  };
});

document.getElementById("cancelBtn").addEventListener("click", function () {
  modal.classList.remove("open");
});

window.addEventListener("click", function (e) {
  if (e.target === modal) modal.classList.remove("open");
});


//  INIT — Run on page load


window.addEventListener("load", function () {

  var saved = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(saved);

  initEditor();

  
  renderMain();
  insReset();
  extReset();
  peekReset();
  buildReset();

 
  document.getElementById("ctype-max").className = "ctl ctl-cyan";
  customReset();

  updateLevelBtns();
});
