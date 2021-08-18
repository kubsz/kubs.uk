/* eslint-disable */

import React, { useState } from 'react';

import { Line } from 'react-chartjs-2';

import { createClient } from '@supabase/supabase-js';
import { formatDistance, format, isBefore } from 'date-fns';
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

    const [period, setPeriod] = useState(30);

    if (!data) return <p>loading...</p>;

    const weight = data.data.find((x) => x.ref === 'weight_body_mass');
    const entries = weight.entry;

    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - period);

    const entriesInPeriod = period ? entries.filter((entry) => isBefore(periodStart, new Date(entry.date))) : entries;

    const chartData = {
        labels: entriesInPeriod.map((x) => format(new Date(x.date), 'dd LLLL, yyyy')),
        datasets: [
            {
                label: 'Weight',
                data: entriesInPeriod.map((x) => x.data.toFixed(2)),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)'
            }
        ]
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    return (
        <Layout>
            <Section>
                <h1>My Bodyweight</h1>
                <button onClick={() => setPeriod(7)} style={{ backgroundColor: period === 7 ? 'red' : 'green' }}>
                    7 days
                </button>
                <button onClick={() => setPeriod(30)} style={{ backgroundColor: period === 30 ? 'red' : 'green' }}>
                    30 days
                </button>
                <button onClick={() => setPeriod(90)} style={{ backgroundColor: period === 90 ? 'red' : 'green' }}>
                    3 months
                </button>
                <button onClick={() => setPeriod(365)} style={{ backgroundColor: period === 365 ? 'red' : 'green' }}>
                    1 year
                </button>
                <button onClick={() => setPeriod(null)} style={{ backgroundColor: period === null ? 'red' : 'green' }}>
                    All Time
                </button>
                <Line data={chartData} options={options} />
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
