const API_BASE='https://br-autumn-rice-b5twaf7e-catalogapi.compute.c-7.us-east-2.aws.neon.tech';

const UI={
ru:{
navExplore:'Каталог',navCategories:'Категории',navCities:'Города',
heroBadge:'НАЦИОНАЛЬНЫЙ КАТАЛОГ ИЗРАИЛЯ',heroTitle:'Найдите нужное место. Быстро.',heroSub:'Рестораны, магазины, аптеки, отели, сервисы и другие места по всему Израилю. Фото, контакты и маршрут — в одной карточке.',
searchPh:'Название бизнеса, места или категории',cityAll:'Весь Израиль',search:'Найти',
statPlaces:'мест и бизнесов',statCities:'городов и населённых пунктов',statNav:'навигация Google Maps и Waze',
categories:'Категории',categoriesSub:'Быстрый переход к нужному типу места',viewAll:'Смотреть весь каталог',
featured:'Места в каталоге',featuredSub:'Реальные точки с фотографиями и контактами',cities:'Города и населённые пункты',citiesSub:'Откройте локальный каталог нужного города',
places:'мест',open:'Открыть',results:'Результаты',all:'Все',filters:'Фильтры',back:'Назад',
info:'Контакты и информация',phone:'Позвонить',website:'Открыть сайт',address:'Адрес',coordinates:'Координаты',
navigate:'Маршрут',googleMaps:'Google Maps',waze:'Waze',gallery:'Фотографии',map:'На карте',sources:'Источники данных',
noPhoto:'Фото пока нет',notFound:'По вашему запросу ничего не найдено.',next:'Следующая',prev:'Предыдущая',page:'Страница',
dataNote:'Israel Places — каталог мест и бизнеса Израиля. Данные объединяются из открытых и разрешённых источников и постоянно уточняются.'
},
he:{
navExplore:'קטלוג',navCategories:'קטגוריות',navCities:'יישובים',
heroBadge:'המדריך הארצי של ישראל',heroTitle:'מצאו את המקום הנכון. מהר.',heroSub:'מסעדות, חנויות, בתי מרקחת, מלונות, שירותים ומקומות נוספים בכל ישראל. תמונות, פרטים וניווט בכרטיס אחד.',
searchPh:'שם עסק, מקום או קטגוריה',cityAll:'כל ישראל',search:'חיפוש',
statPlaces:'מקומות ועסקים',statCities:'ערים ויישובים',statNav:'ניווט Google Maps ו-Waze',
categories:'קטגוריות',categoriesSub:'גישה מהירה לסוג המקום הרצוי',viewAll:'כל הקטלוג',
featured:'מקומות במדריך',featuredSub:'נקודות אמיתיות עם תמונות ופרטי קשר',cities:'ערים ויישובים',citiesSub:'פתחו את המדריך המקומי של היישוב',
places:'מקומות',open:'פתיחה',results:'תוצאות',all:'הכול',filters:'מסננים',back:'חזרה',
info:'פרטים ויצירת קשר',phone:'התקשרות',website:'פתיחת אתר',address:'כתובת',coordinates:'קואורדינטות',
navigate:'ניווט',googleMaps:'Google Maps',waze:'Waze',gallery:'תמונות',map:'על המפה',sources:'מקורות מידע',
noPhoto:'אין תמונה עדיין',notFound:'לא נמצאו תוצאות לחיפוש.',next:'הבא',prev:'הקודם',page:'עמוד',
dataNote:'Israel Places — מדריך מקומות ועסקים בישראל. הנתונים נאספים ממקורות פתוחים ומורשים ומתעדכנים באופן שוטף.'
},
en:{
navExplore:'Directory',navCategories:'Categories',navCities:'Cities',
heroBadge:'ISRAEL NATIONAL DIRECTORY',heroTitle:'Find the right place. Fast.',heroSub:'Restaurants, shops, pharmacies, hotels, services and more across Israel. Photos, contact details and directions in one place.',
searchPh:'Business, place or category',cityAll:'All Israel',search:'Search',
statPlaces:'places and businesses',statCities:'cities and localities',statNav:'Google Maps & Waze navigation',
categories:'Categories',categoriesSub:'Jump straight to the type of place you need',viewAll:'View full directory',
featured:'Places in the directory',featuredSub:'Real listings with photos and contact details',cities:'Cities and localities',citiesSub:'Open a local directory for your area',
places:'places',open:'Open',results:'Results',all:'All',filters:'Filters',back:'Back',
info:'Contact & information',phone:'Call',website:'Open website',address:'Address',coordinates:'Coordinates',
navigate:'Directions',googleMaps:'Google Maps',waze:'Waze',gallery:'Photos',map:'Map',sources:'Data sources',
noPhoto:'No photo yet',notFound:'No results found for your search.',next:'Next',prev:'Previous',page:'Page',
dataNote:'Israel Places is a directory of places and businesses in Israel. Data is merged from open and permitted sources and continuously refined.'
}
};

