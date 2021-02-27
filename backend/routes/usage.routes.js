const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const usageController = require('../controllers/usage.controllers.js');

router.route('/usage')
  .post(authMiddleware.requireLogin, authMiddleware.isAdmin, usageController.getUsageAction);

module.exports = router; // We need this at the end of every route file