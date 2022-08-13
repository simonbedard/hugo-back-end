
import { Request, Response } from 'express';
import { ImagesProvider } from '../services/ImagesProvider/ImagesProvider';
import { insufficientParameters, failureResponse } from "../modules/common/service"

export class SearchController {

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
            const ImgProvider = new ImagesProvider();
            
            //ImgProvider.ExtractImagesFromSample({ providers: Providers });
            ImgProvider.ExtractImagesFromApis({ providers: Providers, query: Words, page: Page }).then((data) => {
                // Response 
                res.status(200).json({
                    message: "Get request successfull",
                    data: data
                });
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