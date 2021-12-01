import axios from 'axios';

export const getBlogCategories = async () => {
    let response = { data: [] };
    try {
        response = await axios.get(`${process.env.VERCEL_URL}/api/blog-categories`);
    } catch (err) {
        console.log(err.message);
    }

    return response.data;
};
