const codeTemplates = {
  iterative: {
    cpp: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;   // avoids overflow

        if (arr[mid] == target)
            return mid;                      // Found!
        else if (arr[mid] < target)
            low = mid + 1;                   // Search right half
        else
            high = mid - 1;                  // Search left half
    }
    return -1;                               // Not found
}

int main() {
    int n;
    cout << "Enter number of elements (sorted): ";
    cin >> n;

    int arr[n];
    cout << "Enter " << n << " sorted elements:" << endl;
    for (int i = 0; i < n; i++) {
        cout << "arr[" << i << "] = ";
        cin >> arr[i];
    }

    int target;
    cout << "Enter target to search: ";
    cin >> target;

    int result = binarySearch(arr, n, target);

    if (result != -1)
        cout << "\\nFound at index: " << result
             << "  (value: " << arr[result] << ")" << endl;
    else
        cout << "\\nElement " << target << " not found." << endl;

    return 0;
}`,
    python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2   # avoids overflow

        if arr[mid] == target:
            return mid                  # Found!
        elif arr[mid] < target:
            low = mid + 1               # Search right half
        else:
            high = mid - 1              # Search left half

    return -1                           # Not found

# --- Input ---
n = int(input("Enter number of elements (sorted): "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

target = int(input("Enter target to search: "))

# --- Search ---
result = binary_search(arr, target)

if result != -1:
    print(f"\\nFound at index: {result}  (value: {arr[result]})")
else:
    print(f"\\nElement {target} not found.")`,
    java: `import java.util.Scanner;

public class BinarySearch {

    static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;   // avoids overflow

            if (arr[mid] == target)
                return mid;
            else if (arr[mid] < target)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of elements (sorted): ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " sorted elements:");
        for (int i = 0; i < n; i++) {
            System.out.print("arr[" + i + "] = ");
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter target to search: ");
        int target = sc.nextInt();

        int result = binarySearch(arr, target);
        if (result != -1)
            System.out.println("\\nFound at index: " + result +
                "  (value: " + arr[result] + ")");
        else
            System.out.println("\\nElement " + target + " not found.");
    }
}`,
    c: `#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int main() {
    int n;
    printf("Enter number of elements (sorted): ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d sorted elements:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = ", i);
        scanf("%d", &arr[i]);
    }

    int target;
    printf("Enter target to search: ");
    scanf("%d", &target);

    int result = binarySearch(arr, n, target);

    if (result != -1)
        printf("\\nFound at index: %d  (value: %d)\\n", result, arr[result]);
    else
        printf("\\nElement %d not found.\\n", target);

    return 0;
}`,
    javascript: `function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (arr[mid] === target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

// --- Demo ---
const arr    = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const target = 23;

console.log("Array:", arr.join(", "));
console.log("Target:", target);

const result = binarySearch(arr, target);

if (result !== -1)
    console.log("\\nFound at index:", result, " (value:", arr[result] + ")");
else
    console.log("\\nElement", target, "not found.");`,
  },

  recursive: {
    cpp: `#include <iostream>
using namespace std;

int binarySearchRec(int arr[], int target, int low, int high) {
    // Base case: range invalid — not found
    if (low > high)
        return -1;

    int mid = low + (high - low) / 2;

    if (arr[mid] == target)
        return mid;                             // Found!
    else if (arr[mid] < target)
        return binarySearchRec(arr, target, mid + 1, high);  // Right
    else
        return binarySearchRec(arr, target, low, mid - 1);   // Left
}

int main() {
    int n;
    cout << "Enter number of elements (sorted): ";
    cin >> n;

    int arr[n];
    cout << "Enter " << n << " sorted elements:" << endl;
    for (int i = 0; i < n; i++) {
        cout << "arr[" << i << "] = ";
        cin >> arr[i];
    }

    int target;
    cout << "Enter target to search: ";
    cin >> target;

    int result = binarySearchRec(arr, target, 0, n - 1);

    if (result != -1)
        cout << "\\nFound at index: " << result
             << "  (value: " << arr[result] << ")" << endl;
    else
        cout << "\\nElement " << target << " not found." << endl;

    return 0;
}`,
    python: `def binary_search_rec(arr, target, low=None, high=None):
    if low is None: low  = 0
    if high is None: high = len(arr) - 1

    # Base case: range invalid
    if low > high:
        return -1

    mid = low + (high - low) // 2

    if arr[mid] == target:
        return mid                                          # Found!
    elif arr[mid] < target:
        return binary_search_rec(arr, target, mid + 1, high)  # Right
    else:
        return binary_search_rec(arr, target, low, mid - 1)   # Left

# --- Input ---
n = int(input("Enter number of elements (sorted): "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

target = int(input("Enter target to search: "))

# --- Search ---
result = binary_search_rec(arr, target)

if result != -1:
    print(f"\\nFound at index: {result}  (value: {arr[result]})")
else:
    print(f"\\nElement {target} not found.")`,
    java: `import java.util.Scanner;

public class BinarySearchRecursive {

    static int binarySearchRec(int[] arr, int target, int low, int high) {
        if (low > high)
            return -1;

        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            return binarySearchRec(arr, target, mid + 1, high);
        else
            return binarySearchRec(arr, target, low, mid - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of elements (sorted): ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " sorted elements:");
        for (int i = 0; i < n; i++) {
            System.out.print("arr[" + i + "] = ");
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter target to search: ");
        int target = sc.nextInt();

        int result = binarySearchRec(arr, target, 0, n - 1);
        if (result != -1)
            System.out.println("\\nFound at index: " + result +
                "  (value: " + arr[result] + ")");
        else
            System.out.println("\\nElement " + target + " not found.");
    }
}`,
    c: `#include <stdio.h>

int binarySearchRec(int arr[], int target, int low, int high) {
    if (low > high)
        return -1;

    int mid = low + (high - low) / 2;

    if (arr[mid] == target)
        return mid;
    else if (arr[mid] < target)
        return binarySearchRec(arr, target, mid + 1, high);
    else
        return binarySearchRec(arr, target, low, mid - 1);
}

int main() {
    int n;
    printf("Enter number of elements (sorted): ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d sorted elements:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = ", i);
        scanf("%d", &arr[i]);
    }

    int target;
    printf("Enter target to search: ");
    scanf("%d", &target);

    int result = binarySearchRec(arr, target, 0, n - 1);

    if (result != -1)
        printf("\\nFound at index: %d  (value: %d)\\n", result, arr[result]);
    else
        printf("\\nElement %d not found.\\n", target);

    return 0;
}`,
    javascript: `function binarySearchRec(arr, target, low = 0, high = arr.length - 1) {
    // Base case: range invalid
    if (low > high)
        return -1;

    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === target)
        return mid;
    else if (arr[mid] < target)
        return binarySearchRec(arr, target, mid + 1, high);  // Right
    else
        return binarySearchRec(arr, target, low, mid - 1);   // Left
}

// --- Demo ---
const arr    = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const target = 23;

console.log("Array:", arr.join(", "));
console.log("Target:", target);

const result = binarySearchRec(arr, target);

if (result !== -1)
    console.log("\\nFound at index:", result, " (value:", arr[result] + ")");
else
    console.log("\\nElement", target, "not found.");`,
  },
};


