import { getBlogPosts } from '../../../lib/api/getBlogPosts';

const handler = async (req, res) => {
    const data = await getBlogPosts();

    if (data.length) return res.status(400).json({ status: 400, error: 'No blog posts found.' });

    return res.status(200).json({ status: 200, data });
};

export default handler;
