import Head from 'next/head';
import Breadcrumb from './Breadcrumbs';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ harshFooterShadow, children, title, crumbs, noGaps }) => {
    return (
        <div className="root">
            <Head>
                <title>{title || 'Kubs K - Web Developer'}</title>
            </Head>
            <div className="root__overlay" id="root__overlay"></div>
            <Nav />
            <main className={`main${noGaps ? ' main--no-gaps' : ''}`}>
                {crumbs && crumbs.length ? <Breadcrumb crumbs={crumbs} /> : null}
                {children}
            </main>
            <Footer harshShadow={harshFooterShadow} />
        </div>
    );
};

export default Layout;
