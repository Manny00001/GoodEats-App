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

function createPost() {
  const post = posts[postIndex % posts.length];
  postIndex++;

  const slide = document.createElement("article");
  slide.className = "video-slide";

  slide.innerHTML = `
    <div class="video-area">
      <div class="loading-circle"></div>
      <div class="play-icon">▶</div>
    </div>

    <div class="caption">
      <div class="tag-row">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <h3>${post.name}</h3>
      <p>${post.desc}</p>
    </div>

    <div class="actions">
      <button class="dots">•••</button>
    </div>
  `;

  feed.appendChild(slide);
}

for (let i = 0; i < 6; i++) {
  createPost();
}

feed.addEventListener("scroll", () => {
  const nearBottom = feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 900;

  if (nearBottom) {
    for (let i = 0; i < 3; i++) {
      createPost();
    }
  }
});
