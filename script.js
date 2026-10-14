"use strict";

/* ==========================================================
   Blue Lotus Kitchen: script
   Restaurant ki details, menu aur photos yahin se badlo.
   ========================================================== */

/* ---------- 1. Restaurant details (demo values, asli se badlo) ---------- */
const CONFIG = {
  address: "Shop No. XX, Demo Address, Ramesh Nagar, New Delhi",
  timing: "Roz, dopahar 12 baje se raat 11:30 baje tak",
  phoneDisplay: "+91 9878XXXXXX",
  // Client ka asli number yahan daalo: country code ke saath, bina + ya space ke,
  // jaise "919999912345". Khaali rahne par Call button band rehta hai aur
  // WhatsApp button par contact chunne ka option khulta hai.
  phoneDigits: "",
  mapsQuery: "Ramesh Nagar, Delhi"
};

/* WhatsApp link: number ho to seedha us par, warna contact chunne wala share screen */
function waUrl(text) {
  return "https://wa.me/" + CONFIG.phoneDigits + "?text=" + encodeURIComponent(text);
}

/* ---------- 2. Photos (Unsplash, free to use) ---------- */
const PHOTO_BASE = "https://images.unsplash.com/photo-";
const photo = (id, w) => PHOTO_BASE + id + "?auto=format&fit=crop&w=" + w + "&q=80";

/* ---------- 3. Menu ---------- */
const CATS = [
  { id: "south",    name: "South Indian" },
  { id: "starters", name: "Chinese Starters" },
  { id: "noodles",  name: "Noodles & Rice" },
  { id: "soups",    name: "Soup & Sides" },
  { id: "sweet",    name: "Peena & Meetha" }
];

