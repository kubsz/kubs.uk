import Layout from '../../components/Layout';
import Section from '../../components/Section';
import blogs from '../../data/blogs';

const BlogArticle = ({ article }) => {
    return (
        <Layout>
            <Section>
                <h1>{article.title}</h1>
                <p>{article.desctiption}</p>
            </Section>
        </Layout>
    );
};

export default BlogArticle;

export const getStaticProps = async (context) => {
    const article = blogs.find((x) => x.slug === context.params.slug);

    delete article.graphic.icon;

    return {
        props: {
            article
        }
    };
};

export const getStaticPaths = async () => {
    const paths = blogs.map((blog) => ({
        params: {
            slug: blog.slug
        }
    }));

    return {
        paths,
        fallback: false
    };
};
