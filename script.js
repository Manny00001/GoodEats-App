const feed = document.getElementById("feed");

const posts = [
  {
    name: "(Food Name)",
    desc: "A short description of the food goes here. Mention the taste, style, or why it is worth trying.",
    tags: ["#Tag", "#Tag", "#Tag"]
  },
  {
    name: "(Food Name)",
    desc: "Quick, simple, and made for people who want something good without overthinking dinner.",
    tags: ["#Tag", "#Tag", "#Tag"]
  },
  {
    name: "(Food Name)",
    desc: "A budget-friendly meal idea that could fit dorms, busy nights, or simple home cooking.",
    tags: ["#Tag", "#Tag", "#Tag"]
  }
];

let postIndex = 0;
let currentIndex = 0;

function makeSlide() {
  const post = posts[postIndex % posts.length];
  postIndex++;

  const slide = document.createElement("article");
  slide.className = "video-slide";

  slide.innerHTML = `
    <div class="video-area">
      <div class="loading-circle"></div>
    </div>

    <div class="caption">
      <div class="tag-row">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <h3>${post.name}</h3>
      <p>${post.desc}</p>
    </div>

    <button class="menu-lines" aria-label="More options">
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  `;

  return slide;
}

function fillInitialFeed() {
  feed.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    feed.appendChild(makeSlide());
  }
}

fillInitialFeed();

feed.addEventListener("scroll", () => {
  const slideHeight = feed.clientHeight;
  const newIndex = Math.round(feed.scrollTop / slideHeight);

  if (newIndex !== currentIndex) {
    currentIndex = newIndex;
  }

  const nearBottom = feed.scrollTop + feed.clientHeight >= feed.scrollHeight - slideHeight * 2;

  if (nearBottom) {
    feed.appendChild(makeSlide());
  }

  if (feed.children.length > 7) {
    feed.removeChild(feed.firstElementChild);
    feed.scrollTop -= slideHeight;
    currentIndex = Math.max(0, currentIndex - 1);
  }
});
