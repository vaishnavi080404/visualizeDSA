let currentOp = "traversal";
let currentLang = "cpp";
let currentCodeOp = "traversal";
let codeEditor;
let outputDiv;
let waitingForInput = false;
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

/* 
   PSEUDO CODE DEFINITIONS
*/
const PSEUDOS = {
  traversal: [
    { id: "t1", label: "TRAVERSAL", text: "for i from 0 to n-1" },
    { id: "t2", label: "", text: "&nbsp;&nbsp;print arr[i]" },
    { id: "t3", label: "", text: "end for" },
  ],
  insertion: [
    {
      id: "i1",
      label: "INSERT(arr, idx, val)",
      text: "for j from n down to idx+1",
    },
    {
      id: "i2",
      label: "",
      text: "&nbsp;&nbsp;arr[j] = arr[j-1]  // shift right",
    },
    { id: "i3", label: "", text: "arr[idx] = val" },
    { id: "i4", label: "", text: "n = n + 1" },
  ],
  deletion: [
    { id: "d1", label: "DELETE(arr, idx)", text: "removed = arr[idx]" },
    { id: "d2", label: "", text: "for j from idx to n-2" },
    {
      id: "d3",
      label: "",
      text: "&nbsp;&nbsp;arr[j] = arr[j+1]  // shift left",
    },
    { id: "d4", label: "", text: "n = n - 1" },
  ],
  searching: [
    {
      id: "s1",
      label: "LINEAR SEARCH(arr, target)",
      text: "for i from 0 to n-1",
    },
    { id: "s2", label: "", text: "&nbsp;&nbsp;if arr[i] == target" },
    {
      id: "s3",
      label: "",
      text: "&nbsp;&nbsp;&nbsp;&nbsp;return i  // found!",
    },
    { id: "s4", label: "", text: "return -1  // not found" },
  ],
};

