const API_BASE='https://br-autumn-rice-b5twaf7e-catalogapi.compute.c-7.us-east-2.aws.neon.tech';

const UI={
ru:{catalog:'Каталог',cities:'Города',about:'О проекте',heroTitle:'Места и бизнесы по всему Израилю',heroSub:'Найдите ресторан, магазин, аптеку, отель или сервис. Смотрите фото, контакты и стройте маршрут.',searchPh:'Что вы ищете?',cityAll:'Весь Израиль',search:'Найти',categories:'Популярные категории',places:'мест',viewAll:'Все места',featured:'Рекомендуем посмотреть',featuredSub:'Реальные точки из каталога',cityTitle:'Каталог по городам',citySub:'Выберите город и откройте местный каталог',results:'Результаты',filters:'Фильтры',all:'Все',open:'Открыть',call:'Позвонить',website:'Сайт',route:'Маршрут',google:'Google Maps',waze:'Waze',address:'Адрес',phone:'Телефон',map:'Карта',photos:'Фотографии',info:'Информация',back:'Назад',noPhoto:'Нет фотографии',notFound:'Ничего не найдено',page:'Страница',next:'Далее',prev:'Назад',dataNote:'Israel Places — независимый каталог мест и бизнеса Израиля. Данные собираются из открытых и разрешённых источников.'},
he:{catalog:'קטלוג',cities:'יישובים',about:'אודות',heroTitle:'מקומות ועסקים בכל ישראל',heroSub:'מצאו מסעדה, חנות, בית מרקחת, מלון או שירות. תמונות, פרטים וניווט במקום אחד.',searchPh:'מה מחפשים?',cityAll:'כל ישראל',search:'חיפוש',categories:'קטגוריות פופולריות',places:'מקומות',viewAll:'כל המקומות',featured:'מומלץ לבדוק',featuredSub:'נקודות אמיתיות מתוך הקטלוג',cityTitle:'קטלוג לפי יישוב',citySub:'בחרו עיר או יישוב',results:'תוצאות',filters:'מסננים',all:'הכול',open:'פתיחה',call:'התקשרות',website:'אתר',route:'ניווט',google:'Google Maps',waze:'Waze',address:'כתובת',phone:'טלפון',map:'מפה',photos:'תמונות',info:'מידע',back:'חזרה',noPhoto:'אין תמונה',notFound:'לא נמצאו תוצאות',page:'עמוד',next:'הבא',prev:'הקודם',dataNote:'Israel Places — מדריך עצמאי למקומות ועסקים בישראל. הנתונים נאספים ממקורות פתוחים ומורשים.'},
en:{catalog:'Directory',cities:'Cities',about:'About',heroTitle:'Places and businesses across Israel',heroSub:'Find a restaurant, shop, pharmacy, hotel or service. View photos, contact details and directions.',searchPh:'What are you looking for?',cityAll:'All Israel',search:'Search',categories:'Popular categories',places:'places',viewAll:'All places',featured:'Worth exploring',featuredSub:'Real listings from the directory',cityTitle:'Browse by city',citySub:'Choose a city or locality',results:'Results',filters:'Filters',all:'All',open:'Open',call:'Call',website:'Website',route:'Directions',google:'Google Maps',waze:'Waze',address:'Address',phone:'Phone',map:'Map',photos:'Photos',info:'Information',back:'Back',noPhoto:'No photo',notFound:'No results found',page:'Page',next:'Next',prev:'Previous',dataNote:'Israel Places is an independent directory of places and businesses in Israel. Data is sourced from open and permitted sources.'}
};

const CAT={
'amenity:restaurant':['Ресторан','מסעדה','Restaurant'],'amenity:cafe':['Кафе','בית קפה','Cafe'],'amenity:fast_food':['Фастфуд','מזון מהיר','Fast food'],'amenity:bar':['Бар','בר','Bar'],'amenity:pub':['Паб','פאב','Pub'],'amenity:pharmacy':['Аптека','בית מרקחת','Pharmacy'],'amenity:fuel':['АЗС','תחנת דלק','Fuel'],'amenity:bank':['Банк','בנק','Bank'],'amenity:clinic':['Клиника','מרפאה','Clinic'],'shop:bakery':['Пекарня','מאפייה','Bakery'],'shop:supermarket':['Супермаркет','סופרמרקט','Supermarket'],'shop:convenience':['Минимаркет','מכולת','Convenience'],'shop:clothes':['Одежда','ביגוד','Clothing'],'shop:electronics':['Электроника','אלקטרוניקה','Electronics'],'shop:beauty':['Красота','יופי','Beauty'],'shop:hairdresser':['Парикмахерская','מספרה','Hairdresser'],'tourism:hotel':['Отель','מלון','Hotel'],'tourism:hostel':['Хостел','אכסניה','Hostel']
};

