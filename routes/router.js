const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const postController = require("../controllers/post-controller");

router.get("/", userController.home);

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;
