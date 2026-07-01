/**
 * Updates and displays the success modal based on the level passed.
 * @param {string} levelId - e.g., 'tree-l1' or 'tree-l2'
 * @param {number} score - The final percentage achieved
 */
function showPassModal(levelId, score) {
  const modal = document.getElementById("passModal");
  const title = document.getElementById("pmTitle");
  const tagline = document.getElementById("pmTagline");
  const cta = document.getElementById("pmCtaText");
  const btnText = document.getElementById("pmBtnText");
  const btnIcon = document.getElementById("pmBtnIcon");
  const scoreVal = document.getElementById("pm-score-val");

  // Update common elements
  scoreVal.textContent = score + "%";
  modal.classList.add("show"); // Ensure your CSS handles the .show class

  if (levelId.includes("l1")) {
    //   LEVEL 1 COMPLETED
    title.textContent = "Basics Mastered!";
    tagline.textContent =
      "You've built a solid foundation. Now, let's bridge the gap between theory and logic.";
    cta.innerHTML = "Ready to <span>visualize it in action?</span>";
    btnIcon.textContent = "🚀";
    btnText.textContent = "Go to Level 2: Interactive";
  } else if (levelId.includes("l2")) {
    //   LEVEL 2 COMPLETED
    title.textContent = "Interactive Expert!";
    tagline.textContent =
      "Great job! You’ve mastered the mechanics. Let's see how this powers the systems we use every day.";
    cta.innerHTML = "Ready to <span>explore real-world applications?</span>";
    btnIcon.textContent = "🌍";
    btnText.textContent = "Go to Level 3: Advanced";
  }
}
//                             ═
// QUIZ ENGINE - DYNAMIC FOR ALL TOPICS
//                             ═

let quizConfig = null;
let questions = [];
let currentQ = 0;
let userAnswers = [];
let score = { correct: 0, wrong: 0 };

