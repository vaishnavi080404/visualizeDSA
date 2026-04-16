const codeTemplates = {
  iterative: {
    cpp: `#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Assume the minimum is at position i
        int minIdx = i;

        // Find the minimum in the unsorted part
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }

        // Swap only if a smaller element was found
        if (minIdx != i)
            swap(arr[i], arr[minIdx]);
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

    cout << "\\nBefore sorting: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";

    selectionSort(arr, n);

    cout << "\\nAfter sorting:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    return 0;
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    swaps = 0

    for i in range(n - 1):
        min_idx = i

        # Find minimum in unsorted part
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap only if needed
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            swaps += 1

    return swaps

# --- Input ---
n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

print(f"\\nBefore sorting: {arr}")

swaps = selection_sort(arr)

print(f"After sorting:  {arr}")
print(f"Total swaps:    {swaps}")
print(f"Comparisons:    {n * (n - 1) // 2}  [always N(N-1)/2]")`,
    java: `import java.util.Arrays;
import java.util.Scanner;

public class SelectionSort {

    static int selectionSort(int[] arr) {
        int n = arr.length, swaps = 0;

        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;

            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx])
                    minIdx = j;
            }

            if (minIdx != i) {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
                swaps++;
            }
        }
        return swaps;
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
        int swaps = selectionSort(arr);
        System.out.println("After:  " + Arrays.toString(arr));
        System.out.println("Swaps:  " + swaps);
        System.out.println("Comps:  " + (n * (n - 1) / 2) + "  [always N(N-1)/2]");
    }
}`,
    c: `#include <stdio.h>

void swap(int *a, int *b) { int t=*a; *a=*b; *b=t; }

int selectionSort(int arr[], int n) {
    int swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        if (minIdx != i) { swap(&arr[i], &arr[minIdx]); swaps++; }
    }
    return swaps;
}

int main() {
    int n;
    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = ", i); scanf("%d", &arr[i]);
    }

    printf("\\nBefore: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);

    int swaps = selectionSort(arr, n);

    printf("\\nAfter:  ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\nSwaps:  %d\\nComps:  %d  [always N(N-1)/2]\\n",
           swaps, n*(n-1)/2);
    return 0;
}`,
    javascript: `function selectionSort(arr) {
    const n = arr.length;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }

        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            swaps++;
        }
    }
    return swaps;
}

// --- Demo ---
const arr = [64, 25, 12, 22, 11];
console.log("Before:", arr.join(", "));

const swaps = selectionSort(arr);

console.log("After: ", arr.join(", "));
console.log("Swaps: ", swaps);
console.log("Comps: ", arr.length * (arr.length - 1) / 2, " [always N(N-1)/2]");`,
  },

  recursive: {
    cpp: `#include <iostream>
using namespace std;

void selectionSortRec(int arr[], int start, int n, int &swaps) {
    // Base case: only one element left
    if (start >= n - 1) return;

    // Find minimum in arr[start..n-1]
    int minIdx = start;
    for (int j = start + 1; j < n; j++)
        if (arr[j] < arr[minIdx]) minIdx = j;

    // Swap if needed
    if (minIdx != start) {
        swap(arr[start], arr[minIdx]);
        swaps++;
    }

    // Recurse on remaining unsorted sub-array
    selectionSortRec(arr, start + 1, n, swaps);
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

    cout << "\\nBefore sorting: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";

    int swaps = 0;
    selectionSortRec(arr, 0, n, swaps);

    cout << "\\nAfter sorting:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\\nSwaps: " << swaps
         << "  |  Recursive depth: " << n - 1 << endl;

    return 0;
}`,
    python: `def selection_sort_rec(arr, start=0, swaps=None):
    if swaps is None:
        swaps = [0]
    n = len(arr)

    # Base case
    if start >= n - 1:
        return swaps[0]

    # Find minimum in arr[start:]
    min_idx = start
    for j in range(start + 1, n):
        if arr[j] < arr[min_idx]:
            min_idx = j

    # Swap if needed
    if min_idx != start:
        arr[start], arr[min_idx] = arr[min_idx], arr[start]
        swaps[0] += 1

    # Recurse on remaining sub-array
    return selection_sort_rec(arr, start + 1, swaps)

# --- Input ---
n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

print(f"\\nBefore sorting: {arr}")

swaps = selection_sort_rec(arr)

print(f"After sorting:  {arr}")
print(f"Total swaps:    {swaps}")
print(f"Recursive depth: {n - 1}")
print(f"Comparisons:    {n * (n - 1) // 2}  [always N(N-1)/2]")`,
    java: `import java.util.Arrays;
import java.util.Scanner;

public class SelectionSortRecursive {

    static int swaps = 0;

    static void selectionSortRec(int[] arr, int start) {
        int n = arr.length;
        if (start >= n - 1) return;

        int minIdx = start;
        for (int j = start + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;

        if (minIdx != start) {
            int temp = arr[start];
            arr[start] = arr[minIdx];
            arr[minIdx] = temp;
            swaps++;
        }

        selectionSortRec(arr, start + 1);
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
        selectionSortRec(arr, 0);
        System.out.println("After:  " + Arrays.toString(arr));
        System.out.println("Swaps:  " + swaps);
        System.out.println("Depth:  " + (n - 1) + " recursive calls");
    }
}`,
    c: `#include <stdio.h>

void swapVals(int *a, int *b) { int t=*a; *a=*b; *b=t; }

int swaps = 0;

void selectionSortRec(int arr[], int start, int n) {
    if (start >= n - 1) return;

    int minIdx = start;
    for (int j = start + 1; j < n; j++)
        if (arr[j] < arr[minIdx]) minIdx = j;

    if (minIdx != start) {
        swapVals(&arr[start], &arr[minIdx]);
        swaps++;
    }

    selectionSortRec(arr, start + 1, n);
}

int main() {
    int n;
    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = ", i); scanf("%d", &arr[i]);
    }

    printf("\\nBefore: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);

    selectionSortRec(arr, 0, n);

    printf("\\nAfter:  ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\nSwaps: %d  |  Depth: %d recursive calls\\n", swaps, n-1);
    return 0;
}`,
    javascript: `function selectionSortRec(arr, start = 0, swaps = { count: 0 }) {
    const n = arr.length;

    // Base case
    if (start >= n - 1) return swaps.count;

    // Find minimum in arr[start..n-1]
    let minIdx = start;
    for (let j = start + 1; j < n; j++)
        if (arr[j] < arr[minIdx]) minIdx = j;

    // Swap if needed
    if (minIdx !== start) {
        [arr[start], arr[minIdx]] = [arr[minIdx], arr[start]];
        swaps.count++;
    }

    // Recurse on remaining sub-array
    return selectionSortRec(arr, start + 1, swaps);
}

// --- Demo ---
const arr = [64, 25, 12, 22, 11];
console.log("Before:", arr.join(", "));

const totalSwaps = selectionSortRec(arr);

console.log("After: ", arr.join(", "));
console.log("Swaps: ", totalSwaps);
console.log("Depth: ", arr.length - 1, "recursive calls");`,
  },
};


