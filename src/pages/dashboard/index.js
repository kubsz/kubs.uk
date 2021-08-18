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
    const [type, setType] = useState('weight_body_mass');

    if (!data) return <p>loading...</p>;

    console.log(data.data);

    const entryRef = data.data.find((x) => x.ref === type);
    const entries = entryRef.entry;

    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - period);

    const entriesInPeriod = period ? entries.filter((entry) => isBefore(periodStart, new Date(entry.date))) : entries;

    const chartData = {
        labels: entriesInPeriod.map((x) => format(new Date(x.date), 'dd LLLL, yyyy')),
        datasets: [
            {
                label: entryRef.name,
                data: entriesInPeriod.map((x) => x.data && x.data.toFixed(2)),
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

    const choices = [...data.data]
        .filter((x) => x.entry.length)
        .map((x) => ({
            ref: x.ref,
            name: x.name
        }));
    console.log(choices);

    return (
        <Layout>
            <Section>
                {choices.map((choice) => (
                    <button
                        className="btn btn--active"
                        onClick={() => setType(choice.ref)}
                        style={type === choice.ref ? {} : { color: '#000', backgroundColor: 'rgba(0,0,0,.1)' }}
                    >
                        {choice.name}
                    </button>
                ))}
                <button
                    className="btn btn--active"
                    onClick={() => setType('lean_body_mass')}
                    style={type === 'lean_body_mass' ? {} : { color: '#000', backgroundColor: 'rgba(0,0,0,.1)' }}
                >
                    Lean Body Mass
                </button>
                <h2>{entryRef.name}</h2>
                <br />
                <button
                    className="btn btn--active"
                    onClick={() => setPeriod(7)}
                    style={period === 7 ? {} : { color: '#000', backgroundColor: 'rgba(0,0,0,.1)' }}
                >
                    7 days
                </button>
                <button
                    className="btn btn--active"
                    onClick={() => setPeriod(30)}
                    style={period === 30 ? {} : { color: '#000', backgroundColor: 'rgba(0,0,0,.1)' }}
                >
                    30 days
                </button>
                <button
                    className="btn btn--active"
                    onClick={() => setPeriod(90)}
                    style={period === 90 ? {} : { color: '#000', backgroundColor: 'rgba(0,0,0,.1)' }}
                >
                    3 months
                </button>
                <button
                    className="btn btn--active"
                    onClick={() => setPeriod(365)}
                    style={period === 365 ? {} : { color: '#000', backgroundColor: 'rgba(0,0,0,.1)' }}
                >
                    1 year
                </button>
                <button
                    className="btn btn--active"
                    onClick={() => setPeriod(null)}
                    style={period === null ? {} : { color: '#000', backgroundColor: 'rgba(0,0,0,.1)' }}
                >
                    All Time
                </button>
                <Line data={chartData} options={options} />
                {/* <div className="pg-dashboard">
                    {[...entries].reverse().map((entry, i) => (
                        <div key={i} className="pg-dashboard__row">
                            <div className="pg-dashboard__column">
                                <strong>Date: </strong>
                                {formatDistance(new Date(entry.date), new Date(), { addSuffix: true })}
                            </div>
                            <div className="pg-dashboard__column">
                                <strong>Weight: </strong>
                                {entry.data.toFixed(2)}
                                {entryRef.unit}
                            </div>
                        </div>
                    ))}
                </div> */}
            </Section>
        </Layout>
    );
};

export default DashboardIndex;
