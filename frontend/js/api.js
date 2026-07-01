const BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:3001/api"
  : "https://visualizedsa-production.up.railway.app/api";

const COMPILER_URL = `${BASE_URL}/compiler`;

async function postData(endpoint, data) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    console.error("Fetch error:", err);
    return { ok: false, data: { error: "Cannot connect to server." } };
  }
}
