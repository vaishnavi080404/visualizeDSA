/**
 * Logout Logic: Removes the session token and redirects.
 * Final Year Project: Session Management cleanup
 * Note: navbar.js defines its own handleLogout too and loads after this
 * on pages that include both — keeping this version in sync just in case
 * a page calls it before navbar.js has loaded.
 */
function handleLogout() {
  localStorage.removeItem("token");
  alert("Logged out successfully.");
  window.location.href = "login.html";
}
