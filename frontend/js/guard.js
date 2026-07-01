(function () {
  const token = localStorage.getItem("token");

  if (!token) {
    // 'trigger' param tells index.html to pop the login modal
    window.location.href = "index.html?auth=required";
    return;
  }

  async function validateToken() {
    try {
      const response = await fetch(`${typeof BASE_URL !== "undefined" ? BASE_URL : "http://localhost:3001/api"}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401 || response.status === 404) {
        // 401 = bad/expired token, 404 = token's fine but the user
        // record itself is gone from the DB (e.g. deleted manually)
        console.warn("🚫 Session invalid — user not found or token expired.");
        localStorage.removeItem("token");
        window.location.href = "index.html?auth=expired";
      }
      // 200 OK — token's good, nothing more to do here.
      // navbar.js handles fetching the actual profile data for the page.
    } catch (err) {
      console.error("📡 Offline Mode: Server unreachable.");
    }
  }

  validateToken();
})();
