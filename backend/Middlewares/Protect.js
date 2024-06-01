const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

Protect = asyncHandler(async (request, response, next) => {
	const { id } = request.params;

	const user = User.findOne({ _id: id });

	if (!user) {
		return response
			.status(404)
			.json({ status: "fail", message: "user doesn't exist" });
	}

	next();
});

module.exports = { Protect };
