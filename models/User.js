// Set location to Database
const userCollection = require("../db").collection("users");
const validator = require("validator");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }

  if (typeof this.data.email != "string") {
    this.data.email = "";
  }

  if (typeof this.data.password != "string") {
    this.data.password = "";
  }

  // get rid of bogus properties - security
  this.data = {
    // ----------------------- .trim = remove white spaces
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

User.prototype.validate = function () {
  // Empty error validation
  if (this.data.username == "") {
    this.errors.push("You must provide a username.");
  }
  if (
    this.data.username != "" &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push("Username can only contain letters and numbers");
  }
  // Validator NPM logic/method
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must provide a valide email.");
  }
  if (this.data.password == "") {
    this.errors.push("You must provide a password.");
  }
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push("Password must be at least 12 characters");
  }
  if (this.data.password.length > 100) {
    this.errors.push("Password can not exceed 100 characters");
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push("Username must be at least 3 characters");
  }
  if (this.data.username.length > 30) {
    this.errors.push("Username can not exceed 30 characters");
  }
};

// Static Function
User.prototype.register = function () {
  // 1 Validate user data
  this.cleanUp();
  this.validate();
  // 2 Only if no errors, SAVE in database
  if (!this.errors.length) {
    userCollection.insertOne(this.data);
  }
};

module.exports = User;
