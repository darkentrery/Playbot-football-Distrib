console.log('Hello from sw.js');
const CACHE = 'cache-update-and-refresh-v5';

const assets = [];
self.performance.getEntriesByType('resource')
  .filter(({name}) =>
      (name.match(/[.]js$/) || name.match(/[.]css$/) || name.match(/[.]png$/)) && !name.includes('/admin/') && name.includes('/static/'))
  .forEach(({name}) => assets.push(name))

// self.addEventListener('activate', (event) => {
//   let cacheKeeplist = ['images', 'static-resources', 'googleapis'];
//
//   event.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(keyList.map((key) => {
//           console.log(cacheKeeplist.indexOf(key))
//           return caches.delete(key);
//       }));
//     })
//   );
// });
//
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
//
// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
//
//   workbox.precaching.precacheAndRoute([
//     {
//       "url": "/",
//       "revision": "1"
//     }
//   ]);
//
//   workbox.routing.registerRoute(
//     /\.(?:js|css)$/,
//     workbox.strategies.staleWhileRevalidate({
//       cacheName: 'static-resources',
//     }),
//   );
//
//   workbox.routing.registerRoute(
//     /\.(?:png|gif|jpg|jpeg|svg)$/,
//     workbox.strategies.cacheFirst({
//       cacheName: 'images',
//       plugins: [
//         new workbox.expiration.Plugin({
//           maxEntries: 60,
//           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//         }),
//       ],
//     }),
//   );
//
//   workbox.routing.registerRoute(
//     new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
//     workbox.strategies.cacheFirst({
//       cacheName: 'googleapis',
//       plugins: [
//         new workbox.expiration.Plugin({
//           maxEntries: 30,
//         }),
//       ],
//     }),
//   );
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }

self.addEventListener('install', (event) => {
    console.log('Установлен');
    console.log(self.performance.getEntriesByType('resource'))
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll(assets))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
          return Promise.all(keys
            .filter(key => key !== CACHE)
            .map(key => {
                console.log(key)
                caches.delete(key)
            })
          );
        })
      );
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');
    let url = event.request.url;

    if ((url.match(/[.]js$/) || url.match(/[.]css$/) || url.match(/[.]png$/)) && !url.includes('/admin/') && url.includes('/static/')) {
        event.respondWith((async () => {
            const cachedResponse = await caches.match(event.request);
            if (cachedResponse) {
                return cachedResponse;
            }
            const response = await fetch(event.request);
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }
            const responseToCache = response.clone();
            const cache = await caches.open(CACHE);
            await cache.put(event.request, responseToCache);
            return response;
        })());
        event.waitUntil(
            update(event.request).then(refresh)
        );
    }
});

const update = (request) => {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response.clone()).then(() => {
                console.log(response)
                return response;
            })
        )
    );
}

const refresh = (response) => {
    return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            // Подробнее про ETag можно прочитать тут
            // https://en.wikipedia.org/wiki/HTTP_ETag
            const message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            };
            // Уведомляем клиент об обновлении данных.
            client.postMessage(JSON.stringify(message));
        });
    });
}