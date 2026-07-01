
var themes = ["dark", "light", "blue"];
var themeIcons = {
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

document.getElementById("themeToggle").addEventListener("click", function () {
  var cur = localStorage.getItem("dsa-theme") || "dark";
  var next = themes[(themes.indexOf(cur) + 1) % 3];
  applyTheme(next);
});

applyTheme(localStorage.getItem("dsa-theme") || "dark");

var hamburger = document.getElementById("hamburger");
var navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
  var spans = hamburger.querySelectorAll("span");
  var isOpen = navLinks.classList.contains("open");
  spans[0].style.transform = isOpen ? "rotate(45deg) translate(5px,5px)" : "";
  spans[1].style.opacity = isOpen ? "0" : "1";
  spans[2].style.transform = isOpen ? "rotate(-45deg) translate(5px,-5px)" : "";
});

navLinks.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

// Build mini-cells in a container
function buildCells(elId, arr, classes) {
  var el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    var cell = document.createElement("div");
    cell.className = "mcell " + (classes[i] || "def");
    cell.textContent = arr[i];
    el.appendChild(cell);
  }
}

// Simple max-heap operations
// Note: using 0-indexed array, parent = floor((i-1)/2)
function heapInsertMax(arr, val) {
  arr.push(val);
  var i = arr.length - 1;
  // bubble up while parent is smaller
  while (i > 0 && arr[Math.floor((i - 1) / 2)] < arr[i]) {
    var p = Math.floor((i - 1) / 2);
    var tmp = arr[p];
    arr[p] = arr[i];
    arr[i] = tmp;
    i = p;
  }
}

function heapInsertMin(arr, val) {
  arr.push(val);
  var i = arr.length - 1;
  // bubble up while parent is larger (min-heap rule)
  while (i > 0 && arr[Math.floor((i - 1) / 2)] > arr[i]) {
    var p = Math.floor((i - 1) / 2);
    var tmp = arr[p];
    arr[p] = arr[i];
    arr[i] = tmp;
    i = p;
  }
}

function heapExtractMax(arr) {
  if (arr.length === 0) return null;
  var max = arr[0];
  arr[0] = arr[arr.length - 1];
  arr.pop();
  heapifyDownMax(arr, 0);
  return max;
}

function heapExtractMin(arr) {
  if (arr.length === 0) return null;
  var min = arr[0];
  arr[0] = arr[arr.length - 1];
  arr.pop();
  heapifyDownMin(arr, 0);
  return min;
}

function heapifyDownMax(arr, i) {
  var n = arr.length;
  while (true) {
    var largest = i;
    var l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest === i) break;
    var tmp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = tmp;
    i = largest;
  }
}

function heapifyDownMin(arr, i) {
  var n = arr.length;
  while (true) {
    var smallest = i;
    var l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < n && arr[l] < arr[smallest]) smallest = l;
    if (r < n && arr[r] < arr[smallest]) smallest = r;
    if (smallest === i) break;
    var tmp = arr[i];
    arr[i] = arr[smallest];
    arr[smallest] = tmp;
    i = smallest;
  }
}

//
//  CONCEPT VISUALIZER — MAX-HEAP TREE
//

var conceptHeap = [90, 70, 80, 40, 60, 55, 30];
var conceptStep = 0;