const CAT={
'amenity:restaurant':['Ресторан','מסעדה','Restaurant'],
'amenity:cafe':['Кафе','בית קפה','Cafe'],
'amenity:fast_food':['Фастфуд','מזון מהיר','Fast food'],
'amenity:bar':['Бар','בר','Bar'],
'amenity:pub':['Паб','פאב','Pub'],
'amenity:food_court':['Фуд-корт','מתחם אוכל','Food court'],
'amenity:ice_cream':['Мороженое','גלידה','Ice cream'],
'amenity:pharmacy':['Аптека','בית מרקחת','Pharmacy'],
'amenity:fuel':['АЗС','תחנת דלק','Fuel station'],
'amenity:bank':['Банк','בנק','Bank'],
'amenity:clinic':['Клиника','מרפאה','Clinic'],
'amenity:dentist':['Стоматология','רופא שיניים','Dentist'],
'amenity:doctors':['Врачи','רופאים','Doctors'],
'shop:bakery':['Пекарня','מאפייה','Bakery'],
'shop:supermarket':['Супермаркет','סופרמרקט','Supermarket'],
'shop:convenience':['Минимаркет','מכולת','Convenience'],
'shop:kiosk':['Киоск','קיוסק','Kiosk'],
'shop:clothes':['Одежда','ביגוד','Clothing'],
'shop:electronics':['Электроника','אלקטרוניקה','Electronics'],
'shop:beauty':['Красота','יופי','Beauty'],
'shop:hairdresser':['Парикмахерская','מספרה','Hairdresser'],
'tourism:hotel':['Отель','מלון','Hotel'],
'tourism:hostel':['Хостел','אכסניה','Hostel']
};

const GROUPS=[
['food','amenity:','Еда и напитки','אוכל ושתייה','Food & drink'],
['restaurants','amenity:restaurant','Рестораны','מסעדות','Restaurants'],
['fast','amenity:fast_food','Фастфуд','מזון מהיר','Fast food'],
['shops','shop:','Магазины','חנויות','Shops'],
['market','shop:supermarket','Супермаркеты','סופרמרקטים','Supermarkets'],
['health','amenity:pharmacy','Аптеки','בתי מרקחת','Pharmacies'],
['fuel','amenity:fuel','АЗС','תחנות דלק','Fuel'],
['hotel','tourism:','Отели и туризм','מלונות ותיירות','Hotels & tourism'],
['beauty','shop:beauty','Красота','יופי','Beauty'],
['auto','shop:car','Авто','רכב','Automotive'],
['services','office:','Услуги','שירותים','Services'],
['all','', 'Все места','כל המקומות','All places']
];

let lang=localStorage.getItem('israel-places-lang')||localStorage.getItem('foodrate-lang')||'ru';
const tr=k=>UI[lang][k]||k;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const qs=o=>new URLSearchParams(Object.entries(o).filter(([,v])=>v!==''&&v!=null)).toString();

