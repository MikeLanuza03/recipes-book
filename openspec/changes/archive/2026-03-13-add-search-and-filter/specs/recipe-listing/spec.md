## MODIFIED Requirements

### Requirement: Empty state
The system SHALL display a message when no recipes are available from the API. This state is distinct from the filtered empty state (when filters match no results).

#### Scenario: No recipes returned
- **WHEN** the API returns an empty array and no filters are active
- **THEN** the system displays a message indicating no recipes are available
