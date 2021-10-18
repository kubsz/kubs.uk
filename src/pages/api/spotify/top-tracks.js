import { getAccessToken } from '../../../lib/api/spotifyAuth';

const handler = async (req, res) => {
    // const ACCESS_TOKEN = await getAccessToken();
    const ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;

    if (!ACCESS_TOKEN) {
        res.status(500).send({ error: true });
        return;
    }

    const spotifyFetch = await fetch('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });

    let spotifyJson;

    try {
        spotifyJson = await spotifyFetch.json();
    } catch {
        res.status(500).send({ error: true });
        return;
    }

    // spotifyJson.base64 =
    //     (await getPlaiceholder(spotifyJson.item.album.images?.[2].url).then(({ base64 }) => base64)) ??
    //     'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAMUlEQVR4nGJJSa9ioCVgoqnpoxaMWjBqwagFoxaMWjBqwagFoxaMWjBqARUBIAAA//8XfwGIp+VBawAAAABJRU5ErkJggg==';
    delete spotifyJson.context;
    delete spotifyJson.device;

    res.status(200).json(spotifyJson);
};

export default handler;
