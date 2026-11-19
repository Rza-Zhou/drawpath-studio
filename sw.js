const CACHE_NAME = 'drawpath-studio-v9';

const APP_ASSETS = [
  './',
  './index.html',
  './styles/main.css',
  './manifest.webmanifest',
  './assets/icon.svg',
  './assets/diagrams/furry-kemono-muzzle.jpg',
  './assets/diagrams/furry-western-muzzle.jpg',
  './assets/diagrams/furry-kemono-ears-body.jpg',
  './assets/diagrams/furry-kemono-expressions.jpg',
  './assets/diagrams/furry-kemono-fur-tufts.jpg',
  './assets/diagrams/anime-head-loomis.jpg',
  './assets/diagrams/anime-face-hair.jpg',
  './assets/diagrams/anime-body-pose.jpg',
  './assets/templates/tpl-anime-cel-lineart.jpg',
  './js/app.js',
  './js/pose-3d-helper.js',
  './js/curriculum-data.js',
  './js/curriculum/svg-helpers.js',
  './js/curriculum/redblue-plates.js',
  './js/curriculum/core-track.js',
  './js/curriculum/figure-track.js',
  './js/curriculum/anime-furry-track.js',
  './js/curriculum/challenges-data.js',
  './js/pressure-canvas.js',
  './js/storage-db.js',
  './js/journal.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first with cache fallback so live edits stay fresh while offline mode works seamlessly.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      })
  );
});
