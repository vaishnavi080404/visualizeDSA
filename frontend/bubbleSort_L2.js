const codeTemplates = {
  optimized: {
    cpp: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;           // swapped flag reset each pass

        // Inner loop shrinks by i each pass
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;         // a swap occurred
            }
        }

        // If no swap in this pass → already sorted
        if (!swapped) {
            cout << "Early exit after pass " << i + 1 << "\\n";
            break;
        }
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
    cout << endl;

    bubbleSort(arr, n);

    cout << "After:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    total_swaps = 0
    passes = 0

    for i in range(n - 1):
        swapped = False                 # reset flag each pass
        passes += 1

        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                total_swaps += 1

        if not swapped:                 # early exit
            print(f"  Early exit after pass {passes} — already sorted!")
            break

    return passes, total_swaps

# --- Input ---
n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

print(f"\\nBefore: {arr}")

passes, swaps = bubble_sort(arr)

print(f"After:  {arr}")
print(f"Passes: {passes}  |  Swaps: {swaps}")
print(f"Best case O(N) early exit used: {passes == 1 and swaps == 0}")`,
    java: `import java.util.Arrays;
import java.util.Scanner;

public class BubbleSort {

    static int[] bubbleSort(int[] arr) {
        int n = arr.length, totalSwaps = 0, passes = 0;

        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;    // reset flag each pass
            passes++;

            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;
                    swapped = true;
                    totalSwaps++;
                }
            }

            if (!swapped) {             // early exit
                System.out.println("  Early exit after pass " + passes);
                break;
            }
        }
        return new int[]{passes, totalSwaps};
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
        int[] stats = bubbleSort(arr);
        System.out.println("After:  " + Arrays.toString(arr));
        System.out.println("Passes: " + stats[0] + "  |  Swaps: " + stats[1]);
    }
}`,
    c: `#include <stdio.h>

void swap(int *a, int *b){ int t=*a; *a=*b; *b=t; }

