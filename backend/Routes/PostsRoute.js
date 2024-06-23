const express = require("express");
const router = express.Router();
const PostsController = require("../Controllers/PostsController");
const { verifyToken } = require("../Middlewares/VerifyToken");
const { verifyAdmin } = require("../Middlewares/VerifyAdmin");
const { Protect } = require("../Middlewares/Protect");
const { verifyUserPost } = require("../Middlewares/verifyUserPost");

router
	.route("/")
	.get(verifyToken, Protect, verifyAdmin, PostsController.getAllThePosts)
	.post(verifyToken, PostsController.createPost);

router
	.route("/:id")
	.get(verifyToken, Protect, PostsController.getSinglePost)
	.put(verifyToken, Protect, verifyUserPost, PostsController.updateMyPost)
	.delete(verifyToken, Protect, PostsController.deleteProfile);

module.exports = router;
