const express = require("express");
const router = express.Router();
const PostsController = require("../Controllers/PostsController");
const { verifyToken } = require("../Middlewares/VerifyToken");
const { verifyAdmin } = require("../Middlewares/VerifyAdmin");
const { Protect } = require("../Middlewares/Protect");
router
	.route("/")
	.get(verifyToken, Protect, verifyAdmin, PostsController.getAllThePosts)
	.post(verifyToken, PostsController.createPost);

module.exports = router;
