## ADDED Requirements

### Requirement: Client-side routing setup
The system SHALL use React Router with `BrowserRouter` to enable client-side navigation. The router SHALL be configured at the application root level wrapping the entire app.

#### Scenario: Application loads with router
- **WHEN** the application starts
- **THEN** React Router is active and handles URL-based navigation

### Requirement: Route definitions
The system SHALL define the following routes:
- `/` renders the recipe listing page
- `/recipes/:id` renders the recipe detail page

#### Scenario: Navigate to listing
- **WHEN** the URL is `/`
- **THEN** the recipe listing page is rendered

#### Scenario: Navigate to detail
- **WHEN** the URL is `/recipes/1`
- **THEN** the recipe detail page is rendered for recipe with ID 1

#### Scenario: Unknown route
- **WHEN** the URL does not match any defined route
- **THEN** the application redirects to the listing page (`/`)

### Requirement: Shared layout
The system SHALL render the application header outside of the route definitions so that it persists across all views. Only the main content area SHALL change between routes.

#### Scenario: Header persists during navigation
- **WHEN** the user navigates from the listing to a recipe detail
- **THEN** the application header remains visible and unchanged
