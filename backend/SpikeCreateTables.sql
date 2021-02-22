DROP TABLE IF EXISTS Menu;
DROP TABLE IF EXISTS OrderItem;
DROP TABLE IF EXISTS UserOrder;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS UserPayment;

CREATE TABLE Menu(
  itemName VARCHAR(30) PRIMARY KEY,
  description VARCHAR(100),
  price REAL,
  picture VARCHAR(50),
  available INT
);

CREATE TABLE OrderItem(
  orderID INTEGER,
  itemName VARCHAR(30),
  PRIMARY KEY(orderID, itemName)
);

CREATE TABLE UserOrder(
  orderDateTime DATETIME,
  pickupDateTime DATETIME,
  paymentType VARCHAR(20),
  paymentID VARCHAR(30),
  username VARCHAR(20),
  orderID INTEGER,
  PRIMARY KEY(username, orderID)
);

CREATE TABLE User(
  username VARCHAR(20) PRIMARY KEY,
  password VARCHAR(50),
  phoneNumber VARCHAR(20),
  addressLine1 VARCHAR(50),
  addressLine2 VARCHAR(50),
  city VARCHAR(20),
  state VARCHAR(2),
  zip VARCHAR(5),
  carDescription VARCHAR(50)
);

CREATE TABLE UserPayment(
  username VARCHAR(20),
  paymentType VARCHAR(20),
  paymentID VARCHAR(30),
  PRIMARY KEY(username, paymentType, paymentID)
);
