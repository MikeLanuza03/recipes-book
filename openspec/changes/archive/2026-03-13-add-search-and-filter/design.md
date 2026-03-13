## Context

The recipe listing currently displays all recipes from `GET /recipes` with no filtering. The `db.json` already includes a `/categories` endpoint. Filtering will be done client-side since the dataset is small and JSON Server has limited query support.

## Goals / Non-Goals

**Goals:**
- Allow users to search recipes by name (case-insensitive)
- Allow users to filter by category via a dropdown populated from the API
- Combine both filters with AND logic
- Show a result counter and appropriate empty states

**Non-Goals:**
- Server-side filtering or pagination
- Search by description (Recipe type has no description field currently)
- Debounced search or performance optimization for large datasets
- Persisting filter state in URL or localStorage

## Decisions

### 1. Client-side filtering over server-side
**Choice**: Filter recipes in the React component using `useMemo`.
**Rationale**: The dataset is small (mock data), JSON Server's query capabilities are limited, and client-side filtering provides instant feedback. No new API endpoints needed.
**Alternative**: Using JSON Server's `?q=` or `?category=` query params — rejected because it couples filtering logic to a mock server that won't exist in production.

### 2. New RTK Query endpoint for categories
**Choice**: Add `getCategories` endpoint to existing `recipesApi`.
**Rationale**: Keeps all recipe-related API calls in one API slice. Categories are fetched once and cached by RTK Query automatically.
**Alternative**: Hardcoding categories — rejected because categories should come from the API for consistency.

### 3. Separate SearchFilterBar component
**Choice**: Create a `RecipeSearchFilter` component that manages search text and selected category, passing values up via props/callbacks.
**Rationale**: Keeps `RecipeList` focused on display logic. Filter state lives in `RecipeList` via `useState` since it's local UI state with no need for global access.
**Alternative**: Redux state for filters — overkill for local UI state that doesn't need to persist or be shared.

### 4. Category type addition
**Choice**: Add a `Category` interface to `types.ts` with `id` and `name` fields.
**Rationale**: Matches the existing `db.json` structure.

## Risks / Trade-offs

- **[Client-side filtering won't scale]** → Acceptable for this project scope. Can migrate to server-side later if needed.
- **[No search debounce]** → With a small dataset, instant filtering is fine. Add debounce if performance becomes an issue.
