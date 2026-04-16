const codeData = {
  iterative: {
    cpp: `void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        // Shift elements greater than key one position right\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key; // Place key in correct position\n    }\n}`,
    python: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        # Shift elements greater than key one position right\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key  # Place key in correct position`,
    java: `static void insertionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        // Shift elements greater than key one position right\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key; // Place key in correct position\n    }\n}`,
    c: `void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        /* Shift elements greater than key one position right */\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key; /* Place key in correct position */\n    }\n}`,
    javascript: `function insertionSort(arr) {\n    for (let i = 1; i < arr.length; i++) {\n        let key = arr[i];\n        let j = i - 1;\n        // Shift elements greater than key one position right\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key; // Place key in correct position\n    }\n    return arr;\n}`,
  },
  recursive: {
    cpp: `void insertionSort(int arr[], int n) {\n    // Base case: one element is already sorted\n    if (n <= 1) return;\n    // Sort first n-1 elements recursively\n    insertionSort(arr, n - 1);\n    // Insert last element at its correct position\n    int key = arr[n - 1];\n    int j = n - 2;\n    while (j >= 0 && arr[j] > key) {\n        arr[j + 1] = arr[j];\n        j--;\n    }\n    arr[j + 1] = key;\n}`,
    python: `def insertion_sort(arr, n=None):\n    if n is None:\n        n = len(arr)\n    # Base case: one element is already sorted\n    if n <= 1:\n        return\n    # Sort first n-1 elements recursively\n    insertion_sort(arr, n - 1)\n    # Insert last element at its correct position\n    key = arr[n - 1]\n    j = n - 2\n    while j >= 0 and arr[j] > key:\n        arr[j + 1] = arr[j]\n        j -= 1\n    arr[j + 1] = key`,
    java: `static void insertionSort(int[] arr, int n) {\n    // Base case: one element is already sorted\n    if (n <= 1) return;\n    // Sort first n-1 elements recursively\n    insertionSort(arr, n - 1);\n    // Insert last element at its correct position\n    int key = arr[n - 1];\n    int j = n - 2;\n    while (j >= 0 && arr[j] > key) {\n        arr[j + 1] = arr[j];\n        j--;\n    }\n    arr[j + 1] = key;\n}`,
    c: `void insertionSort(int arr[], int n) {\n    /* Base case: one element is already sorted */\n    if (n <= 1) return;\n    /* Sort first n-1 elements recursively */\n    insertionSort(arr, n - 1);\n    /* Insert last element at its correct position */\n    int key = arr[n - 1];\n    int j = n - 2;\n    while (j >= 0 && arr[j] > key) {\n        arr[j + 1] = arr[j];\n        j--;\n    }\n    arr[j + 1] = key;\n}`,
    javascript: `function insertionSort(arr, n = arr.length) {\n    // Base case: one element is already sorted\n    if (n <= 1) return arr;\n    // Sort first n-1 elements recursively\n    insertionSort(arr, n - 1);\n    // Insert last element at its correct position\n    let key = arr[n - 1];\n    let j = n - 2;\n    while (j >= 0 && arr[j] > key) {\n        arr[j + 1] = arr[j];\n        j--;\n    }\n    arr[j + 1] = key;\n    return arr;\n}`,
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


const ALGO_KEY = "insertionsort";
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
