import Image from 'next/image';

import { strapiImage } from '../lib/utils';

import Badge from './Badge';

import { HiExternalLink } from 'react-icons/hi';
import { GrGithub } from 'react-icons/gr';
import { FaRegFolder } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <div className="project-card__header">
                <div className="project-card__logo-container">
                    {project.logo ? <img src={strapiImage(project.logo, 'thumbnail')} width={32} height={32} /> : <FaRegFolder />}
                </div>
                <ul className="project-card__link-list">
                    <li className="project-card__link-item">
                        <a className="project-card__link" href={project.link} target="_blank" rel="noopener noreferrer">
                            <HiExternalLink />
                        </a>
                    </li>
                    {project.githubLink ? (
                        <li className="project-card__link-item">
                            <a className="project-card__link" href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <GrGithub />
                            </a>
                        </li>
                    ) : null}
                </ul>
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__text-link">
                <h3 className="project-card__title">{project.title}</h3>
            </a>
            <p className="project-card__description">{project.description}</p>
            <ul className="project-card__badge-list">
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
        </div>
    );
};

export default ProjectCard;
