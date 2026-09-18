CREATE TABLE IF NOT EXISTS localities (
  official_code TEXT PRIMARY KEY,
  name_he TEXT NOT NULL,
  name_ru TEXT,
  name_en TEXT,
  district_code TEXT,
  district_name TEXT,
  regional_council_code TEXT,
  regional_council_name TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS source_place_records (
  id BIGSERIAL PRIMARY KEY,
  source_code TEXT NOT NULL,
  source_entity_id TEXT NOT NULL,
  raw_name TEXT,
  raw_category TEXT,
  phone TEXT,
  website TEXT,
  address_text TEXT,
  locality_code TEXT REFERENCES localities(official_code),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(source_code, source_entity_id)
);

CREATE TABLE IF NOT EXISTS canonical_places (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  primary_name TEXT NOT NULL,
  name_he TEXT,
  name_ru TEXT,
  name_en TEXT,
  category TEXT,
  phone TEXT,
  website TEXT,
  locality_code TEXT REFERENCES localities(official_code),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS place_source_links (
  place_id BIGINT NOT NULL REFERENCES canonical_places(id) ON DELETE CASCADE,
  source_record_id BIGINT NOT NULL REFERENCES source_place_records(id) ON DELETE CASCADE,
  match_method TEXT NOT NULL,
  match_confidence NUMERIC(5,4),
  PRIMARY KEY(place_id, source_record_id)
);

CREATE INDEX IF NOT EXISTS source_place_phone_idx ON source_place_records(phone);
CREATE INDEX IF NOT EXISTS source_place_locality_idx ON source_place_records(locality_code);
CREATE INDEX IF NOT EXISTS canonical_place_locality_idx ON canonical_places(locality_code);
