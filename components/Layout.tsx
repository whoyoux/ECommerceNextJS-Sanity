import Head from 'next/head';
import Footer from './Footer';

import Navbar from './Navbar';

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <div className="p-2">
            <Head>
                <title>Store</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="max-w-[1400px] m-auto w-full">{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
