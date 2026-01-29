
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
    const favoriteBtn = document.getElementById("favoriteBtn");
    if (!favoriteBtn) return;

    const recipeId = favoriteBtn.dataset.recipeId;
    const STORAGE_KEY = "gourmetech_favorites";

    // Récupérer les favoris
    const getFavorites = () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    };

    // Sauvegarder les favoris
    const saveFavorites = (favorites) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    };

    // Vérifier si la recette est déjà favorite
    const isFavorite = (id) => {
        return getFavorites().includes(id);
    };

    // Mettre à jour le bouton
    const updateButton = () => {
        if (isFavorite(recipeId)) {
            favoriteBtn.classList.add("is-favorite");
            favoriteBtn.innerHTML = "🤍 Retirer des favoris";
        } else {
            favoriteBtn.classList.remove("is-favorite");
            favoriteBtn.innerHTML = "❤️ Ajouter aux favoris";
        }
    };

    // Clic sur le bouton
    favoriteBtn.addEventListener("click", () => {
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
