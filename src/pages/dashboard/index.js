/* eslint-disable */

import { createClient } from '@supabase/supabase-js';
import { formatDistance } from 'date-fns';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import Section from '../../components/Section';

const fetcher = (query) => {
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

    const supabase = createClient(query, supabaseKey);

    return supabase.from('entry_ref').select('name, unit, ref, entry ( ref, data, date ) ');
};

const DashboardIndex = () => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_SUPABASE_URL, fetcher);

    if (!data) return <p>loading...</p>;

    const weight = data.data.find((x) => x.ref === 'weight_body_mass');
    return (
        <Layout>
            <Section>
                <h1>My Bodyweight</h1>
                <div className="pg-dashboard">
                    {[...weight.entry].reverse().map((entry, i) => (
                        <div key={i} className="pg-dashboard__row">
                            <div className="pg-dashboard__column">
                                <strong>Date: </strong>
                                {formatDistance(new Date(entry.date), new Date(), { addSuffix: true })}
                            </div>
                            <div className="pg-dashboard__column">
                                <strong>Weight: </strong>
                                {entry.data.toFixed(2)}
                                {weight.unit}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </Layout>
    );
};

export default DashboardIndex;
