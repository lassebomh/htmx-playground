
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    // console.log('Activated service worker');
});

function urlIsMockServer(url) {
    if (!(url instanceof URL)) {
        url = new URL(url);
    }
    return url.pathname == '/_init.html'
}

self.addEventListener('fetch', (event) => {
    
    const id = event.clientId + Math.floor(Math.random() * 100000000);
    const messageChannel = new MessageChannel();

    const requestUrl = new URL(event.request.url);

    if (requestUrl.origin != self.location.origin) {
        return;
    }

    event.respondWith(new Promise(async (resolve, reject) => {

        let client;
        let server;

        const allClients = await clients.matchAll({includeUncontrolled: true});

        for (const c of allClients) {
            if (urlIsMockServer(c.url)) {
                server = c;
                if (client != null) break
            }
            if (c.id == event.clientId) {
                client = c
                if (server != null) break
            }
        }

        if (!client && urlIsMockServer(requestUrl)) // Pass requests from starting mock servers
        {
            resolve(fetch(event.request))
            return
        }

        // console.log('client', client && client.id);
        // console.log('server', server && client.id);

        messageChannel.port1.onmessage = (responseEvent) => {

            const responseId = responseEvent.data.id;
            const response = responseEvent.data.response;
            
            if (responseId !== id) return;

            const newResponse = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });

            resolve(newResponse);
        };

        const serializedRequest = {
            id: id,
            self: (client != null && urlIsMockServer(client.url)),
            request: {
                url: event.request.url,
                method: event.request.method,
                headers: Object.fromEntries(event.request.headers.entries()),
            }
        };
        
        server.postMessage(serializedRequest, [messageChannel.port2]);
    }));
});