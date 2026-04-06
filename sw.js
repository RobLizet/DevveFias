// DevvE & FIAS Dashboard – Service Worker v2026
const CACHE = "devve-fias-v1";
const ASSETS = ["./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  const url = e.request.url;
  // Altijd live: crypto APIs, TradingView, fonts
  if (url.includes("coingecko.com") || url.includes("dexscreener.com") ||
      url.includes("geckoterminal.com") || url.includes("coincap.io") ||
      url.includes("tradingview.com") || url.includes("alternative.me") ||
      url.includes("googleapis.com") || url.includes("unpkg.com") ||
      url.includes("fonts.gstatic.com") || url.includes("telegram.org")) return;
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
