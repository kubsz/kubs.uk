import strapi from '../../lib/api/strapi';
import { auth } from '../../lib/api/auth';

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(404).send('Invalid Method');

    if (!req.body) return;

    const required = ['name', 'email', 'message'];

    if (!required.every((v) => Object.keys(req.body).includes(v))) {
        return res.status(400).json({ status: 400, success: true, error: 'Did not contain all required fields.' });
    }

    try {
        await auth(() => strapi.create('enquiries', req.body));
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, error: 'Error submitting your contact request.' });
    }

    return res.status(200).json({ status: 200, success: true });
};

export default handler;
