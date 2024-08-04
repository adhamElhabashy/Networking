const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");
const CustomError = require("../Utils/CustomError");

const filterRequestObject = require("../Functions/FilterRequestObject");

/*---------------------------------
* @desc get all the users
* @route /api/v1/users
* @method GET
* @access private - only logged in user
-----------------------------------*/
module.exports.getAllUsers = asyncHandler(async (request, response) => {
	const users = await User.find();

	response.status(200).json({ status: "success", data: { users } });
});

/*---------------------------------
* @desc get user
* @route /api/v1/users/:id
* @method GET
* @access private - only logged in user
-----------------------------------*/
module.exports.getUser = asyncHandler(async (request, response) => {
	const { id } = request.params;
	const user = await User.findById(id).select("-email");

	response.status(200).json({ status: "success", data: { user } });
});

/*---------------------------------
* @desc get all the posts of user
* @route /api/v1/users/:id/posts
* @method GET
* @access private - only logged in user 
-----------------------------------*/
module.exports.getAllPostsOfUser = asyncHandler(async (request, response) => {
	const posts = await Post.find({ user: request.params.id }).populate("user", [
		"-password",
	]);

	response.status(200).json({ status: "success", data: { posts } });
});

/*---------------------------------
* @desc update user profile
* @route /api/v1/users/:id
* @method PUT
* @access private - only user himself
-----------------------------------*/

module.exports.UpdateMyProfile = asyncHandler(
	async (request, response, next) => {
		const { id } = request.params;

		if (request.user.id !== id) {
			const error = new CustomError("Not Allowed", 401);
			return next(error);
		}

		// 2 - prevent updating of the password
		if (request.body.password || request.body.confirmPassword) {
			const error = new CustomError("you cannot update password", 403);
			return next(error);
		}

		// 3 - update data
		const filteredObject = filterRequestObject(
			request.body,
			"username",
			"email",
			"bio"
		);
		const user = await User.findByIdAndUpdate(id, filteredObject, {
			runValidators: true,
			new: true,
		});
		// 4 - send response
		response.status(200).json({ status: "success", data: { user } });
	}
);

/*---------------------------------
* @desc delete user profile
* @route /api/v1/users/:id
* @method DELETE
* @access private - only user himself or admin
-----------------------------------*/
module.exports.deleteUserProfile = asyncHandler(
	async (request, response, next) => {
		const { id } = request.params;

		if (request.user.id !== id && request.user.isAdmin !== true) {
			// return response.status(401).json({
			// 	status: "fail",
			// 	message: "Not Allowed",
			// });
			const error = new CustomError("Not Allowed", 401);
			return next(error);
		}
		response.clearCookie("authToken", {
			httpOnly: true,
			sameSite: "strict",
		});
		await User.findByIdAndUpdate(id, { active: false });
		// TODO: deleting all his Posts & comments in the database

		response.status(204).json({ status: "success", data: null });
	}
);
