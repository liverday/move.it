const withPwa = require('next-pwa');

module.exports = withPwa({
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'github.com'
        ]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        register: true,
        dest: 'public'
    }
})