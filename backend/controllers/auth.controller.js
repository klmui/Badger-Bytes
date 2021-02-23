const db = '../models/auth.models.js';

exports.loginAction = (req, res) => {
  db.login().then(data => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  });
}

exports.logoutAction = (req, res) => {
  db.logout().then(data => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  });
}

exports.signupAction = (req, res) => {
  db.signup().then(data => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  });
}