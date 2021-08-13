import Image from 'next/image';
import Link from 'next/link';

import Jumbotron from '../components/Jumbotron';
import TooltipTrigger from '../components/TooltipTrigger';
import Layout from '../components/Layout';
import Section from '../components/Section';
import TechnologyItem from '../components/TechnologyItem';

import PencilIcon from '../assets/svg/pencil.svg';

import technologies from '../data/technologies';

const Index = () => {
    return (
        <Layout harshFooterShadow={true}>
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
                        <p>
                            I have a profound passion for web development, specialising in react.js, UI/UX principles & SEO optimization.
                            Dismissing the boring nerdy stuff, I also love music, travelling, and lifting weights! Get in touch with me at
                            me@kubs.uk.
                        </p>
                        <p>
                            Since entering the world of web development{' '}
                            <TooltipTrigger width="27rem" code content="new Date().getFullYear() - 2015">
                                {`{${new Date().getFullYear() - 2015}}`}
                            </TooltipTrigger>{' '}
                            years ago, I have picked up many different front-end and back-end technologies, but always seemed to be drawn to
                            front-end development. As showcased in{' '}
                            <Link href="/my-work">
                                <a className="link">my work</a>
                            </Link>
                            , my beloved tool is{' '}
                            <TooltipTrigger
                                width="30rem"
                                code
                                content="projects.reduce((a, b, i, arr) => (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a.language : b.language), null)"
                            >
                                {`{react.js}`}
                            </TooltipTrigger>
                            , but I also have significant experience with other languages and technologies listed below.
                        </p>
                        <ul className="pg-index__about-technology-list">
                            {technologies.map((tech) => (
                                <TechnologyItem key={tech.name} data={tech} />
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export default Index;
