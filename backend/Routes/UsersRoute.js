const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/UsersController");
const { verifyToken } = require("../Middlewares/VerifyToken");
const { verifyAdmin } = require("../Middlewares/VerifyAdmin");
const { Protect } = require("../Middlewares/Protect");
const photoUpload = require("../Middlewares/PhotoUpload");

router.route("/").get(verifyToken, verifyAdmin, UsersController.getAllUsers);
router
	.route("/:id")
	.get(verifyToken, Protect, UsersController.getUser)
	.put(verifyToken, Protect, UsersController.UpdateMyProfile)
	.delete(verifyToken, Protect, UsersController.deleteUserProfile);

router
	.route("/:id/posts")
	.get(verifyToken, Protect, UsersController.getAllPostsOfUser);

router
	.route("/profile-photo-upload")
	.post(
		verifyToken,
		Protect,
		photoUpload.single("image"),
		UsersController.profilePhotoUpload
	);

module.exports = router;
