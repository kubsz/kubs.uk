import strapi from './strapi';
import { auth } from './auth';

export const findAllArticleCategories = () =>
    auth(async () => {
        const { data } = await strapi.find('article-categories');
        return data;
    });
