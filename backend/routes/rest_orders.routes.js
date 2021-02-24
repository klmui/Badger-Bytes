const express = require('express');
const router = express.Router();

// Import functions from controller
const restOrdersController = require('../controllers/rest_orders.controllers.js');

router.route('/orders')
  .get(restOrdersController.getRestOrdersAction);


module.exports = router; // We need this at the end of every route file