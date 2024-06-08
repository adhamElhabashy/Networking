const asyncHandler = require("express-async-handler");
/*---------------------------------
* @desc create post
* @route /api/v1/posts
* @method POST
* @access private (only logged in user)
-----------------------------------*/
module.exports.createPost = asyncHandler(async (request, response) => {
	response.status(200).json({ message: "Done" });
});
