import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className="text-gray-500 text-center mt-5 py-8 px-3 font-medium flex flex-col items-center justify-center gap-3">
            <p>2022 whoyoux All rights reserved</p>
            <p className="text-3xl flex gap-3">
                <AiFillInstagram />
                <AiOutlineTwitter />
            </p>
        </div>
    );
};

export default Footer;
