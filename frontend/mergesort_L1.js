const codeData = {
  iterative: {
    cpp: `void merge(int arr[], int left, int mid, int right) {\n    int n1 = mid - left + 1, n2 = right - mid;\n    vector<int> L(arr+left, arr+left+n1);\n    vector<int> R(arr+mid+1, arr+mid+1+n2);\n    int i = 0, j = 0, k = left;\n    while (i < n1 && j < n2)\n        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int left, int right) {\n    if (left >= right) return;\n    int mid = left + (right - left) / 2;\n    mergeSort(arr, left, mid);\n    mergeSort(arr, mid + 1, right);\n    merge(arr, left, mid, right);\n}`,
    python: `def merge(arr, left, mid, right):\n    L = arr[left:mid+1]\n    R = arr[mid+1:right+1]\n    i = j = 0\n    k = left\n    while i < len(L) and j < len(R):\n        if L[i] <= R[j]:\n            arr[k] = L[i]; i += 1\n        else:\n            arr[k] = R[j]; j += 1\n        k += 1\n    while i < len(L):\n        arr[k] = L[i]; i += 1; k += 1\n    while j < len(R):\n        arr[k] = R[j]; j += 1; k += 1\n\ndef merge_sort(arr, left, right):\n    if left >= right:\n        return\n    mid = (left + right) // 2\n    merge_sort(arr, left, mid)\n    merge_sort(arr, mid + 1, right)\n    merge(arr, left, mid, right)`,
    java: `static void merge(int[] arr, int left, int mid, int right) {\n    int n1 = mid - left + 1, n2 = right - mid;\n    int[] L = Arrays.copyOfRange(arr, left, left + n1);\n    int[] R = Arrays.copyOfRange(arr, mid + 1, mid + 1 + n2);\n    int i = 0, j = 0, k = left;\n    while (i < n1 && j < n2)\n        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n\nstatic void mergeSort(int[] arr, int left, int right) {\n    if (left >= right) return;\n    int mid = left + (right - left) / 2;\n    mergeSort(arr, left, mid);\n    mergeSort(arr, mid + 1, right);\n    merge(arr, left, mid, right);\n}`,
    c: `void merge(int arr[], int left, int mid, int right) {\n    int n1 = mid-left+1, n2 = right-mid;\n    int L[n1], R[n2];\n    for (int i=0;i<n1;i++) L[i]=arr[left+i];\n    for (int j=0;j<n2;j++) R[j]=arr[mid+1+j];\n    int i=0,j=0,k=left;\n    while (i<n1&&j<n2)\n        arr[k++]=(L[i]<=R[j])?L[i++]:R[j++];\n    while (i<n1) arr[k++]=L[i++];\n    while (j<n2) arr[k++]=R[j++];\n}\n\nvoid mergeSort(int arr[], int left, int right) {\n    if (left>=right) return;\n    int mid=left+(right-left)/2;\n    mergeSort(arr,left,mid);\n    mergeSort(arr,mid+1,right);\n    merge(arr,left,mid,right);\n}`,
    javascript: `function merge(arr, left, mid, right) {\n    const L = arr.slice(left, mid + 1);\n    const R = arr.slice(mid + 1, right + 1);\n    let i = 0, j = 0, k = left;\n    while (i < L.length && j < R.length)\n        arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];\n    while (i < L.length) arr[k++] = L[i++];\n    while (j < R.length) arr[k++] = R[j++];\n}\n\nfunction mergeSort(arr, left = 0, right = arr.length - 1) {\n    if (left >= right) return;\n    const mid = Math.floor((left + right) / 2);\n    mergeSort(arr, left, mid);\n    mergeSort(arr, mid + 1, right);\n    merge(arr, left, mid, right);\n    return arr;\n}`,
  },
  recursive: {
    cpp: `void merge(int arr[], int left, int mid, int right) {\n    int n1 = mid-left+1, n2 = right-mid;\n    vector<int> L(arr+left, arr+left+n1);\n    vector<int> R(arr+mid+1, arr+mid+1+n2);\n    int i=0,j=0,k=left;\n    while (i<n1&&j<n2)\n        arr[k++]=(L[i]<=R[j])?L[i++]:R[j++];\n    while (i<n1) arr[k++]=L[i++];\n    while (j<n2) arr[k++]=R[j++];\n}\n\n// Bottom-Up: no recursion, merges subarrays of size 1,2,4,8...\nvoid mergeSort(int arr[], int n) {\n    for (int width = 1; width < n; width *= 2) {\n        for (int left = 0; left < n; left += 2 * width) {\n            int mid = min(left + width - 1, n - 1);\n            int right = min(left + 2 * width - 1, n - 1);\n            if (mid < right)\n                merge(arr, left, mid, right);\n        }\n    }\n}`,
    python: `def merge(arr, left, mid, right):\n    L = arr[left:mid+1]\n    R = arr[mid+1:right+1]\n    i = j = 0; k = left\n    while i < len(L) and j < len(R):\n        if L[i] <= R[j]: arr[k]=L[i]; i+=1\n        else: arr[k]=R[j]; j+=1\n        k += 1\n    while i < len(L): arr[k]=L[i]; i+=1; k+=1\n    while j < len(R): arr[k]=R[j]; j+=1; k+=1\n\n# Bottom-Up: no recursion, merges subarrays of size 1,2,4,8...\ndef merge_sort(arr):\n    n = len(arr)\n    width = 1\n    while width < n:\n        for left in range(0, n, 2 * width):\n            mid = min(left + width - 1, n - 1)\n            right = min(left + 2 * width - 1, n - 1)\n            if mid < right:\n                merge(arr, left, mid, right)\n        width *= 2`,
    java: `static void merge(int[] arr, int left, int mid, int right) {\n    int n1=mid-left+1, n2=right-mid;\n    int[] L=Arrays.copyOfRange(arr,left,left+n1);\n    int[] R=Arrays.copyOfRange(arr,mid+1,mid+1+n2);\n    int i=0,j=0,k=left;\n    while (i<n1&&j<n2)\n        arr[k++]=(L[i]<=R[j])?L[i++]:R[j++];\n    while (i<n1) arr[k++]=L[i++];\n    while (j<n2) arr[k++]=R[j++];\n}\n\n// Bottom-Up: no recursion, merges subarrays of size 1,2,4,8...\nstatic void mergeSort(int[] arr) {\n    int n = arr.length;\n    for (int w=1; w<n; w*=2) {\n        for (int l=0; l<n; l+=2*w) {\n            int mid = Math.min(l+w-1, n-1);\n            int right = Math.min(l+2*w-1, n-1);\n            if (mid < right) merge(arr,l,mid,right);\n        }\n    }\n}`,
    c: `void merge(int arr[], int left, int mid, int right) {\n    int n1=mid-left+1, n2=right-mid;\n    int L[n1], R[n2];\n    for(int i=0;i<n1;i++) L[i]=arr[left+i];\n    for(int j=0;j<n2;j++) R[j]=arr[mid+1+j];\n    int i=0,j=0,k=left;\n    while(i<n1&&j<n2)\n        arr[k++]=(L[i]<=R[j])?L[i++]:R[j++];\n    while(i<n1) arr[k++]=L[i++];\n    while(j<n2) arr[k++]=R[j++];\n}\n\n/* Bottom-Up: no recursion, merges subarrays of size 1,2,4,8... */\nvoid mergeSort(int arr[], int n) {\n    for(int w=1;w<n;w*=2) {\n        for(int l=0;l<n;l+=2*w) {\n            int mid=l+w-1<n-1?l+w-1:n-1;\n            int r=l+2*w-1<n-1?l+2*w-1:n-1;\n            if(mid<r) merge(arr,l,mid,r);\n        }\n    }\n}`,
    javascript: `function merge(arr, left, mid, right) {\n    const L = arr.slice(left, mid + 1);\n    const R = arr.slice(mid + 1, right + 1);\n    let i = 0, j = 0, k = left;\n    while (i < L.length && j < R.length)\n        arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];\n    while (i < L.length) arr[k++] = L[i++];\n    while (j < R.length) arr[k++] = R[j++];\n}\n\n// Bottom-Up: no recursion, merges subarrays of size 1,2,4,8...\nfunction mergeSort(arr) {\n    const n = arr.length;\n    for (let w = 1; w < n; w *= 2) {\n        for (let l = 0; l < n; l += 2 * w) {\n            const mid = Math.min(l + w - 1, n - 1);\n            const right = Math.min(l + 2 * w - 1, n - 1);\n            if (mid < right) merge(arr, l, mid, right);\n        }\n    }\n    return arr;\n}`,
  },
};

