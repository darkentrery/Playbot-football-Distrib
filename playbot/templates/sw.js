console.log('Hello from sw.js');
const CACHE = 'cache-update-and-refresh-v3';

// const assets = [
//     // './index.html',
//     './css/main.705bb933.css',
//     './js/main.23a148f1.js',
//     './logo192.png',
//     './favicon.ico',
//     './media/',
// ];
const assets = [];
self.performance.getEntriesByType('resource')
  // only consider the blocking ones
  .filter(({name}) =>
      name.match(/[.]js$/) || name.match(/[.]css$/) || name.match(/[.]png$/))
  // log their names
  .forEach(({name}) => assets.push(name))



console.log(self)
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
    console.log(assets)
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
            .map(key => caches.delete(key))
          );
        })
      );
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');

    if (event.request.url.match(/[.]js$/) || event.request.url.match(/[.]css$/) || event.request.url.match(/[.]png$/)) {
        console.log(event.request.url)
        event.respondWith(fromCache(event.request));
        event.waitUntil(
            update(event.request)
                // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
                .then(refresh)
        );
    }
});

const fromCache = (request) => {
    return caches.open(CACHE).then((cache) => {
        console.log(cache)
        console.log(request)
            cache.match(request).then((matching) =>
                matching || Promise.reject('no-match')
            )
        }
    );
}

const update = (request) => {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response.clone()).then(() => response)
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
            console.log(JSON.stringify(message))
            client.postMessage(JSON.stringify(message));
        });
    });
}