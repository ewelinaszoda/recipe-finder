import React from "react";
import { Recipe } from "../../types/Recipe";
import "./RecipeDetail.scss";

interface RecipeDetailProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-detail-overlay">
      <div className="recipe-detail">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close recipe details"
        >
          ✕
        </button>

        <div className="recipe-header">
          <h2>{recipe.name}</h2>
          <div className="recipe-meta">
            <span>Cuisine: {recipe.cuisine}</span>
            <span>Prep time: {recipe.prepTimeMinutes} min</span>
            <span>Cook time: {recipe.cookTimeMinutes} min</span>
            <span>Servings: {recipe.servings}</span>
          </div>
        </div>

        <div className="recipe-image-container">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="detail-image"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>

        <div className="recipe-content">
          <div className="ingredients-section">
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h3>Instructions:</h3>
            <ol className="instructions-list">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
