import { useState } from 'react';

import Head from 'next/head';

import Breadcrumb from './Breadcrumbs';
import Footer from './Footer';
import Nav from './Nav';
import Sidenav from './Sidenav';

const Layout = ({ harshFooterShadow, children, title, crumbs, noGaps }) => {
    const [sidenavActive, setSidenavActive] = useState(false);

    return (
        <div className="root">
            <Head>
                <title>{title || 'Kubs K - Web Developer'}</title>
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
