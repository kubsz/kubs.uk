import BlogCard from '../../components/BlogCard';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import { getBlogPosts } from '../../lib/api/getBlogPosts';
import { getBlogPost } from '../../lib/api/getBlogPost';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import MarkdownCodeBlock from '../../components/MarkdownCodeBlock';

import Button from '../../components/Button';

import matter from 'gray-matter';
import TooltipTrigger from '../../components/TooltipTrigger';
import SmartLink from '../../components/SmartLink';

const components = {
    code: MarkdownCodeBlock,
    Button,
    TooltipTrigger,
    a: SmartLink,
    Whitespace: ({ size }) => <div style={{ height: `${size}rem` }} />
};

const BlogArticle = ({ post, mdx }) => {
    const crumbs = [{ label: 'Blog', link: '/blog' }, { label: post.title }];

    return (
        <Layout crumbs={crumbs} metaDescription="test" title={`${post.title} - Kubs K`}>
            <Section>
                <BlogCard data={post} horizontal hideLinks />
                <div className="pg-blog__content mdx">
                    <MDXRemote {...mdx.source} components={components} />
                </div>
            </Section>
        </Layout>
    );
};

export default BlogArticle;

export const getStaticProps = async (context) => {
    const post = await getBlogPost(context.params.slug);

    //  = await serialize(post.content);

    const { content, data } = matter(post.content);
    const source = await serialize(content, { scope: data });
    return {
        props: {
            post,
            mdx: {
                source,
                frontMatter: data
            }
        }
    };
};

export const getStaticPaths = async () => {
    const posts = await getBlogPosts();

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
