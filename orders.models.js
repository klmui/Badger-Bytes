exports.getOrders = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error connecting to database!");
          reject(err);
        } else {
          const query = `
            SELECT *
            FROM user_order
            WHERE username = "kenny";
          `;
          // hardcoded for right now because I'm not sure now to make this be the current user
          //values = [
          //  []
          //]
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