let codeEditor;
let currentLang = "cpp";
let editorImpl = "iterative";
let currentImpl = "iterative"; // top selector

// Main visualizer state
let mainArr = [];
let mainTarget = null;
let mainLow = 0;
let mainHigh = -1;
let mainIter = 0;
let mainComps = 0;
let mainDone = false;
let mainTimer = null;

let waitingForInput = false;
let currentInputResolver = null;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* 
   PSEUDO-CODE HIGHLIGHT
*/
function highlightStep(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`.pseudo-step[data-step="${step}"]`);
  if (el) el.classList.add("active");
}

/* 
   IMPLEMENTATION SWITCH (top selector)
*/
function switchImplementation(type) {
  currentImpl = type;
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  document.getElementById("visualizer-title").textContent =
    "Binary Search Visualizer — " +
    (type === "iterative" ? "Iterative" : "Recursive");
  document.getElementById("pseudo-iterative").style.display =
    type === "iterative" ? "block" : "none";
  document.getElementById("pseudo-recursive").style.display =
    type === "recursive" ? "block" : "none";
  resetSearch();
}

/* 
   MAIN VISUALIZER
 */
function buildMainVisual(arr) {
  ["arrRow", "idxRow", "ptrRow", "rangeBarRow"].forEach(
    (id) => (document.getElementById(id).innerHTML = ""),
  );
  arr.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "arr-cell";
    c.id = "mc-" + i;
    c.textContent = v;
    document.getElementById("arrRow").appendChild(c);
    const ix = document.createElement("div");
    ix.className = "idx-cell";
    ix.textContent = i;
    document.getElementById("idxRow").appendChild(ix);
    const p = document.createElement("div");
    p.className = "ptr-cell";
    p.id = "mp-" + i;
    document.getElementById("ptrRow").appendChild(p);
    const rb = document.createElement("div");
    rb.className = "range-bar-cell";
    rb.id = "rb-" + i;
    document.getElementById("rangeBarRow").appendChild(rb);
  });
}

