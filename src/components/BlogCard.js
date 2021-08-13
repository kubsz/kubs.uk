import Link from 'next/link';

import Badge from './Badge';
import Button from './Button';

const BlogCard = ({ data }) => {
    return (
        <li className={`blog-card${data.horizontal ? ' blog-card--horizontal' : ''}`}>
            <Link href={`/blog/${data.slug}`}>
                <a
                    className="blog-card__graphic"
                    style={{
                        backgroundImage: `linear-gradient(${data.graphic.direction}deg, ${data.graphic.colors.join(', ')})`
                    }}
                >
                    {data.graphic.icon}
                </a>
            </Link>
            <div className="blog-card__main">
                {data.tags && data.tags.length ? (
                    <ul className="blog-card__tag-list">
                        {data.tags.map((tag) => (
                            <li key={tag.name} className="blog-card__tag-item">
                                <Badge style={tag}>{tag.name}</Badge>
                            </li>
                        ))}
                    </ul>
                ) : null}
                <span className="blog-card__date">{data.date}</span>
                <Link href={`/blog/${data.slug}`}>
                    <a className="blog-card__title">{data.title}</a>
                </Link>
                <p className="blog-card__description">{data.description}</p>
                {data.horizontal ? (
                    <Button className="blog-card__button" href={`/blog/${data.slug}`}>
                        Read More
                    </Button>
                ) : null}
            </div>
        </li>
    );
};

export default BlogCard;
