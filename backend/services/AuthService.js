const User = require("../models/User");
const { ConflictError } = require("../utils/errors");
const logger = require("../utils/logger");

class AuthService{
    static async register(userData){
        try {
            const existingUser = await User.findByEmail(userData.email);
            if (existingUser){
                throw new ConflictError('User with this email already exists')
            }
            const user = new User(userData);
            await user.save();

            const token = generateUserToken({
                id:user._id,
                email:user.email,
                role:user.role
            })

            logger.info(`New user registered: ${userData.email}`)

            return{
                user:user.getPublicProfile(),
                token
            }
            
        } catch (error) {
            logger.error('Registration error:',error)
            throw error;
        }
    }
}

module.exports = AuthService;