import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { recipeSchema, type RecipeFormData } from "./recipeSchema";
import { useCreateRecipeMutation, useGetCategoriesQuery } from "./recipesApi";

export function RecipeCreatePage() {
  const navigate = useNavigate();
  const { data: categories } = useGetCategoriesQuery();
  const [createRecipe, { isLoading, error: submitError }] =
    useCreateRecipeMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      difficulty: "",
      prepTime: "",
      image: "",
      ingredients: [{ value: "" }],
      steps: [{ value: "" }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
    move: moveStep,
  } = useFieldArray({ control, name: "steps" });

  const onSubmit = async (data: RecipeFormData) => {
    const payload = {
      name: data.name,
      description: data.description,
      category: data.category,
      difficulty: data.difficulty,
      prepTime: data.prepTime,
      image: data.image || "",
      ingredients: data.ingredients
        .map((i) => i.value.trim())
        .filter((v) => v !== ""),
      steps: data.steps
        .map((s) => s.value.trim())
        .filter((v) => v !== ""),
    };

    const result = await createRecipe(payload).unwrap();
    navigate(`/recipes/${result.id}`);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Agregar Nueva Receta
      </h2>

      {submitError && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
          Ocurrió un error al guardar la receta. Intenta de nuevo.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            {...register("name")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Categoría y Dificultad */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              {...register("category")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Seleccionar...</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Dificultad
            </label>
            <select
              {...register("difficulty")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Seleccionar...</option>
              <option value="Fácil">Fácil</option>
              <option value="Media">Media</option>
              <option value="Difícil">Difícil</option>
            </select>
            {errors.difficulty && (
              <p className="mt-1 text-sm text-red-600">
                {errors.difficulty.message}
              </p>
            )}
          </div>
        </div>

        {/* Tiempo de preparación */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Tiempo de preparación
          </label>
          <input
            {...register("prepTime")}
            placeholder="Ej: 30 min"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.prepTime && (
            <p className="mt-1 text-sm text-red-600">
              {errors.prepTime.message}
            </p>
          )}
        </div>

        {/* URL de imagen */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            URL de imagen (opcional)
          </label>
          <input
            {...register("image")}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Ingredientes */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ingredientes
          </label>
          <div className="space-y-2">
            {ingredientFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`ingredients.${index}.value`)}
                  placeholder={`Ingrediente ${index + 1}`}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    ingredientFields.length > 1 && removeIngredient(index)
                  }
                  disabled={ingredientFields.length <= 1}
                  className="rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 disabled:text-gray-300 disabled:hover:bg-transparent"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendIngredient({ value: "" })}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            + Agregar ingrediente
          </button>
          {errors.ingredients && (
            <p className="mt-1 text-sm text-red-600">
              {errors.ingredients.root?.message || errors.ingredients.message}
            </p>
          )}
        </div>

        {/* Pasos */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Pasos de preparación
          </label>
          <div className="space-y-2">
            {stepFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <span className="flex items-center text-sm font-medium text-gray-500">
                  {index + 1}.
                </span>
                <input
                  {...register(`steps.${index}.value`)}
                  placeholder={`Paso ${index + 1}`}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => moveStep(index, index - 1)}
                  disabled={index === 0}
                  className="rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
                  title="Subir"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveStep(index, index + 1)}
                  disabled={index === stepFields.length - 1}
                  className="rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
                  title="Bajar"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => stepFields.length > 1 && removeStep(index)}
                  disabled={stepFields.length <= 1}
                  className="rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 disabled:text-gray-300 disabled:hover:bg-transparent"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendStep({ value: "" })}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            + Agregar paso
          </button>
          {errors.steps && (
            <p className="mt-1 text-sm text-red-600">
              {errors.steps.root?.message || errors.steps.message}
            </p>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? "Guardando..." : "Guardar Receta"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
