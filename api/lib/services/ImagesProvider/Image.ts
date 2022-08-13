// Image model interface
interface ImageModel {
    title: string;
    provider: object
    src: object
    infos?: object
    
}

export class Image {
    provider: string;
    data: any;

    constructor(provider, data){
        this.provider = provider;
        this.data = data;
    }

    public get(){

        let ImageObject: ImageModel;

        switch (this.provider) {
            case 'unsplash':
                ImageObject = {
                    title: this.data.id,
                    provider: {
                        name: "Unsplash",
                        url: "https://unsplash.com",
                    },
                    src: {
                        raw: this.data.urls.raw || null,
                        full: this.data.urls.full || null,
                        thumbnail: this.data.urls.small || null,
                        download: this.data.links.html || null,
                        alt: this.data.alt_description || null,
                        size: {
                            width: this.data.width || null,
                            height: this.data.height || null,
                        }
                    }
                }
                break;
            case 'pexel':
                ImageObject = {
                    title: this.data.id,
                    provider: {
                        name: "Pexel",
                        url: "https://www.pexels.com/",
                    },
                    src: {
                        raw: this.data.src.original || null,
                        full: this.data.src.large2x || null,
                        thumbnail: this.data.src.large || null,
                        download: this.data.url || null,
                        alt: this.data.alt || null,
                        size: {
                            width: this.data.width || null,
                            height: this.data.height || null,
                        }
                    }
                }
                break;
            case 'pixabay':
                ImageObject = {
                    title: this.data.id,
                    provider: {
                        name: "Pixabay",
                        url: "https://pixabay.com/",
                    },
                    src: {
                        raw: this.data.largeImageURL || null,
                        full: this.data.largeImageURL || null,
                        thumbnail: this.data.webformatURL || null,
                        download: this.data.pageURL || null,
                        alt: this.data.tags || null,
                        size: {
                            width: this.data.imageWidth || null,
                            height: this.data.imageHeight || null,
                        }
                    }
                }
                break;
            case 'deposite':
                ImageObject = {
                    title: this.data.id,
                    provider: {
                        name: "Deposite Photo",
                        url: "https://depositphotos.com",
                    },
                    src: {
                        raw: this.data.thumb_max || null,
                        full: this.data.huge_thumb || null,
                        thumbnail: this.data.huge_thumb || null,
                        download: this.data.itemurl || null,
                        alt: this.data.description || null,
                        size: {
                            width: this.data.width || null,
                            height: this.data.height || null,
                        }
                    }
                }
                break;
            default:
                break;
            }

            return ImageObject;
    }
}