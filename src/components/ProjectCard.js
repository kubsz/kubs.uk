import Image from 'next/image';

import Badge from './Badge';

import { HiExternalLink } from 'react-icons/hi';
import { GrGithub } from 'react-icons/gr';
import { FaRegFolder } from 'react-icons/fa';

const ProjectCard = ({ name, description, technologies, openSource, url, image }) => {
    return (
        <div className="project-card">
            <div className="project-card__header">
                <div className="project-card__logo-container">
                    {image.svg ? (
                        image.svg
                    ) : image.bitmap ? (
                        <Image src={`/assets/sites/branding/${image.bitmap}`} width={32} height={32} objectFit="contain" />
                    ) : (
                        <FaRegFolder />
                    )}
                </div>
                <ul className="project-card__link-list">
                    <li className="project-card__link-item">
                        <a className="project-card__link" href={url} target="_blank" rel="noreferrer">
                            <HiExternalLink />
                        </a>
                    </li>
                    {openSource ? (
                        <li className="project-card__link-item">
                            <a className="project-card__link" href={openSource} target="_blank" rel="noreferrer">
                                <GrGithub />
                            </a>
                        </li>
                    ) : null}
                </ul>
            </div>
            <a href={url} target="_blank" rel="noreferrer" className="project-card__text-link">
                <h3 className="project-card__title">{name}</h3>
            </a>
            <p className="project-card__description">{description}</p>
            <ul className="project-card__badge-list">
                {technologies.map((tech) => (
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
    );
};

export default ProjectCard;
