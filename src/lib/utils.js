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
