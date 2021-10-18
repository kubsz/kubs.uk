import axios from 'axios';
import { universalBtoa } from '../utils';

export const getAccessToken = async () => {
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const code = process.env.SPOTIFY_TEMP_CODE;
    const REDIRECT_URI = encodeURI('http://localhost:3000/listening');

    console.log(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET);

    if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('MISSING VARIABLE');
    }

    const response = await axios('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${universalBtoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        },
        data: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
        method: 'POST'
    });

    if (response.status !== 200) return null;

    return response.data.access_token;
};
