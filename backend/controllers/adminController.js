const AdminService = require("../services/AdminService");
const BaseController = require("./BaseController");
const { adminLoginValidation } = require("../utils/validation");

class AdminController extends BaseController {
  // LOGIN
  static login = BaseController.asyncHandler(async (req, res) => {
    const validatedData = BaseController.validateRequest(
      adminLoginValidation,
      req.body,
    );

    const result = await AdminService.login(validatedData);

    BaseController.sendSuccess(res, "Admin login successful", result, 200);
  });

  // GET USERS
  static getUsers = BaseController.asyncHandler(async (req, res) => {
    const users = await AdminService.getUsers(req.query);

    BaseController.sendSuccess(res, "Users fetched successfully", users, 200);
  });

  // GET USER BY ID
  static getUserById = BaseController.asyncHandler(async (req, res) => {
    const user = await AdminService.getUserById(req.params.id);

    BaseController.sendSuccess(res, "User fetched successfully", user, 200);
  });

  // BAN USER
  static banUser = BaseController.asyncHandler(async (req, res) => {
    const user = await AdminService.banUser(
      req.params.id,
      req.body.reason,
      req.admin,
    );

    BaseController.sendSuccess(res, "User banned successfully", user, 200);
  });

  // UNBAN USER
  static unbanUser = BaseController.asyncHandler(async (req, res) => {
    const user = await AdminService.unbanUser(req.params.id, req.admin);

    BaseController.sendSuccess(res, "User unbanned successfully", user, 200);
  });

  // DELETE USER
  static deleteUser = BaseController.asyncHandler(async (req, res) => {
    await AdminService.deleteUser(req.params.id, req.admin);

    BaseController.sendSuccess(res, "User deleted successfully", null, 200);
  });

  // DASHBOARD STATS
  static dashboardStats = BaseController.asyncHandler(async (req, res) => {
    const stats = await AdminService.getDashboardStats();

    BaseController.sendSuccess(res, "Dashboard stats fetched", stats, 200);
  });
}

module.exports = AdminController;

// const User = require('../models/User');
// const Admin = require('../models/Admin');

// const { generateAdminToken } = require('../utils/jwt');

// const {
//   sendSuccess,
//   sendError,
//   sendValidationError
// } = require('../utils/response');

// const {
//   adminLoginValidation,
//   statusUpdateValidation
// } = require('../utils/validation');

// const logger = require('../utils/logger');

// const {
//   notifyUserBanned,
//   notifyUserUnbanned,
//   notifyForceLogout
// } = require('../utils/socket');

// // ================= ADMIN LOGIN =================
// const adminLogin = async (req, res) => {
//   try {
//     // Validate request
//     const { error, value } = adminLoginValidation.validate(req.body);

//     if (error) {
//       return sendValidationError(res, { error });
//     }

//     const { email, password } = value;

//     // Find admin
//     const admin = await Admin.findByEmail(email);

//     if (!admin) {
//       return sendError(res, 'Invalid admin credentials', 401);
//     }

//     // Check status
//     if (admin.status !== 'active') {
//       return sendError(res, 'Admin account is inactive', 403);
//     }

//     // Compare password
//     const isPasswordValid = await admin.comparePassword(password);

//     if (!isPasswordValid) {
//       return sendError(res, 'Invalid admin credentials', 401);
//     }

//     // Generate admin token
//     const token = generateAdminToken({
//       id: admin._id,
//       email: admin.email,
//       role: admin.role
//     });

//     logger.info(`Admin logged in: ${email}`);

//     return sendSuccess(res, 'Admin login successful', {
//       token,
//       admin: admin.getPublicProfile()
//     });

//   } catch (error) {
//     logger.error('Admin login error:', error);

//     return sendError(res, 'Failed to login as admin', 500);
//   }
// };

// // ================= GET ALL USERS =================
// const getAllUsers = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;

//     const limit = parseInt(req.query.limit) || 10;

//     const skip = (page - 1) * limit;

//     const users = await User.find({})
//       .select('-password')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const totalUsers = await User.countDocuments();

//     const totalPages = Math.ceil(totalUsers / limit);

//     logger.info(
//       `Admin ${req.admin.email} fetched users list (page: ${page})`
//     );

//     return sendSuccess(res, 'Users retrieved successfully', {
//       users,
//       pagination: {
//         currentPage: page,
//         totalPages,
//         totalUsers,
//         hasNextPage: page < totalPages,
//         hasPrevPage: page > 1
//       }
//     });

//   } catch (error) {
//     logger.error('Get all users error:', error);

//     return sendError(res, 'Failed to retrieve users', 500);
//   }
// };

// // ================= GET USER BY ID =================
// const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id).select('-password');

//     if (!user) {
//       return sendError(res, 'User not found', 404);
//     }

//     return sendSuccess(res, 'User retrieved successfully', {
//       user
//     });

//   } catch (error) {
//     logger.error('Get user by ID error:', error);

//     return sendError(res, 'Failed to retrieve user', 500);
//   }
// };

// // ================= UPDATE USER STATUS =================
// const updateUserStatus = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate
//     const { error, value } = statusUpdateValidation.validate(req.body);

//     if (error) {
//       return sendValidationError(res, { error });
//     }

//     const { status } = value;

//     const user = await User.findById(id);

//     if (!user) {
//       return sendError(res, 'User not found', 404);
//     }

//     // Prevent admin changing own status
//     if (user._id.toString() === req.admin._id.toString()) {
//       return sendError(res, 'Cannot change your own status', 400);
//     }

//     user.status = status;