const GROUPS=[
['amenity:restaurant','Рестораны','מסעדות','Restaurants'],
['amenity:fast_food','Фастфуд','מזון מהיר','Fast food'],
['amenity:cafe','Кафе','בתי קפה','Cafés'],
['shop:supermarket','Супермаркеты','סופרמרקטים','Supermarkets'],
['shop:','Магазины','חנויות','Shops'],
['amenity:pharmacy','Аптеки','בתי מרקחת','Pharmacies'],
['amenity:fuel','АЗС','תחנות דלק','Fuel'],
['tourism:','Отели','מלונות','Hotels']
];

let lang=localStorage.getItem('israel-places-lang')||'ru';
const tr=k=>UI[lang][k]||k;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const qs=o=>new URLSearchParams(Object.entries(o).filter(([,v])=>v!==''&&v!=null)).toString();

async function api(route,params={}){const r=await fetch(API_BASE+'/'+route+(Object.keys(params).length?'?'+qs(params):''));if(!r.ok)throw new Error('API '+r.status);return r.json()}
function setLang(l){lang=l;localStorage.setItem('israel-places-lang',l);document.documentElement.lang=l;document.documentElement.dir=l==='he'?'rtl':'ltr';renderPage()}
function cityName(c){const f=lang==='he'?'ישראל':lang==='ru'?'Израиль':'Israel';return lang==='he'?(c.name_he||c.city_he||c.name_en||c.city_en||f):lang==='ru'?(c.name_ru||c.city_ru||c.name_en||c.city_en||c.name_he||c.city_he||f):(c.name_en||c.city_en||c.name_he||c.city_he||f)}
function placeName(p){return lang==='he'?(p.name_he||p.primary_name):lang==='ru'?(p.name_ru||p.name_he||p.name_en||p.primary_name):(p.name_en||p.primary_name||p.name_he)}
function categoryName(v){const a=CAT[v];return a?(lang==='ru'?a[0]:lang==='he'?a[1]:a[2]):String(v||'').replace(/^.*:/,'').replaceAll('_',' ')}
function groupLabel(g){return lang==='ru'?g[1]:lang==='he'?g[2]:g[3]}
function safeHttpUrl(v){try{const u=new URL(String(v||''));return /^https?:$/.test(u.protocol)?u.href:''}catch{return''}}
function hasCoords(p){return p&&Number.isFinite(Number(p.latitude))&&Number.isFinite(Number(p.longitude))&&p.latitude!=null&&p.longitude!=null}
function googleUrl(p){return 'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(p.latitude+','+p.longitude)}
function wazeUrl(p){return 'https://www.waze.com/ul?ll='+encodeURIComponent(p.latitude+','+p.longitude)+'&navigate=yes'}

function nav(){return '<header class="topbar"><div class="shell nav"><a class="brand" href="index.html"><img src="logo.svg" alt="Israel Places"></a><nav class="navlinks"><a href="search.html">'+tr('catalog')+'</a><a href="index.html#cities">'+tr('cities')+'</a></nav><div class="navtools"><button class="lang" data-lang="he">HE</button><button class="lang" data-lang="ru">RU</button><button class="lang" data-lang="en">EN</button></div></div></header>'}
function footer(){return '<footer class="footer"><div class="shell footerIn"><img src="logo.svg" alt="Israel Places"><div>'+tr('dataNote')+'<br>© OpenStreetMap contributors</div></div></footer>'}
function loading(){return nav()+'<main><div class="loading"></div></main>'+footer()}

function placeholder(p){return '<div class="photoPlaceholder"><span>IP</span><small>'+tr('noPhoto')+'</small></div>'}
function photo(p,cls=''){return p.photo_url?'<img class="'+cls+'" src="'+esc(p.photo_url)+'" alt="'+esc(placeName(p))+'" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=\'logo.svg\';this.classList.add(\'brokenPhoto\')">':placeholder(p)}

function compactCard(p){
 return '<article class="compactCard"><a class="compactMedia" href="place.html?id='+encodeURIComponent(p.id)+'">'+photo(p)+'</a><div class="compactBody"><span class="compactCat">'+esc(categoryName(p.category))+'</span><a class="compactTitle" href="place.html?id='+encodeURIComponent(p.id)+'">'+esc(placeName(p))+'</a><div class="compactCity">'+esc(cityName(p))+'</div></div></article>'
}
function resultCard(p){
 const actions=hasCoords(p)?'<a href="'+googleUrl(p)+'" target="_blank" rel="noopener">G</a><a href="'+wazeUrl(p)+'" target="_blank" rel="noopener">W</a>':'';
 return '<article class="resultCard"><a class="resultThumb" href="place.html?id='+encodeURIComponent(p.id)+'">'+photo(p)+'</a><div class="resultInfo"><div class="resultTop"><span>'+esc(categoryName(p.category))+'</span></div><a class="resultTitle" href="place.html?id='+encodeURIComponent(p.id)+'">'+esc(placeName(p))+'</a><div class="resultCity">'+esc(cityName(p))+'</div><div class="resultActions"><a class="openBtn" href="place.html?id='+encodeURIComponent(p.id)+'">'+tr('open')+'</a>'+actions+'</div></div></article>'
}
function categoryBar(active=''){return '<div class="categoryBar"><a class="catChip '+(!active?'active':'')+'" href="search.html">'+tr('all')+'</a>'+GROUPS.map(g=>'<a class="catChip '+(active===g[0]?'active':'')+'" href="search.html?category='+encodeURIComponent(g[0])+'">'+esc(groupLabel(g))+'</a>').join('')+'</div>'}

function initMap(id,places,zoom=8){
 if(!window.L)return;
 const el=document.getElementById(id);if(!el||el._leaflet_id)return;
 const pts=places.filter(hasCoords);
 const map=L.map(el,{zoomControl:true,scrollWheelZoom:true,attributionControl:true});
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
 if(!pts.length){map.setView([31.6,34.8],8);return}
 const bounds=[];
 pts.slice(0,120).forEach(p=>{
   const ll=[Number(p.latitude),Number(p.longitude)];bounds.push(ll);
   const icon=L.divIcon({className:'',html:'<span class="mapPin"></span>',iconSize:[26,34],iconAnchor:[13,34]});
   L.marker(ll,{icon}).addTo(map).bindPopup('<a class="mapPopup" href="place.html?id='+encodeURIComponent(p.id)+'"><strong>'+esc(placeName(p))+'</strong><span>'+esc(categoryName(p.category))+' · '+esc(cityName(p))+'</span></a>');
 });
 if(bounds.length===1)map.setView(bounds[0],14);else map.fitBounds(bounds,{padding:[35,35],maxZoom:13});
}

async function home(){
 const [stats,cities,places]=await Promise.all([api('stats'),api('cities',{limit:12}),api('places',{limit:16})]);
 const list=places.places||[];
 setTimeout(()=>initMap('homeMap',list,8),0);
 return nav()+'<main class="home">'+
 '<section class="hero"><div class="shell heroInner"><div class="heroCopy"><span class="eyebrow">ISRAEL PLACES</span><h1>'+tr('heroTitle')+'</h1><p>'+tr('heroSub')+'</p>'+
 '<form class="mainSearch" onsubmit="return goSearch(event)"><div class="searchBox"><span>⌕</span><input id="q" placeholder="'+tr('searchPh')+'"></div><div class="cityBox"><select id="city"><option value="">'+tr('cityAll')+'</option>'+cities.cities.map(c=>'<option value="'+esc(c.official_code)+'">'+esc(cityName(c))+'</option>').join('')+'</select></div><button>'+tr('search')+'</button></form>'+
 '<div class="homeMeta"><span><strong>'+Number(stats.places||0).toLocaleString()+'</strong> '+tr('places')+'</span><span>'+tr('cityAll')+'</span></div></div><div class="heroMap"><div id="homeMap"></div><div class="mapBadge">'+tr('map')+'</div></div></div></section>'+
 '<section class="homeSection"><div class="shell"><div class="sectionHead"><div><h2>'+tr('categories')+'</h2></div><a href="search.html">'+tr('viewAll')+'</a></div>'+categoryBar('')+'</div></section>'+
 '<section class="homeSection"><div class="shell"><div class="sectionHead"><div><h2>'+tr('featured')+'</h2><p>'+tr('featuredSub')+'</p></div><a href="search.html">'+tr('viewAll')+'</a></div><div class="compactGrid">'+list.slice(0,8).map(compactCard).join('')+'</div></div></section>'+
 '<section class="homeSection" id="cities"><div class="shell"><div class="sectionHead"><div><h2>'+tr('cityTitle')+'</h2><p>'+tr('citySub')+'</p></div></div><div class="cityGrid">'+cities.cities.map(c=>'<a href="city.html?id='+encodeURIComponent(c.official_code)+'"><strong>'+esc(cityName(c))+'</strong><span>'+Number(c.places||0).toLocaleString()+' '+tr('places')+'</span></a>').join('')+'</div></div></section>'+
 '</main>'+footer()
}

function pager(page,hasMore,params,base){if(page===1&&!hasMore)return'';return '<nav class="pager">'+(page>1?'<a href="'+base+'?'+qs({...params,page:page-1})+'">← '+tr('prev')+'</a>':'<span></span>')+'<strong>'+tr('page')+' '+page+'</strong>'+(hasMore?'<a href="'+base+'?'+qs({...params,page:page+1})+'">'+tr('next')+' →</a>':'<span></span>')+'</nav>'}

async function searchPage(){
 const p=new URLSearchParams(location.search),q=p.get('q')||'',city=p.get('city')||'',category=p.get('category')||'',page=Math.max(1,Number(p.get('page')||1)),size=50,offset=(page-1)*size;
 const [cities,data]=await Promise.all([api('cities',{limit:1400}),api('places',{q,city,category,limit:size,offset})]);
 const list=data.places||[];setTimeout(()=>initMap('resultsMap',list,11),0);
 return nav()+'<main class="explorePage"><div class="exploreTop"><div class="shell"><form class="exploreSearch" onsubmit="return filterSearch(event)"><div class="searchBox"><span>⌕</span><input id="fq" value="'+esc(q)+'" placeholder="'+tr('searchPh')+'"></div><div class="cityBox"><select id="fcity"><option value="">'+tr('cityAll')+'</option>'+cities.cities.map(c=>'<option value="'+esc(c.official_code)+'" '+(city===String(c.official_code)?'selected':'')+'>'+esc(cityName(c))+'</option>').join('')+'</select></div><input type="hidden" id="fcategory" value="'+esc(category)+'"><button>'+tr('search')+'</button></form>'+categoryBar(category)+'</div></div>'+
 '<div class="exploreLayout"><section class="resultsPane"><div class="resultsHeader"><h1>'+tr('results')+'</h1><span>'+list.length+' '+tr('places')+'</span></div><div class="resultsList">'+(list.length?list.map(resultCard).join(''):'<div class="empty">'+tr('notFound')+'</div>')+'</div>'+pager(page,list.length===size,{q,city,category},'search.html')+'</section><aside class="mapPane"><div id="resultsMap"></div></aside></div></main>'+footer()
}

async function cityPage(){
 const p=new URLSearchParams(location.search),id=p.get('id')||'',page=Math.max(1,Number(p.get('page')||1)),size=50,offset=(page-1)*size;
 const [cities,data]=await Promise.all([api('cities',{limit:1400}),api('places',{city:id,limit:size,offset})]);
 const c=cities.cities.find(x=>String(x.official_code)===String(id));const list=data.places||[];
 if(!c)return nav()+'<main class="simplePage"><div class="empty">'+tr('notFound')+'</div></main>'+footer();
 setTimeout(()=>initMap('resultsMap',list,12),0);
 return nav()+'<main class="explorePage"><div class="exploreTop"><div class="shell cityIntro"><a href="index.html#cities">← '+tr('back')+'</a><h1>'+esc(cityName(c))+'</h1><p>'+Number(c.places||0).toLocaleString()+' '+tr('places')+'</p>'+categoryBar('')+'</div></div><div class="exploreLayout"><section class="resultsPane"><div class="resultsList">'+(list.length?list.map(resultCard).join(''):'<div class="empty">'+tr('notFound')+'</div>')+'</div>'+pager(page,list.length===size,{id},'city.html')+'</section><aside class="mapPane"><div id="resultsMap"></div></aside></div></main>'+footer()
}

async function placePage(){
 const id=new URLSearchParams(location.search).get('id');const r=await api('place',{id});const coords=hasCoords(r),website=safeHttpUrl(r.website),address=(r.sources||[]).map(x=>x.address_text).find(Boolean)||'';
 const photos=(r.photos||[]).filter((x,i,a)=>x?.image_url&&a.findIndex(y=>y.image_url===x.image_url)===i).slice(0,5);
 const gallery=[r.photo_url,...photos.map(x=>x.image_url)].filter((x,i,a)=>x&&a.indexOf(x)===i).slice(0,5);
 if(coords)setTimeout(()=>initMap('placeMap',[r],15),0);
 return nav()+'<main class="placePage"><div class="shell"><div class="breadcrumbs"><a href="search.html">'+tr('catalog')+'</a><span>›</span><span>'+esc(cityName(r))+'</span></div>'+
 '<section class="placeHeader"><div><span class="placeCategory">'+esc(categoryName(r.category))+'</span><h1>'+esc(placeName(r))+'</h1><p>'+esc(cityName(r))+(address?' · '+esc(address):'')+'</p></div><div class="headerActions">'+(r.phone?'<a href="tel:'+esc(r.phone)+'">'+tr('call')+'</a>':'')+(website?'<a href="'+esc(website)+'" target="_blank" rel="noopener">'+tr('website')+'</a>':'')+(coords?'<a class="primaryAction" href="'+googleUrl(r)+'" target="_blank" rel="noopener">'+tr('route')+'</a>':'')+'</div></section>'+
 '<section class="gallery">'+(gallery.length?gallery.map((src,i)=>'<a class="galleryItem galleryItem'+i+'" href="'+esc(src)+'" target="_blank" rel="noopener"><img src="'+esc(src)+'" alt="'+esc(placeName(r))+'" referrerpolicy="no-referrer"></a>').join(''):'<div class="galleryEmpty">'+placeholder(r)+'</div>')+'</section>'+
 '<section class="placeContent"><div class="placeInfo"><h2>'+tr('info')+'</h2><dl>'+(address?'<div><dt>'+tr('address')+'</dt><dd>'+esc(address)+'</dd></div>':'')+(r.phone?'<div><dt>'+tr('phone')+'</dt><dd><a href="tel:'+esc(r.phone)+'">'+esc(r.phone)+'</a></dd></div>':'')+(website?'<div><dt>'+tr('website')+'</dt><dd><a href="'+esc(website)+'" target="_blank" rel="noopener">'+esc(website)+'</a></dd></div>':'')+'</dl></div><aside class="routeCard"><h2>'+tr('route')+'</h2>'+(coords?'<a class="googleRoute" href="'+googleUrl(r)+'" target="_blank" rel="noopener">Google Maps</a><a class="wazeRoute" href="'+wazeUrl(r)+'" target="_blank" rel="noopener">Waze</a><div id="placeMap"></div>':'<p>'+tr('notFound')+'</p>')+'</aside></section>'+
 '</div></main>'+footer()
}

function goSearch(e){e.preventDefault();location.href='search.html?q='+encodeURIComponent(document.getElementById('q').value)+'&city='+encodeURIComponent(document.getElementById('city').value);return false}
function filterSearch(e){e.preventDefault();location.href='search.html?q='+encodeURIComponent(document.getElementById('fq').value)+'&city='+encodeURIComponent(document.getElementById('fcity').value)+'&category='+encodeURIComponent(document.getElementById('fcategory').value);return false}
async function renderPage(){const root=document.getElementById('app');document.documentElement.lang=lang;document.documentElement.dir=lang==='he'?'rtl':'ltr';root.innerHTML=loading();try{const p=document.body.dataset.page;root.innerHTML=await(p==='search'?searchPage():p==='city'?cityPage():p==='place'?placePage():home())}catch(e){console.error(e);root.innerHTML=nav()+'<main class="simplePage"><div class="empty">'+tr('notFound')+'</div></main>'+footer()}document.querySelectorAll('.lang').forEach(b=>{b.classList.toggle('active',b.dataset.lang===lang);b.onclick=()=>setLang(b.dataset.lang)})}
document.addEventListener('DOMContentLoaded',renderPage);