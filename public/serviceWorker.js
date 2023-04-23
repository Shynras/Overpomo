let CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.png',
    '/main.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
    }));
    self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response) {
            console.log("Found response in cache:", response);
            return response;
        }
        console.log("No response found in cache. About to fetch from network…");
        return fetch(event.request);
    }));
});