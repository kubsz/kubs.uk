import { useEffect } from 'react';

import Masonry from 'react-masonry-css';

import Layout from '../../components/Layout';
import Section from '../../components/Section';

import FeaturedProject from '../../components/FeaturedProject';
import ProjectCard from '../../components/ProjectCard';
import TagFilter from '../../components/TagFilter';
import useTagFilter from '../../hooks/useTagFilter';

import { findAllProjects } from '../../lib/api/projects';
import { findAllTechnologies } from '../../lib/api/technologies';

const ProjectIndex = ({ projects, technologies }) => {
    const [filters, toggleFilter] = useTagFilter();

    useEffect(() => console.log(filters), []);
    return (
        <Layout crumbs={[{ label: 'Projects', link: '/project' }]}>
            <Section>
                <div className="centered-header">
                    <h1>Projects</h1>
                    <p>
                        Ranging from Web Components and UI/UX animations to web and mobile apps, check out my latest web software
                        development portfolio projects.
                    </p>
                </div>

                <TagFilter
                    items={technologies.map(({ name, hexColor, image }) => ({ name, color: hexColor, image, value: name }))}
                    filters={filters}
                    toggleFilter={toggleFilter}
                    filterMessage="Only showing projects that utilized "
                />

                {!filters.length && (
                    <div className="pg-my-work__featured-list">
                        {projects
                            .filter((x) => x.featured)
                            .map((project, i) => (
                                <FeaturedProject key={i} reverse={i % 2} project={project} />
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
                        <ProjectCard key={i} project={project} />
                    ))}
                </Masonry>
            </Section>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [projects, technologies] = await Promise.all([findAllProjects(), findAllTechnologies()]);
    return {
        props: {
            projects,
            technologies
        },
        revalidate: 60
    };
};

export default ProjectIndex;
