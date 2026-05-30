const QUIZ_FILES = [
  "cryptography-quiz.json",
  "cybersecurity-quiz.json",
  "hardware-quiz.json",
  "hardware-quiz2.json",
  "memory-quiz.json",
  "puf-quiz.json",
  "side-channel-quiz.json",
  "testing-quiz.json",
  "trojan-quiz.json",
];

const EXAM_SIZE = 32;
const WRONG_PENALTY = 0.3;
const MAX_POINTS = 13;
const SUFFICIENT_RAW_SCORE = 17;
const EXAM_DURATION_SECONDS = 60 * 60;

const app = document.querySelector("#app");
const poolStatus = document.querySelector("#poolStatus");

const state = {
  banks: [],
  activeBankId: "generated",
  exam: [],
  answers: new Map(),
  current: 0,
  submitted: false,
  startedAt: null,
  submittedAt: null,
  timer: null,
};

init();

async function init() {
  try {
    const generatedSources = Array.isArray(window.QUIZ_DATA)
      ? window.QUIZ_DATA.map((entry) => createSource(entry.fileName, entry.data))
      : await Promise.all(QUIZ_FILES.map(loadQuizFile));

    const realExamSources = Array.isArray(window.REAL_EXAM_DATA)
      ? window.REAL_EXAM_DATA.map((entry) => createSource(entry.fileName, entry.data))
      : [];

    state.banks = [
      createBank("generated", "Generated quiz pool", "Topic JSON exports", generatedSources),
      createBank("real", "Real exam question simulations", "Extracted closed-ended past/sample questions", realExamSources),
    ].filter((bank) => bank.sources.length > 0);

    poolStatus.textContent = `${getTotalQuestionCount()} questions loaded`;
    renderSetup();
  } catch (error) {
    poolStatus.textContent = "Load failed";
    renderLoadError(error);
  }
}

