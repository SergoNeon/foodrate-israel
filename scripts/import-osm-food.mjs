import fs from "node:fs/promises";

const OVERPASS = process.env.OVERPASS_URL || "https://overpass-api.de/api/interpreter";
const SOUTH=29.45, WEST=34.20, NORTH=33.35, EAST=35.95;
const STEP_LAT=0.45, STEP_LON=0.45;

const amenity = "restaurant|cafe|fast_food|food_court|ice_cream|bar|pub|biergarten";
const shop = "bakery|confectionery|coffee|tea|deli|butcher|seafood|cheese|greengrocer|supermarket|convenience";
const craft = "caterer";

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function query(q, attempt=1) {
  const body = new URLSearchParams({data:q});
  const r = await fetch(OVERPASS, {
    method:"POST",
    headers:{"content-type":"application/x-www-form-urlencoded","user-agent":"FoodRate-Israel/0.1"},
    body
  });
  if (!r.ok) {
    if (attempt < 4 && [429,502,503,504].includes(r.status)) {
      await sleep(4000 * attempt);
      return query(q, attempt+1);
    }
    throw new Error(`Overpass ${r.status}: ${await r.text()}`);
  }
  return r.json();
}

function center(e) {
  if (typeof e.lat === "number" && typeof e.lon === "number") return [e.lat,e.lon];
  if (e.center) return [e.center.lat,e.center.lon];
  return [null,null];
}

function category(tags={}) {
  if (tags.amenity) return `amenity:${tags.amenity}`;
  if (tags.shop) return `shop:${tags.shop}`;
  if (tags.craft) return `craft:${tags.craft}`;
  return "food";
}

const byId = new Map();
let tileNo = 0;
for (let s=SOUTH; s<NORTH; s+=STEP_LAT) {
  for (let w=WEST; w<EAST; w+=STEP_LON) {
    const n=Math.min(NORTH,s+STEP_LAT), e=Math.min(EAST,w+STEP_LON);
    tileNo++;
    const q=`[out:json][timeout:180];
(
 nwr["amenity"~"^(${amenity})$"](${s},${w},${n},${e});
 nwr["shop"~"^(${shop})$"](${s},${w},${n},${e});
 nwr["craft"~"^(${craft})$"](${s},${w},${n},${e});
 nwr["tourism"="hotel"]["restaurant"="yes"](${s},${w},${n},${e});
);
out center tags; `;
    const data=await query(q);
    for (const x of data.elements || []) {
      const tags=x.tags||{};
      if (!tags.name && !tags["name:he"] && !tags["name:en"] && !tags.brand) continue;
      const [lat,lon]=center(x);
      if (lat==null || lon==null) continue;
      const id=`osm:${x.type}:${x.id}`;
      byId.set(id,{
        source_id:id,
        osm_type:x.type,
        osm_id:x.id,
        name:tags.name||tags["name:he"]||tags["name:en"]||tags.brand,
        name_he:tags["name:he"]||null,
        name_en:tags["name:en"]||null,
        category:category(tags),
        cuisine:tags.cuisine||null,
        brand:tags.brand||null,
        operator:tags.operator||null,
        phone:tags.phone||tags["contact:phone"]||null,
        website:tags.website||tags["contact:website"]||null,
        opening_hours:tags.opening_hours||null,
        addr_city:tags["addr:city"]||null,
        addr_street:tags["addr:street"]||null,
        addr_housenumber:tags["addr:housenumber"]||null,
        kosher:tags.kosher||null,
        delivery:tags.delivery||null,
        takeaway:tags.takeaway||null,
        wheelchair:tags.wheelchair||null,
        lat,lon,
        source:"OpenStreetMap"
      });
    }
    console.log(`tile ${tileNo}: total unique ${byId.size}`);
    await sleep(1100);
  }
}

const places=[...byId.values()].sort((a,b)=>(a.name||"").localeCompare(b.name||""));
await fs.mkdir("generated",{recursive:true});
await fs.writeFile("generated/osm-food.json", JSON.stringify({
  generated_at:new Date().toISOString(),
  attribution:"© OpenStreetMap contributors, ODbL",
  count:places.length,
  places
},null,2));
console.log(`Saved ${places.length} food places`);
