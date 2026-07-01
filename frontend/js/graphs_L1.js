/*   THEME   */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
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
  applyTheme(themes[(themes.indexOf(cur) + 1) % themes.length]);
});

/*   HAMBURGER   */
document.getElementById("navHamburger").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav"))
    document.getElementById("navLinks").classList.remove("open");
});

/*   DROPDOWNS   */
function toggleOp(id) {
  const content = document.getElementById("content-" + id);
  const icon = document.getElementById("icon-" + id);
  const header = content.previousElementSibling;
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

/*   LEVEL NAVIGATION & PROGRESS (Unified Logic)   */
const ALGO_KEY = "graphs"; // Must match topics.html ID
const modal = document.getElementById("quizModal");
const modalMsg = document.getElementById("modalMsg");
const startQuizBtn = document.getElementById("startQuiz");
const cancelBtn = document.getElementById("cancelBtn");

// 1. Get the current numeric level straight from the DB-backed global
function getLevelFromDB() {
  const progress = window.__levelProgress || {};
  return progress[ALGO_KEY] || 0;
}

// 2. Update button colors based on progress
function updateLevelButtons() {
  const currentLevel = getLevelFromDB(); // Defined here!
  const btnL2 = document.getElementById("l2");
  const btnL3 = document.getElementById("l3");

  // If Level 2 is unlocked or completed
  if (currentLevel >= 2) {
    btnL2.style.borderColor = "var(--primary-green)";
    btnL2.style.background = "rgba(16,185,129,0.15)";
    btnL2.style.color = "var(--primary-green)";
  }

  // If Level 3 is completed (solved at least one problem)
  if (currentLevel >= 3) {
    btnL3.style.borderColor = "var(--primary-green)";
    btnL3.style.background = "rgba(16,185,129,0.15)";
    btnL3.style.color = "var(--primary-green)";
  }
}

// 3. Handle Clicks
document.getElementById("l1").addEventListener("click", () => {
  window.location.href = "graphs_L1.html";
});

document.getElementById("l2").addEventListener("click", () => {
  const currentLevel = getLevelFromDB();
  if (currentLevel >= 1) {
    window.location.href = "graphs_L2.html";
  } else {
    modalMsg.textContent = "Pass the Level 1 Quiz to unlock Level 2.";
    startQuizBtn.onclick = () =>
      (window.location.href = "quiz.html?id=graphs-l1");
    modal.style.display = "flex";
  }
});

document.getElementById("l3").addEventListener("click", () => {
  const currentLevel = getLevelFromDB();
  if (currentLevel >= 2) {
    // Redirect to practice page (Level 3)
    window.location.href = "practice.html?topic=graphs";
  } else {
    modalMsg.textContent = "Pass the Level 2 Quiz to unlock Level 3 Problems.";
    startQuizBtn.onclick = () =>
      (window.location.href = "quiz.html?id=graphs-l2");
    modal.style.display = "flex";
  }
});

// 4. Modal Controls
cancelBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// 5. Initialize on load
window.addEventListener("load", () => {
  updateLevelButtons();
});

window.addEventListener("progressReady", () => {
  if (typeof updateLevelButtons === "function") updateLevelButtons();
});
