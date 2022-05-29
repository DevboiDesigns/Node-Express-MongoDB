const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

// Sessions
let sessionOptions = session({
  secret: "asdfljkadflkjlkjasdkdd",
  store: MongoStore.create({ client: require("./db") }),
  // Boiler
  resave: false,
  saveUninitialized: false,
  // miliseconds to one Day/ 24hrs
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});

app.use(sessionOptions);

// require in all routers
const router = require("./routes/router");

// add user submitted data to request object
app.use(express.urlencoded({ extended: false }));
// accept JSON
app.use(express.json());

// set public files - CSS etc.
app.use(express.static("public"));
// first arg - boiler; 2nd arg - folder location for views
app.set("views", "views");
// set view engine 1st arg - boiler; 2nd arg - engine - npm install ejs
app.set("view engine", "ejs");

// set routers
app.use(router);

module.exports = app;