// Draw heap tree as SVG inside #conceptSvg
function drawConceptTree(hlIdx) {
  var svg = document.getElementById("conceptSvg");
  svg.innerHTML = "";
  var arr = conceptHeap;
  var n = arr.length;
  if (n === 0) {
    svg.innerHTML =
      '<text x="200" y="80" fill="#2a2a2a" font-size="14" text-anchor="middle">Heap empty!</text>';
    return;
  }

  // Pre-calculated positions for up to 7 nodes — 3 levels
  var positions = [
    { x: 200, y: 28 }, // 0: root
    { x: 110, y: 80 },
    { x: 290, y: 80 }, // 1, 2
    { x: 60, y: 132 },
    { x: 160, y: 132 },
    { x: 240, y: 132 },
    { x: 340, y: 132 }, // 3-6
  ];

  var colorMap = {
    default: "#8b5cf6",
    root: "#8b5cf6",
    active: "#f43f5e",
    sift: "#f59e0b",
  };

  // Draw edges first
  for (var i = 1; i < n; i++) {
    var p = Math.floor((i - 1) / 2);
    if (!positions[i] || !positions[p]) continue;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", positions[p].x);
    line.setAttribute("y1", positions[p].y);
    line.setAttribute("x2", positions[i].x);
    line.setAttribute("y2", positions[i].y);
    line.setAttribute("stroke", "#2a2a2a");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
  }

  // Draw nodes
  for (var i = 0; i < n && i < positions.length; i++) {
    var x = positions[i].x,
      y = positions[i].y;
    var fill = i === 0 ? "#8b5cf6" : "#2a2a2a";
    if (i === hlIdx && i === 0)
      fill = "#f43f5e"; // root being extracted
    else if (i === hlIdx) fill = "#f59e0b"; // sifting down

    var circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "22");
    circle.setAttribute("fill", fill);
    svg.appendChild(circle);

    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "13");
    text.setAttribute("font-weight", "700");
    text.setAttribute("font-family", "JetBrains Mono, monospace");
    text.setAttribute("fill", "#ffffff");
    text.textContent = arr[i];
    svg.appendChild(text);
  }

  // Label root
  if (n > 0 && positions[0]) {
    var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lbl.setAttribute("x", positions[0].x + 28);
    lbl.setAttribute("y", positions[0].y + 5);
    lbl.setAttribute("font-size", "10");
    lbl.setAttribute("fill", "#8b5cf6");
    lbl.setAttribute("font-family", "JetBrains Mono, monospace");
    lbl.setAttribute("font-weight", "700");
    lbl.textContent = "← MAX";
    svg.appendChild(lbl);
  }
}

function conceptStep() {
  if (conceptHeap.length === 0) {
    document.getElementById("conceptMsg").textContent =
      "Heap empty! Click Reset to start over.";
    return;
  }
  drawConceptTree(0); // highlight root (being extracted)
  var extracted = heapExtractMax(conceptHeap);
  setTimeout(function () {
    drawConceptTree(-1);
    document.getElementById("conceptMsg").innerHTML =
      'Extracted max = <strong style="color:var(--rose)">' +
      extracted +
      "</strong>" +
      " — last element moved to root, heapify-down ran in O(log N). " +
      (conceptHeap.length > 0
        ? "New root = " + conceptHeap[0] + "."
        : "Heap is now empty.");
  }, 300);
}

function conceptReset() {
  conceptHeap = [90, 70, 80, 40, 60, 55, 30];
  drawConceptTree(-1);
  document.getElementById("conceptMsg").textContent =
    'Click "Extract Max" — watch how the heap fixes itself in O(log N)';
}

drawConceptTree(-1);

//
//  1. PRIORITY QUEUE — HOSPITAL TRIAGE
//

// Patients: [name, priority] higher priority = serve first
var PQ_PATIENTS = [
  ["Critical (P1)", 10],
  ["High (P2)", 8],
  ["Moderate (P3)", 5],
  ["Low (P4)", 3],
  ["Minor (P5)", 1],
  ["Urgent (P1)", 10],
  ["High (P2)", 7],
];

var pqHeap = []; // max-heap of priority values
var pqLabels = []; // parallel array of labels
var pqIdx = 0;
var pqTreated = 0;

function pqHeapInsert(label, priority) {
  pqHeap.push(priority);
  pqLabels.push(label);
  var i = pqHeap.length - 1;
  // bubble up by priority
  while (i > 0) {
    var p = Math.floor((i - 1) / 2);
    if (pqHeap[p] < pqHeap[i]) {
      var tmp = pqHeap[p];
      pqHeap[p] = pqHeap[i];
      pqHeap[i] = tmp;
      tmp = pqLabels[p];
      pqLabels[p] = pqLabels[i];
      pqLabels[i] = tmp;
      i = p;
    } else break;
  }
}

