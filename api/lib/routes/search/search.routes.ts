//lib/routes/test_routes.ts
import { Request, Response, Router } from 'express';
import { SearchController } from "../../controllers/search.controller"
let searchRouter = Router();

const search_controller: SearchController = new SearchController();

searchRouter
   .get('/', (req: Request, res: Response) => {
      search_controller.test(req, res);
   })

   .get('/terms/:search/:page', (req: Request, res: Response) => {
      search_controller.searchByTerms(req, res);
   });

export default searchRouter
;