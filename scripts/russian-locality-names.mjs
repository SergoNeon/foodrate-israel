const MAP = {
  "א":"а","ב":"б","ג":"г","ד":"д","ה":"х","ו":"в","ז":"з","ח":"х","ט":"т","י":"й",
  "כ":"к","ך":"к","ל":"л","מ":"м","ם":"м","נ":"н","ן":"н","ס":"с","ע":"а","פ":"п","ף":"ф",
  "צ":"ц","ץ":"ц","ק":"к","ר":"р","ש":"ш","ת":"т"
};
const MAJOR = new Map(Object.entries({
  "תל אביב":"Тель-Авив",
  "ירושלים":"Иерусалим",
  "חיפה":"Хайфа",
  "באר שבע":"Беэр-Шева",
  "אשדוד":"Ашдод",
  "אשקלון":"Ашкелон",
  "נתניה":"Нетания",
  "נהריה":"Нагария",
  "עכו":"Акко",
  "טבריה":"Тверия",
  "נצרת":"Назарет",
  "אילת":"Эйлат",
  "הרצליה":"Герцлия",
  "רמת גן":"Рамат-Ган",
  "פתח תקווה":"Петах-Тиква",
  "ראשון לציון":"Ришон-ле-Цион",
  "רחובות":"Реховот",
  "חולון":"Холон",
  "בת ים":"Бат-Ям",
  "כפר סבא":"Кфар-Саба",
  "רעננה":"Раанана",
  "מודיעין-מכבים-רעות":"Модиин-Маккабим-Реут"
}));

export function russianLocalityName(he,en=""){
  const clean=(he||"").trim();
  if(MAJOR.has(clean)) return MAJOR.get(clean);
  if(en) return en
    .replace(/sh/gi,"ш").replace(/ch/gi,"ч").replace(/tz|ts/gi,"ц")
    .replace(/ya/gi,"я").replace(/yo/gi,"ё").replace(/yu/gi,"ю")
    .replace(/kh/gi,"х").replace(/th/gi,"т").replace(/ph/gi,"ф")
    .replace(/a/gi,"а").replace(/b/gi,"б").replace(/c/gi,"к").replace(/d/gi,"д")
    .replace(/e/gi,"е").replace(/f/gi,"ф").replace(/g/gi,"г").replace(/h/gi,"х")
    .replace(/i/gi,"и").replace(/j/gi,"дж").replace(/k/gi,"к").replace(/l/gi,"л")
    .replace(/m/gi,"м").replace(/n/gi,"н").replace(/o/gi,"о").replace(/p/gi,"п")
    .replace(/q/gi,"к").replace(/r/gi,"р").replace(/s/gi,"с").replace(/t/gi,"т")
    .replace(/u/gi,"у").replace(/v/gi,"в").replace(/w/gi,"в").replace(/x/gi,"кс")
    .replace(/y/gi,"и").replace(/z/gi,"з")
    .replace(/^./,x=>x.toUpperCase());
  return [...clean].map(ch=>MAP[ch]??ch).join("").replace(/\s+/g," ").trim();
}
