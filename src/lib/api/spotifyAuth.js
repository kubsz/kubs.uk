import axios from 'axios';
import { universalBtoa } from '../utils';

export const getAccessToken = async () => {
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const code =
        'AQBqnALzErni8EC1uvGV16tH-DsuVGco99h4FI8eiB1VYf1qNf_89FvnJvathT8OvJJHyX2UwtnMtEP4pjYXEdl9rEysRBUGgdnnVw3_DqbDHSgWXlJnMHySLhmkIcki1j0Nl0RXsvysvtUERv2sud6GMbA4PoAGoW_zV4z_bZYgMi560mUw0fEBf40iAyFXcDrnQxnkumGmpqkxH8ezLf8UTwDoS0UI-7vk4Volrst__e90Jy8rDsi0Q55bDiJuYEMAcKXiLkxBIW8hF8bg5XBjYRNkZjXaEX73TfaTJWKq4t5fhtzALE-zAer5BsxEFyBAE-Ej7LU1EAsimNrGjVQjyg1oyCWl0KrUtm4Np4kPcjxZ';
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
