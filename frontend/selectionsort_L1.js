const codeData = {
  iterative: {
    cpp: `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        // Swap the found minimum with arr[i]\n        if (min_idx != i)\n            swap(arr[min_idx], arr[i]);\n    }\n}`,
    python: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        # Swap the found minimum with arr[i]\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
    java: `static void selectionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        // Swap the found minimum with arr[i]\n        int temp = arr[min_idx];\n        arr[min_idx] = arr[i];\n        arr[i] = temp;\n    }\n}`,
    c: `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        // Swap the found minimum with arr[i]\n        int temp = arr[min_idx];\n        arr[min_idx] = arr[i];\n        arr[i] = temp;\n    }\n}`,
    javascript: `function selectionSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        let min_idx = i;\n        for (let j = i + 1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        // Swap the found minimum with arr[i]\n        if (min_idx !== i)\n            [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];\n    }\n    return arr;\n}`,
  },
  recursive: {
    cpp: `void selectionSort(int arr[], int n, int start = 0) {\n    if (start >= n - 1) return;\n    int min_idx = start;\n    for (int i = start + 1; i < n; i++)\n        if (arr[i] < arr[min_idx])\n            min_idx = i;\n    if (min_idx != start)\n        swap(arr[min_idx], arr[start]);\n    // Recurse on remaining unsorted portion\n    selectionSort(arr, n, start + 1);\n}`,
    python: `def selection_sort(arr, start=0):\n    n = len(arr)\n    if start >= n - 1:\n        return\n    min_idx = start\n    for i in range(start + 1, n):\n        if arr[i] < arr[min_idx]:\n            min_idx = i\n    arr[start], arr[min_idx] = arr[min_idx], arr[start]\n    # Recurse on remaining unsorted portion\n    selection_sort(arr, start + 1)`,
    java: `static void selectionSort(int[] arr, int n, int start) {\n    if (start >= n - 1) return;\n    int min_idx = start;\n    for (int i = start + 1; i < n; i++)\n        if (arr[i] < arr[min_idx])\n            min_idx = i;\n    int temp = arr[min_idx];\n    arr[min_idx] = arr[start];\n    arr[start] = temp;\n    // Recurse on remaining unsorted portion\n    selectionSort(arr, n, start + 1);\n}`,
    c: `void selectionSort(int arr[], int n, int start) {\n    if (start >= n - 1) return;\n    int min_idx = start;\n    for (int i = start + 1; i < n; i++)\n        if (arr[i] < arr[min_idx])\n            min_idx = i;\n    int temp = arr[min_idx];\n    arr[min_idx] = arr[start];\n    arr[start] = temp;\n    // Recurse on remaining unsorted portion\n    selectionSort(arr, n, start + 1);\n}`,
    javascript: `function selectionSort(arr, start = 0) {\n    let n = arr.length;\n    if (start >= n - 1) return arr;\n    let min_idx = start;\n    for (let i = start + 1; i < n; i++)\n        if (arr[i] < arr[min_idx])\n            min_idx = i;\n    if (min_idx !== start)\n        [arr[start], arr[min_idx]] = [arr[min_idx], arr[start]];\n    // Recurse on remaining unsorted portion\n    return selectionSort(arr, start + 1);\n}`,
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
const ALGO_KEY = "selectionsort"; // This should match the algorithm name in lowercase without spaces
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
