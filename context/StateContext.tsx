import {
    createContext,
    useContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction
} from 'react';

import { toast } from 'react-hot-toast';
import { IProduct, IProductInCart } from '../types';

interface IStateContext {
    showCart: boolean;
    cartItems: IProductInCart[];
    // getItemsFromLocalStorage?: () => IProductInCart[];
    // setItemsToLocalStorage?: (items: IProductInCart[]) => void;
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty?: () => void;
    decQty?: () => void;
    onAdd?: (product: IProduct, quantity: number) => void;
    setShowCart?: Dispatch<SetStateAction<boolean>>;
    toggleCartItemQuantity?: (id: string, value: 'inc' | 'dec') => void;
}

const defaultState = {
    showCart: false,
    cartItems: [] as IProductInCart[],
    totalPrice: 0,
    totalQuantities: 0,
    qty: 1
};

const Context = createContext<IStateContext>(defaultState);

export const StateContext = ({ children }: { children: JSX.Element }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<IProductInCart[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct: IProductInCart;
    let index: number;

    // const getItemsFromLocalStorage = () => {
    //     const items = localStorage.getItem('cart');
    //     if (!items) return [];
    //     return JSON.parse(items);
    // };

    // const setItemsToLocalStorage = (items: IProductInCart[]) => {
    //     if (items) localStorage.setItem('cart', JSON.stringify(items));
    // };

    const onAdd = (product: IProduct, quantity: number) => {
        if (!product) return;

        // const cartItems = getItemsFromLocalStorage() as IProductInCart[];

        const checkProductInCart = cartItems.find((item) => {
            return item._id === product._id;
        });

        setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities((prevTotalQty) => prevTotalQty + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems;

            const index = updatedCartItems.findIndex(
                (cartItem) => cartItem._id === product._id
            );
            updatedCartItems[index].quantity =
                updatedCartItems[index].quantity + quantity;

            setCartItems(updatedCartItems as IProductInCart[]);
            // setItemsToLocalStorage(updatedCartItems as IProductInCart[]);
        } else {
            const productToCart: IProductInCart = {
                ...product,
                quantity: quantity
            };

            setCartItems([...cartItems, { ...productToCart }]);
            // setItemsToLocalStorage([...cartItems, { ...productToCart }]);
        }

        toast.success(`${qty} ${product.name} added to cart.`);
        setQty(1);
    };

    const toggleCartItemQuantity = (id: string, value: 'inc' | 'dec') => {
        // const cartItems = getItemsFromLocalStorage() as IProductInCart[];

        foundProduct = cartItems.find(
            (item) => item._id === id
        ) as IProductInCart;
        index = cartItems.findIndex((product) => product._id === id);

        if (value === 'inc') {
            cartItems[index].quantity++;
            setTotalPrice(
                (prevTotalPrice) => prevTotalPrice + foundProduct.price
            );
            setTotalQuantities((prevTotalQty) => prevTotalQty + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                cartItems[index].quantity--;
                setTotalPrice(
                    (prevTotalPrice) => prevTotalPrice - foundProduct.price
                );
                setTotalQuantities((prevTotalQty) => prevTotalQty - 1);
            }
        }
        // setItemsToLocalStorage(newCartItems);
    };

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                // getItemsFromLocalStorage,
                // setItemsToLocalStorage,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
