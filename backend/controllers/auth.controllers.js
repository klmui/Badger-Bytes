const db = require('../models/auth.models.js');

exports.loginAction = (req, res) => {
  db.login(req, res).then(data => {
    return res.json(data);
  }).catch(error => {
    console.log(error);
  });
}

exports.logoutAction = (req, res) => {
  db.logout(req, res).then(data => {
    return res.json(data);
  }).catch(error => {
    console.log(error);
  });
}

exports.signupAction = (req, res) => {
  db.signup(req, res).then(data => {
    return res.json(data);
  }).catch(error => {
    res.json(error);
    //console.log(error);
  });
}