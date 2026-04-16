const CODE = {
  lomuto: {
    cpp: `#include <iostream>
using namespace std;

// Lomuto partition: pivot = arr[high] (last element)
int partition(int arr[], int low, int high) {
    int pivot = arr[high];   // last element is pivot
    int i = low - 1;         // boundary of "smaller" region

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);  // grow smaller region
        }
    }
    swap(arr[i + 1], arr[high]);   // place pivot in final position
    return i + 1;                  // return pivot index
}

void quickSort(int arr[], int low, int high) {
    if (low >= high) return;       // base case: 0 or 1 element
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);   // sort left sub-array
    quickSort(arr, pi + 1, high);  // sort right sub-array
}

int main() {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << "Before: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    quickSort(arr, 0, n - 1);
    cout << "\\nAfter:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
    python: `def partition(arr, low, high):
    pivot = arr[high]    # last element is pivot
    i = low - 1          # boundary of "smaller" region

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]   # grow smaller region

    arr[i + 1], arr[high] = arr[high], arr[i + 1]  # place pivot
    return i + 1                                    # pivot index


def quick_sort(arr, low=None, high=None):
    if low is None:  low  = 0
    if high is None: high = len(arr) - 1
    if low >= high: return             # base case
    pi = partition(arr, low, high)
    quick_sort(arr, low, pi - 1)       # sort left
    quick_sort(arr, pi + 1, high)      # sort right


# --- Demo ---
arr = [10, 80, 30, 90, 40, 50, 70]
print(f"Before: {arr}")
quick_sort(arr)
print(f"After:  {arr}")`,
    java: `import java.util.Arrays;

public class QuickSortLomuto {

    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
            }
        }
        int tmp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = tmp;
        return i + 1;
    }

    static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }

    public static void main(String[] args) {
        int[] arr = {10, 80, 30, 90, 40, 50, 70};
        System.out.println("Before: " + Arrays.toString(arr));
        quickSort(arr, 0, arr.length - 1);
        System.out.println("After:  " + Arrays.toString(arr));
    }
}`,
    c: `#include <stdio.h>
void swap(int *a, int *b){ int t=*a; *a=*b; *b=t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++)
        if (arr[j] <= pivot) { i++; swap(&arr[i], &arr[j]); }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low >= high) return;
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
}

int main() {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr)/sizeof(arr[0]);
    printf("Before: "); for (int i=0;i<n;i++) printf("%d ",arr[i]);
    quickSort(arr, 0, n - 1);
    printf("\\nAfter:  "); for (int i=0;i<n;i++) printf("%d ",arr[i]);
    printf("\\n"); return 0;
}`,
    javascript: `function partition(arr, low, high) {
    const pivot = arr[high];   // last element is pivot
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return;
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
}

// Demo
const arr = [10, 80, 30, 90, 40, 50, 70];
console.log("Before:", arr.join(", "));
quickSort(arr);
console.log("After: ", arr.join(", "));`,
  },
  hoare: {
    cpp: `#include <iostream>
using namespace std;

// Hoare partition: pivot = arr[low] (first element)
int partition(int arr[], int low, int high) {
    int pivot = arr[low];
    int i = low - 1;
    int j = high + 1;
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        swap(arr[i], arr[j]);
    }
}

void quickSort(int arr[], int low, int high) {
    if (low >= high) return;
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi);
    quickSort(arr, pi + 1, high);
}

