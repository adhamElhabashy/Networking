const express = require("express");
const router = express.Router();
const PostsController = require("../Controllers/PostsController");
router.post("/", PostsController.createPost);

module.exports = router;
