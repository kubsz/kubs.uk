import { createClient } from '@supabase/supabase-js';
import Layout from '../../components/Layout';
import Section from '../../components/Section';

const DashboardIndex = ({ health }) => {
    console.log(health[0]);
    return (
        <Layout>
            <Section>
                {health.map((obj) => (
                    <>
                        <h3 key={obj.name}>{obj.name}:</h3>
                        {obj.data.map((x, i) => (
                            <p key={i}>
                                <strong>{x.date}: </strong>
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
            health: health[0].data
        },
        revalidate: 10
    };
};
