import technologies from '../data/technologies';
import config from '../data/config';

import Jumbotron from '../components/Jumbotron';
import Layout from '../components/Layout';
import Section from '../components/Section';
import TechnologyItem from '../components/TechnologyItem';

import PencilIcon from '../assets/svg/pencil.svg';
import ProgrammerIcon from '../assets/svg/programmer.svg';

import { RiUserSearchLine } from 'react-icons/ri';
import { BsFileEarmarkCode } from 'react-icons/bs';
import { AiOutlinePartition, AiOutlineBarChart } from 'react-icons/ai';
import { getGithubContributions } from '../lib/api/getGithubContributions';

const Index = ({ githubContribitons }) => {
    return (
        <Layout harshFooterShadow={true}>
            <Section innerModifiers={['perspective']}>
                <Jumbotron githubContribitons={githubContribitons} />
            </Section>
            <Section modifiers={['double-padding', 'dark', 'wave']}>
                <div className="pg-index__section pg-index__section--dark">
                    <div className="pg-index__section-graphic">
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
                        {config.content.biography}
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
                        {config.content.vision}
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

export const getStaticProps = async () => {
    const githubContribitons = await getGithubContributions();

    return {
        props: {
            githubContribitons
        }
    };
};
