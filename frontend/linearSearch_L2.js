let codeEditor;
let currentLang = "cpp";
let currentImpl = "iterative";
let editorImpl = "iterative";

// Main visualizer state
let mainArray = [];
let mainTarget = null;
let mainIdx = 0;
let mainRunning = false;
let mainDone = false;
let mainAutoTimer = null;

let waitingForInput = false;
let currentInputResolver = null;


const codeTemplates = {
  iterative: {
    cpp: `#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i;   // Found at index i
    }
    return -1;          // Not found
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    int arr[n];
    cout << "Enter " << n << " elements:" << endl;
    for (int i = 0; i < n; i++) {
        cout << "arr[" << i << "] = ";
        cin >> arr[i];
    }

    int target;
    cout << "Enter target to search: ";
    cin >> target;

    int result = linearSearch(arr, n, target);

    if (result != -1)
        cout << "\\nFound at index: " << result << endl;
    else
        cout << "\\nElement not found in array." << endl;

    return 0;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i        # Found at index i
    return -1               # Not found

# --- Input ---
n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

target = int(input("Enter target to search: "))

# --- Search ---
result = linear_search(arr, target)

if result != -1:
    print(f"\\nFound at index: {result}")
else:
    print("\\nElement not found in array.")`,
    java: `import java.util.Scanner;

public class LinearSearch {

    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target)
                return i;       // Found
        }
        return -1;              // Not found
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            System.out.print("arr[" + i + "] = ");
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter target to search: ");
        int target = sc.nextInt();

        int result = linearSearch(arr, target);
        if (result != -1)
            System.out.println("\\nFound at index: " + result);
        else
            System.out.println("\\nElement not found in array.");
    }
}`,
    c: `#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}

int main() {
    int n;
    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = ", i);
        scanf("%d", &arr[i]);
    }

    int target;
    printf("Enter target to search: ");
    scanf("%d", &target);

    int result = linearSearch(arr, n, target);

    if (result != -1)
        printf("\\nFound at index: %d\\n", result);
    else
        printf("\\nElement not found in array.\\n");

    return 0;
}`,
    javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target)
            return i;       // Found at index i
    }
    return -1;              // Not found
}

// --- Demo ---
const arr    = [5, 3, 8, 1, 9, 2, 7];
const target = 9;

console.log("Array:", arr.join(", "));
console.log("Target:", target);

const result = linearSearch(arr, target);

if (result !== -1)
    console.log("\\nFound at index:", result);
else
    console.log("\\nElement not found in array.");`,
  },

  recursive: {
    cpp: `#include <iostream>
using namespace std;

// Recursive Linear Search
int linearSearchRec(int arr[], int target, int index, int n) {
    // Base case: reached end of array
    if (index == n)
        return -1;

    // Found the target
    if (arr[index] == target)
        return index;

    // Recurse to next index
    return linearSearchRec(arr, target, index + 1, n);
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    int arr[n];
    cout << "Enter " << n << " elements:" << endl;
    for (int i = 0; i < n; i++) {
        cout << "arr[" << i << "] = ";
        cin >> arr[i];
    }

    int target;
    cout << "Enter target to search: ";
    cin >> target;

    // Start search from index 0
    int result = linearSearchRec(arr, target, 0, n);

    if (result != -1)
        cout << "\\nFound at index: " << result
             << "  (after " << result + 1 << " call(s))" << endl;
    else
        cout << "\\nElement not found. (" << n << " recursive calls made)" << endl;

    return 0;
}`,
    python: `def linear_search_rec(arr, target, index=0):
    # Base case 1: index out of bounds — not found
    if index == len(arr):
        return -1

    # Base case 2: found target
    if arr[index] == target:
        return index

    # Recursive case: search next index
    return linear_search_rec(arr, target, index + 1)

# --- Input ---
n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

target = int(input("Enter target to search: "))

# --- Search ---
result = linear_search_rec(arr, target)

if result != -1:
    print(f"\\nFound at index: {result}  ({result+1} recursive call(s))")
else:
    print(f"\\nElement not found. ({len(arr)} recursive calls made)")`,
    java: `import java.util.Scanner;

public class LinearSearchRecursive {

