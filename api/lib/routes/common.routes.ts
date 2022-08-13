//lib/routes/test_routes.ts
import { Application, Request, Response, Router } from 'express';

let commonRouter = Router();

/**
 * This will catch all other routes
 */
commonRouter.all('*', function (req: Request, res: Response) {
   res.status(404).send({ error: true, message: 'Check your URL please! Wrong API Url' });
});

export default commonRouter;
