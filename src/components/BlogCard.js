import Link from 'next/link';

import SVG from 'react-inlinesvg';
import { format } from 'date-fns';

import Badge from './Badge';
import Button from './Button';
import { formatDate } from '../lib/utils';

const BlogCard = ({ data, horizontal, hideLinks }) => {
    return (
        <li className={`blog-card${horizontal ? ' blog-card--horizontal' : ''}`}>
            {hideLinks ? (
                <div
                    className="blog-card__graphic"
                    style={{
                        backgroundImage: `linear-gradient(${data.graphic_degrees}deg, ${data.graphic_colors.join(', ')})`
                    }}
                >
                    <SVG src={data.graphic_icon} />
                </div>
            ) : (
                <Link href={`/blog/${data.slug}`}>
                    <a
                        className="blog-card__graphic"
                        style={{
                            backgroundImage: `linear-gradient(${data.graphic_degrees}deg, ${data.graphic_colors.join(', ')})`
                        }}
                    >
                        <SVG src={data.graphic_icon} />
                    </a>
                </Link>
            )}
            <div className="blog-card__main">
                {data.categories && data.categories.length ? (
                    <ul className="blog-card__tag-list">
                        {data.categories.map(({ category }) => (
                            <li key={category.name} className="blog-card__tag-item">
                                <Badge
                                    style={{ backgroundColor: `rgb(${category.background_color})`, color: `rgb(${category.text_color})` }}
                                >
                                    {category.name}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                ) : null}
                <span className="blog-card__date">{formatDate(data.created_at)}</span>
                {hideLinks ? (
                    <h1 className="blog-card__title">{data.title}</h1>
                ) : (
                    <Link href={`/blog/${data.slug}`}>
                        <a className="blog-card__title">{data.title}</a>
                    </Link>
                )}
                <p className="blog-card__description">{data.teaser}</p>
                {horizontal && !hideLinks ? (
                    <Button className="blog-card__button" href={`/blog/${data.slug}`}>
                        Read More
                    </Button>
                ) : null}
            </div>
        </li>
    );
};

export default BlogCard;
