const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

Protect = asyncHandler(async (request, response, next) => {
	const id = request.user.id;

	const user = await User.findOne({ _id: id });

	if (!user || user.active !== true) {
		return response
			.status(404)
			.json({ status: "fail", message: "user doesn't exist" });
	}

	next();
});

module.exports = { Protect };
