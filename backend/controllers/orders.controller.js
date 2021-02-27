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

exports.completeOrderAction = (req, res) => {
  db.completeOrder(req, res).then(data => {
    return res.json(data);
  }).catch(error => {
    res.json(error);
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

exports.completeOrder = (req, res) => {	
  return new Promise((resolve, reject) => {	

    // Connect to database	
    pool.getConnection(async (err, connection) => {	
      if (err) {	
        console.log("Error connecting to database!");	
        return reject(err);	
      } else {	

        const query = `	
        UPDATE user_order o	
        SET 	
          completed = 1,	
          pickup_date_time = ?	
        WHERE o.id = ?;	
        `;	

        var d = new Date();	
        d = new Date(d.getTime());	
        var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";	

        const values = [	
          date_format_str, req.params.order_id	
        ];	

        connection.query(query, values, async (error, results) => {	
          // Always release the connection back	
          connection.release();	

          if (error) {	
            console.log("Error updating order.");	
            return reject({	
              message: "Error updating order."	
            });	
          } else {	
            return resolve({	
              message: "Order completed"	
            });	
          }	
        });	
      }	
    });	
  });	
}	
