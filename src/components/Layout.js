import { useState } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import config from '../data/config';

import Breadcrumb from './Breadcrumbs';
import Footer from './Footer';
import Nav from './Nav';
import Sidenav from './Sidenav';

const Layout = ({ harshFooterShadow, children, crumbs, noGaps, metaDescription, title }) => {
    const [sidenavActive, setSidenavActive] = useState(false);

    const { pathname } = useRouter();

    const metadata = config.metadata.find((pg) => pg.pathname === pathname);

    return (
        <div className="root">
            <Head>
                <title>{metadata ? metadata.title : title}</title>
                <meta name="description" content={metadata ? metadata.description : metaDescription} />
            </Head>
            <div className="root__overlay" id="root__overlay"></div>
            <Sidenav active={sidenavActive} closeSidenav={() => setSidenavActive(false)} />
            <Nav sidenavActive={sidenavActive} toggleSidenav={() => setSidenavActive(!sidenavActive)} />
            <main className={`main${noGaps ? ' main--no-gaps' : ''}`}>
                {crumbs && crumbs.length ? <Breadcrumb crumbs={crumbs} /> : null}
                {children}
            </main>
            <Footer harshShadow={harshFooterShadow} />
        </div>
    );
};

export default Layout;
