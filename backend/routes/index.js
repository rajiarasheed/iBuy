const config = require('../config/config');

const { createAuthLimiter } = require('../middlewares/setup');

const authRoutes = require('./auth');
const addressRoutes = require('./address')

const setupRoutes = (app) => {

    const authLimiter = createAuthLimiter();

    const shouldUseAuthLimiter =
        config.NODE_ENV === 'production';


    // AUTH ROUTES
    if (shouldUseAuthLimiter) {

        app.use(
            '/api/auth',
            authLimiter,
            authRoutes
        );

    } else {

        app.use(
            '/api/auth',
            authRoutes
        );
    }


    // TODO ROUTES
    app.use('/api/address', addressRoutes);
};

module.exports = {
    setupRoutes
};