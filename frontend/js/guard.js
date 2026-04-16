/**
 * Auth Guard & Data Synchronization
 * Final Year Project: Persistent User Sessions
 * Note: Place this in the <head> of protected HTML files.
 */

(function () {
  const token = localStorage.getItem("token");

  // 1. Logic Check: If no token, redirect to Home Page (index.html)
  if (!token) {
    // We add a 'trigger' parameter so index.html knows to show the login modal
    window.location.href = "index.html?auth=required";
    return;
  }

  async function validateAndSync() {
    try {
      const response = await fetch("http://localhost:3001/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Handle server response
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("username", data.username);
        localStorage.setItem("progress", JSON.stringify(data.levelProgress));

        // Let the UI know the 'Source of Truth' has arrived
        window.dispatchEvent(new Event("authSynced"));
        console.log("✅ Session verified.");
      } 
      else if (response.status === 401) {
        // Token is expired or tampered with
        console.warn("🚫 Session expired.");
        localStorage.clear();
        window.location.href = "index.html?auth=expired";
      }
    } catch (err) {
      console.error("📡 Offline Mode: Server unreachable.");
    }
  }

  validateAndSync();
})();