let codeEditor;
let currentLang = "cpp";
let editorImpl = "iterative";
let currentImpl = "iterative";

// Main visualizer state — step-generator pattern
let mainArr = [];
let mainSteps = []; // pre-computed steps
let mainStepIdx = 0;
let mainDone = false;
let mainTimer = null;
let mainComps = 0;
let mainSwaps = 0;
let mainSorted = 0;

let waitingForInput = false;
let currentInputResolver = null;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function computeSteps(inputArr) {
  const arr = [...inputArr];
  const n = arr.length;
  const steps = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      type: "outer",
      i,
      j: -1,
      minIdx,
      arr: [...arr],
      caption: `Pass ${i + 1}: assume arr[${i}]=${arr[i]} is the minimum.`,
      pseudo: currentImpl === "iterative" ? "it-outer" : "re-minidx",
      sorted: i,
    });

    steps.push({
      type: "minidx",
      i,
      j: -1,
      minIdx,
      arr: [...arr],
      caption: `Set minIdx=${i} (arr[${i}]=${arr[i]}).`,
      pseudo: currentImpl === "iterative" ? "it-minidx" : "re-scan",
      sorted: i,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: "compare",
        i,
        j,
        minIdx,
        arr: [...arr],
        caption: `Compare arr[${j}]=${arr[j]} with arr[minIdx=${minIdx}]=${arr[minIdx]}.`,
        pseudo: currentImpl === "iterative" ? "it-compare" : "re-compare",
        sorted: i,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          type: "updatemin",
          i,
          j,
          minIdx,
          arr: [...arr],
          caption: `New minimum! arr[${j}]=${arr[j]} < previous min → minIdx=${j}.`,
          pseudo: currentImpl === "iterative" ? "it-updatemin" : "re-updatemin",
          sorted: i,
        });
      }
    }

    steps.push({
      type: "swapcheck",
      i,
      j: -1,
      minIdx,
      arr: [...arr],
      caption:
        minIdx !== i
          ? `Min at idx ${minIdx} ≠ i (${i}) → swap arr[${i}]=${arr[i]} ↔ arr[${minIdx}]=${arr[minIdx]}.`
          : `Min already at idx ${i} — no swap needed.`,
      pseudo: currentImpl === "iterative" ? "it-swapcheck" : "re-swap",
      sorted: i,
    });

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        type: "swap",
        i,
        j: -1,
        minIdx: i,
        arr: [...arr],
        caption: `Swapped! arr[${i}]=${arr[i]} is now in its correct position.`,
        pseudo: currentImpl === "iterative" ? "it-swap" : "re-swap",
        sorted: i + 1,
      });
    } else {
      steps.push({
        type: "noswap",
        i,
        j: -1,
        minIdx: i,
        arr: [...arr],
        caption: `No swap — arr[${i}]=${arr[i]} already in correct position.`,
        pseudo: currentImpl === "iterative" ? "it-swapcheck" : "re-swap",
        sorted: i + 1,
      });
    }

    if (currentImpl === "recursive") {
      steps.push({
        type: "recurse",
        i,
        j: -1,
        minIdx: i,
        arr: [...arr],
        caption: `Recurse: call selSort(arr, ${i + 1}, n) — solve smaller sub-array.`,
        pseudo: "re-recurse",
        sorted: i + 1,
      });
    }
  }

  steps.push({
    type: "done",
    i: n - 1,
    j: -1,
    minIdx: n - 1,
    arr: [...arr],
    caption: `✅ Array fully sorted in ${n - 1} passes!`,
    pseudo: currentImpl === "iterative" ? "it-done" : "re-done",
    sorted: n,
  });
  return steps;
}


