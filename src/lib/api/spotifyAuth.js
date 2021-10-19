import axios from 'axios';
import { universalBtoa } from '../utils';

export const getAccessToken = async () => {
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

    if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('MISSING VARIABLE');
    }

    const res = await axios('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${universalBtoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        },
        data: `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
        method: 'POST'
    });

    if (res.status !== 200) {
        throw new Error('Error getting access token');
    }

    const { access_token } = res.data;

    // const response = await axios('https://accounts.spotify.com/api/token', {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         Authorization: `Basic ${universalBtoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    //     },
    //     data: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
    //     method: 'POST'
    // });

    // console.log(response.data);

    // if (response.status !== 200) return null;

    return access_token;
};
