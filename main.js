// Service Worker desactivado: desregistra instalaciones previas
// (el SW anterior interceptaba body.mp4 / musica.mp3 y rompia audio/video,
//  ademas cacheaba conRange requests que Cache API no soporta).
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        registrations.forEach(function (registration) {
            registration.unregister();
        });
    });
}

if ('caches' in window) {
    caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
            if (cacheName.indexOf('cache-v') === 0) {
                caches.delete(cacheName);
            }
        });
    });
}