function pqRenderCells() {
  var vals = pqHeap.map(function (v, i) {
    return "P" + v;
  });
  var cls = pqHeap.map(function (v, i) {
    if (i === 0) return "root";
    return v >= 8 ? "active" : v >= 5 ? "visited" : "def";
  });
  buildCells("pqCells", vals, cls);
  document.getElementById("pqWaiting").textContent = pqHeap.length;
  document.getElementById("pqTreated").textContent = pqTreated;
}

function pqAdmit() {
  if (pqIdx >= PQ_PATIENTS.length) {
    document.getElementById("pqStatus").innerHTML =
      "All patients admitted! Treat them now.";
    return;
  }
  var patient = PQ_PATIENTS[pqIdx];
  pqHeapInsert(patient[0], patient[1]);
  document.getElementById("pqStatus").innerHTML =
    "Admitted: <span>" +
    patient[0] +
    "</span> (priority " +
    patient[1] +
    ")" +
    " — heap root = highest priority: <span>" +
    pqLabels[0] +
    "</span>";
  pqIdx++;
  pqRenderCells();
}

function pqTreat() {
  if (pqHeap.length === 0) {
    document.getElementById("pqStatus").innerHTML =
      "⚠ Queue empty — admit patients first!";
    return;
  }
  var label = pqLabels[0];
  var priority = pqHeap[0];
  // Extract max from both arrays simultaneously
  pqHeap[0] = pqHeap[pqHeap.length - 1];
  pqHeap.pop();
  pqLabels[0] = pqLabels[pqLabels.length - 1];
  pqLabels.pop();
  // heapify-down (Note: using simple recursive approach here for readability)
  var i = 0;
  while (true) {
    var largest = i,
      l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < pqHeap.length && pqHeap[l] > pqHeap[largest]) largest = l;
    if (r < pqHeap.length && pqHeap[r] > pqHeap[largest]) largest = r;
    if (largest === i) break;
    var tmp = pqHeap[i];
    pqHeap[i] = pqHeap[largest];
    pqHeap[largest] = tmp;
    tmp = pqLabels[i];
    pqLabels[i] = pqLabels[largest];
    pqLabels[largest] = tmp;
    i = largest;
  }
  pqTreated++;
  document.getElementById("pqStatus").innerHTML =
    "✓ Treating: <span>" +
    label +
    "</span> (priority " +
    priority +
    ")" +
    (pqHeap.length > 0
      ? " — Next: <span>" + pqLabels[0] + "</span>"
      : " — Queue now empty");
  pqRenderCells();
}

function pqReset() {
  pqHeap = [];
  pqLabels = [];
  pqIdx = 0;
  pqTreated = 0;
  buildCells("pqCells", [], []);
  document.getElementById("pqStatus").innerHTML =
    "Priority Queue empty — admit patients to begin";
  document.getElementById("pqWaiting").textContent = "0";
  document.getElementById("pqTreated").textContent = "0";
}

//
//  2. DIJKSTRA'S
//

// Simple 6-node graph simulation: nodes A-F with preset distances
var DIJK_NODES = ["A", "B", "C", "D", "E", "F"];
var DIJK_DISTS = [0, Infinity, Infinity, Infinity, Infinity, Infinity];
var DIJK_VISITED = [];
var DIJK_UPDATES = [
  // Each step: [nodeIdx, newDist, via]
  {
    node: 1,
    dist: 4,
    via: "A",
    frontier: [
      { n: 1, d: 4 },
      { n: 2, d: 8 },
    ],
  },
  {
    node: 2,
    dist: 8,
    via: "A",
    frontier: [
      { n: 2, d: 7 },
      { n: 3, d: 12 },
    ],
  },
  {
    node: 3,
    dist: 11,
    via: "B",
    frontier: [
      { n: 3, d: 11 },
      { n: 4, d: 15 },
    ],
  },
  {
    node: 4,
    dist: 9,
    via: "C",
    frontier: [
      { n: 4, d: 9 },
      { n: 5, d: 20 },
    ],
  },
  { node: 5, dist: 14, via: "D", frontier: [] },
];
var dijkPhase = 0;

