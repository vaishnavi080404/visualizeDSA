const codeData = {
  iterative: {
    cpp: `int binarySearch(int arr[], int n, int x) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == x) return mid;\n        if (arr[mid] < x) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
    python: `def binary_search(arr, x):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == x:\n            return mid\n        elif arr[mid] < x:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
    java: `static int binarySearch(int[] arr, int x) {\n    int low = 0, high = arr.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == x) return mid;\n        if (arr[mid] < x) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
    c: `int binarySearch(int arr[], int n, int x) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == x) return mid;\n        if (arr[mid] < x) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
    javascript: `function binarySearch(arr, x) {\n    let low = 0, high = arr.length - 1;\n    while (low <= high) {\n        let mid = Math.floor(low + (high - low) / 2);\n        if (arr[mid] === x) return mid;\n        if (arr[mid] < x) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
  },
  recursive: {
    cpp: `int binarySearch(int arr[], int low, int high, int x) {\n    if (low > high) return -1;\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == x) return mid;\n    if (arr[mid] < x)\n        return binarySearch(arr, mid + 1, high, x);\n    return binarySearch(arr, low, mid - 1, x);\n}`,
    python: `def binary_search(arr, low, high, x):\n    if low > high:\n        return -1\n    mid = low + (high - low) // 2\n    if arr[mid] == x:\n        return mid\n    elif arr[mid] < x:\n        return binary_search(arr, mid + 1, high, x)\n    else:\n        return binary_search(arr, low, mid - 1, x)`,
    java: `static int binarySearch(int[] arr, int low, int high, int x) {\n    if (low > high) return -1;\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == x) return mid;\n    if (arr[mid] < x)\n        return binarySearch(arr, mid + 1, high, x);\n    return binarySearch(arr, low, mid - 1, x);\n}`,
    c: `int binarySearch(int arr[], int low, int high, int x) {\n    if (low > high) return -1;\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == x) return mid;\n    if (arr[mid] < x)\n        return binarySearch(arr, mid + 1, high, x);\n    return binarySearch(arr, low, mid - 1, x);\n}`,
    javascript: `function binarySearch(arr, low, high, x) {\n    if (low > high) return -1;\n    let mid = Math.floor(low + (high - low) / 2);\n    if (arr[mid] === x) return mid;\n    if (arr[mid] < x)\n        return binarySearch(arr, mid + 1, high, x);\n    return binarySearch(arr, low, mid - 1, x);\n}`,
  },
};

let editorIter, editorRecur;

// get CM theme based on website theme
function getCMTheme(webTheme) {
  if (webTheme === "light") return "eclipse";
  if (webTheme === "blue") return "nord";
  return "material-ocean"; // Default dark
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
  // Refresh needed for CodeMirror to render correctly inside hidden divs
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

  // Update Header Label
  const headerSpan = tabBtn
    .closest(".op-content")
    .querySelector(".lang-display");
  if (headerSpan) headerSpan.textContent = langNames[lang];

  editor.setOption("mode", modeMap[lang]);
  editor.setValue(codeData[group][lang]);
}

document.querySelectorAll(".lang-tab").forEach((btn) => {
  btn.onclick = (e) =>
    switchLang(btn.parentElement.dataset.group, btn.dataset.lang, btn);
});

function copyCode(button) {
  const isIterative = button.closest("#iter-drop") !== null;
  const editor = isIterative ? editorIter : editorRecur;
  const code = editor.getValue();

  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.textContent;
    button.textContent = "Copied!";
    button.style.background = "var(--primary-green)";
    setTimeout(() => {
      button.textContent = "Copy";
      button.style.background = "var(--primary-purple)";
    }, 2000);
  });
}

// THEME TOGGLE LOGIC WITH EDITOR SYNC
document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const current = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(current) + 1) % 3];

  // 1. Update Website Theme
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);

  // 2. Sync Code Editors Theme
  const newCMTheme = getCMTheme(next);
  editorIter.setOption("theme", newCMTheme);
  editorRecur.setOption("theme", newCMTheme);
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

window.onload = () => {
  // Load saved theme if exists
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditors();
  updateLevelButtons();
};
