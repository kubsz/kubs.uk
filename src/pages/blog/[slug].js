import BlogCard from '../../components/BlogCard';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import blogs from '../../data/blogs';

import HytaleGuideIcon from '../../assets/svg/blog/hytaleguide.svg';

const BlogArticle = ({ article }) => {
    article.graphic.icon = <HytaleGuideIcon style={{ padding: 35 }} />;

    const crumbs = [{ label: 'Blog', link: '/blog' }, { label: article.title }];
    return (
        <Layout crumbs={crumbs} metaDescription="test" title={`${article.title} - Kubs K`}>
            <Section>
                <BlogCard data={article} horizontal hideLinks />
                <div className="pg-blog__content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, vel quasi odio molestiae, repellat aperiam labore sunt
                        at iure excepturi eum? Error rerum dolorum voluptatem sit maxime repellat adipisci eveniet? Lorem ipsum dolor sit,
                        amet consectetur adipisicing elit. Pariatur eveniet aperiam fugit voluptas dolor explicabo, hic cumque nesciunt,
                        officia ex deleniti eos. Natus dolor sequi quibusdam asperiores nihil deleniti cum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis adipisci totam vel veniam possimus aspernatur
                        magnam maxime, eius vitae. Assumenda repellat dicta ratione harum enim similique officiis, a eveniet temporibus!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit obcaecati voluptatum repellat repellendus inventore
                        quod corporis architecto sed, voluptate eaque quia soluta cumque numquam autem earum vel dolorum consequuntur.
                        Nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsa quia debitis molestiae consequuntur?
                        Ducimus, facere praesentium odit fugit delectus possimus harum rerum. Reprehenderit, atque laboriosam quaerat minima
                        omnis facere.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aliquam illum, obcaecati minima eum voluptates
                        animi veniam rem repudiandae in nisi! Eveniet, nam velit. Molestiae officia sequi minima repudiandae sit. Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quia, fuga labore tenetur eum consectetur laudantium
                        deserunt enim iste sequi quod explicabo nam! Molestias iste nemo eum quas veniam officiis.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat explicabo velit, odit modi perspiciatis esse. Eius
                        cumque perferendis ipsa minima quia ducimus accusantium et. Temporibus possimus sequi ea quidem. Illo.
                    </p>
                </div>
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
