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
            o.payment_id, 
            o.completed,
            o.username, 
            p.payment_type, 
            s.food_id, 
            f.name as food_name, 
            s.quantity_served, 
            f.price as unit_price
          FROM user_order o
          JOIN user_payment p ON o.payment_id = p.id
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