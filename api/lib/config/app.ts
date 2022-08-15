
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import helmet from "helmet";

import environment from "../environment";
import testRouter from "../routes/test.routes";
import searchRouter from "../routes/search/search.routes";
import commonRouter from "../routes/common.routes";

import { RequireJsonContent } from '../middlewares/common/commonMiddlewares';
import { ServicesProviders } from "../services/ServicesProviders";
import { Cache } from "../modules/cache/middleware";


class App {

   public app: express.Application;

   private router: any = express.Router(); // Set Router for app

   constructor() {
      this.app = express();
      this.config();
      this.setRoutes();
      // this.bootServices();
   }

   /**
    * Set application route
   */
   private setRoutes(){      
      

      this.app.use(environment.getDefaultApiPath(), this.router);

      // Global middlware to check if header is json
      // this.router.use(RequireJsonContent());
      this.router.use("/test", testRouter);
      

      this.router.use("/search", Cache(10), searchRouter);

      // This will catch all route if none of the above work       
      this.router.use("/", commonRouter);

   }

   private config(): express.Application {
      // this.app.use(helmet()); // Adding a protection layer to the ap
      this.app.use(bodyParser.json()); // support application/json type post data
      this.app.use(bodyParser.urlencoded({ extended: false })); //support application/x-www-form-urlencoded post data
      this.app.use(cors());

      return this.app;
   }

   /*
   private bootServices(){
      new ServicesProviders().boot();
   }*/

}
export default new App().app;