/* 
   CODE TEMPLATES
*/
const CODE = {
  traversal: {
    cpp: `#include <iostream>
using namespace std;

void traverseArray(int arr[], int n) {
    cout << "Array elements: ";
    for (int i = 0; i < n; i++) {
        cout << "arr[" << i << "] = " << arr[i];
        if (i < n - 1) cout << ", ";
    }
    cout << "\\n";
}

int main() {
    int n;
    cout << "Enter array size: ";
    cin >> n;
    int arr[100];
    for (int i = 0; i < n; i++) {
        cout << "Enter element " << i << ": ";
        cin >> arr[i];
    }
    traverseArray(arr, n);
    cout << "Traversal done! Visited " << n << " elements. Time: O(N)\\n";
    return 0;
}`,
    python: `def traverse_array(arr):
    print("Array elements:")
    for i, val in enumerate(arr):
        print(f"  arr[{i}] = {val}")
    print(f"Traversal done! Visited {len(arr)} elements. Time: O(N)")

n = int(input("Enter array size: "))
arr = []
for i in range(n):
    val = int(input(f"Enter element {i}: "))
    arr.append(val)
traverse_array(arr)`,
    java: `import java.util.Scanner;

public class Main {
    static void traverseArray(int[] arr, int n) {
        System.out.println("Array elements:");
        for (int i = 0; i < n; i++) {
            System.out.println("  arr[" + i + "] = " + arr[i]);
        }
        System.out.println("Traversal done! Visited " + n + " elements. Time: O(N)");
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter array size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            System.out.print("Enter element " + i + ": ");
            arr[i] = sc.nextInt();
        }
        traverseArray(arr, n);
    }
}`,
    c: `#include <stdio.h>

void traverseArray(int arr[], int n) {
    printf("Array elements:\\n");
    for (int i = 0; i < n; i++) {
        printf("  arr[%d] = %d\\n", i, arr[i]);
    }
    printf("Traversal done! Visited %d elements. Time: O(N)\\n", n);
}

int main() {
    int n;
    printf("Enter array size: ");
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) {
        printf("Enter element %d: ", i);
        scanf("%d", &arr[i]);
    }
    traverseArray(arr, n);
    return 0;
}`,
    javascript: `function traverseArray(arr) {
    console.log("Array elements:");
    for (let i = 0; i < arr.length; i++) {
        console.log(\`  arr[\${i}] = \${arr[i]}\`);
    }
    console.log(\`Traversal done! Visited \${arr.length} elements. Time: O(N)\`);
}

// Demo
const arr = [10, 25, 38, 42, 55];
traverseArray(arr);`,
  },

  insertion: {
    cpp: `#include <iostream>
using namespace std;

void insertAt(int arr[], int &n, int idx, int val) {
    if (idx < 0 || idx > n) { cout << "Invalid index!\\n"; return; }
    // Shift elements right
    for (int j = n; j > idx; j--)
        arr[j] = arr[j - 1];
    arr[idx] = val;
    n++;
    cout << "Inserted " << val << " at index " << idx << ". Time: O(N)\\n";
}

void printArray(int arr[], int n) {
    cout << "Array: [";
    for (int i = 0; i < n; i++) cout << arr[i] << (i<n-1?", ":"");
    cout << "]\\n";
}

int main() {
    int arr[100] = {10, 25, 38, 55, 70};
    int n = 5;
    int idx, val;
    printArray(arr, n);
    cout << "Enter insert index: "; cin >> idx;
    cout << "Enter value: ";        cin >> val;
    insertAt(arr, n, idx, val);
    printArray(arr, n);
    return 0;
}`,
    python: `def insert_at(arr, idx, val):
    if idx < 0 or idx > len(arr):
        print("Invalid index!")
        return arr
    arr.insert(idx, val)
    print(f"Inserted {val} at index {idx}. Time: O(N)")
    return arr

arr = [10, 25, 38, 55, 70]
print(f"Before: {arr}")
idx = int(input("Enter insert index: "))
val = int(input("Enter value: "))
arr = insert_at(arr, idx, val)
print(f"After:  {arr}")`,
    java: `import java.util.*;

public class Main {
    static int[] insertAt(int[] arr, int n, int idx, int val) {
        int[] newArr = new int[n + 1];
        for (int i = 0; i < idx; i++) newArr[i] = arr[i];
        newArr[idx] = val;
        for (int i = idx; i < n; i++) newArr[i + 1] = arr[i];
        System.out.println("Inserted " + val + " at index " + idx + ". Time: O(N)");
        return newArr;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 25, 38, 55, 70}; int n = 5;
        System.out.println("Before: " + Arrays.toString(arr));
        System.out.print("Enter insert index: "); int idx = sc.nextInt();
        System.out.print("Enter value: ");        int val = sc.nextInt();
        arr = insertAt(arr, n, idx, val);
        System.out.println("After:  " + Arrays.toString(arr));
    }
}`,
    c: `#include <stdio.h>

void insertAt(int arr[], int *n, int idx, int val) {
    for (int j = *n; j > idx; j--)
        arr[j] = arr[j - 1];
    arr[idx] = val;
    (*n)++;
    printf("Inserted %d at index %d. Time: O(N)\\n", val, idx);
}

void printArr(int arr[], int n) {
    printf("Array: [");
    for (int i = 0; i < n; i++) printf("%d%s", arr[i], i<n-1?", ":"");
    printf("]\\n");
}

int main() {
    int arr[100] = {10, 25, 38, 55, 70}, n = 5, idx, val;
    printArr(arr, n);
    printf("Enter insert index: "); scanf("%d", &idx);
    printf("Enter value: ");        scanf("%d", &val);
    insertAt(arr, &n, idx, val);
    printArr(arr, n);
    return 0;
}`,
    javascript: `function insertAt(arr, idx, val) {
    if (idx < 0 || idx > arr.length) { console.log("Invalid index!"); return arr; }
    arr.splice(idx, 0, val);
    console.log(\`Inserted \${val} at index \${idx}. Time: O(N)\`);
    return arr;
}
let arr = [10, 25, 38, 55, 70];
console.log("Before:", arr.join(", "));
arr = insertAt(arr, 2, 30);
console.log("After: ", arr.join(", "));`,
  },

  deletion: {
    cpp: `#include <iostream>
using namespace std;

int deleteAt(int arr[], int &n, int idx) {
    if (idx < 0 || idx >= n) { cout << "Invalid index!\\n"; return -1; }
    int removed = arr[idx];
    // Shift elements left
    for (int j = idx; j < n - 1; j++)
        arr[j] = arr[j + 1];
    n--;
    cout << "Deleted " << removed << " from index " << idx << ". Time: O(N)\\n";
    return removed;
}

void printArray(int arr[], int n) {
    cout << "Array: [";
    for (int i = 0; i < n; i++) cout << arr[i] << (i<n-1?", ":"");
    cout << "]\\n";
}

int main() {
    int arr[100] = {10, 25, 38, 55, 70};
    int n = 5, idx;
    printArray(arr, n);
    cout << "Enter delete index: "; cin >> idx;
    deleteAt(arr, n, idx);
    printArray(arr, n);
    return 0;
}`,
    python: `def delete_at(arr, idx):
    if idx < 0 or idx >= len(arr):
        print("Invalid index!"); return arr
    removed = arr.pop(idx)
    print(f"Deleted {removed} from index {idx}. Time: O(N)")
    return arr

arr = [10, 25, 38, 55, 70]
print(f"Before: {arr}")
idx = int(input("Enter delete index: "))
arr = delete_at(arr, idx)
print(f"After:  {arr}")`,
    java: `import java.util.*;

public class Main {
    static int[] deleteAt(int[] arr, int n, int idx) {
        if (idx < 0 || idx >= n) { System.out.println("Invalid index!"); return arr; }
        System.out.println("Deleted " + arr[idx] + " from index " + idx + ". Time: O(N)");
        int[] newArr = new int[n - 1];
        for (int i = 0, j = 0; i < n; i++) if (i != idx) newArr[j++] = arr[i];
        return newArr;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 25, 38, 55, 70};
        System.out.println("Before: " + Arrays.toString(arr));
        System.out.print("Enter delete index: "); int idx = sc.nextInt();
        arr = deleteAt(arr, arr.length, idx);
        System.out.println("After:  " + Arrays.toString(arr));
    }
}`,
    c: `#include <stdio.h>

int deleteAt(int arr[], int *n, int idx) {
    if (idx < 0 || idx >= *n) { printf("Invalid index!\\n"); return -1; }
    int removed = arr[idx];
    for (int j = idx; j < *n - 1; j++) arr[j] = arr[j + 1];
    (*n)--;
    printf("Deleted %d from index %d. Time: O(N)\\n", removed, idx);
    return removed;
}

int main() {
    int arr[100] = {10, 25, 38, 55, 70}, n = 5, idx;
    printf("Before: "); for(int i=0;i<n;i++) printf("%d ", arr[i]); printf("\\n");
    printf("Enter delete index: "); scanf("%d", &idx);
    deleteAt(arr, &n, idx);
    printf("After:  "); for(int i=0;i<n;i++) printf("%d ", arr[i]); printf("\\n");
    return 0;
}`,
    javascript: `function deleteAt(arr, idx) {
    if (idx < 0 || idx >= arr.length) { console.log("Invalid index!"); return arr; }
    const removed = arr.splice(idx, 1)[0];
    console.log(\`Deleted \${removed} from index \${idx}. Time: O(N)\`);
    return arr;
}
let arr = [10, 25, 38, 55, 70];
console.log("Before:", arr.join(", "));
arr = deleteAt(arr, 2);
console.log("After: ", arr.join(", "));`,
  },

  searching: {
    cpp: `#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        cout << "Checking arr[" << i << "] = " << arr[i];
        if (arr[i] == target) {
            cout << "  ← FOUND!\\n";
            return i;
        }
        cout << "  ≠ " << target << "\\n";
    }
    return -1;  // not found
}

int main() {
    int arr[] = {10, 25, 38, 55, 70};
    int n = 5, target;
    cout << "Array: [10, 25, 38, 55, 70]\\n";
    cout << "Enter search target: ";
    cin >> target;
    int result = linearSearch(arr, n, target);
    if (result != -1)
        cout << "\\nFound " << target << " at index " << result << ". Time: O(N)\\n";
    else
        cout << "\\n" << target << " not found. Time: O(N)\\n";
    return 0;
}`,
    python: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        print(f"Checking arr[{i}] = {val}", end="")
        if val == target:
            print(f"  ← FOUND!")
            return i
        print(f"  ≠ {target}")
    return -1

arr = [10, 25, 38, 55, 70]
print(f"Array: {arr}")
target = int(input("Enter search target: "))
result = linear_search(arr, target)
if result != -1:
    print(f"\\nFound {target} at index {result}. Time: O(N)")
else:
    print(f"\\n{target} not found. Time: O(N)")`,
    java: `import java.util.Scanner;

public class Main {
    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print("Checking arr[" + i + "] = " + arr[i]);
            if (arr[i] == target) {
                System.out.println("  <- FOUND!");
                return i;
            }
            System.out.println("  != " + target);
        }
        return -1;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 25, 38, 55, 70};
        System.out.println("Array: [10, 25, 38, 55, 70]");
        System.out.print("Enter search target: ");
        int target = sc.nextInt();
        int result = linearSearch(arr, target);
        System.out.println(result != -1 ? "Found at index " + result : target + " not found");
    }
}`,
    c: `#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        printf("Checking arr[%d] = %d", i, arr[i]);
        if (arr[i] == target) { printf("  <- FOUND!\\n"); return i; }
        printf("  != %d\\n", target);
    }
    return -1;
}

