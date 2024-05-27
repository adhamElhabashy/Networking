const asyncHandler = require("express-async-handler");
/*---------------------------------
* @desc sign up New User 
* @route /api/auth/signup
* @method POST
* @access public
-----------------------------------*/
module.exports.signup = (request, response) => {
	return response.status(200).json({ message: "done" });
};
