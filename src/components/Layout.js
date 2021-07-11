import Footer from './Footer';
import Nav from './Nav';

const Layout = (props) => {
    return (
        <div className="root">
            <Nav />
            <main className="main">{props.children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
