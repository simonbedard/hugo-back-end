//lib/routes/test_routes.ts
import { Application, Request, Response, Router } from 'express';
let testRouter = Router();

testRouter
   .get('/', (req: Request, res: Response) => {
      console.log('test');
      res.status(200).json({
         message: "Get request successfull",
      });
   });
   /*
   // Send email test
   .get('/mail/send', (req: Request, res: Response) => {
      // Send test email notification
      Notifications.Mailer.sendFromTemplate("test").then((e) => {
         res.status(200).json({
            message: "Test mail send successfull",
         });
      }).catch(err => {
         console.log(err);
         res.status(400).json({
            message: err.message,
         });
      });
   })
   .post('/', (req: Request, res: Response) => {
      res.status(200).json({ message: "Post request successfull" });
   });*/

export default testRouter;