const Comment = require("../Models/CommentModel");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

/*---------------------------------
* @desc create comment
* @route /api/v1/comments
* @method POST
* @access private (only logged in user)
-----------------------------------*/
module.exports.createComment = asyncHandler(async (request, response) => {
	const profile = await User.findOne({ _id: request.user.id });

	const comment = await Comment.create({
		text: request.body.text,
		postId: request.body.postId,
		user: request.user.id,
		username: profile.username,
	});

	response.status(201).json({ status: "success", data: { comment } });
});