/* veg: true/false, heat: 0 se 3 (teekhapan) */
const ITEMS = [
  /* South Indian */
  { id: "s1",  cat: "south", name: "Mysore Masala Dosa",       price: 180, veg: true,  heat: 2, tag: "Signature", desc: "Lal chutney ki parat, aloo masala aur sunehra crispy dosa." },
  { id: "s2",  cat: "south", name: "Ghee Podi Dosa",           price: 160, veg: true,  heat: 2, desc: "Gunpowder podi aur desi ghee mein sika dosa." },
  { id: "s3",  cat: "south", name: "Paper Roast Dosa",         price: 170, veg: true,  heat: 0, desc: "Do feet lamba, kaagaz jaisa patla aur khasta." },
  { id: "s4",  cat: "south", name: "Rava Onion Dosa",          price: 170, veg: true,  heat: 1, desc: "Suji ka jaalidaar dosa, upar kata pyaaz aur kali mirch." },
  { id: "s5",  cat: "south", name: "Idli Sambar (3 pc)",       price: 110, veg: true,  heat: 0, desc: "Bhaap wali naram idli, garam sambar aur do chutney." },
  { id: "s6",  cat: "south", name: "Ghee Podi Mini Idli",      price: 140, veg: true,  heat: 2, desc: "Chhoti idli, podi aur ghee mein lipti hui." },
  { id: "s7",  cat: "south", name: "Medu Vada (2 pc)",         price: 120, veg: true,  heat: 0, desc: "Bahar se kurkuri, andar se naram, sambar ke saath." },
  { id: "s8",  cat: "south", name: "Mix Veg Uttapam",          price: 170, veg: true,  heat: 1, desc: "Gajar, shimla mirch, pyaaz aur tamatar wala mota uttapam." },
  { id: "s9",  cat: "south", name: "Bisi Bele Bath",           price: 180, veg: true,  heat: 1, desc: "Karnataka ki masaledar dal-chawal, upar boondi aur ghee." },
  { id: "s10", cat: "south", name: "South Indian Thali",       price: 320, veg: true,  heat: 1, tag: "Signature", desc: "Rice, sambar, rasam, do sabzi, kootu, papad, curd aur meetha." },
  { id: "s11", cat: "south", name: "Chicken Chettinad & Paratha", price: 340, veg: false, heat: 3, desc: "Chettinad masale ka teekha chicken, Malabar paratha ke saath." },

  /* Chinese Starters */
  { id: "c1",  cat: "starters", name: "Veg Manchurian Dry",     price: 220, veg: true,  heat: 1, desc: "Kurkuri sabzi ke gole, garlic aur soy glaze mein." },
  { id: "c2",  cat: "starters", name: "Chilli Paneer Dry",      price: 260, veg: true,  heat: 2, desc: "Paneer, shimla mirch aur hari pyaaz, tez aanch par." },
  { id: "c3",  cat: "starters", name: "Honey Chilli Potato",    price: 220, veg: true,  heat: 2, desc: "Kurkure aloo, shahad aur lal mirch ka glaze, upar til." },
  { id: "c4",  cat: "starters", name: "Veg Spring Rolls (4 pc)", price: 200, veg: true,  heat: 0, desc: "Patle kurkure roll, andar gobhi aur gajar, schezwan dip ke saath." },
  { id: "c5",  cat: "starters", name: "Steamed Veg Momos (6 pc)", price: 180, veg: true, heat: 1, tag: "Signature", desc: "Bhaap mein pake momos, laal teekhi chutney ke saath." },
  { id: "c6",  cat: "starters", name: "Paneer Pan-Fried Momos", price: 220, veg: true,  heat: 1, desc: "Tawe par sunehre sikay hue paneer momos." },
  { id: "c7",  cat: "starters", name: "Chicken Steamed Momos (6 pc)", price: 230, veg: false, heat: 1, desc: "Rasile chicken bhare naram momos." },
  { id: "c8",  cat: "starters", name: "Chilli Chicken Dry",     price: 300, veg: false, heat: 3, desc: "Kurkura chicken, hari mirch aur soy ka tadka." },

  /* Noodles & Rice */
  { id: "n1",  cat: "noodles", name: "Veg Hakka Noodles",       price: 210, veg: true,  heat: 0, desc: "Wok mein uchhale hue noodles, taaza sabziyon ke saath." },
  { id: "n2",  cat: "noodles", name: "Schezwan Noodles",        price: 230, veg: true,  heat: 3, desc: "Lal schezwan sauce wale tez teekhe noodles." },
  { id: "n3",  cat: "noodles", name: "Singapore Noodles",       price: 240, veg: true,  heat: 2, desc: "Patle vermicelli, curry powder aur sabziyan." },
  { id: "n4",  cat: "noodles", name: "Veg Fried Rice",          price: 210, veg: true,  heat: 0, desc: "Matar, gajar aur beans wala wok-fried rice." },
  { id: "n5",  cat: "noodles", name: "Burnt Garlic Fried Rice", price: 230, veg: true,  heat: 1, tag: "Signature", desc: "Bhuna lehsun, hari pyaaz aur soy ki khushboo." },
  { id: "n6",  cat: "noodles", name: "Chicken Hakka Noodles",   price: 270, veg: false, heat: 1, desc: "Chicken ke tukde aur anda, wok ki aanch par." },
  { id: "n7",  cat: "noodles", name: "Chicken Fried Rice",      price: 270, veg: false, heat: 1, desc: "Anda, chicken aur hari sabziyon wala fried rice." },

  /* Soup & Sides */
  { id: "p1",  cat: "soups", name: "Hot & Sour Soup",           price: 150, veg: true,  heat: 2, desc: "Khatta aur teekha, mushroom aur sabziyon ke saath." },
  { id: "p2",  cat: "soups", name: "Sweet Corn Soup",           price: 140, veg: true,  heat: 0, desc: "Makke ke dane, halka aur garam." },
  { id: "p3",  cat: "soups", name: "Manchow Soup",              price: 150, veg: true,  heat: 1, desc: "Gaadha soup, upar kurkure noodles." },
  { id: "p4",  cat: "soups", name: "Rasam",                     price: 90,  veg: true,  heat: 2, desc: "Imli, tamatar aur kali mirch ka garam shorba." },
  { id: "p5",  cat: "soups", name: "Lemon Rice",                price: 150, veg: true,  heat: 0, desc: "Nimbu, moongfali aur curry patta ka tadka." },
  { id: "p6",  cat: "soups", name: "Curd Rice",                 price: 140, veg: true,  heat: 0, desc: "Thanda dahi chawal, anaar aur rai ke tadke ke saath." },

  /* Peena & Meetha */
  { id: "d1",  cat: "sweet", name: "Filter Coffee",             price: 70,  veg: true,  heat: 0, tag: "Signature", desc: "Gaadhi decoction aur jhaagdaar dudh, steel tumbler mein." },
  { id: "d2",  cat: "sweet", name: "Blue Lagoon Mocktail",      price: 160, veg: true,  heat: 0, desc: "Neela curacao syrup, nimbu aur soda." },
  { id: "d3",  cat: "sweet", name: "Rose Falooda",              price: 190, veg: true,  heat: 0, desc: "Gulab sharbat, sevai, basil seeds aur kulfi." },
  { id: "d4",  cat: "sweet", name: "Mysore Pak",                price: 90,  veg: true,  heat: 0, desc: "Besan aur ghee ki muh mein ghulne wali mithai." },
  { id: "d5",  cat: "sweet", name: "Rava Kesari",               price: 110, veg: true,  heat: 0, desc: "Suji, ghee aur kesar ka garam halwa." },
  { id: "d6",  cat: "sweet", name: "Honey Noodles & Ice Cream", price: 220, veg: true,  heat: 0, desc: "Kurkure noodles par shahad aur vanilla ice cream." },
  { id: "d7",  cat: "sweet", name: "Payasam",                   price: 120, veg: true,  heat: 0, desc: "Doodh, chawal, kaju aur kishmish ki kheer." }
];