async function loadQuizFile(fileName) {
  const response = await fetch(fileName, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`${fileName}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return createSource(fileName, data);
}

function createSource(fileName, data) {
  const id = slugify(fileName.replace(".json", ""));
  const title = data.title || fileName;
  const questions = (data.questions || [])
    .map((question, index) => normalizeQuestion(question, index, { id, title, fileName }))
    .filter(Boolean);

  return {
    id,
    title,
    fileName,
    questions,
  };
}

function createBank(id, title, description, sources) {
  return {
    id,
    title,
    description,
    sources,
    pool: sources.flatMap((source) => source.questions),
    selectedSources: new Set(sources.map((source) => source.id)),
  };
}

function normalizeQuestion(question, index, source) {
  if (!question || !question.question || !Array.isArray(question.options)) {
    return null;
  }

  const options = question.options
    .filter((option) => option && option.label && option.text)
    .map((option) => ({
      label: String(option.label),
      text: String(option.text),
      isCorrect: Boolean(option.isCorrect),
      rationale: option.rationale ? String(option.rationale) : "",
    }));

  const correctOption = options.find((option) => option.isCorrect);
  const correctAnswer = String(question.correctAnswer || correctOption?.label || "");

  if (options.length < 2 || !correctAnswer) {
    return null;
  }

  return {
    id: `${source.id}-${question.number || index + 1}-${hashText(question.question)}`,
    number: question.number || index + 1,
    sourceId: source.id,
    sourceTitle: question.source ? String(question.source) : source.title,
    sourceFile: source.fileName,
    text: String(question.question),
    options,
    hint: question.hint ? String(question.hint) : "",
    correctAnswer,
  };
}

function renderSetup() {
  const bank = getActiveBank();
  const selectedCount = getSelectedPool().length;
  poolStatus.textContent = `${getTotalQuestionCount()} questions loaded`;
  stopTimer();

  app.innerHTML = `
    <div class="setup-grid">
      <section class="panel">
        <h2>Exam Setup</h2>
        <div class="rules">
          <div class="rule"><strong>Up to ${EXAM_SIZE}</strong><span>questions</span></div>
          <div class="rule"><strong>-${formatNumber(WRONG_PENALTY)}</strong><span>per wrong answer</span></div>
          <div class="rule"><strong>${MAX_POINTS}</strong><span>max scaled points</span></div>
          <div class="rule"><strong>${SUFFICIENT_RAW_SCORE}/32</strong><span>sufficient ratio</span></div>
          <div class="rule"><strong>60 min</strong><span>time limit</span></div>
        </div>
        <h3>Practice Modes</h3>
        <div class="bank-sections" id="bankSections"></div>
        <h3>${escapeHtml(bank.title)} Sources</h3>
        <div class="source-list" id="sourceList"></div>
        <div class="actions">
          <button class="button" id="startExam" ${selectedCount === 0 ? "disabled" : ""}>Start ${escapeHtml(bank.title)}</button>
          <button class="button secondary" id="selectAll">Select All</button>
          <button class="button secondary" id="clearAll">Clear</button>
        </div>
      </section>
      <aside class="side-panel">
        <h2>${escapeHtml(bank.title)}</h2>
        <div class="stats">
          <div class="stat"><span>Selected questions</span><strong>${selectedCount}</strong></div>
          <div class="stat"><span>Sources</span><strong>${bank.sources.length}</strong></div>
          <div class="stat"><span>Questions</span><strong>${bank.pool.length}</strong></div>
          <div class="stat"><span>Attempt size</span><strong>${formatAttemptSize(selectedCount)}</strong></div>
        </div>
      </aside>
    </div>
  `;

  renderBankSections();
  renderSourceList();
  document.querySelector("#startExam").addEventListener("click", () => startExam());
  document.querySelector("#selectAll").addEventListener("click", () => {
    bank.selectedSources = new Set(bank.sources.map((source) => source.id));
    renderSetup();
  });
  document.querySelector("#clearAll").addEventListener("click", () => {
    bank.selectedSources.clear();
    renderSetup();
  });
}

function renderBankSections() {
  const container = document.querySelector("#bankSections");
  container.replaceChildren(
    ...state.banks.map((bank) => {
      const selectedCount = getSelectedPoolForBank(bank).length;
      const attemptSize = getAttemptSize(selectedCount);
      const section = document.createElement("section");
      section.className = "bank-card";
      if (bank.id === state.activeBankId) {
        section.classList.add("active");
      }

      const body = document.createElement("div");
      const title = document.createElement("h4");
      title.textContent = bank.title;
      const description = document.createElement("p");
      description.textContent = bank.description;
      const meta = document.createElement("span");
      meta.textContent = `${selectedCount} selected / ${bank.pool.length} total, ${attemptSize} in next attempt`;
      body.append(title, description, meta);

      const actions = document.createElement("div");
      actions.className = "bank-actions";
      const choose = document.createElement("button");
      choose.className = "button secondary";
      choose.type = "button";
      choose.textContent = bank.id === state.activeBankId ? "Selected" : "Select";
      choose.addEventListener("click", () => {
        state.activeBankId = bank.id;
        renderSetup();
      });

      const start = document.createElement("button");
      start.className = "button";
      start.type = "button";
      start.textContent = "Start";
      start.disabled = selectedCount === 0;
      start.addEventListener("click", () => startExam(bank.id));
      actions.append(choose, start);

      section.append(body, actions);
      return section;
    }),
  );
}

function renderSourceList() {
  const bank = getActiveBank();
  const list = document.querySelector("#sourceList");
  list.replaceChildren(
    ...bank.sources.map((source) => {
      const label = document.createElement("label");
      label.className = "source-row";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = bank.selectedSources.has(source.id);
      input.addEventListener("change", () => {
        if (input.checked) {
          bank.selectedSources.add(source.id);
        } else {
          bank.selectedSources.delete(source.id);
        }
        renderSetup();
      });

      const title = document.createElement("strong");
      title.textContent = source.title;

      const count = document.createElement("span");
      count.textContent = `${source.questions.length}`;

      label.append(input, title, count);
      return label;
    }),
  );
}

function startExam(bankId = state.activeBankId) {
  state.activeBankId = bankId;
  const selectedPool = getSelectedPool();
  const attemptSize = getAttemptSize(selectedPool.length);
  if (attemptSize === 0) {
    return;
  }

  state.exam = shuffle(selectedPool).slice(0, attemptSize).map((question) => ({
    ...question,
    options: shuffle(question.options),
  }));
  state.answers = new Map();
  state.current = 0;
  state.submitted = false;
  state.startedAt = Date.now();
  state.submittedAt = null;
  startTimer();
  renderExam();
}

function renderExam() {
  const question = state.exam[state.current];
  const questionCount = getCurrentQuestionCount();
  const selected = state.answers.get(question.id);
  const elapsedSeconds = getElapsedSeconds();
  const remainingSeconds = getRemainingSeconds();
  const score = scoreExam();

  poolStatus.textContent = state.submitted
    ? `Raw ${formatNumber(score.rawScore)} / ${questionCount}`
    : `Question ${state.current + 1} of ${questionCount}`;

  app.innerHTML = `
    <div class="exam-grid">
      <section class="question-panel">
        <div class="question-meta">
          <span class="pill">${state.current + 1} / ${questionCount}</span>
          <span class="pill">${escapeHtml(question.sourceTitle)}</span>
          <span class="pill">Original #${question.number}</span>
        </div>
        <p class="question-text"></p>
        <div class="options" id="options"></div>
        <div class="question-actions">
          <button class="button secondary" id="previousQuestion" ${state.current === 0 ? "disabled" : ""}>Previous</button>
          <button class="button secondary" id="clearAnswer" ${!selected || state.submitted ? "disabled" : ""}>Clear Answer</button>
          <button class="button" id="nextQuestion">${state.current === questionCount - 1 ? "Finish" : "Next"}</button>
        </div>
      </section>
      <aside class="side-panel">
        <h2>${state.submitted ? "Review" : "Attempt"}</h2>
        <div class="stats">
          <div class="stat"><span>Answered</span><strong>${state.answers.size}</strong></div>
          <div class="stat"><span>Unanswered</span><strong>${questionCount - state.answers.size}</strong></div>
          <div class="stat"><span>Time elapsed</span><strong>${formatDuration(elapsedSeconds)}</strong></div>
          <div class="stat"><span>Time remaining</span><strong id="timeRemaining">${formatDuration(remainingSeconds)}</strong></div>
          ${state.submitted ? `<div class="stat"><span>Exam points</span><strong>${formatNumber(score.examPoints)} / ${MAX_POINTS}</strong></div>` : ""}
        </div>
        <div class="navigator" id="navigator"></div>
        <div class="actions">
          ${state.submitted ? `<button class="button" id="newExam">New Random Exam</button>` : `<button class="button danger" id="submitExam">Submit Exam</button>`}
        </div>
      </aside>
    </div>
  `;

  document.querySelector(".question-text").textContent = question.text;
  renderOptions(question);
  renderNavigator();
  bindExamActions();
}

function renderOptions(question) {
  const container = document.querySelector("#options");
  const selected = state.answers.get(question.id);

  container.replaceChildren(
    ...question.options.map((option) => {
      const label = document.createElement("label");
      label.className = "option";
      if (selected === option.label) {
        label.classList.add("selected");
      }
      if (state.submitted && option.label === question.correctAnswer) {
        label.classList.add("correct");
      }
      if (state.submitted && selected === option.label && selected !== question.correctAnswer) {
        label.classList.add("incorrect");
      }

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = option.label;
      radio.checked = selected === option.label;
      radio.disabled = state.submitted;
      radio.addEventListener("change", () => {
        state.answers.set(question.id, option.label);
        renderExam();
      });

      const marker = document.createElement("span");
      marker.className = "option-label";
      marker.textContent = option.label;

      const body = document.createElement("div");
      const text = document.createElement("div");
      text.className = "option-text";
      text.textContent = option.text;
      body.append(text);

      if (state.submitted && option.rationale) {
        const rationale = document.createElement("div");
        rationale.className = "rationale";
        rationale.textContent = option.rationale;
        body.append(rationale);
      }

      label.append(radio, marker, body);
      return label;
    }),
  );

  if (state.submitted && question.hint) {
    const hint = document.createElement("p");
    hint.className = "rationale";
    hint.textContent = `Hint: ${question.hint}`;
    container.append(hint);
  }
}

function renderNavigator() {
  const navigator = document.querySelector("#navigator");
  navigator.replaceChildren(
    ...state.exam.map((question, index) => {
      const button = document.createElement("button");
      button.className = "nav-button";
      button.type = "button";
      button.textContent = String(index + 1);
      if (index === state.current) {
        button.classList.add("current");
      }
      if (state.answers.has(question.id)) {
        button.classList.add("answered");
      }
      if (state.submitted) {
        const selected = state.answers.get(question.id);
        if (selected === question.correctAnswer) {
          button.classList.add("right");
        } else if (selected) {
          button.classList.add("wrong");
        }
      }
      button.addEventListener("click", () => {
        state.current = index;
        renderExam();
      });
      return button;
    }),
  );
}

function bindExamActions() {
  document.querySelector("#previousQuestion").addEventListener("click", () => {
    state.current = Math.max(0, state.current - 1);
    renderExam();
  });

  document.querySelector("#nextQuestion").addEventListener("click", () => {
    if (state.current === getCurrentQuestionCount() - 1) {
      if (!state.submitted) {
        submitExam();
      } else {
        renderResults();
      }
      return;
    }
    state.current += 1;
    renderExam();
  });

  const clearButton = document.querySelector("#clearAnswer");
  clearButton.addEventListener("click", () => {
    const question = state.exam[state.current];
    state.answers.delete(question.id);
    renderExam();
  });

  const submitButton = document.querySelector("#submitExam");
  if (submitButton) {
    submitButton.addEventListener("click", submitExam);
  }

  const newExamButton = document.querySelector("#newExam");
  if (newExamButton) {
    newExamButton.addEventListener("click", renderSetup);
  }
}

function submitExam(options = {}) {
  const force = Boolean(options.force);
  const unanswered = getCurrentQuestionCount() - state.answers.size;
  const ok = force || unanswered === 0 || window.confirm(`${unanswered} questions are unanswered. Submit anyway?`);
  if (!ok) {
    return;
  }

  state.submitted = true;
  state.submittedAt = Date.now();
  stopTimer();
  renderResults();
}

function renderResults() {
  const score = scoreExam();
  const questionCount = getCurrentQuestionCount();
  const sufficientThreshold = getSufficientRawScore(questionCount);
  const sufficient = score.rawScore >= sufficientThreshold;
  poolStatus.textContent = `${formatNumber(score.examPoints)} / ${MAX_POINTS} points`;

  app.innerHTML = `
    <div class="results-grid">
      <section class="panel">
        <h2>Result</h2>
        <div class="results-banner">
          <div class="result-tile ${sufficient ? "sufficient" : "insufficient"}">
            <strong>${sufficient ? "Sufficient" : "Not sufficient"}</strong>
            <span>threshold ${formatNumber(sufficientThreshold)} raw</span>
          </div>
          <div class="result-tile"><strong>${formatNumber(score.rawScore)} / ${questionCount}</strong><span>penalized raw score</span></div>
          <div class="result-tile"><strong>${formatNumber(score.examPoints)} / ${MAX_POINTS}</strong><span>exam points</span></div>
          <div class="result-tile"><strong>${formatDuration(getElapsedSeconds())}</strong><span>duration</span></div>
        </div>
        <div class="rules">
          <div class="rule"><strong>${score.correct}</strong><span>correct</span></div>
          <div class="rule"><strong>${score.wrong}</strong><span>wrong</span></div>
          <div class="rule"><strong>${score.blank}</strong><span>blank</span></div>
          <div class="rule"><strong>-${formatNumber(score.penalty)}</strong><span>total penalty</span></div>
        </div>
        <div class="actions">
          <button class="button" id="reviewExam">Review Answers</button>
          <button class="button secondary" id="newExam">New Random Exam</button>
        </div>
      </section>
      <aside class="side-panel">
        <h2>Formula</h2>
        <div class="stats">
          <div class="stat"><span>Raw score</span><strong>C - 0.3W</strong></div>
          <div class="stat"><span>Points</span><strong>raw x 13/questions</strong></div>
          <div class="stat"><span>Time limit</span><strong>60 min</strong></div>
          <div class="stat"><span>Minimum sufficient</span><strong>${formatNumber(sufficientThreshold)} raw</strong></div>
        </div>
      </aside>
    </div>
  `;

  document.querySelector("#reviewExam").addEventListener("click", () => {
    state.current = 0;
    renderExam();
  });
  document.querySelector("#newExam").addEventListener("click", renderSetup);
}

function scoreExam() {
  let correct = 0;
  let wrong = 0;

  for (const question of state.exam) {
    const selected = state.answers.get(question.id);
    if (!selected) {
      continue;
    }
    if (selected === question.correctAnswer) {
      correct += 1;
    } else {
      wrong += 1;
    }
  }

  const questionCount = getCurrentQuestionCount();
  const blank = Math.max(0, questionCount - correct - wrong);
  const penalty = wrong * WRONG_PENALTY;
  const rawScore = correct - penalty;
  const examPoints = questionCount > 0 ? Math.max(0, rawScore) * (MAX_POINTS / questionCount) : 0;

  return {
    correct,
    wrong,
    blank,
    penalty,
    rawScore,
    examPoints,
  };
}

function getSelectedPool() {
  return getSelectedPoolForBank(getActiveBank());
}

function getSelectedPoolForBank(bank) {
  return bank.pool.filter((question) => bank.selectedSources.has(question.sourceId));
}

function getAttemptSize(selectedCount) {
  return Math.min(EXAM_SIZE, selectedCount);
}

function getCurrentQuestionCount() {
  return state.exam.length;
}

function getSufficientRawScore(questionCount) {
  return questionCount * (SUFFICIENT_RAW_SCORE / EXAM_SIZE);
}

function formatAttemptSize(selectedCount) {
  const attemptSize = getAttemptSize(selectedCount);
  if (attemptSize === 0) {
    return "0";
  }
  return attemptSize === EXAM_SIZE ? `${EXAM_SIZE}` : `${attemptSize} practice`;
}

function getActiveBank() {
  return state.banks.find((bank) => bank.id === state.activeBankId) || state.banks[0];
}

function getTotalQuestionCount() {
  return state.banks.reduce((total, bank) => total + bank.pool.length, 0);
}

function startTimer() {
  stopTimer();
  state.timer = window.setInterval(() => {
    if (!state.submitted && state.exam.length) {
      const remainingSeconds = getRemainingSeconds();
      const timeNode = document.querySelector("#timeRemaining");
      if (timeNode) {
        timeNode.textContent = formatDuration(remainingSeconds);
      }
      if (remainingSeconds <= 0) {
        submitExam({ force: true });
      }
    }
  }, 1000);
}

function stopTimer() {
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
  }
}

function getElapsedSeconds() {
  if (!state.startedAt) {
    return 0;
  }
  const end = state.submittedAt || Date.now();
  return Math.max(0, Math.floor((end - state.startedAt) / 1000));
}

function getRemainingSeconds() {
  return Math.max(0, EXAM_DURATION_SECONDS - getElapsedSeconds());
}

function renderLoadError(error) {
  app.innerHTML = `
    <section class="panel error">
      <h2>Could not load the quiz files</h2>
      <p>${escapeHtml(error.message)}</p>
      <p>Serve this folder over HTTP, for example with <strong>python -m http.server 8000</strong>, then open <strong>http://localhost:8000</strong>.</p>
    </section>
  `;
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function hashText(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
  }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
