const express = require("express");
const AuthController = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/verify-otp",AuthController.verifyOtp);
router.post("/resend-otp",AuthController.resendOtp)
router.post("/forgot-password",AuthController.forgotPassword);
router.post("/reset-password",AuthController.resetPassword)
router.post("/login",AuthController.login)
router.get("/me", authenticateUser, AuthController.me);
module.exports = router;
