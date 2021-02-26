const express = require('express');
const router = express.Router();

// Import functions from controller
const indexController = require('../controllers/index.controllers.js');
const authMiddleware = require("../middleware/auth.middleware");

router.route('/')
  .get(indexController.getMenuAction)
  .put(authMiddleware.requireLogin, authMiddleware.isAdmin, indexController.updateMenuAction);

module.exports = router; // We need this at the end of every route file