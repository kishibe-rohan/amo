const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getAllUsers,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

router.route("/admin/users").get(getAllUsers);

module.exports = router;
