const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themes = ["dark", "light", "blue"];
const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
};
let currentTheme = localStorage.getItem("dsa-theme") || "dark";
function applyTheme(t) {
  document.body.setAttribute("data-theme", t);
  themeIcon.innerHTML = themeIcons[t];
  localStorage.setItem("dsa-theme", t);
  if (window.syncThemeToServer) window.syncThemeToServer(t);
  currentTheme = t;
}
applyTheme(currentTheme);
themeToggle.addEventListener("click", () =>
  applyTheme(themes[(themes.indexOf(currentTheme) + 1) % themes.length]),
);

/*   Hamburger   */
// const hamburger = document.getElementById("hamburger");
// const mobileNav = document.getElementById("mobileNav");
// hamburger.addEventListener("click", () => {
//   hamburger.classList.toggle("open");
//   mobileNav.classList.toggle("open");
// });
// close on link click
// mobileNav.querySelectorAll("a").forEach((a) =>
//   a.addEventListener("click", () => {
//     hamburger.classList.remove("open");
//     mobileNav.classList.remove("open");
//   }),
// );

function toggleMobileNav() {
  document.querySelector(".nav-links").classList.toggle("mobile-open");
}

/*   Modal helpers   */
const signupModal = document.getElementById("signupModal");
const signinModal = document.getElementById("signinModal");

function openModal(modal) {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(modal) {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}
function openSignup() {
  closeModal(signinModal);
  openModal(signupModal);
}
function openSignin() {
  closeModal(signupModal);
  openModal(signinModal);
}

// Student Logic: Auto-open login modal if redirected by the Guard
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("auth")) {
    const reason = urlParams.get("auth");

    // Open the sign-in modal automatically
    openSignin();

    // Humanized feedback: Tell them why they are here
    const subtext = document.querySelector("#signinModal .modal-sub");
    if (reason === "required") {
      subtext.textContent = "Please sign in to access the DSA modules.";
      subtext.style.color = "var(--primary-orange)";
    } else if (reason === "expired") {
      subtext.textContent = "Your session has expired. Please sign in again.";
      subtext.style.color = "var(--primary-red)";
    }
  }
});


function handleLogout() {

  localStorage.removeItem("token");

  // Humanized Feedback
  if (typeof showToast === "function") {
    showToast("Logged out successfully", "info");
  }

  // Redirect to home page
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}
// Close on overlay click
[signupModal, signinModal].forEach((m) =>
  m.addEventListener("click", (e) => {
    if (e.target === m) closeModal(m);
  }),
);
// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(signupModal);
    closeModal(signinModal);
  }
});

document
  .getElementById("closeSignup")
  .addEventListener("click", () => closeModal(signupModal));
document
  .getElementById("closeSignin")
  .addEventListener("click", () => closeModal(signinModal));
document.getElementById("switchToLogin").addEventListener("click", openSignin);
document.getElementById("switchToSignup").addEventListener("click", openSignup);

// Hero buttons
document
  .getElementById("startLearningBtn")
  .addEventListener("click", openSignup);
document
  .getElementById("exploreTopicsBtn")
  .addEventListener("click", openSignin);
document.getElementById("heroSigninLink").addEventListener("click", openSignin);

// CTA section buttons
document.getElementById("ctaSignupBtn").addEventListener("click", openSignup);
document.getElementById("ctaSigninBtn").addEventListener("click", openSignin);

