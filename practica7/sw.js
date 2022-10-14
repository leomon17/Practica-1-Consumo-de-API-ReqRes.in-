
const cleanCache = (cacheName, maxSize)=>{
    caches.open(cacheName).then((cache)=>{
        cache.keys().then((items) =>{
            console.log(items);
        })
    })
}

self.addEventListener('install',(event)=>{
    console.log("SW: Instalado");
});

self.addEventListener('activate', (event)=>{
    console.log("SW: Activado");
});

self.addEventListener('fetch', (event)=>{
   
});

  
self.addEventListener('install',(event) =>{
    console.log('SW: instalado');
    
    const respCache = caches.open('cache-v1').then((cache)=>{
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/js/app.js',
            '/images/imagen1.jpg',
            '/manifest.json',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js'
        ])
    });

    const respCacheInmutable = caches.open("INMUTABLE_CACHE_NAME").then((cache) =>{
        return cache.addAll(
            [
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
            ]
        )
    });

    event.waitUntil(Promise.all[respCache, respCacheInmutable]);
})


self.addEventListener('fetch', (event) =>{
    const resp = caches.match(event.request).then((resp) =>{
        if(resp){
            return resp;
        }
        return fetch(event.request).then((respWeb) =>{
            caches.open("DYNAMIC_CACHE_NAME").then((cacheDinamico) => {
                cacheDinamico.put(event.request, respWeb);
            })
            return respWeb.clone();
        });
    });
    event.respondWith(resp);
});