int main() {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << "Before: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    quickSort(arr, 0, n - 1);
    cout << "\\nAfter:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
    python: `def partition(arr, low, high):
    pivot = arr[low]     # first element is pivot
    i = low - 1
    j = high + 1
    while True:
        i += 1
        while arr[i] < pivot:
            i += 1
        j -= 1
        while arr[j] > pivot:
            j -= 1
        if i >= j:
            return j
        arr[i], arr[j] = arr[j], arr[i]


def quick_sort(arr, low=None, high=None):
    if low is None:  low  = 0
    if high is None: high = len(arr) - 1
    if low >= high: return
    pi = partition(arr, low, high)
    quick_sort(arr, low, pi)
    quick_sort(arr, pi + 1, high)


# Demo
arr = [10, 80, 30, 90, 40, 50, 70]
print(f"Before: {arr}")
quick_sort(arr)
print(f"After:  {arr}")`,
    java: `import java.util.Arrays;

public class QuickSortHoare {

    static int partition(int[] arr, int low, int high) {
        int pivot = arr[low];
        int i = low - 1, j = high + 1;
        while (true) {
            do { i++; } while (arr[i] < pivot);
            do { j--; } while (arr[j] > pivot);
            if (i >= j) return j;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }

    static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi);
        quickSort(arr, pi + 1, high);
    }

    public static void main(String[] args) {
        int[] arr = {10, 80, 30, 90, 40, 50, 70};
        System.out.println("Before: " + Arrays.toString(arr));
        quickSort(arr, 0, arr.length - 1);
        System.out.println("After:  " + Arrays.toString(arr));
    }
}`,
    c: `#include <stdio.h>
void swap(int *a, int *b){ int t=*a; *a=*b; *b=t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[low], i = low - 1, j = high + 1;
    while (1) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        swap(&arr[i], &arr[j]);
    }
}

void quickSort(int arr[], int low, int high) {
    if (low >= high) return;
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi);
    quickSort(arr, pi + 1, high);
}

int main() {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr)/sizeof(arr[0]);
    printf("Before: "); for (int i=0;i<n;i++) printf("%d ",arr[i]);
    quickSort(arr, 0, n - 1);
    printf("\\nAfter:  "); for (int i=0;i<n;i++) printf("%d ",arr[i]);
    printf("\\n"); return 0;
}`,
    javascript: `function partition(arr, low, high) {
    const pivot = arr[low];    // first element is pivot
    let i = low - 1;
    let j = high + 1;
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return;
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi);
    quickSort(arr, pi + 1, high);
}

// Demo
const arr = [10, 80, 30, 90, 40, 50, 70];
console.log("Before:", arr.join(", "));
quickSort(arr);
console.log("After: ", arr.join(", "));`,
  },
};


const themes = ["dark", "light", "blue"];
let themeIdx = 0;
document.getElementById("themeToggle").addEventListener("click", () => {
  themeIdx = (themeIdx + 1) % themes.length;
  document.body.setAttribute("data-theme", themes[themeIdx]);
  if (codeEditor) codeEditor.setOption("theme", getCMTheme(themes[themeIdx]));
});


let mainArr = [],
  mainSteps = [],
  mainIdx = 0,
  mainDone = false,
  mainTimer = null;
let mComps = 0,
  mSwaps = 0,
  mParts = 0,
  mSorted = 0;
let currentImpl = "lomuto";


