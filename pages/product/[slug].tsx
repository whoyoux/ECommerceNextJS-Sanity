import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';

import { useState } from 'react';

import { urlFor, client } from '../../lib/client';
import { IProduct, IImage } from '../../types';

import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiFillStar,
    AiOutlineStar
} from 'react-icons/ai';

import { Product } from '../../components';

interface Props {
    product: IProduct;
    products: IProduct[];
}

import { useStateContext } from '../../context/StateContext';

const ProductDetails: NextPage<Props> = ({ product, products }: Props) => {
    const { image, name, details, price } = product;

    const [index, setIndex] = useState<number>(0);

    const { incQty, decQty, qty, onAdd } = useStateContext();

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-10 m-5 md:m-10 mt-15 text-gray-500">
                <div>
                    <div className="rounded-xl bg-[#ebebeb] aspect-square min-w-[250px] min-h-[300px] max-w-[400px] max-h-[400px] cursor-pointer transition-all hover:bg-red-500 relative">
                        <Image
                            src={String(urlFor(image && image[index]))}
                            alt="Headphones"
                            layout="fill"
                            quality={100}
                            placeholder="blur"
                            blurDataURL={String(urlFor(image && image[index]))}
                        />
                    </div>
                    <div className="flex gap-3 mt-5">
                        {image?.map((item: IImage, i: number) => (
                            <Image
                                src={String(urlFor(item))}
                                alt="Item photo"
                                key={i}
                                width={70}
                                height={70}
                                onMouseEnter={() => setIndex(i)}
                                className={`rounded  cursor-pointer ${
                                    i === index ? 'bg-red-500' : 'bg-gray-100'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="">
                    <h1 className="font-medium text-black font-title text-3xl">
                        {name}
                    </h1>
                    <div className="flex flex-row mt-3 gap-1 items-center">
                        <div className="flex flex-row text-red-500 gap-1 items-center">
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>

                        <p>(20)</p>
                    </div>
                    <h4 className="text-xl font-title font-medium text-black/70 mt-5">
                        Details:
                    </h4>
                    <p>{details}</p>
                    <p className="font-bold text-2xl mt-8 text-red-500">{`$${price}`}</p>
                    <div className="flex items-center gap-5 mt-3 ">
                        <h3>Quantity: </h3>
                        <div className="flex items-stretch border border-solid border-gray p-[6px] select-none">
                            <span
                                className="qty_base border-r border-solid border-gray cursor-pointer"
                                onClick={decQty}
                            >
                                <div className="h-full w-full grid place-items-center">
                                    <AiOutlineMinus />
                                </div>
                            </span>
                            <span className="qty_base text-[20px] border-r border-solid border-gray">
                                <div className="h-full w-full grid place-items-center">
                                    {qty}
                                </div>
                            </span>
                            <span
                                className="qty_base cursor-pointer"
                                onClick={incQty}
                            >
                                <div className="h-full w-full grid place-items-center">
                                    <AiOutlinePlus />
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-7">
                        <button
                            type="button"
                            className="w-full md:w-[200px] py-3 px-6 mt-10 text-xl font-title font-medium bg-white border border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                            onClick={() => onAdd && onAdd(product, qty)}
                        >
                            Add to cart
                        </button>

                        <button
                            type="button"
                            className="w-full md:w-[200px] py-3 px-6 md:mt-10 text-xl font-title font-medium hover:bg-white border border-red-500 hover:text-red-500 transition-all bg-red-500 text-white"
                            onClick={() => {}}
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-[120px]">
                <h2 className="text-center m-[50px] text-red-500 font-title font-medium text-3xl">
                    You may also like
                </h2>
                <div className="relative h-[400px] w-full overflow-x-hidden">
                    <div className="flex justify-start gap-4 mt-5 absolute whitespace-nowrap will-change-transform animate-[marquee_15s_linear_infinite] w-[180%] hover:pause">
                        {products.map((item: IProduct) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product: any) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context?.params?.slug;

    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const product: IProduct = await client.fetch(query);
    const products: IProduct[] = await client.fetch(productsQuery);

    return {
        props: {
            product,
            products
        }
    };
};

export default ProductDetails;