int main() {
    int arr[] = {10, 25, 38, 55, 70}, n = 5, target;
    printf("Array: [10, 25, 38, 55, 70]\\n");
    printf("Enter search target: ");
    scanf("%d", &target);
    int r = linearSearch(arr, n, target);
    r != -1 ? printf("Found at index %d\\n", r) : printf("%d not found\\n", target);
    return 0;
}`,
    javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        process.stdout && process.stdout.write(\`Checking arr[\${i}] = \${arr[i]}\`);
        if (arr[i] === target) {
            console.log(\`  <- FOUND!\`);
            return i;
        }
        console.log(\`  != \${target}\`);
    }
    return -1;
}
const arr = [10, 25, 38, 55, 70];
console.log("Array:", arr.join(", "));
const target = 38;
const result = linearSearch(arr, target);
console.log(result !== -1 ? \`Found at index \${result}\` : \`\${target} not found\`);`,
  },
};

/* 
   ARRAY RENDERING HELPERS
 */
function renderArrayInto(arr, rowId, idxId, ptrId, pointers) {
  const rowEl = document.getElementById(rowId);
  const idxEl = document.getElementById(idxId);
  const ptrEl = ptrId ? document.getElementById(ptrId) : null;
  if (!rowEl || !idxEl) return;

  rowEl.innerHTML = "";
  idxEl.innerHTML = "";
  if (ptrEl) ptrEl.innerHTML = "";

  arr.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.className = "array-cell";
    cell.id = `cell-${rowId}-${i}`;
    cell.textContent = val === null ? "—" : val;
    if (val === null) cell.classList.add("empty-cell");
    rowEl.appendChild(cell);

    const ic = document.createElement("div");
    ic.className = "index-cell";
    ic.textContent = i;
    idxEl.appendChild(ic);

    if (ptrEl) {
      const pc = document.createElement("div");
      pc.className = "array-pointer";
      pc.id = `ptr-${rowId}-${i}`;
      const p = pointers && pointers[i];
      if (p) {
        pc.textContent = p.label;
        pc.classList.add(p.cls || "ptr-i");
      }
      ptrEl.appendChild(pc);
    }
  });
}

function highlightCell(rowId, idx, cls) {
  const cell = document.getElementById(`cell-${rowId}-${idx}`);
  if (cell) {
    cell.className = "array-cell " + cls;
  }
}

function clearHighlights(rowId, len) {
  for (let i = 0; i < len; i++) {
    const cell = document.getElementById(`cell-${rowId}-${i}`);
    if (cell) cell.className = "array-cell";
  }
}

function setPointer(rowId, idx, label, cls) {
  const old = document.querySelectorAll(`[id^="ptr-${rowId}-"]`);
  old.forEach((p) => (p.textContent = ""));
  const pc = document.getElementById(`ptr-${rowId}-${idx}`);
  if (pc) {
    pc.textContent = label;
    pc.className = "array-pointer " + (cls || "ptr-i");
  }
}

function setCaption(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function highlightPseudo(stepId) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.getElementById("pseudo-" + stepId);
  if (el) el.classList.add("active");
}

/* 
   OPERATION SWITCHER (top selector)
 */