void bubbleSort(int arr[], int n, int *passes, int *swaps) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        (*passes)++;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = 1;
                (*swaps)++;
            }
        }

        if (!swapped) {
            printf("  Early exit after pass %d\\n", *passes);
            break;
        }
    }
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

    int passes=0, swaps=0;
    bubbleSort(arr, n, &passes, &swaps);

    printf("\\nAfter:  ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\nPasses: %d  |  Swaps: %d\\n", passes, swaps);
    return 0;
}`,
    javascript: `function bubbleSort(arr) {
    const n = arr.length;
    let totalSwaps = 0, passes = 0;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;            // reset flag each pass
        passes++;

        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
                totalSwaps++;
            }
        }

        if (!swapped) {                 // early exit
            console.log(\`  Early exit after pass \${passes}!\`);
            break;
        }
    }
    return { passes, totalSwaps };
}

// --- Demo ---
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Before:", arr.join(", "));

const { passes, totalSwaps } = bubbleSort(arr);

console.log("After: ", arr.join(", "));
console.log("Passes:", passes, " | Swaps:", totalSwaps);`,
  },

  recursive: {
    cpp: `#include <iostream>
using namespace std;

void bubbleSortRec(int arr[], int n, int &swaps) {
    // Base case: one element — nothing to sort
    if (n == 1) return;

    bool swapped = false;
    // One full pass: bubble largest to arr[n-1]
    for (int j = 0; j < n - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            swap(arr[j], arr[j + 1]);
            swapped = true;
            swaps++;
        }
    }

    // If no swap → already sorted, stop recursion
    if (!swapped) return;

    // Recurse on first n-1 elements
    bubbleSortRec(arr, n - 1, swaps);
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
    cout << endl;

    int swaps = 0;
    bubbleSortRec(arr, n, swaps);

    cout << "After:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\\nRecursive depth: " << n - 1
         << "  |  Swaps: " << swaps << endl;
    return 0;
}`,
    python: `def bubble_sort_rec(arr, n=None, depth=0, swaps_ref=None):
    if n is None: n = len(arr)
    if swaps_ref is None: swaps_ref = [0]

    # Base case
    if n == 1:
        return depth, swaps_ref[0]

    swapped = False
    # One pass: bubble largest to arr[n-1]
    for j in range(n - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
            swapped = True
            swaps_ref[0] += 1

    if not swapped:
        return depth + 1, swaps_ref[0]

    # Recurse on first n-1 elements
    return bubble_sort_rec(arr, n - 1, depth + 1, swaps_ref)

# --- Input ---
n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

print(f"\\nBefore: {arr}")

depth, swaps = bubble_sort_rec(arr)

print(f"After:  {arr}")
print(f"Recursive depth: {depth}  |  Swaps: {swaps}")`,
    java: `import java.util.Arrays;
import java.util.Scanner;

public class BubbleSortRecursive {

    static int swaps = 0;

    static int bubbleSortRec(int[] arr, int n) {
        if (n == 1) return 0;

        boolean swapped = false;
        for (int j = 0; j < n - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;
                swapped = true;
                swaps++;
            }
        }

        if (!swapped) return 1;         // early base case

        return 1 + bubbleSortRec(arr, n - 1);
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
        int depth = bubbleSortRec(arr, n);
        System.out.println("After:  " + Arrays.toString(arr));
        System.out.println("Recursive depth: " + depth + "  |  Swaps: " + swaps);
    }
}`,
    c: `#include <stdio.h>

void swap(int *a, int *b){ int t=*a; *a=*b; *b=t; }
int totalSwaps = 0;

int bubbleSortRec(int arr[], int n) {
    if (n == 1) return 0;

    int swapped = 0;
    for (int j = 0; j < n - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            swap(&arr[j], &arr[j + 1]);
            swapped = 1;
            totalSwaps++;
        }
    }

    if (!swapped) return 1;

    return 1 + bubbleSortRec(arr, n - 1);
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

    int depth = bubbleSortRec(arr, n);

    printf("\\nAfter:  ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\nRecursive depth: %d  |  Swaps: %d\\n", depth, totalSwaps);
    return 0;
}`,
    javascript: `function bubbleSortRec(arr, n = arr.length, swaps = { count: 0 }, depth = 0) {
    // Base case
    if (n === 1) return { depth, swaps: swaps.count };

    let swapped = false;
    // One pass: bubble largest element to arr[n-1]
    for (let j = 0; j < n - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            swapped = true;
            swaps.count++;
        }
    }

    if (!swapped) return { depth: depth + 1, swaps: swaps.count };

    // Recurse on first n-1 elements
    return bubbleSortRec(arr, n - 1, swaps, depth + 1);
}

// --- Demo ---
const arr = [64, 34, 25, 12, 22, 11];
console.log("Before:", arr.join(", "));

const { depth, swaps } = bubbleSortRec(arr);

console.log("After: ", arr.join(", "));
console.log("Recursive depth:", depth, " | Swaps:", swaps);`,
  },
};

/* ══════════════════════════════════════════════════════════
   GLOBALS
══════════════════════════════════════════════════════════ */
let codeEditor;
let currentLang = "cpp";
let editorImpl = "optimized";
let currentImpl = "optimized";

let mainArr = [];
let mainSteps = [];
let mainStepIdx = 0;
let mainDone = false;
let mainTimer = null;
let mainComps = 0;
let mainSwaps = 0;
let mainSorted = 0;
let mainPasses = 0;

let inputResolver = null;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ══════════════════════════════════════════════════════════
   STEP PRE-COMPUTATION
   Step types: outer, flag-reset, compare, swap, noswap,
               flag-check-early, flag-check-continue,
               pass-end, done
