## Context

The Recipe Book app has the initial project setup (React + TypeScript, Vite, RTK Query, Tailwind CSS v4) but no user-facing features yet. The mock API (JSON Server) is available at `http://localhost:3001` with a `/recipes` endpoint. We need to build the first feature: a recipe listing page that establishes the data fetching patterns and component architecture for the rest of the app.

## Goals / Non-Goals

**Goals:**
- Display all recipes in a responsive card grid
- Establish the RTK Query API slice pattern for recipe data
- Handle loading and error states gracefully
- Create reusable card component for recipes

**Non-Goals:**
- Pagination or infinite scroll (all recipes loaded at once for now)
- Search or filtering functionality
- Recipe detail view / navigation
- Recipe creation or editing

## Decisions

### 1. RTK Query API slice in `features/recipes/`
**Decision**: Create `recipesApi` slice using `createApi` with recipe endpoints.
**Rationale**: RTK Query is already part of the stack. Colocating the API slice within the feature folder follows the domain-based architecture. A single `useGetRecipesQuery` hook provides caching, loading states, and error handling out of the box.
**Alternatives**: Manual `fetch` + `createAsyncThunk` — rejected because RTK Query handles caching and deduplication automatically.

### 2. Component structure
**Decision**: Two components — `RecipeList` (page-level, handles data fetching) and `RecipeCard` (presentational, receives props).
**Rationale**: Separating the data-fetching concern from presentation keeps `RecipeCard` reusable and testable. `RecipeList` orchestrates the query and maps results to cards.

### 3. Responsive grid with Tailwind CSS v4
**Decision**: Use CSS Grid via Tailwind utility classes with responsive breakpoints (1 col mobile, 2 cols tablet, 3 cols desktop).
**Rationale**: Tailwind v4 is already configured. A CSS Grid approach is simpler and more flexible than a third-party grid library.

### 4. Recipe data shape
**Decision**: Expect the API to return objects with `id`, `name`, `image`, `category`, `difficulty`, and `prepTime` fields. Define a TypeScript `Recipe` type in the feature folder.
**Rationale**: Typing the API response provides compile-time safety and documents the data contract.

## Risks / Trade-offs

- **[No pagination]** → Acceptable for a mock API with a small dataset. Will need pagination when recipe count grows.
- **[JSON Server dependency]** → Dev-only concern. If server is down, the UI shows an error state. No mitigation needed beyond clear error messaging.
- **[Image URLs in mock data]** → Placeholder images may be needed if mock data lacks real image URLs. Use a fallback image.
