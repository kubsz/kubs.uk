import Strapi from 'strapi-sdk-js';

export default new Strapi({
    url: process.env.NEXT_PUBLIC_STRAPI_URL,
    prefix: '/api',
    axiosOptions: {}
});
