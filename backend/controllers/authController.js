const { AuthService } = require("../services");
const { registerValidation, loginValidation, verifyOtpValidation, resendOtpValidation } = require("../utils/validation");
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
        BaseController.sendSuccess(res,result.message, result, 200)
    })

    static login = BaseController.asyncHandler(async (req, res, next) => {
        const validateData = BaseController.validateRequest(loginValidation, req.body);
        const result = await AuthService.login(validateData);
        BaseController.logAction('USER_LOGIN', result.user);
        BaseController.sendSuccess(res, 'User logged in successfully. Welcome!', result, 200);
    })
}

module.exports = AuthController;

// const { AuthService } = require("../services");
// const { registerValidation, loginValidation } = require("../utils/validation");
// const BaseController = require("./BaseController");

// class AuthController extends BaseController{
//     static register = BaseController.asyncHandler(async(req,res)=>{
//         const validateData = BaseController.validateRequest(registerValidation, req.body);
//         const result = await AuthService.register(validateData);
//         BaseController.logAction('USER_REGISTER',result.user);
//         BaseController.sendSuccess(res,'User registered successfully. Welcome!', result, 201)
//     })
//     static login = BaseController.asyncHandler(async(req,res)=>{
//         const validateData = BaseController.validateRequest(loginValidation, req.body);
//         const result = await AuthService.login(validateData);
//         BaseController.logAction('USER_LOGIN',result.user);
//         BaseController.sendSuccess(res,'User logged successfully. Welcome!', result, 201)
//     })
// }

// module.exports = AuthController;