/* Signature cards: item id, photo id, label */
const SIGNATURE = [
  { id: "s1",  img: "1668236543090-82eba5ee5976", alt: "Crispy dosa aloo masala aur chutney ke saath", label: "South Indian" },
  { id: "c5",  img: "1632104667384-06f58cb7ad44", alt: "Steamed momos dipping sauce ke saath",         label: "Chinese" },
  { id: "n5",  img: "1603133872878-684f208fb84b", alt: "Plate mein wok-fried rice",                    label: "Chinese" },
  { id: "s10", img: "1742281257687-092746ad6021", alt: "South Indian thali",                           label: "South Indian" }
];

/* ==========================================================
   Neeche ka code normally badalne ki zaroorat nahi
   ========================================================== */
const byId = {};
ITEMS.forEach(function (i) { byId[i.id] = i; });
const plate = {};
let activeCat = "south";
let query = "";
let vegOnly = false;

const $ = function (id) { return document.getElementById(id); };
const rupee = function (n) { return "₹" + n; };
const qty = function (id) { return plate[id] || 0; };

/* ---------- config ko page par lagao ---------- */
function applyConfig() {
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    const k = el.getAttribute("data-cfg");
    if (CONFIG[k]) { el.textContent = CONFIG[k]; }
  });
  document.querySelectorAll('[data-link="tel"]').forEach(function (a) {
    if (CONFIG.phoneDigits) {
      a.href = "tel:+" + CONFIG.phoneDigits;
    } else {
      a.href = "#visit";
      a.title = "Demo number, asli number CONFIG mein daalo";
      a.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });
  document.querySelectorAll('[data-link="map"]').forEach(function (a) {
    a.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.mapsQuery);
  });
}

/* ---------- add / stepper control ---------- */
function ctl(id) {
  const q = qty(id);
  if (!q) {
    return '<button class="btn btn-pink btn-sm" type="button" data-add="' + id + '">Add +</button>';
  }
  return '<div class="stepper"><button type="button" data-dec="' + id + '" aria-label="Kam karo">−</button><b>' + q +
         '</b><button type="button" data-inc="' + id + '" aria-label="Badhao">+</button></div>';
}

function heatHtml(level) {
  if (!level) { return ""; }
  let s = '<span class="heat" title="Teekhapan ' + level + ' / 3" aria-label="Teekhapan ' + level + ' / 3">';
  for (let i = 1; i <= 3; i++) { s += '<i class="' + (i <= level ? "on" : "") + '"></i>'; }
  return s + "</span>";
}