// 1. Load Quiz Based on URL Parameter
function loadQuiz() {
  // Get quiz ID from URL parameter: quiz.html?id=stack-l1
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("id");

  if (!quizId || !QUIZ_DATA[quizId]) {
    document.querySelector(".container").innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">❌ Quiz Not Found</h1>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">The requested quiz does not exist.</p>
                <a href="topics.html" style="background: var(--primary-cyan); color: white; padding: 1rem 2rem; border-radius: 10px; text-decoration: none; display: inline-block;">← Back to Topics</a>
            </div>
        `;
    return;
  }

  quizConfig = QUIZ_DATA[quizId];
  questions = quizConfig.questions;
  userAnswers = new Array(questions.length).fill(null);

  // Set page title
  document.getElementById("pageTitle").textContent =
    `${quizConfig.topicName} ${quizConfig.level} Quiz | CODEANIME`;

  // Initialize UI
  initializeQuizUI();
  renderQuestion();
}

// 2. Initialize Quiz UI
function initializeQuizUI() {
  // Breadcrumb
  const breadcrumbHTML =
    quizConfig.breadcrumb
      .map((item) => `<a href="${item.link}">${item.text}</a><span>›</span>`)
      .join("") + "<span>Quiz</span>";
  document.getElementById("breadcrumb").innerHTML = breadcrumbHTML;

  // Header
  document.getElementById("quizTitle").textContent =
    `${quizConfig.topicName} ${quizConfig.level} Quiz`;
  document.getElementById("quizSubtitle").textContent = quizConfig.subtitle;

  // Meta badges
  document.getElementById("quizMeta").innerHTML = `
        <div class="meta-badge mb-cyan">📝 ${quizConfig.totalQuestions} Questions</div>
        <div class="meta-badge mb-orange">⏱ Mix of Easy · Medium · Hard</div>
        <div class="meta-badge mb-green">🎯 Pass: ${quizConfig.passingScore}% (${Math.ceil((quizConfig.totalQuestions * quizConfig.passingScore) / 100)}/${quizConfig.totalQuestions})</div>
        <div class="meta-badge mb-purple">🔓 Unlocks Next Level</div>
    `;
}

// 3. Render Question
function renderQuestion() {
  const q = questions[currentQ];

  // Progress
  const progress = ((currentQ + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressCount").textContent =
    `Question ${currentQ + 1} of ${questions.length}`;

  // Card Header
  document.getElementById("qNum").textContent = currentQ + 1;
  const diffLabel = document.getElementById("qDiff");
  diffLabel.textContent = q.diff;
  diffLabel.className = `q-diff diff-${q.diff}`;

  // Text
  document.getElementById("qText").textContent = q.text;

  // Options
  const optionsGrid = document.getElementById("optionsGrid");
  optionsGrid.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    if (userAnswers[currentQ] !== null) {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add("reveal");
      if (i === userAnswers[currentQ]) {
        btn.classList.add(i === q.correct ? "correct" : "wrong");
      }
    }

    btn.innerHTML = `
            <div class="opt-letter">${String.fromCharCode(65 + i)}</div>
            <div class="opt-text">${opt}</div>
            <i class="fas ${i === q.correct ? "fa-check-circle" : "fa-times-circle"} opt-icon"></i>
        `;

    btn.onclick = () => selectOption(i);
    optionsGrid.appendChild(btn);
  });

  // Explanation
  const expBox = document.getElementById("explanation");
  if (userAnswers[currentQ] !== null) {
    const isCorrect = userAnswers[currentQ] === q.correct;
    expBox.className = `explanation show ${isCorrect ? "exp-correct" : "exp-wrong"}`;
    expBox.innerHTML = `
            <i class="fas ${isCorrect ? "fa-lightbulb" : "fa-exclamation-circle"} exp-icon"></i>
            <div>${q.explanation}</div>
        `;
    document.getElementById("nextBtn").disabled = false;
  } else {
    expBox.className = "explanation";
    document.getElementById("nextBtn").disabled = true;
  }

  // Nav buttons
  document.getElementById("prevBtn").disabled = currentQ === 0;
  document.getElementById("nextBtn").textContent =
    currentQ === questions.length - 1 ? "See Results" : "Next Question →";
}

// 4. Select Option
function selectOption(index) {
  if (userAnswers[currentQ] !== null) return;

  userAnswers[currentQ] = index;
  const isCorrect = index === questions[currentQ].correct;

  if (isCorrect) score.correct++;
  else score.wrong++;

  updateScoreTracker();
  renderQuestion();
}

function updateScoreTracker() {
  document.getElementById("st-correct").textContent = score.correct;
  document.getElementById("st-wrong").textContent = score.wrong;
  const pct = Math.round((score.correct / questions.length) * 100);
  document.getElementById("st-score").textContent = pct + "%";
}

// 5. Navigation
function nextQuestion() {
  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
  }
}

// 6. Results Screen
function showResults() {
  document.getElementById("quizSection").style.display = "none";
  document.getElementById("scoreTracker").style.display = "none";
  const resultsSection = document.getElementById("resultsSection");
  resultsSection.classList.add("show");

  const pct = Math.round((score.correct / questions.length) * 100);
  const passed = pct >= quizConfig.passingScore;

  // Save Progress — the DB sync below is the only thing that
  // matters now; the old localStorage unlock flag is gone since
  // it never actually talked to the database in the first place.
  if (passed) {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get("id");
    if (quizId) {
      const topic = quizId.split("-")[0];
      const level = parseInt(quizId.split("-l")[1]);
      syncProgressWithDB(topic, level);
    }
  }

  // UI Updates
  const hero = document.getElementById("resultHero");
  hero.className = `result-hero ${passed ? "pass" : "fail"}`;

  document.getElementById("resultEmoji").textContent = passed ? "🏆" : "📚";
  document.getElementById("resultTitle").textContent = passed
    ? "Level Cleared!"
    : "Keep Learning!";
  document.getElementById("resultTitle").className =
    `result-title ${passed ? "pass" : "fail"}`;
  document.getElementById("resultSubtitle").textContent = passed
    ? `Excellent! You've mastered ${quizConfig.topicName} ${quizConfig.level} concepts.`
    : `You're getting there! Review the concepts and try again to master ${quizConfig.topicName}.`;

  // Animate Ring
  const ringFill = document.getElementById("scoreRingFill");
  const offset = 314 - (314 * pct) / 100;
  setTimeout(() => {
    ringFill.style.stroke = passed
      ? "var(--primary-green)"
      : "var(--primary-orange)";
    ringFill.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById("scoreRingPct").textContent = pct + "%";
  document.getElementById("scoreRingPct").style.color = passed
    ? "var(--primary-green)"
    : "var(--primary-orange)";

  document.getElementById("rs-correct").textContent = score.correct;
  document.getElementById("rs-wrong").textContent = score.wrong;
  document.getElementById("rs-pct").textContent = pct + "%";

  // Actions
  const actions = document.getElementById("resultActions");
  if (passed) {
    actions.innerHTML = `
            <button class="btn-lg btn-unlock" onclick="openPassModal()">
                🚀 Unlock Next Level
            </button>
            <button class="btn-lg btn-review" onclick="toggleReview()">
                <i class="fas fa-search"></i> Review Answers
            </button>
        `;
  } else {
    actions.innerHTML = `
            <button class="btn-lg btn-retry" onclick="location.reload()">
                <i class="fas fa-redo"></i> Try Again
            </button>
            <button class="btn-lg btn-review" onclick="toggleReview()">
                <i class="fas fa-search"></i> Review Answers
            </button>
        `;
  }
}

async function syncProgressWithDB(topic, level) {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch(`${typeof BASE_URL !== "undefined" ? BASE_URL : "http://localhost:3001/api"}/user/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topicId: topic, level: level }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("✅ MongoDB Sync Successful");
      // No localStorage cache anymore — the L1/L2 page the user
      // lands on next will pull fresh progress straight from the DB
      // via navbar.js. We still keep an in-memory copy here in case
      // anything else on this page wants the latest numbers.
      window.__levelProgress = data.progress;
    }
  } catch (err) {
    console.error("❌ Sync Error:", err);
  }
}

function toggleReview() {
  const rs = document.getElementById("reviewSection");
  if (rs.style.display === "none") {
    rs.style.display = "block";
    const container = document.getElementById("reviewCards");
    container.innerHTML = "";
    questions.forEach((q, i) => {
      const isCorrect = userAnswers[i] === q.correct;
      const card = document.createElement("div");
      card.className = `review-card ${isCorrect ? "rc-correct" : "rc-wrong"}`;
      card.innerHTML = `
                <div class="review-q-row">
                    <div class="review-num ${isCorrect ? "rn-correct" : "rn-wrong"}">${i + 1}</div>
                    <div class="review-q-text">${q.text}</div>
                </div>
                <div class="review-answers">
                    <div class="ra-row">
                        <span class="ra-label">Your Answer:</span>
                        <span class="ra-val ${isCorrect ? "ra-green" : "ra-red"}">${q.options[userAnswers[i]]}</span>
                    </div>
                    ${
                      !isCorrect
                        ? `
                    <div class="ra-row">
                        <span class="ra-label">Correct Answer:</span>
                        <span class="ra-val ra-green">${q.options[q.correct]}</span>
                    </div>`
                        : ""
                    }
                </div>
            `;
      container.appendChild(card);
    });
    rs.scrollIntoView({ behavior: "smooth" });
  } else {
    rs.style.display = "none";
  }
}

// 7. Pass Modal - Logic merged and humanized
function openPassModal() {
  const pct = Math.round((score.correct / questions.length) * 100);
  const quizId = new URLSearchParams(window.location.search).get("id") || "";

  // Select elements
  const modal = document.getElementById("passModal");
  const title = document.getElementById("pmTitle");
  const tagline = document.getElementById("pmTagline");
  const cta = document.getElementById("pmCtaText");
  const btnText = document.getElementById("pmBtnText");
  const btnIcon = document.getElementById("pmBtnIcon");
  const scoreVal = document.getElementById("pm-score-val");

  // Update common score
  scoreVal.textContent = pct + "%";

  // Level-specific content switching
  if (quizId.includes("-l1")) {
    //   LEVEL 1 COMPLETED
    title.textContent = "Basics Mastered!";
    tagline.textContent = `You've built a solid foundation in ${quizConfig.topicName}. Now, let's bridge the gap between theory and logic.`;
    cta.innerHTML = "Ready to <span>visualize it in action?</span>";
    btnIcon.textContent = "🚀";
    btnText.textContent = "Go to Level 2: Interactive";
  } else if (quizId.includes("-l2")) {
    //   LEVEL 2 COMPLETED
    title.textContent = "Interactive Expert!";
    tagline.textContent = `Great job! You’ve mastered the mechanics of ${quizConfig.topicName}. Let's see how this powers real-world systems.`;
    cta.innerHTML = "Ready to <span>explore real-world applications?</span>";
    btnIcon.textContent = "🌍";
    btnText.textContent = "Go to Level 3: Advanced";
  } else {
    // Fallback for Level 3 or generic
    title.textContent = `${quizConfig.topicName} Mastered!`;
    tagline.textContent =
      "You have successfully completed all levels for this topic.";
    cta.innerHTML = "View more <span>algorithms?</span>";
    btnText.textContent = "Back to Topics";
  }

  modal.classList.add("show");
}

function closePassModal() {
  document.getElementById("passModal").classList.remove("show");
}

function goToNextLevel() {
  window.location.href = quizConfig.nextPage;
}

// 8. Theme Logic
const themeToggle = document.getElementById("themeToggle");
themeToggle.onclick = () => {
  const current = document.body.getAttribute("data-theme") || "dark";
  const next =
    current === "dark" ? "light" : current === "light" ? "blue" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
  if (window.syncThemeToServer) window.syncThemeToServer(next);
};

// 9. Initialize Particles
function initParticles() {
  const container = document.getElementById("particles");
  const colors = ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b"];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = Math.random() * 10 + 5 + "s";
    p.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(p);
  }
}

// Start Quiz
window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initParticles();
  loadQuiz();
};
