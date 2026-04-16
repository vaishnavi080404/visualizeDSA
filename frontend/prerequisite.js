const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
let mobileNavOpen = false;

menuToggle.addEventListener("click", () => {
  mobileNavOpen = !mobileNavOpen;
  mobileNav.classList.toggle("open", mobileNavOpen);
  menuToggle.setAttribute("aria-expanded", mobileNavOpen);
});

// close mobile nav on outside click
document.addEventListener("click", (e) => {
  if (
    mobileNavOpen &&
    !mobileNav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    mobileNavOpen = false;
    mobileNav.classList.remove("open");
  }
});

// close mobile nav on link click
mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileNavOpen = false;
    mobileNav.classList.remove("open");
  });
});

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
};

let currentTheme = localStorage.getItem("dsa-theme") || "dark";

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeIcon.innerHTML = themeIcons[theme];
  localStorage.setItem("dsa-theme", theme);
}

applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
  let nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
  currentTheme = themes[nextIndex];
  applyTheme(currentTheme);
});

const cards = document.querySelectorAll(".prerequisite-card");

cards.forEach((card) => {
  const header = card.querySelector(".prerequisite-header");

  header.addEventListener("click", (e) => {
    e.stopPropagation();

    // check if this card is already expanded
    const isExpanded = card.classList.contains("expanded");

    // close all cards first
    cards.forEach((c) => c.classList.remove("expanded"));

    // if this card wasn't expanded, open it
    if (!isExpanded) {
      card.classList.add("expanded");
    }
  });
});

// parallax effect on scroll
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const stages = document.querySelectorAll(".stage");

  stages.forEach((el, index) => {
    const speed = 0.1 + index * 0.05;
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});