function dijkRenderNodes(activeIdx) {
  var labels = DIJK_NODES.map(function (n, i) {
    return n + ":" + (DIJK_DISTS[i] === Infinity ? "∞" : DIJK_DISTS[i]);
  });
  var cls = DIJK_NODES.map(function (n, i) {
    if (DIJK_VISITED.indexOf(i) !== -1) return "found";
    if (i === activeIdx) return "active";
    if (DIJK_DISTS[i] < Infinity) return "visited";
    return "def";
  });
  buildCells("dijkNodes", labels, cls);
}

function dijkStep() {
  if (dijkPhase >= DIJK_UPDATES.length) {
    document.getElementById("dijkStatus").innerHTML =
      "✅ All nodes settled — shortest paths from A found!";
    document.getElementById("dijkInfo").textContent =
      "A→B:4  A→C:7  A→D:11  A→E:9  A→F:14";
    dijkRenderNodes(-1);
    return;
  }
  var step = DIJK_UPDATES[dijkPhase];
  DIJK_DISTS[step.node] = step.dist;
  DIJK_VISITED.push(dijkPhase === 0 ? 0 : step.node - 1); // mark previous as done
  dijkRenderNodes(step.node);
  document.getElementById("dijkStatus").innerHTML =
    "Min-heap extracted <span>" +
    DIJK_NODES[step.node] +
    "</span>" +
    " (dist=" +
    step.dist +
    " via " +
    step.via +
    ")";
  document.getElementById("dijkInfo").textContent =
    "Updated neighbors via heap — O(log V) per extraction";
  dijkPhase++;
}

function dijkReset() {
  DIJK_DISTS = [0, Infinity, Infinity, Infinity, Infinity, Infinity];
  DIJK_VISITED = [];
  dijkPhase = 0;
  dijkRenderNodes(-1);
  document.getElementById("dijkStatus").innerHTML =
    "Min-heap frontier: start from node A (dist 0)";
  document.getElementById("dijkInfo").textContent = "";
}

dijkRenderNodes(-1);

//
//  3. HEAP SORT
//

var HS_INPUT = [42, 17, 65, 9, 33, 58, 24, 81];
var hsArr = [];
var hsN = HS_INPUT.length;
var hsPhase = "build"; // 'build' -> 'sort'
var hsBuildI = 0;
var hsSortI = 0;
var hsAutoTmr = null;

function hsRenderCells(activeIdx, sortedFrom) {
  var cls = hsArr.map(function (v, i) {
    if (i >= sortedFrom) return "found";
    if (i === activeIdx) return "active";
    return "def";
  });
  buildCells("hsCells", hsArr, cls);
  document.getElementById("hsHeapSz").textContent = sortedFrom;
  document.getElementById("hsSorted").textContent = hsArr.length - sortedFrom;
}

