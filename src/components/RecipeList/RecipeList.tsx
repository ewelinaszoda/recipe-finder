import React from "react";
import { Recipe } from "../../types/Recipe";
import "./RecipeList.scss";

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: Recipe[];
  onToggleFavorite: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className="recipe-list">
      <h2>Search Results</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => {
          const isFavorite = favorites.some((fav) => fav.id === recipe.id);
          return (
            <div
              key={recipe.id}
              className="recipe-item"
              onClick={() => onSelectRecipe(recipe)}
            >
              <h3>{recipe.name}</h3>
              <div className="recipe-meta">
                <span>Cuisine: {recipe.cuisine}</span>
                <span>Prep: {recipe.prepTimeMinutes} min</span>
                <span>Cook: {recipe.cookTimeMinutes} min</span>
                <span>Servings: {recipe.servings}</span>
              </div>
              <div className="image-container">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-image"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/150x150?text=No+Image";
                  }}
                />
                <button
                  className={`heart-button ${isFavorite ? "filled" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(recipe);
                  }}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {isFavorite ? "♥" : "♡"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeList;