function switchOperation(op) {
  currentOp = op;
  document
    .querySelectorAll(".op-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-op="${op}"]`).classList.add("active");

  const titles = {
    traversal: "Array Visualizer — Traversal",
    insertion: "Array Visualizer — Insertion",
    deletion: "Array Visualizer — Deletion",
    searching: "Array Visualizer — Searching (Linear Search)",
  };
  document.getElementById("visualizer-title").textContent = titles[op];

  // Rebuild pseudo code
  const pContainer = document.getElementById("pseudo-steps");
  pContainer.innerHTML = "";
  PSEUDOS[op].forEach((step) => {
    const d = document.createElement("div");
    d.className = "pseudo-step";
    d.id = "pseudo-" + step.id;
    d.innerHTML =
      (step.label ? `<strong>${step.label}:</strong><br>` : "") + step.text;
    pContainer.appendChild(d);
  });

  // Rebuild controls & reset main array
  buildMainControls(op);
  initMainArray(op);
}

const MAIN_ARR = [10, 25, 38, 55, 70];
let mainArr = [...MAIN_ARR];
let mainAnimating = false;

function initMainArray(op) {
  mainArr = [...MAIN_ARR];
  renderArrayInto(
    mainArr,
    "mainArrayRow",
    "mainIndexRow",
    "mainPointerRow",
    [],
  );
  setCaption("mainCaption", "Click an operation button below to start.");
  document.getElementById("msg_show").style.display = "none";
}

function buildMainControls(op) {
  const footer = document.getElementById("mainControls");
  const controls = {
    traversal: `
      <button class="btn btn-primary" onclick="mainTraverse()">▶ Traverse</button>
      <button class="btn btn-info"    onclick="resetMainArr()" style="margin-left:10px;">↺ Reset</button>`,
    insertion: `
      <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:12px;margin-bottom:12px;">
        <input type="number" id="main-val" class="form-control" placeholder="Value to insert">
        <input type="number" id="main-idx" class="form-control" placeholder="Index (0–${MAIN_ARR.length})">
        <button class="btn btn-success" onclick="mainInsert()">➕ Insert</button>
      </div>
      <button class="btn btn-info" onclick="resetMainArr()">↺ Reset</button>`,
    deletion: `
      <div style="display:grid;grid-template-columns:1fr auto;gap:12px;margin-bottom:12px;">
        <input type="number" id="main-del-idx" class="form-control" placeholder="Index to delete (0–${MAIN_ARR.length - 1})">
        <button class="btn btn-danger" onclick="mainDelete()">🗑 Delete</button>
      </div>
      <button class="btn btn-info" onclick="resetMainArr()">↺ Reset</button>`,
    searching: `
      <div style="display:grid;grid-template-columns:1fr auto;gap:12px;margin-bottom:12px;">
        <input type="number" id="main-search-val" class="form-control" placeholder="Value to search">
        <button class="btn btn-warning" onclick="mainSearch()">🔍 Search</button>
      </div>
      <button class="btn btn-info" onclick="resetMainArr()">↺ Reset</button>`,
  };
  footer.innerHTML = controls[op];
}

function resetMainArr() {
  mainAnimating = false;
  initMainArray(currentOp);
}

/* MAIN TRAVERSAL */
async function mainTraverse() {
  if (mainAnimating) return;
  mainAnimating = true;
  clearHighlights("mainArrayRow", mainArr.length);
  setCaption("mainCaption", "Starting traversal from index 0...");
  highlightPseudo("t1");
  await sleep(500);
  for (let i = 0; i < mainArr.length; i++) {
    highlightPseudo("t2");
    highlightCell("mainArrayRow", i, "highlight-traverse");
    setPointer("mainArrayRow", i, "↑ i=" + i, "ptr-i");
    setCaption(
      "mainCaption",
      `<span>arr[${i}]</span> = ${mainArr[i]} — visiting element at index ${i}`,
    );
    await sleep(700);
    if (i > 0) highlightCell("mainArrayRow", i - 1, "");
  }
  highlightPseudo("t3");
  setCaption(
    "mainCaption",
    `✅ Traversal complete! Visited <span>${mainArr.length}</span> elements. Time: O(N)`,
  );
  mainAnimating = false;
}

/* MAIN INSERTION */
async function mainInsert() {
  if (mainAnimating) return;
  const val = parseInt(document.getElementById("main-val").value);
  const idx = parseInt(document.getElementById("main-idx").value);
  if (isNaN(val) || isNaN(idx) || idx < 0 || idx > mainArr.length) {
    setCaption(
      "mainCaption",
      "⚠ Enter a valid value and index (0 to " + mainArr.length + ")",
    );
    return;
  }
  mainAnimating = true;
  highlightPseudo("i1");
  setCaption(
    "mainCaption",
    `Shifting elements right from index <span>${idx}</span> to make room...`,
  );
  await sleep(500);

  // Animate shifts
  for (let j = mainArr.length - 1; j >= idx; j--) {
    highlightPseudo("i2");
    highlightCell("mainArrayRow", j, "highlight-delete");
    setCaption("mainCaption", `Shifting arr[${j}] → arr[${j + 1}]`);
    await sleep(350);
    highlightCell("mainArrayRow", j, "");
  }

  mainArr.splice(idx, 0, val);
  renderArrayInto(
    mainArr,
    "mainArrayRow",
    "mainIndexRow",
    "mainPointerRow",
    [],
  );
  highlightPseudo("i3");
  highlightCell("mainArrayRow", idx, "highlight-insert");
  setCaption(
    "mainCaption",
    `✅ Inserted <span>${val}</span> at index <span>${idx}</span>. Time: O(N) — shifted ${mainArr.length - 1 - idx} elements.`,
  );
  await sleep(600);
  highlightPseudo("i4");
  mainAnimating = false;
}

/* MAIN DELETION */
async function mainDelete() {
  if (mainAnimating) return;
  const idx = parseInt(document.getElementById("main-del-idx").value);
  if (isNaN(idx) || idx < 0 || idx >= mainArr.length) {
    setCaption(
      "mainCaption",
      "⚠ Enter a valid index (0 to " + (mainArr.length - 1) + ")",
    );
    return;
  }
  mainAnimating = true;
  const removed = mainArr[idx];
  highlightPseudo("d1");
  highlightCell("mainArrayRow", idx, "highlight-delete");
  setCaption(
    "mainCaption",
    `Marked <span>arr[${idx}] = ${removed}</span> for deletion...`,
  );
  await sleep(700);

  for (let j = idx; j < mainArr.length - 1; j++) {
    highlightPseudo("d3");
    highlightCell("mainArrayRow", j + 1, "highlight-traverse");
    setCaption("mainCaption", `Shifting arr[${j + 1}] → arr[${j}]`);
    await sleep(350);
    highlightCell("mainArrayRow", j + 1, "");
  }

  mainArr.splice(idx, 1);
  renderArrayInto(
    mainArr,
    "mainArrayRow",
    "mainIndexRow",
    "mainPointerRow",
    [],
  );
  highlightPseudo("d4");
  setCaption(
    "mainCaption",
    `✅ Deleted <span>${removed}</span> from index <span>${idx}</span>. Time: O(N) — shifted ${mainArr.length - idx} elements left.`,
  );
  mainAnimating = false;
}

/* MAIN SEARCHING */
async function mainSearch() {
  if (mainAnimating) return;
  const target = parseInt(document.getElementById("main-search-val").value);
  if (isNaN(target)) {
    setCaption("mainCaption", "⚠ Enter a value to search");
    return;
  }
  mainAnimating = true;
  clearHighlights("mainArrayRow", mainArr.length);
  setCaption(
    "mainCaption",
    `Searching for <span>${target}</span> using linear search...`,
  );
  highlightPseudo("s1");
  await sleep(500);

  let found = false;
  for (let i = 0; i < mainArr.length; i++) {
    highlightPseudo("s2");
    highlightCell("mainArrayRow", i, "highlight-traverse");
    setPointer("mainArrayRow", i, "↑ i=" + i, "ptr-i");
    setCaption(
      "mainCaption",
      `Comparing <span>arr[${i}] = ${mainArr[i]}</span> with target <span>${target}</span>...`,
    );
    await sleep(650);

    if (mainArr[i] === target) {
      highlightPseudo("s3");
      highlightCell("mainArrayRow", i, "highlight-found");
      setPointer("mainArrayRow", i, "✓ found", "ptr-found");
      setCaption(
        "mainCaption",
        `✅ Found <span>${target}</span> at index <span>${i}</span>! Comparisons: ${i + 1}. Time: O(N)`,
      );
      found = true;
      break;
    }
    if (i > 0) highlightCell("mainArrayRow", i - 1, "");
  }

  if (!found) {
    highlightPseudo("s4");
    setCaption(
      "mainCaption",
      `❌ <span>${target}</span> not found. Made ${mainArr.length} comparisons. Time: O(N) worst case.`,
    );
  }
  mainAnimating = false;
}

/*
   SCENARIO TABS
 */
const TAB_ACTIVE = {
  best: "active-best",
  avg: "active-avg",
  worst: "active-worst",
  custom: "active-custom",
};
function switchScenario(name) {
  document
    .querySelectorAll(".scenario-tab")
    .forEach((t) => (t.className = "scenario-tab"));
  document.getElementById("stab-" + name).classList.add(TAB_ACTIVE[name]);
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}

/*
   BEST CASE SCENARIO — O(1) direct access at index 0
*/
const BEST_ARR = [42, 17, 63, 28, 51];

function initBest() {
  renderArrayInto(BEST_ARR, "best-arr-row", "best-idx-row", "best-ptr-row", []);
  setCaption("best-caption", "Access arr[0] instantly — no traversal needed.");
  const log = document.getElementById("log-best");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-best", `Array: [${BEST_ARR.join(", ")}]`, "log-info");
  addLog("log-best", "Best case: O(1) — access by index", "log-info");
}

function bestAccess() {
  clearHighlights("best-arr-row", BEST_ARR.length);
  highlightCell("best-arr-row", 0, "highlight-found");
  setPointer("best-ptr-row", 0, "↑ O(1)", "ptr-found");
  setCaption(
    "best-caption",
    `<span>arr[0] = ${BEST_ARR[0]}</span> — Direct access! No loop, no traversal. Constant time.`,
  );
  addLog(
    "log-best",
    `arr[0] = ${BEST_ARR[0]}  →  accessed in O(1)`,
    "log-found",
  );
  addLog("log-best", "✓ Best Case: O(1) time  |  O(1) space", "log-result");
}

function bestSearch() {
  clearHighlights("best-arr-row", BEST_ARR.length);
  highlightCell("best-arr-row", 0, "highlight-found");
  setPointer("best-ptr-row", 0, "✓ found", "ptr-found");
  setCaption(
    "best-caption",
    `Searching for <span>${BEST_ARR[0]}</span> — found at index <span>0</span> in the very first comparison!`,
  );
  addLog(
    "log-best",
    `search(${BEST_ARR[0]})  →  found at index 0`,
    "log-found",
  );
  addLog("log-best", "✓ Best Case: 1 comparison = O(1)", "log-result");
}

function resetBest() {
  initBest();
  addLog("log-best", "↺ Reset.", "log-info");
}

/* 
   AVERAGE CASE — linear search, target in middle
*/
const AVG_ARR = [10, 20, 35, 48, 57, 62];
const AVG_TARGET = 35; // index 2 — middle
let avgIdx = 0,
  avgDone = false,
  avgAutoTimer = null;

function initAvg() {
  avgIdx = 0;
  avgDone = false;
  clearTimeout(avgAutoTimer);
  renderArrayInto(AVG_ARR, "avg-arr-row", "avg-idx-row", "avg-ptr-row", []);
  setCaption(
    "avg-caption",
    `Searching for ${AVG_TARGET}. Press "Next Step" to compare one element at a time.`,
  );
  const log = document.getElementById("log-avg");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-avg", `Array: [${AVG_ARR.join(", ")}]`, "log-info");
  addLog(
    "log-avg",
    `Target: ${AVG_TARGET}  (at index ${AVG_ARR.indexOf(AVG_TARGET)})`,
    "log-info",
  );
  addLog(
    "log-avg",
    `Expected ~${Math.ceil(AVG_ARR.length / 2)} comparisons (N/2 average)`,
    "log-info",
  );
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
}

function avgStep() {
  if (avgDone || avgIdx >= AVG_ARR.length) return;
  const val = AVG_ARR[avgIdx];
  clearHighlights("avg-arr-row", AVG_ARR.length);
  // Re-highlight already-visited as faded
  for (let k = 0; k < avgIdx; k++)
    highlightCell("avg-arr-row", k, "highlight-delete");
  highlightCell("avg-arr-row", avgIdx, "highlight-traverse");
  setPointer("avg-ptr-row", avgIdx, "↑ i=" + avgIdx, "ptr-i");

  if (val === AVG_TARGET) {
    highlightCell("avg-arr-row", avgIdx, "highlight-found");
    setPointer("avg-ptr-row", avgIdx, "✓ found", "ptr-found");
    setCaption(
      "avg-caption",
      `✅ Found <span>${AVG_TARGET}</span> at index <span>${avgIdx}</span>! Made ${avgIdx + 1} comparisons ≈ N/2.`,
    );
    addLog("log-avg", `arr[${avgIdx}] = ${val}  ← FOUND! 🎉`, "log-found");
    addLog(
      "log-avg",
      `Comparisons: ${avgIdx + 1}  (N=${AVG_ARR.length}, N/2=${Math.ceil(AVG_ARR.length / 2)})`,
      "log-result",
    );
    addLog("log-avg", "✓ Average Case: O(N/2) = O(N)", "log-result");
    avgDone = true;
    document.getElementById("avg-step-btn").disabled = true;
    document.getElementById("avg-auto-btn").disabled = true;
    clearTimeout(avgAutoTimer);
  } else {
    setCaption(
      "avg-caption",
      `<span>arr[${avgIdx}] = ${val}</span> ≠ ${AVG_TARGET} — keep searching...`,
    );
    addLog(
      "log-avg",
      `arr[${avgIdx}] = ${val}  ≠  ${AVG_TARGET}`,
      "log-search",
    );
  }
  avgIdx++;
}

function avgAuto() {
  if (avgDone || avgIdx >= AVG_ARR.length) return;
  document.getElementById("avg-auto-btn").disabled = true;
  function doStep() {
    if (avgDone || avgIdx >= AVG_ARR.length) return;
    avgStep();
    avgAutoTimer = setTimeout(doStep, 800);
  }
  doStep();
}

function resetAvg() {
  clearTimeout(avgAutoTimer);
  initAvg();
}

/* 
   WORST CASE — target not present, all N comparisons
*/
const WORST_ARR = [10, 20, 30, 40, 50, 60, 70];
const WORST_TARGET = 99;
let worstIdx = 0,
  worstDone = false,
  worstAutoTimer = null;

function initWorst() {
  worstIdx = 0;
  worstDone = false;
  clearTimeout(worstAutoTimer);
  renderArrayInto(
    WORST_ARR,
    "worst-arr-row",
    "worst-idx-row",
    "worst-ptr-row",
    [],
  );
  setCaption(
    "worst-caption",
    `Searching for ${WORST_TARGET} (not present). Must check all ${WORST_ARR.length} elements.`,
  );
  const log = document.getElementById("log-worst");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-worst", `Array: [${WORST_ARR.join(", ")}]`, "log-info");
  addLog("log-worst", `Target: ${WORST_TARGET}  (NOT IN ARRAY)`, "log-warn");
  addLog(
    "log-worst",
    `Must compare all ${WORST_ARR.length} elements → O(N)`,
    "log-warn",
  );
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
}

function worstStep() {
  if (worstDone || worstIdx >= WORST_ARR.length) return;
  const val = WORST_ARR[worstIdx];
  for (let k = 0; k <= worstIdx; k++)
    highlightCell("worst-arr-row", k, "highlight-delete");
  setPointer("worst-ptr-row", worstIdx, "↑ i=" + worstIdx, "ptr-i");
  setCaption(
    "worst-caption",
    `<span>arr[${worstIdx}] = ${val}</span> ≠ ${WORST_TARGET} — not here...`,
  );
  addLog(
    "log-worst",
    `arr[${worstIdx}] = ${val}  ≠  ${WORST_TARGET}`,
    "log-delete",
  );
  worstIdx++;
  if (worstIdx === WORST_ARR.length) {
    worstDone = true;
    setTimeout(() => {
      setCaption(
        "worst-caption",
        `❌ ${WORST_TARGET} not found after <span>${WORST_ARR.length} comparisons</span> = N. Worst Case: O(N).`,
      );
      addLog(
        "log-worst",
        `All ${WORST_ARR.length} elements checked — not found ❌`,
        "log-warn",
      );
      addLog(
        "log-worst",
        `✓ Worst Case: O(N) — N comparisons total`,
        "log-result",
      );
    }, 300);
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
    clearTimeout(worstAutoTimer);
  }
}

function worstAuto() {
  if (worstDone || worstIdx >= WORST_ARR.length) return;
  document.getElementById("worst-auto-btn").disabled = true;
  function doStep() {
    if (worstDone || worstIdx >= WORST_ARR.length) return;
    worstStep();
    worstAutoTimer = setTimeout(doStep, 600);
  }
  doStep();
}

function resetWorst() {
  clearTimeout(worstAutoTimer);
  initWorst();
}

/* 
   CUSTOM SCENARIO
 */
let customArr = [15, 32, 47, 61];
const MAX_CUSTOM = 8;
let customAnimating = false;

function initCustom() {
  renderArrayInto(
    customArr,
    "custom-arr-row",
    "custom-idx-row",
    "custom-ptr-row",
    [],
  );
  setCaption(
    "custom-caption",
    "Use the controls to Insert, Delete, Traverse, or Search!",
  );
  const log = document.getElementById("log-custom");
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  addLog("log-custom", `Starting array: [${customArr.join(", ")}]`, "log-info");
}

let ccTimer = null;
function highlightCC(type) {
  ["traverse", "insert", "delete", "search"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c)
      c.classList.remove(
        "cc-active-traverse",
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
  const toast = document.getElementById("cc-toast");
  toast.className = "cc-toast show toast-" + type;
  document.getElementById("cc-toast-icon").textContent =
    { traverse: "🔄", insert: "➕", delete: "🗑", search: "🔍", warn: "⚠" }[
      type
    ] || "⚡";
  document.getElementById("cc-toast-text").textContent = msg;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => (toast.className = "cc-toast"), 2400);
}

async function customInsert() {
  if (customAnimating) return;
  const val = parseInt(document.getElementById("custom-val").value);
  const idx = parseInt(document.getElementById("custom-idx").value);
  if (isNaN(val)) {
    showToast("warn", "Enter a valid value!");
    addLog("log-custom", "Enter a valid value!", "log-warn");
    return;
  }
  const insertIdx = isNaN(idx)
    ? customArr.length
    : Math.max(0, Math.min(idx, customArr.length));
  if (customArr.length >= MAX_CUSTOM) {
    showToast("warn", "Array full! (max 8)");
    addLog("log-custom", "Array full!", "log-warn");
    return;
  }
  customAnimating = true;
  customArr.splice(insertIdx, 0, val);
  renderArrayInto(
    customArr,
    "custom-arr-row",
    "custom-idx-row",
    "custom-ptr-row",
    [],
  );
  highlightCell("custom-arr-row", insertIdx, "highlight-insert");
  setCaption(
    "custom-caption",
    `Inserted <span>${val}</span> at index <span>${insertIdx}</span>. Elements after shifted right.`,
  );
  highlightCC("insert");
  showToast("insert", `insert(${val}, idx=${insertIdx})  →  O(N)`);
  addLog(
    "log-custom",
    `insertAt(${insertIdx}, ${val})  →  array now [${customArr.join(", ")}]`,
    "log-insert",
  );
  addLog("log-custom", "✓ Time: O(N) — shifted elements right", "log-result");
  customAnimating = false;
}

async function customDelete() {
  if (customAnimating || !customArr.length) {
    showToast("warn", "Array is empty!");
    return;
  }
  const idx = parseInt(document.getElementById("custom-idx").value);
  const delIdx = isNaN(idx)
    ? customArr.length - 1
    : Math.max(0, Math.min(idx, customArr.length - 1));
  customAnimating = true;
  const removed = customArr[delIdx];
  clearHighlights("custom-arr-row", customArr.length);
  highlightCell("custom-arr-row", delIdx, "highlight-delete");
  setCaption(
    "custom-caption",
    `Deleting <span>${removed}</span> at index <span>${delIdx}</span>. Elements after will shift left.`,
  );
  await sleep(500);
  customArr.splice(delIdx, 1);
  renderArrayInto(
    customArr,
    "custom-arr-row",
    "custom-idx-row",
    "custom-ptr-row",
    [],
  );
  setCaption(
    "custom-caption",
    `Deleted <span>${removed}</span>. Array is now [${customArr.join(", ")}].`,
  );
  highlightCC("delete");
  showToast("delete", `delete(idx=${delIdx})  →  O(N)`);
  addLog(
    "log-custom",
    `deleteAt(${delIdx})  removed ${removed}  →  [${customArr.join(", ")}]`,
    "log-delete",
  );
  addLog("log-custom", "✓ Time: O(N) — shifted elements left", "log-result");
  customAnimating = false;
}

async function customTraverse() {
  if (customAnimating || !customArr.length) {
    showToast("warn", "Array is empty!");
    return;
  }
  customAnimating = true;
  clearHighlights("custom-arr-row", customArr.length);
  for (let i = 0; i < customArr.length; i++) {
    highlightCell("custom-arr-row", i, "highlight-traverse");
    setPointer("custom-ptr-row", i, "↑", "ptr-i");
    setCaption(
      "custom-caption",
      `Visiting <span>arr[${i}] = ${customArr[i]}</span>`,
    );
    await sleep(500);
    if (i > 0) highlightCell("custom-arr-row", i - 1, "");
  }
  setCaption(
    "custom-caption",
    `✅ Traversal complete! Visited <span>${customArr.length}</span> elements. Time: O(N).`,
  );
  highlightCC("traverse");
  showToast("traverse", `traverse()  →  O(N)`);
  addLog(
    "log-custom",
    `traverse() visited ${customArr.length} elements`,
    "log-traverse",
  );
  addLog("log-custom", "✓ Time: O(N)  |  Space: O(1)", "log-result");
  customAnimating = false;
}

async function customSearch() {
  if (customAnimating || !customArr.length) {
    showToast("warn", "Array is empty!");
    return;
  }
  const val = parseInt(document.getElementById("custom-val").value);
  if (isNaN(val)) {
    showToast("warn", "Enter value to search!");
    return;
  }
  customAnimating = true;
  clearHighlights("custom-arr-row", customArr.length);
  setCaption("custom-caption", `Searching for <span>${val}</span>...`);
  let found = false;
  for (let i = 0; i < customArr.length; i++) {
    highlightCell("custom-arr-row", i, "highlight-traverse");
    setPointer("custom-ptr-row", i, "↑ i=" + i, "ptr-i");
    setCaption(
      "custom-caption",
      `Comparing <span>arr[${i}] = ${customArr[i]}</span> with <span>${val}</span>...`,
    );
    await sleep(500);
    if (customArr[i] === val) {
      highlightCell("custom-arr-row", i, "highlight-found");
      setPointer("custom-ptr-row", i, "✓", "ptr-found");
      setCaption(
        "custom-caption",
        `✅ Found <span>${val}</span> at index <span>${i}</span>! Took ${i + 1} comparison(s).`,
      );
      highlightCC("search");
      showToast("search", `search(${val})  found at [${i}]  →  O(N)`);
      addLog(
        "log-custom",
        `search(${val})  →  found at index ${i} after ${i + 1} comparisons`,
        "log-found",
      );
      addLog("log-custom", "✓ Time: O(N)  |  Space: O(1)", "log-result");
      found = true;
      break;
    }
    if (i > 0) highlightCell("custom-arr-row", i - 1, "");
  }
  if (!found) {
    setCaption(
      "custom-caption",
      `❌ <span>${val}</span> not found. Checked all ${customArr.length} elements.`,
    );
    addLog(
      "log-custom",
      `search(${val})  →  not found after ${customArr.length} comparisons`,
      "log-warn",
    );
  }
  customAnimating = false;
}

function resetCustom() {
  customAnimating = false;
  customArr = [15, 32, 47, 61];
  ["traverse", "insert", "delete", "search"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c)
      c.classList.remove(
        "cc-active-traverse",
        "cc-active-insert",
        "cc-active-delete",
        "cc-active-search",
      );
  });
  const toast = document.getElementById("cc-toast");
  if (toast) toast.className = "cc-toast";
  initCustom();
  addLog("log-custom", "↺ Reset to [15, 32, 47, 61]", "log-info");
}

