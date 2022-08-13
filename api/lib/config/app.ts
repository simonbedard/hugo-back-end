
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';

import environment from "../environment";
import testRouter from "../routes/test.routes";
import searchRouter from "../routes/search/search.routes";
import commonRouter from "../routes/common.routes";

import { RequireJsonContent } from '../middlewares/common/commonMiddlewares';
import { ServicesProviders } from "../services/ServicesProviders";
const NodeCache = require( "node-cache" );

class App {

   public app: express.Application;

   private router: any = express.Router(); // Set Router for app

   constructor() {
      this.app = express();
      this.config()
      this.setRoutes();


      //this.bootServices();
   }


   /**
    * Set application route
   */
   private setRoutes(){

      
      const myCache = new NodeCache();
      var cache = (duration) => {
         return (req, res, next) => {
           let key = '__express__' + req.originalUrl || req.url           
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
       

      this.app.use(environment.getDefaultApiPath(), this.router);

      // Global middlware to check if header is json
      // this.router.use(RequireJsonContent());
      this.router.use("/test", testRouter);
      
      
      this.router.use("/search", cache(10), searchRouter);

      // This will catch all route if none of the above work       
      this.router.use("/", commonRouter);
   }

   private config(): express.Application {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(cors());
      return this.app;
   }

   /*
   private bootServices(){
      new ServicesProviders().boot();
   }*/

}
export default new App().app;