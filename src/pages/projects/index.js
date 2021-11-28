import { useState } from 'react';

import Image from 'next/image';

import Masonry from 'react-masonry-css';

import { HiExternalLink } from 'react-icons/hi';
import { GrGithub } from 'react-icons/gr';
import { FaRegFolder } from 'react-icons/fa';

import Logo from '../../assets/svg/sites/hytaleguide.svg';

import Layout from '../../components/Layout';
import Section from '../../components/Section';
import Badge from '../../components/Badge';

import technologies from '../../data/technologies';
import projects from '../../data/projects';
import FeaturedProject from '../../components/FeaturedProject';

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
                        <div key={i} className="project-card">
                            <div className="project-card__header">
                                <div className="project-card__logo-container">
                                    {project.image.svg ? (
                                        project.image.svg
                                    ) : project.image.bitmap ? (
                                        <Image
                                            src={`/assets/sites/branding/${project.image.bitmap}`}
                                            width={32}
                                            height={32}
                                            objectFit="contain"
                                        />
                                    ) : (
                                        <FaRegFolder />
                                    )}
                                </div>
                                <ul className="project-card__link-list">
                                    <li className="project-card__link-item">
                                        <a className="project-card__link" href={project.url}>
                                            <HiExternalLink />
                                        </a>
                                    </li>
                                    {project.openSource ? (
                                        <li className="project-card__link-item">
                                            <a className="project-card__link" href="#">
                                                <GrGithub />
                                            </a>
                                        </li>
                                    ) : null}
                                </ul>
                            </div>
                            <h3 className="project-card__title">{project.name}</h3>
                            <p className="project-card__description">{project.description}</p>
                            <ul className="project-card__badge-list">
                                {project.technologies.map((tech) => (
                                    <li key={tech.name} className="project-card__badge-item">
                                        <Badge
                                            modifiers={['border', 'small']}
                                            style={{
                                                backgroundColor: `${tech.color}`,
                                                color: '#fff',
                                                borderColor: `${tech.color}4d`
                                            }}
                                        >
                                            {tech.name}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Masonry>
            </Section>
        </Layout>
    );
};

export default ProjectIndex;
