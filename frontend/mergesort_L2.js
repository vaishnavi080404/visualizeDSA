const codeTemplates = {
  topdown: {
    cpp: `#include <iostream>
using namespace std;

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Temporary sub-arrays
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    // Merge: compare and pick smaller element
    while (i < n1 && j < n2) {
        if (L[i] <= R[j])
            arr[k++] = L[i++];
        else
            arr[k++] = R[j++];
    }

    // Copy remaining elements
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;   // base case

    int mid = left + (right - left) / 2;

    mergeSort(arr, left, mid);       // sort left half
    mergeSort(arr, mid + 1, right);  // sort right half
    merge(arr, left, mid, right);    // merge sorted halves
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

    mergeSort(arr, 0, n - 1);

    cout << "\\nAfter:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
    python: `def merge(arr, left, mid, right):
    L = arr[left : mid + 1]      # left sub-array copy
    R = arr[mid + 1 : right + 1] # right sub-array copy

    i = j = 0
    k = left

    # Compare and place smaller element
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            arr[k] = L[i]; i += 1
        else:
            arr[k] = R[j]; j += 1
        k += 1

    # Copy remaining elements
    while i < len(L): arr[k] = L[i]; i += 1; k += 1
    while j < len(R): arr[k] = R[j]; j += 1; k += 1


def merge_sort(arr, left=None, right=None):
    if left is None: left  = 0
    if right is None: right = len(arr) - 1

    if left >= right:
        return             # base case: 1 element

    mid = left + (right - left) // 2
    merge_sort(arr, left, mid)        # sort left half
    merge_sort(arr, mid + 1, right)   # sort right half
    merge(arr, left, mid, right)      # merge sorted halves


# --- Input ---
n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

print(f"\\nBefore: {arr}")
merge_sort(arr)
print(f"After:  {arr}")`,
    java: `import java.util.Arrays;
import java.util.Scanner;

public class MergeSort {

    static void merge(int[] arr, int left, int mid, int right) {
        int[] L = Arrays.copyOfRange(arr, left, mid + 1);
        int[] R = Arrays.copyOfRange(arr, mid + 1, right + 1);

        int i = 0, j = 0, k = left;
        while (i < L.length && j < R.length)
            arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
        while (i < L.length) arr[k++] = L[i++];
        while (j < R.length) arr[k++] = R[j++];
    }

    static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;

        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
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
        mergeSort(arr, 0, n - 1);
        System.out.println("After:  " + Arrays.toString(arr));
    }
}`,
    c: `#include <stdio.h>
#include <string.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int L[n1], R[n2];

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;

    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
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

    mergeSort(arr, 0, n - 1);

    printf("\\nAfter:  ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    javascript: `function merge(arr, left, mid, right) {
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < L.length && j < R.length) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else               arr[k++] = R[j++];
    }
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];
}

function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;   // base case

    const mid = left + Math.floor((right - left) / 2);
    mergeSort(arr, left, mid);        // sort left
    mergeSort(arr, mid + 1, right);   // sort right
    merge(arr, left, mid, right);     // merge
}

// --- Demo ---
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Before:", arr.join(", "));
mergeSort(arr);
console.log("After: ", arr.join(", "));`,
  },

  bottomup: {
    cpp: `#include <iostream>
