const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/UsersController");
const { verifiyAdmin } = require("../Middlewares/VerifiyAdmin");

router.route("/").get(verifiyAdmin, UsersController.getAllUsers);

module.exports = router;
