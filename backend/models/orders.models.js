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
            u.car_description,
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
          JOIN user u ON u.username = o.username
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
            u.car_description,
            o.completed,
            o.username, 
            o.payment_type, 
            s.food_id, 
            f.name as food_name, 
            s.quantity_served, 
            f.price as unit_price
            FROM user_order o
            JOIN served s ON s.user_order_id = o.id
            JOIN user u ON u.username = o.username
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

exports.submitOrder = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
      let query = `
        INSERT INTO user_order (order_date_time, pickup_date_time, payment_type, username) 
        VALUES ?
      `;
      let values = [
        [req.body.orderDateTime, req.body.pickupDateTime, req.body.paymentType, req.body.username]
      ];
      connection.query(query, [values], (error, rows, fields) => {
        if (error) {
          console.log("Error in query 1!");
          reject(err);
        } else {
          const orderId = rows.insertId;
          const servedTableQuery = `
            INSERT INTO served (food_id, quantity_served, user_order_id)
            VALUES ?
          `;
          const foodTableQuery = `
          UPDATE food
          SET quantity = ?
          WHERE id = ?
        `;

          let servedTableValues = [];

          req.body.foods.forEach(food => {
            let temp1= [];
            temp1.push(food.foodId);
            temp1.push(food.served);
            temp1.push(orderId);
            servedTableValues.push(temp1);

            let foodsTableValues = [];
            foodsTableValues.push(food.newQuantity);
            foodsTableValues.push(food.foodId);
            
            connection.query(foodTableQuery, foodsTableValues, (error, rows, fields) => {
              if (error) {
                console.log("Error in query 3!");
                //connection.release();
                reject(err);
              } else {
                //connection.release();
                resolve({ message: "Order successful!" });
              }
            });
          });

          connection.query(servedTableQuery, [servedTableValues], (error, rows, fields) => {
            if (error) {
              console.log("Error in query 2!");
              reject(err);
            } else {
              resolve({ message: "Order successful!", orderId: orderId });
            }
          });
        }
      });
    });
  });
}