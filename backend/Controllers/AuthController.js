const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*---------------------------------
* @desc sign up New User 
* @route /api/auth/signup
* @method POST
* @access public
-----------------------------------*/
module.exports.signUp = asyncHandler(async (request, response) => {
	User.create(request.body);

	return response
		.status(201)
		.json({ status: "success", message: "user has been created" });
});

/*---------------------------------
* @desc sign in user
* @route /api/auth/signin
* @method POST
* @access public
-----------------------------------*/
module.exports.signIn = asyncHandler(async (request, response) => {
	let { email, password } = request.body;
	// 1 - check if the email and password provided
	if (!email || !password) {
		return response
			.status(401)
			.json({ message: "please provide email and password" });
	}

	let user = await User.findOne({ email: email }).select("+password");

	// 2 - Check if the user exists
	// 3 - check if there the email and password correct
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return response
			.status(401)
			.json({ message: "Email or password is not correct" });
	}

	// 3 - create token
	const token = jwt.sign({ id: user._id }, process.env.PRIVATEKEY, {
		expiresIn: process.env.LOGIN_EXPIRES,
	});

	response.status(200).json({ status: "success", data: { user }, token });
});
