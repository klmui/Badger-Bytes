const db  = require('../models/usage.models');

exports.getUsageAction = (req, res) => {
 // Interact with the model
  db.getUsage(req, res).then(data => {
    //console.log(data);
    res.json(data);
  }).catch(err => {
    console.log(err);
  });
}