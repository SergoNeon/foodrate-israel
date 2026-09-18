const API_BASE='https://br-autumn-rice-b5twaf7e-catalogapi.compute.c-7.us-east-2.aws.neon.tech';

const UI={
ru:{navExplore:'Заведения',navCities:'Все города',heroBadge:'Живая база FoodRate Israel',heroTitle:'Еда по всему Израилю.',heroSub:'Реальные заведения из рабочей базы. Поиск по официальным населённым пунктам Израиля — на русском, иврите и английском.',searchPh:'Название заведения…',cityAll:'Все населённые пункты',search:'Найти',stat1:'населённых пунктов',stat2:'заведений в живой базе',stat3:'населённых пунктов с заведениями',stat4:'языка интерфейса',livePlaces:'Заведения из живой базы',liveSub:'Данные загружаются напрямую из Neon PostgreSQL',cities:'Города и населённые пункты',citiesSub:'Официальный реестр Израиля с количеством найденных заведений',view:'Открыть',restaurants:'заведений',results:'Результаты поиска',category:'Категория',all:'Все категории',details:'Подробнее',info:'Информация',phone:'Телефон',website:'Сайт',coordinates:'Координаты',source:'Источник',route:'Открыть на карте',back:'← Назад',loading:'Загружаю живые данные…',notFound:'Ничего не найдено. Измените запрос или город.',live:'LIVE',dataNote:'Сайт использует рабочую базу FoodRate Israel. Сейчас публично показываются только записи, привязанные к официальным населённым пунктам Израиля.'},
he:{navExplore:'עסקים',navCities:'כל היישובים',heroBadge:'מאגר חי של FoodRate Israel',heroTitle:'אוכל בכל ישראל.',heroSub:'עסקי אוכל אמיתיים מהמאגר הפעיל. חיפוש לפי יישובים רשמיים בישראל בעברית, רוסית ואנגלית.',searchPh:'שם העסק…',cityAll:'כל היישובים',search:'חיפוש',stat1:'יישובים',stat2:'עסקים במאגר החי',stat3:'יישובים עם עסקים',stat4:'שפות בממשק',livePlaces:'עסקים מהמאגר החי',liveSub:'הנתונים נטענים ישירות מ-Neon PostgreSQL',cities:'ערים ויישובים',citiesSub:'המרשם הרשמי בישראל עם מספר העסקים שנמצאו',view:'פתיחה',restaurants:'עסקים',results:'תוצאות חיפוש',category:'קטגוריה',all:'כל הקטגוריות',details:'פרטים',info:'מידע',phone:'טלפון',website:'אתר',coordinates:'קואורדינטות',source:'מקור',route:'פתיחה במפה',back:'→ חזרה',loading:'טוען נתונים חיים…',notFound:'לא נמצאו תוצאות. נסו חיפוש או יישוב אחר.',live:'LIVE',dataNote:'האתר משתמש במסד הנתונים הפעיל של FoodRate Israel. כרגע מוצגות לציבור רק רשומות המקושרות ליישובים רשמיים בישראל.'},
en:{navExplore:'Places',navCities:'All localities',heroBadge:'Live FoodRate Israel database',heroTitle:'Food across Israel.',heroSub:'Real food venues from the working database. Search Israel’s official localities in Hebrew, Russian and English.',searchPh:'Venue name…',cityAll:'All localities',search:'Search',stat1:'official localities',stat2:'venues in live database',stat3:'localities with venues',stat4:'interface languages',livePlaces:'Places from the live database',liveSub:'Loaded directly from Neon PostgreSQL',cities:'Cities and localities',citiesSub:'Israel’s official locality registry with discovered venue counts',view:'Open',restaurants:'venues',results:'Search results',category:'Category',all:'All categories',details:'Details',info:'Information',phone:'Phone',website:'Website',coordinates:'Coordinates',source:'Source',route:'Open map',back:'← Back',loading:'Loading live data…',notFound:'Nothing found. Try another query or locality.',live:'LIVE',dataNote:'This site uses the working FoodRate Israel database. Public results currently include only records linked to official Israeli localities.'}
};


const IMG={
  hero:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=82',
  restaurant:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80',
  cafe:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
  street:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1000&q=80',
  bakery:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
  shop:'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
  fallback:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80'
};
function imageFor(v){
  if(v==='amenity:restaurant')return IMG.restaurant;
  if(v==='amenity:cafe'||v==='amenity:ice_cream')return IMG.cafe;
  if(v==='amenity:fast_food'||v==='amenity:food_court')return IMG.street;
  if(v==='shop:bakery'||v==='shop:confectionery')return IMG.bakery;
  if(v==='shop:supermarket'||v==='shop:convenience'||v==='shop:kiosk')return IMG.shop;
  if(v==='amenity:bar'||v==='amenity:pub')return IMG.restaurant;
  return IMG.fallback;
}

