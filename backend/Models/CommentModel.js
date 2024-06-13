const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
	{
		text: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		username: { type: String, required: true },
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