const BAR_COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#ec4899",
  "#3b82f6",
  "#14b8a6",
];

function renderBars(arr, state) {
  const area = document.getElementById("barsArea");
  area.innerHTML = "";
  const maxVal = Math.max(...arr);
  arr.forEach((v, i) => {
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";

    const bar = document.createElement("div");
    bar.className = "bar " + getBarClass(i, state);
    const h = Math.max(18, Math.round((v / maxVal) * 170));
    bar.style.height = h + "px";
    bar.textContent = v;

    const lbl = document.createElement("div");
    lbl.className = "bar-idx";
    lbl.textContent = i;

    wrap.appendChild(bar);
    wrap.appendChild(lbl);
    area.appendChild(wrap);
  });
}

function getBarClass(idx, state) {
  if (!state) return "bar-default";
  if (idx < state.sorted) return "bar-sorted";
  if (state.type === "swap" || state.type === "noswap") {
    if (idx === state.i || idx === state.minIdx) return "bar-swapping";
  }
  if (idx === state.i) return "bar-current";
  if (idx === state.minIdx) return "bar-minimum";
  if (idx === state.j) return "bar-comparing";
  return "bar-default";
}

function updateBadges(pass, n) {
  document.getElementById("badge-pass").textContent =
    `Pass: ${pass} / ${n - 1}`;
  document.getElementById("badge-comps").textContent =
    `Comparisons: ${mainComps}`;
  document.getElementById("badge-swaps").textContent = `Swaps: ${mainSwaps}`;
  document.getElementById("badge-sorted").textContent = `Sorted: ${mainSorted}`;
}

