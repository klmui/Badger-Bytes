// Packages
const express    = require("express"),
      bodyParser = require('body-parser'),
      cors       = require("cors");

// Routes

const app = express();

let corsOption = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: 'Use' routes here

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});


// TODO: Connect to DB here


// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});