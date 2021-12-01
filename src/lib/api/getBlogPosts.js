import { createClient } from '@supabase/supabase-js';

export const getBlogPosts = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const { data, error } = await supabase.from('blog').select(`*, categories: blog_category_link ( category ( * ) )`).eq('draft', false);

    if (error) return [];

    return data;
};