function computeSteps(input, scheme) {
  const arr = [...input],
    steps = [],
    sorted = new Set();

  function lo(a, low, high) {
    if (low >= high) {
      if (low === high) sorted.add(low);
      return;
    }
    const pv = a[high];
    steps.push({
      t: "ps",
      low,
      high,
      pi: high,
      pv,
      arr: [...a],
      sorted: new Set(sorted),
      cap: `PARTITION [${low}..${high}]: pivot = arr[${high}] = ${pv}  (last element)`,
      ps: "lo-pivot",
    });
    steps.push({
      t: "ii",
      low,
      high,
      pi: high,
      pv,
      i: low - 1,
      arr: [...a],
      sorted: new Set(sorted),
      cap: `INIT: i = ${low - 1} (grows as we find elements <= pivot)`,
      ps: "lo-iinit",
    });
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        t: "cmp",
        low,
        high,
        pi: high,
        pv,
        i,
        j,
        arr: [...a],
        sorted: new Set(sorted),
        cap: `COMPARE: arr[${j}]=${a[j]} ${a[j] <= pv ? "<=" : ">"} pivot(${pv}) → ${a[j] <= pv ? "i++ & swap" : "skip"}`,
        ps: "lo-compare",
      });
      if (a[j] <= pv) {
        i++;
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({
            t: "sij",
            low,
            high,
            pi: high,
            pv,
            i,
            j,
            arr: [...a],
            sorted: new Set(sorted),
            cap: `SWAP: arr[${i}]=${a[i]} ↔ arr[${j}]=${a[j]}  (i advanced to ${i})`,
            ps: "lo-swap-ij",
          });
        } else {
          steps.push({
            t: "iadv",
            low,
            high,
            pi: high,
            pv,
            i,
            j,
            arr: [...a],
            sorted: new Set(sorted),
            cap: `i advanced to ${i} — arr[${j}]=${a[j]} <= pivot, same position`,
            ps: "lo-swap-ij",
          });
        }
      }
    }
    const pf = i + 1;
    [a[pf], a[high]] = [a[high], a[pf]];
    sorted.add(pf);
    steps.push({
      t: "place",
      low,
      high,
      pi: pf,
      pv,
      i,
      arr: [...a],
      sorted: new Set(sorted),
      cap: `PLACE PIVOT: arr[${pf}] = ${pv}  ← pivot is now in its final sorted position!`,
      ps: "lo-place",
    });
    steps.push({
      t: "rec",
      low,
      high,
      pi: pf,
      arr: [...a],
      sorted: new Set(sorted),
      cap: `RECURSE: sort left [${low}..${pf - 1}] and right [${pf + 1}..${high}]`,
      ps: "lo-recurse",
    });
    lo(a, low, pf - 1);
    lo(a, pf + 1, high);
  }

  function ho(a, low, high) {
    if (low >= high) {
      if (low === high) sorted.add(low);
      return;
    }
    const pv = a[low];
    steps.push({
      t: "ps",
      low,
      high,
      pi: low,
      pv,
      arr: [...a],
      sorted: new Set(sorted),
      cap: `PARTITION [${low}..${high}]: pivot = arr[${low}] = ${pv}  (first element)`,
      ps: "ho-pivot",
    });
    steps.push({
      t: "ii",
      low,
      high,
      pi: low,
      pv,
      i: low - 1,
      j: high + 1,
      arr: [...a],
      sorted: new Set(sorted),
      cap: `INIT: i=${low - 1} (left boundary), j=${high + 1} (right boundary) — two-pointer approach`,
      ps: "ho-init",
    });
    let i = low - 1,
      j = high + 1;
    while (true) {
      do {
        i++;
      } while (a[i] < pv);
      steps.push({
        t: "ai",
        low,
        high,
        pi: low,
        pv,
        i,
        j,
        arr: [...a],
        sorted: new Set(sorted),
        cap: `ADVANCE i: i=${i} — arr[${i}]=${a[i]} >= pivot(${pv})  (found element >= pivot)`,
        ps: "ho-advance-i",
      });
      do {
        j--;
      } while (a[j] > pv);
      steps.push({
        t: "aj",
        low,
        high,
        pi: low,
        pv,
        i,
        j,
        arr: [...a],
        sorted: new Set(sorted),
        cap: `ADVANCE j: j=${j} — arr[${j}]=${a[j]} <= pivot(${pv})  (found element <= pivot)`,
        ps: "ho-advance-j",
      });
      if (i >= j) {
        steps.push({
          t: "cross",
          low,
          high,
          pi: j,
          pv,
          i,
          j,
          arr: [...a],
          sorted: new Set(sorted),
          cap: `POINTERS CROSSED: i(${i}) >= j(${j}) — partition boundary at j=${j}`,
          ps: "ho-check",
        });
        steps.push({
          t: "rec",
          low,
          high,
          pi: j,
          arr: [...a],
          sorted: new Set(sorted),
          cap: `RECURSE: sort [${low}..${j}] and [${j + 1}..${high}]`,
          ps: "ho-recurse",
        });
        ho(a, low, j);
        ho(a, j + 1, high);
        return;
      }
      [a[i], a[j]] = [a[j], a[i]];
      steps.push({
        t: "sij",
        low,
        high,
        pi: low,
        pv,
        i,
        j,
        arr: [...a],
        sorted: new Set(sorted),
        cap: `SWAP: arr[${i}]=${a[i]} ↔ arr[${j}]=${a[j]}  (moving to correct sides)`,
        ps: "ho-swap",
      });
    }
  }

  if (scheme === "lomuto") lo(arr, 0, arr.length - 1);
  else ho(arr, 0, arr.length - 1);

  arr.forEach((_, k) => sorted.add(k));
  steps.push({
    t: "done",
    arr: [...arr],
    sorted: new Set(sorted),
    cap: `✅ Array fully sorted: [${arr.join(", ")}]`,
    ps: scheme === "lomuto" ? "lo-done" : "ho-done",
  });
  return steps;
}

function buildStrip(arr) {
  ["arrStrip", "ptrStrip", "idxStrip", "rangeRow"].forEach(
    (id) => (document.getElementById(id).innerHTML = ""),
  );
  const n = arr.length;
  arr.forEach((v, i) => {
    // Pointer row
    const pw = document.createElement("div");
    pw.className = "arr-cell-wrap";
    const pt = document.createElement("div");
    pt.className = "arr-ptr";
    pt.id = "mp-" + i;
    pw.appendChild(pt);
    document.getElementById("ptrStrip").appendChild(pw);
    // Cell row
    const cw = document.createElement("div");
    cw.className = "arr-cell-wrap";
    const c = document.createElement("div");
    c.className = "arr-cell ac-default";
    c.id = "mc-" + i;
    c.textContent = v;
    if (i === 0) c.style.borderRadius = "8px 0 0 8px";
    if (i === n - 1) c.style.borderRadius = "0 8px 8px 0";
    cw.appendChild(c);
    document.getElementById("arrStrip").appendChild(cw);
    // Index row
    const iw = document.createElement("div");
    iw.className = "arr-cell-wrap";
    const ix = document.createElement("div");
    ix.className = "arr-ptr";
    ix.style.color = "var(--text-secondary)";
    ix.textContent = i;
    iw.appendChild(ix);
    document.getElementById("idxStrip").appendChild(iw);
    // Range row
    const rc = document.createElement("div");
    rc.className = "range-cell";
    rc.id = "rr-" + i;
    document.getElementById("rangeRow").appendChild(rc);
  });
}

