import Link from 'next/link';

const NavLink = ({ href, fill, icon, label }) => {
    return href[0] === '/' ? (
        <Link href={href}>
            <a className={`nav__link${fill ? ' nav__link--fill' : ''}${icon ? ' nav__link--icon' : ''}`}>{label}</a>
        </Link>
    ) : (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`nav__link${fill ? ' nav__link--fill' : ''}${icon ? ' nav__link--icon' : ''}`}
        >
            {label}
        </a>
    );
};

export default NavLink;