══════════════════════════════════════════════════════════ */
function computeSteps(input) {
  const arr = [...input],
    n = arr.length;
  const steps = [];

  if (currentImpl === "optimized") {
    for (let i = 0; i < n - 1; i++) {
      // Outer pass start
      steps.push({
        type: "outer",
        i,
        j: -1,
        sortedFrom: n - i,
        arr: [...arr],
        swapped: false,
        caption: `Pass ${i + 1}: outer loop i=${i}. Bubble largest unsorted to position ${n - i - 1}.`,
        pseudo: "op-outer",
      });
      steps.push({
        type: "flag-reset",
        i,
        j: -1,
        sortedFrom: n - i,
        arr: [...arr],
        swapped: false,
        caption: `Pass ${i + 1}: swapped = false — reset flag before scanning.`,
        pseudo: "op-flag",
      });

      let swappedThisPass = false;
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          type: "compare",
          i,
          j,
          sortedFrom: n - i,
          arr: [...arr],
          swapped: swappedThisPass,
          caption: `Compare arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]} — ${arr[j] > arr[j + 1] ? "arr[j] > arr[j+1] → SWAP" : "arr[j] ≤ arr[j+1] → no swap"}.`,
          pseudo: "op-compare",
        });
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swappedThisPass = true;
          steps.push({
            type: "swap",
            i,
            j,
            sortedFrom: n - i,
            arr: [...arr],
            swapped: true,
            caption: `Swapped arr[${j}] ↔ arr[${j + 1}] — larger element bubbles right. swapped=true.`,
            pseudo: "op-swap",
          });
        }
      }

      // after inner loop
      if (!swappedThisPass) {
        steps.push({
          type: "early-exit",
          i,
          j: -1,
          sortedFrom: n,
          arr: [...arr],
          swapped: false,
          caption: `⚡ swapped=false after pass ${i + 1} — no swaps occurred → array already sorted! Early exit O(N).`,
          pseudo: "op-flagcheck",
        });
        break;
      } else {
        steps.push({
          type: "pass-end",
          i,
          j: -1,
          sortedFrom: n - i,
          arr: [...arr],
          swapped: true,
          caption: `End of pass ${i + 1}: arr[${n - i - 1}]=${arr[n - i - 1]} is now in its final position (sorted).`,
          pseudo: "op-flagcheck",
        });
      }
    }
  } else {
    // Recursive
    let depth = 0;
    let size = n;
    while (size > 1) {
      steps.push({
        type: "outer",
        i: n - size,
        j: -1,
        sortedFrom: n - size + 1,
        arr: [...arr],
        swapped: false,
        caption: `Call(n=${size}): bubble pass — largest of first ${size} elements bubbles to index ${size - 1}.`,
        pseudo: "re-pass",
      });

      let swappedPass = false;
      for (let j = 0; j < size - 1; j++) {
        steps.push({
          type: "compare",
          i: n - size,
          j,
          sortedFrom: n - size + 1,
          arr: [...arr],
          swapped: swappedPass,
          caption: `Compare arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]} — ${arr[j] > arr[j + 1] ? "SWAP" : "no swap"}.`,
          pseudo: "re-compare",
        });
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swappedPass = true;
          steps.push({
            type: "swap",
            i: n - size,
            j,
            sortedFrom: n - size + 1,
            arr: [...arr],
            swapped: true,
            caption: `Swapped arr[${j}] ↔ arr[${j + 1}]. Larger element bubbles right.`,
            pseudo: "re-swap",
          });
        }
      }

      if (!swappedPass) {
        steps.push({
          type: "early-exit",
          i: n - size,
          j: -1,
          sortedFrom: n,
          arr: [...arr],
          swapped: false,
          caption: `No swaps in this pass → already sorted! Recursion stops early.`,
          pseudo: "re-base",
        });
        break;
      }

      steps.push({
        type: "recurse",
        i: n - size,
        j: -1,
        sortedFrom: n - size + 1,
        arr: [...arr],
        swapped: true,
        caption: `arr[${size - 1}]=${arr[size - 1]} placed. Now recurse: bubbleSort(arr, n=${size - 1}).`,
        pseudo: "re-recurse",
      });
      depth++;
      size--;
    }
  }

  // Done step
  steps.push({
    type: "done",
    i: -1,
    j: -1,
    sortedFrom: arr.length,
    arr: [...arr],
    swapped: false,
    caption: `✅ Array fully sorted: [${arr.join(", ")}]`,
    pseudo: currentImpl === "optimized" ? "op-done" : "re-done",
  });
  return steps;
}

/*
   MAIN VISUALIZER — RENDER BARS
 */
