const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/verify-otp",AuthController.verifyOtp);
router.post("/resend-otp",AuthController.resendOtp)
router.post("/login",AuthController.login)
module.exports = router;
