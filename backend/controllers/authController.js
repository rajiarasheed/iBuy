const { AuthService } = require("../services");
const BaseController = require("./BaseController");

class AuthController extends BaseController{
    static register = BaseController.asyncHandler(async(req,res)=>{
        const validateData = BaseController.validateRequest(registerValidation, req.body);
        const result = await AuthService.register(validateData);
        BaseController.logAction('USER_REGISTER',result.user);
        BaseController.sendSuccess(res,'User registered successfully. Welcome!', result, 201)
    })
}

module.exports = AuthController;