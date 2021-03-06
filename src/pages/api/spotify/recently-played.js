import spotifyFetcher from '../../../lib/spotifyFetcher';

const handler = async (req, res) => {
    const response = await spotifyFetcher('https://api.spotify.com/v1/me/player/recently-played?limit=10');
    // if (!response.status !== 200) {
    //     return res.status(500).json({ error: true });
    // }
    return res.status(200).json(response);
};

export default handler;