function applyStep(step) {
  const arr = step.arr,
    n = arr.length;
  arr.forEach((v, i) => {
    const c = document.getElementById("mc-" + i);
    if (c) c.textContent = v;
  });
  // Reset all
  arr.forEach((_, i) => {
    const c = document.getElementById("mc-" + i),
      p = document.getElementById("mp-" + i),
      r = document.getElementById("rr-" + i);
    if (!c || !p || !r) return;
    if (step.sorted && step.sorted.has(i)) {
      c.className = "arr-cell ac-sorted";
      p.textContent = "";
      p.className = "arr-ptr ptr-sorted";
      r.className = "range-cell rc-sorted";
    } else {
      c.className = "arr-cell ac-default";
      p.textContent = "";
      p.className = "arr-ptr";
      r.className = "range-cell";
    }
  });
  if (step.t === "done") {
    arr.forEach((_, i) => {
      const c = document.getElementById("mc-" + i);
      if (c) c.className = "arr-cell ac-sorted";
    });
    return;
  }
  // Active range highlight
  if (step.low !== undefined && step.high !== undefined) {
    for (let x = step.low; x <= step.high; x++) {
      const r = document.getElementById("rr-" + x);
      if (r && r.className === "range-cell")
        r.className = "range-cell rc-active";
    }
  }
  function setCell(idx, cls, ptext, pcls) {
    const c = document.getElementById("mc-" + idx),
      p = document.getElementById("mp-" + idx);
    if (!c || !p) return;
    if (step.sorted && step.sorted.has(idx)) return;
    c.className = "arr-cell " + cls;
    p.textContent = ptext;
    p.className = "arr-ptr " + pcls;
  }
  const t = step.t;
  if (t === "ps" || t === "ii") {
    setCell(step.pi, "ac-pivot", "P", "ptr-pivot");
  }
  if (t === "cmp" || t === "iadv") {
    setCell(step.pi, "ac-pivot", "P", "ptr-pivot");
    if (step.i >= 0) setCell(step.i, "ac-i", "i", "ptr-i");
    if (step.j >= 0 && step.j !== step.pi)
      setCell(step.j, "ac-j", "j", "ptr-j");
  }
  if (t === "ai") {
    setCell(step.pi, "ac-pivot", "P", "ptr-pivot");
    setCell(step.i, "ac-i", "i→", "ptr-i");
    if (step.j >= 0 && step.j < arr.length) {
      const c2 = document.getElementById("mc-" + step.j),
        p2 = document.getElementById("mp-" + step.j);
      if (
        c2 &&
        p2 &&
        !(step.sorted && step.sorted.has(step.j)) &&
        !c2.className.includes("ac-i")
      ) {
        c2.className = "arr-cell ac-j";
        p2.textContent = "j";
        p2.className = "arr-ptr ptr-j";
      }
    }
  }
  if (t === "aj") {
    setCell(step.pi, "ac-pivot", "P", "ptr-pivot");
    setCell(step.i, "ac-i", "i", "ptr-i");
    setCell(step.j, "ac-j", "←j", "ptr-j");
  }
  if (t === "sij") {
    setCell(step.i, "ac-swapping", "↔", "ptr-i");
    setCell(step.j, "ac-swapping", "↔", "ptr-j");
    if (step.pi !== step.i && step.pi !== step.j)
      setCell(step.pi, "ac-pivot", "P", "ptr-pivot");
  }
  if (t === "cross") {
    setCell(step.i, "ac-i", "i", "ptr-i");
    setCell(step.j, "ac-j", "j", "ptr-j");
    setCell(step.pi, "ac-pivot", "B", "ptr-placed");
  }
  if (t === "place") {
    setCell(step.pi, "ac-placed", "✓", "ptr-placed");
  }
}

function setCaption(text, type = "") {
  const b = document.getElementById("captionBox");
  b.className = "caption-box" + (type ? " cap-" + type : "");
  b.innerHTML = text;
}
function updateBadges(pv) {
  document.getElementById("badge-pivot").textContent =
    "Pivot: " + (pv !== undefined ? pv : "—");
  document.getElementById("badge-comps").textContent = "Comparisons: " + mComps;
  document.getElementById("badge-swaps").textContent = "Swaps: " + mSwaps;
  document.getElementById("badge-parts").textContent = "Partitions: " + mParts;
  document.getElementById("badge-sorted").textContent = "Sorted: " + mSorted;
}
function hilite(ps) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const e = document.querySelector('.pseudo-step[data-step="' + ps + '"]');
  if (e) {
    e.classList.add("active");
    e.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}
function showMsg(text, type) {
  const e = document.getElementById("msg_show");
  e.style.display = "block";
  e.className = "alert alert-" + type;
  e.innerHTML = text;
}

