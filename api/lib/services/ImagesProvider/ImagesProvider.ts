// Services providers
import  fs = require('fs');
import axios from 'axios';
import { Image } from "./Image";

interface ImageModel {
    title: string;
    provider: object
    src: object
    infos?: object
    
}

export class ImagesProvider {

    constructor(){
        // Init image providers
    }
    
    // Extract images from test/sample data
    public ExtractImagesFromSample({ providers  }): Promise<any>{

        const ExtractedImages = [];
        return new Promise(function(resolve, reject) {
            providers.forEach(provider => {

                let rawdata:any = fs.readFileSync(`/Users/simonbedard/perso/photopack/api/dist/storage/json/${provider}/get.json`);
                const JsonData = JSON.parse(rawdata);

                switch (provider) {
                    case 'unsplash':
                        JsonData.results.forEach(media => {
                            ExtractedImages.push(new Image('unsplash',media).get());
                        });
                        break;
                    case 'pexel':
                        JsonData.photos.forEach(media => {
                            ExtractedImages.push(new Image('pexel',media).get());
                        });
                        break;
                    case 'deposite':
                        JsonData.result.forEach(media => {
                            ExtractedImages.push(new Image('pexel',media).get());
                        });
                        break;
                    default:
                        break;
                }
            });

            resolve(ExtractedImages)
        });
    }

    public async ExtractImagesFromApis({ providers, query, page }): Promise<any>{

        return new Promise(function(resolve, reject) {

            const ExtractedImages = [];
            const ProviderPromises = [];
            query = encodeURI(query);
            console.log(providers);
            providers.forEach((provider) => {
                switch (provider) {
                    case 'unsplash':
                        // Unspash request
                        const Unsplash = axios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=${page}`, {
                            headers: {
                                'Accept-Version': 'v1',
                                'Authorization': 'Client-ID MM2rskSpeM3YrkOpyQtayFrLPlu61MVUATvYL16mL6M',
                            },
                        }).then(({data})=> {
                            data.results.forEach(media => {
                                ExtractedImages.push(new Image('unsplash',media).get());
                            });
                        }).catch((err: any) => {
                            throw new Error(err);
                        });
                        ProviderPromises.push(Unsplash);
                        break;
                    case 'pexel':
                        // Pexel request
                        const Pexel = axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=50&page=${page}`, {
                            headers: {
                                'Authorization': '563492ad6f917000010000012a632d8de9304a46a4d07ca199917933',
                            },
                        }).then(({data})=> {
                            data.photos.forEach(media => {
                                ExtractedImages.push(new Image('pexel',media).get());
                            });
                        }).catch((err: any) => {
                            throw new Error(err.message);
                        });
                        ProviderPromises.push(Pexel);
                        break;
                    case "pixabay":
                        // Pexel request
                        const pixabay = axios.get(`https://pixabay.com/api/?key=29153996-2f3ba8eed575698d2a9f325fd&q=${query}&image_type=photo&per_page=50&page=${page}`, {
                            headers: {},
                        }).then(({data})=> {
                            data.hits.forEach(media => {
                                ExtractedImages.push(new Image('pixabay',media).get());
                            });
                        }).catch((err: any) => {
                            throw new Error(err.message);
                        });
                        ProviderPromises.push(pixabay);
                        break;
                    case 'deposite':
                        // Deposite request
                        const DespositeOffset = (page == 1 ? 0 : ((page-1)*50));
                        const Url = `https://api.depositphotos.com?dp_command=search&dp_apikey=b2a251fa36b78892dd4f825077f482fb1b35d7a3&dp_search_query=${query}&dp_search_limit=50&dp_search_offset=${DespositeOffset}`
                        const Deposite = axios.get(Url, {} ).then(({data})=> {
                        data.result.forEach(media => {
                            ExtractedImages.push(new Image('deposite',media).get());
                            });
                        }).catch((err: any) => {
                            throw new Error(err);
                        }); 
                        ProviderPromises.push(Deposite)
                        break;
                    default:
                        break;
                }
                
            });
    
            // Return when all promise are done
            // Pexel, Deposite
            Promise.all(ProviderPromises).then(() => {
                resolve(ExtractedImages);
            }).catch((err: any) => {
                throw new Error(err);
            })
        });        
    }
}


