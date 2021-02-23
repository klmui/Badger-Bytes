var {
  promisify
} = require('util');

exports.login = (req, res) => {
  return new Promise((resolve, reject) => {
    // Create user object and validate it
    const user = {
      "username": req.body.username,
      "password": req.body.password
    };
    if (!user.username || !user.password) {
      // bad request
      reject({
        message: "Please provide a username or password."
      });
    }

    // Connect to database
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Error connecting to database!");
        reject(err);
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
            reject(err);
          } else if (!results || (!await bcrypt.compare(user.password, results[0].password))) {
            // Wrong password
            resolve({
              message: "username or password is incorrect"
            });
          } else {
            // Successful login
            const username = results[0].username;

            // Create JWT token
            const token = jwt.sign({
              username: username
            }, process.env.JWT_SECRET, {
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

            resolve({
              username: username,
              token: token
            });
          }
        });
      }
    });
  });
}

exports.logout = async (req, res) => {
  return new Promise((resolve, reject) => {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true
    });

    resolve({
      message: "Logout successful"
    });
  });
}

exports.signup = (req, res) => {
  return new Promise((resolve, reject) => {
    // Connect to database
    pool.getConnection(async (err, connection) => {
      if (err) {
        console.log("Error connecting to database!");
        reject(err);
      } else {

        const newUser = {
          "username": req.body.username,
          "password": req.body.password,
          "email": req.body.email,
          "phone_number": req.body.phoneNumber,
          "address": req.body.address,
          "city": req.body.city,
          "state": req.body.state,
          "zip": req.body.zip,
          "car_description": req.body.carDescription,
          "type": req.body.type
        };

        const query = "INSERT INTO User (username, password, email, phone_number, address, city, state, zip, car_description, type) VALUES ?";
        // hash password - takes awhile so we need aysnc await
        const hashedPassword = await bcrypt.hash(newUser.password, 8);
        const values = [
          [newUser.username, hashedPassword, newUser.email, newUser.phone_number, newUser.address, newUser.city, newUser.state, newUser.zip, newUser.car_description, newUser.type]
        ];

        connection.query(query, [values], async (error, results) => {
          // Always release the connection back
          connection.release();

          if (error) {
            console.log("Duplicate username.");
            reject({
              message: "Duplicate username."
            });
          } else {
            // create token and insert cookie
            const token = jwt.sign({
              username: newUser.username
            }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN
            });

            const cookieOptions = {
              expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true
            }

            // can specify any name for cookie
            // need to decode the token to get username
            res.cookie('jwt', token, cookieOptions);

            console.log(token);

            resolve({
              username: newUser.username,
              token: token
            });
          }
        });
      }
    });
  });
}