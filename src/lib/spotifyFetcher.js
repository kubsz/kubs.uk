// import { getAccessToken } from './api/spotifyAuth';

const spotifyFetcher = async (query) => {
    // const ACCESS_TOKEN = await getAccessToken();
    // return null;
    const ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;

    if (!ACCESS_TOKEN) {
        return null;
    }

    const spotifyFetch = await fetch(query, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });

    let spotifyJson;

    try {
        spotifyJson = await spotifyFetch.json();
    } catch {
        return null;
    }

    delete spotifyJson.context;
    delete spotifyJson.device;

    return spotifyJson;
};

export default spotifyFetcher;
