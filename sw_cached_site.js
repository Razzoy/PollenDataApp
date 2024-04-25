const cacheName = 'v2';


//Installer Service Worker
self.addEventListener('install', event =>{
    console.log('Service Worker has been installed');
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
        fetch(event.request).catch(() => caches.match(event.request))
    )

})