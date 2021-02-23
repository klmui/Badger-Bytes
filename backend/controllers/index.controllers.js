const db  = require('../models/index.model');

exports.getMenuAction = (req, res) => {
  // Interact with the model
  db.getMenu().then(data => {
    console.log(data);
    res.send(data);
  }).catch(err => {
    console.log(err);
  });
}