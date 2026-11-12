const CACHE = 'foco-estudo-v1';
const SHELL = ['./', 'index.html', 'firebase-config.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Abre do cache e atualiza em segundo plano. Dados do Firebase não passam por aqui.
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  const ok = e.request.method === 'GET' && (u.origin === location.origin || u.hostname === 'www.gstatic.com' || u.hostname === 'fonts.gstatic.com' || u.hostname === 'fonts.googleapis.com');
  if (!ok) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