function startSort() {
  clearTimeout(mainTimer);
  const raw = document.getElementById("arrayInput").value.trim();
  if (!raw) {
    showMsg("Please enter an array.", "danger");
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
  mComps = 0;
  mSwaps = 0;
  mParts = 0;
  mSorted = 0;
  mainSteps = computeSteps(mainArr, currentImpl);
  mainIdx = 0;
  mainDone = false;
  buildStrip(mainArr);
  updateBadges();
  setCaption("Array loaded — click Step ▶ or Auto ▶▶");
  document.getElementById("stepBtn").disabled = false;
  document.getElementById("autoBtn").disabled = false;
  document.getElementById("msg_show").style.display = "none";
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}

function applyMain() {
  if (mainDone || mainIdx >= mainSteps.length) return false;
  const step = mainSteps[mainIdx++];
  const t = step.t;
  if (t === "cmp" || t === "ai" || t === "aj") mComps++;
  if (t === "sij") mSwaps++;
  if (t === "place") mParts++;
  mSorted = step.sorted ? step.sorted.size : mSorted;
  applyStep(step);
  hilite(step.ps);
  const capType =
    t === "ps"
      ? "pivot"
      : t === "sij"
        ? "swap"
        : t === "place"
          ? "placed"
          : t === "done"
            ? "done"
            : "";
  setCaption(step.cap, capType);
  updateBadges(step.pv);
  if (t === "done") {
    mainDone = true;
    showMsg(
      '<i class="fas fa-check-circle"></i>&nbsp;Sorted! Comparisons: ' +
        mComps +
        " | Swaps: " +
        mSwaps +
        " | Partitions: " +
        mParts,
      "success",
    );
    document.getElementById("stepBtn").disabled = true;
    document.getElementById("autoBtn").disabled = true;
    return false;
  }
  return true;
}

function stepSort() {
  applyMain();
}
function autoSort() {
  if (mainDone) return;
  document.getElementById("autoBtn").disabled = true;
  function tick() {
    const c = applyMain();
    if (c && !mainDone) mainTimer = setTimeout(tick, 520);
    else document.getElementById("autoBtn").disabled = false;
  }
  tick();
}
function resetSort() {
  clearTimeout(mainTimer);
  mainArr = [];
  mainSteps = [];
  mainIdx = 0;
  mainDone = false;
  mComps = 0;
  mSwaps = 0;
  mParts = 0;
  mSorted = 0;
  ["arrStrip", "ptrStrip", "idxStrip", "rangeRow"].forEach(
    (id) => (document.getElementById(id).innerHTML = ""),
  );
  document.getElementById("msg_show").style.display = "none";
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("autoBtn").disabled = false;
  setCaption("Enter an array and click Sort to begin.");
  updateBadges();
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
}


function switchImpl(type) {
  currentImpl = type;
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector('[data-type="' + type + '"]').classList.add("active");
  document.getElementById("visualizer-title").textContent =
    "Quick Sort Visualizer — " +
    (type === "lomuto"
      ? "Lomuto Partition (Last Element Pivot)"
      : "Hoare Partition (First Element Pivot)");
  document.getElementById("pseudo-lomuto").style.display =
    type === "lomuto" ? "block" : "none";
  document.getElementById("pseudo-hoare").style.display =
    type === "hoare" ? "block" : "none";
  resetSort();
}


//  SCENARIO 

function mkScenEngine(data) {
  const steps = computeSteps([...data], "lomuto");
  return { steps, idx: 0, done: false, data: [...data] };
}

function buildSArr(wrapId, data) {
  const w = document.getElementById(wrapId);
  if (!w) return;
  w.innerHTML = "";
  data.forEach((v, i) => {
    const cw = document.createElement("div");
    cw.className = "s-cell-wrap";
    const p = document.createElement("div");
    p.className = "s-ptr";
    p.id = wrapId + "-p" + i;
    const c = document.createElement("div");
    c.className = "sc sc-default";
    c.id = wrapId + "-c" + i;
    c.textContent = v;
    cw.appendChild(p);
    cw.appendChild(c);
    w.appendChild(cw);
  });
}

function renderSStep(wrapId, step, data) {
  if (!step) return;
  const arr = step.arr || data,
    n = arr.length;
  arr.forEach((v, i) => {
    const c = document.getElementById(wrapId + "-c" + i),
      p = document.getElementById(wrapId + "-p" + i);
    if (!c || !p) return;
    c.textContent = v;
    p.textContent = "";
    const t = step.t;
    if (t === "done") {
      c.className = "sc sc-sorted";
      return;
    }
    if (step.sorted && step.sorted.has(i)) {
      c.className = "sc sc-sorted";
      return;
    }
    if (t === "place" && i === step.pi) {
      c.className = "sc sc-placed";
      p.textContent = "✓";
      return;
    }
    if (t === "sij" && (i === step.i || i === step.j)) {
      c.className = "sc sc-swapping";
      return;
    }
    if (i === step.pi && t !== "cross" && t !== "aj") {
      c.className = "sc sc-pivot";
      p.textContent = "P";
      return;
    }
    if (t === "cmp" || t === "iadv") {
      if (i === step.i) {
        c.className = "sc sc-i";
        p.textContent = "i";
      } else if (i === step.j && i !== step.pi) {
        c.className = "sc sc-j";
        p.textContent = "j";
      } else c.className = "sc sc-default";
      return;
    }
    if (t === "ai") {
      if (i === step.i) {
        c.className = "sc sc-i";
        p.textContent = "i";
      } else if (i === step.j) {
        c.className = "sc sc-j";
        p.textContent = "j";
      } else c.className = "sc sc-default";
      return;
    }
    if (t === "aj") {
      if (i === step.i) {
        c.className = "sc sc-i";
        p.textContent = "i";
      } else if (i === step.j) {
        c.className = "sc sc-j";
        p.textContent = "j";
      } else c.className = "sc sc-default";
      return;
    }
    if (t === "cross") {
      if (i === step.i) c.className = "sc sc-i";
      else if (i === step.j) c.className = "sc sc-j";
      else c.className = "sc sc-default";
      return;
    }
    c.className = "sc sc-default";
  });
}

function addLog(logId, text, cls = "log-info") {
  const log = document.getElementById(logId);
  if (!log) return;
  const e = document.createElement("div");
  e.className = "log-entry " + cls;
  e.textContent = "> " + text;
  log.appendChild(e);
  log.scrollTop = log.scrollHeight;
}

function runScenStep(eng, wrapId, logId, doneCb) {
  if (!eng || eng.done || eng.idx >= eng.steps.length) return;
  const step = eng.steps[eng.idx++];
  const logMap = {
    ps: (s) => ({
      text: `PARTITION [${s.low}..${s.high}] pivot=${s.pv}`,
      cls: "log-pivot",
    }),
    ii: (s) => ({
      text: `INIT i=${s.i}${s.j !== undefined ? " j=" + s.j : ""}`,
      cls: "log-info",
    }),
    cmp: (s) => ({
      text: `  Compare arr[${s.j}]=${step.arr[s.j]} ${step.arr[s.j] <= s.pv ? "<=" : ">"} ${s.pv}`,
      cls: "log-compare",
    }),
    iadv: (s) => ({
      text: `  i advanced, arr[${s.i}] already in place`,
      cls: "log-info",
    }),
    sij: (s) => ({
      text: `  SWAP arr[${s.i}]=${step.arr[s.i]} ↔ arr[${s.j}]=${step.arr[s.j]}`,
      cls: "log-swap",
    }),
    ai: (s) => ({
      text: `  i→${s.i} (arr[${s.i}]=${step.arr[s.i]} >= pivot)`,
      cls: "log-compare",
    }),
    aj: (s) => ({
      text: `  j←${s.j} (arr[${s.j}]=${step.arr[s.j]} <= pivot)`,
      cls: "log-compare",
    }),
    cross: (s) => ({
      text: `  Crossed: boundary at j=${s.j}`,
      cls: "log-pivot",
    }),
    place: (s) => ({
      text: `  PLACED pivot ${s.pv} at idx ${s.pi} ✓`,
      cls: "log-placed",
    }),
    rec: (s) => ({
      text: `RECURSE [${s.low}..${s.pi - 1 > -1 ? s.pi - 1 : "—"}] & [${s.pi + 1}..${s.high}]`,
      cls: "log-info",
    }),
    done: () => ({ text: `✓ Fully sorted!`, cls: "log-sorted" }),
  };
  const entry = logMap[step.t]
    ? logMap[step.t](step)
    : { text: step.cap, cls: "log-info" };
  addLog(logId, entry.text, entry.cls);
  renderSStep(wrapId, step, eng.data);
  if (step.t === "done") {
    eng.done = true;
    addLog(logId, "✓ Fully sorted!", "log-info");
    addLog(logId, "Result: O(N log N) average performance", "log-result");
    if (doneCb) doneCb(eng);
  }
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

//  BEST CASE SCENARIO

const BEST_DATA = [3, 10, 20, 30, 40, 50, 60];
let bestEng = null,
  bestTimer = null;
function initBest() {
  bestEng = mkScenEngine(BEST_DATA);
  buildSArr("sarr-best", BEST_DATA);
  document.getElementById("log-best").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-best",
    "Array: [" + BEST_DATA.join(", ") + "] — balanced pivot scenario",
    "log-info",
  );
  addLog(
    "log-best",
    "With Lomuto, pivot=last element, so 60 is first pivot",
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
      if (!bestEng.done) bestTimer = setTimeout(tick, 560);
    }
  }
  tick();
}
function resetBest() {
  clearTimeout(bestTimer);
  initBest();
}


