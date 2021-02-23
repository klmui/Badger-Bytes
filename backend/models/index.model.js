exports.getMenu = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error connecting to database!");
          return reject(err);
        } else {
          const query = `
            SELECT * FROM menu as m
            JOIN food as f ON m.id=f.menu_id;
          `;
          connection.query(query, (error, rows, fields) => {
            // Always release the connection back
            connection.release();
            if (error) {
              console.log("Error in query!");
              return reject(err);
            } else {
              return resolve(rows); 
            }
          });
        }
      });
    });
}