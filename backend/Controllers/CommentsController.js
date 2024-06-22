const Comment = require("../Models/CommentModel");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const FilterRequestObject = require("../Functions/FilterRequestObject");

/*---------------------------------
* @desc get All the comments
* @route /api/v1/comments
* @method GET
* @access private (only admin)
-----------------------------------*/
module.exports.getAllComments = asyncHandler(async (request, response) => {
	const comments = await Comment.find().populate("user");

	response.status(200).json({ status: "success", data: { comments } });
});

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

/*---------------------------------
* @desc update comment
* @route /api/v1/comments
* @method PUT
* @access private (only logged in user)
-----------------------------------*/
module.exports.updateComment = asyncHandler(async (request, response) => {
	const filteredObject = FilterRequestObject(request.body, "text");
	const comment = await Comment.findByIdAndUpdate(
		request.params.id,
		filteredObject,
		{
			runValidators: true,
			new: true,
		}
	);

	response.status(200).json({ status: "success", data: { comment } });
});
