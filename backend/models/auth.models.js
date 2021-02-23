var { promisify } = require('util');

exports.login = (req, res) => {
  return new Promise((resolve, reject) => {
    // Create user object and validate it
    const user = {"username": req.body.username, "password": req.body.password};
    if (!user.username || !user.password) {
      // bad request
      return reject({ message: "Please provide a username or password." });
    }

    // Connect to database
    pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error connecting to database!");
          return reject(err);
        } else {
          const query = `
            SELECT * 
            FROM User
            WHERE username = ?;
          `;
          var values = [
            [user.username]
          ];
          connection.query(query, [values], async (error, results) => {
            // Always release the connection back
            connection.release();

            if (error) {
              console.log("Error in query!");
              return reject(err);
            } else if (!results || (!await bcrypt.compare(user.password, results[0].password))) {
              // Wrong password
              return resolve({ message: "username or password is incorrect" });
            } else {
              // Successful login
              const username = results[0].username;

              // Create JWT token
              const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
              });

              
              // Create cookie
              const cookieOptions = {
                expires: new Date(
                  Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
              }

              // can specify any name for cookie - insert cookie
              res.cookie('jwt', token, cookieOptions);

              console.log(token);

              return resolve({ username: username, token: token }); 
            }            
          });
        }
      });
    });
}

exports.logout = async (req, res) => {
  return new Promise((resolve, reject) => {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 2*1000),
      httpOnly: true
    });
  
    return resolve({ message: "Logout successful" });
  });
}

exports.signup = (req, res) => {
  return new Promise((resolve, reject) => {
     // Connect to database
     pool.getConnection((err, connection) => {
      if (err) {
        console.log("Error connecting to database!");
        return reject(err);
      } else {
        const query = `
            SELECT * 
            FROM User
            WHERE username = ?;
        `;
        var values = [
          [user.username]
        ];
        connection.query(query, [values], async (error, results) => {
          // Always release the connection back
          connection.release();

          if (error) {
            console.log("Error in query!");
            return reject(err);
          } else {
            const user = {
              ""
            }
          }
        });
      }
     });
  });
}