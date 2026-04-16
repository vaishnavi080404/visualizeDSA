// navbar.js — inject the user avatar + dropdown into any nav
// Usage: add <div id="nav-user-slot"></div> in your nav-right div
//        then <script src="js/navbar.js"></script> at bottom of body

(function() {
  const slot = document.getElementById('nav-user-slot');
  if (!slot) return;

  const username = localStorage.getItem('username') || '';
  const token    = localStorage.getItem('token');
  if (!token || !username) return; // not logged in, show nothing

  const initial = username.charAt(0).toUpperCase();

  // Calc XP from progress map
  const progress = JSON.parse(localStorage.getItem('progress') || '{}');
  const xpMap    = { array:100, matrix:150, string:100, hashing:150, recursion:150,
                     stack:100, queue:100, linkedlist:100, tree:150, heap:150,
                     graphs:200, linearsearch:100, binarysearch:150, bubblesort:100,
                     selectionsort:100, mergesort:150, quicksort:200, insertionsort:100 };
  const totalXP  = Object.entries(progress)
    .reduce((sum, [id, lvls]) => sum + (xpMap[id] || 100) * lvls, 0);

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

  // Click-to-toggle on mobile (hover still works on desktop via CSS)
  const container = document.getElementById('navUserContainer');
  document.getElementById('userAvatar').addEventListener('click', e => {
    e.stopPropagation();
    container.classList.toggle('open');
  });
  document.addEventListener('click', () => container.classList.remove('open'));
})();

// Shared logout — available globally
function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('progress');
  window.location.href = 'index.html';
}