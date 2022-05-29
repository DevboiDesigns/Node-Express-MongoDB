const express = require("express");
const app = express();

// set public files - CSS etc.
app.use(express.static("public"));
// first arg - boiler; 2nd arg - folder location for views
app.set("views", "views");
// set view engine 1st arg - boiler; 2nd arg - engine - npm install ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home-guest");
});

app.listen(3000);
