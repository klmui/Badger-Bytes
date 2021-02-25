const db  = require('../models/index.model');

exports.getMenuAction = (req, res) => {
  // Interact with the model
  db.getMenu().then(data => {
    // Associative list
    // let result = {};
    // result['foods'] = {};
    // data.forEach(element => {
    //   result['restaurant_name'] = element['restaurant_name']
    //   result['restaurant_description'] = element['restaurant_description'];
    //   result['menu_id'] = element['menu_id'];
    //   result['restaurant_image'] = element['restaurant_image'];
    //   result['foods'][element['food_name']] = {};
    //   result['foods'][element['food_name']]['food_name'] = element['food_name'];
    //   result['foods'][element['food_name']]['quantity'] = element['quantity'];
    //   result['foods'][element['food_name']]['food_image'] = element['food_image'];
    //   result['foods'][element['food_name']]['price'] = element['price'];
    return res.json(data);
    //});
  }).catch(err => {
    console.log(err);
  });
}