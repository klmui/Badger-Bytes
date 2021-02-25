const db = require('../models/food.models.js');

exports.addFoodAction = (req, res) => {
  db.addFood(req, res).then(data => {
    return res.json(data);
  }).catch(error => {
    console.log(error);
  });
}

exports.updateFoodAction = (req, res) => {
  db.updateFood(req, res).then(data => {
    return res.json(data);
  }).catch(error => {
    console.log(error);
  });
}

exports.deleteFoodAction = (req, res) => {
  db.deleteFood(req, res).then(data => {
    return res.json(data);
  }).catch(error => {
    console.log(error);
  });
}