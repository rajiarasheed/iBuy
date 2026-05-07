const jwt = require("jsonwebtoken");
const logger = require("./logger");

// USER TOKEN
const generateUserToken = (user) => {
  try {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: "user",
      },
      process.env.JWT_USER_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );
  } catch (error) {
    logger.error("Error generating user token:", error);
    throw new Error("Token generation failed");
  }
};

// ADMIN TOKEN
const generateAdminToken = (admin) => {
  try {
    return jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_ADMIN_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );
  } catch (error) {
    logger.error("Error generating admin token:", error);
    throw new Error("Token generation failed");
  }
};

// VERIFY USER
const verifyUserToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_USER_SECRET);
  } catch (error) {
    logger.error("User token verification error:", error.message);

    if (error.name === "TokenExpiredError") throw new Error("Token expired");
    if (error.name === "JsonWebTokenError") throw new Error("Invalid token");

    throw new Error("Token verification failed");
  }
};

// VERIFY ADMIN
const verifyAdminToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ADMIN_SECRET);
  } catch (error) {
    logger.error("Admin token verification error:", error.message);

    if (error.name === "TokenExpiredError") throw new Error("Token expired");
    if (error.name === "JsonWebTokenError") throw new Error("Invalid token");

    throw new Error("Token verification failed");
  }
};

module.exports = {
  generateUserToken,
  generateAdminToken,
  verifyUserToken,
  verifyAdminToken,
};



// const jwt = require('jsonwebtoken');
// const logger = require('./logger');

// const generateUserToken = (payload) => {
//   try {
//     return jwt.sign(payload, process.env.JWT_USER_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN
//     });
//   } catch (error) {
//     logger.error('Error generating user token:', error);
//     throw new Error('Token generation failed');
//   }
// };

// const generateAdminToken = (payload) => {
//   try {
//     return jwt.sign(payload, process.env.JWT_ADMIN_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN
//     });
//   } catch (error) {
//     logger.error('Error generating admin token:', error);
//     throw new Error('Token generation failed');
//   }
// };

// const verifyUserToken = (token) => {
//   try {
//     if (!process.env.JWT_USER_SECRET) {
//       throw new Error('JWT_USER_SECRET not configured');
//     }
//     return jwt.verify(token, process.env.JWT_USER_SECRET);
//   } catch (error) {
//     throw new Error('Token verification failed');
//   }
// };

// const verifyAdminToken = (token) => {
//   try {
//     if (!process.env.JWT_ADMIN_SECRET) {
//       throw new Error('JWT_ADMIN_SECRET not configured');
//     }
//     return jwt.verify(token, process.env.JWT_ADMIN_SECRET);
//   } catch (error) {
//     throw new Error('Token verification failed');
//   }
// };

// module.exports = {
//   generateUserToken,
//   generateAdminToken,
//   verifyUserToken,
//   verifyAdminToken
// };