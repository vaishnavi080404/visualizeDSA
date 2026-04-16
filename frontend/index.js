//MOBILE NAV
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
let navOpen = false;

menuToggle.addEventListener("click", () => {
  navOpen = !navOpen;
  mobileNav.classList.toggle("open", navOpen);
});

document.addEventListener("click", (e) => {
  if (
    navOpen &&
    !mobileNav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    navOpen = false;
    mobileNav.classList.remove("open");
  }
});

mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navOpen = false;
    mobileNav.classList.remove("open");
  }),
);

//  THEME
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

let currentTheme = localStorage.getItem("dsa-theme") || "dark";

function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  themeIcon.innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
  currentTheme = t;
}

applyTheme(currentTheme);
themeToggle.addEventListener("click", () => {
  applyTheme(themes[(themes.indexOf(currentTheme) + 1) % themes.length]);
});

// TYPING ANIMATION
const cppCode = `<span class="cpp-cm">// Binary Search (C++)</span>
<span class="cpp-ty">int</span> <span class="cpp-fn">binarySearch</span>
(<span class="cpp-ty">int</span> arr[], <span class="cpp-ty">int</span> n, 
<span class="cpp-ty">int</span> x) {
    <span class="cpp-ty">int</span> low = <span class="cpp-nm">0</span>, high = n - <span class="cpp-nm">1</span>;
    <span class="cpp-kw">while</span> (low <= high) {
        <span class="cpp-ty">int</span> mid = low + (high - low) / <span class="cpp-nm">2</span>;
        <span class="cpp-kw">if</span> (arr[mid] == x) <span class="cpp-kw">return</span> mid;
        <span class="cpp-kw">if</span> (arr[mid] < x) low = mid + <span class="cpp-nm">1</span>;
        <span class="cpp-kw">else</span> high = mid - <span class="cpp-nm">1</span>;
    }
    <span class="cpp-kw">return</span> <span class="cpp-nm">-1</span>;
}`;

let ci = 0;
const codeTarget = document.getElementById("codeContent");

async function typeLoop() {
  while (true) {
    if (ci < cppCode.length) {
      if (cppCode[ci] === "<") ci = cppCode.indexOf(">", ci) + 1;
      else ci++;
      codeTarget.innerHTML =
        cppCode.slice(0, ci) + '<span class="cursor"></span>';
      await new Promise((r) => setTimeout(r, 40));
    } else {
      await new Promise((r) => setTimeout(r, 3000));
      ci = 0;
      codeTarget.innerHTML = "";
    }
  }
}

typeLoop();

//  CAROUSEL
const algorithms = [
  {
    id: "stack",
    name: "Stack",
    category: "Data Structure",
    diff: "Easy",
    icon: "🥞",
    color: "#3b82f6",
    desc: "LIFO principle",
  },
  {
    id: "queue",
    name: "Queue",
    category: "Data Structure",
    diff: "Easy",
    icon: "↔️",
    color: "#8b5cf6",
    desc: "FIFO principle",
  },
  {
    id: "linear-search",
    name: "Linear Search",
    category: "Search",
    diff: "Easy",
    icon: "🔍",
    color: "#06b6d4",
    desc: "Sequential search",
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Search",
    diff: "Medium",
    icon: "🎯",
    color: "#f59e0b",
    desc: "Divide and conquer",
  },
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting",
    diff: "Easy",
    icon: "🫧",
    color: "#3b82f6",
    desc: "Adjacent swaps",
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "Sorting",
    diff: "Easy",
    icon: "✨",
    color: "#8b5cf6",
    desc: "Minimum selection",
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "Sorting",
    diff: "Medium",
    icon: "🔄",
    color: "#06b6d4",
    desc: "Divide & merge",
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "Sorting",
    diff: "Hard",
    icon: "⚡",
    color: "#f59e0b",
    desc: "Pivot partitioning",
  },
];

