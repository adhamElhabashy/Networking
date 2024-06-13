const express = require("express");
const router = express.Router();
const CommentsController = require("../Controllers/CommentsController");
const { verifyToken } = require("../Middlewares/VerifyToken");
const { Protect } = require("../Middlewares/Protect.js");
const { verifyAdmin } = require("../Middlewares/VerifyAdmin.js");
router
	.route("/")
	.get(verifyToken, Protect, verifyAdmin, CommentsController.getAllComments)
	.post(verifyToken, Protect, CommentsController.createComment);

module.exports = router;
