-- FoodRate Israel initial PostgreSQL schema
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE restaurants (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  phone TEXT,
  website_url TEXT,
  price_level SMALLINT CHECK (price_level BETWEEN 1 AND 4),
  kosher_status TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE restaurant_translations (
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('he','ru','en')),
  name TEXT NOT NULL,
  description TEXT,
  PRIMARY KEY (restaurant_id, locale)
);

CREATE TABLE branches (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  city_slug TEXT NOT NULL,
  address_he TEXT,
  address_ru TEXT,
  address_en TEXT,
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  location geography(Point,4326),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE dishes (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  price_ils NUMERIC(10,2),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (restaurant_id, slug)
);

CREATE TABLE dish_translations (
  dish_id BIGINT NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('he','ru','en')),
  name TEXT NOT NULL,
  description TEXT,
  PRIMARY KEY (dish_id, locale)
);

CREATE TABLE external_sources (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  attribution_url TEXT,
  integration_mode TEXT NOT NULL
);

CREATE TABLE external_ratings (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  source_id BIGINT NOT NULL REFERENCES external_sources(id) ON DELETE CASCADE,
  source_entity_id TEXT,
  rating NUMERIC(5,2),
  rating_scale NUMERIC(5,2),
  review_count INTEGER,
  source_url TEXT,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (restaurant_id, source_id)
);

CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('he','ru','en')),
  author_display_name TEXT NOT NULL,
  body TEXT,
  overall_score NUMERIC(3,1) CHECK (overall_score BETWEEN 0 AND 10),
  verified_visit BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX branches_location_idx ON branches USING GIST(location);
CREATE INDEX reviews_restaurant_idx ON reviews(restaurant_id, created_at DESC);