// enter key support
document.addEventListener("DOMContentLoaded", () => {
  const cv = document.getElementById("custom-val");
  const ci = document.getElementById("custom-idx");
  if (cv)
    cv.addEventListener("keydown", (e) => {
      if (e.key === "Enter") customInsert();
    });
});

/* 
   CODE EDITOR
*/
function switchCodeOp(op) {
  currentCodeOp = op;
  // Update button styles
  ["traversal", "insertion", "deletion", "searching"].forEach((o) => {
    const btn = document.getElementById("code-op-" + o);
    if (btn) btn.style.opacity = o === op ? "1" : "0.55";
  });
  if (codeEditor)
    codeEditor.setValue(CODE[op][currentLang] || "// Code not available");
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
  codeEditor.setValue(CODE.traversal.cpp);
}

function switchLang(lang, tabBtn) {
  const parent = tabBtn.parentElement;
  parent
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  tabBtn.classList.add("active");
  const modeMap = {
    cpp: "text/x-c++src",
    python: "text/x-python",
    java: "text/x-java",
    c: "text/x-csrc",
    javascript: "text/javascript",
  };
  const langNames = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    c: "C",
    javascript: "JavaScript",
  };
  currentLang = lang;
  document.querySelector(".lang-display").textContent = langNames[lang];
  codeEditor.setOption("mode", modeMap[lang]);
  codeEditor.setValue(
    CODE[currentCodeOp][lang] ||
      `// ${langNames[lang]} code for ${currentCodeOp} coming soon`,
  );
}

