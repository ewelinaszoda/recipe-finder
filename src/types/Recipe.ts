export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: string[];
  instructions: string[];
  servings: number;
  isFavorite: boolean;
}
