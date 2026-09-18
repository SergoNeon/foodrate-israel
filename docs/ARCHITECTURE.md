# FoodRate Israel — Architecture

## Product goal
A standalone Israel food discovery platform in Hebrew, Russian and English, combining restaurant-level ratings with dish-level ratings.

## Frontend
Current prototype is static HTML/CSS/JavaScript so it can be reviewed and deployed cheaply. Production migration target: Next.js with server-side rendering and localized routes.

## Backend target
- API layer: Node.js / TypeScript
- Database: PostgreSQL + PostGIS
- Search: PostgreSQL full-text initially, OpenSearch later if needed
- Cache: Redis
- Media: object storage + CDN
- Background ingestion: scheduled workers per authorized source

## Core entities
- restaurants
- restaurant_translations
- branches
- cuisines
- dishes
- dish_translations
- external_sources
- external_ratings
- rating_snapshots
- reviews
- review_scores
- kosher_certificates
- opening_hours
- users
- photos

## External-data rule
Permanent storage should contain our canonical restaurant records and data that licensing/API terms permit us to retain. External ratings/reviews must be integrated source-by-source according to the provider's terms, attribution requirements, and caching limits.

## Localization
Canonical IDs are language-independent. Hebrew is RTL. Russian and English are LTR. Search aliases should allow terms such as שווארמה / шаурма / shawarma to resolve to the same cuisine/dish concept.

## Rating
The future FoodRate Score should use confidence weighting rather than a simple arithmetic average. Inputs can include review count, source reliability, recency and verified FoodRate reviews. The formula must be documented publicly before production launch.