document.querySelectorAll(".lang-tab").forEach((btn) => {
  btn.onclick = () => switchLang(btn.dataset.lang, btn);
});

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

/*
   INTERACTIVE CODE RUNNER (simulated)
 */
async function getInput(prompt) {
  return new Promise((resolve) => {
    const promptDiv = document.getElementById("inputPrompt");
    document.getElementById("promptText").textContent = prompt;
    document.getElementById("userInput").value = "";
    promptDiv.style.display = "block";
    document.getElementById("userInput").focus();
    currentInputResolver = resolve;
    waitingForInput = true;
  });
}

function submitInput() {
  const val = document.getElementById("userInput").value.trim();
  if (val && currentInputResolver) {
    document.getElementById("inputPrompt").style.display = "none";
    waitingForInput = false;
    currentInputResolver(val);
    currentInputResolver = null;
  }
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitInput();
});

async function runInteractiveCode() {
  outputDiv = document.getElementById("codeOutput");
  outputDiv.innerHTML =
    '<span style="color:#fbbf24;">🔄 Executing...</span><br><br>';
  const opNames = {
    traversal: "Traversal",
    insertion: "Insertion",
    deletion: "Deletion",
    searching: "Searching (Linear Search)",
  };
  outputDiv.innerHTML += `<span style="color:#06b6d4;">Array ${opNames[currentCodeOp]} — ${currentLang === "javascript" ? "JavaScript" : currentLang.toUpperCase()}</span><br><br>`;
  try {
    await runOpSim(currentCodeOp);
  } catch (e) {
    outputDiv.innerHTML += `<br><span style="color:#ef4444;">Error: ${e.message}</span>`;
  }
}

