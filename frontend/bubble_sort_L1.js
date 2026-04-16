const codeData = {
  iterative: {
    cpp: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        // If no swap in this pass, array is sorted\n        if (!swapped) break;\n    }\n}`,
    python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        swapped = False\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        # If no swap in this pass, array is sorted\n        if not swapped:\n            break`,
    java: `static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        boolean swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        // If no swap in this pass, array is sorted\n        if (!swapped) break;\n    }\n}`,
    c: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int swapped = 0;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = 1;\n            }\n        }\n        // If no swap in this pass, array is sorted\n        if (!swapped) break;\n    }\n}`,
    javascript: `function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        let swapped = false;\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n                swapped = true;\n            }\n        }\n        // If no swap in this pass, array is sorted\n        if (!swapped) break;\n    }\n    return arr;\n}`,
  },
  recursive: {
    cpp: `void bubbleSort(int arr[], int n) {\n    // Base case: 1 element left\n    if (n == 1) return;\n    // One pass: bubble largest to end\n    for (int i = 0; i < n - 1; i++)\n        if (arr[i] > arr[i + 1])\n            swap(arr[i], arr[i + 1]);\n    // Recurse on remaining n-1 elements\n    bubbleSort(arr, n - 1);\n}`,
    python: `def bubble_sort(arr, n=None):\n    if n is None:\n        n = len(arr)\n    # Base case: 1 element left\n    if n == 1:\n        return\n    # One pass: bubble largest to end\n    for i in range(n - 1):\n        if arr[i] > arr[i + 1]:\n            arr[i], arr[i + 1] = arr[i + 1], arr[i]\n    # Recurse on remaining n-1 elements\n    bubble_sort(arr, n - 1)`,
    java: `static void bubbleSort(int[] arr, int n) {\n    // Base case: 1 element left\n    if (n == 1) return;\n    // One pass: bubble largest to end\n    for (int i = 0; i < n - 1; i++) {\n        if (arr[i] > arr[i + 1]) {\n            int temp = arr[i];\n            arr[i] = arr[i + 1];\n            arr[i + 1] = temp;\n        }\n    }\n    // Recurse on remaining n-1 elements\n    bubbleSort(arr, n - 1);\n}`,
    c: `void bubbleSort(int arr[], int n) {\n    // Base case: 1 element left\n    if (n == 1) return;\n    // One pass: bubble largest to end\n    for (int i = 0; i < n - 1; i++) {\n        if (arr[i] > arr[i + 1]) {\n            int temp = arr[i];\n            arr[i] = arr[i + 1];\n            arr[i + 1] = temp;\n        }\n    }\n    // Recurse on remaining n-1 elements\n    bubbleSort(arr, n - 1);\n}`,
    javascript: `function bubbleSort(arr, n = arr.length) {\n    // Base case: 1 element left\n    if (n === 1) return arr;\n    // One pass: bubble largest to end\n    for (let i = 0; i < n - 1; i++) {\n        if (arr[i] > arr[i + 1])\n            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];\n    }\n    // Recurse on remaining n-1 elements\n    return bubbleSort(arr, n - 1);\n}`,
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

window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditors();
  updateLevelButtons();
};


function animatePush() {
  const container = document.getElementById("pushAnimation");
  if (!container) return;
  container.innerHTML = "";
  ["10", "20", "30"].forEach((val, index) => {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "stack-element";
      el.textContent = val;
      container.appendChild(el);
    }, index * 500);
  });
}
animatePush();
