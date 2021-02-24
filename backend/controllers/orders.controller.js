const db  = require('../models/orders.models');

exports.getOrdersAction = (req, res) => {
  // Interact with the model
  db.getOrders(req, res).then(data => {
    //console.log(data);
    res.json(data);
  }).catch(err => {
    console.log(err);
  });
}