import Image from 'next/image';

import Badge from './Badge';

import { HiExternalLink } from 'react-icons/hi';
import { GrGithub } from 'react-icons/gr';

const FeaturedProject = ({ name, description, image, url, openSource, technologies, reverse }) => {
    return (
        <div className={`featured-card${reverse ? ' featured-card--reverse' : ''}`}>
            <a
                target="_blank"
                rel="noreferrer"
                href={url}
                className={`featured-card__image-container${image.generated ? ' featured-card__image-container--overlay' : ''}`}
            >
                {image.generated ? (
                    <div
                        className="featured-card__fake-image"
                        style={{
                            backgroundImage: `linear-gradient(to bottom right, ${image.colors.join(',')})`
                        }}
                    >
                        {image.logo}
                    </div>
                ) : (
                    <Image
                        className="featured-card__image"
                        src={`/assets/sites/screenshots/${image.screenshot}`}
                        width={600}
                        height={337}
                        quality={100}
                    />
                )}
            </a>

            <div className="featured-card__info">
                <span className="featured-card__top-text">Featured Project</span>
                <a href={url} target="_blank" rel="noreferrer">
                    <h3 className="featured-card__title">{name}</h3>
                </a>
                <div className="featured-card__description">
                    <p>{description}</p>
                </div>
                <ul className="featured-card__technology-list">
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
                <ul className="featured-card__link-list">
                    <li className="featured-card__link-item">
                        <a className="featured-card__link" href="#">
                            <HiExternalLink />
                        </a>
                    </li>
                    {openSource ? (
                        <li className="featured-card__link-item">
                            <a className="featured-card__link" href={openSource}>
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