function renderMainState(low, high, mid) {
  document.querySelectorAll(".ptr-cell").forEach((p) => (p.textContent = ""));
  document
    .querySelectorAll(".range-bar-cell")
    .forEach((rb) => (rb.className = "range-bar-cell"));
  mainArr.forEach((_, i) => {
    const c = document.getElementById("mc-" + i);
    if (i < low || i > high) c.className = "arr-cell eliminated";
    else c.className = "arr-cell active-range";
    const rb = document.getElementById("rb-" + i);
    if (i >= low && i <= high)
      rb.className = "range-bar-cell" + (i === mid ? " is-mid" : " in-range");
  });
  if (mid >= 0) {
    document.getElementById("mc-" + mid).className = "arr-cell mid";
    document.getElementById("rb-" + mid).className = "range-bar-cell is-mid";
  }
  const lp = document.getElementById("mp-" + low);
  if (lp) {
    lp.classList.add("ptr-low");
    lp.textContent += "L";
  }
  const hp = document.getElementById("mp-" + high);
  if (hp) {
    hp.classList.add("ptr-high");
    hp.textContent = hp.textContent ? hp.textContent + "/H" : "H";
  }
  if (mid >= 0) {
    const mp = document.getElementById("mp-" + mid);
    if (mp) {
      mp.className += " ptr-mid";
      mp.textContent = mp.textContent ? mp.textContent + "/M" : "M";
    }
  }
}

function setCaption(text, type = "") {
  const box = document.getElementById("captionBox");
  box.className = "caption-box" + (type ? " caption-" + type : "");
  box.innerHTML = text;
}

function updateBadge() {
  document.getElementById("iterBadge").innerHTML =
    `Iteration: ${mainIter} &nbsp;|&nbsp; Comparisons: ${mainComps}`;
}

function showMsg(text, type) {
  const el = document.getElementById("msg_show");
  el.style.display = "block";
  el.className = "alert alert-" + type;
  el.innerHTML = text;
}

function startSearch() {
  clearTimeout(mainTimer);
  const rawArr = document.getElementById("arrayInput").value.trim();
  const rawTgt = document.getElementById("targetInput").value.trim();
  if (!rawArr || rawTgt === "") {
    showMsg("Please enter a sorted array and a target.", "danger");
    return;
  }
  mainArr = rawArr
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  mainTarget = parseInt(rawTgt);
  if (!mainArr.length || isNaN(mainTarget)) {
    showMsg("Invalid input. Use comma-separated numbers.", "danger");
    return;
  }
  mainLow = 0;
  mainHigh = mainArr.length - 1;
  mainIter = 0;
  mainComps = 0;
  mainDone = false;
  buildMainVisual(mainArr);
  updateBadge();
  setCaption(
    `Searching for <strong>${mainTarget}</strong> in [${mainArr.join(", ")}] — range: [${mainLow}…${mainHigh}]`,
  );
  document.getElementById("stepBtn").disabled = false;
  document.getElementById("autoBtn").disabled = false;
  document.getElementById("msg_show").style.display = "none";
  highlightStep(currentImpl === "iterative" ? "it-init" : "re-base");
}

function doMainStep() {
  if (mainDone) return false;
  if (mainLow > mainHigh) {
    mainArr.forEach((_, i) => {
      document.getElementById("mc-" + i).className = "arr-cell not-found-all";
    });
    setCaption(
      `❌ <strong>${mainTarget}</strong> not found after ${mainComps} comparison(s). O(log N) = O(${Math.ceil(Math.log2(mainArr.length))}) max.`,
      "notfound",
    );
    showMsg(
      `<i class="fas fa-times"></i> Not Found — exhausted in ${mainIter} iteration(s)`,
      "danger",
    );
    highlightStep(currentImpl === "iterative" ? "it-notfound" : "re-notfound");
    mainDone = true;
    document.getElementById("stepBtn").disabled = true;
    document.getElementById("autoBtn").disabled = true;
    return false;
  }
  const mid = mainLow + Math.floor((mainHigh - mainLow) / 2);
  mainIter++;
  mainComps++;
  renderMainState(mainLow, mainHigh, mid);
  updateBadge();

  if (mainArr[mid] === mainTarget) {
    document.getElementById("mc-" + mid).className = "arr-cell found";
    const mp = document.getElementById("mp-" + mid);
    mp.className = "ptr-cell ptr-found";
    mp.textContent = "✓";
    setCaption(
      `✅ Found <strong>${mainTarget}</strong> at index ${mid}! ${mainIter} iteration(s), ${mainComps} comparison(s).`,
      "found",
    );
    showMsg(
      `<i class="fas fa-check"></i> Found at index ${mid} — ${mainComps} comparison(s)`,
      "success",
    );
    highlightStep(currentImpl === "iterative" ? "it-found" : "re-found");
    mainDone = true;
    document.getElementById("stepBtn").disabled = true;
    document.getElementById("autoBtn").disabled = true;
    return false;
  }

  if (mainArr[mid] < mainTarget) {
    setCaption(
      `arr[${mid}]=${mainArr[mid]} < ${mainTarget} → search RIGHT half  [${mid + 1}…${mainHigh}]`,
    );
    highlightStep(currentImpl === "iterative" ? "it-goright" : "re-goright");
    mainLow = mid + 1;
  } else {
    setCaption(
      `arr[${mid}]=${mainArr[mid]} > ${mainTarget} → search LEFT half  [${mainLow}…${mid - 1}]`,
    );
    highlightStep(currentImpl === "iterative" ? "it-goleft" : "re-goleft");
    mainHigh = mid - 1;
  }
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
    if (cont && !mainDone) mainTimer = setTimeout(tick, 850);
  }
  tick();
}
function resetSearch() {
  clearTimeout(mainTimer);
  mainArr = [];
  mainTarget = null;
  mainLow = 0;
  mainHigh = -1;
  mainIter = 0;
  mainComps = 0;
  mainDone = false;
  ["arrRow", "idxRow", "ptrRow", "rangeBarRow"].forEach(
    (id) => (document.getElementById(id).innerHTML = ""),
  );
  setCaption(
    "Enter a <strong>sorted</strong> array and a target, then click Search.",
  );
  document.getElementById("msg_show").style.display = "none";
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("autoBtn").disabled = true;
  document.getElementById("iterBadge").innerHTML =
    "Iteration: 0 &nbsp;|&nbsp; Comparisons: 0";
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}

