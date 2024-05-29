const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/UsersController");

router.route("/").get(UsersController.getAllUsers);

module.exports = router;
