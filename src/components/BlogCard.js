import Link from 'next/link';
import Image from 'next/image';

import SVG from 'react-inlinesvg';

import Badge from './Badge';
import Button from './Button';
import { formatDate, strapiImage } from '../lib/utils';

const BlogCard = ({ data, horizontal, hideLinks }) => {
    return (
        <li className={`blog-card${horizontal ? ' blog-card--horizontal' : ''}`}>
            {hideLinks ? (
                <div
                    className="blog-card__graphic"
                    style={{
                        backgroundImage: `linear-gradient(${data.gradientAngle}deg, ${data.gradientColors
                            .map((col) => col.hexColor)
                            .join(', ')})`
                    }}
                >
                    <Image src={strapiImage(data.graphic, 'thumbnail')} width={100} height={100} />
                </div>
            ) : (
                <Link
                    href={`/blog/${data.slug}`}
                    className="blog-card__graphic"
                    style={{
                        backgroundImage: `linear-gradient(${data.gradientAngle}deg, ${data.gradientColors
                            .map((col) => col.hexColor)
                            .join(', ')})`
                    }}
                >
                    <Image src={strapiImage(data.graphic, 'thumbnail')} width={100} height={100} />
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
                <span className="blog-card__date">{formatDate(data.createdAt)}</span>
                {hideLinks ? (
                    <h1 className="blog-card__title">{data.title}</h1>
                ) : (
                    <Link href={`/blog/${data.slug}`} className="blog-card__title">
                        {data.title}
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