const CAT={
'amenity:restaurant':['Ресторан','מסעדה','Restaurant'],
'amenity:cafe':['Кафе','בית קפה','Cafe'],
'amenity:fast_food':['Fast food','מזון מהיר','Fast food'],
'amenity:bar':['Бар','בר','Bar'],
'amenity:pub':['Паб','פאב','Pub'],
'amenity:food_court':['Фуд-корт','מתחם אוכל','Food court'],
'amenity:ice_cream':['Мороженое','גלידה','Ice cream'],
'shop:bakery':['Пекарня','מאפייה','Bakery'],
'shop:confectionery':['Кондитерская','קונדיטוריה','Confectionery'],
'shop:supermarket':['Супермаркет','סופרמרקט','Supermarket'],
'shop:convenience':['Магазин','מכולת','Convenience store'],
'shop:kiosk':['Киоск','קיוסק','Kiosk']
};

let lang=localStorage.getItem('foodrate-lang')||'ru';
const tr=k=>UI[lang][k]||k;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const qs=(o)=>new URLSearchParams(Object.entries(o).filter(([,v])=>v!==''&&v!==null&&v!==undefined)).toString();

async function api(route,params={}){
  const r=await fetch(API_BASE+'/'+route+(Object.keys(params).length?'?'+qs(params):''));
  if(!r.ok) throw new Error('API '+r.status);
  return r.json();
}

function setLang(l){lang=l;localStorage.setItem('foodrate-lang',l);document.documentElement.lang=l;document.documentElement.dir=l==='he'?'rtl':'ltr';renderPage()}
function cityName(c){return lang==='he'?(c.name_he||c.city_he||c.name_en||c.city_en):lang==='ru'?(c.name_ru||c.city_ru||c.name_en||c.city_en||c.name_he||c.city_he):(c.name_en||c.city_en||c.name_he||c.city_he)}
function placeName(p){return lang==='he'?(p.name_he||p.primary_name):lang==='ru'?(p.name_ru||p.name_he||p.name_en||p.primary_name):(p.name_en||p.primary_name||p.name_he)}
function categoryName(v){const a=CAT[v];return a?(lang==='ru'?a[0]:lang==='he'?a[1]:a[2]):String(v||'').replace(/^.*:/,'').replaceAll('_',' ')}
function icon(v){if(v==='amenity:cafe')return'☕';if(v==='amenity:restaurant')return'🍽️';if(v==='amenity:fast_food')return'🥙';if(v==='shop:bakery')return'🥐';if(v==='amenity:bar'||v==='amenity:pub')return'🍺';if(v==='shop:supermarket'||v==='shop:convenience'||v==='shop:kiosk')return'🛒';return'🍴'}

function nav(){return '<header class="topbar"><div class="shell nav"><a class="brand" href="index.html"><span class="brandmark">✦</span><span>FoodRate Israel</span></a><nav class="navlinks"><a href="search.html">'+tr('navExplore')+'</a><a href="index.html#cities">'+tr('navCities')+'</a></nav><div class="navtools"><button class="lang" data-lang="he">עברית</button><button class="lang" data-lang="ru">RU</button><button class="lang" data-lang="en">EN</button></div></div></header>'}
function footer(){return '<footer class="footer"><div class="shell footerIn"><div><strong>FoodRate Israel</strong><div style="margin-top:8px">עברית · Русский · English</div></div><div class="legal">'+tr('dataNote')+'<br>© OpenStreetMap contributors</div></div></footer>'}
function loading(){return nav()+'<main class="section"><div class="shell"><div class="empty">'+tr('loading')+'</div></div></main>'+footer()}
function placeCard(p){const media=p.photo_url?'<img src="'+esc(p.photo_url)+'" alt="'+esc(placeName(p))+'" loading="lazy" referrerpolicy="no-referrer">':'<div class="noPhoto"><span>'+icon(p.category)+'</span><small>Фото пока нет</small></div>';return '<a class="card" href="restaurant.html?id='+encodeURIComponent(p.id)+'"><div class="cover">'+media+'<span class="badge">'+esc(categoryName(p.category))+'</span></div><div class="cardbody"><div class="cardtop"><div><h3>'+esc(placeName(p))+'</h3><div class="meta">'+esc(categoryName(p.category))+' · '+esc(cityName(p))+'</div></div></div><div class="tags">'+(p.phone?esc(p.phone)+' · ':'')+esc(p.category)+'</div><div class="dishrow"><span>'+tr('details')+'</span><strong>→</strong></div></div></a>'}
function cityCard(c){return '<a class="city" href="city.html?id='+encodeURIComponent(c.official_code)+'"><strong>'+esc(cityName(c))+'</strong><span>'+Number(c.places||0).toLocaleString()+' '+tr('restaurants')+'</span><b>'+tr('view')+' →</b></a>'}

