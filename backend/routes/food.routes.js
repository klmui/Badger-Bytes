const express = require('express');
const router = express.Router();

const foodController = require("../controllers/food.controllers.js");
const authMiddleware = require("../middleware/auth.middleware");

// Add a food
router.post('/food', authMiddleware.requireLogin, authMiddleware.isStaff, foodController.addFoodAction);

// Update food
router.put('/food/:id', authMiddleware.requireLogin, authMiddleware.isStaff, foodController.updateFoodAction);

// Delete food
router.delete('/food/:id', authMiddleware.requireLogin, authMiddleware.isStaff, foodController.deleteFoodAction);

module.exports = router; // We need this at the end of every route file