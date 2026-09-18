import fs from "node:fs/promises";

const API = "https://data.gov.il/api/3/action";
const DATASET_ID = "citiesandsettelments";

async function json(url) {
  const r = await fetch(url, { headers: { "user-agent": "FoodRate-Israel/0.1" } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}: ${url}`);
  return r.json();
}

const meta = await json(`${API}/package_show?id=${encodeURIComponent(DATASET_ID)}`);
if (!meta.success) throw new Error("data.gov.il package_show failed");

const resources = meta.result.resources || [];
const current =
  resources.find(r => /english/i.test(r.name || "") && r.datastore_active) ||
  resources.find(r => /מתעדכן|updated|current/i.test(r.name || "") && r.datastore_active) ||
  resources.find(r => r.datastore_active);

if (!current) throw new Error("No datastore resource found for official locality dataset");

let offset = 0;
const limit = 5000;
const records = [];
while (true) {
  const u = new URL(`${API}/datastore_search`);
  u.searchParams.set("resource_id", current.id);
  u.searchParams.set("limit", String(limit));
  u.searchParams.set("offset", String(offset));
  const page = await json(u);
  if (!page.success) throw new Error("data.gov.il datastore_search failed");
  records.push(...page.result.records);
  offset += page.result.records.length;
  if (records.length >= page.result.total || page.result.records.length === 0) break;
}

const pick = (o, keys) => {
  for (const k of keys) if (o[k] !== undefined && o[k] !== null && String(o[k]).trim()) return o[k];
  return null;
};

const normalized = records.map(r => ({
  official_code: String(pick(r, ["סמל_ישוב","סמל ישוב","city_code","locality_code","Settlement_Code"]) ?? ""),
  name_he: pick(r, ["שם_ישוב","שם ישוב","שם_יישוב","Settlement_Name"]),
  name_en: pick(r, ["שם_ישוב_לועזי","שם ישוב לועזי","שם יישוב באנגלית","Settlement_Name_English"]),
  district_code: pick(r, ["סמל_נפה","district_code","District_Code"]),
  district_name: pick(r, ["שם_נפה","district_name","District_Name"]),
  regional_council_code: pick(r, ["סמל_מועצה_איזורית","regional_council_code"]),
  regional_council_name: pick(r, ["שם_מועצה","regional_council_name"]),
  source: "data.gov.il:population_authority"
})).filter(x => x.official_code && x.name_he);

await fs.mkdir("generated", { recursive: true });
await fs.writeFile("generated/localities.json", JSON.stringify({
  generated_at: new Date().toISOString(),
  source_resource_id: current.id,
  count: normalized.length,
  localities: normalized
}, null, 2));

console.log(`Saved ${normalized.length} official localities to generated/localities.json`);
