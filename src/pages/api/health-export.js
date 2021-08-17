/* eslint-disable */

import { createClient } from '@supabase/supabase-js';
import { decode } from 'js-base64';

const handler = async (req, res) => {
    const body = req.body.data;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // DELETE ALL
    // const x = await supabase.from('entry').delete();
    // return res.status(200).json({ status: 'success' });

    const { data: refs, error } = await supabase.from('entry_ref').select('id, name, ref');

    let inserts = [];
    for (const obj of body.metrics) {
        // console.log(obj);
        const { id, ref } = refs.find((x) => x.ref === obj.name);

        switch (ref) {
            case 'sleep_analysis':
                const sleepRecords = obj.data.map((sleepSession) => ({
                    sleepDuration: sleepSession.inBed,
                    sleepStart: sleepSession.sleepStart,
                    sleepEnd: sleepSession.sleepEnd,
                    date: sleepSession.date
                }));

                for (const sleep of sleepRecords) {
                    inserts.push({
                        ref: id,
                        data: null,
                        date: sleep.date,
                        extra_data: sleep
                    });
                }
                break;
            case 'heart_rate':
                const heartRateRecords = obj.data.map((heartRate) => ({
                    min: heartRate.Min,
                    max: heartRate.Max,
                    avg: heartRate.Avg,
                    date: heartRate.date
                }));

                for (const heartRate of heartRateRecords) {
                    inserts.push({
                        ref: id,
                        data: null,
                        date: heartRate.date,
                        extra_data: heartRate
                    });
                }
                break;
            default:
                for (const entry of obj.data) {
                    // console.log(entry);
                    inserts.push({
                        ref: id,
                        data: entry.qty,
                        date: entry.date
                    });
                }
                break;
        }
    }

    console.log('sent request');
    const response = await supabase.from('entry').insert(inserts);
    console.log(response);

    res.status(200).json({ status: 'success' });
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
};

export default handler;