function showToast(message, type = "info") {
  // Ensure container exists
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✅",
    error: "❌",
    warn: "⚠️",
    info: "ℹ️",
  };

  toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-msg">${message}</span>
    `;

  container.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}


/*   AUTHENTICATION LOGIC   */

async function handleSignup() {
  const username = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPass").value;
  const btn = document.getElementById("signupBtn");

  if (!username || !email || !password) {
    showToast("All fields are required", "warn");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Processing...";

  const { ok, data } = await postData("/auth/signup", {
    username,
    email,
    password,
  });

  if (ok) {
    showToast("Account created successfully!", "success");
    setTimeout(() => openSignin(), 1000); // Wait a second before switching
  } else {
    showToast(data.error || "Signup failed", "error");
    btn.disabled = false;
    btn.textContent = "Create Account →";
  }
}

async function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value;
  const btn = document.getElementById("loginBtn");

  if (!email || !password) {
    showToast("Email and password required", "warn");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Verifying...";

  const { ok, data } = await postData("/auth/login", { email, password });

  if (ok) {

    localStorage.setItem("token", data.token);

    showToast(`Welcome back, ${data.user.username}!`, "success");

    // Logical delay for the user to read the success toast
    setTimeout(() => {
      window.location.href = "topics.html";
    }, 800);
  } else {
    showToast(data.error || "Login failed", "error");
    btn.disabled = false;
    btn.textContent = "Sign In →";
  }
}
/*   Typing animation   */
const cppCode = `<span class="cpp-cm">//  Binary Search (C++)</span>\n<span class="cpp-ty">int</span> <span class="cpp-fn">binarySearch</span>(<span class="cpp-ty">int</span> arr[], <span class="cpp-ty">int</span> n, <span class="cpp-ty">int</span> x) {\n    <span class="cpp-ty">int</span> low = <span class="cpp-nm">0</span>, high = n - <span class="cpp-nm">1</span>;\n    <span class="cpp-kw">while</span> (low <= high) {\n        <span class="cpp-ty">int</span> mid = low + (high - low) / <span class="cpp-nm">2</span>;\n        <span class="cpp-kw">if</span> (arr[mid] == x) <span class="cpp-kw">return</span> mid;\n        <span class="cpp-kw">if</span> (arr[mid] < x) low = mid + <span class="cpp-nm">1</span>;\n        <span class="cpp-kw">else</span> high = mid - <span class="cpp-nm">1</span>;\n    }\n    <span class="cpp-kw">return</span> <span class="cpp-nm">-1</span>;\n}`;
let ci = 0;
const target = document.getElementById("codeContent");
async function typeLoop() {
  while (true) {
    if (ci < cppCode.length) {
      if (cppCode[ci] === "<") ci = cppCode.indexOf(">", ci) + 1;
      else ci++;
      target.innerHTML = cppCode.slice(0, ci) + '<span class="cursor"></span>';
      await new Promise((r) => setTimeout(r, 40));
    } else {
      await new Promise((r) => setTimeout(r, 3000));
      ci = 0;
      target.innerHTML = "";
    }
  }
}
typeLoop();

