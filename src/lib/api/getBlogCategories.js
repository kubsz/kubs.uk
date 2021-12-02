import { createClient } from '@supabase/supabase-js';

export const getBlogCategories = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const { data, error } = await supabase.from('category').select('*');

    if (error) return [];

    return data;
};