/* ---------- signature cards ---------- */
function renderSignature() {
  $("sig-grid").innerHTML = SIGNATURE.map(function (s) {
    const it = byId[s.id];
    return '<article class="dish">' +
      '<div class="frame"><img src="' + photo(s.img, 800) + '" alt="' + s.alt + '" loading="lazy" onerror="this.remove()"></div>' +
      '<div class="dish-body">' +
        '<span class="chip ' + (s.label === "Chinese" ? "chip-pink" : "chip-blue") + '">' + s.label + '</span>' +
        '<h3>' + it.name + '</h3>' +
        '<p>' + it.desc + '</p>' +
        '<div class="dish-foot"><span class="price">' + rupee(it.price) + '</span><span data-ctl="' + it.id + '">' + ctl(it.id) + '</span></div>' +
      '</div></article>';
  }).join("");
}

/* ---------- tabs + menu ---------- */
function renderTabs() {
  $("tabs").innerHTML = CATS.map(function (c) {
    return '<button class="tab" role="tab" type="button" data-cat="' + c.id + '" aria-selected="' + (!query && c.id === activeCat) + '">' + c.name + '</button>';
  }).join("");
}

function renderMenu() {
  const list = ITEMS.filter(function (i) {
    if (vegOnly && !i.veg) { return false; }
    if (query) { return (i.name + " " + i.desc).toLowerCase().indexOf(query) > -1; }
    return i.cat === activeCat;
  });
  const grid = $("menu-grid");
  if (!list.length) {
    grid.innerHTML = '<div class="empty">Koi item nahi mila. Doosra naam try karo, jaise dosa ya momos.</div>';
    return;
  }
  grid.innerHTML = list.map(function (i) {
    return '<article class="row">' +
      '<div class="row-main">' +
        '<div class="row-name"><span class="vd ' + (i.veg ? "v" : "nv") + '" title="' + (i.veg ? "Veg" : "Non-veg") + '"></span>' +
          i.name + (i.tag ? ' <span class="tag">' + i.tag + '</span>' : "") + heatHtml(i.heat) + '</div>' +
        '<p class="row-desc">' + i.desc + '</p>' +
      '</div>' +
      '<div class="row-side"><span class="price">' + rupee(i.price) + '</span><span data-ctl="' + i.id + '">' + ctl(i.id) + '</span></div>' +
    '</article>';
  }).join("");
}

$("tabs").addEventListener("click", function (e) {
  const b = e.target.closest("[data-cat]");
  if (!b) { return; }
  activeCat = b.getAttribute("data-cat");
  query = "";
  $("menu-search").value = "";
  renderTabs(); renderMenu();
});
$("menu-search").addEventListener("input", function (e) {
  query = e.target.value.trim().toLowerCase();
  renderTabs(); renderMenu();
});
$("veg-only").addEventListener("change", function (e) {
  vegOnly = e.target.checked;
  renderMenu();
});
document.querySelectorAll("[data-open-cat]").forEach(function (a) {
  a.addEventListener("click", function () {
    activeCat = a.getAttribute("data-open-cat");
    query = ""; $("menu-search").value = "";
    renderTabs(); renderMenu();
  });
});

/* ---------- plate ---------- */
function totals() {
  let n = 0, t = 0;
  Object.keys(plate).forEach(function (id) { n += plate[id]; t += plate[id] * byId[id].price; });
  return { n: n, t: t };
}

function orderText() {
  const t = totals();
  const lines = Object.keys(plate).map(function (id) {
    const it = byId[id];
    return plate[id] + " x " + it.name + " = " + rupee(plate[id] * it.price);
  });
  return "Blue Lotus Kitchen order\n" + lines.join("\n") + "\nTotal: " + rupee(t.t);
}

function refreshCtl(id) {
  const active = document.activeElement;
  const holder = active && active.closest ? active.closest("[data-ctl]") : null;
  let kind = null;
  if (holder && holder.getAttribute("data-ctl") === id) {
    kind = active.hasAttribute("data-dec") ? "dec" : active.hasAttribute("data-inc") ? "inc" : "add";
  }
  document.querySelectorAll('[data-ctl="' + id + '"]').forEach(function (el) { el.innerHTML = ctl(id); });
  if (kind) {
    const sel = qty(id)
      ? '[data-ctl="' + id + '"] ' + (kind === "dec" ? "[data-dec]" : "[data-inc]")
      : '[data-ctl="' + id + '"] [data-add]';
    const n = document.querySelector(sel);
    if (n) { n.focus(); }
  }
}

