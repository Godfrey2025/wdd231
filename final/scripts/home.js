// home.js - Fetch and display recipes with dynamic content generation

// Local storage key for user preferences
const STORAGE_KEY = 'culinaryPreferences';

// Initialize local storage with default values
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            favorites: [],
            viewMode: 'grid'
        }));
    }
}

// Fetch recipes from JSON file
async function fetchRecipes() {
    try {
        const response = await fetch('./data/recipes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        displayError('Unable to load recipes. Please try again later.');
        return [];
    }
}

// Display error message
function displayError(message) {
    const recipeList = document.querySelector('.recipe-list');
    if (recipeList) {
        recipeList.innerHTML = `<p class="error-message">${message}</p>`;
    }
}

// Create recipe card HTML
function createRecipeCard(recipe) {
    return `
    <div class="recipe-card" data-recipe-id="${recipe.id}">
      <img src="images/${recipe.image}" alt="${recipe.name}" loading="lazy">
      <div class="recipe-card-content">
        <h3>${recipe.name}</h3>
        <p class="cuisine"><strong>Cuisine:</strong> ${recipe.cuisine}</p>
        <p class="difficulty">
          <strong>Difficulty:</strong> 
          <span class="difficulty-${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
        </p>
        <p class="rating">⭐ ${recipe.rating}/5</p>
        <div class="recipe-info">
          <span>⏱️ ${recipe.prepTime} prep</span>
          <span>🔥 ${recipe.cookTime} cook</span>
          <span>🍽️ ${recipe.servings} servings</span>
        </div>
        <p class="description">${recipe.description}</p>
        <div class="recipe-actions">
          <button class="btn-view-details" data-recipe-id="${recipe.id}">View Details</button>
          <button class="btn-favorite" data-recipe-id="${recipe.id}">❤️ Favorite</button>
        </div>
      </div>
    </div>
  `;
}

// Display recipes on page
function displayRecipes(recipes) {
    const recipeList = document.querySelector('.recipe-list');
    if (!recipeList) return;

    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes available.</p>';
        return;
    }

    // Use map to transform recipes to HTML
    const recipesHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
    recipeList.innerHTML = recipesHTML;

    // Attach event listeners
    attachRecipeEventListeners(recipes);
}

// Attach event listeners to recipe cards
function attachRecipeEventListeners(recipes) {
    const detailButtons = document.querySelectorAll('.btn-view-details');
    const favoriteButtons = document.querySelectorAll('.btn-favorite');

    detailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const recipeId = parseInt(this.dataset.recipeId);
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe) {
                showRecipeModal(recipe);
            }
        });
    });

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const recipeId = parseInt(this.dataset.recipeId);
            toggleFavorite(recipeId, button);
        });
    });

    // Update favorite button states on load
    loadFavoriteStates();
}

// Show recipe details modal
function showRecipeModal(recipe) {
    let modal = document.getElementById('recipeModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'recipeModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    const ingredientsList = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');

    modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${recipe.name}</h2>
      <img src="images/${recipe.image}" alt="${recipe.name}" class="modal-image">
      <div class="modal-body">
        <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
        <p><strong>Description:</strong> ${recipe.description}</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        <p><strong>Rating:</strong> ⭐ ${recipe.rating}/5</p>
        <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
        <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <h3>Ingredients:</h3>
        <ul>
          ${ingredientsList}
        </ul>
      </div>
    </div>
  `;

    modal.style.display = 'block';

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Toggle favorite status
function toggleFavorite(recipeId, button) {
    const prefs = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const index = prefs.favorites.indexOf(recipeId);

    if (index === -1) {
        prefs.favorites.push(recipeId);
        button.classList.add('favorited');
    } else {
        prefs.favorites.splice(index, 1);
        button.classList.remove('favorited');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

// Load and update favorite button states
function loadFavoriteStates() {
    const prefs = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const buttons = document.querySelectorAll('.btn-favorite');

    buttons.forEach(button => {
        const recipeId = parseInt(button.dataset.recipeId);
        if (prefs.favorites.includes(recipeId)) {
            button.classList.add('favorited');
        } else {
            button.classList.remove('favorited');
        }
    });
}

// Initialize and load recipes
async function init() {
    initializeStorage();
    const recipes = await fetchRecipes();
    displayRecipes(recipes);
}

// Load when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}