    static int linearSearchRec(int[] arr, int target, int index) {
        // Base case: end of array
        if (index == arr.length)
            return -1;

        // Found target
        if (arr[index] == target)
            return index;

        // Recurse to next index
        return linearSearchRec(arr, target, index + 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            System.out.print("arr[" + i + "] = ");
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter target to search: ");
        int target = sc.nextInt();

        int result = linearSearchRec(arr, target, 0);

        if (result != -1)
            System.out.println("\\nFound at index: " + result +
                "  (" + (result + 1) + " call(s))");
        else
            System.out.println("\\nNot found. (" + n + " recursive calls made)");
    }
}`,
    c: `#include <stdio.h>

int linearSearchRec(int arr[], int target, int index, int n) {
    if (index == n)
        return -1;
    if (arr[index] == target)
        return index;
    return linearSearchRec(arr, target, index + 1, n);
}

int main() {
    int n;
    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = ", i);
        scanf("%d", &arr[i]);
    }

    int target;
    printf("Enter target to search: ");
    scanf("%d", &target);

    int result = linearSearchRec(arr, target, 0, n);

    if (result != -1)
        printf("\\nFound at index: %d  (%d call(s))\\n", result, result + 1);
    else
        printf("\\nNot found. (%d recursive calls made)\\n", n);

    return 0;
}`,
    javascript: `function linearSearchRec(arr, target, index = 0) {
    // Base case 1: array exhausted
    if (index === arr.length)
        return -1;

    // Base case 2: found target
    if (arr[index] === target)
        return index;

    // Recursive case: search next position
    return linearSearchRec(arr, target, index + 1);
}

// --- Demo ---
const arr    = [5, 3, 8, 1, 9, 2, 7];
const target = 9;

console.log("Array:", arr.join(", "));
console.log("Target:", target);

const result = linearSearchRec(arr, target);

if (result !== -1)
    console.log("\\nFound at index:", result, "  (" + (result + 1) + " call(s))");
