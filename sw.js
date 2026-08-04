const CACHE = 'mis-gestiones-v6';
const ASSETS = ['./app.html', './index.html', './proyectos.html', './manifest.json',
                './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(c =>
            Promise.all(ASSETS.map(a => c.add(a).catch(() => null)))
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    // Solo manejar requests del mismo origen (no Firebase ni CDNs externos)
    if (!e.request.url.startsWith(self.location.origin)) return;
    // RED PRIMERO: siempre intenta la versión más nueva; si no hay internet, usa la copia guardada.
    e.respondWith(
        fetch(e.request).then(res => {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
            return res;
        }).catch(() => caches.match(e.request))
    );
});
