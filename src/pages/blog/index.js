import Layout from '../../components/Layout';
import Section from '../../components/Section';
import BlogCard from '../../components/BlogCard';

import { findAllArticles } from '../../lib/api/articles';
import { findAllArticleCategories } from '../../lib/api/articleCategories';

import TagFilter from '../../components/TagFilter';
import useTagFilter from '../../hooks/useTagFilter';

const Blog = ({ posts, categories }) => {
    const [filters, toggleFilter] = useTagFilter();

    return (
        <Layout crumbs={[{ label: 'Blog', link: '/blog' }]}>
            <Section className="pg-blog">
                <div className="centered-header">
                    <h1>Blog</h1>
                    <p>
                        View a plethora of blog articles related to my journey as a web developer, design inspiration, website documentation
                        and latest news about technologies!
                    </p>
                </div>

                <TagFilter
                    items={categories.map(({ name, backgroundHexColor }) => ({
                        name,
                        color: backgroundHexColor,
                        value: name
                    }))}
                    filters={filters}
                    toggleFilter={toggleFilter}
                    filterMessage="Showing articles with the categories "
                />
                <ul className="pg-blog__container">
                    {(filters.length
                        ? posts.filter((post) => post.articleCategories.some(({ slug }) => filters.findIndex((s) => s === slug) > -1))
                        : posts
                    ).map((post, i) => (
                        <BlogCard key={i} data={post} horizontal={filters.length ? false : i === 0} />
                    ))}
                </ul>
            </Section>
        </Layout>
    );
};

export default Blog;

export const getStaticProps = async () => {
    const [posts, categories] = await Promise.all([findAllArticles(), findAllArticleCategories()]);

    return {
        props: {
            posts,
            categories
        },
        revalidate: 60
    };
};
