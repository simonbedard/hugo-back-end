const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

// Caching request middleware
export const Cache = (duration: number) => {
    return (req, res, next) => {
        let key: String = '__express__' + req.originalUrl || req.url;

         if(myCache.has(key)){
            let cachedBody = myCache.get(key); // Get
            if (cachedBody) {
               res.set('X_Hugo_Cache', 'hit');
               res.send(cachedBody)
               return
             } 
         }else {
            res.sendResponse = res.send
            res.send = (body) => {
               res.set('X_Hugo_Cache', 'miss');
               myCache.set( key, body, duration * 1000 );
               res.sendResponse(body)
            }     
            next()
         }
      }
}