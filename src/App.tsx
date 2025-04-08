import React, { useEffect, useState } from "react";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import SearchBar from "./components/SearchBar";
import FavoriteRecipes from "./components/FavoriteRecipes";
import { fetchRecipes } from "./utils/api";
import { Recipe } from "./types/Recipe";
import "./App.scss";

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a search term");
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
      if (results.length === 0) {
        setError(`No recipes found for "${query}"`);
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  const handleToggleFavorite = (recipe: Recipe) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === recipe.id)
        ? prevFavorites.filter((fav) => fav.id !== recipe.id)
        : [...prevFavorites, recipe]
    );
  };

  return (
    <div className="app">
      <h1>Recipe Finder</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loading">Loading recipes...</div>}
      {error && <div className="error-message">{error}</div>}

      {recipes.length > 0 && (
        <RecipeList
          recipes={recipes}
          onSelectRecipe={handleSelectRecipe}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {favorites.length > 0 && (
        <FavoriteRecipes
          favorites={favorites}
          onSelectRecipe={handleSelectRecipe}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <RecipeDetail recipe={selectedRecipe} onClose={handleCloseDetail} />
    </div>
  );
};

export default App;
