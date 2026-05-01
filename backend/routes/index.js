// // central route manager

// const config = require('../config/config');
// const { createAuthLimiter } = require('../middlewares/setup');

// // route files
// const authRoutes = require('./auth');
// // const adminRoutes = require('./admin');


// const setupRoutes = (app) => {
//     // A function that creates a rate limiter
//     const authLimiter = createAuthLimiter();
//     const shouldUseAuthLimiter = config.NODE_ENV === 'production';

//     app.use('/api/auth', authRoutes);
//     // app.use('/api/admin', adminRoutes);
// };

// module.exports = {
//     setupRoutes
// };

const config = require('../config/config');
const { createAuthLimiter } = require('../middlewares/setup');

const authRoutes = require('./auth');
// const adminRoutes = require('./admin');
// const todoRoutes = require('./todos');

const setupRoutes = (app) => {
    const authLimiter = createAuthLimiter();
    const shouldUseAuthLimiter = config.NODE_ENV === 'production';

    app.use('/api/auth', shouldUseAuthLimiter ? authLimiter : [], authRoutes);
    // app.use('/api/admin', adminRoutes);
    // app.use('/api/todos', todoRoutes);
};

module.exports = {
    setupRoutes
};