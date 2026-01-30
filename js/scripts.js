
const STORAGE_KEY = "gourmetech_favorites";

// MENU BURGER ------------

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    menu.classList.toggle("open");
});

// DARK MODE - LOCAL STORAGE ------------

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Charger le thème 
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
}

// Événement au clic
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    const isDark = body.classList.contains("dark-theme");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// BOUTON AJOUTER FAVORIS ------------

document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    if (favoriteButtons.length === 0) return;
    // Récupérer les favoris
    const getFavorites = () =>
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    // Sauvegarder les favoris
    const saveFavorites = (favorites) =>
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    // Vérifier si la recette est déjà favorite
    const isFavorite = (id) =>
        getFavorites().includes(id);

    favoriteButtons.forEach(button => {
        const recipeId = button.dataset.recipeId;
        // Mettre à jour le bouton
        const updateButton = () => {
            if (isFavorite(recipeId)) {
                button.classList.add("is-favorite");
                button.textContent = "🤍 Retirer des favoris";
            } else {
                button.classList.remove("is-favorite");
                button.textContent = "❤️ Ajouter aux favoris";
            }
        };
        // Événement Clic sur le bouton
        button.addEventListener("click", () => {
            let favorites = getFavorites();

            if (isFavorite(recipeId)) {
                favorites = favorites.filter(id => id !== recipeId);
            } else {
                favorites.push(recipeId);
            }

            saveFavorites(favorites);
            updateButton();
        });

        // Initialisation au chargement
        updateButton();
    });
});


// AJOUTER DES RECETTES AUX FAVORIS ------------

class Recipe {
    constructor(id, title, image, link) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.link = link;
    }

    renderCard() {
        return `
        <article class="recipe-card">
            <a href="${this.link}">
                <img src="${this.image}" alt="${this.title}">
                <h2>${this.title}</h2>
            </a>
        </article>
    `;
    }

}

const RECIPES = [
    new Recipe(
        "tarte-pommes",
        "Tarte aux pommes",
        "assets/images/Tarte-pommes-diliara-garifullina-Lkb1g9ivC2c-unsplash.jpg",
        "recette-tarte-pommes.html"
    ),

    new Recipe(
        "ratatouille",
        "Ratatouille à la provençale",
        "assets/images/Ratatouille-provencale-marjan-sadeghi-3vDJ--i7w88-unsplash.jpg",
        "recette-ratatouille.html"
    ),

    new Recipe(
        "veloute-potiron",
        "Velouté de potiron",
        "assets/images/Veloute-potiron-elena-leya-vesMzw6ADMA-unsplash.jpg",
        "recette-veloute-potiron.html"
    )
];

document.addEventListener("DOMContentLoaded", () => {
    const favoritesGrid = document.getElementById("favoritesGrid");
    const emptyMessage = document.getElementById("emptyFavorites");

    if (!favoritesGrid) return;

    const favoriteIds =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (favoriteIds.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    favoriteIds.forEach(id => {
        const recipe = RECIPES.find(r => r.id === id);
        if (!recipe) return;

        favoritesGrid.insertAdjacentHTML(
            "beforeend",
            recipe.renderCard()
        );
    });
});

