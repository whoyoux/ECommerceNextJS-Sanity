export interface IProduct {
    _createdAd: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    details: string;
    image: IImage[];
    price: number;
    slug: Slug;
    name: string;
}

export interface IProductInCart extends IProduct {
    quantity: number;
}

export interface IImage {
    _key: string;
    _type: string;
    asset: {
        _ref: string;
        _type: string;
    };
}

export interface IBanner {
    _createdAd: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    buttonText: string;
    image: IImage[];
    product: string;
    desc: string;
    smallText: string;
    midText: string;
    largeText1: string;
    largeText2: string;
    discount: string;
    saleTime: string;
}

interface Slug {
    current: string;
    _type: string;
}
