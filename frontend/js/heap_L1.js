const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  themeIcon.innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
  if (window.syncThemeToServer) window.syncThemeToServer(t);
}

applyTheme(localStorage.getItem("dsa-theme") || "dark");

themeToggle.addEventListener("click", () => {
  const cur = localStorage.getItem("dsa-theme") || "dark";
  const next = themes[(themes.indexOf(cur) + 1) % themes.length];
  applyTheme(next);
});

/*   DROPDOWNS   */
function toggleOperation(id) {
  const content = document.getElementById("content-" + id);
  const icon = document.getElementById("icon-" + id);
  const header = content?.previousElementSibling;
  if (!content) return;
  content.classList.toggle("show");
  if (icon) icon.classList.toggle("rotate");
  if (header) header.classList.toggle("active");
}

/*   LANGUAGE TABS   */
function switchCode(event, group, lang) {
  const tabs = event.target.closest(".language-tabs");
  tabs
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  event.target.classList.add("active");
  document
    .querySelectorAll(`[data-group="${group}"]`)
    .forEach((el) => el.classList.remove("active"));
  const target = document.querySelector(
    `[data-group="${group}"][data-lang="${lang}"]`,
  );
  if (target) target.classList.add("active");
}

/*   COPY CODE   */
function copyCode(button) {
  const pre = button.closest(".code-block").querySelector("pre");
  navigator.clipboard.writeText(pre.innerText || pre.textContent);
  button.textContent = "Copied!";
  setTimeout(() => (button.textContent = "Copy"), 2000);
}

/*   LEVEL BUTTONS   */
const ALGO_KEY = "heap";
const L2_KEY = `${ALGO_KEY}_l2_unlocked`;
const L3_KEY = `${ALGO_KEY}_l3_unlocked`;
const modal = document.getElementById("quizModal");
const modalMsg = document.getElementById("modalMsg");
const startQuizBtn = document.getElementById("startQuiz");
const cancelBtn = document.getElementById("cancelBtn");
const btnL2 = document.getElementById("l2");
const btnL3 = document.getElementById("l3");

function updateLevelButtons() {
  if (isLevelUnlocked(ALGO_KEY, 1)) {
    btnL2.style.cssText =
      "border-color:var(--primary-green);background:rgba(16,185,129,0.15);color:var(--primary-green)";
  }
  if (isLevelUnlocked(ALGO_KEY, 2)) {
    btnL3.style.cssText =
      "border-color:var(--primary-green);background:rgba(16,185,129,0.15);color:var(--primary-green)";
  }
}

btnL2.onclick = () => {
  if (isLevelUnlocked(ALGO_KEY, 1)) {
    window.location.href = "heap_l2.html";
    return;
  }
  modalMsg.textContent =
    "Pass the Level 1 Quiz to unlock Level 2 and continue your Heap journey.";
  modal.style.display = "flex";
  startQuizBtn.onclick = () => (window.location.href = "quiz.html?id=heap-l1");
};

btnL3.onclick = () => {
  const l2 = isLevelUnlocked(ALGO_KEY, 1);
  const l3 = isLevelUnlocked(ALGO_KEY, 2);
  if (l3) {
    window.location.href = "heap_l3.html";
    return;
  }
  if (!l2) {
    modalMsg.textContent =
      "Pass the Level 1 Quiz first to unlock Level 2 before accessing Level 3.";
    startQuizBtn.onclick = () =>
      (window.location.href = "quiz.html?id=heap-l1");
  } else {
    modalMsg.textContent =
      "Pass the Level 2 Quiz to unlock Level 3 and complete your Heap journey.";
    startQuizBtn.onclick = () =>
      (window.location.href = "quiz.html?id=heap-l2");
  }
  modal.style.display = "flex";
};

cancelBtn.onclick = () => (modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(saved);
  updateLevelButtons();
});

window.addEventListener("progressReady", () => {
  if (typeof updateLevelButtons === "function") updateLevelButtons();
  else if (typeof updateLevels === "function") updateLevels();
});