/* 
   SCENARIO
*/
function buildScenArr(arrId, idxId, ptrId, rangeId, data) {
  ["#" + arrId, "#" + idxId, "#" + ptrId, "#" + rangeId].forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = "";
  });
  data.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "s-cell";
    c.id = arrId + "-c" + i;
    c.textContent = v;
    document.getElementById(arrId).appendChild(c);
    const ix = document.createElement("div");
    ix.className = "s-idx";
    ix.textContent = i;
    document.getElementById(idxId).appendChild(ix);
    const p = document.createElement("div");
    p.className = "s-ptr";
    p.id = arrId + "-p" + i;
    document.getElementById(ptrId).appendChild(p);
    const rb = document.createElement("div");
    rb.className = "s-range-cell";
    rb.id = arrId + "-rb" + i;
    document.getElementById(rangeId).appendChild(rb);
  });
}

function renderScenState(pfx, data, low, high, mid) {
  data.forEach((_, i) => {
    const c = document.getElementById(pfx + "-c" + i);
    if (!c) return;
    if (i < low || i > high) c.className = "s-cell s-eliminated";
    else c.className = "s-cell s-range";
    const rb = document.getElementById(pfx + "-rb" + i);
    if (rb)
      rb.className =
        "s-range-cell" +
        (i >= low && i <= high ? (i === mid ? " sr-mid" : " sr-in") : "");
  });
  if (mid >= 0 && mid <= data.length - 1) {
    const mc = document.getElementById(pfx + "-c" + mid);
    if (mc) mc.className = "s-cell s-mid";
  }
  data.forEach((_, i) => {
    const p = document.getElementById(pfx + "-p" + i);
    if (!p) return;
    p.textContent = "";
    p.className = "s-ptr";
  });
  const lp = document.getElementById(pfx + "-p" + low);
  if (lp) {
    lp.classList.add("sp-low");
    lp.textContent = "L";
  }
  const hp = document.getElementById(pfx + "-p" + high);
  if (hp) {
    hp.classList.add("sp-high");
    hp.textContent = (hp.textContent || "") + "H";
  }
  if (mid >= 0) {
    const mp = document.getElementById(pfx + "-p" + mid);
    if (mp) {
      mp.classList.add("sp-mid");
      mp.textContent = (mp.textContent ? mp.textContent + "/" : "") + "M";
    }
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
  const map = {
    best: "active-best",
    avg: "active-avg",
    worst: "active-worst",
    custom: "active-custom",
  };
  document
    .querySelectorAll(".scenario-tab")
    .forEach((t) => (t.className = "scenario-tab"));
  document.getElementById("stab-" + name).classList.add(map[name]);
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}

/* ── BEST ── */
const BEST_DATA = [2, 5, 8, 12, 16, 23, 38],
  BEST_TGT = 12;
let bLow, bHigh, bDone, bTimer;
function initBest() {
  buildScenArr("sarr-best", "sidx-best", "sptr-best", "srange-best", BEST_DATA);
  document.getElementById("log-best").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-best");
  addLog(log, `Array: [${BEST_DATA.join(", ")}]`, "log-info");
  addLog(
    log,
    `Target: ${BEST_TGT}  — this is the exact middle element`,
    "log-info",
  );
  addLog(
    log,
    `low=0, high=${BEST_DATA.length - 1}  →  mid=${Math.floor((BEST_DATA.length - 1) / 2)}`,
    "log-info",
  );
  bLow = 0;
  bHigh = BEST_DATA.length - 1;
  bDone = false;
  document.getElementById("best-step-btn").disabled = false;
  document.getElementById("best-auto-btn").disabled = false;
}
function bestStep() {
  if (bDone) return;
  const log = document.getElementById("log-best");
  const mid = bLow + Math.floor((bHigh - bLow) / 2);
  renderScenState("sarr-best", BEST_DATA, bLow, bHigh, mid);
  addLog(log, `Iter 1: low=${bLow}, high=${bHigh}, mid=${mid}`, "log-mid");
  addLog(
    log,
    `arr[${mid}]=${BEST_DATA[mid]} == ${BEST_TGT}  ✓ FOUND!`,
    "log-found",
  );
  addLog(log, `✓ Best Case: O(1) — found on 1st comparison`, "log-result");
  const c = document.getElementById("sarr-best-c" + mid);
  c.className = "s-cell s-found";
  const p = document.getElementById("sarr-best-p" + mid);
  p.className = "s-ptr sp-found";
  p.textContent = "✓";
  bDone = true;
  document.getElementById("best-step-btn").disabled = true;
  document.getElementById("best-auto-btn").disabled = true;
}
function bestAuto() {
  document.getElementById("best-auto-btn").disabled = true;
  bestStep();
}
function resetBest() {
  clearTimeout(bTimer);
  initBest();
}

/* ── AVERAGE ── */
const AVG_DATA = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
  AVG_TGT = 13;
let aLow, aHigh, aDone, aIter, aTimer;
function initAvg() {
  buildScenArr("sarr-avg", "sidx-avg", "sptr-avg", "srange-avg", AVG_DATA);
  document.getElementById("log-avg").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-avg");
  addLog(log, `Array: [${AVG_DATA.join(", ")}]`, "log-info");
  addLog(log, `Target: ${AVG_TGT}  (7th of 10 elements)`, "log-info");
  addLog(
    log,
    `Expect ~${Math.ceil(Math.log2(AVG_DATA.length))} comparisons max`,
    "log-info",
  );
  aLow = 0;
  aHigh = AVG_DATA.length - 1;
  aDone = false;
  aIter = 0;
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}
function avgStep() {
  if (aDone) return;
  const log = document.getElementById("log-avg");
  if (aLow > aHigh) {
    addLog(log, "Not found.", "log-warn");
    aDone = true;
    return;
  }
  const mid = aLow + Math.floor((aHigh - aLow) / 2);
  aIter++;
  renderScenState("sarr-avg", AVG_DATA, aLow, aHigh, mid);
  addLog(
    log,
    `Iter ${aIter}: low=${aLow}, high=${aHigh}, mid=${mid}  → arr[${mid}]=${AVG_DATA[mid]}`,
    "log-mid",
  );
  if (AVG_DATA[mid] === AVG_TGT) {
    addLog(
      log,
      `arr[${mid}]=${AVG_DATA[mid]} == ${AVG_TGT}  ✓ FOUND!`,
      "log-found",
    );
    addLog(
      log,
      `Iterations: ${aIter}  (log₂(${AVG_DATA.length})≈${Math.ceil(Math.log2(AVG_DATA.length))} max)`,
      "log-result",
    );
    addLog(
      log,
      `✓ Average Case: O(log N)  — found before exhausting search space`,
      "log-result",
    );
    const c = document.getElementById("sarr-avg-c" + mid);
    c.className = "s-cell s-found";
    const p = document.getElementById("sarr-avg-p" + mid);
    p.className = "s-ptr sp-found";
    p.textContent = "✓";
    aDone = true;
    document.getElementById("avg-step-btn").disabled = true;
    document.getElementById("avg-auto-btn").disabled = true;
  } else if (AVG_DATA[mid] < AVG_TGT) {
    addLog(
      log,
      `arr[${mid}]=${AVG_DATA[mid]} < ${AVG_TGT} → go RIGHT, low=${mid + 1}`,
      "log-miss",
    );
    aLow = mid + 1;
  } else {
    addLog(
      log,
      `arr[${mid}]=${AVG_DATA[mid]} > ${AVG_TGT} → go LEFT, high=${mid - 1}`,
      "log-miss",
    );
    aHigh = mid - 1;
  }
}
function avgAuto() {
  document.getElementById("avg-auto-btn").disabled = true;
  function tick() {
    if (!aDone) {
      avgStep();
      if (!aDone) aTimer = setTimeout(tick, 900);
    }
  }
  tick();
}
function resetAvg() {
  clearTimeout(aTimer);
  initAvg();
}

/* ── WORST ── */
const WORST_DATA = [2, 5, 8, 12, 16, 23, 38, 56],
  WORST_TGT = 99;
let wLow, wHigh, wDone, wIter, wTimer;
function initWorst() {
  buildScenArr(
    "sarr-worst",
    "sidx-worst",
    "sptr-worst",
    "srange-worst",
    WORST_DATA,
  );
  document.getElementById("log-worst").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-worst");
  addLog(log, `Array: [${WORST_DATA.join(", ")}]`, "log-info");
  addLog(log, `Target: ${WORST_TGT}  ← NOT in array (worst case)`, "log-warn");
  addLog(
    log,
    `Must exhaust all log₂(${WORST_DATA.length})=${Math.ceil(Math.log2(WORST_DATA.length))} iterations`,
    "log-warn",
  );
  wLow = 0;
  wHigh = WORST_DATA.length - 1;
  wDone = false;
  wIter = 0;
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}
function worstStep() {
  if (wDone) return;
  const log = document.getElementById("log-worst");
  if (wLow > wHigh) {
    WORST_DATA.forEach((_, i) => {
      const c = document.getElementById("sarr-worst-c" + i);
      if (c) c.className = "s-cell s-notfound";
    });
    addLog(
      log,
      `low(${wLow}) > high(${wHigh}) — search space empty`,
      "log-miss",
    );
    addLog(log, `${WORST_TGT} NOT FOUND ❌`, "log-miss");
    addLog(
      log,
      `⚠ Worst Case: O(log N) — ${wIter} iterations (log₂${WORST_DATA.length}≈${Math.ceil(Math.log2(WORST_DATA.length))})`,
      "log-result",
    );
    wDone = true;
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
    return;
  }
  const mid = wLow + Math.floor((wHigh - wLow) / 2);
  wIter++;
  renderScenState("sarr-worst", WORST_DATA, wLow, wHigh, mid);
  addLog(
    log,
    `Iter ${wIter}: low=${wLow}, high=${wHigh}, mid=${mid}  → arr[${mid}]=${WORST_DATA[mid]}`,
    "log-mid",
  );
  if (WORST_DATA[mid] === WORST_TGT) {
    addLog(log, "Found (unexpected)", "log-found");
    wDone = true;
    return;
  } else if (WORST_DATA[mid] < WORST_TGT) {
    addLog(
      log,
      `arr[${mid}]=${WORST_DATA[mid]} < ${WORST_TGT} → go RIGHT, low=${mid + 1}`,
      "log-miss",
    );
    wLow = mid + 1;
  } else {
    addLog(
      log,
      `arr[${mid}]=${WORST_DATA[mid]} > ${WORST_TGT} → go LEFT, high=${mid - 1}`,
      "log-miss",
    );
    wHigh = mid - 1;
  }
}
function worstAuto() {
  document.getElementById("worst-auto-btn").disabled = true;
  function tick() {
    if (!wDone) {
      worstStep();
      if (!wDone) wTimer = setTimeout(tick, 800);
    }
  }
  tick();
}
function resetWorst() {
  clearTimeout(wTimer);
  initWorst();
}

/* ── CUSTOM ── */
let cData = [],
  cTgt = null,
  cLow = 0,
  cHigh = -1,
  cIter = 0,
  cDone = false,
  cTimer = null;
function initCustom() {
  ["sarr-custom", "sidx-custom", "sptr-custom", "srange-custom"].forEach(
    (id) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = "";
    },
  );
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-custom"),
    "Enter a sorted array & target, then click 🔍 Search.",
    "log-info",
  );
  cData = [];
  cTgt = null;
  cLow = 0;
  cHigh = -1;
  cIter = 0;
  cDone = false;
  document.getElementById("custom-step-btn").disabled = true;
  document.getElementById("custom-auto-btn").disabled = true;
  ["best", "avg", "worst"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c)
      c.classList.remove("cc-active-best", "cc-active-avg", "cc-active-worst");
  });
  const toast = document.getElementById("cc-toast");
  if (toast) toast.className = "cc-toast";
}
function customSearch() {
  clearTimeout(cTimer);
  const raw = document.getElementById("custom-arr").value.trim();
  const tgt = document.getElementById("custom-target").value.trim();
  if (!raw || tgt === "") {
    addLog(
      document.getElementById("log-custom"),
      "Enter array and target!",
      "log-warn",
    );
    return;
  }
  cData = raw
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  cTgt = parseInt(tgt);
  if (!cData.length || isNaN(cTgt)) {
    addLog(document.getElementById("log-custom"), "Invalid input.", "log-warn");
    return;
  }
  // sort silently for correctness but warn
  const sorted = [...cData].sort((a, b) => a - b);
  const wasSorted = JSON.stringify(sorted) === JSON.stringify(cData);
  if (!wasSorted) {
    cData = sorted;
    addLog(
      document.getElementById("log-custom"),
      "⚠ Array auto-sorted for Binary Search!",
      "log-warn",
    );
  }
  cLow = 0;
  cHigh = cData.length - 1;
  cIter = 0;
  cDone = false;
  buildScenArr(
    "sarr-custom",
    "sidx-custom",
    "sptr-custom",
    "srange-custom",
    cData,
  );
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  if (!wasSorted)
    addLog(
      document.getElementById("log-custom"),
      `Auto-sorted: [${cData.join(", ")}]`,
      "log-warn",
    );
  addLog(
    document.getElementById("log-custom"),
    `Array: [${cData.join(", ")}]  |  Target: ${cTgt}`,
    "log-info",
  );
  document.getElementById("custom-step-btn").disabled = false;
  document.getElementById("custom-auto-btn").disabled = false;
}

