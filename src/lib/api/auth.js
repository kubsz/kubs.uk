import strapi from './strapi';

const tryLogin = async (tries = 0) => {
    try {
        const { jwt } = await strapi.login({ identifier: process.env.STRAPI_USERNAME, password: process.env.STRAPI_PASSWORD });
        strapi.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    } catch (err) {
        console.log('error authenticating', err);
        if (tries > 10) return;
        await new Promise((res) => setTimeout(res, 200));
        return tryLogin(tries + 1);
    }
};

export const auth = async (cb) => {
    if (!strapi.axios.defaults.headers.common.Authorization) await tryLogin();
    return await cb();
};
