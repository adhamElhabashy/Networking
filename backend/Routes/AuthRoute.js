const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");
const { verifyToken } = require("../Middlewares/VerifyToken");
const { Protect } = require("../Middlewares/Protect");

router.route("/signup").post(AuthController.signUp);
router.route("/signin").post(AuthController.signIn);
router.route("/signout").post(verifyToken, Protect, AuthController.signOut);

module.exports = router;
