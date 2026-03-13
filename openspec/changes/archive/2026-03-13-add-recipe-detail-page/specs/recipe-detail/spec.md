## ADDED Requirements

### Requirement: Fetch recipe detail from API
The system SHALL fetch a single recipe by ID from `GET /recipes/:id` using an RTK Query endpoint (`getRecipeById`). The response SHALL be typed as a `Recipe` object including all fields: `id`, `name`, `image`, `category`, `difficulty`, `prepTime`, `description`, `ingredients`, and `steps`.

#### Scenario: Successful detail fetch
- **WHEN** the user navigates to `/recipes/:id`
- **THEN** the system fetches the recipe from `GET http://localhost:3001/recipes/:id` and displays its full details

#### Scenario: API error on detail fetch
- **WHEN** the API request to `/recipes/:id` fails
- **THEN** the system displays an error message indicating the recipe could not be loaded

#### Scenario: Recipe not found
- **WHEN** the API returns a 404 for the given recipe ID
- **THEN** the system displays a "recipe not found" message with a link to return to the listing

### Requirement: Display loading state on detail page
The system SHALL display a loading indicator while the recipe detail is being fetched.

#### Scenario: Detail loading in progress
- **WHEN** the detail page loads and the API request is pending
- **THEN** a loading indicator is visible to the user

### Requirement: Display recipe image
The system SHALL display the recipe image prominently at the top of the detail view with a larger size than the card view.

#### Scenario: Valid image displayed
- **WHEN** the recipe has a valid image URL
- **THEN** the image is displayed at full width of the content area

#### Scenario: Missing image fallback on detail
- **WHEN** the recipe has no image or the image URL is invalid
- **THEN** a placeholder image is displayed

### Requirement: Display recipe metadata
The system SHALL display the recipe name, category, difficulty, and preparation time on the detail page.

#### Scenario: All metadata fields displayed
- **WHEN** the recipe detail page renders
- **THEN** the name is displayed as a heading, and category, difficulty, and prep time are displayed as badges

### Requirement: Display recipe description
The system SHALL display the recipe description below the metadata.

#### Scenario: Description present
- **WHEN** the recipe has a description
- **THEN** the description text is displayed below the recipe name and metadata

#### Scenario: Description missing
- **WHEN** the recipe has no description
- **THEN** the description section is not rendered

### Requirement: Display ingredients list
The system SHALL display the recipe ingredients as a list.

#### Scenario: Ingredients present
- **WHEN** the recipe has an ingredients array with items
- **THEN** each ingredient is displayed as a list item

#### Scenario: Ingredients missing
- **WHEN** the recipe has no ingredients or an empty array
- **THEN** the ingredients section is not rendered

### Requirement: Display preparation steps
The system SHALL display the recipe steps as a numbered (ordered) list.

#### Scenario: Steps present
- **WHEN** the recipe has a steps array with items
- **THEN** each step is displayed as a numbered list item in order

#### Scenario: Steps missing
- **WHEN** the recipe has no steps or an empty array
- **THEN** the steps section is not rendered

### Requirement: Back to listing navigation
The system SHALL display a button or link to navigate back to the recipe listing.

#### Scenario: User clicks back button
- **WHEN** the user clicks the "Volver al listado" button on the detail page
- **THEN** the application navigates to the recipe listing page (`/`)
