/* eslint-disable */

import { createClient } from '@supabase/supabase-js';
import { getUnixTime, startOfDay } from 'date-fns';

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

    // function to bundle the data by day, instead of in small increments
    const bundleDataByDay = (arr, id, roundData, findMeanAverage) => {
        if (!arr.length) return;

        let earliestDate = new Date(
            arr.reduce((a, b) => (getUnixTime(new Date(a.date)) < getUnixTime(new Date(b.date)) ? a.date : b.date))
        );

        let stepRows = [];

        let dayIndex = 0;
        let currentDay = startOfDay(earliestDate);

        let meanDivider = findMeanAverage ? 1 : null;

        for (const stepEntry of arr) {
            const entryDate = startOfDay(new Date(stepEntry.date));

            if (getUnixTime(entryDate) === getUnixTime(currentDay)) {
                if (findMeanAverage) meanDivider++;

                if (!stepRows[dayIndex]) {
                    stepRows[dayIndex] = { data: stepEntry.qty, date: entryDate };
                    continue;
                }

                stepRows[dayIndex].data += stepEntry.qty;
                continue;
            }

            if (findMeanAverage && stepRows[dayIndex]?.data) {
                stepRows[dayIndex].data /= meanDivider;
            }

            dayIndex++;
            currentDay = entryDate;
            meanDivider = 1;

            stepRows[dayIndex] = { data: stepEntry.qty, date: entryDate };
        }

        let rows = stepRows.filter((x) => x);

        for (const row of rows) {
            inserts.push({
                ref: id,
                data: roundData ? Math.round(row.data) : row.data,
                date: row.date
            });
        }
    };

    for (const obj of body.metrics) {
        const { id, ref } = refs.find((x) => x.ref === obj.name);

        console.log(ref);

        switch (ref) {
            case 'flights_climbed':
            case 'step_count':
                let arrToBundleByDayAndRound = body.metrics.find((x) => x.name === ref)?.data || [];
                bundleDataByDay(arrToBundleByDayAndRound, id, true);

                break;

            case 'walking_step_length':
            case 'headphone_audio_exposure':
            case 'environmental_audio_exposure':
            case 'walking_speed':
            case 'body_fat_percentage':
            case 'body_mass_index':
            case 'lean_body_mass':
            case 'weight_body_mass':
                let arrToBundleByDayWithMeanAverage = body.metrics.find((x) => x.name === ref)?.data || [];
                bundleDataByDay(arrToBundleByDayWithMeanAverage, id, false, true);
                break;

            case 'sleep_analysis':
                const sleepRecords = obj.data.map((sleepSession) => ({
                    sleepDuration: sleepSession.inBed,
                    sleepStart: new Date(sleepSession.sleepStart),
                    sleepEnd: new Date(sleepSession.sleepEnd),
                    date: new Date(sleepSession.date)
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
                        date: new Date(heartRate.date),
                        extra_data: heartRate
                    });
                }
                break;
            default:
                for (const entry of obj.data) {
                    inserts.push({
                        ref: id,
                        data: entry.qty,
                        date: new Date(entry.date)
                    });
                }
                break;
        }
    }

    console.log(`sent request with ${inserts.length} insertions`);
    const response = await supabase.from('entry').insert(inserts);
    console.log('request returned');

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
