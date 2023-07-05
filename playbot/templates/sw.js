console.log('Hello from sw.js');
const CACHE = 'cache-update-and-refresh-v10';

const assets = [];
self.performance.getEntriesByType('resource')
  .filter(({name}) =>
      (name.match(/[.]js$/) || name.match(/[.]css$/) || name.match(/[.]png$/)) && !name.includes('/admin/') && name.includes('/static/'))
  .forEach(({name}) => assets.push(name))

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

// self.addEventListener("activate", (event) => {
//   // Delete all caches that aren't named in CURRENT_CACHES.
//   // While there is only one cache in this example, the same logic
//   // will handle the case where there are multiple versioned caches.
//   const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!expectedCacheNamesSet.has(cacheName)) {
//             // If this cache name isn't present in the set of
//             // "expected" cache names, then delete it.
//             console.log("Deleting out of date cache:", cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       )
//     )
//   );
// });

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

self.addEventListener('push', function (event) {
    const eventInfo = event.data.text();
    const data = JSON.parse(eventInfo);
    const head = data.head || 'New Notification 🕺🕺';
    const body = data.body || 'This is default content. Your notification didn\'t have one 🙄🙄';
    event.waitUntil(
        self.registration.showNotification(head, {
            body: body,
            icon: 'https://i.imgur.com/MZM3K5w.png',
            data: data,
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log(event.notification.data)
    const target = event.notification.data.action_url || '/';
    event.notification.close();
    event.waitUntil(self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        for (let i = 0; i < clientList.length; i++) {
            let client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }
        return self.clients.openWindow(target);
    }));
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