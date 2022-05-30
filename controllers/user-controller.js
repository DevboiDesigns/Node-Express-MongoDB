const User = require("../models/User");

exports.login = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then((result) => {
      // set session on req - add prop "user" - set prop for new prop "user" - will only run when Login is run
      req.session.user = { favColor: "blue", username: user.data.username };
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch((error) => {
      req.flash("errors", error);
      req.session.save(() => {
        res.redirect("/");
      });
    });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.register = (req, res) => {
  // Create new objects with keyword "new"
  let user = new User(req.body);
  user
    .register()
    .then((result) => {
      req.session.user = { username: user.data.username };
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch((regErrors) => {
      console.log(regErrors);
      regErrors.forEach(function (error) {
        req.flash("regErrors", error);
      });
      req.session.save(() => {
        res.redirect("/");
      });
    });
};

exports.home = (req, res) => {
  // if user excists on session then they have signed in
  if (req.session.user) {
    res.render("home-dashboard", { username: req.session.user.username });
  } else {
    res.render("home-guest", {
      errors: req.flash("errors"),
      regErrors: req.flash("regErrors"),
    });
  }
};