let editorIter, editorRecur;

function getCMTheme(webTheme) {
  if (webTheme === "light") return "eclipse";
  if (webTheme === "blue") return "nord";
  return "material-ocean";
}

function initEditors() {
  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  const cmTheme = getCMTheme(currentTheme);

  editorIter = CodeMirror.fromTextArea(document.getElementById("editor-iter"), {
    mode: "text/x-c++src",
    theme: cmTheme,
    lineNumbers: true,
    indentUnit: 4,
  });
  editorRecur = CodeMirror.fromTextArea(
    document.getElementById("editor-recur"),
    {
      mode: "text/x-c++src",
      theme: cmTheme,
      lineNumbers: true,
      indentUnit: 4,
    },
  );

  editorIter.setValue(codeData.iterative.cpp);
  editorRecur.setValue(codeData.recursive.cpp);
}

function toggleDropdown(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById("icon-" + id);
  content.classList.toggle("show");
  if (icon) icon.classList.toggle("fa-chevron-up");
  setTimeout(() => {
    editorIter.refresh();
    editorRecur.refresh();
  }, 10);
}

function switchLang(group, lang, tabBtn) {
  const parent = tabBtn.parentElement;
  parent
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  tabBtn.classList.add("active");

  const editor = group === "iterative" ? editorIter : editorRecur;
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
    javascript: "JS",
  };

  const headerSpan = tabBtn
    .closest(".op-content")
    .querySelector(".lang-display");
  if (headerSpan) headerSpan.textContent = langNames[lang];

  editor.setOption("mode", modeMap[lang]);
  editor.setValue(codeData[group][lang]);
}

document.querySelectorAll(".lang-tab").forEach((btn) => {
  btn.onclick = () =>
    switchLang(btn.parentElement.dataset.group, btn.dataset.lang, btn);
});

function copyCode(button) {
  const isIterative = button.closest("#iter-drop") !== null;
  const editor = isIterative ? editorIter : editorRecur;
  const code = editor.getValue();

  navigator.clipboard.writeText(code).then(() => {
    button.textContent = "Copied!";
    button.style.background = "var(--primary-green)";
    setTimeout(() => {
      button.textContent = "Copy";
      button.style.background = "var(--primary-purple)";
    }, 2000);
  });
}

document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const current = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(current) + 1) % 3];

  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);

  const newCMTheme = getCMTheme(next);
  editorIter.setOption("theme", newCMTheme);
  editorRecur.setOption("theme", newCMTheme);
};
// Get the algorithm name from the page to use as a unique key
const ALGO_KEY = "mergesort";
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
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditors();
};
