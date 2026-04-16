const codeData = {
  iterative: {
    cpp: `int search(int arr[], int n, int x) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == x) return i;\n    return -1;\n}`,
    python: `def search(arr, x):\n    for i in range(len(arr)):\n        if arr[i] == x:\n            return i\n    return -1`,
    java: `static int search(int[] arr, int x) {\n    for (int i = 0; i < arr.length; i++)\n        if (arr[i] == x) return i;\n    return -1;\n}`,
    c: `int search(int arr[], int n, int x) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == x) return i;\n    return -1;\n}`,
    javascript: `function search(arr, x) {\n    for (let i = 0; i < arr.length; i++)\n        if (arr[i] === x) return i;\n    return -1;\n}`,
  },
  recursive: {
    cpp: `int search(int arr[], int n, int x, int i = 0) {\n    if (i >= n) return -1;\n    if (arr[i] == x) return i;\n    return search(arr, n, x, i + 1);\n}`,
    python: `def search(arr, n, x, i=0):\n    if i >= n: return -1\n    if arr[i] == x: return i\n    return search(arr, n, x, i + 1)`,
    java: `static int search(int[] arr, int n, int x, int i) {\n    if (i >= n) return -1;\n    if (arr[i] == x) return i;\n    return search(arr, n, x, i + 1);\n}`,
    c: `int search(int arr[], int n, int x, int i) {\n    if (i >= n) return -1;\n    if (arr[i] == x) return i;\n    return search(arr, n, x, i + 1);\n}`,
    javascript: `function search(arr, n, x, i = 0) {\n    if (i >= n) return -1;\n    if (arr[i] === x) return i;\n    return search(arr, n, x, i + 1);\n}`,
  },
};

let editorIter, editorRecur;

// Helper to get CM theme based on website theme
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


document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const current = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(current) + 1) % 3];

  // 1. update website theme
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);

  // 2. sync code editors theme
  const newCMTheme = getCMTheme(next);
  editorIter.setOption("theme", newCMTheme);
  editorRecur.setOption("theme", newCMTheme);
};


const ALGO_KEY = "linearsearch";
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
  // load saved theme if exists
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditors();
  updateLevelButtons();
};
