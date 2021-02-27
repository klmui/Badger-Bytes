exports.getUsage = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection((err, connection) => {
      const query = `
        SELECT * FROM user_order as u
        JOIN served as s on u.id=s.user_order_id
        JOIN food as f on s.food_id=f.id
        WHERE u.order_date_time BETWEEN ? AND ?
        ORDER BY u.order_date_time DESC;
      `;
      const values = [req.body.date1, req.body.date2];
      connection.query(query, values, (error, rows, fields) => {
        // Always release the connection back
        if (error) {
          console.log(error);
        }
        connection.release();
        let result = {};
        result['numOrders'] = rows.length;

        // for (let i = 0; i < rows.length; i++) {
        //   let row = rows[i];
        //   console.log(row.name)
        //   if (row.name in result) {
        //     row[row.name] += 1;
        //   } else {
        //     row[row.name] = 1;
        //   }

        //   if (row.payment_type in result) {
        //     row[row.payment_type] += 1;
        //   } else {
        //     row[row.payment_type] = 1;
        //   }
      
        // }

       
        return resolve(result);
      });
    });
  });
}