function hsStep() {
  if (hsPhase === "build") {
    // Build max-heap using Floyd's (heapify-down all non-leaves)
    if (hsBuildI === 0) {
      hsArr = [...HS_INPUT];
      hsN = hsArr.length;
    }
    var startI = Math.floor(hsN / 2) - 1;
    var curI = startI - hsBuildI;
    if (curI >= 0) {
      heapifyDownMax(hsArr, curI);
      hsBuildI++;
      document.getElementById("hsStatus").innerHTML =
        "Build phase: heapifyDown(<span>" +
        curI +
        "</span>) — O(N) Floyd's algorithm";
      hsRenderCells(curI, hsArr.length);
    } else {
      hsPhase = "sort";
      hsSortI = hsArr.length - 1;
      document.getElementById("hsStatus").innerHTML =
        "Heap built! ✓ Root = <span>" +
        hsArr[0] +
        "</span> — now extracting max to sorted position";
      hsRenderCells(-1, hsArr.length);
    }
    return;
  }

  // Sort phase: swap root with last unsorted, heapify-down
  if (hsSortI <= 0) {
    document.getElementById("hsStatus").innerHTML =
      "✅ Array sorted! Heap sort complete — O(N log N)";
    hsRenderCells(-1, 0);
    return;
  }

  var extracted = hsArr[0];
  // Swap root with current last
  var tmp = hsArr[0];
  hsArr[0] = hsArr[hsSortI];
  hsArr[hsSortI] = tmp;
  hsSortI--;
  // Heapify-down within the shrunk heap
  var i = 0,
    n = hsSortI + 1;
  while (true) {
    var largest = i,
      l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < n && hsArr[l] > hsArr[largest]) largest = l;
    if (r < n && hsArr[r] > hsArr[largest]) largest = r;
    if (largest === i) break;
    var tmp2 = hsArr[i];
    hsArr[i] = hsArr[largest];
    hsArr[largest] = tmp2;
    i = largest;
  }

  document.getElementById("hsStatus").innerHTML =
    "Placed <span>" +
    extracted +
    "</span> at sorted position — heap size now " +
    (hsSortI + 1);
  hsRenderCells(-1, hsSortI + 1);
}

function hsAuto() {
  clearTimeout(hsAutoTmr);
  function next() {
    hsStep();
    var done = hsPhase === "sort" && hsSortI <= 0;
    if (!done) hsAutoTmr = setTimeout(next, 650);
  }
  next();
}

function hsReset() {
  clearTimeout(hsAutoTmr);
  hsArr = [...HS_INPUT];
  hsN = hsArr.length;
  hsPhase = "build";
  hsBuildI = 0;
  hsSortI = 0;
  buildCells(
    "hsCells",
    hsArr,
    hsArr.map(function () {
      return "def";
    }),
  );
  document.getElementById("hsStatus").innerHTML =
    "Array ready — step through heap sort";
  document.getElementById("hsHeapSz").textContent = hsArr.length;
  document.getElementById("hsSorted").textContent = "0";
}

hsReset();

//
//  4. TOP-K (K-TH LARGEST)
//

// Stream of values to process one by one
var TOPK_STREAM = [3, 10, 7, 4, 15, 1, 12, 6, 9];
var topkK = 3;
var topkHeap = []; // min-heap of size K
var topkIdx = 0;

function topkRender(streamActive) {
  // Stream cells
  var sCls = TOPK_STREAM.map(function (v, i) {
    if (i < topkIdx - 1) return "visited";
    if (i === topkIdx - 1) return streamActive ? "active" : "visited";
    return "def";
  });
  buildCells("topkStream", TOPK_STREAM, sCls);

  // Heap cells (sorted for display — real heap keeps unsorted)
  var hCls = topkHeap.map(function (v, i) {
    return i === 0 ? "root" : "visited";
  });
  buildCells("topkHeap", topkHeap, hCls);
}

function topkStep() {
  if (topkIdx >= TOPK_STREAM.length) {
    document.getElementById("topkStatus").innerHTML =
      "✅ Done! Top-" +
      topkK +
      " values: <span>" +
      [...topkHeap]
        .sort(function (a, b) {
          return b - a;
        })
        .join(", ") +
      "</span>";
    topkRender(false);
    return;
  }

  var val = TOPK_STREAM[topkIdx];
  topkIdx++;

  if (topkHeap.length < topkK) {
    // Heap not full — just insert
    heapInsertMin(topkHeap, val);
    document.getElementById("topkStatus").innerHTML =
      "Added <span>" +
      val +
      "</span> — heap not full yet (" +
      topkHeap.length +
      "/" +
      topkK +
      ")";
  } else if (val > topkHeap[0]) {
    // Larger than current min — replace root
    var replaced = topkHeap[0];
    topkHeap[0] = val;
    heapifyDownMin(topkHeap, 0);
    document.getElementById("topkStatus").innerHTML =
      "Stream <span>" +
      val +
      "</span> > heap min (" +
      replaced +
      ") — replace! Heap root now: " +
      topkHeap[0];
  } else {
    document.getElementById("topkStatus").innerHTML =
      "Stream <span>" +
      val +
      "</span> ≤ heap min (" +
      topkHeap[0] +
      ") — skip, not in top-" +
      topkK;
  }

  topkRender(true);
}

