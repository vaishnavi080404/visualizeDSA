/**
 * Logout Logic: Removes credentials and redirects.
 * Final Year Project: Session Management cleanup
 */
function handleLogout() {
    // 1. Remove the security token
    localStorage.removeItem('token');

    // 2. Remove user metadata
    localStorage.removeItem('username');
    localStorage.removeItem('progress');

    // 3. Optional: Clear all local storage if you want a complete reset
    // localStorage.clear(); 

    // 4. Redirect to login page immediately
    alert("Logged out successfully.");
    window.location.href = 'login.html';
}