import { IProduct } from '../types';

interface Props {
    product: IProduct;
}

import Image from 'next/image';

import { urlFor } from '../lib/client';
import Link from 'next/link';

const Product = ({ product: { image, name, slug, price } }: Props) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`} passHref>
                <div className="cursor-pointer scale-100 hover:scale-110 transition-all">
                    <Image
                        src={String(urlFor(image && image[0]))}
                        alt={name}
                        width={250}
                        height={250}
                        className="bg-gray-100 rounded-md"
                        quality={100}
                    />
                    <div className="flex flex-row justify-between items-center">
                        <p className="font-medium font-title">{name}</p>
                        <p className="font-bold font-title">{`$${price}`}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Product;
