import Layout from '../../components/Layout';
import Section from '../../components/Section';
import BlogCard from '../../components/BlogCard';

import blogs from '../../data/blogs';

const Blog = () => {
    const crumbs = [{ label: 'Blog', link: '/blog' }];
    return (
        <Layout crumbs={crumbs}>
            <Section>
                <div className="pg-blog">
                    <ul className="pg-blog__container">
                        {blogs.map((blog, i) => (
                            <BlogCard key={i} data={blog} horizontal={i === 0} />
                        ))}
                    </ul>
                </div>
            </Section>
        </Layout>
    );
};

export default Blog;
