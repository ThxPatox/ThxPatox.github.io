var cacheName = "perri-v2";
var filesToCache = [
    "/",
    "/index.html",
    "/Registro.html",
    "/Galeria.html",
    "/js/app.js",
    "/js/carrusel.js",
    "/js/main.js",
    "/style/main.css",
    "/style/main1.css",
    "/style/main2.css",
    "/style/carrusel.css",
    "/style/menu.css",
    "/style/cel.css",
    "/style/celindex.css",
    "/style/celregi.css",
    "/img/img1.jpg",
    "/img/img2.jpg",
    "/img/img3.jpg",
    "/img/logo.png",
    "/img/perro1.jpg",
    "/img/perro11.jpg",
    "/img/perro111.jpg",
    "/img/perro1v.jpg",
    "/img/perro1small.jpg",
    "/img/perro11small.jpg",
    "/img/perro111small.jpg",
    "/img/perro1vsmall.jpg",
    "/img/perros.jpg",
    "/img/perrossmall",
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );