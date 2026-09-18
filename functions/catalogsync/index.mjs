import { gzipSync } from "node:zlib";

const RESOURCE="5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
const DATA_URL=`https://data.gov.il/api/3/action/datastore_search?resource_id=${RESOURCE}&limit=5000`;

export default {
  async fetch(request){
    try{
      const url=new URL(request.url);
      if(!url.pathname.endsWith("/dump-localities") && url.pathname!=="/") return new Response("Not found",{status:404});
      const r=await fetch(DATA_URL,{headers:{"user-agent":"FoodRate-Israel/0.1","accept":"application/json"}});
      const txt=await r.text();
      if(!r.ok) throw new Error(`data.gov.il ${r.status}: ${txt.slice(0,500)}`);
      const payload=JSON.parse(txt);
      const rows=payload.result?.records||[];
      const gz=gzipSync(Buffer.from(JSON.stringify(rows)));
      const b64=gz.toString("base64");
      const size=3500;
      const total=Math.ceil(b64.length/size);
      console.log(`DUMP_META rows=${rows.length} total=${total} chars=${b64.length}`);
      for(let i=0;i<total;i++){
        console.log(`DUMP_CHUNK ${i+1}/${total} ${b64.slice(i*size,(i+1)*size)}`);
      }
      return Response.json({ok:true,rows:rows.length,chunks:total});
    }catch(e){
      console.error("DUMP_ERROR",e?.stack||e?.message||String(e));
      return Response.json({ok:false,error:String(e?.message||e)},{status:500});
    }
  }
}
