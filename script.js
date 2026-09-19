const products = {
  samosa: {
    title: "Chicken Samosa Bites",
    ingredients: "Spring roll pastry, chicken, potato, onion, garlic, ginger, curry leaves, chicken stock, vegetable oil, salt, mustard seeds, fennel, garam masala, coriander, Kashmiri chilli, cumin, turmeric and carom seeds.",
    allergens: ["Wheat", "Milk", "Celery", "Mustard"]
  },
  pastry: {
    title: "Chicken & Cheese Puff Pastries",
    ingredients: "Puff pastry, chicken, potato, onion, garlic, ginger, curry leaves, vegetable oil, chicken stock, salt, mustard seeds, fennel, garam masala, coriander, Kashmiri chilli, cumin, turmeric, mature cheddar, butter and sesame seeds.",
    allergens: ["Wheat", "Milk", "Celery", "Mustard", "Sesame"]
  },
  "fish-bun": {
    title: "Fish Bun",
    ingredients: "Jack mackerel, potato, onion, leeks, garlic, curry leaves, vegetable oil, salt, mustard seeds, fennel, garam masala, coriander, Kashmiri chilli, black pepper, turmeric, wheat flour, yeast, sugar, water, butter, egg and sesame seeds.",
    allergens: ["Fish", "Wheat", "Milk", "Egg", "Mustard", "Sesame"]
  },
  cake: {
    title: "Butter Cake",
    ingredients: "Salted butter, caster sugar, eggs, fortified wheat flour, baking powder, Madagascan vanilla extract and whole milk.",
    allergens: ["Wheat", "Milk", "Egg"]
  },
  tea: {
    title: "Masala Tea",
    ingredients: "Water, Yorkshire black tea, whole milk, cardamom, cinnamon, cloves, ginger and sugar.",
    allergens: ["Milk"]
  },
  coffee: {
    title: "Herbal Coffee",
    ingredients: "Water, coffee beans, coriander, cumin, dried ginger, cardamom, cinnamon, cloves, black pepper and sugar.",
    allergens: [],
    note: "No declarable allergens identified from the recipe supplied. Contains caffeine."
  }
};

const dialog = document.querySelector("#food-dialog");
const dialogTitle = dialog.querySelector("#dialog-title");
const dialogContent = dialog.querySelector(".dialog-content");
const toast = document.querySelector(".toast");

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = products[button.dataset.product];
    const allergenMarkup = product.allergens.length
      ? `<div class="allergen-tags">${product.allergens.map((item) => `<span>${item}</span>`).join("")}</div>`
      : `<p>${product.note}</p>`;
    dialogTitle.textContent = product.title;
    dialogContent.innerHTML = `<h3>Ingredients</h3><p>${product.ingredients}</p><h3>Allergens</h3>${allergenMarkup}`;
    dialog.showModal();
  });
});

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const box = dialog.getBoundingClientRect();
  const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  if (!inside) dialog.close();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

async function sharePage() {
  const payload = { title: document.title, text: "Discover the RUSI by Ruby menu.", url: window.location.href };
  if (navigator.share) {
    try { await navigator.share(payload); } catch (error) { if (error.name !== "AbortError") showToast("Sharing was not available"); }
  } else {
    await copyLink();
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Website link copied");
  } catch {
    showToast("Copy the address from your browser");
  }
}

document.querySelectorAll("[data-share]").forEach((button) => button.addEventListener("click", sharePage));
document.querySelectorAll("[data-copy-link]").forEach((button) => button.addEventListener("click", copyLink));
document.querySelector("#year").textContent = new Date().getFullYear();
