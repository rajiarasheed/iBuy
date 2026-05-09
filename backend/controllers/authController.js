const { AuthService } = require("../services");
const { registerValidation, loginValidation, verifyOtpValidation, resendOtpValidation, forgotPasswordValidation, resetPasswordValidation } = require("../utils/validation");
const BaseController = require("./BaseController");

class AuthController extends BaseController {
    static register = BaseController.asyncHandler(async (req, res, next) => {
        const validateData = BaseController.validateRequest(registerValidation, req.body);
        const result = await AuthService.register(validateData);
        BaseController.logAction('USER_VERIFY_OTP', result.user);
        BaseController.sendSuccess(res, 'User registered successfully. Welcome!', result, 201);
    })

    static verifyOtp=BaseController.asyncHandler(async(req,res,next)=>{
        const validateData=BaseController.validateRequest(verifyOtpValidation,req.body);
        const result = await AuthService.verifyOtp(validateData)
        BaseController.logAction('VERIFY_OTP', result.user);
        BaseController.sendSuccess(res,'Email verified successfully!', result, 200)
    })

    static resendOtp=BaseController.asyncHandler(async(req,res,next)=>{
        const validateData=BaseController.validateRequest(resendOtpValidation,req.body);
        const result = await AuthService.resendOtp(validateData)
        BaseController.sendSuccess(res,result?.message || "OTP sent", result, 200)
    })
    static forgotPassword =BaseController.asyncHandler(async(req,res,next)=>{
        const validateData=BaseController.validateRequest(forgotPasswordValidation,req.body);
        const result = await AuthService.forgotPassword(validateData)
        BaseController.logAction('FORGOT_PASSWORD_OTP_SENT', result.user);
        BaseController.sendSuccess(res,'OTP sent to email for password reset', result, 200)
    })
    static resetPassword =BaseController.asyncHandler(async(req,res,next)=>{
        const validateData=BaseController.validateRequest(resetPasswordValidation,req.body);
        const result = await AuthService.resetPassword (validateData)
        BaseController.logAction('PASSWORD_RESET', result.user);
        BaseController.sendSuccess(res,'Password reset successfully', result, 200)
    })

    static login = BaseController.asyncHandler(async (req, res, next) => {
        const validateData = BaseController.validateRequest(loginValidation, req.body);
        const result = await AuthService.login(validateData);
        BaseController.logAction('USER_LOGIN', result.user);
        BaseController.sendSuccess(res, 'User logged in successfully. Welcome!', result, 200);
    })
}

module.exports = AuthController;
