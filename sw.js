const CACHE_NAME = 'drawpath-studio-v11';

const APP_ASSETS = [
  './',
  './index.html',
  './styles/main.css',
  './manifest.webmanifest',
  './assets/icon.svg',
  './assets/plates/figure/fig1-standing-balance.webp',
  './assets/plates/figure/fig1-dynamic-action.webp',
  './assets/plates/figure/fig2-proportions-front.webp',
  './assets/plates/figure/fig2-proportions-side.webp',
  './assets/plates/figure/fig3-torso-3q-eggbox.webp',
  './assets/plates/figure/fig3-torso-contrapposto.webp',
  './assets/plates/figure/fig4-arm-cylinders.webp',
  './assets/plates/figure/fig4-leg-s-rhythm.webp',
  './assets/plates/figure/fig5-hand-open-grouped.webp',
  './assets/plates/figure/fig5-hand-fist-box.webp',
  './assets/plates/figure/fig6-foot-medial-side.webp',
  './assets/plates/figure/fig7-muscles-front.webp',
  './assets/plates/figure/fig7-muscles-back.webp',
  './assets/plates/figure/fig8-body-male-athletic.webp',
  './assets/plates/figure/fig8-body-female-hourglass.webp',
  './assets/plates/figure/fig8-body-youth-slender.webp',
  './js/app.js',
  './js/diagram-renderer.js',
  './js/pose-3d-helper.js',
  './js/curriculum-data.js',
  './js/generators/math-3d.js',
  './js/generators/core-generators.js',
  './js/generators/figure-generators.js',
  './js/curriculum/asset-manifest.js',
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
      .then((cache) => cache.addAll(APP_ASSETS.map((url) => new Request(url, { cache: 'reload' }))))
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
