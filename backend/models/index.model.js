exports.getMenu = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error connecting to database!");
          reject(err);
        } else {
          const query = `
            SELECT 
              m.id as menu_id,
              m.name as restaurant_name,
              m.description as restaurant_description,
              m.img_src as resturant_image,
              f.name as food_name,
              f.quantity,
              f.image_src as food_image,
              f.menu_id,
              f.price
            FROM menu as m
            JOIN food as f ON m.id=f.menu_id;
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