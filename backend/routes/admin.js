const express = require("express");
const AdminController = require("../controllers/adminController");
const { authenticateAdmin } = require("../middlewares/auth");
const router = express.Router();

// LOGIN
router.post("/login", AdminController.login);

// USERS
router.get("/users", authenticateAdmin, AdminController.getUsers);

router.get("/users/:id", authenticateAdmin, AdminController.getUserById);

router.patch("/users/:id/ban", authenticateAdmin, AdminController.banUser);

router.patch("/users/:id/unban", authenticateAdmin, AdminController.unbanUser);

router.delete("/users/:id", authenticateAdmin, AdminController.deleteUser);

// DASHBOARD
router.get("/dashboard/stats", authenticateAdmin, AdminController.dashboardStats);

module.exports = router;