import React from "react";
import { Recipe } from "../../types/Recipe";
import "./FavoriteRecipes.scss";

interface FavoriteRecipesProps {
  favorites: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe) => void;
}

const FavoriteRecipes: React.FC<FavoriteRecipesProps> = ({
  favorites,
  onSelectRecipe,
  onToggleFavorite,
}) => {
  if (favorites.length === 0) return null;

  return (
    <div className="favorite-recipes">
      <h2>Favorite Recipes</h2>
      <div className="favorites-container">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="favorite-item">
            <div
              className="favorite-content"
              onClick={() => onSelectRecipe(recipe)}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="favorite-image"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/80x80?text=No+Image";
                }}
              />
              <h3>{recipe.name}</h3>
            </div>
            <button
              className="remove-button"
              onClick={() => onToggleFavorite(recipe)}
              aria-label="Remove from favorites"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
