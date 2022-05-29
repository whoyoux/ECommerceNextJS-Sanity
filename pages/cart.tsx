import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineLeft,
    AiOutlineShopping
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { IProductInCart } from '../types';

const Cart: NextPage = () => {
    const {
        totalPrice,
        totalQuantities,
        cartItems,
        setShowCart,
        toggleCartItemQuantity
    } = useStateContext();

    return (
        <div className="flex-col pt-10 mx-auto max-w-[1200px]">
            <div className="flex md:flex-row flex-col">
                <div className="flex-grow-[3]">
                    {cartItems.length < 1 && (
                        <div className="text-center mt-10">
                            <AiOutlineShopping size={150} className="mx-auto" />
                            <h3 className="font-medium text-xl">
                                Your shopping bag is empty
                            </h3>
                            <Link href="/" passHref>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCart && setShowCart(false)
                                    }
                                    className="btn"
                                >
                                    Continue shopping
                                </button>
                            </Link>
                        </div>
                    )}

                    <div className="flex flex-col gap-y-5 px-3">
                        {cartItems.length >= 1 &&
                            cartItems.map((item: IProductInCart) => (
                                <div key={item._id} className="flex">
                                    <div className="grid place-items-center">
                                        <Image
                                            src={String(urlFor(item?.image[0]))}
                                            alt={item.name}
                                            width={150}
                                            height={150}
                                            className="rounded-xl bg-gray-200 select-none"
                                        />
                                    </div>
                                    <div className="ml-2 flex flex-col justify-around flex-grow">
                                        <div className="flex flex-row items-center justify-between">
                                            <h5 className="font-title font-medium text-xl">
                                                {item.name}
                                            </h5>
                                            <h4 className="font-title font-medium text-xl">
                                                {`$${item.price}`}
                                            </h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="sm:min-w-[150px]">
                                                <div className="flex items-stretch justify-evenly border border-solid border-gray p-[6px] select-none">
                                                    <span
                                                        className="qty_base border-r border-solid border-gray cursor-pointer flex-1"
                                                        onClick={() =>
                                                            toggleCartItemQuantity &&
                                                            toggleCartItemQuantity(
                                                                item._id,
                                                                'dec'
                                                            )
                                                        }
                                                    >
                                                        <div className="h-full w-full grid place-items-center">
                                                            <AiOutlineMinus />
                                                        </div>
                                                    </span>
                                                    <span className="qty_base text-[20px] border-r border-solid border-gray flex-1">
                                                        <div className="h-full w-full grid place-items-center">
                                                            {item.quantity}
                                                        </div>
                                                    </span>
                                                    <span
                                                        className="qty_base cursor-pointer flex-1"
                                                        onClick={() =>
                                                            toggleCartItemQuantity &&
                                                            toggleCartItemQuantity(
                                                                item._id,
                                                                'inc'
                                                            )
                                                        }
                                                    >
                                                        <div className="h-full w-full grid place-items-center">
                                                            <AiOutlinePlus />
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="">
                                                <button
                                                    type="button"
                                                    className="text-3xl p-4 sm:p-0 text-red-500 cursor-pointer bg-transparent border-none"
                                                    onClick={() => {}}
                                                >
                                                    <TiDeleteOutline />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {cartItems.length >= 1 && (
                    <div className="flex-grow-[1]">
                        <div className="w-full py-8 px-16">
                            {/* <div className=" w-full py-8 px-16"> */}
                            <div className="flex justify-between items-center">
                                <p className="text-2xl font-medium">
                                    Your Cart
                                </p>
                                <p className="ml-2 text-xl text-red-500">
                                    ({totalQuantities} items)
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-medium">
                                    Subtotal:{' '}
                                </h3>
                                <h3 className="text-2xl font-medium font-title">
                                    {`$${totalPrice}`}
                                </h3>
                            </div>

                            <div className="flex items-center justify-center">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => {}}
                                >
                                    PAY WITH STRIPE
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