function topkReset() {
  topkHeap = [];
  topkIdx = 0;
  topkRender(false);
  document.getElementById("topkStatus").innerHTML =
    "Stream 9 values — keep top 3 using min-heap";
}

topkReset();

var MED_STREAM = [5, 15, 1, 3, 8, 12, 7, 20, 9];
var medLowH = []; // max-heap (lower half)
var medHighH = []; // min-heap (upper half)
var medIdx = 0;

function medRender() {
  // Show lower half (max-heap, display sorted desc)
  var low = [...medLowH];
  buildCells(
    "medLow",
    low,
    low.map(function (v, i) {
      return i === 0 ? "active" : "visited";
    }),
  );

  // Show upper half (min-heap)
  var high = [...medHighH];
  buildCells(
    "medHigh",
    high,
    high.map(function (v, i) {
      return i === 0 ? "new" : "def";
    }),
  );
}

function medStep() {
  if (medIdx >= MED_STREAM.length) {
    document.getElementById("medStatus").innerHTML =
      "✅ Stream complete — get median O(1) anytime!";
    medRender();
    return;
  }

  var val = MED_STREAM[medIdx];
  medIdx++;

  // Insert into correct heap
  // Note: if val <= max of lower half, goes to lower; else upper
  if (medLowH.length === 0 || val <= medLowH[0]) {
    heapInsertMax(medLowH, val);
  } else {
    heapInsertMin(medHighH, val);
  }

  // Balance: sizes must differ by at most 1
  if (medLowH.length > medHighH.length + 1) {
    var moved = heapExtractMax(medLowH);
    heapInsertMin(medHighH, moved);
  } else if (medHighH.length > medLowH.length) {
    var moved = heapExtractMin(medHighH);
    heapInsertMax(medLowH, moved);
  }

  // Compute median
  var median;
  if (medLowH.length === medHighH.length) {
    median = ((medLowH[0] || 0) + (medHighH[0] || 0)) / 2;
  } else {
    median = medLowH[0];
  }

  medRender();
  document.getElementById("medStatus").innerHTML =
    "Added <span>" +
    val +
    "</span> → Median = <span>" +
    median +
    "</span>" +
    " | Low-heap: " +
    medLowH.length +
    " | High-heap: " +
    medHighH.length;
}

function medReset() {
  medLowH = [];
  medHighH = [];
  medIdx = 0;
  medRender();
  document.getElementById("medStatus").innerHTML =
    "Stream numbers one by one — median stays O(1)";
}

medReset();

var SCHED_JOBS = [
  { name: "Render", priority: 5, time: 3 },
  { name: "Download", priority: 2, time: 1 },
  { name: "DB Write", priority: 8, time: 5 },
  { name: "Compress", priority: 4, time: 2 },
  { name: "Network", priority: 9, time: 4 },
  { name: "Backup", priority: 1, time: 6 },
  { name: "Encrypt", priority: 7, time: 3 },
];

var schedH = []; // max-heap [priority, name, time]
var schedHNms = []; // parallel names
var schedHTms = []; // parallel times
var schedJIdx = 0;
var schedDone = 0;
var schedTime = 0;

function schedInsert(name, priority, time) {
  schedH.push(priority);
  schedHNms.push(name);
  schedHTms.push(time);
  var i = schedH.length - 1;
  while (i > 0) {
    var p = Math.floor((i - 1) / 2);
    if (schedH[p] < schedH[i]) {
      // swap all three parallel arrays
      var tmp;
      tmp = schedH[p];
      schedH[p] = schedH[i];
      schedH[i] = tmp;
      tmp = schedHNms[p];
      schedHNms[p] = schedHNms[i];
      schedHNms[i] = tmp;
      tmp = schedHTms[p];
      schedHTms[p] = schedHTms[i];
      schedHTms[i] = tmp;
      i = p;
    } else break;
  }
}

