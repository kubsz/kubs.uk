import Image from 'next/image';

import Jumbotron from '../components/Jumbotron';
import Layout from '../components/Layout';
import Section from '../components/Section';

import PencilIcon from '../assets/svg/pencil.svg';

const Index = () => {
    return (
        <Layout>
            <Jumbotron />
            <Section dark wave>
                <div className="pg-index__about">
                    <div className="pg-index__about-graphic">
                        <Image src="/graphic.png" height={378.5} width={600} />
                    </div>
                    <div className="pg-index__about-main">
                        <span className="pg-index__about-top-text">Aesthetic Uppercase Text</span>
                        <div className="pg-index__about-heading-container">
                            <div className="pg-index__about-icon-container">
                                <PencilIcon className="pg-index__about-icon" />
                            </div>
                            <h2 className="pg-index__about-heading">A Little Bit About Me</h2>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export default Index;
