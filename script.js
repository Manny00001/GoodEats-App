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

for (let i = 0; i < 6; i++) {
  feed.appendChild(makeSlide());
}

feed.addEventListener("scroll", () => {
  const nearBottom = feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 1000;

  if (nearBottom) {
    feed.appendChild(makeSlide());
  }

  if (feed.children.length > 9) {
    const firstHeight = feed.firstElementChild.offsetHeight;
    feed.removeChild(feed.firstElementChild);
    feed.scrollTop -= firstHeight;
  }
});
