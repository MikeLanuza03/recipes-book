import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetRecipeByIdQuery } from "./recipesApi";

const PLACEHOLDER_IMAGE = "https://picsum.photos/seed/placeholder/800/400";

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: recipe,
    isLoading,
    isError,
  } = useGetRecipeByIdQuery(Number(id));
  const [imgError, setImgError] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <p className="text-lg text-gray-500">Cargando receta...</p>
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">
          No se encontró la receta solicitada.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-blue-600 hover:underline"
      >
        ← Volver al listado
      </Link>

      <img
        src={imgError || !recipe.image ? PLACEHOLDER_IMAGE : recipe.image}
        alt={recipe.name}
        className="h-72 w-full rounded-xl object-cover"
        onError={() => setImgError(true)}
      />

      <h2 className="mt-6 text-3xl font-bold text-gray-900">{recipe.name}</h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
          {recipe.category}
        </span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
          {recipe.difficulty}
        </span>
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
          {recipe.prepTime}
        </span>
        <button
          type="button"
          onClick={() => {
            const recipeUrl = `${window.location.origin}/recipes/${id}`;
            const message = `¡Mira esta receta! 🍽️\n\n*${recipe.name}*\nCategoría: ${recipe.category}\n\n${recipeUrl}`;
            window.open(
              `https://wa.me/?text=${encodeURIComponent(message)}`,
              "_blank"
            );
          }}
          className="rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
        >
          Compartir por WhatsApp
        </button>
      </div>

      {recipe.description && (
        <p className="mt-6 text-gray-700">{recipe.description}</p>
      )}

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Ingredientes</h3>
          <ul className="mt-3 list-inside list-disc space-y-1 text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>
      )}

      {recipe.steps && recipe.steps.length > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Preparación</h3>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-gray-700">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
