const { error } = require("winston");
const User = require("../models/User");
const { ConflictError, AuthenticationError, NotFoundError } = require("../utils/errors");
const logger = require("../utils/logger");
const { generateUserToken } = require("../utils/jwt");

class AuthService {
  // registration
  static async register(userData) {
    try {
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        throw new ConflictError("User with this email already exists");
      }
      const user = new User(userData);
      await user.save();

      const token = generateUserToken({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      logger.info(`New user registered: ${userData.email}`);

      return {
        user: user.getPublicProfile(),
        token,
      };
    } catch (error) {
      logger.error("Registration error:", error);
      throw error;
    }
  }
  // for login
  static async login(credential) {
    try {
      const { email, password } = credential;

      // find user
      const user =await User.findByEmail(email);
      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }

      // check user status
      if (user.status === "banned") {
        throw new AuthenticationError(
          "Your account has been banned...Please call administrator.",
        );
      }

      // compare password valid
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AuthenticationError("Invalid email or password...");
      }

      user.lastLogin = new Date();
      await user.save();

      // generate token
      const token = generateUserToken({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      logger.info(`User logged in: ${email}`);

      return {
        user: user.getPublicProfile(),
        token,
      };
    } catch (error) {
      logger.error("Login error:", error);
      throw error;
    }
  }

  static async validateUser(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      if (user.status === "banned") {
        throw new AuthenticationError("Account has been banned");
      }

      return user;
    } catch (error) {
      logger.error("User validation error:", error);
      throw error;
    }
  }
}

module.exports = AuthService;
