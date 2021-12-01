import axios from 'axios';

export const getBlogPost = async (slug) => {
    let response = { data: {} };
    try {
        response = await axios.get(`${process.env.VERCEL_URL}/api/blog-posts/${slug}`);
    } catch (err) {
        console.log(err.message);
    }

    return response.data;
};