//  AVERAGE CASE SCENARIO

const AVG_DATA = [10, 80, 30, 90, 40, 50, 70];
let avgEng = null,
  avgTimer = null;
function initAvg() {
  avgEng = mkScenEngine(AVG_DATA);
  buildSArr("sarr-avg", AVG_DATA);
  document.getElementById("log-avg").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-avg",
    "Array: [" + AVG_DATA.join(", ") + "] — random order",
    "log-info",
  );
  addLog("log-avg", "Typical O(N log N) average case performance", "log-info");
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
      if (!avgEng.done) avgTimer = setTimeout(tick, 530);
    }
  }
  tick();
}
function resetAvg() {
  clearTimeout(avgTimer);
  initAvg();
}


//  WORST CASE SCENARIO

const WORST_DATA = [10, 20, 30, 40, 50, 60];
let worstEng = null,
  worstTimer = null;

function initWorst() {
  worstEng = mkScenEngine(WORST_DATA);
  buildSArr("sarr-worst", WORST_DATA);
  document.getElementById("log-worst").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-worst",
    "Array: [" + WORST_DATA.join(", ") + "] — already sorted",
    "log-warn",
  );
  addLog(
    "log-worst",
    "With Lomuto (last pivot), this is the WORST CASE!",
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
      if (!worstEng.done) worstTimer = setTimeout(tick, 450);
    }
  }
  tick();
}

