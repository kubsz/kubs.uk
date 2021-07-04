const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withReactSvg({
    include: path.resolve(__dirname, 'src/assets'),
    webpack(config, options) {
        config.experiments = { topLevelAwait: true };
        return config;
    },
    images: {
        domains: ['picsum.photos']
    },
    reactStrictMode: true
});
