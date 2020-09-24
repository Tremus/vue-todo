import bodyParser from 'body-parser';

export default {
    dir: {
        pages: 'src/views',
    },
    css: ['~/src/assets/css/main.css'],
    serverMiddleware: [bodyParser.json(), '~/src/api.js'],
};
