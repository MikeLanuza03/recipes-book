## 1. Types and API

- [x] 1.1 Add `Category` interface to `src/features/recipes/types.ts`
- [x] 1.2 Add `getCategories` RTK Query endpoint to `recipesApi.ts` and export the hook

## 2. Filter Component

- [x] 2.1 Create `RecipeSearchFilter` component with text input and category dropdown
- [x] 2.2 Populate category dropdown from `useGetCategoriesQuery` with "Todas las categorías" default
- [x] 2.3 Handle category API error gracefully (show only default option)

## 3. Filtering Logic

- [x] 3.1 Add `useState` for `searchTerm` and `selectedCategory` in `RecipeList`
- [x] 3.2 Implement `useMemo` filtering with AND logic (case-insensitive name match + category match)
- [x] 3.3 Add result counter displaying "X recetas encontradas" (singular for 1 result)

## 4. Integration and Empty States

- [x] 4.1 Integrate `RecipeSearchFilter` into `RecipeList` above the recipe grid
- [x] 4.2 Add filtered empty state distinct from "no recipes available" state
- [x] 4.3 Pass filtered recipes to the card grid instead of raw API results
