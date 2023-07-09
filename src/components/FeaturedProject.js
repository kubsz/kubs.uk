import Image from 'next/image';

import Badge from './Badge';

import { strapiImage } from '../lib/utils';

import { HiExternalLink } from 'react-icons/hi';
import { GrGithub } from 'react-icons/gr';

const FeaturedProject = ({ project, reverse }) => {
    return (
        <div className={`featured-card${reverse ? ' featured-card--reverse' : ''}`}>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={project.link}
                className={`featured-card__image-container${project.image ? ' featured-card__image-container--overlay' : ''}`}
            >
                {!project.screenshot ? (
                    <div
                        className="featured-card__fake-image"
                        style={{
                            backgroundImage: `linear-gradient(to bottom right, red,blue})`
                        }}
                    >
                        {/* <Image src={strapiImage(project.logo, 'thumbnail')} width={32} height={32} /> */}
                    </div>
                ) : (
                    <Image
                        className="featured-card__image"
                        src={strapiImage(project.screenshot, 'medium')}
                        width={600}
                        height={338}
                        quality={100}
                    />
                )}
            </a>

            <div className="featured-card__info">
                <span className="featured-card__top-text">Featured Project</span>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <h3 className="featured-card__title">{project.title}</h3>
                </a>
                <div className="featured-card__description">
                    <p>{project.description}</p>
                </div>
                <ul className="featured-card__technology-list">
                    {project.technologies.map((tech) => (
                        <li key={tech.name} className="project-card__badge-item">
                            <Badge
                                modifiers={['border', 'small']}
                                style={{
                                    backgroundColor: `${tech.hexColor}`,
                                    color: '#fff',
                                    borderColor: `${tech.hexColor}4d`
                                }}
                            >
                                {tech.name}
                            </Badge>
                        </li>
                    ))}
                </ul>
                <ul className="featured-card__link-list">
                    <li className="featured-card__link-item">
                        <a className="featured-card__link" href={project.link} target="_blank" rel="noopener noreferrer">
                            <HiExternalLink />
                        </a>
                    </li>
                    {project.githubLink ? (
                        <li className="featured-card__link-item">
                            <a className="featured-card__link" href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <GrGithub />
                            </a>
                        </li>
                    ) : null}
                </ul>
            </div>
        </div>
    );
};

export default FeaturedProject;
