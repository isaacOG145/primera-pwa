const CACHE_VERSION = 'v3'

self.addEventListener(
    'install',
    (event) => {
        console.log('SW ha sido instalado');
        event.waitUntil(
            caches.open(CACHE_VERSION)
            .then((cache)=>{
                return cache.addAll(
                    [
                        '/',
                        '/index.html',
                        '/style.css',
                        '/app.js'
                    ]
                );
            })
        );
    }
);

self.addEventListener(
    'activate',
    (event) => {
        console.log('SW ha sido activado');
        event.waitUntil(
            caches.keys().then((keys) =>{
                return Promise.all(
                    keys.map((key) =>{
                        if(key !== CACHE_VERSION){
                            return caches.delete(key);
                        }
                    })
                )
            })
        );
    }
);

self.addEventListener(
    'fetch',
    (event) => {
        console.log('SW ha interceptado la peticion');
        event.respondWith(
            caches.match(event.request)
                .then((response) =>{
                    return response || fetch(event.request);
                })
        );
    }
);