//     await user.save();

//     const action =
//       status === 'banned' ? 'banned' : 'activated';

//     logger.info(
//       `Admin ${req.admin.email} ${action} user: ${user.email}`
//     );

//     // Socket notifications
//     if (status === 'banned') {
//       notifyUserBanned(
//         user._id.toString(),
//         user.name,
//         req.admin.name
//       );
//     } else {
//       notifyUserUnbanned(
//         user._id.toString(),
//         user.name,
//         req.admin.name
//       );
//     }

//     return sendSuccess(
//       res,
//       `User ${action} successfully`,
//       {
//         user: user.getPublicProfile()
//       }
//     );

//   } catch (error) {
//     logger.error('Update user status error:', error);

//     return sendError(res, 'Failed to update user status', 500);
//   }
// };

// // ================= DASHBOARD STATS =================
// const getDashboardStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();

//     const activeUsers = await User.countDocuments({
//       status: 'active'
//     });

//     const bannedUsers = await User.countDocuments({
//       status: 'banned'
//     });

//     const totalAdmins = await Admin.countDocuments();

//     // Recent users
//     const sevenDaysAgo = new Date();

//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     const recentUsers = await User.countDocuments({
//       createdAt: { $gte: sevenDaysAgo }
//     });

//     return sendSuccess(
//       res,
//       'Dashboard stats retrieved successfully',
//       {
//         stats: {
//           totalUsers,
//           activeUsers,
//           bannedUsers,
//           totalAdmins,
//           recentUsers
//         }
//       }
//     );

//   } catch (error) {
//     logger.error('Get dashboard stats error:', error);

//     return sendError(res, 'Failed to retrieve dashboard stats', 500);
//   }
// };

// // ================= BAN USER =================
// const banUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const { reason = 'Violation of terms' } = req.body;

//     const user = await User.findById(id);

//     if (!user) {
//       return sendError(res, 'User not found', 404);
//     }

//     user.status = 'banned';

//     user.banReason = reason;

//     user.bannedAt = new Date();

//     await user.save();

//     logger.info(
//       `User banned: ${user.email} by ${req.admin.email}`
//     );

//     notifyUserBanned(
//       user._id.toString(),
//       user.name,
//       req.admin.name
//     );

//     return sendSuccess(
//       res,
//       'User banned successfully',
//       {
//         user: user.getPublicProfile()
//       }
//     );

//   } catch (error) {
//     logger.error('Ban user error:', error);

//     return sendError(res, 'Failed to ban user', 500);
//   }
// };

// // ================= UNBAN USER =================
// const unbanUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);

//     if (!user) {
//       return sendError(res, 'User not found', 404);
//     }

//     user.status = 'active';

//     user.banReason = null;

//     user.bannedAt = null;

//     await user.save();

//     logger.info(
//       `User unbanned: ${user.email} by ${req.admin.email}`
//     );

//     notifyUserUnbanned(
//       user._id.toString(),
//       user.name,
//       req.admin.name
//     );

//     return sendSuccess(
//       res,
//       'User unbanned successfully',
//       {
//         user: user.getPublicProfile()
//       }
//     );

//   } catch (error) {
//     logger.error('Unban user error:', error);

//     return sendError(res, 'Failed to unban user', 500);
//   }
// };

// // ================= FORCE LOGOUT USER =================
// const forceLogoutUser = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId);

//     if (!user) {
//       return sendError(res, 'User not found', 404);
//     }

//     notifyForceLogout(
//       userId,
//       user.name,
//       req.admin.name
//     );

//     return sendSuccess(
//       res,
//       `User ${user.name} has been forced to logout`
//     );

//   } catch (error) {
//     logger.error('Force logout error:', error);

//     return sendError(res, 'Failed to force logout user', 500);
//   }
// };

// // ================= UPDATE USER =================
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       name,
//       email,
//       status
//     } = req.body;

//     // Check email already exists
//     if (email) {
//       const existingUser = await User.findOne({
//         email,
//         _id: { $ne: id }
//       });

//       if (existingUser) {
//         return sendError(res, 'Email already in use', 400);
//       }
//     }

//     const user = await User.findByIdAndUpdate(
//       id,
//       {
//         ...(name && { name }),
//         ...(email && { email }),
//         ...(status && { status })
//       },
//       { new: true }
//     );

//     if (!user) {
//       return sendError(res, 'User not found', 404);
//     }

//     logger.info(
//       `User updated: ${user.email} by ${req.admin.email}`
//     );

//     return sendSuccess(
//       res,
//       'User updated successfully',
//       {
//         user: user.getPublicProfile()
//       }
//     );

//   } catch (error) {
//     logger.error('Update user error:', error);

//     return sendError(res, 'Failed to update user', 500);
//   }
// };

// // ================= DELETE USER =================
// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);

//     if (!user) {
//       return sendError(res, 'User not found', 404);
//     }

//     await User.findByIdAndDelete(id);

//     logger.info(
//       `User deleted: ${user.email} by ${req.admin.email}`
//     );

//     return sendSuccess(
//       res,
//       'User deleted successfully',
//       {
//         deletedUserId: id
//       }
//     );

//   } catch (error) {
//     logger.error('Delete user error:', error);

//     return sendError(res, 'Failed to delete user', 500);
//   }
// };

// module.exports = {
//   adminLogin,
//   getAllUsers,
//   getUserById,
//   updateUserStatus,
//   getDashboardStats,
//   banUser,
//   unbanUser,
//   forceLogoutUser,
//   updateUser,
//   deleteUser
// };
