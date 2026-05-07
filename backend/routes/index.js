const config = require('../config/config');

const { createAuthLimiter } = require('../middlewares/setup');

const authRoutes = require('./auth');
const adminRoutes = require('./admin');
// const todoRoutes = require('./todos');

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


    // ADMIN ROUTES
    app.use(
        '/api/admin',
        adminRoutes
    );


    // TODO ROUTES
    // app.use('/api/todos', todoRoutes);
};

module.exports = {
    setupRoutes
};