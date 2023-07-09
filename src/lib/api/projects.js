import { auth } from './auth';
import strapi from './strapi';

export const findAllProjects = () =>
    auth(async () => {
        const { data } = await strapi.find('projects', { populate: { technologies: true, screenshot: true, logo: true } });
        return data;
    });

export const findOneProject = async () => {
    return {};
};
