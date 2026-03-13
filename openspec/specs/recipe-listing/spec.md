## ADDED Requirements

### Requirement: Fetch recipes from API
The system SHALL fetch all recipes from `GET /recipes` using an RTK Query endpoint. The response SHALL be typed as an array of `Recipe` objects with fields: `id`, `name`, `image`, `category`, `difficulty`, and `prepTime`.

#### Scenario: Successful data fetch
- **WHEN** the recipe listing page loads
- **THEN** the system fetches recipes from `GET http://localhost:3001/recipes` and displays them

#### Scenario: API error
- **WHEN** the API request to `/recipes` fails
- **THEN** the system displays an error message indicating recipes could not be loaded

### Requirement: Display loading state
The system SHALL display a loading indicator while recipes are being fetched.

#### Scenario: Loading in progress
- **WHEN** the recipe listing page loads and the API request is pending
- **THEN** a loading indicator is visible to the user

#### Scenario: Loading completes
- **WHEN** the API request resolves successfully
- **THEN** the loading indicator is removed and recipe cards are displayed

### Requirement: Display recipes as cards
The system SHALL render each recipe as a card containing the recipe image, name, category, difficulty level, and preparation time.

#### Scenario: Card displays all required fields
- **WHEN** a recipe is rendered
- **THEN** the card displays the recipe image, name, category, difficulty, and preparation time

#### Scenario: Missing image fallback
- **WHEN** a recipe has no image or the image URL is invalid
- **THEN** the card displays a placeholder image

### Requirement: Responsive card grid layout
The system SHALL display recipe cards in a responsive grid: 1 column on mobile, 2 columns on tablet, and 3 columns on desktop.

#### Scenario: Mobile viewport
- **WHEN** the viewport width is less than 768px
- **THEN** recipe cards are displayed in a single column

#### Scenario: Tablet viewport
- **WHEN** the viewport width is between 768px and 1024px
- **THEN** recipe cards are displayed in 2 columns

#### Scenario: Desktop viewport
- **WHEN** the viewport width is 1024px or greater
- **THEN** recipe cards are displayed in 3 columns

### Requirement: Empty state
The system SHALL display a message when no recipes are available from the API. This state is distinct from the filtered empty state (when filters match no results).

#### Scenario: No recipes returned
- **WHEN** the API returns an empty array and no filters are active
- **THEN** the system displays a message indicating no recipes are available
