/* eslint-disable */

import React from 'react';

import { LineChart } from '@carbon/charts-react';

import '@carbon/charts/styles.css';

import { createClient } from '@supabase/supabase-js';
import { formatDistance, format } from 'date-fns';
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
    const entries = weight.entry;

    const maxValue = entries.reduce((acc, shot) => (acc = acc > shot.data ? acc : shot.data), 0) * 1;
    const minValue = entries.reduce((acc, shot) => (acc = acc < shot.data ? acc : shot.data)) * 1;
    const diff = maxValue - minValue;
    const intervals = 5;

    const step = diff / intervals;

    console.log(step);

    const axis = [
        minValue - step,
        minValue,
        ...Array.from(Array(intervals).keys()).map((x, i) => minValue + step * (i + 1)),
        maxValue,
        maxValue + step
    ].map((x) => x.toFixed(2));

    return (
        <Layout>
            <Section>
                <h1>My Bodyweight</h1>
                <LineChart
                    data={[...entries]
                        .reverse()
                        .splice(1, 30)
                        .map((entry) => ({
                            group: 'xxxx',
                            date: format(new Date(entry.date), 'MM-dd-yyyy'),
                            value: entry.data
                        }))}
                    options={{
                        resizable: true,
                        zoomBar: true,
                        title: 'Bodyweight',
                        axes: {
                            left: {
                                title: 'Weight (kg)',
                                mapsTo: 'value',
                                scaleType: 'linear',
                                includeZero: false,
                                ticks: {
                                    values: axis
                                }
                            },
                            bottom: {
                                title: 'Date',
                                mapsTo: 'date',
                                scaleType: 'labels'
                            }
                        },
                        curve: 'curveMonotoneX',
                        height: '400px'
                    }}
                />
                <div className="pg-dashboard">
                    {[...entries].reverse().map((entry, i) => (
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
