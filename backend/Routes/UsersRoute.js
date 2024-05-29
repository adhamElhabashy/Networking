const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/UsersController");
const { VerifiyToken } = require("../Middlewares/VerifiyToken");
const { VerifiyAdmin } = require("../Middlewares/VerifiyAdmin");

router.route("/").get(VerifiyToken, VerifiyAdmin, UsersController.getAllUsers);

module.exports = router;
