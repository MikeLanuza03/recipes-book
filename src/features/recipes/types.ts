export interface Recipe {
  id: number;
  name: string;
  image: string;
  category: string;
  difficulty: string;
  prepTime: string;
}

export interface Category {
  id: number;
  name: string;
}
