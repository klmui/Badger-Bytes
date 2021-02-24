exports.addFood = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
      const query = `
        INSERT INTO food (name, quantity, image_src, price) 
        VALUES ?
      `;
      const values = 
      [
        [req.body.name, req.body.quantity, req.body.image_src, req.body.price]
      ];
      connection.query(query, [values], (error, rows, fields) => {
        // Always release the connection back
        connection.release();

        if (error) {
          console.log("Error in query!");
          reject(err);
        } else {
          resolve({ foodId: rows.insertId }); 
        }
      });
    });
  });
}

exports.updateFood = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
      const query = `
        UPDATE food
        SET name = ?, quantity = ?, image_src = ?, price = ?
        WHERE id = ?
      `;
      const values = [req.body.name, req.body.quantity, req.body.image_src, req.body.price, req.params.id];
      connection.query(query, values, (error, rows, fields) => {
        // Always release the connection back
        connection.release();

        if (error) {
          console.log("Error in query!");
          reject(err);
        } else {
          resolve({ message: "Successfully updated item!" }); 
        }
      });
    });
  });
}

exports.deleteFood = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
      const query = `
        DELETE FROM food WHERE id = ?
      `;
      const values = [req.params.id];
      connection.query(query, values, (error, rows, fields) => {
        // Always release the connection back
        connection.release();

        if (error) {
          console.log("Error in query!");
          reject(err);
        } else {
          resolve({ message: "Successfully deleted item!" }); 
        }
      });
    });
  });
}