function resetWorst() {
  clearTimeout(worstTimer);
  initWorst();
}

//  CUSTOM INPUT SCENARIO

let custEng = null,
  custTimer = null,
  ccTimerId = null;

function initCustom() {
  document.getElementById("sarr-custom").innerHTML = "";
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog("log-custom", "Enter an array and click ▶ Load & Sort.", "log-info");
  custEng = null;
  document.getElementById("custom-step-btn").disabled = true;
  document.getElementById("custom-auto-btn").disabled = true;
  ["best", "avg", "worst"].forEach((t) =>
    document.getElementById("cc-" + t).classList.remove("cc-active-" + t),
  );
  document.getElementById("cc-toast").className = "cc-toast";
}

function customLoad() {
  clearTimeout(custTimer);
  const raw = document.getElementById("custom-arr").value.trim();
  if (!raw) {
    addLog("log-custom", "Enter an array first!", "log-warn");
    return;
  }
  const data = raw
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  if (data.length < 2) {
    addLog("log-custom", "Need at least 2 numbers.", "log-warn");
    return;
  }
  if (data.length > 10) {
    addLog(
      "log-custom",
      "Keep to 10 elements for best visualization.",
      "log-warn",
    );
    return;
  }

  custEng = mkScenEngine(data);
  buildSArr("sarr-custom", data);
  document.getElementById("log-custom").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  addLog(
    "log-custom",
    `Array Loaded: [${data.join(", ")}]  N=${data.length}`,
    "log-info",
  );
  document.getElementById("custom-step-btn").disabled = false;
  document.getElementById("custom-auto-btn").disabled = false;
}

function highlightCC(type) {
  ["best", "avg", "worst"].forEach((t) =>
    document.getElementById("cc-" + t).classList.remove("cc-active-" + t),
  );
  clearTimeout(ccTimerId);
  const card = document.getElementById("cc-" + type);
  if (card) {
    card.classList.add("cc-active-" + type);
    ccTimerId = setTimeout(
      () => card.classList.remove("cc-active-" + type),
      3000,
    );
  }
}

function showCCToast(type, msg) {
  const toast = document.getElementById("cc-toast");
  const icons = { best: "⚡", avg: "〜", worst: "⚠" };
  document.getElementById("cc-toast-icon").textContent = icons[type] || "📊";
  document.getElementById("cc-toast-text").textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.className = "cc-toast";
  }, 3500);
}

function customStep() {
  if (!custEng || custEng.done) return;
  runScenStep(custEng, "sarr-custom", "log-custom", (eng) => {
    // Determine complexity based on partition depth vs array length
    const n = eng.data.length;
    const isSorted =
      JSON.stringify([...eng.data].sort((a, b) => a - b)) ===
      JSON.stringify(eng.data);
    const isReverse =
      JSON.stringify([...eng.data].sort((a, b) => b - a)) ===
      JSON.stringify(eng.data);

    let type = "avg",
      label = "O(N log N) - Average Case Performance";
    if (isSorted || isReverse) {
      type = "worst";
      label =
        "O(N²) - Worst Case! Sorted input + Last element pivot = Unbalanced.";
    } else if (n > 4) {
      type = "best";
      label = "O(N log N) - Near-Balanced partitions detected.";
    }

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
      if (!custEng.done) custTimer = setTimeout(tick, 500);
    }
  }
  tick();
}

