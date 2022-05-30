// hashing passwords
const bcrypt = require("bcryptjs");
// Set location to Database
const userCollection = require("../db").db().collection("users");
// Validate email and check if malicious code
const validator = require("validator");
// hasher for Gravatar
const md5 = require("md5");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

// ---------------------------------------------- Clean Up
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

// ---------------------------------------------- Validate
User.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
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
    // ---------------- bcrypt only allows 50 characters
    if (this.data.password.length > 50) {
      this.errors.push("Password can not exceed 50 characters");
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("Username must be at least 3 characters");
    }
    if (this.data.username.length > 30) {
      this.errors.push("Username can not exceed 30 characters");
    }

    // Only if username is valid, check to see if its already taken
    // Username
    if (
      this.data.username.length > 2 &&
      this.data.username.length < 31 &&
      validator.isAlphanumeric(this.data.username)
    ) {
      let usernameExists = await userCollection.findOne({
        username: this.data.username,
      });
      if (usernameExists) {
        this.errors.push("That username is already in use.");
      } else {
        console.log("Doesnt exists");
      }
    }

    // Email
    if (validator.isEmail(this.data.email)) {
      let emailExists = await userCollection.findOne({
        email: this.data.email,
      });
      if (emailExists) {
        this.errors.push("That email is already in use.");
      }
    }
    resolve();
  });
};

// ---------------------------------------------- Login
User.prototype.login = function () {
  // Similar to swift RESULT type - Promise()
  return new Promise((resolve, reject) => {
    this.cleanUp();
    // MongoDB method to find one entry
    userCollection
      .findOne({ username: this.data.username })
      .then((attemptedUser) => {
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          this.data = attemptedUser;
          this.getAvatar();
          resolve("Congrats!");
        } else {
          reject("Invalid username/ password");
        }
      })
      .catch(() => {
        reject("Please try again later. There is an issue with the server.");
      });
  });
};

// ---------------------------------------------- Register
User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    // 1 Validate user data
    this.cleanUp();
    await this.validate();
    // 2 Only if no errors, SAVE in database
    if (!this.errors.length) {
      // Hash User Password  - Salt & Hash
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      await userCollection.insertOne(this.data);
      this.getAvatar();
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

User.prototype.getAvatar = function () {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`;
};

module.exports = User;
