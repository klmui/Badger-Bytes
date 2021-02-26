exports.getOrders = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error connecting to database!");
          reject(err);
        } else {
          const query = `
          SELECT 
            o.id as order_id,
            o.order_date_time, 
            o.pickup_date_time, 
            o.payment_type, 
            o.completed,
            o.username, 
            s.food_id, 
            f.name as food_name, 
            s.quantity_served, 
            f.price as unit_price
          FROM user_order o
          JOIN served s ON s.user_order_id = o.id
          JOIN food f ON s.food_id = f.id
          WHERE o.username = ?
          ORDER BY o.order_date_time DESC;
          `;
          
          const values = [
           [req.params.username]
          ];
          connection.query(query, [values], (error, rows, fields) => {
            // Always release the connection back
            connection.release();
            if (error) {
              console.log("Error in query!");
              reject(err);
            } else {
              resolve(rows); 
            }
          });
        }
      });
    });
}

exports.getRestOrders = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error connecting to database!");
          reject(err);
        } else {
          const query = `
            SELECT 
            o.id as order_id,
            o.order_date_time, 
            o.pickup_date_time, 
            o.payment_type, 
            o.completed,
            o.username, 
            s.food_id, 
            f.name as food_name, 
            s.quantity_served, 
            f.price as unit_price
            FROM user_order o
            JOIN served s ON s.user_order_id = o.id
            JOIN food f ON s.food_id = f.id
            ORDER BY o.order_date_time DESC;
          `;
          connection.query(query, (error, rows, fields) => {
            // Always release the connection back
            connection.release();
            if (error) {
              console.log("Error in query!");
              reject(err);
            } else {
              resolve(rows); 
            }
          });
        }
      });
    });
}

// exports.submitOrder = (req, res) => {
//   return new Promise((resolve, reject) => {
//     // Connect to database
//     pool.getConnection((err, connection) => {
//       let query = `
//         INSERT INTO user_order (order_date_time, pickup_date_time, payment_type, completed, username) 
//         VALUES ?
//       `;
//       let values = [
//         [req.body.orderDatTime, req.body.pickupDateTime, req.body.paymentType, req.body.completed. req.body.username]
//       ];
//       connection.query(query, [values], (error, rows, fields) => {
//         if (error) {
//           console.log("Error in query!");
//           reject(err);
//         } else {
//           const orderId = rows.insertId;
//           query = `
//             INSERT INTO served (food_id, quantity_served, user_order_id)
//             VALUES ?
//           `;
//           values = [];
//         }
//       });
//     });
//   });
// }