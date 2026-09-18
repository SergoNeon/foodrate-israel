import fs from "node:fs/promises";

const read = async p => JSON.parse(await fs.readFile(p,"utf8"));
const localities = await read("generated/localities.json");
const osm = await read("generated/osm-food.json");

const norm = s => (s||"").toString().normalize("NFKD").toLowerCase()
  .replace(/[׳״'".,()[\]{}\-_/\\]/g," ")
  .replace(/\s+/g," ").trim();

const localityByName = new Map();
for (const c of localities.localities) {
  for (const n of [c.name_he,c.name_en]) if(n) localityByName.set(norm(n),c);
}

for (const p of osm.places) {
  const c = localityByName.get(norm(p.addr_city));
  p.locality_code = c?.official_code || null;
}

const out = {
  generated_at:new Date().toISOString(),
  localities_count:localities.localities.length,
  places_count:osm.places.length,
  localities:localities.localities,
  places:osm.places
};
await fs.writeFile("generated/catalog.json",JSON.stringify(out,null,2));
console.log(`Catalog: ${out.localities_count} localities, ${out.places_count} places`);
