import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => {
    return axios.get(url);
};

const useSWRFetcher = (query, initialData = null, refreshInterval = 10000, isPaused = false) => {
    const { data, error, isValidating, mutate } = useSWR(query, fetcher, {
        initialData,
        refreshInterval,
        revalidateOnMount: true
    });

    return { data, isValidating, mutate, isError: error };
};

export default useSWRFetcher;
