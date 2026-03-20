export interface Recipe {
  id: number;
  name: string;
  image: string;
  category: string;
  difficulty: string;
  prepTime: string;
  description?: string;
  ingredients?: string[];
  steps?: string[];
}

export type CreateRecipeInput = Omit<Recipe, "id">;

export interface Category {
  id: number;
  name: string;
}
