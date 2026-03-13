## Why

Users currently see all recipes at once with no way to find a specific one. As the recipe collection grows, browsing becomes impractical. Adding text search and category filtering lets users quickly narrow down results to find what they need.

## What Changes

- Add a text input for searching recipes by name (case-insensitive)
- Add a category dropdown populated from `GET /categories` endpoint
- Both filters work in combination (AND logic)
- Display a result counter showing "X recetas encontradas"
- Show an appropriate empty state when filters match no recipes

## Capabilities

### New Capabilities
- `recipe-search-filter`: Text search and category filter controls for the recipe listing, including result counting and filtered empty state

### Modified Capabilities
- `recipe-listing`: Add integration point for search/filter controls above the recipe grid and update empty state to distinguish "no recipes" from "no matching results"

## Impact

- **Code**: `src/features/recipes/` — new filter components, modified `RecipeList.tsx`, new RTK Query endpoint for categories, new `recipesApi` endpoint
- **API**: New usage of `GET /categories` endpoint (already exists in `db.json`)
- **Dependencies**: None new — uses existing RTK Query and Tailwind CSS
