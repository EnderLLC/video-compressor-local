const CACHE_NAME = "video-compressor-v1";
const FFMPEG_CACHE = "ffmpeg-cache-v1";

const FFMPEG_FILES = [
    "/ffmpeg/ffmpeg-core.js",
    "/ffmpeg/ffmpeg-core.wasm",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(FFMPEG_CACHE).then((cache) => cache.addAll(FFMPEG_FILES)),
            caches.open(CACHE_NAME).then((cache) => cache.add("/")),
        ])
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            // Clean up old caches if needed
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((name) => {
                        if (name !== CACHE_NAME && name !== FFMPEG_CACHE) {
                            return caches.delete(name);
                        }
                    })
                );
            }),
        ])
    );
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Cache FFmpeg files strictly
    if (url.pathname.startsWith("/ffmpeg/")) {
        event.respondWith(
            caches.open(FFMPEG_CACHE).then((cache) => {
                return cache.match(event.request).then((response) => {
                    return response || fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    // Network falling back to cache for others
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
