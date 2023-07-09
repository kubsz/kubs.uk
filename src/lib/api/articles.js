import strapi from './strapi';
import { auth } from './auth';

const populate = { articleCategories: true, graphic: true, gradientColors: true };

export const findAllArticles = () =>
    auth(async () => {
        const { data } = await strapi.find('articles', { populate });
        return data;
    });

// eslint-disable-next-line no-unused-vars
export const findOneArticle = (slug) =>
    auth(async (slug) => {
        const { data } = await strapi.find('articles', { populate, filters: { slug: { $eq: slug } } });
        return data[0] || null;
    });
