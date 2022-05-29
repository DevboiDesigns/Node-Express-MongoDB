const express = require("express");
const app = express();

// require in all routers
const router = require("./routes/router");

// set public files - CSS etc.
app.use(express.static("public"));
// first arg - boiler; 2nd arg - folder location for views
app.set("views", "views");
// set view engine 1st arg - boiler; 2nd arg - engine - npm install ejs
app.set("view engine", "ejs");

// set routers
app.use(router);

app.listen(3000);
