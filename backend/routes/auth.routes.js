const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth.controllers.js");
const authMiddleware = require("../middleware/auth.middleware");

router.route('/login')
  .post(authController.loginAction);

router.route('/logout')
  .get(authMiddleware.requireLogin, authController.logoutAction);

router.route('/signup')
  .post(authController.signupAction);

router.route('/:username')
  .put(authMiddleware.requireLogin, authController.updateUserAction)
  .delete(authMiddleware.requireLogin, authController.deleteUserAction);

module.exports = router; // We need this at the end of every route file