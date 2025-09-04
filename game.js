const categories = {
  jack: {
    name: "You Don't Know Jack",
    levels: [
      {
        q: "With the right spec, speaking with them is a meeting of the... mind.",
        answers: ["think tank", "tank"],
        hints: ["Think Tank", "You're a tank, and he's in a tank."]
      }
    ],
    progress: 0
  },
  history: {
    name: "History Buff",
    levels: [
      {
        q: "Who was the first US president?",
        answers: ["george washington"],
        hints: ["First president", "On the dollar bill"]
      }
    ],
    progress: 0
  },
  science: {
    name: "Science Facts",
    levels: [
      {
        q: "What planet is known as the Red Planet?",
        answers: ["mars"],
        hints: ["Fourth planet", "Named after Roman god of war"]
      }
    ],
    progress: 0
  },
  movies: {
    name: "Movie Madness",
    levels: [
      {
        q: "Who directed Jaws?",
        answers: ["steven spielberg"],
        hints: ["Famous director", "Also made E.T."]
      }
    ],
    progress: 0
  },
  sports: {
    name: "Sports Trivia",
    levels: [
      {
        q: "How many players on a soccer team?",
        answers: ["11"],
        hints: ["Odd number", "Ten plus one"]
      }
    ],
    progress: 0
  }
};

let currentCategory = null;
let wrongAttempts = 0;

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const title = document.getElementById("category-title");
const continueBtn = document.getElementById("continue-btn");
const backBtn = document.getElementById("back-btn");
const questionEl = document.getElementById("question");
const hintsEl = document.getElementById("hints");
const answerEl = document.getElementById("answer");

document.querySelectorAll(".cog").forEach(cog => {
  cog.addEventListener("click", () => {
    const cat = cog.dataset.cat;
    currentCategory = categories[cat];
    title.textContent = currentCategory.name;
    continueBtn.classList.remove("hidden");
  });
});

continueBtn.addEventListener("click", () => {
  menu.classList.add("hidden");
  game.classList.remove("hidden");
  loadLevel();
});

backBtn.addEventListener("click", () => {
  game.classList.add("hidden");
  menu.classList.remove("hidden");
  title.textContent = "";
  continueBtn.classList.add("hidden");
});

document.getElementById("submit-btn").addEventListener("click", () => {
  const level = currentCategory.levels[currentCategory.progress];
  const input = answerEl.value.toLowerCase().trim();
  if (level.answers.includes(input)) {
    currentCategory.progress++;
    wrongAttempts = 0;
    if (currentCategory.progress >= currentCategory.levels.length) {
      questionEl.textContent = "You Win!";
      hintsEl.innerHTML = "";
    } else {
      loadLevel();
    }
  } else {
    wrongAttempts++;
    showHints();
  }
  answerEl.value = "";
});

function loadLevel() {
  const level = currentCategory.levels[currentCategory.progress];
  questionEl.textContent = level.q;
  hintsEl.innerHTML = "";
  wrongAttempts = 0;
}

function showHints() {
  const level = currentCategory.levels[currentCategory.progress];
  hintsEl.innerHTML = "";
  for (let i = 0; i < wrongAttempts && i < level.hints.length; i++) {
    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = "HINT: " + level.hints[i];
    hintsEl.appendChild(hint);
  }
}
