import { useMemo, useState } from "react";
import { useGetRecipesQuery } from "./recipesApi";
import { RecipeCard } from "./RecipeCard";
import { RecipeSearchFilter } from "./RecipeSearchFilter";

export function RecipeList() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    return recipes.filter((recipe) => {
      const matchesSearch =
        searchTerm === "" ||
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "";

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
    <div className="space-y-6">
      <RecipeSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <p className="text-sm text-gray-600">
        {filteredRecipes.length === 1
          ? "1 receta encontrada"
          : `${filteredRecipes.length} recetas encontradas`}
      </p>

      {filteredRecipes.length === 0 && hasActiveFilters ? (
        <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-600">
          No se encontraron recetas con los filtros actuales. Intenta ajustar tu
          búsqueda.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
