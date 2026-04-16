// Student Note: Centralized API config for easy port switching later
const BASE_URL = "http://localhost:3001/api";

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        // Return both status and the JSON data
        const result = await response.json();
        return { ok: response.ok, data: result };
    } catch (err) {
        console.error("Fetch error:", err);
        return { ok: false, data: { error: "Cannot connect to server." } };
    }
}