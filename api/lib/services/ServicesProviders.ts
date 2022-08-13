import { ImagesProvider } from "./ImagesProvider/ImagesProvider";

// Services providers
export class ServicesProviders {

    public Providers: any;

    // Initiall class for the services provider
    public boot(){        
        // Init Image services providers
        const IMP = new ImagesProvider();
        this.Providers.push(IMP)
    }
}