async function api(route,params={}){
 const r=await fetch(API_BASE+'/'+route+(Object.keys(params).length?'?'+qs(params):''));
 if(!r.ok) throw new Error('API '+r.status);
 return r.json();
}
function setLang(l){lang=l;localStorage.setItem('israel-places-lang',l);document.documentElement.lang=l;document.documentElement.dir=l==='he'?'rtl':'ltr';renderPage()}
function cityName(c){const f=lang==='he'?'ישראל':lang==='ru'?'Израиль':'Israel';return lang==='he'?(c.name_he||c.city_he||c.name_en||c.city_en||f):lang==='ru'?(c.name_ru||c.city_ru||c.name_en||c.city_en||c.name_he||c.city_he||f):(c.name_en||c.city_en||c.name_he||c.city_he||f)}
function placeName(p){return lang==='he'?(p.name_he||p.primary_name):lang==='ru'?(p.name_ru||p.name_he||p.name_en||p.primary_name):(p.name_en||p.primary_name||p.name_he)}
function categoryName(v){const a=CAT[v];return a?(lang==='ru'?a[0]:lang==='he'?a[1]:a[2]):String(v||'').replace(/^.*:/,'').replaceAll('_',' ')}
function groupLabel(g){return lang==='ru'?g[2]:lang==='he'?g[3]:g[4]}
function safeHttpUrl(v){try{const u=new URL(String(v||''));return /^https?:$/.test(u.protocol)?u.href:''}catch{return''}}
function googleUrl(p){return 'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent([p.latitude,p.longitude].filter(v=>v!==null&&v!==undefined).join(','))}
function wazeUrl(p){return 'https://www.waze.com/ul?ll='+encodeURIComponent(String(p.latitude)+','+String(p.longitude))+'&navigate=yes'}
function hasCoords(p){return p&&p.latitude!=null&&p.longitude!=null&&Number.isFinite(Number(p.latitude))&&Number.isFinite(Number(p.longitude))}

function nav(){return '<header class="topbar"><div class="shell nav"><a class="brand" href="index.html"><img class="brandLogo" src="logo.svg" alt="Israel Places"></a><nav class="navlinks"><a href="search.html">'+tr('navExplore')+'</a><a href="index.html#categories">'+tr('navCategories')+'</a><a href="index.html#cities">'+tr('navCities')+'</a></nav><div class="navtools"><button class="lang" data-lang="he">HE</button><button class="lang" data-lang="ru">RU</button><button class="lang" data-lang="en">EN</button></div></div></header>'}
function footer(){return '<footer class="footer"><div class="shell footerIn"><img src="logo.svg" class="footerLogo" alt="Israel Places"><div class="footerNav"><a href="search.html">'+tr('navExplore')+'</a><a href="index.html#categories">'+tr('navCategories')+'</a><a href="index.html#cities">'+tr('navCities')+'</a></div><div class="legal">'+tr('dataNote')+'<br>© OpenStreetMap contributors</div></div></footer>'}
function loading(){return nav()+'<main><div class="shell"><div class="loadingLine"></div></div></main>'+footer()}

function placeholder(p){return '<div class="photoPlaceholder"><img src="logo.svg" alt=""><span>'+esc(categoryName(p.category))+'</span><small>'+tr('noPhoto')+'</small></div>'}
function photo(p){return p.photo_url?'<img src="'+esc(p.photo_url)+'" alt="'+esc(placeName(p))+'" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=\'logo.svg\';this.classList.add(\'brokenPhoto\')">':placeholder(p)}

function placeCard(p){
 const navs=hasCoords(p)?'<a class="quickBtn googleMini" href="'+googleUrl(p)+'" target="_blank" rel="noopener" aria-label="Google Maps">G</a><a class="quickBtn wazeMini" href="'+wazeUrl(p)+'" target="_blank" rel="noopener" aria-label="Waze">W</a>':'';
 return '<article class="placeCard"><a class="placeMedia" href="place.html?id='+encodeURIComponent(p.id)+'">'+photo(p)+'<span class="categoryBadge">'+esc(categoryName(p.category))+'</span></a><div class="placeBody"><a class="placeTitle" href="place.html?id='+encodeURIComponent(p.id)+'">'+esc(placeName(p))+'</a><div class="placeLocation">'+esc(cityName(p))+'</div><div class="placeFooter"><a class="openPlace" href="place.html?id='+encodeURIComponent(p.id)+'">'+tr('open')+' <span>→</span></a><div class="quickActions">'+navs+'</div></div></div></article>'
}
function cityCard(c){return '<a class="cityRow" href="city.html?id='+encodeURIComponent(c.official_code)+'"><div><strong>'+esc(cityName(c))+'</strong><span>'+Number(c.places||0).toLocaleString()+' '+tr('places')+'</span></div><b>→</b></a>'}
function categoryRail(active=''){return '<div class="categoryRail"><a class="railItem '+(!active?'active':'')+'" href="search.html">'+tr('all')+'</a>'+GROUPS.filter(g=>g[1]).map(g=>'<a class="railItem '+(active===g[1]?'active':'')+'" href="search.html?category='+encodeURIComponent(g[1])+'">'+esc(groupLabel(g))+'</a>').join('')+'</div>'}
function categorySection(){return '<section class="section categoriesSection" id="categories"><div class="shell"><div class="sectionHead"><div><span class="sectionLabel">01</span><div><h2>'+tr('categories')+'</h2><p>'+tr('categoriesSub')+'</p></div></div><a class="sectionLink" href="search.html">'+tr('viewAll')+' →</a></div><div class="categoryGrid">'+GROUPS.map((g,i)=>'<a class="categoryItem" href="search.html'+(g[1]?'?category='+encodeURIComponent(g[1]):'')+'"><span class="categoryNo">'+String(i+1).padStart(2,'0')+'</span><strong>'+esc(groupLabel(g))+'</strong><span class="categoryGo">↗</span></a>').join('')+'</div></div></section>'}

async function home(){
 const [stats,cities,places]=await Promise.all([api('stats'),api('cities',{limit:10}),api('places',{limit:18})]);
 const featured=places.places.filter(p=>p.photo_url).slice(0,5);
 const heroPhoto=featured[0];
 return nav()+'<main>'+
 '<section class="homeHero"><div class="shell heroLayout"><div class="heroContent"><span class="heroOverline">'+tr('heroBadge')+'</span><h1>'+tr('heroTitle')+'</h1><p>'+tr('heroSub')+'</p>'+
 '<form class="heroSearch" onsubmit="return goSearch(event)"><div class="searchInput"><span>⌕</span><input id="q" autocomplete="off" placeholder="'+tr('searchPh')+'"></div><div class="searchCity"><span>⌖</span><select id="city"><option value="">'+tr('cityAll')+'</option>'+cities.cities.map(c=>'<option value="'+esc(c.official_code)+'">'+esc(cityName(c))+'</option>').join('')+'</select></div><button>'+tr('search')+'</button></form>'+
 '<div class="heroStats"><div><strong>'+Number(stats.places||0).toLocaleString()+'</strong><span>'+tr('statPlaces')+'</span></div><div><strong>'+Number(stats.localities_with_places||0).toLocaleString()+'</strong><span>'+tr('statCities')+'</span></div><div><strong>2</strong><span>'+tr('statNav')+'</span></div></div></div>'+
 (heroPhoto?'<a class="heroFeature" href="place.html?id='+encodeURIComponent(heroPhoto.id)+'"><div class="heroFeatureMedia">'+photo(heroPhoto)+'</div><div class="heroFeatureInfo"><span>'+esc(categoryName(heroPhoto.category))+'</span><strong>'+esc(placeName(heroPhoto))+'</strong><small>'+esc(cityName(heroPhoto))+'</small></div></a>':'')+
 '</div></section>'+
 categorySection()+
 '<section class="section"><div class="shell"><div class="sectionHead"><div><span class="sectionLabel">02</span><div><h2>'+tr('featured')+'</h2><p>'+tr('featuredSub')+'</p></div></div><a class="sectionLink" href="search.html">'+tr('viewAll')+' →</a></div><div class="placeGrid">'+places.places.slice(0,12).map(placeCard).join('')+'</div></div></section>'+
 '<section class="section citiesSection" id="cities"><div class="shell"><div class="sectionHead"><div><span class="sectionLabel">03</span><div><h2>'+tr('cities')+'</h2><p>'+tr('citiesSub')+'</p></div></div></div><div class="citiesList">'+cities.cities.map(cityCard).join('')+'</div></div></section>'+
 '</main>'+footer()
}

function pageNav(page,hasMore,params,base){
 if(page===1&&!hasMore)return'';
 return '<nav class="pagination">'+(page>1?'<a href="'+base+'?'+qs({...params,page:page-1})+'">← '+tr('prev')+'</a>':'<span></span>')+'<strong>'+tr('page')+' '+page+'</strong>'+(hasMore?'<a href="'+base+'?'+qs({...params,page:page+1})+'">'+tr('next')+' →</a>':'<span></span>')+'</nav>'
}

async function searchPage(){
 const p=new URLSearchParams(location.search),q=p.get('q')||'',city=p.get('city')||'',category=p.get('category')||'',page=Math.max(1,Number(p.get('page')||1)),size=60,offset=(page-1)*size;
 const [cities,places]=await Promise.all([api('cities',{limit:1400}),api('places',{q,city,category,limit:size,offset})]);
 const hasMore=places.places.length===size;
 return nav()+'<main class="catalogPage"><div class="shell"><div class="catalogHeader"><div><span class="heroOverline">ISRAEL PLACES</span><h1>'+tr('results')+'</h1></div><div class="catalogCount">'+places.places.length+' '+tr('places')+'</div></div>'+
 '<form class="catalogSearch" onsubmit="return filterSearch(event)"><div class="searchInput"><span>⌕</span><input id="fq" value="'+esc(q)+'" placeholder="'+tr('searchPh')+'"></div><div class="searchCity"><span>⌖</span><select id="fcity"><option value="">'+tr('cityAll')+'</option>'+cities.cities.map(c=>'<option value="'+esc(c.official_code)+'" '+(city===String(c.official_code)?'selected':'')+'>'+esc(cityName(c))+'</option>').join('')+'</select></div><input type="hidden" id="fcategory" value="'+esc(category)+'"><button>'+tr('search')+'</button></form>'+
 categoryRail(category)+
 (places.places.length?'<div class="placeGrid resultGrid">'+places.places.map(placeCard).join('')+'</div>'+pageNav(page,hasMore,{q,city,category},'search.html'):'<div class="emptyState"><strong>'+tr('notFound')+'</strong></div>')+
 '</div></main>'+footer()
}

async function cityPage(){
 const p=new URLSearchParams(location.search),id=p.get('id')||'',page=Math.max(1,Number(p.get('page')||1)),size=60,offset=(page-1)*size;
 const [cities,places]=await Promise.all([api('cities',{limit:1400}),api('places',{city:id,limit:size,offset})]);
 const c=cities.cities.find(x=>String(x.official_code)===String(id));
 if(!c)return nav()+'<main class="catalogPage"><div class="shell"><div class="emptyState"><strong>'+tr('notFound')+'</strong></div></div></main>'+footer();
 return nav()+'<main class="catalogPage"><div class="shell"><div class="cityHeader"><a href="index.html#cities">← '+tr('back')+'</a><span class="heroOverline">LOCAL DIRECTORY</span><h1>'+esc(cityName(c))+'</h1><p>'+Number(c.places||0).toLocaleString()+' '+tr('places')+'</p></div>'+categoryRail('')+(places.places.length?'<div class="placeGrid resultGrid">'+places.places.map(placeCard).join('')+'</div>'+pageNav(page,places.places.length===size,{id},'city.html'):'<div class="emptyState"><strong>'+tr('notFound')+'</strong></div>')+'</div></main>'+footer()
}

function mapEmbed(lat,lon){
 const la=Number(lat),lo=Number(lon),dx=.008,dy=.005;
 const bbox=[lo-dx,la-dy,lo+dx,la+dy].map(x=>x.toFixed(6)).join('%2C');
 return 'https://www.openstreetmap.org/export/embed.html?bbox='+bbox+'&layer=mapnik&marker='+la.toFixed(6)+'%2C'+lo.toFixed(6);
}

async function restaurantPage(){
 const id=new URLSearchParams(location.search).get('id'),r=await api('place',{id});
 const coords=hasCoords(r),photos=(r.photos||[]).filter((x,i,a)=>x?.image_url&&a.findIndex(y=>y.image_url===x.image_url)===i).slice(0,8),address=(r.sources||[]).map(x=>x.address_text).find(Boolean)||'',website=safeHttpUrl(r.website);
 const hero=r.photo_url?'<img src="'+esc(r.photo_url)+'" alt="'+esc(placeName(r))+'" referrerpolicy="no-referrer">':placeholder(r);
 const gallery=photos.length>1?'<section class="detailSection"><div class="detailSectionTitle"><h2>'+tr('gallery')+'</h2></div><div class="detailGallery">'+photos.slice(1).map((p,i)=>'<a href="'+esc(p.image_url)+'" target="_blank" rel="noopener"><img src="'+esc(p.image_url)+'" alt="'+esc(placeName(r))+' '+(i+2)+'" loading="lazy" referrerpolicy="no-referrer"></a>').join('')+'</div></section>':'';
 const sources=(r.sources||[]).length?'<details class="sourcesDetails"><summary>'+tr('sources')+'</summary><div class="sourcesInside">'+r.sources.map(s=>'<div><strong>'+esc(String(s.source_code).toUpperCase())+'</strong><span>'+esc(s.source_entity_id||'')+'</span></div>').join('')+'</div></details>':'';
 return nav()+'<main class="detailPage"><div class="shell"><div class="breadcrumbs"><a href="search.html">'+tr('navExplore')+'</a><span>/</span><span>'+esc(cityName(r))+'</span><span>/</span><strong>'+esc(placeName(r))+'</strong></div>'+
 '<section class="businessHero"><div class="businessMedia">'+hero+'</div><div class="businessSummary"><span class="businessCategory">'+esc(categoryName(r.category))+'</span><h1>'+esc(placeName(r))+'</h1><p class="businessCity">'+esc(cityName(r))+'</p>'+(address?'<p class="businessAddress">'+esc(address)+'</p>':'')+
 '<div class="businessActions">'+(r.phone?'<a class="actionPrimary" href="tel:'+esc(r.phone)+'">'+tr('phone')+'</a>':'')+(website?'<a class="actionSecondary" href="'+esc(website)+'" target="_blank" rel="noopener">'+tr('website')+'</a>':'')+'</div>'+
 '<div class="routeBlock"><span>'+tr('navigate')+'</span><div>'+(coords?'<a class="routeGoogle" href="'+googleUrl(r)+'" target="_blank" rel="noopener"><b>G</b>'+tr('googleMaps')+'</a><a class="routeWaze" href="'+wazeUrl(r)+'" target="_blank" rel="noopener"><b>W</b>'+tr('waze')+'</a>':'')+'</div></div>'+
 '</div></section>'+
 (coords?'<section class="detailSection"><div class="detailSectionTitle"><h2>'+tr('map')+'</h2><span>'+Number(r.latitude).toFixed(5)+', '+Number(r.longitude).toFixed(5)+'</span></div><div class="mapFrame"><iframe src="'+mapEmbed(r.latitude,r.longitude)+'" loading="lazy" referrerpolicy="no-referrer"></iframe></div></section>':'')+
 gallery+
 '<section class="detailSection businessInfoSection"><div class="detailSectionTitle"><h2>'+tr('info')+'</h2></div><div class="infoTable">'+(r.phone?'<div><span>'+tr('phone')+'</span><a href="tel:'+esc(r.phone)+'">'+esc(r.phone)+'</a></div>':'')+(website?'<div><span>'+tr('website')+'</span><a href="'+esc(website)+'" target="_blank" rel="noopener">'+esc(website)+'</a></div>':'')+(address?'<div><span>'+tr('address')+'</span><strong>'+esc(address)+'</strong></div>':'')+(coords?'<div><span>'+tr('coordinates')+'</span><strong>'+Number(r.latitude).toFixed(6)+', '+Number(r.longitude).toFixed(6)+'</strong></div>':'')+'</div>'+sources+'</section>'+
 '</div></main>'+footer()
}

function goSearch(e){e.preventDefault();location.href='search.html?q='+encodeURIComponent(document.getElementById('q').value)+'&city='+encodeURIComponent(document.getElementById('city').value);return false}
function filterSearch(e){e.preventDefault();location.href='search.html?q='+encodeURIComponent(document.getElementById('fq').value)+'&city='+encodeURIComponent(document.getElementById('fcity').value)+'&category='+encodeURIComponent(document.getElementById('fcategory').value);return false}

async function renderPage(){
 const root=document.getElementById('app');
 document.documentElement.lang=lang;document.documentElement.dir=lang==='he'?'rtl':'ltr';
 root.innerHTML=loading();
 try{const p=document.body.dataset.page;root.innerHTML=await(p==='search'?searchPage():(p==='place'||p==='restaurant')?restaurantPage():p==='city'?cityPage():home())}
 catch(e){console.error(e);root.innerHTML=nav()+'<main class="catalogPage"><div class="shell"><div class="emptyState"><strong>'+tr('notFound')+'</strong></div></div></main>'+footer()}
 document.querySelectorAll('.lang').forEach(b=>{b.classList.toggle('active',b.dataset.lang===lang);b.onclick=()=>setLang(b.dataset.lang)})
}
document.addEventListener('DOMContentLoaded',renderPage);