function setCaption(text, type = "") {
  const box = document.getElementById("captionBox");
  box.className = "caption-box" + (type ? " caption-" + type : "");
  box.innerHTML = text;
}

function showMsg(text, type) {
  const el = document.getElementById("msg_show");
  el.style.display = "block";
  el.className = "alert alert-" + type;
  el.innerHTML = text;
}

function highlightStep(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`.pseudo-step[data-step="${step}"]`);
  if (el) el.classList.add("active");
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
  mainSteps = computeSteps(mainArr);
  mainStepIdx = 0;
  mainDone = false;
  mainComps = 0;
  mainSwaps = 0;
  mainSorted = 0;
  renderBars(mainArr, null);
  updateBadges(0, mainArr.length);
  setCaption(`Ready to sort [${mainArr.join(", ")}]. Click Step ▶ or Auto ▶▶`);
  document.getElementById("stepBtn").disabled = false;
  document.getElementById("autoBtn").disabled = false;
  document.getElementById("msg_show").style.display = "none";
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}

function applyMainStep() {
  if (mainDone || mainStepIdx >= mainSteps.length) return false;
  const step = mainSteps[mainStepIdx++];

  if (step.type === "compare") mainComps++;
  if (step.type === "swap") mainSwaps++;
  mainSorted = step.sorted;

  renderBars(step.arr, step);
  setCaption(
    step.caption,
    step.type === "swap" ? "swap" : step.type === "done" ? "done" : "",
  );
  highlightStep(step.pseudo);
  updateBadges(step.i + 1, mainArr.length);

  if (step.type === "done") {
    mainDone = true;
    showMsg(
      '<i class="fas fa-check"></i> Array sorted! Passes: ' +
        (mainArr.length - 1) +
        " | Comparisons: " +
        mainComps +
        " | Swaps: " +
        mainSwaps,
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
    if (cont && !mainDone) mainTimer = setTimeout(tick, 500);
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
  mainSwaps = 0;
  mainSorted = 0;
  document.getElementById("barsArea").innerHTML = "";
  setCaption("Enter an array and click Sort to begin.");
  document.getElementById("msg_show").style.display = "none";
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("autoBtn").disabled = true;
  updateBadges(0, 1);
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}


function switchImplementation(type) {
  currentImpl = type;
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  document.getElementById("visualizer-title").textContent =
    "Selection Sort Visualizer — " +
    (type === "iterative" ? "Iterative" : "Recursive");
  document.getElementById("pseudo-iterative").style.display =
    type === "iterative" ? "block" : "none";
  document.getElementById("pseudo-recursive").style.display =
    type === "recursive" ? "block" : "none";
  resetSort();
}


function buildMiniBars(containerId, data) {
  const area = document.getElementById(containerId);
  area.innerHTML = "";
  const maxV = Math.max(...data);
  data.forEach((v, i) => {
    const wrap = document.createElement("div");
    wrap.className = "mbar-wrap";
    const bar = document.createElement("div");
    bar.className = "mbar mb-default";
    bar.id = containerId + "-b" + i;
    bar.style.height = Math.max(14, Math.round((v / maxV) * 100)) + "px";
    bar.textContent = v;
    const lbl = document.createElement("div");
    lbl.className = "mbar-idx";
    lbl.textContent = i;
    wrap.appendChild(bar);
    wrap.appendChild(lbl);
    area.appendChild(wrap);
  });
}

function renderMiniState(containerId, data, i, minIdx, j, sortedCount) {
  data.forEach((_, idx) => {
    const b = document.getElementById(containerId + "-b" + idx);
    if (!b) return;
    if (idx < sortedCount) {
      b.className = "mbar mb-sorted";
      return;
    }
    if (idx === i) {
      b.className = "mbar mb-current";
      return;
    }
    if (idx === minIdx) {
      b.className = "mbar mb-minimum";
      return;
    }
    if (idx === j) {
      b.className = "mbar mb-comparing";
      return;
    }
    b.className = "mbar mb-default";
  });
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

function makeScenState(inputData) {
  const arr = [...inputData],
    n = arr.length;
  return {
    arr,
    n,
    i: 0,
    j: -1,
    minIdx: 0,
    sorted: 0,
    pass: 1,
    comps: 0,
    swaps: 0,
    phase: "outer",
    done: false,
  };
}

function scenStep(st) {
  if (st.done) return null;
  const { arr, n } = st;
  let log = null,
    type = "compare";

  if (st.phase === "outer") {
    if (st.i >= n - 1) {
      st.done = true;
      return {
        type: "done",
        i: st.i,
        j: -1,
        minIdx: st.i,
        arr: [...arr],
        sorted: n,
        log: {
          text: `✓ Fully sorted! Passes:${n - 1} Comps:${st.comps} Swaps:${st.swaps}`,
          cls: "log-sorted",
        },
      };
    }
    st.minIdx = st.i;
    st.j = st.i + 1;
    st.phase = "inner";
    return {
      type: "outer",
      i: st.i,
      j: -1,
      minIdx: st.minIdx,
      arr: [...arr],
      sorted: st.sorted,
      log: {
        text: `Pass ${st.pass}: i=${st.i}, assume min=arr[${st.i}]=${arr[st.i]}`,
        cls: "log-pass",
      },
    };
  }
  if (st.phase === "inner") {
    if (st.j < n) {
      st.comps++;
      const old = st.minIdx;
      const isNew = arr[st.j] < arr[st.minIdx];
      if (isNew) st.minIdx = st.j;
      const result = {
        type: "compare",
        i: st.i,
        j: st.j,
        minIdx: st.minIdx,
        arr: [...arr],
        sorted: st.sorted,
        log: {
          text: `  Compare arr[${st.j}]=${arr[st.j]} vs arr[${old}]=${arr[old]}${isNew ? " → new min!" : ""}`,
          cls: isNew ? "log-min" : "log-info",
        },
      };
      st.j++;
      return result;
    }
    st.phase = "swap";
    return {
      type: "swapcheck",
      i: st.i,
      j: -1,
      minIdx: st.minIdx,
      arr: [...arr],
      sorted: st.sorted,
      log: {
        text: `  minIdx=${st.minIdx} → ${st.minIdx !== st.i ? `swap arr[${st.i}]↔arr[${st.minIdx}]` : "no swap needed"}`,
        cls: "log-info",
      },
    };
  }
  if (st.phase === "swap") {
    let result;
    if (st.minIdx !== st.i) {
      [arr[st.i], arr[st.minIdx]] = [arr[st.minIdx], arr[st.i]];
      st.swaps++;
      st.sorted = st.i + 1;
      result = {
        type: "swap",
        i: st.i,
        j: -1,
        minIdx: st.minIdx,
        arr: [...arr],
        sorted: st.sorted,
        log: {
          text: `  ↔ Swapped arr[${st.i}]=${arr[st.i]} now placed correctly`,
          cls: "log-swap",
        },
      };
    } else {
      st.sorted = st.i + 1;
      result = {
        type: "noswap",
        i: st.i,
        j: -1,
        minIdx: st.minIdx,
        arr: [...arr],
        sorted: st.sorted,
        log: {
          text: `  ✓ arr[${st.i}]=${arr[st.i]} already in place`,
          cls: "log-noswap",
        },
      };
    }
    st.i++;
    st.pass++;
    st.phase = "outer";
    return result;
  }
}

/* ── BEST ── */
const BEST_DATA = [5, 11, 19, 25, 36, 42];
let bestSt = null,
  bestTimer = null;
function initBest() {
  bestSt = makeScenState(BEST_DATA);
  buildMiniBars("mbars-best", BEST_DATA);
  document.getElementById("log-best").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-best");
  addLog(log, `Array: [${BEST_DATA.join(", ")}]  — already sorted`, "log-info");
  addLog(
    log,
    `Expect 0 swaps, ${(BEST_DATA.length * (BEST_DATA.length - 1)) / 2} comparisons`,
    "log-info",
  );
  document.getElementById("best-step-btn").disabled = false;
  document.getElementById("best-auto-btn").disabled = false;
}
function bestStep() {
  if (!bestSt || bestSt.done) return;
  const r = scenStep(bestSt);
  if (!r) return;
  const log = document.getElementById("log-best");
  addLog(log, r.log.text, r.log.cls);
  renderMiniState("mbars-best", r.arr, r.i, r.minIdx, r.j, r.sorted);
  if (r.type === "done") {
    addLog(log, `✓ Best Case: O(N²) comparisons, 0 swaps`, "log-result");
    document.getElementById("best-step-btn").disabled = true;
    document.getElementById("best-auto-btn").disabled = true;
    r.arr.forEach((_, i) => {
      const b = document.getElementById("mbars-best-b" + i);
      if (b) b.className = "mbar mb-sorted";
    });
  }
}
function bestAuto() {
  document.getElementById("best-auto-btn").disabled = true;
  function tick() {
    if (!bestSt.done) {
      bestStep();
      if (!bestSt.done) bestTimer = setTimeout(tick, 600);
    }
  }
  tick();
}
function resetBest() {
  clearTimeout(bestTimer);
  initBest();
}

/* ── AVERAGE ── */
const AVG_DATA = [64, 25, 12, 22, 11];
let avgSt = null,
  avgTimer = null;
function initAvg() {
  avgSt = makeScenState(AVG_DATA);
  buildMiniBars("mbars-avg", AVG_DATA);
  document.getElementById("log-avg").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-avg");
  addLog(log, `Array: [${AVG_DATA.join(", ")}]  — random order`, "log-info");
  addLog(
    log,
    `N=${AVG_DATA.length}, expect ~${Math.ceil((AVG_DATA.length * (AVG_DATA.length - 1)) / 2)} comparisons`,
    "log-info",
  );
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}
function avgStep() {
  if (!avgSt || avgSt.done) return;
  const r = scenStep(avgSt);
  if (!r) return;
  const log = document.getElementById("log-avg");
  addLog(log, r.log.text, r.log.cls);
  renderMiniState("mbars-avg", r.arr, r.i, r.minIdx, r.j, r.sorted);
  if (r.type === "done") {
    addLog(
      log,
      `✓ Average Case: O(N²) — ${avgSt.comps} comps, ${avgSt.swaps} swaps`,
      "log-result",
    );
    document.getElementById("avg-step-btn").disabled = true;
    document.getElementById("avg-auto-btn").disabled = true;
    r.arr.forEach((_, i) => {
      const b = document.getElementById("mbars-avg-b" + i);
      if (b) b.className = "mbar mb-sorted";
    });
  }
}
function avgAuto() {
  document.getElementById("avg-auto-btn").disabled = true;
  function tick() {
    if (!avgSt.done) {
      avgStep();
      if (!avgSt.done) avgTimer = setTimeout(tick, 550);
    }
  }
  tick();
}
function resetAvg() {
  clearTimeout(avgTimer);
  initAvg();
}

/* ── WORST ── */
const WORST_DATA = [90, 70, 50, 30, 10];
let worstSt = null,
  worstTimer = null;
function initWorst() {
  worstSt = makeScenState(WORST_DATA);
  buildMiniBars("mbars-worst", WORST_DATA);
  document.getElementById("log-worst").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-worst");
  addLog(
    log,
    `Array: [${WORST_DATA.join(", ")}]  — reverse sorted`,
    "log-warn",
  );
  addLog(
    log,
    `Expect ${WORST_DATA.length - 1} swaps (maximum) → O(N²)`,
    "log-warn",
  );
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}
function worstStep() {
  if (!worstSt || worstSt.done) return;
  const r = scenStep(worstSt);
  if (!r) return;
  const log = document.getElementById("log-worst");
  addLog(log, r.log.text, r.log.cls);
  renderMiniState("mbars-worst", r.arr, r.i, r.minIdx, r.j, r.sorted);
  if (r.type === "done") {
    addLog(
      log,
      `⚠ Worst Case: O(N²) — ${worstSt.comps} comps, ${worstSt.swaps} swaps (max N-1)`,
      "log-result",
    );
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
    r.arr.forEach((_, i) => {
      const b = document.getElementById("mbars-worst-b" + i);
      if (b) b.className = "mbar mb-sorted";
    });
  }
}
function worstAuto() {
  document.getElementById("worst-auto-btn").disabled = true;
  function tick() {
    if (!worstSt.done) {
      worstStep();
      if (!worstSt.done) worstTimer = setTimeout(tick, 550);
    }
  }
  tick();
}
function resetWorst() {
  clearTimeout(worstTimer);
  initWorst();
}

/* ── CUSTOM ── */
let custSt = null,
  custTimer = null;
let ccTimerId = null;

function initCustom() {
  document.getElementById("mbars-custom").innerHTML = "";
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-custom"),
    "Enter an array and click ▶ Load & Sort.",
    "log-info",
  );
  custSt = null;
  document.getElementById("custom-step-btn").disabled = true;
  document.getElementById("custom-auto-btn").disabled = true;
  ["best", "avg", "worst"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c)
      c.classList.remove("cc-active-best", "cc-active-avg", "cc-active-worst");
  });
  document.getElementById("cc-toast").className = "cc-toast";
}
function customSearch() {
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
  custSt = makeScenState(data);
  buildMiniBars("mbars-custom", data);
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-custom"),
    `Array: [${data.join(", ")}]  N=${data.length}`,
    "log-info",
  );
  addLog(
    document.getElementById("log-custom"),
    `Expected comparisons: ${(data.length * (data.length - 1)) / 2}`,
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
  const toast = document.getElementById("cc-toast");
  document.getElementById("cc-toast-icon").textContent =
    { best: "⚡", avg: "〜", worst: "⚠", warn: "⚠" }[type] || "📊";
  document.getElementById("cc-toast-text").textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.className = "cc-toast";
  }, 2800);
}

