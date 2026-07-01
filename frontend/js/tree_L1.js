const themeToggle = document.getElementById("themeToggle"),
  themeIcon = document.getElementById("themeIcon");
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
  const c = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(c) + 1) % themes.length]);
});



/* LANGUAGE TABS */
function switchCode(e, group, lang) {
  e.target.parentElement
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  e.target.classList.add("active");
  document
    .querySelectorAll(`[data-group="${group}"]`)
    .forEach((c) => c.classList.remove("active"));
  const t = document.querySelector(
    `[data-group="${group}"][data-lang="${lang}"]`,
  );
  if (t) t.classList.add("active");
}

/* COPY */
function copyCode(btn) {
  navigator.clipboard
    .writeText(btn.closest(".code-block").querySelector("pre").textContent)
    .catch(() => {});
  btn.textContent = "Copied!";
  setTimeout(() => (btn.textContent = "Copy"), 2000);
}

/* LEVEL BUTTONS */
const ALGO = "tree",
  L2K = `${ALGO}_l2_unlocked`,
  L3K = `${ALGO}_l3_unlocked`;
const btnL2 = document.getElementById("l2"),
  btnL3 = document.getElementById("l3");
const modal = document.getElementById("quizModal"),
  modalMsg = document.getElementById("modalMsg");
const startBtn = document.getElementById("startQuiz"),
  cancelBtn = document.getElementById("cancelBtn");
function styleUnlocked(btn) {
  btn.style.borderColor = "var(--primary-green)";
  btn.style.background = "rgba(16,185,129,.15)";
  btn.style.color = "var(--primary-green)";
}
function updateLevels() {
  if (isLevelUnlocked(ALGO, 1)) styleUnlocked(btnL2);
  if (isLevelUnlocked(ALGO, 2)) styleUnlocked(btnL3);
}
btnL2.onclick = () => {
  if (isLevelUnlocked(ALGO, 1)) {
    window.location.href = "tree_L2.html";
    return;
  }
  modalMsg.textContent =
    "Pass the Level 1 Quiz to unlock Level 2 and continue your Tree journey.";
  startBtn.onclick = () => (window.location.href = "quiz.html?id=tree-l1");
  modal.style.display = "flex";
};
btnL3.onclick = () => {
  const l2 = isLevelUnlocked(ALGO, 1),
    l3 = isLevelUnlocked(ALGO, 2);
  if (l3) {
    window.location.href = "tree_L3.html";
    return;
  }
  if (!l2) {
    modalMsg.textContent =
      "Pass the Level 1 Quiz first to unlock Level 2 before Level 3.";
    startBtn.onclick = () => (window.location.href = "quiz.html?id=tree-l1");
  } else {
    modalMsg.textContent = "Pass the Level 2 Quiz to unlock Level 3.";
    startBtn.onclick = () => (window.location.href = "quiz.html?id=tree-l2");
  }
  modal.style.display = "flex";
};
cancelBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
window.onload = updateLevels;

window.addEventListener("progressReady", () => {
  if (typeof updateLevelButtons === "function") updateLevelButtons();
  else if (typeof updateLevels === "function") updateLevels();
});