async function home(){
  const [stats,cities,places]=await Promise.all([api('stats'),api('cities',{limit:8}),api('places',{limit:6})]);
  return nav()+'<main><section class="hero"><div class="shell"><div class="heroPanel heroPhoto" style="background-image:linear-gradient(90deg,rgba(11,18,32,.94) 0%,rgba(11,18,32,.78) 44%,rgba(11,18,32,.28) 100%),url('+IMG.hero+')"><span class="eyebrow">● '+tr('heroBadge')+'</span><h1>'+tr('heroTitle')+'</h1><p>'+tr('heroSub')+'</p><form class="searchbar" onsubmit="return goSearch(event)"><div class="field">⌕<input id="q" placeholder="'+tr('searchPh')+'"></div><div class="field">⌖<select id="city"><option value="">'+tr('cityAll')+'</option>'+cities.cities.map(c=>'<option value="'+esc(c.official_code)+'">'+esc(cityName(c))+'</option>').join('')+'</select></div><button class="primary">'+tr('search')+'</button></form></div><div class="stats"><div class="stat"><strong>'+Number(stats.localities).toLocaleString()+'</strong><span>'+tr('stat1')+'</span></div><div class="stat"><strong>'+Number(stats.places).toLocaleString()+'</strong><span>'+tr('stat2')+'</span></div><div class="stat"><strong>'+Number(stats.localities_with_places).toLocaleString()+'</strong><span>'+tr('stat3')+'</span></div><div class="stat"><strong>3</strong><span>'+tr('stat4')+'</span></div></div></div></section><section class="section"><div class="shell"><div class="sectionHead"><div><h2>'+tr('livePlaces')+'</h2><p>'+tr('liveSub')+'</p></div><a class="link" href="search.html">'+tr('view')+'</a></div><div class="grid">'+places.places.map(placeCard).join('')+'</div></div></section><section class="section" id="cities"><div class="shell"><div class="sectionHead"><div><h2>'+tr('cities')+'</h2><p>'+tr('citiesSub')+'</p></div><a class="link" href="search.html">'+tr('view')+'</a></div><div class="cityGrid">'+cities.cities.map(cityCard).join('')+'</div></div></section></main>'+footer();
}

async function searchPage(){
  const p=new URLSearchParams(location.search),q=p.get('q')||'',city=p.get('city')||'',category=p.get('category')||'';
  const [cities,places]=await Promise.all([api('cities',{limit:1400}),api('places',{q,city,category,limit:60})]);
  return nav()+'<main class="section"><div class="shell"><div class="sectionHead"><div><h2>'+tr('results')+'</h2><p>'+places.count+' '+tr('restaurants')+'</p></div></div><form class="filterPanel" onsubmit="return filterSearch(event)"><input id="fq" value="'+esc(q)+'" placeholder="'+tr('searchPh')+'" style="border:1px solid var(--line);border-radius:14px;padding:12px"><select id="fcity"><option value="">'+tr('cityAll')+'</option>'+cities.cities.map(c=>'<option value="'+esc(c.official_code)+'" '+(city===String(c.official_code)?'selected':'')+'>'+esc(cityName(c))+' ('+Number(c.places||0)+')</option>').join('')+'</select><select id="fcategory"><option value="">'+tr('all')+'</option><option value="amenity:restaurant" '+(category==='amenity:restaurant'?'selected':'')+'>🍽️ '+categoryName('amenity:restaurant')+'</option><option value="amenity:cafe" '+(category==='amenity:cafe'?'selected':'')+'>☕ '+categoryName('amenity:cafe')+'</option><option value="amenity:fast_food" '+(category==='amenity:fast_food'?'selected':'')+'>🥙 '+categoryName('amenity:fast_food')+'</option><option value="shop:bakery" '+(category==='shop:bakery'?'selected':'')+'>🥐 '+categoryName('shop:bakery')+'</option><option value="amenity:bar" '+(category==='amenity:bar'?'selected':'')+'>🍺 '+categoryName('amenity:bar')+'</option></select><button class="primary">'+tr('search')+'</button></form>'+(places.places.length?'<div class="grid">'+places.places.map(placeCard).join('')+'</div>':'<div class="empty">'+tr('notFound')+'</div>')+'</div></main>'+footer();
}