function customStep() {
  if (!custSt || custSt.done) return;
  const r = scenStep(custSt);
  if (!r) return;
  const log = document.getElementById("log-custom");
  addLog(log, r.log.text, r.log.cls);
  renderMiniState("mbars-custom", r.arr, r.i, r.minIdx, r.j, r.sorted);
  if (r.type === "done") {
    const sw = custSt.swaps,
      n = custSt.n;
    const type = sw === 0 ? "best" : sw === n - 1 ? "worst" : "avg";
    const label =
      type === "best"
        ? `Best: 0 swaps O(N²)`
        : type === "worst"
          ? `Worst: ${sw} swaps (max N-1) O(N²)`
          : `Average: ${sw} swap(s) O(N²)`;
    addLog(log, label, "log-result");
    highlightCC(type);
    showCCToast(type, label + `  |  ${custSt.comps} comparisons`);
    document.getElementById("custom-step-btn").disabled = true;
    document.getElementById("custom-auto-btn").disabled = true;
    r.arr.forEach((_, i) => {
      const b = document.getElementById("mbars-custom-b" + i);
      if (b) b.className = "mbar mb-sorted";
    });
  }
}
function customAutoPlay() {
  document.getElementById("custom-auto-btn").disabled = true;
  function tick() {
    if (!custSt.done) {
      customStep();
      if (!custSt.done) custTimer = setTimeout(tick, 520);
    }
  }
  tick();
}
function resetCustom() {
  clearTimeout(custTimer);
  document.getElementById("custom-arr").value = "";
  initCustom();
}


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