/*   Carousel   */
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
      b.style.cssText = `width:60px;height:18px;background:${color};position:absolute;bottom:${i * 20 + 10}px;left:50%;transform:translateX(-50%);border-radius:4px;animation:stackPush 2s ease-in-out ${i * 0.5}s infinite;opacity:0`;
      c.appendChild(b);
    }
  } else if (type === "queue") {
    for (let i = 0; i < 4; i++) {
      const b = document.createElement("div");
      b.style.cssText = `width:38px;height:38px;background:${color};position:absolute;left:${-50 + i * 50}px;border-radius:6px;animation:queueMove 3s ease-in-out ${i * 0.3}s infinite`;
      c.appendChild(b);
    }
  } else if (type === "linear-search") {
    [3, 7, 1, 9, 5].forEach((n, i) => {
      const e = document.createElement("div");
      e.innerText = n;
      e.style.cssText = `width:32px;height:32px;background:rgba(128,128,128,.2);color:inherit;display:flex;align-items:center;justify-content:center;position:absolute;left:${i * 40 + 50}px;border-radius:4px;font-size:12px;font-weight:bold;border:1px solid var(--border-color)`;
      c.appendChild(e);
    });
    const s = document.createElement("div");
    s.style.cssText = `width:32px;height:32px;background:${color};position:absolute;left:50px;border-radius:4px;opacity:.6;animation:linearScan 2.5s ease-in-out infinite`;
    c.appendChild(s);
  } else if (type === "binary-search") {
    [1, 3, 5, 7, 9].forEach((n, i) => {
      const e = document.createElement("div");
      e.innerText = n;
      e.style.cssText = `width:32px;height:32px;background:rgba(128,128,128,.2);color:inherit;display:flex;align-items:center;justify-content:center;position:absolute;left:${i * 40 + 50}px;border-radius:4px;font-size:12px;font-weight:bold;border:1px solid var(--border-color)`;
      c.appendChild(e);
    });
    const h = document.createElement("div");
    h.style.cssText = `width:32px;height:32px;background:${color};position:absolute;left:90px;border-radius:4px;opacity:.6;animation:binaryHighlight 2s ease-in-out infinite`;
    c.appendChild(h);
  } else if (type === "bubble-sort") {
    [60, 30, 80, 45, 70].forEach((h, i) => {
      const b = document.createElement("div");
      b.style.cssText = `width:28px;height:${h}px;background:${color};position:absolute;left:${i * 35 + 70}px;bottom:15px;border-radius:4px 4px 0 0;animation:bubbleSwap 3s ease-in-out ${i * 0.2}s infinite`;
      c.appendChild(b);
    });
  } else if (type === "selection-sort") {
    [70, 40, 85, 50, 65].forEach((h, i) => {
      const b = document.createElement("div");
      b.style.cssText = `width:28px;height:${h}px;background:${i === 2 ? color : "#1e293b"};position:absolute;left:${i * 35 + 70}px;bottom:15px;border-radius:4px 4px 0 0;animation:selectionPulse 2s ease-in-out ${i * 0.3}s infinite`;
      c.appendChild(b);
    });
  } else if (type === "merge-sort") {
    [40, 70, 55, 85].forEach((h, i) => {
      const b = document.createElement("div");
      b.style.cssText = `width:25px;height:${h}px;background:${color};position:absolute;left:${i < 2 ? i * 30 + 80 : i * 30 + 100}px;bottom:15px;border-radius:4px 4px 0 0;animation:mergeSplit 3s ease-in-out infinite`;
      c.appendChild(b);
    });
  } else if (type === "quick-sort") {
    [50, 75, 40, 85, 60].forEach((h, i) => {
      const b = document.createElement("div");
      b.style.cssText = `width:28px;height:${h}px;background:${i === 2 ? "#ef4444" : color};position:absolute;left:${i * 33 + 70}px;bottom:15px;border-radius:4px 4px 0 0;animation:quickPivot 2.5s ease-in-out ${i * 0.2}s infinite`;
      c.appendChild(b);
    });
  }
}

const ct = document.getElementById("carouselTrack");
[...algorithms, ...algorithms, ...algorithms].forEach((t) => {
  const card = document.createElement("div");
  card.className = "algorithm-card";
  card.innerHTML = `<div class="algo-preview"></div><div class="diff-badge" style="background:${t.diff === "Easy" ? "#10b981" : t.diff === "Medium" ? "#f59e0b" : "#ef4444"}20;color:${t.diff === "Easy" ? "#10b981" : t.diff === "Medium" ? "#f59e0b" : "#ef4444"}">${t.diff}</div><div class="algo-icon-wrapper" style="background:${t.color}20;color:${t.color}">${t.icon}</div><h4>${t.name}</h4><p class="category">${t.category}</p><p class="complexity">${t.desc}</p>`;
  ct.appendChild(card);
  renderAnimation(card.querySelector(".algo-preview"), t.id, t.color);
});

let sp = 0;
function autoScroll() {
  sp += 0.5;
  if (sp >= algorithms.length * 324) sp = 0;
  ct.style.transform = `translateX(-${sp}px)`;
  requestAnimationFrame(autoScroll);
}
autoScroll();

const obs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("animate");
    }),
  { threshold: 0.2 },
);
document
  .querySelectorAll(".learning-card, .step")
  .forEach((el) => obs.observe(el));
