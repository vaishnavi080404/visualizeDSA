let quizConfig = null;
let questions = [];
let currentQ = 0;
let userAnswers = [];
let score = { correct: 0, wrong: 0 };

// 1 load quiz based on URL parameter
function loadQuiz() {
  // get quiz ID from URL parameter: quiz.html?id=stack-l1
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

// 2 initialize Quiz UI
function initializeQuizUI() {
  // Breadcrumb
  const breadcrumbHTML =
    quizConfig.breadcrumb
      .map((item) => `<a href="${item.link}">${item.text}</a><span>›</span>`)
      .join("") + "<span>Quiz</span>";
  document.getElementById("breadcrumb").innerHTML = breadcrumbHTML;

  document.getElementById("quizTitle").textContent =
    `${quizConfig.topicName} ${quizConfig.level} Quiz`;
  document.getElementById("quizSubtitle").textContent = quizConfig.subtitle;

  document.getElementById("quizMeta").innerHTML = `
        <div class="meta-badge mb-cyan">📝 ${quizConfig.totalQuestions} Questions</div>
        <div class="meta-badge mb-orange">⏱ Mix of Easy · Medium · Hard</div>
        <div class="meta-badge mb-green">🎯 Pass: ${quizConfig.passingScore}% (${Math.ceil((quizConfig.totalQuestions * quizConfig.passingScore) / 100)}/${quizConfig.totalQuestions})</div>
        <div class="meta-badge mb-purple">🔓 Unlocks Next Level</div>
    `;
}

// 3 render question
function renderQuestion() {
  const q = questions[currentQ];

  // Progress
  const progress = ((currentQ + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressCount").textContent =
    `Question ${currentQ + 1} of ${questions.length}`;

  document.getElementById("qNum").textContent = currentQ + 1;
  const diffLabel = document.getElementById("qDiff");
  diffLabel.textContent = q.diff;
  diffLabel.className = `q-diff diff-${q.diff}`;

  document.getElementById("qText").textContent = q.text;

  // options
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

  // explanation
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

// 4 select option
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

// 5 navigation
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

// 6 results screen
function showResults() {
  document.getElementById("quizSection").style.display = "none";
  document.getElementById("scoreTracker").style.display = "none";
  const resultsSection = document.getElementById("resultsSection");
  resultsSection.classList.add("show");

  const pct = Math.round((score.correct / questions.length) * 100);
  const passed = pct >= quizConfig.passingScore;

  // save progress
  if (passed) localStorage.setItem(quizConfig.unlocks, "true");

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

// 7 pass modal
function openPassModal() {
  const pct = Math.round((score.correct / questions.length) * 100);
  document.getElementById("pm-score-val").textContent = pct + "%";
  document.getElementById("pmTitle").textContent =
    `${quizConfig.topicName} Master Unlocked`;
  document.getElementById("pmTagline").textContent =
    `You've mastered ${quizConfig.topicName} ${quizConfig.level} fundamentals. Ready for the next challenge?`;
  document.getElementById("pmBtnText").textContent =
    `Go to ${quizConfig.level === "Level 1" ? "Level 2 — Visualizer" : "Next Level"}`;
  document.getElementById("passModal").classList.add("show");
}

function closePassModal() {
  document.getElementById("passModal").classList.remove("show");
}

function goToNextLevel() {
  window.location.href = quizConfig.nextPage;
}

// 8 theme logic
const themeToggle = document.getElementById("themeToggle");
themeToggle.onclick = () => {
  const current = document.body.getAttribute("data-theme") || "dark";
  const next =
    current === "dark" ? "light" : current === "light" ? "blue" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
};

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

// start quiz
window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initParticles();
  loadQuiz();
};
