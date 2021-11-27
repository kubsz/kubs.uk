import Image from 'next/image';
import Link from 'next/link';

import Jumbotron from '../components/Jumbotron';
import TooltipTrigger from '../components/TooltipTrigger';
import Layout from '../components/Layout';
import Section from '../components/Section';
import TechnologyItem from '../components/TechnologyItem';

import PencilIcon from '../assets/svg/pencil.svg';

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
                        <Image src="/graphic.png" height={378.5} width={600} />
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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet suscipit quas illo deleniti, fuga minima odit
                            magnam earum esse id facere cupiditate laudantium ullam deserunt atque rem ipsum sint. Officiis.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illum repudiandae soluta totam culpa vero odit
                            ad eum, commodi laudantium! Hic earum consectetur similique minus debitis vitae officia, fugit a! Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Accusamus quis asperiores nobis ipsum commodi, pariatur magnam
                            facilis recusandae fugiat natus quae ut sequi eos aspernatur, maxime accusantium, blanditiis omnis consequuntur.
                        </p>
                    </div>
                    <div className="pg-index__section-graphic">
                        <div className="square-graphic">
                            <div className="square-graphic__inner">
                                {Array.from(new Array(4).keys()).map((x) => (
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
                                <BsFileEarmarkCode className="square-graphic__icon" />
                                <h4 className="square-graphic__box-label">Build & Develop</h4>
                            </div>
                            <div className="square-graphic__box">
                                <AiOutlineBarChart className="square-graphic__icon" />
                                <h4 className="square-graphic__box-label">Optimization</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export default Index;
