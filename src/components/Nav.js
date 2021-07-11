import Link from 'next/link';
import NavLink from './NavLink';

import Logo from '../assets/svg/logo.svg';

import TwitterIcon from '../assets/svg/socials/twitter.svg';
import LinkedInIcon from '../assets/svg/socials/linkedin.svg';
import GithubIcon from '../assets/svg/socials/github.svg';

const Nav = () => {
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
                            <NavLink label="My Work" href="/" />
                        </li>
                        <li className="nav__link-item">
                            <NavLink label="Dashboard" href="/" />
                        </li>
                        <li className="nav__link-item">
                            <NavLink label="Blog" href="/" />
                        </li>
                    </ul>
                </div>
                <div className="nav__side">
                    <ul className="nav__link-list">
                        <li className="nav__link-item">
                            <NavLink label={<TwitterIcon />} href="/" icon />
                        </li>
                        <li className="nav__link-item">
                            <NavLink label={<LinkedInIcon />} href="/" icon />
                        </li>
                        <li className="nav__link-item">
                            <NavLink label={<GithubIcon />} href="/" icon />
                        </li>
                        <li className="nav__link-item">
                            <NavLink label="Hire Me" href="/" fill />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
