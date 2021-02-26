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
              m.img_src as restaurant_image,
              f.id as food_id,
              f.name as food_name,
              f.quantity,
              f.image_src as food_image,
              f.menu_id,
              f.price,
              f.description as food_description
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

exports.updateMenu = (req, res) => {
  return new Promise((resolve, reject) => {
    
    // Connect to database
    pool.getConnection(async (err, connection) => {
      if (err) {
        console.log("Error connecting to database!");
        return reject(err);
      } else {

        const newInfo = {
          "description": req.body.description,
          "img_src": req.body.img_src,
          "name": req.body.name
        };

        const query = `
          UPDATE menu m
          SET 
            description = ?,
            img_src = ?,
            name = ?
          WHERE m.id <> 0;
          
        `;

        const values = [
          newInfo.description, newInfo.img_src, newInfo.name
        ];

        connection.query(query, values, async (error, results) => {
          // Always release the connection back
          connection.release();

          if (error) {
            console.log("Error updating restaurant info");
            return reject({
              message: "Error updating restaurant info"
            });
          } else {
            return resolve({
              message: "Successfully updated restaurant info!"
            });
          }
        });
      }
    });
  });
}