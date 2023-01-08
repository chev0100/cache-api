//file for all the cache functionality
// caches.open()
// caches.keys()
// caches.delete()
// caches.matchAll()

// cache.put()
// cache.match()

const CACHE = {
  cacheVersion: 1,
  cacheName: null, //this gets set in the init() method
  userName: 'abcd0001', //replace this with your own username
  init() {
    //
    CACHE.cacheName = `filecache-${CACHE.userName}-${CACHE.cacheVersion}`;
  },
};

export default CACHE;
