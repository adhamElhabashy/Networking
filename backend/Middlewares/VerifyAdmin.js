const asyncHandler = require("express-async-handler");

module.exports.verifyAdmin = asyncHandler(async (request, response, next) => {
	if (request.user.isAdmin !== true) {
		return response.status(401).json({ message: "Only Admin Is Allowed" });
	}

	next();
});
