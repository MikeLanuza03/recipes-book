import { useGetRecipesQuery } from "./recipesApi";
import { RecipeCard } from "./RecipeCard";

export function RecipeList() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-700">
        No se pudieron cargar las recetas. Verifica que el servidor esté corriendo.
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-600">
        No hay recetas disponibles.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
