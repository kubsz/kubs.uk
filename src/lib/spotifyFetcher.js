import axios from 'axios';
import { getAccessToken } from './api/spotifyAuth';

const spotifyFetcher = async (query) => {
    const ACCESS_TOKEN = await getAccessToken();

    if (!ACCESS_TOKEN) {
        return null;
    }

    const response = await axios(query, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });

    if (response.status !== 200) {
        return null;
    }

    delete response.data.context;
    delete response.data.device;

    return response.data;
};

export default spotifyFetcher;
