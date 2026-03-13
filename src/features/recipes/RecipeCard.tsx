import { useState } from "react";
import type { Recipe } from "./types";

interface RecipeCardProps {
  recipe: Recipe;
}

const PLACEHOLDER_IMAGE = "https://picsum.photos/seed/placeholder/400/300";

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <img
        src={imgError || !recipe.image ? PLACEHOLDER_IMAGE : recipe.image}
        alt={recipe.name}
        className="h-48 w-full object-cover"
        onError={() => setImgError(true)}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {recipe.category}
          </span>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            {recipe.difficulty}
          </span>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            {recipe.prepTime}
          </span>
        </div>
      </div>
    </div>
  );
}
