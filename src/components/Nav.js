import Link from 'next/link';
import { useRouter } from 'next/router';

import NavLink from './NavLink';

import Logo from '../assets/svg/logo.svg';

import TwitterIcon from '../assets/svg/socials/twitter.svg';
import LinkedInIcon from '../assets/svg/socials/linkedin.svg';
import GithubIcon from '../assets/svg/socials/github.svg';

const Nav = () => {
    const { route } = useRouter();

    return (
        <nav className="nav">
            <div className="nav__inner">
                <div className="nav__logo-container">
                    <Link href="/">
                        <a>
                            <Logo className="nav__logo" />
                        </a>
                    </Link>
                </div>
                <div className="nav__main">
                    <ul className="nav__link-list">
                        <li className="nav__link-item">
                            <NavLink currentRoute={route} label="My Projects" href="/projects" />
                        </li>
                        <li className="nav__link-item">
                            <NavLink currentRoute={route} label="About Me" href="/" />
                        </li>
                        {/* <li className="nav__link-item">
                            <NavLink label="Dashboard" href="/dashboard" />
                        </li> */}
                        <li className="nav__link-item">
                            <NavLink currentRoute={route} label="Listening" href="/listening" />
                        </li>
                        <li className="nav__link-item">
                            <NavLink currentRoute={route} label="Blog" href="/blog" />
                        </li>
                    </ul>
                </div>
                <div className="nav__side">
                    <ul className="nav__link-list">
                        <li className="nav__link-item">
                            <NavLink label={<TwitterIcon />} href="https://twitter.com/kubs_korkmaz" icon />
                        </li>
                        <li className="nav__link-item">
                            <NavLink label={<LinkedInIcon />} href="https://www.linkedin.com/in/kubs-korkmaz-281373199/" icon />
                        </li>
                        <li className="nav__link-item">
                            <NavLink label={<GithubIcon />} href="https://github.com/kubsz" icon />
                        </li>
                        <li className="nav__link-item">
                            <NavLink label="Hire Me" href="/contact" fill />
                        </li>
                    </ul>
                </div>
                <button className="nav__hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Nav;
