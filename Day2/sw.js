const cacheName = "team-cache";
const assets = ["/", "./team.html", "./team.css", "./main.js"];

async function cacheFirst(req) {
  const responseFromCache = await caches.match(req);
  if (responseFromCache) return responseFromCache;
  try {
    const responseFromNetwork = await fetch(req);
    if (responseFromNetwork.status === 200) {
      const cache = await caches.open(cacheName);
      await cache.put(req, responseFromNetwork.clone());
    }
    return responseFromNetwork;
  } catch (err) {
    console.log(err);
  }
}
async function networkFirst(request) {
  try {
    const responseFromNetwork = await fetch(request);
    // console.log(responseFromNetwork);
    if (responseFromNetwork.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, responseFromNetwork.clone());

      return responseFromNetwork;
    }
  } catch (err) {
    console.error(err.message);
  }
  const responseFromCache = await caches.match(request);
  return responseFromCache;
}
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(assets);
    }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event");
  event.waitUntil(
    caches.keys().then((allCaches)=>{
        return Promise.all(
            allCaches.map((cachename)=>{
                if(cachename!==cacheName){
                    return caches.delete(cacheName);
                }
            })
        )
    })
  )
});

self.addEventListener("fetch", (event) => {
    // console.log(event.request);
  if (event.request.destination === "")
    event.respondWith(networkFirst(event.request));
  else event.respondWith(cacheFirst(event.request));
});
