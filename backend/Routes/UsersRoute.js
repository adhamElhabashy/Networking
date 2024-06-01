const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/UsersController");
const { verifyToken } = require("../Middlewares/VerifyToken");
const { verifyAdmin } = require("../Middlewares/VerifyAdmin");

router.route("/").get(verifyToken, verifyAdmin, UsersController.getAllUsers);
router.route("/:id").put(verifyToken, UsersController.UpdateMyProfile);

module.exports = router;
