import { createClient } from '@supabase/supabase-js';
import { getBlogPost } from '../../../lib/api/getBlogPost';

const handler = async (req, res) => {
    const { slug } = req.query;

    if (!slug) return res.status(400).json({ status: 400, error: 'Please include a blog post slug.' });

    const data = await getBlogPost(slug);

    if (!data) return res.status(400).json({ status: 400, error: 'Blog post does not exist.' });

    return res.status(200).json({ status: 200, data });
};

export default handler;