else
    console.log("\\nElement not found. (" + arr.length + " recursive calls made)");`,
  },
};


function highlightStep(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`.pseudo-step[data-step="${step}"]`);
  if (el) el.classList.add("active");
}


function switchImplementation(type) {
  currentImpl = type;
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  document.getElementById("visualizer-title").textContent =
    "Linear Search Visualizer — " +
    (type === "iterative" ? "Iterative" : "Recursive");

  // show correct pseudo panel
  document.getElementById("pseudo-iterative").style.display =
    type === "iterative" ? "block" : "none";
  document.getElementById("pseudo-recursive").style.display =
    type === "recursive" ? "block" : "none";

  resetSearch();
}


function buildMainVisual(arr) {
  const arrRow = document.getElementById("arrRow");
  const idxRow = document.getElementById("idxRow");
  const ptrRow = document.getElementById("ptrRow");
  arrRow.innerHTML = "";
  idxRow.innerHTML = "";
  ptrRow.innerHTML = "";
  arr.forEach((v, i) => {
    const cell = document.createElement("div");
    cell.className = "arr-cell";
    cell.id = "mc-" + i;
    cell.textContent = v;
    arrRow.appendChild(cell);
    const ic = document.createElement("div");
    ic.className = "idx-cell";
    ic.textContent = i;
    idxRow.appendChild(ic);
    const pc = document.createElement("div");
    pc.className = "ptr-cell";
    pc.id = "mp-" + i;
    ptrRow.appendChild(pc);
  });
}

function setCaption(text, type = "") {
  const box = document.getElementById("captionBox");
  box.className = "caption-box" + (type ? " caption-" + type : "");
  box.textContent = text;
}

function showMsg(text, type) {
  const el = document.getElementById("msg_show");
  el.style.display = "block";
  el.className = "alert alert-" + type;
  el.innerHTML = text;
}

function startSearch() {
  clearTimeout(mainAutoTimer);
  const rawArr = document.getElementById("arrayInput").value.trim();
  const rawTarget = document.getElementById("targetInput").value.trim();
  if (!rawArr || rawTarget === "") {
    showMsg("Please enter an array and a target value.", "danger");
    return;
  }

  mainArray = rawArr
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  mainTarget = parseInt(rawTarget);
  if (!mainArray.length || isNaN(mainTarget)) {
    showMsg("Invalid input. Use comma-separated numbers.", "danger");
    return;
  }

  mainIdx = 0;
  mainRunning = true;
  mainDone = false;

  buildMainVisual(mainArray);
  setCaption(`Searching for ${mainTarget} in [${mainArray.join(", ")}]…`);
  document.getElementById("stepBtn").disabled = false;
  document.getElementById("autoBtn").disabled = false;
  document.getElementById("msg_show").style.display = "none";
  highlightStep(currentImpl === "iterative" ? "init" : "rec-base1");
}

function doMainStep() {
  if (mainDone || !mainRunning) return false;

  // clear previous pointer
  document.querySelectorAll(".ptr-cell").forEach((p) => (p.textContent = ""));
  // clear previous current (not visited)
  for (let i = 0; i < mainIdx; i++) {
    const c = document.getElementById("mc-" + i);
    if (c) c.className = "arr-cell visited";
  }

  if (mainIdx >= mainArray.length) {
    // Not found
    mainArray.forEach((_, i) => {
      const c = document.getElementById("mc-" + i);
      if (c) c.className = "arr-cell not-found";
    });
    setCaption(
      `❌ ${mainTarget} not found after ${mainArray.length} comparisons.`,
      "notfound",
    );
    showMsg(
      `<i class="fas fa-times"></i> Not Found — searched all ${mainArray.length} elements`,
      "danger",
    );
    highlightStep(currentImpl === "iterative" ? "notfound" : "rec-notfound");
    mainDone = true;
    document.getElementById("stepBtn").disabled = true;
    document.getElementById("autoBtn").disabled = true;
    return false;
  }

  const cell = document.getElementById("mc-" + mainIdx);
  const ptr = document.getElementById("mp-" + mainIdx);
  cell.className = "arr-cell current";
  ptr.textContent = "↑ i=" + mainIdx;

  if (currentImpl === "iterative") {
    highlightStep(mainIdx === 0 ? "loop" : "compare");
  } else {
    highlightStep(mainIdx === 0 ? "rec-base1" : "rec-compare");
  }

  if (mainArray[mainIdx] === mainTarget) {
    cell.className = "arr-cell found";
    ptr.className = "ptr-cell found-ptr";
    ptr.textContent = "✓ FOUND";
    setCaption(
      `✅ Found ${mainTarget} at index ${mainIdx}! (${mainIdx + 1} comparison${mainIdx !== 0 ? "s" : ""})`,
      "found",
    );
    showMsg(
      `<i class="fas fa-check"></i> Found at index ${mainIdx} — ${mainIdx + 1} comparison(s)`,
      "success",
    );
    highlightStep(currentImpl === "iterative" ? "found" : "rec-found");
    mainDone = true;
    document.getElementById("stepBtn").disabled = true;
    document.getElementById("autoBtn").disabled = true;
    mainIdx++;
    return false;
  }

  setCaption(
    `Checking index ${mainIdx}: arr[${mainIdx}]=${mainArray[mainIdx]} ≠ ${mainTarget} — moving on…`,
  );
  highlightStep(currentImpl === "iterative" ? "increment" : "rec-recurse");
  mainIdx++;
  return true;
}

function stepSearch() {
  doMainStep();
}

function autoSearch() {
  if (mainDone) return;
  document.getElementById("autoBtn").disabled = true;
  function tick() {
    const cont = doMainStep();
    if (cont && !mainDone) mainAutoTimer = setTimeout(tick, 750);
  }
  tick();
}

function resetSearch() {
  clearTimeout(mainAutoTimer);
  mainArray = [];
  mainTarget = null;
  mainIdx = 0;
  mainRunning = false;
  mainDone = false;
  document.getElementById("arrRow").innerHTML = "";
  document.getElementById("idxRow").innerHTML = "";
  document.getElementById("ptrRow").innerHTML = "";
  setCaption("Enter an array and a target value, then click Search.");
  document.getElementById("msg_show").style.display = "none";
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("autoBtn").disabled = true;
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}


const COLORS_S = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
];

function buildScenarioArray(arrId, idxId, ptrId, data) {
  const arrEl = document.getElementById(arrId);
  const idxEl = document.getElementById(idxId);
  const ptrEl = document.getElementById(ptrId);
  arrEl.innerHTML = idxEl.innerHTML = ptrEl.innerHTML = "";
  data.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "s-cell";
    c.id = arrId + "-c" + i;
    c.textContent = v;
    arrEl.appendChild(c);
    const ix = document.createElement("div");
    ix.className = "s-idx";
    ix.textContent = i;
    idxEl.appendChild(ix);
    const p = document.createElement("div");
    p.className = "s-ptr";
    p.id = arrId + "-p" + i;
    ptrEl.appendChild(p);
  });
}

function sStep(arrId, data, target, idx, logId, onFound, onEnd) {
  document.querySelectorAll(`#${arrId} .s-cell`).forEach((c, i) => {
    if (i < idx) c.className = "s-cell s-visited";
    else c.className = "s-cell";
  });
  document
    .querySelectorAll(`[id^="${arrId}-p"]`)
    .forEach((p) => (p.textContent = ""));
  if (idx >= data.length) {
    onEnd();
    return;
  }

  const cell = document.getElementById(arrId + "-c" + idx);
  const ptr = document.getElementById(arrId + "-p" + idx);
  cell.className = "s-cell s-current";
  ptr.textContent = "↑";

  if (data[idx] === target) {
    cell.className = "s-cell s-found";
    ptr.className = "s-ptr fp";
    ptr.textContent = "✓";
    onFound(idx);
  } else {
    addLog(
      document.getElementById(logId),
      `arr[${idx}] = ${data[idx]} ≠ ${target}`,
      "log-miss",
    );
  }
}

