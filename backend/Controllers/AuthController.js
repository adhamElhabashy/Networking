const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
/*---------------------------------
* @desc sign up New User 
* @route /api/auth/signup
* @method POST
* @access public
-----------------------------------*/
module.exports.signup = asyncHandler(async (request, response) => {
	User.create(request.body);

	return response
		.status(201)
		.json({ status: "success", message: "user has been created" });
});
