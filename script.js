const feed = document.getElementById("feed");

const posts = [
  {
    id: "garlic-butter-pasta",
    name: "Garlic Butter Pasta",
    desc: "A quick buttery pasta with garlic, parmesan, and a simple stove-top sauce.",
    tags: ["#Quick", "#Cheap", "#Pasta"],
    price: "$5.50",
    servings: "2 servings",
    prep: "10 minutes",
    cook: "15 minutes",
    difficulty: "3 / 10",
    appliances: "Stove, pot, pan",
    ingredients: [
      "Pasta",
      "Butter",
      "Garlic",
      "Parmesan",
      "Salt",
      "Black pepper"
    ],
    steps: [
      "Boil the pasta until soft.",
      "Melt butter in a pan on low heat.",
      "Add chopped garlic and cook for about one minute.",
      "Mix the pasta into the butter and garlic.",
      "Add parmesan, salt, and black pepper.",
      "Serve warm."
    ]
  },
  {
    id: "placeholder-1",
    name: "(Food Name)",
    desc: "A short description of the food goes here. Mention the taste, style, or why it is worth trying.",
    tags: ["#Tag", "#Tag", "#Tag"],
    placeholder: true
  },
  {
    id: "placeholder-2",
    name: "(Food Name)",
    desc: "Quick, simple, and made for people who want something good without overthinking dinner.",
    tags: ["#Tag", "#Tag", "#Tag"],
    placeholder: true
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

  const menuBtn = slide.querySelector(".menu-lines");
  menuBtn.addEventListener("click", () => openPostMenu(post));

  return slide;
}

function openPostMenu(post) {
  closePostMenu();

  const menu = document.createElement("div");
  menu.className = "post-menu";
  menu.id = "postMenu";

  menu.innerHTML = `
    <button id="viewRecipeBtn">View Recipe</button>
    <button id="shareRecipeBtn">Share Recipe Link</button>
    <button id="closeMenuBtn">Close</button>
  `;

  document.body.appendChild(menu);

  document.getElementById("viewRecipeBtn").addEventListener("click", () => {
    closePostMenu();
    viewRecipe(post);
  });

  document.getElementById("shareRecipeBtn").addEventListener("click", () => {
    const link = `${window.location.origin}${window.location.pathname}#recipe=${post.id}`;

    navigator.clipboard.writeText(link).then(() => {
      alert("Recipe link copied.");
    }).catch(() => {
      alert(link);
    });
  });

  document.getElementById("closeMenuBtn").addEventListener("click", closePostMenu);
}

function closePostMenu() {
  const oldMenu = document.getElementById("postMenu");
  if (oldMenu) oldMenu.remove();
}

function viewRecipe(post) {
  closeRecipeModal();

  if (post.placeholder) {
    alert("This recipe is a placeholder for now.");
    return;
  }

  const modal = document.createElement("div");
  modal.className = "recipe-modal";
  modal.id = "recipeModal";

  modal.innerHTML = `
    <div class="recipe-card-view">
      <button class="close-recipe" id="closeRecipeBtn">×</button>

      <p class="recipe-label">GoodEats Recipe</p>
      <h1>${post.name}</h1>
      <p class="recipe-desc">${post.desc}</p>

      <div class="recipe-line-grid">
        <div class="recipe-line">
          <b>Estimated Price</b>
          <span>${post.price}</span>
        </div>

        <div class="recipe-line">
          <b>Servings</b>
          <span>${post.servings}</span>
        </div>

        <div class="recipe-line">
          <b>Time to Prepare</b>
          <span>${post.prep}</span>
        </div>

        <div class="recipe-line">
          <b>Time to Cook</b>
          <span>${post.cook}</span>
        </div>

        <div class="recipe-line">
          <b>Difficulty</b>
          <span>${post.difficulty}</span>
        </div>

        <div class="recipe-line">
          <b>Appliances</b>
          <span>${post.appliances}</span>
        </div>
      </div>

      <section class="recipe-section">
        <h2>Ingredients</h2>
        ${post.ingredients.map(item => `
          <div class="filled-line">${item}</div>
        `).join("")}
      </section>

      <section class="recipe-section">
        <h2>Preparation</h2>
        ${post.steps.map((step, index) => `
          <div class="filled-line">
            <strong>Step ${index + 1}.</strong> ${step}
          </div>
        `).join("")}
      </section>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("closeRecipeBtn").addEventListener("click", closeRecipeModal);
}

function closeRecipeModal() {
  const oldModal = document.getElementById("recipeModal");
  if (oldModal) oldModal.remove();
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
