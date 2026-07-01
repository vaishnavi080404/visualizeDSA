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
    id: "hashing",
    name: "Hashing",
    page: "hashing_L1.html",
    diff: "Medium",
    diffClass: "diff-medium",
    desc: "Key-value mapping using hash functions.",
    time: "50 min",
    xp: 150,
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
    id: "linkedlist",
    name: "Linked List",
    page: "linkedlist_L1.html",
    diff: "Easy",
    diffClass: "diff-easy",
    desc: "Nodes and pointers for dynamic arrays.",
    time: "45 min",
    xp: 100,
  },
  {
    id: "tree",
    name: "Tree",
    page: "tree_L1.html",
    diff: "Medium",
    diffClass: "diff-medium",
    desc: "Hierarchical structures and BST logic.",
    time: "65 min",
    xp: 150,
  },
  {
    id: "heap",
    name: "Heap",
    page: "heap_L1.html",
    diff: "Medium",
    diffClass: "diff-medium",
    desc: "Complete binary trees for priority queues.",
    time: "55 min",
    xp: 150,
  },
  {
    id: "graphs",
    name: "Graphs",
    page: "graphs_L1.html",
    diff: "Hard",
    diffClass: "diff-hard",
    desc: "Nodes and edges modeling complex networks.",
    time: "90 min",
    xp: 200,
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

const TOTAL_POSSIBLE_LEVELS = algorithms.length * 3;

function getLevelsCompleted(id) {
  const progress = window.__levelProgress || {};
  return progress[id] || 0;
}

function buildGreeting(username, totalLevels, totalXP, topicsStarted) {
  const hour = new Date().getHours();
  let timeGreet =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  let sub;
  if (totalLevels === 0) {
    const starters = [
      "Your DSA journey starts today. Pick a topic and let's go! 🚀",
      "Fresh start. Every expert was once a beginner. Dive in!",
      "No levels done yet — your first unlock is one click away.",
    ];
    sub = starters[Math.floor(Math.random() * starters.length)];
  } else if (totalLevels < 5) {
    const early = [
      `${totalLevels} level${totalLevels > 1 ? "s" : ""} down. The momentum is building — keep going!`,
      "Good start. Consistency beats intensity every time. Next level?",
      `${totalXP} XP in the bag. You're just getting warmed up.`,
    ];
    sub = early[Math.floor(Math.random() * early.length)];
  } else if (totalLevels < 15) {
    const mid = [
      `${topicsStarted} topics started, ${totalLevels} levels cleared. Solid progress. 💪`,
      `You've earned ${totalXP} XP — that's real work. Keep stacking.`,
      "You're in the groove now. Linked lists? Trees? What's next?",
    ];
    sub = mid[Math.floor(Math.random() * mid.length)];
  } else {
    const advanced = [
      `${totalLevels} levels done and ${totalXP} XP earned. You're built different. 🔥`,
      `${topicsStarted}/${algorithms.length} topics unlocked. Almost at the top. Finish strong.`,
      "At this point you're just showing off. Respect. 👑",
    ];
    sub = advanced[Math.floor(Math.random() * advanced.length)];
  }

  document.getElementById("greetingHeadline").innerHTML =
    `${timeGreet}, <span class="user-name-span">${username}</span>!`;
  document.getElementById("greetingSub").textContent = sub;
  document.getElementById("g-levels").textContent = totalLevels;
  document.getElementById("g-xp").textContent = totalXP;
  document.getElementById("g-topics").textContent = topicsStarted;
}

/*   Main UI render   */
function updateUI() {
  const sidebarList = document.getElementById("sidebarTopicList");
  const topicGrid = document.getElementById("topicGrid");
  sidebarList.innerHTML = "";
  topicGrid.innerHTML = "";

  let totalCompletedLevels = 0;
  let totalEarnedXP = 0;
  let topicsStarted = 0;

  algorithms.forEach((algo) => {
    const completed = getLevelsCompleted(algo.id);
    totalCompletedLevels += completed;
    if (completed > 0) topicsStarted++;

    const earnedXP = completed * algo.xp;
    const maxXP = 3 * algo.xp;
    totalEarnedXP += earnedXP;

    const progressPercent = (completed / 3) * 100;

    /* Sidebar dots */
    const dots = [1, 2, 3]
      .map((lvl) => {
        const status = completed >= lvl ? "done" : "";
        return `<div class="level-dot ${status}" title="Level ${lvl}"></div>`;
      })
      .join("");
    sidebarList.innerHTML += `
            <li class="topic-item">
                <span>${algo.name}</span>
                <div class="level-dots">${dots}</div>
            </li>`;

    /* Card badges */
    const badges = [1, 2, 3]
      .map((lvl) => {
        let state = "";
        if (completed >= lvl) state = "unlocked";
        else if (completed === lvl - 1 && lvl > 1) state = "current";
        const label =
          lvl === 1
            ? "L1 Basics"
            : lvl === 2
              ? "L2 Interactive"
              : "L3 Advanced";
        return `<span class="card-level-badge ${state}">${label}</span>`;
      })
      .join("");

    topicGrid.innerHTML += `
            <div class="topic-card" onclick="goToTopic('${algo.page}')">
                <span class="topic-diff ${algo.diffClass}">${algo.diff}</span>
                <h3>${algo.name}</h3>
                <p>${algo.desc}</p>
                <div class="card-levels">${badges}</div>
                <div class="progress-label" style="margin-bottom:0.4rem;">
                    <span style="font-size:0.8rem;color:var(--text-secondary);">Completion</span>
                    <span style="font-size:0.8rem;color:var(--text-secondary);">${completed}/3 Levels</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-fill" style="width:${progressPercent}%"></div>
                </div>
                <div style="margin-top:0.8rem;font-size:0.75rem;color:var(--text-secondary);display:flex;justify-content:space-between;align-items:center;">
                    <span>🕒 ${algo.time}</span>
                    <span style="color:${earnedXP > 0 ? "var(--primary-green)" : "var(--text-secondary)"}">
                        ⚡ ${earnedXP}/${maxXP} XP
                    </span>
                </div>
            </div>`;
  });

  /* Overall counters */
  const scoreEl = document.getElementById("overallScore");
  const xpEl = document.getElementById("totalXP");
  const barFill = document.getElementById("overallFill");
  if (scoreEl)
    scoreEl.textContent = `${totalCompletedLevels} / ${TOTAL_POSSIBLE_LEVELS} Levels`;
  if (xpEl) xpEl.textContent = `${totalEarnedXP} XP`;
  if (barFill)
    barFill.style.width = `${(totalCompletedLevels / TOTAL_POSSIBLE_LEVELS) * 100}%`;

  /* Greeting */
  const username = window.__username || "Coder";
  buildGreeting(username, totalCompletedLevels, totalEarnedXP, topicsStarted);
}

function goToTopic(page) {
  window.location.href = page;
}

/*   Theme   */
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeModes = ["dark", "light", "blue"];
const icons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"></line>',
};
function applyTheme(mode) {
  document.body.setAttribute("data-theme", mode);
  themeIcon.innerHTML = icons[mode];
  localStorage.setItem("dsa-theme", mode);
  if (window.syncThemeToServer) window.syncThemeToServer(mode);
}
themeBtn.addEventListener("click", () => {
  const cur = localStorage.getItem("dsa-theme") || "dark";
  const next = themeModes[(themeModes.indexOf(cur) + 1) % 3];
  applyTheme(next);
});

/*   Hamburger   */
document.getElementById("hamburgerBtn").addEventListener("click", () => {
  document.getElementById("mobileNav").classList.toggle("open");
});

/* Auth display + logout are handled by navbar.js now — it owns
   #nav-user-slot and fetches the username straight from the DB,
   so there's no need to duplicate that render here anymore. */

/*   Events  
   updateUI() runs once immediately (shows 0 progress for a beat)
   and again once navbar.js's DB fetch resolves with real numbers. */
window.addEventListener("progressReady", () => updateUI());

/*   Init   */
applyTheme(localStorage.getItem("dsa-theme") || "dark");
updateUI();
