## MODIFIED Requirements

### Requirement: Display recipes as cards
The system SHALL render each recipe as a card containing the recipe image, name, category, difficulty level, and preparation time. Each card SHALL be a clickable link that navigates to the recipe detail page at `/recipes/:id`.

#### Scenario: Card displays all required fields
- **WHEN** a recipe is rendered
- **THEN** the card displays the recipe image, name, category, difficulty, and preparation time

#### Scenario: Missing image fallback
- **WHEN** a recipe has no image or the image URL is invalid
- **THEN** the card displays a placeholder image

#### Scenario: Card navigates to detail
- **WHEN** the user clicks on a recipe card
- **THEN** the application navigates to `/recipes/:id` where `:id` is the recipe's ID

#### Scenario: Card is accessible as link
- **WHEN** a recipe card is rendered
- **THEN** it is implemented as a `<Link>` element so it supports standard link behaviors (right-click, open in new tab)