function addLog(logEl, text, cls = "log-info") {
  const e = document.createElement("div");
  e.className = "log-entry " + cls;
  e.textContent = "> " + text;
  logEl.appendChild(e);
  logEl.scrollTop = logEl.scrollHeight;
}

function switchScenario(name) {
  const TAB_ACTIVE = {
    best: "active-best",
    avg: "active-avg",
    worst: "active-worst",
    custom: "active-custom",
  };
  document
    .querySelectorAll(".scenario-tab")
    .forEach((t) => (t.className = "scenario-tab"));
  document.getElementById("stab-" + name).classList.add(TAB_ACTIVE[name]);
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}

/* ── BEST ── */
const BEST_DATA = [10, 20, 30, 40, 50];
const BEST_TARGET = 10;
let bestIdx = 0,
  bestDone = false,
  bestTimer = null;

function initBest() {
  buildScenarioArray("arr-best", "idx-best", "ptr-best", BEST_DATA);
  document.getElementById("log-best").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-best"),
    `Array: [${BEST_DATA.join(", ")}]`,
    "log-info",
  );
  addLog(
    document.getElementById("log-best"),
    `Target: ${BEST_TARGET}  (at index 0 — Best Case)`,
    "log-info",
  );
  bestIdx = 0;
  bestDone = false;
  document.getElementById("best-step-btn").disabled = false;
  document.getElementById("best-auto-btn").disabled = false;
}
function bestStep() {
  if (bestDone) return;
  const log = document.getElementById("log-best");
  sStep(
    "arr-best",
    BEST_DATA,
    BEST_TARGET,
    bestIdx,
    "log-best",
    (idx) => {
      addLog(log, `arr[${idx}] = ${BEST_TARGET} ✓ FOUND!`, "log-found");
      addLog(log, `✓ Best Case: O(1) — found in 1 comparison`, "log-result");
      bestDone = true;
      document.getElementById("best-step-btn").disabled = true;
      document.getElementById("best-auto-btn").disabled = true;
    },
    () => {
      addLog(log, "Not found.", "log-warn");
      bestDone = true;
    },
  );
  bestIdx++;
}
function bestAuto() {
  document.getElementById("best-auto-btn").disabled = true;
  function tick() {
    if (!bestDone) {
      bestStep();
      if (!bestDone) bestTimer = setTimeout(tick, 800);
    }
  }
  tick();
}
function resetBest() {
  clearTimeout(bestTimer);
  initBest();
}

/* ── AVERAGE ── */
const AVG_DATA = [10, 20, 30, 40, 50, 60, 70];
const AVG_TARGET = 40;
let avgIdx = 0,
  avgDone = false,
  avgTimer = null;

