const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.route("/signup").post(AuthController.signUp);
router.route("/signin").post(AuthController.signIn);

module.exports = router;
