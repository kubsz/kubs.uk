import Head from 'next/head';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ harshFooterShadow, children, title }) => {
    return (
        <div className="root">
            <Head>
                <title>{title || 'Kubs K - Web Developer'}</title>
            </Head>
            <div className="root__overlay" id="root__overlay"></div>
            <Nav />
            <main className="main">{children}</main>
            <Footer harshShadow={harshFooterShadow} />
        </div>
    );
};

export default Layout;
