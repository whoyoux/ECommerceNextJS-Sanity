import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import { Cart } from './';

import { useStateContext } from '../context/StateContext';

const Navbar = () => {
    const { totalQuantities, showCart, setShowCart } = useStateContext();
    return (
        <div className=" flex justify-between my-2 mx-5 relative">
            <p className="text-black/60 font-title font-bold">
                <Link href="/">ECommerce</Link>
            </p>

            <Link href="/cart" passHref>
                <button
                    type="button"
                    className="text-[25px] text-gray-500 cursor-pointer relative transition-all border-none bg-transparent"
                    // onClick={() => {
                    //     setShowCart && setShowCart(true);
                    // }}
                >
                    <AiOutlineShopping />
                    <span className="absolute right-[-8px] text-white text-[12px] top-0 bg-red-500 w-[18px] h-[18px] rounded-full font-medium">
                        {totalQuantities}
                    </span>
                </button>
            </Link>

            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;