function renderAnimation(c, type, color) {
  if (type === "stack") {
    for (let i = 0; i < 4; i++) {
      const b = document.createElement("div");
      b.style.cssText = `width:55px;
                height:16px;background:${color};
                position:absolute;
                bottom:${i * 18 + 8}px;
                left:50%;transform:translateX(-50%);
                border-radius:4px;
                animation:stackPush 2s ease-in-out ${i * 0.5}s infinite;
                opacity:0`;
      c.appendChild(b);
    }
  } else if (type === "queue") {
    for (let i = 0; i < 4; i++) {
      const b = document.createElement("div");
      b.style.cssText = `
                width:34px;height:34px;
                background:${color};
                position:absolute;left:${-40 + i * 44}px;
                border-radius:6px;
                animation:queueMove 3s ease-in-out ${i * 0.3}s infinite`;
      c.appendChild(b);
    }
  } else if (type === "linear-search") {
    [3, 7, 1, 9, 5].forEach((n, i) => {
      const e = document.createElement("div");
      e.innerText = n;
      e.style.cssText = `
                width:28px;height:28px;
                background:rgba(128,128,128,.15);
                color:inherit;display:flex;
                align-items:center;
                justify-content:center;
                position:absolute;
                left:${i * 36 + 44}px;border-radius:4px;
                font-size:11px;
                font-weight:bold;
                border:1px solid var(--border-color)`;
      c.appendChild(e);
    });
    const s = document.createElement("div");
    s.style.cssText = `
            width:28px;height:28px;
            background:${color};
            position:absolute;left:44px;
            border-radius:4px;
            opacity:.6;
            animation:linearScan 2.5s ease-in-out infinite`;
    c.appendChild(s);
  } else if (type === "binary-search") {
    [1, 3, 5, 7, 9].forEach((n, i) => {
      const e = document.createElement("div");
      e.innerText = n;
      e.style.cssText = `
                width:28px;height:28px;
                background:rgba(128,128,128,.15);
                color:inherit;
                display:flex;
                align-items:center;
                justify-content:center;
                position:absolute;
                left:${i * 36 + 44}px;
                border-radius:4px;
                font-size:11px;
                font-weight:bold;
                border:1px solid var(--border-color)`;
      c.appendChild(e);
    });
    const h = document.createElement("div");
    h.style.cssText = `
            width:28px;
            height:28px;
            background:${color};
            position:absolute;
            left:80px;
            border-radius:4px;
            opacity:.6;
            animation:binaryHighlight 2s ease-in-out infinite`;
    c.appendChild(h);
  } else if (type === "bubble-sort") {
    [55, 28, 72, 40, 62].forEach((h, i) => {
      const b = document.createElement("div");
      b.style.cssText = `
                width:24px;
                height:${h}px;
                background:${color};
                position:absolute;
                left:${i * 30 + 60}px;
                bottom:12px;
                border-radius:4px 4px 0 0;
                animation:bubbleSwap 3s ease-in-out ${i * 0.2}s infinite`;
      c.appendChild(b);
    });
  } else if (type === "selection-sort") {
    [62, 36, 76, 44, 58].forEach((h, i) => {
      const b = document.createElement("div");
      b.style.cssText = `
                width:24px;
                height:${h}px;
                background:${i === 2 ? color : "#1e293b"};
                position:absolute;
                left:${i * 30 + 60}px;
                bottom:12px;
                border-radius:4px 4px 0 0;
                animation:selectionPulse 2s ease-in-out ${i * 0.3}s infinite`;
      c.appendChild(b);
    });
  } else if (type === "merge-sort") {
    [36, 62, 50, 76].forEach((h, i) => {
      const b = document.createElement("div");
      b.style.cssText = `
                width:22px;
                height:${h}px;
                background:${color};
                position:absolute;
                left:${i < 2 ? i * 28 + 72 : i * 28 + 90}px;
                bottom:12px;
                border-radius:4px 4px 0 0;
                animation:mergeSplit 3s ease-in-out infinite`;
      c.appendChild(b);
    });
  } else if (type === "quick-sort") {
    [44, 68, 36, 76, 54].forEach((h, i) => {
      const b = document.createElement("div");
      b.style.cssText = `
                width:24px;
                height:${h}px;
                background:${i === 2 ? "#ef4444" : color};
                position:absolute;
                left:${i * 28 + 60}px;
                bottom:12px;
                border-radius:4px 4px 0 0;
                animation:quickPivot 2.5s ease-in-out ${i * 0.2}s infinite`;
      c.appendChild(b);
    });
  }
}

const ct = document.getElementById("carouselTrack");
[...algorithms, ...algorithms, ...algorithms].forEach((t) => {
  const card = document.createElement("div");
  card.className = "algorithm-card";
  const diffColor =
    t.diff === "Easy" ? "#10b981" : t.diff === "Medium" ? "#f59e0b" : "#ef4444";
  card.innerHTML = `
            <div class="algo-preview"></div>
            <div class="diff-badge" 
            style="background:${diffColor}20;
            color:${diffColor}">${t.diff}
            </div>
            <div class="algo-icon-wrapper" 
            style="background:${t.color}20;
            color:${t.color}">${t.icon}
            </div>
            <h4>${t.name}</h4>
            <p class="category">${t.category}</p>
            <p class="complexity">${t.desc}</p>
        `;
  ct.appendChild(card);
  renderAnimation(card.querySelector(".algo-preview"), t.id, t.color);
});

let sp = 0;
function autoScroll() {
  sp += 0.5;
  if (sp >= algorithms.length * 280) sp = 0;
  ct.style.transform = `translateX(-${sp}px)`;
  requestAnimationFrame(autoScroll);
}

autoScroll();

//  INTERSECTION OBSERVER
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("animate");
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".learning-card, .step")
  .forEach((el) => obs.observe(el));
