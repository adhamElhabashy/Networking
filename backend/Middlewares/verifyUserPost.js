const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");

verifyUserPost = asyncHandler(async (request, response, next) => {
	const post = await Post.findOne({ _id: request.params.id });
	if (request.user.id !== post.user.toString()) {
		response.status(403).json({
			status: "fail",
			message: "Not Allowed. Only user himself can update the post",
		});
	}
	next();
});

module.exports = { verifyUserPost };
