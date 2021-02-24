const express = require('express');
const router = express.Router();

// Import functions from controller
const ordersController = require('../controllers/orders.controller.js');
const authMiddleware = require("../middleware/auth.middleware");

router.route('/orders/:username')
  .get(authMiddleware.requireLogin, ordersController.getOrdersAction);

router.route('/orders')
  .get(authMiddleware.requireLogin, authMiddleware.isStaff, ordersController.getRestOrdersAction);


module.exports = router; // We need this at the end of every route file