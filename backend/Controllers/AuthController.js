const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CustomError = require("../Utils/CustomError");

/*---------------------------------
* @desc sign up New User 
* @route /api/v1/auth/signup
* @method POST
* @access public
-----------------------------------*/
module.exports.signUp = asyncHandler(async (request, response) => {
	await User.create(request.body);

	return response
		.status(201)
		.json({ status: "success", message: "user has been created" });
});

/*---------------------------------
* @desc sign in user
* @route /api/v1/auth/signin
* @method POST
* @access public
-----------------------------------*/
module.exports.signIn = asyncHandler(async (request, response, next) => {
	let { email, password } = request.body;
	// 1 - check if the email and password provided
	if (!email || !password) {
		const error = new CustomError("please provide email and password", 401);
		return next(error);
	}

	let user = await User.findOne({ email: email }).select("+password");

	// 2 - Check if the user exists
	// 3 - check if there the email and password correct
	if (!user || !(await bcrypt.compare(password, user.password))) {
		const error = new CustomError("Email or password is not correct", 401);
		return next(error);
	}

	user.password = undefined;

	// 3 - create token
	const token = jwt.sign(
		{ id: user._id, isAdmin: user.isAdmin },
		process.env.PRIVATEKEY,
		{
			expiresIn: process.env.LOGIN_EXPIRES,
		}
	);

	response.cookie("authToken", token, {
		httpOnly: true,
		sameSite: "lax", // Ensure proper cross-site behavior
	});
	response.status(200).json({ status: "success", data: { user } });
});

/*---------------------------------
* @desc sign out
* @route /api/v1/auth/signout
* @method POST
* @access private - only logged in user
-----------------------------------*/
module.exports.signOut = asyncHandler(async (request, response) => {
	response.clearCookie("authToken", {
		httpOnly: true,
		sameSite: "strict",
	});
	response
		.status(200)
		.json({ status: "success", message: "You signed out successfully" });
});
