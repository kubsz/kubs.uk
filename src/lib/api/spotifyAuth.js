import axios from 'axios';
import { universalBtoa } from '../utils';

export const getAccessToken = async () => {
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const code =
        'AQDZLU-KF7EQflBtwCKAhgsESGYIJRcIWgAXpWlrBiiV_mAisGoB2tzxq9uK7MDNhgDiJWp2pJfVxH9Oaof4weBrWI8-WiaMTJ0IIqhUw9M32KL9c8FYoBHkIzBigu5YPe_423d_Zqs6eiwCtXWe8rQudakMHj8QOW5QMm9kOBJhfLJIwRHBbs1icxYQqa8lICjPZs_A_zjzjUEqGQunl4xz0Jowo4NYeraJSwH0SeEYHNojJ0vGuv8bKc5bWt26HEhkbd6hC3UPD62xiFK0dJ4-q2kYzDsLvtPC4TEg60XiBfoHSInn6ZCjEUkbaoBjpw_F2w74ElrMiKp_Vm6smvL0_51Shfs5WbiIch7jkazlMUFe';
    const REDIRECT_URI = encodeURI('http://localhost:3000/listening');

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

    console.log(response);

    if (response.status !== 200) return null;

    return response.data.access_token;
};
