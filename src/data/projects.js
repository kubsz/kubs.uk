import technologies from './technologies';

import HytaleGuideLogo from '../assets/svg/sites/hytaleguide.svg';
import CSSLabLogo from '../assets/svg/sites/csslab.svg';

export default [
    {
        name: 'HytaleGuide',
        description:
            'HytaleGuide is an community wiki and social platform developed for an unreleased game. Read and edit wiki pages for items, mobs & locations within the game and earn badges and acheievements!',
        image: {
            screenshot: 'hytaleguide.jpg',
            logo: 'csslab.png',
            svg: <HytaleGuideLogo />
            // generated: {
            //     colors: ['#503a6d', '#202a4e', '#0f1733'],
            //     logo: <HGLogo />
            // }
        },
        url: 'https://hytaleguide.net',
        technologies: ['Next.js', 'React', 'Node.js', 'Vercel', 'Strapi', 'SCSS', 'HTML'].map((lang) =>
            technologies.find((tech) => tech.name === lang)
        ),
        featured: true
    },
    {
        name: 'CSSLab',
        url: 'https://csslab.app',
        image: {
            screenshot: 'csslab.jpg',
            svg: <CSSLabLogo />
        },
        description:
            'CSSLab offers a selection of beautiful components that can be easily slotted into any of your web projects. View buttons, form elements, modals & many more, customize each component to your specific colors and sizing!',
        technologies: ['Next.js', 'React', 'Strapi', 'Vercel', 'SCSS', 'HTML'].map((lang) =>
            technologies.find((tech) => tech.name === lang)
        ),
        featured: true
    },
    {
        name: 'HytaleHosting',
        url: 'https://hytalehosting.net/',
        image: {
            screenshot: 'hytalehosting.jpg',
            bitmap: 'hytalehosting.png'
        },
        description: 'HytaleHosting is a next/react.js app aimed to provide high quality game servers, produced for a client.',
        technologies: ['Next.js', 'React', 'SCSS', 'HTML'].map((lang) => technologies.find((tech) => tech.name === lang))
    },
    {
        name: 'BronwenJ',
        url: 'https://bronwenj.com',
        image: {
            screenshot: 'bronwenj.jpg',
            bitmap: 'bronwenj.png'
        },
        description: 'BronwenJ is a lightweight personal portfolio and blog for an client, studying journalism & writing.',
        technologies: ['PHP', 'Strapi', 'SCSS', 'HTML'].map((lang) => technologies.find((tech) => tech.name === lang))
    },
    {
        name: 'HytaleNames',
        url: 'https://hytalenames.org',
        image: {
            screenshot: 'hytalenames.jpg'
        },
        description: 'HytaleNames is a social platform made to search for and save Hytale names, developed in next/react.js for a client.',
        technologies: ['Next.js', 'React', 'Strapi', 'SCSS', 'HTML'].map((lang) => technologies.find((tech) => tech.name === lang))
    },
    {
        name: 'RustWeaponStats',
        url: 'https://rustweaponstats.com',
        image: {
            screenshot: 'rustweaponstats.jpg'
        },
        description: 'RustWeaponStats is a site detailing weapon/item stats in the video game Rust.',
        technologies: ['PHP', 'SQL', 'jQuery', 'HTML'].map((lang) => technologies.find((tech) => tech.name === lang))
    },
    {
        name: 'Debo',
        url: 'https://debo.kubs.uk/',
        image: {
            screenshot: 'debo.jpg'
        },
        description: 'DEBO is an advanced social media platform created as a part of my CS degree.',
        technologies: ['PHP', 'SQL', 'jQuery', 'HTML'].map((lang) => technologies.find((tech) => tech.name === lang))
    }
];
