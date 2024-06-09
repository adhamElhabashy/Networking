const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");
/*---------------------------------
* @desc create post
* @route /api/v1/posts
* @method POST
* @access private (only logged in user)
-----------------------------------*/
module.exports.createPost = asyncHandler(async (request, response) => {
	const post = await Post.create({ ...request.body, user: request.user.id });
	// TODO: error handling
	// TODO: uploading image
	response.status(201).json({ post });
});
