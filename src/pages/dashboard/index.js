import { createClient } from '@supabase/supabase-js';
import { formatDistance } from 'date-fns';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import Section from '../../components/Section';

const fetcher = (query) => {
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

    const supabase = createClient(query, supabaseKey);

    return supabase.from('health').select('data').order('id', { ascending: false }).limit(1);
};

const DashboardIndex = (props) => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_SUPABASE_URL, fetcher);

    if (!data) return <p>loading...</p>;

    const health = data.data[0].data;
    console.log(health);
    return (
        <Layout>
            <Section>
                {Object.keys(health).map((obj) => (
                    <>
                        <h3 key={health[obj].name}>{health[obj].name}:</h3>
                        {health[obj].data.map((x, i) => (
                            <p key={i}>
                                <strong>{formatDistance(new Date(x.date), new Date(), { addSuffix: true })}: </strong>
                                {x.qty}
                            </p>
                        ))}
                    </>
                ))}
            </Section>
        </Layout>
    );
};

export default DashboardIndex;

/* eslint-disable */

export const getStaticProps = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);

    let { data: health, error } = await supabase.from('health').select('data');

    return {
        props: {
            health: health[health.length - 1].data
        },
        revalidate: 60
    };
};
