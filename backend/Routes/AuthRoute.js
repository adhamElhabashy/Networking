const express = require("express");
const AuthRouter = express.Router();
const AuthController = require("../Controllers/AuthController");

AuthRouter.get("/signup", AuthController.signup);

module.exports = AuthRouter;
