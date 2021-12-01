import Layout from '../../components/Layout';
import Section from '../../components/Section';
import BlogCard from '../../components/BlogCard';

import { getBlogPosts } from '../../lib/api/getBlogPosts';
import { getBlogCategories } from '../../lib/api/getBlogCategories';
import TagFilter from '../../components/TagFilter';
import useTagFilter from '../../hooks/useTagFilter';

const Blog = ({ posts, categories }) => {
    const [filters, toggleFilter] = useTagFilter();
    console.log(filters);
    console.log(posts);

    return (
        <Layout crumbs={[{ label: 'Blog', link: '/blog' }]}>
            <Section className="pg-blog">
                <div className="centered-header">
                    <h1>Blog</h1>
                    <p>
                        View a plethora of blog articles related to my journey as a web developer, design inspiration, website documentation
                        & latest news about technologies!
                    </p>
                </div>

                <TagFilter
                    items={categories.map(({ name, background_color: color }) => ({ name, color }))}
                    filters={filters}
                    toggleFilter={toggleFilter}
                    filterMessage="Showing articles with the categories "
                />
                <ul className="pg-blog__container">
                    {(filters.length
                        ? posts.filter((post) => post.categories.some(({ category: el }) => filters.findIndex((x) => x === el.name) > -1))
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
    const { data: posts } = await getBlogPosts();
    const { data: categories } = await getBlogCategories();

    return {
        props: {
            posts,
            categories
        }
    };
};
