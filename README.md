# 🧠 visualizeDSA

> See the algorithm think. Not just the output — the *process*.

A full-stack DSA learning platform built to fix the one thing every DSA course gets wrong: explaining algorithms with static diagrams instead of letting you actually *watch* them run. visualizeDSA turns 20+ data structures and algorithms into step-by-step animated walkthroughs, gates each topic behind a quiz so you can't skip ahead, and tracks every bit of your progress in a real database — not your browser's local storage.

---
## 🌐 Live Demo

**Frontend (Vercel):**
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=render)](https://visualize-dsa-codeanime.vercel.app)


**Backend API (Railway):**
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=render)](https://visualizedsa-production.up.railway.app)

---
## ✨ What's inside

- **Animated visualizers** for arrays, linked lists, stacks, queues, trees, heaps, hashing, graphs, recursion, and 6 sorting/searching algorithms — each with its own step-by-step playback
- **3-level progression system** (Learn → Practice → Master) per topic, with quizzes unlocking the next level
- **Built-in code editor** with a real backend compiler — write and run C, C++, Java, and Python directly on the page
- **Practice problem bank** with solution checking, hints, and persistent "solved" tracking
- **Complexity visualizer** — see Big-O behavior plotted live as input size grows
- **Auth system** — JWT-based login/signup, with every user's progress, theme, and solved problems stored server-side in MongoDB (not localStorage)

---

## 🛠️ Tech stack

| Layer | Tech |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JS (ES6+) |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT, bcrypt |
| Code Execution | Child process spawning (gcc, g++, javac, python) |
| Editor | CodeMirror |

No framework bloat. No build step. Just clean, readable JS that does exactly what it needs to.

---

## 📂 Project structure
```text
visualizeDSA/
├── backend/
│   ├── controllers/      # Route logic (auth, user progress, code execution)
│   ├── models/            # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── middleware/      # JWT auth guard
│   └── server.js
└── frontend/
├── css/                  # One stylesheet per page
├── js/                   # One script per page
└── *.html                # 60+ topic, level, and quiz pages

---

## 🚀 Getting started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd visualizeDSA/backend
npm install
```

### 2. Set up your environment

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3001
```

### 3. Run the backend

```bash
node server.js
```

### 4. Run the frontend

Open `frontend/index.html` with **Live Server** (VS Code extension), or:

```bash
cd frontend
npx serve .
```

> Make sure the port Live Server opens on is included in the `allowedOrigins` list in `backend/server.js` — defaults already cover 5500–5503.

---

## 🎯 Why I built this

Most DSA resources show you the *what* — code, time complexity, a final diagram. They rarely show you the *how* — the actual sequence of comparisons, swaps, and pointer movements an algorithm performs at runtime. This project exists to close that gap: every topic here is something I genuinely wanted to *see* before I trusted myself to explain it.

---

## 📌 Status

Actively maintained — built as a final-year project, continuously refined since.

---

<p align="center">Made with logic, late nights, and a lot of console.log debugging.</p>