function initAvg() {
  buildScenarioArray("arr-avg", "idx-avg", "ptr-avg", AVG_DATA);
  document.getElementById("log-avg").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-avg"),
    `Array: [${AVG_DATA.join(", ")}]`,
    "log-info",
  );
  addLog(
    document.getElementById("log-avg"),
    `Target: ${AVG_TARGET}  (middle — Average Case)`,
    "log-info",
  );
  addLog(
    document.getElementById("log-avg"),
    `Expect ~${Math.ceil(AVG_DATA.length / 2)} comparisons`,
    "log-info",
  );
  avgIdx = 0;
  avgDone = false;
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}
function avgStep() {
  if (avgDone) return;
  const log = document.getElementById("log-avg");
  sStep(
    "arr-avg",
    AVG_DATA,
    AVG_TARGET,
    avgIdx,
    "log-avg",
    (idx) => {
      addLog(log, `arr[${idx}] = ${AVG_TARGET} ✓ FOUND!`, "log-found");
      addLog(
        log,
        `Comparisons: ${idx + 1}  (~N/2 = ${Math.ceil(AVG_DATA.length / 2)})`,
        "log-result",
      );
      addLog(log, `✓ Average Case: O(N/2) = O(N)`, "log-result");
      avgDone = true;
      document.getElementById("avg-step-btn").disabled = true;
      document.getElementById("avg-auto-btn").disabled = true;
    },
    () => {
      addLog(log, "Not found.", "log-warn");
      avgDone = true;
    },
  );
  avgIdx++;
}
function avgAuto() {
  document.getElementById("avg-auto-btn").disabled = true;
  function tick() {
    if (!avgDone) {
      avgStep();
      if (!avgDone) avgTimer = setTimeout(tick, 750);
    }
  }
  tick();
}
function resetAvg() {
  clearTimeout(avgTimer);
  initAvg();
}

/* ── WORST ── */
const WORST_DATA = [10, 20, 30, 40, 50, 60];
const WORST_TARGET = 99;
let worstIdx = 0,
  worstDone = false,
  worstTimer = null;

function initWorst() {
  buildScenarioArray("arr-worst", "idx-worst", "ptr-worst", WORST_DATA);
  document.getElementById("log-worst").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-worst"),
    `Array: [${WORST_DATA.join(", ")}]`,
    "log-info",
  );
  addLog(
    document.getElementById("log-worst"),
    `Target: ${WORST_TARGET}  ← NOT IN ARRAY`,
    "log-warn",
  );
  addLog(
    document.getElementById("log-worst"),
    `Must check ALL ${WORST_DATA.length} elements → O(N)`,
    "log-warn",
  );
  worstIdx = 0;
  worstDone = false;
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}
function worstStep() {
  if (worstDone) return;
  const log = document.getElementById("log-worst");
  if (worstIdx >= WORST_DATA.length) {
    WORST_DATA.forEach((_, i) => {
      const c = document.getElementById("arr-worst-c" + i);
      if (c) c.className = "s-cell s-notfound";
    });
    addLog(
      log,
      `All ${WORST_DATA.length} elements checked — ${WORST_TARGET} NOT FOUND ❌`,
      "log-miss",
    );
    addLog(
      log,
      `Worst Case: O(N) — ${WORST_DATA.length} comparisons`,
      "log-result",
    );
    worstDone = true;
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
    return;
  }
  sStep(
    "arr-worst",
    WORST_DATA,
    WORST_TARGET,
    worstIdx,
    "log-worst",
    (idx) => {
      /* won't happen */
    },
    () => {},
  );
  worstIdx++;
  if (worstIdx >= WORST_DATA.length) {
    setTimeout(() => {
      WORST_DATA.forEach((_, i) => {
        const c = document.getElementById("arr-worst-c" + i);
        if (c && !c.classList.contains("s-found"))
          c.className = "s-cell s-notfound";
      });
      addLog(
        log,
        `All ${WORST_DATA.length} elements checked — NOT FOUND ❌`,
        "log-miss",
      );
      addLog(
        log,
        `⚠ Worst Case: O(N) — ${WORST_DATA.length} comparisons`,
        "log-result",
      );
      worstDone = true;
      document.getElementById("worst-step-btn").disabled = true;
      document.getElementById("worst-auto-btn").disabled = true;
    }, 400);
  }
}
function worstAuto() {
  document.getElementById("worst-auto-btn").disabled = true;
  function tick() {
    if (!worstDone) {
      worstStep();
      if (!worstDone) worstTimer = setTimeout(tick, 650);
    }
  }
  tick();
}
function resetWorst() {
  clearTimeout(worstTimer);
  initWorst();
}

/* ── CUSTOM ── */
let customData = [],
  customTarget = null,
  customIdx = 0,
  customDone = false,
  customTimer = null;

