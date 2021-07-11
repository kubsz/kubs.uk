import Link from 'next/link';

const NavLink = (props) => {
    return (
        <Link href={props.href}>
            <a className={`nav__link${props.fill ? ' nav__link--fill' : ''}${props.icon ? ' nav__link--icon' : ''}`}>{props.label}</a>
        </Link>
    );
};

export default NavLink;
