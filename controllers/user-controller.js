const User = require("../models/User");

exports.login = () => {};

exports.logout = () => {};

exports.register = (req, res) => {
  // Create new objects with keyword "new"
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send("Congrats!");
  }
};

exports.home = (req, res) => {
  res.render("home-guest");
};