function initCustom() {
  document.getElementById("arr-custom").innerHTML = "";
  document.getElementById("idx-custom").innerHTML = "";
  document.getElementById("ptr-custom").innerHTML = "";
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-custom"),
    "Enter an array and target, then click 🔍 Search.",
    "log-info",
  );
  customIdx = 0;
  customDone = false;
  customData = [];
  customTarget = null;
  document.getElementById("custom-step-btn").disabled = true;
  document.getElementById("custom-auto-btn").disabled = true;
  ["best", "avg", "worst"].forEach((t) => {
    const card = document.getElementById("cc-" + t);
    if (card)
      card.classList.remove(
        "cc-active-best",
        "cc-active-avg",
        "cc-active-worst",
      );
  });
  const toast = document.getElementById("cc-toast");
  if (toast) toast.className = "cc-toast";
}

function customSearch() {
  clearTimeout(customTimer);
  const raw = document.getElementById("custom-arr").value.trim();
  const tgt = document.getElementById("custom-target").value.trim();
  if (!raw || tgt === "") {
    addLog(
      document.getElementById("log-custom"),
      "Enter array and target first!",
      "log-warn",
    );
    return;
  }
  customData = raw
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  customTarget = parseInt(tgt);
  if (!customData.length || isNaN(customTarget)) {
    addLog(document.getElementById("log-custom"), "Invalid input.", "log-warn");
    return;
  }
  customIdx = 0;
  customDone = false;
  buildScenarioArray("arr-custom", "idx-custom", "ptr-custom", customData);
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-custom"),
    `Array: [${customData.join(", ")}]`,
    "log-info",
  );
  addLog(
    document.getElementById("log-custom"),
    `Target: ${customTarget}`,
    "log-info",
  );
  document.getElementById("custom-step-btn").disabled = false;
  document.getElementById("custom-auto-btn").disabled = false;
}

let ccTimer = null;
function highlightCC(type) {
  ["best", "avg", "worst"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    c.classList.remove("cc-active-best", "cc-active-avg", "cc-active-worst");
  });
  clearTimeout(ccTimer);
  const card = document.getElementById("cc-" + type);
  if (card) {
    card.classList.add("cc-active-" + type);
    ccTimer = setTimeout(
      () => card.classList.remove("cc-active-" + type),
      2000,
    );
  }
}
function showCCToast(type, msg) {
  const toast = document.getElementById("cc-toast");
  const icon = document.getElementById("cc-toast-icon");
  const text = document.getElementById("cc-toast-text");
  const icons = { best: "⚡", avg: "〜", worst: "⚠", warn: "⚠" };
  icon.textContent = icons[type] || "🔍";
  text.textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "cc-toast";
  }, 2600);
}

function customStep() {
  if (customDone || !customData.length) return;
  const log = document.getElementById("log-custom");
  if (customIdx >= customData.length) {
    customData.forEach((_, i) => {
      const c = document.getElementById("arr-custom-c" + i);
      if (c) c.className = "s-cell s-notfound";
    });
    addLog(
      log,
      `All ${customData.length} elements checked — NOT FOUND ❌`,
      "log-miss",
    );
    const caseType = "worst";
    highlightCC(caseType);
    showCCToast(
      caseType,
      `Worst Case: O(N) — ${customData.length} comparisons`,
    );
    customDone = true;
    document.getElementById("custom-step-btn").disabled = true;
    document.getElementById("custom-auto-btn").disabled = true;
    return;
  }
  sStep(
    "arr-custom",
    customData,
    customTarget,
    customIdx,
    "log-custom",
    (idx) => {
      addLog(log, `arr[${idx}] = ${customTarget} ✓ FOUND!`, "log-found");
      const comparisons = idx + 1;
      const ratio = comparisons / customData.length;
      let caseType = ratio <= 0.15 ? "best" : ratio <= 0.65 ? "avg" : "worst";
      const caseLabel =
        caseType === "best"
          ? "Best O(1)"
          : caseType === "avg"
            ? "Avg O(N/2)"
            : "Worst O(N)";
      addLog(
        log,
        `Comparisons: ${comparisons} / ${customData.length}  →  ${caseLabel}`,
        "log-result",
      );
      highlightCC(caseType);
      showCCToast(caseType, `${caseLabel} — ${comparisons} comparison(s)`);
      customDone = true;
      document.getElementById("custom-step-btn").disabled = true;
      document.getElementById("custom-auto-btn").disabled = true;
    },
    () => {},
  );
  customIdx++;
}
function customAutoPlay() {
  document.getElementById("custom-auto-btn").disabled = true;
  function tick() {
    if (!customDone) {
      customStep();
      if (!customDone) customTimer = setTimeout(tick, 700);
    }
  }
  tick();
}
function resetCustom() {
  clearTimeout(customTimer);
  document.getElementById("custom-arr").value = "";
  document.getElementById("custom-target").value = "";
  initCustom();
}