#include <algorithm>
using namespace std;

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int L[n1], R[n2];

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSortBottomUp(int arr[], int n) {
    // Start with sub-arrays of size 1 and double each pass
    for (int width = 1; width < n; width *= 2) {
        for (int left = 0; left < n; left += 2 * width) {
            int mid   = min(left + width - 1, n - 1);
            int right = min(left + 2 * width - 1, n - 1);

            if (mid < right)
                merge(arr, left, mid, right);
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

    mergeSortBottomUp(arr, n);

    cout << "\\nAfter:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
    python: `def merge(arr, left, mid, right):
    L = arr[left : mid + 1]
    R = arr[mid + 1 : right + 1]
    i = j = 0; k = left

    while i < len(L) and j < len(R):
        if L[i] <= R[j]: arr[k] = L[i]; i += 1
        else:             arr[k] = R[j]; j += 1
        k += 1
    while i < len(L): arr[k] = L[i]; i += 1; k += 1
    while j < len(R): arr[k] = R[j]; j += 1; k += 1


def merge_sort_bottom_up(arr):
    n = len(arr)
    width = 1          # start with sub-arrays of size 1

    while width < n:
        left = 0
        while left < n:
            mid   = min(left + width - 1, n - 1)
            right = min(left + 2 * width - 1, n - 1)

            if mid < right:
                merge(arr, left, mid, right)
            left += 2 * width
        width *= 2     # double the merge width


# --- Input ---
n = int(input("Enter number of elements: "))
arr = []
for i in range(n):
    val = int(input(f"arr[{i}] = "))
    arr.append(val)

print(f"\\nBefore: {arr}")
merge_sort_bottom_up(arr)
print(f"After:  {arr}")`,
    java: `import java.util.Arrays;
import java.util.Scanner;

public class MergeSortBottomUp {

    static void merge(int[] arr, int left, int mid, int right) {
        int[] L = Arrays.copyOfRange(arr, left, mid + 1);
        int[] R = Arrays.copyOfRange(arr, mid + 1, right + 1);
        int i = 0, j = 0, k = left;
        while (i < L.length && j < R.length)
            arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
        while (i < L.length) arr[k++] = L[i++];
        while (j < R.length) arr[k++] = R[j++];
    }

    static void mergeSortBottomUp(int[] arr) {
        int n = arr.length;
        for (int width = 1; width < n; width *= 2) {
            for (int left = 0; left < n; left += 2 * width) {
                int mid   = Math.min(left + width - 1, n - 1);
                int right = Math.min(left + 2 * width - 1, n - 1);
                if (mid < right)
                    merge(arr, left, mid, right);
            }
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
        mergeSortBottomUp(arr);
        System.out.println("After:  " + Arrays.toString(arr));
    }
}`,
    c: `#include <stdio.h>

#define MIN(a,b) ((a)<(b)?(a):(b))

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSortBottomUp(int arr[], int n) {
    for (int width = 1; width < n; width *= 2) {
        for (int left = 0; left < n; left += 2 * width) {
            int mid   = MIN(left + width - 1, n - 1);
            int right = MIN(left + 2 * width - 1, n - 1);
            if (mid < right)
                merge(arr, left, mid, right);
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
    mergeSortBottomUp(arr, n);
    printf("\\nAfter:  ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    javascript: `function merge(arr, left, mid, right) {
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < L.length && j < R.length)
        arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];
}

function mergeSortBottomUp(arr) {
    const n = arr.length;

    // Start with width 1 and double each pass
    for (let width = 1; width < n; width *= 2) {
        for (let left = 0; left < n; left += 2 * width) {
            const mid   = Math.min(left + width - 1, n - 1);
            const right = Math.min(left + 2 * width - 1, n - 1);
            if (mid < right)
                merge(arr, left, mid, right);
        }
    }
}

// --- Demo ---
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Before:", arr.join(", "));
mergeSortBottomUp(arr);
console.log("After: ", arr.join(", "));`,
  },
};

let codeEditor;
let currentLang = "cpp";
let editorImpl = "topdown";
let currentImpl = "topdown";

// main visualizer
let mainArr = [];
let mainSteps = [];
let mainStepIdx = 0;
let mainDone = false;
let mainTimer = null;
let mainComps = 0;
let mainMerges = 0;
let mainCopies = 0;

let inputResolver = null;
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/*
   STEP PRE-COMPUTATION
   We pre-compute every meaningful visual event so Step/Auto can
   drive the same sequence deterministically.

   Step types:
     split      — divide a range in two
     recurse    — going deeper (label only)
     merge-start— about to merge two ranges
     compare    — picking smaller of two elements
     place      — writing element into temp
     copy-back  — writing temp[i] back to arr
     done       — fully sorted
   + bottomup variants:
     bu-width   — starting a new width pass
     bu-segment — about to merge a segment
*/
function computeSteps(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];

  if (currentImpl === "topdown") {
    // --- Top-Down recursive simulation ---
    function sim(a, left, right, depth) {
      if (left >= right) return;
      const mid = left + Math.floor((right - left) / 2);

      steps.push({
        type: "split",
        left,
        mid,
        right,
        depth,
        arr: [...a],
        caption: `DIVIDE: split [${left}…${right}] → left [${left}…${mid}] | right [${mid + 1}…${right}]`,
        pseudo: "td-mid",
      });

      steps.push({
        type: "recurse-l",
        left,
        mid,
        right,
        depth,
        arr: [...a],
        caption: `RECURSE LEFT: sorting sub-array [${left}…${mid}]`,
        pseudo: "td-recurse-l",
      });
      sim(a, left, mid, depth + 1);

      steps.push({
        type: "recurse-r",
        left,
        mid,
        right,
        depth,
        arr: [...a],
        caption: `RECURSE RIGHT: sorting sub-array [${mid + 1}…${right}]`,
        pseudo: "td-recurse-r",
      });
      sim(a, mid + 1, right, depth + 1);

      // merge simulation
      steps.push({
        type: "merge-start",
        left,
        mid,
        right,
        depth,
        arr: [...a],
        caption: `MERGE: combining [${left}…${mid}] and [${mid + 1}…${right}] into sorted order`,
        pseudo: "td-merge",
      });

      const L = a.slice(left, mid + 1);
      const R = a.slice(mid + 1, right + 1);
      const temp = new Array(right - left + 1).fill(null);
      let i = 0,
        j = 0,
        k = 0;

      while (i < L.length && j < R.length) {
        steps.push({
          type: "compare",
          left,
          mid,
          right,
          depth,
          arr: [...a],
          ci: left + i,
          cj: mid + 1 + j,
          lVal: L[i],
          rVal: R[j],
          caption: `COMPARE: L[${left + i}]=${L[i]} vs R[${mid + 1 + j}]=${R[j]} → pick ${L[i] <= R[j] ? L[i] : R[j]}`,
          pseudo: "td-compare",
          temp: [...temp],
        });
        if (L[i] <= R[j]) {
          temp[k] = L[i];
          a[left + k] = L[i];
          i++;
        } else {
          temp[k] = R[j];
          a[left + k] = R[j];
          j++;
        }
        k++;
        steps.push({
          type: "place",
          left,
          mid,
          right,
          depth,
          arr: [...a],
          placeIdx: left + k - 1,
          placeVal: temp[k - 1],
          caption: `PLACE: arr[${left + k - 1}] = ${temp[k - 1]}`,
          pseudo: "td-copy",
          temp: [...temp],
        });
      }
      while (i < L.length) {
        temp[k] = L[i];
        a[left + k] = L[i];
        i++;
        k++;
        steps.push({
          type: "place",
          left,
          mid,
          right,
          depth,
          arr: [...a],
          placeIdx: left + k - 1,
          placeVal: temp[k - 1],
          caption: `COPY REMAINING LEFT: arr[${left + k - 1}] = ${temp[k - 1]}`,
          pseudo: "td-copy",
          temp: [...temp],
        });
      }
      while (j < R.length) {
        temp[k] = R[j];
        a[left + k] = R[j];
        j++;
        k++;
        steps.push({
          type: "place",
          left,
          mid,
          right,
          depth,
          arr: [...a],
          placeIdx: left + k - 1,
          placeVal: temp[k - 1],
          caption: `COPY REMAINING RIGHT: arr[${left + k - 1}] = ${temp[k - 1]}`,
          pseudo: "td-copy",
          temp: [...temp],
        });
      }

      steps.push({
        type: "merge-done",
        left,
        mid,
        right,
        depth,
        arr: [...a],
        caption: `MERGED: [${left}…${right}] = [${a.slice(left, right + 1).join(", ")}] ✓`,
        pseudo: "td-copy",
        temp: null,
      });
    }
    sim(arr, 0, n - 1, 0);
  } else {
    // --- Bottom-Up iterative simulation ---
    let width = 1;
    while (width < n) {
      steps.push({
        type: "bu-width",
        width,
        arr: [...arr],
        caption: `BOTTOM-UP PASS: merge width = ${width} → merging pairs of size ${width}`,
        pseudo: "bu-width",
      });

      let left = 0;
      while (left < n) {
        const mid = Math.min(left + width - 1, n - 1);
        const right = Math.min(left + 2 * width - 1, n - 1);

        if (mid < right) {
          steps.push({
            type: "bu-segment",
            left,
            mid,
            right,
            width,
            arr: [...arr],
            caption: `MERGE SEGMENT: [${left}…${mid}] + [${mid + 1}…${right}]`,
            pseudo: "bu-merge",
          });

          const L = arr.slice(left, mid + 1);
          const R = arr.slice(mid + 1, right + 1);
          const temp = new Array(right - left + 1).fill(null);
          let i = 0,
            j = 0,
            k = 0;

          while (i < L.length && j < R.length) {
            steps.push({
              type: "compare",
              left,
              mid,
              right,
              arr: [...arr],
              ci: left + i,
              cj: mid + 1 + j,
              lVal: L[i],
              rVal: R[j],
              caption: `COMPARE: L[${left + i}]=${L[i]} vs R[${mid + 1 + j}]=${R[j]} → pick ${L[i] <= R[j] ? L[i] : R[j]}`,
              pseudo: "bu-compare",
              temp: [...temp],
            });
            if (L[i] <= R[j]) {
              temp[k] = L[i];
              arr[left + k] = L[i];
              i++;
            } else {
              temp[k] = R[j];
              arr[left + k] = R[j];
              j++;
            }
            k++;
            steps.push({
              type: "place",
              left,
              mid,
              right,
              arr: [...arr],
              placeIdx: left + k - 1,
              placeVal: temp[k - 1],
              caption: `PLACE: arr[${left + k - 1}] = ${temp[k - 1]}`,
              pseudo: "bu-copy",
              temp: [...temp],
            });
          }
          while (i < L.length) {
            temp[k] = L[i];
            arr[left + k] = L[i];
            i++;
            k++;
            steps.push({
              type: "place",
              left,
              mid,
              right,
              arr: [...arr],
              placeIdx: left + k - 1,
              placeVal: temp[k - 1],
              caption: `COPY LEFT REMAINDER: arr[${left + k - 1}] = ${temp[k - 1]}`,
              pseudo: "bu-copy",
              temp: [...temp],
            });
          }
          while (j < R.length) {
            temp[k] = R[j];
            arr[left + k] = R[j];
            j++;
            k++;
            steps.push({
              type: "place",
              left,
              mid,
              right,
              arr: [...arr],
              placeIdx: left + k - 1,
              placeVal: temp[k - 1],
              caption: `COPY RIGHT REMAINDER: arr[${left + k - 1}] = ${temp[k - 1]}`,
              pseudo: "bu-copy",
              temp: [...temp],
            });
          }

          steps.push({
            type: "merge-done",
            left,
            mid,
            right,
            arr: [...arr],
            caption: `MERGED SEGMENT [${left}…${right}] = [${arr.slice(left, right + 1).join(", ")}] ✓`,
            pseudo: "bu-copy",
            temp: null,
          });
        }
        left += 2 * width;
      }
      width *= 2;
    }
  }

  steps.push({
    type: "done",
    arr: [...arr],
    caption: `✅ Array fully sorted: [${arr.join(", ")}]`,
    pseudo: currentImpl === "topdown" ? "td-done" : "bu-done",
  });
  return steps;
}

/* 
   MAIN VISUALIZER — RENDER
 */
function buildMainStrip(arr) {
  const strip = document.getElementById("arrStrip");
  const istrip = document.getElementById("idxStrip");
  strip.innerHTML = "";
  istrip.innerHTML = "";
  arr.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "arr-cell ac-default";
    c.id = "mc-" + i;
    c.textContent = v;
    strip.appendChild(c);
    const ix = document.createElement("div");
    ix.className = "idx-cell";
    ix.textContent = i;
    istrip.appendChild(ix);
  });
}

function applyStepToStrip(step, arr) {
  // reset all
  arr.forEach((_, i) => {
    const c = document.getElementById("mc-" + i);
    if (!c) return;
    c.className = "arr-cell ac-default";
    c.textContent = step.arr ? step.arr[i] : arr[i];
  });

  if (!step) return;
  const a = step.arr || arr;

  if (step.type === "done") {
    a.forEach((_, i) => {
      const c = document.getElementById("mc-" + i);
      if (c) c.className = "arr-cell ac-sorted";
    });
    return;
  }
  if (
    step.type === "merge-done" ||
    step.type === "bu-width" ||
    step.type === "bu-segment"
  ) {
    if (step.left !== undefined) {
      for (let i = step.left; i <= (step.right || step.left); i++) {
        const c = document.getElementById("mc-" + i);
        if (c) c.className = "arr-cell ac-sorted";
      }
    }
    return;
  }
  if (step.type === "split") {
    for (let i = step.left; i <= step.right; i++) {
      const c = document.getElementById("mc-" + i);
      if (!c) continue;
      if (i <= step.mid) c.className = "arr-cell ac-left";
      else c.className = "arr-cell ac-right";
    }
    return;
  }
  if (step.type === "recurse-l" || step.type === "recurse-r") {
    const lo = step.type === "recurse-l" ? step.left : step.mid + 1;
    const hi = step.type === "recurse-l" ? step.mid : step.right;
    for (let i = lo; i <= hi; i++) {
      const c = document.getElementById("mc-" + i);
      if (c) c.className = "arr-cell ac-dividing";
    }
    return;
  }
  if (step.type === "merge-start") {
    for (let i = step.left; i <= step.mid; i++) {
      const c = document.getElementById("mc-" + i);
      if (c) c.className = "arr-cell ac-left";
    }
    for (let i = step.mid + 1; i <= step.right; i++) {
      const c = document.getElementById("mc-" + i);
      if (c) c.className = "arr-cell ac-right";
    }
    return;
  }
  if (step.type === "compare") {
    const cl = document.getElementById("mc-" + step.ci);
    if (cl) cl.className = "arr-cell ac-comparing";
    const cr = document.getElementById("mc-" + step.cj);
    if (cr) cr.className = "arr-cell ac-comparing";
    return;
  }
  if (step.type === "place") {
    for (let i = step.left; i <= step.right; i++) {
      const c = document.getElementById("mc-" + i);
      if (!c) continue;
      if (i === step.placeIdx) c.className = "arr-cell ac-placing";
      else c.className = "arr-cell ac-default";
    }
    // show temp buffer
    renderTempBuffer(step);
    return;
  }
  renderTempBuffer(null);
}

function renderTempBuffer(step) {
  const row = document.getElementById("tempRow");
  const strip = document.getElementById("tempStrip");
  if (!step || !step.temp) {
    row.style.display = "none";
    return;
  }
  row.style.display = "flex";
  strip.innerHTML = "";
  step.temp.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = v !== null ? "temp-cell tc-active" : "temp-cell tc-empty";
    c.textContent = v !== null ? v : "·";
    strip.appendChild(c);
  });
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
  document.getElementById("badge-merges").textContent = `Merges: ${mainMerges}`;
  document.getElementById("badge-copies").textContent = `Copies: ${mainCopies}`;
}

function highlightStep(pseudo) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`.pseudo-step[data-step="${pseudo}"]`);
  if (el) el.classList.add("active");
}

function showMsg(text, type) {
  const el = document.getElementById("msg_show");
  el.style.display = "block";
  el.className = "alert alert-" + type;
  el.innerHTML = text;
}

/* ── MAIN SORT CONTROLS ── */
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
  mainMerges = 0;
  mainCopies = 0;
  buildMainStrip(mainArr);
  document.getElementById("tempRow").style.display = "none";
  updateBadges("Ready");
  setCaption(
    `Array loaded: [${mainArr.join(", ")}]. Click <strong>Step ▶</strong> or <strong>Auto ▶▶</strong> to begin.`,
  );
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
  if (step.type === "merge-start" || step.type === "bu-segment") mainMerges++;
  if (step.type === "place") mainCopies++;

  const phaseMap = {
    split: "Divide",
    "recurse-l": "Recurse",
    "recurse-r": "Recurse",
    "merge-start": "Merge",
    "merge-done": "Merge",
    compare: "Compare",
    place: "Place",
    "bu-width": "Width Pass",
    "bu-segment": "Merge",
    done: "Done",
  };
  updateBadges(phaseMap[step.type] || step.type);
  applyStepToStrip(step, mainArr);
  setCaption(
    step.caption,
    step.type === "split"
      ? "split"
      : step.type === "place"
        ? "place"
        : step.type.includes("merge")
          ? "merge"
          : step.type === "done"
            ? "done"
            : "",
  );
  highlightStep(step.pseudo);

  if (step.type === "done") {
    mainDone = true;
    document.getElementById("tempRow").style.display = "none";
    showMsg(
      `<i class="fas fa-check-circle"></i>&nbsp; Sorted! Comparisons: ${mainComps} | Merges: ${mainMerges} | Copies: ${mainCopies}`,
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
  mainMerges = 0;
  mainCopies = 0;
  document.getElementById("arrStrip").innerHTML = "";
  document.getElementById("idxStrip").innerHTML = "";
  document.getElementById("tempRow").style.display = "none";
  document.getElementById("msg_show").style.display = "none";
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("autoBtn").disabled = true;
  setCaption("Enter an array and click Sort to begin.");
  updateBadges(null);
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
    "Merge Sort Visualizer — " +
    (type === "topdown" ? "Top-Down (Recursive)" : "Bottom-Up (Iterative)");
  document.getElementById("pseudo-topdown").style.display =
    type === "topdown" ? "block" : "none";
  document.getElementById("pseudo-bottomup").style.display =
    type === "bottomup" ? "block" : "none";
  resetSort();
}

/* 
   SCENARIO HELPERS — mini array visualizer
*/
function buildScenArr(wrapId, data) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  wrap.innerHTML = "";
  // initial row
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
    if (step.type === "done") {
      c.className = "sc sc-sorted";
      return;
    }
    if (step.type === "merge-done") {
      if (i >= step.left && i <= step.right) c.className = "sc sc-sorted";
      else c.className = "sc sc-default";
      return;
    }
    if (step.type === "split") {
      if (i < step.left || i > step.right) c.className = "sc sc-default";
      else if (i <= step.mid) c.className = "sc sc-left";
      else c.className = "sc sc-right";
      return;
    }
    if (step.type === "merge-start") {
      if (i >= step.left && i <= step.mid) c.className = "sc sc-left";
      else if (i > step.mid && i <= step.right) c.className = "sc sc-right";
      else c.className = "sc sc-default";
      return;
    }
    if (step.type === "compare") {
      if (i === step.ci || i === step.cj) c.className = "sc sc-comparing";
      else c.className = "sc sc-default";
      return;
    }
    if (step.type === "place") {
      if (i === step.placeIdx) c.className = "sc sc-placing";
      else c.className = "sc sc-default";
      return;
    }
    c.className = "sc sc-default";
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

/* ── shared scenario step engine ── */
function makeScenEngine(data) {
  const steps = (() => {
    const savedImpl = currentImpl;
    currentImpl = "topdown"; // scenarios always show top-down
    const s = computeSteps([...data]);
    currentImpl = savedImpl;
    return s;
  })();
  return { steps, idx: 0, done: false, data: [...data] };
}

function runScenStep(eng, wrapId, logId, doneCallback) {
  if (eng.done || eng.idx >= eng.steps.length) return;
  const step = eng.steps[eng.idx++];
  const log = document.getElementById(logId);

  const logMap = {
    split: {
      text: `DIVIDE [${step.left}…${step.right}] → [${step.left}…${step.mid}] | [${step.mid + 1}…${step.right}]`,
      cls: "log-split",
    },
    "recurse-l": {
      text: `Recurse left  [${step.left}…${step.mid}]`,
      cls: "log-split",
    },
    "recurse-r": {
      text: `Recurse right [${step.mid + 1}…${step.right}]`,
      cls: "log-split",
    },
    "merge-start": {
      text: `MERGE [${step.left}…${step.mid}] + [${step.mid + 1}…${step.right}]`,
      cls: "log-merge",
    },
    compare: {
      text: `  Compare ${step.lVal} vs ${step.rVal} → pick ${Math.min(step.lVal, step.rVal)}`,
      cls: "log-compare",
    },
    place: {
      text: `  Place arr[${step.placeIdx}] = ${step.placeVal}`,
      cls: "log-place",
    },
    "merge-done": {
      text: `  Merged [${step.left}…${step.right}] ✓`,
      cls: "log-sorted",
    },
    done: { text: `✓ Fully sorted!`, cls: "log-sorted" },
  };

  const entry = logMap[step.type];
  if (entry) addLog(log, entry.text, entry.cls);
  renderScenStep(wrapId, step, eng.data);

  if (step.type === "done") {
    eng.done = true;
    addLog(log, "✓ O(N log N) — always!", "log-result");
    if (doneCallback) doneCallback();
  }
}

/* ── BEST ── */
const BEST_DATA = [3, 7, 12, 18, 25, 31];
let bestEng = null,
  bestTimer = null;
function initBest() {
  bestEng = makeScenEngine(BEST_DATA);
  buildScenArr("sarr-best", BEST_DATA);
  document.getElementById("log-best").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-best");
  addLog(log, `Array: [${BEST_DATA.join(", ")}] — already sorted`, "log-info");
  addLog(log, `Best case: fewest comparisons per merge`, "log-info");
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

/* ── AVERAGE ── */
const AVG_DATA = [38, 27, 43, 3, 9, 82, 10];
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

/* ── WORST ── */
const WORST_DATA = [90, 70, 50, 30, 20, 10];
let worstEng = null,
  worstTimer = null;
function initWorst() {
  worstEng = makeScenEngine(WORST_DATA);
  buildScenArr("sarr-worst", WORST_DATA);
  document.getElementById("log-worst").innerHTML =
    '<div class="log-title">📋 Operation Log</div>';
  const log = document.getElementById("log-worst");
  addLog(log, `Array: [${WORST_DATA.join(", ")}] — reverse sorted`, "log-warn");
  addLog(log, `Worst case: max comparisons per merge`, "log-warn");
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

/* ── CUSTOM ── */
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
  addLog(
    document.getElementById("log-custom"),
    `Complexity: always O(N log N) = O(${data.length} × ${Math.ceil(Math.log2(data.length))})`,
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
  const icons = { best: "⚡", avg: "〜", worst: "⚠" };
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
    const n = custEng.data.length;
    const isSorted =
      JSON.stringify([...custEng.data].sort((a, b) => a - b)) ===
      JSON.stringify(custEng.data);
    const isReverse =
      JSON.stringify([...custEng.data].sort((a, b) => b - a)) ===
      JSON.stringify(custEng.data);
    const type = isSorted ? "best" : isReverse ? "worst" : "avg";
    const label = `O(N log N) — ${type === "best" ? "fewest comparisons (sorted input)" : type === "worst" ? "max comparisons (reverse sorted)" : "typical comparisons (random)"}`;
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
  codeEditor.setValue(codeTemplates.topdown.cpp);
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
    editorImpl === "topdown" ? "Top-Down (Recursive)" : "Bottom-Up (Iterative)";
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

/* ── interactive runner ── */
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
    editorImpl === "topdown" ? "Top-Down (Recursive)" : "Bottom-Up (Iterative)";
  out.innerHTML += `<span style="color:var(--primary-cyan)">Merge Sort (${implL}) — ${langN[currentLang]}</span><br><br>`;

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
    mergeCount = 0,
    depth = 0;

  if (editorImpl === "topdown") {
    async function simMerge(a, left, right, d) {
      if (left >= right) return;
      const mid = left + Math.floor((right - left) / 2);
      const indent = "  ".repeat(d);
      out.innerHTML += `${indent}<span style="color:#8b5cf6">mergeSort([${a.slice(left, right + 1).join(",")}], left=${left}, right=${right})</span><br>`;
      depth = Math.max(depth, d);
      await sleep(60);
      await simMerge(a, left, mid, d + 1);
      await simMerge(a, mid + 1, right, d + 1);

      // merge
      mergeCount++;
      const L = a.slice(left, mid + 1),
        R = a.slice(mid + 1, right + 1);
      let i = 0,
        j = 0,
        k = left;
      out.innerHTML += `${indent}<span style="color:var(--primary-pink)">merge([${L.join(",")}], [${R.join(",")}])</span><br>`;
      while (i < L.length && j < R.length) {
        comps++;
        if (L[i] <= R[j]) {
          out.innerHTML += `${indent}  <span style="color:var(--primary-orange)">${L[i]} ≤ ${R[j]}</span> → place <span style="color:var(--primary-green)">${L[i]}</span><br>`;
          a[k++] = L[i++];
        } else {
          out.innerHTML += `${indent}  <span style="color:var(--primary-orange)">${L[i]} &gt; ${R[j]}</span> → place <span style="color:var(--primary-green)">${R[j]}</span><br>`;
          a[k++] = R[j++];
        }
        await sleep(40);
      }
      while (i < L.length) {
        a[k++] = L[i++];
      }
      while (j < R.length) {
        a[k++] = R[j++];
      }
      out.innerHTML += `${indent}<span style="color:var(--primary-green)">merged → [${a.slice(left, right + 1).join(",")}]</span><br>`;
    }
    await simMerge(arr, 0, n - 1, 0);
  } else {
    // Bottom-Up
    let width = 1;
    while (width < n) {
      out.innerHTML += `<span style="color:#8b5cf6">Width = ${width}:</span><br>`;
      let left = 0;
      while (left < n) {
        const mid = Math.min(left + width - 1, n - 1);
        const right = Math.min(left + 2 * width - 1, n - 1);
        if (mid < right) {
          mergeCount++;
          const L = arr.slice(left, mid + 1),
            R = arr.slice(mid + 1, right + 1);
          out.innerHTML += `  <span style="color:var(--primary-pink)">merge([${L.join(",")}]+[${R.join(",")}])</span>`;
          let i = 0,
            j = 0,
            k = left;
          while (i < L.length && j < R.length) {
            comps++;
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
          }
          while (i < L.length) arr[k++] = L[i++];
          while (j < R.length) arr[k++] = R[j++];
          out.innerHTML += ` → <span style="color:var(--primary-green)">[${arr.slice(left, right + 1).join(",")}]</span><br>`;
          await sleep(60);
        }
        left += 2 * width;
      }
      width *= 2;
    }
  }

  out.innerHTML += `<br><span style="color:var(--primary-green)">✅ After:  [${arr.join(", ")}]</span><br>`;
  out.innerHTML += `<span style="color:var(--primary-cyan)">Comparisons: ${comps}  |  Merges: ${mergeCount}  |  Space: O(N)  |  Time: O(N log N)</span>`;
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
    () => (window.location.href = "merge_sort_L1.html"),
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
    () => (window.location.href = "merge_sort_L2_Quiz.html"),
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


const ALGO_KEY = "mergesort"; // change this for each algorithm page (e.g., 'quicksort', 'heapsort', etc.)
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
