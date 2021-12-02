import { getGithubContributions } from '../../lib/api/getGithubContributions';

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(404).send('Invalid Method');

    let data;

    try {
        data = await getGithubContributions();
    } catch {
        return res.status(500).json({ status: 500, error: 'Error fetching contributions' });
    }

    return res.status(200).json(data);
};

export default handler;
