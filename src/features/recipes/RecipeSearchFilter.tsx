import { useGetCategoriesQuery } from "./recipesApi";

interface RecipeSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export function RecipeSearchFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: RecipeSearchFilterProps) {
  const { data: categories, isError } = useGetCategoriesQuery();

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <input
        type="text"
        placeholder="Buscar recetas por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Todas las categorías</option>
        {!isError &&
          categories?.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
}
