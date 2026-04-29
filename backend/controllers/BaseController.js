const { sendSuccess, sendError, sendValidationError } = require('../utils/response');
const { ValidationError } = require('../utils/errors');
const logger = require('../utils/logger');

class BaseController {

    // Automatically catches errors in async functions
    static asyncHandler(fn){
        return (req,res,next)=>{
            Promise.resolve(fn(req,res,next)).catch(next)
        }
    }

    // central validation helper
    static validateRequest(schema,data){
        const {error, value} = schema.validate(data,{abortEarly:false})

        if(error){
            const messages =error.details.map(d=>d.message).join(',')
            throw new ValidationError(messages,error.details)
        }
        return value
    }

    static handleValidationError(res, error) {
    return sendValidationError(res, { error });
  }

  static sendSuccess(res, message, data = null, statusCode = 200) {
    return sendSuccess(res, message, data, statusCode);
  }

  static sendError(res, message, statusCode = 500, details = null) {
    return sendError(res, message, statusCode, details);
  }

  static logAction(action, user = null, details = {}) {
    const logData = {
      action,
      timestamp: new Date().toISOString(),
      ...details
    };

    if (user) {
      logData.user = {
        id: user._id || user.id,
        email: user.email,
        role: user.role
      };
    }

    logger.info(`Controller Action: ${action}`, logData);
  }

//   security and clean API responses—it removes sensitive/internal fields from a user object before sending it to the client.
  static sanitizeUser(user) {
    if (!user) return null;
    
    const sanitized = user.toObject ? user.toObject() : user;
    delete sanitized.password;
    delete sanitized.__v;
    
    return sanitized;
  }
}

module.exports = BaseController;