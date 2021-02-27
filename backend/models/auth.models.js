exports.login = (req, res) => {
  return new Promise((resolve, reject) => {
    // Create user object and validate it
    const user = {
      "username": req.body.username,
      "password": req.body.password
    };
    if (!user.username || !user.password) {
      // bad request
      return reject({
        message: "Please provide a username or password."
      });
    }

    // Connect to database
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Error connecting to database!");
        return eject(err);
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
            return resolve({
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
            console.log(results[0]);

            return resolve({
              username: username,
              token: token,
              profile: {
                username: results[0].username, email: results[0].email, phoneNumber: results[0].phone_number, address: results[0].address, city: results[0].city, state: results[0].state, zip: results[0].zip, carDescription: results[0].car_description, type: results[0].type
              }
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

    return resolve({
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
        return reject(err);
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
            return reject({
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

            return resolve({
              username: newUser.username,
              token: token,
              profile: {
                username: newUser.username, email: newUser.email, phoneNumber: newUser.phone_number, address: newUser.address, city: newUser.city, state: newUser.state, zip: newUser.zip, carDescription: newUser.car_description, type: newUser.type
              }
            });
          }
        });
      }
    });
  });
}

exports.updateUser = (req, res) => {
  return new Promise((resolve, reject) => {
    
    // Connect to database
    pool.getConnection(async (err, connection) => {
      if (err) {
        console.log("Error connecting to database!");
        return reject(err);
      } else {

        const newInfo = {
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

        const query = `
        UPDATE user u
        SET 
          username = ?,
          password = ?,
          email = ?,
          phone_number = ?,
          address = ?,
          city = ?,
          state = ?,
          zip = ?,
          car_description = ?,
          type = ?
        WHERE u.username = ?;
        `;
        // hash password - takes awhile so we need aysnc await
        const hashedPassword = await bcrypt.hash(newInfo.password, 8);
        const values = [
          newInfo.username, hashedPassword, newInfo.email, newInfo.phone_number, newInfo.address, newInfo.city, newInfo.state, newInfo.zip, newInfo.car_description, newInfo.type, req.params.username
        ];

        connection.query(query, values, async (error, results) => {
          // Always release the connection back
          connection.release();

          if (error) {
            console.log("Duplicate username.");
            return reject({
              message: "Duplicate username."
            });
          } else {

            // create token and insert cookie
            const token = jwt.sign({
              username: newInfo.username
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

            return resolve({
              username: newInfo.username,
              token: token,
              profile: {
                username: newInfo.username, email: newInfo.email, phoneNumber: newInfo.phone_number, address: newInfo.address, city: newInfo.city, state: newInfo.state, zip: newInfo.zip, carDescription: newInfo.car_description, type: newInfo.type
              }
            });
          }
        });
      }
    });
  });
}

exports.deleteUser = (req, res) => {
  return new Promise((resolve, reject) => {
    
    // Connect to database
    pool.getConnection(async (err, connection) => {
      if (err) {
        console.log("Error connecting to database!");
        return reject(err);
      } else {

        const query = `
          DELETE FROM user
          WHERE username = ?;
        `;
        const values = [
          [req.params.username]
        ];

        connection.query(query, values, async (error, results) => {
          // Always release the connection back
          connection.release();

          if (error) {
            console.log("Error deleting user");
            return reject({
              message: "Error deleting user"
            });
          } else {

            //set cookie to user logged out
            res.cookie('jwt', 'logout', {
              expires: new Date(Date.now() + 2 * 1000),
              httpOnly: true
            });
        
            return resolve({
              message: "User account deleted"
            });
          }
        });
      }
    });
  });
}