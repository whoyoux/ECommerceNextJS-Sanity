import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineLeft,
    AiOutlineShopping
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { IProductInCart } from '../types';

const Cart = () => {
    const cartRef = useRef<HTMLInputElement>(null);
    const {
        totalPrice,
        totalQuantities,
        cartItems,
        setShowCart,
        toggleCartItemQuantity
    } = useStateContext();

    return (
        <div
            className="w-screen fixed right-0 top-0 z-[100] transition-all bg-black/50"
            ref={cartRef}
        >
            <div className="h-screen w-full sm:w-[600px] bg-white float-right py-10 px-3 relative">
                <button
                    type="button"
                    className="flex items-center text-xl font-medium cursor-pointer gap-1 ml-2 bg-transparent"
                    onClick={() => setShowCart && setShowCart(false)}
                >
                    <AiOutlineLeft />
                    <span className="ml-2">Your Cart</span>
                    <span className="ml-2 text-red-500">
                        ({totalQuantities} items)
                    </span>
                </button>

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

                <div className="flex flex-wrap justify-center gap-4 mt-5 w-full overflow-y-scroll">
                    {cartItems.length >= 1 &&
                        cartItems.map((item: IProductInCart) => (
                            <div className="flex gap-8 p-5 " key={item._id}>
                                <Image
                                    src={String(urlFor(item?.image[0]))}
                                    alt={item.name}
                                    width={150}
                                    height={150}
                                    className="rounded-xl bg-gray-200 select-none"
                                />
                                <div className="flex  flex-col justify-between">
                                    <div className="flex items-center justify-between w-[350px]">
                                        <h5 className="font-title font-medium text-xl">
                                            {item.name}
                                        </h5>
                                        <h4 className="font-title font-medium text-xl">
                                            {`$${item.price}`}
                                        </h4>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="flex items-stretch justify-evenly border border-solid border-gray p-[6px] select-none">
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
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="text-3xl text-red-500 cursor-pointer bg-transparent border-none"
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
                {cartItems.length >= 1 && (
                    <div className="absolute bottom-3 right-[5px] w-full py-8 px-16">
                        {/* <div className=" w-full py-8 px-16"> */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-medium">Subtotal: </h3>
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
                )}
            </div>
        </div>
    );
};

export default Cart;
