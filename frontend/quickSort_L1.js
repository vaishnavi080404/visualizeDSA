const codeData = {
  iterative: {
    cpp: `// Lomuto partition: pivot = last element\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]); // Place pivot\n    return i + 1;\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);  // Left of pivot\n        quickSort(arr, pi + 1, high); // Right of pivot\n    }\n}`,
    python: `# Lomuto partition: pivot = last element\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1], arr[high] = arr[high], arr[i + 1]  # Place pivot\n    return i + 1\n\ndef quick_sort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)   # Left of pivot\n        quick_sort(arr, pi + 1, high)  # Right of pivot`,
    java: `// Lomuto partition: pivot = last element\nstatic int partition(int[] arr, int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n        }\n    }\n    int temp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = temp;\n    return i + 1;\n}\n\nstatic void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);   // Left of pivot\n        quickSort(arr, pi + 1, high);  // Right of pivot\n    }\n}`,
    c: `/* Lomuto partition: pivot = last element */\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n        }\n    }\n    int t = arr[i+1]; arr[i+1] = arr[high]; arr[high] = t;\n    return i + 1;\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);   /* Left of pivot */\n        quickSort(arr, pi + 1, high);  /* Right of pivot */\n    }\n}`,
    javascript: `// Lomuto partition: pivot = last element\nfunction partition(arr, low, high) {\n    const pivot = arr[high];\n    let i = low - 1;\n    for (let j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot\n    return i + 1;\n}\n\nfunction quickSort(arr, low = 0, high = arr.length - 1) {\n    if (low < high) {\n        const pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);   // Left of pivot\n        quickSort(arr, pi + 1, high);  // Right of pivot\n    }\n    return arr;\n}`,
  },
  recursive: {
    cpp: `// Hoare partition: pivot = first element, fewer swaps\nint hoarePartition(int arr[], int low, int high) {\n    int pivot = arr[low];\n    int i = low - 1, j = high + 1;\n    while (true) {\n        do { i++; } while (arr[i] < pivot);\n        do { j--; } while (arr[j] > pivot);\n        if (i >= j) return j;\n        swap(arr[i], arr[j]);\n    }\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = hoarePartition(arr, low, high);\n        quickSort(arr, low, pi);       // Note: includes pi\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    python: `# Hoare partition: pivot = first element, fewer swaps\ndef hoare_partition(arr, low, high):\n    pivot = arr[low]\n    i = low - 1\n    j = high + 1\n    while True:\n        i += 1\n        while arr[i] < pivot: i += 1\n        j -= 1\n        while arr[j] > pivot: j -= 1\n        if i >= j: return j\n        arr[i], arr[j] = arr[j], arr[i]\n\ndef quick_sort(arr, low, high):\n    if low < high:\n        pi = hoare_partition(arr, low, high)\n        quick_sort(arr, low, pi)       # Note: includes pi\n        quick_sort(arr, pi + 1, high)`,
    java: `// Hoare partition: pivot = first element, fewer swaps\nstatic int hoarePartition(int[] arr, int low, int high) {\n    int pivot = arr[low];\n    int i = low - 1, j = high + 1;\n    while (true) {\n        do { i++; } while (arr[i] < pivot);\n        do { j--; } while (arr[j] > pivot);\n        if (i >= j) return j;\n        int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n    }\n}\n\nstatic void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pi = hoarePartition(arr, low, high);\n        quickSort(arr, low, pi);       // Note: includes pi\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    c: `/* Hoare partition: pivot = first element, fewer swaps */\nint hoarePartition(int arr[], int low, int high) {\n    int pivot = arr[low];\n    int i = low - 1, j = high + 1;\n    while (1) {\n        do { i++; } while (arr[i] < pivot);\n        do { j--; } while (arr[j] > pivot);\n        if (i >= j) return j;\n        int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n    }\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = hoarePartition(arr, low, high);\n        quickSort(arr, low, pi);       /* Note: includes pi */\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    javascript: `// Hoare partition: pivot = first element, fewer swaps\nfunction hoarePartition(arr, low, high) {\n    const pivot = arr[low];\n    let i = low - 1, j = high + 1;\n    while (true) {\n        do { i++; } while (arr[i] < pivot);\n        do { j--; } while (arr[j] > pivot);\n        if (i >= j) return j;\n        [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n}\n\nfunction quickSort(arr, low = 0, high = arr.length - 1) {\n    if (low < high) {\n        const pi = hoarePartition(arr, low, high);\n        quickSort(arr, low, pi);       // Note: includes pi\n        quickSort(arr, pi + 1, high);\n    }\n    return arr;\n}`,
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

window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditors();
};
