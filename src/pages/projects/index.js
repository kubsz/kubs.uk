import { useState } from 'react';

import Masonry from 'react-masonry-css';

import Layout from '../../components/Layout';
import Section from '../../components/Section';

import technologies from '../../data/technologies';
import projects from '../../data/projects';
import FeaturedProject from '../../components/FeaturedProject';
import ProjectCard from '../../components/ProjectCard';

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

    return (
        <Layout crumbs={[{ label: 'Projects', link: '/project' }]}>
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
                {filters.length ? (
                    <p className="pg-my-work__filter-text">
                        Only showing projects that utilized{' '}
                        {filters.map((filter) => {
                            const filterObj = technologies.find((x) => x.name === filter);
                            return (
                                <span key={filter}>
                                    <span
                                        onClick={() => toggleFilter(filterObj.name)}
                                        style={{
                                            backgroundColor: `${filterObj.color}4d`,
                                            borderColor: `${filterObj.color}4d`
                                        }}
                                    >
                                        {filter}
                                    </span>
                                </span>
                            );
                        })}
                        .
                    </p>
                ) : null}

                {!filters.length && (
                    <div className="pg-my-work__featured-list">
                        {projects
                            .filter((x) => x.featured)
                            .map((project, i) => (
                                <FeaturedProject
                                    key={i}
                                    reverse={i % 2}
                                    url={project.url}
                                    name={project.name}
                                    description={project.description}
                                    image={project.image}
                                    technologies={project.technologies}
                                    openSource={project.openSource}
                                />
                            ))}
                    </div>
                )}

                <Masonry
                    breakpointCols={{
                        default: 3,
                        1100: 2,
                        600: 1
                    }}
                    className="masonry pg-my-work__project-list"
                    columnClassName="masonry__column"
                >
                    {(filters.length
                        ? projects.filter((proj) => proj.technologies.some((el) => filters.findIndex((x) => x === el.name) > -1))
                        : projects
                    ).map((project, i) => (
                        <ProjectCard
                            key={i}
                            name={project.name}
                            description={project.description}
                            url={project.url}
                            image={project.image}
                            technologies={project.technologies}
                            openSource={project.openSource}
                        />
                    ))}
                </Masonry>
            </Section>
        </Layout>
    );
};

export default ProjectIndex;
