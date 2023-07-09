import BlogCard from '../../components/BlogCard';
import Layout from '../../components/Layout';
import Section from '../../components/Section';

import { findAllArticles, findOneArticle } from '../../lib/api/articles';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import MarkdownCodeBlock from '../../components/MarkdownCodeBlock';
import Whitespace from '../../components/Whitespace';
import Button from '../../components/Button';
import TooltipTrigger from '../../components/TooltipTrigger';
import SmartLink from '../../components/SmartLink';

const components = {
    code: MarkdownCodeBlock,
    Button,
    TooltipTrigger,
    a: SmartLink,
    Whitespace
};

const BlogArticle = ({ post, source }) => {
    const crumbs = [{ label: 'Blog', link: '/blog' }, { label: post.title }];

    return (
        <Layout crumbs={crumbs} metaDescription={post.teaser} title={`${post.title} - Kubs K`}>
            <Section>
                <BlogCard data={post} horizontal hideLinks />
                <div className="pg-blog__content mdx">
                    <MDXRemote {...source} components={components} />
                </div>
            </Section>
        </Layout>
    );
};

export default BlogArticle;

export const getStaticProps = async (context) => {
    const post = await findOneArticle(context.params.slug);
    const source = await serialize(post.content);

    return {
        props: {
            post,
            source
        },
        revalidate: 60
    };
};

export const getStaticPaths = async () => {
    const posts = await findAllArticles();

    const paths = posts.map((blog) => ({ params: { slug: blog.slug } }));

    return {
        paths,
        fallback: false
    };
};
