const CACHE = 'crypto-scanner-static-v6-public-preview';
const FILES = ['/', '/index.html', '/styles.css', '/app.js', '/extras.js', '/extras.css', '/v04.css', '/v05.css', '/v05.js', '/v06.css', '/v06.js', '/fx-engine.js', '/portfolio-engine.js', '/portfolio.js', '/manifest.webmanifest', '/preview-banner.js', '/preview-banner.css', '/assets/icon-192.png', '/assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const req=e.request, url=new URL(req.url);
 if(req.method!=='GET'||url.pathname.startsWith('/api/')||url.origin!==self.location.origin)return;
 e.respondWith(fetch(req).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return resp;}).catch(()=>caches.match(req)));
});
