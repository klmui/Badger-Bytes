const db  = require('../models/index.model');

exports.getMenuAction = (req, res) => {
  // Interact with the model
  db.getMenu().then(data => {
    //console.log(data);
    res.json(data);
  }).catch(err => {
    console.log(err);
  });
}