import Link from 'next/link';

import config from '../data/config';

const Sidenav = ({ active, closeSidenav }) => {
    const handleClick = (e) => {
        const sidenav = e.target.closest('.sidenav');
        if (sidenav) return;
        closeSidenav();
    };
    return (
        <div className={`sidenav__container${active ? ' sidenav__container--active' : ''}`} onClick={handleClick}>
            <button className="sidenav__close"></button>
            <div className="sidenav">
                <Link href="/">
                    <a className="sidenav__logo">{config.logo}</a>
                </Link>
                <h4 className="sidenav__list-title">Content</h4>
                <ul className="sidenav__list">
                    {config.links.internal.map(({ url, label, fill, icon }) => (
                        <li key={label} className="sidenav__item">
                            <Link href={url}>
                                <a className="sidenav__link">
                                    {icon}
                                    {label}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="sidenav__footer">
                    <h4 className="sidenav__list-title">Keep up with me</h4>

                    <ul className="sidenav__socials-list">
                        {config.links.socials.map(({ url, icon }) => (
                            <li key={url} className="sidenav__socials-item">
                                <a href={url} className="sidenav__socials-link">
                                    {icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidenav;
