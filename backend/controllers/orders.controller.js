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

exports.getRestOrdersAction = (req, res) => {
  // Interact with the model
  db.getRestOrders().then(data => {
    return res.json(data);
  }).catch(err => {
    console.log(err);
  });
}

exports.submitOrderAction = (req, res) => {
  // Interact with the model
  db.submitOrder(req, res).then(data => {
    return res.json(data);
  }).catch(err => {
    console.log(err);
  });
}