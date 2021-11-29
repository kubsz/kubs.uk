import Link from 'next/link';

import Jumbotron from '../components/Jumbotron';
import TooltipTrigger from '../components/TooltipTrigger';
import Layout from '../components/Layout';
import Section from '../components/Section';
import TechnologyItem from '../components/TechnologyItem';

import PencilIcon from '../assets/svg/pencil.svg';
import ProgrammerIcon from '../assets/svg/programmer.svg';

import technologies from '../data/technologies';

import { RiUserSearchLine } from 'react-icons/ri';
import { BsFileEarmarkCode } from 'react-icons/bs';
import { AiOutlinePartition, AiOutlineBarChart } from 'react-icons/ai';

const Index = () => {
    return (
        <Layout harshFooterShadow={true}>
            <Section>
                <Jumbotron />
            </Section>
            <Section modifiers={['double-padding', 'dark', 'wave']}>
                <div className="pg-index__section pg-index__section--dark">
                    <div className="pg-index__section-graphic">
                        {/* <Image src="/graphic.png" height={378.5} width={600} /> */}
                        <ProgrammerIcon />
                    </div>
                    <div className="pg-index__section-main">
                        <span className="pg-index__section-top-text">Biography</span>
                        <div className="pg-index__section-heading-container">
                            <div className="pg-index__section-icon-container">
                                <PencilIcon className="pg-index__section-icon" />
                            </div>
                            <h2 className="pg-index__section-heading">A Little Bit About Me</h2>
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
                            <Link href="/projects">
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
                        <ul className="pg-index__section-technology-list">
                            {technologies.map((tech) => (
                                <TechnologyItem key={tech.name} data={tech} />
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="pg-index__section">
                    <div className="pg-index__section-main">
                        <span className="pg-index__section-top-text">Vision & Philosophy</span>
                        <div className="pg-index__section-heading-container">
                            <div className="pg-index__section-icon-container">
                                <PencilIcon className="pg-index__section-icon" />
                            </div>
                            <h2 className="pg-index__section-heading">Refined Design, Desired Experiences</h2>
                        </div>
                        <p>
                            Although designers often get looked down apon in the world of web development, I would argue design architecture
                            is the most fundamentally important aspect when creating a purposeful website. A successful web experience must
                            balance a quality level of exemplary design, along with meaningful UX.
                        </p>
                        <p>
                            Whether it's within the web development industry or in every day life, I am obsessed with creating things, and
                            even more obsessed with improving things. Every application built provides an oppourtunity to learn and
                            incorporate new ideas to future projects, which is a big reason why I enjoy working on projects with a unique
                            vision.
                        </p>
                    </div>
                    <div className="pg-index__section-graphic">
                        <div className="square-graphic">
                            <div className="square-graphic__inner">
                                {Array.from(Array(4).keys()).map((x) => (
                                    <span key={x} />
                                ))}
                            </div>
                            <div className="square-graphic__box">
                                <RiUserSearchLine className="square-graphic__icon" />
                                <h4 className="square-graphic__box-label">User Research</h4>
                            </div>
                            <div className="square-graphic__box">
                                <AiOutlinePartition className="square-graphic__icon" />
                                <h4 className="square-graphic__box-label">Planning & Wireframing</h4>
                            </div>
                            <div className="square-graphic__box">
                                <AiOutlineBarChart className="square-graphic__icon" />
                                <h4 className="square-graphic__box-label">Optimization</h4>
                            </div>
                            <div className="square-graphic__box">
                                <BsFileEarmarkCode className="square-graphic__icon" />
                                <h4 className="square-graphic__box-label">Build & Develop</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export default Index;
