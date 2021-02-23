const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

router.route('/login')
  .post(authController.loginAction);

router.route('/logout')
  .get(authMiddleware.isLoggedIn, authController.logoutAction);

router.route('/signup')
  .post(authController.signupAction);

module.exports = router; // We need this at the end of every route file