function renderBars(arr, state) {
  const area = document.getElementById("barsArea");
  area.innerHTML = "";
  const maxV = Math.max(...arr);
  arr.forEach((v, i) => {
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";
    wrap.style.position = "relative";

    const bar = document.createElement("div");
    bar.className = "bar " + getBarClass(i, state, arr.length);
    bar.style.height = Math.max(18, Math.round((v / maxV) * 180)) + "px";
    bar.textContent = v;

    const idx = document.createElement("div");
    idx.className = "bar-idx";
    idx.textContent = i;

    wrap.appendChild(bar);
    wrap.appendChild(idx);
    area.appendChild(wrap);
  });

  // Update swapped flag badge
  if (state && currentImpl === "optimized") {
    const badge = document.getElementById("badge-flag");
    badge.style.display = "inline-flex";
    const dot = document.getElementById("flagDot");
    const val = document.getElementById("flagVal");
    const sw = state.swapped;
    dot.className = "flag-dot " + (sw ? "flag-true" : "flag-false");
    val.textContent = sw ? "true" : "false";
    val.style.color = sw ? "var(--primary-green)" : "var(--primary-red)";
  } else {
    document.getElementById("badge-flag").style.display = "none";
  }
}

function getBarClass(idx, state, n) {
  if (!state) return "bar-default";
  if (idx >= state.sortedFrom) return "bar-sorted";
  if (state.type === "done" || state.type === "early-exit") return "bar-sorted";
  if (state.type === "swap" && (idx === state.j || idx === state.j + 1))
    return "bar-swapping";
  if (state.type === "compare" && (idx === state.j || idx === state.j + 1))
    return "bar-comparing";
  if (state.type === "pass-end" && idx === state.sortedFrom - 1)
    return "bar-pass-boundary";
  return "bar-default";
}

