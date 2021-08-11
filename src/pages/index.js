import Image from 'next/image';
import Link from 'next/link';

import Jumbotron from '../components/Jumbotron';
import TooltipTrigger from '../components/TooltipTrigger';
import Layout from '../components/Layout';
import Section from '../components/Section';

import PencilIcon from '../assets/svg/pencil.svg';

import ReactIcon from '../assets/svg/technologies/react-logo.svg';
import JavascriptLogo from '../assets/svg/technologies/js.svg';
import NodeLogo from '../assets/svg/technologies/node.svg';
import NextJSLogo from '../assets/svg/technologies/next.svg';
import VercelLogo from '../assets/svg/technologies/vercel.svg';

const Index = () => {
    const technologies = [
        {
            name: 'React.js',
            image: <ReactIcon />,
            color: '#61dafb'
        },
        {
            name: 'JavaScript',
            image: <JavascriptLogo />,
            color: '#f7df1e'
        },
        {
            name: 'Node',
            image: <NodeLogo />,
            color: '#75ac64'
        },
        {
            name: 'Next.js',
            image: <NextJSLogo />,
            color: '#0070f3'
        },
        {
            name: 'Vercel',
            image: <VercelLogo />,
            color: '#000000'
        }
    ];

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
                                width="27rem"
                                code
                                content="projects.reduce((a, b, i, arr) => (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a.language : b.language), null)"
                            >
                                {`react.js`}
                            </TooltipTrigger>
                            , but I also have significant experience with other languages and technologies listed below.
                        </p>
                        <ul className="pg-index__about-technology-list">
                            {[...technologies, ...technologies, ...technologies].map((tech) => (
                                <li key={tech.name}>
                                    <a
                                        className="technology"
                                        style={{
                                            backgroundColor: `${tech.color}33`,
                                            border: `1px solid ${tech.color}3d`,
                                            color: tech.color
                                        }}
                                    >
                                        {tech.image}
                                        <span>{tech.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export default Index;
