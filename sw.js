// Service Worker for offline support and PWA features
const CACHE_NAME = 'klimaticket-v2';
const APP_SHELL_FILES = [
    './',
    './index.html',
    './manifest.json',
    './sw.js',
    './css/styles.css',
    './partials/app.html',
    './js/config.js',
    './js/i18n.js',
    './js/ui.js',
    './js/data.js',
    './js/app.js',
    './js/partials.js',
    './js/features/stats.js',
    './js/features/heatmap.js',
    './js/features/achievements.js',
    './js/features/export.js'
];

// Install event - cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(APP_SHELL_FILES).catch(() => {
                // If caching fails, just continue
                return Promise.resolve();
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Only handle same-origin GET requests.
    if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
        return;
    }

    // Respect explicit no-store requests from the app.
    if (request.cache === 'no-store') {
        event.respondWith(fetch(request));
        return;
    }

    event.respondWith((async () => {
        try {
            const networkResponse = await fetch(request);

            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                const cache = await caches.open(CACHE_NAME);
                cache.put(request, networkResponse.clone());
            }

            return networkResponse;
        } catch (_err) {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }

            if (request.mode === 'navigate') {
                const offlineShell = await caches.match('./index.html');
                if (offlineShell) {
                    return offlineShell;
                }
            }

            throw _err;
        }
    })());
});
