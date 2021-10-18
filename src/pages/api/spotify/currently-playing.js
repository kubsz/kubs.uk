import spotifyFetcher from '../../../lib/spotifyFetcher';

const handler = async (req, res) => {
    const response = await spotifyFetcher('https://api.spotify.com/v1/me/player');
    if (!response) {
        res.status(500).send({ error: true });
    }
    res.status(200).json(response);
};

export default handler;
