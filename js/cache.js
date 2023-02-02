//file for all the cache functionality
// caches.open()
// caches.keys()
// caches.delete()
// caches.matchAll()

// cache.put()
// cache.match()

const CACHE = {
  cache: null,
  cacheVersion: 1,
  cacheName: null, //this gets set in the init() method
  userName: 'chev0100', //replace this with your own username
  init() {
    CACHE.cacheName = `filecache-${CACHE.userName}-${CACHE.cacheVersion}`;
    console.log(CACHE.cacheName);
  },
  saveInCache(url,response) {
    // console.log(`Saving ${url} in Cache`);
    return caches.open(CACHE.cacheName).then((cache) => {
      // console.log(url,`response saved in ${CACHE.cacheName}`);
      CACHE.cache = cache;
      return CACHE.cache.put(url,response);
    });
  },
  deleteFromCache(filename) {
    // console.log(`Deleting ./data/${filename} from cache`);
    return caches.open(CACHE.cacheName).then((cache) => {
      return cache.delete(`./data/${filename}`);
    })
  },
  getFromCache(filename) {
    // retrieves file contents from cache file
    if(filename) {
      return caches.open(CACHE.cacheName).then((cache) => {
        return cache.match(filename)
            .then((res) => {
                //loop through response matches and get text content within files
                let txt = res.text();
                return txt;
            });
        });
    }

    // retrieves url names from cache
    return caches.open(CACHE.cacheName).then((cache) => {
      return cache.keys()
          .then((responses) => {
              //loop through response matches and display the file names
              return responses.map(response => response.url);
          });
      });
  }
};

export default CACHE;
