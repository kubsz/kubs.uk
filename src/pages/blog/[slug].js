import BlogCard from '../../components/BlogCard';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import { getBlogPosts } from '../../lib/api/getBlogPosts';
import { getBlogPost } from '../../lib/api/getBlogPost';

const BlogArticle = ({ post }) => {
    const crumbs = [{ label: 'Blog', link: '/blog' }, { label: post.title }];
    return (
        <Layout crumbs={crumbs} metaDescription="test" title={`${post.title} - Kubs K`}>
            <Section>
                <BlogCard data={post} horizontal hideLinks />
                <div className="pg-blog__content">{post.content}</div>
            </Section>
        </Layout>
    );
};

export default BlogArticle;

export const getStaticProps = async (context) => {
    const { data: post } = await getBlogPost(context.params.slug);
    // console.log(d)

    return {
        props: {
            post
        }
    };
};

export const getStaticPaths = async () => {
    const { data: posts } = await getBlogPosts();

    const paths = posts.map((blog) => ({
        params: {
            slug: blog.slug
        }
    }));

    return {
        paths,
        fallback: false
    };
};
