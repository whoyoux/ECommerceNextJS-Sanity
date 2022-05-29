import Link from 'next/link';
import Image from 'next/image';
import { IBanner } from '../types';

interface Props {
    heroBanner: IBanner;
}

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }: Props) => {
    return (
        <div className="font-title w-full min-h-[50vh] bg-gray-200 flex flex-col py-20 px-10 relative rounded-xl">
            <div>
                <p className="text-xl font-medium">{heroBanner.smallText}</p>
                <h3 className="text-6xl font-bold">{heroBanner.midText}</h3>
                <h1 className="text-white font-bold text-9xl">
                    {heroBanner.largeText1}
                </h1>
                <div className="absolute md:top-0 md:right-[20%] md:w-[450px] md:h-[450px]">
                    <Image
                        src={String(urlFor(heroBanner.image))}
                        alt="Headphones"
                        layout="fill"
                        quality={100}
                        className="hidden 2xl:absolute"
                    />
                </div>

                <div>
                    <Link href={`/product/${heroBanner.product}`} passHref>
                        <button
                            type="button"
                            className="rounded-md py-2 px-4 bg-red-500 hover:bg-red-600 transition-all text-white mt-10
                            cursor-pointer font-medium z-50"
                        >
                            {heroBanner.buttonText}
                        </button>
                    </Link>
                    {/* <div className="flex flex-row justify-end items-center mr-[5vw]"> */}
                    <div className="absolute right-[10%] bottom-[5%] leading-snug">
                        <div className="text-right">
                            <h5 className="font-medium">Description</h5>
                            <p className="text-black/50">{heroBanner.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
