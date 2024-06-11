const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");

const filterRequestObject = require("../Functions/FilterRequestObject");

/*---------------------------------
* @desc get all the users
* @route /api/v1/users
* @method GET
* @access private - only admin
-----------------------------------*/
module.exports.getAllUsers = asyncHandler(async (request, response) => {
	const users = await User.find();

	response.status(200).json({ status: "success", data: { users } });
});

/*---------------------------------
* @desc update user profile
* @route /api/v1/users/:id
* @method PUT
* @access private - only user himself
-----------------------------------*/

module.exports.UpdateMyProfile = asyncHandler(async (request, response) => {
	const { id } = request.params;

	if (request.user.id !== id) {
		return response.status(401).json({
			status: "fail",
			message: "Not Allowed",
		});
	}

	// 2 - prevent updating of the password
	if (request.body.password || request.body.confirmPassword) {
		return response
			.status(403)
			.json({ status: "fail", message: "you cannot update password" });
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
});

/*---------------------------------
* @desc delete user profile
* @route /api/v1/users/:id
* @method DELETE
* @access private - only user himself or admin
-----------------------------------*/
module.exports.deleteUserProfile = asyncHandler(async (request, response) => {
	const { id } = request.params;

	if (request.user.id !== id && request.user.isAdmin !== true) {
		return response.status(401).json({
			status: "fail",
			message: "Not Allowed",
		});
	}
	await User.findByIdAndUpdate(id, { active: false });
	// TODO: deleting all his Posts & comments in the database

	response.status(204).json({ status: "success", data: null });
});