function getCMTheme(webTheme) {
  if (webTheme === "light") return "eclipse";
  if (webTheme === "blue") return "nord";
  return "material-ocean";
}

function initEditor() {
  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-c++src",
    theme: getCMTheme(currentTheme),
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });
  codeEditor.setValue(codeTemplates.iterative.cpp);
}

function switchEditorImpl(impl, btn) {
  editorImpl = impl;
  document
    .querySelectorAll(".impl-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  updateEditorDisplay();
}

function switchLang(lang, btn) {
  currentLang = lang;
  document
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  updateEditorDisplay();
}

function updateEditorDisplay() {
  const modeMap = {
    cpp: "text/x-c++src",
    python: "text/x-python",
    java: "text/x-java",
    c: "text/x-csrc",
    javascript: "text/javascript",
  };
  const nameMap = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    c: "C",
    javascript: "JavaScript",
  };
  const implName = editorImpl === "iterative" ? "Iterative" : "Recursive";
  codeEditor.setOption("mode", modeMap[currentLang]);
  codeEditor.setValue(codeTemplates[editorImpl][currentLang]);
  document.querySelector(".lang-display").textContent =
    nameMap[currentLang] + " — " + implName;
}

function copyCode() {
  navigator.clipboard.writeText(codeEditor.getValue()).then(() => {
    const btn = document.querySelector(".code-copy");
    btn.textContent = "✓";
    btn.style.background = "var(--primary-green)";
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.style.background = "var(--primary-purple)";
    }, 2000);
  });
}

async function getInput(prompt) {
  return new Promise((resolve) => {
    const promptDiv = document.getElementById("inputPrompt");
    const promptText = document.getElementById("promptText");
    const inputField = document.getElementById("userInput");
    promptText.textContent = prompt;
    promptDiv.style.display = "block";
    inputField.value = "";
    inputField.focus();
    currentInputResolver = resolve;
    waitingForInput = true;
  });
}

function submitInput() {
  const inputField = document.getElementById("userInput");
  const value = inputField.value.trim();
  if (value && currentInputResolver) {
    document.getElementById("inputPrompt").style.display = "none";
    waitingForInput = false;
    currentInputResolver(value);
    currentInputResolver = null;
  }
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitInput();
});

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runInteractiveCode() {
  const outputDiv = document.getElementById("codeOutput");
  outputDiv.innerHTML =
    '<span style="color:#fbbf24">🔄 Executing code...</span><br><br>';

  const implLabel = editorImpl === "iterative" ? "Iterative" : "Recursive";
  const langNames = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    c: "C",
    javascript: "JavaScript",
  };
  outputDiv.innerHTML += `<span style="color:var(--primary-cyan)">Linear Search (${implLabel}) — ${langNames[currentLang]}</span><br><br>`;

  const n = await getInput("Enter number of elements: ");
  outputDiv.innerHTML += `<span style="color:#a0a0a0">Enter number of elements: </span>${n}<br><br>`;

  const arr = [];
  for (let i = 0; i < parseInt(n); i++) {
    const v = await getInput(`arr[${i}] = `);
    arr.push(parseInt(v));
    outputDiv.innerHTML += `<span style="color:#a0a0a0">arr[${i}] = </span>${v}<br>`;
  }

  const target = parseInt(await getInput("Enter target to search: "));
  outputDiv.innerHTML += `<span style="color:#a0a0a0">Enter target to search: </span>${target}<br><br>`;

  outputDiv.innerHTML += `<span style="color:var(--primary-cyan)">Searching for ${target} in [${arr.join(", ")}]...</span><br>`;

  if (editorImpl === "iterative") {
    for (let i = 0; i < arr.length; i++) {
      await sleep(300);
      outputDiv.innerHTML += `<span style="color:var(--primary-orange)">  Checking arr[${i}] = ${arr[i]}... </span>`;
      if (arr[i] === target) {
        outputDiv.innerHTML += `<span style="color:var(--primary-green)">✓ MATCH!</span><br>`;
        outputDiv.innerHTML += `<br><span style="color:var(--primary-green)">✅ Found at index: ${i}  (${i + 1} comparison(s))</span>`;
        return;
      }
      outputDiv.innerHTML += `<span style="color:var(--primary-red)">✗ ${arr[i]} ≠ ${target}</span><br>`;
    }
    outputDiv.innerHTML += `<br><span style="color:var(--primary-red)">❌ Element ${target} not found. (${arr.length} comparisons made)</span>`;
  } else {
    // Recursive simulation
    async function recSim(idx) {
      await sleep(320);
      outputDiv.innerHTML += `<span style="color:#8b5cf6">  Call(${idx}) → arr[${idx}] = ${arr[idx]} </span>`;
      if (arr[idx] === target) {
        outputDiv.innerHTML += `<span style="color:var(--primary-green)">✓ FOUND!</span><br>`;
        outputDiv.innerHTML += `<br><span style="color:var(--primary-green)">✅ Found at index: ${idx}  (${idx + 1} call(s))</span>`;
        return;
      }
      outputDiv.innerHTML += `<span style="color:var(--primary-red)">✗ recurse →</span><br>`;
      if (idx + 1 < arr.length) await recSim(idx + 1);
      else
        outputDiv.innerHTML += `<br><span style="color:var(--primary-red)">❌ Not found. (${arr.length} recursive calls made)</span>`;
    }
    await recSim(0);
  }
}


