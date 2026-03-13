## Why

The Recipe Book application needs its core browsing experience. Users currently have no way to discover or browse available recipes. A recipe listing page is the primary entry point for the app and is needed before any other recipe features (detail view, search, filtering) can be built on top.

## What Changes

- Add a recipe listing page that displays all recipes as cards
- Each card shows: image, name, category, difficulty, and preparation time
- Implement RTK Query API slice for fetching recipes from `GET /recipes`
- Set up the foundational data layer that other recipe features will build on

## Capabilities

### New Capabilities
- `recipe-listing`: Displays all recipes in a responsive card grid with image, name, category, difficulty, and prep time. Fetches data via RTK Query from the JSON Server API.

### Modified Capabilities
<!-- None - this is a greenfield feature -->

## Impact

- **New files**: RTK Query API slice (`features/recipes/`), recipe card component, recipe listing page
- **API dependency**: Requires JSON Server running at `http://localhost:3001` with a `/recipes` endpoint
- **Store**: New API slice registered in the Redux store
- **Dependencies**: Uses existing Tailwind CSS v4, RTK Query setup
