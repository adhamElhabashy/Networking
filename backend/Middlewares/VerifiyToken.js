const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

module.exports.VerifiyToken = asyncHandler(async (request, response, next) => {
	let token = request.headers.authorization?.split(" ")[1];

	if (!token) {
		return response.status(401).json({ message: "No Token Provided" });
	}

	let jwtVerification = jwt.verify(token, process.env.PRIVATEKEY);

	request.user = jwtVerification;

	next();
});
