const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.post("/signup", AuthController.signup);

module.exports = router;
