//    ALGORITHM REGISTRY
//    each algo has an id that matches the localStorage keys:
//      {id}_l2_unlocked  and  {id}_l3_unlocked

const algorithms = [
  {
    id: "array",
    name: "Array",
    page: "array_L1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "Contiguous memory, fixed size.",
    time: "30 min",
    xp: 100,
  },
  {
    id: "matrix",
    name: "Matrix",
    page: "matrix_L1.html",
    diff: "Medium",
    diffClass: "diff-medium",
    desc: "2D array for tabular data and grids.",
    time: "45 min",
    xp: 150,
  },
  {
    id: "string",
    name: "String",
    page: "string_L1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "Immutable character array operations.",
    time: "30 min",
    xp: 100,
  },
  {
    id: "recursion",
    name: "Recursion",
    page: "recursion_L1.html",
    diff: "Medium",
    diffClass: "diff-medium",
    desc: "Function calling itself elegantly.",
    time: "60 min",
    xp: 150,
  },
  {
    id: "stack",
    name: "Stack",
    page: "stack_L1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "LIFO principle with push/pop ops.",
    time: "45 min",
    xp: 100,
  },
  {
    id: "queue",
    name: "Queue",
    page: "queueL1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "FIFO principle with enqueue/dequeue.",
    time: "45 min",
    xp: 100,
  },
  {
    id: "linearsearch",
    name: "Linear Search",
    page: "linearSearch_L1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "Step-by-step element scanning.",
    time: "30 min",
    xp: 100,
  },
  {
    id: "binarysearch",
    name: "Binary Search",
    page: "binarySearch_L1.html",
    diff: "Medium",
    diffClass: "diff-medium",
    desc: "Logarithmic search on sorted arrays.",
    time: "60 min",
    xp: 150,
  },
  {
    id: "bubblesort",
    name: "Bubble Sort",
    page: "bubble_sort_L1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "Adjacent swap sorting, O(n²).",
    time: "50 min",
    xp: 100,
  },
  {
    id: "selectionsort",
    name: "Selection Sort",
    page: "selectionSort_L1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "Select minimum and swap.",
    time: "55 min",
    xp: 100,
  },
  {
    id: "mergesort",
    name: "Merge Sort",
    page: "mergeSort_L1.html",
    diff: "Medium",
    diffClass: "diff-medium",
    desc: "Divide and conquer sorting.",
    time: "75 min",
    xp: 150,
  },
  {
    id: "quicksort",
    name: "Quick Sort",
    page: "quickSort_L1.html",
    diff: "Hard",
    diffClass: "diff-hard",
    desc: "Pivot-based recursive sorting.",
    time: "90 min",
    xp: 200,
  },
  {
    id: "insertionsort",
    name: "Insertion Sort",
    page: "insertion_sort_L1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "Build sorted array one item at a time.",
    time: "50 min",
    xp: 100,
  },
];

/*
  
   by level pages: {id}_l2_unlocked and {id}_l3_unlocked
   Level 1 is always "completed" if L2 is unlocked, etc.
*/
function getLevelsCompleted(id) {
  // level pages write these keys when a quiz is passed:
  //   e.g.  localStorage.setItem('stack_l2_unlocked', 'true')
  //         localStorage.setItem('stack_l3_unlocked', 'true')
  const l2 = localStorage.getItem(`${id}_l2_unlocked`) === "true";
  const l3 = localStorage.getItem(`${id}_l3_unlocked`) === "true";

  if (l3) return 3; // L1 + L2 + L3 all done
  if (l2) return 2; // L1 + L2 done
  return 0; // nothing unlocked yet — L1 available but not "completed"
}

const TOTAL_POSSIBLE_LEVELS = algorithms.length * 3; // 13 × 3 = 39


function updateUI() {
  const sidebarList = document.getElementById("sidebarTopicList");
  const topicGrid = document.getElementById("topicGrid");
  sidebarList.innerHTML = "";
  topicGrid.innerHTML = "";

  let totalCompleted = 0;
  let totalXP = 0;

  algorithms.forEach((algo) => {
    const completed = getLevelsCompleted(algo.id);
    totalCompleted += completed;
    totalXP += completed * algo.xp;

    const pct = (completed / 3) * 100;

    /* ── SIDEBAR ITEM ── */
    const levelDots = [1, 2, 3]
      .map((lvl) => {
        const cls =
          completed >= lvl
            ? "done"
            : completed === lvl - 1 && lvl === 1
              ? "partial"
              : "";
        return `<div class="level-dot ${cls}" title="Level ${lvl}"></div>`;
      })
      .join("");

    sidebarList.innerHTML += `
            <li class="topic-item">
                <span>${algo.name}</span>
                <div class="level-dots">${levelDots}</div>
            </li>`;

    /* ── LEVEL BADGES FOR CARD ── */
    const badges = [1, 2, 3]
      .map((lvl) => {
        let cls = "";
        if (completed >= lvl) cls = "unlocked";
        else if (completed === lvl - 1 && lvl > 1) cls = "current";
        const label =
          lvl === 1
            ? "L1 Basics"
            : lvl === 2
              ? "L2 Interactive"
              : "L3 Advanced";
        return `<span class="card-level-badge ${cls}">${label}</span>`;
      })
      .join("");

    /* ── XP label ── */
    const earnedXP = completed * algo.xp;
    const maxXP = 3 * algo.xp;

    /* ── TOPIC CARD ── */
    topicGrid.innerHTML += `
            <div class="topic-card" onclick="goToTopic('${algo.page}')">
                <span class="topic-diff ${algo.diffClass}">${algo.diff}</span>
                <h3>${algo.name}</h3>
                <p>${algo.desc}</p>
                <div class="card-levels">${badges}</div>
                <div class="progress-label" style="margin-bottom:0.4rem;">
                    <span style="font-size:0.8rem;color:var(--text-secondary);">Progress</span>
                    <span style="font-size:0.8rem;color:var(--text-secondary);">${completed}/3 Levels</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-fill" style="width:${pct}%"></div>
                </div>
                <div style="margin-top:0.8rem;font-size:0.75rem;color:var(--text-secondary);display:flex;justify-content:space-between;align-items:center;">
                    <span>🕒 ${algo.time}</span>
                    <span style="color:${earnedXP > 0 ? "var(--primary-green)" : "var(--text-secondary)"}">⚡ ${earnedXP}/${maxXP} XP</span>
                </div>
            </div>`;
  });

  /* ── GLOBAL COUNTERS ── */
  document.getElementById("overallScore").textContent =
    `${totalCompleted} / ${TOTAL_POSSIBLE_LEVELS} Levels`;
  document.getElementById("totalXP").textContent = `${totalXP} XP`;
  document.getElementById("overallFill").style.width =
    `${(totalCompleted / TOTAL_POSSIBLE_LEVELS) * 100}%`;
}

function goToTopic(page) {
  window.location.href = page;
}

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const progToggle = document.getElementById("progToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function closeAll() {
  navLinks.classList.remove("active");
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
  sidebar.classList.remove("active");
});

progToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  navLinks.classList.remove("active");
});

overlay.addEventListener("click", closeAll);

/* 
   THEME
*/
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
}
themeToggle.addEventListener("click", () => {
  const c = localStorage.getItem("dsa-theme") || "dark";
  applyTheme(themes[(themes.indexOf(c) + 1) % 3]);
});
applyTheme(localStorage.getItem("dsa-theme") || "dark");

/* 
   LISTEN FOR STORAGE CHANGES (e.g. user completes a quiz
   in another tab and comes back)
 */
window.addEventListener("storage", () => updateUI());

updateUI();
