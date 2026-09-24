// Bump when the precache list changes so old caches get purged on activate.
const CACHE_NAME = 'butterchurn-v2';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './vendor/butterchurn.min.js',
  './vendor/butterchurnPresets.min.js',
  './vendor/jetbrains-mono-latin-400-normal.woff2',
  './vendor/jetbrains-mono-latin-700-normal.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Only cache complete, successful responses so an error page never replaces a good entry.
function putInCache(request, response) {
  if (!response || !response.ok || response.status !== 200) return Promise.resolve();
  const clone = response.clone();
  return caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, clone))
    .catch(() => {});
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  // Registered before respondWith consumes the body, so the clone in putInCache is safe
  const network = fetch(request);
  event.waitUntil(network.then((response) => putInCache(request, response)).catch(() => {}));

  if (request.mode === 'navigate') {
    // Pages: network first so new deploys reach users, cache when offline
    event.respondWith(
      network.catch(() =>
        caches.match(request).then((cached) => cached || caches.match('./index.html'))
      )
    );
    return;
  }

  // Other local assets: serve from cache, refresh it in the background
  event.respondWith(
    caches.match(request).then((cached) => cached || network)
  );
});
