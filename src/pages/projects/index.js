import { useState } from 'react';
import Masonry from 'react-masonry-css';

import Layout from '../../components/Layout';
import Section from '../../components/Section';
import Badge from '../../components/Badge';

import technologies from '../../data/technologies';

const ProjectIndex = () => {
    const [filters, setFilters] = useState([]);

    const toggleFilter = (filter) => {
        const index = filters.indexOf(filter);

        if (index > -1) {
            setFilters([...filters].filter((x) => x !== filter));
        } else {
            setFilters([...filters, filter]);
        }
    };

    console.log(filters);

    return (
        <Layout>
            <Section className="pg-my-work">
                <div className="pg-my-work__header">
                    <h1>Projects</h1>
                    <p>
                        Ranging from Web Components and UI/UX animations to web and mobile apps, check out my latest web software
                        development portfolio projects.
                    </p>
                </div>
                <ul className="tag-filter__list">
                    {technologies.map((tech, i) => {
                        const active = filters.findIndex((x) => x === tech.name) > -1;
                        const filtersExist = filters.length > 0;

                        return (
                            <li key={i} className="tag-filter__item">
                                <button
                                    className={`tag-filter${
                                        filtersExist ? (active ? ' tag-filter--active' : ' tag-filter--inactive') : ''
                                    }`}
                                    onClick={() => toggleFilter(tech.name)}
                                    style={
                                        active
                                            ? {
                                                  backgroundColor: `${tech.color}4d`,
                                                  color: tech.color,
                                                  boxShadow: `0 2px 0 0 ${tech.color}8c`,
                                                  borderColor: `${tech.color}4d`
                                              }
                                            : {}
                                    }
                                >
                                    {tech.image}
                                    <span>{tech.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <Masonry
                    breakpointCols={{
                        default: 3,
                        1100: 2,
                        600: 1
                    }}
                    className="masonry pg-my-work__project-list"
                    columnClassName="masonry__column"
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((cur, i) => {
                        return (
                            <div key={i} className="project-card">
                                <img
                                    className="project-card__image"
                                    src="https://kubs.uk/static/csslab-db88b7e045797be3878d530722797739.jpg"
                                />
                                <div className="project-card__info">
                                    <h3 className="project-card__title">CSSLab</h3>
                                    <p>
                                        CSSLab offers a selection of beautiful components that can be easily slotted into any of your web
                                        projects.
                                    </p>
                                    <ul className="project-card__badge-list">
                                        {['React', 'Next.js', 'Vercel', 'SCSS', 'HTML'].map((tech) => {
                                            const techData = technologies.find((x) => x.name === tech);
                                            return (
                                                <li key={tech} className="project-card__badge-item">
                                                    <Badge
                                                        modifiers={['border']}
                                                        style={{
                                                            backgroundColor: `${techData.color}4d`,
                                                            color: techData.color,
                                                            borderColor: `${techData.color}4d`
                                                        }}
                                                    >
                                                        {techData.image}
                                                        <span>{techData.name}</span>
                                                    </Badge>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </Masonry>
            </Section>
        </Layout>
    );
};

export default ProjectIndex;
