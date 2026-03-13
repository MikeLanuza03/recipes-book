## 1. Data Layer Setup

- [x] 1.1 Define `Recipe` TypeScript type with fields: `id`, `name`, `image`, `category`, `difficulty`, `prepTime`
- [x] 1.2 Create RTK Query API slice (`recipesApi`) with `getRecipes` endpoint fetching from `GET /recipes`
- [x] 1.3 Register `recipesApi` reducer and middleware in the Redux store

## 2. Mock Data Setup

- [x] 2.1 Add sample recipe entries to `db.json` with all required fields (id, name, image, category, difficulty, prepTime)

## 3. UI Components

- [x] 3.1 Create `RecipeCard` presentational component displaying image, name, category, difficulty, and prep time
- [x] 3.2 Add placeholder/fallback image handling for missing or broken recipe images
- [x] 3.3 Create `RecipeList` page component that uses `useGetRecipesQuery` and renders a grid of `RecipeCard`s

## 4. States & Layout

- [x] 4.1 Implement loading state with a loading indicator while recipes are being fetched
- [x] 4.2 Implement error state with a user-friendly error message when the API request fails
- [x] 4.3 Implement empty state with a message when no recipes are returned
- [x] 4.4 Apply responsive grid layout: 1 column (mobile), 2 columns (tablet ≥768px), 3 columns (desktop ≥1024px)

## 5. Integration

- [x] 5.1 Add `RecipeList` page to the app's main route/entry point
