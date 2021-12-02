import { getBlogCategories } from '../../lib/api/getBlogCategories';

const handler = async (req, res) => {
    const data = await getBlogCategories();

    if (!data.length) return res.status(400).json({ status: 400, error: 'No categories found' });

    return res.status(200).json({ status: 200, data });
};

export default handler;
