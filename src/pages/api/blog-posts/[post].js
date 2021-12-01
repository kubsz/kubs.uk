import { createClient } from '@supabase/supabase-js';

const handler = async (req, res) => {
    const { post } = req.query;

    if (!post) return res.status(400).json({ status: 400, error: 'Please include a blog post slug.' });

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const { data, error } = await supabase
        .from('blog')
        .select('*, categories:blog_category_link ( category ( * ) )')
        .eq('slug', post)
        .single();

    if (error) return res.status(400).json({ status: 400, error: 'Blog post does not exist.' });

    return res.status(200).json({ status: 200, data });
};

export default handler;
