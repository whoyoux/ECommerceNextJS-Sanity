import Link from 'next/link';
import Image from 'next/image';

import { IBanner } from '../types';
import { urlFor } from '../lib/client';

interface Props {
    footerBanner: IBanner;
}

const FooterBanner = ({
    footerBanner: {
        discount,
        largeText1,
        largeText2,
        saleTime,
        smallText,
        midText,
        product,
        buttonText,
        image,
        desc
    }
}: Props) => {
    return (
        <div className="py-16 md:py-32 px-10 bg-red-500 relative rounded-xl w-full mt-32 text-white font-title leading-none min-h-[400px]">
            <div className="flex justify-between flex-col xl:flex-row gap-y-10 xl:gap-y-0">
                <div>
                    <p className="p__Left">{discount}</p>
                    <h3 className="h3__Left">{largeText1}</h3>
                    <h3 className="h3__Left">{largeText2}</h3>
                    <p className="p__Left">{saleTime}</p>
                </div>
                <div className="leading-snug">
                    <p className="p__Right">{smallText}</p>
                    <h3 className="h3__Right">{midText}</h3>
                    <p className="p__Right">{desc}</p>
                    <Link href={`/product/${product}`} passHref>
                        <button
                            type="button"
                            className="rounded-md py-2 px-4 bg-white text-red-500 hover:bg-gray-200 transition-all mt-10
                        cursor-pointer font-medium z-50"
                        >
                            {buttonText}
                        </button>
                    </Link>
                </div>
                <div className="hidden md:block md:absolute md:right-[5%] xl:top-[-25%] xl:left-[25%]">
                    <Image
                        src={String(urlFor(image))}
                        alt="Headphones"
                        width={550}
                        height={550}
                        quality={100}
                        // className="hidden xl:absolute"
                    />
                </div>
            </div>
        </div>
    );
};

export default FooterBanner;
