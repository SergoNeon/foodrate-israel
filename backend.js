const FOODRATE_BACKEND = {
  authBase: "https://ep-delicate-term-b51iibv5.neonauth.c-7.us-east-2.aws.neon.tech/foodrate/auth",
  dataApiBase: "https://ep-delicate-term-b51iibv5.apirest.c-7.us-east-2.aws.neon.tech/foodrate/rest/v1"
};

async function getAnonymousToken(){
  const r = await fetch(FOODRATE_BACKEND.authBase + "/token/anonymous", {
    method:"GET",
    headers:{"accept":"application/json"}
  });
  if(!r.ok) throw new Error("anonymous auth failed: "+r.status);
  const j = await r.json();
  return j.token || j.accessToken || j.access_token || j.jwt || j.data?.token || j.data?.accessToken;
}

function cityLabel(row, lang){
  if(lang==="he") return row.name_he || row.name_en || row.official_code;
  if(lang==="en") return row.name_en || row.name_he || row.official_code;
  return row.name_ru || row.name_en || row.name_he || row.official_code;
}

window.loadFoodBackend = async function(){
  const token = await getAnonymousToken();
  if(!token) throw new Error("anonymous token missing");
  const url = FOODRATE_BACKEND.dataApiBase + "/localities?select=official_code,name_he,name_ru,name_en&order=name_he.asc&limit=5000";
  const r = await fetch(url,{headers:{
    "authorization":"Bearer "+token,
    "accept":"application/json"
  }});
  if(!r.ok) throw new Error("localities api failed: "+r.status);
  const rows = await r.json();
  return {
    localities: rows,
    cities: rows.map(x=>({
      id:"official-"+x.official_code,
      officialCode:x.official_code,
      ru:x.name_ru || x.name_en || x.name_he,
      he:x.name_he || x.name_en || x.official_code,
      en:x.name_en || x.name_he || x.official_code,
      count:0,
      icon:"📍",
      official:true
    }))
  };
};

window.FOODRATE_BACKEND = FOODRATE_BACKEND;
