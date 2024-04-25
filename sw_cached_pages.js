const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    '/assets/css/main.css',
    '/assets/js/page.js'
]

//Installer Service Worker
self.addEventListener('install', event =>{
    console.log('Service Worker has been installed');

    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching filer');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
})

//Aktiver Service Worker
self.addEventListener('activate', event =>{
    console.log('Service Worker has been activated', event);
    //Fjern uønsket caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: Rydder gammel cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
})

//Fetch Service Worker
self.addEventListener('fetch', event =>{
    console.log('Service Worker: Fetching');
    event.respondWith(
        fetch(event.request)
        .then(res => {
            //Lav en kopi af res
            const resClone = res.clone();
            //Åben cache
            caches
            .open(cahceName)
            .then(cache => {
                //Tilføj res til cache
                cache.put(event.request, resClone);
            });
            return res;
        }).catch(err => caches.match(event.request).then(res => res))
    )

})