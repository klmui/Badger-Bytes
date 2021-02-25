const express = require('express');
const router = express.Router();

// Import functions from controller
const indexController = require('../controllers/index.controllers.js');

router.route('/')
  .get(indexController.getMenuAction);


module.exports = router; // We need this at the end of every route file