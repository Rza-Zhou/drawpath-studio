const CACHE_NAME = 'drawpath-studio-v13';

const APP_ASSETS = [
  './',
  './index.html',
  './styles/main.css',
  './manifest.webmanifest',
  './assets/icon.svg',
  './assets/refs/core/core3-ceramic-vessel.webp',
  './assets/refs/core/core3-lantern-cylinders.webp',
  './assets/refs/core/core4-wood-stool.webp',
  './assets/refs/core/core4-hourglass-cylinder.webp',
  './assets/refs/core/core4-crystal-sphere.webp',
  './assets/refs/core/core5-1pt-library.webp',
  './assets/refs/core/core5-2pt-street.webp',
  './assets/refs/core/core5-wormseye-corner.webp',
  './assets/refs/core/core6-oak-chair.webp',
  './assets/refs/core/core6-drawer-desk.webp',
  './assets/refs/core/core6-armchair-blocks.webp',
  './assets/refs/core/core7-bargue-bust.webp',
  './assets/refs/core/core7-window-light.webp',
  './assets/refs/core/core7-heda-stilllife.webp',
  './assets/refs/core/core8-monet-magpie.webp',
  './assets/refs/core/core8-sorolla-seashore.webp',
  './assets/refs/core/core8-shisei-sunset.webp',
  './assets/refs/figure/fig1-contrapposto-clay.webp',
  './assets/refs/figure/fig1-dynamic-clay.webp',
  './assets/refs/figure/fig1-dynamic-line.webp',
  './assets/refs/figure/fig2-standing-front-clay.webp',
  './assets/refs/figure/fig2-standing-side-clay.webp',
  './assets/refs/figure/fig2-standing-front-line.webp',
  './assets/refs/figure/fig3-twist-diag-clay.webp',
  './assets/refs/figure/fig3-hip-tilt-clay.webp',
  './assets/refs/figure/fig3-hip-tilt-line.webp',
  './assets/refs/figure/fig4-foreshorten-above-clay.webp',
  './assets/refs/figure/fig4-squat-legs-clay.webp',
  './assets/refs/figure/fig4-squat-legs-line.webp',
  './assets/refs/figure/fig5-bargue-hand-1.webp',
  './assets/refs/figure/fig5-bargue-hand-2.webp',
  './assets/refs/figure/fig5-bargue-hand-3.webp',
  './assets/refs/figure/fig6-bargue-foot-1.webp',
  './assets/refs/figure/fig6-bargue-foot-2.webp',
  './assets/refs/figure/fig6-bargue-foot-3.webp',
  './assets/refs/figure/fig7-ecorche-front.webp',
  './assets/refs/figure/fig7-ecorche-back.webp',
  './assets/refs/figure/fig7-ecorche-side.webp',
  './assets/refs/figure/fig8-silhouette-male.webp',
  './assets/refs/figure/fig8-silhouette-female-clay.webp',
  './assets/refs/figure/fig8-silhouette-female-line.webp',
  './js/app.js',
  './js/icons.js',
  './js/diagram-renderer.js',
  './js/pose-3d-helper.js',
  './js/curriculum-data.js',
  './js/generators/math-3d.js',
  './js/generators/core-generators.js',
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
