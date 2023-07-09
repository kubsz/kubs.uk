import { auth } from './auth';
import strapi from './strapi';

export const findAllTechnologies = () =>
    auth(async () => {
        const { data } = await strapi.find('technologies');
        return data;
    });

export const findOneTechnology = async () => {
    return {};
};
