import { createClient } from '@supabase/supabase-js';

const handler = async (req, res) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const { data, error } = await supabase.from('blog').select('*, categories:blog_category_link ( category ( * ) )');

    if (error) return res.status(500).json({ status: 500, error: 'Error.' });

    return res.status(200).json({ status: 200, data });
};

export default handler;
