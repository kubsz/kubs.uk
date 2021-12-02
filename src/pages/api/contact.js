import { createClient } from '@supabase/supabase-js';

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(404).send('Invalid Method');

    if (!req.body) return;

    const required = ['name', 'email', 'message'];

    if (!required.every((v) => Object.keys(req.body).includes(v))) {
        return res.status(400).json({ status: 400, error: 'Did not contain all required fields.' });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const { data, error } = await supabase.from('enquiries').insert(req.body);

    if (error) return res.status(500).json({ status: 500, error: 'Error submitting your contact request.' });

    return res.status(200).json({ status: 200, data });
};

export default handler;
