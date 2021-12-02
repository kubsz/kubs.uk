import Masonry from 'react-masonry-css';

import Layout from '../../components/Layout';
import Section from '../../components/Section';

import technologies from '../../data/technologies';
import projects from '../../data/projects';
import FeaturedProject from '../../components/FeaturedProject';
import ProjectCard from '../../components/ProjectCard';
import TagFilter from '../../components/TagFilter';
import useTagFilter from '../../hooks/useTagFilter';

const ProjectIndex = () => {
    const [filters, toggleFilter] = useTagFilter();

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
                    items={technologies.map(({ name, color, image }) => ({ name, color, image }))}
                    filters={filters}
                    toggleFilter={toggleFilter}
                    filterMessage="Only showing projects that utilized "
                />

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
