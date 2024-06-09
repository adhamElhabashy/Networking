const express = require("express");
const router = express.Router();
const PostsController = require("../Controllers/PostsController");
const { verifyToken } = require("../Middlewares/VerifyToken");

router.route("/").post(verifyToken, PostsController.createPost);

module.exports = router;
