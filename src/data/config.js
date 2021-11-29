import Link from 'next/link';

import TooltipTrigger from '../components/TooltipTrigger';

import TwitterIcon from '../assets/svg/socials/twitter.svg';
import LinkedInIcon from '../assets/svg/socials/linkedin.svg';
import GithubIcon from '../assets/svg/socials/github.svg';

import ProjectsIcon from '../assets/svg/layers.svg';
import BiographyIcon from '../assets/svg/learning.svg';
import ContactIcon from '../assets/svg/design-tools.svg';
// import DashboardIcon from '../assets/svg/flowchart.svg';
import { RiMusic2Line } from 'react-icons/ri';

import Logo from '../assets/svg/logo.svg';

export default {
    logo: <Logo />,
    links: {
        internal: [
            { label: 'My Projects', url: '/projects' },
            { label: 'About Me', url: '/' },
            { label: 'Blog', url: '/blog' },
            { label: 'Listening', url: '/listening' },
            { label: 'Hire Me', url: '/contact', fill: true }
        ],
        socials: [
            { icon: <TwitterIcon />, url: 'https://twitter.com/kubs_korkmaz' },
            { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/kubs-korkmaz-281373199/' },
            { icon: <GithubIcon />, url: 'https://github.com/kubsz' }
        ],
        footer: [
            {
                label: 'My Projects',
                description: "View a variety of projects I've designed and developed.",
                icon: <ProjectsIcon className="footer__link-icon" />,
                link: '/projects'
            },
            {
                label: 'Listening',
                description: 'Feel free to consensually stalk my recent spotify listening activity!',
                icon: <RiMusic2Line className="footer__link-icon" />,
                link: '/listening'
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
                link: '/contact'
            }
        ]
    },
    content: {
        biography: (
            <>
                <p>
                    I have a profound passion for web development, specialising in react.js, UI/UX principles & SEO optimization. Dismissing
                    the boring nerdy stuff, I also love music, travelling, and lifting weights! Get in touch with me at me@kubs.uk.
                </p>
                <p>
                    Since entering the world of web development{' '}
                    <TooltipTrigger width="27rem" code content="new Date().getFullYear() - 2015">
                        {`{${new Date().getFullYear() - 2015}}`}
                    </TooltipTrigger>{' '}
                    years ago, I have picked up many different front-end and back-end technologies, but always seemed to be drawn to
                    front-end development. As showcased in{' '}
                    <Link href="/projects">
                        <a className="link">my work</a>
                    </Link>
                    , my beloved tool is{' '}
                    <TooltipTrigger
                        width="30rem"
                        code
                        content="projects.reduce((a, b, i, arr) => (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a.language : b.language), null)"
                    >
                        {`{react.js}`}
                    </TooltipTrigger>
                    , but I also have significant experience with other languages and technologies listed below.
                </p>
            </>
        ),
        vision: (
            <>
                <p>
                    Although designers often get looked down apon in the world of web development, I would argue design architecture is the
                    most fundamentally important aspect when creating a purposeful website. A successful web experience must balance a
                    quality level of exemplary design, along with meaningful UX.
                </p>
                <p>
                    Whether it's within the web development industry or in every day life, I am obsessed with creating things, and even more
                    obsessed with improving things. Every application built provides an oppourtunity to learn and incorporate new ideas to
                    future projects, which is a big reason why I enjoy working on projects with a unique vision.
                </p>
            </>
        )
    }
};
