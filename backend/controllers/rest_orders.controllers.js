const db  = require('../models/rest_orders.model');

exports.getRestOrdersAction = (req, res) => {
  // Interact with the model
  db.getRestOrders().then(data => {
    return res.json(data);
  }).catch(err => {
    console.log(err);
  });
}