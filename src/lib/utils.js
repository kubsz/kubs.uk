import { format, formatDistance, subDays } from 'date-fns';

export const universalBtoa = (str) => {
    try {
        return btoa(str);
    } catch (err) {
        return Buffer.from(str).toString('base64');
    }
};

export const universalAtob = (b64Encoded) => {
    try {
        return atob(b64Encoded);
    } catch (err) {
        return Buffer.from(b64Encoded, 'base64').toString();
    }
};

export const convertTime = (time) => {
    return `${Math.floor(time / 1000 / 60)}:${
        `${Math.floor((time / 1000) % 60)}`.length === 1 ? `0${Math.floor((time / 1000) % 60)}` : Math.floor((time / 1000) % 60)
    }`;
};

export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const formatDate = (date, distance = false) => {
    if (distance) {
        return formatDistance(subDays(new Date(), 0), new Date(date));
    } else {
        return format(new Date(date), 'd LLLL, yyyy');
    }
};

const formatOrder = ['extralarge', 'large', 'medium', 'small', 'thumbnail'];
export const strapiImage = (image, size = 'thumbnail') => {
    let formatIndex = formatOrder.indexOf(size);

    if (!image.formats) return process.env.NEXT_PUBLIC_STRAPI_URL + image.url;

    if (image.formats[size]) return process.env.NEXT_PUBLIC_STRAPI_URL + image.formats[size].url;

    while (true) {
        formatIndex++;
        if (formatIndex >= formatOrder.length) break;

        if (image.formats[formatOrder[formatIndex]])
            return process.env.NEXT_PUBLIC_STRAPI_URL + image.formats[formatOrder[formatIndex]].url;
    }

    return process.env.NEXT_PUBLIC_STRAPI_URL + image.url;
};
