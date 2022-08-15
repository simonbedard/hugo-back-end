
import { Request, Response } from 'express';
import { ImagesProvider } from '../modules/images/services';
import { insufficientParameters, failureResponse, successResponse } from "../modules/common/service"

export class SearchController {

    // Creating new Business service class
    private image_provider: ImagesProvider = new ImagesProvider({
        sample: false
    });

    public searchByTerms(req: Request, res: Response) {

        if(req.params.search && req.params.page){

            const Words = req.params.search;
            const Page = req.params.page || 1;
            const Query = req.query;

            // Define provider to use
            let Providers = ['unsplash',"pexel","pixabay","deposite" ];
            
            if(Query.provider){
                Providers = (<string>Query.provider).split(',')
            }
       
            
            //ImgProvider.ExtractImagesFromSample({ providers: Providers });
            this.image_provider.Extract({ providers: Providers, query: Words, page: Page }).then((data) => {
                successResponse("Get request successfull", data, res);
            }).catch((error)=>{
                failureResponse(error, [], res);
            });
            
        }else{
            insufficientParameters(res);
        }
    }

    public test(req: Request, res: Response){
        res.status(200).json({
            message: "Get request successfull",
        });
    }
}