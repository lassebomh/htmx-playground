
self.addEventListener('install', event => {
    console.log("installing service worker");
});

self.addEventListener('activate', event => {
    console.log("activating service worker");
});

// Attempt the request and store and return successful responses. If it fails
// look into the cache.
const networkFirst = (event) => {
    
    const referrer = event.request.referrer
    // console.log(referrer);

    const requestOrigin = event.request.url && new URL(event.request.url).origin

    

    if (referrer == 'http://localhost:5173/sandbox.html') {
        console.log(event.request.url)
        event.respondWith((async () => {
            return new Response(`<h1>From sandbox</h1>`)
        })());
    }
};

self.addEventListener('fetch', networkFirst);