document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const current = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(current) + 1) % 3];
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
  codeEditor.setOption("theme", getCMTheme(next));
};


document.getElementById("l1").addEventListener("click", () => {
  window.location.href = "linear_search_L1.html";
});
document.getElementById("l2").addEventListener("click", () => {
  document.getElementById("slider1").classList.add("active");
});
document.getElementById("l3").addEventListener("click", () => {
  document.getElementById("quizModal").style.display = "flex";
});
document.getElementById("startQuiz").addEventListener("click", () => {
  window.location.href = "linear_search_L2_Quiz.html";
});
document.getElementById("cancelBtn").addEventListener("click", () => {
  document.getElementById("quizModal").style.display = "none";
});
window.onclick = (e) => {
  if (e.target === document.getElementById("quizModal"))
    document.getElementById("quizModal").style.display = "none";
};


window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditor();
  initBest();
  initAvg();
  initWorst();
  initCustom();
};


const ALGO_KEY = "linearsearch";
const L2_KEY = `${ALGO_KEY}_l2_unlocked`;
const L3_KEY = `${ALGO_KEY}_l3_unlocked`;

const btnL2 = document.getElementById("l2");
const btnL3 = document.getElementById("l3");
const modal = document.getElementById("quizModal");
const cancelBtn = document.getElementById("cancelBtn");
const startQuizBtn = document.getElementById("startQuiz");

function updateLevelButtons() {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  const l3Unlocked = localStorage.getItem(L3_KEY) === "true";

  if (l2Unlocked) {
    btnL2.style.borderColor = "var(--primary-green)";
    btnL2.style.background = "rgba(16, 185, 129, 0.15)";
    btnL2.style.color = "var(--primary-green)";
    btnL2.title = "Unlocked";
  }
  if (l3Unlocked) {
    btnL3.style.borderColor = "var(--primary-green)";
    btnL3.style.background = "rgba(16, 185, 129, 0.15)";
    btnL3.style.color = "var(--primary-green)";
    btnL3.title = "Unlocked";
  }
}

btnL2.onclick = () => {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  if (l2Unlocked) {
    // Already unlocked — go directly, no modal
    window.location.href = `${ALGO_KEY}_L2.html`;
  } else {
    // Not yet unlocked — show quiz modal
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
  }
};

btnL3.onclick = () => {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  const l3Unlocked = localStorage.getItem(L3_KEY) === "true";
  if (l3Unlocked) {
    window.location.href = `${ALGO_KEY}_L3.html`;
  } else if (!l2Unlocked) {
    // L2 not even unlocked yet — prompt L1 quiz first
    modal.querySelector("p").textContent =
      "Pass the Level 1 Quiz to unlock Level 2 first before accessing Level 3.";
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
  } else {
    // L2 unlocked but L3 not — prompt L2 quiz
    modal.querySelector("p").textContent =
      "Pass the Level 2 Quiz to unlock Level 3 and complete your journey.";
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l2`);
  }
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
  // Reset modal text in case it was changed
  modal.querySelector("p").textContent =
    `Pass the Level 1 Quiz to unlock Level 2 and continue your journey.`;
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("p").textContent =
      `Pass the Level 1 Quiz to unlock Level 2 and continue your journey.`;
  }
};
