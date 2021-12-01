import axios from 'axios';

export const getBlogPosts = async () => {
    let response = { data: [] };
    try {
        response = await axios.get(`${process.env.VERCEL_URL}/api/blog-posts`);
    } catch (err) {
        console.log(err.message);
    }

    return response.data;
};
