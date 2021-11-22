import Link from 'next/link';

import ChevronIcon from '../assets/svg/chevron-up.svg';

import ProjectsIcon from '../assets/svg/layers.svg';
import DashboardIcon from '../assets/svg/flowchart.svg';
import BiographyIcon from '../assets/svg/learning.svg';
import ContactIcon from '../assets/svg/design-tools.svg';

import TwitterIcon from '../assets/svg/socials/twitter.svg';
import LinkedInIcon from '../assets/svg/socials/linkedin.svg';
import GithubIcon from '../assets/svg/socials/github.svg';

import EmailIcon from '../assets/svg/email-fill.svg';
import NavLink from './NavLink';
import TooltipTrigger from './TooltipTrigger';
import useSWRFetcher from '../hooks/useSWRFetcher';

const Footer = ({ harshShadow }) => {
    const { data: currently_playing } = useSWRFetcher('/api/spotify/currently-playing', null, 3000);

    const links = [
        {
            label: 'My Projects',
            description: "View a variety of projects I've designed and developed.",
            icon: <ProjectsIcon className="footer__link-icon" />,
            link: '/projects'
        },
        {
            label: 'Dashboard',
            description: 'Browse through a complete selection of stats about my life!',
            icon: <DashboardIcon className="footer__link-icon" />,
            link: '/dashboard'
        },
        {
            label: 'Biography',
            description: 'Want to learn more about me? Check out my biography.',
            icon: <BiographyIcon className="footer__link-icon" />,
            link: '/'
        },
        {
            label: 'Get in Touch',
            description: "If you're looking to get in contact with me, here's the place!",
            icon: <ContactIcon className="footer__link-icon" />,
            link: '/'
        }
    ];

    return (
        <footer className={`footer${harshShadow ? ' footer--harsh-shadow' : ''}`}>
            <div className="footer__inner">
                {/* <div className="footer__head">
                    <h3 className="footer__heading">Just Beginning my Journey</h3>
                </div> */}
                <div className="footer__main">
                    <ul className="footer__link-list">
                        {links.map((link, i) => (
                            <li key={i} className="footer__link-item">
                                <Link href={link.link}>
                                    <a className="footer__link">
                                        {link.icon}
                                        <h5 className="footer__link-heading">{link.label}</h5>
                                        <p className="footer__link-text">{link.description}</p>
                                        <span className="footer__dummy-link">
                                            Learn More
                                            <ChevronIcon />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer__lower">
                    <div className="footer__lower-top">
                        <div className="footer__lower-section">
                            <h5 className="footer__lower-heading">Contact Me</h5>
                            <div className="footer__email">
                                <a href="mailto:me@kubs.uk">me@kubs.uk</a>
                                <EmailIcon />
                            </div>
                        </div>
                        <div className="footer__lower-section">
                            <h5 className="footer__lower-heading">Keep up with me</h5>
                            <ul className="footer__social-list">
                                <li className="footer__social-item">
                                    <NavLink label={<TwitterIcon />} href="/" icon />
                                </li>
                                <li className="footer__social-item">
                                    <NavLink label={<LinkedInIcon />} href="/" icon />
                                </li>
                                <li className="footer__social-item">
                                    <NavLink label={<GithubIcon />} href="/" icon />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__lower-bottom">
                        <p className="footer__copyright">
                            Designed and developed with love by Kubs &copy;{' '}
                            <TooltipTrigger width="21.5rem" code content="new Date().getFullYear()">
                                {`{${new Date().getFullYear()}}`}
                            </TooltipTrigger>
                            . All rights reserved.
                        </p>
                        {currently_playing ? (
                            <div className="footer__current-song">
                                {/* TODO: add border around album image to show how far through */}
                                <img src={currently_playing.item.album.images[2].url} alt="" className="footer__current-song-image" />
                                <div className="footer__current-song-info">
                                    <span className="footer__current-song-name">{currently_playing.item.name}</span>
                                    <span className="footer__current-song-artists">
                                        {currently_playing.item.artists.map((x) => x.name).join(', ')}
                                    </span>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
