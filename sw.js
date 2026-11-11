// Bump when the precache list changes so old caches get purged on activate.
const CACHE_NAME = 'butterchurn-v3';
// Vendored scripts have their version in the file name. Never update one in place: the first
// launch after a deploy would run the new page against the old cached script.
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './vendor/butterchurn-2.6.7.min.js',
  './vendor/butterchurnPresets-2.4.7.min.js',
  './vendor/jetbrains-mono-latin-400-normal.woff2',
  './vendor/jetbrains-mono-latin-700-normal.woff2'
];
// How long a page load waits for the network before falling back to the cached copy
const NAVIGATION_TIMEOUT_MS = 3000;

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

function cachedPage(request) {
  return caches.match(request).then((cached) => cached || caches.match('./index.html'));
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
    // Pages: network first so new deploys reach users. Fall back to the cached copy when
    // offline or when the connection stalls; the late response still refreshes the cache.
    const timeout = new Promise((resolve) => setTimeout(resolve, NAVIGATION_TIMEOUT_MS));
    event.respondWith(
      Promise.race([network.catch(() => undefined), timeout])
        .then((response) => response || cachedPage(request))
        // Nothing cached either: the network is the only option, however slow
        .then((response) => response || network)
    );
    return;
  }

  // Other local assets: serve from cache, refresh it in the background
  event.respondWith(
    caches.match(request).then((cached) => cached || network)
  );
});
