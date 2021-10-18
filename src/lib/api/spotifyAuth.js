import axios from 'axios';
import { universalBtoa } from '../utils';

export const getAccessToken = async () => {
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const code =
        'AQBhE5gJzwtSlGAwINelY_myElSCXOSIh5LlvkurHNTMaMbMYSllDI2NaydDWJ0EKj-5aaw1bgiuYk63PJ6Yt5mIxal90hT9GZTm_kau59cOgCW3lhDPbu_zDB85Qhq7DtUtwjXIvkTQVbNPtiUCW-3AW4HjwQHnaWuQKsVAVg9fMVy_e7CIalCSIgWu3L8phLw3gSw20T_p3RtTPMFUueQwaXif_-_7bR9OT-4j3661btKP0GF4zPl8-0zMEBdwGB_V2ktke4m_Qd65xun7Q8LfVrfj3zfxXUxuiSSypQ5fUNASBZlzyFVJQCZZMWGpjOb8UpwAjJ8wdLeDdjtiJ8whOcFpYSYjZOQIe76VliYJareJ';
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

    console.log(response.data);

    if (response.status !== 200) return null;

    return response.data.access_token;
};