function resetCustom() {
  clearTimeout(custTimer);
  document.getElementById("custom-arr").value = "";
  initCustom();
}


//  CODE EDITOR LOGIC

let codeEditor;
let currentLang = "cpp";
let editorImpl = "lomuto";

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
    autoCloseBrackets: true,
  });
  codeEditor.setValue(CODE[editorImpl][currentLang]);
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
    editorImpl === "lomuto"
      ? "Lomuto Partition (Last Pivot)"
      : "Hoare Partition (First Pivot)";

  codeEditor.setOption("mode", modeMap[currentLang]);
  codeEditor.setValue(CODE[editorImpl][currentLang]);
  document.querySelector(".lang-display").textContent =
    nameMap[currentLang] + " — " + implLabel;
}

function copyCode() {
  navigator.clipboard.writeText(codeEditor.getValue()).then(() => {
    const icon = document.querySelector(".code-copy i");
    icon.className = "fas fa-check";
    setTimeout(() => {
      icon.className = "fas fa-copy";
    }, 2000);
  });
}


//  INTERACTIVE CODE RUNNER 

let inputResolver = null;
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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

async function runCode() {
  const out = document.getElementById("codeOutput");
  out.innerHTML =
    '<span style="color:#facc15">🔄 Initializing Quick Sort...</span><br>';

  const rawInput = await getInput(
    "Enter 5-7 numbers separated by commas (e.g. 10, 5, 8, 12, 3):",
  );
  const arr = rawInput
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));

  if (arr.length < 2) {
    out.innerHTML +=
      '<span style="color:var(--primary-red)">❌ Error: Need at least 2 numbers.</span>';
    return;
  }

  out.innerHTML = `<span style="color:var(--primary-cyan)">Input Array: [${arr.join(", ")}]</span><br><br>`;
  let comps = 0,
    swaps = 0;

  async function simulateQS(a, low, high) {
    if (low < high) {
      out.innerHTML += `<span style="color:var(--primary-purple)">Sorting Sub-array [${low}...${high}]</span><br>`;
      await sleep(400);

      let pivotIdx;
      if (editorImpl === "lomuto") {
        let pivot = a[high];
        let i = low - 1;
        out.innerHTML += `&nbsp;&nbsp;Pivot chosen: <span style="color:var(--primary-orange)">${pivot}</span> (last index)<br>`;
        for (let j = low; j < high; j++) {
          comps++;
          if (a[j] <= pivot) {
            i++;
            swaps++;
            [a[i], a[j]] = [a[j], a[i]];
            out.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;Swap ${a[i]} ↔ ${a[j]} (found element ≤ pivot)<br>`;
          }
          await sleep(150);
        }
        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        swaps++;
        pivotIdx = i + 1;
      } else {
        // Hoare Sim
        let pivot = a[low];
        let i = low - 1,
          j = high + 1;
        out.innerHTML += `&nbsp;&nbsp;Pivot chosen: <span style="color:var(--primary-orange)">${pivot}</span> (first index)<br>`;
        while (true) {
          do {
            i++;
            comps++;
          } while (a[i] < pivot);
          do {
            j--;
            comps++;
          } while (a[j] > pivot);
          if (i >= j) {
            pivotIdx = j;
            break;
          }
          swaps++;
          [a[i], a[j]] = [a[j], a[i]];
          out.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;Swap ${a[i]} ↔ ${a[j]} (crossing pointers finding bounds)<br>`;
          await sleep(150);
        }
      }

      out.innerHTML += `&nbsp;&nbsp;<span style="color:var(--primary-yellow)">Partitioned at index ${pivotIdx}.</span> Current: [${a.join(", ")}]<br><br>`;

      if (editorImpl === "lomuto") {
        await simulateQS(a, low, pivotIdx - 1);
        await simulateQS(a, pivotIdx + 1, high);
      } else {
        await simulateQS(a, low, pivotIdx);
        await simulateQS(a, pivotIdx + 1, high);
      }
    }
  }

  await simulateQS(arr, 0, arr.length - 1);
  out.innerHTML += `<br><span style="color:var(--primary-green)">✅ Final Sorted Array: [${arr.join(", ")}]</span><br>`;
  out.innerHTML += `<span style="color:var(--primary-cyan)">Total Comparisons: ${comps} | Total Swaps: ${swaps}</span>`;
}

window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditor();
  initBest();
  initAvg();
  initWorst();
  initCustom();
};


const ALGO_KEY = "quicksort"; 
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
