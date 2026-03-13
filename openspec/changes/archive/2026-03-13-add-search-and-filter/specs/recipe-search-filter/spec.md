## ADDED Requirements

### Requirement: Text search input
The system SHALL display a text input that filters visible recipes by name. The search SHALL be case-insensitive and match any substring of the recipe name.

#### Scenario: Search matches recipes
- **WHEN** the user types "pasta" in the search input
- **THEN** only recipes whose name contains "pasta" (case-insensitive) are displayed

#### Scenario: Search matches no recipes
- **WHEN** the user types a term that matches no recipe names
- **THEN** no recipe cards are displayed and a "no results" empty state is shown

#### Scenario: Empty search field
- **WHEN** the search input is empty
- **THEN** all recipes are displayed (subject to category filter)

### Requirement: Category filter dropdown
The system SHALL display a dropdown populated with categories from `GET /categories`. The dropdown SHALL include a default "Todas las categorías" option that shows all recipes.

#### Scenario: Categories loaded successfully
- **WHEN** the page loads
- **THEN** the dropdown is populated with categories from the API plus a "Todas las categorías" default option

#### Scenario: Category selected
- **WHEN** the user selects a category from the dropdown
- **THEN** only recipes matching that category are displayed

#### Scenario: Default option selected
- **WHEN** the user selects "Todas las categorías"
- **THEN** recipes are not filtered by category

#### Scenario: Categories fail to load
- **WHEN** the `GET /categories` request fails
- **THEN** the dropdown shows only the "Todas las categorías" default option and category filtering is unavailable

### Requirement: Combined filter logic
The system SHALL apply text search and category filter in combination using AND logic. A recipe is visible only if it matches both the search term and the selected category.

#### Scenario: Both filters active
- **WHEN** the user has typed a search term and selected a category
- **THEN** only recipes matching both the search term in name AND the selected category are displayed

#### Scenario: One filter active
- **WHEN** only one filter is active (search or category)
- **THEN** recipes are filtered by the active filter only

### Requirement: Result counter
The system SHALL display a counter showing the number of recipes matching the current filters in the format "X recetas encontradas".

#### Scenario: Filtered results
- **WHEN** filters are applied and 3 recipes match
- **THEN** the counter displays "3 recetas encontradas"

#### Scenario: Single result
- **WHEN** filters are applied and 1 recipe matches
- **THEN** the counter displays "1 receta encontrada"

#### Scenario: No filters applied
- **WHEN** no filters are active
- **THEN** the counter displays the total number of recipes (e.g., "6 recetas encontradas")

### Requirement: Filtered empty state
The system SHALL display a distinct empty state when filters produce no results, differentiating it from the "no recipes available" state.

#### Scenario: No results from filters
- **WHEN** the active filters match no recipes
- **THEN** the system displays a message indicating no recipes match the current filters, with a suggestion to adjust the search criteria
