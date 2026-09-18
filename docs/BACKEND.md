# FoodRate Israel backend

## Neon
Project: FoodRate Israel

Database: `foodrate`

Public catalog tables:
- localities
- canonical_places
- dishes
- external_ratings
- kosher_certificates

Internal provenance tables:
- source_place_records
- place_source_links

User content:
- user_reviews

## Public API
The frontend reads through Neon Data API with anonymous authentication. Public roles have SELECT-only access. No anonymous write privileges are granted.

## Import
Neon Function `catalogsync` performs server-side imports. The first importer targets the official Population and Immigration Authority locality registry on data.gov.il.

A bootstrap schedule is used during initial load, then should be reduced to a daily refresh after a successful import.

## Frontend
`backend.js` requests an anonymous Neon Auth token and loads official localities. If the backend is temporarily unavailable, the UI falls back to the bundled demo dataset.

## Next source layer
OpenStreetMap / Overpass nationwide food POIs, followed by municipal business licensing and kosher-supervision datasets.
