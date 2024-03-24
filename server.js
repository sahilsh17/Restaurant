// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require("cookie-session");
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: "session",
  keys: ["one"],
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");

const homeRoutes = require("./routes/home")
const menuRoutes = require("./routes/menu")
const orderRoutes = require("./routes/orders");
const checkoutRoutes = require("./routes/checkout");
const smsRoutes = require("./routes/sms");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/home", homeRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/orders", orderRoutes(db));
app.use("/checkout", checkoutRoutes(db));
app.use("/sms", smsRoutes);
// Note: mount other resources here, using the same pattern above


// Home page

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
