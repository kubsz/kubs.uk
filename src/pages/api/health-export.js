/* eslint-disable */

import { createClient } from '@supabase/supabase-js';
import { decode } from 'js-base64';

const handler = async (req, res) => {
    console.log(req.body);
    const body = req.body.data;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const response = await supabase.from('health').insert({ data: body.metrics });
    console.log('successfully updated health data');

    res.status(200).json({ status: 'success' });
};

export default handler;