let ccTimer = null;
function highlightCC(type) {
  ["best", "avg", "worst"].forEach((t) =>
    document
      .getElementById("cc-" + t)
      .classList.remove("cc-active-best", "cc-active-avg", "cc-active-worst"),
  );
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
  const icons = { best: "⚡", avg: "〜", worst: "⚠", warn: "⚠" };
  document.getElementById("cc-toast-icon").textContent = icons[type] || "🔍";
  document.getElementById("cc-toast-text").textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "cc-toast";
  }, 2600);
}

function customStep() {
  if (cDone || !cData.length) return;
  const log = document.getElementById("log-custom");
  if (cLow > cHigh) {
    cData.forEach((_, i) => {
      const c = document.getElementById("sarr-custom-c" + i);
      if (c) c.className = "s-cell s-notfound";
    });
    addLog(log, `Search exhausted — ${cTgt} NOT FOUND ❌`, "log-miss");
    const iters = cIter;
    const maxIter = Math.ceil(Math.log2(cData.length));
    addLog(
      log,
      `Iterations: ${iters}  (max log₂N=${maxIter})  → Worst Case O(log N)`,
      "log-result",
    );
    highlightCC("worst");
    showCCToast("worst", `Worst Case O(log N) — ${iters} iteration(s)`);
    cDone = true;
    document.getElementById("custom-step-btn").disabled = true;
    document.getElementById("custom-auto-btn").disabled = true;
    return;
  }
  const mid = cLow + Math.floor((cHigh - cLow) / 2);
  cIter++;
  renderScenState("sarr-custom", cData, cLow, cHigh, mid);
  addLog(
    log,
    `Iter ${cIter}: low=${cLow}, high=${cHigh}, mid=${mid} → arr[${mid}]=${cData[mid]}`,
    "log-mid",
  );
  if (cData[mid] === cTgt) {
    addLog(log, `arr[${mid}]=${cData[mid]} == ${cTgt}  ✓ FOUND!`, "log-found");
    const c = document.getElementById("sarr-custom-c" + mid);
    c.className = "s-cell s-found";
    const p = document.getElementById("sarr-custom-p" + mid);
    p.className = "s-ptr sp-found";
    p.textContent = "✓";
    const iters = cIter;
    let type =
      iters === 1
        ? "best"
        : iters <= Math.ceil(Math.log2(cData.length) / 2) + 1
          ? "avg"
          : "worst";
    const label =
      type === "best"
        ? "Best O(1)"
        : type === "avg"
          ? "Avg O(log N)"
          : "Worst O(log N)";
    addLog(log, `${iters} iteration(s) → ${label}`, "log-result");
    highlightCC(type);
    showCCToast(type, `${label} — found in ${iters} iteration(s)`);
    cDone = true;
    document.getElementById("custom-step-btn").disabled = true;
    document.getElementById("custom-auto-btn").disabled = true;
  } else if (cData[mid] < cTgt) {
    addLog(
      log,
      `arr[${mid}]=${cData[mid]} < ${cTgt} → go RIGHT, low=${mid + 1}`,
      "log-miss",
    );
    cLow = mid + 1;
  } else {
    addLog(
      log,
      `arr[${mid}]=${cData[mid]} > ${cTgt} → go LEFT, high=${mid - 1}`,
      "log-miss",
    );
    cHigh = mid - 1;
  }
}
function customAutoPlay() {
  document.getElementById("custom-auto-btn").disabled = true;
  function tick() {
    if (!cDone) {
      customStep();
      if (!cDone) cTimer = setTimeout(tick, 800);
    }
  }
  tick();
}
function resetCustom() {
  clearTimeout(cTimer);
  document.getElementById("custom-arr").value = "";
  document.getElementById("custom-target").value = "";
  initCustom();
}