let inputResolver = null;
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
  const implL = editorImpl === "iterative" ? "Iterative" : "Recursive";
  out.innerHTML += `<span style="color:var(--primary-cyan)">Selection Sort (${implL}) — ${langN[currentLang]}</span><br><br>`;

  const n = parseInt(await getInput("Enter number of elements: "));
  out.innerHTML += `<span style="color:#a0a0a0">Enter number of elements: </span>${n}<br>`;
  const arr = [];
  for (let i = 0; i < n; i++) {
    const v = parseInt(await getInput(`arr[${i}] = `));
    arr.push(v);
    out.innerHTML += `<span style="color:#a0a0a0">arr[${i}] = </span>${v}<br>`;
  }
  out.innerHTML += `<br><span style="color:var(--primary-cyan)">Before sorting: [${arr.join(", ")}]</span><br><br>`;

  let swaps = 0,
    comps = 0;

  if (editorImpl === "iterative") {
    for (let i = 0; i < n - 1; i++) {
      await sleep(80);
      let minIdx = i;
      out.innerHTML += `<span style="color:#8b5cf6">Pass ${i + 1}:</span> i=${i}, assume minIdx=${i} (arr[${i}]=${arr[i]})<br>`;
      for (let j = i + 1; j < n; j++) {
        comps++;
        if (arr[j] < arr[minIdx]) {
          out.innerHTML += `  <span style="color:var(--primary-orange)">arr[${j}]=${arr[j]} < arr[${minIdx}]=${arr[minIdx]} → new min</span><br>`;
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        out.innerHTML += `  <span style="color:#ec4899">↔ Swap arr[${i}] ↔ arr[${minIdx}]  →  [${arr.join(", ")}]</span><br>`;
      } else {
        out.innerHTML += `  <span style="color:var(--primary-green)">✓ No swap needed</span><br>`;
      }
    }
  } else {
    async function recSim(start, depth) {
      if (start >= n - 1) return;
      await sleep(100);
      const indent = "  ".repeat(depth);
      let minIdx = start;
      out.innerHTML += `${indent}<span style="color:#8b5cf6">Call(start=${start}):</span> minIdx=${start} arr[${start}]=${arr[start]}<br>`;
      for (let j = start + 1; j < n; j++) {
        comps++;
        if (arr[j] < arr[minIdx]) {
          out.innerHTML += `${indent}  <span style="color:var(--primary-orange)">arr[${j}]=${arr[j]} < arr[${minIdx}]=${arr[minIdx]} → minIdx=${j}</span><br>`;
          minIdx = j;
        }
      }
      if (minIdx !== start) {
        [arr[start], arr[minIdx]] = [arr[minIdx], arr[start]];
        swaps++;
        out.innerHTML += `${indent}  <span style="color:#ec4899">↔ Swap arr[${start}]↔arr[${minIdx}]  →  [${arr.join(", ")}]</span><br>`;
      } else {
        out.innerHTML += `${indent}  <span style="color:var(--primary-green)">✓ No swap</span><br>`;
      }
      out.innerHTML += `${indent}  <span style="color:var(--text-secondary)">→ recurse(start=${start + 1})</span><br>`;
      await recSim(start + 1, depth + 1);
    }
    await recSim(0, 0);
  }

  out.innerHTML += `<br><span style="color:var(--primary-green)">✅ After sorting:  [${arr.join(", ")}]</span><br>`;
  out.innerHTML += `<span style="color:var(--primary-cyan)">Comparisons: ${comps}  |  Swaps: ${swaps}  |  Space: O(1)</span>`;
}


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
    () => (window.location.href = "selection_sort_L1.html"),
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
    () => (window.location.href = "selection_sort_L2_Quiz.html"),
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

const ALGO_KEY = "selectionsort";
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
