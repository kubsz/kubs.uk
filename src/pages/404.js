import Link from 'next/link';

import Layout from '../components/Layout';
import Section from '../components/Section';

const Custom404 = () => {
    return (
        <Layout>
            <Section className="pg-404" innerModifiers={['grow']}>
                <h1 className="pg-404__title">
                    {[...'404'].map((letter, i) => (
                        <span key={i}>{letter}</span>
                    ))}
                </h1>
                <div className="pg-404__subtitle">Page Not Found</div>
                <p className="pg-404__text">Sorry, we can't find the page you're looking for.</p>
                <Link href="/">
                    <a className="btn">Back to Home</a>
                </Link>
            </Section>
        </Layout>
    );
};

export default Custom404;
