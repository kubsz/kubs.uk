import spotifyFetcher from '../../../lib/spotifyFetcher';

const handler = async (req, res) => {
    const response = await spotifyFetcher('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=25');
    // if (!response.status !== 200) {
    //     return res.status(500).send({ error: true });
    // }
    return res.status(200).json(response);
};

export default handler;
