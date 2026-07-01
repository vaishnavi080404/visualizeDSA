//   Theme
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

const applyTheme = (t) => {
  document.body.setAttribute("data-theme", t);
  themeIcon.innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
  if (window.syncThemeToServer) window.syncThemeToServer(t);
};
applyTheme(localStorage.getItem("dsa-theme") || "dark");

themeToggle.addEventListener("click", () => {
  const cur = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(cur) + 1) % themes.length]);
});

//   Mobile Nav
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));

//   Dropdowns
const toggleOperation = (id) => {
  const content = document.getElementById("content-" + id);
  const icon = document.getElementById("icon-" + id);
  if (content) content.classList.toggle("show");
  if (icon) icon.classList.toggle("rotate");
};

//   Language Tabs
const switchCode = (e, group, lang) => {
  e.target
    .closest(".language-tabs")
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  e.target.classList.add("active");
  document
    .querySelectorAll(`[data-group="${group}"]`)
    .forEach((c) => c.classList.remove("active"));
  document
    .querySelector(`[data-group="${group}"][data-lang="${lang}"]`)
    .classList.add("active");
};

//   Copy Code
const copyCode = (btn) => {
  const code = btn.closest(".code-block").querySelector("pre").textContent;
  navigator.clipboard.writeText(code);
  btn.textContent = "Copied!";
  setTimeout(() => (btn.textContent = "Copy"), 2000);
};

//   Level Logic
const ALGO_KEY = "linked_list";
const L2_KEY = `${ALGO_KEY}_l2_unlocked`;
const L3_KEY = `${ALGO_KEY}_l3_unlocked`;

const btnL2 = document.getElementById("l2");
const btnL3 = document.getElementById("l3");
const modal = document.getElementById("quizModal");
const modalMsg = document.getElementById("modalMsg");
const cancelBtn = document.getElementById("cancelBtn");
const startQuizBtn = document.getElementById("startQuiz");

const unlockStyle = (btn) => {
  btn.style.borderColor = "var(--primary-green)";
  btn.style.background = "rgba(16,185,129,0.15)";
  btn.style.color = "var(--primary-green)";
};

const showModal = (msg, href) => {
  modalMsg.textContent = msg;
  startQuizBtn.onclick = () => (window.location.href = href);
  modal.style.display = "flex";
};

const updateLevelButtons = () => {
  if (isLevelUnlocked(ALGO_KEY, 1)) unlockStyle(btnL2);
  if (isLevelUnlocked(ALGO_KEY, 2)) unlockStyle(btnL3);
};

btnL2.onclick = () => {
  if (isLevelUnlocked(ALGO_KEY, 1))
    return (window.location.href = `${ALGO_KEY}_L2.html`);
  showModal(
    "Pass the Level 1 Quiz to unlock Level 2 and continue your Linked List journey.",
    `quiz.html?id=${ALGO_KEY}-l1`,
  );
};

btnL3.onclick = () => {
  if (isLevelUnlocked(ALGO_KEY, 2))
    return (window.location.href = `${ALGO_KEY}_L3.html`);
  if (!isLevelUnlocked(ALGO_KEY, 1))
    return showModal(
      "Complete Level 1 first before jumping to Level 3.",
      `quiz.html?id=${ALGO_KEY}-l1`,
    );
  showModal(
    "Pass the Level 2 Quiz to unlock Level 3 and complete your Linked List journey.",
    `quiz.html?id=${ALGO_KEY}-l2`,
  );
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
};
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

window.onload = () => updateLevelButtons();

window.addEventListener("progressReady", () => {
  if (typeof updateLevelButtons === "function") updateLevelButtons();
  else if (typeof updateLevels === "function") updateLevels();
});
