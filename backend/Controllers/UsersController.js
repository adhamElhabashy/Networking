const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");

/*---------------------------------
* @desc get all the users
* @route /api/v1/auth/signup
* @method GET
* @access private - only admin
-----------------------------------*/
module.exports.getAllUsers = asyncHandler(async (request, response) => {
	const users = await User.find();

	response.status(200).json({ status: "success", data: { users } });
});