async function cityPage(){
  const id=new URLSearchParams(location.search).get('id')||'';
  const [cities,places]=await Promise.all([api('cities',{limit:1400}),api('places',{city:id,limit:100})]);
  const c=cities.cities.find(x=>String(x.official_code)===String(id));
  if(!c)return nav()+'<main class="section"><div class="shell"><div class="empty">'+tr('notFound')+'</div></div></main>'+footer();
  return nav()+'<main><section class="detailHero"><div class="shell"><div class="heroPanel" style="padding:46px"><span class="eyebrow">● '+tr('live')+'</span><h1 style="font-size:58px">'+esc(cityName(c))+'</h1><p>'+Number(c.places||0).toLocaleString()+' '+tr('restaurants')+'</p></div></div></section><section class="section"><div class="shell">'+(places.places.length?'<div class="grid">'+places.places.map(placeCard).join('')+'</div>':'<div class="empty">'+tr('notFound')+'</div>')+'</div></section></main>'+footer();
}

async function restaurantPage(){
  const id=new URLSearchParams(location.search).get('id');
  const r=await api('place',{id});
  const map='https://www.openstreetmap.org/?mlat='+encodeURIComponent(r.latitude)+'&mlon='+encodeURIComponent(r.longitude)+'#map=18/'+encodeURIComponent(r.latitude)+'/'+encodeURIComponent(r.longitude);
  return nav()+'<main><section class="detailHero"><div class="shell"><a class="link" href="javascript:history.back()">'+tr('back')+'</a><div class="detailWrap" style="margin-top:14px"><div class="detailMain">'+(r.photo_url?'<div class="detailPhoto"><img src="'+esc(r.photo_url)+'" alt="'+esc(placeName(r))+'" referrerpolicy="no-referrer"><span class="photoSource">'+esc(r.photo_source||'business source')+'</span></div>':'<div class="detailPhoto noPhoto detailNoPhoto"><span>'+icon(r.category)+'</span><small>Фото заведения пока не найдено</small></div>')+'<div class="restaurantTitle"><div><div style="font-size:62px">'+icon(r.category)+'</div><h1>'+esc(placeName(r))+'</h1><div class="detailMeta">'+esc(categoryName(r.category))+' · '+esc(cityName(r))+'</div></div><div class="score" style="font-size:12px">'+tr('live')+'</div></div><h2 style="margin-top:30px">'+tr('source')+'</h2><div class="sourceGrid">'+(r.sources||[]).map(s=>'<div class="sourceBox"><strong>'+esc(String(s.source_code).toUpperCase())+'</strong><span>'+esc(s.source_entity_id)+'</span></div>').join('')+'</div></div><aside class="sideCard"><h3>'+tr('info')+'</h3>'+(r.phone?'<div class="infoLine">☎ <span><strong>'+tr('phone')+'</strong><br>'+esc(r.phone)+'</span></div>':'')+(r.website?'<div class="infoLine">↗ <span><strong>'+tr('website')+'</strong><br><a class="link" href="'+esc(r.website)+'" target="_blank" rel="noopener">'+esc(r.website)+'</a></span></div>':'')+'<div class="infoLine">⌖ <span><strong>'+tr('coordinates')+'</strong><br>'+Number(r.latitude).toFixed(6)+', '+Number(r.longitude).toFixed(6)+'</span></div><a class="cta dark" href="'+map+'" target="_blank" rel="noopener">'+tr('route')+'</a></aside></div></div></section></main>'+footer();
}

function goSearch(e){e.preventDefault();const q=document.getElementById('q').value,city=document.getElementById('city').value;location.href='search.html?q='+encodeURIComponent(q)+'&city='+encodeURIComponent(city);return false}
function filterSearch(e){e.preventDefault();location.href='search.html?q='+encodeURIComponent(document.getElementById('fq').value)+'&city='+encodeURIComponent(document.getElementById('fcity').value)+'&category='+encodeURIComponent(document.getElementById('fcategory').value);return false}

async function renderPage(){
  const root=document.getElementById('app');document.documentElement.lang=lang;document.documentElement.dir=lang==='he'?'rtl':'ltr';root.innerHTML=loading();
  try{
    const p=document.body.dataset.page;
    root.innerHTML=await (p==='search'?searchPage():p==='restaurant'?restaurantPage():p==='city'?cityPage():home());
  }catch(e){
    console.error(e);
    root.innerHTML=nav()+'<main class="section"><div class="shell"><div class="empty">'+tr('notFound')+'</div></div></main>'+footer();
  }
  document.querySelectorAll('.lang').forEach(b=>{b.classList.toggle('active',b.dataset.lang===lang);b.onclick=()=>setLang(b.dataset.lang)});
}
document.addEventListener('DOMContentLoaded',renderPage);
