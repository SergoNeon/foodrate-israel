# FoodRate Israel — Nationwide data plan

## Coverage goal
The product should cover every official locality in Israel and the broadest practical set of food-related venues, including small independent businesses.

No single source can guarantee literally every operating venue at every moment. FoodRate therefore maintains one canonical place entity and merges multiple source records into it.

## Layer 1 — Official localities
Primary source: Israel Population and Immigration Authority locality dataset on data.gov.il.
The importer discovers the current CKAN resource at runtime and downloads all rows.

Secondary enrichment: Central Bureau of Statistics locality files for population, district, municipal status and geographic attributes.

## Layer 2 — Open food POIs
OpenStreetMap / Overpass is the broad bootstrap layer for:
- restaurants
- cafes
- fast food / street food
- food courts
- ice cream
- pubs / bars
- bakeries
- confectioneries
- coffee/tea shops
- delis
- butchers
- seafood / cheese shops
- greengrocers
- supermarkets / convenience stores
- caterers
- hotel restaurants tagged in OSM

OSM attribution must be displayed and ODbL obligations must be respected.

## Layer 3 — Municipal business licensing
Municipal open-data business-license datasets are authoritative enrichments where available. They should be imported municipality by municipality and linked by normalized name + address + phone + coordinates.

## Layer 4 — Kashrut
Import public rabbinical-supervision datasets where available. Store supervising authority, kosher level/type and source/update timestamp separately from the restaurant entity.

## Layer 5 — Commercial enrichment
Google Places, Foursquare, Tripadvisor, delivery providers, reservation providers and local directories may be used only under their current API/data terms. Their IDs, ratings and links remain source-scoped.

## Deduplication
Use:
1. exact source IDs;
2. normalized phone/domain;
3. coordinates within a small radius + similar normalized name;
4. address + similar name;
5. human review queue for ambiguous merges.

Never overwrite provenance. Every source row maps to a canonical place while retaining source ID and last-seen timestamps.

## Freshness
- locality registry: weekly
- OSM bootstrap/incremental refresh: weekly
- municipal licenses: weekly/monthly by source
- kashrut: daily/weekly depending source
- commercial ratings: within provider rate limits
- user edits: real time, moderation required
