const API_BASE = (typeof BASE_URL !== "undefined") ? BASE_URL : "http://localhost:3001/api";

window.__levelProgress = {};
window.__solvedProblems = [];

window.isLevelUnlocked = function (topicId, level) {
  return (window.__levelProgress[topicId] || 0) >= level;
};

window.syncThemeToServer = function (theme) {
  const token = localStorage.getItem("token");
  if (!token) return; // not logged in — theme just stays local for guests
  fetch(`${API_BASE}/user/theme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ theme }),
  }).catch((err) => console.error("Theme sync failed:", err));
};

(async function loadUserData() {
  const token = localStorage.getItem("token");
  if (!token) return; // guest — nothing to fetch, levels stay default-locked

  try {
    const res = await fetch(`${API_BASE}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401 || res.status === 404) {
      // 401 = bad/expired token, 404 = token's fine but the user
      // record itself is gone from the DB (e.g. deleted manually)
      localStorage.removeItem("token");
      window.location.href = "index.html?auth=expired";
      return;
    }

    if (!res.ok) return;

    const data = await res.json();
    window.__levelProgress = data.levelProgress || {};
    window.__solvedProblems = data.solvedProblems || [];
    window.__username = data.username;

    // Theme from the DB wins over whatever's cached locally — keeps it
    // consistent across devices. We still leave it in localStorage too
    // for instant paint on the next page load before this fetch resolves.
    if (data.theme) {
      localStorage.setItem("dsa-theme", data.theme);
      if (typeof window.applyTheme === "function") {
        window.applyTheme(data.theme);
      }
    }

    renderAvatar(data.username, data.levelProgress);
    window.dispatchEvent(new Event("progressReady"));
  } catch (err) {
    console.error("📡 Couldn't reach the server for profile data:", err);
  }
})();

function renderAvatar(username, levelProgress) {
  const slot = document.getElementById("nav-user-slot");
  if (!slot || !username) return;

  const initial = username.charAt(0).toUpperCase();
  const xpMap = {
    array: 100,
    matrix: 150,
    string: 100,
    hashing: 150,
    recursion: 150,
    stack: 100,
    queue: 100,
    linkedlist: 100,
    tree: 150,
    heap: 150,
    graphs: 200,
    linearsearch: 100,
    binarysearch: 150,
    bubblesort: 100,
    selectionsort: 100,
    mergesort: 150,
    quicksort: 200,
    insertionsort: 100,
  };
  const totalXP = Object.entries(levelProgress || {}).reduce(
    (sum, [id, lvls]) => sum + (xpMap[id] || 100) * lvls,
    0,
  );

  slot.innerHTML = `
    <div class="nav-user-container" id="navUserContainer">
      <div class="avatar-wrap">
        <div class="user-avatar" id="userAvatar">${initial}</div>
        <div class="status-dot"></div>
      </div>

      <div class="user-dropdown">
        <div class="dropdown-header">
          <div class="dd-avatar-sm">${initial}</div>
          <div class="dd-user-info">
            <b class="dd-fullname">${username}</b>
            <span class="dd-badge">⚡ Active</span>
          </div>
        </div>

        <div class="dd-xp-row">
          <span>Total XP</span>
          <strong>${totalXP} XP</strong>
        </div>

        <div class="dropdown-menu">
          <button class="dd-item logout-item" onclick="handleLogout()">
            <span class="dd-item-icon">🚪</span> Logout
          </button>
        </div>
      </div>
    </div>`;

  const container = document.getElementById("navUserContainer");
  document.getElementById("userAvatar").addEventListener("click", (e) => {
    e.stopPropagation();
    container.classList.toggle("open");
  });
  document.addEventListener("click", () => container.classList.remove("open"));
}
function handleLogout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
