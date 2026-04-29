let xp = 0;
let completed = 0;
let currentLesson = 0;

const lessons = [
  {
    title: "What is a cell?",
    text: "A cell is the basic unit of life. Every living thing is made of cells.",
    question: "What is the basic unit of life?",
    choices: ["Cell", "Organ", "Tissue"],
    answer: 0
  },
  {
    title: "Cell Parts",
    text: "Cells have parts called organelles. The nucleus controls the cell.",
    question: "Which part controls the cell?",
    choices: ["Cell wall", "Nucleus", "Mitochondria"],
    answer: 1
  },
  {
    title: "Mitosis",
    text: "Mitosis is when one cell divides into two identical cells.",
    question: "What does mitosis make?",
    choices: ["Two identical cells", "One organ", "A virus"],
    answer: 0
  }
];

function startLesson(index) {
  if (index > completed) return;

  currentLesson = index;
  const lesson = lessons[index];

  document.getElementById("homeScreen").classList.add("hidden");
  document.getElementById("lessonScreen").classList.remove("hidden");

  document.getElementById("lessonLabel").textContent = `Lesson ${index + 1}`;
  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonText").textContent = lesson.text;
  document.getElementById("question").textContent = lesson.question;
  document.getElementById("feedback").textContent = "";

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  lesson.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => answerQuiz(i);
    choicesDiv.appendChild(btn);
  });
}

function answerQuiz(choice) {
  const lesson = lessons[currentLesson];
  const feedback = document.getElementById("feedback");

  if (choice === lesson.answer) {
    feedback.textContent = "Correct! +25 XP";
    feedback.style.color = "green";

    if (currentLesson === completed) {
      xp += 25;
      completed++;
      updateUI();
    }

    setTimeout(goHome, 900);
  } else {
    feedback.textContent = "Try again.";
    feedback.style.color = "red";
  }
}

function goHome() {
  document.getElementById("lessonScreen").classList.add("hidden");
  document.getElementById("homeScreen").classList.remove("hidden");
}

function updateUI() {
  document.getElementById("xp").textContent = xp;

  const percent = Math.min((completed / lessons.length) * 100, 100);
  document.getElementById("progressFill").style.width = `${percent}%`;
  document.getElementById("progressText").textContent = `${Math.round(percent)}% complete`;

  document.querySelectorAll(".lesson-bubble").forEach((bubble, index) => {
    if (index <= completed) {
      bubble.classList.remove("locked");
    }
  });
}

updateUI();