function schedRender() {
  var labels = schedH.map(function (p, i) {
    return schedHNms[i] + "(" + p + ")";
  });
  var cls = schedH.map(function (p, i) {
    if (i === 0) return "root";
    return p >= 7 ? "active" : p >= 4 ? "visited" : "def";
  });
  buildCells("schedCells", labels, cls);
  document.getElementById("schedQ").textContent = schedH.length;
  document.getElementById("schedDone").textContent = schedDone;
  document.getElementById("schedTime").textContent = schedTime + "ms";
}

function schedAdd() {
  if (schedJIdx >= SCHED_JOBS.length) {
    document.getElementById("schedStatus").innerHTML =
      "All jobs queued! Run them now.";
    return;
  }
  var job = SCHED_JOBS[schedJIdx];
  schedInsert(job.name, job.priority, job.time);
  document.getElementById("schedStatus").innerHTML =
    "Queued: <span>" +
    job.name +
    "</span> (priority " +
    job.priority +
    ", " +
    job.time +
    "ms)" +
    " — Highest priority: <span>" +
    schedHNms[0] +
    "</span>";
  schedJIdx++;
  schedRender();
}

function schedRun() {
  if (schedH.length === 0) {
    document.getElementById("schedStatus").innerHTML =
      "⚠ Queue empty — add jobs first!";
    return;
  }
  var name = schedHNms[0],
    priority = schedH[0],
    time = schedHTms[0];
  // Extract max from all three parallel arrays
  schedH[0] = schedH[schedH.length - 1];
  schedH.pop();
  schedHNms[0] = schedHNms[schedHNms.length - 1];
  schedHNms.pop();
  schedHTms[0] = schedHTms[schedHTms.length - 1];
  schedHTms.pop();
  // heapify-down
  var i = 0;
  while (true) {
    var largest = i,
      l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < schedH.length && schedH[l] > schedH[largest]) largest = l;
    if (r < schedH.length && schedH[r] > schedH[largest]) largest = r;
    if (largest === i) break;
    var tmp;
    tmp = schedH[i];
    schedH[i] = schedH[largest];
    schedH[largest] = tmp;
    tmp = schedHNms[i];
    schedHNms[i] = schedHNms[largest];
    schedHNms[largest] = tmp;
    tmp = schedHTms[i];
    schedHTms[i] = schedHTms[largest];
    schedHTms[largest] = tmp;
    i = largest;
  }
  schedDone++;
  schedTime += time;
  document.getElementById("schedStatus").innerHTML =
    "✓ Running: <span>" +
    name +
    "</span> (priority " +
    priority +
    ", +" +
    time +
    "ms)" +
    (schedH.length > 0
      ? " — Next: <span>" + schedHNms[0] + "</span>"
      : " — All done!");
  schedRender();
}

function schedReset() {
  schedH = [];
  schedHNms = [];
  schedHTms = [];
  schedJIdx = 0;
  schedDone = 0;
  schedTime = 0;
  buildCells("schedCells", [], []);
  document.getElementById("schedStatus").innerHTML =
    "Job queue empty — add jobs to begin scheduling";
  document.getElementById("schedQ").textContent = "0";
  document.getElementById("schedDone").textContent = "0";
  document.getElementById("schedTime").textContent = "0";
}

//
//  MODAL
//

var modal = document.getElementById("modal");

document.getElementById("cancelBtn").addEventListener("click", function () {
  modal.classList.remove("open");
});

window.addEventListener("click", function (e) {
  if (e.target === modal) modal.classList.remove("open");
});

//
//  INIT
//

window.addEventListener("load", function () {
  // Draw the concept tree
  drawConceptTree(-1);
});
