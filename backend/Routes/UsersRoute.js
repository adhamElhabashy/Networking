const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/UsersController");
const { verifyToken } = require("../Middlewares/VerifyToken");
const { verifyAdmin } = require("../Middlewares/VerifyAdmin");
const { Protect } = require("../Middlewares/Protect");

router.route("/").get(verifyToken, verifyAdmin, UsersController.getAllUsers);
router
	.route("/:id")
	.put(verifyToken, Protect, UsersController.UpdateMyProfile)
	.delete(verifyToken, Protect, UsersController.deleteUserProfile);

router
	.route("/:id/posts")
	.get(verifyToken, Protect, UsersController.getAllPostsOfUser);
module.exports = router;
