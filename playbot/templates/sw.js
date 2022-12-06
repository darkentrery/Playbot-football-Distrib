console.log('Hello from sw.js');

const assets = [
    // './index.html',
    './css/main.705bb933.css',
    './js/main.23a148f1.js',
    './logo192.png',
    './favicon.ico',
    './media/',
];
console.log(self)
self.addEventListener('activate', (event) => {
  let cacheKeeplist = ['images', 'static-resources', 'googleapis'];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
          console.log(cacheKeeplist.indexOf(key))
          return caches.delete(key);
      }));
    })
  );
});
// self.addEventListener('install', (event) => {
//     console.log(event)
//   event.waitUntil(
//     caches.open('v2').then(async (cache) => {
//         console.log(cache)
//         try {
//             return await cache.addAll(assets);
//         } catch (e) {
//             for await (let i of assets) {
//                 try {
//                     let ok = await cache.add(i);
//                 } catch (err) {
//                     console.warn('sw: cache.add', i, err);
//                 }
//             }
//             return ok;
//         }
//     })
//   );
// });

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
    {
      "url": "/",
      "revision": "1"
    }
  ]);

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'static-resources',
    }),
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
      ],
    }),
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}