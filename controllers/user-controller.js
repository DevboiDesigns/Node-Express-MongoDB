const User = require("../models/User");

exports.login = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then((result) => {
      // set session on req - add prop "user" - set prop for new prop "user" - will only run when Login is run
      req.session.user = { favColor: "blue", username: user.data.username };
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

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
  // if user excists on session then they have signed in
  if (req.session.user) {
    res.send("Welceome to the actual application!");
  } else {
    res.render("home-guest");
  }
};
