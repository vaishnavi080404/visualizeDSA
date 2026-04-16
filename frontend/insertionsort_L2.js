const codeTemplates = {
  iterative: {
    cpp: `#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];   // element to be inserted
        int j = i - 1;
        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;   // insert key at correct position
    }
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
    cout << "\\nBefore: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    insertionSort(arr, n);
    cout << "\\nAfter:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]      # element to be inserted
        j = i - 1
        # Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key  # insert key at correct position

n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)
print(f"\\nBefore: {arr}")
insertion_sort(arr)
print(f"After:  {arr}")`,
    java: `import java.util.Arrays;
import java.util.Scanner;

public class InsertionSort {
    static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
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
        System.out.println("\\nBefore: " + Arrays.toString(arr));
        insertionSort(arr);
        System.out.println("After:  " + Arrays.toString(arr));
    }
}`,
    c: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
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
    printf("\\nBefore: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    insertionSort(arr, n);
    printf("\\nAfter:  ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

const arr = [29, 10, 14, 37, 13, 8];
console.log("Before:", arr.join(", "));
insertionSort(arr);
console.log("After: ", arr.join(", "));`,
  },
  recursive: {
    cpp: `#include <iostream>
using namespace std;

void insertionSortRec(int arr[], int n) {
    if (n <= 1) return;           // base case
    insertionSortRec(arr, n - 1); // sort first n-1 elements
    int key = arr[n - 1];
    int j = n - 2;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
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
    cout << "\\nBefore: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    insertionSortRec(arr, n);
    cout << "\\nAfter:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
    python: `def insertion_sort_rec(arr, n=None):
    if n is None: n = len(arr)
    if n <= 1: return          # base case
    insertion_sort_rec(arr, n - 1)
    key = arr[n - 1]
    j = n - 2
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = key

n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)
print(f"\\nBefore: {arr}")
insertion_sort_rec(arr)
print(f"After:  {arr}")`,
    java: `import java.util.Arrays;
import java.util.Scanner;

public class InsertionSortRecursive {
    static void insertionSortRec(int[] arr, int n) {
        if (n <= 1) return;
        insertionSortRec(arr, n - 1);
        int key = arr[n - 1];
        int j = n - 2;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
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
        System.out.println("\\nBefore: " + Arrays.toString(arr));
        insertionSortRec(arr, n);
        System.out.println("After:  " + Arrays.toString(arr));
    }
}`,
    c: `#include <stdio.h>

void insertionSortRec(int arr[], int n) {
    if (n <= 1) return;
    insertionSortRec(arr, n - 1);
    int key = arr[n - 1];
    int j = n - 2;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
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
    printf("\\nBefore: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    insertionSortRec(arr, n);
    printf("\\nAfter:  ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    javascript: `function insertionSortRec(arr, n = arr.length) {
    if (n <= 1) return;
    insertionSortRec(arr, n - 1);
    let key = arr[n - 1];
    let j = n - 2;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}

const arr = [29, 10, 14, 37, 13, 8];
console.log("Before:", arr.join(", "));
insertionSortRec(arr);
console.log("After: ", arr.join(", "));`,
  },
};

let codeEditor,
  currentLang = "cpp",
  editorImpl = "iterative",
  currentImpl = "iterative";
let mainArr = [],
  mainSteps = [],
  mainStepIdx = 0,
  mainDone = false,
  mainTimer = null;
let mainComps = 0,
  mainShifts = 0,
  mainInserts = 0;
let inputResolver = null;
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function computeSteps(input) {
  const arr = [...input],
    n = arr.length,
    steps = [];

  if (currentImpl === "iterative") {
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      steps.push({
        type: "outer",
        i,
        key,
        arr: [...arr],
        caption: `OUTER LOOP: i=${i}, picking key = arr[${i}] = ${key}`,
        pseudo: "it-outer",
        keyVal: key,
        jVal: i,
      });
      steps.push({
        type: "key",
        i,
        key,
        arr: [...arr],
        caption: `KEY: key = ${key}, inner loop starts at j = ${i - 1}`,
        pseudo: "it-key",
        keyVal: key,
        jVal: i - 1,
      });
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        steps.push({
          type: "compare",
          i,
          j,
          key,
          arr: [...arr],
          caption: `COMPARE: arr[${j}]=${arr[j]} > key ${key} → shift right`,
          pseudo: "it-compare",
          keyVal: key,
          jVal: j,
        });
        arr[j + 1] = arr[j];
        steps.push({
          type: "shift",
          i,
          j,
          key,
          arr: [...arr],
          caption: `SHIFT: arr[${j + 1}] ← arr[${j}] = ${arr[j + 1]}`,
          pseudo: "it-shift",
          keyVal: key,
          jVal: j,
        });
        j--;
      }
      if (j >= 0)
        steps.push({
          type: "no-shift",
          i,
          j,
          key,
          arr: [...arr],
          caption: `COMPARE: arr[${j}]=${arr[j]} ≤ key ${key} → stop shifting`,
          pseudo: "it-compare",
          keyVal: key,
          jVal: j,
        });
      arr[j + 1] = key;
      steps.push({
        type: "place",
        i,
        j,
        key,
        placeIdx: j + 1,
        arr: [...arr],
        caption: `INSERT: arr[${j + 1}] = key = ${key} ✓`,
        pseudo: "it-place",
        keyVal: key,
        jVal: j + 1,
      });
    }
  } else {
    function sim(a, callN, depth) {
      if (callN <= 1) {
        steps.push({
          type: "rc-base",
          callN,
          depth,
          arr: [...a],
          caption: `BASE CASE: n=${callN} ≤ 1, return`,
          pseudo: "rc-base",
          keyVal: "—",
          jVal: "—",
        });
        return;
      }
      steps.push({
        type: "recurse",
        callN,
        depth,
        arr: [...a],
        caption: `RECURSE: insertionSortRec(arr, ${callN}) — sort first ${callN - 1} elements`,
        pseudo: "rc-recurse",
        keyVal: "—",
        jVal: "—",
      });
      sim(a, callN - 1, depth + 1);
      const key = a[callN - 1];
      steps.push({
        type: "key",
        callN,
        depth,
        key,
        arr: [...a],
        caption: `KEY (n=${callN}): key = arr[${callN - 1}] = ${key}, j = ${callN - 2}`,
        pseudo: "rc-key",
        keyVal: key,
        jVal: callN - 2,
      });
      let j = callN - 2;
      while (j >= 0 && a[j] > key) {
        steps.push({
          type: "compare",
          callN,
          depth,
          j,
          key,
          arr: [...a],
          caption: `COMPARE: arr[${j}]=${a[j]} > key ${key} → shift`,
          pseudo: "rc-compare",
          keyVal: key,
          jVal: j,
        });
        a[j + 1] = a[j];
        steps.push({
          type: "shift",
          callN,
          depth,
          j,
          key,
          arr: [...a],
          caption: `SHIFT: arr[${j + 1}] ← arr[${j}] = ${a[j + 1]}`,
          pseudo: "rc-shift",
          keyVal: key,
          jVal: j,
        });
        j--;
      }
      if (j >= 0)
        steps.push({
          type: "no-shift",
          callN,
          depth,
          j,
          key,
          arr: [...a],
          caption: `COMPARE: arr[${j}]=${a[j]} ≤ key ${key} → stop`,
          pseudo: "rc-compare",
          keyVal: key,
          jVal: j,
        });
      a[j + 1] = key;
      steps.push({
        type: "place",
        callN,
        depth,
        j,
        key,
        placeIdx: j + 1,
        arr: [...a],
        caption: `INSERT (n=${callN}): arr[${j + 1}] = ${key} ✓`,
        pseudo: "rc-place",
        keyVal: key,
        jVal: j + 1,
      });
    }
    sim(arr, n, 0);
  }

  steps.push({
    type: "done",
    arr: [...arr],
    caption: `✅ Array fully sorted: [${arr.join(", ")}]`,
    pseudo: currentImpl === "iterative" ? "it-done" : "rc-done",
    keyVal: "✓",
    jVal: "✓",
  });
  return steps;
}

/* 
   MAIN VISUALIZER
 */
function buildMainStrip(arr) {
  const s = document.getElementById("arrStrip"),
    ix = document.getElementById("idxStrip");
  s.innerHTML = "";
  ix.innerHTML = "";
  arr.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "arr-cell ac-default";
    c.id = "mc-" + i;
    c.textContent = v;
    s.appendChild(c);
    const id = document.createElement("div");
    id.className = "idx-cell";
    id.textContent = i;
    ix.appendChild(id);
  });
}

function applyStepToStrip(step) {
  const arr = step.arr;
  arr.forEach((v, i) => {
    const c = document.getElementById("mc-" + i);
    if (!c) return;
    c.textContent = v;
    c.className = "arr-cell ac-default";
  });
  if (!step) return;
  if (step.type === "done") {
    arr.forEach((_, i) => {
      const c = document.getElementById("mc-" + i);
      if (c) c.className = "arr-cell ac-sorted";
    });
    return;
  }
  const sortedUpTo =
    (step.i !== undefined
      ? step.i
      : step.callN !== undefined
        ? step.callN - 1
        : -1) - 1;
  for (let i = 0; i <= sortedUpTo; i++) {
    const c = document.getElementById("mc-" + i);
    if (c) c.className = "arr-cell ac-sorted";
  }
  if (step.type === "outer") {
    const c = document.getElementById("mc-" + step.i);
    if (c) c.className = "arr-cell ac-key";
    return;
  }
  if (step.type === "key" || step.type === "recurse" || step.type === "rc-base")
    return;
  if (step.type === "compare" || step.type === "no-shift") {
    const ki = step.i !== undefined ? step.i : step.callN - 1;
    const c = document.getElementById("mc-" + ki);
    if (c && c.className !== "arr-cell ac-sorted")
      c.className = "arr-cell ac-key";
    const cj = document.getElementById("mc-" + step.j);
    if (cj) cj.className = "arr-cell ac-comparing";
    return;
  }
  if (step.type === "shift") {
    const ki = step.i !== undefined ? step.i : step.callN - 1;
    const c = document.getElementById("mc-" + ki);
    if (c) c.className = "arr-cell ac-key";
    const cj1 = document.getElementById("mc-" + (step.j + 1));
    if (cj1) cj1.className = "arr-cell ac-shifting";
    return;
  }
  if (step.type === "place") {
    const cp = document.getElementById("mc-" + step.placeIdx);
    if (cp) cp.className = "arr-cell ac-placing";
    return;
  }
}

function setCaption(text, type = "") {
  const box = document.getElementById("captionBox");
  box.className = "caption-box" + (type ? " cap-" + type : "");
  box.innerHTML = text;
}
function updateBadges(phase) {
  document.getElementById("badge-phase").textContent = `Phase: ${phase || "—"}`;
  document.getElementById("badge-comps").textContent =
    `Comparisons: ${mainComps}`;
  document.getElementById("badge-shifts").textContent = `Shifts: ${mainShifts}`;
  document.getElementById("badge-inserts").textContent =
    `Inserts: ${mainInserts}`;
}
function highlightStep(pseudo) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`.pseudo-step[data-step="${pseudo}"]`);
  if (el) el.classList.add("active");
}
function updateKeyDisplay(step) {
  const row = document.getElementById("keyRow");
  if (!step || step.type === "done" || step.type === "rc-base") {
    row.style.display = "none";
    return;
  }
  row.style.display = "flex";
  document.getElementById("keyVal").textContent =
    step.keyVal !== undefined ? step.keyVal : "—";
  document.getElementById("jVal").textContent =
    step.jVal !== undefined ? step.jVal : "—";
}
function showMsg(text, type) {
  const el = document.getElementById("msg_show");
  el.style.display = "block";
  el.className = "alert alert-" + type;
  el.innerHTML = text;
}

function startSort() {
  clearTimeout(mainTimer);
  const raw = document.getElementById("arrayInput").value.trim();
  if (!raw) {
    showMsg("Please enter an array to sort.", "danger");
    return;
  }
  mainArr = raw
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  if (mainArr.length < 2) {
    showMsg("Enter at least 2 numbers.", "danger");
    return;
  }
  if (mainArr.length > 12) {
    showMsg("Keep to 12 elements or fewer for best visualization.", "danger");
    return;
  }
  mainSteps = computeSteps(mainArr);
  mainStepIdx = 0;
  mainDone = false;
  mainComps = 0;
  mainShifts = 0;
  mainInserts = 0;
  buildMainStrip(mainArr);
  updateBadges("Ready");
  setCaption(
    `Array loaded: [${mainArr.join(", ")}]. Click <strong>Step ▶</strong> or <strong>Auto ▶▶</strong> to begin.`,
  );
  document.getElementById("stepBtn").disabled = false;
  document.getElementById("autoBtn").disabled = false;
  document.getElementById("msg_show").style.display = "none";
  document.getElementById("keyRow").style.display = "none";
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}

function applyMainStep() {
  if (mainDone || mainStepIdx >= mainSteps.length) return false;
  const step = mainSteps[mainStepIdx++];
  if (step.type === "compare" || step.type === "no-shift") mainComps++;
  if (step.type === "shift") mainShifts++;
  if (step.type === "place") mainInserts++;
  const phaseMap = {
    outer: "Pick Key",
    key: "Store Key",
    recurse: "Recurse",
    "rc-base": "Base Case",
    compare: "Compare",
    "no-shift": "Compare",
    shift: "Shift",
    place: "Insert",
    done: "Done",
  };
  updateBadges(phaseMap[step.type] || step.type);
  applyStepToStrip(step);
  updateKeyDisplay(step);
  setCaption(
    step.caption,
    step.type === "outer" || step.type === "key"
      ? "key"
      : step.type === "compare" || step.type === "no-shift"
        ? "compare"
        : step.type === "shift"
          ? "shift"
          : step.type === "place"
            ? "place"
            : step.type === "done"
              ? "done"
              : "",
  );
  highlightStep(step.pseudo);
  if (step.type === "done") {
    mainDone = true;
    document.getElementById("keyRow").style.display = "none";
    showMsg(
      `<i class="fas fa-check-circle"></i>&nbsp; Sorted! Comparisons: ${mainComps} | Shifts: ${mainShifts} | Inserts: ${mainInserts}`,
      "success",
    );
    document.getElementById("stepBtn").disabled = true;
    document.getElementById("autoBtn").disabled = true;
    return false;
  }
  return true;
}

function stepSort() {
  applyMainStep();
}
function autoSort() {
  if (mainDone) return;
  document.getElementById("autoBtn").disabled = true;
  function tick() {
    const cont = applyMainStep();
    if (cont && !mainDone) mainTimer = setTimeout(tick, 520);
  }
  tick();
}
function resetSort() {
  clearTimeout(mainTimer);
  mainArr = [];
  mainSteps = [];
  mainStepIdx = 0;
  mainDone = false;
  mainComps = 0;
  mainShifts = 0;
  mainInserts = 0;
  document.getElementById("arrStrip").innerHTML = "";
  document.getElementById("idxStrip").innerHTML = "";
  document.getElementById("keyRow").style.display = "none";
  document.getElementById("msg_show").style.display = "none";
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("autoBtn").disabled = true;
  setCaption("Enter an array and click Sort to begin.");
  updateBadges(null);
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}

/* SWITCH IMPL */
function switchImplementation(type) {
  currentImpl = type;
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  document.getElementById("visualizer-title").textContent =
    "Insertion Sort Visualizer — " +
    (type === "iterative" ? "Iterative" : "Recursive");
  document.getElementById("pseudo-iterative").style.display =
    type === "iterative" ? "block" : "none";
  document.getElementById("pseudo-recursive").style.display =
    type === "recursive" ? "block" : "none";
  resetSort();
}

/* 
   SCENARIO HELPERS
 */
function buildScenArr(wrapId, data) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  wrap.innerHTML = "";
  const row = document.createElement("div");
  row.className = "s-row";
  const lbl = document.createElement("div");
  lbl.className = "s-label";
  lbl.textContent = "arr:";
  row.appendChild(lbl);
  data.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "sc sc-default";
    c.id = wrapId + "-c" + i;
    c.textContent = v;
    row.appendChild(c);
  });
  wrap.appendChild(row);
}

function renderScenStep(wrapId, step, data) {
  if (!step) return;
  const a = step.arr || data;
  a.forEach((v, i) => {
    const c = document.getElementById(wrapId + "-c" + i);
    if (!c) return;
    c.textContent = v;
    c.className = "sc sc-default";
  });
  if (step.type === "done") {
    a.forEach((_, i) => {
      const c = document.getElementById(wrapId + "-c" + i);
      if (c) c.className = "sc sc-sorted";
    });
    return;
  }
  const sortedUpTo =
    (step.i !== undefined
      ? step.i
      : step.callN !== undefined
        ? step.callN - 1
        : -1) - 1;
  for (let i = 0; i <= sortedUpTo; i++) {
    const c = document.getElementById(wrapId + "-c" + i);
    if (c) c.className = "sc sc-sorted";
  }
  if (step.type === "outer") {
    const c = document.getElementById(wrapId + "-c" + step.i);
    if (c) c.className = "sc sc-key";
    return;
  }
  if (step.type === "compare" || step.type === "no-shift") {
    const ki = step.i !== undefined ? step.i : step.callN - 1;
    const c = document.getElementById(wrapId + "-c" + ki);
    if (c && !c.className.includes("sorted")) c.className = "sc sc-key";
    const cj = document.getElementById(wrapId + "-c" + step.j);
    if (cj) cj.className = "sc sc-comparing";
    return;
  }
  if (step.type === "shift") {
    const ki = step.i !== undefined ? step.i : step.callN - 1;
    const c = document.getElementById(wrapId + "-c" + ki);
    if (c) c.className = "sc sc-key";
    const cj1 = document.getElementById(wrapId + "-c" + (step.j + 1));
    if (cj1) cj1.className = "sc sc-shifting";
    return;
  }
  if (step.type === "place") {
    const cp = document.getElementById(wrapId + "-c" + step.placeIdx);
    if (cp) cp.className = "sc sc-placing";
    return;
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

function makeScenEngine(data) {
  const saved = currentImpl;
  currentImpl = "iterative";
  const steps = computeSteps([...data]);
  currentImpl = saved;
  return { steps, idx: 0, done: false, data: [...data] };
}

function runScenStep(eng, wrapId, logId, doneCallback) {
  if (eng.done || eng.idx >= eng.steps.length) return;
  const step = eng.steps[eng.idx++];
  const log = document.getElementById(logId);
  const logMap = {
    outer: { text: `Pick key: arr[${step.i}] = ${step.key}`, cls: "log-key" },
    key: {
      text: `key = ${step.key}, start at j = ${step.i !== undefined ? step.i - 1 : step.callN - 2}`,
      cls: "log-key",
    },
    compare: {
      text: `  Compare arr[${step.j}]=${step.arr[step.j]} > key ${step.key} → shift`,
      cls: "log-compare",
    },
    "no-shift": {
      text: `  Compare arr[${step.j}]=${step.arr[step.j]} ≤ key ${step.key} → stop`,
      cls: "log-compare",
    },
    shift: {
      text: `  Shift: arr[${step.j + 1}] ← arr[${step.j}]`,
      cls: "log-shift",
    },
    place: {
      text: `  Insert: arr[${step.placeIdx}] = ${step.key} ✓`,
      cls: "log-place",
    },
    recurse: {
      text: `Recurse: insertionSortRec(arr, ${step.callN})`,
      cls: "log-key",
    },
    "rc-base": { text: `Base case: n=${step.callN} ≤ 1`, cls: "log-info" },
    done: { text: `✓ Fully sorted!`, cls: "log-sorted" },
  };
  const entry = logMap[step.type];
  if (entry) addLog(log, entry.text, entry.cls);
  renderScenStep(wrapId, step, eng.data);
  if (step.type === "done") {
    eng.done = true;
    addLog(log, "Best O(N) | Avg/Worst O(N²) | Space O(1)", "log-result");
    if (doneCallback) doneCallback();
  }
}

/* BEST */
const BEST_DATA = [5, 10, 15, 20, 25, 30];
let bestEng = null,
  bestTimer = null;
function initBest() {
  bestEng = makeScenEngine(BEST_DATA);
  buildScenArr("sarr-best", BEST_DATA);
  document.getElementById("log-best").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-best"),
    `Array: [${BEST_DATA.join(", ")}] — already sorted`,
    "log-info",
  );
  addLog(
    document.getElementById("log-best"),
    "Best case: O(N) — only 1 compare per key, no shifts",
    "log-info",
  );
  document.getElementById("best-step-btn").disabled = false;
  document.getElementById("best-auto-btn").disabled = false;
}
function bestStep() {
  runScenStep(bestEng, "sarr-best", "log-best", () => {
    document.getElementById("best-step-btn").disabled = true;
    document.getElementById("best-auto-btn").disabled = true;
  });
}
function bestAuto() {
  document.getElementById("best-auto-btn").disabled = true;
  function tick() {
    if (!bestEng.done) {
      bestStep();
      if (!bestEng.done) bestTimer = setTimeout(tick, 550);
    }
  }
  tick();
}
function resetBest() {
  clearTimeout(bestTimer);
  initBest();
}

/* AVERAGE */
const AVG_DATA = [29, 10, 14, 37, 13, 8];
let avgEng = null,
  avgTimer = null;
function initAvg() {
  avgEng = makeScenEngine(AVG_DATA);
  buildScenArr("sarr-avg", AVG_DATA);
  document.getElementById("log-avg").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-avg"),
    `Array: [${AVG_DATA.join(", ")}] — random`,
    "log-info",
  );
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}
function avgStep() {
  runScenStep(avgEng, "sarr-avg", "log-avg", () => {
    document.getElementById("avg-step-btn").disabled = true;
    document.getElementById("avg-auto-btn").disabled = true;
  });
}
function avgAuto() {
  document.getElementById("avg-auto-btn").disabled = true;
  function tick() {
    if (!avgEng.done) {
      avgStep();
      if (!avgEng.done) avgTimer = setTimeout(tick, 520);
    }
  }
  tick();
}
function resetAvg() {
  clearTimeout(avgTimer);
  initAvg();
}

/* WORST */
const WORST_DATA = [60, 50, 40, 30, 20, 10];
let worstEng = null,
  worstTimer = null;
function initWorst() {
  worstEng = makeScenEngine(WORST_DATA);
  buildScenArr("sarr-worst", WORST_DATA);
  document.getElementById("log-worst").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-worst"),
    `Array: [${WORST_DATA.join(", ")}] — reverse sorted`,
    "log-warn",
  );
  addLog(
    document.getElementById("log-worst"),
    "Worst case: O(N²) — max shifts per key",
    "log-warn",
  );
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}
function worstStep() {
  runScenStep(worstEng, "sarr-worst", "log-worst", () => {
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
  });
}
function worstAuto() {
  document.getElementById("worst-auto-btn").disabled = true;
  function tick() {
    if (!worstEng.done) {
      worstStep();
      if (!worstEng.done) worstTimer = setTimeout(tick, 500);
    }
  }
  tick();
}
function resetWorst() {
  clearTimeout(worstTimer);
  initWorst();
}

/* CUSTOM */
let custEng = null,
  custTimer = null,
  ccTimerId = null;
function initCustom() {
  document.getElementById("sarr-custom").innerHTML = "";
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-custom"),
    "Enter an array and click ▶ Load & Sort.",
    "log-info",
  );
  custEng = null;
  document.getElementById("custom-step-btn").disabled = true;
  document.getElementById("custom-auto-btn").disabled = true;
  ["best", "avg", "worst"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c)
      c.classList.remove("cc-active-best", "cc-active-avg", "cc-active-worst");
  });
  document.getElementById("cc-toast").className = "cc-toast";
}
function customLoad() {
  clearTimeout(custTimer);
  const raw = document.getElementById("custom-arr").value.trim();
  if (!raw) {
    addLog(
      document.getElementById("log-custom"),
      "Enter an array first!",
      "log-warn",
    );
    return;
  }
  const data = raw
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  if (data.length < 2) {
    addLog(
      document.getElementById("log-custom"),
      "Need at least 2 numbers.",
      "log-warn",
    );
    return;
  }
  if (data.length > 10) {
    addLog(
      document.getElementById("log-custom"),
      "Keep to 10 elements for best visualization.",
      "log-warn",
    );
    return;
  }
  custEng = makeScenEngine(data);
  buildScenArr("sarr-custom", data);
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-custom"),
    `Array: [${data.join(", ")}]  N=${data.length}`,
    "log-info",
  );
  const sorted = [...data].sort((a, b) => a - b),
    reverse = [...data].sort((a, b) => b - a);
  const isSorted = JSON.stringify(data) === JSON.stringify(sorted),
    isReverse = JSON.stringify(data) === JSON.stringify(reverse);
  const cplx = isSorted
    ? "O(N) — Best case!"
    : isReverse
      ? "O(N²) — Worst case!"
      : "O(N²) — Average case";
  addLog(
    document.getElementById("log-custom"),
    `Expected: Time ${cplx} | Space O(1)`,
    "log-info",
  );
  document.getElementById("custom-step-btn").disabled = false;
  document.getElementById("custom-auto-btn").disabled = false;
}
function highlightCC(type) {
  ["best", "avg", "worst"].forEach((t) =>
    document
      .getElementById("cc-" + t)
      .classList.remove("cc-active-best", "cc-active-avg", "cc-active-worst"),
  );
  clearTimeout(ccTimerId);
  const card = document.getElementById("cc-" + type);
  if (card) {
    card.classList.add("cc-active-" + type);
    ccTimerId = setTimeout(
      () => card.classList.remove("cc-active-" + type),
      2200,
    );
  }
}
function showCCToast(type, msg) {
  const toast = document.getElementById("cc-toast"),
    icons = { best: "⚡", avg: "〜", worst: "⚠" };
  document.getElementById("cc-toast-icon").textContent = icons[type] || "📊";
  document.getElementById("cc-toast-text").textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.className = "cc-toast";
  }, 2800);
}
function customStep() {
  if (!custEng || custEng.done) return;
  runScenStep(custEng, "sarr-custom", "log-custom", () => {
    const data = custEng.data,
      sorted = [...data].sort((a, b) => a - b),
      reverse = [...data].sort((a, b) => b - a);
    const isSorted = JSON.stringify(data) === JSON.stringify(sorted),
      isReverse = JSON.stringify(data) === JSON.stringify(reverse);
    const type = isSorted ? "best" : isReverse ? "worst" : "avg";
    const label = isSorted
      ? "O(N) — sorted input, minimal comparisons"
      : isReverse
        ? "O(N²) — reverse sorted, max shifts"
        : "O(N²) — random, average shifts";
    highlightCC(type);
    showCCToast(type, label);
    document.getElementById("custom-step-btn").disabled = true;
    document.getElementById("custom-auto-btn").disabled = true;
  });
}
function customAutoPlay() {
  document.getElementById("custom-auto-btn").disabled = true;
  function tick() {
    if (!custEng.done) {
      customStep();
      if (!custEng.done) custTimer = setTimeout(tick, 510);
    }
  }
  tick();
}
function resetCustom() {
  clearTimeout(custTimer);
  document.getElementById("custom-arr").value = "";
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
  codeEditor.setOption("mode", modeMap[currentLang]);
  codeEditor.setValue(codeTemplates[editorImpl][currentLang]);
  document.querySelector(".lang-display").textContent =
    nameMap[currentLang] +
    " — " +
    (editorImpl === "iterative" ? "Iterative" : "Recursive");
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
    document.getElementById("promptText").textContent = prompt;
    document.getElementById("inputPrompt").style.display = "block";
    document.getElementById("userInput").value = "";
    document.getElementById("userInput").focus();
    inputResolver = resolve;
  });
}
function submitInput() {
  const val = document.getElementById("userInput").value.trim();
  if (val && inputResolver) {
    document.getElementById("inputPrompt").style.display = "none";
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
  const langN = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    c: "C",
    javascript: "JavaScript",
  };
  out.innerHTML += `<span style="color:var(--primary-cyan)">Insertion Sort (${editorImpl === "iterative" ? "Iterative" : "Recursive"}) — ${langN[currentLang]}</span><br><br>`;
  const n = parseInt(await getInput("Enter number of elements: "));
  out.innerHTML += `<span style="color:#a0a0a0">Enter number of elements: </span>${n}<br>`;
  const arr = [];
  for (let i = 0; i < n; i++) {
    const v = parseInt(await getInput(`arr[${i}] = `));
    arr.push(v);
    out.innerHTML += `<span style="color:#a0a0a0">arr[${i}] = </span>${v}<br>`;
  }
  out.innerHTML += `<br><span style="color:var(--primary-cyan)">Before: [${arr.join(", ")}]</span><br><br>`;
  let comps = 0,
    shifts = 0;

  if (editorImpl === "iterative") {
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      out.innerHTML += `<span style="color:var(--primary-orange)">i=${i}, key=${key}</span><br>`;
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        comps++;
        out.innerHTML += `  <span style="color:var(--primary-pink)">arr[${j}]=${arr[j]} > ${key}</span> → shift<br>`;
        arr[j + 1] = arr[j];
        j--;
        shifts++;
        await sleep(40);
      }
      if (j >= 0) comps++;
      arr[j + 1] = key;
      out.innerHTML += `  <span style="color:var(--primary-cyan)">Insert arr[${j + 1}] = ${key}</span> → [${arr.join(",")}]<br>`;
      await sleep(60);
    }
  } else {
    async function simRec(a, callN, depth) {
      if (callN <= 1) return;
      const indent = "  ".repeat(depth);
      out.innerHTML += `${indent}<span style="color:#8b5cf6">insertionSortRec(arr, ${callN})</span><br>`;
      await simRec(a, callN - 1, depth + 1);
      const key = a[callN - 1];
      out.innerHTML += `${indent}<span style="color:var(--primary-orange)">Insert key=${key} (n=${callN})</span><br>`;
      let j = callN - 2;
      while (j >= 0 && a[j] > key) {
        comps++;
        out.innerHTML += `${indent}  <span style="color:var(--primary-pink)">arr[${j}]=${a[j]} > ${key}</span> → shift<br>`;
        a[j + 1] = a[j];
        j--;
        shifts++;
        await sleep(40);
      }
      if (j >= 0) comps++;
      a[j + 1] = key;
      out.innerHTML += `${indent}  <span style="color:var(--primary-cyan)">arr[${j + 1}] = ${key}</span><br>`;
      await sleep(60);
    }
    await simRec(arr, n, 0);
  }
  out.innerHTML += `<br><span style="color:var(--primary-green)">✅ After:  [${arr.join(", ")}]</span><br>`;
  out.innerHTML += `<span style="color:var(--primary-cyan)">Comparisons: ${comps}  |  Shifts: ${shifts}  |  Space: O(1)</span>`;
}

/* 
   THEME / LEVELS / INIT
 */
document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"],
    cur = document.body.getAttribute("data-theme") || "dark",
    next = themes[(themes.indexOf(cur) + 1) % 3];
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
  codeEditor.setOption("theme", getCMTheme(next));
};
document
  .getElementById("l1")
  .addEventListener(
    "click",
    () => (window.location.href = "insertion_sort_L1.html"),
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
    () => (window.location.href = "insertion_sort_L2_Quiz.html"),
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

const ALGO_KEY = "insertionsort";
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

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditor();
  updateLevelButtons();
};
