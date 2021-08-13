import Link from 'next/link';

import { MdChevronRight } from 'react-icons/md';
import { TiHome } from 'react-icons/Ti';

const Breadcrumbs = ({ crumbs }) => {
    if (!crumbs.length) return null;

    const newCrumbs = [{ label: <TiHome className="breadcrumbs__home" />, link: '/' }, ...crumbs];
    return (
        <div className="breadcrumbs">
            <ul className="breadcrumbs__list">
                {newCrumbs.map((crumb, i) => {
                    if (i + 1 > crumbs.length) {
                        return <li className="breadcrumbs__item">{crumb.label}</li>;
                    } else {
                        return (
                            <li className="breadcrumbs__item">
                                <Link href={crumb.link}>
                                    <a className="breadcrumbs__link">{crumb.label}</a>
                                </Link>
                                <MdChevronRight />
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

Breadcrumbs.defaultProps = {
    crumbs: []
};

export default Breadcrumbs;