async function runOpSim(op) {
  const out = (txt, color) => {
    outputDiv.innerHTML += `<span style="color:${color || "#a0a0a0"}">${txt}</span><br>`;
  };
  if (op === "traversal") {
    const n = await getInput("Enter array size: ");
    out("Enter array size: " + n);
    const arr = [];
    for (let i = 0; i < parseInt(n); i++) {
      const v = await getInput(`Enter element ${i}: `);
      arr.push(parseInt(v));
      out(`Enter element ${i}: ` + v);
    }
    out("Array elements:", "#06b6d4");
    arr.forEach((v, i) => {
      out(`  arr[${i}] = ${v}`, "#10b981");
    });
    out(
      `Traversal done! Visited ${arr.length} elements. Time: O(N)`,
      "#10b981",
    );
  } else if (op === "insertion") {
    const arr = [10, 25, 38, 55, 70];
    out("Before: [" + arr.join(", ") + "]", "#06b6d4");
    const idx = await getInput("Enter insert index (0-5): ");
    const val = await getInput("Enter value: ");
    const i = Math.max(0, Math.min(parseInt(idx), arr.length));
    arr.splice(i, 0, parseInt(val));
    out(`Inserted ${val} at index ${idx}. Time: O(N)`, "#10b981");
    out("After:  [" + arr.join(", ") + "]", "#10b981");
  } else if (op === "deletion") {
    const arr = [10, 25, 38, 55, 70];
    out("Before: [" + arr.join(", ") + "]", "#06b6d4");
    const idx = await getInput("Enter delete index (0-4): ");
    const i = Math.max(0, Math.min(parseInt(idx), arr.length - 1));
    const removed = arr.splice(i, 1)[0];
    out(`Deleted ${removed} from index ${idx}. Time: O(N)`, "#ef4444");
    out("After:  [" + arr.join(", ") + "]", "#10b981");
  } else if (op === "searching") {
    const arr = [10, 25, 38, 55, 70];
    out("Array: [" + arr.join(", ") + "]", "#06b6d4");
    const target = parseInt(await getInput("Enter search target: "));
    out(`Searching for ${target}...`, "#f59e0b");
    let found = false;
    for (let i = 0; i < arr.length; i++) {
      await sleep(200);
      if (arr[i] === target) {
        out(`  arr[${i}] = ${arr[i]}  ← FOUND! 🎉`, "#10b981");
        out(`\nFound ${target} at index ${i}. Time: O(N)`, "#10b981");
        found = true;
        break;
      } else {
        out(`  arr[${i}] = ${arr[i]}  ≠ ${target}`, "#a0a0a0");
      }
    }
    if (!found) out(`\n${target} not found. Time: O(N) worst case.`, "#ef4444");
  }
}

/*
   THEME
*/
document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const cur = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(cur) + 1) % 3];
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
  codeEditor.setOption("theme", getCMTheme(next));
};

const ALGO_KEY = document.title
  .split(" - ")[0]
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "_");
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

window.onload = () => {
  const saved = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", saved);
  initEditor();
  switchOperation("traversal");
  initBest();
  initAvg();
  initWorst();
  initCustom();
  switchCodeOp("traversal");
};
