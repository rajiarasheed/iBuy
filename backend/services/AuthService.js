const { error } = require("winston");
const User = require("../models/User");
const { sendOtpEmail } = require("../utils/mailer");
const {
  ConflictError,
  AuthenticationError,
  NotFoundError,
} = require("../utils/errors");
const logger = require("../utils/logger");
const { generateUserToken } = require("../utils/jwt");
const { generateOtp, getOtpExpiry } = require("../utils/otp");

class AuthService {
  // registration
  static async register(userData) {
    try {
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        throw new ConflictError("User with this email already exists");
      }
      //   Generate OTP before saving
      const otp = generateOtp();
      const otpExpiry = getOtpExpiry();

      const user = new User({ ...userData, otp, otpExpiry });

      //   send oto email
      await sendOtpEmail(user.email, otp);
      await user.save();

      logger.info(`New user registered: ${userData.email}`);
      // Don't return token yet — user must verify OTP first
      return {
        user: user.getPublicProfile(),
        message: "OTP sent to your email. Please verify to continue.",
      };
    } catch (error) {
      logger.error("Registration error:", error);
      throw error;
    }
  }

  //   verify otp
  static async verifyOtp({ email, otp }) {
    try {
      const user = await User.findByEmail(email);

      if (!user) throw new AuthenticationError("User not found");
      if (user.isVerified) throw new ConflictError("User is already verified");
      if (!user.otp || !user.otpExpiry)
        throw new AuthenticationError("No otp found please request one...");
      if (new Date() > user.otpExpiry)
        throw new AuthenticationError("Otp has expired");
      if (user.otp !== otp) throw new AuthenticationError("Invalid otp");

      // Mark verify otp
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;

      await user.save();

      // Now generate token
      // const token = generateUserToken({
      //   id: user._id,
      //   email: user.email,
      //   role: user.role,
      // });
      const token = generateUserToken(user);

      logger.info(`User verified: ${email}`);

      return {
        user: user.getPublicProfile(),
        token,
      };
    } catch (error) {
      logger.error("OTP verification error:", error);
      throw error;
    }
  }

  // Resend OTP
  static async resendOtp({ email }) {
    try {
      const user = await User.findByEmail(email);
      if (!user) throw new AuthenticationError("User not found.");

      const otp = generateOtp();
      user.otp = otp;
      user.otpExpiry = getOtpExpiry();

      await user.save();
      await sendOtpEmail(user.email, otp);
      logger.info(`Otp resend to : ${email}`);
      return {
        message: "New OTP sent to your email",
      };
    } catch (error) {
      logger.error("Otp resend error", error);
      throw error
    }
  }

  // forgot password
  static async forgotPassword({ email }) {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        throw new NotFoundError("User not found");
      }

      if (user.status === "banned") {
        throw new AuthenticationError("Account is banned");
      }

      // generate otp
      const otp = generateOtp();
      user.otp = otp;
      user.otpExpiry = getOtpExpiry();

      await user.save();
      await sendOtpEmail(user.email, otp);
      logger.info(`Password reset OTP sent : ${email}`);
      return {
        message: "New OTP sent to your email for password reset",
        email: user.email,
      };
    } catch (error) {
      logger.error("Forgot password error", error);
      throw error;
    }
  }

  // reset password (verify otp+update pass)
  static async resetPassword({ email, otp, newPassword }) {
    try {
      const user = await User.findByEmail(email);

      if (!user) throw new NotFoundError("User not found");
      if (!user.otp || !user.otpExpiry)
        throw new AuthenticationError("No otp found please request one...");
      if (new Date() > user.otpExpiry)
        throw new AuthenticationError("Otp has expired");
      if (user.otp !== otp) throw new AuthenticationError("Invalid otp");
      

      // update password
      user.password=newPassword;

      // clear otp
      user.otp=undefined
      user.otpExpiry=undefined

      await user.save();
      logger.info(`Password reset successfull : ${email}`)
      return {
        message: "Password reset successfull",
      };
    } catch (error) {
      logger.error("Reset password error", error);
      throw error;
    }
  }
  // for login
  static async login(credential) {
    try {
      const { email, password } = credential;

      // find user
      const user = await User.findByEmail(email);
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

      // check admin or not
//       if (user.role !== "admin") {
//   throw new AuthenticationError("Not an admin");
// }

      user.lastLogin = new Date();
      await user.save();

      // generate token
      // const token = generateUserToken({
      //   id: user._id,
      //   email: user.email,
      //   role: user.role,
      // });
      const token = generateUserToken(user);

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
