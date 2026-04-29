function selectLesson(number) {
  const lessons = document.querySelectorAll(".lesson");

  lessons.forEach((lesson) => {
    lesson.classList.remove("active");
  });

  const selected = lessons[number - 1];

  if (!selected || selected.classList.contains("locked")) {
    return;
  }

  selected.classList.add("active");
}