function updateBadges(state) {
  document.getElementById("badge-pass").textContent =
    `Pass: ${mainPasses} / ${mainArr.length - 1}`;
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

/* 
   MAIN SORT CONTROLS
 */
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
  mainPasses = 0;
  renderBars(mainArr, null);
  updateBadges(null);
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
  if (step.type === "outer") mainPasses++;
  mainSorted = step.sortedFrom;

  renderBars(step.arr, step);
  setCaption(
    step.caption,
    step.type === "swap"
      ? "swap"
      : step.type === "early-exit"
        ? "early"
        : step.type === "done"
          ? "done"
          : "",
  );
  highlightStep(step.pseudo);
  updateBadges(step);

  if (step.type === "done" || step.type === "early-exit") {
    if (step.type === "done") {
      mainDone = true;
      showMsg(
        `<i class="fas fa-check"></i> Sorted! Passes: ${mainPasses} | Comparisons: ${mainComps} | Swaps: ${mainSwaps}`,
        "success",
      );
      document.getElementById("stepBtn").disabled = true;
      document.getElementById("autoBtn").disabled = true;
    }
    if (step.type === "early-exit") {
      // let done step follow
    }
    return step.type !== "early-exit";
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
    if (cont && !mainDone) mainTimer = setTimeout(tick, 480);
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
  mainPasses = 0;
  document.getElementById("barsArea").innerHTML = "";
  setCaption("Enter an array and click Sort to begin.");
  document.getElementById("msg_show").style.display = "none";
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("autoBtn").disabled = true;
  document.getElementById("badge-flag").style.display = "none";
  updateBadges(null);
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}

/* 
   IMPLEMENTATION SWITCH
 */
function switchImplementation(type) {
  currentImpl = type;
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  document.getElementById("visualizer-title").textContent =
    "Bubble Sort Visualizer — " +
    (type === "optimized" ? "Optimized (Swapped Flag)" : "Recursive");
  document.getElementById("pseudo-optimized").style.display =
    type === "optimized" ? "block" : "none";
  document.getElementById("pseudo-recursive").style.display =
    type === "recursive" ? "block" : "none";
  resetSort();
}

/* SCENARIO HELPERS — mini bars*/
function buildMiniBars(cid, data) {
  const area = document.getElementById(cid);
  area.innerHTML = "";
  const mx = Math.max(...data);
  data.forEach((v, i) => {
    const w = document.createElement("div");
    w.className = "mbar-wrap";
    const b = document.createElement("div");
    b.className = "mbar mb-default";
    b.id = cid + "-b" + i;
    b.style.height = Math.max(12, Math.round((v / mx) * 100)) + "px";
    b.textContent = v;
    const l = document.createElement("div");
    l.className = "mbar-idx";
    l.textContent = i;
    w.appendChild(b);
    w.appendChild(l);
    area.appendChild(w);
  });
}

function renderMiniScene(cid, data, j, sortedFrom, type) {
  data.forEach((_, i) => {
    const b = document.getElementById(cid + "-b" + i);
    if (!b) return;
    if (i >= sortedFrom) {
      b.className = "mbar mb-sorted";
      return;
    }
    if (type === "swap" && (i === j || i === j + 1)) {
      b.className = "mbar mb-swapping";
      return;
    }
    if (type === "compare" && (i === j || i === j + 1)) {
      b.className = "mbar mb-comparing";
      return;
    }
    if (type === "pass-end" && i === sortedFrom - 1) {
      b.className = "mbar mb-boundary";
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


function makeScenState(data) {
  return {
    arr: [...data],
    n: data.length,
    i: 0,
    j: 0,
    sortedFrom: data.length,
    comps: 0,
    swaps: 0,
    passes: 0,
    swappedFlag: false,
    phase: "outer",
    done: false,
  };
}

function scenStep(st) {
  if (st.done) return null;
  const { arr, n } = st;

  if (st.phase === "outer") {
    if (st.i >= n - 1) {
      st.done = true;
      return {
        type: "done",
        j: -1,
        sortedFrom: n,
        arr: [...arr],
        log: {
          text: `✓ Sorted! Passes:${st.passes} Comps:${st.comps} Swaps:${st.swaps}`,
          cls: "log-sorted",
        },
      };
    }
    st.swappedFlag = false;
    st.j = 0;
    st.passes++;
    st.phase = "inner";
    return {
      type: "outer",
      j: -1,
      sortedFrom: n - st.i,
      arr: [...arr],
      log: {
        text: `Pass ${st.passes}: i=${st.i}, swapped=false, scan 0…${n - st.i - 2}`,
        cls: "log-pass",
      },
    };
  }
  if (st.phase === "inner") {
    if (st.j < n - st.i - 1) {
      st.comps++;
      const isSwap = arr[st.j] > arr[st.j + 1];
      const jj = st.j;
      if (isSwap) {
        [arr[st.j], arr[st.j + 1]] = [arr[st.j + 1], arr[st.j]];
        st.swaps++;
        st.swappedFlag = true;
      }
      const r = {
        type: isSwap ? "swap" : "compare",
        j: jj,
        sortedFrom: n - st.i,
        arr: [...arr],
        log: {
          text: `  arr[${jj}]=${arr[jj + isSwap ? -1 : 0]}→arr[${jj + 1}]=${arr[jj + isSwap ? 0 : 1]} ${isSwap ? "↔ swap" : "no swap"}`,
          cls: isSwap ? "log-swap" : "log-compare",
        },
      };
      // repair log text
      if (isSwap)
        r.log.text = `  arr[${jj}]↔arr[${jj + 1}] swapped → [${arr.slice(0, n - st.i).join(",")}]`;
      else
        r.log.text = `  arr[${jj}]=${arr[jj]} ≤ arr[${jj + 1}]=${arr[jj + 1]} — no swap`;
      st.j++;
      return r;
    }
    // end of inner
    st.phase = "outer";
    if (!st.swappedFlag) {
      st.done = true;
      return {
        type: "early-exit",
        j: -1,
        sortedFrom: n,
        arr: [...arr],
        log: {
          text: `⚡ swapped=false → early exit! Comps:${st.comps} Swaps:${st.swaps}`,
          cls: "log-early",
        },
      };
    }
    const ef = st.i;
    st.i++;
    return {
      type: "pass-end",
      j: -1,
      sortedFrom: n - ef,
      arr: [...arr],
      log: {
        text: `  arr[${n - ef - 1}]=${arr[n - ef - 1]} placed. End of pass ${st.passes}.`,
        cls: "log-sorted",
      },
    };
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
  addLog(log, `Array: [${BEST_DATA.join(", ")}] — already sorted`, "log-info");
  addLog(log, `Expect: 1 pass, 0 swaps → early exit O(N)`, "log-info");
  document.getElementById("best-step-btn").disabled = false;
  document.getElementById("best-auto-btn").disabled = false;
}
function bestStep() {
  if (!bestSt || bestSt.done) return;
  const r = scenStep(bestSt);
  if (!r) return;
  addLog(document.getElementById("log-best"), r.log.text, r.log.cls);
  renderMiniScene("mbars-best", r.arr, r.j, r.sortedFrom, r.type);
  if (r.type === "early-exit" || r.type === "done") {
    if (r.type === "early-exit")
      addLog(
        document.getElementById("log-best"),
        `✓ Best Case: O(N) — swapped flag triggered`,
        `log-result`,
      );
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
const AVG_DATA = [64, 34, 25, 12, 22, 11];
let avgSt = null,
  avgTimer = null;
function initAvg() {
  avgSt = makeScenState(AVG_DATA);
  buildMiniBars("mbars-avg", AVG_DATA);
  document.getElementById("log-avg").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-avg");
  addLog(log, `Array: [${AVG_DATA.join(", ")}] — random order`, "log-info");
  addLog(log, `Expect: multiple passes with swaps — O(N²)`, "log-info");
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}
function avgStep() {
  if (!avgSt || avgSt.done) return;
  const r = scenStep(avgSt);
  if (!r) return;
  addLog(document.getElementById("log-avg"), r.log.text, r.log.cls);
  renderMiniScene("mbars-avg", r.arr, r.j, r.sortedFrom, r.type);
  if (r.type === "early-exit" || r.type === "done") {
    addLog(
      document.getElementById("log-avg"),
      `✓ Avg O(N²) — ${avgSt.passes} passes, ${avgSt.swaps} swaps`,
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
      if (!avgSt.done) avgTimer = setTimeout(tick, 540);
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
  addLog(log, `Array: [${WORST_DATA.join(", ")}] — reverse sorted`, "log-warn");
  addLog(
    log,
    `Expect: ${WORST_DATA.length - 1} passes, max swaps — O(N²)`,
    "log-warn",
  );
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}
function worstStep() {
  if (!worstSt || worstSt.done) return;
  const r = scenStep(worstSt);
  if (!r) return;
  addLog(document.getElementById("log-worst"), r.log.text, r.log.cls);
  renderMiniScene("mbars-worst", r.arr, r.j, r.sortedFrom, r.type);
  if (r.type === "early-exit" || r.type === "done") {
    addLog(
      document.getElementById("log-worst"),
      `⚠ Worst O(N²) — ${worstSt.passes} passes, ${worstSt.swaps} swaps (max)`,
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
      if (!worstSt.done) worstTimer = setTimeout(tick, 520);
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
  custTimer = null,
  ccTimerId = null;
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
  custSt = makeScenState(data);
  buildMiniBars("mbars-custom", data);
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    document.getElementById("log-custom"),
    `Array: [${data.join(", ")}]  N=${data.length}`,
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
  addLog(document.getElementById("log-custom"), r.log.text, r.log.cls);
  renderMiniScene("mbars-custom", r.arr, r.j, r.sortedFrom, r.type);
  if (r.type === "early-exit" || r.type === "done") {
    const sw = custSt.swaps,
      p = custSt.passes,
      n = custSt.n;
    let type = "avg";
    if (p === 1 && sw === 0) type = "best";
    else if (sw === (n * (n - 1)) / 2) type = "worst";
    const labels = {
      best: `Best O(N) — early exit after 1 pass!`,
      avg: `Average O(N²) — ${p} passes, ${sw} swaps`,
      worst: `Worst O(N²) — ${p} passes, ${sw} swaps (max)`,
    };
    addLog(document.getElementById("log-custom"), labels[type], "log-result");
    highlightCC(type);
    showCCToast(type, labels[type]);
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
      if (!custSt.done) custTimer = setTimeout(tick, 510);
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
  codeEditor.setValue(codeTemplates.optimized.cpp);
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
  const implLabel =
    editorImpl === "optimized" ? "Optimized (Swapped Flag)" : "Recursive";
  codeEditor.setOption("mode", modeMap[currentLang]);
  codeEditor.setValue(codeTemplates[editorImpl][currentLang]);
  document.querySelector(".lang-display").textContent =
    nameMap[currentLang] + " — " + implLabel;
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

/* interactive runner */
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
  const implL =
    editorImpl === "optimized" ? "Optimized (Swapped Flag)" : "Recursive";
  out.innerHTML += `<span style="color:var(--primary-cyan)">Bubble Sort (${implL}) — ${langN[currentLang]}</span><br><br>`;

  const n = parseInt(await getInput("Enter number of elements: "));
  out.innerHTML += `<span style="color:#a0a0a0">Enter number of elements: </span>${n}<br>`;
  const arr = [];
  for (let i = 0; i < n; i++) {
    const v = parseInt(await getInput(`arr[${i}] = `));
    arr.push(v);
    out.innerHTML += `<span style="color:#a0a0a0">arr[${i}] = </span>${v}<br>`;
  }
  out.innerHTML += `<br><span style="color:var(--primary-cyan)">Before: [${arr.join(", ")}]</span><br><br>`;

  let totalSwaps = 0,
    totalComps = 0,
    passes = 0;

  if (editorImpl === "optimized") {
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      passes++;
      out.innerHTML += `<span style="color:#8b5cf6">Pass ${passes}:</span>  swapped=false<br>`;
      for (let j = 0; j < n - i - 1; j++) {
        totalComps++;
        if (arr[j] > arr[j + 1]) {
          out.innerHTML += `  <span style="color:var(--primary-orange)">arr[${j}]=${arr[j]} > arr[${j + 1}]=${arr[j + 1]}</span> <span style="color:#ec4899">↔ swap → [${[...arr.slice(0, j), arr[j + 1], arr[j], ...arr.slice(j + 2)].join(",")}]</span><br>`;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          totalSwaps++;
        } else {
          out.innerHTML += `  <span style="color:var(--text-secondary)">arr[${j}]=${arr[j]} ≤ arr[${j + 1}]=${arr[j + 1]}  no swap</span><br>`;
        }
        await sleep(60);
      }
      if (!swapped) {
        out.innerHTML += `  <span style="color:var(--primary-green)">⚡ swapped=false → early exit!</span><br>`;
        break;
      }
      out.innerHTML += `  <span style="color:var(--primary-green)">arr[${n - i - 1}]=${arr[n - i - 1]} placed. Array: [${arr.join(", ")}]</span><br>`;
    }
  } else {
    // Recursive simulation
    async function recSim(size, depth) {
      if (size === 1) return;
      const indent = "  ".repeat(depth);
      out.innerHTML += `${indent}<span style="color:#8b5cf6">Call(n=${size}):</span><br>`;
      passes++;
      let swapped = false;
      for (let j = 0; j < size - 1; j++) {
        totalComps++;
        if (arr[j] > arr[j + 1]) {
          out.innerHTML += `${indent}  <span style="color:var(--primary-orange)">arr[${j}]=${arr[j]} > arr[${j + 1}]=${arr[j + 1]}</span> <span style="color:#ec4899">↔ swap</span><br>`;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          totalSwaps++;
        }
        await sleep(60);
      }
      out.innerHTML += `${indent}  <span style="color:var(--primary-green)">arr[${size - 1}]=${arr[size - 1]} placed. [${arr.slice(0, size).join(",")}]</span><br>`;
      if (!swapped) {
        out.innerHTML += `${indent}  <span style="color:var(--primary-green)">No swaps → early stop</span><br>`;
        return;
      }
      out.innerHTML += `${indent}  <span style="color:var(--text-secondary)">→ recurse(n=${size - 1})</span><br>`;
      await recSim(size - 1, depth + 1);
    }
    await recSim(n, 0);
  }

  out.innerHTML += `<br><span style="color:var(--primary-green)">✅ After:  [${arr.join(", ")}]</span><br>`;
  out.innerHTML += `<span style="color:var(--primary-cyan)">Passes: ${passes}  |  Comparisons: ${totalComps}  |  Swaps: ${totalSwaps}  |  Space: O(1)</span>`;
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
    () => (window.location.href = "bubble_sort_L1.html"),
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
    () => (window.location.href = "bubble_sort_L2_Quiz.html"),
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

const ALGO_KEY = "bubblesort"; 
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