/* 
   CODE EDITOR
*/
function getCMTheme(t) {
  return t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean";
}

function initEditor() {
  const theme = document.body.getAttribute("data-theme") || "dark";
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-c++src",
    theme: getCMTheme(theme),
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

/* interactive urnner */
let waitForInput = false,
  inputResolver = null;
async function getInput(prompt) {
  return new Promise((resolve) => {
    const pd = document.getElementById("inputPrompt");
    document.getElementById("promptText").textContent = prompt;
    pd.style.display = "block";
    document.getElementById("userInput").value = "";
    document.getElementById("userInput").focus();
    inputResolver = resolve;
    waitForInput = true;
  });
}
function submitInput() {
  const val = document.getElementById("userInput").value.trim();
  if (val && inputResolver) {
    document.getElementById("inputPrompt").style.display = "none";
    waitForInput = false;
    inputResolver(val);
    inputResolver = null;
  }
}
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitInput();
});

async function runInteractiveCode() {
  const out = document.getElementById("codeOutput");
  out.innerHTML = '<span style="color:#fbbf24">🔄 Executing...</span><br><br>';
  const langNames = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    c: "C",
    javascript: "JavaScript",
  };
  const implLabel = editorImpl === "iterative" ? "Iterative" : "Recursive";
  out.innerHTML += `<span style="color:var(--primary-cyan)">Binary Search (${implLabel}) — ${langNames[currentLang]}</span><br><br>`;

  const n = parseInt(await getInput("Enter number of elements (sorted): "));
  out.innerHTML += `<span style="color:#a0a0a0">Enter number of elements: </span>${n}<br>`;

  const arr = [];
  for (let i = 0; i < n; i++) {
    const v = parseInt(await getInput(`arr[${i}] = `));
    arr.push(v);
    out.innerHTML += `<span style="color:#a0a0a0">arr[${i}] = </span>${v}<br>`;
  }

  const target = parseInt(await getInput("Enter target to search: "));
  out.innerHTML += `<span style="color:#a0a0a0">Enter target to search: </span>${target}<br><br>`;
  arr.sort((a, b) => a - b);
  out.innerHTML += `<span style="color:var(--primary-cyan)">Sorted Array: [${arr.join(", ")}]</span><br>`;
  out.innerHTML += `<span style="color:var(--primary-cyan)">Searching for ${target}...</span><br><br>`;

  let low = 0,
    high = arr.length - 1,
    iter = 0;

  if (editorImpl === "iterative") {
    while (low <= high) {
      await sleep(400);
      const mid = low + Math.floor((high - low) / 2);
      iter++;
      out.innerHTML += `<span style="color:#8b5cf6">Iter ${iter}:</span>  low=${low}  high=${high}  mid=${mid}  →  arr[${mid}]=${arr[mid]} `;
      if (arr[mid] === target) {
        out.innerHTML += `<span style="color:var(--primary-green)">✓ MATCH!</span><br>`;
        out.innerHTML += `<br><span style="color:var(--primary-green)">✅ Found at index: ${mid}  (value: ${arr[mid]})  —  ${iter} iteration(s)</span>`;
        return;
      } else if (arr[mid] < target) {
        out.innerHTML += `<span style="color:var(--primary-orange)">→ go RIGHT (low=${mid + 1})</span><br>`;
        low = mid + 1;
      } else {
        out.innerHTML += `<span style="color:var(--primary-orange)">← go LEFT (high=${mid - 1})</span><br>`;
        high = mid - 1;
      }
    }
    out.innerHTML += `<br><span style="color:var(--primary-red)">❌ ${target} not found after ${iter} iteration(s).</span>`;
  } else {
    // Recursive simulation
    async function recSim(lo, hi, depth) {
      await sleep(420);
      const indent = "  ".repeat(depth);
      if (lo > hi) {
        out.innerHTML += `${indent}<span style="color:#8b5cf6">Call(lo=${lo},hi=${hi}):</span>  <span style="color:var(--primary-red)">lo>hi → return −1</span><br>`;
        return -1;
      }
      const mid = lo + Math.floor((hi - lo) / 2);
      iter++;
      out.innerHTML += `${indent}<span style="color:#8b5cf6">Call(lo=${lo},hi=${hi}):</span>  mid=${mid}  arr[${mid}]=${arr[mid]} `;
      if (arr[mid] === target) {
        out.innerHTML += `<span style="color:var(--primary-green)">✓ FOUND!</span><br>`;
        out.innerHTML += `<br><span style="color:var(--primary-green)">✅ Found at index: ${mid}  (${iter} recursive call(s))</span>`;
        return mid;
      } else if (arr[mid] < target) {
        out.innerHTML += `<span style="color:var(--primary-orange)">→ recurse RIGHT</span><br>`;
        return await recSim(mid + 1, hi, depth + 1);
      } else {
        out.innerHTML += `<span style="color:var(--primary-orange)">← recurse LEFT</span><br>`;
        return await recSim(lo, mid - 1, depth + 1);
      }
    }
    const r = await recSim(0, arr.length - 1, 0);
    if (r === -1)
      out.innerHTML += `<br><span style="color:var(--primary-red)">❌ ${target} not found after ${iter} recursive call(s).</span>`;
  }
}

/* 
   THEME / LEVELS / INIT
 */
document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const cur = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(cur) + 1) % 3];
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
  codeEditor.setOption("theme", getCMTheme(next));
};

document
  .getElementById("l1")
  .addEventListener(
    "click",
    () => (window.location.href = "binary_search_L1.html"),
  );
document
  .getElementById("l2")
  .addEventListener("click", () =>
    document.getElementById("slider1").classList.add("active"),
  );
document
  .getElementById("l3")
  .addEventListener(
    "click",
    () => (document.getElementById("quizModal").style.display = "flex"),
  );
document
  .getElementById("startQuiz")
  .addEventListener(
    "click",
    () => (window.location.href = "binary_search_L2_Quiz.html"),
  );
document
  .getElementById("cancelBtn")
  .addEventListener(
    "click",
    () => (document.getElementById("quizModal").style.display = "none"),
  );
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


const ALGO_KEY = "binarysearch";
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
