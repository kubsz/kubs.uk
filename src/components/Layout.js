import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ harshFooterShadow, children }) => {
    return (
        <div className="root">
            <div className="root__overlay" id="root__overlay"></div>
            <Nav />
            <main className="main">{children}</main>
            <Footer harshShadow={harshFooterShadow} />
        </div>
    );
};

export default Layout;
