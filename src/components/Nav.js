import Link from 'next/link';
import { useRouter } from 'next/router';

import config from '../data/config';

import NavLink from './NavLink';

import Logo from '../assets/svg/logo.svg';

const Nav = ({ toggleSidenav, sidenavActive }) => {
    const { route } = useRouter();

    return (
        <nav className="nav">
            <div className="nav__inner">
                <div className="nav__logo-container">
                    <Link href="/">
                        <a className="nav__logo">{config.logo}</a>
                    </Link>
                </div>
                <div className="nav__main">
                    <ul className="nav__link-list">
                        {config.links.internal
                            .filter((x) => !x.fill)
                            .map(({ label, url }) => (
                                <li key={label} className="nav__link-item">
                                    <NavLink currentRoute={route} label={label} href={url} />
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="nav__side">
                    <ul className="nav__link-list">
                        {config.links.socials.map(({ icon, url }) => (
                            <li key={url} className="nav__link-item">
                                <NavLink label={icon} href={url} icon />
                            </li>
                        ))}
                        {config.links.internal
                            .filter((x) => x.fill)
                            .map(({ label, url }) => (
                                <li key={label} className="nav__link-item">
                                    <NavLink label={label} href={url} fill />
                                </li>
                            ))}
                    </ul>
                </div>
                <button className={`nav__hamburger${sidenavActive ? ' nav__hamburger--active' : ''}`} onClick={toggleSidenav}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Nav;
