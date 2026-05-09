const jwt = require("jsonwebtoken");
const logger = require("./logger");

// USER TOKEN
const generateUserToken = (user) => {
  try {
    return jwt.sign(
      {
        // id: user._id,
        id: user._id.toString(),
        email: user.email,
        role: user.role,
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



module.exports = {
  generateUserToken,
  verifyUserToken,
};