function renderSheet() {
  const ids = Object.keys(plate);
  const wrap = $("lines");
  if (!ids.length) {
    wrap.innerHTML = '<p class="empty">Plate khaali hai. Menu se kuch add karo.</p>';
  } else {
    wrap.innerHTML = ids.map(function (id) {
      const it = byId[id];
      return '<div class="line-item"><div class="nm">' + it.name + '<small>' + rupee(it.price) + ' x ' + plate[id] + ' = ' + rupee(it.price * plate[id]) + '</small></div>' +
        '<div class="stepper"><button type="button" data-dec="' + id + '" aria-label="Kam karo">−</button><b>' + plate[id] +
        '</b><button type="button" data-inc="' + id + '" aria-label="Badhao">+</button></div></div>';
    }).join("");
  }
  $("sheet-total").textContent = rupee(totals().t);
  const text = ids.length ? orderText() : "";
  $("order-text").value = text;
  $("wa-order").href = waUrl(text);
}

function refreshBar() {
  const t = totals();
  $("bar").hidden = t.n === 0;
  $("bar-count").textContent = t.n + (t.n === 1 ? " item" : " items");
  $("bar-total").textContent = rupee(t.t);
  if (!$("overlay").hidden) {
    renderSheet();
    if (t.n === 0) { closeSheet(); }
  }
}

function change(id, d) {
  const q = qty(id) + d;
  if (q <= 0) { delete plate[id]; } else { plate[id] = q; }
  refreshCtl(id);
  refreshBar();
}

document.addEventListener("click", function (e) {
  const add = e.target.closest("[data-add]");
  if (add) { change(add.getAttribute("data-add"), 1); return; }
  const inc = e.target.closest("[data-inc]");
  if (inc) { change(inc.getAttribute("data-inc"), 1); return; }
  const dec = e.target.closest("[data-dec]");
  if (dec) { change(dec.getAttribute("data-dec"), -1); }
});

function openSheet() {
  renderSheet();
  $("overlay").hidden = false;
  document.body.style.overflow = "hidden";
  $("close-plate").focus();
}
function closeSheet() {
  $("overlay").hidden = true;
  document.body.style.overflow = "";
  const opener = $("open-plate");
  if (opener && !$("bar").hidden) { opener.focus(); }
}
$("open-plate").addEventListener("click", openSheet);
$("close-plate").addEventListener("click", closeSheet);
$("overlay").addEventListener("click", function (e) { if (e.target.id === "overlay") { closeSheet(); } });
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !$("overlay").hidden) { closeSheet(); }
});

$("copy-order").addEventListener("click", function () {
  if (!Object.keys(plate).length) { return; }
  const btn = this;
  const text = orderText();
  const original = btn.textContent;
  function done() { btn.textContent = "Copy ho gaya!"; setTimeout(function () { btn.textContent = original; }, 1800); }
  function fallback() {
    const ta = $("order-text");
    ta.hidden = false; ta.value = text; ta.focus(); ta.select();
    btn.textContent = "Select ho gaya, copy karo";
    setTimeout(function () { btn.textContent = original; }, 2400);
  }
  try { navigator.clipboard.writeText(text).then(done, fallback); } catch (err) { fallback(); }
});

/* ---------- table booking (WhatsApp) ---------- */
(function () {
  const form = $("book-form");
  const dateInput = $("b-date");
  const today = new Date();
  const iso = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
  dateInput.min = iso;
  dateInput.value = iso;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = $("b-name").value.trim();
    const date = dateInput.value;
    const time = $("b-time").value;
    const guests = $("b-guests").value;
    const err = $("book-err");
    if (!name || !date || !time) { err.hidden = false; return; }
    err.hidden = true;
    const text = "Namaste, Blue Lotus Kitchen mein table chahiye.\nNaam: " + name +
                 "\nLog: " + guests + "\nTareekh: " + date + "\nSamay: " + time;
    window.open(waUrl(text), "_blank", "noopener");
  });
})();

/* ---------- start ---------- */
applyConfig();
renderSignature();
renderTabs();
renderMenu();