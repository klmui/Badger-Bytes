// Import packages
require('dotenv').config();
const express    = require("express"),
      bodyParser = require('body-parser'),
      cors       = require("cors"),
      mysql      = require("mysql"),
      jwt        = require("jsonwebtoken"),
      bcrypt     = require("bcryptjs"),
      cookieParser = require("cookie-parser");

// Import routes
const indexRoutes = require('./backend/routes/index.routes');
const authRoutes = require('./backend/routes/auth.routes');
const ordersRoutes = require('./backend/routes/orders.routes');

// More init
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
global.bcrypt = bcrypt;
global.jwt = jwt;

let corsOption = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 'Use' routes here
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', ordersRoutes);

// Last case: url not found
app.get('/*', function(req, res){
  res.json({ message: "404 Not found" });
});

// DB Connection
const db_config = {
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'bd0541f49396cc',
  password: process.env.DB_PASSWORD,
  database: 'heroku_c880a0d586b8b1d',
  connectionLimit: 10
}; 
const pool = mysql.createPool(db_config);
global.pool = pool;

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});