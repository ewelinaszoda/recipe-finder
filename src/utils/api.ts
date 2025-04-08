import { Recipe } from "../types/Recipe";

const BASE_URL = "https://dummyjson.com/recipes";

export const fetchRecipes = async (
  query: string,
  limit: number = 30,
  skip: number = 0
): Promise<Recipe[]> => {
  try {
    const url = `${BASE_URL}?limit=100`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }

    const data = await response.json();
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    const filtered = data.recipes.filter((recipe: any) => {
      const nameMatch = recipe.name.toLowerCase().includes(normalizedQuery);
      const ingredientMatch = recipe.ingredients.some((ingredient: string) =>
        ingredient.toLowerCase().includes(normalizedQuery)
      );
      return nameMatch || ingredientMatch;
    });

    return filtered.map((item: any) => ({
      id: item.id,
      name: item.name,
      cuisine: item.cuisine,
      image: item.image || "https://via.placeholder.com/150x150?text=No+Image",
      prepTimeMinutes: item.prepTimeMinutes,
      cookTimeMinutes: item.cookTimeMinutes,
      servings: item.servings,
      ingredients: item.ingredients,
      instructions: Array.isArray(item.instructions)
        ? item.instructions
        : [item.instructions],
      isFavorite: false,
    }));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
